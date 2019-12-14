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

/*global $, App, moment */
var employeeView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/statisticalanalysis/employee/'
	};

	var getEmployee = function (id) {
		$.ajax({
			url: configMap.path + configMap.dataUrl + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				$('#name').text(data.name);
				$('#code').text(data.code);
				$('#sex').text(data.sex);
				$('#age').text(data.age);
				$('#birthday').text(moment(data.birthday).format('YYYY-MM-DD'));
			},
			error: function () {
			}
		});
	};

	return {
		init: function (id) {
			getEmployee(id);
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=view.js