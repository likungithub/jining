var setInKcglExcel = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        jd: 2,//默认精度为小数点后两位
        type: ''
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $selectSpgg: null,
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$selectSpgg = $('#importExcelArea' + uuid);
    };

    var showRequest = function () {
        var fileDir = $("#upfile", jqueryMap.$selectSpgg).val();
        var suffix = fileDir.substr(fileDir.lastIndexOf("."));
        if ("" == fileDir) {

            App.alert({
                container: jqueryMap.$selectSpgg.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '选择需要导入的Excel文件！',
                icon: 'fa fa-warning'
            });
            return false;
        }
        else if (".xls" != suffix && ".xlsx" != suffix) {

            App.alert({
                container: jqueryMap.$selectSpgg.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '选择.xls格式的文件导入！',
                icon: 'fa fa-warning'
            });
            return false;
        } else {
            return true;
        }
    }

    /**
     * 下载模板
     */
    var importDown = function () {
        window.location.href = "/systemmanager/kcgl/downloadKcglExcel";
    }

    var subimtBtn = function (callback) {
        var re = showRequest();
        if (re) {
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在导入数据，请稍候...'
            });
            var form = $("form[id=form1]", jqueryMap.$selectSpgg);
            var options = {
                url: '/systemmanager/kcgl/importKcglExcel',
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    App.unblockUI(jqueryMap.$blockTarget);
                    $('.custom-alerts').remove();
                    if(data.success){
                        App.alert({
                            container: jqueryMap.$selectSpgg.closest(".modal-body"),
                            place: 'prepend',
                            type: 'success',
                            message:"导入成功",
                            icon: 'fa fa-success'
                        });
                        callback(true);
                    }else {
                        App.alert({
                            container: jqueryMap.$selectSpgg.closest(".modal-body"),
                            place: 'prepend',
                            type: 'error',
                            message:"导入失败!",
                            icon: 'fa fa-warning'
                        });
                        callback(false);
                    }

                },
                error: function () {
                    App.unblockUI(jqueryMap.$blockTarget);
                    App.alert({
                        container: jqueryMap.$selectSpgg.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '导入失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            };
            form.ajaxSubmit(options);
        } else {
            callback(false);
        }
    }


    return {
        // 初始化
        init: function (type, uuid) {
            setJqueryMap(uuid);
            configMap.type = type;

            //下载模板
            $('#importDown').off('click').on('click', function () {
                importDown();
            });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path =path;
        },

        // 保存选择的货品信息，参数为回掉函数
        subimtBtn: function (callback) {
            subimtBtn(callback);
        }
    };
}();
