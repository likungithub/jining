var ypQCL = function () {
    // 全局属性参数
    var configMap = {
        path: '',
        uuid: '',
        ypqclGrid:'',
    };
    var setjqueryMap = function () {
        jqueryMap.$container = $('#ypQCL'+configMap.uuid);
    }
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $ypManageDialog:null,
    };
    function delnull(d){
        if(d==undefined){
            return '';
        }
        if(d=='null'){
            return '';
        }
        return d;
    }
    var initYPQCLList = function () {
        configMap.ypqclGrid = $("#ypqcl_list_data"+configMap.uuid).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": "customermanage/ypqcl/ypqcl_QueryAll",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypmc= $("#ypmc"+configMap.uuid).val();
                    data.wtid=$("#wtid"+configMap.uuid).val();
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data) {
                        return  '<input type="checkbox" name="ypqclcheck"  value="' + data + '" id="ypqcl_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "data": "wtid",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }

                },
                {
                    class:"text-center",
                    "data": "ypbm",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypmc",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "zbff",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "zl",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "sl",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "lqzl",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "lqsl",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "fhzl",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "fhsl",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "zt",
                    "render": function (data) {
                        if(data=="001"){
                            data="已领取";
                        }
                        if(data=="002"){
                            data="已处理";
                        }
                        if(data=="003"){
                            data="已返还";
                        }
                        if(data==null||data==""){
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "lrry",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "lqry",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "fhry",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "bz",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                }
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var shanChuContainer = $("#ypqclDel_btn");//删除
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if(shanChuContainer.length>0){//删除
                    shanChuContainer.off('click').on('click',deleteYpqcl);
                }
            }
        });
    };
    //查询
    var chaxunYPqcl = function () {
        $("#ypqclSearch_btn"+configMap.uuid).click(function () {
            configMap.ypqclGrid.ajax.reload();
        })
    }
    //重置
    var chongzhiYPqcl = function () {
        $("#ypqclReset_btn"+configMap.uuid).click(function () {
            $("#ypmc"+configMap.uuid).val("");
            $("#wtid"+configMap.uuid).val("");
            configMap.ypqclGrid.ajax.reload();
        })
    }
    /*全选*/
    $('input[name="ypqclcheckz"]').off('click').on('click',function () {
        if(this.checked){
            $('input[name="ypqclcheck"]').attr("checked","checked");
        }else{
            $('input[name="ypqclcheck"]').attr("checked",null);
        }
    });
    /*删除操作*/
    var deleteYpqcl = function () {
        var ypqclIDs=[]//定义数组接收样品编码
        
        $("input[name='ypqclcheck']:checked",jqueryMap.$container).each(function () {
            ypqclIDs.push($(this).val())
        })
        if(ypqclIDs.length>0){
            bootbox.dialog({
                title: '提示',
                message: '确定要删除入库样品？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            $.ajax({
                                url:"customermanage/ypqcl/deleteYpqcl?ypqclID="+ypqclIDs,//
                                type: 'POST',
                                success:function (result) {
                                    
                                    if (result.success) {
                                        Messenger().post({
                                            message:"删除成功",
                                            type:"info"
                                        });
                                        configMap.ypqclGrid.ajax.reload();
                                        return;
                                    } else {
                                        Messenger().post({
                                            message: result.message,
                                            type: 'danger'
                                        });
                                    }
                                },
                                error:function () {
                                    Messenger().post({
                                        message: '删除失败！'
                                    });
                                    return;
                                }
                            });
                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            })
        }else {
            Messenger().post({
                message: '请选择删除数据',
                type: 'error'
            })
        }

    }
    //样品领取
    var addYPQCL = function () {
        $("#ypqclAdd_btn",jqueryMap.$container).off("click").on("click",function () {
            openModal("样品领取", "customermanage/ypgl/ypQCLAdd.jsp","add",function () {
                ypqcladd.ypqcl_xz(function (result) {
                    if(result){
                        jqueryMap.$ypManageDialog.modal('hide');
                        configMap.ypqclGrid.ajax.reload();
                    }
                })
            });
        })
    }

    //打开模态框组件
    var openModal = function (title, url,type,func) {

        var dialogButtons = {};
        if (type === 'add') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666',
        }

        $.get(url, function (html) {
            jqueryMap.$ypManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                size:"large"
            });
        });
    };

    /*修改*/
    var updateYpqcl = function () {
        
        var ypqclUPIDs=[]//定义数组接收样品编码
        $("input[name='ypqclcheck']:checked",jqueryMap.$container).each(function () {
            ypqclUPIDs.push($(this).val())
        })
        if(ypqclUPIDs.length > 0 ) {
            var dd1 = $("[name='ypqclcheck']:checked")[0];
            var ypqclZT = $(dd1).parent().parent().children("td:eq(11)").text();//状态

            if (ypqclZT === "已领取") {
                var dd1 = $("[name='ypqclcheck']:checked")[0];
                var id = $(dd1).val();
                var wtid = $(dd1).parent().parent().children("td:eq(1)").text();//所属委托
                var ypbm = $(dd1).parent().parent().children("td:eq(2)").text();//样品编号
                var ypmc = $(dd1).parent().parent().children("td:eq(3)").text();//样品名称
                var zbff = $(dd1).parent().parent().children("td:eq(4)").text();//制备方法
                var zl = $(dd1).parent().parent().children("td:eq(5)").text();//质量
                var sl = $(dd1).parent().parent().children("td:eq(6)").text();//数量
                var bz = $(dd1).parent().parent().children("td:eq(15)").text();//备注

                $("#ypqcl_id").val(id);
                $("#ypqcl_ypmc").val(wtid);
                $("#ypqcl_ypbm").val(ypbm);
                $("#ypqcl_wtid").val(ypmc);
                $("#ypqcl_zbff").val(zbff);
                $("#ypqcl_zl").val(zl);
                $("#ypqcl_sl").val(sl);
                $("#ypqcl_bz").val(bz);

                $("#ypqclUPBox"+configMap.uuid).modal({show:true});

                $("#ypclsq_bc").off('click').on("click",function () {
                    
                    $.ajax({
                        url: 'customermanage/ypqcl/updateYpqcllingqu',
                        data: $("#ypqcl_update_from" + configMap.uuid).serialize(),
                        type: 'POST',
                        success: function () {
                            
                            Messenger().post({
                                message: '修改成功',
                                type: 'info'
                            })
                           // event.stopPropagation();
                            $("#ypqclUPBox"+configMap.uuid).modal('hide');
                            configMap.ypqclGrid.ajax.reload();
                        },
                        error: function () {
                            Messenger().post({
                                message: '修改失败',
                                type: 'error'
                            })
                            return;
                        }
                    })
                })
            }else if (ypqclZT === "已处理") {
                var id = $(dd1).val();
                var wtid = $(dd1).parent().parent().children("td:eq(1)").text();//所属委托
                var ypbm = $(dd1).parent().parent().children("td:eq(2)").text();//样品编号
                var ypmc = $(dd1).parent().parent().children("td:eq(3)").text();//样品名称
                var zbff = $(dd1).parent().parent().children("td:eq(4)").text();//制备方法
                var zl = $(dd1).parent().parent().children("td:eq(5)").text();//质量
                var sl = $(dd1).parent().parent().children("td:eq(6)").text();//数量
                var lqzl = $(dd1).parent().parent().children("td:eq(7)").text();//领取质量
                var lqsl = $(dd1).parent().parent().children("td:eq(8)").text();//领取数量

                $("#ypqcl_id_lq").val(id);
                $("#ypqcl_wtid_lq").val(wtid);
                $("#ypqcl_ypbm_lq").val(ypbm);
                $("#ypqcl_ypmc_lq").val(ypmc);
                $("#ypqcl_zbff_lq").val(zbff);
                $("#ypqcl_zl_lq").val(zl);
                $("#ypqcl_ypsl_lq").val(sl);
                $("#ypqcl_lqzl_lq").val(lqzl);
                $("#ypqcl_lqsl_lq").val(lqsl);

                $("#lingquBT").html("样品信息处理_修改");
                $("#ypqcl_chuli_Box"+configMap.uuid).modal({show:true});

                $("#ypclsq_lingqu").off('click').on("click",function () {
                    $.ajax({
                        url: 'customermanage/ypqcl/updateYpqclchuli',
                        data: $("#ypqcl_chuli_from" + configMap.uuid).serialize(),
                        type: 'POST',
                        success: function () {
                            
                            Messenger().post({
                                message: '处理成功',
                                type: 'info'
                            })
                            $("#ypqcl_chuli_Box"+configMap.uuid).modal('hide');
                            configMap.ypqclGrid.ajax.reload();
                            return;
                        },
                        error: function () {
                            Messenger().post({
                                message: '处理失败',
                                type: 'error'
                            })
                            return;
                        }
                    })
                })
            }else if (ypqclZT === "已返还") {
                var dd1 = $("[name='ypqclcheck']:checked")[0];
                var id = $(dd1).val();
                var wtid = $(dd1).parent().parent().children("td:eq(1)").text();//所属委托
                var ypbm = $(dd1).parent().parent().children("td:eq(2)").text();//样品编号
                var ypmc = $(dd1).parent().parent().children("td:eq(3)").text();//样品名称
                var zbff = $(dd1).parent().parent().children("td:eq(4)").text();//制备方法
                var zl = $(dd1).parent().parent().children("td:eq(5)").text();//质量
                var sl = $(dd1).parent().parent().children("td:eq(6)").text();//数量
                var lqzl = $(dd1).parent().parent().children("td:eq(7)").text();//领取质量
                var lqsl = $(dd1).parent().parent().children("td:eq(8)").text();//领取数量
                var fhzl = $(dd1).parent().parent().children("td:eq(9)").text();//返还质量
                var fhsl = $(dd1).parent().parent().children("td:eq(10)").text();//返还数量

                $("#ypqcl_id_fh").val(id);
                $("#ypqcl_wtid_fh").val(wtid);
                $("#ypqcl_ypbm_fh").val(ypbm);
                $("#ypqcl_ypmc_fh").val(ypmc);
                $("#ypqcl_zbff_fh").val(zbff);
                $("#ypqcl_zl_fh").val(zl);
                $("#ypqcl_ypsl_fh").val(sl);
                $("#ypqcl_lqzl_fh").val(lqzl);
                $("#ypqcl_lqsl_fh").val(lqsl);
                $("#ypqcl_fhzl_fh").val(fhzl);
                $("#ypqcl_fhsl_fh").val(fhsl);

                $("#fanhuanBT").html("样品信息返还_修改");
                $("#ypqcl_fanhuan_Box"+configMap.uuid).modal({show:true});

                $("#ypclsq_fanhuan").off('click').on("click",function () {
                    $.ajax({
                        url: 'customermanage/ypqcl/updateYpqclfanhuan',
                        data: $("#ypqcl_fanhuan_from" + configMap.uuid).serialize(),
                        type: 'POST',
                        success: function () {
                            
                            Messenger().post({
                                message: '返还成功',
                                type: 'info'
                            })
                            $("#ypqcl_fanhuan_Box"+configMap.uuid).modal('hide');
                            configMap.ypqclGrid.ajax.reload();
                            return;
                        },
                        error: function () {
                            Messenger().post({
                                message: '返还失败',
                                type: 'error'
                            })
                            return;
                        }
                    })
                })
            }
        }else{
            Messenger().post({
                message: '请选择需要修改的样品信息(一条)！',
                type: 'warning'
            });
            return;
        }

    }

    /*样品处理*/
    var updateYpqclchuli = function () {
        
        var ypqclUPIDs=[]//定义数组
        $("input[name='ypqclcheck']:checked",jqueryMap.$container).each(function () {
            ypqclUPIDs.push($(this).val())
        })
        if(ypqclUPIDs.length > 0 && ypqclUPIDs.length < 2 ){
            var dd1 = $("[name='ypqclcheck']:checked")[0];
            var ypqclZT=$(dd1).parent().parent().children("td:eq(11)").text();//状态

            if (ypqclZT === "已返还"  || ypqclZT === "已处理"){
                Messenger().post({
                    message: '样品信息已处理，请重新选择！',
                    type: 'warning'
                });
                return;
            } else {
                var id = $(dd1).val();
                var wtid = $(dd1).parent().parent().children("td:eq(1)").text();//所属委托
                var ypbm = $(dd1).parent().parent().children("td:eq(2)").text();//样品编号
                var ypmc = $(dd1).parent().parent().children("td:eq(3)").text();//样品名称
                var zbff = $(dd1).parent().parent().children("td:eq(4)").text();//制备方法
                var zl = $(dd1).parent().parent().children("td:eq(5)").text();//质量
                var sl = $(dd1).parent().parent().children("td:eq(6)").text();//数量
                var kong='';

                $("#ypqcl_id_lq").val(id);
                $("#ypqcl_wtid_lq").val(wtid);
                $("#ypqcl_ypbm_lq").val(ypbm);
                $("#ypqcl_ypmc_lq").val(ypmc);
                $("#ypqcl_zbff_lq").val(zbff);
                $("#ypqcl_zl_lq").val(zl);
                $("#ypqcl_ypsl_lq").val(sl);

                $("#ypqcl_lqsl_lq").val(kong);
                $("#ypqcl_lqzl_lq").val(kong);

                $("#lingquBT").html("样品信息处理");
                $("#ypqcl_chuli_Box"+configMap.uuid).modal({show:true});

                $("#ypclsq_lingqu").off('click').on("click",function () {
                    $.ajax({
                        url: 'customermanage/ypqcl/updateYpqclchuli',
                        data: $("#ypqcl_chuli_from" + configMap.uuid).serialize(),
                        type: 'POST',
                        success: function () {
                            Messenger().post({
                                message: '处理成功',
                                type: 'info'
                            })
                            $("#ypqcl_chuli_Box"+configMap.uuid).modal('hide');
                            configMap.ypqclGrid.ajax.reload();
                            return;
                        },
                        error: function () {
                            Messenger().post({
                                message: '处理失败',
                                type: 'error'
                            })
                            return;
                        }
                    })
                })
            }
        }else{
            Messenger().post({
                message: '请选择需要处理的样品信息(一条)！',
                type: 'warning'
            });
            return;
        }
    }

    /*样品返还*/
    var updateYpqclfanhuan = function () {
        
        var ypqclUPIDs=[]//定义数组接收样品编码
        $("input[name='ypqclcheck']:checked",jqueryMap.$container).each(function () {
            ypqclUPIDs.push($(this).val())
        })
        if(ypqclUPIDs.length > 0 && ypqclUPIDs.length < 2 ){
            var dd1 = $("[name='ypqclcheck']:checked")[0];
            var ypqclZT=$(dd1).parent().parent().children("td:eq(11)").text();//状态

            if (ypqclZT === "已返还"  || ypqclZT === "已领取"){
                Messenger().post({
                    message: '样品信息未处理或已返还，请重新选择！',
                    type: 'warning'
                });
                return;
            }else{
                var dd1 = $("[name='ypqclcheck']:checked")[0];
                var id = $(dd1).val();
                var wtid = $(dd1).parent().parent().children("td:eq(1)").text();//所属委托
                var ypbm = $(dd1).parent().parent().children("td:eq(2)").text();//样品编号
                var ypmc = $(dd1).parent().parent().children("td:eq(3)").text();//样品名称
                var zbff = $(dd1).parent().parent().children("td:eq(4)").text();//制备方法
                var zl = $(dd1).parent().parent().children("td:eq(5)").text();//质量
                var sl = $(dd1).parent().parent().children("td:eq(6)").text();//数量
                var lqzl = $(dd1).parent().parent().children("td:eq(7)").text();//领取质量
                var lqsl = $(dd1).parent().parent().children("td:eq(8)").text();//领取数量
                var kong ='';
                $("#ypqcl_id_fh").val(id);
                $("#ypqcl_wtid_fh").val(wtid);
                $("#ypqcl_ypbm_fh").val(ypbm);
                $("#ypqcl_ypmc_fh").val(ypmc);
                $("#ypqcl_zbff_fh").val(zbff);
                $("#ypqcl_zl_fh").val(zl);
                $("#ypqcl_ypsl_fh").val(sl);
                $("#ypqcl_lqzl_fh").val(lqzl);
                $("#ypqcl_lqsl_fh").val(lqsl);

                $("#ypqcl_fhsl_fh").val(kong);
                $("#ypqcl_fhzl_fh").val(kong);

                $("#fanhuanBT").html("样品信息返还");
                $("#ypqcl_fanhuan_Box"+configMap.uuid).modal({show:true});

                $("#ypclsq_fanhuan").off('click').on("click",function () {
                    $.ajax({
                        url: 'customermanage/ypqcl/updateYpqclfanhuan',
                        data: $("#ypqcl_fanhuan_from" + configMap.uuid).serialize(),
                        type: 'POST',
                        success: function () {
                            Messenger().post({
                                message: '返还成功',
                                type: 'info'
                            })
                            $("#ypqcl_fanhuan_Box"+configMap.uuid).modal('hide');
                            configMap.ypqclGrid.ajax.reload();
                            return;
                        },
                        error: function () {
                            Messenger().post({
                                message: '返还失败',
                                type: 'error'
                            })
                            return;
                        }
                    })
                })
            }
        }else{
            Messenger().post({
                message: '请选择要返还的样品信息(一条)！',
                type: 'warning'
            });
            return;
        }
    }

    return {
        // 初始化
        init: function (uuid) {
            configMap.uuid = uuid;
            setjqueryMap();
            //初始化表格
            initYPQCLList();
            //查询
            chaxunYPqcl();
            //样品处理
            addYPQCL();

            //重置
            chongzhiYPqcl();
            $("#ypqclUp_btn",jqueryMap.$container).off('click').on('click',function () {//修改
                updateYpqcl();
            });

            $("#ypqclCL_btn",jqueryMap.$container).off('click').on('click',function () { //样品领取
                updateYpqclchuli();
            });

            $("#ypqclFH_btn",jqueryMap.$container).off('click').on('click',function () { //样品返还
                updateYpqclfanhuan();
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        }
    };

}();
