var yqyysyListyygl = function () {
    var configMap = {
        dataUrl: "customermanage/yygl/yyglSelect",
        nowData:"",
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
    var initGridyygl = $('#yygl_tname').DataTable({
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
                data.ypmc=$("#ypmc").val();
                data.htmc=$("#htmc").val();
                data.ypbctj=$("#ypbctj").val();
            }
        },
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="che"  value="' + data + '"/>';
                }
            },
            {   class:"text-center",
                "data": "ypbm",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {   class:"text-center",
                "data": "ypmc",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {   class:"text-center",
                "data": "htmc",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {   class:"text-center",
                "data": "ypsl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {   class:"text-center",
                "data": "ypdw",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {   class:"text-center",
                "data": "ypbctj",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {   class:"text-center",
                "data": "cczq",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {   class:"text-center",
                "data": "bzq",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            /*接收状态( 199未接收 200 待接收 201 待发放 202 待领样 203待制备 204完成)*/
            {   class:"text-center",
                "data": "jszt",
                render:function(d,t,r){
                    if(d=='199'){
                        d="未接收"
                    }
                    if(d=='200'){
                        d="待接收"
                    }
                    if(d=='201'){
                        d="待发放"
                    }
                    if(d=='202'){
                        d="待领样"
                    }
                    if(d=='203'){
                        d="待制备"
                    }
                    if(d=='204'){
                        d="完成"
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {   class:"text-center",
                "data": "ypjczt",
                render:function(d,t,r){
                    if(d=='001'){
                        d="未检测"
                    }
                    if(d=='002'){
                        d="检测通过"
                    }
                    if(d=='003'){
                        d="检测未通过"
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            /*{   class:"text-center",
                "data": "if_fhcl",

                render:function(d,t,r){
                    if(d=='0'){
                        d="不返还"
                    }
                    if(d=='1'){
                        d="返还"
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },*/
            {   class:"text-center",
                "data": "bzxx",
                render:function(d,t,r){
                    d=delnull(d);
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
        "initComplete":function () {//加载完数据之后执行
            var yyglContainer = $("#yyglSelect");
            var tootipContainer = $('[data-toggle="tooltip"]');
            if (tootipContainer.length > 0) {
                tootipContainer.tooltip();
            };
            if(yyglContainer.length > 0){
                yyglContainer.off('click').on('click',yyglSeatch);
            }
        }
    });
    var yyglSeatch = function () {
        initGridyygl.ajax.reload();
    }
}();