/**
 * Created by huxinquan on 2017/7/11.
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
var balancesheetEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/balanceSheet',
        groupFlag: '',
        balanceSheetFlag: '',
        customerCode: '',
        importUrl: '/balancesheet/importExcel.jsp',
        $excelDialog: null
    };

    // 全局Dom
    var jqueryMap = {
        $balancesheetForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$balancesheetForm = $('#balancesheetForm');
    };

    var saveBalanceSheet = function (callback) {
        var blockTarget = jqueryMap.$balancesheetForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var data = {
            companyName: jqueryMap.$balancesheetForm.find('input[name=companyName]').val(),
            timeUnit: jqueryMap.$balancesheetForm.find('input[name=timeUnit]').val(),
            principal: jqueryMap.$balancesheetForm.find('input[name=principal]').val(),
            auditor: jqueryMap.$balancesheetForm.find('input[name=auditor]').val(),
            tabulators: jqueryMap.$balancesheetForm.find('input[name=tabulators]').val()
        };
        var dataNumber = [];
        jqueryMap.$balancesheetForm.find('[name=beginData]').each(function () {
            var el = $(this);
            var lineNumber = el.attr('line-number');
            var beginData = el.val();
            var endData = jqueryMap.$balancesheetForm.find('[name=endData][line-number=' + lineNumber + ']').val();
            var tempData = {
                lineNumber: lineNumber,
                amountAtBeginningOfYear: beginData,
                amountAtEndOfPeriod: endData
            };
            dataNumber.push(tempData);
        });

        if (configMap.balanceSheetFlag === '1') {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/updateBalanceSheet2',
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
                        container: jqueryMap.$balancesheetForm.closest(".modal-body"),
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
                url: configMap.path + configMap.dataUrl + '/addBalanceSheet',
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
                        container: jqueryMap.$balancesheetForm.closest(".modal-body"),
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

    var getBalanceSheet = function (groupFlag) {
        if (configMap.balanceSheetFlag === '1') {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/getBalanceSheetByGroupFlag?groupFlag=' + groupFlag,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    jqueryMap.$balancesheetForm.find('input[name=companyName]').val(data[0].companyName);
                    jqueryMap.$balancesheetForm.find('input[name="timeUnit"]').val(moment(data[0].timeUnit).format('YYYY-MM-DD'));
                    for (var i = 0; i < data.length; i++) {
                        var lineNumber = data[i].lineNumber;
                        jqueryMap.$balancesheetForm.find('[name=beginData][line-number=' + lineNumber + ']').val(data[i].amountAtBeginningOfYear.toFixed(2));
                        jqueryMap.$balancesheetForm.find('[name=endData][line-number=' + lineNumber + ']').val(data[i].amountAtEndOfPeriod.toFixed(2));
                    }
                    jqueryMap.$balancesheetForm.find('input[name="principal"]').val(data[0].principal);
                    jqueryMap.$balancesheetForm.find('input[name="auditor"]').val(data[0].auditor);
                    jqueryMap.$balancesheetForm.find('input[name="tabulators"]').val(data[0].tabulators);
                },
                error: function () {
                    bootbox.alert('获取资产负债表失败！');
                }
            });
        }
    };


    var getBalanceSheetbyid = function (groupFlag) {

        $.ajax({
            url: configMap.path + configMap.dataUrl + '/getBalanceSheetByGroupFlag?groupFlag=' + groupFlag,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                jqueryMap.$balancesheetForm.find('input[name=companyName]').val(data[0].companyName);
                jqueryMap.$balancesheetForm.find('input[name="timeUnit"]').val(moment(data[0].timeUnit).format('YYYY-MM-DD'));
                for (var i = 0; i < data.length; i++) {
                    var lineNumber = data[i].lineNumber;
                    jqueryMap.$balancesheetForm.find('[name=beginData][line-number=' + lineNumber + ']').val(data[i].amountAtBeginningOfYear.toFixed(2));
                    jqueryMap.$balancesheetForm.find('[name=endData][line-number=' + lineNumber + ']').val(data[i].amountAtEndOfPeriod.toFixed(2));
                }
                jqueryMap.$balancesheetForm.find('input[name="principal"]').val(data[0].principal);
                jqueryMap.$balancesheetForm.find('input[name="auditor"]').val(data[0].auditor);
                jqueryMap.$balancesheetForm.find('input[name="tabulators"]').val(data[0].tabulators);
            },
            error: function () {
                bootbox.alert('获取资产负债表失败！');
            }
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
        stopContinueClick("#importExcel_balancesheetedit", 300);
        var companyName = jqueryMap.$balancesheetForm.find('input[name=companyName]').val();
        var timeUnit = jqueryMap.$balancesheetForm.find('input[name=timeUnit]').val();
        var principal = jqueryMap.$balancesheetForm.find('input[name=principal]').val();
        var auditor = jqueryMap.$balancesheetForm.find('input[name=auditor]').val();
        var tabulators = jqueryMap.$balancesheetForm.find('input[name=tabulators]').val();
        var param = "?groupFlag=" + encodeURI(configMap.groupFlag) +
            "&balanceSheetFlag=" + configMap.balanceSheetFlag + '&customerCode=' + configMap.customerCode;
        param += "&companyName=" + encodeURI(companyName) + "&timeUnit=" + encodeURI(timeUnit);
        param += "&principal=" + encodeURI(principal) + "&auditor=" + encodeURI(auditor) + "&tabulators=" + tabulators;
        openModal('模板导入', configMap.path + configMap.importUrl + param, 'edit', function () {
            setIncel.subimtBtn(function (result, groupFlag) {
                if (result) {
                    configMap.balanceSheetFlag = '1';
                    getBalanceSheetbyid(groupFlag);
                    jqueryMap.$excelDialog.modal('hide');
                }
            });
        });
    };


    var sumMoney = function () {
        jqueryMap.$balancesheetForm.find('input[name$=Data]').on('focus', function () {
            var el = $(this);
            if (el.val() == '0.00') {
                el.val('');
            }
        });

        jqueryMap.$balancesheetForm.find('input[name$=Data]').on('blur', function () {
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
            var number31BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=1]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number="2"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number="3"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number="4"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number="5"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number="8"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number="9"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number="10"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number="11"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number="12"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number="13"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number="21"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number="24"]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="31"]').val(number31BeginData.toFixed(2));

            var number31EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=1]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number="2"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number="3"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number="4"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number="5"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number="8"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number="9"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number="10"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number="11"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number="12"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number="13"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number="21"]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number="24"]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="31"]').val(number31EndData.toFixed(2));

            var number38BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=32]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=34]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="38"]').val(number38BeginData.toFixed(2));

            var number38EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=32]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=34]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="38"]').val(number38EndData.toFixed(2));

            var number41BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=39]').val() * 100 -
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=40]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="41"]').val(number41BeginData.toFixed(2));

            var number41EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=39]').val() * 100 -
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=40]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="41"]').val(number41EndData.toFixed(2));

            var number43BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=41]').val() * 100 -
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=42]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="43"]').val(number43BeginData.toFixed(2));

            var number43EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=41]').val() * 100 -
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=42]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="43"]').val(number43EndData.toFixed(2));

            var number50BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=43]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=44]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=45]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=46]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="50"]').val(number50BeginData.toFixed(2));

            var number50EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=43]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=44]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=45]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=46]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="50"]').val(number50EndData.toFixed(2));

            var number60BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=51]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=52]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=53]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="60"]').val(number60BeginData.toFixed(2));

            var number60EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=51]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=52]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=53]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="60"]').val(number60EndData.toFixed(2));

            var number67BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=31]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=38]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=50]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=60]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=61]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="67"]').val(number67BeginData.toFixed(2));

            var number67EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=31]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=38]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=50]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=60]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=61]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="67"]').val(number67EndData.toFixed(2));

            var number100BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=68]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=69]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=70]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=71]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=72]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=73]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=74]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=75]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=80]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=81]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=82]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=83]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=86]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=90]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="100"]').val(number100BeginData.toFixed(2));

            var number100EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=68]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=69]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=70]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=71]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=72]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=73]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=74]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=75]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=80]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=81]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=82]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=83]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=86]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=90]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="100"]').val(number100EndData.toFixed(2));

            var number110BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=101]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=102]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=103]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=106]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=108]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="110"]').val(number110BeginData.toFixed(2));

            var number110EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=101]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=102]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=103]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=106]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=108]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="110"]').val(number110EndData.toFixed(2));

            var number114BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=100]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=110]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=111]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="114"]').val(number114BeginData.toFixed(2));

            var number114EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=100]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=110]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=111]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="114"]').val(number114EndData.toFixed(2));

            var number117BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=115]').val() * 100 -
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=116]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="117"]').val(number117BeginData.toFixed(2));

            var number117EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=115]').val() * 100 -
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=116]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="117"]').val(number117EndData.toFixed(2));

            var number122BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=117]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=118]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=119]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=121]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="122"]').val(number122BeginData.toFixed(2));

            var number122EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=117]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=118]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=119]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=121]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="122"]').val(number122EndData.toFixed(2));

            var number135BeginData = (jqueryMap.$balancesheetForm.find('[name=beginData][line-number=114]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=beginData][line-number=122]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=beginData][line-number="135"]').val(number135BeginData.toFixed(2));

            var number135EndData = (jqueryMap.$balancesheetForm.find('[name=endData][line-number=114]').val() * 100 +
                jqueryMap.$balancesheetForm.find('[name=endData][line-number=122]').val() * 100) / 100;
            jqueryMap.$balancesheetForm.find('[name=endData][line-number="135"]').val(number135EndData.toFixed(2));
        });
    };

    return {
        // 初始化
        init: function (groupFlag, balanceSheetFlag, customerCode) {
            configMap.groupFlag = groupFlag;
            configMap.balanceSheetFlag = balanceSheetFlag;
            configMap.customerCode = customerCode;
            setJqueryMap();
            getBalanceSheet(groupFlag);
            sumMoney();

            jqueryMap.$balancesheetForm.find('input[name$=Data]').keyup(function (event) {
                checkMoney($(this), event);
            });

            // 日期控件
            jqueryMap.$balancesheetForm.find('.timeUnit').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            // 正则验证输入姓名是否规范
            jqueryMap.$balancesheetForm.find('[name=principal]').on('blur', function () {
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

            jqueryMap.$balancesheetForm.find('[name=auditor]').on('blur', function () {
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

            jqueryMap.$balancesheetForm.find('[name=tabulators]').on('blur', function () {
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
            $('#importExcel_balancesheetedit', jqueryMap.$balancesheetForm).off().on('click', function () {
                importExcel();
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveBalanceSheet: function (callback) {
            if (jqueryMap.$balancesheetForm.valid()) {
                saveBalanceSheet(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=balancesheetedit.js