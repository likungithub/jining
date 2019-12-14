/**
 * 
 */
var receiptlist = function () {
	'use strict';

    /**
	 * 全局属性参数
     * @type {{path: string, dataUrl: string, datatablesLanguageFile: string, nowShzt: null, nowddbh: null,
      *         nowSfzt: null, auditBtn_html: string, receiptBtn_html: string, ReminderBtn_html: string,
      *         SplitBtn_html: string, deleteBtn_html: string, khbm: string, type: string}}
     */
	var configMap = {
		path: '',
		dataUrl: '/charge/receiptlist',
        treeUrl: '/organization/organization/orgAndUserAuth',
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		badebtsUrl: '/charge/badebts',
        chargeauditGrid:null,
        classType: '',
        currentSelectedNode: null,
        fwzt: '',
        other: '',
        ifSearch:'0'
	};

    /**
	 * 全局参数
     * @type {{$blockTarget: null, $chargeauditDialog: null, $chargeauditTable: null, $chargeauditstarDate: null,
     * 			$chargeauditendDate: null, $content: null, $chargeDialog: null}}
     */
	var jqueryMap = {
		$blockTarget: null,
		$chargeauditDialog: null,
		$chargeauditTable:null,
		$chargeauditstarDate:null,
		$chargeauditendDate:null,
		$content:null,
		$chargeDialog:null,
        $receiptTree:null
	};

    /**
	 * 全局参数赋值
     * @param uuid
     */
	var setJqueryMap = function (uuid) {
		jqueryMap.$blockTarget = $('body');
		jqueryMap.$content = $('#receipt_'+uuid);
		jqueryMap.$manualdata=jqueryMap.$content.find('table#receiptlist_data');
		jqueryMap.$chargeauditstarDate=jqueryMap.$content.find('div#starDate_div');
		jqueryMap.$chargeauditendDate=jqueryMap.$content.find('div#endDate_Div');
        jqueryMap.$receiptTree = $('#receipt_tree', jqueryMap.$content);
	};

    /**
	 * 初始化收费台账
     */
	var initchargeauditGrid = function () {
		configMap.chargeauditGrid = jqueryMap.$manualdata.DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, 																						//屏蔽排序
            "searching": false,																						//屏蔽datatales的查询框
            "processing": true, 																						// 打开数据加载时的等待效果
			"serverSide": true, 																						// 打开后台分页
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    var text = $('[name="khmc"]', jqueryMap.$content).val();
                    if (text == null || text == '' || text == 'undefined') {
                        configMap.ifSearch = '0';
                    }
                    var khmc = $('[name="khmc"]', jqueryMap.$content).val();
                    var starDate;
                    var endDate;
                    if($('.clickMore',jqueryMap.$content).attr("data")==="1"){
                        starDate = $('[name="starDate"]', jqueryMap.$content).val();
                        endDate = $('[name="endDate"]', jqueryMap.$content).val();
                    } else {
                        starDate = '';
                        endDate = '';
                    }
                    data.khmc = khmc;
                    data.starDate = starDate;
                    data.endDate = endDate;
                    data.classType = configMap.classType;
                    data.other = configMap.other;
                    data.fwzt = configMap.fwzt;
                    data.ifSearch = configMap.ifSearch;
                    configMap.ifSearch = '0';
                }
            },
			"columns": [
				{
					className:'text-left',
					"data": "GSMC",
					"render": function (data) {
						return '<label title="' + data + '" data-placement="bottom" data-toggle="tooltip" ' +
                            'data-original-title="' + data + '">' + data + '</label>';
					}
				},
	            {
	             	className:'text-center',
	             	"data": "DDBH",
					"render":function (data){
	             		return '<label title="' + data + '" data-placement="bottom" data-toggle="tooltip" ' +
                            'data-original-title="' + data + '">' + data + '</label>';
					}
	            },
                {
                    className:'text-center',
                    "data": "TJSJ",
                    "render":function (data){
                        return '<label title="' + moment(data).format('YYYY-MM-DD') + '" data-toggle="tooltip"' +
                            ' data-placement="bottom" data-original-title="' + moment(data).format('YYYY-MM-DD') +
                            '">' + moment(data).format('YYYY-MM-DD') + '</label>';
                    }
                },
	            {
                    className:'text-center',
	            	"data": "SFXM"
	            },
	            {
	            	className:'text-right',
	            	"data": "TCJG",
	            	"render": function (data){
	            	    return data.toFixed(2);
	            	}
	            },
	            {
	            	className:'text-right',
	            	"data": "JFJE",
                    "render": function (data){
                        return data.toFixed(2);
                    }
	            },
	            {
	            	className:'text-center',
	            	"data": "DDZT",
	            	"render": function (data){
	            		if(data===0){
	            		    return '未付款'
                        } else {
	            		    return '已支付';
                        }
	            	}
	            },
				{
	            	className:'text-center',
					"render": function (data, type, row) {
						return '<a href="/customermanage/charge/receipt.jsp?ddbh=' + row.DDBH + '"' +
                            ' data-original-title="查看收据" title="查看收据" data-toggle="tooltip"' +
                            ' data-placement="bottom" target="_blank"><i class="icon iconfont icon-shouju' +
                            ' iconFontColor-10a0f7"></i></a>';
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
                    .column( 5 )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );
                $( api.column( 5 ).footer() ).html(
                    number(total)
                );//垫付金额
                var Ttotal = api
                    .column( 4 )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );
                $( api.column( 4 ).footer() ).html(
                    number(Ttotal)
                );//套餐价格

            },
			"drawCallback": function (result) { 																		// 数据加载完成后执行
                $('[data-toggle="tooltip"]').tooltip();
			}
		});
	};

    var initOrganization = function () {
        var jstree = jqueryMap.$receiptTree.jstree({
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
            $('#receipt_tree').on("open_node.jstree", function (e, data) {
                getTreeNum();
            });
            getTreeNum();
            $("#receipt_tree").bind("select_node.jstree", function (e, data) {

                if (data.node.id == 'workCustomer') {
                    $.each(data.node.children, function (i, v) {
                        $('#receipt_tree').jstree('open_node', v);
                    });
                }
                data.instance.toggle_node(data.node);
                getTreeNum();
            });


        });
        var getTreeNum = function () {
            for (var i = 0; i < $("#receipt_tree li").length; i++) {
                var $temp = $("#receipt_tree li").eq(i).attr("userimg");
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

        jqueryMap.$receiptTree.on('select_node.jstree', function (e, data) {
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
                configMap.chargeauditGrid.clear().draw();
                configMap.chargeauditGrid.ajax.reload();
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
                configMap.chargeauditGrid.clear().draw();
                configMap.chargeauditGrid.ajax.reload();
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
                configMap.chargeauditGrid.clear().draw();
                configMap.chargeauditGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
        //jstree定时搜索功能
        //输入框输入定时自动搜索
        var to = false;
        $('#search_Chargeay').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                jstree.jstree(true).search($('#search_Chargeay').val());
            }, 250);
        });

    };
    
	return {
		init: function (uuid) {
			setJqueryMap(uuid);
            var tabid=$('#receipt_'+uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid,receiptlist);
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
            initchargeauditGrid();																						//初始化收费台账表格
            //更多搜索条件
            $("#receiptDiv .clickMore",jqueryMap.$content).on("click",function () {
                if($(this).attr("data")==0){
                    $(this).next().removeClass("rotate1");
                    $(this).attr("data",1);
                }else{
                    $(this).next().addClass("rotate1");
                    $(this).attr("data",0);
                }
                $("#receiptDiv .openMore",jqueryMap.$content).toggle(500);
            });
			jqueryMap.$content.find('.Search-btn').off('click').on('click', function () {                        //点击查询
                configMap.ifSearch = '1';
				configMap.chargeauditGrid.ajax.reload();
			});

			$('[name="khmc"]',jqueryMap.$content).keydown(function() {										//输入框绑定回车事件
		        if(event.keyCode == "13") {																			//判断如果按下的是回车键
		        	$(".Search-btn",jqueryMap.$content).click();
		        }
			});
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=chargeorderlist.js
	
	