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
        jqueryMap.$selectSpgg = $('#importExcelArea');
    };

    var showRequest = function () {
        var fileDir = $("#upfile").val();
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
        window.location.href = "/customermanage/zfwt/downExcel/" + configMap.type;
    }

    var subimtBtn = function (callback) {
        console.log("11");
        var re = showRequest();
        if (re) {
            console.log("进入了");
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在导入数据，请稍候...'
            });
            var form = $("form[id=form1]");
            var options = {
                url: configMap.path+'/customermanage/zfwt/importydywtExcel1',
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    console.log("导入成功");
                    App.unblockUI(jqueryMap.$blockTarget);
                    if (data.success) {
                        $('.custom-alerts').remove();
                        callback(true);
                    } else {
                        App.alert({
                            container: jqueryMap.$selectSpgg.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: '导入成功!',
                            icon: 'fa fa-warning'
                        });
                        callback(false);
                    }
                },
                error: function () {
                    console.log("dao入失败");
                    App.unblockUI(jqueryMap.$blockTarget);
                    App.alert({
                        container: jqueryMap.$selectSpgg.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '导入失败了！',
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
