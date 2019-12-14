var hcthList = function () {
    var configMap = {
        dataUrl: "/hcth/hcthSeach",
        addHcthUrl: "/hcth/addHcth",
        addNumJsp: "/rjlfhzhgl/hcqjgl/hcly/hcth/addHcthNum.jsp",
        checkHcbmUrl: "/hcth/checkHcbm",
        delUrl: "/hcth/delHcth",
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="hcthDel" title="删除耗材申请信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        hcthGrid: null,
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
        jqueryMap.$ManageDataTable = $('#ManagerList_hcthlist', jqueryMap.$container);
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
        configMap.hcthGrid = jqueryMap.$ManageDataTable.DataTable({
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
                    data.hclx=$("[name='hclx']",jqueryMap.$container).val();
                },
            },
            "columns": [
                {
                    "data": "id",
                    render: function (d, t, r) {
                        return configMap.deleBtn_html;
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
                    "data": "thsl",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "thr",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "thrq",
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
                var delContainer = $("[name='hcthDel']", jqueryMap.$container);//删除

                if (xxContainer.length > 0) {
                    xxContainer.tooltip();
                }
                if (delContainer.length > 0) {
                    delContainer.off("click").on("click", delBtn);
                }

            }
        });

    }
    /**陈
     * 创建模态框
     */
    var openModal1 = function (title, url, type, func) {//打开退还原因模态框
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

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666',
        }

        $.get(url, function (html) {
            jqueryMap.$ManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    /**陈
     *检查数据库中是否存在相同的耗材编码
     */
    var checkHcbm = function (hcbm) {
        var flag = false;
        $.ajax({
            url: configMap.path + configMap.checkHcbmUrl,
            type: 'POST',
            data: {hcbm: hcbm},
            async: false,
            success: function (result) {
                flag = result.flag;
            }
        });
        return flag;
    }

    /**陈
     * 扫码入库
     */
    var addHcth = function () {
        var hcbm = $("[name='hcbm']", jqueryMap.$container).val();//获得条码信息
        if (!checkHcbm(hcbm)) {//如果数据存在就返会true   那么取反值  如过不存在就成立
            Messenger().post("数据库中不存在该耗材!");
            $("#hcth_hcbm", jqueryMap.$container).val("");
            $("#hcth_hcbm", jqueryMap.$container).focus();
            return;
        }
        openModal1('耗材数量', configMap.path + configMap.addNumJsp, 'addNum', function () {
            var data = {};
            var thsl=addHcthNumList.getNum();//获得耗材数量
            data.thsl = thsl//获得耗材数量
            data.hcbm = hcbm;//获得条码信息
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在保存数据，请稍候...'
            });
            $.ajax({
                url: configMap.path + configMap.addHcthUrl,
                type: 'POST',
                data: data,
                success: function (result) {
                    if (result.success) {
                        configMap.hcthGrid.ajax.reload();
                        $("#hcth_hcbm", jqueryMap.$container).val("");
                        $("#hcth_hcbm", jqueryMap.$container).focus();
                        App.unblockUI(jqueryMap.$blockTarget);
                    } else {
                        configMap.hcthGrid.ajax.reload();
                        $("#hcth_hcbm", jqueryMap.$container).val("");
                        $("#hcth_hcbm", jqueryMap.$container).focus();
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                },
                error: function () {
                    configMap.hcthGrid.ajax.reload();
                    $("#hcth_hcbm", jqueryMap.$container).val("");
                    $("#hcth_hcbm", jqueryMap.$container).focus();
                    App.unblockUI(jqueryMap.$blockTarget);
                }
            });
        });
    };
    /**陈
     *删除按钮
     */
    var delBtn = function () {
        var el = $(this);
        var rowIndex = configMap.hcthGrid.cell(el.parent()).index().row;
        var id = configMap.hcthGrid.row(rowIndex).data().id;
        bootbox.dialog({
            title: '提示',
            message: '是否要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        delHcth(id);
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
    var  delHcth = function (id) {
        $.ajax({
            url: configMap.path + configMap.delUrl,
            type: 'POST',
            data: {id: id},
            success: function (result) {
                if (result.success) {
                    configMap.hcthGrid.ajax.reload();
                    Messenger().post({
                        message: "删除成功",
                        type: 'success',
                        id: "kcgl"
                    });
                } else {
                    Messenger().post({
                        message:"删除失败!",
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
    return {
        inint: function (uuid) {
            setJqueryMap(uuid);
            initGrid();
            jqueryMap.$container.find("#hcth_hcbm").on("change", function () {//条码扫描触发
                addHcth();
            });
            jqueryMap.$container.find("#hcthReast").on("click", function () {//重置
                $("#hcth_hcbm", jqueryMap.$container).val("");
                $("#hcth_hcbm", jqueryMap.$container).focus();
                configMap.hcthGrid.ajax.reload();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    }
}();