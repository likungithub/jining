var yqyysyListyqsbtzwxyjsp = function () {
    var configMap = {
        path:'',
        uuid:'',
        wx:'',
        dataUrl: "systemmanager/yqsbwxsjsp/yqsbwxyjspSeatch",
        nowData:"",
    };
    var jqueryMap ={
        $ypManageDialog:null,
        $container: null,
    }
    var setJqueryMap = function () {
        jqueryMap.$container = $('#'+configMap.uuid+'-manager-container');
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
    /*时间格式转换*/
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    var initGridyqsbwxbfsp = $('#Yqsbtzwxyjsp').DataTable({
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
                data.sbmc=$('#sbmcyjsp').val();
                data.skbh=$('#skbhyjsp').val();
            },

        },
        "columns": [
            {
                "data": "skbh",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="yqtzwxbfspche"  value="' + data + '"/>';
                }
            },
            {
                "data": "sbmc",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "ggxh",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sccs",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sbyz",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sbzk",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "wxyy",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "bfyy",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "sqzt",
                render:function(d,t,r){
                    if(d=='0'){
                        d="设备完好"
                    }
                    if(d=='1'){
                        d="申请维修"
                    }
                    if(d=='2'){
                        d="申请报废"
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "spzt",
                render:function(d,t,r){
                    if(d=='0'){
                        d="未审批"
                    }
                    if(d=='1'){
                        d="审批通过"
                    }
                    if(d=='2'){
                        d="审批退回"
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "wxbz",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "bfbz",
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
            var tootipContainer = $('[data-toggle="tooltip"]');

            if (tootipContainer.length > 0) {
                tootipContainer.tooltip();
            };
        }
    });

    /*维修或是报废申请审批操作*/
    var updateYqsbWbSp = function () {
        var d = []
        jqueryMap.$container.find('[name=yqtzwxbfspche]:checked').each(function () {
            var el = $(this);
            var sqzt = $(el).parent().parent().children("td:eq(8)").text();
            d.push(sqzt);
        })
        if(d.length!=1){
            Messenger().post({
                message:'请选择一条数据',
                type:'error'
            })
            return
        }
        // if(d[0]=="申请报废"){
            console.log("123")
            $.ajax({
                url: '/systemmanager/yqsbwxsjsp/yqsbwxspyj',
                data:$("#"+configMap.uuid+"yqsbtzform_deleteyjsp").serialize(),
                type:'POST',
                success:function () {
                    Messenger().post({
                        message:'审批成功',
                        type:'info'
                    })
                    initGridyqsbwxbfsp.ajax.reload();
                },
                error:function () {
                    Messenger().post({
                        message:'审批失败',
                        type:'info'
                    })
                }
            })
        // }
        // if(d[0]=="申请维修"){
        //     console.log("345")
        //     console.log(d[0])
        //     $.ajax({
        //         url: '/systemmanager/yqsbwxbf/yqsbBfsp',
        //         data:$("#"+configMap.uuid+"yqsbtzform_delete").serialize(),
        //         type:'POST',
        //         success:function () {
        //             Messenger().post({
        //                 message:'审批成功',
        //                 type:'info'
        //             })
        //             initGridyqsbwxbfsp.ajax.reload();
        //         },
        //         error:function () {
        //             Messenger().post({
        //                 message:'审批失败',
        //                 type:'info'
        //             })
        //         }
        //     })
        // }
    }
    /*退回操作*/
    var updateYqsbWbTh = function () {
        $.ajax({
            url: '/systemmanager/yqsbwxsjsp/yqsbWxspthyj',
            data:$("#"+configMap.uuid+"yqsbtzform_deleteyjsp").serialize(),
            type:'POST',
            success:function () {
                Messenger().post({
                    message:'退回成功',
                    type:'info'
                })
                initGridyqsbwxbfsp.ajax.reload();
            },
            error:function () {
                Messenger().post({
                    message:'退回失败',
                    type:'info'
                })
            }
        })
    }
    /*条件查询*/
    var findBtnwb = function (){
        initGridyqsbwxbfsp.ajax.reload();
    }
    /*重置*/
    var resetYqsbwb = function (){
        $("input").val("")
    }

    return{
        init:function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
            $("#"+configMap.uuid+"yqsbtzSeatchwxyjsp",jqueryMap.$container).off('click').on('click',function () {
                findBtnwb();
            });
            $("#"+configMap.uuid+"resetYqsbtzwxyjsp",jqueryMap.$container).off('click').on('click',function () {
                resetYqsbwb();
            });
            $("#"+configMap.uuid+"yqsbtzSpTgyjsp",jqueryMap.$container).off('click').on('click',function () {
                updateYqsbWbSp();
            });
            $("#"+configMap.uuid+"yqsbtzSpThyjsp",jqueryMap.$container).off('click').on('click',function () {
                updateYqsbWbTh();
            });
        },
        setPath:function (path) {
            configMap.path = path;
        },
    }
}();