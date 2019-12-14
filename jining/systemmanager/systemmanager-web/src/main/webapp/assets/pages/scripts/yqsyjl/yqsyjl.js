var yqyysyListyqsbsyjl = function () {
    var configMap = {
        path:'',
        uuid:'',
        wx:'',
        dataUrl: "systemmanager/yqsbsyjl/yqsbsyjl",
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
    var initGridyqsbsyjl = $('#Yqsbtzsyjl12').DataTable({
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
                data.sbmc = $("input[name=sbmc]").val();
            },

        },
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="yqsyjlche"  value="' + data + '"/>';
                }
            },
            {
                "data": "yqmc",
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
                "data": "jcxm",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "kssj",
                render:function(d,t,r){
                    if(d!=null){
                        d=delnull(new Date(d).Format("yyyy-MM-dd hh:mm:ss"));
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "jssj",
                render:function(d,t,r){
                    if(d!=null){
                        d=delnull(new Date(d).Format("yyyy-MM-dd hh:mm:ss"));
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "yqzk",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "yhzk",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "czr",
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
    /*条件查询*/
    var findBtnwb = function (){
        initGridyqsbsyjl.ajax.reload();
    }
    /*重置*/
    var resetYqsbwb = function (){
        $("input").val("")
    }
    /*回显联动信息*/
    var yqsbsyjl = function () {
        //显示仪器
        $.post("/systemmanager/yqsbsyjl/hqyqsb?date=" + new Date().getTime(), {}, function(data) {
            console.log(data.length)
            console.log("1233444")
            for (var i = 0; i < data.length; i++) {
                var $val = $("<option value="+data[i].skbh+">" + data[i].sbmc + "</option>");
                $("#yqsbmc").append($val);
            }
        }, "json");
        //显示样品信息
        $.post("/systemmanager/yqsbsyjl/hqypxx?date=" + new Date().getTime(), {}, function(data) {
            for (var i = 0; i < data.length; i++) {
                var $val = $("<option value="+data[i].id+">" + data[i].ypmc + "</option>");
                $("#yqypmc").append($val);
            }
        }, "json");
        console.log($("#yqypmc option:selected").val()+$("#yqypmc option:selected").text())
        $("#yqypmc").change(function() {
            $("#yqjcxm option:gt(0)").remove();
            $.post("/systemmanager/yqsbsyjl/hqjcxm?date=" + new Date().getTime(), {
                "ypid":$("#yqypmc option:selected").val()
            }, function(data) {
                for (var i = 0; i < data.length; i++) {
                    var $val = $("<option value="+data[i].jcxmid+">" + data[i].jcxm + "</option>");
                    $("#yqjcxm").append($val);
                }
            }, "json");
        });
    }
    /*使用完毕记录时间*/
    var yqsywb = function () {
        var d = []
        jqueryMap.$container.find('[name=yqsyjlche]:checked').each(function () {
            var el = $(this);
            var sqzt = $(el).parent().parent().children("td:eq(1)").text();
            d.push(sqzt);
        })
        if(d.length==0){
            Messenger().post({
                message:'请选择数据',
                type:'error'
            })
            return
        }else {
            $.ajax({
                url:'/systemmanager/yqsbsyjl/finishyqsbyp',
                data:$("#"+configMap.uuid+"yqsbsyjl").serialize(),
                type:'POST',
                success:function () {
                    Messenger().post({
                        message:"已记录时间",
                        type:"info"
                    })
                    initGridyqsbsyjl.ajax.reload();
                },
                error:function () {
                    Messenger().post({
                        message:'记录时间失败',
                        type:'error'
                    })
                }
            })
        }
    }
    return{
        init:function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
            $("#"+configMap.uuid+"yqsbtzSeatch",jqueryMap.$container).off('click').on('click',function () {//查询
                findBtnwb();
            });
            $("#"+configMap.uuid+"resetYqsbtz",jqueryMap.$container).off('click').on('click',function () {//重置
                resetYqsbwb();
            });
            $("#"+configMap.uuid+"YqsbtzSywb",jqueryMap.$container).off('click').on('click',function () {//使用完毕时间记录
                yqsywb();
            });
            $("#"+configMap.uuid+"YqsbtzSyjl",jqueryMap.$container).off('click').on('click',function () {//使用记录
                $("#"+configMap.uuid+"yqypmodal").modal({show:true});
                yqsbsyjl();
                $("#"+configMap.uuid+"yqsbsyjl_manage").on("click",function () {
                    $.ajax({
                        url: '/systemmanager/yqsbsyjl/addyqsbyp',
                        data:$("#"+configMap.uuid+"yqyp_from").serialize(),
                        type:'POST',
                        success:function () {
                            Messenger().post({
                                message:'记录成功'
                            })
                            $("#"+configMap.uuid+"yqypmodal").modal("hide");
                            initGridyqsbsyjl.ajax.reload();
                        },
                        error:function () {
                            Messenger().post({
                                message:'记录失败'
                            })
                        }
                    })
                })
            });

        },
        setPath:function (path) {
            configMap.path = path;
        },
    }
}();