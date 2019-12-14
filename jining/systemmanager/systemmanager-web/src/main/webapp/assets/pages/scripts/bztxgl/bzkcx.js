
var bzkcxList = function () {
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: 'systemmanager/bztxgl/findAllBzkcx',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        htcxGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default bzkcx_bianji"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        delBtn_html: '<a href="javascript:;" class="btn btn-xs default bzkcx_del"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        chakanBtn_html: '<a href="javascript:;" class="btn btn-xs default bzkcx_chakan"  data-toggle="tooltip" data-placement="bottom"   name="htcx_chakan" title="查看详情"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>'
    };
    // 全局Dom
    var jqueryMap = {
        $usersDialog: null,
        $ypManageDialog:null
    };

       var bzkcxGrid = $("#bzkcx_ManagerList_m").DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth":false,
            "scrollX":true,//水平滚动
            "ajax": {
                "url": configMap.dataUrl,
                "dataSrc": "aaData",
                "method": "POST",
                "data": function (data) {
                    data.jcxmc= $("#bzkcx_jcxmc").val();
                }
            },
            "columns": [
                {
                    "data":"id",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<input type="checkbox" name="ids" value="'+data+'" class="ids">'
                    }
                },
                {
                    class:"text-left",
                    "render": function (data, type, row) {
                        return configMap.editBtn_html+configMap.delBtn_html;
                    }
                },
                {
                	class:"text-left",
                    "data":"jcxmc",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data":"ywmc",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "pdnh",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "if_pd",
                    "render": function (data, type, row) {
                        if(data=="true"||data=="1"){
                            data="是";
                        }
                        if(data=="false"||data=="0"){
                            data="否";
                        }
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "yyckjz",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "bl",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "jcff",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "jcyj",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "jcyjmc",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
               /* {
                    class:"text-left",
                    "data": "pdyj",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "pdyjmc",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },*/
                {
                    class:"text-left",
                    "data": "wswnz",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                }, {
                    class:"text-left",
                    "data": "wswcz",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                 {
                    class:"text-left",
                    "data": "wswmz",
                     "render": function (data, type, row) {
                         if (data==null||data=="") {
                             data="";
                         }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                     }
                },
                {
                    class:"text-left",
                    "data": "xlz",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "xlzmrz",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "jcxdw",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "zxyxx",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "zxyxxdw",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "zdyxx",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "zdyxxdw",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "if_xtpd",
                    "render": function (data, type, row) {

                        if(data=="true"||data=="1"){
                            data="是";
                        }
                        if(data=="false"||data=="0"){
                            data="否";
                        }
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
               /* {
                    class:"text-left",
                    "data": "jg",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },*/
                {
                    class:"text-left",
                    "data": "if_bzff",
                    "render": function (data, type, row) {

                        if(data=="true"||data=="1"){
                            data="是";
                        }
                        if(data=="false"||data=="0"){
                            data="否";
                        }
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "if_cma",
                    "render": function (data, type, row) {

                        if(data=="true"||data=="1"){
                            data="是";
                        }
                        if(data=="false"||data=="0"){
                            data="否";
                        }
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }

                },
                {
                    class:"text-left",
                    "data": "if_cmaf",
                    "render": function (data, type, row) {

                        if(data=="true"||data=="1"){
                            data="是";
                        }
                        if(data=="false"||data=="0"){
                            data="否";
                        }
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "if_cnas",
                    "render": function (data, type, row) {

                        if(data=="true"||data=="1"){
                            data="是";
                        }
                        if(data=="false"||data=="0"){
                            data="否";
                        }
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "if_catl",
                    "render": function (data, type, row) {
                        if(data=="true"||data=="1"){
                            data="是";
                        }
                        if(data=="false"||data=="0"){
                            data="否";
                        }
                        if (data==null||data=="") {
                            data = "";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "zbzl",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                    class:"text-left",
                    "data": "zbzldw",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
               /* {
                    class:"text-left",
                    "data": "bz",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                }*/
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
                var chauxnContainer=$("#bzkcx_chaxun");//查询按钮
                var xinzengContainer=$("#bzkcx_xinzeng");//新增
                var bianjiContainer=$(".bzkcx_bianji");//编辑
                var tijiaoContainer=$("#bzkcx_bianji_submit");//编辑表单的提交
                var delContainer=$(".bzkcx_del");//删除

                if(chauxnContainer.length>0){
                    chauxnContainer.off('click').on('click',chaxunBtn);
                }
                if(xinzengContainer.length>0){
                    xinzengContainer.off('click').on('click',xinzengBtn);
                }
                if(bianjiContainer.length>0){
                    bianjiContainer.off('click').on('click',chakanBtn);
                }
                if (tijiaoContainer.length>0){
                    tijiaoContainer.off('click').on('click',editBtn);
                }
                if(delContainer.length>0){
                    delContainer.off('click').on('click',delBtn);
                }
            }
        });
//查看回显
    var chakanBtn =function () {
        var $el = $(this);
        var rowIndex = bzkcxGrid.cell($el.parent()).index().row;
        var id = bzkcxGrid.row(rowIndex).data().id;
        $("#bzkcx_myModal1").modal({show:true});
        $.ajax({
            url:"systemmanager/bztxgl/findBzkcxById",
            type: 'POST',
            data:{"id":id},
            success:function (data) {
                $("#bzkcx_zwmc_bm").val(data.ZWMC_BM);
                $("#bzkcx_ywmc").val(data.YWMC);
                $("#bzkcx_pdnh").val(data.PDNH);
                if(data.IF_PD=="true"||data.IF_PD=="1"){
                    data.IF_PD="是";
                }
                if(data.IF_PD=="false"||data.IF_PD=="0"){
                    data.IF_PD="否";
                }
                $("#bzkcx_if_pd").val(data.IF_PD);
                $("#bzkcx_yyckjz").val(data.YYCKJZ);
                $("#bzkcx_bl").val(data.BL);
                $("#bzkcx_jcff").val(data.JCFF);
                $("#bzkcx_jcyj").val(data.JCYJ);
                $("#bzkcx_jcyjmc").val(data.JCYJMC);
                $("#bzkcx_pdyj").val(data.PDYJ);
                $("#bzkcx_pdyjmc").val(data.PDYJMC);
                $("#bzkcx_wswnz").val(data.WSWNZ);
                $("#bzkcx_wswcz").val(data.WSWCZ);
                $("#bzkcx_wswmz").val(data.WSWMZ);
                $("#bzkcx_xlz").val(data.XLZ);
                $("#bzkcx_xlzmrz").val(data.XLZMRZ);
                $("#bzkcx_bzffjcxdw").val(data.BZFFJCXDW);
                $("#bzkcx_bzzxyxx").val(data.BZZXYXX);
                $("#bzkcx_bzzxyxxdw").val(data.BZZXYXXDW);
                $("#bzkcx_bzzdyxx").val(data.BZZDYXX);
                $("#bzkcx_bzzdyxxdw").val(data.BZZDYXXDW);
                if(data.IF_XTPD=="true"||data.IF_XTPD=="1"){
                    data.IF_XTPD="是";
                }
                if(data.IF_XTPD=="false"||data.IF_XTPD=="0"){
                    data.IF_XTPD="否";
                }
                $("#bzkcx_if_xtpd").val(data.IF_XTPD);
                if(data.IF_BZFF=="true"||data.IF_BZFF=="1"){
                    data.IF_BZFF="是";
                }
                if(data.IF_BZFF=="false"||data.IF_BZFF=="0"){
                    data.IF_BZFF="否";
                }
                $("#bzkcx_if_bzff").val(data.IF_BZFF);
                if(data.IF_CMA=="true"||data.IF_CMA=="1"){
                    data.IF_CMA="是";
                }
                if(data.IF_CMA=="false"||data.IF_CMA=="0"){
                    data.IF_CMA="否";
                }
                $("#bzkcx_if_cma").val(data.IF_CMA);
                if(data.IF_CMAF=="true"||data.IF_CMAF=="1"){
                    data.IF_CMAF="是";
                }
                if(data.IF_CMAF=="false"||data.IF_CMAF=="0"){
                    data.IF_CMAF="否";
                }
                $("#bzkcx_if_cmaf").val(data.IF_CMAF);
                if(data.IF_CNAS=="true"||data.IF_CNAS=="1"){
                    data.IF_CNAS="是";
                }
                if(data.IF_CNAS=="false"||data.IF_CNAS=="0"){
                    data.IF_CNAS="否";
                }
                $("#bzkcx_if_cnas").val(data.IF_CNAS);
                if(data.IF_CATL=="true"||data.IF_CATL=="1"){
                    data.IF_CATL="是";
                }
                if(data.IF_CATL=="false"||data.IF_CATL=="0"){
                    data.IF_CATL="否";
                }
                $("#bzkcx_if_catl").val(data.IF_CATL);
                $("#bzkcx_zbzl").val(data.ZBZL);
                $("#bzkcx_zbzldw").val(data.ZBZLDW);
                $("#bzkcx_id").val(data.ID);
            }
        });
    };
    var chaxunBtn=function () {//查询按钮
       bzkcxGrid.ajax.reload();
    }
    //新增按钮
    var xinzengBtn =function () {
        $("#bzkcx_myModal").modal({show:true});
       $("#bzkcx_xinzeng_submit").off("click").on("click",function () {
            $.ajax({
                url: "systemmanager/bztxgl/addBzkcx",
                data:$("#bzkcx_xinzeng_form").serialize(),
               type:"POST",
                success: function () {
                   bzkcxGrid.ajax.reload();
                    Messenger().post({
                        message: "增加成功",
                        type: 'info',
                        id:"ordermessenger"
                    });
                },
                error: function () {
                    Messenger().post({
                        message: "增加成功",
                        type: 'error',
                        id:"ordermessenger"
                    });;
                }
            });
        });

    };
//编辑
    var editBtn=function () {
            $.ajax({
                url:"systemmanager/bztxgl/updateBzkcx",
                data:$("#bzkcx_bianji_form").serialize(),
                type:"POST",
                success:function (data) {
                   bzkcxGrid.ajax.reload();
                    Messenger().post({
                        message: "修改成功",
                        type: 'info',
                        id:"ordermessenger"
                    });
                    $("#bzkcx_myModal1").modal('hide');
                },
                error:function (data) {
                    Messenger().post({
                        message: "修改失败",
                        type: 'error',
                        id:"ordermessenger"
                    });
                }
        });
    };
//删除
    var delBtn = function () {
        var $el = $(this);
        var rowIndex =bzkcxGrid.cell($el.parent()).index().row;
        var id =bzkcxGrid.row(rowIndex).data().id;
        bootbox.dialog({
            title: '提示',
            message: '是否要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url: "systemmanager/bztxgl/deleteBzkcxById",
                            data: {"id": id},
                            type: "POST",
                            success: function () {
                                bzkcxGrid.ajax.reload();
                                Messenger().post({
                                    message: "删除成功",
                                    type: 'info',
                                    id: "ordermessenger"
                                });
                            },
                            error: function () {
                                Messenger().post({
                                    message: "删除失败",
                                    type: 'error',
                                    id: "ordermessenger"
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
    }
//导入excel
var  daoru=function () {
        openModal("模板导入","/systemmanager/rjlfhzhgl/bztxgl/bzkcx/importExcel.jsp","daoru",function () {
        setInExcel.subimtBtn(function (result) {
                   if (result) {
                       jqueryMap.$ypManageDialog.modal('hide');
                       bzkcxGrid.clear().draw();
                       bzkcxGrid.ajax.reload();
                    }
                  });
       });
}
//打开模态框组件
    var openModal = function (title, url, type, func) {
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

            jqueryMap.$ypManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
 //导出excel
    var daochuBtn=function () {
        var ids=[];//定义一个数组
        $('input[name="ids"]:checked').each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if(ids.length>0){
            window.location.href = "/systemmanager/bztxgl/exportBzkcxExcel?ids="+ids;
        }else {
            Messenger().post({
                message: "请选择导出数据",
                type: 'info',
                id:"ordermessenger"
            });
        }

    }
    return {
        init:function () {
            $("#bzkcx_chongzhi").click(function () {
                $("input").val("");
                bzkcxGrid.ajax.reload();
            });
            $(".reset_dialog").click(function () {
                $("input").val("");
            });
            $("#bzkcx_daoru").off('click').on('click',function () {
                daoru();
            });
            $("#bzkcx_daochu").off('click').on('click',function () {
                daochuBtn();
            });
            $("#bzkcx_checkbox").click(function(){
                if(this.checked){
                    $(".ids").attr("checked","checked");
                }else{
                    $(".ids").attr("checked",null);
                }
            });
        }
    }
}();
//@ sourceURL=contractlist.js
	
	