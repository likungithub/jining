
var ypth = function () {
    var configMap = {
        uuid:'',
        ypjslist:null,
        path:'',
        tyzl:"",
        jclbdm:''

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
                "url": "customermanage/datatable/zbypth",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypmc= $("#ypmc"+configMap.uuid).val();
                    data.ypbm=$("#ypbm"+configMap.uuid).val();
                    data.jclbdm=configMap.jclbdm;
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
                    "data": "zbypbm",
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
                    data:"LX",
                    "render": function (data) {
                        var d = delnull(data);
                        if (d=='1'){
                            return "正样";
                        } else if (d=="2"){
                            return "副样";
                        } else if (d=="3"){
                            return "备样";
                        }else if (d=="4"){
                            return " ";
                        }
                    }
                },
                {
                    class:"text-center",
                    "data":"ZBZL",
                    "render": function (data) {
                        var d = delnull(data);
                        console.log(d)
                        return d;

                    }
                },
                {
                    class:"text-center",
                    "data":"zbthsj",
                    "render": function (data) {
                        return delnull(data)
                    }
                },
                {
                    class:"text-center",
                    "data": "ZBTYZT",
                    "render": function (data) {
                        var d = delnull(data);
                        if (d=='000'){
                            return '<span style="color:yellowgreen">' + "未退样" + '</span>';
                        } else if (d=='001'){
                            return '<span style="color:turquoise">' + "已退样" + '</span>';
                        }
                    }
                },
                {
                    class:"text-center",
                    "data": "zbfhryname",
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
                    url:"customermanage/datatable/zbypthsl",
                    type:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'JSON',
                    data:JSON.stringify(database),
                    success:function (data) {
                        if (data.success) {
                            configMap.ypjslist.ajax.reload();
                            Messenger().post({
                                message: "样品提交成功！",
                                type: 'info',
                                id:"ordermessenger"
                            })
                            jcxmjson.length=0;
                        }else {
                            Messenger().post({
                                message: "样品提交失败！",
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

    //退样
    var tuiyang =function () {
        $("#btn_ryxz"+configMap.uuid).click(function () {
            var inputjson = $('[name="checkbox_checkbox"]:checked');
            var temp = null;
            var jcxmjson = [];
            $(inputjson).each(function () {
                //去除已退样的和待审核的
                var el = $(this);
                var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
                var tyzt = configMap.ypjslist.row(rowIndex).data().ZBTYZT;
                if (tyzt=='000'){
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
            openModal("退还数量","customermanage/ypgl/ypThInfo.jsp",jcxmjson);
        })
    }

    return{
        init:function (uuid,jclbdm) {
            configMap.jclbdm = jclbdm;
            configMap.uuid=uuid;
            //初始化表格
            initYplqlist();
            //查询
            chaxun();
            //重置
            chongzhi();
            //退样
            tuiyang();

        },
        setPath:function (path) {
            configMap.path=path;
        }
    }
}();