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
var employee = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/systemmanager/employee',
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		employeeGrid: null,
		editPageUrl: '/systemmanager/edit.jsp',
		viewPageUrl: '/systemmanager/view.jsp',
		editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑雇员信息"><i class="fa fa-edit"></i></a>',
		deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除雇员"><i class="fa fa-times"></i></a>',
		viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看雇员信息"><i class="fa fa-search"></i></a>'
	};

	// 全局Dom
	var jqueryMap = {
		$blockTarget: null,
		$employeeDialog: null
	};

	var setJqueryMap = function () {
		jqueryMap.$blockTarget = $('body');
	};

	var initEmployeeData = function () {
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
				configMap.employeeGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.employeeGrid.rows.add(datas).draw();
				}
			},
			error: function () {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};

	var openModal = function (title, url, type) {
		var dialogButtons = {
			cancel: {
				label: '关闭',
				className: 'btn-default'
			}
		};

		if (type === 'edit') {
			dialogButtons.success = {
				label: "保存",
				className: "btn-success",
				callback: function () {
					employeeEdit.saveEmployee(function (result) {
						if (result) {
							initEmployeeData();
							jqueryMap.$employeeDialog.modal('hide');
						}
					});

					return false;
				}
			};
		}

		$.get(url, function (html) {
			jqueryMap.$employeeDialog = bootbox.dialog({
				title: title,
				message: html,
				buttons: dialogButtons
			});
		});
	};

	var viewEmployee = function () {
		var el = $(this);
		var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;
		openModal("查看雇员信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
	};

	var addEmployee = function () {
		openModal('添加雇员信息', configMap.path + configMap.editPageUrl, 'edit');
	};

	var editEmployee = function () {
		var el = $(this);
		var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;
		openModal('编辑雇员信息', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
	};

	var delEmployee = function (event, element) {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在删除数据，请稍候...'
		});

		var rowIndex = configMap.employeeGrid.cell(element.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;
		$.ajax({
			url: configMap.path + configMap.dataUrl + "/" + id,
			type: 'DELETE',
			success: function (result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result) {
					initEmployeeData();
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

	var initEmployeeGrid = function () {
		configMap.employeeGrid = $('#employee_data').DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			"ordering": false,
			"destroy": true,
			"lengthMenu": [10, 20, 50, 100],
			"autoWidth": false,
			"columns": [
				{"data": "name"},
				{"data": "code"},
				{"data": "sex"},
				{"data": "age"},
				{
					"data": "birthday",
					"render": function (data, type, row) {
						return moment(data).format('YYYY-MM-DD');
					}
				},
				{
					"render": function (data, type, row) {
						return configMap.editBtn_html + configMap.deleteBtn_html + configMap.viewBtn_html;
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
				var tootipContainer = $('[data-toggle="tooltip"]');
				var editContainer = $('[data-type="edit"]');
				var delContainer = $('[data-type="del"]');
				var viewContainer = $('[data-type="view"]');

				if (tootipContainer.length > 0) {
					tootipContainer.tooltip();
				}

				if (editContainer.length > 0) {
					editContainer.off('click').on('click', editEmployee);
				}

				if (delContainer.length > 0) {
					delContainer.confirmation({
						"title": '确定要删除？',
						"btnOkLabel": '是',
						"btnCancelLabel": '否',
						"placement": 'left',
						"onConfirm": delEmployee
					});
				}

				if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewEmployee);
				}
			}
		});
	};

	return {
		init: function () {
			$('#btnNew').off('click').on('click', function () {
				addEmployee();
			});

			setJqueryMap();
			initEmployeeGrid();
			initEmployeeData();
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=employee.js