/**
 * 
 */

var orgView = function(){
	'use strict';
	
	var configMap = {
			customerId:'2ebe98db-11cf-11e6-9a28-005056c00001',
			path: '',
			dataUrl: '/Log/org'
		};
	
	var initOrg = function(){
		var path=configMap.path + configMap.dataUrl;
		var $myTree = $('#orgTree');		
		var jstreeData = [];
		$myTree.jstree({
			core : {
				check_callback : true,
				themes : {
					responsive : false
				},
				data :
				{
					url:path
				}
			},
			search : {
				show_only_matches : true
			},
			plugins : [ 'wholerow', 'search' ]
		});
		return $myTree.on('select_node.jstree', function(event, node) {
			if (node.node.type !== 'node') {
				var state=node.node.id.substr(-1);
				if(state=="@")
				{
					 $.messager.model = { 
						        ok:{ text: "关闭", classed: 'btn-default' }
						      };
					  $.messager.alert("提示","不能选择部门!");
					  return;
				}
				else
				{
					window.parent.window.GetOrg(node.node.id,node.node.text);
				}
			}
		});
	}
	
	return {
		init: function () {		
			initOrg();			
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=orgView.js