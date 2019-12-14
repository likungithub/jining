/**
 * 
 */

var menuView = function(){
	'use strict';
	
	var configMap = {
			customerId:'e4ce7d8f-f9b6-424a-97b3-60a997c49cce',
			path: '',
			dataUrl: '/Log/menu'
		};
	
	var initMenu = function(){
		var path=configMap.path + configMap.dataUrl;
		var $myTree = $('#menuTree');		
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
				window.parent.window.GetMenu(node.node.id,node.node.text);
			}
		});
	}
	
	return {
		init: function () {		
			initMenu();			
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=menuView.js