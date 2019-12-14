/**
 * Created by huxinquan on 2017/6/23.
 */
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

/*global $, App, moment, jQuery, bootbox, commonproblemEdit */
var commonproblem = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UniqueID: '',
        dataUrl: '/commonProblem',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        commonproblemGrid: null,
        searchCommonProblem: '',
        editPageUrl: '/commonproblem/commonproblemedit.jsp',
        viewPageUrl: '/commonproblem/commonproblemview.jsp',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑常见问题"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除常见问题"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看常见问题"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        checkbox_html: '<input type="checkbox" class="group-checkbox" data-type="check" data-toggle="tooltip" />'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $commonproblemDialog: null,
        $commonProblem: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$commonProblem = $('#commonProblem_' + configMap.UniqueID);
    };

    var initCommonProblemData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/getAllCommonProblem',
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.commonproblemGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.commonproblemGrid.rows.add(datas).draw();
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
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    commonproblemEdit.saveCommonProblem(function (result) {
                        if (result) {
                            initCommonProblemData();
                            jqueryMap.$commonproblemDialog.modal('hide');
                        }
                    });

                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };
        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className:'common-pro-modal',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var viewCommonProblem = function () {
        var el = $(this);
        var rowIndex = configMap.commonproblemGrid.cell(el.parent()).index().row;
        var id = configMap.commonproblemGrid.row(rowIndex).data().id;
        openModal("查看常见问题", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
    };

    var addCommonProblem = function () {
        openModal('添加常见问题', configMap.path + configMap.editPageUrl, 'edit');
    };

    var editCommonProblem = function () {
        var el = $(this);
        var rowIndex = configMap.commonproblemGrid.cell(el.parent()).index().row;
        var id = configMap.commonproblemGrid.row(rowIndex).data().id;
        openModal('编辑常见问题', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
    };

    var delCommonProblem = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });

        var rowIndex = configMap.commonproblemGrid.cell(element.parent()).index().row;
        var id = configMap.commonproblemGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/deleteCommonProblem?id=" + id,
            type: 'PUT',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    initCommonProblemData();
                    Messenger().post("删除成功!");
                }
                else {
                    Messenger().post({
                        message: "删除成功!",
                        type: 'error'
                    });
                }
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    
    var delCheckedCommonProblem = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        var ids = '';
        jqueryMap.$commonProblem.find('#btnDelAll').off('click').on('click', function () {
            if (jqueryMap.$commonProblem.find(':checked[data-type="check"]').length == '0') {
                tipWin('请选择要删除的常见问题');
            } else {
                jqueryMap.$commonProblem.find(':checked[data-type="check"]').each(function () {
                    var el = $(this);
                    var rowIndex = configMap.commonproblemGrid.cell(el.parent()).index().row;
                    var id = configMap.commonproblemGrid.row(rowIndex).data().id;
                    ids += id + ',';
                });
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/delCheckedCommonProblem?ids=" + ids,
                    type: 'PUT',
                    success: function (result) {
                        ids = '';
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (result) {
                            jqueryMap.$commonProblem.find('#allCheck').prop("checked", false);
                            initCommonProblemData();
                            Messenger().post("删除成功!");
                        }
                        else {
                            Messenger().post({
                                message: "删除成功!",
                                type: 'error'
                            });
                        }
                    },
                    error: function () {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            }
        });
    };

    function tipWin(mes){
        bootbox.dialog({
            title: '温馨提示',
            message:'<p>'+mes+'</p>',
        });
    }

    var initCommonProblemGrid = function () {
        configMap.commonproblemGrid = jqueryMap.$commonProblem.find('#commonproblem_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "columnDefs":[
                {
                    "targets": [0],
                    "searchable": false
                },
                {
                    "targets": [1],
                    "searchable": false
                },
                {
                    "targets": [4],
                    "searchable": false
                },
                {
                    "targets": [5],
                    "searchable": false
                }
            ],
            "columns": [
                {
                    "render": function (data, type, row) {
                        return configMap.checkbox_html;
                    }
                },
                {"data": "id"},
                {"data": "problemCategoryName",
                'className':'text-left'},
                {"data": "problemName", 'className':'text-left'},
                {
                    "data": "enterDate",
                    "render": function (data, type, row) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                },
                {
                    "render": function (data, type, row) {
                        return configMap.viewBtn_html + configMap.editBtn_html + configMap.deleteBtn_html;
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$commonProblem);
                var editContainer = $('[data-type="edit"]', jqueryMap.$commonProblem);
                var delContainer = $('[data-type="del"]', jqueryMap.$commonProblem);
                var viewContainer = $('[data-type="view"]', jqueryMap.$commonProblem);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editCommonProblem);
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delCommonProblem,
                        "btnOkClass":'btn btn-danger borderRadius4',
                        "btnCancelClass":"btn btn-default borderRadius4"
                    });
                }

                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewCommonProblem);
                }
            }
        });
    };

    var searchCommonProblemByText = function () {
        configMap.searchCommonProblem = jqueryMap.$commonProblem.find("#searchCommonProblem");
        configMap.searchCommonProblem.on('blur', function () {
            var searchText = encodeURIComponent(configMap.searchCommonProblem.val());
            if (searchText !== '') {
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/searchCommonProblemByText?searchText=" + searchText,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function (datas) {
                        configMap.commonproblemGrid.clear().draw();
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (datas.length > 0) {
                            return configMap.commonproblemGrid.rows.add(datas).draw();
                        }
                    },
                    error: function () {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            } else {
                initCommonProblemData();
            }
        });
    };

    return {
        init: function (UniqueID) {
            configMap.UniqueID = UniqueID;
            setJqueryMap();
            initCommonProblemGrid();
            initCommonProblemData();
            delCheckedCommonProblem();
            //searchCommonProblemByText();
            jqueryMap.$commonProblem.find('#searchCommonProblem1').on('click', function () {
                configMap.commonproblemGrid.search(jqueryMap.$commonProblem.find('#searchCommonProblem').val()).draw();
            });
            jqueryMap.$commonProblem.find('#btnNew').off('click').on('click', function () {
                addCommonProblem();
            });
            jqueryMap.$commonProblem.find('#allCheck').off('click').on('click', function () {
                if (this.checked) {
                    jqueryMap.$commonProblem.find($('[data-type="check"]')).prop("checked", true);
                } else {
                    jqueryMap.$commonProblem.find($('[data-type="check"]')).prop("checked", false);
                }
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=commonproblem.js