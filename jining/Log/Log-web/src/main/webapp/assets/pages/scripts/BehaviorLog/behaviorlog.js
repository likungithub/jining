/**
 * 
 */
var behaviorlog = function () {
	'use strict';
// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/BehaviorLog/log',
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		logGrid: null,
		viewPageUrl: '/BehaviorLog/view.jsp',		
		viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看日志信息"><i class="icon iconfont icon-xiangqing1  iconFontColor-10a0f7 iconFontSize"></i></a>'
	};

	// 全局Dom
	var jqueryMap = {
		$blockTarget: null,
		$logDialog: null,
		$logTable:null,
		$logstarDate:null,
		$logendDate:null,
		$content:null
	};
	
	var setJqueryMap = function (uuid) {
		jqueryMap.$blockTarget = $('body');
		jqueryMap.$content = $('#log_id_div'+'_'+uuid);
		jqueryMap.$manualdata=jqueryMap.$content.find('table#log_data');
		jqueryMap.$logstarDate=jqueryMap.$content.find('div#starDate_div');
		jqueryMap.$logendDate=jqueryMap.$content.find('div#endDate_Div');
	};
	//分页查询数据
	var initLogGridByPage = function (){
		configMap.logGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                	var starDate=$('[name="starDate"]',jqueryMap.$content).val();
            		var endDate=$('[name="endDate"]',jqueryMap.$content).val();
                    data.starDate = starDate;
                    data.endDate = endDate;
                }
            },
            "columns": [	
 			    {	className:'text-center',
				   "data": "time",
			       "render": function (data, type, row) {
			    	   return moment(data).format('YYYY-MM-DD HH:mm:ss'); 
			       }
			    },
				{className:'text-center',
			    	"data": "ip"
			    },
				{"data": "staffmember"},
			    {"data": "device",
					className:'text-left'
				},
				{	className:'text-center',
					"render": function (data, type, row) {
						return configMap.viewBtn_html;
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
				var viewContainer = jqueryMap.$content.find('[data-type="view"]');// $('[data-type="view"]');
				if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewLog);
				}
			}
 		});
	}
	var initLogGrid = function () {
		configMap.logGrid = jqueryMap.$manualdata.DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			"ordering": false,
			"destroy": true,
			"lengthMenu": [10, 20, 50, 100],
			"autoWidth": false,
			"columns": [	
			   {
				   "data": "time",
			       "render": function (data, type, row) {
			    	   return moment(data).format('YYYY-MM-DD HH:mm:ss'); 
			       }
			    },
				{
			    	"data": "ip"
			    },
				{"data": "staffmember"},
			    {"data": "device"},
				{
					"render": function (data, type, row) {
						return configMap.viewBtn_html;
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
				var viewContainer = jqueryMap.$content.find('[data-type="view"]');// $('[data-type="view"]');
				if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewLog);
				}
			}
		});
	};	

	var initLogData = function () {
//		var menuID=null;
//		if($("#hidemenuID").val()!='' && $("#hidemenuID").val()!=null){ 
//			menuID=$("#hidemenuID").val();
//		}
//		var userID=null;
//		if($("#hideuserID").val()!='' && $("#hideuserID").val()!=null){ 
//			userID=$("#hideuserID").val();
//		}		
		var starDate=$('[name="starDate"]',jqueryMap.$content).val();
		var endDate=$('[name="endDate"]',jqueryMap.$content).val();
		var data = {
//				'menuID': menuID,
//				'userID': userID,
				'starDate': starDate,
				'endDate': endDate	
			};
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在加载数据，请稍候...'
		});
		$.ajax({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			url:configMap.path + configMap.dataUrl,
			dataType: 'JSON',
			type: 'POST',
			data: JSON.stringify(data),
			success: function (datas) {
				configMap.logGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.logGrid.rows.add(datas).draw();
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
				label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
				className: 'btn btn-default borderRadius4'
			}
		};
		if (type === 'select') {
			dialogButtons.success = {
				label: "确定",
				className: "btn-success",
				callback: function () {
					jqueryMap.$logDialog.modal('hide');
					return false;
				}
			};
		}
		$.get(url, function (html) {
			jqueryMap.$logDialog = bootbox.dialog({
				title: title,
				message: html,
				buttons: dialogButtons,
				className:'behaviorlog-dialog-m'
			});
		});
	};
	
	var viewLog = function () {
		var el = $(this);
		var rowIndex = configMap.logGrid.cell(el.parent()).index().row;
		var id = configMap.logGrid.row(rowIndex).data().id;
		openModal("查看日志信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
	};
//	var dateT=function(){
//		jqueryMap.$logstarDate.find('button.btn-default').off('click').on('click', function() {
//		      return jqueryMap.$logstarDate.find('input#starDate').datepicker('show');
//		    });
//		jqueryMap.$logendDate.find('button.btn-default').off('click').on('click', function() {
//		      return jqueryMap.$logendDate.find('input#endDate').datepicker('show');
//		    });
//	};
	
	return {
		init: function (uuid) {
			setJqueryMap(uuid);			
			var tabid=$('#log_id_div_'+uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid,behaviorlog);
			jqueryMap.$content.find('.beginTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN'
            });
            jqueryMap.$content.find('[name=starDate]').val(moment().format("YYYY-MM-DD"));

            jqueryMap.$content.find('.endTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN'
            });
            jqueryMap.$content.find('[name=endDate]').val(moment().format("YYYY-MM-DD"));
//			initLogGrid();
//			initLogData();	
            initLogGridByPage();
			jqueryMap.$content.find('#Search-btn').off('click').on('click', function () {
//				initLogData();
				configMap.logGrid.ajax.reload();
			});
		},
		setPath: function (path) {
			configMap.path = path;
		}
//		closeOrg:function(id,name)
//		{			
//			$("#hideuserID",jqueryMap.$content).val(id);
//			$("#txtorgName",jqueryMap.$content).val(name);			
//			jqueryMap.$logDialog.modal('hide');
//		},
//		closeMenu:function(id,name)
//		{
//			$("#hidemenuID",jqueryMap.$content).val(id);
//			$("#txtmenuName",jqueryMap.$content).val(name);
//			jqueryMap.$logDialog.modal('hide');
//		}
	};
}();
//@ sourceURL=loginlog.js
	
	