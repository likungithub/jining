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
		dataUrl: '/leaveType/findAll',
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		employeeGrid: null,
		editPageUrl: '/leaveType/leavetypeadd.jsp',
		/*viewPageUrl: '/systemmanager/commonproblemview.jsp',*/
		editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑请假类型"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
		deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除雇员"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
		/*viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看雇员信息"><i class="fa fa-search"></i></a>'*/
	};

	// 全局Dom
	var jqueryMap = {
		contain:null,
		$blockTarget: null,
		$employeeDialog: null
	};

	var setJqueryMap = function () {
		jqueryMap.contain=$('#leaveTypeList');
		jqueryMap.$blockTarget = $('body');
	};

	/*var initEmployeeData = function () {
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
	};*/

	var openModal = function (title, url, type) {
		var dialogButtons = {}
		if (type === 'edit') {
			dialogButtons.success = {
				label: '<i class="fa fa-save iconMr"></i>保存',
				className: "btn btn btn-success btnBlue borderRadius4 colorfff",
				callback: function () {
					employeeEdit.saveLeaveType(function (result) {
						if (result) {
							configMap.employeeGrid.ajax.reload();
							jqueryMap.$employeeDialog.modal('hide');
						}
					});

					return false;
				}
			};
		}
        dialogButtons.cancel= {
            label: '<i class="fa fa-times  iconMr"></i>关闭',
            className: 'btn btn btn-default borderRadius4 color666 '
        }
		$.get(url, function (html) {
			jqueryMap.$employeeDialog = bootbox.dialog({
				title: title,
				message: html,
				buttons: dialogButtons
			});
		});
	};

	/*var viewEmployee = function () {
		var el = $(this);
		var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;
		openModal("查看雇员信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
	};*/

	var addEmployee = function () {
		openModal('添加请假类型', configMap.path + configMap.editPageUrl, 'edit');
	};

	var editEmployee = function () {
		var el = $(this);
		var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;
		openModal('编辑请假类型', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
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
			url: configMap.path + '/leaveType/delete' + "/" + id,
			type: 'DELETE',
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

    var delAllLeaveType = function () {
        var id = "";
		jqueryMap.contain.find($('.leaveTypeCheckbox:checked')).each(function () {
            var el = $(this);
            var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
			var ids=configMap.employeeGrid.row(rowIndex).data().id;
            id += ids + ',';
        })
        if(id==""||id==null){
            Messenger().post({message: '请选择要删除的数据！', type: 'error'});
        }else{
            bootbox.dialog({
                title: '提示',
                message: '确定要删除？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn-danger",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '正在删除，请稍候...'
                            })
                            $.ajax({
                                url: configMap.path + '/leaveType/delete' + "/" + id,
                                type: 'DELETE',
                                success: function (result) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    if (result) {
                                        configMap.employeeGrid.ajax.reload();
                                        Messenger().post("删除成功!");
                                    }
                                    else {
                                        Messenger().post({
                                            message: "删除失败!",
                                            type: 'error'
                                        });
                                    }
                                },
                                error: function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                }
                            });

       		 			},
        			},
        				cancel: {
            				label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
							className: 'btn-default'
								},
							},
					});

				}
		}


	var initEmployeeGrid = function () {
		configMap.employeeGrid = $('#leavetype_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax":{
                "url":configMap.path + configMap.dataUrl,
                "dataSrc":"aaData",
                "data":function(data){
					var searchtxt=$('#leaveTypeSearchTxt').val();
					data.searchTxt=searchtxt;
                }
            },
			"columns": [
                { 'className':'text-center',
                    "render": function (data, type, row) {
                        return '<input type="checkbox" class="leaveTypeCheckbox" value="'+row.id+'">'
                    }
                },
				{ 'className':'text-center',
					"data": "leaveName"
				},
				{ 'className':'text-center',
					"data": "ifVacation",
                    "render": function (data, type, row) {
					   if(data==0){
					   	return "是"
					   }else{
					   	return "否"
					   }
					},
				},
				{ 'className':'text-center',
					"data": "remarkInfo"
				},
				{	'className':'text-center',
					"render": function (data, type, row) {
						return configMap.editBtn_html + configMap.deleteBtn_html;/* + configMap.viewBtn_html;*/
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
			$('#leaveTypeCheckAll').off('click').on('click',function () {
				if(this.checked){
                    $('.leaveTypeCheckbox').prop("checked",true);
				}else{
                    $('.leaveTypeCheckbox').prop("checked",false);
				}
            });
			$('#addLeaveType').off('click').on('click', function () {
				addEmployee();
			});
			$('#deleteAllLeaveType').off('click').on('click',function () {
                delAllLeaveType();
            })
			$('#searchLeaveTypeBySearch').off('clikc').on('click',function () {
				configMap.employeeGrid.ajax.reload();
            })
			setJqueryMap();
			initEmployeeGrid();
			/*initEmployeeData();*/
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=employee.js