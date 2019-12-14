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

/*global $, App, moment, jQuery, bootbox, employeeEdit */
var params = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/params/params',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        setStatusUrl: '/params/statusparams',
        paramsGrid: null,
        editPageUrl: '/params/editparams.jsp',
        addPageUrl: '/params/addparams.jsp',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑基础参数"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除基础参数"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $paramsDialog: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#params-manager-container' + '_' + uuid);
        jqueryMap.$blockTarget = $('body');
    };

    var initparamsData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.paramsGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.paramsGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var openModal = function (title, url, type) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-default btnBlue borderRadius4 colorfff ",
                callback: function () {
                    paramsEdit.saveParams(function (result) {
                        if (result) {
                            initparamsData();
                            jqueryMap.$paramsDialog.modal('hide');
                        }
                    });

                    return false;
                }
            };
        }


        if (type === 'add') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    paramsAdd.saveParams(function (result) {
                        if (result) {
                            initparamsData();
                            jqueryMap.$paramsDialog.modal('hide');
                        }
                    });

                    return false;
                }
            };
        }
        dialogButtons.cancel = {
            label:'<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
            className: 'btn btn-default borderRadius4'
        }

        $.get(url, function (html) {
            jqueryMap.$paramsDialog = bootbox.dialog({
                className: "common-basic-params",
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var addparamsmenu = function () {
        var el = $(this);
        var rowIndex = configMap.paramsGrid.cell(el.parent()).index().row;
        var id = configMap.paramsGrid.row(rowIndex).data().id;
        openModal("增加二级参数", configMap.path + configMap.addPageUrl + "?id=" + encodeURI(id), 'add');
    };

    var addParams = function () {
        openModal('添加基础参数', configMap.path + configMap.editPageUrl, 'edit');
    };

    var editParams = function () {
        var el = $(this);
        var rowIndex = configMap.paramsGrid.cell(el.parent()).index().row;
        var id = configMap.paramsGrid.row(rowIndex).data().id;
        openModal('编辑基础参数', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
    };

    var delParams = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });

        var rowIndex = configMap.paramsGrid.cell(element.parent()).index().row;
        var id = configMap.paramsGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/" + id,
            type: 'DELETE',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    initparamsData();
                    Messenger().post("删除成功!");
                }
                else {
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
    };
    var setUserStatus = function (event, el) {
        var rowIndex = configMap.paramsGrid.cell(el.closest('td')).index().row;
        var id = configMap.paramsGrid.row(rowIndex).data().id;
        var currentStatus = el.attr('user-status');
        var title = '';

        var excStatus = 0;
        var disHtml = '';
        if (currentStatus === '1') {
            disHtml = '<i class="icon iconfont icon-suo  iconFontColor-10a0f7 iconFontSize"></i>';
            title = '停用';
            excStatus = 0;
        } else if (currentStatus === '0') {
            disHtml = '<i class="icon iconfont icon-kaisuo  iconFontColor-10a0f7 iconFontSize"></i>';
            title = '启用';
            excStatus = 1;
        }

        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在' + title + '参数，请稍候...'
        });

        $.ajax({
            url: configMap.path + configMap.setStatusUrl
            + "/" + id + "/" + excStatus,
            type: 'PUT',
            success: function (datas) {
                if (datas) {
                    App.unblockUI(jqueryMap.$blockTarget);
                    el.html(disHtml);
                    el.attr('data-original-title', '已' + title);
                    el.attr('user-status', excStatus);
                    Messenger().post({
                        message: '成功' + title + '参数！'
                    });
                } else {
                    App.unblockUI(jqueryMap.$blockTarget);
                    Messenger().post({
                        message: '该参数有下级参数，不可停用！',
                        type: 'error'
                    });
                }
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: title + '参数失败！',
                    type: 'error'
                });
            }
        });
    };
    var initparamsGrid = function () {
        configMap.paramsGrid = $('#params_data', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "columns": [
                {"data": "type"},
                {"data": "typename"},
                {"data": "paramsname"},
                {"data": "institutionid"},
                {   className:"text-center",
                    "render": function (data, type, row) {
                        var statusHtml = '';
                        if (row.onuse === 1) {
                            statusHtml =
                                '<a href="javascript:;" class="btn btn-xs default" data-type="staus" data-toggle="tooltip" user-status="1" title="已启用" data-title="确定要停用用户？"><i class="icon iconfont icon-kaisuo iconFontColor-10a0f7 iconFontSize"></i></a>';
                        }
                        else {
                            statusHtml =
                                '<a href="javascript:;" class="btn btn-xs default" data-type="staus" data-toggle="tooltip" user-status="0" title="已停用" data-title="确定要启用用户？"><i class="icon iconfont icon-suo iconFontColor-10a0f7 iconFontSize"></i></a>';
                        }
                        var addmenuHtml = '';
                        if (row.lastmenu === '1') {
                            addmenuHtml = '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="添加二级参数"><i class="icon iconfont icon-tianjia iconFontColor-10a0f7 iconFontSize" style="font-weight: 900"></i></a>';
                        }
                        else {
                            addmenuHtml = '';
                        }
                        return ''
                            + configMap.editBtn_html
                            + statusHtml
                            + addmenuHtml
                            + configMap.deleteBtn_html;
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
                var editContainer = $('[data-type="edit"]', jqueryMap.$container);
                var delContainer = $('[data-type="del"]', jqueryMap.$container);
                var addContainer = $('[data-type="view"]', jqueryMap.$container);
                var userStatusContainer = $('[data-type="staus"]', jqueryMap.$container);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editParams);
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delParams,
                        "btnOkClass":'btn btn-danger borderRadius4',
                        "btnCancelClass":"btn btn-default borderRadius4"
                    });
                }
                if (userStatusContainer.length > 0) {
                    userStatusContainer.confirmation({
                        "title": '是否确定要启停用户？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": setUserStatus,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }
                if (addContainer.length > 0) {
                    addContainer.off('click').on('click', addparamsmenu);
                }
            }
        });
    };

    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            var tabid=$('#params-manager-container_'+uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid,params);
            initparamsGrid();
            initparamsData();
            jqueryMap.$container.find('button#btnNew').off('click').on('click', function () {
                addParams();
            });
            $('#searchFilter1', jqueryMap.$container).on('click', function () {
                configMap.paramsGrid.search($('#searchFilter', jqueryMap.$container).val()).draw();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=employee.js