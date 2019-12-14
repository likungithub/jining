
var ypJsList2 = function () {
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
    var jqueryMap = function () {
            jqueryMap.$blockTarget = $('body');
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
                "url": "customermanage/zgtz/getGzltjByRy",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ryxm= $("#ryxm"+configMap.uuid).val();
                    data.rqq= $("#rqq"+configMap.uuid).val();
                    data.rqz= $("#rqz"+configMap.uuid).val();
                },
            },
            "columns": [
                {
                    "data": "name",
                    "render": function (data) {
                        var d = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "wtdjsl",
                    "render": function (data) {
                        var d = delnull(data);
                        var res="";
                        if(d==0)
                        {
                            res =  '<span style="display: inline-block;" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }else
                        {
                            res = '<span style="display: inline-block;cursor: pointer;color:blue"  onclick="goto(this,\'1\');" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }
                        return res;
                    }
                },
                {
                    class:"text-center",
                    "data": "yplqsl",
                    "render": function (data) {
                        var d = delnull(data);
                        var res="";
                        if(d==0)
                        {
                            res =  '<span style="display: inline-block;" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }else
                        {
                            res = '<span style="display: inline-block;cursor: pointer;color:blue"  onclick="goto(this,\'2\');" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }
                        return res;
                    }
                },
                {
                    class:"text-center",
                    data:"zjrjcsl",
                    "render": function (data) {
                        var d = delnull(data);
                        var res="";
                        if(d==0)
                        {
                            res =  '<span style="display: inline-block;" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }else
                        {
                            res = '<span style="display: inline-block;cursor: pointer;color:blue"  onclick="goto(this,\'3\');" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }
                        return res;
                    }
                },
                {
                    class:"text-center",
                    data:"bgbzsl",
                    "render": function (data) {
                        var d = delnull(data);
                        var res="";
                        if(d==0)
                        {
                            res =  '<span style="display: inline-block;" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }else
                        {
                            res = '<span style="display: inline-block;cursor: pointer;color:blue"  onclick="goto(this,\'4\');" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }
                        return res;
                    }
                },
                {
                    class:"text-center",
                    data:"bgpzsl",
                    "render": function (data) {
                        var d = delnull(data);
                        var res="";
                        if(d==0)
                        {
                            res =  '<span style="display: inline-block;" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }else
                        {
                            res = '<span style="display: inline-block;cursor: pointer;color:blue"  onclick="goto(this,\'5\');" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }
                        return res;
                    }
                },
                {
                    class:"text-center",
                    data:"bgdysl",
                    "render": function (data) {
                        var d = delnull(data);
                        var res="";
                        if(d==0)
                        {
                            res =  '<span style="display: inline-block;" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }else
                        {
                            res = '<span style="display: inline-block;cursor: pointer;color:blue"  onclick="goto(this,\'6\');" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                        }
                        return res;
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
        viewJcxmTab(this, "/customermanage/customerManage/gztz/gzltj/wtslMx.jsp?rqq="+configMap.rqq+"&rqz="+configMap.rqz+"&name="+name+"&lie="+lie , "工作量明细", "gzlmx", '');
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
            $("#ryxm"+configMap.uuid).val("");
            $("#rqq"+configMap.uuid).val(configMap.rqq);
            $("#rqz"+configMap.uuid).val(configMap.rqz);
            configMap.ypjslist.ajax.reload();
        })
    }


    return{
        init:function (uuid,rqq,rqz) {
            configMap.uuid=uuid;
            configMap.rqq=rqq;
            configMap.rqz=rqz;
            //初始化表格
            initGzl();
            //查询
            chaxun();
            //重置
            chongzhi();
        },
        setPath:function (path) {
            configMap.path=path;
        },
        openmx:function (obj,lie) {
            gotomx(obj,lie);
        }
    }
}();