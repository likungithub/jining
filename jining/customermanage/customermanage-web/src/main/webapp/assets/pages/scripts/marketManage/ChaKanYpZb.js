var chakanYpzb = function () {
    var configMap = {
        uuid:'',
        zbypinfolist:null,
        ypid:"",
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="ypjseditx" title="查看样品制备详细信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        editBtn_html2: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="addjcx" title="添加检测项"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        //editBtn_html3: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="addjcb" title="添加检测包"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        addJcxUrl:'/marketManage/jcxmlistcyd.jsp',
        path: ''
    }
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#ypjs' + uuid);
        /*jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data'+configMap.uuid);*/
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

    //列表初始化
    var initInfoTabe = function () {
        configMap.zbypinfolist = $("#list_data"+configMap.uuid).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": "customermanage/datatable/getYpzbInfo",
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypid = configMap.ypid;
                }
            },
            "columns": [
                {
                    class:"text-center",
                    "data": "id",
                    "render": function (data) {
                        var btn = configMap.editBtn_html;
                        btn = btn + '';
                        return btn;
                    }
                },
                {
                    class:"text-center",
                    "data": "ypbm",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YPMC2",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "zbypbm",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ZBFSNAME",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "ccwz",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "dw",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
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

                xxContainer = $('[data-toggle="tooltip"]');//显示详细
                if (xxContainer.length > 0) {
                    xxContainer.tooltip();
                }
                //修改信息
                var editContainer = $('[name="ypjseditx"]');
                if (editContainer.length>0){
                    editContainer.off('click').on('click', function () {
                        var el = $(this);
                        var rowIndex = configMap.zbypinfolist.cell(el.parent()).index().row;
                        var id = configMap.zbypinfolist.row(rowIndex).data().id;
                        var ypmc = configMap.zbypinfolist.row(rowIndex).data().ypmc;
                        xiugai(id,ypmc);
                    });
                }

                //添加检测项
                var addjcxContainer = $('[name="addjcx"]');
                if (addjcxContainer.length>0){
                    addjcxContainer.off('click').on('click', function () {
                        var el = $(this);
                        var rowIndex = configMap.zbypinfolist.cell(el.parent()).index().row;
                        var ypzbid = configMap.zbypinfolist.row(rowIndex).data().id;
                        addjcx(ypzbid);
                        bootbox.hideAll();
                    });
                }
                //添加检测包
                var addjcbContainer = $('[name="addjcb"]');
            }
        });

    }
    //添加检测项
    var addjcx = function (ypzbids) {
        generateTab(this, configMap.path + configMap.addJcxUrl + '?type=edit&ypid=' + configMap.ypid +'&jclbdm=' +'001'+'&from=ypzb&ypzbid='+ypzbids, '增加检测项', 'ypxx_info', 'fa fa-outdent iconMr');
    }
    var generateTab = function(_target, srcStr, menuName, id,icon) {
        //标签移除
        $("#tab-page-nav-" + id).remove();
        //内容移除
        $("#tab-page-content-" + id).remove();
        var _opt;
        var $a_alarm = $('ul.page-sidebar-menu').find('a.nav-link.nav-toggle[url="' + srcStr + '"]');
        if ($a_alarm.length > 0) {
            _opt = {
                title: '<i class="' + $a_alarm.find('i').attr('class') + '"><i></i></i> ' + $a_alarm.find('span').html(),
                id: $a_alarm.data('addtab'),
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        } else {
            _opt = {
                title: '<i class="'+icon +'"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    };
    //修改信息
    var xiugai = function (id,ypmc) {
        openModa2("修改制备样品信息","customermanage/marketManage/XgYpzb.jsp?id="+id+"&ypmc="+ypmc);
    }
    var openModa2 = function (title, url, type) {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                xgypzb().xiugai();
                jqueryMap.$contractauditDialog.modal('hide');
                return false;
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
    return{
        init:function (uuid,ypid) {
            configMap.uuid=uuid;
            configMap.ypid=ypid;
            setJqueryMap(uuid);
            //列表初始化
            initInfoTabe();
        },
        setPath: function (path) {
            configMap.path = path;
        }
    }
}();