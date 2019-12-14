var hclyglList = function () {
    var configMap = {
        dataUrl: "/hclygl/hclyglSeach",
        lyglGrid: null,
        delUrl:"/hclygl/delLygl",
        ybhcReportUrl: "/hclygl/ybhcReport",
        bzwzReportUrl: "/hclygl/bzwzReport",
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
        jqueryMap.$ManageDataTable = $('#ManagerList', jqueryMap.$container);
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
        configMap.lyglGrid = jqueryMap.$ManageDataTable.DataTable({
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
                    data.hclx = $("[name='hclx']", jqueryMap.$container).val();
                    data.hcmc = $("[name='hcmc']", jqueryMap.$container).val();
                    data.startDate = $("#startDate", jqueryMap.$container).val();
                    data.endDate = $("#endDate", jqueryMap.$container).val();
                },
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (d, t, r) {
                        return '<input type="checkbox" name="che"  value="' + d + '"/>';
                    }

                },
                {
                    "class": "text-center",
                    "data": "hcmc",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "class": "text-center",
                    "data": "gg",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "class": "text-center",
                    "data": "jb",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "class": "text-center",
                    "data": "sccj",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "class": "text-center",
                    "data": "sl",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "class": "text-center",
                    "data": "lysl",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "class": "text-center",
                    "data": "lyr",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "class": "text-center",
                    "data": "lyrq",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        d = moment(d).format('YYYY-MM-DD');
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "class": "text-center",
                    "data": "hclx",
                    "render": function (d, t, r) {
                        if (d == '1') {
                            d = "一般耗材";
                        }
                        if (d == '2') {
                            d = "化学品";
                        }
                        if (d == '3') {
                            d = "易制毒";
                        }
                        if (d == '4') {
                            d = "易制爆";
                        }
                        if (d == '5') {
                            d = "标准物质";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                }
                /*    {
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
                    },*/
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
    // 一般耗材打印 打印报告
    var printReport = function (lx) {
        var ids = [];
        var hclxs = [];
        var notSame = false;
        var url="";
        jqueryMap.$container.find('[name="che"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.lyglGrid.cell(el.parent()).index().row;
            var id = configMap.lyglGrid.row(rowIndex).data().id;
            var hclx = configMap.lyglGrid.row(rowIndex).data().hclx;
            ids.push(id);
            hclxs.push(hclx);
        });
        if (ids.length == 0) {
            Messenger().post({
                message: '请选择操作数据！',
                type: 'warning'
            });
            return;
        }
        ;
        if(lx=="bzwz"){//标准物质类型
            url=configMap.bzwzReportUrl;
        }else {
            url=configMap.ybhcReportUrl;
        }
        /*   var hclx1=hclxs[0];
           for(var i=0;i<hclxs.length;i++){
               if(hclx1!=hclxs[i]){
                   Messenger().post({
                       message: '请选择同一耗材类型！',
                       type: 'warning'
                   });
                   return;
               }
           }*/
        POBrowser.openWindowModeless(configMap.path + url + "?ids=" + encodeURI(ids.join(",")), "width=1200px;height=800px");
    };
    //批量删除
    var delBtn = function () {
        var ids = [];
        jqueryMap.$container.find('[name="che"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.lyglGrid.cell(el.parent()).index().row;
            var id = configMap.lyglGrid.row(rowIndex).data().id;
            var hclx = configMap.lyglGrid.row(rowIndex).data().hclx;
            ids.push(id);
        });
        if (ids.length == 0) {
            Messenger().post({
                message: '请选择操作数据！',
                type: 'warning'
            });
            return;
        };
        bootbox.dialog({
            title: '提示',
            message: '是否要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                     callback: function () {
                        delLygl(ids);
                     }
                },
                cancel: {
                    label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                    className: 'btn btn-default borderRadius4'
                }


            }
        });
    }
    /**陈
     * 删除库存信息
     */
    var delLygl = function (ids) {
        $.ajax({
            url: configMap.path + configMap.delUrl,
            type: 'POST',
            data: {ids:ids.join(",")},
            success: function (result) {
                if (result.success) {
                    Messenger().post({
                        message: "删除成功",
                        type: 'success',
                    });
                } else {
                    Messenger().post({
                        message: "删除失败！",
                        type: 'error',
                    });
                }
                configMap.lyglGrid.ajax.reload();
            },
            error: function () {
                Messenger().post({
                    message: "删除失败！",
                    type: 'error',
                });
                configMap.lyglGrid.ajax.reload();
            }

        });
    }
    return {
        inint: function (uuid) {
            setJqueryMap(uuid);
            initGrid();

            jqueryMap.$container.find("#lyglReport").on("click", function () {//一般耗材试剂打印报告
                printReport("lygl");
            });
            jqueryMap.$container.find("#bzwzReport").on("click", function () {//标准物质打印报告
                printReport("bzwz");
            });
            jqueryMap.$container.find("#lyglSeach").on("click", function () {//查询
                configMap.lyglGrid.ajax.reload();
            });
            jqueryMap.$container.find("#lyglDel").on("click", function () {//查询
               delBtn();
            });
            jqueryMap.$container.find("#lyglReast").on("click", function () {//重置
                $("[name='hcmc']", jqueryMap.$container).val("");
                $("select[name='hclx']", jqueryMap.$container).val("");
                $("#startDate", jqueryMap.$container).val("");
                $("#endDate", jqueryMap.$container).val("");
                configMap.lyglGrid.ajax.reload();
            });
            jqueryMap.$container.find("[name='hclx']").on("change", function () {//下拉触发事件
                configMap.lyglGrid.ajax.reload();
            });
            $('[name="check1"]', jqueryMap.$container).on('click', function () {//多选
                if ($('[name="check1"]', jqueryMap.$container).prop("checked")) {
                    //选中
                    $('[name="che"]', jqueryMap.$container).prop("checked", true);
                } else {
                    $('[name="che"]', jqueryMap.$container).prop("checked", false);
                }
            });
            $("#startDate", jqueryMap.$container).datepicker({//绑定时间插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $("#endDate", jqueryMap.$container).datepicker({//绑定时间插件
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