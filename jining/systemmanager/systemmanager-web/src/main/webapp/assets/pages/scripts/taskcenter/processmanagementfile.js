
/*global $, App, moment, jQuery, bootbox, _ */
var processfiles = function () {

    // 全局属性参数
    var configMap = {
        path: '',
        savefileUrl: '/processManage/addProcessfile',
        getFileUrl: '/processManage/queryjbxxfj',
        delFileUrl: '/processManage/deleteLcglfjcclj',
        paymentUrl: '/contract/payment',
        id: '',
        contractGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" data-placement="bottom" title="删除附件"><i class="icon iconfont icon-shanchu"></i></a>',
        jsonMap: null,
        get: null,
        schedule: '/ptkhxx/schedule',
        filesize: '',
        uuid: '',
        fileUrl: '/ptkhxx/getfileurl',
        lcid:localStorage.getItem("lcid"),
        cxlcid:localStorage.getItem("cxlcid")
    };
    var jsonMap = {
        payService: []
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractForm: null,
        $setimg: null

    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#processFileAdd');
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
        }else
        if ($("input[name='file']", jqueryMap.$contractForm)[0].files[0].size >= 5242880) {
            App.unblockUI(blockTarget);
            AppAlert('请上传指定大小以内的文件（单个文件5M以内，单个图片3M以内）！');
            return;
        }
        var url = configMap.path + configMap.savefileUrl;
        // url = url + "/" + configMap.uuid;
        if(localStorage.getItem("cxlcid")!==""&&localStorage.getItem("cxlcid")!==null){
            var inputform = {
                url: url+"?lcid="+localStorage.getItem("cxlcid"),
                type: "POST",
                dataType: 'json',
                headers: {"ClientCallMode": "ajax"}, //添加请求头部,
                beforeSend: function () {
                    $("#righttwo").remove();
                    $("#rightone").css("display", "block");
                    $("#schedule", jqueryMap.$productForm).css("display", "block");
                    // configMap.get = window.setInterval(getSchedule, "500");
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
                        if(configMap.lcid==""){
                            localStorage.setItem("lcid",data.lcid);
                            configMap.lcid = data.lcid;
                        }else{
                            configMap.lcid = localStorage.getItem("lcid");
                        }
                        if(configMap.lcid!==""){
                            getFileList(configMap.lcid);
                        }else if(configMap.cxlcid!==""){
                            getFileList(configMap.cxlcid);
                        }
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
        }else{
            var inputform = {
                url: url+"?lcid="+configMap.lcid,
                type: "POST",
                dataType: 'json',
                headers: {"ClientCallMode": "ajax"}, //添加请求头部,
                beforeSend: function () {
                    $("#righttwo").remove();
                    $("#rightone").css("display", "block");
                    $("#schedule", jqueryMap.$productForm).css("display", "block");
                    // configMap.get = window.setInterval(getSchedule, "500");
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
                        if(configMap.lcid==""){
                            localStorage.setItem("lcid",data.lcid);
                            configMap.lcid = data.lcid;
                        }else{
                            configMap.lcid = localStorage.getItem("lcid");
                        }
                        if(configMap.lcid!==""){
                            getFileList(configMap.lcid);
                        }else if(configMap.cxlcid!==""){
                            getFileList(configMap.cxlcid);
                        }
                        Messenger().post({
                            message: '附件上传成功',
                            type: 'success'
                        });
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
        }

        $("#contractFileForm").ajaxSubmit(inputform);
    };
    var getFileList = function (data) {
        if(data==null){
            return;
        }else{
            var url = configMap.path + configMap.getFileUrl+"/"+data;
            var type = "GET";
            $.ajax({
                url: url,
                dataType: 'JSON',
                type: type,
                success: function (result) {
                    $(".list-group li").remove();
                    // $(".list-group", jqueryMap.$contractForm).html("");
                    var content = '';
                    for (var i = 0; i < result.length; i++) {
                        content += '<li class="list-group-item"><span class="opera" data="'+result[i].fjcclj+'" id="' + result[i].id + '">' + configMap.deleteBtn_html + '</span>' + result[i].fjmc + '</li>';
                    }
                    $(".list-group", jqueryMap.$contractForm).append(content);
                    var delContainer = $('[data-type="del"]', jqueryMap.$contractForm);
                    if (delContainer.length > 0) {
                        delContainer.confirmation({
                            "title": '确定要删除？',
                            "btnOkLabel": '是',
                            "btnCancelLabel": '否',
                            "placement": 'left',
                            "onConfirm": dellcFile
                        });
                    }
                },
            });
        }

        
    };
    var dellcFile = function (event, element) {
        var id = element.parent().attr("id")
        var fileURL = element.parent().attr("data")
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.delFileUrl + "/" + id+"?fjcclj="+fileURL,
            type: 'post',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    if(configMap.lcid!==""){
                        getFileList(configMap.lcid);
                    }else if(configMap.cxlcid!==""){
                        getFileList(configMap.cxlcid);
                    }
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
        init: function () {
            //获取附件
            if(configMap.lcid!==""){
                getFileList(configMap.lcid);
            }else if(configMap.cxlcid!==""){
                getFileList(configMap.cxlcid);
            }else{
                getFileList(" ");
            }
            setJqueryMap();
            //设置页面样式
            jqueryMap.$contractForm.closest(".modal-content").css("width", "500px");
            jqueryMap.$contractForm.closest(".modal-dialog").css("width", "500px");
            jqueryMap.$contractForm.closest(".modal-body").attr("style", "padding:15px 15px 0px 15px");
            jqueryMap.$contractForm.find('[id="contractFileForm"]').find(".form-body").attr("style", "padding:0px 15px 0px 15px");
            jqueryMap.$contractForm.closest(".modal-dialog").css("margin-top", "100px");
            jqueryMap.$contractForm.find('[name="submitfilebutton"]').off("click").on("click", function () {
                stopContinueClick('[name="submitfilebutton"]',300);
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