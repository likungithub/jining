
var taskFiles = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/rwgljbxx/addfilerw',
        rwid:'rwid',
        // updateUrl: '/contract/contractupdate',
        // projectUrl: '/contract/project',
        // paymentUrl: '/contract/payment',
        id: '',
        contractGrid: null,
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" data-placement="bottom" title="删除附件"><i class="icon iconfont icon-shanchu"></i></a>',
        jsonMap: null,
        get: null,
        schedule: '/rwgljbxx/schedule',                   //进度条
        filesize: '',
        uuid: '',
        fileUrl: '/rwgljbxx/getfileurl'
    };
    var jsonMap = {
        payService: []
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractForm: null,
        $setimg: null,
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#taskFileAdd_m');
    };
    var getSchedule = function () {
        $.ajax({
            url: configMap.path + configMap.schedule,
            dataType: 'JSON',
            type: 'GET',
            success: function (result) {
                $(".progress-bar", jqueryMap.$productForm).css("width", result.schedule);
                $(".progress-value", jqueryMap.$productForm).html(result.schedule);
            },
        });
    };
    //隐藏进度条
    var hiddenSchedule = function () {
        $("#schedule", jqueryMap.$productForm).css("display", "none");
        $(".progress-bar", jqueryMap.$contractForm).css("width", "0%");
        $(".progress-value", jqueryMap.$contractForm).html("0%");
    };
    var savefile = function () {
        var blockTarget = jqueryMap.$contractForm.closest(".modal-content");
        var AppAlert = function (msg) {
            App.alert({
                container: jqueryMap.$contractForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: msg,
                closeInSeconds:3,
                icon: 'fa fa-warning'
            });
        }
        //上传文件大小
        if ($("input[name='file']", jqueryMap.$contractForm)[0].files[0] == null || $("input[name='file']", jqueryMap.$contractForm)[0].files[0] == undefined) {
            App.unblockUI(blockTarget);
            AppAlert('请选择要上传的文件！');
            return;
        }
        if ($("input[name='file']", jqueryMap.$contractForm)[0].files[0].size >= 5242880) {
            App.unblockUI(blockTarget);
            AppAlert('请上传指定大小以内的文件！');
            return;
        }
        var url = configMap.path + configMap.dataUrl+"/"+configMap.rwid;
        // url = url + "/" + configMap.uuid;
        var inputform = {
            url: url,
            type: "POST",
            dataType: 'json',
            headers: {"ClientCallMode": "ajax"}, //添加请求头部
            beforeSend: function () {
                $("#righttwo").remove();
                $("#rightone").css("display", "block");
                $("#schedule", jqueryMap.$productForm).css("display", "block");
                configMap.get = window.setInterval(getSchedule, "500");
            },
            complete: function () {
                clearInterval(configMap.get);
                $(".progress-bar", jqueryMap.$contractForm).css("width", "100%");
                $(".progress-value", jqueryMap.$contractForm).html("100%");
                sessionStorage.removeItem("status");
                setTimeout(hiddenSchedule, "1000");
            },
            success: function (data) {
                App.unblockUI(blockTarget);
                if (data.success) {
                    $("input[name='file']", jqueryMap.$contractForm).val("");
                    if("rwid"==configMap.rwid) {
                        configMap.rwid = data.rwid;
                        $("#rwid_fj_id", jqueryMap.$contractForm).val(configMap.rwid);
                        //alert($("#rwid_fj_id", jqueryMap.$contractForm).val());
                    }
                    getFileList();
                } else {
                    Messenger().post({
                        message: data.message,
                        type: 'error'
                    });
                }
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$contractForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
            }
        }
        $("#contractFileForm").ajaxSubmit(inputform);
    };
    //获取文件列表
    var getFileList = function () {

        var url = configMap.path + configMap.dataUrl+"/"+configMap.rwid;
        var type = "GET";
        $.ajax({
            url: url,
            dataType: 'JSON',
            type: type,
            success: function (result) {

                $(".list-group", jqueryMap.$contractForm).html("");
                var content = '';
                for (var i = 0; i < result.length; i++) {
                    content += '<li class="list-group-item"><span class="opera" id="' + result[i].id + '">' + configMap.deleteBtn_html + '</span>' + result[i].fjmc + '</li>';
                }
                $(".list-group", jqueryMap.$contractForm).append(content);
                //文件数量
                configMap.filesize = result.length;
                jqueryMap.$contractForm.find('li').off('click').on('click', function () {
                    $("li").not(this).removeClass("checked");
                    $(this).addClass("checked");
                    var indexsize = $(this).index();
                    $("#righttwo").remove();
                    $("#rightone").css("display", "none");
                    var rightcontent = '';
                    var filesize = '';
                    rightcontent += '<div class="col-md-7" style="height: 350px;display: block;padding:100px 60px 100px 60px;" id="righttwo">';
                    rightcontent += '<div class="row"><div class="col-md-12"><b style="font-size:20px;">' + result[indexsize].fjmc + '</b></div>';
                    rightcontent += '<div class="col-md-12"><span><label>文件类型：</label><label style="color:">' + result[indexsize].fjmc.split(".")[(result[indexsize].fjmc.split(".").length) - 1] + '</span></div>';
                    if (result[indexsize].wjdx < 1048576) {
                        filesize = (result[indexsize].wjdx / 1024).toFixed(1);
                        filesize += "KB";
                    } else if (result[indexsize].wjdx >= 1048576) {
                        filesize = (result[indexsize].wjdx / 1048576).toFixed(1);
                        filesize += "MB";
                    }
                    rightcontent += '<div class="col-md-12"><span><label>文件大小：</label>' + filesize + '</span></div>';
                    rightcontent += '<div class="col-md-12"><span><label>上传时间：</label>' + moment(result[indexsize].scsj).format('YYYY-MM-DD') + '</span></div>';
                    /*rightcontent += '<div class="col-md-12"><span><label>上传人：</label>'+result[indexsize].zymc+'</span></div>';*/
                    rightcontent += '<div class="col-md-12"><span><a onclick="taskFiles.getURL(' + '\'' + result[indexsize].fjcclj + '\',' + '\'' + result[indexsize].fjmc + '\',' + '\'' + result[indexsize].id + '\'' + ')" name="downloadfile">下载</a></span></div>';
                    rightcontent += '</div></div></div>';
                    $("#taskFileAdd_m").append(rightcontent);
                });
                var delContainer = $('[data-type="del"]', jqueryMap.$contractForm);
                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delContractFile
                    });
                }
            },
        });
    };
    var delContractFile = function (event, element) {
        var id = element.parent().parent().index();

        var fileid = $(".list-group-item").eq(id).find('span').attr("id");
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/" + fileid,
            type: 'DELETE',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    getFileList();
                    $("#righttwo").remove();
                    Messenger().post("删除成功!");
                }
                else {
                    Messenger().post({
                        message: result.message,
                        type: 'error'
                    });
                }
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    return {
        // 初始化
        init: function (rwid) {
            configMap.rwid=rwid;
            // configMap.uuid = uuid;
            //获取附件
            getFileList();
            setJqueryMap();
            //设置页面样式
            jqueryMap.$contractForm.closest(".modal-content").css("width", "900px");
            jqueryMap.$contractForm.closest(".modal-dialog").css("width", "900px");
            jqueryMap.$contractForm.closest(".modal-body").attr("style", "padding:15px 15px 0px 15px");
            jqueryMap.$contractForm.find('[id="contractFileForm"]').find(".form-body").attr("style", "padding:0px 15px 0px 15px");
            jqueryMap.$contractForm.closest(".modal-dialog").css("margin-top", "100px");
            jqueryMap.$contractForm.find('[name="submitfilebutton"]').off("click").on("click", function () {
                savefile();
            });
//            $(".close",jqueryMap.$contractForm.closest(".modal-content")).off().on('click',function(){
//            	sessionStorage.setItem("filesize", configMap.filesize);
//            });
        },
        getURL: function (plate, filename, id) {
            var data = {
                plate: plate,
                id: id
            }
            //获取文件真实路径,下载
            $.ajax({
                url: configMap.path + configMap.fileUrl,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function (result) {
//    				window.open(result.url);
//    				$('[name="downloadfile"]').attr("href",result.url);
                    var name = filename.replace("." + filename.split(".")[filename.split(".").length - 1], "");
                    var a = $("<a></a>").attr("href", result.url).attr("download", name).attr("target", "_blank").appendTo("body");
                    a[0].click();
                    a.remove();
                },
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        getfile: function (callback) {
            sessionStorage.setItem("filesize", configMap.filesize);
            callback(true);
        }
    };
}();
//@ sourceURL=edit.js
