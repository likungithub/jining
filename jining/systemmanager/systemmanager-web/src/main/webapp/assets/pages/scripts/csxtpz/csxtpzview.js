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
		dataUrl: '/csxtpz/csxtpz'
	};

    var getCsxtpz = function (id) {
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                var ps = $("p[id^='id_']");
                ps.each(function(index,element){
                   var id = $(this).attr("id");
                   var key = id.replace('id_','');
                   var val = data[key];
                    $(this).html(val);
                });
            },
            error: function () {
                bootbox.alert('获取参数信息失败！');
            }
        });
    };
	return {
		init: function (id) {
            getCsxtpz(id);
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=commonproblemview.js