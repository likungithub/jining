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
var appsysteminformationView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/appSystemInformation'
	};

	var jqueryMap = {
		$appsysteminformationView: null
	};

	var setJqueryMap = function () {
		jqueryMap.$appsysteminformationView = $('#appsysteminformationView');
    };

	var getAppSystemInformation = function (id) {
		$.ajax({
			url: configMap.path + configMap.dataUrl + '/getAppSystemInformationById?id=' + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				console.log("数据："+data)
				var phoneType = '';
				if (data.phoneType == '0') {
					phoneType = 'ios';
				} else if (data.phoneType == '1') {
					phoneType = 'android';
				} else if (data.phoneType == '2') {
					phoneType = '所有移动端';
				}
                else if (data.phoneType == '3') {
                    phoneType = 'PC端';
                }
				var clientType="";
				if(data.clientType=="0"){
                    clientType="代理APP";
				}
				else if(data.clientType=="1"){
                    clientType="客户APP";
				}
                else{
                    clientType="财云管家";
                }
                jqueryMap.$appsysteminformationView.find('#phoneType').text(phoneType);
                jqueryMap.$appsysteminformationView.find('#informationType').text(data.informationTypeName);
                jqueryMap.$appsysteminformationView.find('#messageJj').html(data.messageJj);
                jqueryMap.$appsysteminformationView.find('#messageZt').html(data.informationSpecial);
                jqueryMap.$appsysteminformationView.find('#messageZt').attr("href",data.informationSpecial);
                jqueryMap.$appsysteminformationView.find('#message').html(data.message);
                jqueryMap.$appsysteminformationView.find('#enterDate').text(moment(data.enterDate).format('YYYY-MM-DD HH:mm:ss'));
                jqueryMap.$appsysteminformationView.find("#clientType").text(clientType);
                jqueryMap.$appsysteminformationView.find("#bbsjsj").text(data.sjsj);
			},
			error: function () {
			}
		});
	};

	return {
		init: function (id) {
            getAppSystemInformation(id);
            setJqueryMap();
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=appsysteminformationview.js