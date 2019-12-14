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

/*global $, App, moment, jQuery, bootbox, _ */
var chargeView = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/customermanage/charge/charge',
        updateUrl: '/customermanage/charge/chargeupdate',
        receiptUrl: '/chargestatistics/receipt.jsp',
        viewPageUrl:'/chargestatistics/chargeDetails.jsp',
        id: '',
        chargeGrid:null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        cancelBtn_html: '<button class="ta btn btn-sm btnBlue btnBorderColor colorfff borderRadius4" type="button" name="cancel">取消收费</button>',
        receiptBtn_html: '<a class="ta btn btn-sm btnBlue btnBorderColor colorfff borderRadius4" type="button" name="receiptsse" href="" target="_blank">收据</a>',
        detailsBtn_html: '<button class="ta btn btn-sm btnBlue btnBorderColor colorfff borderRadius4" type="button" name="details">详情</button>'
    };
    // 全局Dom
    var jqueryMap = {
    		$blockTarget: null,
			$chargeForm: null,
			$chargeDialog: null
    };

    var setJqueryMap = function () {
    	jqueryMap.$blockTarget = $('body');
        jqueryMap.$chargeForm = $('#chargeForm');
    };
    //删除
    var delCharge = function (event, element) {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在取消收费数据，请稍候...'
		});
		var rowIndex = configMap.chargeGrid.cell(element.parent()).index().row;
		var id = configMap.chargeGrid.row(rowIndex).data().id;
		$.ajax({
			url: configMap.dataUrl + "/" + id,
			type: 'DELETE',
			success: function (result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result.success) {
					initchargeData();
					Messenger().post("操作成功!");
				}
				else {
					Messenger().post({
						message: result.message,
						type: 'error'
					});
				}
			},
			error: function (event, element) {
				App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};
    //初始化表格
    var initchargeGrid = function () {
		configMap.chargeGrid = $('#charge_data').DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			"ordering": false,
			"destroy": true,
			"lengthMenu": [10, 20, 50, 100],
			"autoWidth": false,
			"columns": [
				{
					"data": "sfsj",
					"render": function (data, type, row) {
						if (data!=null) {
							return moment(data).format('YYYY-MM-DD'); 
						} else {
							return "";
						}
				    	   
				    }
				},
				{
					"data": "sfnf",
					"render": function (data, type, row) {
						var sd = '';
						for(var i = 0;i<data.split(";").length;i++){
							sd += data.split(";")[i] + "年" + row.sfyf.split(";")[i] + "月；"
						}
						return '<label title="'+sd+'">'+sd+'</label>';
					}
			    },
				{
			    	className: 'text-right',
					"data": "sjsk",
					"render": function (data, type, row){
						return data.toFixed(2);
					}
				},
				{
					className: 'text-right',
					"data": "ysk",
					"render": function (data, type, row){
						return data.toFixed(2);
					}
				},
				{className: 'text-center', "data": "lrrmc"},
				{
					"data": "shzt_dm",
					"render": function (data, type, row) {
						var status = '';
						if(data==="000"){
							status = "未审核";
						} else if (data==="001"){
							status = "审核通过";
						} else if (data==="002"){
							status = "审核失败";
						}
						return status;
					}
				},
				{
					className: 'text-center',
					"render": function (data, type, row) {
						var Btn_html = '';
						if(row.shzt_dm=="000"){
							Btn_html = configMap.cancelBtn_html;
						}
		                return ''
//		                  + Btn_html
		                  + configMap.receiptBtn_html
		                  + configMap.detailsBtn_html;
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
				var cancelContainer = $('[name="cancel"]', jqueryMap.$container);
				var receiptContainer = $('[name="receiptsse"]', jqueryMap.$container);
				var detailsContainer = $('[name="details"]', jqueryMap.$container);
				if (receiptContainer.length > 0) {
					receiptContainer.off('click').on('click', function (){
						var rowIndex = configMap.chargeGrid.cell($(this).parent()).index().row;
						var sjbm = configMap.chargeGrid.row(rowIndex).data().sjbm;
                        var htbm = configMap.chargeGrid.row(rowIndex).data().htbm;
						$(this).attr("href",configMap.path + configMap.receiptUrl +"?sjbm=" + encodeURI(sjbm) + "&htbm=" + encodeURI(htbm));
					});
				}
				if (cancelContainer.length > 0) {
					cancelContainer.confirmation({
						"title": '确定要取消收费？',
						"btnOkLabel": '是',
						"btnCancelLabel": '否',
						"placement": 'left',
						"onConfirm": delCharge
					});
				}
				if (detailsContainer.length > 0) {
					detailsContainer.off('click').on('click', ChargeDetails);
				}
			}
		});
	};
	//收费详情
	var ChargeDetails = function (){
		stopContinueClick(this,300);
		var el = $(this);
		var rowIndex = configMap.chargeGrid.cell(el.parent()).index().row;
		var sjbm = configMap.chargeGrid.row(rowIndex).data().sjbm;
        var htbm = configMap.chargeGrid.row(rowIndex).data().htbm;
//		openModal("查看收费信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
		var dialogButtons = {
				cancel: {
					label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
					className: 'btn btn borderRadius4 color666'
				}
			};
//			if (type === 'select') {
//				dialogButtons.success = {
//					label: "确定",
//					className: "btn-success",
//					callback: function () {
//						jqueryMap.$logDialog.modal('hide');
//						return false;
//					}
//				};
//			}
			$.get(configMap.path + configMap.viewPageUrl + "?sjbm=" + encodeURI(sjbm) + "&htbm=" + encodeURI(htbm), function (html) {
				jqueryMap.$chargeDialog = bootbox.dialog({
					title: "查看收费信息",
					message: html,
					buttons: dialogButtons,
					className:'behaviorlog-dialog-m'
				});
			});
	};
	//初始化表格
	var initchargeData = function () {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在加载数据，请稍候...'
		});
		$.ajax({
			url:configMap.dataUrl + "/" +configMap.id,
			dataType: 'JSON',
			type: 'GET',
			success: function (datas) {
				configMap.chargeGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.chargeGrid.rows.add(datas).draw();
				}
			},
			error: function () {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};	
    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            //初始化页面中的表格
            initchargeGrid();
            //获取已有的合同列表
            if (configMap.id) {
            	initchargeData();
            }
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=edit.js