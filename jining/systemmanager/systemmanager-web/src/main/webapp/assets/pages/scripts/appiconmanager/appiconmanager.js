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
var appiconmanager = function() {
	'use strict';

	// 全局属性参数
	var configMap = {
		path : '',
		dataUrl : '/appiconmanager/findFile',
		datatablesLanguageFile : '/assets/global/plugins/datatables/chinese.json',
		appiconmanagerGrid : null,
		editcgsPageUrl : '/appiconmanager/addappicon.jsp',
		editPageUrl : '/appiconmanager/editappicon.jsp',
		viewPageUrl : '/appiconmanager/viewappicon.jsp',
		editcgsBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="editcgs" data-toggle="tooltip" title="编辑图标信息"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
		deleteBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
		viewBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看图标信息"><i class="icon iconfont icon-xiangqing1  iconFontColor-10a0f7 iconFontSize"></i></a>',
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
			url : configMap.path + "/appiconmanager/findAll",
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
						appiconEdit.saveappicon(function(result) {
									if (result) {
										configMap.appiconmanagerGrid.ajax.reload();
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
                                        configMap.appiconmanagerGrid.ajax.reload();
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
		openModal('编辑图片信息', configMap.path + configMap.editPageUrl + "?id="
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
                    configMap.appiconmanagerGrid.ajax.reload();
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
					if (result.success) {
                        configMap.appiconmanagerGrid.ajax.reload();
						Messenger().post("删除成功!");
					} else {
						Messenger().post({
							message : result.message,
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
                            "ordering": false, //屏蔽排序
                            "searching": false,//屏蔽datatales的查询框
                            "processing": true, // 打开数据加载时的等待效果
                            "serverSide": true, // 打开后台分页
                            "autoWidth": false,
                            "ajax":{
                                "url":configMap.path + "/appiconmanager/findAll",
                                "dataSrc":"aaData",
                                "data":function(data){
									var searchText=$('#searchFilter3',jqueryMap.$container).val();
									var more =configMap.more;
									var begin=$('#startimeInput',jqueryMap.$container).val();
									var end =$('#endtimeInput',jqueryMap.$container).val();
									var applx=$('#applx_id',jqueryMap.$container).val();
									data.searchText=searchText;
									data.more=more;
									data.begin=begin;
									data.end=end;
									data.applx=applx;
								}
							},
							"columns" : [
									{	'className':'text-center',
									    "render": function (data, type, row) {
									        return configMap.checkbox_html;
									    }
									},
									{
										"data" : "iconType"
									},
								/*	{
										"data" : "pictureLink"
									},*/
									{
										"data" : "pictureName"
									},
									{
										"data" : "pictureContent"
									},
									{
										"data" : "iconStat",
										className:"text-center"
									},
                                {
                                    "data" : "applx",
                                    className:"text-center",
                                    "render":function(data,type,row){
                                    	var str = "";
                                    	if(data=='0'){
                                    		str = "客户APP";
										}else{
                                    		str = "会计APP";
										}
                                    	return str;

                                    }
                                },
									{"data": "importTime",
                                        className:'text-center',
										"render":function(data,type,row){
											return moment(data).format('YYYY-MM-DD');
										}
									},
									{	className:'text-center',
										"data" : "fileName",
										"render" : function(data, type, row) {
											return configMap.viewBtn_html + configMap.editcgsBtn_html
													+ configMap.deleteBtn_html;
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

								if (tootipContainer.length > 0) {
									tootipContainer.tooltip();
								}

								if (editcgsContainer.length > 0) {
									editcgsContainer.off('click').on('click',
											editcgsappiconmanager);
								}

								if (delContainer.length > 0) {
									delContainer.confirmation({
										"title" : '确定要删除？',
										"btnOkLabel" : '是',
										"btnCancelLabel" : '否',
										"placement" : 'left',
										"onConfirm" : delappiconmanager,
                                        "btnOkClass":'btn btn-danger borderRadius4',
                                        "btnCancelClass":"btn btn-default borderRadius4"
									});
								}

								if (viewContainer.length > 0) {
									viewContainer.off('click').on('click',
											viewappiconmanager);
								}
							}
						});
	};

	return {
		init : function() {
			configMap.more="0";
            $('#moreSearchByWsAndMdw003').on('click',function () {
                $('.contentBgColor img[alt="arrow"]').toggleClass('rotate1');
                $('#appicon-manager-content .moreCondition').toggle(200);
            });
			
			var tabid=$('#appicon-manager-content').parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);
			
			$('#inserAppIcon').off('click').on('click', function() {
				addappiconmanager();
			});
			setJqueryMap();
			jqueryMap.$container.find('#allCheckIco').off('click').on('click', function () {
		          if (this.checked) {
		              jqueryMap.$container.find($('[data-type="check"]')).prop("checked", true);
		          } else {
		              jqueryMap.$container.find($('[data-type="check"]')).prop("checked", false);
		          }
	        });
			initappiconmanagerGrid();/*
			initappiconmanagerData();*/
			$("#deleteAppicon").on("click", function(e) {
		    	  deleteBatchAppicon();
			});
			$('#searchFilter', jqueryMap.$container).on('click', function () {
		        configMap.appiconmanagerGrid.ajax.reload();
		    });
			$('#startimeAppicon').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
            $('#endtimeAppicon').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
          //自定义搜索   
          /*  $.fn.dataTable.ext.search.pop();//清空
            $.fn.dataTable.ext.search.push(
        	      function( settings, data, dataIndex ) {
        	    	  var start = $('#startimeInput').val().format('YYYY-MM-DD');//开始时间
        	    	  var end = $('#endtimeInput').val().format('YYYY-MM-DD');//结束时间
        	    	  var age = data[6]; // 要匹配的日期列，下标0开始
        	          if(start==""||end==""){
        	        	 return true; //显示
        	          }else if(start<=age&&end>=age){
        	        	  return true; 
        	          }
        	          return false;//不显示
        	      }
        	    );*/
            //日期改变刷新表单
        	/*$('#startimeAppicon,#endtimeAppicon').change( function() {
        		configMap.appiconmanagerGrid.draw();
            } );*/
		},
		setPath : function(path) {
			configMap.path = path;
		},
		/*reload : function(){
			initappiconmanagerData();
		}*/
	};
}();
// @ sourceURL=appiconmanager.js
