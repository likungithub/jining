var cgsqList = function () {
    var configMap = {
        dataUrl: "/cgsq/findByNaTy",
        path: "",
        zl: "",
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="cgsqEdit" title="修改申请信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        add_cgsqJsp: "/rjlfhzhgl/hcqjgl/cgsq/add_cgsq.jsp",
        edit_cgsqJsp: "/rjlfhzhgl/hcqjgl/cgsq/edit_cgsq.jsp",
        add_cgsqUrl: "/cgsq/addCgsq",
        edit_cgsqUrl: "/cgsq/updateCgsq",
        del_cgsqUrl: "/cgsq/deleteCgsq",
        importUrl: "/rjlfhzhgl/hcqjgl/cgsq/importCgsqExcel.jsp"
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $ManageDataTable: null,
        $cgsqGrid: null,
        $ManageDialog: null
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

    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#' + uuid + 'cgsq-manager-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ManageDataTable = $('#ManagerList_mcgsq1', jqueryMap.$container);
    };
    var inintGrid = function () {
        jqueryMap.$cgsqGrid = jqueryMap.$ManageDataTable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "method": "POST",
                "data": function (data) {
                    data.hcmc = $('#hcmc', jqueryMap.$container).val();
                    data.startDate = $('#date1', jqueryMap.$container).val();
                    data.endDate = $('#date2', jqueryMap.$container).val();
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
                    render: function (d, t, r) {
                        return configMap.editBtn_html;
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
                    "data": "sqrq",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "shzt",
                    render: function (d, t, r) {
                        if (d == '001') {
                            d = "审核中";
                        }
                        if (d == '002') {
                            d = "审核通过";
                        }
                        if (d == '003') {
                            d = "审核未通过";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "bzzt",
                    render: function (d, t, r) {
                        if (d == '001') {
                            d = "编制中";
                        }
                        if (d == '002') {
                            d = "编制通过";
                        }
                        if (d == '003') {
                            d = "编制未通过";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "sqzt",
                    render: function (d, t, r) {
                        if (d == '001') {
                            d = "申请中";
                        }
                        if (d == '002') {
                            d = "申请通过";
                        }
                        if (d == '003') {
                            d = "申请未通过";
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
                var enditContainer = $("[name='cgsqEdit']", jqueryMap.$container);//修改
                var tootipContainer = $('[data-toggle="tooltip"]');
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                ;
                if (enditContainer.length > 0) {
                    enditContainer.off('click').on('click', updateCgsq)
                }
            }
        });
    }

    /*若参考值不为数字，那可输入任何值*/
    function checkNumber(biaozhun) {
        var reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test(biaozhun)) {
            return true;
        }
        return false;
    }

    //创建模态框
    var openModal = function (title, url, type, func, size) {//打开退还原因模态框
        var dialogButtons = {};
        if (type === 'add') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                }
            };
        }
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                }
            };
        }
        if (type === 'daoru') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666',
        }

        $.get(url, function (html) {
            jqueryMap.$ManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                size: size
            });
        });
    };

    //新增 陈
    var addCgsq = function () {
        openModal('新增采购申请', configMap.path + configMap.add_cgsqJsp + "?zl=" + encodeURI(configMap.zl), "add", function () {
            var data = add_cgsqList.getData();
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在保存数据，请稍候...'
            });
            $.ajax({
                url: configMap.path + configMap.add_cgsqUrl,
                type: 'POST',
                data: data,
                dataType: "json",
                success: function (result) {
                    if (result.success) {
                        Messenger().post({
                            message: '添加成功',
                            type: "success"
                        });
                    } else {
                        Messenger().post({
                            message: '添加失败!',
                            type: "error"
                        });
                    }
                    jqueryMap.$cgsqGrid.ajax.reload();
                    jqueryMap.$ManageDialog.modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);
                },
                error: function () {
                    Messenger().post({
                        message: '添加失败',
                        type: "error"
                    });
                    jqueryMap.$cgsqGrid.ajax.reload();
                    jqueryMap.$ManageDialog.modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);

                }
            });
        }, "large")
    }
    /**
     * 修改数据
     */
    var updateCgsq = function () {
        var el = $(this);
        var rowIndex = jqueryMap.$cgsqGrid.cell(el.parent()).index().row;
        var id = jqueryMap.$cgsqGrid.row(rowIndex).data().id;
        var shzt = jqueryMap.$cgsqGrid.row(rowIndex).data().shzt;
        if (shzt != '001') {
            Messenger().post({
                message: '申请已受理，无法更改!',
                type: "warning"
            });
            return;
        }
        openModal('修改采购申请', configMap.path + configMap.edit_cgsqJsp + "?id=" + encodeURI(id) + "&zl=" + encodeURI(configMap.zl), "edit", function () {
            var data = edit_cgsqList.getData(id);
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在保存数据，请稍候...'
            });
            $.ajax({
                url: configMap.path + configMap.edit_cgsqUrl,
                type: 'POST',
                data: data,
                dataType: "json",
                success: function (result) {
                    if (result.success) {
                        Messenger().post({
                            message: '修改成功',
                            type: "success"
                        });
                    } else {
                        Messenger().post({
                            message: '修改失败!',
                            type: "error"
                        });
                    }
                    jqueryMap.$cgsqGrid.ajax.reload();
                    jqueryMap.$ManageDialog.modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);
                },
                error: function () {
                    Messenger().post({
                        message: '修改失败',
                        type: "error"
                    });
                    jqueryMap.$cgsqGrid.ajax.reload();
                    jqueryMap.$ManageDialog.modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);

                }
            });
        }, "large")
    }
    /**
     * 批量删除
     */
    var deleteCgsq = function () {
        var ids = [];
        jqueryMap.$container.find('[name="che"]:checked').each(function () {
            var el = $(this);
            var rowIndex = jqueryMap.$cgsqGrid.cell(el.parent()).index().row;
            var id = jqueryMap.$cgsqGrid.row(rowIndex).data().id;
            ids.push(id);
        });
        if (ids.length == 0) {
            Messenger().post({
                message: '请选择数据！',
                type: 'warning'
            });
            return;
        } else {
            var data = ids.join(',');
            bootbox.dialog({
                title: '提示',
                message: '确定要删除申请项目？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '正在删除检测项目，请稍候...'
                            });

                            $.ajax({
                                url: configMap.path + configMap.del_cgsqUrl,
                                type: 'POST',
                                data: {ids: data},
                                dataType: "json",
                                success: function (result) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    if (result.success) {
                                        Messenger().post({
                                            message: '删除成功',
                                            type: 'success'
                                        });
                                    } else {
                                        Messenger().post({
                                            message: '删除失败!',
                                            type: 'error'
                                        });
                                    }
                                    jqueryMap.$cgsqGrid.ajax.reload();
                                },
                                error: function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    Messenger().post({
                                        message: '删除失败!',
                                        type: 'error'
                                    });
                                    jqueryMap.$cgsqGrid.ajax.reload();
                                }
                            });
                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            });
        }
    }
//导入Excel表
    var daoru = function () {
        openModal("导入Excel表格", configMap.path + configMap.importUrl, "daoru", function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ManageDialog.modal('hide');
                    jqueryMap.$cgsqGrid.clear().draw();
                    jqueryMap.$cgsqGrid.ajax.reload();
                }
            });
        }, null);
    }

    return {
        inint: function (uuid, zl) {
            setJqueryMap(uuid);
            configMap.zl = zl;//种类   bzwz标准物质  ybhc一般耗材
            inintGrid();
            jqueryMap.$container.find("#cgsqCncgsqCn").on("click", function () {//查询
                jqueryMap.$cgsqGrid.ajax.reload();
            });
            jqueryMap.$container.find("#cgsqCz").on("click", function () {//重置
                $("#hcmc", jqueryMap.$container).val("");
                $("#date1", jqueryMap.$container).val("");
                $("#date2", jqueryMap.$container).val("");
                jqueryMap.$cgsqGrid.ajax.reload();
            });
            jqueryMap.$container.find("#xz").on("click", function () {//新增
                addCgsq();
            });
            jqueryMap.$container.find("#cgsqSc").on("click", function () {//删除
                deleteCgsq();
            });
            jqueryMap.$container.find("#cgsqDaoRu").on("click", function () {//导入excel表
                daoru();
            });
            jqueryMap.$container.find("#sqzt").on("change", function () {//下拉触发事件
                jqueryMap.$cgsqGrid.ajax.reload();
            });
            $('[name="check"]', jqueryMap.$container).on('click', function () {
                if ($('[name="check"]', jqueryMap.$container).prop("checked")) {
                    //选中
                    $('[name="che"]', jqueryMap.$container).prop("checked", true);
                } else {
                    $('[name="che"]', jqueryMap.$container).prop("checked", false);
                }
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