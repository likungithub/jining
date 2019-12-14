var yqyysyListyqsbtzwxbf = function () {
    var configMap = {
        path:'',
        uuid:'',
        wx:'',
        dataUrl: "systemmanager/yqsbwxbf/yqsbwxbfSeatch",
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
    var initGridyqsbwxbf = $('#Yqsbtzwxbfsq').DataTable({
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
                    return '<input type="checkbox" name="yqtzwxbfche"  value="' + data + '"/>';
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
                    d=delnull(d);
                    if(d=='0'){
                        d="设备完好"
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                    if(d=='1'){
                        d="申请维修"
                        return '<span style="color: red;display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                    if(d=='2'){
                        d="申请报废"
                        return '<span style="color: red;display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }

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

    /*维修申请信息*/
    var updateYqsbXxWx = function () {
        var dd1 = $("[name='yqtzwxbfche']:checked")[0];
        var skbh = $(dd1).val();
        var sbmc = $(dd1).parent().parent().children("td:eq(1)").text();
        var ggxh = $(dd1).parent().parent().children("td:eq(2)").text();
        var sqzt = $(dd1).parent().parent().children("td:eq(8)").text();
        if(sqzt!="设备完好"){
            Messenger().post({
                message:'无法重复操作',
                type:'error'
            })
            return
        }
        console.log(sqzt);
        console.log(skbh);
        console.log(sbmc);
        $("#inwx1").val(sbmc);
        $("#inwx2").val(ggxh);
        $("#inwx6").val(skbh);
        $("#"+configMap.uuid+"myModalyqsbtzwx").modal({show:true});
        $("#submityqsbtzwx").on("click",function () {
            console.log($("#" + configMap.uuid + "addYqsbtzwx_from").serialize())
            $.ajax({
                url: '/systemmanager/yqsbwxbf/yqsbWxsq',
                data: $("#" + configMap.uuid + "addYqsbtzwx_from").serialize(),
                type: 'POST',
                success: function () {
                    Messenger().post({
                        message: '保存成功',
                        type: 'info'
                    })
                    $("#"+configMap.uuid+"myModalyqsbtzwx").modal('hide');
                    initGridyqsbwxbf.ajax.reload()
                },
                error: function () {
                    Messenger().post({
                        message: '保存失败',
                        type: 'error'
                    })
                }
            })
        })
    }
    var updateYqsbXxBf = function () {
        var dd1 = $("[name='yqtzwxbfche']:checked")[0];
        var skbh = $(dd1).val();
        var sbmc = $(dd1).parent().parent().children("td:eq(1)").text();
        var ggxh = $(dd1).parent().parent().children("td:eq(2)").text();
        var sqzt = $(dd1).parent().parent().children("td:eq(8)").text();
        if(sqzt!="设备完好"){
            Messenger().post({
                message:'无法重复操作',
                type:'error'
            })
            return
        }
        console.log(sqzt);
        console.log(skbh);
        console.log(sbmc);
        $("#inbf1").val(sbmc);
        $("#inbf2").val(ggxh);
        $("#inbf6").val(skbh);
        $("#"+configMap.uuid+"myModalyqsbtzbf").modal({show:true});
        $.ajax({
            url:'/systemmanager/yqsbwxbf/yqsbBfsq',
            type:'POST',
            data:$("#" + configMap.uuid + "addYqsbtzbf_from").serialize(),
            success:function () {
                Messenger().post({
                    message: '保存成功',
                    type: 'info'
                })
                $("#"+configMap.uuid+"myModalyqsbtzbf").modal('hide');
                initGridyqsbwxbf.ajax.reload()
            },
            error:function () {
                Messenger().post({
                    message: '保存失败·',
                    type: 'error'
                })
            }
        })

    }
    /*条件查询*/
    var findBtnwb = function (){
        initGridyqsbwxbf.ajax.reload();
    }
    /*重置*/
    var resetYqsbwb = function (){
        $("input").val("")
    }

    return{
        init:function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
            $("#"+configMap.uuid+"yqsbtzSeatchwxbf",jqueryMap.$container).off('click').on('click',function () {//新增
                findBtnwb();
            });
            $("#"+configMap.uuid+"resetYqsbtzwxbf",jqueryMap.$container).off('click').on('click',function () {//新增
                resetYqsbwb();
            });
            $("#"+configMap.uuid+"yqsbtzWxSq",jqueryMap.$container).off('click').on('click',function () {//新增
                updateYqsbXxWx();
            });
            $("#"+configMap.uuid+"yqsbtzBfSq",jqueryMap.$container).off('click').on('click',function () {//修改
                updateYqsbXxBf();
            });
        },
        setPath:function (path) {
            configMap.path = path;
        },
    }
}();