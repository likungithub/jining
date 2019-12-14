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

/*global $, App, moment, jQuery, bootbox, customergettingstartedEdit */
var customergettingstarted = function() {
	'use strict';

	// 全局属性参数
	var configMap = {
		path : '',
		dataUrl : '/customergettingstarted/findFile',
		datatablesLanguageFile : '/assets/global/plugins/datatables/chinese.json',
		customergettingstartedGrid : null,
		editcgsPageUrl : '/customergettingstarted/editcgs.jsp',
		editPageUrl : '/customergettingstarted/edit.jsp',
		viewPageUrl : '/customergettingstarted/view.jsp',
		editcgsBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="editcgs" data-toggle="tooltip" title="编辑新手入门信息"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
		deleteBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
		/*downloadBtn_html:'<a class="btn btn-xs default" data-type="download" data-toggle="tooltip" title="下载"><i class="icon iconfont icon-xiazai iconFontColor-10a0f7 iconFontSize"></i></a>'*/
		/*viewBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看雇员信息"><i class="fa fa-search  iconFontColor-10a0f7 iconFontSize"></i></a>'*/
	};

	// 全局Dom
	var jqueryMap = {
		$blockTarget : null,
		$customergettingstartedDialog : null
	};

	var setJqueryMap = function() {
		jqueryMap.$blockTarget = $('body');
	};

	var initcustomergettingstartedData = function() {
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
				configMap.customergettingstartedGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.customergettingstartedGrid.rows.add(datas)
							.draw();
				}
			},
			error : function() {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};

	var openModal = function(title, url, type) {
		var dialogButtons = {};

		// if (type === 'editcgs') {
		// 	dialogButtons.success = {
		// 		label : "保存",
		// 		className : "btn-success storeBtn border4",
		// 		callback : function() {
		// 			customergettingstartedEdit
		// 					.savecustomergettingstarted(function(result) {
		// 						if (result) {
		// 							initcustomergettingstartedData();
		// 							jqueryMap.$customergettingstartedDialog
		// 									.modal('hide');
		// 						}
		// 					});
        //
		// 			return false;
		// 		}
		// 	};
		// }
		if(type === 'edit'){
			dialogButtons.success = {
					label : '<i class="'+ 'fa fa-save iconMr'+ '"></i>保存',
					className : "btn btn-success btnBlue borderRadius4 colorfff",
					callback : function() {
						customeredit
								.saveEmployee(function(result) {
									if (result) {
										initcustomergettingstartedData();
										jqueryMap.$customergettingstartedDialog
												.modal('hide');
									}
								});

						return false;
					}
				};
		}
		if(type==='editcgs'){
			dialogButtons.success = {
					label : '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
					className : "btn btn-success btnBlue borderRadius4 colorfff",
					callback : function() {
						customergettingstartededitcgs.savecustomergettingstarted(function(result) {
									if (result) {
										initcustomergettingstartedData();
										jqueryMap.$customergettingstartedDialog
												.modal('hide');
									}
								});

						return false;
					}
				};
			
		}
		dialogButtons.cancel = {
            label : '<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
            className : 'btn btn-default borderRadius4 color666'
        };

		$.get(url, function(html) {
			jqueryMap.$customergettingstartedDialog = bootbox.dialog({
				className:"newcomer-introduction",
				title : title,
				message : html,
				buttons : dialogButtons
			});
		});
	};

	var viewcustomergettingstarted = function() {
		var el = $(this);
		var rowIndex = configMap.customergettingstartedGrid.cell(el.parent())
				.index().row;
		var id = configMap.customergettingstartedGrid.row(rowIndex).data().id;
		openModal("查看新手入门信息", configMap.path + configMap.viewPageUrl + "?id="
				+ encodeURI(id), 'view');
	};

	var addcustomergettingstarted = function() {
		openModal('添加文件', configMap.path + configMap.editcgsPageUrl,'editcgs');
	};
	

	var editcgscustomergettingstarted = function() {
		var el = $(this);
		var rowIndex = configMap.customergettingstartedGrid.cell(el.parent())
				.index().row;
		var id = configMap.customergettingstartedGrid.row(rowIndex).data().id;
		openModal('编辑新手信息', configMap.path + configMap.editPageUrl + "?id="
				+ encodeURI(id) , 'edit');
	};

	var delcustomergettingstarted = function(event, element) {
		App.blockUI({
			target : jqueryMap.$blockTarget,
			boxed : true,
			message : '正在删除数据，请稍候...'
		});

		var rowIndex = configMap.customergettingstartedGrid.cell(
				element.parent()).index().row;
		var id = configMap.customergettingstartedGrid.row(rowIndex).data().id;
		$.ajax({
			url : configMap.path + "/customergettingstarted/deleteFile?id="+id,
			type : 'PUT',
			success : function(result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result) {
					initcustomergettingstartedData();
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

	var initcustomergettingstartedGrid = function() {
		configMap.customergettingstartedGrid = $('#customergettingstarted_data')
				.DataTable(
						{
							"dom" : 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
							"ordering" : false,
							"destroy" : true,
							"lengthMenu" : [ 10, 20, 50, 100 ],
							"autoWidth" : false,
							"columns" : [
									{
										"data" : "fileName"/*,
										"render":function(d,t,r){
											return '<a href="'+r.filePath+'"'+' download="">'+d+'</a>'
										}*/
									},
									{
										"data" : "fileContent"/*,
                                        "render":function(d,t,r){
                                            return '<a href="'+r.filePath+'"'+' download="">'+d+'</a>'
                                        }*/
									},
									{
										"data" : "inputTime",
										"render" : function(data, type, row) {
											if (data != null) {
												return moment(data).format(
														'YYYY-MM-DD');
											} else {
												return "";
											}
										}
										/*,,
										
										"render":function(data,type,row){
											return '<a href="'+data+'" download="">'+data+'</a>'
										}*/
										
									},
									// {
									// 	"data" : "taxpayerNumber"
									// },
									// {
									// 	"data" : "agencyNumber"
									// },
									{
										"data" : "fileName",
										"render" : function(data, type, row) {
											var btn='';
											if($('#updateCustomergettingstartedBtn').length===1){
												btn=btn+configMap.editcgsBtn_html;
											}if($('#deleteCustomergettingstartedBtn').length===1){
												btn=btn+configMap.deleteBtn_html;
											}
											var  downloadBtn_html = '<a class="btn btn-xs default" data-type="download" data-toggle="tooltip" title="下载" href="'+row.filePath+'" download=""><i class="icon iconfont icon-xiazai- iconFontColor-10a0f7 iconFontSize"></i></a>';
											if(btn===''){
												return downloadBtn_html;
											}else{
												// return downloadBtn_html+btn;
												return configMap.editcgsBtn_html + downloadBtn_html + configMap.deleteBtn_html;
											}
											
										}
									} ],
							"language" : {
                                "zeroRecords": "暂时没有数据",
                                "infoEmpty": "无记录",
                                "sEmptyTable": "暂时没有数据",
                                "sInfoThousands":",",
                                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
							},
							"drawCallback" : function() { // 数据加载完成后执行
								var tootipContainer = $('[data-toggle="tooltip"]');
								var editcgsContainer = $('[data-type="editcgs"]');
								var delContainer = $('[data-type="del"]');
								var viewContainer = $('[data-type="view"]');
								/*var downloadContainer=$('[data-type="download"]')*/

								if (tootipContainer.length > 0) {
									tootipContainer.tooltip();
								}

								if (editcgsContainer.length > 0) {
									editcgsContainer.off('click').on('click',
											editcgscustomergettingstarted);
								}

								if (delContainer.length > 0) {
									delContainer.confirmation({
										"title" : '确定要删除？',
										"btnOkLabel" : '是',
										"btnCancelLabel" : '否',
										"placement" : 'left',
										"onConfirm" : delcustomergettingstarted,
                                        "btnOkClass":'btn btn-danger borderRadius4',
                                        "btnCancelClass":"btn btn-default borderRadius4"
									});
								}

								if (viewContainer.length > 0) {
									viewContainer.off('click').on('click',
											viewcustomergettingstarted);
								}
								/*if(downloadContainer.length>0){
									var el = $(this);
									console.info(el);
									var rowIndex = configMap.customergettingstartedGrid.cell(el.parent())
											.index().row;
									var url = configMap.customergettingstartedGrid.row(rowIndex).data().filePath;
									downloadContainer.attr('href','"'+url+'"');
								}*/
							}
						});
	};

	return {
		init : function() {
			
			var tabid=$('#wangshuo1').parents('.tab-pane').attr('id').slice(17);
			tabMenu(tabid);
			$('#ftpshangchuan123').off('click').on('click', function() {
				addcustomergettingstarted();
			});

			if($('#ftpshangchuan123').length===0){
				$('#btnisexit').hide();
			}
			setJqueryMap();
			initcustomergettingstartedGrid();
			initcustomergettingstartedData();
		},
		setPath : function(path) {
			configMap.path = path;
		},
		reload : function(){
			initcustomergettingstartedData();
		}
	};
}();
// @ sourceURL=customergettingstarted.js
