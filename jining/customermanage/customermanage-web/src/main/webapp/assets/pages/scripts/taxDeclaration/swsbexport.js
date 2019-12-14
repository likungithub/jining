var exportSwsbExport = function () {
    //'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        uploadUrl: '/customermanage/ptswsb/exportswsb',
        swjlx:'001'
    };
    // 全局Dom
    var jqueryMap = {
        $swsbExportEditForm: null,
        $swsbExportDialog:null
    };

    var setJqueryMap = function () {
        jqueryMap.$swsbExportEditForm = $('#swsb-export-con');
    };









    var save = function (callback) {
        var blockTarget = jqueryMap.$swsbExportEditForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在导入数据...'
        });
        var interest = '';
        var selectedInterests = $('input[name="interest"]:checked');
        _.forEach(selectedInterests, function (value) {
            interest += value.value + ';';
        });
        if(configMap.swjlx=='001') {//目前只做国税导入
            if($("#swsb-export-con .gs-con #exportSwsbGs").val()!=''){//判断有没有上传文件
                var formData = new FormData();
                formData.append("uploadFile", document.getElementById("exportSwsbGs").files[0]);
                formData.append("swjlx",configMap.swjlx);
                $.ajax({
                    url: configMap.path+configMap.uploadUrl,
                    type: "POST",
                    data: formData,
                    /**
                     *必须false才会自动加上正确的Content-Type
                     */
                    contentType: false,
                    /**
                     * 必须false才会避开jQuery对 formdata 的默认处理
                     * XMLHttpRequest会对 formdata 进行正确的处理
                     */
                    processData: false,
                    success: function (data) {
                        console.info(data);
                        App.unblockUI(blockTarget);
                        if(data.success)
                        {
                            callback(true);
                        }else{
                            App.alert({
                                container: jqueryMap.$swsbExportEditForm.closest(".modal-body"),
                                place: 'prepend',
                                type: 'danger',
                                message: data.msg,
                                icon: 'fa fa-warning'
                            });
                            callback(false);
                        }
                    },
                    error: function () {
                        App.unblockUI(blockTarget);
                        App.alert({
                            container: jqueryMap.$swsbExportEditForm.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: '上传失败！',
                            icon: 'fa fa-warning'
                        });
                        callback(false);
                    }
                });
            }else{
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$swsbExportEditForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '请选择你要上传的excel表格文件！',
                    icon: 'fa fa-warning'
                });
            }

        }else if(configMap.swjlx=='002'){//地税导入
            App.unblockUI(blockTarget);
            callback(false);
        }else {//国地税联合导入
            App.unblockUI(blockTarget);
            callback(false);
        }




    };


    return {
        // 初始化
        init: function () {
            setJqueryMap();
            $("#swsb-export-con .swjlx").off('click').on('click',function () {
                var type=$(this).val();//报税停类型
                if(type=='001') {
                    $("#swsb-export-con .gs-con").show();
                    $("#swsb-export-con .ds-con").hide();
                    $("#swsb-export-con .gds-con").hide();
                    configMap.swjlx="001";
                }else if(type=='002'){
                    $("#swsb-export-con .gs-con").hide();
                    $("#swsb-export-con .ds-con").show();
                    $("#swsb-export-con .gds-con").hide();
                    configMap.swjlx="002";
                }else if(type=='003') {
                    $("#swsb-export-con .gs-con").hide();
                    $("#swsb-export-con .ds-con").hide();
                    $("#swsb-export-con .gds-con").show();
                    configMap.swjlx="003";
                }
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        },
        // 保存雇员信息，参数为回掉函数
        save: function (callback) {

            save(callback);
        }
    };
}();