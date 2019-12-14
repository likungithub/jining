var cgsqListsyljl = function () {
    var configMap = {
        printBarcode:"/syhcljl/yp",
        dataUrl: "/syhcljl/findByNaTy",
        path:"",
        add_cgsqJsp:"/rjlfhzhgl/hcqjgl/syhcjl/add_syhcl.jsp",
        del_cgsqUrl:"/syhcljl/deleteCgsq",
        add_syljl:"/syhcljl/addCgsq"
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
        jqueryMap.$ManageDataTable = $('#ManagerList_mcgsq1syljl', jqueryMap.$container);
    };
    var inintGridsyljl = function () {
        jqueryMap.$cgsqGrid = jqueryMap.$ManageDataTable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url":configMap.path+configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.hcmc = $('#hcmcsyljl',jqueryMap.$container).val();
                    data.hclx = $("[name='hclx']",jqueryMap.$container).val();
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
                    "data": "kqr",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "kqsj",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "syl",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }

                },
                {
                    "data": "bzq",
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
                };
            }
        });
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
                size:size
            });
        });
    };

    var addCgsq = function () {
        openModal('新增剩余耗材',configMap.path+configMap.add_cgsqJsp,"add",function () {
            var data = add_syhcl.getData();
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在保存数据，请稍候...'
            });
            $.ajax({
                url: configMap.path+configMap.add_syljl,
                type: 'POST',
                data: data,
                dataType: "json",
                success: function (result) {
                    if(result.success){
                        Messenger().post({
                            message: '添加成功',
                            type:"success"
                        });
                    }else {
                        Messenger().post({
                            message: '添加失败!',
                            type:"error"
                        });
                    }
                    jqueryMap.$cgsqGrid.ajax.reload();
                    jqueryMap.$ManageDialog.modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);
                },
                error: function () {
                    Messenger().post({
                        message: '添加失败',
                        type:"error"
                    });
                    jqueryMap.$cgsqGrid.ajax.reload();
                    jqueryMap.$ManageDialog.modal('hide');
                    App.unblockUI(jqueryMap.$blockTarget);

                }
            });
        },"large")
    }
    /**
     * 批量删除
     */
    var deleteCgsq = function () {
        var ids=[];
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
            var data=ids.join(',');
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
                                url: configMap.path+configMap.del_cgsqUrl,
                                type: 'POST',
                                data: {ids:data},
                                dataType: "json",
                                success: function (result) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    if (result.success) {
                                        Messenger().post({
                                            message: '删除成功',
                                            type: 'success'
                                        });
                                    }else {
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

//打印样品编码
    var dy = function () {
        var ids=[];
        var hcmc
        var kqr
        var kqsj
        var syl
        var bzq
        var cfwz
        jqueryMap.$container.find('[name="che"]:checked').each(function () {
            var el = $(this);
            var rowIndex = jqueryMap.$cgsqGrid.cell(el.parent()).index().row;
            var id = jqueryMap.$cgsqGrid.row(rowIndex).data().id;
            ids.push(id);
            $.post(configMap.path + configMap.printBarcode, {ids: ids.join(",")}, function (data) {
                    if (data.success) {
                        // configMap.$cgsqGrid.ajax.reload();
                        Messenger().post({
                            message: "条码打印中,请稍后......",
                            type: 'success',
                            id:"ordermessenger"
                        })
                        // jcxmjson.length=0;
                        var arr1=new Array();
                        arr1=data.list1;
                        var arr2=new Array();
                        arr2=data.list2;
                        var arr3=new Array();
                        arr3=data.list3;
                        var arr4=new Array();
                        arr4=data.list4;
                        var arr5=new Array();
                        arr5=data.list5;
                        var arr6=new Array();
                        arr6=data.list6;
                        for ( var i = 0; i <arr1.length; i++){
                            hcmc=arr1[i];
                            kqr=arr2[i];
                            kqsj=arr3[i];
                            syl=arr4[i];
                            bzq=arr5[i];
                            cfwz=arr6[i];
                            createQRcde1(hcmc,kqr,kqsj,syl,bzq,cfwz);
                        }
                    }else {
                        Messenger().post({
                            message: "打印失败！",
                            type: 'error',
                            id:"ordermessenger"
                        })
                    }
                    // id.length=0;
                }, "json");
            // });
        });
    }
    //生成条码
    var createQRcde1 = function (hcmc,kqr,kqsj,syl,bzq,cfwz) {
        var TSCObj;
        TSCObj = new ActiveXObject("TSCActiveX.TSCLIB");
        TSCObj.ActiveXabout();
        TSCObj.ActiveXopenport ("TSC TTP-244 Pro");
        TSCObj.ActiveXdownloadpcx ("D://file/UL.PCX","UL.PCX");
        TSCObj.ActiveXsetup("60", "40", "5", "15", "0", "2", "0");
        TSCObj.ActiveXsendcommand ("SET TEAR ON");
        TSCObj.ActiveXclearbuffer();
        // TscLibDll.INSTANCE.sendcommand("PUTPCX 550,10,\"UL.PCX\"");// 图片位置
        // TscLibDll.INSTANCE.printerfont("100", "50", "TSS24.BF2", "0", "1", "1", "Technology");
        // TscLibDll.INSTANCE.barcode("70", "140", "128", "90", "0", "0", "2", "2", "A123456789");// 打印内容，参数是位置和字体
        // TscLibDll.INSTANCE.windowsfont(15, 15, 40, 0, 2, 1, "Arial", "网络科技公司");
        // TSCObj.ActiveXsendcommand ("PUTPCX 10,200,\"UL.PCX\"");
        TSCObj.ActiveXwindowsfont(15, 290, 10, 0, 2, 0, "Arial", "_________________________________________________________________________________________________________________");
        TSCObj.ActiveXwindowsfont(15, 0, 10, 0, 2, 0, "Arial", "_________________________________________________________________________________________________________________");
        TSCObj.ActiveXwindowsfont(35, 10, 20, 270, 2, 0, "Arial", "_____________________________");
        TSCObj.ActiveXwindowsfont(191, 10, 20, 270, 2, 0, "Arial", "_____________________________");
        TSCObj.ActiveXwindowsfont(211, 15, 28, 270, 0, 0, "Arial", "存放位置:"+cfwz);
        TSCObj.ActiveXwindowsfont(241, 10, 20, 270, 2, 0, "Arial", "_____________________________");
        TSCObj.ActiveXwindowsfont(261, 15, 28, 270, 0, 0, "Arial", "保质期:"+bzq);
        TSCObj.ActiveXwindowsfont(291, 10, 20, 270, 2, 0,"Arial", "_____________________________");
        TSCObj.ActiveXwindowsfont(311, 15, 28, 270, 0, 0, "Arial", "剩余量:"+syl);
        TSCObj.ActiveXwindowsfont(341, 10, 20, 270, 2, 0, "Arial", "_____________________________");
//      TSCObj.ActiveXwindowsfont(465, 130, 25, 180, 0, 0, "Arial", ""+zbypbm);DYHKQ02010027001
        TSCObj.ActiveXwindowsfont(361, 15, 28, 270, 0, 0, "Arial", "开启时间:"+kqsj);// 打印内容，参数是位置和字体
        TSCObj.ActiveXwindowsfont(391, 10, 20, 270, 2, 0, "Arial", "_____________________________");
        TSCObj.ActiveXwindowsfont(411, 15, 28, 270, 0, 0, "Arial", "开启人:"+kqr);
        TSCObj.ActiveXwindowsfont(441, 10, 20, 270, 2, 0, "Arial", "_____________________________");
        TSCObj.ActiveXwindowsfont(458, 15, 28, 270, 0, 0, "Arial", "耗材名称:"+hcmc);
        TSCObj.ActiveXwindowsfont(488, 10, 20, 270, 2, 0, "Arial", "_____________________________");
        //var cmd = 'QRCODE 条码X方向起始点,条码Y方向起始点,纠错级别,二维码高度,A(A和M),旋转角度,M2（分为类型1和类型2）,S1 (s1-s8,默认s7),\"1231你好2421341325454353\"';
        var command = "QRCODE 22,85,L,5,A,0,M2,S3,\"" +"耗材名称:"+hcmc +"   开启时间:"+kqsj+ "\"";// 打印二维码
        TSCObj.ActiveXsendcommand(command);
        TSCObj.ActiveXprintlabel("1", 1);//（打印份数,每页打印张数）
        TSCObj.ActiveXcloseport();
    }
    return {
        inint: function (uuid) {
            setJqueryMap(uuid);

            inintGridsyljl();
            jqueryMap.$container.find("#cgsqCncgsqCnsyljl").on("click", function () {//查询
                jqueryMap.$cgsqGrid.ajax.reload();
            });
            jqueryMap.$container.find("#cgsqCzsyljl").on("click", function () {//重置
                $("#hcmcsyljl",jqueryMap.$container).val("");
                jqueryMap.$cgsqGrid.ajax.reload();
            });
            jqueryMap.$container.find("#xzsyljl").on("click", function () {//新增
                addCgsq();
            });
            jqueryMap.$container.find("#cgsqScsyljl").on("click", function () {//删除
                deleteCgsq();
            });
            jqueryMap.$container.find("#btn_dy").on("click", function () {//

                dy();

            });
            $('[name="check"]',jqueryMap.$container).on('click',function () {
                if($('[name="check"]',jqueryMap.$container).prop("checked")){
                    //选中
                    $('[name="che"]',jqueryMap.$container).prop("checked",true);
                }else{
                    $('[name="che"]',jqueryMap.$container).prop("checked",false);
                }
            });

        },
        setPath:function (path) {
            configMap.path=path;
        }
    }
}();