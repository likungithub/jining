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

var setUserOrg = function () {
	'use strict';

    /**
	 * 全局属性参数
     * @type {{path: string, dataUrl: string, id: string, currentSelectedNode: string}}
     */
	var configMap = {
		path: '',
		dataUrl: '/organization/organization/getDLOrg',
		id: '',
		currentSelectedNode: ''
	};

    /**
	 * 全局Dom
     * @type {{$selectOrgTree: null}}
     */
	var jqueryMap = {
		$selectOrgTree: null
	};

    /**
	 * 获取部门jstree
     */
	var initOrg = function () {
		jqueryMap.$selectOrgTree.jstree({
			'plugins': ["types", "checkbox"],
            "checkbox": {
                "keep_selected_style": false,																		//是否默认选中
                "three_state": true,																					//父子级别级联选择
                "tie_selection": false
            },
			'core': {
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
			}
		}).on('loaded.jstree',function(){																			//加载jstree时执行
			if (configMap.id !== '' && configMap.id !== 'all') {														//选择之后再次进入此页面，判断选中的值
				for(var i=0;i<configMap.id.split(',').length;i++){
                    jqueryMap.$selectOrgTree.jstree(true).check_node(configMap.id.split(',')[i]);					//将之前选中的值设置为被选中
				}
			} else {
                jqueryMap.$selectOrgTree.jstree(true).check_all();
			}
		});
	};

	return {
		init: function (id) {
			jqueryMap.$selectOrgTree = $('#user-manager-orgtreedata');
			configMap.id = id;
			initOrg();
		},

		// 设置路径
		setPath: function (path) {
			configMap.path = '';
		},

		// 保存用户功能权限，参数为回掉函数
		getSelectedOrg: function (callback) {
			var checkedBm = jqueryMap.$selectOrgTree.jstree().get_checked();
			var selectedNodeIds = jqueryMap.$selectOrgTree.jstree();
			var obj = selectedNodeIds._model.data;
			var bmmc = '',falg = '';
            if(checkedBm.length===0){
                App.alert({
                    container: jqueryMap.$selectOrgTree.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '请选择部门！',
                    icon: 'fa fa-warning'
                });
                return false;
            } else {
                for(var i=0;i<checkedBm.length;i++){
                    bmmc += falg + obj[checkedBm[i]].text;
                    falg = ',';
                }
                var bmxx = {
                    mc:bmmc,
                    dm:checkedBm
                };
                callback(bmxx);
			}
		}
	};
}();
//@ sourceURL=users/set-org.js