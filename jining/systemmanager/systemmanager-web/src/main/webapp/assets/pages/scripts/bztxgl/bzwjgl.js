
var bzwjglList = function () {
// 全局属性参数
    var configMap = {
        pathid:'',//预览的id
        path: '',
        dataUrl: 'systemmanager/bztxgl/findAllBzwjgl',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        editBtn_html: '<a href="javascript:;" class="bzwjgl_edit" >编辑</a>',
        delBtn_html: '<a href="javascript:;" class="bzwjgl_del" >删除</a>',
        yulanBtn_html: '<a href="javascript:;" class="bzwjgl_yulan" >预览</a>',
        shenheBtn_html: '<a href="javascript:;" class="bzwjgl_shenhe" >审核</a>',
        xiudingBtn_html: '<a href="javascript:;" class="bzwjgl_xiuding" >修订</a>',
        jieyueBtn_html: '<a href="javascript:;" class="bzwjgl_jieyue" >借阅</a>',
        huishouBtn_html: '<a href="javascript:;" class="bzwjgl_huishou">回收</a>',
        xiazaiBtn_html: '<a href="javascript:;" class="bzwjgl_xiazai">下载</a>'
    };

       var bzwjglGrid = $("#bzwjgl_ManagerList_m").DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth":false,
            "ajax": {
                "url": configMap.dataUrl,
                "dataSrc": "aaData",
                "method": "POST",
                "data": function (data) {
                    data.wjml = $("#bzwjgl_wjml").val();
                }
            },
            "columns": [
                {
                    class:"text-left",
                    "data": "WJMC",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "WJML",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                	class:"text-left",
                	"data": "WJBB",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                	class:"ttext-left",
                    "data":"WJBH",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data":"SCSJ",
                    render:function(data, type, row){
                        if(data!=''&&data!=null){
                            data =  moment(data).format('YYYY-MM-DD');
                        }else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "SCR",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "SHR",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }

                },
                {
                    class:"text-left",
                    "data": "SHSJ",
                    render:function(data, type, row){
                        if(data!=''&&data!=null){
                            data =  moment(data).format('YYYY-MM-DD');
                        }else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
              /*  {
                    class:"text-left",
                    "data": "XDR",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "XDSJ",
                    render:function(data, type, row){
                        if(data!=''&&data!=null){
                            data =  moment(data).format('YYYY-MM-DD');
                        }else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "JYR",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "JYSJ",
                    render:function(data, type, row){
                        if(data!=''&&data!=null){
                            data =  moment(data).format('YYYY-MM-DD');
                        }else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "HSR",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "HSSJ",
                    render:function(data, type, row){
                        if(data!=''&&data!=null){
                            data =  moment(data).format('YYYY-MM-DD');
                        }else {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },*/
                {
                    class:"text-left",
                    "data": "WDSM",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "ID",
                    render:function(data, type, row){
                        return configMap.delBtn_html+configMap.editBtn_html+configMap.xiazaiBtn_html+configMap.yulanBtn_html+configMap.shenheBtn_html;
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
                $('[data-toggle="tooltip"]').tooltip();
                var chaxunContainer=$("#bzwjgl_chaxun");//查询按钮
                var xinzengContainer=$("#bzwjgl_xinzeng");//新增按钮
                var delContainer=$(".bzwjgl_del");//删除按钮
                var xiazaiContainer=$(".bzwjgl_xiazai");//下载按钮
                var yulanContainer=$(".bzwjgl_yulan");//预览
                var editContainer=$(".bzwjgl_edit");//修改按钮
                var shenheContainer=$(".bzwjgl_shenhe");//审核
                var xiudingContainer=$(".bzwjgl_xiuding");//修订
                var jieyueContainer=$(".bzwjgl_jieyue");//借阅
                var huishouContainer=$(".bzwjgl_huishou");//回收

                if(chaxunContainer.length>0){
                    chaxunContainer.off('click').on('click',chaxunBtn);
                }
                if(xinzengContainer.length>0){
                    xinzengContainer.off('click').on('click',xinzengBtn);
                }
                if(delContainer.length>0){
                   delContainer.off('click').on('click',delBtn);
                }
                if(editContainer.length>0){
                    editContainer.off('click').on('click',editBtn);
                }
                if(xiazaiContainer.length>0){
                    xiazaiContainer.off('click').on('click',xiazaiBtn);
                }
                if (yulanContainer.length>0){
                    yulanContainer.off('click').on('click',yulanBtn);
                }
                if(shenheContainer.length>0){
                    shenheContainer.off('click').on('click',shenheBtn);
                }
                if(xiudingContainer.length>0){
                    xiudingContainer.off('click').on('click',xiudingBtn);
                }
                if(jieyueContainer.length>0){
                    jieyueContainer.off('click').on('click',jieyueBtn);
                }
                if(huishouContainer.length>0){
                    huishouContainer.off('click').on('click',huishouBtn);
                }
            }
        });
       //查询按钮
    var chaxunBtn=function () {
        bzwjglGrid.ajax.reload();//重新加载
    };
    //新增按钮
    var xinzengBtn=function () {//增加文件
        $("#bzwjgl_myModal").modal({show: true});
        $("#bzwjgl_xinzeng_submit").off('click').on('click', function () {
            var fd = new FormData();
            fd.append("file1", $('#file1')[0].files[0]);
            $.ajax({
                url: "systemmanager/bztxgl/uploadFile",
                type: 'POST',
                data: fd,
                processData: false,
                contentType: false,
                success: function (data) {
                    addBzwjglData(data);
                },
                error: function (data) {
                    Messenger().post({
                        message: "增加失败",
                        type: 'error',
                        id: "ordermessenger"
                    });
                }
            });
        });
    };
        //增加基本信息
        var addBzwjglData=function (data) {
            var wjml=$("#xz_wjml").val();
            var wjbb=$("#xz_wjbb").val();
            var wjbh=$("#xz_wjbh").val();
            var wdsm=$("#xz_wdsm").val();
            var path=data.path;
            var wjmc=data.fileName;
            $.ajax({
                url:"systemmanager/bztxgl/addBzwjglData",
                type: 'POST',
                data:{"wjmc":wjmc,"wjml":wjml,"wjbb":wjbb,"wjbh":wjbh,"path":path,"wdsm":wdsm},
                success:function (data) {
                    bzwjglGrid.ajax.reload();//重新加载
                    $('#bzwjgl_bianji_myModal').modal('hide');
                    Messenger().post({
                        message: "增加成功",
                        type: 'info',
                        id: "ordermessenger"
                    });
                },
                error:function (data) {
                    bzwjglGrid.ajax.reload();//重新加载
                    Messenger().post({
                        message: "增加失败",
                        type: 'error',
                        id:"ordermessenger"
                    });
                }
            })
        };
   //删除
    var delBtn = function () {
        var $el = $(this);
        var rowIndex = bzwjglGrid.cell($el.parent()).index().row;
        var id = bzwjglGrid.row(rowIndex).data().ID;
        bootbox.dialog({
            title: '提示',
            message: '是否要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url:"systemmanager/bztxgl/delBzwjgl",
                            type:"POST",
                            data:{"id":id},
                            success:function (data) {
                                bzwjglGrid.ajax.reload();
                                Messenger().post({
                                    message: "删除成功",
                                    type: 'info',
                                    id:"ordermessenger"
                                });
                            },
                            error:function (data) {
                                bzwjglGrid.ajax.reload();
                                Messenger().post({
                                    message: "删除失败",
                                    type: 'error',
                                    id:"ordermessenger"
                                });
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
    };

    //编辑按钮
    var editBtn=function () {
        var $el = $(this);
        var rowIndex = bzwjglGrid.cell($el.parent()).index().row;
        var id = bzwjglGrid.row(rowIndex).data().ID;
        $("#bzwjgl_bianji_myModal").modal({show:true});
        findOneBzwjgl(id);
        $("#mbzwjgl_bianji_subit").off('click').on('click',function () {
            $.ajax({
                url:"systemmanager/bztxgl/enditBzwjgl",
                type:"POST",
                data:$("#bzwjgl_bianji_form").serialize(),
                success:function (data) {
                    bzwjglGrid.ajax.reload();
                    Messenger().post({
                        message: "修改成功",
                        type: 'info',
                        id:"ordermessenger"
                    });
                    $('#bzwjgl_bianji_myModal').modal('hide');
                },
                error:function (data) {
                    bzwjglGrid.ajax.reload();
                    Messenger().post({
                        message: "修改失败",
                        type: 'error',
                        id:"ordermessenger"
                    });
                }
            });
        })
    };
    var findOneBzwjgl=function (id) {
        $.ajax({
            url:"systemmanager/bztxgl/findOneBzwjgl",
            type:"POST",
            data:{"id":id},
            success:function (data) {
                callBack(data);
            }
        });
    };
    var callBack=function (data) {
            $("#wjmc").val(data.WJMC);
            $("#wjml").val(data.WJML);
            $("#wjbb").val(data.WJBB);
            $("#wjbh").val(data.WJBH);
            $("#scr").val(data.SCR);
            $("#id").val(data.ID);
            $("#wdsm").val(data.WDSM);
            if(data.SCSJ!=''&&data.SCSJ!=null){
               data.SCSJ =  moment(data.SCSJ).format('YYYY-MM-DD');
             }else {
               data.SCSJ="";
            }
            $("#scsj").val(data.SCSJ);
    };
    //下载按钮
    var xiazaiBtn=function () {
        var $el = $(this);
        var rowIndex = bzwjglGrid.cell($el.parent()).index().row;
        var id = bzwjglGrid.row(rowIndex).data().ID;
        window.location.href = "/systemmanager/bztxgl/downloadBzwjgl?id="+id;//加载下载的路径
    };
    //检查预览的文件
    var checkfile=function (fileDir) {
        var suffix = fileDir.substr(fileDir.lastIndexOf("."));
       if (".xls" == suffix || ".xlsx"== suffix) {
           POBrowser.openWindowModeless('/systemmanager/bzwjgl/openexcel?pathid='+configMap.pathid ,'width=1200px;height=800px;');
        } else if (".doc" == suffix||".docx" == suffix) {
           POBrowser.openWindowModeless('/systemmanager/bzwjgl/openword?pathid='+configMap.pathid ,'width=1200px;height=800px;');
        }else {
           Messenger().post({
               message: "对不起，系统只支持Word和Excel预览！",
               type: 'error',
               id:"ordermessenger"
           });
       }
    }
    //预览
    var yulanBtn=function () {
        var $el = $(this);
        var rowIndex = bzwjglGrid.cell($el.parent()).index().row;
        var id = bzwjglGrid.row(rowIndex).data().ID;
        configMap.pathid=id;
        $.ajax({
            url: "systemmanager/bztxgl/findOneBzwjgl",
            type: "POST",
            data: {"id": id},
            success: function (data) {
                checkfile(data.FILE_PATH);
            },
            error: function (data) {
                Messenger().post({
                    message: "网络出现异常！",
                    type: 'error',
                    id:"ordermessenger"
                });
            }
        })

    };
    //审核
    var shenheBtn=function () {
        var $el = $(this);
        var rowIndex = bzwjglGrid.cell($el.parent()).index().row;
        var id = bzwjglGrid.row(rowIndex).data().ID;
        $.ajax({
            url:"systemmanager/bztxgl/addShenhe",
            type:"POST",
            data:{"id":id},
            success:function (data) {
                bzwjglGrid.ajax.reload();
                Messenger().post({
                    message: "审核成功",
                    type: 'info',
                    id:"ordermessenger"
                });
            },
            error:function (data) {
                bzwjglGrid.ajax.reload();
                Messenger().post({
                    message: "审核失败",
                    type: 'error',
                    id:"ordermessenger"
                });
            }
        });
    };
    //修订
    var xiudingBtn=function () {
        var $el = $(this);
        var rowIndex = bzwjglGrid.cell($el.parent()).index().row;
        var id = bzwjglGrid.row(rowIndex).data().ID;
        $.ajax({
            url:"systemmanager/bztxgl/addXiuding",
            type:"POST",
            data:{"id":id},
            success:function (data) {
                bzwjglGrid.ajax.reload();
                Messenger().post({
                    message: "修订成功",
                    type: 'info',
                    id:"ordermessenger"
                });
            },
            error:function (data) {
                bzwjglGrid.ajax.reload();
                Messenger().post({
                    message: "修订失败",
                    type: 'error',
                    id:"ordermessenger"
                });
            }
        });
    };
    //借阅
    var jieyueBtn=function () {
        var $el = $(this);
        var rowIndex = bzwjglGrid.cell($el.parent()).index().row;
        var id = bzwjglGrid.row(rowIndex).data().ID;
        $.ajax({
            url:"systemmanager/bztxgl/addJieyue",
            type:"POST",
            data:{"id":id},
            success:function (data) {
                bzwjglGrid.ajax.reload();
                Messenger().post({
                    message: "借阅成功",
                    type: 'info',
                    id:"ordermessenger"
                });
            },
            error:function (data) {
                bzwjglGrid.ajax.reload();
                Messenger().post({
                    message: "借阅失败",
                    type: 'error',
                    id:"ordermessenger"
                });
            }
        });
    };
    //回收
    var huishouBtn=function () {
        var $el = $(this);
        var rowIndex = bzwjglGrid.cell($el.parent()).index().row;
        var id = bzwjglGrid.row(rowIndex).data().ID;
        $.ajax({
            url:"systemmanager/bztxgl/addHuishou",
            type:"POST",
            data:{"id":id},
            success:function (data) {
                bzwjglGrid.ajax.reload();
                Messenger().post({
                    message: "回收成功",
                    type: 'info',
                    id:"ordermessenger"
                });
            },
            error:function (data) {
                bzwjglGrid.ajax.reload();
                Messenger().post({
                    message: "回收失败",
                    type: 'error',
                    id:"ordermessenger"
                });
            }
        });
    };
    return{
        init:function () {
            laydate.render({
                elem: "#scrq1" //指定元素
            });
            laydate.render({
                elem: "#scsj" //指定元素
            });
            $(".reset").click(function () {
                $("input").val("");
                bzwjglGrid.ajax.reload();//重新加载
            });
            $('input[id=file1]').change(function () {
                $('#photoCover').val($(this).val());

            });
        }
    }
}();

	