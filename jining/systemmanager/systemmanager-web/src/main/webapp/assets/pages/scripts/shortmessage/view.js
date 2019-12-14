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
		dataUrl: '/shortmessage/view/'
	};

	var getEmployee = function (id) {
		$.ajax({
			url: configMap.path + configMap.dataUrl + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				$('#nsrsbh').text(data.nsrsbh);
				$('#nsrmc').text(data.jsr_dm);
				$('#jsrdh').text(data.bfsr);
				$('#fsr_dm').text(data.fsr_dm);
				$('#dljgbm').text(data.dljg_bm);
				$('#type').text(data.dxlx);
				$('#messageContent').text(data.dxnr);
				$('#sendStat').text(data.fszt);
				$('#sendTime').text(moment(data.fssj).format('YYYY-MM-DD'));
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
//@ sourceURL=commonproblemview.js