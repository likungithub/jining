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
var systemannouncementview = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/systemAnnouncement'
	};

	var jqueryMap = {
        $systemannouncementView: null
	};

	var setJqueryMap = function () {
		jqueryMap.$systemannouncementView = $('#systemannouncementView');
    };

	var getSystemAnnouncementById = function (systemAnnouncementId) {
		$.ajax({
			url: configMap.path + configMap.dataUrl + '/getSystemAnnouncementBySystemAnnouncementId?systemAnnouncementId=' + systemAnnouncementId,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				console.log(data)
				debugger
				//if(data.systemAnnouncement.announcementDescription==""){
				//	debugger
                //    jqueryMap.$systemannouncementView.find('#announcementDescription').parent().parent().parent().parent().hide();
				//}else{
                    jqueryMap.$systemannouncementView.find('#announcementDescription').text(data.systemAnnouncement.announcementDescription);
				//}
				debugger
                jqueryMap.$systemannouncementView.find('#announcementName').text(data.systemAnnouncement.announcementName);
                jqueryMap.$systemannouncementView.find('#enterDate').text(moment(data.systemAnnouncement.enterDate).format('YYYY-MM-DD HH:mm:ss'));
                jqueryMap.$systemannouncementView.find('#announcementSource').text(data.systemAnnouncement.announcementSource);
                jqueryMap.$systemannouncementView.find('#announcementContent').html(data.systemAnnouncement.announcementContent);

                console.info(configMap.path + configMap.dataUrl + "/getAllSystemAnnouncementUnread");

                $.ajax({
					url: configMap.path + configMap.dataUrl + '/getAllSystemAnnouncementUnread',
					type: 'GET',
					success: function (result) {

                        if(result.length > 0) {
                            $('#announcementInfoWarning').html(result.length);
                            $('.top-remind-m').addClass('bellSwing');
                        } else {
                            $('#announcementInfoWarning').css({display:'none'});
                            $('.top-remind-m').removeClass('bellSwing');
                        }
                    }
				});
			},
			error: function () {
			}
		});
	};

	return {
		init: function (systemAnnouncementId) {
			setJqueryMap();
            getSystemAnnouncementById(systemAnnouncementId);
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=systemannouncementview.js