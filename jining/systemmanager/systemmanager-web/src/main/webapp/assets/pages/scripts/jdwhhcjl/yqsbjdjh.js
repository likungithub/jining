var yqyysyListyqsbjdjl = function () {
    var configMap = {
        wx:'',
        dataUrl: "/systemmanager/yqsbjdjl/selectYqsbjdjl",
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
    var initGridyqsbjl = $('#Yqsbjdwhjluu').DataTable({
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
                    return '<input type="checkbox" name="yqzdjlche"  value="' + data + '"/>';
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
                "data": "jdjg",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "jdrq",
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
                "data": "yxrq",
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
                "data": "jdyj",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "jdjl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "zsbh",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "qryj",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "jdjig",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "whr",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "whrq",
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
                "data": "whjl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },

            {
                "data": "hcr",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "hcrq",
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
                "data": "hcyj",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "hcjl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "hcjg",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            
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
    //通过给定地区导出检定记录
    var daochudqjdjlBtn=function () {
        var data = $("#jddqdq").val()
        var sbjddata1 = $("#sbjddate1").val()
        var sbjddata2 = $("#sbjddate2").val()
        window.location.href = "/systemmanager/yqsbjdjl/exportDqJdjlExcel?dq="+data+"&sbjddata1="+sbjddata1+"&sbjddata2="+sbjddata2;
    }
    //检定记录导出
    var daochujdjlBtn=function () {
        var ids=[];//定义一个数组
        $('input[name="yqzdjlche"]:checked',jqueryMap.$content).each(function(){
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if(ids.length>0){
            window.location.href = "/systemmanager/yqsbjdjl/exportJdjlExcel?ids="+ids;
        }else {
            Messenger().post({
                message: "请选择导出数据",
                type: 'info'
            });
        }
    }
    //维护记录导出
    var daochuwhjlBtn=function () {
        var ids=[];//定义一个数组
        $('input[name="yqzdjlche"]:checked',jqueryMap.$content).each(function(){
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if(ids.length>0){
            window.location.href = "/systemmanager/yqsbjdjl/exportWhjlExcel?ids="+ids;
        }else {
            Messenger().post({
                message: "请选择导出数据",
                type: 'info',
                id:"ordermessenger"
            });
        }

    }
    //核查记录导出
    var daochuhcjlBtn=function () {
        var ids=[];//定义一个数组
        $('input[name="yqzdjlche"]:checked',jqueryMap.$content).each(function(){
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        if(ids.length>0){
            window.location.href = "/systemmanager/yqsbjdjl/exportHcjlExcel?ids="+ids;
        }else {
            Messenger().post({
                message: "请选择导出数据",
                type: 'info',
                id:"ordermessenger"
            });
        }

    }
    /*条件查询*/
    var findBtnjl = function (){
        initGridyqsbjl.ajax.reload();
    }
    /*重置*/
    var resetYqsbjl = function (){
        $("input").val("")
    }
    //制定检定计划
    var zdjdjl = function () {
        var jj = $("[name='yqzdjlche']:checked");
        if(jj.length!=1){
            Messenger().post({
                message:'请选择一条记录',
                type:'error'
            })
            return
        }
        $("#"+configMap.uuid+"myModalyqsbjdjl").modal({show:true});
        var dd1 = jj[0];
        var skbh = $(dd1).val();
        var sbmc = $(dd1).parent().parent().children("td:eq(1)").text();
        var jdjg = $(dd1).parent().parent().children("td:eq(6)").text();
        var jdrq = $(dd1).parent().parent().children("td:eq(7)").text();
        var yxrq = $(dd1).parent().parent().children("td:eq(8)").text();
        var jdyj = $(dd1).parent().parent().children("td:eq(9)").text();
        var jdjl = $(dd1).parent().parent().children("td:eq(10)").text();
        var zsbh = $(dd1).parent().parent().children("td:eq(11)").text();
        var qryj = $(dd1).parent().parent().children("td:eq(12)").text();
        var jdjig = $(dd1).parent().parent().children("td:eq(13)").text();
        console.log(skbh+sbmc)
        $("#injdjl1").val(skbh);
        $("#injdjl2").val(sbmc);
        $("#injdjl3").val(jdrq);
        $("#injdjl4").val(yxrq);
        $("#injdjl5").val(jdyj);
        $("#injdjl6").val(jdjl);
        $("#injdjl7").val(zsbh);
        $("#injdjl8").val(qryj);
        $("#injdjl9").val(jdjig);
        $("#injdjl9").val(jdjg);
        //提交检定记录
        $("#yqsbzdjlsubmit").on("click",function () {
            console.log($("#"+configMap.uuid+"updatejd_form").serialize())
            $.ajax({
                url:'/systemmanager/yqsbjdjl/zdjdjl',
                data:$("#"+configMap.uuid+"updatejd_form").serialize(),
                type:'POST',
                success:function () {
                    Messenger().post({
                        message: '记录成功',
                        type: 'info'
                    })
                    $("#"+configMap.uuid+"myModalyqsbjdjl").modal('hide');
                    initGridyqsbjl.ajax.reload()
                },
                error:function () {
                    Messenger().post({
                        message: '记录失败',
                        type: 'error'
                    })
                }
            })
        })
    }
    /*维护记录*/
    var zdwhjl = function () {
        var jj = $("[name='yqzdjlche']:checked");
        if(jj.length!=1){
            Messenger().post({
                message:'请选择一条记录',
                type:'error'
            })
            return
        }
        $("#"+configMap.uuid+"myModalyqsbwhjl").modal({show:true});
        var dd1 = jj[0];
        var skbh = $(dd1).val();
        var sbmc = $(dd1).parent().parent().children("td:eq(1)").text();
        var whr = $(dd1).parent().parent().children("td:eq(14)").text();
        var whrq = $(dd1).parent().parent().children("td:eq(15)").text();
        var whjl = $(dd1).parent().parent().children("td:eq(16)").text();
        $("#inwhjl1").val(skbh)
        $("#inwhjl2").val(sbmc)
        $("#inwhjl3").val(whrq)
        $("#inwhjl4").val(whjl)
        $("#inwhjl5").val(whr)
        $("#yqsbzdwhjlsubmit").on("click",function () {
            console.log($("#"+configMap.uuid+"updatewhjl_form").serialize())
            $.ajax({
                url:'/systemmanager/yqsbjdjl/zdwhjl',
                data:$("#"+configMap.uuid+"updatewhjl_form").serialize(),
                type:'POST',
                success:function () {
                    Messenger().post({
                        message: '记录成功',
                        type: 'info'
                    })
                    $("#"+configMap.uuid+"myModalyqsbwhjl").modal('hide');
                    initGridyqsbjl.ajax.reload()
                },
                error:function () {
                    Messenger().post({
                        message: '记录失败',
                        type: 'error'
                    })
                }
            })
        })
    }
    /*核查记录*/
    var zdhcjl  = function f() {
        var jj = $("[name='yqzdjlche']:checked");
        if(jj.length!=1){
            Messenger().post({
                message:'请选择一条记录',
                type:'error'
            })
            return
        }
        $("#"+configMap.uuid+"myModalyqsbhcjl").modal({show:true});
        var dd1 = jj[0];
        var skbh = $(dd1).val();
        var sbmc = $(dd1).parent().parent().children("td:eq(1)").text();
        var hcr = $(dd1).parent().parent().children("td:eq(17)").text();
        var hcrq = $(dd1).parent().parent().children("td:eq(18)").text();
        var hcyj = $(dd1).parent().parent().children("td:eq(19)").text();
        var hcjl = $(dd1).parent().parent().children("td:eq(20)").text();
        var hcjg = $(dd1).parent().parent().children("td:eq(21)").text();
        $("#inhcjl1").val(skbh)
        $("#inhcjl2").val(sbmc)
        $("#inhcjl3").val(hcr)
        $("#inhcjl4").val(hcyj)
        $("#inhcjl5").val(hcjl)
        $("#inhcjl6").val(hcjg)
        $("#inhcjl7").val(hcrq)
        $("#yqsbzdhcjlsubmit").on("click",function () {
            $.ajax({
                url:'/systemmanager/yqsbjdjl/zdhcjl',
                data:$("#"+configMap.uuid+"updatehcjl_form").serialize(),
                type:'POST',
                success:function () {
                    Messenger().post({
                        message: '记录成功',
                        type: 'info'
                    })
                    $("#"+configMap.uuid+"myModalyqsbhcjl").modal('hide');
                    initGridyqsbjl.ajax.reload()
                },
                error:function () {
                    Messenger().post({
                        message: '记录失败',
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
            $("#"+configMap.uuid+"yqsbjdSeatch",jqueryMap.$container).off('click').on('click',function () {
                findBtnjl();
            });
            //重置操作
            $("#"+configMap.uuid+"resetYqsbjd",jqueryMap.$container).off('click').on('click',function () {
                resetYqsbjl();
            });
            //制定检定计划
            $("#"+configMap.uuid+"yqsbjdjl",jqueryMap.$container).off('click').on('click',function () {
                zdjdjl();
            });
            //制定维护计划
            $("#"+configMap.uuid+"yqsbwhjl",jqueryMap.$container).off('click').on('click',function () {
                zdwhjl();
            });
            //制定核查计划
            $("#"+configMap.uuid+"yqsbhcjl",jqueryMap.$container).off('click').on('click',function () {
                zdhcjl();
            });
            //导出检定记录
            $("#"+configMap.uuid+"daochujdjl",jqueryMap.$container).off('click').on('click',function () {
                daochujdjlBtn();
            });
            //导出维护记录
            $("#"+configMap.uuid+"daochuwhjl",jqueryMap.$container).off('click').on('click',function () {
                daochuwhjlBtn();
            });
            //导出核查记录
            $("#"+configMap.uuid+"daochuhcjl",jqueryMap.$container).off('click').on('click',function () {
                daochuhcjlBtn();
            });
            //根据地区导出检定记录
            $("#"+configMap.uuid+"daochudqjdjl",jqueryMap.$container).off('click').on('click',function () {
                daochudqjdjlBtn();
            });
            //    时间插件
            $("#sbjddate1", jqueryMap.$container).datepicker({//绑定时间插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $("#sbjddate2", jqueryMap.$container).datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
        },
        setPath:function (path) {
            configMap.path = path;
            console.log(configMap.path)
        }
    }
}();