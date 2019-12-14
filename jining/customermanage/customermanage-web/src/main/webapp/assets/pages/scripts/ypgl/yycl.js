
var yycl = function () {
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
                "url": "customermanage/datatable/yycl",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypmc= $("#ypmc"+configMap.uuid).val();
                    data.ypbm=$("#ypbm"+configMap.uuid).val();
                    /* data.dwmc = $("#dwmc"+configMap.uuid).val();*/
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
                    data:"SCDW",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"SCDWLXDH",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"IF_TH",
                    "render": function (data) {
                        var d = delnull(data);
                        if (d=='0') {
                            return "不退样"
                        }else if (d =='1'){
                            return "退样";
                        }
                         else {
                            return "";
                        }
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
                    "data": "CLFS",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "CLRYNAME",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },{
                    class:"text-center",
                    "data":"CLSJ",
                    "render":function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },{
                    class:"text-center",
                    "data":"CLL",
                    "render":function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"THSJ",
                    "render":function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"THRYNAME",
                    "render":function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"THL",
                    "render":function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"ZXRYNAME",
                    "render":function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"YYCLZT",
                    "render":function (data) {
                        var d = delnull(data)
                        if (d=='0') {
                            return "待处理";
                        }else if (d=='1') {
                            return "已退还";
                        }else if (d=='2'){
                            return "已处理";
                        }else if (d=='3'){
                            return "已过期";
                        }
                        return d;
                    }
                },
                {
                    class:"text-center",
                    "data":"IF_GQ",
                    "render":function (data) {
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
                var thsj = $("#thsj").val()
                var thl = $("#thl").val()
                var thry = $("#thry").val()
                var database = {
                    yptyid:jcxmjson,
                    thsj:thsj,
                    thl:thl,
                    thry:thry
                }
                $.ajax({
                    url:"customermanage/datatable/yyth",
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

    var openModa2 = function (title, url,jcxmjson) {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var clsj = $("#clsj").val()
                var cll = $("#cll").val()
                var clfs = $("#yyclclfs").val()
                var database = {
                    yptyid:jcxmjson,
                    clsj:clsj,
                    cll:cll,
                    clfs:$("#clfs").val(),
                    clyy:$("#clyy").val()
                }
                $.ajax({
                    url:"customermanage/datatable/yyclfs",
                    type:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'JSON',
                    data:JSON.stringify(database),
                    success:function (data) {
                        console.log(data)
                        if (data.info) {
                            configMap.ypjslist.ajax.reload();
                            Messenger().post({
                                message: "样品处理成功！",
                                type: 'info',
                                id:"ordermessenger"
                            })
                            jcxmjson.length=0;
                        }else {
                            Messenger().post({
                                message: "样品处理失败！",
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

    //处理
    var chuli =function () {
        $("#btn_ryxz"+configMap.uuid).click(function () {
            debugger;
            var inputjson = $('[name="checkbox_checkbox"]:checked');
            var temp = null;
            var jcxmjson = [];
            $(inputjson).each(function () {
                //去除已接收的和已退回的
                var el = $(this);
                var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
                var tyzt = configMap.ypjslist.row(rowIndex).data().IF_TH;
                if (tyzt=='1'){
                    temp = {yptyid: $(this).attr('ID').substring(5)};
                    jcxmjson.push(temp);
                }
            });
            if (jcxmjson.length<=0){
                Messenger().post({
                    message: "请至少选择一个样品（只含允许退还）！",
                    type: 'error',
                    id:"ordermessenger"
                });
                return ;
            }
            openModa2("余样处理","customermanage/ypgl/yyclinfo1.jsp",jcxmjson);
        })
    }
    //退还
    var tuihui = function () {
        $("#ypth"+configMap.uuid).click(function () {
            var inputjson = $('[name="checkbox_checkbox"]:checked');
            var temp = null;
            var jcxmjson = [];
            $(inputjson).each(function () {
                //去除已接收的和已退回的
                var el = $(this);
                var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
                var tyzt = configMap.ypjslist.row(rowIndex).data().IF_TH;
                if (tyzt!='0'){
                    temp = {yptyid: $(this).attr('id').substring(5)};
                    jcxmjson.push(temp);
                }
            });
            if (jcxmjson.length<=0){
                Messenger().post({
                    message: "请至少选择一个样品（只允许操作未处理的）！",
                    type: 'error',
                    id:"ordermessenger"
                });
                return ;
            }
            openModal("退回原因","customermanage/ypgl/ypclinfo.jsp",jcxmjson);
        })
    }
    //导出
    var daochu = function () {
        $("#daochu"+configMap.uuid).click(function () {
            window.location.href ="customermanage/datatable/importCPZLJYTX"
        })
    }
    //导出余样处理信息
    var yyclinfo = function () {
        $("#ypcljl"+configMap.uuid).on('click',function () {
            window.location.href ="customermanage/datatable/exportyycl"
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
            //处理
            chuli();
            //退回
            tuihui();
            setjqueryMap(uuid);
            //导出
            daochu();
            //导出余样处理信息
            yyclinfo();

        },
        setPath:function (path) {
            configMap.path=path;
        }
    }
}();