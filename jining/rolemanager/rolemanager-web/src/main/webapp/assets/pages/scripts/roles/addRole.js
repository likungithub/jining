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

var addRole = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/role/roles/role',
		id: ''
	};

	// 全局Dom
	var jqueryMap = {
		$addRoleForm: null
	};

	var setJqueryMap = function () {
		jqueryMap.$addRoleForm = $('#addRoleForm');
	};

	var saveRole = function (callback) {
		
		var data = {
	      name: jqueryMap.$addRoleForm.find('input[name=roleName]').val(),
	      remark: jqueryMap.$addRoleForm.find('input[name=roleRemark]').val()
	    };
		
		var AppAlert = function(message){
			App.alert({
				container: jqueryMap.$addRoleForm.closest(".modal-body"),
				place: 'prepend',
				type: 'danger',
				message: message,
                closeInSeconds:3,
				icon: 'fa fa-warning'
			});
		}
		
		if(data.name == "" || data.name == null || data.name == "undefined"){
			App.alert({
				container: jqueryMap.$addRoleForm.closest(".modal-body"),
				place: 'prepend',
				type: 'danger',
				message: '角色名称不得为空！',
				icon: 'fa fa-warning'
			});
			return false;
		} 
		var thisRoleNameDom = document.getElementsByName('roleName')[0];
        var textRoleNameErro = TextValidate(thisRoleNameDom,AppAlert);
        if(!textRoleNameErro){
        	App.unblockUI(blockTarget);
        	return;
        }
		
		var blockTarget = jqueryMap.$addRoleForm.closest(".modal-body");
		App.blockUI({
			target: blockTarget,
			boxed: true,
			message: '正在保存数据...'
		});
		$.ajax({
			url: configMap.path + configMap.dataUrl,
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			dataType: 'JSON',
			data: JSON.stringify(data),
			success: function (result) {
				if (result.success) {
					App.unblockUI(blockTarget);
					callback(result);
				} else {
					App.unblockUI(blockTarget);
					App.alert({
						container: jqueryMap.$addRoleForm.closest(".modal-body"),
						place: 'prepend',
						type: 'danger',
						message: '角色已存在！',
						icon: 'fa fa-warning'
					});
					callback(false);
				}
			},
			error: function () {
				App.unblockUI(blockTarget);
				App.alert({
					container: jqueryMap.$addRoleForm.closest(".modal-body"),
					place: 'prepend',
					type: 'danger',
					message: '保存失败！',
					icon: 'fa fa-warning'
				});
				callback(false);
			}
		});
	};


	return {
		// 初始化
		init: function () {
			setJqueryMap();

		},
		// 保存雇员信息，参数为回掉函数
		saveRole: function (callback) {
			saveRole(callback);
		}
	};
}();
//@ sourceURL=roles/edit.js