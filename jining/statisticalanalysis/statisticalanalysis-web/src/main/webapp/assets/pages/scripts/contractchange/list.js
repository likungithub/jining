/**
 * 
 */
var contractchangeauditlist = function () {
	'use strict';
// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/contractchange/contractchange',
		contractauditGrid: null,
        viewPageUrl: 'customermanage/contract/view.jsp',
        auditPageUrl: '/contractchange/audit.jsp',
        treeUrl: '/organization/organization/orgAndUserAuth',
        classType: '',
        other:'',
        fwzt:'',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-placement="bottom"' +
			' data-toggle="tooltip" name="auditView" data-original-title="查看合同变更信息">' +
			'<i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        auditBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-placement="bottom"' +
        	' data-toggle="tooltip" name="auditContract" data-original-title="审核合同变更">' +
			'<i class="icon iconfont icon-shenhe1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        ifSearch:'0'
	};

	// 全局Dom
	var jqueryMap = {
		$blockTarget: null,
        $content:null,
        $manualdata:null,
        $htTree:null
	};
	
	var setJqueryMap = function (uuid) {
		jqueryMap.$blockTarget = $('body');
		jqueryMap.$content = $('#contractchange_id_div_'+uuid);
		jqueryMap.$manualdata=jqueryMap.$content.find('table#contractchangeaudit_data');
        jqueryMap.$htTree = $('#htbgaudit_tree', jqueryMap.$content);
	};
	
	//1初始表格
	var initContractauditGrid = function () {
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
                    var text = $('[name="khbm"]', jqueryMap.$content).val();
                    if (text === null || text === '' || text === undefined) {
                        configMap.ifSearch = '0';
                    }
                	var status = $('[name="txtorgName"]', jqueryMap.$content).val();
                	var khxx = text;

                    data.status = status;
                    data.khxx = khxx;
                    data.classtype = configMap.classType;
                    data.other = configMap.other;
                    data.fwzt = configMap.fwzt;
                    data.ifSearch = configMap.ifSearch;
                    configMap.ifSearch = '0';
                }
            },
			"columns": [	
				{
				   	className:'text-center',
				   	"data": "htbm"
			   	},
			   	{
                   	className:'text-left',
				   	"data": "gsmc"
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
                    "data": "fwqx"
                },
                {
                    className:'text-center',
                    "data": "sfxm"
                },
                // {
                //     className:'text-center',
                //     "data": "fkfs"
                // },
                {
                    className:'text-right',
                    "data": "zje",
					"render": function(data){
                    	return moneySplitByComma(data.toFixed(2));
					}
                },
                // {
                //     className:'text-right',
                //     "data": "myje",
                //     "render": function(data){
                //         return moneySplitByComma(data.toFixed(2));
                //     }
                // },
                {
                    className:'text-center',
                    "data": "lrrmc"
                },
                {
                    className:'text-center',
                    "data": "lrrq",
                    "render":function(data){
                        return moment(data).format('YYYY-MM-DD');
                    }
                },
                {
                    className:'text-center',
                    "data": "shzt",
					"render": function(data){
                    	if(data==='000'){
                    		return "未审核";
						} else if(data==='001'){
                            return "同意";
						} else {
                            return "不同意";
						}
					}
                },
				{
			    	className:'text-center',
					"render": function (data, type, row) {
			    		if(row.shzt==='000'){
			    			return configMap.viewBtn_html + configMap.auditBtn_html;
						} else {
                            return configMap.viewBtn_html;
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
			"drawCallback": function () { // 数据加载完成后执行
                $('[data-toggle="tooltip"]', jqueryMap.$content).tooltip();
				var viewContainer = $('[name="auditView"]', jqueryMap.$content);
				var auditContainer = $('[name="auditContract"]', jqueryMap.$content);
				if(viewContainer.length>0){
                    viewContainer.off('click').on('click',function(){
                        var el = $(this);
                        var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
                        var htbm = configMap.contractauditGrid.row(rowIndex).data().htbm;
                        var bgid = configMap.contractauditGrid.row(rowIndex).data().bgid;
                        var dialogButtons = {
                        };
                        dialogButtons.cancel = {
                            label: '<i class="fa fa-times"></i>关&nbsp;闭',
                            className: "btn btn btn-default borderRadius4"
                        };
                        $.get('/customermanage/contract/changeContract.jsp?htbm=' + htbm + '&type=view&bgid=' + bgid, function (html) {
                            jqueryMap.$setimg = bootbox.dialog({
                                title: '查看合同变更',
                                message: html,
                                buttons: dialogButtons
                            });
                        });
					});
				}
				if(auditContainer.length>0){
                    auditContainer.off('click').on('click',function(){
                        var el = $(this);
                        var rowIndex = configMap.contractauditGrid.cell(el.parent()).index().row;
                        var htbm = configMap.contractauditGrid.row(rowIndex).data().htbm;
                        var bgid = configMap.contractauditGrid.row(rowIndex).data().bgid;
                        var dialogButtons = {
                        };
                        dialogButtons.success = {
                            label: '<i class="fa fa-save"></i> 保&nbsp;存',
                            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                            callback: function () {
                                contractChange.audit(function (result) {
                                    if (result) {
                                        configMap.contractauditGrid.ajax.reload();
                                        jqueryMap.$setimg.modal('hide');
                                    }
                                });
                                return false;
                            }
                        };
                        dialogButtons.cancel = {
                            label: '<i class="fa fa-times"></i>关&nbsp;闭',
                            className: "btn btn btn-default borderRadius4"
                        };
                        $.get('/customermanage/contract/changeContract.jsp?htbm=' + htbm + '&type=audit&bgid=' + bgid, function (html) {
                            jqueryMap.$setimg = bootbox.dialog({
                                title: '审核合同变更',
                                message: html,
                                buttons: dialogButtons
                            });
                        });
                    });
				}
			}
		});
	};

    var initOrganization = function () {
        var jstree = jqueryMap.$htTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': configMap.treeUrl
                },
                "state": {
                    "opened": true  //展示第一个层级下面的node
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
            jqueryMap.$htTree.on("open_node.jstree", function (e, data) {
                getTreeNum();
            });
            getTreeNum();
            jqueryMap.$htTree.bind("select_node.jstree", function (e, data) {

                if (data.node.id === 'workCustomer') {
                    $.each(data.node.children, function (i, v) {
                        jqueryMap.$htTree.jstree('open_node', v);
                    });
                }
                data.instance.toggle_node(data.node);
                getTreeNum();
            });


        });
        var getTreeNum = function () {
            for (var i = 0; i < $("li", jqueryMap.$htTree).length; i++) {
                var $temp = $("li", jqueryMap.$htTree).eq(i).attr("userimg");
                if (typeof($temp) === "undefined" || typeof($temp) === "object") {
                } else {
                    localStorage.setItem("step",i);
                }
            }
            $(".jstree-children li").each(function () {
                if($(this).attr("userImg")==='0'){
                    $(this).find("a").eq(0).find("i").css("backgroundSize","100%").css("borderRadius","50%").css("width","22px").css("height","22px").css("marginTop","2px").css("marginLeft","1px")
                }

            })
        };

        jqueryMap.$htTree.on('select_node.jstree', function (e, data) {
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
                //展示出已经停止服务的客户列表信息
                configMap.contractauditGrid.clear().draw();
                configMap.contractauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            } else if (data.node.li_attr.BMBZ === "1") { //部门标志为true，代表为部门
                configMap.fwzt = 1; //正在服务的
                configMap.classType = 2; //代表部门
                configMap.other = data.node.li_attr.bmdm; //部门代码
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
        $('#search_Htbgauditay').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                jstree.jstree(true).search($('#search_Htbgauditay').val());
            }, 250);
        });

    };
	return {
		init: function (uuid,bz) {
			setJqueryMap(uuid);
			configMap.bz = bz;
			var tabid=$('#contractchange_id_div_' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid);

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
            configMap.ifSearch = '0';
            initOrganization();
			initContractauditGrid();
			jqueryMap.$content.find('#Search-btn').off('click').on('click', function () {
                configMap.ifSearch = '1';
                configMap.contractauditGrid.ajax.reload();
			});
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=log.js
	
	