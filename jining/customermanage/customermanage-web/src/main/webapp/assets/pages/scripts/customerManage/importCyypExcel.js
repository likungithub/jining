var setCyypExcel = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        jd: 2,//默认精度为小数点后两位
        id: '',
        wtid:''
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $selectSpgg: null,
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$selectSpgg = $('#importExcelArea'+uuid);
    };

    var showRequest = function () {
        var fileDir = $("#upfile",jqueryMap.$selectSpgg).val();
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
    var importUrl="/ExcelModels/cydYpExcel.xlsx";
    var exportName="抽样单样品模板.xlsx";
    var importDown = function () {
        window.location.href = configMap.path+"/importExcel/downloadExcelModel?importUrl="+importUrl+"&exportName="+exportName;
    }

    var subimtBtn = function (callback) {
        var re = showRequest();
        if (re) {
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在导入数据，请稍候...'
            });
            var form = $("form[id=form1]",jqueryMap.$selectSpgg);
            var options = {
                url: configMap.path+'/importExcel/importCYypExcel/'+configMap.wtid,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    App.unblockUI(jqueryMap.$blockTarget);
                    if (data.success) {
                        $('.custom-alerts').remove();
                        callback(true);
                    } else {
                        App.alert({
                            container: jqueryMap.$selectSpgg.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message:'导入失败!',
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
        init: function (uuid,wtid) {
            setJqueryMap(uuid);
            configMap.wtid=wtid;
            //下载模板
            $('#importDown',jqueryMap.$selectSpgg).off('click').on('click', function () {
                importDown();
            });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },

        // 保存选择的货品信息，参数为回掉函数
        subimtBtn: function (callback) {
            subimtBtn(callback);
        }
    };
}();
