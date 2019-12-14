var htcxlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        dataUrl: '/htcx/findAllWt',
        htcxGrid: null,
        path: "",
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        chakanBtn_html: '<a href="javascript:;" class="btn btn-xs default htcx_chakan"  data-toggle="tooltip" data-placement="bottom"   name="htcx_chakan" title="查看详情"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>'
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $ManageDataTable: null,
        $ManageDialog: null
    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#htcx' + uuid);
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ManageDataTable = $('#htcx_table', jqueryMap.$container);
    };
    var initGrid = function () {
        configMap.htcxGrid = jqueryMap.$ManageDataTable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.htmc = $("#htcx_htmc", jqueryMap.$container).val();
                    data.dwmc = $("#htcx_dwmc", jqueryMap.$container).val();
                    data.startDate = $("#htcx_startDate", jqueryMap.$container).val();
                    data.endDate = $("#htcx_endDate", jqueryMap.$container).val();
                }
            },
            "columns": [
                {
                    "data": "ID",
                    "render": function (data, type, row) {
                        return configMap.chakanBtn_html;
                    }
                },
                {
                    class: "text-center",
                    "data": "DWMC",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "WTID",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "HTMC",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "LXDH",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "YZBM",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "QTYDSM",
                    "render": function (data, type, row) {
                        if (data == null || data == "") {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "IF_CY",
                    "render": function (d, t, r) {
                        if (d == 1) {
                            d = "抽样";
                        } else {
                            d = "不抽样";
                        }
                        return d;
                    }

                },
                {
                    class: "text-center",
                    "data": "LRRQ",
                    "render": function (data, type, row) {
                        if (data != '' && data != null) {
                            data = moment(data).format('YYYY-MM-DD');
                        } else {
                            data = "";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                }
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands": ",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container).tooltip();
                var chakanContainer = $(".htcx_chakan", jqueryMap.$container);//查看详信息

                if (chakanContainer.length > 0) {
                    chakanContainer.off('click').on('click', chakanBtn);
                }
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

            }
        });
    }


//查看
    var chakanBtn = function () {
        var $el = $(this);
        var rowIndex = configMap.htcxGrid.cell($el.parent()).index().row;
        var wtid = configMap.htcxGrid.row(rowIndex).data().WTID;
        openModal("查看样品详细信息", "customermanage/marketManage/htcx_chakan.jsp?wtid=" + encodeURI(wtid));
    };

    //打开模态框组件

    var openModal = function (title, url) {
        var dialogButtons = {};
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        }

        $.get(url, function (html) {
            jqueryMap.$ManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            initGrid();
            $("#htcx_startDate", jqueryMap.$container).datepicker({//绑定日期插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $("#htcx_endDate", jqueryMap.$container).datepicker({//绑定日期插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            $("#htcx_chaxun", jqueryMap.$container).click(function () {//查询
                configMap.htcxGrid.ajax.reload();
            });
            $("#htcx_reset", jqueryMap.$container).click(function () {//重置
                $("input", jqueryMap.$container).val("");
                configMap.htcxGrid.ajax.reload();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    }
}();
	
	