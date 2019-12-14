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
var businesscooperateView = function () {
    'use strict';

    var configMap = {
        path: '',
        dataUrl: '/businessCooperate'
    };

    var jqueryMap = {
        $businesscooperateView: null
    };

    var setJqueryMap = function () {
        jqueryMap.$businesscooperateView = $('#businesscooperateView');
    };

    var getBusinessCooperate = function (cooperateId) {
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/viewBusinessCooperateByCooperateId?cooperateId=' + cooperateId,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                jqueryMap.$businesscooperateView.find('#customerName').text(datas.customerName);
                jqueryMap.$businesscooperateView.find('#cooperateType').text(datas.cooperateType);
                jqueryMap.$businesscooperateView.find('#contactInformation').text(datas.contactInformation);
                jqueryMap.$businesscooperateView.find('#messageDate').text(moment(datas.messageDate).format('YYYY-MM-DD HH:mm:ss'));
                jqueryMap.$businesscooperateView.find('#message').text(datas.message);
                jqueryMap.$businesscooperateView.find('#gsmc_id').text(datas.gsmc);
                jqueryMap.$businesscooperateView.find('#blztmc_id').text(datas.blzt);
                var businessCooperateImage = jqueryMap.$businesscooperateView.find('#businessCooperateImage');
                if (datas.imageLink.length > 0) {
                    for (var i = 0; i < datas.imageLink.length; i++) {
                        businessCooperateImage.append('<img src="' + datas.imageLink[i] + '"/>');

                    }

                }
                $("#businessCooperateImage img").each(function () {
                    $(this).css("cursor","pointer")
                    $(this).on("click",function () {
                        openBigImg($(this));
                    })
                })


            },
            error: function () {
            }
        });
    };

    function openBigImg(el){
        var imgSrc = el.attr("src");
        window.open(imgSrc);
    }
    return {
        init: function (cooperateId) {
            getBusinessCooperate(cooperateId);
            setJqueryMap();

        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=businesscooperateview.js