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

/*global $, App, moment, jQuery, bootbox, financialinformationEdit */
var financialInformation;
financialInformation = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UniqueID: '',
        customerCode: '',
        customerCompany: '',
        dataUrl: '/financialInformation',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        financialinformationGrid: null,
        searchFinancialInformation: '',
        zcfzbPageUrl: '/balancesheet/balancesheetedit.jsp',
        lrbPageUrl: '/profit/profitedit.jsp',
        xjllbPageUrl: '/cashflowstatements/cashflowstatementsedit.jsp',
        zcfzbBtn_html: '<a href="javascript:;" class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="zcfzb" data-toggle="tooltip" title="资产负债表">资产负债表</a>',
        lrbBtn_html: '<a href="javascript:;" class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="lrb" data-toggle="tooltip" title="利润表">利润表</a>',
        xjllbBtn_html: '<a href="javascript:;" class="btn btn-xs btnBlue btnBorderColor colorfff borderRadius4" data-type="xjllb" data-toggle="tooltip" title="现金流量表">现金流量表</a>',
        groupFlag: '',
        writeFlag: ''
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $financialinformationDialog: null,
        $financialInformation: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$financialInformation = $('#financialInformation_' + configMap.UniqueID);
    };

    var initFinancialInformationData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/getFinancialInformationByCustomerCode?customerCode=' + configMap.customerCode,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.financialinformationGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.financialinformationGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var openModal = function (title, url, type) {
        var dialogButtons = {};

        if (type === 'editZcfzb') {
            dialogButtons.success = {
                label: "<i class='fa fa-save'></i>保存",
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    balancesheetEdit.saveBalanceSheet(function (result) {
                        if (result) {
                            changeState();
                            jqueryMap.$financialinformationDialog.modal('hide');
                        }
                    });

                    return false;
                }
            };
        } else if (type === 'editLrb') {
            dialogButtons.success = {
                label: "<i class='fa fa-save'></i>保存",
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    profitEdit.saveProfit(function (result) {
                        if (result) {
                            changeState();
                            jqueryMap.$financialinformationDialog.modal('hide');
                        }
                    });

                    return false;
                }
            };
        } else if (type === 'editXjllb') {
            dialogButtons.success = {
                label: "<i class='fa fa-save'></i>保存",
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    cashflowstatementsEdit.saveCashFlowStatements(function (result) {
                        if (result) {
                            changeState();
                            jqueryMap.$financialinformationDialog.modal('hide');
                        }
                    });

                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: "<i class='fa fa-times'></i>关闭",
            className: 'btn btn borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$financialinformationDialog = bootbox.dialog({
                className: 'common-pro-modal',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var editZcfzb = function () {
        var el = $(this);
        var rowIndex = configMap.financialinformationGrid.cell(el.parent()).index().row;
        configMap.groupFlag = configMap.financialinformationGrid.row(rowIndex).data().groupFlag;
        var balanceSheetFlag = configMap.financialinformationGrid.row(rowIndex).data().balanceSheetFlag;
        configMap.writeFlag = 1;
        openModal('编辑资产负债表', configMap.path + configMap.zcfzbPageUrl + "?groupFlag=" + encodeURI(configMap.groupFlag) +
            "&balanceSheetFlag=" + balanceSheetFlag + '&customerCode=' + configMap.customerCode, 'editZcfzb');
    };

    var editLrb = function () {
        var el = $(this);
        var rowIndex = configMap.financialinformationGrid.cell(el.parent()).index().row;
        configMap.groupFlag = configMap.financialinformationGrid.row(rowIndex).data().groupFlag;
        var profitFlag = configMap.financialinformationGrid.row(rowIndex).data().profitFlag;
        configMap.writeFlag = 2;
        openModal('编辑利润表', configMap.path + configMap.lrbPageUrl + "?groupFlag=" + encodeURI(configMap.groupFlag) +
            "&profitFlag=" + profitFlag + '&customerCode=' + configMap.customerCode, 'editLrb');
    };

    var editXjllb = function () {
        var el = $(this);
        var rowIndex = configMap.financialinformationGrid.cell(el.parent()).index().row;
        configMap.groupFlag = configMap.financialinformationGrid.row(rowIndex).data().groupFlag;
        var cashFlowStatementsFlag = configMap.financialinformationGrid.row(rowIndex).data().cashFlowStatementsFlag;
        configMap.writeFlag = 3;
        openModal('编辑现金流量表', configMap.path + configMap.xjllbPageUrl + "?groupFlag=" + encodeURI(configMap.groupFlag) +
            "&cashFlowStatementsFlag=" + cashFlowStatementsFlag + '&customerCode=' + configMap.customerCode, 'editXjllb');
    };

    var initFinancialInformationGrid = function () {
        configMap.financialinformationGrid = jqueryMap.$financialInformation.find('#financialinformation_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "columns": [
                {"data": "customerCompany"},
                {
                    "data": "balanceSheetFlag",
                    "render": function (data, type, row) {
                        if (data == '1') {
                            return "<span class='colorBlue-10a0f7'>√</span>";
                        } else {
                            return '';
                        }
                    }
                },
                {
                    "data": "profitFlag",
                    "render": function (data, type, row) {
                        if (data == '1') {
                            return "<span class='colorBlue-10a0f7'>√</span>";
                        } else {
                            return '';
                        }
                    }
                },
                {
                    "data": "cashFlowStatementsFlag",
                    "render": function (data, type, row) {
                        if (data == '1') {
                            return "<span class='colorBlue-10a0f7'>√</span>";
                        } else {
                            return '';
                        }
                    }
                },
                {
                    "data": "timeUnit",
                    "render": function (data, type, row) {
                        return moment(data).format('YYYY年MM月');
                    }
                },
                {
                    "render": function (data, type, row) {
                        return configMap.zcfzbBtn_html + configMap.lrbBtn_html + configMap.xjllbBtn_html;
                    }
                }
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$financialInformation);
                var zcfzbContainer = $('[data-type="zcfzb"]', jqueryMap.$financialInformation);
                var lrbContainer = $('[data-type="lrb"]', jqueryMap.$financialInformation);
                var xjllbContainer = $('[data-type="xjllb"]', jqueryMap.$financialInformation);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (zcfzbContainer.length > 0) {
                    zcfzbContainer.off('click').on('click', editZcfzb);
                }

                if (lrbContainer.length > 0) {
                    lrbContainer.off('click').on('click', editLrb);
                }

                if (xjllbContainer.length > 0) {
                    xjllbContainer.off('click').on('click', editXjllb);
                }
            }
        });
    };

    var msg = null;

    var addFinancialInformation = function () {
        jqueryMap.$financialInformation.find('#btnNew').off('click').on('click', function () {
            var selectTime = jqueryMap.$financialInformation.find('[name=selectTime]').val();
            if (selectTime === '') {
                $(".messenger-close").trigger("click");

                //App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: "请选择日期!",
                    type: 'warning',
                    id: 'changeTime'
                });
                $(".messenger-close").hide();
                return false;

            } else if (new Date(selectTime + '-01'.replace(/\-/g, "\/")) >= new Date()) {
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: "还未到编辑时间!",
                    type: 'error',
                    id: 'timeIsNotOver'
                });

            } else {
                $.ajax({
                    url: configMap.path + configMap.dataUrl + '/getFinancialInformationByTime?selectTime=' + selectTime + "&customerCode=" + configMap.customerCode,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function (data) {
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (data.length > 0) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            Messenger().post({
                                message: "该月报表已经存在!",
                                type: 'error',
                                id: 'alreadyExists'
                            });
                        } else {
                            $.ajax({
                                url: configMap.path + configMap.dataUrl + '/addFinancialInformation',
                                type: 'POST',
                                data: {
                                    "customerCode": configMap.customerCode,
                                    "customerCompany": configMap.customerCompany,
                                    "selectTime": selectTime
                                },
                                dataType: 'JSON',
                                success: function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    initFinancialInformationData();
                                },
                                error: function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                }
                            });
                        }
                    },
                    error: function () {
                        return App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            }
        });
    };

    var changeState = function () {
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/updateWriteSigns?groupFlag=' + configMap.groupFlag + "&writeFlag=" + configMap.writeFlag,
            type: 'PUT',
            dataType: 'JSON',
            success: function () {
                initFinancialInformationData();
            }
        });
    };

    var queryData = function () {
        jqueryMap.$financialInformation.find('#btnSearch').off('click').on('click', function () {
            var beginTime = jqueryMap.$financialInformation.find('input[name=beginTime]').val();
            var endTime = jqueryMap.$financialInformation.find('input[name=endTime]').val();
            //var searchText = encodeURIComponent(jqueryMap.$financialInformation.find('#searchText').val());
            if (beginTime === '' && endTime === '') {
                initFinancialInformationData();
            } else if (beginTime === '' || endTime === '') {
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: "查询条件输入不完整!",
                    type: 'error',
                    id: 'infoIncomplete'
                });
            } else if (new Date(beginTime + '-01'.replace(/\-/g, "\/")) > new Date(endTime + '-01'.replace(/\-/g, "\/"))) {
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: "时间格式输入错误!",
                    type: 'error',
                    id: 'timeFormatError'
                });
            } else {
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/getFinancialInformationByQueryData",
                    dataType: 'JSON',
                    data: {
                        'beginTime': beginTime,
                        'endTime': endTime,
                        'customerCode': configMap.customerCode
                    },
                    type: 'GET',
                    success: function (datas) {
                        configMap.financialinformationGrid.clear().draw();
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (datas.length > 0) {
                            return configMap.financialinformationGrid.rows.add(datas).draw();
                        }
                    },
                    error: function () {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            }
        });
    };

    var resetSearchTime = function () {
        jqueryMap.$financialInformation.find('#btnReset').off('click').on('click', function () {
            jqueryMap.$financialInformation.find('[name=beginTime]').val(moment().format('YYYY-MM'));
            jqueryMap.$financialInformation.find('[name=endTime]').val(moment().format('YYYY-MM'));
            initFinancialInformationData();
        });
    };

    return {
        init: function (UniqueID, customerCode, customerCompany) {
            configMap.UniqueID = UniqueID;
            configMap.customerCode = customerCode;
            configMap.customerCompany = customerCompany;
            setJqueryMap();

            var tabid = $('#financialInformation_' + configMap.UniqueID).parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);
            initFinancialInformationGrid();
            initFinancialInformationData();
            addFinancialInformation();
            queryData();
            resetSearchTime();

            // 日期控件
            jqueryMap.$financialInformation.find('.selectTime').datepicker({
                format: 'yyyy-mm',
                todayBtn: true,
                autoclose: true,
                startView: 1,
                minViewMode: 1,
                maxViewMode: 1,
                forceParse: false,
                language: 'zh-CN'
            });
            jqueryMap.$financialInformation.find('[name=selectTime]').val(moment().format('YYYY-MM'));

            jqueryMap.$financialInformation.find('.beginTime').datepicker({
                format: 'yyyy-mm',
                todayBtn: true,
                autoclose: true,
                startView: 1,
                minViewMode: 1,
                maxViewMode: 1,
                forceParse: false,
                language: 'zh-CN'
            });
            jqueryMap.$financialInformation.find('[name=beginTime]').val(moment().format('YYYY-MM'));

            jqueryMap.$financialInformation.find('.endTime').datepicker({
                format: 'yyyy-mm',
                todayBtn: true,
                autoclose: true,
                startView: 1,
                minViewMode: 1,
                maxViewMode: 1,
                forceParse: false,
                language: 'zh-CN'
            });
            jqueryMap.$financialInformation.find('[name=endTime]').val(moment().format('YYYY-MM'));
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=financialinformation.js