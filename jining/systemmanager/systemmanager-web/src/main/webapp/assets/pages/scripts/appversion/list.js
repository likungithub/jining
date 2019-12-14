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

/*global $, App, moment, jQuery, bootbox, appiconmanagerEdit */
var list = function() {
	'use strict';

	// 全局属性参数
	var configMap = {
		path : '',
		dataUrl : '/appiconmanager/findFile',
		datatablesLanguageFile : '/assets/global/plugins/datatables/chinese.json',
		appiconmanagerGrid : null,
		editcgsPageUrl : '/appiconmanager/addappicon.jsp',
		editPageUrl : '/appversion/edit.jsp',
		viewPageUrl : '/appiconmanager/viewappicon.jsp',
		editcgsBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="editcgs" data-toggle="tooltip" title="编辑版本信息"><i class="icon iconfont icon-bianji iconFontColor-10a0f7 iconFontSize"></i></a>',
		deleteBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu iconFontColor-10a0f7 iconFontSize"></i></a>',
		viewBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看图标信息"><i class="fa fa-search  iconFontColor-10a0f7 iconFontSize"></i></a>',
		checkbox_html: '<input type="checkbox" class="group-checkbox" data-type="check" data-toggle="tooltip" />'
	};

	// 全局Dom
	var jqueryMap = {
		$container: null,	
		$blockTarget : null,
		$appiconmanagerDialog : null
	};

	var setJqueryMap = function() {
		jqueryMap.$container = $('#appicon-manager-content');
		jqueryMap.$blockTarget = $('body');
	};
	/**
	 * 初始化initappiconmanagerData
	 */
	var initappiconmanagerData = function() {
		App.blockUI({
			target : jqueryMap.$blockTarget,
			boxed : true,
			message : '正在加载数据，请稍候...'
		});
		$.ajax({
			url : configMap.path + "/appversion/findAll",
			dataType : 'JSON',
			type : 'GET',
			success : function(datas) {
				configMap.appiconmanagerGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.appiconmanagerGrid.rows.add(datas)
							.draw();
				}
			},
			error : function() {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};

	/**
	 * 打开模态框代码
	 */
	var openModal = function(title, url, type) {
		var dialogButtons = {};
		if(type === 'edit'){
			dialogButtons.success = {
					label :'<i class="fa fa-save iconMr"></i> 保存 ',
					className : "btn btn-success btnBlue borderRadius4 colorfff",
					callback : function() {
						edit.saveappicon(function(result) {
									if (result) {
										initappiconmanagerData();
										jqueryMap.$appiconmanagerDialog
												.modal('hide');
									}
								});

						return false;
					}
				};
		}else if(type==='addappicon'){
			dialogButtons.success = {
					label : '<i class="fa fa-save iconMr"></i> 保存 ',
					className : "btn btn-success btnBlue borderRadius4 colorfff",
					callback : function() {
						appiconAdd.addappicont(function(result) {
									if (result) {
										initappiconmanagerData();
										jqueryMap.$appiconmanagerDialog
												.modal('hide');
									}
								});

						return false;
					}
				};
		}
		dialogButtons.cancel = {
            label :'<i class="fa fa-times iconMr"></i> 关闭 ',
            className : 'btn btn-default borderRadius4 color666'
        };

		$.get(url, function(html) {
			jqueryMap.$appiconmanagerDialog = bootbox.dialog({
				className:"newcomer-introduction appiconmanager-dialog-m",
				title : title,
				message : html,
				buttons : dialogButtons
			});
		});
	};

	/**
	 * 查看图片信息模块
	 * 打开图片信息
	 */
	var viewappiconmanager = function() {
		var el = $(this);
		var rowIndex = configMap.appiconmanagerGrid.cell(el.parent())
				.index().row;
		var id = configMap.appiconmanagerGrid.row(rowIndex).data().id;
		openModal("查看图片信息", configMap.path + configMap.viewPageUrl + "?id="
				+ encodeURI(id), 'view');
	};
var addappiconmanager = function() {
		openModal('新增图标', configMap.path + configMap.editcgsPageUrl,'addappicon');
	};
	

	
var editcgsappiconmanager = function() {
		var el = $(this);
		var rowIndex = configMap.appiconmanagerGrid.cell(el.parent())
				.index().row;
		var id = configMap.appiconmanagerGrid.row(rowIndex).data().id;
		openModal('编辑版本信息', configMap.path + configMap.editPageUrl + "?id="
				+ encodeURI(id) , 'edit');
	};

	/**
	 * 删除
	 */
	var delappiconmanager = function(event, element) {
		App.blockUI({
			target : jqueryMap.$blockTarget,
			boxed : true,
			message : '正在删除数据，请稍候...'
		});

		var rowIndex = configMap.appiconmanagerGrid.cell(
				element.parent()).index().row;
		var id = configMap.appiconmanagerGrid.row(rowIndex).data().id;
		$.ajax({
			url : configMap.path + "/appiconmanager/deleteappicon/"+id,
			type : 'DELETE',
			success : function(result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result) {
					initappiconmanagerData();
					Messenger().post("删除成功!");
				} else {
					Messenger().post({
						message : "删除失败!",
						type : 'error'
					});
				}
			},
			error : function() {
				App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};
	//批量删除
	var deleteBatchAppicon = function () {
		var id = '';
		jqueryMap.$container.find(':checked[data-toggle="tooltip"]').each(function () {
            var el = $(this);
            var rowIndex = configMap.appiconmanagerGrid.cell(el.parent()).index().row;
            var ids = configMap.appiconmanagerGrid.row(rowIndex).data().id;
            id += ids + ',';
		});
		if(id==''){
			Messenger().post({message: '请选择要删除的数据！', type: 'error'});
		}else{
			$.ajax({
				url : configMap.path + "/appiconmanager/deleteappicon/"+id,
				type : 'DELETE',
				success : function(result) {
					App.unblockUI(jqueryMap.$blockTarget);
					if (result) {
						initappiconmanagerData();
						Messenger().post("删除成功!");
					} else {
						Messenger().post({
							message : "删除失败!",
							type : 'error'
						});
					}
				},
				error : function() {
					App.unblockUI(jqueryMap.$blockTarget);
				}
			});
			$('#allCheckIco').attr("checked", false);
		}
	};

	/**
	 * 初始化datatable
	 */
	var initappiconmanagerGrid = function() {
		configMap.appiconmanagerGrid = $('#appiconmanager_data')
				.DataTable(
						{
							"dom" : 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
							"ordering" : false,
							"destroy" : true,
                            "paging": false, // 禁止分页
							"lengthMenu" : [ 10, 20, 50, 100 ],
							"autoWidth" : false,
                            "info": false,
                            "columns" : [
									{
										"data" : "rjlx",
                                        "render":function(data,type,row){
											if((""+data)=='1'){
												return 'android';
											}else{
												return 'ios';
											}
                                        }
									},
									{
										"data" : "rjbb"
									},
									{
										"data" : "xzdz"
									},
									{
										"data" : "gxry",
										className:"text-center"
									},
									{"data": "gxrq",
                                        className:'text-center',
										"render":function(data,type,row){
											if((""+data)!='') {
                                                return moment(data).format('YYYY-MM-DD');
                                            }else{
												return "";
											}
										}
									},
									{	className:'text-center',
										"render" : function(data, type, row) {
											return configMap.editcgsBtn_html;
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
								if (tootipContainer.length > 0) {
									tootipContainer.tooltip();
								}

								if (editcgsContainer.length > 0) {
									editcgsContainer.off('click').on('click',
											editcgsappiconmanager);
								}
							}
						});
	};

	return {
		init : function() {
			


			setJqueryMap();

			initappiconmanagerGrid();
			initappiconmanagerData();




		},
		setPath : function(path) {
			configMap.path = path;
		},
		reload : function(){
			initappiconmanagerData();
		}
	};
}();
// @ sourceURL=appiconmanager.js
