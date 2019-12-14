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
        more:'',
		path: '',
		dataUrl: '/shortmessage/findAllMs',
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		employeeGrid: null,
		editPageUrl: '/systemmanager/edit.jsp',
		viewPageUrl: '/shortmessage/view.jsp',
		editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑短信日志信息"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
		deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除短信日志信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
		viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看短信日志信息"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>',
		advancePageUrl:'/advancecompanymanagement/advancecompany.jsp'//企业垫付信息管理
	};

	// 全局Dom
	var jqueryMap = {
		$shortmessage:null,
		$blockTarget: null,
		$employeeDialog: null
	};

	var setJqueryMap = function () {
		jqueryMap.$blockTarget = $('body');
		jqueryMap.$shortmessage=$('#shortmessage');
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
		openModal("查看短信信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
	};

	var addEmployee = function () {
		openModal('添加短信信息', configMap.path + configMap.editPageUrl, 'edit');
	};

	var editEmployee = function () {
		var el = $(this);
		var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;
		openModal('编辑短信信息', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
	};
	var advancecompany=function(){
		openModal('增加企业垫付信息',configMap.path+configMap.advancePageUrl,'advancecompany');
	}
	var delEmployee = function (event, element) {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在删除数据，请稍候...'
		});
		var rowIndex = configMap.employeeGrid.cell(element.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;
		$.ajax({
			url: configMap.path + '/shortmessage/deleteByOneShortMessage' + "/" + id,
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
	/**
	 * 批量删除
	 */
	var delAllShortMessage= function(){
		var id = '';
		jqueryMap.$shortmessage.find($(':checked[data-type="check"]')).each(function () {
			 var el = $(this);
	            var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
	            var ids = configMap.employeeGrid.row(rowIndex).data().id;
	            id += ids + ',';
		});
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
								url:configMap.path+'/shortmessage/deleteAllShortMessage/'+id,
								type:'POST',
								success:function(result){
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
			         },    
			     },
			      cancel: {
			          label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
			          className: 'btn-default'
				      },
			     },
			});
		
		}
	};	

	var getShortMessage=function(){
		App.blockUI({
			target : jqueryMap.$blockTarget,
			boxed : true,
			message : '正在加载数据，请稍候...'
		});
		$.ajax({
			url:configMap.path+'/shortmessage/findAllShortMessageType',
			type:'post',
			success:function(data){
				for(var i=0;i<data.length;i++){
					$('#shortMessageType').append('<option value="'+data[i].typecode+'">'+data[i].paramsname+'</option>')
				}
				App.unblockUI(jqueryMap.$blockTarget);
			},
			error : function() {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	}
	var searchByTimeByNsr=function(){
		$('#findByZdy',jqueryMap.$shortmessage).off('click').on('click',function(){
			configMap.employeeGrid.ajax.reload();
		})
	}
	var initEmployeeGrid = function () {
		configMap.employeeGrid = $('#shortmessage_data').DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            //"destroy": true,
            "pageLength": 10,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "ajax": {
                "url":configMap.path+'/shortmessage/findAllMs',
                "dataSrc": "aaData",
                "data": function (data) {
					var searchText=$('#searchByNsrsbhText').val();
					var beginTime=$('#beginTime').val();
					var endTime=$('#endTime').val();
					var more =configMap.more;
					var type=$('#shortMessageType').val();
					data.searchText=searchText;
					data.beginTime=beginTime;
					data.endTime=endTime;
					data.more=more;
					data.type=type;
				}
			},
			"columns": [
			            
			    {
			    	'className':'text-center',
			    	"render":function(data,type,row){
			    		return '<input type="checkbox" class="group-checkbox" data-type="check" data-toggle="tooltip">'
			    	}
			    },       
				{
					"data": "id",
					'className':'text-center',
				},
				// {
				// 	"data": "nsrsbh",
				// 	'className':'text-center',
				// },
				// {
				// 	"data": "jsr_dm",
				// 	'className':'text-center',
				// },
				{
					"data": "bfsr",
					'className':'text-center',
				},
				{
					"data": "fsr_dm",
					'className':'text-center',
				},
				// {
				// 	"data": "dljg_bm",
				// 	'className':'text-center',
				// 	},
				// {
				// 	"data": "dxlx",
				// 	'className':'text-center',
				// },
				{
					"data": "dxnr",
					'className':'text-left',
					},
				{
					"data": "fszt",
					'className':'text-center',
					"render":function(data,type,row){
						if(data==0){
							return "未发送";
						}else{
							return "已发送";
						}
					}
					
				},
				{
					"data": "fssj",
					'className':'text-center',
					"render": function (data, type, row) {
						return moment(data).format('YYYY-MM-DD');
					}
				},
				{
					'className':'text-center',
					"render": function (data, type, row) {
						
						return   configMap.viewBtn_html+configMap.deleteBtn_html;
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
			jqueryMap.$shortmessage.find('#allshortmessagecheck').off('click').on('click',function(){
				if(this.checked){
					jqueryMap.$shortmessage.find($('[data-type="check"]')).prop('checked', true);
				}else{
					jqueryMap.$shortmessage.find($('[data-type="check"]')).prop('checked', false);
				}
			});
			$('#deleteAllShortMessage').off('click').on('click',function(){
				delAllShortMessage();
			});
			$('#starDate_div',jqueryMap.$shortmessage).datepicker({
				clearBtn : true,
				format : 'yyyy-mm-dd',
				autoclose : true,
				language : 'zh-CN'
			});
			$('#starDate_div1',jqueryMap.$shortmessage).datepicker({
				clearBtn : true,
				format : 'yyyy-mm-dd',
				autoclose : true,
				language : 'zh-CN'
			});
			getShortMessage();
			searchByTimeByNsr();
			$('#moreBywsAndMdw').off('click').on('click',function () {
				/*if($('#moreBywsAndMdw').css('dispaly')=='none'){
					configMap.more=0;
				}else {

				}*/
                if($(this).attr("data")==0){
                    configMap.more=0;
                    // $(".search-body").children("span").show();
                    $(this).prev().removeClass("rotate1")
                    $(this).attr("data",1)
                }else{
                    // $(".search-body").children("span").hide();
                    $(this).prev().addClass("rotate1")
                    $(this).attr("data",0);
                    configMap.more=1;
                }
                $("#shortmessageinfowrap",'#shortmessage').toggle(100);
            })
			$('#reInitShortMessageBtn',jqueryMap.$shortmessage).off('click').on('click',function(e){
                configMap.employeeGrid.ajax.reload();
				e.preventDefault();
			});
			$('#openModelAdvance',jqueryMap.$shortmessage).off('click').on('click',function(){
				advancecompany();
			})
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=employee.js