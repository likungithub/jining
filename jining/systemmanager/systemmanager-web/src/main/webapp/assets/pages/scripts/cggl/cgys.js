var cgysList = function () {
    var configMap = {
        dataUrl: "/cggl/cgglCgysSeach",
        saveZtUrl: "/cggl/saveCgysZt",
        printBarcode: "/cggl/printBarcode",
        nowData: "",
        cgysGrid: null,
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
        jqueryMap.$container = $('#' + uuid + 'cgys-manager-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ManageDataTable = jqueryMap.$container.find("#ManagerList_cgyslist");

    };
    var inintGrid = function () {
        configMap.cgysGrid = jqueryMap.$ManageDataTable.DataTable({
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
                    data.hcmc = $('#hcmc', jqueryMap.$container).val();
                    data.yszt = $('#yszt', jqueryMap.$container).val();
                    data.hclx = $("[name='hclx']", jqueryMap.$container).val();
                },
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
                    "data": "spr",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "sprq",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "sqzt",
                    render: function (d, t, r) {
                        if (d == '001') {
                            d = "审批中";
                        }
                        if (d == '002') {
                            d = "审批通过";
                        }
                        if (d == '003') {
                            d = "审批未通过";
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
                    "data": "yszt",
                    render: function (d, t, r) {
                        if (d == '001') {
                            d = "未验收";
                        }
                        if (d == '002') {
                            d = "已验收";
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
    /**陈
     * 验收提交按钮
     */
    var saveZt = function () {
        var ids = [];//定义一个数组
        var flag = false;
        jqueryMap.$container.find('[name="che"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.cgysGrid.cell(el.parent()).index().row;
            var id = configMap.cgysGrid.row(rowIndex).data().id;
            var yszt = configMap.cgysGrid.row(rowIndex).data().yszt;
            ids.push(id);//获得id
            if (yszt != '001') { //001 是未验收的  如果返会true   就说明已验收
                flag = true;//直接退出
                return;
            }
        });
        if (ids.length == 0) {
            Messenger().post({
                message: '请选择验收数据!',
                type: 'warning'
            });
            return;
        }
        if (flag) {
            Messenger().post({
                message: '耗材已验收!',
                type: 'warning'
            });
            return;
        }
        $.ajax({
            url: configMap.path + configMap.saveZtUrl,
            type: 'POST',
            data: {ids: ids.join(",")},
            success: function (data) {
                if (data.success) {
                    Messenger().post({
                        message: '保存成功',
                        type: 'success'
                    });
                    configMap.cgysGrid.ajax.reload();
                } else {
                    Messenger().post({
                        message: '保存失败!',
                        type: 'error'
                    });
                }
            },
            error: function () {
                Messenger().post({
                    message: '保存失败!',
                    type: 'error'
                });
            }
        });
    };
    var barCode = function () {//条码打印
        var ids = [];//定义一个数组
        var flag = false;
        jqueryMap.$container.find('[name="che"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.cgysGrid.cell(el.parent()).index().row;
            var id = configMap.cgysGrid.row(rowIndex).data().id;
            var yszt = configMap.cgysGrid.row(rowIndex).data().yszt;
            ids.push(id);//获得id
            if (yszt == '001') { //001 是未验收的   返会true  就说明有未验收的数据
                flag = true;
                return;//直接退出
            }
        });
        if (ids.length == 0) {
            Messenger().post({
                message: '请选择条码打印数据!',
                type: 'warning'
            });
            return;
        }
        ;
        if (flag) {
            Messenger().post({
                message: '耗材未验收!',
                type: 'warning'
            });
            return;
        }
        $.post(configMap.path + configMap.printBarcode, {ids: ids.join(",")}, function (data) {
            if (data.success) {
                Messenger().post({
                    message: '条码打印中,请稍后......',
                    type: 'success'
                });
            } else {
                Messenger().post({
                    message: '打印失败',
                    type: 'error'
                });
            }
        }, "json");
    }

    var printBzwzReport = function (lx) {//验收单打印   这是标准物质的验收记录打印
        var ids = [];//定义一个数组
        var flag = false;
        jqueryMap.$container.find('[name="che"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.cgysGrid.cell(el.parent()).index().row;
            var id = configMap.cgysGrid.row(rowIndex).data().id;
            var yszt = configMap.cgysGrid.row(rowIndex).data().yszt;
            ids.push(id);//获得id
            if (yszt == '001') { //001 是未验收的   返会true  就说明有未验收的数据
                flag = true;
                return;//直接退出
            }
        });
        if (ids.length == 0) {
            Messenger().post({
                message: '请选择打印数据!',
                type: 'warning'
            });
            return;
        }
        ;
        if (flag) {
            Messenger().post({
                message: '耗材未验收!',
                type: 'warning'
            });
            return;
        }
        var url="";
        if(lx=="ysjl"){
          url="/cggl/printReport";
        }
        if(lx=="ylb"){
            url="/cggl/printBzwzYlbReport";
        }
        POBrowser.openWindowModeless( configMap.path + url +"?ids="+encodeURI(ids.join(",")), "width=1200px;height=800px");
    }
    var printNormalReport = function (lx) {//这里的打印的除了标准物质的打印
        var ids = [];//定义一个数组
        var flag = false;
        jqueryMap.$container.find('[name="che"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.cgysGrid.cell(el.parent()).index().row;
            var id = configMap.cgysGrid.row(rowIndex).data().id;
            var yszt = configMap.cgysGrid.row(rowIndex).data().yszt;
            ids.push(id);//获得id
            if (yszt == '001') { //001 是未验收的   返会true  就说明有未验收的数据
                flag = true;
                return;//直接退出
            }
        });
        if (ids.length == 0) {
            Messenger().post({
                message: '请选择打印数据!',
                type: 'warning'
            });
            return;
        }
        ;
        if (flag) {
            Messenger().post({
                message: '耗材未验收!',
                type: 'warning'
            });
            return;
        }
        var url="";
        if(lx=="sysysjl"){//实验室验收记录
            url="/cggl/printSysysjlReport";
        }
        if(lx=="gtsj"){//固体试剂
            url="/cggl/printGtsjReport";
        }
        if(lx=="wjyt"){//无机液体试剂
            url="/cggl/printWjytReport";
        }
        if(lx=="yjsj"){//有机试剂
            url="/cggl/printYjsjReport";
        }
        POBrowser.openWindowModeless( configMap.path + url+"?ids="+encodeURI(ids.join(",")), "width=1200px;height=800px");
    }
    return {
        inint: function (uuid) {
            setJqueryMap(uuid);
            inintGrid();
            jqueryMap.$container.find("#cgys_Seach").on("click", function () {//查询
                configMap.cgysGrid.ajax.reload();
            });
            jqueryMap.$container.find("#yszt").on("change", function () {//下拉框变化查询
                configMap.cgysGrid.ajax.reload();
            });
            jqueryMap.$container.find("#cgys_Reast").on("click", function () {//重置
                $("#hcmc", jqueryMap.$container).val("");
                $("#yszt", jqueryMap.$container).val("");
                configMap.cgysGrid.ajax.reload();
            });
            jqueryMap.$container.find("#cgys_ys").on("click", function () {//验收提交
                saveZt();
            });
            jqueryMap.$container.find("#cgys_barCode").on("click", function () {//条码打印
                barCode();
            });
            jqueryMap.$container.find("#cgys_report").on("click", function () {//标准物质验收验收记录打印
                printBzwzReport("ysjl");
            });
            jqueryMap.$container.find("#cgys_ylb").on("click", function () {//标准物质一览表打印
                printBzwzReport("ylb");
            });
            jqueryMap.$container.find("#cgys_sysysjl").on("click", function () {//实验室验验收记录
                printNormalReport("sysysjl");
            });
            jqueryMap.$container.find("#cgys_gtsj").on("click", function () {//固体试剂验收记录
               printNormalReport("gtsj");
            });
            jqueryMap.$container.find("#cgys_wjyt").on("click", function () {//无机液体试剂验收记录
                printNormalReport("wjyt");
            });
            jqueryMap.$container.find("#cgys_yjsj").on("click", function () {//有机试剂验收记录
                printNormalReport("yjsj");
            });
            $('[name="cgys"]', jqueryMap.$container).on('click', function () {//多选
                if ($('[name="cgys"]', jqueryMap.$container).prop("checked")) {
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