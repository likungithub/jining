var dispatchEdit = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',
	    dataUrl: '/organization/organization/orgAndUser',//取组织
	    saveUrl: '/statisticalanalysis/dispatch/savedispatch',//保存
	    currentSelectedNode: null,
	    selectedNodeId: null,//新增评论获取选择ID
	    id: ''
	};

	// 全局Dom
	var jqueryMap = {
		$container: null,
	    $customerManageFrom: null,
	    $blockTarget: null,
	    $customerManageTree: null,
	    $customerManageDialog: null,
	    $selectedRow: null
	};
		
	var setJqueryMap = function () {
	    jqueryMap.$container = $('#dispatch-manager-content-edit');
	    jqueryMap.$blockTarget = jqueryMap.$container;
	    jqueryMap.$customerManageTree = $('#orgAndUser_manage_tree_edit', jqueryMap.$container);
	};

	  //初始化Tree
	var initOrganization = function () {
	    jqueryMap.$customerManageTree.jstree({
	      	'core': {
				"themes": {
					"responsive": false
				},
				"check_callback": true,
				'data': {
					'url': configMap.path + configMap.dataUrl
				}
			},
			"types": {
				"default": {
					"icon": "fa fa-folder icon-state-warning icon-lg"
				},
				"file": {
					"icon": "fa fa-file icon-state-warning icon-lg"
				},
				"people": {
					"icon": "fa fa-user icon-state-warning icon-lg"
				}
			},
			'plugins': ["types", "expand","wholerow"],
			"expand": {
				level: 2
			}
		}).on("load_node.jstree",function(e,d){
            $('#orgAndUser_manage_tree_edit').on("open_node.jstree", function (e, data) {
				getTreeNum();
            });
			$("#orgAndUser_manage_tree_edit").bind("select_node.jstree", function (e, data) {
				data.instance.toggle_node(data.node);
				getTreeNum();
		  	});
		  	getTreeNum();
			setTimeout(function () {
			  	$(".jstree-container-ul").removeClass("jstree-no-dots")
		  	},50)
	  	});
	  	var getTreeNum = function () {
		  	for (var i = 0; i < $("#orgAndUser_manage_tree_edit li").length; i++) {
			  	var $temp = $("#orgAndUser_manage_tree_edit li").eq(i).attr("userimg");
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
	  	var clearTreeNum = function(){
		  	for(var i = 0;i < $("#orgAndUser_manage_tree_edit li").length;i++){
			  	var $temp = $("#orgAndUser_manage_tree_edit li").eq(i).attr("userimg");
				if(typeof($temp)=="undefined" || typeof($temp)=="object"){
			  	}else{
				  	$("#orgAndUser_manage_tree_edit li").eq(i).find("i").eq(1).remove();
				  	$("#orgAndUser_manage_tree_edit li").eq(i).find("a").eq(0).find("img").remove();
				  	$("#orgAndUser_manage_tree_edit li").eq(i).find("a").eq(0).find("span").remove();
			  	}
		  	}
	  	};
	    //点击事件
	    jqueryMap.$customerManageTree.on('select_node.jstree', function (e, data) {
	      	if (data.node.parent === '#') {
	        	$('#btnNewOrg', jqueryMap.$container).off();
	        	$('#btnNewOrg', jqueryMap.$container).parent('li').addClass('disabled');
	        	configMap.selectedNodeId = null; //点击树父节点初始化变量
	      	} else {
	        	$('#btnNewOrg', jqueryMap.$container).off().on('click', function () {
	        	});
	        	$('#btnNewOrg', jqueryMap.$container).parent('li').removeClass('disabled');
	        	configMap.selectedNodeId = data.node; //点击树中的子节点再取员工ID
	      	}
	    });
  	};

	//保存派工
  	var savedispatch = function (callback) {
		if(configMap.selectedNodeId==null){
			Messenger().post({message: '请选择员工！', type: 'error'});
			}else{
				App.blockUI({
					target: jqueryMap.$blockTarget,
					boxed: true,
					message: '正在保存数据，请稍候...'
				});
		        var data = {
	        		zyid: configMap.selectedNodeId.id,
	        		id:configMap.id
		        };

		        var url = configMap.saveUrl;
		        var requestType = 'PUT';
				$.ajax({
		            url: url,
		            type: requestType,
		            contentType: 'application/json; charset=utf-8',
		            data: JSON.stringify(data),
		            success: function (datas) {
		            	App.unblockUI(jqueryMap.$blockTarget);
		            	if(datas.success){
		            		Messenger().post("转派成功!");
		            		callback(true);
		            	} else {
		            		Messenger().post({message: datas.message, type: 'error',id:"falsemessage"});
		            		callback(false);
		            	}
		            },
		            error: function () {
		            	App.unblockUI(jqueryMap.$blockTarget);
		            	Messenger().post({message: '转派失败！', type: 'error'});
		                callback(false);
		            }
		        });
			}
	  };

  	return {
		// 初始化
	    init: function (id) {
	      	configMap.id = id;
	      	setJqueryMap();
	      	initOrganization();
	    },
	    // 设置路径
	    setPath: function () {
	      	configMap.path = '';
	    },
	    savedispatch: function (callback) {
			savedispatch(callback);
        }
	  };
}();
//@ sourceURL=edit.js