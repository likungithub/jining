/*jshint
 strict:true,
 noempty:true,
 noarg:true,
 eqeqeq:true,
 browser:true,
 bitwise:true,
 curly:true,
 undef:true,
 nonew:true,
 forin:true */

/*global $, App, moment, jQuery, bootbox, _ */
var chargefileAdd = function () {
    'use strict';

    /**
     * 全局属性参数
     * @type {{path: string, dataUrl: string, id: string, contractGrid: null, datatablesLanguageFile: string,
     * deleteBtn_html: string, get: null, schedule: string, filesize: string, fileUrl: string}}
     */
    var configMap = {
        path: '',
        dataUrl: '/charge/chargefile',
        id: '',
        contractGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" ' +
            'data-toggle="tooltip" title="删除附件"><i class="icon iconfont icon-shanchu"></i></a>',
        get: null,
        schedule: '/charge/schedule',
        filesize: '',
        fileUrl: '/charge/getfileurl'
    };
    /**
     * 全局Dom
     * @type {{$blockTarget: null, $contractForm: null, $setimg: null}}
     */
    var jqueryMap = {
        $blockTarget: null,
        $contractForm: null,
        $setimg: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#contractFileAdd');
    };

    /**
     * 获取进度条
     */
    var getSchedule = function () {
        $.ajax({
            url: configMap.path + configMap.schedule,
            dataType: 'JSON',
            type: 'GET',
            success: function (result) {
                $(".progress-bar", jqueryMap.$contractForm).css("width", result.schedule);
                $(".progress-value", jqueryMap.$contractForm).html(result.schedule);
            }
        });
    };

    /**
     * 隐藏进度条
     */
    var hiddenSchedule = function () {
        $("#schedule", jqueryMap.$contractForm).css("display", "none");
        $(".progress-bar", jqueryMap.$contractForm).css("width", "0%");
        $(".progress-value", jqueryMap.$contractForm).html("0%");
    };

    /**
     * 上传文件
     */
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
        };
        //上传文件大小
        if ($("input[name='file']", jqueryMap.$contractForm)[0].files[0] === null
            || $("input[name='file']", jqueryMap.$contractForm)[0].files[0] === undefined) {
            App.unblockUI(blockTarget);
            AppAlert('请选择要上传的文件！');
            return;
        }
        if ($("input[name='file']", jqueryMap.$contractForm)[0].files[0].size >= 5242880) {
            App.unblockUI(blockTarget);
            AppAlert('请上传指定大小以内的文件（单个文件5M以内，单个图片3M以内）！');
            return;
        }
        var url = configMap.path + configMap.dataUrl + "/" + configMap.id;
        var inputform = {
            url: url,
            type: "POST",
            dataType: 'json',
            headers: {"ClientCallMode": "ajax"}, //添加请求头部
            beforeSend: function () {
                $("#righttwo", jqueryMap.$contractForm).remove();
                $("#rightone", jqueryMap.$contractForm).css("display", "block");
                $("#schedule", jqueryMap.$contractForm).css("display", "block");
                configMap.get = window.setInterval(getSchedule, "500");                                               //每0.5秒获取上传进度条
            },
            complete: function () {
                clearInterval(configMap.get);
                $(".progress-bar", jqueryMap.$contractForm).css("width", "100%");
                $(".progress-value", jqueryMap.$contractForm).html("100%");
                sessionStorage.removeItem("status");
                setTimeout(hiddenSchedule, "1000");                                                                    //上传结束后，隐藏进度条
            },
            success: function (data) {
                App.unblockUI(blockTarget);
                if (data.success) {
                    $("input[name='file']", jqueryMap.$contractForm).val("");                                     //上传成功后，清空input，然后获取文件列表
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
        };
        $("#contractFileForm", jqueryMap.$contractForm).ajaxSubmit(inputform);
    };

    /**
     * 删除收费附件
     * @param event
     * @param element
     */
    var delContractFile = function (event, element) {
        var id = element.parent().parent().index();                                                                     //当前所点击的元素的下标
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

    /**
     * 获取文件列表
     */
    var getFileList = function () {
        var url = configMap.path + configMap.dataUrl + "/" + configMap.id;
        var type = "GET";
        $.ajax({
            url: url,
            dataType: 'JSON',
            type: type,
            success: function (result) {
                $(".list-group", jqueryMap.$contractForm).html("");                                                 //获取到附件列表后，清空原本的附件列表
                var content = '';
                for (var i = 0; i < result.length; i++) {
                    content += '<li class="list-group-item"><span class="opera" id="' + result[i].id + '">';
                    content += configMap.deleteBtn_html;
                    content += '</span><label class="fonthidden">' + result[i].fjmc + '</label></li>';
                }
                $(".list-group", jqueryMap.$contractForm).append(content);                                          //将获取的附件列表放入页面中
                configMap.filesize = result.length;                                                                    //文件数量
                jqueryMap.$contractForm.find('li').off('click').on('click', function () {                         //点击附件查看详情
                    $("li", jqueryMap.$contractForm).not(this).removeClass("checked");                             //移除除当前点解外的其他点击样式
                    $(this).addClass("checked");                                                                      //为当前点击的添加样式
                    var indexsize = $(this).index();
                    $("#righttwo", jqueryMap.$contractForm).remove();                                               //将文件详情部分remove
                    $("#rightone", jqueryMap.$contractForm).css("display", "none");                              //设置进度条部分为隐藏
                    var rightContent = '';                                                                             //右边部分的页面内容
                    var fileSize = '';                                                                                 //文件大小
                    rightContent += '<div class="col-md-7" id="righttwo" ' +
                        'style="height: 350px;display: block;padding:100px 60px 100px 60px;">';
                    //rightContent += '<div class="row"><div class="col-md-12"><img src=' + result[indexsize].fjcclj + '></div>';
                    rightContent += '<div class="col-md-12">' +
                        '<b style="font-size:20px;word-wrap: break-word;word-break: break-all;">'
                        + result[indexsize].fjmc + '</b></div>';
                    rightContent += '<div class="col-md-12"><span><label>文件类型：</label><label style="color:">'
                        + result[indexsize].fjmc.split(".")[(result[indexsize].fjmc.split(".").length) - 1]
                        + '</span></div>';
                    if (result[indexsize].fjdx < 1048576) {
                        fileSize = (result[indexsize].fjdx / 1024).toFixed(1);
                        fileSize += "KB";
                    } else if (result[indexsize].fjdx >= 1048576) {
                        fileSize = (result[indexsize].fjdx / 1048576).toFixed(1);
                        fileSize += "MB";
                    }
                    rightContent += '<div class="col-md-12"><span><label>文件大小：</label>'
                        + fileSize + '</span></div>';
                    rightContent += '<div class="col-md-12"><span><label>上传时间：</label>'
                        + moment(result[indexsize].lrrq).format('YYYY-MM-DD') + '</span></div>';
                    rightContent += '<div class="col-md-12"><span><label>上传人：</label>'
                        + result[indexsize].lrry + '</span></div>';
                    rightContent += '<div class="col-md-12"><span><a onclick="chargefileAdd.getURL('
                        + '\'' + result[indexsize].fjcclj + '\',' + '\'' + result[indexsize].fjmc + '\','
                        + '\'' + result[indexsize].id + '\'' + ')" name="downloadfile">下载</a></span></div>';
                    rightContent += '</div></div></div>';
                    jqueryMap.$contractForm.append(rightContent);
                });
                if(configMap.filesize > 0){
                	$('[name="inputfile"]').find('span').html("上传附件("+configMap.filesize+")");
                }
                var delContainer = $('[data-type="del"]', jqueryMap.$contractForm);                               //删除按钮
                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delContractFile
                    });
                }
            }
        });
    };
    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            jqueryMap.$contractForm.closest(".modal-content").css("width", "900px");
            jqueryMap.$contractForm.closest(".modal-dialog").css({"cssText":"width:900px !important"});
            jqueryMap.$contractForm.closest(".modal-dialog").css("margin-top", "100px");
            getFileList();                                                                                              //获取附件列表
            jqueryMap.$contractForm.find('[name="submitfilebutton"]').off("click").on("click", function () {
                stopContinueClick('[name="submitfilebutton"]',300);
                savefile();
            });
        },
        getURL: function (plate, filename, id) {
            var data = {
                plate: plate,
                id: id
            };
            $.ajax({
                url: configMap.path + configMap.fileUrl,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function (result) {
                    var name = filename.replace("." + filename.split(".")[filename.split(".").length - 1], "");
                    var a = $("<a></a>").attr("href", result.url).attr("download", name).attr("target", "_blank") //在页面中放入一个a标签，设置下载链接，触发点击事件，然后移除a标签
                        .appendTo("body");
                    a[0].click();
                    a.remove();
                }
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=edit.js