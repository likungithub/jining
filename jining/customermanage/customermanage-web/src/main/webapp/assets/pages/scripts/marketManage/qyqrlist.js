/**
 *
 */
var yddcydList = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/zfwt/getQywtAllsy',
        // addUrl: '/marketManage/qywtqr_jbxx.jsp',
        addUrl:'/zfwt/tozfqrwt',
        addYpxxUrl: '/marketManage/ckcyyplist.jsp',
        addJcxUrl: '/marketManage/jcxmlist.jsp',
        importUrl: '/marketManage/importExcel.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        qywtGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="修改一对多抽样信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        chakanBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="chakan" title="查看样品信息"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="contractdelete" title="删除一对多抽样信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
        $container: null,
        $wtManageDataTable: null,

    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#wtqrList-manager-content');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#qywtqr' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#qyqrlist_data');
        jqueryMap.$wtManageDataTable = $('#qyqrlist_data', jqueryMap.$container);

    };

    var qywtjson = [];

    var initQywtGrid = function () {
        configMap.qywtGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    data.searchText = $('[name="cydbh"]', jqueryMap.$content).val();
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox" value="' + data + '" id="qywtqr_' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "render": function (data, type, row) {
                        return configMap.editBtn_html + configMap.deleBtn_html+configMap.chakanBtn_html;
                    }
                },
                {
                    class: "text-center",
                    "data": "wtid"
                },

                {
                    class: "text-center",
                    "data": "cydd"
                },
                {
                    class: "text-center",
                    "data": "cydwlxr"
                },
                {
                    class: "text-center",
                    "data": "cydwlxdh"
                },
                {
                    class: "text-center",
                    "data": "cyrq"
                },
                {
                    class: "text-center",
                    "data": "sjdw"
                },
                {
                    class: "text-center",
                    "data": "cxzt",
                    render: function (d, t, r) {
                        if (d == "003") {
                            d = "林果农残";
                        } else if (d == "006") {
                            d = "农产品农残";
                        }
                        return d;
                    }
                }
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands": ",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                var editContainer = jqueryMap.$content.find('[name="contractedit"]');
                var deleteContainer = jqueryMap.$content.find('[name="contractdelete"]');
                var chakanContainer = jqueryMap.$content.find('[name="chakan"]');
                $('[data-toggle="tooltip"]').tooltip();

                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editQywt);
                }

                if (deleteContainer.length > 0) {
                    deleteContainer.off('click').on('click', delQywt);
                }
                if (chakanContainer.length > 0) {
                    chakanContainer.off('click').on('click', ckypxx);
                }
            }
        });
    };

    var openModal = function (title, url, type) {
        var dialogButtons = {};
        if (type === "edit") {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractcontinue.saveContract(function (result) {
                        if (result) {
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.qywtGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        if (type === "change") {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractChange.saveChange(function (result) {
                        if (result) {
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.qywtGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        if (type === 'import') {
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

    //修改委托信息
    var editQywt = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.qywtGrid.cell(el.parent()).index().row;
        var id = configMap.qywtGrid.row(rowIndex).data().id;
        generateTab(this, configMap.path + configMap.addUrl + '?id=' + id, "查看企业委托", "qywt_info", 'fa fa-file-text-o iconMr');
    };

    //提交企业委托
    var tjQYWT = function () {
        var ids = [];//定义一个数组
        $('input[name="checkbox_checkbox"]:checked', jqueryMap.$content).each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        var data = {
            wtid: ids
        }
        $.ajax({
            url: configMap.path + "/zfwt/updateYpzt",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
                if (result.success) {
                    Messenger().post({
                        message: "提交成功",
                        type: "info"
                    });
                    qywtlist.reload();
                } else {
                    Messenger().post({
                        message: result.message,
                        type: 'danger'
                    });
                }

            },
            error: function (result) {
                $('#saveKhxx').html("保存");
                Messenger().post({
                    message: '提交失败！',
                    type: 'danger'
                });
            }
        })
    }

    //删除抽样单
    var delQywt = function () {
        var el = $(this);
        var rowIndex = configMap.qywtGrid.cell(el.parent()).index().row;
        var id = configMap.qywtGrid.row(rowIndex).data().id;
        bootbox.dialog({
            title: '提示',
            message: '是否要删除？',
            buttons: {
                success: {
                    label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                    className: "btn btn-danger borderRadius4",
                    callback: function () {
                        $.ajax({
                            url: configMap.path + "/zfwt/delZfwt/" + id,
                            type: 'POST',
                            success: function (result) {
                                if (result.success) {
                                    configMap.qywtGrid.ajax.reload();
                                    Messenger().post({
                                        message: "删除成功",
                                        type: 'success'
                                    });
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
    };

    //全选
    var selectAllWt = function (status) {
        $('[type="checkbox"]', jqueryMap.$wtManageDataTable).prop("checked", status);
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$wtManageDataTable).not(jqueryMap.$container.find('[name="selectqywtqrlist"]'));
        var temp = null;
        qywtjson = [];
        $(inputjson).each(function () {
            temp = {qywt: $(this).attr('id').substring(3)};
            qywtjson.push(temp);
        });
    };

    //增加企业委托
    var addQYWT = function () {
        stopContinueClick("#addCustomerManage", 300);
        generateTab(this, configMap.path + configMap.addUrl, "创建一对多抽样", "qywt_info", 'fa fa-file-text-o iconMr');
    };

    //查看样品信息
    var ckypxx = function () {
            var el = $(this);
            var rowIndex = configMap.qywtGrid.cell(el.parent()).index().row;
            var wtid = configMap.qywtGrid.row(rowIndex).data().wtid;
            generateTab(this, configMap.path + configMap.addYpxxUrl + '?wtid=' + encodeURI(wtid), "样品信息", "ypxx", '');
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


    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            initQywtGrid();
            jqueryMap.$content.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            jqueryMap.$content.find('.endTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $("#addYDDCY", jqueryMap.$content).off('click').on('click', function () {
                addQYWT();
            });
            //查询
            $("#qywtSearch", jqueryMap.$content).off('click').on('click', function () {
                configMap.qywtGrid.ajax.reload();
            });

            //提交企业委托
            $("#tjQYWT", jqueryMap.$content).off('click').on('click', function () {
                tjQYWT();
            });

            $("#reset", jqueryMap.$content).off('click').on('click', function () {
                $('[name="cydbh"]', jqueryMap.$content).val('');
                configMap.qywtGrid.ajax.reload();
            });

            //点击选择所有(委托确认)
            jqueryMap.$container.find('[name="selectqywtqrlist"]').change(function () {
                var el = $(this);
                selectAllWt(el.is(':checked'));
            });
        },
        setPath: function (path) {
            configMap.path = path;
        },
        reload: function () {
            configMap.qywtGrid.ajax.reload();
        }
    };
}();
//@ sourceURL=contractlist.js
	
	