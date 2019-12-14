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

/*global $, App, moment, jQuery, bootbox, _ */
var shareLink = function () {
    'use strict';

    /**
     * 全局属性参数
     */
    var configMap = {
        path: '',
        id: ''
    };
    /**
     * 全局Dom
     */
    var jqueryMap = {
        $blockTarget: null,
        $contractForm: null,
        $setimg: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#shareLinkDiv');
    };

    /**
     * 获取链接
     */
    var getSchedule = function () {
        $.ajax({
            url: '/paymanager/paymanager/AESCddbh?ddbh=' + configMap.id,
            type: 'GET',
            async: false,
            dataType: "json",
            success: function (result) {
                if (result.success) {
                    $('#linked',jqueryMap.$contractForm).val('http://www.cys360.cn/chargeBill.jsp?ddbh=' + encodeURIComponent (result.key) + '&name=' + encodeURIComponent (result.name) + '&tel=' + encodeURIComponent (result.tel));
                } else {
                    Messenger().post({
                        message: result.message,
                        type: 'danger'
                    });
                    chargeorderlist.hideDialog();
                }
            },
            error:function () {
                Messenger().post({
                    message: '链接生成失败！',
                    type: 'danger'
                });
            }
        });
    };

    var copyLink = function () {
        var clipboard = new ClipboardJS('#shareBtn');
        clipboard.on('success', function(e) {
            //console.log(e);
        });
        clipboard.on('error', function(e) {
            //console.log(e);
        });
    }

    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            getSchedule();

            $('#shareBtn').off('click').on('click',function () {
                copyLink();
            });
            jqueryMap.$contractForm.closest(".modal-content").css("width", "600px");
            jqueryMap.$contractForm.closest(".modal-dialog").css({"cssText":"width:600px !important"});
            jqueryMap.$contractForm.closest(".modal-dialog").css("margin-top", "100px");
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        copy: function (callback) {

            copy(callback);
        }
    };
}();
//@ sourceURL=edit.js