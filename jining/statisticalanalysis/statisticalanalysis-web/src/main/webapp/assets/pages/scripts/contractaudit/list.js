/**
 * 
 */
var contractaudit = function () {
	'use strict';
// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/contractaudit/contractaudit',
        treeUrl: '/organization/organization/orgAndUserAuth',
		contractauditGrid: null,
        viewPageUrl: 'customermanage/contract/view.jsp',
        auditPageUrl: '/contractaudit/audit.jsp',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-placement="bottom"' +
			' data-toggle="tooltip" name="auditView" title="查看合同信息" data-original-title="查看合同信息">' +
			'<i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        auditBtn_htbm: '<a href="javascript:;" class="btn btn-xs default" data-placement="bottom"' +
        	' data-toggle="tooltip" name="auditContract" title="审核合同" data-original-title="审核合同">' +
			'<i class="icon iconfont icon-shenhe1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        historyBtn_html:'<a href="javascript:;" class="btn btn-xs default" data-toggle="tooltip"' +
			' data-placement="bottom"  name="historyaudit"  title="历史审批记录">' +
			'<i class="icon iconfont icon-lishirenwu iconFontColor-10a0f7 iconFontSize"></i></a>',
		statusredis:null,
		fsbz:0,
        bz: '',
        classType: '',
        currentSelectedNode: null,
        fwzt: '',
        other: '',
        ifSearch:'0'
	};

	// 全局Dom
	var jqueryMap = {
		$blockTarget: null,
		$contractauditDialog: null,
		$contractauditTable:null,
		$contractauditstarDate:null,
		$contractauditendDate:null,
		$content:null,
        $htshTree:null
	};
	
	var setJqueryMap = function (uuid) {
		jqueryMap.$blockTarget = $('body');
		jqueryMap.$content = $('#contractaudit_id_div_'+uuid);
		jqueryMap.$manualdata=jqueryMap.$content.find('table#contractaudit_data');
		jqueryMap.$contractauditstarDate=jqueryMap.$content.find('div#starDate_div');
		jqueryMap.$contractauditendDate=jqueryMap.$content.find('div#endDate_Div');
        jqueryMap.$htshTree = $('#htsh_tree', jqueryMap.$content);
	};
	
	//1初始表格
	var initcontractauditGrid = function () {
		configMap.contractauditGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
			"destroy": true,
			"lengthMenu": [10, 20, 50, 100],
			"autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                	var status;
                	var khxx;
                	var starDate;
                	var endDate;
                    if(configMap.bz === 'welcome'){
                    	status = "000";
                        khxx = null;
                        starDate = null;
                        endDate = null;
                    } else {
                        status = $("#txtorgName",jqueryMap.$content).val();
                        if(status===null){
                            status="";
                        }
                        khxx = $("#khbm",jqueryMap.$content).val();
                        if($("#htshDIV  .clickMore", jqueryMap.$content).attr("data")==="0"){
                            starDate = "";
                            endDate = "";
						} else {
                            starDate=$('[name="starDate"]',jqueryMap.$content).val();
                            endDate=$('[name="endDate"]',jqueryMap.$content).val();
						}
                    }
                    if (khxx == null || khxx == '' || khxx == 'undefined') {
                        configMap.ifSearch = '0';
                    }
                    data.status = status;
                    data.khxx = khxx;
                    data.classType = configMap.classType;
                    data.other = configMap.other;
                    data.fwzt = configMap.fwzt;
                    data.starDate = starDate;
                    data.endDate = endDate;
                    data.ifSearch = configMap.ifSearch;
                    configMap.ifSearch = '0';
                }
            },
			"columns": [	
			   {
				   "data": "id",
				   "render": function (data, type, row) {
					   var content = '';
					   if(row.shzt_dm==="001" || row.shzt_dm==="002"){
						   content += '<input type="checkbox" name="checkbox_checkbox" id="'+row.htbm+'" disabled="disabled"/>';
					   }else{
						   content += '<input type="checkbox" name="checkbox_checkbox" id="'+row.htbm+'"/>';
					   }
						return content;
					}
			   },
			   {
				   className:'text-center',
				   "data": "htbm"
			   },
			   {
                   className:'text-left',
				   "data": "yhmc"
			   },
			   {	
				   className:'text-center',
				   "data": "qyrq",
			       "render": function (data) {
			    	   return moment(data).format('YYYY-MM-DD'); 
			       }
			    },
			    {	
			    	className:'text-center',
			    	"data": "fwqxq",
			    	"render": function (data, type, row) {
			    		return '<label data-toggle="tooltip" data-placement="bottom" title="'+moment(data).format('YYYY.MM.DD') + "-" + moment(row.fwqxz).format('YYYY.MM.DD')+'">'+moment(data).format('YYYY.MM.DD') + "-" + moment(row.fwqxz).format('YYYY.MM.DD')+'</label>';
			    	}
				},
				{	
					className:'text-center',
			    	"data": "sfxm_mc"
				},
				// {
			    	// className:'text-center',
			    	// "data": "fkfs_mc",
			    	// "render": function (data, type, row) {
			    	// 	return data + "/" + row.fkxh_mc;
			    	// }
				// },
                {
                    className:'text-right',
                    "data": "hjje",
                    "render":function (data){
                        return moneySplitByComma(data.toFixed(2));
                    }
                },
				// {
				// 	className:'text-right',
				// 	"data": "zfy",
				// 	"render":function (data){
				// 		return moneySplitByComma(data.toFixed(2));
				// 	}
				// },
			    {
					className:'text-center',
					"data": "lrrmc"
				},
			    {
					className:'text-center',
			    	"data": "shzt_dm",
			    	"render": function (data, type, row) {
			    		var status = '';
			    		if (data === "000") {
			    			status = "未审核";
			    		} else if (data === "001") {
			    			status = "同意";
			    		} else if (data === "002") {
			    			status = "不同意";
			    		}
			    		return status;
					 }
			    },
				{
			    	className:'text-center',
					"render": function (data, type, row) {
                        if(row.bgz === 0){
                            var statusHtml = '';
                            if(row.shzt_dm == "000"){
                                statusHtml += configMap.auditBtn_htbm;
                            }
                            var revoke = '';
                            if (row.shzt_dm != "000") {
                                revoke += '<a href="javascript:;" class="btn btn-xs default" data-type="staus"' +
                                    ' data-toggle="tooltip" data-placement="bottom" title="撤销合同审核状态"' +
                                    ' data-original-title="撤销合同审核状态"><i class="icon iconfont icon-chexiao' +
                                    ' iconFontColor-10a0f7 iconFontSize"></i></a>';
                            }
                            return ''
                                +configMap.viewBtn_html
                                +revoke
                                +statusHtml
                                +configMap.historyBtn_html;
                        } else {
                        	return configMap.viewBtn_html + configMap.historyBtn_html;
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
            "fnFooterCallback": function(row, data, start, end, display) {//总计
                var api = this.api(), data;
                // Remove the formatting to get integer data for summation
                var intVal = function ( i ) {
                    return Number(Number(i).toFixed(2))
                    // return typeof i === 'string' ?
                    //     i.replace(/^\d+(?:\.\d{0,2})?/, '')*1 :
                    //     typeof i === 'number' ?
                    //         i : 0;
                };
                function number(data){
                    if(data!=null){
                        return data.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
                    }else{
                        return ;
                    }
                }
                var total = api
                    .column( 6 )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );
                $( api.column( 6 ).footer() ).html(
                    number(total)
                );//应收金额
            },
			"drawCallback": function () { // 数据加载完成后执行				
				var viewContainer = jqueryMap.$content.find('[name="auditView"]');// $('[data-type="view"]');
				var adoptContainer = jqueryMap.$content.find('[data-type="staus"]');
				var auditContainer = jqueryMap.$content.find('[name="auditContract"]');
                var historyContainer = $('[name="historyaudit"]',jqueryMap.$content);                              //历史审批记录
                $('[data-toggle="tooltip"]').tooltip();
				if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewContractaudit);
				}
				if (adoptContainer.length > 0) {
					adoptContainer.confirmation({
                        "title": '确定要撤销当前合同的审核？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "btnOkClass": 'btn btn-sm btn-danger mr borderRadius4',
                        "btnCancelClass": 'btn btn-sm btn-default borderRadius4',
                        "placement": 'left',
                        "container": 'body',
                        "onConfirm": adoptContract
                    });
				}
				if (auditContainer.length > 0) {
					auditContainer.off('click').on('click',auditContract);
				}
                if(historyContainer.length>0){
                    historyContainer.off('click').on('click',function(){
                        var el = $(this);
                        var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
                        var id = configMap.contractauditGrid.row(rowIndex).data().id;
                        var dialogButtons = {
                        };
                        dialogButtons.cancel = {
                            label: '<i class="fa fa-times"></i>关&nbsp;闭',
                            className: "btn btn btn-default borderRadius4"
                        };
                        $.get('customermanage/contract/historyAuditList.jsp?id='+id+'&type=001', function (html) {
                            jqueryMap.$setimg = bootbox.dialog({
                                title: '历史审批记录',
                                message: html,
                                buttons: dialogButtons
                            });
                        });
                    });
                }
				//单个checkbox点击
				jqueryMap.$content.find('[name="checkbox_checkbox"]').change(function (){
					//当前被点击的checkbox
					var el = $(this);
					//获取当前被点击的checkbox数量
					var n = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content).length;
					//获取所有可以被点击的checkbox数量
					var all = $('[name="checkbox_checkbox"]',jqueryMap.$content).not(":disabled").length;
					//如果两个数量一样，设置选择所有的checkbox属性为被点击，否则为不被点击
					if(n==all){
						jqueryMap.$content.find('[name="selectAll"]').prop("checked",true);
					}else{
						jqueryMap.$content.find('[name="selectAll"]').prop("checked",false);
					}
					var temp = null;
					var key = $(this).attr('id');
				});
			}
		});
	};	

	//全选
	var selectAll = function (status){
		$('[type="checkbox"]',jqueryMap.$manualdata).not(":disabled").prop("checked",status);
		var inputjson = $('[type="checkbox"]:checked',jqueryMap.$manualdata).not(jqueryMap.$content.find('[name="selectAll"]'));
	};
	
	//创建模态框
	var openModal = function (title, url, type) {		
		var dialogButtons = {
		};
		if (type === 'audit') {
			dialogButtons.success = {
				label: '<i class="fa fa-save"></i> 保&nbsp;存',
				className: "btn btn btn-default btnBlue borderRadius4 colorfff",
				callback: function () {
					audit.saveUserInfo(function (result) {
						if (result) {
                            configMap.contractauditGrid.ajax.reload();
							jqueryMap.$contractauditDialog.modal('hide');
							jqueryMap.$content.find('[name="selectAll"]').prop("checked",false);
						}
					});
					return false;
				}
			};
		}
		dialogButtons.cancel = {
			label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
			className: 'btn btn btn-default borderRadius4 color666'
		}
		$.get(url, function (html) {
			jqueryMap.$contractauditDialog = bootbox.dialog({
				title: title,
				message: html,
				buttons: dialogButtons
			});
		});
	};
	
	//查看合同详情
	var viewContractaudit = function () {
		stopContinueClick(this,300);
		var el = $(this);
		var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
		var id = configMap.contractauditGrid.row(rowIndex).data().htbm;
		openModal("查看合同信息——"+id, configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
	};

	//审核合同
	var auditContract = function (){
		var inputjson = $('[type="checkbox"]',jqueryMap.$manualdata);
		$(inputjson).each(function(){
			$(this).prop("checked",false);
		});
		var el = $(this);
		var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
		var id = configMap.contractauditGrid.row(rowIndex).data().htbm;
		openModal("审核合同信息", configMap.path + configMap.auditPageUrl + "?htbm=" + encodeURI(id), 'audit');
	};
	
	//撤销合同
	var adoptContract = function (event,element){
		var el = $(element);
		var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
		var htbm = configMap.contractauditGrid.row(rowIndex).data().htbm;
		$.ajax({
			url:configMap.path + configMap.dataUrl + '/' + htbm,
			dataType: 'JSON',
			type: 'PUT',
			success: function (datas) {
				if(datas.success){
                    configMap.contractauditGrid.ajax.reload();
					Messenger().post({
						message: '操作成功！',
						type: 'info',
						id: 'contractmessenger'
					});
                    updateMessageNumber();
					//更新首页待审合同数量
                    upDateDSHNumber();
				}else{
					Messenger().post({
						message: datas.message,
						type: 'error',
						id: 'contractmessenger'
					});
				}
				configMap.fsbz = 0;
			}
		});
	};

    var initOrganization = function () {
        var jstree = jqueryMap.$htshTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': configMap.treeUrl
                },
                "state": {
                    "opened": true,  //展示第一个层级下面的node
                    //该根节点不可点击
                }
            },
            "types": {
                "default": {
                    "icon": true
                }

            },

            'plugins': ["types", "expand", "search"],
            "expand": {
                level: 5
            }
        }).on("load_node.jstree", function (e, d) {
            $('#htsh_tree').on("open_node.jstree", function (e, data) {
                getTreeNum();
            });
            getTreeNum();
            $("#htsh_tree").bind("select_node.jstree", function (e, data) {

                if (data.node.id == 'workCustomer') {
                    $.each(data.node.children, function (i, v) {
                        $('#htsh_tree').jstree('open_node', v);
                    });
                }
                data.instance.toggle_node(data.node);
                getTreeNum();
            });


        });
        var getTreeNum = function () {
            for (var i = 0; i < $("#htsh_tree li").length; i++) {
                var $temp = $("#htsh_tree li").eq(i).attr("userimg");
                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                } else {
                    localStorage.setItem("step",i);
                }
            }
            $(".jstree-children li").each(function () {
                if($(this).attr("userImg")==0){
                    $(this).find("a").eq(0).find("i").css("backgroundSize","100%").css("borderRadius","50%").css("width","22px").css("height","22px").css("marginTop","2px").css("marginLeft","1px")
                }

            })
        }

        jqueryMap.$htshTree.on('select_node.jstree', function (e, data) {
            configMap.currentSelectedNode = data.node;
            if (data.node.parent === '#') { //点击的是所有客户
                configMap.classType = 1;
                configMap.fwzt = 1; //正在服务的
                if (data.node.id === 'stopCustomer') {//停止服务的
                    configMap.fwzt = 0;
                }
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                if (configMap.fwzt === 1) { //正在服务的
                    jqueryMap.$content.find(".adoptAll").prop('disabled', false);
                } else { //停止的
                    jqueryMap.$content.find(".adoptAll").prop('disabled', true);
                }
                //展示出已经停止服务的客户列表信息
                configMap.contractauditGrid.clear().draw();
                configMap.contractauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            } else if (data.node.li_attr.BMBZ === "1") { //部门标志为true，代表为部门
                configMap.fwzt = 1; //正在服务的
                configMap.classType = 2; //代表部门
                configMap.other = data.node.li_attr.bmdm; //部门代码
                jqueryMap.$content.find(".adoptAll").prop('disabled', false);
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出该部门的客户列表信息
                configMap.contractauditGrid.clear().draw();
                configMap.contractauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            } else { //代表个人
                configMap.fwzt = 1; //正在服务的
                configMap.classType = 3;
                configMap.other = data.node.li_attr.zydm;
                jqueryMap.$content.find(".adoptAll").prop('disabled', false);
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                configMap.contractauditGrid.clear().draw();
                configMap.contractauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
        //jstree定时搜索功能
        //输入框输入定时自动搜索
        var to = false;
        $('#search_Htshay').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                jstree.jstree(true).search($('#search_Htshay').val());
            }, 250);
        });

    };

	return {
		init: function (uuid,bz) {
			setJqueryMap(uuid);
			configMap.bz = bz;
			var tabid=$('#contractaudit_id_div_'+uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid);
			jqueryMap.$content.find('.beginTime').datepicker({														//日期开始
				clearBtn: true,
				format: 'yyyy-mm-dd',
				autoclose: true,
				language: 'zh-CN'
			});
			jqueryMap.$content.find('.endTime').datepicker({														//日期结束
				clearBtn: true,
				format: 'yyyy-mm-dd',
				autoclose: true,
				language: 'zh-CN'
			});

            Layout.addResizeContent(jqueryMap.$content);
            setTimeout(function () {
                var layout = jqueryMap.$content.layout({
                    center__onresize: App.initLayoutContentScrollbar,
                    west__onresize: App.initLayoutContentScrollbar,
                    west__size: 200
                });
                App.initLayoutContentScrollbar('west', layout.panes.west);
                App.initLayoutContentScrollbar('center', layout.panes.center);
            }, 10);

            configMap.classType = 1;
            configMap.fwzt = 1; //正在服务的
            initOrganization();
            configMap.ifSearch = '0';
			initcontractauditGrid();			
			jqueryMap.$content.find('#Search-btn').off('click').on('click', function () {
                configMap.ifSearch = '1';
                configMap.contractauditGrid.ajax.reload();
			});
			jqueryMap.$content.find('[name="selectAll"]').change(function (){										//点击选择所有
				var el = $(this);
				selectAll(el.is(':checked'));
			});
			jqueryMap.$content.find(".adoptAll").off('click').on('click', function (){							//批量审核
				var htbm = '';
				var checkNumber = $('[name="checkbox_checkbox"]:checked',jqueryMap.$content).length;
                var inputjson = $('[name="checkbox_checkbox"]:checked',jqueryMap.$manualdata);
                if(checkNumber === 0){																					//校验是否选择
                    Messenger().post({
                        message: "请选择合同！",
                        type: 'error',
                        id: 'contractmessenger'
                    });
                } else {
                    $(inputjson).each(function(){
                        htbm += $(this).attr('id') + ",";
                    });
                    openModal("审核合同信息", configMap.path + configMap.auditPageUrl + "?htbm=" + htbm+'&batchSign='+1 , 'audit');
				}
			});
            $("#htshDIV  .clickMore", jqueryMap.$content).on("click",function () {								//更多查询条件
                if($(this).attr("data")==="0"){
                    $(this).next().removeClass("rotate1");
                    $(this).attr("data","1");
                }else{
                    $(this).next().addClass("rotate1");
                    $(this).attr("data","0");
                }
                $("#htshDIV  .openMore", jqueryMap.$content).toggle(500);
            });
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=log.js
	
	