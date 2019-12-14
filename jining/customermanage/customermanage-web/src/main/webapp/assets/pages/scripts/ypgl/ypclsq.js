
var ypclsq = function () {
    var configMap = {
        uuid:'',
        id: '',
        ypjslist:null,
        path:'',
        tyzl:"",
        addUrl2:'/ypgl/ypclsqEdit.jsp',
        importUrl:'/marketManage/importJcxmExcel.jsp'
    };
    var setjqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#ypclsq' + configMap.uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data');
    }
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
        $ypclManageDialog:null
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

    var initYplqlist = function () {
        configMap.ypjslist = $("#list_data"+configMap.uuid,jqueryMap.$content).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": "customermanage/ypclz/getYpclView",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypmc= $("#ypmc"+configMap.uuid).val();
                    data.wtid=$("#wtid"+configMap.uuid).val();
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return  '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '" id="jcxm_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "data": "sqry",
                    "render": function (data, type, row) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }

                },
                {
                    class:"text-center",
                    "data": "sqsj",
                    "render": function (data, type, row) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypmc",
                    "render": function (data, type, row) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypbm",
                    "render": function (data, type, row) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "wtid",
                    "render": function (data, type, row) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "zl",
                    "render": function (data, type, row) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "clyy",
                    "render": function (data, type, row) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "clfs",
                    "render": function (data, type, row) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "clry",
                    "render": function (data, type, row) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "zt",
                    "render": function (data, type, row) {
                        var d = delnull(data)
                        if (d=='0') {
                            return "已申请"
                        }else if(d=='1') {
                            return "审批通过";
                        }else if(d=='2') {
                            return "审批不通过";
                        }else{
                            return "确认结束";
                        }
                    }
                },
                {
                    class:"text-center",
                    "data":"info",
                    "render":function (data, type, row) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"bz",
                    "render":function (data, type, row) {
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
                var daoruYpclContainer=$("#daoruYpcl");//导入
                var daoChuYpclContainer = $("#daochuYpcl");//导出
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if(daoruYpclContainer.length>0){
                    daoruYpclContainer.off('click').on('click',daoru);//导入
                }
                if(daoChuYpclContainer.length > 0){//导出
                    daoChuYpclContainer.off('click').on('click',daoChuYpcl);
                }
            }
        });
    };

    //查询
    var chaxun = function () {
        $("#ypclsqSearch"+configMap.uuid).click(function () {
            configMap.ypjslist.ajax.reload();
        })
    }
    //重置
    var chongzhi = function () {
        $("#reset"+configMap.uuid).click(function () {
            $("#ypmc"+configMap.uuid).val("");
            $("#wtid"+configMap.uuid).val("");
            configMap.ypjslist.ajax.reload();
        })
    }

    /*导出*/
    var daoChuYpcl = function () {
        var id=[]//定义数组接收样品处理id
        $("input[name='checkbox_checkbox']:checked",jqueryMap.$container).each(function () {
            id.push($(this).val())
        })
        if(id.length>0){
            window.location.href="/customermanage/ypclz/ypclDc?id="+id;
        }else{
            Messenger().post({
                message:'请选择导出数据',
                type:'error'
            })
            return;
        }
    }

    //新增
    var setYpclAdd = function () {
        $("#ypclAdd"+configMap.uuid).off("click").on("click",function () {
            openModal("样品处理详细信息", "customermanage/ypgl/ypclsqAdd.jsp",function () {
                ypclsq_add.ypcl_add(function (result) {
                    if(result){
                        jqueryMap.$ypManageDialog.modal('hide');
                        configMap.ypjslist.ajax.reload();
                    }
                })
            });
        })
    }
    //打开模态框组件
    var openModal = function (title, url,func) {
        var dialogButtons = {};
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };

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

    //导入excel
    var daoru=function () {
        openModalDr("导入Execl表格","/customermanage/ypgl/importYpclExcel.jsp","daoru",function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ypclManageDialog.modal('hide');
                    configMap.ypjslist.clear().draw();
                    configMap.ypjslist.ajax.reload();
                }else {
                    jqueryMap.$ypclManageDialog.modal('hide');
                }
            });
        });
    }

    //打开模态框组件
    var openModalDr = function (title, url, type, func) {
        var dialogButtons = {};

        if (type === 'daoru') {
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

            jqueryMap.$ypclManageDialog = bootbox.dialog({
                title: title,
                message: html,
                size:"large",
                buttons: dialogButtons
            });
        });
    };

    var openModaldr = function (title, url, type) {
        var dialogButtons = {};
        if(type === "edit"){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractcontinue.saveContract(function (result){
                        if(result){
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.jcxmGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        if(type === "import"){//导入excel表
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    setInJcxmExcel.subimtBtn(function (result) {
                        if (result) {
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.jcxmGrid.clear().draw();
                            configMap.jcxmGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        if(type === "change"){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractChange.saveChange(function (result){
                        if(result){
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.jcxmGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    //修改
    var setYpclUpdate = function () {
            var xgids=[];//定义一个数组
            var flag = false;
            jqueryMap.$content.find('[name=checkbox_checkbox]:checked').each(function () {
                var el = $(this);
                var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
                var shzt = configMap.ypjslist.row(rowIndex).data().zt;
                var id = configMap.ypjslist.row(rowIndex).data().id;
                xgids.push(id);
                if(shzt!='0'){ //通过
                    flag = true;//直接退出
                    return;
                }
            });
            console.log(xgids);
            if(flag.toString() == "false"){
                Messenger().post({
                    message:"处理信息已提交，不可修改!",
                    type:"warning"
                });
                return;
            }
            if (xgids.length != 1) {
                Messenger().post({
                    message: '请选择需要修改的样品信息(一条)！',
                    type: 'warning'
                });
                return;
            }else {
                
                setALLSampleProcessorPeople();
                $.ajax({
                    url: '/customermanage/ypclz/AloneSampleprocessInformation',
                    type: 'POST',
                    dataType: 'JSON',
                    contentType: 'application/json; charset=utf-8',
                    data:JSON.stringify(xgids),
                    success: function (data) {
                        callBack(data);
                    }
                });
            }
            $("#ypclUpdateTC" + configMap.uuid).modal({show: true});

            $('#ypclsq_bc').off().on('click', function () {
                $.ajax({
                    url: '/customermanage/ypclz/updateYpclxx',
                    type: 'POST',
                    data: $("#addyp" + configMap.uuid ).serialize(),
                    success: function (result) {
                        if (result.success) {
                            Messenger().post({
                                message: "修改成功",
                                type: "info"
                            });
                            configMap.id = result.id;
                            configMap.ypjslist.ajax.reload();
                            $("#ypclUpdateTC" + configMap.uuid).modal('hide');
                        } else {
                            Messenger().post({
                                message: result.message,
                                type: 'danger'
                            });
                        }
                    },
                    error: function (result) {
                        $('#saveKhxx').html("保存");
                        Messenger().post({
                            message: '保存失败！',
                            type: 'danger'
                        });
                    }
                });
            });
    }

    //数据回显
    var callBack = function (data) {
        var obj = eval(data);
        $("#ypclIDX").val(obj.id);
        $("#yangpingIDX").val(obj.ypid);
        $("#yangpinmingcX").val(obj.ypmc);
        $("#yangpinbianhaoX").val(obj.ypbm);
        $("#suoshuweituodnaX").val(obj.wtid);

        $("#zhongliangX").val(obj.zl);
        $("#chuliyuanyinX").val(obj.clyy);
        $("#chulifangshiX").val(obj.clfs);
        $("#chulirenX").val(obj.clry);
        $("#beizhuX").val(obj.bz);
    }
    //获取 全部样品信息处理人
    var setALLSampleProcessorPeople = function () {
        $.get(configMap.path + '/ypclz/SampleProcessorPeople', function (data) {
            for (var i = 0; i < data.length; i++) {
                if (configMap.clry == data[i].id) {
                    $('<option selected value="' + data[i].id + '">' + data[i].name + '</option>').appendTo($('#chulirenX', jqueryMap.$qywtJbxxDiv));
                } else {
                    $('<option value="' + data[i].id + '">' + data[i].name + '</option>').appendTo($('#chulirenX', jqueryMap.$qywtJbxxDiv));
                }

            }
        });
    }
    return{
        init:function (id, uuid) {
            configMap.uuid=uuid;
            configMap.id = id;
            //初始化表格
            initYplqlist();
            //查询
            chaxun();
            //重置
            chongzhi();
            setjqueryMap(uuid);

            //新增
            setYpclAdd();
            //修改
            $("#ypclUpdate"+configMap.uuid).off('click').on('click',function () {//修改
                setYpclUpdate();
            });
        },
        setPath:function (path) {
            configMap.path=path;
        }
    }
}();