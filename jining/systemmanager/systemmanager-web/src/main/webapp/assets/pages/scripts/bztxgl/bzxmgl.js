
var bzxmgllist = function () {
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: 'systemmanager/bztxgl/findAllBzxmgl',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        htcxGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default bzxmgl_bianji"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改企业委托信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        xinzengBtn_html: '<a href="javascript:;" class="btn btn-xs default bzxmgl_xinzeng"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除企业委托信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        chakanBtn_html: '<a href="javascript:;" class="btn btn-xs default bzxmgl_chakan"  data-toggle="tooltip" data-placement="bottom"   name="htcx_chakan" title="查看详情"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>'
    };

       var bzxmglGrid = $("#bzxmgl_ManagerList_m").DataTable({
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
                    data.htmc = $("#bzxmgl_htmc").val();
                    data.ypmc=$("#bzxmgl_ypmc").val();
                    data.startDate=$("#bzxmgl_startDate").val();
                    data.endDate=$("#bzxmgl_endDate").val();
                }
            },
            "columns": [
                {
                    class:"text-left",
                    "data": "yjid",
                    render:function(data, type, row){
                        return configMap.editBtn_html;
                    }
                },
                {
                    class:"text-left",
                    "data": "ypmc",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                	class:"text-left",
                	"data": "ypbm",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                       return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</span>';
                    }
                },
                {
                	class:"ttext-left",
                    "data":"xmbm",
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
                    "data": "jcrq",
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
              /*  {
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
                            data="";
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
                var chauxnContainer=$("#bzxmgl_chaxun");//查询按钮
                var bianjiContainer=$(".bzxmgl_bianji");
                var tijiaoContainer=$("#bzxmgl_bianji_submit");

                if(chauxnContainer.length>0){
                    chauxnContainer.off('click').on('click',chaxunBtn);
                }
                if(bianjiContainer.length>0){
                    bianjiContainer.off('click').on('click',chakanBtn);
                }
                if (tijiaoContainer.length>0){
                    tijiaoContainer.off('click').on('click',editBtn);
                }
            }
        });
//查看回显
    var chakanBtn =function () {
            var $el = $(this);
            var rowIndex = bzxmglGrid.cell($el.parent()).index().row;
            var yjid = bzxmglGrid.row(rowIndex).data().yjid;
            $("#bzxmgl_myModal1").modal({show:true});
            $.ajax({
                url:"systemmanager/bztxgl/showBzxmgl",
                type: 'POST',
                data:{"yjid":yjid},
                success:function (data) {
                    $("#ypmc").val(data.YPMC);//样品名称
                    $("#ypbm").val(data.YPBM);//包装
                    var rq=data.RQ;//生产日期
                    if(rq!=''&&rq!=null){
                        rq =  moment(rq).format('YYYY-MM-DD');
                    };
                    $("#rq").val(rq);
                    $("#zwmc_bm").val(data.ZWMC_BM);
                    $("#ywmc").val(data.YWMC);
                    $("#pdnh").val(data.PDNH);
                    if(data.IF_PD=="true"||data.IF_PD=="1"){
                        data.IF_PD="是";
                    }
                    if(data.IF_PD=="false"||data.IF_PD=="0"){
                        data.IF_PD="否";
                    }
                    $("#if_pd").val(data.IF_PD);
                    $("#yyckjz").val(data.YYCKJZ);
                    $("#bl").val(data.BL);
                    $("#jcff").val(data.JCFF);
                    $("#jcyj").val(data.JCYJ);
                    $("#jcyjmc").val(data.JCYJMC);
                    $("#pdyj").val(data.PDYJ);
                    $("#pdyjmc").val(data.PDYJMC);
                    $("#wswnz").val(data.WSWNZ);
                    $("#wswcz").val(data.WSWCZ);
                    $("#wswmz").val(data.WSWMZ);
                    $("#xlz").val(data.XLZ);
                    $("#xlzmrz").val(data.XLZMRZ);
                    $("#bzffjcxdw").val(data.BZFFJCXDW);
                    $("#bzzxyxx").val(data.BZZXYXX);
                    $("#bzzxyxxdw").val(data.BZZXYXXDW);
                    $("#bzzdyxx").val(data.BZZDYXX);
                    $("#bzzdyxxdw").val(data.BZZDYXXDW);
                    if(data.IF_XTPD=="true"||data.IF_XTPD=="1"){
                        data.IF_XTPD="是";
                    }
                    if(data.IF_XTPD=="false"||data.IF_XTPD=="0"){
                        data.IF_XTPD="否";
                    }
                    $("#if_xtpd").val(data.IF_XTPD);
                    if(data.IF_BZFF=="true"||data.IF_BZFF=="1"){
                        data.IF_BZFF="是";
                    }
                    if(data.IF_BZFF=="false"||data.IF_BZFF=="0"){
                        data.IF_BZFF="否";
                    }
                    $("#if_bzff").val(data.IF_BZFF);
                    if(data.IF_CMA=="true"||data.IF_CMA=="1"){
                        data.IF_CMA="是";
                    }
                    if(data.IF_CMA=="false"||data.IF_CMA=="0"){
                        data.IF_CMA="否";
                    }
                    $("#if_cma").val(data.IF_CMA);
                    if(data.IF_CMAF=="true"||data.IF_CMAF=="1"){
                        data.IF_CMAF="是";
                    }
                    if(data.IF_CMAF=="false"||data.IF_CMAF=="0"){
                        data.IF_CMAF="否";
                    }
                    $("#if_cmaf").val(data.IF_CMAF);
                    if(data.IF_CNAS=="true"||data.IF_CNAS=="1"){
                        data.IF_CNAS="是";
                    }
                    if(data.IF_CNAS=="false"||data.IF_CNAS=="0"){
                        data.IF_CNAS="否";
                    }
                    $("#if_cnas").val(data.IF_CNAS);
                    if(data.IF_CATL=="true"||data.IF_CATL=="1"){
                        data.IF_CATL="是";
                    }
                    if(data.IF_CATL=="false"||data.IF_CATL=="0"){
                        data.IF_CATL="否";
                    }
                    $("#if_catl").val(data.IF_CATL);
                    $("#zbzl").val(data.ZBZL);
                    $("#zbzldw").val(data.ZBZLDW);
                    $("#bz").val(data.BZ);
                    $("#yjid").val(data.YJID);
                }
            });
    };
    var chaxunBtn=function () {//查询按钮
        bzxmglGrid.ajax.reload();
    }
//编辑
    var editBtn=function () {
            $.ajax({
                url:"systemmanager/bztxgl/updateBzxmgl",
                data:$("#bzxmgl_bianji_form").serialize(),
                dataType:"json",
                type:"POST",
                success:function () {
                    Messenger().post({
                        message: "更新成功",
                        type: 'info',
                        id:"ordermessenger"
                    });
                    bzxmglGrid.ajax.reload();
                    $("#bzxmgl_myModal1").modal('hide');
                },
                error:function () {
                    Messenger().post({
                        message: "更新失败",
                        type: 'error',
                        id:"ordermessenger"
                    });
                }
        });
    };
    return {
        init:function () {
            laydate.render({
                elem: "#bzxmgl_startDate" //指定元素
            });
            laydate.render({
                elem: "#bzxmgl_endDate" //指定元素
            });
            laydate.render({
                elem: "#bzxmgl_rq" //指定元素
            });
            laydate.render({
                elem: "#rq" //指定元素
            });
            $("#bzxmgl_chongzhi").click(function () {
                $("input").val("");
                bzxmglGrid.ajax.reload();
            });
            $(".reset_dialog").click(function () {
                $("input").val("");
            });
        }
    }
}();
//@ sourceURL=contractlist.js
	
	