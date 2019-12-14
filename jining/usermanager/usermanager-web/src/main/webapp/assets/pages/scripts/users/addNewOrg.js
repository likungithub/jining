var addNewOrg = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/organization/organization/userAddOrg',
		id: ''
	};

	// 全局Dom
	var jqueryMap = {
		$addOrgForm: null
	};

	var setJqueryMap = function () {
		jqueryMap.$addOrgForm = $('#addOrgForm');
	};

	var saveOrg = function (callback) {
	    var data = {
	      name: jqueryMap.$addOrgForm.find('input[name=orgName]').val(),
	      remark: jqueryMap.$addOrgForm.find('input[name=orgRemark]').val()
	    };
	    if(data.name == "" || data.name == null || data.name == "undefined"){
			App.alert({
				container: jqueryMap.$addOrgForm.closest(".modal-body"),
				place: 'prepend',
				type: 'danger',
				message: '部门名称不得为空！',
				icon: 'fa fa-warning'
			});
			return false;
		}

	    $.ajax({
	      url: configMap.path + configMap.dataUrl,
	      type: 'POST',
	      contentType: 'application/json; charset=utf-8',
	      dataType: 'JSON',
	      data: JSON.stringify(data),
	      success: function (result) {
	        if (result.errmsg) {
				App.alert({
					container: jqueryMap.$addOrgForm.closest(".modal-body"),
					place: 'prepend',
					type: 'danger',
					message: result.errmsg,
					icon: 'fa fa-error'
				});
				return false;
			}
	        else {
	        	callback(true);
	        }
	      },
	      error: function (ex, e, ee) {
				App.alert({
					container: jqueryMap.$addOrgForm.closest(".modal-body"),
					place: 'prepend',
					type: 'danger',
					message: '保存数据失败！',
					icon: 'fa fa-error'
				});
				return false;
			}
	    });
	  };


	return {
		// 初始化
		init: function () {
			setJqueryMap();

		},
		// 保存雇员信息，参数为回掉函数
		saveOrg: function (callback) {
			saveOrg(callback);
		}
	};
}();
//@ sourceURL=roles/edit.js