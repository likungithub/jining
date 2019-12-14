var yprkList = function () {
    var configMap = {
        path:'',
        uuid:'',
        wx:'',
        dataUrl: "customermanage/yprk/selectYprk",
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
    var initGridYprk = $('#yprkTable').DataTable({
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
                data.ypbm=$('#ypbm').val();
                data.ypmc=$('#ypmc').val();
            },

        },
        "columns": [
            {
                "data": "ypid",
                "render": function (data, type, row) {
                    return '<input type="checkbox" name="yprkcheck"  value="' + data + '"/>';
                }
            },
            {
                "data": "ypid",
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
                "data": "crkly",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "info",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "crksj",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }



            },
            {
                "data": "syry",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }



            },
            {
                "data": "zysl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "fysl",
                render:function(d,t,r){
                    d=delnull(d);
                    return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                }

            },
            {
                "data": "bysl",
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
            var yqsbtzSeatchContainer = $("#yprkSelect");//查询
            var resetYqsbtzContainer = $("#resetyprk");//重置
            var daoChuContainer = $("#yprkDaochu");//导出
            var daoRuContainer=$("#yprkDaoru");//导入
            var shanChuContainer = $("#yprkDel");//删除

            if(yqsbtzSeatchContainer.length > 0){//查询
                yqsbtzSeatchContainer.off('click').on('click', yprkSelectBtn);
            }
            if(resetYqsbtzContainer.length > 0){//重置
                resetYqsbtzContainer.off('click').on('click', resetYprk);
            }
            if(daoChuContainer.length > 0){//导出
                daoChuContainer.off('click').on('click',daoChu);
            }
            if(daoRuContainer.length>0){//导入
                daoRuContainer.off('click').on('click',daoRu);
            }
            if(shanChuContainer.length>0){//删除
                shanChuContainer.off('click').on('click',deleteYprk);
            }
        }
    });
    /*全选*/
    $('input[name="yprkCheckz"]').off('click').on('click',function () {
        if(this.checked){
            $('input[name="yprkcheck"]').attr("checked","checked");
        }else{
            $('input[name="yprkcheck"]').attr("checked",null);
        }
    });
    /*条件查询*/
    var yprkSelectBtn = function (){
        initGridYprk.ajax.reload();
    }
    /*重置*/
    var resetYprk = function (){
        $("input").val("")
    }
    /*导出*/
    var daoChu = function () {
        var ypbm=[]//定义数组接收受控编号
        $("input[name='yprkcheck']:checked",jqueryMap.$container).each(function () {
            ypbm.push($(this).val())
        })
        if(ypbm.length>0){
            window.location.href="/customermanage/yprk/yprkDc?ypbm="+ypbm;
        }else{
            Messenger().post({
                message:'请选择导出数据',
                type:'error'
            })
            return;
        }
    }
    //导入excel
    var daoRu=function () {
        openModalYprk("导入Execl表格","/customermanage/marketManage/importYprkExcel.jsp","daoru",function () {
            setInExcel.subimtBtn(function (result) {
                if (result) {
                    jqueryMap.$ypManageDialog.modal('hide');
                    initGridYprk.clear().draw();
                    initGridYprk.ajax.reload();
                }else {
                    jqueryMap.$ypManageDialog.modal('hide');
                }
            });
        });
    }
    //打开模态框组件
    var openModalYprk = function (title, url, type, func) {
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
    /*删除操作*/
    var deleteYprk = function () {
        var ypbms=[]//定义数组接收样品编码
        $("input[name='yprkcheck']:checked",jqueryMap.$container).each(function () {
            ypbms.push($(this).val())
        })
        if(ypbms.length>0){
            /*删除提示*/
            bootbox.dialog({
                title: '提示',
                message: '确定要删除入库样品？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            $.ajax({
                                url:"customermanage/yprk/deleteYqrk?ypbm="+ypbms,
                                type: 'POST',
                                success:function () {
                                    Messenger().post({
                                        message: '删除成功！'
                                    });
                                    initGridYprk.ajax.reload();
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
        }else {
            Messenger().post({
                message: '请选择删除数据',
                type: 'error'
            })
        }

    }

    /*修改仪入库信息*/
    var updateYprk = function () {
        var dd1 = $("[name='yprkcheck']:checked")[0];
        var ypid = $(dd1).val();
        var ypmc = $(dd1).parent().parent().children("td:eq(2)").text();
        var crkly = $(dd1).parent().parent().children("td:eq(3)").text();
        var info = $(dd1).parent().parent().children("td:eq(4)").text();
        var crksj = $(dd1).parent().parent().children("td:eq(5)").text();
        var syry = $(dd1).parent().parent().children("td:eq(6)").text();
        var zysl = $(dd1).parent().parent().children("td:eq(7)").text();
        var fysl = $(dd1).parent().parent().children("td:eq(8)").text();
        var bysl = $(dd1).parent().parent().children("td:eq(9)").text();

        $("#insypid").val(ypid);
        $("#insypmc").val(ypmc);
        $("#insrkyy").val(crkly);
        $("#insinfo").val(info);
        $("#insrksj").val(crksj);
        $("#inssyry").val(syry);
        $("#inszysl").val(zysl);
        $("#insfysl").val(fysl);
        $("#insbysl").val(bysl);
        $("#"+configMap.uuid+"myModalYprkUpdate").modal({show:true});

        $("#submitYprkupdate").on("click",function () {
            $.ajax({
                url: 'customermanage/yprk/updateYprk',
                data: $("#" + configMap.uuid + "updateYprk_from").serialize(),
                type: 'POST',
                success: function () {
                    Messenger().post({
                        message: '修改成功',
                        type: 'info'
                    })
                    $("#"+configMap.uuid+"myModalYprkUpdate").modal('hide');
                    initGridYprk.ajax.reload()
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

    //新增
    var YprkAdd = function () {
        $("#yprkAdd",jqueryMap.$container).off("click").on("click",function () {
            openModal("新增样品入库", "customermanage/ypgl/yprkAdd.jsp","add",function () {
                yprk_add.yprk_bc(function (result) {
                    if(result){
                        jqueryMap.$ypManageDialog.modal('hide');
                        initGridYprk.ajax.reload();
                    }
                })
            });
        })
    }
    //打开模态框组件
    var openModal = function (title, url,type,func) {

        var dialogButtons = {};
        if (type === 'add') {
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
                buttons: dialogButtons,
                size:"large"
            });
        });
    };
    return{
        init:function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
            YprkAdd();//新增

            $("#yprkUp",jqueryMap.$container).off('click').on('click',function () {//修改
                updateYprk();
            });

        },
        setPath:function (path) {
            configMap.path = path;
        },
    }
}();