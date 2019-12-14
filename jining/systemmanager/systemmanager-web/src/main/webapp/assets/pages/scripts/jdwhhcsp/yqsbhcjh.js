var yqyysyListyqsbhcsp = function () {
    var configMap = {
        wx:'',
        dataUrl: "/systemmanager/yqsbjhsp/selectHcjhSp",
        nowData:"",
        uuid:'',
        path:''
    };
    var jqueryMap ={
        $container:null
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
    var initGridyqsbhcjhsp = $('#Yqsbhcjhsp').DataTable({
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
                data.sbmc=$("input[name='sbmc']").val();
                data.skbh=$("input[name='skbh']").val();
            },

        },
        "columns": [
            {
                "data": "skbh",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="yqzdjhche"  value="' + data + '"/>';
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
                "data": "zqddj",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "fbl",
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
                "data": "hcpc",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "jhhcrq",
                render:function(d,t,r){
                    if(d!=null){
                        d=delnull(new Date(d).Format("yyyy-MM-dd"));
                    }else{
                        d=delnull(d);
                    }
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },

            {
                "data": "hcjhzt",
                render:function(d,t,r){
                    if(d=='0'){
                        d='未审批';
                    }
                    if(d=='1'){
                        d='审批通过';
                    }
                    if(d=='2'){
                        d='审批退回';
                    }
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

    /*条件查询*/
    var findBthhc = function (){
        initGridyqsbhcjhsp.ajax.reload();
    }
    /*重置*/
    var resetYqsbhc = function (){
        $("input").val("")
    }
    /*审批功能*/
    var hcjhsp = function () {
        console.log($("#"+configMap.uuid+"yqsbhcspform_delete").serialize())
        // var spids =[]
        // $("input[name='yqzdjhche']:checked",jqueryMap.$container).each(function () {
        //     spids.push($(this).val())
        // })
        // if(spids.length<=0){
        //     Messenger().post({
        //         message:'请勾选数据进行审批',
        //         type:'error',
        //     })
        //     return
        // }
        $.ajax({
            url:'/systemmanager/yqsbjhsp/hcjhsp',
            data:$("#"+configMap.uuid+"yqsbhcspform_delete").serialize(),
            type:'POST',
            success:function () {
                Messenger().post({
                    message:'审批成功',
                    type:'info',
                })
                initGridyqsbhcjhsp.ajax.reload();
            },
            error:function () {
                Messenger().post({
                    message:'审批失败',
                    type:'error',
                })
            }
        })
    }
    //退回操作
    var hcjhspth = function () {
        console.log($("#"+configMap.uuid+"yqsbhcspform_delete").serialize())
        $.ajax({
            url:'/systemmanager/yqsbjhsp/hcjhth',
            data:$("#"+configMap.uuid+"yqsbhcspform_delete").serialize(),
            type:'POST',
            success:function () {
                Messenger().post({
                    message:'退回成功',
                    type:'info',
                })
                initGridyqsbhcjhsp.ajax.reload();
            },
            error:function () {
                Messenger().post({
                    message:'退回失败',
                    type:'error',
                })
            }
        })
    }
    return{
        init:function (uuid) {
            configMap.uuid = uuid;
            console.log(configMap.uuid)
            setJqueryMap();
            //条件查询
            $("#"+configMap.uuid+"yqsbhcSeatch",jqueryMap.$container).off('click').on('click',function () {
                findBthhc();
            });
            //重置操作
            $("#"+configMap.uuid+"resetYqsbhc",jqueryMap.$container).off('click').on('click',function () {
                resetYqsbhc();
            });
            //审批操作
            $("#"+configMap.uuid+"yqsbhcjhtg",jqueryMap.$container).off('click').on('click',function () {
                hcjhsp();
            });
            //退回操作
            $("#"+configMap.uuid+"yqsbhcjhth",jqueryMap.$container).off('click').on('click',function () {
                hcjhspth();
            });
        },
        setPath:function (path) {
            configMap.path = path;
            console.log(configMap.path)
        }
    }
}();