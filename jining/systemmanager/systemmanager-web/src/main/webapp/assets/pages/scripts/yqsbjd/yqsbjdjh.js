var yqyysyListyqsbjdjh = function () {
    var configMap = {
        wx:'',
        dataUrl: "/systemmanager/yqsbjdjh/selectYqsbjdjh",
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
    var initGridyqsbjh = $('#Yqsbjdwh').DataTable({
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
                data.sbmc=$('#sbmc').val();
                data.skbh=$('#skbh').val();
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
                "data": "jhjdjg",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "jhjdrq",
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
                "data": "jhxcjdrq",
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
                "data": "bypc",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "jhwhrq",
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
                "data": "jhxcwhrq",
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
    var findBtn = function (){
        initGridyqsbjh.ajax.reload();
    }
    /*重置*/
    var resetYqsb = function (){
        $("input").val("")
    }
    //制定检定计划
    var zdjdjh = function () {
        var d = []
        jqueryMap.$container.find('[name=yqzdjhche]:checked').each(function () {
            var el = $(this);
            var sqzt = $(el).parent().parent().children("td:eq(1)").text();
            d.push(sqzt);
        })
        if(d.length!=1){
            Messenger().post({
                message:'请选择一条数据',
                type:'error'
            })
            return
        }
        $("#"+configMap.uuid+"myModalyqsbjd").modal({show:true});
        var dd1 = $("[name='yqzdjhche']:checked")[0];
        var skbh = $(dd1).val();
        var sbmc = $(dd1).parent().parent().children("td:eq(1)").text();
        var jhjdrq = $(dd1).parent().parent().children("td:eq(7)").text();
        var jhxcjdjrq = $(dd1).parent().parent().children("td:eq(8)").text();
        $("#injd1").val(skbh);
        $("#injd2").val(sbmc);
        $("#injd3").val(jhjdrq);
        $("#injd4").val(jhxcjdjrq);
        //提交检定计划
        $("#yqsbzdjhsubmit").on("click",function () {
            console.log($("#"+configMap.uuid+"updatejd_form").serialize())
            $.ajax({
                url:'/systemmanager/yqsbjdjh/zdjdjh',
                data:$("#"+configMap.uuid+"updatejd_form").serialize(),
                type:'POST',
                success:function () {
                    Messenger().post({
                        message: '计划制定成功',
                        type: 'info'
                    })
                    $("#"+configMap.uuid+"myModalyqsbjd").modal('hide');
                    initGridyqsbjh.ajax.reload()
                },
                error:function () {
                    Messenger().post({
                        message: '计划制定失败',
                        type: 'error'
                    })
                }
            })
        })
    }
    //制定维护计划
    var zdwhjh = function () {
        var d = []
        jqueryMap.$container.find('[name=yqzdjhche]:checked').each(function () {
            var el = $(this);
            var sqzt = $(el).parent().parent().children("td:eq(1)").text();
            d.push(sqzt);
        })
        if(d.length!=1){
            Messenger().post({
                message:'请选择一条数据',
                type:'error'
            })
            return
        }
        $("#"+configMap.uuid+"myModalyqsbwh").modal({show:true});
        var dd1 = $("[name='yqzdjhche']:checked")[0];
        var skbh = $(dd1).val();
        var sbmc = $(dd1).parent().parent().children("td:eq(1)").text();
        var jhwhrq = $(dd1).parent().parent().children("td:eq(10)").text();
        var jhxcwhrq = $(dd1).parent().parent().children("td:eq(11)").text();
        $("#inwh1").val(skbh);
        $("#inwh2").val(sbmc);
        $("#inwh3").val(jhwhrq);
        $("#inwh4").val(jhxcwhrq);
        //制定维护周期计划
        $("#yqsbzdwhjhsubmit").on("click",function () {
            $.ajax({
                url:'/systemmanager/yqsbjdjh/zdwhjh',
                data:$("#"+configMap.uuid+"updatewh_form").serialize(),
                type:'POST',
                success:function () {
                    Messenger().post({
                        message: '计划制定成功',
                        type: 'info'
                    })
                    $("#"+configMap.uuid+"myModalyqsbwh").modal('hide');
                    initGridyqsbjh.ajax.reload()
                },
                error:function () {
                    Messenger().post({
                        message: '计划制定失败',
                        type: 'error'
                    })
                }
            })
        })
    }
    //制定核查计划
    var zdhcjh = function () {
        var d = []
        jqueryMap.$container.find('[name=yqzdjhche]:checked').each(function () {
            var el = $(this);
            var sqzt = $(el).parent().parent().children("td:eq(1)").text();
            d.push(sqzt);
        })
        if(d.length!=1){
            Messenger().post({
                message:'请选择一条数据',
                type:'error'
            })
            return
        }
        $("#"+configMap.uuid+"myModalyqsbhc").modal({show:true});
        var dd1 = $("[name='yqzdjhche']:checked")[0];
        var skbh = $(dd1).val();
        var sbmc = $(dd1).parent().parent().children("td:eq(1)").text();
        var jhhcrq = $(dd1).parent().parent().children("td:eq(13)").text();
        $("#inhc1").val(skbh);
        $("#inhc2").val(sbmc);
        $("#inhc3").val(jhhcrq);
        //制定核查周期计划
        $("#yqsbzdhcjhsubmit").on("click",function () {
            $.ajax({
                url:'/systemmanager/yqsbjdjh/zdhcjh',
                data:$("#"+configMap.uuid+"updatehc_form").serialize(),
                type:'POST',
                success:function () {
                    Messenger().post({
                        message: '计划制定成功',
                        type: 'info'
                    })
                    $("#"+configMap.uuid+"myModalyqsbhc").modal('hide');
                    initGridyqsbjh.ajax.reload()
                },
                error:function () {
                    Messenger().post({
                        message: '计划制定失败',
                        type: 'error'
                    })
                }
            })
        })
    }
    return{
        init:function (uuid) {
            configMap.uuid = uuid;
            console.log(configMap.uuid)
            setJqueryMap();
            //条件查询
            $("#yqsbjdSeatch",jqueryMap.$container).off('click').on('click',function () {
                findBtn();
            });
            //重置操作
            $("#resetYqsbjd",jqueryMap.$container).off('click').on('click',function () {
                resetYqsb();
            });
            //制定检定计划
            $("#yqsbjdjh",jqueryMap.$container).off('click').on('click',function () {
                zdjdjh();
            });
            //制定维护计划
            $("#yqsbwhjh",jqueryMap.$container).off('click').on('click',function () {
                zdwhjh();
            });
            //制定核查计划
            $("#yqsbhcjh",jqueryMap.$container).off('click').on('click',function () {
                zdhcjh();
            });
        },
        setPath:function (path) {
            configMap.path = path;
            console.log(configMap.path)
        }
    }
}();