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

var setUserOrgAuth = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/organization/organization/orgAuthTree',
		id: ''
	};

	// 全局Dom
	var jqueryMap = {
		$selectOrgAuthTree: null
	};

	var initOrgAuth = function () {
		jqueryMap.$selectOrgAuthTree.jstree({
			'plugins': ["types"],
			'core': {
				"multiple" : true, // 允许多选  
				"themes": {
					"responsive": false
				},
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
				}
			},
			'checkbox' : {  
                //级联选中  
                'three_state' : true,       
                'cascade' : 'undetermined' //有三个选项，up, down, undetermined; 使用前需要先禁用three_state  
            },
            'plugins' : ['checkbox', 'search']  //如果使用checkbox效率会降低, 'wholerow'会把线隐藏掉  
		});

		jqueryMap.$selectOrgAuthTree.on('loaded.jstree',function(){
			if (configMap.id != '') {
				var js = configMap.id.split(',');
                for (var i = 0; i < js.length; i++) {
                	$('#user-manager-orgAuthtree').jstree(true).select_node(js[i]);
                }
			}
		});
	};

	return {
		// 初始化
		init: function (id) {
			jqueryMap.$selectOrgAuthTree = $('#user-manager-orgAuthtree');
			configMap.id = id;
			initOrgAuth();
		},
		// 设置路径
		setPath: function (path) {
			configMap.path = '';
		},
		// 保存用户功能权限，参数为回掉函数
		getSelectedOrg: function (callback) {
			var selectedNodeIds = jqueryMap.$selectOrgAuthTree.jstree(true).get_selected();
			if (selectedNodeIds.length > 0) {
				var selectedId = ""; //选中的id(保存在user表中，且用来展示的)
				var savedId = ""; //只记录末级部门id，真正保存在部门权限表中的
				var selectedText = "";
				
				for (var i = 0; i < selectedNodeIds.length; i++) {
					var node = $('#user-manager-orgAuthtree').jstree("get_node", selectedNodeIds[i]); //获取到选中的节点			
					selectedId += selectedNodeIds[i] + ",";
					selectedText += jqueryMap.$selectOrgAuthTree.jstree(true).get_text(selectedNodeIds[i]) + ",";
					if (node.children.length > 0) { //节点为父级
						continue;
					} else {
						savedId += selectedNodeIds[i] + ",";
					}
				}
				var selectedNode = {
					success: true,
					id: selectedId.substr(0, selectedId.length -1),
					savedid : savedId.substr(0, savedId.length -1),
					text: selectedText.substr(0, selectedText.length -1)
				};
				callback(selectedNode);
			} else {
				var selectedNode = {
					success: false
				};
				callback(selectedNode);
			}
		}
	};
}();
//@ sourceURL=users/set-org.js