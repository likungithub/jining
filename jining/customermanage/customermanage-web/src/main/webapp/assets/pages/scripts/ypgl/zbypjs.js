
var zbypjs = function () {
    var configMap = {
        uuid:'',
        ypjslist:null,
        path:'',
        tyzl:""

    };
    var setjqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#ypjs' + configMap.uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data');
    }
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null
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
    //判断结尾
    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
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
                "url": "customermanage/ypzb/getAll",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypmc= $("#ypmc"+configMap.uuid).val();
                    data.ypbm=$("#ypbm"+configMap.uuid).val();
                    /* data.dwmc = $("#dwmc"+configMap.uuid).val();*/
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data) {
                        return  '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '" id="jcxm_' + data + '"/>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypbm",
                    render: function (data) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';

                    }

                },
                {
                    class:"text-center",
                    "data": "ypmc",
                    "render": function (data) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class:"text-center",
                    data:"lx",
                    "render": function (data) {
                        var d = delnull(data);
                        if (d.endWith("1")){
                            return "正样";
                        } else if (d.endWith("2")){
                            return "副样";
                        } else if (d.endWith("3")){
                            return "备样";
                        }
                    }
                },
                {
                    class:"text-center",
                    "data":"zbzl",
                    "render": function (data) {
                        var d = delnull(data);
                        console.log(d)
                        return d;

                    }
                },
                {
                    class:"text-center",
                    "data":"tjsj",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    "data": "tjryname",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    "data": "jssj",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    "data": "jsryname",
                    "render": function (data) {
                        var d = delnull(data)
                        return d;
                    }
                },{
                    class:"text-center",
                    "data":"jszt",
                    "render":function (data) {
                        var d = delnull(data)
                        if (d=='1'){
                            return '未接收'
                        }else if (d=='2') {
                            return "已接收";
                        }
                    }
                },{
                    class:"text-center",
                    "data":"lqryname",
                    "render":function (data) {
                        var d = delnull(data)
                        return d;
                    }
                },
                {
                    class:"text-center",
                    "data":"lqsj",
                    "render":function (data) {
                        var d = delnull(data)
                        return d;
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
                var tootipContainer = $('[data-toggle="tooltip"]');
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
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

    var openModal = function (title, url,jcxmjson) {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var tyzl = $("#fileName").val()
                var database = {
                    yptyid:jcxmjson,
                    tyzl:tyzl
                }
                $.ajax({
                    url:"customermanage/datatable/thyy",
                    type:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'JSON',
                    data:JSON.stringify(database),
                    success:function (data) {
                        console.log(data)
                        if (data.info) {
                            configMap.ypjslist.ajax.reload();
                            Messenger().post({
                                message: "样品退回成功！",
                                type: 'info',
                                id:"ordermessenger"
                            })
                            jcxmjson.length=0;
                        }else {
                            Messenger().post({
                                message: "样品退回失败！",
                                type: 'error',
                                id:"ordermessenger"
                            })
                        }
                        jcxmjson.length=0;
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
                buttons: dialogButtons
            });
        });
    };

    //接收
    var jiesou =function () {
        $("#btn_ryxz"+configMap.uuid).click(function () {
            var inputjson = $('[name="checkbox_checkbox"]:checked');
            var temp = null;
            var ypbm = [];
            var jcxmjson = [];
            $(inputjson).each(function () {
                //去除已退样的和待审核的
                var el = $(this);
                var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
                var jszt = configMap.ypjslist.row(rowIndex).data().jszt;
                console.log(jszt)
                if (jszt=='1'){
                    temp = {yptyid: $(this).attr('id').substring(5)};
                    ypbm.push({bm: configMap.ypjslist.row(rowIndex).data().ypbm});
                    jcxmjson.push(temp);
                }

            });
            if (jcxmjson.length<=0){
                Messenger().post({
                    message: "请至少选择一个样品（不可重复接收）！",
                    type: 'error',
                    id:"ordermessenger"
                });
                return ;
            }
            var database = {
                id:jcxmjson,
                jssj:$("#TjTime"+configMap.uuid).val(),
                ypbms:ypbm
            }
            console.log(database)
            $.ajax({
                url:"customermanage/ypzb/zbypjs",
                type:'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                data:JSON.stringify(database),
                success:function (data) {
                    if (data.info) {
                        configMap.ypjslist.ajax.reload();
                        Messenger().post({
                            message: "样品提交成功！",
                            type: 'info',
                            id:"ordermessenger"
                        })
                        jcxmjson.length=0;
                    }
                    jcxmjson.length=0;
                }
            });
            configMap.ypjslist.ajax.reload();
        })
    }
    //退回
    var tuihui = function () {
        $("#ypth"+configMap.uuid).click(function () {
            var inputjson = $('[name="checkbox_checkbox"]:checked');
            var temp = null;
            var jcxmjson = [];
            $(inputjson).each(function () {
                //去除已接收的和已退回的
                var el = $(this);
                var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
                var tyzt = configMap.ypjslist.row(rowIndex).data().tyjszt;
                if (tyzt=='001'){
                    temp = {yptyid: $(this).attr('id').substring(5)};
                    jcxmjson.push(temp);
                }

            });
            if (jcxmjson.length<=0){
                Messenger().post({
                    message: "请至少选择一个样品（已退样的不可再退样）！",
                    type: 'error',
                    id:"ordermessenger"
                });
                return ;
            }
            openModal("退回原因","customermanage/ypgl/ypThInfo.jsp",jcxmjson);
        })
    }
    //出入库记录导出
    var importcrkjl = function () {
        $("#crkjl"+configMap.uuid).click(function () {
            window.location.href ="customermanage/ypzb/importExcel"
        })
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
            jiesou();
            //退回
            tuihui();
            //导出
            importcrkjl();

        },
        setPath:function (path) {
            configMap.path=path;
        }
    }
}();