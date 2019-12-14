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
		dataUrl: '/costprojectmanagement/findById/',
			
	};
	var jqueryMap = {
			$view: null
		};

		var setJqueryMap = function () {
			jqueryMap.$view = $('#costprojectmanagementView');
	    };
	var getEmployee = function (id) {
		$.ajax({
			url: configMap.path + configMap.dataUrl + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				console.info(data);
				jqueryMap.$view.find('#name').text(data.serviceName);
				if(data.businessType=="001"){
                    jqueryMap.$view.find('#businessType').text('常规业务');
				}else{
                    jqueryMap.$view.find('#businessType').text('一次性业务');
				}
				jqueryMap.$view.find('#charge').text(data.payStandard.toFixed(2));
				jqueryMap.$view.find('#discount').text(data.costDiscount+'%');
				jqueryMap.$view.find('#true').text(data.actualCharge.toFixed(2));
				jqueryMap.$view.find('#role').text(data.serviceRegulations||"无");
				if(data.photoLink == null){
                    jqueryMap.$view.find('#photo').html('<span style="display: inline-block;padding-top: 7px">没有上传</span>');
				}else{
					jQuery.type(data.photoLink);
                    jqueryMap.$view.find('#photo').html("<img alt='图片' src='"+ data.photoLink+"' class='imgqdt'/>");
				}

				jqueryMap.$view.find('#memo').text(data.memoInformation||'无');
			},
			error: function () {
			}
		});
	};

	return {
		init: function (id) {
			getEmployee(id);
			setJqueryMap();
            jqueryMap.$view.closest(".modal-content").css("width", "600px");
            jqueryMap.$view.closest(".modal-dialog").css({"cssText":"width:600px !important"});
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=commonproblemview.js