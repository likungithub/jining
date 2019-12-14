/**
 * 公司给员工
 */
var dispatchData = function (data) {
    'use strict';

	// 全局属性参数
	var configMap = {
			path: '',
			dataUrl: '/organization/organization/orgAndUser',//取组织
			dispatchUrl: '/statisticalanalysis/dispatch/dispatch',
			DispatchByPagingUrl: '/statisticalanalysis/dispatch/getDispatchPaging',//分页
			dispatchByBmUrl: '/statisticalanalysis/dispatch/dispatchByBm',//评价根据部门查询信息
			editPageUrl:'/statisticalanalysis/dispatch/editdispatch.jsp',
			delPageUrl:'/statisticalanalysis/dispatch/deldispatch',
			currentSelectedNode: null,
			selectedNodeId: null,//新增评论获取选择ID
			dispatchGrid:null,
			editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="转派工"><i class="icon iconfont  icon-zhuanpaigong  iconFontColor-10a0f7 iconFontSize"></i></a>',
			deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
			editAuthority_html: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default" data-toggle="tooltip" title="编辑"><i class="icon iconfont icon-bianji1 iconFontSize colorccc"></i></a>',
			deleteAuthority_html: '<a href="javascript:;" class="btn btn-xs default" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontSize colorccc"></i></a>',
			checkbox_html: '<input type="checkbox" class="group-checkbox" data-type="check" data-toggle="tooltip" />',
        	fwzt :'', //服务状态
    		type :'', //级别
    		other :'' //传参
	};
    if(data){
		configMap.currentSelectedNode = data
    }
	// 全局Dom
	var jqueryMap = {
			$container: null,
			$blockTarget: null,
			$dispatchTree: null,
			$dispatchDialog: null,
			$selectedRow: null,
			$dispatchDataTable: null
	};

    var setJqueryMap = function () {
        jqueryMap.$container = $('#dispatchByPSL-manager-content');
        jqueryMap.$blockTarget = jqueryMap.$container;
        jqueryMap.$dispatchTree = $('#dispatchByPSL_tree', jqueryMap.$container);
        jqueryMap.$dispatchDataTable = $('#dispatchByPSLData', jqueryMap.$container);
    };

    //模态框
	var openModal = function (title, url, type) {
		var dialogButtons = {};
		if (type === 'edit') {
			dialogButtons.success = {
				label: "保存",
				className: "btn btn-default btnBlue colorfff borderRadius4",
				callback: function () {
					//保存成功之后重新按照选择的用户查询派工信息
					dispatchEdit.savedispatch(function (result) {
						if (result) {
							configMap.dispatchGrid.ajax.reload();
							jqueryMap.$dispatchDialog.modal('hide');
							$('#allCheck').attr("checked", false);
						}
					});
					return false;
				}
			};
		}
		dialogButtons.cancel= {
				label: '关闭',
				className: 'btn btn-default borderRadius4'
		}
		$.get(url, function (html) {
			jqueryMap.$dispatchDialog = bootbox.dialog({
				title: title,
				message: html,
				buttons: dialogButtons,
				className:'dispatch-m'
			});
		});
	};

	//2
	//分页获取派工数据
	var initOrgAndUserPaging = function () {
		configMap.dispatchGrid = jqueryMap.$dispatchDataTable.DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			"ordering": false,// 是否启用排序功能
			"destroy": true,
			"lengthMenu": [10, 20, 50, 100],
			"autoWidth": false,
			"buttons": [
			            'selectAll',
			            'selectNone'
			            ],
            "columnDefs": [
                           { targets: 1,"searchable": false }
                           ],
            "searching": false,//屏蔽datatales的查询框
              	"processing": true, // 打开数据加载时的等待效果
              	"serverSide": true, // 打开后台分页
              	"ajax": {
              		"url": configMap.path + configMap.DispatchByPagingUrl,
              		"dataSrc": "aaData",
					"cache":false,
              		"data": function (data) {
              			var text = jqueryMap.$container.find('[name="searchFilter"]').val();
              			data.searchText = text;
                        data.type = configMap.type;
                        data.fwzt = configMap.fwzt;
                        data.other = configMap.other;
              		}
          	},
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
			"columns": [
			            {
			            	'className':'text-center',
			            	"render": function () {
			            		return configMap.checkbox_html;
			            	}
			            },
			            {
			            	"data": "gsmc",
			            	'className':'text-left'
			            },
			            {
			            	"data": "ygxm",
			            	'className':'text-left'
			            },
		            	{
		            		"data": "pgjs_mc",
		            		'className':'text-left',
		            		"render":function (data){
		            			//判断派工角色中是否包含“，”
		            			if(data.indexOf(",")!=-1){
		            				data = data.replace(",","");
		            			}
		            			return data;
		            		}
		            	},
		            	{
		            		"data": "bmmc",
		            		'className':'text-left'
		            	},
		            	{
		            		'className':'text-center',
		            		"render": function (data, type) {
		            			if(configMap.currentSelectedNode != null && configMap.currentSelectedNode.id == 'stopCustomer'){
                                    return configMap.deleteBtn_html;
								} else {
                                    if (jqueryMap.$container.find('#editAndDeleteDispatchBtn').length === 1) {
                                        return '<button data-type="pgtj_edit" style="border: none;z-index: 10;background: transparent;outline: none;">' +
                                            configMap.editBtn_html  + '</button>' + configMap.deleteBtn_html;
                                    } else {
                                        return configMap.editAuthority_html + configMap.deleteAuthority_html;
                                    }
								}
		            		}
		            	}
		            	],
        	"drawCallback": function () { // 数据加载完成后执行
        		var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
        		var editContainer = $('[data-type="pgtj_edit"]', jqueryMap.$container);
        		var delContainer = $('[data-type="del"]', jqueryMap.$container);
        		if (tootipContainer.length > 0) {
        			tootipContainer.tooltip();
        		}

        		if (editContainer.length > 0) {
        			editContainer.off('click').on('click', editDispatch);
        		}

        		if (delContainer.length > 0) {
        			delContainer.confirmation({
        				"title": '确定要删除？',
        				"btnOkLabel": '是',
        				"btnCancelLabel": '否',
        				"placement": 'left',
        				"onConfirm": delDispatch,
        				"btnOkClass":'btn btn-danger borderRadius4',
        				"btnCancelClass":"btn btn-default borderRadius4"
        			});
        		}
        	}
	    });
	};

	//3
	//删除派工
	var delDispatch = function (event, element) {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在删除数据，请稍候...'
		});
		var rowIndex = configMap.dispatchGrid.cell(element.parent()).index().row;
		var id = configMap.dispatchGrid.row(rowIndex).data().id;
		$.ajax({
			url: configMap.path + configMap.delPageUrl + "/" + id,
			type: 'DELETE',
			success: function (result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result.success) {
					App.unblockUI(jqueryMap.$blockTarget);
					//根据点击的员工查询出派工信息
					configMap.dispatchGrid.ajax.reload();
					Messenger().post("删除成功!");
				} else {
					Messenger().post({
						message: result.message,
						id:"dispatchmessage",
						type: 'error'
					});
				}
			},
			error: function () {
				App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};

	//4
	//单独派遣员工
	var editDispatch = function () {
		stopContinueClick(this,300);
		var el = $(this);
		var rowIndex = configMap.dispatchGrid.cell(el.parent()).index().row;
		var id = configMap.dispatchGrid.row(rowIndex).data().id;
		openModal("派遣员工", configMap.path + configMap.editPageUrl + "?id=" + id, 'edit');
	};

	//5
	//批量派遣员工
	var editBatchDispatch = function () {
		var ids = '';
		jqueryMap.$container.find(':checked[data-toggle="tooltip"]').each(function () {
            var el = $(this);
            var rowIndex = configMap.dispatchGrid.cell(el.parent()).index().row;
            var id = configMap.dispatchGrid.row(rowIndex).data().id;
            ids += id + ',';
		});
		if(ids==''){
			Messenger().post({message: '请至少选择一条派工信息！',id:"dispatchmessage", type: 'error'});
		}else{
			openModal("派遣员工", configMap.path + configMap.editPageUrl + "?id=" + ids, 'edit');
		}
	};

    /**
	 * 1
	 * 职员jstree
     */
    var initOrganization = function () {
        var jstree = jqueryMap.$dispatchTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': '/organization/organization/orgAndUserAuth'
                },
                "state": {
                    "opened": true  //展示第一个层级下面的node,该根节点不可点击
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
            $('#dispatchByPSL_tree', jqueryMap.$container).on("open_node.jstree", function (e, data) {
                getTreeNum();
            });
            getTreeNum();
            $("#dispatchByPSL_tree", jqueryMap.$container).bind("select_node.jstree", function (e, data) {
                if (data.node.id == 'workCustomer') {
                    $.each(data.node.children, function (i, v) {
                        $('#dispatchByPSL_tree').jstree('open_node', v);
                    });
                }
                data.instance.toggle_node(data.node);
                getTreeNum();
            });
        });
        var getTreeNum = function () {
            for (var i = 0; i < $("#dispatchByPSL_tree li", jqueryMap.$container).length; i++) {
                var $temp = $("#dispatchByPSL_tree li", jqueryMap.$container).eq(i).attr("userimg");
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
        };
        var clearTreeNum = function () {
            for (var i = 0; i < $("#dispatchByPSL_tree  li", jqueryMap.$container).length; i++) {
                var $temp = $("#dispatchByPSL_tree  li", jqueryMap.$container).eq(i).attr("userimg");
                if (typeof($temp) == "undefined" || typeof($temp) == "object") {
                } else {
                    $("#dispatchByPSL_tree li", jqueryMap.$container).eq(i).find("a").remove();
                }
            }
        };
        jqueryMap.$dispatchTree.on('select_node.jstree', function (e, data) {
            configMap.currentSelectedNode = data.node;
            if (data.node.parent === '#') { //点击的是所有客户
                configMap.type = 1;
                configMap.fwzt = true; //正在服务的
                $("#editBatchDispatch", jqueryMap.$container).attr("disabled",false);
                if (data.node.id === 'stopCustomer') {//停止服务的
                    configMap.fwzt = false;
                    $("#editBatchDispatch").attr("disabled","disabled")
                }
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出已经停止服务的客户列表信息
                configMap.dispatchGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            } else if (data.node.li_attr.BMBZ === "1") { //部门标志为true，代表为部门
                configMap.fwzt = true; //正在服务的
                configMap.type = 2; //代表部门
                configMap.other = data.node.li_attr.bmdm; //部门代码
                $("#editBatchDispatch").attr("disabled",false);
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                //展示出该部门的客户列表信息
                configMap.dispatchGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            } else { //代表个人
                $("#editBatchDispatch").attr("disabled",false);
                configMap.fwzt = true; //正在服务的
                configMap.type = 3;
                configMap.other = data.node.li_attr.zydm;
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在获取数据，请稍候...'
                });
                configMap.dispatchGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
        //jstree定时搜索功能
        //输入框输入定时自动搜索
        var to = false;
        $('#search_pg').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                jstree.jstree(true).search($('#search_pg').val());
            }, 250);
        });
    };

	return {
		// 初始化
		init: function () {
			setJqueryMap();
			var tabid=$('#dispatchByPSL-manager-content').parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid);
			Layout.addResizeContent(jqueryMap.$container);
			setTimeout(function () {
				var layout = jqueryMap.$container.layout({
					center__onresize: App.initLayoutContentScrollbar,
					west__onresize: App.initLayoutContentScrollbar,
					west__size: 200
				});
				App.initLayoutContentScrollbar('west', layout.panes.west);
				App.initLayoutContentScrollbar('center', layout.panes.center);
			}, 10);

			//搜索
			$('.Search-btn', jqueryMap.$container).off('click').on('click', function () {
				configMap.dispatchGrid.ajax.reload();
			});
      
			//checkbox全选
			jqueryMap.$container.find('#allCheck').off('click').on('click', function () {
				if (this.checked) {
					jqueryMap.$container.find($('[data-type="check"]')).prop("checked", true);
				} else {
					jqueryMap.$container.find($('[data-type="check"]')).prop("checked", false);
				}
			});

            configMap.type = 1;						//初始化设置查询级别为最大
            configMap.fwzt = true; 				//初始化为正在服务的
			//获取职员
			initOrganization();
			initOrgAndUserPaging();
			//批量派遣按钮点击事件
			$("#editBatchDispatch").on("click", function(e) {
				editBatchDispatch();
			});
		},
		// 设置路径
		setPath: function (path) {
			configMap.path ="";
		},
        setCurrentSelectedNode:function (data) {
            configMap.currentSelectedNode = data
        }
    };
}();
//@ sourceURL=org/org.js