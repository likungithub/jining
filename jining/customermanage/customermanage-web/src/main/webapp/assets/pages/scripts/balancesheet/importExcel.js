var setIncel = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        jd: 2,//默认精度为小数点后两位
        id: '',
        groupFlag: "333",
        companyName: "companyName",
        timeUnit: "2017-10-13",
        principal: "principal",
        auditor: "auditor",
        tabulators: "tabulators",
        customerCode: "customerCode"
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
        window.location.href = "/customermanage/balanceSheet/downExcel";
    }

    var subimtBtn = function (callback) {
        var re = showRequest();
          

        if (re) {
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在导入数据，请稍候...'
            });
            var form = $("form[id=form1]");
            var options = {
                url: '/customermanage/balanceSheet/importExcel',
                type: 'post',
                dataType: 'json',
                data: {
                    'groupFlag': configMap.groupFlag,
                    'companyName': configMap.companyName,
                    'timeUnit': configMap.timeUnit,
                    'principal': configMap.principal,
                    'auditor': configMap.auditor,
                    'tabulators': configMap.tabulators,
                    'customerCode': configMap.customerCode
                },
                success: function (data) {
                      
                    App.unblockUI(jqueryMap.$blockTarget);
                    if (data.success) {
                        $('.custom-alerts').remove();
                        callback(true, configMap.groupFlag);
                    } else {
                        App.alert({
                            container: jqueryMap.$selectSpgg.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: data.message,
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
        init: function (groupFlag, balanceSheetFlag, customerCode, companyName, timeUnit, principal, auditor, tabulators) {
            configMap.groupFlag = groupFlag;
            configMap.balanceSheetFlag = balanceSheetFlag;
            configMap.customerCode = customerCode;
            configMap.companyName = companyName;
            configMap.timeUnit = timeUnit;
            configMap.principal = principal;
            configMap.auditor = auditor;
            configMap.tabulators = tabulators;
            setJqueryMap();

            //下载模板
            $('#importDown').off('click').on('click', function () {
                importDown();
            });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        },


        subimtBtn: function (callback) {
            subimtBtn(callback);
        }
    };
}();
