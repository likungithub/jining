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
var expensemanagement = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/expensemanagement/expense',
        editPageUrl: '/expensemanagement/expenseadd.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        setStatusUrl: '/params/statusparams',
        paramsGrid: null,
        addPageUrl: '/params/addparams.jsp',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑费用信息"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除费用信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $paramsDialog: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#expensemanagement-container_' + uuid);
        jqueryMap.$blockTarget = $('body');
    };

    var initexpenseData = function () {
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
                	expenseadd.saveProduct(function (result) {
                        if (result) {
                        	initexpenseData();
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
                	expenseadd.saveProduct(function (result) {
                        if (result) {
                        	initexpenseData();
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

    var addExpense = function () {
        openModal('费用录入', configMap.path + configMap.editPageUrl, 'add');
    };

    var editParams = function () {
        var el = $(this);
        var rowIndex = configMap.paramsGrid.cell(el.parent()).index().row;
        var id = configMap.paramsGrid.row(rowIndex).data().id;
        openModal('编辑费用', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
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
                	initexpenseData();
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
    var initexpenseGrid = function () {
        configMap.paramsGrid = $('#expense_data', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "columns": [
                {
                	className:"text-center",
                	"data": "sflx_mc"
                },
                {
                	className:"text-center",
                	"data": "cpfy",
                	"render":function (data, type, row) {
                		return data.toFixed(2) + "元"
                	}
                },
                {
                	className:"text-center",
                	"data": "jfns",
                	"render":function (data, type, row) {
                		return data + "年"
                	}
                },
                {
                	className:"text-center",
                	"data": "fyzk",
                	"render":function (data, type, row) {
                		return data + "%"
                	}
                },
                {
                	className:"text-center",
                	"data": "sjfy",
                	"render":function (data, type, row) {
                		return data.toFixed(2) + "元"
                	}
                },
                {   
                	className:"text-center",
                    "render": function (data, type, row) {
                        return ''
                            + configMap.editBtn_html
                            + configMap.deleteBtn_html
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
                var editContainer = $('[data-type="edit"]', jqueryMap.$container);
                var delContainer = $('[data-type="del"]', jqueryMap.$container);
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
            }
        });
    };

    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            var tabid=$('#expensemanagement-container_'+uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid,expensemanagement);
            initexpenseGrid();
            initexpenseData();
            jqueryMap.$container.find('button#expensebtnNew').off('click').on('click', function () {
                addExpense();
            });
            $('#searchFilter', jqueryMap.$container).on('keyup', function () {
                configMap.paramsGrid.search(this.value).draw();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=employee.js