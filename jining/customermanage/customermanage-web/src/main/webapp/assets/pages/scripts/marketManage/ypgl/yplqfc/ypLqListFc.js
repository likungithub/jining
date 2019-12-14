
var ypLqList = function () {
    var configMap = {
        jcxck_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="ckjcxm" title="检测项目详情"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        uuid:'',
        ypjslist:null,
        nowData: "",
        cgysGrid:null,
        path:'',
    };   
    var jqueryMap = function () {
            jqueryMap.$blockTarget = $('body');
            jqueryMap.$content = $('#ypjs' + configMap.uuid);
            jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data');
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
    //datatable
    var initYpjslist = function () {
        configMap.ypjslist = $("#list_data"+configMap.uuid).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "scrollY":"390px",//锁定行
            "ajax": {
                "url": "customermanage/datatable/getAll",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypmc= $("#ypmc"+configMap.uuid).val();
                    data.ypbm=$("#ypbm"+configMap.uuid).val();
                    data.dwmc = $("#dwmc"+configMap.uuid).val();
                    data.cyzt = $("#ifcy"+configMap.uuid).val();
                    data.cplb = $("#cplb"+configMap.uuid).val();    //接收状态
                },
            },
            "columns": [
                {
                    "data": "ID",
                    "render": function (data) {
                        return  '<input type="checkbox" name="checkbox_cheid"  value="' + data + '" id="jcxm_' + data + '"/>';
                    }
                },
                {
                    "data": "ID",
                    class:"text-center",
                    "render": function (data) {
                        return  configMap.jcxck_html;
                    }

                },
                {
                    class:"text-center",
                    "data": "YPBM",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }

                },
                {
                    class:"text-center",
                    "data": "YPMC",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    data:"DWMC",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"YPSL",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"YPDW",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "JSZT",
                    "render": function (data) {
                        var d = delnull(data);
                        if (d !='002'){
                            return '<span style="color:#666">' + "未领取" + '</span>';
                        } else {
                            return '<span style="color:red">' + "已领取" + '</span>';
                        }
                    }
                },
                {
                    class:"text-center",
                    "data": "IF_CY",
                    "render": function (data) {
                       return data == 1?'抽样':'送样';
                    }
                },
                {
                    class:"text-center",
                    "data": "BZQ",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPZXBZ",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CYRQ",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "NAME",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "LQRQ",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BZXX",
                    "render": function (data) {
                        var d = delnull(data)
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
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                //ckjcxm 查看检测项目
                var ckJcxmContainer =  $('[name="ckjcxm"]');
                if (ckJcxmContainer.length>0){
                    ckJcxmContainer.off('click').on('click', function () {
                        var el = $(this);
                        var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
                        var ypid = configMap.ypjslist.row(rowIndex).data().ID;
                        chakanJcxm(ypid);
                    });
                }
            }
        });
    };

    var chakanJcxm = function (ypid) {
        openModalCkJcxm("查看检测项目信息","customermanage/marketManage/ypzbCkJcxm.jsp?ypid=" +ypid);
    }
    var openModalCkJcxm = function (title, url) {
        var dialogButtons = {};
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                size:"large"
            });
        });
    }
    var doYpLq = function (jcxmjson,sgrjson,ypmcjson,ypbmjson) {
        var database = {
            ypjsid:jcxmjson,
            lqsj:$("#lqsj").val(),
            lqsl:'1',
            lqdw:'g',
            ifsgr:sgrjson,
            ypmc:ypmcjson,
            ypbm:ypbmjson
        };
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '保存中，请稍候...'
        });
        $.ajax({
            url:"customermanage/datatable/ypjs",
            type:'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data:JSON.stringify(database),
            success:function (data) {
                if (data.info) {
                    Messenger().post({
                        message: "样品领取成功！",
                        type: 'info',
                        id:"ordermessenger"
                    });
                    jcxmjson.length=0;
                }
                configMap.ypjslist.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            },
            error:function(msg){
                Messenger().post({
                    message: "样品领取失败！",
                    type: 'danger',
                    id:"ordermessenger"
                });
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    }
    var openModal = function (title, url,jcxmjson,sgrjson,ypmcjson,ypbmjson) {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var database = {
                    ypjsid:jcxmjson,
                    lqsj:$("#lqsj").val(),
                    lqsl:$("#lqsl"+configMap.uuid).val(),
                    lqdw:$("#dw"+configMap.uuid).val(),
                    ifsgr:sgrjson,
                    ypmc:ypmcjson,
                    ypbm:ypbmjson
                }
                $.ajax({
                    url:"customermanage/datatable/ypjs",
                    type:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'JSON',
                    data:JSON.stringify(database),
                    success:function (data) {
                        if (data.info) {
                            Messenger().post({
                                message: "样品领取成功！",
                                type: 'info',
                                id:"ordermessenger"
                            })
                            jcxmjson.length=0;
                        }
                        configMap.ypjslist.ajax.reload();
                    }
                });
            }
        };
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                size: "small"

            });
        });
    };
    //查询
    var chaxun = function () {
        $("#ypjsSearch"+configMap.uuid).click(function () {
            
            configMap.ypjslist.ajax.reload();
        })
    }
    //重置
    var chongzhi = function () {
        $("#reset"+configMap.uuid).click(function () {
            $("#ypmc"+configMap.uuid).val("");
            $("#ypbm"+configMap.uuid).val("");
            $("#dwmc"+configMap.uuid).val("");
            configMap.ypjslist.ajax.reload();
        })
    }
    //产品类别
    var cplbchange = function () {
        $("#cplb"+configMap.uuid).on("change",function () {
            configMap.ypjslist.ajax.reload();
        })
    }
    //抽样改变刷新
    var cychange = function () {
        $("#ifcy"+configMap.uuid).on("change",function () {
            configMap.ypjslist.ajax.reload();
        })
    }
    //接收
    var jishou =function () {
        $("#btn_ryxz"+configMap.uuid).click(function () {
            var inputjson = $('[name="checkbox_cheid"]:checked');
            var temp = null;
            var jcxmjson = [];
            var sgrjson = [];
            var ypbmjson = [];
            var ypmcjson = [];
            var ypid = "";
            $(inputjson).each(function () {
                //去除已领取的
                var el = $(this);
                var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
                var jszt = configMap.ypjslist.row(rowIndex).data().JSZT;
                
                if (jszt != '002'){
                    temp = {ypjsid: $(this).attr('id').substring(5)};
                    jcxmjson.push(temp);
                    ypid = $(this).attr('id').substring(5);
                    console.log("lx"+configMap.ypjslist.row(rowIndex).data().IFSGR);
                    console.log("ypbm"+configMap.ypjslist.row(rowIndex).data().YPBMR);
                    sgrjson.push({lx:configMap.ypjslist.row(rowIndex).data().IFSGR});
                    ypbmjson.push({ypbm:configMap.ypjslist.row(rowIndex).data().YPBM});
                    ypmcjson.push({ypmc:configMap.ypjslist.row(rowIndex).data().YPMC})
                }

            });

            if (jcxmjson.length<=0){
                Messenger().post({
                    message: "请至少选择一个样品（已领取的不可再次被领取）！",
                    type: 'error',
                    id:"ordermessenger"
                });
                return ;
            }
            //openModal("样品领取","customermanage/ypgl/yplqInfo.jsp?ypid="+ypid+"&uuid="+configMap.uuid,jcxmjson,sgrjson,ypmcjson,ypbmjson);
            // 不谈输入框领取
            doYpLq(jcxmjson,sgrjson,ypmcjson,ypbmjson);

        })
    }





    //样品登记簿导出
    var ypbdc = function () {
        $("#btn_ypbdc"+configMap.uuid).on("click",function () {
            window.location.href ="customermanage/datatable/importYPDJB"
        })
    }




    //打印样品编码
    var dyypbm = function () {
        $("#btn_dyypbm"+configMap.uuid).on("click",function () {
            var ypbm = "";
            var inputjson = $('[name="checkbox_cheid"]:checked');
            var dayins = [];
            var flag=null;
            var jszt =null;
            $(inputjson).each(function () {
                var $el = $(this);
                var rowIndex = configMap.ypjslist.cell($el.parent()).index().row;
                ypbm = configMap.ypjslist.row(rowIndex).data().YPBM;
                jszt = configMap.ypjslist.row(rowIndex).data().JSZT;
                dayins.push(ypbm);

            });

            if (dayins.length == 0) {
                Messenger().post({
                    message: '请选择条码打印数据!',
                    type: 'warning'
                });
                return;//直接退出
            };
     /*       if (jszt!='002'){
                Messenger().post({
                    message: '未领取!',
                    type: 'warning'
                });
                return;//直接退出
            }*/

            var data = dayins;
            $.post(configMap.path + configMap.printBarcode, {dayins: dayins.join(",")}, function (data) {
                if(data.success){
                    Messenger().post({
                        message: '条码打印中,请稍后......',
                        type: 'success'
                    });
                }else {
                    Messenger().post({
                        message: '打印失败',
                        type: 'error'
                    });
                }
            }, "json");
        });
    }
    //打印登记表
    var dyjjdjb = function () {
        $("#btn_dyjjdjb").on("click",function () {
            var ypbm = "";
            var inputjson = $('[name="checkbox_cheid"]:checked');
            var dayins = [];
            $(inputjson).each(function () {
                var $el = $(this);
                var rowIndex = configMap.ypjslist.cell($el.parent()).index().row;
                ypbm = configMap.ypjslist.row(rowIndex).data().YPBM;
                dayins.push(ypbm);
            });

            if (dayins.length == 0) {
                Messenger().post({
                    message: '请选择一条数据数据！',
                    type: 'warning'
                });
                return;//直接退出
            }else {
                POBrowser.openWindowModeless('customermanage/datatable/dyjjdjb?ypbm='+dayins, 'width=1200px;height=800px;');
            }


        });
    }

    return{
        init:function (uuid) {
            configMap.uuid=uuid;
            //初始化表格
            initYpjslist();
            //查询
            chaxun();
            //重置
            chongzhi();
            //接收
            jishou();

            //导出
            ypbdc();
            //打印
            dyypbm();
            //产品类别
            cplbchange();
            //抽样状态
            cychange();
            //打印交接登记表
            dyjjdjb();
            
        },
        setPath:function (path) {
            configMap.path=path;
        }
    }

}();