var SWSB = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        tableDataUrl: '/systemmanager/ptnssb/ptnssb',
        updateDataUrl: '/systemmanager/ptnssb/updatePtnssb',
        SWSBGrid: null,
        id: ''
    };

    // 全局Dom
    var jqueryMap = {
        $SWSBDiv: null,
        $SWSBDataTable: null,
        blockTarget: null
    };

    var setJqueryMap = function () {
        jqueryMap.$SWSBDiv = $('#SWSBDiv');
        jqueryMap.$SWSBDataTable = $('#SWSBData', jqueryMap.$SWSBDiv);
        jqueryMap.blockTarget = jqueryMap.$SWSBDiv.closest(".modal-content");
    };

    var SWSBdel = function (e) {
        var el = $(e);
        var rowIndex = configMap.SWSBGrid.cell(el.parent()).index().row;
        var id = configMap.SWSBGrid.row(rowIndex).data().id;
        bootbox.dialog({
            title: '提示',
            message: '确定撤回吗？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url: configMap.path + configMap.updateDataUrl + "/" + id,
                            dataType: 'JSON',
                            type: 'PUT',
                            success: function (result) {
                                configMap.SWSBGrid.row(rowIndex).remove().draw(false);
                                //SWSBTableData();
                                welcome.GetFourModelData();
                            }
                        });
                    }
                },
                cancel: {
                    label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                    className: 'btn-default'
                }
            }
        });

    }

    /**
     * 标记申报
     */
    var SWSBcheck = function (e) {
        var el = $(e);
        var rr = el.parent().parent();
        var skje = rr.find(".swtx").val(); //input的value值
        var rowIndex = configMap.SWSBGrid.cell(el.parent()).index().row;
        var khbm = configMap.SWSBGrid.row(rowIndex).data().khbm;
        var id = configMap.SWSBGrid.row(rowIndex).data().id;
        var bsq = configMap.SWSBGrid.row(rowIndex).data().bsq;
        var zsxmMc = configMap.SWSBGrid.row(rowIndex).data().zsxmMc;
        if (skje == null || skje == "" || typeof(skje) == "undefined") {
            Messenger().post({
                message: '请输入税款！',
                type: 'error'
            });
        } else {
            var data = {
                id: id,
                skje: skje,
                khbm: khbm,
                bsq: bsq,
                zsxmMc: zsxmMc
            };
            $.ajax({
                url: configMap.path + configMap.updateDataUrl,
                dataType: 'JSON',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                data:JSON.stringify(data),
                success: function (result) {
                    if (result.success) {
                        configMap.SWSBGrid.row(rowIndex).remove().draw(false);
                        //SWSBTableData();
                        Messenger().post({
                            message: result.messgae,
                            type: 'success'
                        });
                        welcome.GetFourModelData();
                    }
                }
            });
        }
    }

    //加载数据
    var SWSBTableData = function () {
        var selectSBZQ = $('#selectSBZQ').val();//申报周期
        var selectSBZT = $('#selectSBZT').val();//申报状态
        //var ifAll = '0'; //默认只能看到自己的客户
        App.blockUI({
            target: jqueryMap.blockTarget,
            boxed: true,
            message: '正在加载数据...'
        });
//    	if($('#khhpgtj').length === 1){ //该div存在，具有全部客户的税务提醒权限(派工按钮)，看到全部
//    		ifAll = '1';
//    	} //反之只有自己分配的客户的税务提醒权
        $.ajax({
            url: configMap.path + configMap.tableDataUrl + "/" + selectSBZQ + "/" + selectSBZT,
            //+ "/" + ifAll,
            dataType: 'JSON',
            type: 'GET',
            success: function (result) {
                App.unblockUI(jqueryMap.blockTarget);
                configMap.SWSBGrid.clear().draw();
                configMap.SWSBGrid.rows.add(result).draw();
            }
        });
    }

    var SWSBTableGrid = function () {
        configMap.SWSBGrid = jqueryMap.$SWSBDataTable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "autoWidth": false,
            "columns": [
                {"data": "id"},
                {
                    "data": "yhmc",
                    'className': 'text-center',
                },
                {
                    "data": "zsxmDm",
                    'className': 'text-center',
                },
                {
                    "data": "zsxmMc",
                    'className': 'text-center',
                },
                {
                    "data": "sbzqDm",
                    'className': 'text-center',
                },
                {
                    "data": "sbzqMc",
                    'className': 'text-center',
                },
                {
                    "data": "bsq",
                    'className': 'text-center',
                },
                {
                    "data": "bsr",
                    'className': 'text-center',
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            return "";
                        } else {
                            return moment(data).format('YYYY-MM-DD');
                        }
                    }
                },
                {"data": "bsl"},
                {
                    "data": "skje",
                    "render": function (data, type, row) {
                        if (row.bszt == true) { //已报税
                            return '<input onKeypress="return (\/\[\\d\.\]\/.test(String.fromCharCode(event.keyCode)))" readOnly="readOnly" class="swtx table-cell-style" style="text-align: right;width:100px;border: 0.5px solid #dadada;" type="text" value="' + data + '"/>';
                        } else { //未报税
                            if (data == 0 || data == "0" || data == null) {
                                return '<input onKeypress="return (\/\[\\d\.\]\/.test(String.fromCharCode(event.keyCode)))" class="swtx table-cell-style" style="text-align: right;width:100px;border: 0.5px solid #dadada;" type="text" value=""/>';
                            } else {
                                return '<input onKeypress="return (\/\[\\d\.\]\/.test(String.fromCharCode(event.keyCode)))" class="swtx table-cell-style" style="text-align: right;width:100px;border: 0.5px solid #dadada;" type="text" value="' + data + '"/>';
                            }
                        }

                    }
                },
                {
                    "data": "bszt",
                    'className': 'text-center',
                    "render": function (data, type, row) {
                        if (data == true) {
                            return "已申报";
                        } else {
                            return "未申报";
                        }
                    }
                },
                {
                    "data": "bszt",
                    'className': 'text-center',
                    "render": function (data, type, row) {
                        if (data == true) {
                            if ($('#khhnssb').length === 1) { //该div存在，具有按钮的操作权限
                                return "<div class='SWSBback' style='cursor:pointer;'><i class='icon iconfont icon-bianji iconFontColor-10a0f7 iconFontSize'></i>撤销</div>";
                            } else {
                                return "<div style='cursor:pointer;' title='无操作权限'><i class='icon iconfont icon-bianji style='color: #888888 !important;' iconFontSize'></i></div>";
                            }
                        } else {
                            if ($('#khhnssb').length === 1) { //该div存在，具有按钮的操作权限
                                return "<div class='SWSBbjsb' style='cursor:pointer;'><i class='icon iconfont icon-bianji iconFontColor-10a0f7 iconFontSize'></i>标记申报</div>";
                            } else {
                                return "<div style='cursor:pointer;' title='无操作权限'><i class='icon iconfont icon-bianji style='color: #888888 !important;' iconFontSize'></i></div>";
                            }
                        }
                    }
                },
                {
                    "data": "khbm",
                    'className': 'text-center',
                }
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [2],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [4],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [12],
                    "visible": false,
                    "searchable": false
                }
            ],
            "drawCallback": function () { // 数据加载完成后执行
                $('.SWSBback').off('click').on('click', function () {
                    SWSBdel(this);
                });

                $('.SWSBbjsb').off('click').on('click', function () {
                    SWSBcheck(this);
                });
            }
        });
    }

    return {
        // 初始化
        init: function () {
            setJqueryMap();

            SWSBTableGrid();
            SWSBTableData();
            $('#SWSBSearch').off('click').on('click', function () {
                SWSBTableData();
            });

            $(".SWSBSELECT").select2({
                minimumResultsForSearch: Infinity, //隐藏查询
                width: '100%',
                allowClear: false,
                language: 'zh-CN'
            });
        }
    };
}();
//@ sourceURL=edit.js