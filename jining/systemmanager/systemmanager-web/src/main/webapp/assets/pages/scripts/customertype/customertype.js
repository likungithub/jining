var customertype = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',//
		dataUrl: '/customertype/customertype',//Controller类中的 @RequestMapping路径/方法名上方的@RequestMapping(value = "????", method = RequestMethod.GET)
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		customertypeGrid: null,
		editPageUrl: '/customertype/editcustomertype.jsp',
		editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑客户分类"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
		deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除客户分类"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>'
	};

	// 全局Dom
	var jqueryMap = {
		$container: null,
		$blockTarget: null,
		$customertypeDialog: null
	};
	//赋值
	var setJqueryMap = function (uuid) {
		jqueryMap.$container = $('#customertype-manager-container'+'_'+uuid);
		jqueryMap.$blockTarget = $('body');
	};
	//初始化表
	var initcustomertypeData = function () {
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
				configMap.customertypeGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.customertypeGrid.rows.add(datas).draw();
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
				label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
				className: "btn btn-success btnBlue borderRadius4 colorfff",
				callback: function () {
					customertypeEdit.savecustomertype(function (result) {
						if (result) {
							initcustomertypeData();
							jqueryMap.$customertypeDialog.modal('hide');
						}
					});

					return false;
				}
			};
		}

        dialogButtons.cancel={
            label: '<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
                className: 'btn btn-default borderRadius4'
        }
		$.get(url, function (html) {
			jqueryMap.$customertypeDialog = bootbox.dialog({
				title: title,
				message: html,
				animate:true,
				buttons: dialogButtons,
				className:'customertype-dialog-m'
			});
		});
	};
	//新增客户分类
	var addCustomertype = function () {
		stopContinueClick("#addCustomertype",300);
		openModal('添加客户分类', configMap.path + configMap.editPageUrl, 'edit');
	};
	//修改客户分类
	var editcustomertype = function () {
		stopContinueClick(this,300);
		var el = $(this);
		var rowIndex = configMap.customertypeGrid.cell(el.parent()).index().row;
		var id = configMap.customertypeGrid.row(rowIndex).data().id;
		openModal('编辑客户分类', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
	};
	//删除客户分类
	var delcustomertype = function (event, element) {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在删除数据，请稍候...'
		});

		var rowIndex = configMap.customertypeGrid.cell(element.parent()).index().row;
		var id = configMap.customertypeGrid.row(rowIndex).data().id;
		$.ajax({
			url: configMap.path + configMap.dataUrl + "/" + id,
			type: 'DELETE',
			success: function (result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result.success) {
					initcustomertypeData();
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
	var initcustomertypeGrid = function () {
		configMap.customertypeGrid = $('#customertype_data', jqueryMap.$container).DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			"ordering": false,
			"destroy": true,
			"lengthMenu": [10, 20, 50, 100],
			"autoWidth": false,
			"columns": [
				{"data": "khfl_mc"},
				{
					className:'text-center',
					"render": function (data, type, row) {
		                return ''
		                  + '<button data-type="khfl_edit" style="border: none;z-index: 10;background: transparent;outline: none;">' + 
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
				var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
				var editContainer = $('[data-type="khfl_edit"]', jqueryMap.$container);
				var delContainer = $('[data-type="del"]', jqueryMap.$container);

				if (tootipContainer.length > 0) {
					tootipContainer.tooltip();
				}

				if (editContainer.length > 0) {
					editContainer.off('click').on('click', editcustomertype);
				}

				if (delContainer.length > 0) {
					delContainer.confirmation({
						"title": '确定要删除？',
						"btnOkLabel": '是',
						"btnCancelLabel": '否',
						"placement": 'left',
						"onConfirm": delcustomertype,
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
			var tabid=$('#customertype-manager-container_' + uuid).parents('.tab-pane').attr('id').slice(17);

		    tabMenu(tabid);
			initcustomertypeGrid();
			initcustomertypeData();
			$("#addCustomertype").on("click", function(e) {
				addCustomertype();
			});
			$('#searchFilterBtn', jqueryMap.$container).on('click', function () {
		        configMap.customertypeGrid.search($('#searchFilter', jqueryMap.$container).val()).draw();
		    });
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
