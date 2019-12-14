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

var roleEdit = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/role/roles/role',
		id: '',
		roleName : ''
	};

	// 全局Dom
	var jqueryMap = {
		$editRoleForm: null
	};

	var setJqueryMap = function () {
		jqueryMap.$editRoleForm = $('#editRoleForm');
	};

	var saveRole = function (callback) {
		var rolename = jqueryMap.$editRoleForm.find('input[name=roleName]').val();
		var data = {
	      name: rolename,
	      remark: jqueryMap.$editRoleForm.find('input[name=roleRemark]').val()
	    };
		var AppAlert = function(message){
			App.alert({
				container: jqueryMap.$editRoleForm.closest(".modal-body"),
				place: 'prepend',
				type: 'danger',
				message: message,
                closeInSeconds:3,
				icon: 'fa fa-warning'
			});
		}
		if(data.name == "" || data.name == null || data.name == "undefined"){
			App.alert({
				container: jqueryMap.$editRoleForm.closest(".modal-body"),
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
		var ifFirst = true;
		if (configMap.roleName != rolename) { //名称改变了
			ifFirst = false;
		}
		
		var blockTarget = jqueryMap.$editRoleForm.closest(".modal-body");
		App.blockUI({
			target: blockTarget,
			boxed: true,
			message: '正在保存数据...'
		});
		$.ajax({
			url: '/role/roles/updateRoleByJsdm?jsdm=' + configMap.id + '&ifFirst=' + ifFirst,
			type: 'PUT',
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
						container: jqueryMap.$editRoleForm.closest(".modal-body"),
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
					container: jqueryMap.$editRoleForm.closest(".modal-body"),
					place: 'prepend',
					type: 'danger',
					message: '保存失败！',
					icon: 'fa fa-warning'
				});
				callback(false);
			}
		});
	};

	var getRole = function (id) {
		$.ajax({
			url: '/role/roles/getRoleByJsdm?jsdm=' + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				configMap.roleName = data.name;
				jqueryMap.$editRoleForm.find('[name="roleName"]').val(data.name);
				jqueryMap.$editRoleForm.find('[name="roleRemark"]').val(data.remark);
			},
			error: function () {
				bootbox.alert('获取角色信息失败！');
			}
		});
	};


	return {
		// 初始化
		init: function (id) {
			configMap.id = id;
			setJqueryMap();

			if (configMap.id) {
				getRole(configMap.id);
			}
		},
		// 保存雇员信息，参数为回掉函数
		saveRole: function (callback) {
			saveRole(callback);
		}
	};
}();
//@ sourceURL=roles/edit.js