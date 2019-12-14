var yqyysyList1yqsbcg = function () {
    var configMap = {
        uuid:'',
        path:'',
        dataUrl: "systemmanager/yqsbcg/yqsbcgSeatch",
        nowData:"",
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $ypManageDialog: null,
        $ypManageDataTable: null,
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

    var setJqueryMap = function () {
        jqueryMap.$container = $('#yqsbcg0-manager-container');
        jqueryMap.$blockTarget = $('body');
    };
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
    var initGridyqsbcg = $('#ManagerList_yqsbcg').DataTable({
        "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
        "ordering": false, //屏蔽排序
        "searching": false,//屏蔽datatales的查询框
        "processing": true, // 打开数据加载时的等待效果
        "serverSide": true, // 打开后台分页
        "autoWidth":false,
        "ajax": {
            "url":configMap.dataUrl,
            "dataSrc": "aaData",
            "data":function (data) {
                data.cgmc=$('#cgmc').val();
            }
        },
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="yqsbcgche"  value="' + data + '"/>';
                }
            },
            {
              "data":"cgmc",
              "render":function(d,t,r){
                  d=delnull(d);
                  return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
              }
            },

            {
                "data": "pp",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "bj",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "zl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "xh",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sqr",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sqbm",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "sqrq",
                render:function(d,t,r){
                    d=delnull(new Date(d).Format("yyyy-MM-dd"));
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }
            },
            {
                "data": "yt",
                render:function(d,t,r){
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
            },
            {
                "data": "tjbz",
                render:function(d,t,r){
                    if(d=='0'){
                        d="未提交"
                    }
                    if(d=='1'){
                        d="已提交"
                    }
                    console.log(d)
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
            var seatchContainer = $("#seatchyq");
            var resetyqContainer = $("#resetyq");
            var submityqContainer = $("#submityq");
            var bfsubyqContainer = $("#bfsubyq");
            var tootip1Container = $('[data-toggle="tooltip"]');
            var yqcgsqDaoRuContainer = $("#yqcgsqDaoRu");
            var updateContainer = $("#updateyq");
            var cgsqsubmitContainer = $("#cgsqsubmit");
            var dycgdContainer = $("#cgddy");

            if(dycgdContainer.length>0){
                dycgdContainer.off("click").on("click",sbcgsqd);
            }
            if(cgsqsubmitContainer.length>0){
                cgsqsubmitContainer.off("click").on("click",cgsqsubmitCon);
            }
            if(yqcgsqDaoRuContainer.length>0){
                yqcgsqDaoRuContainer.off("click").on("click",daoru);
            }
            if(updateContainer.length>0){
                updateContainer.off("click").on("click",updateYqsbcgssq);
            }
            if (tootip1Container.length > 0) {
                tootip1Container.tooltip();
            }
            if(seatchContainer.length>0){
                seatchContainer.off("click").on("click",seatch);
            }
            if(resetyqContainer.length>0){
                resetyqContainer.off("click").on("click",reaset);
            }
            if(submityqContainer.length>0){
                submityqContainer.off("click").on("click",submityq);
            }
            if(bfsubyqContainer.length>0){
                bfsubyqContainer.off("click").on("click",bfsubyq);
            }
        }
    });
    /*条件查询*/
    var seatch = function () {
        initGridyqsbcg.ajax.reload();
    }
    /*重置条件*/
    var reaset = function () {
        $("input").val("");
    }
    /*提交采购申请*/
    var cgsqsubmitCon = function () {
        console.log($("#yqsbcgsq_form").serialize());
        $.ajax({
            url:"systemmanager/yqsbcg/cgsqSubmit",
            data:$("#yqsbcgsq_form").serialize(),
            type:'POST',
            dateType:'json',
            success:function () {
                Messenger().post({
                    message:"提交成功",
                    type:'info'
                })
                initGridyqsbcg.ajax.reload();
            },
            error:function () {
                Messenger().post({
                    message:"提交失败",
                    type:'error'
                })
            }
        })
    }
    /*新增操作*/
    var submityq = function () {
        $("#myModalyqsbcg").modal({show:true});
        $("#bucgsqtiji").off('click').on('click',function () {
            $.ajax({
                url:"systemmanager/yqsbcg/insertCgsq",
                type: 'POST',
                data:$("#addyqsbcg_form").serialize(),
                success:function () {
                    Messenger().post({
                        message: '添加成功！'
                    });
                    initGridyqsbcg.ajax.reload();
                    $("#myModalyqsbcg").modal('hide');
                    /*//新增模态框隐藏式触发的事件
                    $("#myModalhctz").on('hidden', function () {
                        $(this).removeData('modal');
                        alert("13441")
                    })*/
                },
                error:function () {
                    Messenger().post({
                        message: '添加失败！'
                    });
                }
            });
        });
    }
    /*删除操作*/
    var bfsubyq = function () {
        /*删除提示*/
        bootbox.dialog({
            title: '提示',
            message: '检测项目提交之后无法更改，确定要提交检测项目？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url:"systemmanager/yqsbcg/deleteYqsq",
                            type: 'POST',
                            data:$("#yqsbcgsq_form").serialize(),
                            success:function () {
                                Messenger().post({
                                    message: '删除成功！'
                                });
                                initGridyqsbcg.ajax.reload();
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
    //临淄采购申请打印
    var sbcgsqd = function () {

        var dd2 = []
        var dd1 = $("[name='yqsbcgche']:checked")
        for(var i = 0;i<dd1.length;i++){
            dd2.push($(dd1[i]).val())
        }
        console.log("今天星期三")
        if(dd2.length==0){
            Messenger().post({
                message:'请选择数据',
                type:'error'
            })
            return
        }
        var sh = dd2.join(",")
        console.log(sh+dd2.length);
        POBrowser.openWindowModeless('/customermanage/dy/openwordhkcgsqd?dd='+sh , 'width=1200px;height=800px;')
    }
    /*修改仪器设备采购申请*/
    var updateYqsbcgssq = function () {
        var dd1 = $("[name='yqsbcgche']:checked")[0];
        var id = $(dd1).val()
        var cgmc = $(dd1).parent().parent().children("td:eq(1)").text();
        var pp = $(dd1).parent().parent().children("td:eq(2)").text();
        var sl = $(dd1).parent().parent().children("td:eq(3)").text();
        var bj = $(dd1).parent().parent().children("td:eq(4)").text();
        var zl = $(dd1).parent().parent().children("td:eq(5)").text();
        var xh = $(dd1).parent().parent().children("td:eq(6)").text();
        /*var sqr = $(dd1).parent().parent().children("td:eq(7)").text();
        var sqbm = $(dd1).parent().parent().children("td:eq(8)").text();*/
        var yt = $(dd1).parent().parent().children("td:eq(10)").text();
        var bzxx = $(dd1).parent().parent().children("td:eq(11)").text();
        var tjzt = $(dd1).parent().parent().children("td:eq(12)").text();
        if(tjzt=='已提交'){
            Messenger().post({
                message:"申请已提交，无法进行更改",
                type:'error'
            });
            return
        }
        console.log(cgmc);
        console.log(yt);
        console.log(id);
        $("#ins1").val(cgmc)
        $("#ins2").val(pp)
        $("#ins3").val(sl)
        $("#ins4").val(bj)
        $("#ins5").val(zl)
        $("#ins6").val(xh)
        /*$("#ins7").val(sqr)
        $("#ins8").val(sqbm)*/
        $("#ins9").val(yt)
        $("#ins10").val(bzxx)
        $("#ins11").val(id)
        $("#myModalyqsbcgupdate").modal({show:true});
        $("#bucgsqtiji1").off('click').on('click',function () {
            $.ajax({
                url:"systemmanager/yqsbcg/updateYqsbcgsq",
                type: 'POST',
                data:$("#updateyqsbcg_form").serialize(),
                success:function () {
                    Messenger().post({
                        message: '修改成功！'
                    });
                    initGridyqsbcg.ajax.reload();
                    $("#myModalyqsbcgupdate").modal('hide');
                },
                error:function () {
                    Messenger().post({
                        message: '修改失败！'
                    });
                }
            });
        });
    }
    /*导入Excel*/
    var daoru = function () {
        openModal("导入Execl表格","/systemmanager/rjlfhzhgl/yqsbgl/yqsbcg/importCgsqExcel.jsp","daoru",function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ypManageDialog.modal('hide');
                    initGridyqsbcg.clear().draw();
                    initGridyqsbcg.ajax.reload();
                }
            });
        });
    }
    //打开模态框
    var openModal = function (title, url, type, func) {
        var dialogButtons = {};
        if(type=='daoru'){
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
    }
}();