var jcltjList = function () {
    var configMap = {
        dataUrl: "statisticalanalysis/jcltj/queryList"
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

    var initGrid = $('#jcltj_ManagerList_m').DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "ordering": false, //屏蔽排序
        "searching": false,//屏蔽datatales的查询框
        "processing": true, // 打开数据加载时的等待效果
        "serverSide": true, // 打开后台分页
        "autoWidth":false,
        "ajax": {
            "dataSrc": "aaData",
            "url":configMap.dataUrl,
            "method":"POST",
            "data":function (data) {
                data.jcry=$("#jcltj_jcry").val();
                data.jcks=$("#jcltj_jcks").val();
                data.jclbdm=$("#jcltj_jclb").val();
                data.startDate=$("#jcltj_startDate").val();
                data.endDate=$("#jcltj_endDate").val();
            }
        },

        "columns": [
            {
                "data": null,
                render:function(data,type,row,meta) {
                    return meta.row + 1 + meta.settings._iDisplayStart;
                }
            },
            {
                "data": "htmc",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "htbm",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "ypmc",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "jcxsl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "ypsl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "jcry",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "htwcrq",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
                // "render": function (data, type, row) {
                //     if(data!=''&&data!=null){
                //         data =  moment(data).format('YYYY-MM-DD');
                //     }else {
                //         data='';
                //     }
                //     return data;
                //
                // }

            },
            {
                "data": "ypjczt",
                render:function(d,t,r){
                    if(d=='001'){
                        d="未检测";
                    };
                    if(d=='002'){
                        d="检测通过";
                    };
                    if(d=='003'){
                        d="检测未通过";
                    };
                    if(d=='000'){
                        d="未分配";
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data":"id",
                "render": function (data, type, row) {
                    return  '<a href="javascript:;" class="btn btn-xs default jcltj_ck" data-toggle="tooltip" title="查看详情"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>'
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
        "drawCallback":function () {//加载完数据之后执行
             cxContainer = $("#jcltj_cx");//查询
             ckContainer =$(".jcltj_ck");//查看
            tootipContainer = $('[data-toggle="tooltip"]');

            if (tootipContainer.length > 0) {
                tootipContainer.tooltip();
            };

            if( cxContainer.length > 0){
                cxContainer.off('click').on('click', cxBtn);
            };
            if(ckContainer.length>0){//查看
                ckContainer.off('click').on('click',ckBtn);
            }
        }
    });
    //查询按钮
    var cxBtn = function (){
        initGrid.ajax.reload();
    };

    //查看详细按钮
    var ckBtn = function () {
        $("#jcltjModal").modal({show:true});
        var $el = $(this);
        var rowIndex = initGrid.cell($el.parent()).index().row;  //获取点击当前行的数值
        var jcry = initGrid.row(rowIndex).data().jcry;
        var jcks = initGrid.row(rowIndex).data().jcks;
        var htwcrq = initGrid.row(rowIndex).data().htwcrq;
        $("#jcry1").val(jcry);
        $("#jcks1").val(jcks);
        $("#htwcrq1").val(htwcrq);
    };




    // //原查看按钮获取委托id
    // var ckBtn =function () {
    //     var $el = $(this);
    //     var rowIndex = initGrid.cell($el.parent()).index().row;
    //     var id = initGrid.row(rowIndex).data().id;
    //     alert(id);
    //
    // };





    <!-- 重置查询条件-->
    $("#jcltj_cz").click(function () {
        $("input").val("");
        initGrid.ajax.reload();
    });

    laydate.render({
        elem: "#jcltj_startDate" //指定元素
    });
    laydate.render({
        elem: "#jcltj_endDate" //指定元素
    });

}();