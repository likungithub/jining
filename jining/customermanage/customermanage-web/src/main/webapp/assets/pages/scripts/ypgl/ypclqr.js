
var ypclqr = function () {
    var configMap = {
        id:'',
        uuid:'',
        ypclqrGrid:null,
        path:'',
        tyzl:"",
    };
    var setjqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#ypclqr' + configMap.uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data');
    }
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null
    };

    var initYpxxQRlist = function () {
        configMap.ypclqrGrid = $("#list_data"+configMap.uuid).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": "customermanage/ypclz/getYpclQRView",
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
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
            }
        });
    };

    //查询
    var chaxun = function () {
        $("#ypclsqSearch"+configMap.uuid).click(function () {
            configMap.ypclqrGrid.ajax.reload();
        })
    }
    //重置
    var chongzhi = function () {
        $("#reset"+configMap.uuid).click(function () {
            $("#ypmc"+configMap.uuid).val("");
            $("#wtid"+configMap.uuid).val("");
            configMap.ypclqrGrid.ajax.reload();
        })
    }

    //成功
    var setypclqrAuditPass_btn = function () {
            
            var ids=[];//定义一个数组
            var flag = false;
            jqueryMap.$content.find('[name=checkbox_checkbox]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
               // ids.push($(this).attr('id').substring(7));//将选中的id值添加到数组ids中
                var el = $(this);
                var rowIndex = configMap.ypclqrGrid.cell(el.parent()).index().row;
                var shzt = configMap.ypclqrGrid.row(rowIndex).data().zt;
                var id = configMap.ypclqrGrid.row(rowIndex).data().id;
                ids.push(id);
                if(shzt!='3'){ //通过
                    flag = true;//直接退出
                    return;
                }
            });
            if(flag.toString() == "false"){
                Messenger().post({
                    message:"处理信息已提交，不可修改!",
                    type:"warning"
                });
                return;
            }
            if (ids.length != 1) {
                Messenger().post({
                    message: '请选择需要审批的样品信息(一条)！',
                    type: 'warning'
                });
            } else {
                $.ajax({
                    url: configMap.path + "/ypclz/SampleInfoConfirm",
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'JSON',
                    data: JSON.stringify(ids),
                    success: function (res) {
                        if (res.success) {
                            Messenger().post({
                                message: "保存成功",
                                type: "info"
                            });
                            configMap.ypclqrGrid.ajax.reload();
                        } else {
                            Messenger().post({
                                message: res.message,
                                type: 'danger'
                            });
                        }
                    },
                    error: function (res) {
                        Messenger().post({
                            message: '审批失败！',
                            type: 'danger'
                        });
                    }
                });
            }
    }
    return{
        init:function (uuid) {
            configMap.uuid=uuid;
            //初始化表格
            initYpxxQRlist();
            //查询
            chaxun();
            //重置
            chongzhi();
            setjqueryMap(uuid);
            //通过
            $("#ypclqrAuditPass_btn"+configMap.uuid).off('click').on('click',function () {
                setypclqrAuditPass_btn();
            });


        },
        setPath:function (path) {
            configMap.path=path;
        }
    }
}();