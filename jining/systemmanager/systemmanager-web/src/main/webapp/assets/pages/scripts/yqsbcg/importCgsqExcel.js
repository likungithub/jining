var setInExcel = function () {
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

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$selectSpgg = $('#importExcelAreaYqcgsq');
    };

    var showRequest = function () {
        var fileDir = $("#upYqcgsqFile").val();
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
        window.location.href = "/systemmanager/yqsbcg/downloadYqcgsqExcel";
    }

    var subimtBtn = function (callback) {
        var re = showRequest();
        if (re) {
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在导入数据，请稍候...'
            });
            var form = $("form[id=formyqsbcgsq]");
            var options = {
                url: '/systemmanager/yqsbcg/importYqsbcgsqExcel',
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    App.unblockUI(jqueryMap.$blockTarget);
                    $('.custom-alerts').remove();
                    App.alert({
                        container: jqueryMap.$selectSpgg.closest(".modal-body"),
                        place: 'prepend',
                        type: 'success',
                        message: data.info,
                        icon: 'fa fa-warning'
                    });
                    callback(true);
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
        init: function (type) {
            setJqueryMap();
            configMap.type = type;

            //下载模板
            $('#importDown').off('click').on('click', function () {
                importDown();
            });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        },

        // 保存选择的货品信息，参数为回掉函数
        subimtBtn: function (callback) {
            subimtBtn(callback);
        }
    };
}();
