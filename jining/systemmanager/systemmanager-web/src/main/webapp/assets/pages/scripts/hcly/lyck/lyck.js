var lyckList = function () {
    var configMap = {
        dataUrl: "/lyck/lyckSeach",
        saveZtUrl: "/lyck/saveCk",
        lyckGrid: null,
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
        jqueryMap.$ManageDataTable = $('#lyck_list', jqueryMap.$container);
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
        configMap.lyckGrid = jqueryMap.$ManageDataTable.DataTable({
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
                    data.hclx=$("[name='hclx']",jqueryMap.$container).val();
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
                }
               /* {
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
                },
                {
                    "data": "lyspr2",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "lysprq2",
                    render: function (d, t, r) {
                        d = delnull(d);
                        d = moment(d).format('YYYY-MM-DD');
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                }*/
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
    var saveZt = function () {
        var ids = [];
        var data = {};
        var lyflag = false;
        jqueryMap.$container.find('[name="check"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.lyckGrid.cell(el.parent()).index().row;
            var id = configMap.lyckGrid.row(rowIndex).data().id;
            var lyzt = configMap.lyckGrid.row(rowIndex).data().lyzt;
            ids.push(id);
            if (lyzt == "004") {
                lyflag = true;
                return;
            }
        });
        if (ids.length == 0) {
            Messenger().post({
                message: "请选择出库数据!",
                type: 'warning'
            });
            return;
        }
        if (lyflag) {
            Messenger().post({
                message: "耗材已出库!",
                type: 'warning'
            });
            return;
        }
        data.ids = ids.join(",");
        $.ajax({
            url: configMap.path + configMap.saveZtUrl,
            type: 'POST',
            data: data,
            success: function (result) {
                if (result.success) {
                    Messenger().post({
                        message: "出库成功",
                        type: 'success'
                    });
                    configMap.lyckGrid.ajax.reload();
                } else {
                    Messenger().post({
                        message: "出库失败!",
                        type: 'error'
                    });
                    configMap.lyckGrid.ajax.reload();
                }
            },
            error: function () {
                Messenger().post({
                    message: "出库失败!",
                    type: 'error'
                });
                configMap.lyckGrid.ajax.reload();
            }
        });

    }
    return {
        inint: function (uuid) {
            setJqueryMap(uuid);
            initGrid();
            jqueryMap.$container.find("#lyck_ck").on("click", function () {//出库
                saveZt();
            });
            jqueryMap.$container.find("#lyck_cx").on("click", function () {//查询
                configMap.lyckGrid.ajax.reload();
            });
            jqueryMap.$container.find("#lyck_cz").on("click", function () {//重置
                $("#hcmc", jqueryMap.$container).val("");
                configMap.lyckGrid.ajax.reload();
            });
            jqueryMap.$container.find("#hcmc").on("change", function () {//条件输入框改变触发事件
                configMap.lyckGrid.ajax.reload();
            });
            $('[name="lyckCheck"]', jqueryMap.$container).on('click', function () {//多选
                if ($('[name="lyckCheck"]', jqueryMap.$container).prop("checked")) {
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