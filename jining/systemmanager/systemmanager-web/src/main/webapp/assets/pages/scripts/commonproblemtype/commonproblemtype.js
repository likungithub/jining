/**
 * Created by huxinquan on 2017/7/3.
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
var commonproblemtype = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UniqueID: '',
        dataUrl: '/commonProblemType',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        commonproblemtypeGrid: null,
        editPageUrl: '/commonproblemtype/commonproblemtypeedit.jsp',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑常见问题类型"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除常见问题类型"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $commonproblemtypeDialog: null,
        $commonProblemType: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$commonProblemType = $('#commonProblemType_' + configMap.UniqueID);
    };

    var initCommonProblemTypeData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/getAllCommonProblemType',
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.commonproblemtypeGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.commonproblemtypeGrid.rows.add(datas).draw();
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
                label:'<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    commonproblemtypeEdit.saveCommonProblemType(function (result) {
                        if (result) {
                            //initCommonProblemTypeData();
                            configMap.commonproblemtypeGrid.ajax.reload(null ,false);
                            jqueryMap.$commonproblemtypeDialog.modal('hide');
                        }
                    });

                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
            className: 'btn borderRadius4 btn-default'
        };

        $.get(url, function (html) {
            jqueryMap.$commonproblemtypeDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                className:'commonProblemType-dialog'
            });
        });
    };

    var addCommonProblemType = function () {
        openModal('添加常见问题类型', configMap.path + configMap.editPageUrl, 'edit');
    };

    var editCommonProblemType = function () {
        var el = $(this);
        var rowIndex = configMap.commonproblemtypeGrid.cell(el.parent()).index().row;
        var id = configMap.commonproblemtypeGrid.row(rowIndex).data().id;
        openModal('编辑常见问题类型', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
    };

    var delCommonProblemType = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });

        var rowIndex = configMap.commonproblemtypeGrid.cell(element.parent()).index().row;
        var id = configMap.commonproblemtypeGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/getUsedCommonProblemType?id=' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                if (data > 0) {
                    App.unblockUI(jqueryMap.$blockTarget);
                    bootbox.alert('不能删除使用中的问题类型！');
                } else {
                    $.ajax({
                        url: configMap.path + configMap.dataUrl + "/deleteCommonProblemType?id=" + id,
                        type: 'PUT',
                        success: function (result) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            if (result) {
                                //initCommonProblemTypeData();
                                configMap.commonproblemtypeGrid.ajax.reload(null ,false);
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
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var initCommonProblemTypeGrid = function () {
        configMap.commonproblemtypeGrid = jqueryMap.$commonProblemType.find('#commonproblemtype_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "columnDefs":[
                {
                    "targets": [1],
                    "searchable": false
                },
                {
                    "targets": [2],
                    "searchable": false
                }
            ],
            "columns": [
                {  className:'text-left',
                    "data": "commonProblemTypeName"},
                {   className:'text-left',
                    "data": "enterDate",
                    "render": function (data, type, row) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                },
                {
                    "render": function (data, type, row) {
                        return configMap.editBtn_html + configMap.deleteBtn_html;
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$commonProblemType);
                var editContainer = $('[data-type="edit"]', jqueryMap.$commonProblemType);
                var delContainer = $('[data-type="del"]', jqueryMap.$commonProblemType);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editCommonProblemType);
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delCommonProblemType,
                        "btnOkClass":'btn btn-danger borderRadius4',
                        "btnCancelClass":"btn btn-default borderRadius4"
                    });
                }
            }
        });
    };

    var searchCommonProblemTypeByText = function () {
        jqueryMap.$commonProblemType.find("#searchCommonProblemType").on('blur', function () {
            var searchText = encodeURIComponent(jqueryMap.$commonProblemType.find("#searchCommonProblemType").val());
            if (searchText !== '') {
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/searchCommonProblemTypeByText?searchText=" + searchText,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function (datas) {
                        configMap.commonproblemtypeGrid.clear().draw();
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (datas.length > 0) {
                            return configMap.commonproblemtypeGrid.rows.add(datas).draw();
                        }
                    },
                    error: function () {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            } else {
                //initCommonProblemTypeData();
                configMap.commonproblemtypeGrid.ajax.reload();
            }
        });
    };

    var initCommonProblemByPaging = function () {
        configMap.commonproblemtypeGrid = jqueryMap.$commonProblemType.find('#commonproblemtype_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl + "/getCommonProblemByPaging",
                "dataSrc": "aaData",
                "cache":false,
                "data": function (data) {
                    var text = jqueryMap.$commonProblemType.find('#searchCommonProblemType').val();
                    data.searchText = text;
                }
            },
            "columns": [
                { className:'text-left',"data": "commonProblemTypeName"},
                {
                    className:'text-left',
                    "data": "enterDate",
                    "render": function (data, type, row) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                },
                {
                    "render": function (data, type, row) {
                        return configMap.editBtn_html + configMap.deleteBtn_html;
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$commonProblemType);
                var editContainer = $('[data-type="edit"]', jqueryMap.$commonProblemType);
                var delContainer = $('[data-type="del"]', jqueryMap.$commonProblemType);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editCommonProblemType);
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delCommonProblemType,
                        "btnOkClass":'btn btn-danger borderRadius4',
                        "btnCancelClass":"btn btn-default borderRadius4"
                    });
                }
            }
        });
    };

    return {
        init: function (UniqueID) {
            configMap.UniqueID = UniqueID;
            setJqueryMap();
            //initCommonProblemTypeGrid();
            //initCommonProblemTypeData();
            //searchCommonProblemTypeByText();
            initCommonProblemByPaging();
            jqueryMap.$commonProblemType.find('#searchCommonProblemType1').on('click', function () {
                //configMap.commonproblemtypeGrid.search(this.value).draw();
                configMap.commonproblemtypeGrid.ajax.reload();
            });
            jqueryMap.$commonProblemType.find('#btnNew').off('click').on('click', function () {
                addCommonProblemType();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=commonproblemtype.js