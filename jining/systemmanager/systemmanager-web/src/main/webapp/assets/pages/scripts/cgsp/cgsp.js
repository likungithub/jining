var cgspList = function () {
    'use strict';

    var prefix = '/cgsp';

    // 全局属性参数
    var configMap = {
        path: '',
        uuid: '',
        dataUrl: '/' + prefix + '/cgspSeach',
        updateUrl: '/' + prefix + '/updateData',
        addUrl: '/' + prefix + '/add',

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

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $container: null,
        $ManageDataTable: null,
        $cgspGrid: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$container = $('#' + uuid + 'cgsp-manager-container');
        jqueryMap.$ManageDataTable = $('#ManagerList_cgsp', jqueryMap.$container);
    };
    var initGridcgsp = function () {
        jqueryMap.$cgspGrid = jqueryMap.$ManageDataTable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "dataSrc": "aaData",
                "url": "/systemmanager/cgsp/cgspSeach",
                "method": "POST",
                "data": function (data) {
                    data.hcmc = $("#hcmc", jqueryMap.$container).val();
                    data.hclx = $("[name='hclx']", jqueryMap.$container).val();
                    data.sqzt = $("#sqzt", jqueryMap.$container).val();
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="che"  value="' + data + '"/>';
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
                    "data": "dj",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "zj",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "sccj",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "cgmd",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "sqr",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "sqrq",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },

                {
                    "data": "sqzt",
                    render: function (d, t, r) {
                        if (d == '001') {
                            d = "审请中";
                        }
                        if (d == '002') {
                            d = "审请通过";
                        }
                        if (d == '003') {
                            d = "审请未通过";
                        }
                        if (d == '004') {
                            d = "已采购";
                        }
                        if (d == '005') {
                            d = "已入库";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "hclx",
                    render: function (d, t, r) {
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
                },

                {
                    "data": "bz",
                    render: function (d, t, r) {
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

    /**
     * 审批操作
     */
    var saveZt = function (zt) {
        var ids = [];
        var url = "";
        var data = {};
        var flag=false;
        jqueryMap.$container.find('[name="che"]:checked').each(function () {
            var el = $(this);
            var rowIndex = jqueryMap.$cgspGrid.cell(el.parent()).index().row;
            var id = jqueryMap.$cgspGrid.row(rowIndex).data().id;
            var sqzt=jqueryMap.$cgspGrid.row(rowIndex).data().sqzt;
            ids.push(id);
            if(sqzt!="001"){
                flag=true;
                return;
            }
        });
        if (ids.length == 0) {
            Messenger().post({
                message: '请选择提交数据!',
                type: 'warning'
            });
            return;
        };
        if(flag){
            Messenger().post({
                message: '请勿重复提交数据!',
                type: "warning"
            });
            return;
        };
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在保存数据，请稍候...'
        });
        if (zt == "002") {
            url = "/systemmanager/cgsp/sptg";
        }
        ;
        if (zt == "003") {
            url = "/systemmanager/cgsp/spth";
        }
        ;
        data.ids = ids.join(",");
        data.zt = zt;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function (data) {
                if (data.success) {
                    Messenger().post({
                        message: '保存成功',
                        type: 'success'
                    });
                } else {
                    Messenger().post({
                        message: '保存失败!',
                        type: 'error'
                    });
                }
                jqueryMap.$cgspGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            },
            error: function () {
                Messenger().post({
                    message: '保存失败!',
                    type: 'error'
                });
                jqueryMap.$cgspGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    }

    /**
     * 退回操作
     */
    var cgspSpth = function () {
        var ids = [];
        jqueryMap.$container.find('[name="che"]:checked').each(function () {
            var el = $(this);
            var rowIndex = jqueryMap.$cgspGrid.cell(el.parent()).index().row;
            var id = jqueryMap.$cgspGrid.row(rowIndex).data().id;
            ids.push(id);
        });
        if (ids.length == 0) {
            Messenger().post({
                message: '请选择提交数据!',
                type: 'warning'
            });
            return;
        } else {
            $.ajax({
                url: "",
                type: 'POST',
                data: {ids: ids.join(",")},
                success: function (data) {
                    if (data.success) {
                        Messenger().post({
                            message: '保存成功',
                            type: 'success'
                        });
                        jqueryMap.$cgspGrid.ajax.reload();
                    } else {
                        Messenger().post({
                            message: '保存失败!',
                            type: 'error'
                        });
                        jqueryMap.$cgspGrid.ajax.reload();
                    }
                },
                error: function () {
                    Messenger().post({
                        message: '保存失败!',
                        type: 'error'
                    });
                    jqueryMap.$cgspGrid.ajax.reload();
                }
            });
        }
    }

    return {
        inint: function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap(uuid);
            initGridcgsp();
            jqueryMap.$container.find("#cgspSeach").on("click", function () {//查询
                jqueryMap.$cgspGrid.ajax.reload();
            })
            jqueryMap.$container.find("#cgspReset").on("click", function () {//重置
                $("#hcmc", jqueryMap.$container).val("");
                jqueryMap.$cgspGrid.ajax.reload();
            })
            jqueryMap.$container.find("#cgspSptg").on("click", function () {//审批通过
                saveZt("002");
            })
            jqueryMap.$container.find("#cgspSpth").on("click", function () {//审批退回
                saveZt("003");
            })
            jqueryMap.$container.find("#sqzt").on("change", function () {//下拉触发事件
                jqueryMap.$cgspGrid.ajax.reload();
            })

            $('[name="ckcgsp"]', jqueryMap.$container).on('click', function () {
                if ($('[name="ckcgsp"]', jqueryMap.$container).prop("checked")) {
                    //选中
                    $('[name="che"]', jqueryMap.$container).prop("checked", true);
                } else {
                    $('[name="che"]', jqueryMap.$container).prop("checked", false);
                }
            });

        },
        setPath: function (path) {
            configMap.path = path;
        }
    }
}();
