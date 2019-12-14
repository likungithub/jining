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

var dispatch = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        id: '',
        khbm: '',
        dataUrl: '/organization/organization/orgAndUser',
        reelectUrl: '/customermanage/dispatch/reelectDispatch.jsp',
        historyUrl: '/customermanage/dispatchmanager/history',
        updateUrl: '/customermanage/dispatchmanager/update',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        currentSelectedNode: null,
        role: [],
        insertUrl: '/customermanage/dispatchmanager/dispatch',
        getdispatchUrl: '/customermanage/dispatchmanager/getdispatch',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除" data-original-title="删除"><i class="icon iconfont icon-shanchu3  iconFontColor-10a0f7 iconFontSize"></i></a>',
        customerManageGrid: null,
        dispatchdata: null,
        rolejson: [],
        dispatchhistory:null
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $customerManageFrom: null,
        $blockTarget: null, 
        $customerManageTree: null,
        $customerManageDialog: null,
        $selectedRow: null,
        $customerManageDataTable: null,
        $blockTargett: null
    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#dispatchManage-manager-content');
        jqueryMap.$blockTarget = jqueryMap.$container;
        jqueryMap.$blockTargett = $('#dispatchSearch-manager-content');
        jqueryMap.$customerManageTree = $('#orgAndUser_manage_tree_' + uuid, jqueryMap.$container);
        jqueryMap.$customerManageDataTable = $('#orgAndUser_data_' + uuid, jqueryMap.$container);
    };

    /**
     * 模态框
     * @param title
     *              标题
     * @param url
     *              路径
     * @param type
     *              类型
     * @param func
     *              方法
     */
    var openModal = function (title, url, type, func) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$customerManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    /**
     * 1
     * 获取职员jstree
     */
    var initOrganization = function () {
        var jstree = jqueryMap.$customerManageTree.jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url': configMap.dataUrl
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
            'plugins': ["types", "expand","search"],
            "expand": {
                level: 5
            }
        }).on("load_node.jstree", function (e, d) {
            $(".orgAndUser_manage_tree_").on("open_node.jstree", function () {
                getTreeNum();
            });
            $(".orgAndUser_manage_tree_").bind("select_node.jstree", function (e, data) {
                data.instance.toggle_node(data.node);
                getTreeNum();
            });
            getTreeNum();
        });
        var getTreeNum = function(){
            for (var i = 0; i < $(".orgAndUser_manage_tree_ li").length; i++) {
                var $temp = $(".orgAndUser_manage_tree_ li").eq(i).attr("userimg");
                if (typeof($temp) === "undefined" || typeof($temp) === "object") {
                } else {
                    localStorage.setItem("step",i);
                    localStorage.setItem("userImg",$temp);
                }
            }
            $(".jstree-children li").each(function () {
                if($(this).attr("userImg")==="0"){
                    $(this).find("a").eq(0).find("i").css("backgroundSize","100%").css("borderRadius","50%").css("width","22px").css("height","22px").css("marginTop","2px").css("marginLeft","1px")
                }
            })
        };
        //输入框输入定时自动搜索
        var to = false;
        $('#search_khpg').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                jstree.jstree(true).search($('#search_khpg').val());
            }, 250);
        });
        //点击jstree中的节点
        jqueryMap.$customerManageTree.on('select_node.jstree', function (e, data) {
            if (data.node.parent === '#') {
                $('#btnNewOrg', jqueryMap.$container).off();
                $('#btnNewOrg', jqueryMap.$container).parent('li').addClass('disabled');
            } else {
                $('#btnNewOrg', jqueryMap.$container).off().on('click', function () {
                    addNewOrg();
                });
                $('#btnNewOrg', jqueryMap.$container).parent('li').removeClass('disabled');
            }
            configMap.currentSelectedNode = data.node;
            if(configMap.currentSelectedNode===null || configMap.currentSelectedNode.original.type === undefined || configMap.currentSelectedNode.original.type !== "people"){ //所选节点并非职员
			}else{
				//所选节点为职员，获取该职员的派工角色
				$('[name="dispatch_title_div"]',jqueryMap.$container).css("display","block");
				$('[name="dispatch_title"]',jqueryMap.$container).html("将当前客户派给"+configMap.currentSelectedNode.original.li_attr.userText);
			}
        });
    };

    /**
     * 2
     * 初始化派工表格
     */
    var initOrgAndUserGrid = function () {
        configMap.customerManageGrid = jqueryMap.$customerManageDataTable.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [5],
            "autoWidth": false,
            "columns": [
                {"data": "gsmc",className:'text-center'},
                {"data": "ygxm",class:'text-center'},
                {"data": "bmmc",class:'text-center'},
                {"data": "pgjs_mc",class:'text-center'},
                {
                    "render": function () {
                        return configMap.deleteBtn_html;
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
                var delContainer = $('[data-type="del"]', jqueryMap.$customerManageDataTable);
                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除派工信息？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": deldispatch
                    });
                }
            }
        });
    };

    /**
     * 3
     * 初始化派工数据
     */
    var initOrgAndUserData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在获取数据，请稍候...'
        });
        //客户编码
        var data = {
            khxx: JSON.parse(configMap.khbm)
        };
        $.ajax({
            url: configMap.getdispatchUrl,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
                configMap.dispatchdata = result;
                App.unblockUI(jqueryMap.$blockTarget);
                configMap.customerManageGrid.clear().draw();
                configMap.customerManageGrid.rows.add(result).draw();
                setTimeout(function () {
                    //在加载完派工数据后，获取当前所选客户的派工历史
                    getdispatchsearch();
                }, 50);
            }
        });
    };

    /**
     * 4
     * 派工历史
     */
    var getdispatchsearch = function (){
    	configMap.dispatchhistory = $("#dispatch_data", $("#dispatchSearch-manager-content")).DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "ajax": {
                "url": configMap.historyUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                	var khbm = '';
                	var flag = "";
                	for(var i = 0; i < JSON.parse(configMap.khbm).length;i++){
                		khbm += flag + JSON.parse(configMap.khbm)[i].khxx;
                		flag = ";";
                	}
                	data.khbm = khbm;
                }
            },
			"columns": [	
	            {"data": "gsmc",class:'text-left'},
	            {"data": "ygxm",class:'text-center'},
	            {"data": "pgjs_mc",class:'text-center'},
	            {"data": "bmmc",class:'text-center'},
	            {
	            	"data": "lrrq",
                    class:'text-center',
	            	"render":function (data){
	            		if(data !== null && data !== ""){
	            			return moment(data).format('YYYY-MM-DD');
	            		} else {
	            			return "";
	            		}
	            	}
	            },
	            {
	            	"data": "scbz",
                    class:'text-center',
	            	"render": function (data){
	            		if(data===0){
	            			return "派工中";
	            		} else {
	            			return "已删除";
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
			}
		});
    };

    /**
     * 5
     * 保存派工
     * @param callback
     *             成功状态
     */
    var saveDispatch = function (callback) {
        //判断所选择的jstree节点是否为职员
        if (configMap.currentSelectedNode === null || configMap.currentSelectedNode.original.type === undefined || configMap.currentSelectedNode.original.type !== "people") {
            Messenger().post({
                message: "请选择职员！",
                id: "dispatchone",
                type: 'error'
            });
            callback(false);
        } else {
            var blockTarget = jqueryMap.$container.closest(".modal-body");
            App.blockUI({
                target: blockTarget,
                boxed: true,
                message: '正在保存数据...'
            });
            var data = {
                staffcode: configMap.currentSelectedNode.id,
                staffname: configMap.currentSelectedNode.li_attr.userText,
                department: configMap.currentSelectedNode.parent,
                khbm: JSON.parse(configMap.khbm)
            };
            var url = configMap.insertUrl;
            var requestType = 'POST';
            $.ajax({
                url: url,
                type: requestType,
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function (datas) {
                    App.unblockUI(blockTarget);
                    if (datas.success) {
                        initOrgAndUserData();
                        //首页派工提醒
                        $.ajax({
                            url: '/systemmanager/messageremind/searchCount',
                            dataType: 'JSON',
                            type: 'GET',
                            success: function (data) {
                                $('#pgtxsl').text(data);
                            },
                            error: function () {
                                $('#pgtxsl').text(0);
                            }
                        });
                        callback(true);
                    } else {
                        App.alert({
                            container: blockTarget,
                            place: 'prepend',
                            type: 'danger',
                            message: datas.message,
                            icon: 'fa fa-warning'
                        });
                        callback(false);
                    }
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$chargeForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            });
        }
    };

    /**
     * 6
     * 删除派工
     * @param event
     * @param element
     */
    var deldispatch = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        var rowIndex = configMap.customerManageGrid.cell(element.parent()).index().row;
        var id = configMap.customerManageGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.insertUrl + "/" + id,
            type: 'DELETE',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    //重新加载数据
                    initOrgAndUserData();
                    Messenger().post("删除成功!");
                }
                else {
                    Messenger().post({
                        message: result.message,
                        id: "dispatchone",
                        type: 'error'
                    });
                }
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    return {
        // 初始化
        init: function (uuid) {
            //获取从客户360页面存放在session中的客户信息
            sessionStorage.getItem("khxx");
            //将客户信息放入全局参数中
            configMap.khbm = sessionStorage.getItem("khxx");
            setJqueryMap(uuid);
            //设置页面布局
            setTimeout(function () {
                var layout = jqueryMap.$container.layout({
                    center__onresize: App.initLayoutContentScrollbar,
                    west__onresize: App.initLayoutContentScrollbar,
                    west__size: 200
                });
                App.initLayoutContentScrollbar('west', $('.ui-layout-pane-west', jqueryMap.$container));
                App.initLayoutContentScrollbar('center', $('.ui-layout-pane-center', jqueryMap.$container));
                $("#dispatchManage-manager-content").css("height", "450px");
                $(".portlet-body", $('.ui-layout-pane-center', jqueryMap.$container)).css("height", "338px");
                $(".portlet-scroller", $('.ui-layout-pane-center', jqueryMap.$container)).css("height", "290px");
                $(".slimScrollDiv", $('.ui-layout-pane-center', jqueryMap.$container)).css("height", "290px");
                $(".portlet-scroller", $('.ui-layout-pane-west', jqueryMap.$container)).css("height", "370px");
                $(".slimScrollDiv", $('.ui-layout-pane-west', jqueryMap.$container)).css("height", "370px");
            }, 10);
            //左侧jstree搜索职员
            $('#searchstaff', jqueryMap.$container).on('change', function () {
                var key = $(this).val();
                var to = false;
                if (to) {
                    clearTimeout(to);
                }
                to = setTimeout(function () {
                    jqueryMap.$customerManageTree.jstree(true).search(key);
                }, 10);
            });
            //tab标签页切换
            $('#dispatch_' + uuid).on('click', function () {
                $("#dispatchManage-manager-content").css("display", "block");
                $("#dispatchSearch-manager-content").css("display", "none");
            });
            //tab标签页切换
            $('#dispatchSearch_' + uuid).on('click', function () {
                $("#dispatchManage-manager-content").css("display", "none");
                $("#dispatchSearch-manager-content").css("display", "block");
            });
            //初始化职员jstree
            initOrganization();
            //初始化派工表格
            initOrgAndUserGrid();
            //初始化表格信息
            initOrgAndUserData();
        },
        saveDispatch: function (callback) {
            saveDispatch(callback);
        }
    };
}();
//@ sourceURL=org/org.js