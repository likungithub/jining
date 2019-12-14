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
var customergettingstartedView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/systemmanager/customergettingstarted/'
	};

	var getcustomergettingstarted = function (id) {
		$.ajax({
			url: configMap.path + configMap.dataUrl + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				$('#fileContent').text(data.code);
			},
			error: function () {
			}
		});
	};

	return {
		init: function (id) {
			getcustomergettingstarted(id);
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=view.js