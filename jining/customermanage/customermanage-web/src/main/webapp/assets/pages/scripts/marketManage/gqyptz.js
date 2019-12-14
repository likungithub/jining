var yoglListgqyptz = function () {
    var configMap = {
        path:'',
        uuid:'',
        wx:'',
        dataUrl: "customermanage/gqyptz/selectgqyp",
        nowData:"",
        $content: null
    };
    var jqueryMap ={
        $ypManageDialog:null,
        $container: null,
        $initGridseExcel: null
    }
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#gqyptzDc');
        jqueryMap.$content = $('#zfwt' + uuid);
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
    var initGridgqyptz = $('#gqyptzfeiqiu').DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "ordering": false, //屏蔽排序
        "searching": false,//屏蔽datatales的查询框
        "processing": true, // 打开数据加载时的等待效果
        "serverSide": true, // 打开后台分页
        "autoWidth":false,
        "ajax": {
            "dataSrc": "aaData",
            "url":configMap.dataUrl,
            "data":function (data) {
                data.ypmc=$('#ypmc').val();
            },

        },
        "columns": [
            {
                "data": "ypbm",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="ypcheck"  value="' + data + '"/>';
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
                "data": "wtid",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sb",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "scdw",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "scdwlxdh",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "scrq",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "bzq",
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
        "drawCallback":function () {//加载完数据之后执行
            var cyxxglSeatchContainer = $("#selectyp");//查询
            var resetcyxxglContainer = $("#resetyp");//重置
            var daochuContainer = $("#gqtptzDaochu");//导出

            if(cyxxglSeatchContainer.length > 0){
                cyxxglSeatchContainer.off('click').on('click', findBtn);
            }

            if(daochuContainer.length > 0){
                daochuContainer.off('click').on('click',daochuGqyp);
            }

            if(resetcyxxglContainer.length > 0){
                resetcyxxglContainer.off('click').on('click',resetYqsb);
            };
        }
    });

    /*全选*/
    $('input[name="cydck"]').off('click').on('click',function () {
        if(this.checked){
            $('input[name="ypcheck"]').attr("checked","checked");
        }else{
            $('input[name="ypcheck"]').attr("checked",null);
        }
    });
    /*条件查询*/
    var findBtn = function (){
        initGridgqyptz.ajax.reload();
    }
    /*重置*/
    var resetYqsb = function (){
        $("input").val("")
    }
    /*导出*/
    var daochuGqyp = function () {
        
        var ypid=[]//定义数组接收受控编号
        
        $("input[name='ypcheck']:checked",jqueryMap.$container).each(function () {
            ypid.push($(this).val())
        })
        if(ypid.length>0){
            window.location.href="/customermanage/gqyptz/gqypDc?ypid="+ypid;
        }else{
            Messenger().post({
                message:'请选择导出数据',
                type:'error'
            })
            return;
        }
    }



    return{
        init:function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
        },
        setPath:function (path) {
            configMap.path = path;
        },
    }
}();