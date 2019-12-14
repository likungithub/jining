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
var productView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/appiconmanager/showappicon/'
	};

	var getProduct = function (id) {
		$.ajax({
			url: configMap.path + configMap.dataUrl + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				$('#iconType').text(data.iconType);
				$('#pictureName').text(data.pictureName);
				$('#pictureContent').text(data.pictureContent);
				/*$('#downloadAddress').text(data.downloadAddress);*/
				/*$('#download').text(data.download);*/
				$('#picture').attr('src',data.pictureLink);
				$('#pictureLink').text(data.pictureLink);
				$('#memoInfo').text(data.momoInfo);
				$('#iconStat').text(data.iconStat)
			},
			error: function () {
			}
		});
	};

	return {
		init: function (id) {
			getProduct(id);
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=commonproblemview.js