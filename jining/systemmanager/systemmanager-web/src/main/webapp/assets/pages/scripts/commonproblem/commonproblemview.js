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
var commonproblemView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/commonProblem'
	};

	var jqueryMap = {
		$commonproblemView: null
	};

	var setJqueryMap = function () {
		jqueryMap.$commonproblemView = $('#commonproblemView');
    };

	var getCommonProblem = function (id) {
		$.ajax({
			url: configMap.path + configMap.dataUrl + '/getCommonProblemById?id=' + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
                jqueryMap.$commonproblemView.find('#problemCategoryName').text(data.problemCategoryName);
                jqueryMap.$commonproblemView.find('#problemName').text(data.problemName);
                jqueryMap.$commonproblemView.find('#problemContent').html(data.problemContent);
			},
			error: function () {
			}
		});
	};

	return {
		init: function (id) {
            getCommonProblem(id);
            setJqueryMap();
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=commonproblemview.js