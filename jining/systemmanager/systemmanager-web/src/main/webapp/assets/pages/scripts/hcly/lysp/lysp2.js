var lysp2List = function () {
    var configMap = {
        dataUrl: "/lysp/lysp2Seach",
        saveZtUrl: "/lysp/saveZt2",
        lysp2Grid: null,
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
        jqueryMap.$ManageDataTable = $('#lysp2_list', jqueryMap.$container);
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
        configMap.lysp2Grid = jqueryMap.$ManageDataTable.DataTable({
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
                    data.hcmc = $("[name='hcmc']", jqueryMap.$container).val();
                },
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (d, t, r) {
                        return '<input type="checkbox" name="check"  value="' + d + '"/>';
                    }
                },
                {
                    "data": "hcmc",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "gg",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "jb",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "sl",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "lysl",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "lyr",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "lyrq",
                    render: function (d, t, r) {
                        d = delnull(d);
                        d = moment(d).format('YYYY-MM-DD');
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "lyzt",
                    render: function (d, t, r) {
                        if (d == '001') {
                            d = "申请中";
                        }
                        if (d == '002') {
                            d = "申请通过";
                        }
                        if (d == '003') {
                            d = "申请退回";
                        }
                        if (d == '004') {
                            d = "已出库";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "lyspr1",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "lysprq1",
                    render: function (d, t, r) {
                        d = delnull(d);
                        d = moment(d).format('YYYY-MM-DD');
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
                var xxContainer = $('[data-toggle="tooltip"]');//显示详细

                if (xxContainer.length > 0) {
                    xxContainer.tooltip();
                }

            }
        });

    }
    /**陈
     *  通过和退回操作
     */
    var saveZt = function (lx) {
        var ids = [];
        var data = {};
        jqueryMap.$container.find('[name="check"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.lysp2Grid.cell(el.parent()).index().row;
            var id = configMap.lysp2Grid.row(rowIndex).data().id;
            ids.push(id);
        });
        if (ids.length == 0) {
            Messenger().post({
                message: "请选择提交数据!",
                type: 'warning'
            });
            return;
        } else {
            data.ids = ids.join(",");
            data.lx = lx;
            $.ajax({
                url:configMap.path+configMap.saveZtUrl,
                type: 'POST',
                data: data,
                success: function (result) {
                    if (result.success) {
                        Messenger().post({
                            message: "保存成功",
                            type: 'success'
                        });
                        configMap.lysp2Grid.ajax.reload();
                    } else {
                        Messenger().post({
                            message: "保存失败!",
                            type: 'error'
                        });
                        configMap.lysp2Grid.ajax.reload();
                    }
                },
                error: function () {
                    Messenger().post({
                        message: "保存失败!",
                        type: 'error'
                    });
                    configMap.lysp2Grid.ajax.reload();
                }
            });
        }
    }
    return {
        inint: function (uuid) {
            setJqueryMap(uuid);
            initGrid();
            jqueryMap.$container.find("#lysp2_tg").on("click", function () {//通过
                saveZt("001");
            });
            jqueryMap.$container.find("#lysp2_th").on("click", function () {//退回
                saveZt("002");
            });
            jqueryMap.$container.find("#lysp2_cx").on("click", function () {//查询
                configMap.lysp2Grid.ajax.reload();
            });
            jqueryMap.$container.find("#lysp2_cz").on("click", function () {//重置
                $("input", jqueryMap.$container).val("");
                configMap.lysp2Grid.ajax.reload();
            });
            jqueryMap.$container.find("[name='hcmc']").on("change", function () {//条件输入框改变触发事件
                configMap.lysp2Grid.ajax.reload();
            });
            $('[name="lyspCheck"]', jqueryMap.$container).on('click', function () {//多选
                if ($('[name="lyspCheck"]', jqueryMap.$container).prop("checked")) {
                    //选中
                    $('[name="check"]', jqueryMap.$container).prop("checked", true);
                } else {
                    $('[name="check"]', jqueryMap.$container).prop("checked", false);
                }
            });

        },
        setPath: function (path) {
            configMap.path = path;
        }
    }
}();