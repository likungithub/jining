/**
 * 
 */
var logView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/Log/log/'
	};

	var getLog = function (id) {		
		$.ajax({
			url: configMap.path + configMap.dataUrl + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				$('#staffmembername').text(data.username);
				$('#companyname').text(data.companyname);					
				$('#module').text(data.module);
				$('#operatetime').text(moment(data.operatetime).format('YYYY-MM-DD HH:mm:ss'));
				$('#content').text(data.content);
				$('#ip').text(data.ip);
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
