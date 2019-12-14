
var addYqList = function () {
// 全局属性参数
    var configMap = {
        dataUrl:'systemmanager/yqyysy/findAllYq',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改企业委托信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除企业委托信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
    };

    var addYqGrid = $("#addYq_ManagerList_m").DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url":configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.yqmc = $("#addYq_yqmc").val();
                    data.startDate=$("#addYq_startDate").val();
                    data.endDate=$("#addYq_endDate").val();
                }
            },
            "columns": [
                {
                    class:"text-left",
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="yqids" value="'+data+'"/>';
                    }
                },
                {
                    class:"text-left",
                    "data": "name",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return data;
                    }
                },
                {
                    class:"text-left",
                    "data":"type",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return data;
                    }
                },
               /* {
                    class:"text-left",
                    "data": "number",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return data;
                    }
                },*/
                {
                    class:"text-left",
                    "data": "gzrq",
                    render:function (data,type,row) {
                        if(data!=''&&data!=null){
                            data =  moment(data).format('YYYY-MM-DD');
                        }else {
                            data="";
                        }
                        return data;
                    }
                },
              /*  {
                    class:"text-left",
                    "data": "wxzq",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return data;
                    }
                },*/
                {
                    class:"text-left",
                    "data": "dqzt",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return data;
                    }
                },
               /* {
                    class:"text-left",
                    "data": "sccj",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return data;
                    }
                },*/
              /*  {
                    class:"text-left",
                    "data": "scrq",
                    render:function (data,type,row) {
                        if(data!=''&&data!=null){
                            data =  moment(data).format('YYYY-MM-DD');
                        }else {
                            data="";
                        }
                        return data;
                    }
                },*/
                {
                    class:"text-left",
                    "data": "sbbh",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return data;
                    }
                }
               /* {
                    class:"text-left",
                    "data": "sybm",
                    "render": function (data, type, row) {
                        if (data==null||data=="") {
                            data="";
                        }
                        return data;
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
                var chaxunContainer=$("#addYq_chaxun");

                if(chaxunContainer.length>0){
                    chaxunContainer.off('click').on('click',chaxunBtn);
                }

            }
        });
    var chaxunBtn=function () {//查询
        addYqGrid.ajax.reload();
    }
    return{
        init:function () {
            laydate.render({
                elem: '#addYq_startDate'  //指定元素
            });
            laydate.render({
                elem: '#addYq_endDate'  //指定元素
            });
        }
    }
}();


