var customerList = function () {
'use strict';

// 全局属性参数
var configMap = {
		path : '',
		dataUrl : '/customer/customer',
		datatablesLanguageFile : '/assets/global/plugins/datatables/chinese.json',
		customerGrid : null,
		addPageUrl : '/customer/addCustomer.jsp',
		goWorkPageUrl : '/customer/goWorkList.jsp',
		viewPageUrl : '/customer/view.jsp',
		followBtn_html : '<a href="javascript:;" class="btn btn-xs btn-default" data-type="edit" data-toggle="tooltip" title="跟进"><i class="fa fa-edit"></i></a>',
		taxBtn_html : '<a href="javascript:;" class="btn btn-xs btn-default" data-type="view" data-toggle="tooltip" title="报税"><i class="fa fa-search"></i></a>'
	};
	var dljgjson = [];

	// 全局Dom
	var jqueryMap = {
		$container: null,
		$blockTarget : null,
		$customerdialog : null,
		$selectedRow: null,
	    $customerDataTable: null
	};

	var setJqueryMap = function() {
		jqueryMap.$container = $('#customer-manager-container');
		jqueryMap.$blockTarget = $('body');
		jqueryMap.$customerDataTable = $('#customer_data', jqueryMap.$container);
	};

	var initcustomerData = function() {
		App.blockUI({
			target : jqueryMap.$blockTarget,
			boxed : true,
			message : '正在加载数据，请稍候...'
		});
		$.ajax({
			url : configMap.path + configMap.dataUrl,
			dataType : 'JSON',
			type : 'GET',
			success : function(datas) {
				configMap.customerGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.customerGrid.rows.add(datas).draw();
				}
			},
			error : function() {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};


	var openModal = function(title, url, type) {
		var dialogButtons = {};
		if (type === 'edit') {
			dialogButtons.success = {
				label : "保存",
				className : "btn btn btn-default btnBlue borderRadius4 colorfff",
				callback : function() {
					customerAdd.savecustomer(function(result) {
						if (result) {
							initcustomerData();
							jqueryMap.$customerdialog.modal('hide');
						}
					});

					return false;
				}
			};
		}
		var dialogButtons = {
			cancel : {
				label : '关闭',
				className : 'btn btn btn-default borderRadius4 color666'
			}
		};

		
		
		if (type === 'goWork') {
			dialogButtons.success = {
				label : "确认",
				className : "btn-primary",
				callback : function() {
					goWorkList.Sure(function(result) {
						if (result) {
							//initcustomerData();
							jqueryMap.$customerdialog.modal('hide');
						}
					});

					return false;
				}
			};
		}

		$.get(url, function(html) {
			jqueryMap.$customerdialog = bootbox.dialog({
				title : title,
				message : html,
				buttons : dialogButtons
			});
		});
	};


	var openModal = function(title, url, type) {
		var dialogButtons = {
			cancel : {
				label : '关闭',
				className : 'btn btn btn-default borderRadius4 color666'
			}
		};

		if (type === 'edit') {
			dialogButtons.success = {
				label : "保存",
				className : "btn btn btn-default btnBlue borderRadius4 colorfff",
				callback : function() {
					customerAdd.savecustomer(function(result) {
						if (result) {
							initcustomerData();
							jqueryMap.$customerdialog.modal('hide');
						}
					});

					return false;
				}
			};
		}
		
		if (type === 'goWork') {
			dialogButtons.success = {
				label : "确认",
				className : "btn-primary",
				callback : function() {
					goWorkList.Sure(function(result) {
						if (result) {
							//initcustomerData();
							jqueryMap.$customerdialog.modal('hide');
						}
					});

					return false;
				}
			};
		}

		$.get(url, function(html) {
			jqueryMap.$customerdialog = bootbox.dialog({
				title : title,
				message : html,
				buttons : dialogButtons
			});
		});
	};


	var viewcustomer = function() {
		var el = $(this);
		var rowIndex = configMap.customerGrid.cell(el.parent()).index().row;
		var id = configMap.customerGrid.row(rowIndex).data().id;
		openModal("查看信息", configMap.path + configMap.viewPageUrl + "?id="
				+ encodeURI(id), 'view');
	};

	/**
	 * 审核通过
	 */
	var shtg = function() {
		var inputjson = $('[type="checkbox"]:checked',jqueryMap.$customerDataTable).not(jqueryMap.$container.find('[name="selectCustomer"]'));
		var temp = null;
		dljgjson=[];
		$(inputjson).each(function(){
				temp = {dljg:$(this).attr('id')};
				dljgjson.push(temp);
		});
		var data = {
			dljg:dljgjson
		}
		$.ajax({
			url:configMap.path + configMap.dataUrl + '/sh',
			dataType: 'JSON',
			contentType: 'application/json; charset=utf-8',
			type: 'PUT',
			data: JSON.stringify(data),
			success: function (datas) {
				if(datas.success){
					initcustomerData();
					dljgjson=[];
					jqueryMap.$container.find('[name="selectCustomer"]').prop("checked",false);
					Messenger().post("批量审批成功!");
				}else{
					Messenger().post({
						message: datas.message,
						type: 'error'
					});
				}
			}
		});
	};


	var delcustomer = function(event, element) {
		App.blockUI({
			target : jqueryMap.$blockTarget,
			boxed : true,
			message : '正在删除数据，请稍候...'
		});

		var rowIndex = configMap.customerGrid.cell(element.parent()).index().row;
		var id = configMap.customerGrid.row(rowIndex).data().id;
		$.ajax({
			url : configMap.path + configMap.dataUrl + "/" + id,
			type : 'DELETE',
			success : function(result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result) {
					initcustomerData();
					Messenger().post("删除成功!");
				} else {
					Messenger().post({
						message : "删除成功!",
						type : 'error'
					});
				}
			},
			error : function() {
				App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};
	
	var selectAll = function (status){
		$('[type="checkbox"]',jqueryMap.$customerDataTable).not(":disabled").prop("checked",status);
		var inputjson = $('[type="checkbox"]:checked',jqueryMap.$customerDataTable).not(jqueryMap.$container.find('[name="selectCustomer"]'));
		var temp = null;
		dljgjson=[];
		$(inputjson).each(function(){
				temp = {dljg:$(this).attr('id')};
				dljgjson.push(temp);
		});
	};

	var initcustomerGrid = function () {
		configMap.customerGrid = $('#customer_data').DataTable({
							"dom" : 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
							"ordering" : false,
							"destroy" : true,
							"lengthMenu" : [ 10, 20, 50, 100 ],
							"autoWidth" : true,
							"columns" : [
									{
										   "data": "id",
										   "render": function (data, type, row) {
											   var content = '';
											   if(row.is_enabled){
												   content += '<input type="checkbox" name="checkbox_checkbox" id="'+data+'" disabled="disabled"/>';
											   }else{
												   content += '<input type="checkbox" name="checkbox_checkbox" id="'+data+'"/>';
											   }
												return content;
											}
									},
									{

										"data" : "code",
										className:'text-center'
											
									},
									{

										"data" : "name",
										className:'text-center'
											
									},
									{

										"data" : "is_enabled",
										className:'text-center',
										"render" : function(data, type, row) {
											if (data) {
												return "<font color='green'>已启用</font>";
											} else {
												return "<font color='red'>未启用</font>";
											}
//											return configMap.followBtn_html
//													+ configMap.taxBtn_html;
										}

									}],
							"language" : {
                                "zeroRecords": "暂时没有数据",
                                "infoEmpty": "无记录",
                                "sEmptyTable": "暂时没有数据",
                                "sInfoThousands":",",
                                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
							},
							"drawCallback" : function() {}
						});
		$('tbody', jqueryMap.$customerDataTable).on('move', 'tr', function () {
		      if ($(this).hasClass('success')) {
		        $(this).removeClass('success');
		        jqueryMap.$selectedRow = null;
		      }
		      else {
		        configMap.customerGrid.$('tr.success').removeClass('success');
		        $(this).addClass('success');
		        jqueryMap.$selectedRow = configMap.customerGrid.row('.success');
		      }
		    });
		
		$('tbody', jqueryMap.$customerDataTable).on( 'click', 'tr', function () {
	        $(this).toggleClass('selected');
	    } );
	};
	

	return {
		init : function() {
			//新增
			$('#sh').off('click').on('click', function() {
				shtg();
			});
			
			$('#customerSearch', jqueryMap.$container).on('keyup', function () {
		        configMap.customerGrid.search(this.value).draw();
		      });
			
			setJqueryMap();
			initcustomerGrid();
			initcustomerData();
			//点击选择所有
			jqueryMap.$container.find('[name="selectCustomer"]').change(function (){
				var el = $(this);
				selectAll(el.is(':checked'));
			});
		},
		setPath : function(path) {
			configMap.path = path;
		}
	};
}();