var messageremind=function(){
	'use strict';
	//全局属性参数
    var configMap = {
		selectTime:'',
    	type:'',
	    path: '',
	    cxzt:'',
	   	messageRemindGrid:null,
	   	datatablesLanguageFile : '/assets/global/plugins/datatables/chinese.json',
        viewBtn_html:'<a href="javascript:;" data-type="view" title="查看详情" data-toggle="tooltip"' +
			' class="btn btn-xs default"><i class="con iconfont icon-xiangqing1 iconFontColor-10a0f7' +
			' iconFontSize"></i></a>',
	   	deleteBtn_html : '<a href="javascript:;" data-type="del" data-toggle="tooltip" title="删除"' +
			' class="btn btn-xs default"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7' +
			' iconFontSize"></i></a>',
	   	checkbox_html: '<input type="checkbox" class="group-checkbox" data-type="check" data-toggle="tooltip"/>'
	};
    var jqueryMap = {
		$container:null,
		$blockTarget : null,
		$messageRemindForm : null,
		$message_tree:null
	};
	var setJqueryMap = function() {
    	jqueryMap.$container=$('#messageremindasdf');
		jqueryMap.$blockTarget = $('body');
		jqueryMap.$messageRemindForm=$('#searchByTime');
		jqueryMap.$message_tree=$('#message_remind_tree',jqueryMap.$container)
	};

	//初始化表格
	var initmessageRemindGridByPageAll = function(){
		configMap.messageRemindGrid=$('#messageRemind_data',jqueryMap.$container).DataTable({
			"dom" : 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			"ordering": false, 																						//屏蔽排序
			"searching": false,																						//屏蔽datatales的查询框
			"processing": true, 																						// 打开数据加载时的等待效果
			"serverSide": true, 																						// 打开后台分页
            "autoWidth": false,
			"ajax":{
				"url":configMap.path + "/messageremind/searchByAll", 
				"dataSrc":"aaData",
				"data":function(data){
					var beginTime=jqueryMap.$container.find('input[name=starDate]').val();
					var endTime=jqueryMap.$container.find('input[name=endDate]').val();
					var type=configMap.type;
					var ydbz=$('[name="readtype"]').val();
					var selectTime=configMap.selectTime;
					data.beginTime=beginTime;
					data.endTime=endTime;
					data.type=type;
					data.ydbz=ydbz;
					data.selectTime=selectTime;
				}
			},
			"columns" : [
  				{	
  					'className':'text-center',
  					"render": function (data, type, row) {
  						return configMap.checkbox_html;
  					}
  				},
  				{
  					"data" : "txbt",
  					'className':'text-left',
  					"render" : function(data, type, row) {
                    	if(row.ydzt_dm === 0){																			//如果是0标示未读，将字体加粗
  							return '<span class="fontweight_b">' + data + '</sapn>';
  						}else{																							//否则不加粗
  							return data;
  						}
  					}
  				},
  				{
  					"data" : "txnr",
  					'className':'text-left',
  					"render" : function(data, type, row) {
                    	if(row.ydzt_dm === 0){																			//如果是0标示未读，将字体加粗
							return '<span class="fontweight_b" data-toggle="tooltip" data-placement="top"' +
								' title="' + data + '">' + data + '</sapn>';
						}else{																							//否则不加粗
							return '<span data-toggle="tooltip" data-placement="top" title="' + data + '">'
								+ data + '</spam>';
						}
					}
  				},
				{
  				 	"data" : "fsry_mc",
                	 'className':'text-left',
                     "render" : function(data, type, row) {
                         if(row.ydzt_dm === 0){																			//如果是0标示未读，将字体加粗
                             return '<span class="fontweight_b">'+data+'</sapn>';
                         }else{																							//否则不加粗
                             return data;
                         }
                     }
				},
				{
  				 	"data" : "fssj",
				 	'className':'text-center',
				 	"render" : function(data, type, row) {
                        if(row.ydzt_dm === 0){																				//如果是0标示未读，将字体加粗
                            if (data !== null) {
                                return '<span class="fontweight_b">'+moment(data).format('YYYY-MM-DD')+'</sapn>';
                            } else {
                                return "";
                            }

                        }else{																							//否则不加粗
                            if (data !== null) {
                                return moment(data).format('YYYY-MM-DD');
                            } else {
                                return "";
                            }
                        }
				 	}
				},
				{
				 	"data" : "ydzt_dm",
				 	'className':'text-center',
				 	"render" : function(data, type, row) {
                        if(row.ydzt_dm === 0){																			//如果是0标示未读，将字体加粗
                            if(data === 0){
                                return '<span class="fontweight_b">'+'未读'+'</sapn>';
                            }else{
                                return '<span class="fontweight_b">'+'已读'+'</sapn>';
                            }
                        }else{																							//否则不加粗
                            if(data === 0){
                                return '未读';
                            }else{
                                return '已读';
                            }
                        }
				 	}
				},
				{
					"data" : "ydzt_dm",
					'className':'text-center',
					"render" : function(data, type, row) {
						if((row.glbm === "" || row.glbm === null) && row.txlx_dm !== '003'){							//如果消息是在改造之前添加的，则不展示详情
							return configMap.deleteBtn_html;
						}else{
							if(row.txlx_dm !== "001" && row.txlx_dm !== "007" && row.txlx_dm !== "010"){
								return configMap.viewBtn_html+configMap.deleteBtn_html;
							}else if(row.txlx_dm === '007'){
//								if(row.glbm_cy === 1 || row.glbm_cy === null){
                                    return '<a href="/paymanager/ordermanagementbypt/orderReceipt.jsp?ddbh='
										+ row.glbm + '" title="收据" target="_blank"><i class="icon iconfont' +
										' icon-shouju"></i></a>' + configMap.deleteBtn_html;
//								}else if(row.glbm_cy === 0){
//                                    
//								}
							} else if(row.txlx_dm === '010'){
								return '<a href="/customermanage/charge/receipt.jsp?ddbh=' + row.glbm
									+ '" title="收据" target="_blank"><i class="icon iconfont icon-shouju"></i></a>'+configMap.deleteBtn_html;
							} else {
								return configMap.deleteBtn_html;
							}
						}
					}
				}
  			],
  			"language" : {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
  			},
  			"drawCallback" : function() { // 数据加载完成后执行
                $('[data-toggle="tooltip"]').tooltip();
            	var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
  				var delContainer = $('[data-type="del"]', jqueryMap.$container);
  				var viewContainer=$('[data-type="view"]',jqueryMap.$container);
  				if (tootipContainer.length > 0) {
                	tootipContainer.tooltip();
            	}
  				if (delContainer.length > 0) {
  					delContainer.confirmation({
  						"title" : '确定要删除？',
  						"btnOkLabel" : '是',
  						"btnCancelLabel" : '否',
  						"placement" : 'left',
  						"onConfirm" : delContract,
                        'btnOkClass':'btn btn-danger borderRadius4',
                        'btnCancelClass':'btn btn-default borderRadius4'
  					});
  				}
  				if(viewContainer.length>0){
  					viewContainer.off('click').on('click',viewMessage);
  				}
  			}
		})
	};

    /**
	 * 删除信息（单个）
     * @param event
     * @param element
     */
	var delContract = function(event, element) {
		App.blockUI({
			target : jqueryMap.$blockTarget,
			boxed : true,
			message : '正在删除数据，请稍候...'
		});
		var rowIndex = configMap.messageRemindGrid.cell(element.parent()).index().row;	
		var id = configMap.messageRemindGrid.row(rowIndex).data().id;
		$.ajax({
			url : configMap.path + "/messageremind/deleteById/" + id,
			type : 'DELETE',
			success : function() {
				updateNumber();
				App.unblockUI(jqueryMap.$blockTarget);
				configMap.messageRemindGrid.ajax.reload(null,false);
			},
			error : function() {
				App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};

    /**
	 * 批量删除
     */
	var batchDeleteMess = function () {
		var id = '';
		jqueryMap.$container.find(':checked[data-toggle="tooltip"]').each(function () {
            var el = $(this);
            var rowIndex = configMap.messageRemindGrid.cell(el.parent()).index().row;
            var ids = configMap.messageRemindGrid.row(rowIndex).data().id;
            id += ids + ',';
		});
		if(id === ''){
			Messenger().post({message: '请选择要删除的信息！', type: 'error'});
		}else{
			$.ajax({
				url : configMap.path + "/messageremind/deleteById/"+id,
				type : 'DELETE',
				success : function() {
					App.unblockUI(jqueryMap.$blockTarget);
					updateNumber();
					configMap.messageRemindGrid.ajax.reload(null,false);
				},
				error : function() {
					App.unblockUI(jqueryMap.$blockTarget);
				}
			});
			$('#allCheckMess').attr("checked", false);
		}
	};

    /**
	 * 模态框
     * @param title
     * @param url
     * @param type
     * @param rowIndex
     */
	var openModal = function (title, url, type, rowIndex) {
		var dialogButtons = {};
        if (type === 'contractaudit') {
        	dialogButtons.success = {
    			label: '<i class="fa fa-save"></i> 保&nbsp;存',
    			className: "btn btn-default btnBlue borderRadius4 colorfff",
            	callback: function () {
                    audit.saveUserInfo(function (result) {
                        if (result) {
                            // configMap.contractauditGrid.ajax.reload();
                            jqueryMap.$usersDialog.modal('hide');
                            // jqueryMap.$content.find('[name="selectAll"]').prop("checked",false);
                        }
                    });
                    return false;
            	}
        	};
        } else if(type==='chargeaudit'){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    singleChargeForAudit.save(function (result) {
                        if (result) {
                            jqueryMap.$usersDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };
		}
        dialogButtons.cancel = {
    		label: '<i class="fa fa-times"></i> 关&nbsp;闭',
    		className: 'btn btn-default borderRadius4',
    		callback: function (){
    			$("#messageRemind_data",jqueryMap.$container).find('tr:eq('+(rowIndex+1)+')')
					.find("span").removeClass("fontweight_b");
    			$("#messageRemind_data",jqueryMap.$container).find('tr:eq('+(rowIndex+1)+')')
					.find("td:eq(5)").html("已读");
    		}
        };
        $.get(url, function (html) {
        	jqueryMap.$usersDialog = bootbox.dialog({
        		className: 'evaluate-dialog-com',
        		title: title,
        		message: html,
        		buttons: dialogButtons
        	});
        });
	};

    /**
	 * 打开新的标签页面
     * @param _target
     * @param srcStr
     * @param menuName
     * @param id
     * @param icon
     */
    var generateTab = function(_target, srcStr, menuName, id, icon) {
        var el = $(this);
        var rowIndex = configMap.messageRemindGrid.cell(el.closest('td')).index();
        $("#tab-page-nav-" + id).remove();																			//标签移除
        $("#tab-page-content-" + id).remove();																		//内容移除
        var _opt;
        var $a_alarm = $('ul.page-sidebar-menu').find('a.nav-link.nav-toggle[url="' + srcStr + '"]');
        if ($a_alarm.length > 0) {
            _opt = {
                title: '<i class="' + $a_alarm.find('i').attr('class') + '"><i></i></i> ' + $a_alarm.find('span').html(),
                id: $a_alarm.data('addtab'),
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        } else {
            _opt = {
                title: '<i class="'+icon +'"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    };

    /**
	 * 查看详情
     */
    var viewMessage = function () {
        var el = $(this);
        var rowIndex = configMap.messageRemindGrid.cell(el.closest('td')).index().row;
        var id = configMap.messageRemindGrid.row(rowIndex).data().id;
        var glbm = configMap.messageRemindGrid.row(rowIndex).data().glbm;
        // var glbm_cy = configMap.messageRemindGrid.row(rowIndex).data().glbm_cy;
        var txlx = configMap.messageRemindGrid.row(rowIndex).data().txlx_dm;
        var txbt=configMap.messageRemindGrid.row(rowIndex).data().txbt;
        $.ajax({
			url:configMap.path + "/messageremind/updateById/" + id,
			type:'put',
			success:function(){
				App.unblockUI(jqueryMap.$blockTarget);
				updateNumber();
				configMap.messageRemindGrid.ajax.reload(null,false);												//查看完毕后，重新刷新
			},	
			error : function() {
				App.unblockUI(jqueryMap.$blockTarget);
			}
		});
		//根据提醒类型查询相应的详情,派工不需要
		if (txlx === '002') {																							//合同详情
			$.get('/customermanage/contract/contractexist/'+glbm, null, function(result){						//获取该条合同内容是否已被删除
				if(result){
					if(txbt.indexOf("提交审核")>-1){
                        //判断当前合同的审核状态是否为已审核
						$.get('/customermanage/contract/getHtShzt/'+glbm,null,function(shztdm){
							if(shztdm==='000'){
                                openModal("审核合同", "/statisticalanalysis/contractaudit/audit.jsp" + "?htbm="
                                    + encodeURI(glbm), 'contractaudit', rowIndex);
							} else {
                                openModal("查看合同详情", "/customermanage/contract/view.jsp" + "?id="
                                    + encodeURI(glbm), 'messageview', rowIndex);
							}
						})
					} else {
                        openModal("查看合同详情", "/customermanage/contract/view.jsp" + "?id="
                            + encodeURI(glbm), 'messageview', rowIndex);
                    }
				} else {
					Messenger().post({
			            message: '该消息所属的合同已被删除！',
			            type: 'error'
			        });
				}
			})
		} else if (txlx === '003') {
			if(glbm!==null&&glbm!==''){
                if(txbt.indexOf("收费录入提醒")>=0) {
                    generateTab(this, '/customermanage/charge/list.jsp', '收费台账',
                        '2ce27699-5ae3-4ecd-87d6-5701a1196498','fa fa-file-text-o iconMr');
                } else if(txbt.indexOf("提交收费审核")>=0){
                    openModal("收费审核", '/systemmanager/messageremind/chargeForAudit.jsp?glbm=' + glbm + '&type=audit','chargeaudit',rowIndex);
                } else {
                    openModal("收费审核", '/systemmanager/messageremind/chargeForAudit.jsp?glbm=' + glbm + '&type=view','chargeaudit',rowIndex);
				}
			} else {
                if(txbt.indexOf("提交收费审核")>=0){
                    generateTab(this, '/statisticalanalysis/chargeaudit/list.jsp', '收费审核',
                        'd763fd73-7603-4c46-914d-367161282c27','fa fa-rmb iconMr');
                } else {
                    generateTab(this, '/customermanage/charge/list.jsp', '收费台账',
                        '2ce27699-5ae3-4ecd-87d6-5701a1196498','fa fa-file-text-o iconMr');
                }
			}
		} else if (txbt === '客户评价') {
            $.get('/systemmanager/evaluateuserstaff/evaluateStaffeixt/'+glbm,null,function(result){
                if(result){
                    openModal("查看评论详情", '/systemmanager/evaluate/viewevaluatestaff.jsp?glbm=' + encodeURI(glbm),
						'viewevaluatestaff', rowIndex);
                } else {
                    Messenger().post({
                        message: '该评论已被删除！',
                        type: 'error'
                    });
                }
            })
        }else if(txbt === '公司评价'){
            $.get('/systemmanager/evaluateuser/evaluateeixt/'+glbm,null,function(result) {
                if (result) {
                    openModal("查看评论详情", '/systemmanager/evaluate/viewevaluate.jsp?id=' + encodeURI(glbm),
                        'viewevaluate', rowIndex);
                } else {
                    Messenger().post({
                        message: '该评论已被删除！',
                        type: 'error'
                    });
                }
            })
		}else if(txlx === '006'){
            openModal("查看商机提醒详情",
				'/customermanage/mybusiness/viewappcustomerinfo.jsp?id='+encodeURI(glbm),
				'appcustomerinfo',rowIndex);

        } else if(txlx === '005'){
            openModal("查看业务合作提醒详情",
				'/systemmanager/businesscooperate/businesscooperateview.jsp?cooperateId='+encodeURI(glbm),
				'viewBusinessCooperateByCooperateId',rowIndex);
        } else if(txlx === '008'){
            generateTab(this, '/systemmanager/taskcenter/taskmanagement/list.jsp', '任务列表',
				'54cd63e4-589b-4cb4-ace0-987d7f637a09','fa fa-list-ol iconMr');

        }else if(txlx === '009'){
            generateTab(this, '/systemmanager/taskcenter/taskmanagement/list.jsp', '任务列表',
				'54cd63e4-589b-4cb4-ace0-987d7f637a09','fa fa-list-ol iconMr');
		} else if (txlx === '020'){
            openModal("查看工单详情",
                '/systemmanager/workorder/view.jsp?id='+encodeURI(glbm),
                'viewBusinessCooperateByCooperateId',rowIndex);
		}
    };

    /**
	 * 批量阅读
     */
	var batchReadMess = function () {
		var id = '';
		jqueryMap.$container.find(':checked[data-toggle="tooltip"]').each(function () {
            var el = $(this);
            var rowIndex = configMap.messageRemindGrid.cell(el.parent()).index().row;
            var ids = configMap.messageRemindGrid.row(rowIndex).data().id;
            id += ids + ',';
		});
		if(id === ''){
			Messenger().post({message: '请选择要阅读的信息！', type: 'error'});
		}else{
			App.blockUI({
				target : jqueryMap.$blockTarget,
				boxed : true,
				message : '正在设置，请稍候...'
			});
			$.ajax({
				url : configMap.path+"/messageremind/updateById"+"/"+id,
				type:'put',
				success:function(){
					updateNumber();																						//页面顶部的消息提醒中的消息数量
					App.unblockUI(jqueryMap.$blockTarget);
					configMap.messageRemindGrid.ajax.reload(null,false);
					welcome.refreshPG();																				//更新首页数据
				},	
				error : function() {
					App.unblockUI(jqueryMap.$blockTarget);
				}
			});
			$('#allCheckMess').attr("checked", false);
		}
	};

    /**
	 * 快捷选择
     * @param event
     * @param name
     */
	var addselect = function (event, name){
		$('.ws_mdw01', jqueryMap.$container).each(function(i,v){													//将除了当前点击的以外的其他都取消选中
			$(v).not(event).removeClass('activeBtn');
		});
		if($(event).hasClass("activeBtn")){																			//当前点击的button的选中状态
    		$(event).removeClass("activeBtn");
    		configMap.selectTime='';
    	} else {
    		$(event).addClass("activeBtn");
    		configMap.selectTime=name;
    	}
		clearselect("date");																							//如果点击了按时间查询，将按时间段查询的值去掉
		configMap.messageRemindGrid.ajax.reload();																	//刷新表格
	};

    /**
	 * 清除选择
     * @param type
	 * 			要清空的类型
     */
	var clearselect = function (type){
		if(type === "date"){																							//如果类型是日期
			$('[name="starDate"]', jqueryMap.$container).val("");
			$('[name="endDate"]', jqueryMap.$container).val("");
		} else if(type === "select"){																					//类型为快捷查询
			$('.ws_mdw01', jqueryMap.$container).each(function(i,v){
    			$(v).removeClass('activeBtn');
    		});
    		configMap.selectTime = "";
		}
	};

    /**
	 * 更新首页以及顶部的消息提醒数量
     */
	var updateNumber = function (){
		$.get('/customermanage/SystemMessageController/getAllMessageReminder', null, function(result) {		//页面顶部的消息提醒中的消息数量
			if(result > 0) {
                $('#announcementInfoWarningTX', jqueryMap.$blockTarget).removeClass('circleDisplay');
                $('#announcementInfoWarningTX', jqueryMap.$blockTarget).html(result);
                $('.top-message-m', jqueryMap.$blockTarget).addClass('bellSwingMessage');
            } else {
                $('#announcementInfoWarningTX', jqueryMap.$blockTarget).css({display:'none'});
                $('.top-message-m', jqueryMap.$blockTarget).removeClass('bellSwingMessage');
            }
        });
		$.ajax({																										//刷新首页上的派工提醒数量
    		url:'/systemmanager/messageremind/searchCount',
    		dataType:'JSON',
    		type:'GET',
    		success:function(data){
    			$('#pgtxsl').text(data);
    		},
    		error:function(){
    			$('#pgtxsl').text(0);
    		}
    	})
	};

    /**
	 * 获取消息类型
     */
    var findAllMessageType=function () {
        $.ajax({
            url:configMap.path+'/messageremind/findAllType',
            type:'get',
            success:function (result) {
                var op='<li value="100"><i class="icon iconfont icon-xiaoxi-" style="font-size: 14px;margin-right: 10px;"></i>全部提醒类型</li>';
                if(result !== null){
                    for(var i=0;i<result.length;i++){
						op += '<li value="' + result[i].messageTypeCode+'">'
							+ result[i].messageTypeName.replace('提醒','') + '</li>';
                    }
                    $('.clickMore',jqueryMap.$container).append(op);
                    $('.clickMore li[value="'+configMap.type+'"]', jqueryMap.$container).addClass("checked");
                }
                $('.clickMore li', jqueryMap.$container).off('click').on('click',function(){
                    $('.clickMore li', jqueryMap.$container).removeClass('checked');
                    $(this).addClass('checked');
                    configMap.type = $(this).attr('value');
                    configMap.messageRemindGrid.ajax.reload();
                });
            }
        })
    };

	return {
		init : function(type, ydbz) {
			setJqueryMap();
			var tabid=$('#messageremindasdf').parents('.tab-pane').attr('id').slice(17);
			tabMenu(tabid);

			if(type === ""){																							//设置信息类型
                configMap.type = "100";
			}else{
                configMap.type = type;
			}

			if(ydbz === ""){																							//设置阅读状态
                $('[name="readtype"]').val("3");
			} else {
                $('[name="readtype"]').val(ydbz);
			}
            findAllMessageType();																						//获取消息类型
			initmessageRemindGridByPageAll();																			//初始化信息表格
			Layout.addResizeContent(jqueryMap.$container);															//设置页面样式
			setTimeout(function () {
				var layout = jqueryMap.$container.layout({
					center__onresize: App.initLayoutContentScrollbar,
					west__onresize: App.initLayoutContentScrollbar,
					west__size: 200
				});
				App.initLayoutContentScrollbar('west', layout.panes.west);
				App.initLayoutContentScrollbar('center', layout.panes.center);
			}, 10);
			jqueryMap.$container.find('.beginTime').datepicker({													//日历插件
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN',
                clearBtn: true
            }).on('changeDate',function (){
            	clearselect("select");																					//如果用日历插件，则将按时间查询的清空
            });
            jqueryMap.$container.find('.endTime').datepicker({														//日历插件
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN',
                clearBtn: true
            }).on('changeDate',function (){
            	clearselect("select");																					//如果用日历插件，则将按时间查询的清空
            });

		    $('#findByWeek').off('click').on('click',function(){													//本周
		    	addselect($(this),"week");
		    });
			$('#findByMonth').off('click').on('click',function(){													//本月
				addselect($(this),"month");
			});
			$('#findByLastMonth').off('click').on('click',function(){												//上个月
				addselect($(this),"lastMonth");
			});	
			$('#findByYear').off('click').on('click',function(){													//本年
				addselect($(this),"year");
			});

			jqueryMap.$container.find('#allCheckMess').off('click').on('click', function () {					//checkbox全选
		          if (this.checked) {
		              jqueryMap.$container.find($('[data-type="check"]')).prop("checked", true);
		          } else {
		              jqueryMap.$container.find($('[data-type="check"]')).prop("checked", false);
		          }
	        });
			
            $("#batchReadMess").on("click", function() {															//批量阅读消息
            	batchReadMess();
            });
            $('#batchDeleteMess').off('click').on('click',function (){											//批量删除消息
            	if($('[data-type="check"]:checked').not("#allCheckMess").length === 0){
                    Messenger().post({message: '请选择要删除的信息！', type: 'error'});
				} else {
                    $(".hiddenadoptAll").trigger('click');
				}
			});
        	$(".hiddenadoptAll").confirmation({
				"title" : '确定要删除？',
				"btnOkLabel" : '是',
				"btnCancelLabel" : '否',
				"placement" : 'bottom',
				"container": 'body',
				"onConfirm" : batchDeleteMess,
                'btnOkClass':'btn btn-sm btn-danger mr borderRadius4',
                'btnCancelClass':'btn btn-sm btn-default borderRadius4'
			});
            
			$('[name="Search-btn"]',jqueryMap.$container).off('click').on('click',function (){					//查询
				configMap.messageRemindGrid.ajax.reload();
			});
		 },
		 setPath : function(path) {
			 configMap.path = path;
		 }
	}
}();