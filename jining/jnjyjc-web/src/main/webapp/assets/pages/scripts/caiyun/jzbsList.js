var JZBS = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        tableDataUrl: '/welcome/findJZBSList',
        JZBSGrid: null,
        yearMonth: '',
        type:'',
        year:'',
        month:''
    };

    // 全局Dom
    var jqueryMap = {
        $JZBSDiv: null,
        $JZBSDataTable: null,
        blockTarget: null
    };

    var setJqueryMap = function () {
        jqueryMap.$JZBSDiv = $('#JZBSDiv');
        jqueryMap.$JZBSDataTable = $('#JZBSData', jqueryMap.$JZBSDiv);
        jqueryMap.blockTarget = jqueryMap.$JZBSDiv.closest(".modal-content");
    };

    //加载数据
    var JZBSTableData = function (data) {
        App.blockUI({
            target: jqueryMap.blockTarget,
            boxed: true,
            message: '正在加载数据...'
        });
        var data = {
            gsmc:'',
            ssny:configMap.year + '' + configMap.month,
            bz:data
        };
        $.ajax({
            url: configMap.path + configMap.tableDataUrl + "/" + configMap.type,
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            data: JSON.stringify(data),
            success: function (result) {
                App.unblockUI(jqueryMap.blockTarget);
                configMap.JZBSGrid.clear().draw();
                configMap.JZBSGrid.rows.add(result).draw();
            }
        });
    }

    //加载数据
    var searchData = function () {
        var gsmc = $('#jzbsListkhmc',jqueryMap.$JZBSDiv).val();//客户名称
        var yearMonth = $('#yearMonth',jqueryMap.$JZBSDiv).val();//年月
        var searchYearMonth = '';
        if (yearMonth != null && yearMonth != '' && yearMonth != 'undefined') {
            searchYearMonth = yearMonth.split("-")[0] + yearMonth.split("-")[1];
            configMap.yearMonth = yearMonth.split("-")[0] + '-' + yearMonth.split("-")[1];
        } else {
            searchYearMonth = configMap.year + '' + configMap.month;
            configMap.yearMonth = configMap.year + '-' + configMap.month;
        }
        var zt = '';
        if (configMap.type == "khjz") {
            zt = $('#selectJZZT',jqueryMap.$JZBSDiv).val();//记账状态
        } else {
            zt = $('#selectBSZT',jqueryMap.$JZBSDiv).val();//报税状态
        }
        App.blockUI({
            target: jqueryMap.blockTarget,
            boxed: true,
            message: '正在加载数据...'
        });
        var data = {
            gsmc:gsmc,
            ssny:searchYearMonth,
            bz:zt
        };

        $.ajax({
            url: configMap.path + configMap.tableDataUrl + "/" + configMap.type,
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            data: JSON.stringify(data),
            success: function (result) {
                App.unblockUI(jqueryMap.blockTarget);
                configMap.JZBSGrid.clear().draw();
                configMap.JZBSGrid.rows.add(result).draw();
            }
        });
    }

    var JZBSTableGrid = function () {
        configMap.JZBSGrid = jqueryMap.$JZBSDataTable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "autoWidth": false,
            "columns": [
                {
                    "data": "gsmc"
                    //'className': 'text-center',
                },
                {
                    "data": "khbm",
                    'className': 'text-center',
                    "render": function (data, type, row) {
                        return configMap.yearMonth;
                    }
                },
                {
                    "data": "bz",
                    'className': 'text-center',
                    "render": function (data, type, row) {
                        if (data == '1') {
                            if (configMap.type == "khjz") {
                                return "已记账";
                            } else {
                                return "已报税";
                            }
                        } else {
                            if (configMap.type == "khjz") {
                                return "未记账";
                            } else {
                                return "未报税";
                            }
                        }
                    }
                }
            ],
            "language": {
                "zeroRecords": "暂时没有客户",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有客户",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
        });
    }

    return {
        // 初始化
        init: function (type,year,month) {
            setJqueryMap();
            configMap.type = type;
            configMap.year = year;
            configMap.month = month;
            configMap.yearMonth = year + "-" +month;
            JZBSTableGrid();

            if(configMap.type == "khjz"){
                if(localStorage.getItem("jzType")){
                    $('#selectJZZT',jqueryMap.$JZBSDiv).val(localStorage.getItem("jzType"));
                }else{
                    $('#selectJZZT',jqueryMap.$JZBSDiv).val("all");
                }
                JZBSTableData(localStorage.getItem("jzType"));
            }else{
                if(localStorage.getItem("bsType")){
                    $('#selectBSZT',jqueryMap.$JZBSDiv).val(localStorage.getItem("bsType"));
                }else{
                    $('#selectBSZT',jqueryMap.$JZBSDiv).val('all');
                }
                JZBSTableData(localStorage.getItem("bsType"));
            }

            $('#JZBSSearch').off('click').on('click', function () {
                searchData();
            });

            $(".yearMonth").datepicker({
                startView: 1,
                minViewMode: 1,
                maxViewMode: 1,
                clearBtn: true,
                format: 'yyyy-mm',
                autoclose: true,
                language: 'zh-CN',
            });
             $('input[id="yearMonth"]').val(moment().format("YYYY-MM"));

            //输入框绑定回车事件
            $('[name="searchKhmc"]',jqueryMap.$JZBSDiv).keydown(function() {//给输入框绑定按键事件
                if(event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
                    $("#JZBSSearch",jqueryMap.$container).click();
                }
            });
        }
    };
}();
//@ sourceURL=edit.js