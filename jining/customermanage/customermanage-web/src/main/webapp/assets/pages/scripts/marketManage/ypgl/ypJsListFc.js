
var ypJsList2 = function () {
    var configMap = {
        printBarcode:"/ypglFc/ypbmdy",
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
            "ajax": {
                "url": "customermanage/ypglfclq/getAll",
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
                    "data": "YP_FPRQ",
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
                /*{
                    class:"text-center",
                    "data":"IFSGR",
                    "render":function (data) {
                        var d = delnull(data);
                        if (d=="1"){
                            return "是"
                        } else {
                            return "否"
                        }
                    }
                }*/

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
            }
        });
    };
    var doYpLq = function (jcxmjson,sgrjson,ypmcjson,ypbmjson) {
        var database = {
            ypjsid:jcxmjson,
            lqsj:$("#lqsj").val(),
            lqsl:'1',
            lqdw:'',
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
            url:"customermanage/ypglfclq/ypjs",
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
    //领取状态
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
    //样品领取
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
            // 不谈输入框领取
            doYpLq(jcxmjson,sgrjson,ypmcjson,ypbmjson);

        })
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



            //产品类别
            cplbchange();
            //抽样状态
            cychange();

            
        },
        setPath:function (path) {
            configMap.path=path;
        }
    }

}();