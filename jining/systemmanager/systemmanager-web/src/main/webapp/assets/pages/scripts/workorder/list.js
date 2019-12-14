/**
 * 
 */
var workorderlist = function () {
	'use strict';
// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/workordermanager/workorder',
		adpotUrl: '/contractaudit/contractauditadpot',
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		statusUrl: '/contractaudit/status',
		contractauditGrid: null,
		viewPageUrl: '/workorder/view.jsp',		
		viewBtn_html: '<button class="icon iconfont icon-xiangqing1  iconFontColor-10a0f7 iconFontSize workorderbtn" type="button" name="view" title="查看工单信息"></button>',
		deleteBtn_html: '<button class="icon iconfont icon-shanchu3  iconFontColor-10a0f7 iconFontSize workorderbtn" type="button" name="delete" title="删除工单"></button>',
		statusredis:null,
		dljgbm:'',
		fsbz:0
	};

	// 全局Dom
	var jqueryMap = {
		$blockTarget: null,
		$contractauditDialog: null,
		$contractauditTable:null,
		$content:null
	};
	
	var setJqueryMap = function (uuid) {
		jqueryMap.$blockTarget = $('body');
		jqueryMap.$content = $('#workorder-manager-container_'+uuid);
		jqueryMap.$manualdata=jqueryMap.$content.find('table#workorder_data');
	};
	
	var initContractauditGrid = function () {
		configMap.contractauditGrid = jqueryMap.$manualdata.DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			"ordering": false,
			"destroy": true,
			"lengthMenu": [10, 20, 50, 100],
			"autoWidth": false,
			"columns": [	
			   {	className:'text-center',
				   "data": "lrrq",
			       "render": function (data) {
			    	   return moment(data).format('YYYY-MM-DD'); 
			       }
			    },
			    {	className:'text-center',
					"data": "yxj",
					"render": function (data) {
						if(data === 0){
							return "重要";
						} else {
							return "一般";
						}
					}
				},
			    {	className:'text-left',
			    	"data": "wtms",
			    	"render": function (data) {
			    		if(data.length>30){
			    			return data.substring(0,50)+"...";
			    		} else {
			    			return data;
			    		}
			    	}
				},
				{	className:'text-center',
					"data": "clzt_dm",
					"render": function (data) {
						if(data === 0){
							return "待处理";
						} else {
							return "已处理";
						}
					}
				},
				{
					className:'text-center',
					"render": function (data, type, row) {
						var btnhtml = '';
						if(configMap.dljgbm === row.dljg_bm){
							if(row.clzt_dm === 1){
								btnhtml += configMap.viewBtn_html + configMap.deleteBtn_html;
							} else {
								btnhtml += configMap.viewBtn_html;
							}
						} else {
							btnhtml += configMap.viewBtn_html;
						}
						return btnhtml;
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
				var viewContainer = jqueryMap.$content.find('[name="view"]');// $('[data-type="view"]');
				var deleteContainer = jqueryMap.$content.find('[name="delete"]');
				if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewContractaudit);
				}
				if (deleteContainer.length > 0) {
					deleteContainer.confirmation({
						"title": '是否删除工单信息？',
						"btnOkLabel": '是',
						"btnCancelLabel": '否',
						"btnOkClass": 'btn btn-sm btn-danger mr borderRadius4',
						"btnCancelClass": 'btn btn-sm btn-default borderRadius4',
						"placement": 'bottom',
						"onConfirm": setflagTs
					});
				}
			}
		});
	};	

	var initContractauditData = function () {
		var status = $("#workorderstatus",jqueryMap.$content).val();
		if(status === null){
			status="";
		}
		var starDate=$('[name="starDate"]',jqueryMap.$content).val();
		var endDate=$('[name="endDate"]',jqueryMap.$content).val();
		var data = {
				'status': status,
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
				configMap.contractauditGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.contractauditGrid.rows.add(datas).draw();
				}
			},
			error: function () {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};	
	
	var openModal = function (title, url, type) {
		var dialogButtons = { };
		if(type === "update"){
			dialogButtons.success = {
	            label:'<i class="'+ 'icon iconfont icon-duihao1  iconMr'+ '"></i>处理',
	            className: "btn btn-success btnBlue borderRadius4 colorfff",
	            callback: function () {
	            	viewWorkOrder.saveworkorder(function (result) {
	                    if (result) {
	                        jqueryMap.$contractauditDialog.modal('hide');
	                        initContractauditData();
	                    }
	                });
	                return false;
	            }
	        };
		}
        dialogButtons.cancel = {
            label: '<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
            className: 'btn borderRadius4 btn-default'
        };
		
		$.get(url, function (html) {
			jqueryMap.$contractauditDialog = bootbox.dialog({
				title: title,
				message: html,
				buttons: dialogButtons
			});
		});
	};
	
	var viewContractaudit = function () {
		stopContinueClick(this,300);
		var el = $(this);
		var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
		var id = configMap.contractauditGrid.row(rowIndex).data().gdbm;
		var dljgbm = configMap.contractauditGrid.row(rowIndex).data().dljg_bm;
		var clzt = configMap.contractauditGrid.row(rowIndex).data().clzt_dm;
		if(dljgbm === configMap.dljgbm){
			openModal("查看工单", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
		} else {
			if(clzt === 1){
				openModal("查看工单", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
			} else {
				openModal("查看工单", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'update');
			}
		} 
	};
	
	//删除
	var setflagTs = function (event, element){
		var el;
		if(element === undefined){
			el = $(this);
		} else{
			el = element;
		}
		var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
		var id = configMap.contractauditGrid.row(rowIndex).data().gdbm;
		$.ajax({
			url:configMap.path + configMap.dataUrl + '/' + id,
			dataType: 'JSON',
			type: 'PUT',
			success: function (datas) {
				if(datas.success){
					initContractauditData();
					Messenger().post("操作成功!");
					//更新首页待审合同数量
                    upDateDSHNumber();
				}else{
					Messenger().post({
						message: datas.message,
						type: 'error'
					});
				}
				configMap.fsbz = 0;
			}
		});
	};
	return {
		init: function (uuid,dljgbm) {
			configMap.dljgbm = dljgbm;
			setJqueryMap(uuid);	
			var tabid=$('#workorder-manager-container_'+uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid,workorderlist);
			jqueryMap.$content.find('.beginTime').datepicker({
				clearBtn: true,
				format: 'yyyy-mm-dd',
				autoclose: true,
				language: 'zh-CN'
			});
			jqueryMap.$content.find('.endTime').datepicker({
				clearBtn: true,
				format: 'yyyy-mm-dd',
				autoclose: true,
				language: 'zh-CN'
			});
			initContractauditGrid();
			initContractauditData();
			jqueryMap.$content.find('.Search-btn').off('click').on('click',function(){
				initContractauditData();
			});
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=workorderlist.js
	
	