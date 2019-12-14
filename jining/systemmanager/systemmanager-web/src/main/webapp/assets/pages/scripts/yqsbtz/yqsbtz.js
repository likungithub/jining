var yqyysyListyqsbtz = function () {
    var configMap = {
        path:'',
        uuid:'',
        wx:'',
        dataUrl: "systemmanager/yqsb/yqsbtzDT",
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
    var initGridyqsb = $('#Yqsbtzfeiqiu').DataTable({
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
                    return '<input type="checkbox" name="yqtzche"  value="' + data + '"/>';
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
                "data": "sbyz",
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
                    }
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
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
        "drawCallback":function () {//加载完数据之后执行
            var yqsbtzSeatchContainer = $("#yqsbtzSeatch");//查询
            var resetYqsbtzContainer = $("#resetYqsbtz");//重置
            var daoruContainer=$("#yqsbtzDaoru");//导入
            var updateContainer = $("#yqsbtzDaochu");//导出
            var tootipContainer = $('[data-toggle="tooltip"]');
            var shanContainer = $("#yqsbtzShan");//删除
            // var addNewContainer = $("#yqsbtzAddnew");
            //
            // if(addNewContainer.length > 0){
            //     addNewContainer.off('click').on('click',addNewYqsb);
            // }
            if(shanContainer.length > 0){
                shanContainer.off('click').on('click',deleteYqsb);
            }
            if(yqsbtzSeatchContainer.length > 0){
                yqsbtzSeatchContainer.off('click').on('click', findBtn);
            }
            if(resetYqsbtzContainer.length > 0){
                resetYqsbtzContainer.off('click').on('click',resetYqsb);
            }
            if(updateContainer.length > 0){
                updateContainer.off('click').on('click',updateYqsb);
            }
            if(daoruContainer.length>0){
                daoruContainer.off('click').on('click',daoru);//导入
            }
            if (tootipContainer.length > 0) {
                tootipContainer.tooltip();
            };
        }
    });
    /*全选*/
    $('input[name="yqsbck"]').off('click').on('click',function () {
        if(this.checked){
            $('input[name="yqtzche"]').attr("checked","checked");
        }else{
            $('input[name="yqtzche"]').attr("checked",null);
        }
    });
    /*新增仪器设备台账*/
    var addNewYqsb = function () {
        $("#"+configMap.uuid+"myModalyqsbtz").modal({show:true});
        $("#submityqsbtz").on("click",function () {
            // console.log($("#"+configMap.uuid+"addYqsbtz_from").serialize())
            $.ajax({
                url:'/systemmanager/yqsb/addNewYqsb',
                data:$("#"+configMap.uuid+"addYqsbtz_from").serialize(),
                type:'POST',
                success:function () {
                    Messenger().post({
                        message:'添加成功',
                        type:'info'
                    })
                    $("#"+configMap.uuid+"myModalyqsbtz").modal('hide');
                    initGridyqsb.ajax.reload();
                },
                error:function () {
                    Messenger().post({
                        message:'添加失败',
                        type:'error'
                    })
                }
            })
        })
    }
    /*修改仪器设备信息*/
    var updateYqsbXx = function () {
        var dd1 = $("[name='yqtzche']:checked")[0];
        var skbh = $(dd1).val();
        var sbmc = $(dd1).parent().parent().children("td:eq(1)").text();
        var ggxh = $(dd1).parent().parent().children("td:eq(2)").text();
        var zqddj = $(dd1).parent().parent().children("td:eq(3)").text();
        var fbl = $(dd1).parent().parent().children("td:eq(4)").text();
        var sccs = $(dd1).parent().parent().children("td:eq(5)").text();
        var sbyz = $(dd1).parent().parent().children("td:eq(6)").text();
        var jdjg = $(dd1).parent().parent().children("td:eq(7)").text();
        var jdrq = $(dd1).parent().parent().children("td:eq(8)").text();
        var bzxx = $(dd1).parent().parent().children("td:eq(9)").text();
        console.log(skbh);
        console.log(sbmc)
        $("#ins1").val(sbmc);
        $("#ins2").val(ggxh);
        $("#ins3").val(zqddj);
        $("#ins4").val(fbl);
        $("#ins5").val(sccs);
        $("#ins6").val(sbyz);
        // $("#ins7").val(jdjg);
        // $("#ins8").val(jdrq);
        $("#ins9").val(bzxx);
        $("#ins10").val(skbh);
        $("#"+configMap.uuid+"myModalyqsbtzUpdate").modal({show:true});
        $("#submityqsbtzupdate").on("click",function () {
            console.log($("#" + configMap.uuid + "updateYqsbtz_from").serialize())
            $.ajax({
                url: '/systemmanager/yqsb/updateYqsb',
                data: $("#" + configMap.uuid + "updateYqsbtz_from").serialize(),
                type: 'POST',
                success: function () {
                    Messenger().post({
                        message: '修改成功',
                        type: 'info'
                    })
                    $("#"+configMap.uuid+"myModalyqsbtzUpdate").modal('hide');
                    initGridyqsb.ajax.reload()
                },
                error: function () {
                    Messenger().post({
                        message: '修改失败',
                        type: 'error'
                    })
                }
            })
        })
    }
    /*删除操作*/
    var deleteYqsb = function () {
        /*删除提示*/
        bootbox.dialog({
            title: '提示',
            message: '确定要删除台账信息？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url:"systemmanager/yqsb/deleteYqsb",
                            type: 'POST',
                            data:$("#yqsbtzform_delete").serialize(),
                            success:function () {
                                Messenger().post({
                                    message: '删除成功！'
                                });
                                initGridyqsb.ajax.reload();
                                $("#myModalyqsbcg").modal('hide');
                            },
                            error:function () {
                                Messenger().post({
                                    message: '删除失败！'
                                });
                            }
                        });
                    }
                },
                cancel: {
                    label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                    className: 'btn btn-default borderRadius4'
                }
            }
        })
    }
    /*条件查询*/
    var findBtn = function (){
        initGridyqsb.ajax.reload();
    }
    /*重置*/
    var resetYqsb = function (){
        $("input").val("")
    }
    /*导出*/
    var updateYqsb = function () {
        var skbhs=[]//定义数组接收受控编号
        $("input[name='yqtzche']:checked",jqueryMap.$container).each(function () {
            skbhs.push($(this).val())
        })
        if(skbhs.length>0){
            window.location.href="/systemmanager/yqsb/tzxxDc?skbhs="+skbhs;
        }else{
            Messenger().post({
                message:'请选择导出数据',
                type:'error'
            })
            return;
        }
    }

    //导入excel
    var daoru=function () {
        openModal("导入Execl表格","/systemmanager/rjlfhzhgl/yqsbgl/yqsbtz/importYqsbtzExcel.jsp","daoru",function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ypManageDialog.modal('hide');
                    initGridyqsb.clear().draw();
                    initGridyqsb.ajax.reload();
                }
            });
        });
    }
//打开模态框组件
    var openModal = function (title, url, type, func) {
        var dialogButtons = {};

        if (type === 'daoru') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666',
        }

        $.get(url, function (html) {

            jqueryMap.$ypManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    var fswjxx = function(){
        $.ajax({
            url:'/systemmanager/yqsb/xxtx',
            type:'POST',
            data:'',
            success:function () {
                Messenger().post({
                    message:'保存成功',
                    type:'info'
                })
                $("#"+configMap.uuid+"myModalyqsbtz").modal('hide');
                initGridyqsb.ajax.reload();
            },
            error:function () {
                Messenger().post({
                    message:'保存失败',
                    type:'error'
                })
            }
        })
    }
    return{
        init:function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
            $("#yqsbtzAddnew",jqueryMap.$container).off('click').on('click',function () {//新增
                addNewYqsb();
            });
            $("#yqsbtzUpdatenew",jqueryMap.$container).off('click').on('click',function () {//修改
                updateYqsbXx();
            });
            $("#yqsbtzfswjxx",jqueryMap.$container).off('click').on('click',function () {//修改
                fswjxx();
            });
        },
        setPath:function (path) {
            configMap.path = path;
        },
    }
}();