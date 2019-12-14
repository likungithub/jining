var bgfftjList = function () {
    var configMap = {
        dataUrl: "/bgfftj/queryList",
        bgjlffGrid: null,
        bgffUrl: "/bgfftj/bgff",
        printReport:"/bgfftj/printReport",
        path: ""
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $ManageFrom: null,
        $blockTarget: null,
        $ManageDialog: null,
        $ManageDataTable: null,
    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#' + uuid + '-manager-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ManageDataTable = jqueryMap.$container.find("#bgfftj_ManagerList_m");

    };

    function delnull(d) {
        if (d == undefined) {
            return '';
        }
        if (d == 'null') {
            return '';
        }
        return d;
    }

    var initGrid = function () {
        configMap.bgjlffGrid = jqueryMap.$ManageDataTable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "dataSrc": "aaData",
                "url": configMap.path + configMap.dataUrl,
                "method": "POST",
                "data": function (data) {
                    data.wtid = $("#wtid", jqueryMap.$container).val();
                    data.ypmc = $("#ypmc", jqueryMap.$container).val();
                    data.startDate = $("#date1", jqueryMap.$container).val();
                    data.endDate = $("#date2", jqueryMap.$container).val();
                }
            },

            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="bgfftjche"  value="' + data + '"/>';
                    }
                },
                {
                    "data": "wtid",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "dwmc",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "ypmc",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "bgffrq",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "bgffzt",
                    "render": function (d, t, r) {
                        if (d == "001") {
                            d = "未发放";
                        }
                        if (d == "002") {
                            d = "已发放";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "bz",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
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
            "drawCallback": function () {//加载完数据之后执行
                var tootipContainer = $('[data-toggle="tooltip"]');

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                ;

            }
        });
    }

    //发放按钮
    var ffBtn = function () {
        var ids = [];
        var flag = false;
        $("[name='bgfftjche']:checked", jqueryMap.$container).each(function () {
            var el = $(this);
            var rowIndex = configMap.bgjlffGrid.cell(el.parent()).index().row;
            var id = configMap.bgjlffGrid.row(rowIndex).data().id;
            var bgffzt = configMap.bgjlffGrid.row(rowIndex).data().bgffzt;
            ids.push(id);
            if (bgffzt != '001') {
                flag = true;
                return;
            }
        });
        if (ids.length == 0) {
            Messenger().post({
                message: '请选择发放数据!',
                type: "warning"
            });
            return;
        }
        if (flag) {
            Messenger().post({
                message: '报告已发放，请重新选择发放数据!',
                type: "warning"
            });
            return;
        }
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在保存数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.bgffUrl,
            type: 'POST',
            data: {ids: ids.join(",")},
            success: function (result) {
                if (result.success) {
                    Messenger().post({
                        message: '保存成功',
                        type: "success"
                    });
                } else {
                    Messenger().post({
                        message: '保存失败!',
                        type: "error"
                    });
                }
                configMap.bgjlffGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            },
            error: function () {
                Messenger().post({
                    message: '保存失败!',
                    type: "error"
                });
                configMap.bgjlffGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);

            }
        });
    }
    var report = function () {//领用记录报告
        var ids = [];//定义一个数组
        var flag = false;
        $("[name='bgfftjche']:checked", jqueryMap.$container).each(function () {
            var el = $(this);
            var rowIndex = configMap.bgjlffGrid.cell(el.parent()).index().row;
            var id = configMap.bgjlffGrid.row(rowIndex).data().id;
            var bgffzt = configMap.bgjlffGrid.row(rowIndex).data().bgffzt;
            ids.push(id);
            if (bgffzt != '002') {
                flag = true;
                return;
            }
        });
        if (ids.length == 0) {
            Messenger().post({
                message: '请选择数据!',
                type: "warning"
            });
            return;
        }
        if (flag) {
            Messenger().post({
                message: '报告未发放，请重新选择发放数据!',
                type: "warning"
            });
            return;
        }
        POBrowser.openWindowModeless(configMap.path +configMap.printReport+"?ids="+encodeURI(ids.join(",")), "width=1200px;height=800px");
    }

    //多选
    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            initGrid();
            $("[name='rwfp_checkbox']").on('click', function () {
                if ($("[name='rwfp_checkbox']").prop("checked")) {
                    //选中
                    $("[name='bgfftjche']").prop("checked", true);
                } else {
                    $("[name='bgfftjche']").prop("checked", false);
                }
            });
            jqueryMap.$container.find("#bgfftj_ff").on("click", function () {//报告发放
                ffBtn();
            });
            jqueryMap.$container.find("#bgfftj_cx").on("click", function () {//查询
                configMap.bgjlffGrid.ajax.reload();
            });
            jqueryMap.$container.find("#bgfftj_cz").on("click", function () {//重置
                $("#wtid", jqueryMap.$container).val("");
                $("#ypmc", jqueryMap.$container).val("");
                $("#date1", jqueryMap.$container).val("");
                $("#date2", jqueryMap.$container).val("");
                configMap.bgjlffGrid.ajax.reload();
            });
            jqueryMap.$container.find("#bgfftj_bg").on("click", function () {//报告
                report();
            });
            $("#date1", jqueryMap.$container).datepicker({//绑定时间插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $("#date2", jqueryMap.$container).datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

        },
        setPath: function (path) {
            configMap.path = path;
        }
    }


}();