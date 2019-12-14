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

var messageView = function () {
    'use strict';

    var configMap = {
        path: '',
        getOrgUrl: '/followupremind/findById',
        dataUrl: '/user/users/user/',
        id: ''
    };

    var jqueryMap = {
        $container: null
    };

    var getUser = function (id) {
        $.ajax({
            url: configMap.path + configMap.getOrgUrl + '/' + configMap.id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {

                $('#companyName', jqueryMap.$container).text(data.companyName);
                $('#nextFollowupTime', jqueryMap.$container).text(moment(data.nextFollowUpTime).format('YYYY-MM-DD'));
                $('#followupContent', jqueryMap.$container).text(data.followUpcontent);
                $('#linkMan', jqueryMap.$container).text(data.linkMan);
                $('#followupMan', jqueryMap.$container).text(data.inputPeople);
                $('#nextFollowupMan', jqueryMap.$container).text(data.nextLinkMan);
                $('#nextFollowupContent', jqueryMap.$container).text(data.nextFollowUpContent);
                $('#followupStat', jqueryMap.$container).text(data.followUpCode == 1 ? '已跟进' : '未跟进');
                /* $('#time', jqueryMap.$container).text(moment(data.csrq).format('YYYY-MM-DD'));*/
                /*if (data.jsdm != "" && data.jsdm != null){
                 var js = data.jsdm.split(',');
                 for(var i=0;i<js.length;i++){
                 jqueryMap.$container.find('span[id='+ js[i] +']').addClass("btnBlue colorfff");
                 }
                 }*/
            },
            error: function () {
                Messenger().post({
                    message: '获取数据失败！',
                    type: 'error'
                });
            }
        });
    };

    return {
        init: function (id) {
            configMap.id = id;
            getUser();
        },
        setPath: function (path) {
            jqueryMap.$container = $('#followupremindview');
        }
    };
}();
//@ sourceURL=view.js