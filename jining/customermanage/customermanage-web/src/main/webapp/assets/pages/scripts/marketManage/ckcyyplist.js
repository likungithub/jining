/**
 *
 */
var yddypList = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/zfwt/getYddcyypAll',
        jcxmDataUrl: "/zfwt/getJcxmAllByYpid",
        addUrl: '/marketManage/yddcyyp_jbxx.jsp',
        addJcxUrl: '/marketManage/yddjcxmlist.jsp',
        importUrl: '/customerManage/importCyypExcel.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        ypGrid: null,
        jcxmGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改样品信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除样品信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        qywt: '',
        wtid: '',
        index: 1,
        ypid: ""
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $selectedRow:null,
        $container: null,
        $ypManualdata: null,
        $jcxmManualdata: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$container = $('#ckcyyp' + uuid);
        jqueryMap.ypManualdata = jqueryMap.$container.find('#yplist_data');
        jqueryMap.$jcxmManualdata = jqueryMap.$container.find('#jcxmlist_data');
    };

    function delnull(d) {
        if (d == undefined) {
            return '';
        }
        if (d == 'null') {
            return '';
        }
        return d;
    }

    var initYpGrid = function () {
        configMap.ypGrid = jqueryMap.ypManualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            //"destroy": true,
            "pageLength": 50,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.searchText1 = $('[name="ypmc"]', jqueryMap.$container).val();
                    data.wtid = configMap.wtid;
                }
            },
            "columns": [
                {
                    class: "text-left",
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox"  name="checkbox_checkbox" checked="checked"  value="' + data + '"/>';
                    }
                },
                // {
                //
                //     class: "text-center",
                //     "render": function (data, type, row) {
                //         return configMap.editBtn_html + configMap.deleBtn_html;
                //     }
                // },
                {
                    class: "text-center",
                    "data": "ypbm",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypmc",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                // {
                //     class: "text-center",
                //     "data": "ypdj",
                //     "render": function (d, t, r) {
                //         d = delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                //     }
                // },
                {
                    class: "text-center",
                    "data": "ypsl",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypdw",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        console.log(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },

                /*{
                    class: "text-center",
                    "data": "scrq",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypphhbh",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
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
                var editContainer = jqueryMap.$container.find('[name="contractedit"]');
                var deleteContainer = jqueryMap.$container.find('[name="contractdelete"]');
                var tootipContainer = $('[data-toggle="tooltip"]').tooltip();

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editYp);
                }
                if (deleteContainer.length > 0) {
                    deleteContainer.off('click').on('click', delYp);
                }
                configMap.jcxmGrid.ajax.reload();
            },
                //在table中的序号列
            fnRowCallback: function (nRow, aData, iDisplayIndex) {
                // console.log(aData);
                if(configMap.ypid==null || configMap.ypid=="")
                {
                    configMap.ypid = aData.id;
                }

            }
        });
        $('tbody', jqueryMap.ypManualdata).on('click', 'tr', function () {
            var el = $(this);
            var ypid = configMap.ypGrid.row(el).data().id;
            configMap.ypid = ypid;
            configMap.jcxmGrid.ajax.reload();
        });
    };
    var initJcxmGrid = function () {
        configMap.jcxmGrid = jqueryMap.$jcxmManualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            //"destroy": true,
            "pageLength": 50,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "ajax": {
                "url": configMap.path + configMap.jcxmDataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.ypid = configMap.ypid;
                    data.jcxmc = $("input[name=jcxmc]", jqueryMap.$container).val();
                }
            },
            "columns": [
                {
                    class: "text-left",
                    "data": "jcxmid",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_jcxm" value="' + data + '"/>';
                    },

                },
                {
                    class: "text-center",
                    "data": "zwmc_bm",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "xl",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer;width: 80px;" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcx",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer;width: 80px;" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "xlz",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer;width: 80px;" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    },
                },
                {
                    class: "text-center",
                    "data": "jcfa",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer;" data-toggle="tooltip" data-placement="bottom" title="' + d + '">' + d + '</span>';
                    },
                    "width":"300px"
                },
                {
                    class: "text-center",
                    "data": "jcyj",
                    "render": function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="bottom" title="' + d + '">' + d + '</span>';
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
                var tootipContainer = $('[data-toggle="tooltip"]').tooltip();
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
            }
            //table中的序号列
          /*  fnRowCallback: function (nRow, aData, iDisplayIndex) {
                jQuery("td:eq(2)", nRow).html(iDisplayIndex + 1);
                return nRow;
            }*/
        });
        $('tbody', jqueryMap.$ypManualdata).on('click', 'tr', function () {
            if ($(this).hasClass('success')) {
                $(this).removeClass('success');
                jqueryMap.$selectedRow = null;
            }
            else {
                configMap.ypGrid.$('tr.success').removeClass('success');
                $(this).addClass('success');
                jqueryMap.$selectedRow = configMap.ypGrid.row('.success');
            }
        });
    };
    var openModal = function (title, url, type, func) {
        var dialogButtons = {};
        if (type === "import") {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                }
            };
        }
        if (type === "jcb") {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
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
                buttons: dialogButtons
            });
        });
    };

    //修改样品信息
    var editYp = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.ypGrid.cell(el.parent()).index().row;
        var id = configMap.ypGrid.row(rowIndex).data().id;
        generateTab(this, configMap.path + configMap.addUrl + '?id=' + encodeURI(id), "修改样品信息", "xgypxx", '');
    };

    //添加检测项
    var savejcx = function () {
        stopContinueClick("#savejcx", 300);
        var ids = [];//定义一个数组
        $('input[name="checkbox_checkbox"]:checked', jqueryMap.$container).each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        configMap.qywt = ids;
        if (ids.length === 0) {
            Messenger().post({
                message: '请选择样品信息!',
                type: 'warning'
            });
        } else {
            generateTab(this, configMap.path + configMap.addJcxUrl + '?type=edit&wtid=' + configMap.qywt, '增加检测项', 'ypxx_info', '');
        }

    };
    //删除样品
    var delYp = function () {
        var el = $(this);
        var rowIndex = configMap.ypGrid.cell(el.parent()).index().row;
        var id = configMap.ypGrid.row(rowIndex).data().id;
        bootbox.dialog({
            title: '提示',
            message: '是否要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url: configMap.path + "/zfwt/delYddcyybxx/" + id,
                            type: 'POST',
                            success: function (result) {
                                if (result.success) {
                                    configMap.ypGrid.ajax.reload();
                                    Messenger().post({
                                        message: "删除成功",
                                        type: 'info'
                                    });
                                } else {
                                    Messenger().post({
                                        message: result.message,
                                        type: 'error'
                                    });
                                }
                            },
                            error: function () {
                                Messenger().post({
                                    message: "删除失败！",
                                    type: 'error'
                                });
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
    };

    //增加样品的信息
    var addYddypxx = function () {
        stopContinueClick("#addCustomerManage", 300);
        generateTab(this, configMap.path + configMap.addUrl + "?wtid=" + configMap.wtid, "新增样品信息", "xzypxx", '');
    };

    var generateTab = function (_target, srcStr, menuName, id, icon) {
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
                title: '<i class="' + icon + '"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    };
    //导入
    var importExcel = function () {
        openModal('样品导入', configMap.path + configMap.importUrl + '?wtid=' + configMap.wtid, 'import', function () {
            setCyypExcel.subimtBtn(function (result) {
                if (result) {
                    Messenger().post({
                        message: "操作成功，请等待审核",
                        type: 'success'
                    });
                    jqueryMap.$contractauditDialog.modal('hide');
                    configMap.ypGrid.ajax.reload();
                }
            });
            return false;
        });
    };
    //导入检测包
    var addJcb = function () {
        var ypids = [];//定义一个数组
        $('input[name="checkbox_checkbox"]:checked', jqueryMap.$container).each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            ypids.push($(this).val());//将选中的值添加到数组ids中
        });
        var data = {
            ypxx: ypids
        }
        if (data.ypxx.length === 0) {
            Messenger().post({
                message: '请选择样品信息!',
                type: 'warning'
            });
        } else {
            openModal("选择检测项目包", "customermanage/jcxmbao/chooseJcb.jsp?ypxx=" + JSON.stringify(data), 'jcb', function () {
                chooseJcb.addjcxm();
            })
        }
    }
 //检测项目批量删除
    var delJcxms=function () {
        var jcxmids=[];
        var data={};
        $("input[name='checkbox_jcxm']:checked",jqueryMap.$container).each(function () {
            var el = $(this);
            var rowIndex = configMap.jcxmGrid.cell(el.parent()).index().row;
            var jcxmid = configMap.jcxmGrid.row(rowIndex).data().jcxmid;
            jcxmids.push(jcxmid);
        });
        if(jcxmids.length==0){
            Messenger().post({
                message: '请选择检测项信息!',
                type: 'warning'
            });
            return;
        }
        data.ypid=configMap.ypid;
        data.jcxmids=jcxmids.join(",");
        bootbox.dialog({
            title: '提示',
            message: '是否要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url: configMap.path + "/zfwt/delYpJcxm",
                            type: 'POST',
                            data:data,
                            success: function (result) {
                                if (result.success) {
                                    Messenger().post({
                                        message: "删除成功",
                                        type: 'info'
                                    });
                                    configMap.jcxmGrid.ajax.reload();
                                } else {
                                    Messenger().post({
                                        message:"删除失败!",
                                        type: 'error'
                                    });
                                }
                            },
                            error: function () {
                                Messenger().post({
                                    message: "删除失败！",
                                    type: 'error'
                                });
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

    //页面左侧 对多个 检测项目  的 检测项进行清空
    var cleanjcx=function () {
        var ypids="";
        $("input[name='checkbox_checkbox']:checked",jqueryMap.$container).each(function () {
            var el = $(this);
            var rowIndex = configMap.ypGrid.cell(el.parent()).index().row;
            var id = configMap.ypGrid.row(rowIndex).data().id;
            ypids+=id+",";
        });
        if(ypids.length==0){
            Messenger().post({
                message: '请选择检测项信息!',
                type: 'warning'
            });
            return;
        }
        bootbox.dialog({
            title: '提示',
            message: '是否要清空被选中样品所有检测项？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url: configMap.path + "/zfwt/delAllYpJcxm?ypids="+ypids,
                            type: 'POST',
                            success: function (result) {
                                if (result.success) {
                                    Messenger().post({
                                        message: "删除成功",
                                        type: 'info'
                                    });
                                    configMap.ypGrid.ajax.reload();
                                } else {
                                    Messenger().post({
                                        message:"删除失败!",
                                        type: 'error'
                                    });
                                }
                            },
                            error: function () {
                                Messenger().post({
                                    message: "删除失败！",
                                    type: 'error'
                                });
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

    return {
        init: function (uuid, wtid) {
            configMap.wtid = wtid;
            setJqueryMap(uuid);

            var tabid = $('#ckcyyp'+uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid);
            Layout.addResizeContent(jqueryMap.$container);
            setTimeout(function () {
                var layout = jqueryMap.$container.layout({
                    center__onresize: App.initLayoutContentScrollbar,
                    west__onresize: App.initLayoutContentScrollbar,
                    west__size: 450
                });
                App.initLayoutContentScrollbar('west', layout.panes.west);
                App.initLayoutContentScrollbar('center', layout.panes.center);
            }, 10);
            initYpGrid();
            initJcxmGrid();


            //新增样品信息
            $("#addYddypxx", jqueryMap.$container).off('click').on('click', function () {
                addYddypxx();
            });
            //样品查询
            $("#qywtSearch", jqueryMap.$container).off('click').on('click', function () {
                configMap.ypGrid.ajax.reload();
            });
            //样品添加检测项
            $('#savejcx',jqueryMap.$container).off().on('click', function () {
                savejcx();
            });
            //样品导入
            $("#importYpxx", jqueryMap.$container).off('click').on('click', function () {
                importExcel();
            });
            //批量清空检测项
            $("#cleanjcx", jqueryMap.$container).off('click').on('click', function () {
                cleanjcx();
            });
            //样品重置
            $("#reset", jqueryMap.$container).off('click').on('click', function () {
                $('[name="ypmc"]', jqueryMap.$container).val('');
                configMap.ypGrid.ajax.reload();
            });
            //样品导入检测包
            $('#addJcb1', jqueryMap.$container).on('click', function () {
                addJcb();
            });
            //样品多选
            $('[name="check1"]', jqueryMap.$container).on('click', function () {
                if ($('[name="check1"]', jqueryMap.$container).prop("checked")) {
                    //选中
                    $('[name="checkbox_checkbox"]', jqueryMap.$container).prop("checked", true);
                } else {
                    $('[name="checkbox_checkbox"]', jqueryMap.$container).prop("checked", false);
                }
            });
            //检测项目多选
            $('[name="check2"]', jqueryMap.$container).on('click', function () {
                if ($('[name="check2"]', jqueryMap.$container).prop("checked")) {
                    //选中
                    $('[name="checkbox_jcxm"]', jqueryMap.$container).prop("checked", true);
                } else {
                    $('[name="checkbox_jcxm"]', jqueryMap.$container).prop("checked", false);
                }
            });
            //检测项目查询
            $("#jcxmSearch", jqueryMap.$container).off('click').on('click', function () {
                configMap.jcxmGrid.ajax.reload();
            });
            //检测项目查询
            $("#jcxmReset", jqueryMap.$container).off('click').on('click', function () {
                $("[name='jcxmc']",jqueryMap.$container).val("");
                configMap.jcxmGrid.ajax.reload();
            });
            //批量删除
            $("#jcxmDel", jqueryMap.$container).off('click').on('click', function () {
               delJcxms();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        },
        reload: function () {
            configMap.ypGrid.ajax.reload();
        },
        reloadJcxm: function () {
            console.log('reloadJcxm');
            configMap.jcxmGrid.ajax.reload();
        }
    };
}();
//@ sourceURL=contractlist.js
	
	