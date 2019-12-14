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
var announcementtype = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UniqueID: '',
        dataUrl: '/announcementType',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        announcementtypeGrid: null,
        editPageUrl: '/announcementtype/announcementtypeedit.jsp',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑公告类型"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除公告类型"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $announcementtypeDialog: null,
        $announcementType: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$announcementType = $('#announcementType_' + configMap.UniqueID);
    };

    var initAnnouncementTypeData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/getAllAnnouncementType',
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.announcementtypeGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.announcementtypeGrid.rows.add(datas).draw();
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
                label:  '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    announcementtypeEdit.saveAnnouncementType(function (result) {
                        if (result) {
                            //initAnnouncementTypeData();
                            configMap.announcementtypeGrid.ajax.reload(null ,false);
                            jqueryMap.$announcementtypeDialog.modal('hide');
                        }
                    });

                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label:  '<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
            className: 'btn borderRadius4 btn-default'
        };

        $.get(url, function (html) {
            jqueryMap.$announcementtypeDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                className:'announcementType-dialog'
            });
        });
    };

    var addAnnouncementType = function () {
    	stopContinueClick("#addNewGGLXBtn",300);
        openModal('添加公告类型', configMap.path + configMap.editPageUrl, 'edit');
    };

    var editAnnouncementType = function () {
    	stopContinueClick(this,300);
        var el = $(this);
        var rowIndex = configMap.announcementtypeGrid.cell(el.parent()).index().row;
        var id = configMap.announcementtypeGrid.row(rowIndex).data().id;
        openModal('编辑公告类型', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
    };

    var delAnnouncementType = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });

        var rowIndex = configMap.announcementtypeGrid.cell(element.parent()).index().row;
        var id = configMap.announcementtypeGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/getUsedAnnouncementType?id=' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                if (data > 0) {
                    App.unblockUI(jqueryMap.$blockTarget);
                    bootbox.alert('不能删除使用中的公告类型！');
                } else {
                    $.ajax({
                        url: configMap.path + configMap.dataUrl + "/deleteAnnouncementType?id=" + id,
                        type: 'PUT',
                        success: function (result) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            if (result) {
                                //initAnnouncementTypeData();
                                configMap.announcementtypeGrid.ajax.reload(null ,false);
                                Messenger().post("删除成功!");
                            }
                            else {
                                Messenger().post({
                                    message: "删除成功!",
                                    type: 'error'
                                });
                            }
                        }
                    });
                }
            }
        });
    };

    var initAnnouncementTypeGrid = function () {
        configMap.announcementtypeGrid = jqueryMap.$announcementType.find('#announcementtype_data').DataTable({
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
                {"data": "announcementTypeName"},
                {
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
            	$('.dataTables_empty').attr("style","text-align:center");
                var tootipContainer = $('[data-toggle="tooltip"]');
                var editContainer = $('[data-type="gglx_edit"]');
                var delContainer = $('[data-type="del"]');

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editAnnouncementType);
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delAnnouncementType,
                        "btnOkClass":'btn btn-danger borderRadius4',
                        "btnCancelClass":"btn btn-default borderRadius4"
                    });
                }
            }
        });
    };

    var searchAnnouncementTypeByText = function () {
        jqueryMap.$announcementType.find("#searchAnnouncementType1").on('click', function () {
            var searchText = encodeURIComponent(jqueryMap.$announcementType.find("#searchAnnouncementType").val());
            if (searchText !== '') {
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/searchAnnouncementTypeByText?searchText=" + searchText,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function (datas) {
                        configMap.announcementtypeGrid.clear().draw();
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (datas.length > 0) {
                            return configMap.announcementtypeGrid.rows.add(datas).draw();
                        }
                    },
                    error: function () {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            } else {
                //initAnnouncementTypeData();
                configMap.announcementtypeGrid.ajax.reload();
            }
        });
    };

    var initAnnouncementTypeByPaging = function () {
        configMap.announcementtypeGrid = jqueryMap.$announcementType.find('#announcementtype_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl + "/getAnnouncementTypeByPaging",
                "dataSrc": "aaData",
                "data": function (data) {
                    var text = jqueryMap.$announcementType.find('#searchAnnouncementType').val();
                    data.searchText = text;
                }
            },
            "columns": [
                {"data": "announcementTypeName"},
                {
                    "data": "enterDate",
                    "render": function (data, type, row) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                },
                {
                    "render": function (data, type, row) {
                        return '<button data-type="gglx_edit" style="border: none;z-index: 10;background: transparent;outline: none;">' + 
                        configMap.editBtn_html + '</button>' + configMap.deleteBtn_html;
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
            	$('.dataTables_empty').attr("style","text-align:center");
                var tootipContainer = $('[data-toggle="tooltip"]');
                var editContainer = $('[data-type="gglx_edit"]');
                var delContainer = $('[data-type="del"]');

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editAnnouncementType);
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delAnnouncementType,
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
            var tabid=$('#announcementType_' + UniqueID).parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);
            //initAnnouncementTypeGrid();
            //initAnnouncementTypeData();
            initAnnouncementTypeByPaging();
            //searchAnnouncementTypeByText();
            jqueryMap.$announcementType.find('#searchAnnouncementType1').on('click', function () {
                //configMap.announcementtypeGrid.search(this.value).draw();
                configMap.announcementtypeGrid.ajax.reload();
            });
            jqueryMap.$announcementType.find('#addNewGGLXBtn').off('click').on('click', function () {
                addAnnouncementType();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=announcementtype.js