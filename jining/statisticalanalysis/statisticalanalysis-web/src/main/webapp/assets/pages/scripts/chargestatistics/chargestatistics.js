/**
 * @author huxinquan
 */
var chargestatistics = function () {
	'use strict';
// 全局属性参数
	var configMap = {
        datas:'',
        auditStatic:'',
		path: '',
		dataUrl: '/chargeaudit/chargeaudit',
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		statusUrl: '/contractaudit/status',
		chargeauditGrid: null,
		more:'',
//		viewPageUrl: '/chargeaudit/view.jsp',		
		viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看合同信息"><i class="fa fa-search"></i></a>',
		historyBtn_html: '<button class="ta btn btn-xs btnBlue btnOrange btnBorderColor colorfff borderRadius4" type="button" name="history">历史</button>',
		receiptBtn_html: '<a class="ta btn btn-xs btnBlue btnOrange btnBorderColor colorfff borderRadius4" type="button" name="receiptsst" href="" target="_blank">收据</a>',
		detailsBtn_html: '<button class="ta btn btn-xs btnBlue btnOrange btnBorderColor colorfff borderRadius4" type="button" name="cdetail">详情</button>',
		statusredis:null,
		viewchargePageUrl:'/chargestatistics/viewCharge.jsp',
		delChargeUrl: '/customermanage/charge/charge',
		receiptUrl: '/chargestatistics/receipt.jsp',
		chargeDetailsPageUrl: '/chargestatistics/chargeDetails.jsp'
	};
	var htbmjson = [];

	// 全局Dom
	var jqueryMap = {
		$blockTarget: null,
		$chargeauditDialog: null,
		$chargeauditTable:null,
		$chargeauditstarDate:null,
		$chargeauditendDate:null,
		$content:null
	};

	var setJqueryMap = function (uuid) {
		jqueryMap.$blockTarget = $('body');
		jqueryMap.$content = $('#chargestatistics_id_div'+'_'+uuid);
		jqueryMap.$manualdata=jqueryMap.$content.find('table#chargestatistics_data');
		jqueryMap.$chargeauditstarDate=jqueryMap.$content.find('div#starDate_div');
		jqueryMap.$chargeauditendDate=jqueryMap.$content.find('div#endDate_Div');
	};
	//查看历史
	var viewcharge = function (){
		stopContinueClick(this,300);
		var el = $(this);
		var rowIndex = configMap.chargeauditGrid.cell(el.parent()).index().row;
		var id = configMap.chargeauditGrid.row(rowIndex).data().khbm;
		var name = configMap.chargeauditGrid.row(rowIndex).data().khmc;
		openModal('代理记账服务收费历史记录_'+name, configMap.path + configMap.viewchargePageUrl + "?id=" + encodeURI(id), 'view');
	};
	//加法运算
    var FloatAdd = function (arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    };
    //减法运算
    var FloatSub = function (arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m - arg2 * m) / m;
    }
	var initchargeauditGrid = function () {
		configMap.chargeauditGrid = jqueryMap.$manualdata.DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax":{
                url:configMap.path+'/chargeaudit/chargeByStatisticsList',
                "dataSrc":"aaData",
                "data":function(data){
                    var searchtxt=$('#khbm').val();
                    var more=configMap.more;
                    /*console.info(more);*/
                    var auditStatic=configMap.auditStatic;
                    if(more==1){
                        var begin =$('#starDate',jqueryMap.$orderManangement).val();
                        var end =$('#endDate',jqueryMap.$orderManangement).val();
					}else{
                        var begin ='';
                        var end ='';
					}
                    data.searchtxt=searchtxt;
                    data.more=more;
                    data.auditStatic=auditStatic;
                    data.begin=begin;
                    data.end=end;
                },

            },
			"columns": [
			   {
			   		"data": "sfxm_mc",
			   },
			   {
				   "data": "khmc",
				   "render":function (data,type,row) {
                       return '<lable class="ddbm" name="'+row.id+'">'+data+'<lable>'
                   }
			   },
			   {
					"data":"sfzt",
				   "render":function (data, type, row) {
					   if(data=="000"){
					  	 	return '未收费'
					   }else if(data=='001'){
					   		return '已收费'
					   }else if(data=='002'){
					   		return '欠费'
					   }else if(data=='003'){
					   		return '催费'
					   }
                   }
				},
			   {
				   "data": "shzt_dm",
					"render":function (data, type, row) {
						if(data=='000'){
							return '未审核'
						}else if(data=='001'){
							return '同意'
						}else if(data=='002'){
							return '不同意'
						}else{
							return '审核中'
						}
					}
			    },
			    {
					"data": "yssj",
					"render": function (data, type, row){
                        return moment(data).format('YYYY-MM-DD');
					}
				},
				{
					"data": "sffs_mc",
					"render": function (data, type, row){
						if(data=='001'){
							return '按年'
						}else if(data='002'){
							return '按半年'
						}else if(data='003'){
							return '按季'
						}else if(data=='004'){
							return '按月'
						}else if(data=='005'){
							return '其他'
						}
					}
				},
				{
					"data": 'sfms_dm',
					"render": function (data, type, row){
						if(data=='001'){
							return '后付'
						}else{
							return '先付'
						}
					}
				},
				{'data':'ysk',
					'render':function (data,type,row) {
						return data.toFixed(2);
                    }
				},
				{
					"data": "sjsk",
					'render':function (data,type,row) {
						return data.toFixed(2);
                    }
				},
				{
					"render": function (data, type, row) {
		                if (row.sfzt === "001") {
							return '<a class="btn" href="statisticalanalysis/chargestatistics/receipt.jsp?ddbm='+row.ddbh+'" target="_blank">收据</a>'
		                } else if (row.sfzt!='001') {
							return '<a class="btn" id="row.id" disabled>收据</a>'
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
			"drawCallback": function (result) { // 数据加载完成后执行
               /* console.info(result.aoData);*/
                configMap.datas=result.aoData;
                // for(var i = 0;i<configMap.datas.length;i++){
                //
                 //    for(var y = 0;y<$(".ddbm").length;y++){
                 //        var nTr = $(".ddbm").eq(y).parents('tr')[0];
                 //        var sOut =  "<tr width='100%'  role='row' class='odd'><td width='10%'></td>" +
                 //            "<td width='10%'>合同编码："+configMap.datas[i]._aData.htbm+"" +
                 //            "</td><td width='50%'>服务期限："+moment(configMap.datas[i]._aData.ht_fwq).format('YYYY-MM-DD')+"至"+moment(configMap.datas[i]._aData.ht_fwz).format('YYYY-MM-DD')+"</td></tr>" ;
				// 	}
                 //    $(nTr).after(sOut);
				// }
				var ddbmlist = $('.ddbm',jqueryMap.$content);
				var tableid;
				$(ddbmlist).each(function (){
					tableid = configMap.chargeauditGrid.row(configMap.chargeauditGrid.cell($(this).parent()).index().row).data().id;
					for(var i = 0;i<configMap.datas.length;i++){
						if(configMap.datas[i]._aData.id==tableid){
                                   var sOut =  "<tr width='100%'  role='row' class='odd'>" +
                                       "<td width='10%' colspan='5'>合同编码："+configMap.datas[i]._aData.htbm+"" +
                                       "</td><td width='50%' colspan='5'>服务期限："+moment(configMap.datas[i]._aData.ht_fwq).format('YYYY-MM-DD')+"至"+moment(configMap.datas[i]._aData.ht_fwz).format('YYYY-MM-DD')+"</td></tr>" ;
                            $(this).parent().parent().after(sOut);
						}
					}
				});

				var viewchargeContainer = $('[name="history"]',jqueryMap.$content);
				var receiptContainer = $('[name="receiptsst"]',jqueryMap.$content);
				var detailsContainer = $('[name="cdetail"]',jqueryMap.$content);
				if (viewchargeContainer.length > 0) {
		        	viewchargeContainer.off('click').on('click',viewcharge);
		        }
				if (receiptContainer.length > 0) {
					receiptContainer.off('click').on('click', function (){
						stopContinueClick(this,300);
						var rowIndex = configMap.chargeauditGrid.cell($(this).parent()).index().row;
						var sjbm = configMap.chargeauditGrid.row(rowIndex).data().sjbm;
                        var htbm = configMap.chargeauditGrid.row(rowIndex).data().htbm;
                        $(this).attr("href", configMap.path + configMap.receiptUrl + "?sjbm=" + encodeURI(sjbm) + "&htbm=" + encodeURI(htbm));
					});
				}
				if (detailsContainer.length > 0) {
					detailsContainer.off('click').on('click',viewDetails)
				}
			}
		});
	};
	var viewDetails = function (){
		stopContinueClick(this,300);
		var el = $(this);
		var rowIndex = configMap.chargeauditGrid.cell(el.parent()).index().row;
		var sjbm = configMap.chargeauditGrid.row(rowIndex).data().sjbm;
        var htbm = configMap.chargeauditGrid.row(rowIndex).data().htbm;
		var dialogButtons = {
			cancel: {
				label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
				className: 'btn btn borderRadius4 color666'
			}
		};
		$.get(configMap.path + configMap.chargeDetailsPageUrl + "?sjbm=" + encodeURI(sjbm) + "&htbm=" + encodeURI(htbm), function (html) {
			jqueryMap.$chargeauditDialog = bootbox.dialog({
				title: "查看收费信息",
				message: html,
				buttons: dialogButtons,
				className:'behaviorlog-dialog-m'
			});
		});
	};
	var initchargeauditData = function () {
		var status = $("#txtorgName",jqueryMap.$content).val();
		if(status==null){
			status="";
		}
		var khxx = $("#khbm",jqueryMap.$content).val();
		var starDate=$("#starDate",jqueryMap.$content).val();
		var endDate=$("#endDate",jqueryMap.$content).val();
		var data = {
				'status': status,
				'khxx': khxx,
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
				configMap.chargeauditGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.chargeauditGrid.rows.add(datas).draw();
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
		$.get(url, function (html) {
			jqueryMap.$chargeauditDialog = bootbox.dialog({
				title: title,
				message: html,
				buttons: dialogButtons
			});
		});
	};
	//查看历史收费
	var viewchargeaudit = function () {
		var el = $(this);
		var rowIndex = configMap.chargeauditGrid.cell(el.parent()).index().row;
		var id = configMap.chargeauditGrid.row(rowIndex).data().id;
		openModal("查看合同信息", configMap.path + configMap.viewchargePageUrl + "?id=" + encodeURI(id), 'view');
	};

	var dateT=function(){
		jqueryMap.$chargeauditstarDate.find('button.btn-default').off('click').on('click', function() {
		      return jqueryMap.$chargeauditstarDate.find('input#starDate').datepicker('show');
		    });
		jqueryMap.$chargeauditendDate.find('button.btn-default').off('click').on('click', function() {
		      return jqueryMap.$chargeauditendDate.find('input#endDate').datepicker('show');
		    });
	};
	var getStatus = function () {
		$.ajax({
			url:configMap.path + configMap.statusUrl,
			dataType: 'JSON',
			type: 'GET',
			success: function (datas) {
				/*console.info(datas.typecode);*/
				if (datas.length > 0) {
					var status = '<option value="020">全部</option>';
					for(var i=0;i<datas.length;i++){
						status += '<option value="'+datas[i].typecode+'">'+datas[i].paramsname+'</option>'
					}
					jqueryMap.$content.find('#txtorgName').html(status);
				}
			}
		});
	};

    $("#chargestatistics_head  .clickMore").on("click",function () {
    	if($(this).attr("data")==0){
            // $(".search-body").children("span").show();
            $(this).next().removeClass("rotate1")
            $(this).attr("data",1)

		}else{
            // $(".search-body").children("span").hide();
            $(this).next().addClass("rotate1")
            $(this).attr("data",0);
		}
        $("#chargestatistics_head  .openMore").toggle(500);
    })

	return {
		init: function (uuid) {
            $(".openMore").hide();
			setJqueryMap(uuid);
			var tabid=$('#chargestatistics_id_div_' + uuid).parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);
			//获取审核状态
			getStatus();
			initchargeauditGrid();
			dateT();

			$('#moreimpossable',jqueryMap.$content).on('click',function(){
				if($(this).attr('data')==0){
					configMap.more='';
					/*console.info(configMap.more);*/
				}else{
                    configMap.more=1;
                    /*console.info(configMap.more);*/
				}

			});
			$('#txtorgName').off().on('change',function () {
				configMap.auditStatic=$('#txtorgName').val();
            })
			$('#seearchChargeByAgencyBtn').off('click').on('click',function () {
                configMap.chargeauditGrid.ajax.reload();
            })
			jqueryMap.$chargeauditstarDate.find('input#starDate').datepicker({
				clearBtn: true,
				format: 'yyyy-mm-dd',
				autoclose: true,
				language: 'zh-CN'
			});
			jqueryMap.$chargeauditendDate.find('input#endDate').datepicker({
				clearBtn: true,
				format: 'yyyy-mm-dd',
				autoclose: true,
				language: 'zh-CN'
			});
			jqueryMap.$content.find('#Search-btn').off('click').on('click', function () {
				initchargeauditData();
			});
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=chargestatistics.js
	
