/**
 * 
 */
var behaviorlogView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/BehaviorLog/log/'
	};

	var getLog = function (id) {		
		$.ajax({
			url: configMap.path + configMap.dataUrl + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				$('#time').text(data.time);
				$('#ip').text(data.ip);					
				if (data.outtime==null){
					$('#outtime').text("");
				} else {
					$('#outtime').text(moment(data.outtime).format('YYYY-MM-DD HH:mm:ss'));
				}
				$('#address').text(data.address);
				$('#device').text(data.device);
				$('#browser').text(data.browser);
				$('#resolution').text(data.resolution);
				$('#referrer').text(data.referrer);
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
