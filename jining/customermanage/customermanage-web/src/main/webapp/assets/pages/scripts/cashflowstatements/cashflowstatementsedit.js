/**
 * Created by huxinquan on 2017/7/17.
 */
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
var cashflowstatementsEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/cashFlowStatements',
        cashFlowStatementsFlag: '',
        importUrl: '/cashflowstatements/importExcel.jsp',
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
        $cashflowstatementsForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$cashflowstatementsForm = $('#cashflowstatementsForm');
    };

    var saveCashFlowStatements = function (callback) {
        var blockTarget = jqueryMap.$cashflowstatementsForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var data = {
            companyName: jqueryMap.$cashflowstatementsForm.find('input[name=companyName]').val(),
            timeUnit: jqueryMap.$cashflowstatementsForm.find('input[name=timeUnit]').val(),
            principal: jqueryMap.$cashflowstatementsForm.find('input[name=principal]').val(),
            auditor: jqueryMap.$cashflowstatementsForm.find('input[name=auditor]').val(),
            tabulators: jqueryMap.$cashflowstatementsForm.find('input[name=tabulators]').val()
        };
        var dataNumber = [];
        jqueryMap.$cashflowstatementsForm.find('[name=money]').each(function () {
            var el = $(this);
            var lineNumber = el.attr('line-number');
            var moneyData = el.val();
            var tempData = {
                lineNumber: lineNumber,
                money: moneyData
            };
            dataNumber.push(tempData);
        });

        if (configMap.cashFlowStatementsFlag === '1') {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/updateCashFlowStatements',
                type: 'POST',
                data: {
                    "params": JSON.stringify(dataNumber),
                    "groupFlag": configMap.groupFlag,
                    "companyName": data.companyName,
                    "timeUnit": data.timeUnit,
                    "principal": data.principal,
                    "auditor": data.auditor,
                    "tabulators": data.tabulators,
                    "customerCode": configMap.customerCode
                },
                dataType: 'JSON',
                success: function () {
                    App.unblockUI(blockTarget);
                    callback(true);
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$cashflowstatementsForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            });
        } else {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/addCashFlowStatements',
                type: 'POST',
                data: {
                    "params": JSON.stringify(dataNumber),
                    "groupFlag": configMap.groupFlag,
                    "companyName": data.companyName,
                    "timeUnit": data.timeUnit,
                    "principal": data.principal,
                    "auditor": data.auditor,
                    "tabulators": data.tabulators,
                    "customerCode": configMap.customerCode
                },
                dataType: 'JSON',
                success: function () {
                    App.unblockUI(blockTarget);
                    callback(true);
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$cashflowstatementsForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            });
        }
    };

    var getCashFlowStatements = function (groupFlag) {
        if (configMap.cashFlowStatementsFlag === '1') {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/getCashFlowStatementsByGroupFlag?groupFlag=' + groupFlag,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    jqueryMap.$cashflowstatementsForm.find('input[name=companyName]').val(data[0].companyName);
                    jqueryMap.$cashflowstatementsForm.find('input[name="timeUnit"]').val(moment(data[0].timeUnit).format('YYYY-MM-DD'));
                    for (var i = 0; i < data.length; i++) {
                        var lineNumber = data[i].lineNumber;
                        jqueryMap.$cashflowstatementsForm.find('[name=money][line-number=' + lineNumber + ']').val(data[i].money.toFixed(2));
                    }
                    jqueryMap.$cashflowstatementsForm.find('input[name="principal"]').val(data[0].principal);
                    jqueryMap.$cashflowstatementsForm.find('input[name="auditor"]').val(data[0].auditor);
                    jqueryMap.$cashflowstatementsForm.find('input[name="tabulators"]').val(data[0].tabulators);
                },
                error: function () {
                    bootbox.alert('获取现金流量表失败！');
                }
            });
        }
    };

    var sumMoney = function () {
        jqueryMap.$cashflowstatementsForm.find('input[name=money]').on('focus', function () {
            var el = $(this);
            if (el.val() == '0.00') {
                el.val('');
            }
        });

        jqueryMap.$cashflowstatementsForm.find('input[name=money]').on('blur', function () {
            var el = $(this);

            if (el.val() === '-' || el.val() === '') {
                el.val('0.00');
            }

            var number = new Number(el.val());

            // 补齐2位小数
            el.val(number.toFixed(2));

            // 判断金额是否超过12位
            if (el.val().split('.')[0].length > 12 || el.val().split('.')[1].length > 2) {
                el.val('0.00');
                Messenger().post({
                    message: '金额不能超过12位',
                    type: 'error',
                    id: 'moneyError'
                });
            }

            // 计算总金额
            var number21Data = (jqueryMap.$cashflowstatementsForm.find('[name=money][line-number=9]').val() * 100 -
                jqueryMap.$cashflowstatementsForm.find('[name=money][line-number=20]').val() * 100) / 100;
            jqueryMap.$cashflowstatementsForm.find('[name=money][line-number="21"]').val(number21Data.toFixed(2));

            var number37Data = (jqueryMap.$cashflowstatementsForm.find('[name=money][line-number=29]').val() * 100 -
                jqueryMap.$cashflowstatementsForm.find('[name=money][line-number=36]').val() * 100) / 100;
            jqueryMap.$cashflowstatementsForm.find('[name=money][line-number="37"]').val(number37Data.toFixed(2));

            var number54Data = (jqueryMap.$cashflowstatementsForm.find('[name=money][line-number=44]').val() * 100 -
                jqueryMap.$cashflowstatementsForm.find('[name=money][line-number=53]').val() * 100) / 100;
            jqueryMap.$cashflowstatementsForm.find('[name=money][line-number="54"]').val(number54Data.toFixed(2));
        });
    };

    var openModal = function (title, url, type, func) {

        var dialogButtons = {
            cancel: {
                label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                className: 'btn-default'
            }
        };

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn-primary",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        $.get(url, function (html) {

            jqueryMap.$excelDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });

    };


    var importExcel = function () {
        stopContinueClick("#importExcel_cashflowstatementsedit", 300);
        var companyName = jqueryMap.$cashflowstatementsForm.find('input[name=companyName]').val();
        var timeUnit = jqueryMap.$cashflowstatementsForm.find('input[name=timeUnit]').val();
        var principal = jqueryMap.$cashflowstatementsForm.find('input[name=principal]').val();
        var auditor = jqueryMap.$cashflowstatementsForm.find('input[name=auditor]').val();
        var tabulators = jqueryMap.$cashflowstatementsForm.find('input[name=tabulators]').val();
        var param = "?groupFlag=" + encodeURI(configMap.groupFlag) +
            "&balanceSheetFlag=" + configMap.cashFlowStatementsFlag + '&customerCode=' + configMap.customerCode;
        param += "&companyName=" + encodeURI(companyName) + "&timeUnit=" + encodeURI(timeUnit);
        param += "&principal=" + encodeURI(principal) + "&auditor=" + encodeURI(auditor) + "&tabulators=" + tabulators;
        openModal('模板导入', configMap.path + configMap.importUrl + param, 'edit', function () {
            setIncel.subimtBtn(function (result, groupFlag) {
                if (result) {
                       
                    configMap.cashFlowStatementsFlag = '1';
                    getCashFlowStatements(groupFlag);
                    jqueryMap.$excelDialog.modal('hide');
                }
            });
        });
    };


    return {
        // 初始化
        init: function (groupFlag, cashFlowStatementsFlag, customerCode) {
            configMap.groupFlag = groupFlag;
            configMap.cashFlowStatementsFlag = cashFlowStatementsFlag;
            configMap.customerCode = customerCode;
            setJqueryMap();
            getCashFlowStatements(groupFlag);
            sumMoney();

            jqueryMap.$cashflowstatementsForm.find('input[name=money]').keyup(function (event) {
                checkMoney($(this), event);
            });

            // 日期控件
            jqueryMap.$cashflowstatementsForm.find('.timeUnit').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            // 正则验证输入姓名是否规范
            jqueryMap.$cashflowstatementsForm.find('[name=principal]').on('blur', function () {
                var reg = /^([\u4e00-\u9fa5·s]{1,20}|[a-zA-Z.s]{1,20})$/;
                if (!reg.test($(this).val())) {
                    Messenger().post({
                        message: '单位负责人名称输入不规范',
                        type: 'warning',
                        id: 'nameError'
                    });
                    $(this).val('');
                }
            });

            jqueryMap.$cashflowstatementsForm.find('[name=auditor]').on('blur', function () {
                var reg = /^([\u4e00-\u9fa5·s]{1,20}|[a-zA-Z.s]{1,20})$/;
                if (!reg.test($(this).val())) {
                    Messenger().post({
                        message: '审核人名称输入不规范',
                        type: 'warning',
                        id: 'nameError'
                    });
                    $(this).val('');
                }
            });

            jqueryMap.$cashflowstatementsForm.find('[name=tabulators]').on('blur', function () {
                var reg = /^([\u4e00-\u9fa5·s]{1,20}|[a-zA-Z.s]{1,20})$/;
                if (!reg.test($(this).val())) {
                    Messenger().post({
                        message: '制表人名称输入不规范',
                        type: 'warning',
                        id: 'nameError'
                    });
                    $(this).val('');
                }
            });
            //导入
            $('#importExcel_cashflowstatementsedit', jqueryMap.$cashflowstatementsForm).off().on('click', function () {
                importExcel();
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveCashFlowStatements: function (callback) {
            if (jqueryMap.$cashflowstatementsForm.valid()) {
                saveCashFlowStatements(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=cashflowstatementsedit.js