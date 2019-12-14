
var ypJsList2 = function () {
    var configMap = {
        printBarcode:"/ypgl/ypbmdy",
        uuid:'',
        ypjslist:null,
        nowData: "",
        cgysGrid:null,
        path:''

    };
    var jqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#ypjs' + configMap.uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data');
    }
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
    var initYplqlist = function () {
        configMap.ypjslist = $("#list_data"+configMap.uuid).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": "customermanage/datatable/getAll",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypmc= $("#ypmc"+configMap.uuid).val();
                    data.ypbm=$("#ypbm"+configMap.uuid).val();
                    data.dwmc = $("#dwmc"+configMap.uuid).val();
                }
            },
            "columns": [
                {
                    "data": "ID",
                    "render": function (data) {
                        return  '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '" id="jcxm_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPBM",
                    "render": function (data) {
                        return delnull(data)
                    }

                },
                {
                    class:"text-center",
                    "data": "YPMC",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    data:"DWMC",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    "data":"YPSL",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    "data":"YPDW",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    "data": "JSZT",
                    "render": function (data) {
                        var d = delnull(data);
                        if (d=='001'){
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
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    "data": "SB",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    "data": "BZXX",
                    "render": function (data) {
                        return delnull(data)
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

            }
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
    //接收
    var jishou =function () {
        $("#btn_ryxz"+configMap.uuid).click(function () {
            var inputjson = $('[name="checkbox_checkbox"]:checked');
            var temp = null;
            var jcxmjson = [];
            $(inputjson).each(function () {
                //去除已领取的
                var el = $(this);
                var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
                var jszt = configMap.ypjslist.row(rowIndex).data().JSZT;
                if (jszt=='001'){
                    temp = {ypjsid: $(this).attr('id').substring(5)};
                    jcxmjson.push(temp);
                }

            });
            var data = {
                ypjsid:jcxmjson,
                lqsj:$("#lqsj").val()
            }
            if (jcxmjson.length<=0){
                Messenger().post({
                    message: "请至少选择一个样品（已领取的不可再次被领取）！",
                    type: 'error',
                    id:"ordermessenger"
                });
                return ;
            }
            $.ajax({
                url:"customermanage/datatable/ypjs",
                type:'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                data:JSON.stringify(data),
                success:function (data) {
                    if (data.info) {
                        configMap.ypjslist.ajax.reload();
                        Messenger().post({
                            message: "样品领取成功！",
                            type: 'info',
                            id:"ordermessenger"
                        })
                        jcxmjson.length=0;
                    }
                }
            });

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
            var inputjson = $('[name="checkbox_checkbox"]:checked');
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
            if (jszt!='002'){
                Messenger().post({
                    message: '未领取!',
                    type: 'warning'
                });
                return;//直接退出
            }
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

    return{
        init:function (uuid) {
            configMap.uuid=uuid;
            //初始化表格
            initYplqlist();
            //查询
            chaxun();
            //重置
            chongzhi();
            //接收
            jishou();
            //daoc
            ypbdc();
            //打印
            dyypbm();

        },
        setPath:function (path) {
            configMap.path=path;
        }
    }

}();