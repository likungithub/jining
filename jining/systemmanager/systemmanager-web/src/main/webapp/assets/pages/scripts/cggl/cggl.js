var cgglList = function () {
    var configMap = {
        dataUrl: "/cggl/cgglSeach",
        alerPriceUrl:"/cggl/alertPrice",
        cgglGrid: null,
        printReportUrl:"/cggl/printCgbzReport",
        passUrl:"/cggl/cgbzPass",
        backUrl:"/cggl/cgbzBack",
        path: '',
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $ypManageFrom: null,
        $blockTarget: null,
        $ManageDialog: null,
        $ManageDataTable: null,
        $cgglGrid: null
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
        jqueryMap.$ManageFrom = $('cgsqList');
        jqueryMap.$ManageDataTable = $('#ManagerList_cggllist', jqueryMap.$container);
    };
    var initGridcggl = function () {
        configMap.cgglGrid = jqueryMap.$ManageDataTable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "scrollX":true,//水平滚动
            "ajax": {
                "dataSrc": "aaData",
                "url": configMap.path + configMap.dataUrl,
                "method": "POST",
                "data": function (data) {
                    data.hcmc = $('#hcmc',jqueryMap.$container).val();
                    data.startDate = $('#cgglStartDate',jqueryMap.$container).val();
                    data.endDate = $('#cgglEndDate',jqueryMap.$container).val();
                    data.hclx= $('[name="hclx"]',jqueryMap.$container).val();
                    data.bzzt=$("#bzzt",jqueryMap.$container).val();
                    data.sqzt=$("#sqzt",jqueryMap.$container).val();
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
                    "class":"text-center",
                    "data": "hcmc",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {

                    "class":"text-center",
                    "data": "gg",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "class":"text-center",
                    "data": "jb",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "class":"text-center",
                    "data": "sl",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "class":"text-center",
                    "data": "dj",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<input type="number" name="dj"  value="'+d+'" style="width: 100px"/>';
                    }
                },
                {
                    "class":"text-center",
                    "data": "zj",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "class":"text-center",
                    "data": "sccj",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<input type="text" name="sccj"  value="'+d+'" style="width: 100px"/>';
                    }

                },
                {
                    "class":"text-center",
                    "data": "cgmd",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "class":"text-center",
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
                        if(d=='5'){
                            d="标准物质";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "class":"text-center",
                    "data": "bzzt",
                    "render": function (d, t, r) {
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
                    "class":"text-center",
                    "data": "sqzt",
                    "render": function (d, t, r) {
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
                    "class":"text-center",
                    "data": "sqr",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "class":"text-center",
                    "data": "sqrq",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "class":"text-center",
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
                var tootipContainer = $('[data-toggle="tooltip"]',jqueryMap.$container);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                ;
            }
        });
    }
    //编制通过和退回的操作的
    var saveZt=function (zt) {
        var url="";
        var ids = [];
        var data={};
        var flag=false;
        $('input[name="che"]:checked',jqueryMap.$container).each(function () {
            var el = $(this);
            var rowIndex = configMap.cgglGrid.cell(el.parent()).index().row;
            var id = configMap.cgglGrid.row(rowIndex).data().id;
            var bzzt= configMap.cgglGrid.row(rowIndex).data().bzzt;
            ids.push(id);
            if(bzzt!="001"){
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
        if(zt=="002"){//通过操作
            url=configMap.passUrl;
        }
        if(zt=="003"){//退回操作
            url=configMap.backUrl;
        }
        data.ids=ids.join(",");
        data.zt=zt;
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
                configMap.cgglGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            },
            error: function () {
                Messenger().post({
                    message: '保存失败!',
                    type: "error"
                });
                configMap.cgglGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);

            }
        });
    }
   /* //导出excel
    var daochuBtn=function () {
        var ids=[];//定义一个数组
        $('input[name="che"]:checked',jqueryMap.$container).each(function(){//遍历每一个名字为ids的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if(ids.length>0){
            window.location.href = "/systemmanager/cggl/exportCgglExcel?ids="+ ids.join(",");
        }else {
            Messenger().post({
                message: "请选择导出数据",
                type: 'warning'
            });
        }
    };*/
   var printReport=function () {
       var ids = [];//定义一个数组
       jqueryMap.$container.find('[name="che"]:checked').each(function () {
           var el = $(this);
           var rowIndex = configMap.cgglGrid.cell(el.parent()).index().row;
           var id = configMap.cgglGrid.row(rowIndex).data().id;
           ids.push(id);//获得id
       });
       if (ids.length == 0) {
           Messenger().post({
               message: '请选择打印数据!',
               type: 'warning'
           });
           return;
       }
       POBrowser.openWindowModeless( configMap.path + configMap.printReportUrl+"?ids="+encodeURI(ids.join(",")), "width=1200px;height=800px");
   }
    //修改数据
    var  alertPrice = function () {
        var ids = [];//定义一个数组
        var flag = false;
        jqueryMap.$container.find('[name="che"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.cgglGrid.cell(el.parent()).index().row;
            var id = configMap.cgglGrid.row(rowIndex).data().id;
            var bzzt = configMap.cgglGrid.row(rowIndex).data().bzzt;
            ids.push(id);//获得id
            if (bzzt != '001') { //001 是未验收的  如果返会true   就说明已验收
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
                message: '请勿操作已提交数据!',
                type: 'warning'
            });
            return;
        }
        var data={}; //创建json
        var success_flag=false;
        jqueryMap.$container.find('[name="che"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.cgglGrid.cell(el.parent()).index().row;
            data.id = configMap.cgglGrid.row(rowIndex).data().id;
            data.sl = configMap.cgglGrid.row(rowIndex).data().sl;//数量
            data.dj=$(el).parent().parent().children("td:eq(5)").children().val();//单价
            data.sccj=$(el).parent().parent().children("td:eq(7)").children().val();//生产厂家
            $.ajax({
                url: configMap.path + configMap.alerPriceUrl,
                type: 'POST',
                data:data,
                async:false,
                success: function (data) {
                    if (data.success) {
                      success_flag=true;
                    } else {
                        success_flag=false;
                        return;
                    }
                },
                error: function () {
                    success_flag=false;
                    return;
                }
            });
        });
        if (success_flag) {
            Messenger().post({
                message: '保存成功',
                type: 'success'
            });
            configMap.cgglGrid.ajax.reload();
        } else {
            Messenger().post({
                message: '保存失败!',
                type: 'error'
            });
            configMap.cgglGrid.ajax.reload();
        }

    };
    return {
        inint: function (uuid) {
            setJqueryMap(uuid);
            initGridcggl();
            jqueryMap.$container.find("#cgglSeach").on("click",function () {//查询
                configMap.cgglGrid.ajax.reload();
            });
            jqueryMap.$container.find("#cgglReast").on("click",function () {//重置
                $("#hcmc",jqueryMap.$container).val("");
                $("#cgglStartDate",jqueryMap.$container).val("");
                $("#cgglEndDate",jqueryMap.$container).val("");
                configMap.cgglGrid.ajax.reload();
            });
            jqueryMap.$container.find("#cgglPass").on("click",function () {//通过
                saveZt("002");
            });
            jqueryMap.$container.find("#cgglBack").on("click",function () {//退回
                saveZt("003");
            });
            jqueryMap.$container.find("#cgglExport").on("click",function () {//打印编制数据
               printReport();
            });
            jqueryMap.$container.find("#cgglAlertPrice").on("click",function () {//修改金额
                alertPrice();
            });
            jqueryMap.$container.find("#bzzt").on("change",function () {//下拉触发事件  编制状态
                configMap.cgglGrid.ajax.reload();
            });
            jqueryMap.$container.find("#sqzt").on("change",function () {//下拉触发事件  申请状态
                configMap.cgglGrid.ajax.reload();
            });
            $("#cgglStartDate", jqueryMap.$container).datepicker({//绑定时间插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $("#cgglEndDate", jqueryMap.$container).datepicker({//绑定时间插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            $('[name="ckcggl"]', jqueryMap.$container).on('click', function () {//多选
                if ($('[name="ckcggl"]', jqueryMap.$container).prop("checked")) {
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