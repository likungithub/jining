/**
 * 
 */
var loginlogView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/LoginLog/log/'
	};

	var getLog = function (id) {		
		$.ajax({
			url: configMap.path + configMap.dataUrl + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				$('#personname').text(data.personname);
				$('#loginaccount').text(data.loginaccount);					
				$('#logintime').text(moment(data.logintime).format('YYYY-MM-DD HH:mm:ss'));
				if (data.outtime==null){
					$('#outtime').text("");
				} else {
					$('#outtime').text(moment(data.outtime).format('YYYY-MM-DD HH:mm:ss'));
				}
				var name="";
				if (data.logintype === "001") {
					name = "PC";
				} else if (data.logintype === "002") {
					name = "Android";
				} else if (data.logintype === "003") {
					name = "IOS";
				}
				$('#logintype').text(name);
				$('#ip').text(data.ip);
				$('#mac').text(data.mac);
			},
			error: function () {
			}
		});
	};

	return {
		init: function (id) {
			getLog(id);
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=view.js
