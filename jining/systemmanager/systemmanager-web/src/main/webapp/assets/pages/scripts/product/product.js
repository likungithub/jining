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
var product = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/product/product',
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		setStatusUrl: '/systemmanager/status',
		productGrid: null,
		editPageUrl: '/product/editproduct.jsp',
		addPageUrl: '/product/addproduct.jsp',
		viewPageUrl:'/product/viewproduct.jsp',
		editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑产品"><i class="icon iconfont icon-bianji1 iconFontSize"></i></a>',
		deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除产品"><i class="icon iconfont icon-shanchu3 iconFontSize"></i></a>',
		viewBtn_html:'<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看产品"><i class="icon iconfont icon-xiangqing1 iconFontSize"></i></a>'
	};

	// 全局Dom
	var jqueryMap = {
		$container: null,
		$blockTarget: null,
		$productDialog: null
	};
	//赋值
	var setJqueryMap = function (uuid) {
		jqueryMap.$container = $('#product-manager-container'+'_'+uuid);
		jqueryMap.$blockTarget = $('body');
	};
	//查看产品信息
	var viewProduct = function () {
		var el = $(this);
		var rowIndex = configMap.productGrid.cell(el.parent()).index().row;
		var id = configMap.productGrid.row(rowIndex).data().id;
		openModal("查看产品信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
	};
	//初始化表
	var initproductData = function () {
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
				configMap.productGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.productGrid.rows.add(datas).draw();
				}
			},
			error: function () {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};
	//模态框
	var openModal = function (title, url, type) {
		var dialogButtons = {};

		if (type === 'edit') {
			dialogButtons.success = {
				label:  '<i class="'+ 'fa fa-save iconMr'+ '"></i>保存',
				className: "btn btn-default btnBlue borderRadius4 colorfff",
				callback: function () {
					productEdit.saveProduct(function (result) {
						if (result) {
							initproductData();
							jqueryMap.$productDialog.modal('hide');
						}
					});

					return false;
				}
			};
		}
        dialogButtons.cancel={
            label:'<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
                className: 'btn btn-default borderRadius4'
        }
		if (type === 'add') {
			dialogButtons.success = {
				label: '<i class="'+ 'fa fa-save iconMr'+ '"></i>保存',
				className: "btn-success",
				callback: function () {
					productAdd.saveProduct(function (result) {
						if (result) {
							initproductData();
							jqueryMap.$productDialog.modal('hide');
						}
					});

					return false;
				}
			};
		}

		$.get(url, function (html) {
			jqueryMap.$productDialog = bootbox.dialog({
				className:"finance-360-manager",
				title: title,
				message: html,
				buttons: dialogButtons
			});
		});
	};
	//添加产品
	var addProduct = function () {
		openModal('添加产品', configMap.path + configMap.editPageUrl, 'edit');
	};
	//添加产品
	var editProduct = function () {
		var el = $(this);
		var rowIndex = configMap.productGrid.cell(el.parent()).index().row;
		var id = configMap.productGrid.row(rowIndex).data().id;
		openModal('编辑产品', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
	};
	//删除产品
	var delProduct = function (event, element) {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在删除数据，请稍候...'
		});

		var rowIndex = configMap.productGrid.cell(element.parent()).index().row;
		var id = configMap.productGrid.row(rowIndex).data().id;
		$.ajax({
			url: configMap.path + configMap.dataUrl + "/" + id,
			type: 'DELETE',
			success: function (result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result.success) {
					initproductData();
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
	//初始化表，放入数据
	var initproductGrid = function () {
		configMap.productGrid = $('#product_data', jqueryMap.$container).DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			"ordering": false,
			"destroy": true,
			"lengthMenu": [10, 20, 50, 100],
			"autoWidth": false,
			"columns": [
				{"data": "productNumber"},
				{"data": "productName"},
				{	className:"text-center",
					"render": function (data, type, row) {
		                return ''
						  + configMap.viewBtn_html
		                  + configMap.editBtn_html
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
				var viewContainer = $('[data-type="view"]', jqueryMap.$container);

				if (tootipContainer.length > 0) {
					tootipContainer.tooltip();
				}

				if (editContainer.length > 0) {
					editContainer.off('click').on('click', editProduct);
				}

				if (delContainer.length > 0) {
					delContainer.confirmation({
						"title": '确定要删除？',
						"btnOkLabel": '是',
						"btnCancelLabel": '否',
						"placement": 'left',
						"onConfirm": delProduct,
                        'btnOkClass':"btn btn-danger borderRadius4",
						"btnCancelClass":"btn btn-default borderRadius4"
					});
				}
				
				if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewProduct);
				}
			}
		});
	};

	return {
		init: function (uuid) {
			setJqueryMap(uuid);
			var tabid=$('#product-manager-container_'+uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid,product);
			initproductGrid();
			initproductData();
			jqueryMap.$container.find('button#btnNew').off('click').on('click', function () {
				addProduct();
			});
			$('#searchFilter1', jqueryMap.$container).on('click', function () {
		        configMap.productGrid.search($('#searchFilter', jqueryMap.$container).val()).draw();
		    });
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=product.js