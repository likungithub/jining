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
var costprojectmanagement = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/costprojectmanagement/findAllCostProject',
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		employeeGrid: null,
		editPageUrl: '/costprojectmanagement/edit.jsp',
		viewPageUrl: '/costprojectmanagement/view.jsp',
		editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑服务项目信息"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
		deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除服务项目"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
		viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看服务项目信息"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>'
	};

	// 全局Dom
	var jqueryMap = {
		$blockTarget: null,
		$employeeDialog: null,
		$employee:null
	};

	var setJqueryMap = function (uuid) {
		jqueryMap.$blockTarget = $('body');
		jqueryMap.$employee=$('#costprojectmanagement_'+uuid)
	};

	var openModal = function (title, url, type) {
		var dialogButtons = {};

		if (type === 'edit') {
			dialogButtons.success = {
				label: '<i class="fa fa-save iconMr"></i>保存',
				className: "btn btn btn-success btnBlue borderRadius4 colorfff",
				callback: function () {
					employeeEdit.saveEmployee(function (result) {
						if (result) {
							configMap.employeeGrid.ajax.reload();
							jqueryMap.$employeeDialog.modal('hide');
						}
					});

					return false;
				}
			};
		}

        dialogButtons.cancel = {
            label: '<i class="fa fa-times iconMr"></i>关闭',
            className: 'btn btn btn-default borderRadius4 color666 '
        };

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
		openModal("查看服务项目信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
	};

	var addEmployee = function () {
		openModal('添加服务项目信息', configMap.path + configMap.editPageUrl, 'edit');
	};

	var editEmployee = function () {
		var el = $(this);
		var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;
		var serviceCode = configMap.employeeGrid.row(rowIndex).data().serviceCode;
		openModal('编辑服务项目信息', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id) + "&serviceCode=" + serviceCode, 'edit');
	};

	/**
	 * 删除
	 */
	var delEmployee = function (event, element) {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在删除数据，请稍候...'
		});
		var rowIndex = configMap.employeeGrid.cell(element.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;
		$.ajax({
			url: configMap.path + '/costprojectmanagement/deleteByid' + "/" + id,
			type: 'POST',
			success: function (result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result) {
                    configMap.employeeGrid.ajax.reload();
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
	// /**
	//  * 模糊查询
	//  */
	// var searchByName=function(){
	// 	App.blockUI({
	// 		target: jqueryMap.$blockTarget,
	// 		boxed: true,
	// 		message: '正在加载数据，请稍候...'
	// 	});
	// 	var name=$('#costProjectLikeName').val();
	// 	$.ajax({
	// 		url: configMap.path + '/costprojectmanagement/searchByName'+'/'+name,
	// 		dataType: 'JSON',
	// 		type: 'GET',
	// 		success: function (datas) {
	// 			configMap.employeeGrid.clear().draw();
	// 			App.unblockUI(jqueryMap.$blockTarget);
	// 			if (datas.length > 0) {
	// 				return configMap.employeeGrid.rows.add(datas).draw();
	// 			}
	// 		},
	// 		error: function () {
	// 			return App.unblockUI(jqueryMap.$blockTarget);
	// 		}
	//
	// 	})
	// }

	var initEmployeeGrid = function () {
		configMap.employeeGrid = $('#employeewangshuo_data',jqueryMap.$employee).DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "ajax":{
                "url":configMap.path + configMap.dataUrl,
                "dataSrc":"aaData",
                "data":function(data){
                    data.costProjectLikeName=$('#costProjectLikeName',jqueryMap.$employee).val();
                }
            },
			"columns": [
				{
					"data": "serviceName",
					className:'text-left'
				},
				{
					"data": "payStandard",
					className:'text-right',
                    'render':function(data){
                    	if (data !== null) {
                    		return data.toFixed(2);
                    	} else{
                    		return "0.00";
                    	}
                        
                    }
				},
                {
                	"data": "businessType",
                    className:'text-center',
                    'render':function(data){
                        if (data === '001') {
                            return '代理业务';
                        } else if(data === '002'){
                            return '一次性业务';
                        }

                    }
                },
				{
					"data": "costDiscount",
					className:'text-right',
                    'render':function(data){
                    	if (data !== null) {
                    		return data.toFixed(2)+'%';
                    	} else{
                    		return "0.00%";
                    	}
                        
                    }
                },
				{
					"data": "actualCharge",
					className:'text-right',
					'render':function (data) {
						if (data !== null) {
                    		return data.toFixed(2);
                    	} else{
                    		return "0.00";
                    	}
                    }
				},
				{
					className:'text-center',
					"render": function (data, type, row) {
						if(row.agencyCode === '000000000000'){
							return ""+ configMap.viewBtn_html;
						}else if (parseInt(row.serviceCode) <= 21) {
							return   configMap.viewBtn_html+configMap.editBtn_html ;
						} else {
							return configMap.viewBtn_html+configMap.editBtn_html  + configMap.deleteBtn_html;
						}
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
				var tootipContainer = $('[data-toggle="tooltip"]',jqueryMap.$employee);
				var editContainer = $('[data-type="edit"]',jqueryMap.$employee);
				var delContainer = $('[data-type="del"]',jqueryMap.$employee);
				var viewContainer = $('[data-type="view"]',jqueryMap.$employee);
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
		init: function (uuid) {
            setJqueryMap(uuid);
            initEmployeeGrid();
            $('#btnNew',jqueryMap.$employee).off('click').on('click', function () {
				addEmployee();
			});
			$('#costProjectLikeNameBtn',jqueryMap.$employee).off('click').on('click',function(){
                configMap.employeeGrid.ajax.reload();
			});
			$('#restartBtn',jqueryMap.$employee).off('click').on('click',function(){
				$('#costProjectLikeName',jqueryMap.$employee).val("");
                configMap.employeeGrid.ajax.reload();
			});
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=employee.js