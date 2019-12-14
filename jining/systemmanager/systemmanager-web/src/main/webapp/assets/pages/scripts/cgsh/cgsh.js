var cgshList = function () {
    var configMap = {
        dataUrl: "/cgsh/cgshSeach",
        cgshGrid: null,
        backUrl:"/cgsh/shth",
        passUrl:"/cgsh/shtg",
        path: "",
        updateurl: "/rjlfhzhgl/hcqjgl/hcbz/updatedj.jsp"
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $ypManageFrom: null,
        $blockTarget: null,
        $ManageDialog: null,
        $ManageDataTable: null
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
        jqueryMap.$container = $('#' + uuid + 'cgsh-manager-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ManageDataTable = $('#ManagerList_cgshlist', jqueryMap.$container);
    };
    var initGridcgglhcbz = function () {
        configMap.cgshGrid = jqueryMap.$ManageDataTable.DataTable({
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
                    data.startDate = $('#cgshStartDate', jqueryMap.$container).val();
                    data.endDate = $('#cgshEndDate', jqueryMap.$container).val();
                    data.hclx = $("[name='hclx']", jqueryMap.$container).val();
                    data.shzt = $("#shzt", jqueryMap.$container).val();
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
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "gg",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "jb",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "sl",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "dj",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "zj",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "sccj",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "cgmd",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },


                {
                    "data": "sqr",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "sqrq",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "shzt",
                    "render": function (d, t, r) {
                        if (d == '001') {
                            d = "审核中"
                        }
                        if (d == '002') {
                            d = "审核通过"
                        }
                        if (d == '003') {
                            d = "审核未通过"
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "hclx",
                    "render": function (d, t, r) {
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
                        if (d == "5") {
                            d = "标准物质"
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
    //审核通过和退回的操作的
    var saveZt=function (zt) {
        var url="";
        var ids = [];
        var data={};
        var flag=false;
        $('input[name="che"]:checked',jqueryMap.$container).each(function () {
            var el = $(this);
            var rowIndex = configMap.cgshGrid.cell(el.parent()).index().row;
            var id = configMap.cgshGrid.row(rowIndex).data().id;
            var shzt= configMap.cgshGrid.row(rowIndex).data().shzt;
            ids.push(id);
            if(shzt!='001'){
                flag=true;
                return;
            }
        });
        if(ids.length==0){
            Messenger().post({
                message: '请选择操作数据!',
                type: "warning"
            });
            return;
        }
        if(flag){
            Messenger().post({
                message: '请勿重复提交数据!',
                type: "warning"
            });
            return;
        }
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在保存数据，请稍候...'
        });
        if(zt=="002"){//通过操作
            url=configMap.passUrl;
        }
        if(zt=="003"){//退回操作
            url=configMap.backUrl;
        }
        data.zt=zt;
        data.ids=ids.join(",");
        $.ajax({
            url: configMap.path+url,
            type: 'POST',
            data:data,
            dataType: "json",
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
                configMap.cgshGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            },
            error: function () {
                Messenger().post({
                    message: '保存失败!',
                    type: "error"
                });
                configMap.cgshGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);

            }
        });
    }
    //修改单价总价问题
    var updateHcbz = function () {
        openModal('修改耗材金额', configMap.path + configMap.updateurl, "add", function () {
            var data = updatecgsqList.getData();
            var chk_value = [];
            $('input[name="che"]:checked',jqueryMap.$container).each(function () {
                chk_value.push($(this).val());
            });
            data.hcbzid = chk_value[0];
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在保存数据，请稍候...'
            });
            $.ajax({
                url: "systemmanager/cggl/updateCgsqhcbz",
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
                            message: '修改失败',
                            type: "error"
                        });
                    }
                    configMap.cgshGrid.ajax.reload();
                    jqueryMap.$ManageDialog.modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);
                },
                error: function () {
                    Messenger().post({
                        message: '修改失败',
                        type: "error"
                    });
                    configMap.cgshGrid.ajax.reload();
                    jqueryMap.$ManageDialog.modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);

                }
            });
        }, "large")
    }
    //创建模态框
    var openModal = function (title, url, type, func, size) {
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
    return {
        inint: function (uuid) {
            setJqueryMap(uuid);
            initGridcgglhcbz();
            jqueryMap.$container.find("#cgshSeach").on("click", function () {//查询
                configMap.cgshGrid.ajax.reload();
            });
            jqueryMap.$container.find("#cgshReast").on("click", function () {//重置
                $("#hcmc", jqueryMap.$container).val("");
                $("#cgshStartDate", jqueryMap.$container).val("");
                $("#cgshEndDate", jqueryMap.$container).val("");
                configMap.cgshGrid.ajax.reload();
            });
            jqueryMap.$container.find("#shzt").on("change", function () {//审核状态更改触发
                configMap.cgshGrid.ajax.reload();
            });
            jqueryMap.$container.find("#cgshPass").on("click", function () {//通过
                saveZt("002");
            });
            jqueryMap.$container.find("#cgshBack").on("click", function () {//退回
                saveZt("003");
            });
            jqueryMap.$container.find("#cgglUpdatehcbz").on("click", function () {//修改
                updateHcbz();
            });

            $("#cgshStartDate", jqueryMap.$container).datepicker({//绑定时间插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $("#cgshEndDate", jqueryMap.$container).datepicker({//绑定时间插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            $('[name="cgshCheck"]', jqueryMap.$container).on('click', function () {//多选
                if ($('[name="cgshCheck"]', jqueryMap.$container).prop("checked")) {
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