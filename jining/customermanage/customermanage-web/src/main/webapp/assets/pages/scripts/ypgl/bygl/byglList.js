
var byglList = function () {
    var configMap = {
        uuid:'',
        ypjslist:null,
        nowData: "",
        cgysGrid:null,
        path:'',
        rqq:'',
        rqz:'',
        zydm:''
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $container: null,
        $Dialogts:null
    };
    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$container = $('#' +'lygl'+ configMap.uuid);
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
    var initGzl = function () {
        configMap.ypjslist = $("#list_data"+configMap.uuid).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": "customermanage/ypgl/getByList",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypmc= $("#ypmc"+configMap.uuid).val();
                    data.ypbm= $("#ypbm"+configMap.uuid).val();
                    // data.rqq= $("#rqq"+configMap.uuid).val();
                    // data.rqz= $("#rqz"+configMap.uuid).val();
                },
            },
            "columns": [
                {
                    class: "text-center",
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="che"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "YPMC",
                    "render": function (data) {
                        var d = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPBM",
                    "render": function (data) {
                        var d = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BYSL",
                    "render": function (data) {
                        var d = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ypid",
                    "render": function (data) {
                        var d = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "RKSJ",
                    "render": function (data) {
                        var d = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BCSJ",
                    "render": function (data) {
                        var d = delnull(data);
                        if(d=="0"){
                            d = "三个月";
                        }else{
                            d = "六个月";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "BZXX",
                    "render": function (data) {
                        var d = delnull(data);
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

    var gotomx = function (obj,lie) {
        var el = $(obj);
        var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
        var lrry = configMap.ypjslist.row(rowIndex).data().lrry;
        var name = configMap.ypjslist.row(rowIndex).data().name;
        // console.log(lie);
        if("3"==lie)
        {
            viewJcxmTab(this, "/customermanage/customerManage/gztz/gzltj/wtslMxJc.jsp?rqq="+configMap.rqq+"&rqz="+configMap.rqz+"&name="+name+"&lie="+lie , "工作量明细", "gzlmx", '');
        }else
        {
            viewJcxmTab(this, "/customermanage/customerManage/gztz/gzltj/wtslMx.jsp?rqq="+configMap.rqq+"&rqz="+configMap.rqz+"&name="+name+"&lie="+lie , "工作量明细", "gzlmx", '');
        }
    };
    var viewJcxmTab = function (_target, srcStr, menuName, id, icon) {
        //标签移除
        $("#tab-page-nav-" + id).remove();
        //内容移除
        $("#tab-page-content-" + id).remove();
        var _opt;
        var $a_alarm = $('ul.page-sidebar-menu').find('a.nav-link.nav-toggle[url="' + srcStr + '"]');
        if ($a_alarm.length > 0) {
            console.log(11111);
            _opt = {
                title: '<i class="' + $a_alarm.find('i').attr('class') + '"><i></i></i> ' + $a_alarm.find('span').html(),
                id: $a_alarm.data('addtab'),
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        } else {
            _opt = {
                title: '<i class="' + icon + '"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
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
            // $("#ryxm"+configMap.uuid).val("");
            // $("#rqq"+configMap.uuid).val(configMap.rqq);
            // $("#rqz"+configMap.uuid).val(configMap.rqz);
            $("#ypmc"+configMap.uuid).val("");
            $("#ypbm"+configMap.uuid).val("");
            configMap.ypjslist.ajax.reload();
        })
    }
    //删除
    var deteleBy = function () {
        // $("#delete"+configMap.uuid).click(function () {
            var strArr = [];
            jqueryMap.$container.find('[name=che]:checked').each(function () {
                var el = $(this);
                var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
                var id = configMap.ypjslist.row(rowIndex).data().id;
                strArr.push(id);
            });
            // console.log(strArr.length);
            if (strArr.length!=1) {
                Messenger().post({
                    message: "请选择一条数据！",
                    type: "warning"
                });
                return  false;
            }
            jqueryMap.$Dialogts = bootbox.dialog({
                title: '提示',
                message: '确定要删除此备样信息？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-success"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            var data = {};
                            data.id = strArr.join(',');
                            $.ajax({
                                data: data,
                                url: "/customermanage/ypgl/deleteByxx",
                                type: 'POST',
                                success: function (result) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    if (result.success) {
                                        configMap.ypjslist.ajax.reload();
                                        Messenger().post({
                                            message:"删除成功",
                                            type:"success"
                                        });
                                    } else {
                                        Messenger().post({
                                            message: result.message,
                                            type: 'error'
                                        });
                                    }
                                },
                                error: function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                }
                            });
                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            });
            // configMap.ypjslist.ajax.reload();
        // })
    }
    //管理
    var guanli = function () {
        // $("#guanli"+configMap.uuid).click(function () {
        var strArr = [];
        var ypids = "";
        var ypbms = "";
        var ypmcs = "";
        jqueryMap.$container.find('[name=che]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.ypjslist.cell(el.parent()).index().row;
            ypids = configMap.ypjslist.row(rowIndex).data().ypid;
            ypmcs = configMap.ypjslist.row(rowIndex).data().YPMC;
            ypbms = configMap.ypjslist.row(rowIndex).data().YPBM;
            strArr.push(ypids);
        });
        // console.log(ypmcs);
        if (strArr.length!=1) {
            Messenger().post({
                message: "请选择一条数据！",
                type: "warning"
            });
            return  false;
        }
        var bmurl = encodeURI(configMap.path + "/ypgl/bygl/updateByxx.jsp?id="+ypids+"&wtid="+ypbms+"&ypmc="+ypmcs);
        openModalupdateBy("管理备样信息", bmurl, 'edit',ypids,ypmcs);
        // })
    }
    var openModalupdateBy = function (title, url,size,ypid,ypmcs) {
        var dialogButtons = {};
        var check = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 确&nbsp;定',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var data = {};
                data.id = ypid;
                // data.ypmc = $("input[name='ypmc']").val();
                data.ypmc = ypmcs;
                data.ypbm = $("input[name='wtid']").val();
                data.bysl = $("#bysl").val();
                if(!check.test(data.bysl)){
                    Messenger().post({
                        message: '备样数量必须为不为零的正数！',
                        type: 'error',
                    });
                    return false;
                }
                // data.bysldw = $("#bysldw").val();
                data.bzxx = $("#bzxx").val();
                data.bysl = $("#bysl").val();
                data.yphgbz = $("#ifhg").val();
                data.bcsj = $("#bcsj").val();
                // console.log(JSON.stringify(data));
                $.ajax({
                    url:"customermanage/ypgl/updateByxx",
                    type:'POST',
                    data:data,
                    success:function (data) {
                        if (data.success) {
                            Messenger().post({
                                message: "样品保存成功！",
                                type: 'info',
                            });
                            // configMap.ypjsGrid.ajax.reload();
                            configMap.ypjslist.ajax.reload();
                        } else {
                            Messenger().post({
                                message: data.message,
                                type: 'error',
                            });
                        }
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
                size:size
            });
        });
    };
    return{
        init:function (uuid,rqq,rqz) {
            configMap.uuid=uuid;
            configMap.rqq=rqq;
            configMap.rqz=rqz;
            setJqueryMap();
            //初始化表格
            initGzl();
            //查询
            chaxun();
            //重置
            chongzhi();
            //删除
            // deteleBy();
            //管理
            // guanli();
            //多选反选
            $("[name='check1']", jqueryMap.$content).on('click', function () {
                if ($("[name='check1']", jqueryMap.$content).prop("checked")) {
                    //选中
                    $("[name='che']", jqueryMap.$content).prop("checked", true);
                } else {
                    $("[name='che']", jqueryMap.$content).prop("checked", false);
                }
            });
            //管理
            $("#guanli"+configMap.uuid).off().on('click', function () {
                guanli();
            });
            //删除
            $("#delete"+configMap.uuid).off().on('click', function () {
                deteleBy();
            });
        },
        setPath:function (path) {
            configMap.path=path;
        },
        // openmx:function (obj,lie) {
        //     gotomx(obj,lie);
        // }

    }
}();