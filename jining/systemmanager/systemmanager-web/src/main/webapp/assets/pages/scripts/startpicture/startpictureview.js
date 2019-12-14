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
var startpictureView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/startPicture'
	};

	var jqueryMap = {
		$startpictureView: null
	};

	var setJqueryMap = function () {
		jqueryMap.$startpictureView = $('#startpictureView');
    };

	var getStartPicture = function (id) {
		$.ajax({
			url: configMap.path + configMap.dataUrl + '/findStartPicture?id=' + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
                jqueryMap.$startpictureView.find('#imgname').text(data.tpmc);
                jqueryMap.$startpictureView.find('#imgdes').text(data.tpms);
                console.log("备注信息：："+data.bzxx);
                if(data.bzxx!=""||data.bzxx=="null") {
                    jqueryMap.$startpictureView.find('#imgremark').text(data.bzxx);
                }
                jqueryMap.$startpictureView.find('#imgstate').html(data.qdtzt);
                if(data.tplj!=""||data.tplj==null){
                    jqueryMap.$startpictureView.find('#imgurl').html("<img src='"+ data.tplj+"' class='imgqdt'/>");
				}
			},
			error: function () {
			}
		});
	};

	return {
		init: function (id) {
            getStartPicture(id);
            setJqueryMap();
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=startpictureview.js