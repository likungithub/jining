var yqyysyListrygl = function () {
    var configMap = {
        wx:'',
        dataUrl: "/systemmanager/rygl/seatchrygl",
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
    var initGridrygl = $("#ryglrygl").DataTable({
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
                data.name=$("input[name='name']").val();
            },
        },
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="ryglche"  value="' + data + '"/>';
                }
            },
            {
                "data": "name",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },

            {
                "data": "sex",
                render:function(d,t,r){
                    if(d=='0'){
                        d="女"
                    }
                    if(d=='1'){
                        d="男"
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "csrq",
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
                "data": "mz",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "jg",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },

            {
                "data": "zzmm",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "czdz",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "lxfs",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "ssks",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "zc",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "hyzk",
                render:function(d,t,r){
                    if(d=='0'){
                        d="未婚"
                    }
                    if(d=='1'){
                        d="已婚"
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "csxl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "xyxl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "byyx",
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
    var findBtnrygl = function (){
        initGridrygl.ajax.reload();
    }
    /*重置*/
    var resetrygl = function (){
        $("input").val("")
    }
    /*新增党员信息*/
    var addrygl = function () {
        $("#"+configMap.uuid+"myModalrygl").modal({show:true})
        $("#ryglsubmit").on("click",function () {
            $.ajax({
                url: "/systemmanager/rygl/addrygl",
                data:$("#"+configMap.uuid+"rygl_from").serialize(),
                type:"POST",
                success:function () {
                    Messenger().post({
                        message:'添加成功',
                        type: 'info'
                    })
                    $("#"+configMap.uuid+"myModalrygl").modal('hide')
                    initGridrygl.ajax.reload()
                },
                error:function () {
                    Messenger().post({
                        message:'添加失败',
                        type: 'error'
                    })
                }
            })
        })
    }
    /*删除党员信息*/
    var deleterygl = function () {
        var d = []
        jqueryMap.$container.find('[name=ryglche]:checked').each(function () {
            var el = $(this);
            var sqzt = $(el).parent().parent().children("td:eq(1)").text();
            d.push(sqzt);
        })
        if(d.length==0){
            Messenger().post({
                message:'请选择要删除的信息',
                type: 'error'
            })
            return
        }else{
            bootbox.dialog({
                title: '提示',
                message: '是否删除人员信息？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            $.ajax({
                                url:'/systemmanager/rygl/deleterygl',
                                data:$("#"+configMap.uuid+"ryxx").serialize(),
                                type:"POST",
                                success:function () {
                                    Messenger().post({
                                        message:'删除成功',
                                        type: 'info'
                                    })
                                    initGridrygl.ajax.reload()
                                },
                                error:function () {
                                    Messenger().post({
                                        message:'删除失败',
                                        type: 'info'
                                    })
                                }
                            })
                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            });
        }
    }
    /*修改党员信息*/
    var updaterygl = function () {
        var d = []
        jqueryMap.$container.find('[name=ryglche]:checked').each(function () {
            var el = $(this);
            var sqzt = $(el).parent().parent().children("td:eq(1)").text();
            d.push(sqzt);
        })
        if(d.length!=1){
            Messenger().post({
                message:'请选择一条信息',
                type: 'error'
            })
            return
        }
        $("#"+configMap.uuid+"myModalryglupdate").modal({show:true})
        var dd = $("[name='ryglche']:checked")[0];
        var id = $(dd).val();
        var name = $(dd).parent().parent().children("td:eq(1)").text();
        var sex = $(dd).parent().parent().children("td:eq(2)").text();
        var csrq = $(dd).parent().parent().children("td:eq(3)").text();
        var mz = $(dd).parent().parent().children("td:eq(4)").text();
        var jg = $(dd).parent().parent().children("td:eq(5)").text();
        var zzmm = $(dd).parent().parent().children("td:eq(6)").text();
        var czdz = $(dd).parent().parent().children("td:eq(7)").text();
        var lxfs = $(dd).parent().parent().children("td:eq(8)").text();
        var ssks = $(dd).parent().parent().children("td:eq(9)").text();
        var zc = $(dd).parent().parent().children("td:eq(10)").text();
        var hyzk = $(dd).parent().parent().children("td:eq(11)").text();
        var csxl = $(dd).parent().parent().children("td:eq(12)").text();
        var xyxl = $(dd).parent().parent().children("td:eq(13)").text();
        var byyx = $(dd).parent().parent().children("td:eq(14)").text();
        $("#updaterygl1").val(name)
        if(sex=='男'){
            sex = '1'
        }
        if(sex=='女'){
            sex = '0'
        }
        $("#updaterygl2").val(sex)
        $("#updaterygl3").val(csrq)
        $("#updaterygl4").val(mz)
        $("#updaterygl5").val(jg)
        $("#updaterygl6").val(zzmm)
        $("#updaterygl7").val(czdz)
        $("#updaterygl8").val(lxfs)
        $("#updaterygl9").val(ssks)
        $("#updaterygl10").val(zc)
        $("#updaterygl11").val(id)
        if(hyzk=='已婚'){
            hyzk = '1'
        }
        if(hyzk=='未婚'){
            hyzk = '0'
        }
        $("#updaterygl12").val(hyzk)
        $("#updaterygl13").val(csxl)
        $("#updaterygl14").val(xyxl)
        $("#updaterygl15").val(byyx)
        $("#ryglupsubmit").on("click",function () {
            console.log($("#"+configMap.uuid+"ryglupdate_from").serialize())
            $.ajax({
                url:'/systemmanager/rygl/updaterygl',
                data:$("#"+configMap.uuid+"ryglupdate_from").serialize(),
                type:"POST",
                success:function () {
                    Messenger().post({
                        message:'修改成功',
                        type: 'info'
                    })
                    initGridrygl.ajax.reload();
                    $("#"+configMap.uuid+"myModalryglupdate").modal('hide')
                },
                error:function () {
                    Messenger().post({
                        message:'修改失败',
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
            $("#"+configMap.uuid+"ryglSeatch",jqueryMap.$container).off('click').on('click',function () {
                findBtnrygl();
            });
            //重置操作
            $("#"+configMap.uuid+"resetdrygl",jqueryMap.$container).off('click').on('click',function () {
                resetrygl();
            });
            //新增人员信息
            $("#"+configMap.uuid+"adddrygl",jqueryMap.$container).off('click').on('click',function () {
                addrygl();
            });
            //删除人员信息
            $("#"+configMap.uuid+"deletedrygl",jqueryMap.$container).off('click').on('click',function () {
                deleterygl();
            });
            //修改人员信息
            $("#"+configMap.uuid+"updatedrygl",jqueryMap.$container).off('click').on('click',function () {
                updaterygl();
            });
        },
        setPath:function (path) {
            configMap.path = path;
            console.log(configMap.path)
        }
    }
}();