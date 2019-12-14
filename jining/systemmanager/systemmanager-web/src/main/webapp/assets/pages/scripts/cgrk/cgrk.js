var cgrkList = function () {
    var configMap = {
        dataUrl: "/cgrk/cgrkSeach",
        addCgrkUrl: "/cgrk/addCgrk",
        addNumJsp: "/rjlfhzhgl/hcqjgl/cgrk/addCgrkNum.jsp",
        checkHcbmUrl:"/cgrk/checkHcbm",
        cgrkGrid: null,
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
        jqueryMap.$ManageDataTable = $('#ManagerList_cgrklist', jqueryMap.$container);
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
        configMap.cgrkGrid = jqueryMap.$ManageDataTable.DataTable({
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
                    "data": "hclx",
                    render: function (d, t, r) {
                        if (d == '1') {
                            d = "一般耗材"
                        }
                        if (d == '2') {
                            d = "化学品"
                        }
                        if (d == '3') {
                            d = "易制毒"
                        }
                        if (d == '4') {
                            d = "易制爆"
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
                var xxContainer = $('[data-toggle="tooltip"]');//显示详细

                if (xxContainer.length > 0) {
                    xxContainer.tooltip();
                }
                ;

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
    var checkHcbm=function (hcbm) {
        var flag=false;
        $.ajax({
            url: configMap.path + configMap.checkHcbmUrl,
            type: 'POST',
            data:{hcbm:hcbm},
            async:false,
            success: function (result) {
                flag=result.flag;
            }
        });
        return flag;
    }

    /**陈
     * 扫码入库
     */
    var addCgrk = function () {
        var hcbm = $("[name='hcbm']", jqueryMap.$container).val();//获得条码信息
        if(checkHcbm(hcbm)){
            Messenger().post({
                message:"数据库中已有该耗材!",
                type:"warning"
            });
             configMap.cgrkGrid.ajax.reload();
            $("#hcbm", jqueryMap.$container).val("");
            $("#hcbm", jqueryMap.$container).focus();
            return;
        }
        openModal1('耗材数量', configMap.path + configMap.addNumJsp, 'addNum', function () {
            var data = {};
            data.sl = addCgrkNumList.getNum();//获得耗材数量
            data.hcbm = hcbm;//获得条码信息
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在保存数据，请稍候...'
            });
            $.ajax({
                url: configMap.path + configMap.addCgrkUrl,
                type: 'POST',
                data:data,
                success: function (result) {
                    if (result.success) {
                        configMap.cgrkGrid.ajax.reload();
                        $("#hcbm", jqueryMap.$container).val("");
                        $("#hcbm", jqueryMap.$container).focus();
                        App.unblockUI(jqueryMap.$blockTarget);
                    } else {
                        configMap.cgrkGrid.ajax.reload();
                        $("#hcbm", jqueryMap.$container).val("");
                        $("#hcbm", jqueryMap.$container).focus();
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                },
                error: function () {
                    configMap.cgrkGrid.ajax.reload();
                    $("#hcbm", jqueryMap.$container).val("");
                    $("#hcbm", jqueryMap.$container).focus();
                    App.unblockUI(jqueryMap.$blockTarget);
                }
            });
        });
    };

    return {
        inint: function (uuid) {
            setJqueryMap(uuid);
            initGrid();
            jqueryMap.$container.find("#hcbm").on("change", function () {//条码扫描触发
                addCgrk();
            });
            jqueryMap.$container.find("#cgrkReast").on("click", function () {//重置
                $("#hcbm", jqueryMap.$container).val("");
                $("#hcbm", jqueryMap.$container).focus();
                configMap.cgrkGrid.ajax.reload();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    }
}();