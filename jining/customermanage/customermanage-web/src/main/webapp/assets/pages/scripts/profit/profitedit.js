/**
 * Created by huxinquan on 2017/7/25.
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
var profitEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/profit',
        profitFlag: '',
        importUrl: '/profit/importExcel.jsp',
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
        $profitForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$profitForm = $('#profitForm');
    };

    var saveProfit = function (callback) {
        var blockTarget = jqueryMap.$profitForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var data = {
            companyName: jqueryMap.$profitForm.find('input[name=companyName]').val(),
            timeUnit: jqueryMap.$profitForm.find('input[name=timeUnit]').val(),
            principal: jqueryMap.$profitForm.find('input[name=principal]').val(),
            auditor: jqueryMap.$profitForm.find('input[name=auditor]').val(),
            tabulators: jqueryMap.$profitForm.find('input[name=tabulators]').val()
        };
        var dataNumber = [];
        jqueryMap.$profitForm.find('[name=monthData]').each(function () {
            var el = $(this);
            var lineNumber = el.attr('line-number');
            var monthData = el.val();
            var yearData = jqueryMap.$profitForm.find('[name=yearData][line-number=' + lineNumber + ']').val();
            var tempData = {
                lineNumber: lineNumber,
                currentMonth: monthData,
                currentYear: yearData
            };
            dataNumber.push(tempData);
        });

        if (configMap.profitFlag === '1') {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/updateProfit',
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
                        container: jqueryMap.$profitForm.closest(".modal-body"),
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
                url: configMap.path + configMap.dataUrl + '/addProfit',
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
                        container: jqueryMap.$profitForm.closest(".modal-body"),
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

    var getProfit = function (groupFlag) {
        if (configMap.profitFlag === '1') {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/getProfitByGroupFlag?groupFlag=' + groupFlag,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    jqueryMap.$profitForm.find('input[name=companyName]').val(data[0].companyName);
                    jqueryMap.$profitForm.find('input[name="timeUnit"]').val(moment(data[0].timeUnit).format('YYYY-MM-DD'));
                    for (var i = 0; i < data.length; i++) {
                        var lineNumber = data[i].lineNumber;
                        jqueryMap.$profitForm.find('[name=monthData][line-number=' + lineNumber + ']').val(data[i].currentMonth.toFixed(2));
                        jqueryMap.$profitForm.find('[name=yearData][line-number=' + lineNumber + ']').val(data[i].currentYear.toFixed(2));
                    }
                    jqueryMap.$profitForm.find('input[name="principal"]').val(data[0].principal);
                    jqueryMap.$profitForm.find('input[name="auditor"]').val(data[0].auditor);
                    jqueryMap.$profitForm.find('input[name="tabulators"]').val(data[0].tabulators);
                },
                error: function () {
                    bootbox.alert('获取利润表失败！');
                }
            });
        }
    };

    var sumMoney = function () {
        jqueryMap.$profitForm.find('input[name$=Data]').on('focus', function () {
            var el = $(this);
            if (el.val() == '0.00') {
                el.val('');
            }
        });

        jqueryMap.$profitForm.find('input[name$=Data]').on('blur', function () {
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
            var number10MonthData = (jqueryMap.$profitForm.find('[name=monthData][line-number=1]').val() * 100 -
                jqueryMap.$profitForm.find('[name=monthData][line-number="4"]').val() * 100 -
                jqueryMap.$profitForm.find('[name=monthData][line-number="5"]').val() * 100) / 100;
            jqueryMap.$profitForm.find('[name=monthData][line-number="10"]').val(number10MonthData.toFixed(2));

            var number10YearData = (jqueryMap.$profitForm.find('[name=yearData][line-number=1]').val() * 100 -
                jqueryMap.$profitForm.find('[name=yearData][line-number="4"]').val() * 100 -
                jqueryMap.$profitForm.find('[name=yearData][line-number="5"]').val() * 100) / 100;
            jqueryMap.$profitForm.find('[name=yearData][line-number="10"]').val(number10YearData.toFixed(2));

            var number18MonthData = (jqueryMap.$profitForm.find('[name=monthData][line-number=10]').val() * 100 +
                jqueryMap.$profitForm.find('[name=monthData][line-number="11"]').val() * 100 -
                jqueryMap.$profitForm.find('[name=monthData][line-number="14"]').val() * 100 -
                jqueryMap.$profitForm.find('[name=monthData][line-number="15"]').val() * 100 -
                jqueryMap.$profitForm.find('[name=monthData][line-number="16"]').val() * 100) / 100;
            jqueryMap.$profitForm.find('[name=monthData][line-number="18"]').val(number18MonthData.toFixed(2));

            var number18YearData = (jqueryMap.$profitForm.find('[name=yearData][line-number=10]').val() * 100 +
                jqueryMap.$profitForm.find('[name=yearData][line-number="11"]').val() * 100 -
                jqueryMap.$profitForm.find('[name=yearData][line-number="14"]').val() * 100 -
                jqueryMap.$profitForm.find('[name=yearData][line-number="15"]').val() * 100 -
                jqueryMap.$profitForm.find('[name=yearData][line-number="16"]').val() * 100) / 100;
            jqueryMap.$profitForm.find('[name=yearData][line-number="18"]').val(number18YearData.toFixed(2));

            var number27MonthData = (jqueryMap.$profitForm.find('[name=monthData][line-number=18]').val() * 100 +
                jqueryMap.$profitForm.find('[name=monthData][line-number="19"]').val() * 100 +
                jqueryMap.$profitForm.find('[name=monthData][line-number="22"]').val() * 100 +
                jqueryMap.$profitForm.find('[name=monthData][line-number="23"]').val() * 100 -
                jqueryMap.$profitForm.find('[name=monthData][line-number="25"]').val() * 100) / 100;
            jqueryMap.$profitForm.find('[name=monthData][line-number="27"]').val(number27MonthData.toFixed(2));

            var number27YearData = (jqueryMap.$profitForm.find('[name=yearData][line-number=18]').val() * 100 +
                jqueryMap.$profitForm.find('[name=yearData][line-number="19"]').val() * 100 +
                jqueryMap.$profitForm.find('[name=yearData][line-number="22"]').val() * 100 +
                jqueryMap.$profitForm.find('[name=yearData][line-number="23"]').val() * 100 -
                jqueryMap.$profitForm.find('[name=yearData][line-number="25"]').val() * 100) / 100;
            jqueryMap.$profitForm.find('[name=yearData][line-number="27"]').val(number27YearData.toFixed(2));

            var number30MonthData = (jqueryMap.$profitForm.find('[name=monthData][line-number=27]').val() * 100 -
                jqueryMap.$profitForm.find('[name=monthData][line-number="28"]').val() * 100) / 100;
            jqueryMap.$profitForm.find('[name=monthData][line-number="30"]').val(number30MonthData.toFixed(2));

            var number30YearData = (jqueryMap.$profitForm.find('[name=yearData][line-number=27]').val() * 100 -
                jqueryMap.$profitForm.find('[name=yearData][line-number="28"]').val() * 100) / 100;
            jqueryMap.$profitForm.find('[name=yearData][line-number="30"]').val(number30YearData.toFixed(2));
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
               
        stopContinueClick("#importExcel_profitedit", 300);
        var companyName = jqueryMap.$profitForm.find('input[name=companyName]').val();
        var timeUnit = jqueryMap.$profitForm.find('input[name=timeUnit]').val();
        var principal = jqueryMap.$profitForm.find('input[name=principal]').val();
        var auditor = jqueryMap.$profitForm.find('input[name=auditor]').val();
        var tabulators = jqueryMap.$profitForm.find('input[name=tabulators]').val();
        var param = "?groupFlag=" + encodeURI(configMap.groupFlag) +
            "&balanceSheetFlag=" + configMap.profitFlag + '&customerCode=' + configMap.customerCode;
        param += "&companyName=" + encodeURI(companyName) + "&timeUnit=" + encodeURI(timeUnit);
        param += "&principal=" + encodeURI(principal) + "&auditor=" + encodeURI(auditor) + "&tabulators=" + tabulators;
        openModal('模板导入', configMap.path + configMap.importUrl + param, 'edit', function () {
            setIncel.subimtBtn(function (result, groupFlag) {
                if (result) {
                           
                    configMap.profitFlag = '1';
                    getProfit(groupFlag);
                    jqueryMap.$excelDialog.modal('hide');
                }
            });
        });
    };


    return {
        // 初始化
        init: function (groupFlag, profitFlag, customerCode) {
            configMap.groupFlag = groupFlag;
            configMap.profitFlag = profitFlag;
            configMap.customerCode = customerCode;
            setJqueryMap();
            getProfit(groupFlag);
            sumMoney();

            jqueryMap.$profitForm.find('input[name$=Data]').keyup(function (event) {
                checkMoney($(this), event);
            });

            // 日期控件
            jqueryMap.$profitForm.find('.timeUnit').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            // 正则验证输入姓名是否规范
            jqueryMap.$profitForm.find('[name=principal]').on('blur', function () {
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

            jqueryMap.$profitForm.find('[name=auditor]').on('blur', function () {
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

            jqueryMap.$profitForm.find('[name=tabulators]').on('blur', function () {
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
            $('#importExcel_profitedit', jqueryMap.$profitForm).off().on('click', function () {
                importExcel();
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveProfit: function (callback) {
            if (jqueryMap.$profitForm.valid()) {
                saveProfit(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=profitedit.js