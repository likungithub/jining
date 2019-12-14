
var ypth = function () {
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
                "url": "customermanage/datatable/findHuanYang",
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
                    data:"LX",
                    "render": function (data) {
                        var d = delnull(data);
                        console.log(d)
                        if (d=='1'){
                            return "正样";
                        } else if (d=='2'){
                            return "副样";
                        } else if (d=='3'){
                            return '备样';
                        }else if (d=='4'){
                            return "样品";
                        }
                    }
                },
                {
                    class:"text-center",
                    "data":"ZBZL",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';

                    }
                },
                {
                    class:"text-center",
                    "data":"TYSJ",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "TYZT",
                    "render": function (data) {
                        var d = delnull(data);
                        if (d=='000'){
                            return '<span style="color:yellowgreen">' + "未退样" + '</span>';
                        } else if (d=='001'){
                            return '<span style="color:turquoise">' + "待审核" + '</span>';
                        } else if (d=='002'){
                            return '<span style="color:skyblue">' + "已退样" + '</span>';
                        } else if (d=='003'){
                            return '<span style="color:red">' + "退样失败" + '</span>';
                        }
                    }
                },
                {
                    class:"text-center",
                    "data": "TYRYDM",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "TYZL",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "tyjszt",
                    "render": function (data) {
                       var d = delnull(data)
                        if (d=='000'){
                            return '<span style="color:yellowgreen">' + "待操作" + '</span>';
                        } else if (d=='001'){
                            return '<span style="color:turquoise">' + "未接收" + '</span>';
                        } else if (d=='002'){
                            return '<span style="color:skyblue">' + "已接收" + '</span>';
                        } else if (d=='003'){
                            return '<span style="color:red">' + "还样失败" + '</span>';
                        }
                    }
                },
                {
                    class:"text-center",
                    "data": "tyjsryname",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "tyjssj",
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
                    url:"customermanage/datatable/tysl",
                    type:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'JSON',
                    data:JSON.stringify(database),
                    success:function (data) {
                        console.log(data)
                        if (data.info) {
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
                buttons: dialogButtons,
                size: "small"
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
                var tyzt = configMap.ypjslist.row(rowIndex).data().TYZT;
                if (tyzt=='000'|| tyzt=="003"){
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
            openModal("退样数量","customermanage/ypgl/ypThInfo.jsp",jcxmjson);
        })
    }
    
    var saoma = function () {
        $("#btn_saoma"+configMap.uuid).click(function () {
            openModalSaoM("扫码","customermanage/ypgl/jstySaoMa.jsp","saoMa");
        })

    }


    var openModalSaoM = function (title, url,type) {
        var dialogButtons = {};
        if(type == 'saoMa'){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    var tyzl = $("#fileNames").val();
                    var ypbm = $("#saoma").val();
                    if(ypbm.length<=0||tyzl.length<=0){
                        Messenger().post({
                            message: "样品编码或退样数量不能为空！",
                            type: 'error',
                            id:"ordermessenger"
                        });
                        return ;
                    }
                    var database = {
                        yptyid:ypbm,
                        tyzl:tyzl
                    }
                    $.ajax({
                        url:"customermanage/datatable/tyslsm",
                        type:'POST',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'JSON',
                        data:JSON.stringify(database),
                        success:function (data) {
                            console.log(data)
                            if (data.info) {
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
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                size: "small",

            });
        });
    };

    return{
        init:function (uuid) {
            configMap.uuid=uuid;
            //初始化表格
            initYplqlist();
            //查询
            chaxun();
            //重置
            chongzhi();
            //退样
            tuiyang();
            //扫码
            saoma();

        },
        setPath:function (path) {
            configMap.path=path;
        }
    }
}();