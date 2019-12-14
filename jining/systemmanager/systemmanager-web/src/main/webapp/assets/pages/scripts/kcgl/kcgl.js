var kcglList = function () {
    var configMap = {
        dataUrl: "/kcgl/kcglSeach",
        delUrl: "/kcgl/delKcgl",
        updateUrl: "/kcgl/updateKcgl",
        edit_kcglJsp: "/rjlfhzhgl/hcqjgl/kcgl/edit_kcgl.jsp",
        setCyKcsl: "/kcgl/setCyKcsl",
        addNumJsp: "/rjlfhzhgl/hcqjgl/kcgl/addCykcsl.jsp",
        chekKcsl: "/kcgl/checkKcsl",
        importUrl: "/rjlfhzhgl/hcqjgl/kcgl/importKcglExcel.jsp",
        printReportUrl:"/kcgl/printReport",
        kcglGrid: null,
        zl: "",
        cykcsl: "",
        path: "",
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="kcglEdit" title="修改耗材信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="kcglDel" title="删除耗材信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>'
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $ManageFrom: null,
        $blockTarget: null,
        $ManageDialog: null,
        $ManageDataTable: null,
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
        jqueryMap.$container = $('#' + uuid + 'kcglManager-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ManageDataTable = $('#ManagerList_Kcgllist', jqueryMap.$container);
    };
    var initGrid = function () {
        configMap.kcglGrid = jqueryMap.$ManageDataTable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "scrollX": true,//水平滚动
            "ajax": {
                "dataSrc": "aaData",
                "url": configMap.path + configMap.dataUrl,
                "method": "POST",
                "data": function (data) {
                    data.hcmc = $('#hcmc', jqueryMap.$container).val();
                    data.startDate = $('#rkrq_startDate', jqueryMap.$container).val();
                    data.endDate = $('#rkrq_endDate', jqueryMap.$container).val();
                    data.hclx = $("[name='hclx']", jqueryMap.$container).val();
                },
            },
            "columns": [
                {
                    "data": "id",
                    render: function (d, t, r) {
                        return '<input type="checkbox" name="check" value="' + d + '"/>';
                    }

                },
                {
                    class: "text-center",
                    render: function (d, t, r) {
                        var btn = ""
                        btn = btn + configMap.deleBtn_html + configMap.editBtn_html
                        return btn;
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
                    "data": "cykcsl",
                    render: function (d, t, r) {
                        d = delnull(d);
                        if (d == null || d == "") {
                            d = 0;
                        }
                        configMap.cykcsl = d;
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "sl",
                    render: function (d, t, r) {
                        d = delnull(d);
                        if (d == null || d == "") {
                            d = 0;
                        }
                        if (parseInt(configMap.cykcsl) > parseInt(d)) {
                            return '<span style=" color:red; display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                        } else {
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                        }

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
                    "data": "cfwz",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "rkrq",
                    render: function (d, t, r) {
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
                var delContainer = $("[name='kcglDel']", jqueryMap.$container);//删除
                var editContainer = $("[name='kcglEdit']", jqueryMap.$container);//修改

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if (delContainer.length > 0) {
                    delContainer.off("click").on("click", delBtn);
                }
                if (editContainer.length > 0) {
                    editContainer.off("click").on("click", editBtn);
                }

            }
        });
    }
    /**陈
     *删除按钮
     */
    var delBtn = function () {
        var el = $(this);
        var rowIndex = configMap.kcglGrid.cell(el.parent()).index().row;
        var id = configMap.kcglGrid.row(rowIndex).data().id;
        bootbox.dialog({
            title: '提示',
            message: '是否要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        delkcgl(id);
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
    var delkcgl = function (id) {
        $.ajax({
            url: configMap.path + configMap.delUrl,
            type: 'POST',
            data: {id: id},
            success: function (result) {
                if (result.success) {
                    configMap.kcglGrid.ajax.reload();
                    Messenger().post({
                        message: "删除成功",
                        type: 'info',
                        id: "kcgl"
                    });
                } else {
                    Messenger().post({
                        message: "删除失败！",
                        type: 'error',
                        id: "kcgl"
                    });
                }
            },
            error: function () {
                Messenger().post({
                    message: "删除失败！",
                    type: 'error',
                    id: "kcgl"
                });
            }
        });
    }
    /**陈
     * 修改按钮
     */
    var editBtn = function () {
        //显示模态框
        var el = $(this);
        var rowIndex = configMap.kcglGrid.cell(el.parent()).index().row;
        var id = configMap.kcglGrid.row(rowIndex).data().id;
        openModal('修改库存信息', configMap.path + configMap.edit_kcglJsp + "?id=" + encodeURI(id) + "&zl=" + encodeURI(configMap.zl), "edit", function () {
            var data = edit_kcglList.getData(id);
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在保存数据，请稍候...'
            });
            $.ajax({
                url: configMap.path + configMap.updateUrl,
                type: 'POST',
                data: data,
                dataType: "json",
                success: function (result) {
                    if (result.success) {
                        Messenger().post({
                            message: '更新成功',
                            type: "success"
                        });
                    } else {
                        Messenger().post({
                            message: '更新失败！',
                            type: "error"
                        });
                    }
                    configMap.kcglGrid.ajax.reload();
                    jqueryMap.$ManageDialog.modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);
                },
                error: function () {
                    Messenger().post({
                        message: '更新失败！',
                        type: "error"
                    });
                    configMap.kcglGrid.ajax.reload();
                    jqueryMap.$ManageDialog.modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);

                }
            });
        }, "large");
    }
    /**陈
     * 创建模态框
     */
    var openModal = function (title, url, type, func, size) {//打开退还原因模态框
        var dialogButtons = {};
        if (type === 'addNum') {
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
        if (type === 'import') {
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
    /**陈
     * 设置常用量
     */
    var setCykcsl = function () {
        var ids = [];
        jqueryMap.$container.find("[name='check']:checked").each(function () {
            var el = $(this);
            var rowIndex = configMap.kcglGrid.cell(el.parent()).index().row;
            var id = configMap.kcglGrid.row(rowIndex).data().id;
            ids.push(id);
        });
        if (ids.length == 0) {
            Messenger().post({
                message: "请选择数据!",
                type: 'warning'
            });
            configMap.kcglGrid.ajax.reload();
            return;
        }
        openModal('常用耗材数量', configMap.path + configMap.addNumJsp, 'addNum', function () {
            var cykcsl = addCykcslList.getNum();
            var data = {};
            data.cykcsl = cykcsl;
            data.ids = ids.join(",");
            $.post(configMap.path + configMap.setCyKcsl, data, function (data) {
                if (data.success) {
                    Messenger().post({
                        message: "保存成功",
                        type: 'success'
                    });
                    configMap.kcglGrid.ajax.reload();
                } else {
                    Messenger().post({
                        message: "保存失败!",
                        type: 'error'
                    });
                }
            }, "json");
        }, null);
    }
    /**
     * 检查库存剩余量  发出提醒
     */
    var checkKcsl = function () {
        $.post(configMap.path + configMap.chekKcsl);
    };
    /**
     * 导入
     */
    var daoru = function () {
        openModal("导入Excel表格", configMap.path + configMap.importUrl, "import", function () {
            setInKcglExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ManageDialog.modal('hide');
                    configMap.kcglGrid.clear().draw();
                    configMap.kcglGrid.ajax.reload();
                    Messenger().post({
                        message: "导入成功",
                        type: 'success'
                    });
                }
            });
        }, null);
    };
   var printReport=function (lx) {//打印报告
       POBrowser.openWindowModeless( configMap.path + configMap.printReportUrl +"?lx="+lx,"width=1200px;height=800px");
   }
    return {
        inint: function (uuid, zl) {
            setJqueryMap(uuid);
            configMap.zl = zl;
            initGrid();
            checkKcsl();//库存数量
            jqueryMap.$container.find("#kcglSeach").on("click", function () {//查询
                configMap.kcglGrid.ajax.reload();
            });
            jqueryMap.$container.find("#kcglReast").on("click", function () {//重置
                $("#hcmc", jqueryMap.$container).val("");
                $("#rkrq_startDate", jqueryMap.$container).val("");
                $("#rkrq_endDate", jqueryMap.$container).val("");
                configMap.kcglGrid.ajax.reload();
            });
            jqueryMap.$container.find("#kcglCykcsl").on("click", function () {//设置常用库存的数量
                setCykcsl();
            });
            jqueryMap.$container.find("#kcglImport").on("click", function () {//导入Excel
                daoru();
            });
            jqueryMap.$container.find("#kcglYzd").on("click", function () {//易制毒
                printReport("yzd");
            });
            jqueryMap.$container.find("#kcglYzb").on("click", function () {//易制爆
                printReport("yzb");
            });
            $("#rkrq_startDate", jqueryMap.$container).datepicker({//绑定时间插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $("#rkrq_endDate", jqueryMap.$container).datepicker({//绑定时间插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            $("[name='kcglCheck']", jqueryMap.$container).on('click', function () {//多选
                if ($("[name='kcglCheck']", jqueryMap.$container).prop("checked")) {
                    //选中
                    $("[name='check']", jqueryMap.$container).prop("checked", true);
                } else {
                    $("[name='check']", jqueryMap.$container).prop("checked", false);
                }
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    }

}();