/*jshint
 strict:true,
 noempty:true,
 noarg:true,
 eqeqeq:true,
 browser:true,
 bitwise:true,
 curly:true,
 undef:true,
 nonew:true,
 forin:true */
/*global $, App, moment, jQuery, bootbox, _ */

var ypTable_data = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        ypDataUrl: '/ypgl/getYpxxList',  //user节点的id为UUID，org节点的id也为UUID
        jcxmDataUrl:'',
        createUserPageUrl: '/user/users/edit.jsp',
        addYpUrl: '/marketManage/yp_jbxx.jsp',
        editUrl: '/customermanage/customerManage/edit.jsp',
        updateUrl: '/customermanage/ptkhxx/updateCustomer',
        importUrl: '/customermanage/customerManage/importExcel.jsp',
        ypManageGrid: null,
        jcxmManageGrid: null,
        optType: null,
        orgTypes: [],
        fwzt: true,
        type: 1,
        other: "all",
        now: "1", //初始加载时为1，其他时为0
        verifyType: '',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="ypedit" title="修改样品信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="ypdelete" title="删除样品信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        khbmString:''	,
        ifSearch:'0',
        yxkhId:"",
        yxkhName:"",
        uuid:'',
        ypid:'',
        tableUrl:'/customermanage/jcxm/findJcxmByYpid'
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $ypManageFrom: null,
        $blockTarget: null,
        $ypManageDialog: null,
        $ypManageDataTable: null,
        $jcxmManageFrom: null,
        $jcxmManageDataTable:null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#ypList-manager-content');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ypManageFrom = $('ypList' + uuid);
        jqueryMap.$jcxmManageFrom = $('jcxmList' + uuid);
        jqueryMap.$ypManageDataTable = $('#ypTable_data', jqueryMap.$container);
        jqueryMap.$jcxmManageDataTable = $('#jcxmTable_data', jqueryMap.$container);
    };

    var ypxxjson = [];
    var jcxmjson = [];

    var openModal = function (title, url, type, func) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        if (type === 'addCustomer') {
            dialogButtons.success = {
                label: '<i class="icon iconfont icon-xiayibu iconFontSize" style="color: #fff;></i> 下一步 ',
                className: "btn btn-default btnBlue btnBorderColor colorfff next",
                callback: function () {
                    func();
                    return false;
                }
            };
        }
        if (type === 'charge') {

            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }
        if (type === 'Dispatch') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666',
            callback: function () {
                sessionStorage.removeItem("uuid");
                sessionStorage.removeItem("filesize");
            }
        }

        $.get(url, function (html) {

            jqueryMap.$ypManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    /**
     * 编辑
     */
    var editYpxxFun = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.ypManageGrid.cell(el.parent()).index().row;
        var id = configMap.ypManageGrid.row(rowIndex).data().id;
        generateTab(this,configMap.path + configMap.addYpUrl + '?type=edit&id=' + id,'编辑样品','ypxx_info','fa fa-outdent iconMr');
    }

    /**
     * 删除
     */
    var delYpxxFun = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.ypManageGrid.cell(el.parent()).index().row;
        var id = configMap.ypManageGrid.row(rowIndex).data().id;
        var temp = {ypxx: id};
        ypxxjson.push(temp);
        var data = {
            ypxx: ypxxjson
        }
        $.ajax({
            url: "/customermanage/ypgl/delYpList",
            type: 'PUT',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    Messenger().post({
                        message: '删除成功！'
                    });
                }
                configMap.ypManageGrid.ajax.reload();
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: '删除失败！',
                    type: 'error'
                });
                configMap.ypManageGrid.ajax.reload();
            }
        });
    }

    /**
     * 增加样品
     */
    var addYp = function () {
        stopContinueClick(this, 300);
        generateTab(this,configMap.path + configMap.addYpUrl + '?type=add','增加样品','ypxx_info','fa fa-outdent iconMr');
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
    }


    // //导入
    // var importExcel = function () {
    //     stopContinueClick("#importExcel", 300);
    //     openModal('模板导入', configMap.path + configMap.importUrl, 'edit', function () {
    //         setIncel.subimtBtn(function (result) {
    //             if (result) {
    //                 jqueryMap.$ypManageDialog.modal('hide');
    //                 configMap.ypManageGrid.clear().draw();
    //                 configMap.ypManageGrid.ajax.reload();
    //             }
    //         });
    //     });
    // };
    //
    // //导出
    // var exportExcel = function () {
    //     stopContinueClick("#exportExcel", 300);
    //     var text = jqueryMap.$container.find('#searchKhmc').val();
    //     window.location.href = "/customermanage/ptkhxx/downDataExcel?now=" + encodeURI(configMap.now) +
    //         "&type=" + encodeURI(configMap.type) + "&fwzt=" + encodeURI(configMap.fwzt) + "&other=" + encodeURI(configMap.other) + "&searchText=" + encodeURI(text);
    // }

    //点击查询
    var btnKhxxSearch = function () {
        configMap.now = "0";
        configMap.ifSearch = '1';
        configMap.ypManageGrid.ajax.reload();
    }
    
    var initYpManageGrid;
    initYpManageGrid = function () {
        configMap.ypManageGrid =
            jqueryMap.$ypManageDataTable.DataTable({
                "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                "ordering": false,
                //"destroy": true,
                "pageLength": 50,
                "lengthMenu": [10, 20, 50, 100],
                "autoWidth": false,
                "processing": true, // 打开数据加载时的等待效果
                "serverSide": true, // 打开后台分页
                "ajax": {
                    "url": configMap.path + configMap.ypDataUrl,
                    "dataSrc": "aaData",
                    "cache":false,
                    "data": function (data) {
                        var searchType = jqueryMap.$container.find('#selectType1').val();
                        var searchText = jqueryMap.$container.find('#ypSearch').val();
                        data.type = searchType;
                        data.searchText = searchText;
                    }
                },
                "language": {
                    "zeroRecords": "暂时没有数据",
                    "infoEmpty": "无记录",
                    "sEmptyTable": "暂时没有数据",
                    "sInfoThousands":",",
                    "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
                },
                "columns": [
                    {
                        "data": "id",
                        "render": function (data, type, row) {
                            return '<input type="checkbox" name="checkbox_checkbox" id="kh_' + data + '" value="' + data + '"/>';
                        }
                    },
                    {
                        "data":"htbm",
                        className:"text-center",
                        "render": function (data, type, row) {
                            var btn = "";
                            btn = configMap.editBtn_html + configMap.deleBtn_html;
                            return btn;
                        }
                    },
                    {
                        "data": "htmc",
                        "render": function (data, type, row) {
                            data = delnull(data);
                            return '<span style="color:#666">' + data + '</span>';
                        }
                    },
                    {
                        "data": "ypbm",
                        "render": function (data, type, row) {
                            data = delnull(data);
                            return '<span style="color:#666">' + data + '</span>';
                        }
                    },
                    {
                        "data": "ycbgrq",
                        className:'text-center',
                        "render": function (data, type, row) {
                            if(data==null||data==""){
                                return "";
                            } else {
                                return moment(data).format("YYYY-MM-DD")
                            }
                        }
                    },
                    {
                        "data": "ypmc",
                        className:'text-center',
                        "render": function (data, type, row) {
                            data = delnull(data);
                            return '<span style="color:#666">' + data + '</span>';
                        }
                    },
                    {
                        "data": "ypsl",
                        className:'text-center',
                        "render": function (data, type, row) {
                            if (data == null) {
                                return '0';
                            }else {
                                return '<span style="color:#666">' + data + '</span>';
                            }
                        }
                    }
                    // {
                    // 	"data": "zydm",
                    // 	"visible": false,
                    // },
                    // {
                    //     "data": "sjhm",
                    //     "visible": false,
                    // }

                ],
                "drawCallback": function () { // 数据加载完成后执行
                    var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$ypManageDataTable);
                    var editYpxx = jqueryMap.$ypManageDataTable.find('[name="ypedit"]');
                    var delYpxx = jqueryMap.$ypManageDataTable.find('[name="ypdelete"]');

                    if (editYpxx.length > 0) {
                        editYpxx.off('click').on('click', editYpxxFun);
                    }

                    if (delYpxx.length > 0) {
                        delYpxx.off('click').on('click', delYpxxFun);
                    }

                    if (tootipContainer.length > 0) {
                        tootipContainer.tooltip();
                    }
                    /**
                     * 将展示没有客户居中
                     */
                    $('.dataTables_empty').attr("style", "text-align:center");
                }
            });

        $('tbody', jqueryMap.$ypManageDataTable).on('click', 'tr', function () {
            var el = $(this);
            var id = configMap.ypManageGrid.row(el).data().id;
            configMap.ypid = id;
            configMap.jcxmManageGrid.ajax.reload();

            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            }
            else {
                configMap.ypManageGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.ypManageGrid.row('.success');
            }
        });
    };

    var initJcxmManageGrid;
    initJcxmManageGrid = function () {
        configMap.jcxmManageGrid =
            jqueryMap.$jcxmManageDataTable.DataTable({
                "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                "ordering": false,
                //"destroy": true,
                "pageLength": 50,
                "lengthMenu": [10, 20, 50, 100],
                "autoWidth": false,
                "processing": true, // 打开数据加载时的等待效果
                "serverSide": true, // 打开后台分页
                "ajax": {
                    "url": configMap.tableUrl,
                    "dataSrc": "aaData",
                    "cache":false,
                    "data": function (data) {
                        var searchType = jqueryMap.$container.find('#selectType2').val();
                        var searchText = jqueryMap.$container.find('#jcxmSearch').val();
                        data.type = searchType;
                        data.searchText = searchText;
                        data.ypid = configMap.ypid;
                    }
                },
                "language": {
                    "zeroRecords": "暂时没有数据",
                    "infoEmpty": "无记录",
                    "sEmptyTable": "暂时没有数据",
                    "sInfoThousands":",",
                    "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
                },
                "columns": [
                    {
                        "data": "id",
                        "render": function (data, type, row) {
                            return '<input type="checkbox" name="checkbox_checkbox" id="kh_' + data + '" value="' + data + '"/>';
                        }
                    },
                    {
                        "data": "zwmcBm",
                        "render": function (data, type, row) {
                            return '<span style="color:#666">' + data + '</span>';
                        }
                    },

                    {
                        "data": "jcx",
                        "render": function (data, type, row) {
                            return '<span style="color:#666">' + data + '</span>';
                        }

                    },
                    {
                        "data": "xlz",
                        className:'text-center',
                        "render": function (data, type, row) {
                            if (data == null) {
                                return '';
                            }else {
                                return '<span style="color:#666">' + data + '</span>';
                            }
                        }
                    },
                    {
                        "data": "xlzmrz",
                        className:'text-center',
                        "render": function (data, type, row) {
                            if (data == null) {
                                return '';
                            }else {
                                return '<span style="color:#666">' + data + '</span>';
                            }
                        }
                    },
                    {
                        "data": "jldw",
                        className:'text-center',
                        "render": function (data, type, row) {
                            return '<span style="color:#666">' + data + '</span>';
                        }
                    }

                ]
            });

        $('tbody', jqueryMap.$ypManageDataTable).on('click', 'tr', function () {
            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            }
            else {
                configMap.ypManageGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.ypManageGrid.row('.success');
            }
        });
    };

    //左侧栏的全选
    var selectAllYp = function (status) {
        $('[type="checkbox"]', jqueryMap.$ypManageDataTable).prop("checked", status);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$ypManageDataTable).not(jqueryMap.$container.find('[name="selectyplist"]'));
        var temp = null;
        ypxxjson = [];
        $(inputjson).each(function () {
            temp = {ypxx: $(this).attr('id').substring(3)};
            ypxxjson.push(temp);
        });
    };

    //左侧删除
    var delypList = function () {
        stopContinueClick("#delypList", 300);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$ypManageDataTable).not(jqueryMap.$container.find('[name="selectyplist"]'));
        var temp = null;
        ypxxjson = [];
        $(inputjson).each(function () {
            temp = {ypxx: $(this).attr("value")};
            ypxxjson.push(temp);
        });
        var data = {
            ypxx: ypxxjson
        }
        if (data.ypxx.length === 0) {
            Messenger().post({
                message: '请选择一个样品！',
                type: 'warning'
            });
        } else {
            bootbox.dialog({
                title: '提示',
                message: '确定要删除样品？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '正在删除样品，请稍候...'
                            });

                            $.ajax({
                                url: "/customermanage/ypgl/delYpList",
                                type: 'PUT',
                                dataType: 'JSON',
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify(data),
                                success: function (result) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    if (result) {
                                        Messenger().post({
                                            message: '删除成功！'
                                        });
                                    }
                                    configMap.ypManageGrid.ajax.reload();
                                },
                                error: function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    Messenger().post({
                                        message: '删除失败！',
                                        type: 'error'
                                    });
                                    configMap.ypManageGrid.ajax.reload();
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
        }
    }

    //右侧栏的全选
    var selectAllJcxm = function (status) {
        $('[type="checkbox"]', jqueryMap.$jcxmManageDataTable).prop("checked", status);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$jcxmManageDataTable).not(jqueryMap.$container.find('[name="selectjcxmlist"]'));
        var temp = null;
        jcxmjson = [];
        $(inputjson).each(function () {
            temp = {jcxm: $(this).attr('id').substring(3)};
            jcxmjson.push(temp);
        });
    };

    //右侧删除
    var deJcxmlList = function () {
        stopContinueClick("#deJcxmlList", 300);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$jcxmManageDataTable).not(jqueryMap.$container.find('[name="selectjcxmlist"]'));
        var temp = null;
        jcxmjson = [];
        $(inputjson).each(function () {
            temp = {jcxm: $(this).attr("value")};
            jcxmjson.push(temp);
        });
        var data = {
            jcxm: jcxmjson,
            ypid: configMap.ypid
        }
        if (data.jcxm.length === 0) {
            Messenger().post({
                message: '请选择一个检测项目！',
                type: 'warning'
            });
        } else {
            bootbox.dialog({
                title: '提示',
                message: '确定要删除检测项目？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '正在删除检测项目，请稍候...'
                            });

                            $.ajax({
                                url: "/customermanage/ypgl/delJcxmList",
                                type: 'PUT',
                                dataType: 'JSON',
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify(data),
                                success: function (result) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    if (result) {
                                        Messenger().post({
                                            message: '删除成功！'
                                        });
                                    }
                                    configMap.jcxmManageGrid.ajax.reload();
                                },
                                error: function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    Messenger().post({
                                        message: '删除失败！',
                                        type: 'error'
                                    });
                                    configMap.jcxmManageGrid.ajax.reload();
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
        }
    }

    return {
        // 初始化
        init: function (id,name, uuid) {
            setJqueryMap(uuid);

            var tabid = $('#ypList-manager-content').parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid);
            Layout.addResizeContent(jqueryMap.$container);
            setTimeout(function () {
                var layout = jqueryMap.$container.layout({
                    center__onresize: App.initLayoutContentScrollbar,
                    west__onresize: App.initLayoutContentScrollbar,
                    west__size: 650
                });
                App.initLayoutContentScrollbar('west', layout.panes.west);
                App.initLayoutContentScrollbar('center', layout.panes.center);
            }, 10);

            // //输入框绑定回车事件
			 // $('[name="searchKhmc"]',jqueryMap.$container).keydown(function(event) {//给输入框绑定按键事件
		     //    if(event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
		     //    	$("#btnKhxxSearch",jqueryMap.$container).click();
		     //    }
            // });

            initYpManageGrid();
            initJcxmManageGrid();

            //点击选择所有(样品)
            jqueryMap.$container.find('[name="selectyplist"]').change(function () {
                var el = $(this);
                selectAllYp(el.is(':checked'));
            });

            //点击选择所有(检测项目)
            jqueryMap.$container.find('[name="selectjcxmlist"]').change(function () {
                var el = $(this);
                selectAllJcxm(el.is(':checked'));
            });

            //新增样品
            $('#addNewYp', jqueryMap.$container).on('click',function () {
                addYp();
            });

            //左侧删除
            $('#delypList', jqueryMap.$container).on('click',function () {
                delypList();
            });

            //右侧删除
            $('#deJcxmlList', jqueryMap.$container).on('click',function () {
                deJcxmlList();
            });

            //左侧查询
            $('#btnypSearch', jqueryMap.$container).on('click',function () {
                configMap.ypManageGrid.ajax.reload();
            });

            //右侧查询
            $('#btnjcxmSearch', jqueryMap.$container).on('click',function () {
                configMap.jcxmManageGrid.ajax.reload();
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        reload:function () {
            configMap.ypManageGrid.ajax.reload();
        }
    };
}();
//@ sourceURL=org/org.js

