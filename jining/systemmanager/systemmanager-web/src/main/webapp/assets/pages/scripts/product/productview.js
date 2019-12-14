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
		dataUrl: '/product/product/'
	};

	var getProduct = function (id) {
		$.ajax({
			url: configMap.path + configMap.dataUrl + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				$('#productNumber').text(data.productNumber);
				$('#productName').text(data.productName);
				if (data.productDescription!=null) {
					$('#productDescription').text(data.productDescription);
				} else {
					$('#productDescription').text("暂无");
				}
				$('#downloadAddress').text(data.downloadAddress);
				$('#download').text(data.download);
				$('#productImg').attr('src',data.productImg);
				if (data.remark!=null) {
					$('#remark').text(data.remark);
				} else {
					$('#remark').text("暂无");
				}
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