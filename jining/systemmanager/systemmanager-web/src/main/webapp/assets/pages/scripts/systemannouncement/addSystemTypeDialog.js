/**
 * Created by huxinquan on 2017/7/3.
 */
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
var addSystemTypeDialogEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/announcementType',
        UUID: '',
        id: ''
    };

    // 全局Dom
    var jqueryMap = {
        $addSystemTypeDialogForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$addSystemTypeDialogForm = $('#addSystemTypeDialogForm');
    };

    var addSystemType = function (callback) {
        var blockTarget = jqueryMap.$addSystemTypeDialogForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var data = {
            addSystemTypeName: encodeURIComponent(jqueryMap.$addSystemTypeDialogForm.find('input[name="addSystemTypeName"]').val())
        };
        var AppAlert = function(message){
        	App.alert({
	            container: jqueryMap.$addSystemTypeDialogForm.closest(".modal-body"),
	            place: 'prepend',
	            type: 'danger',
	            message: message,
                closeInSeconds:3,
	            icon: 'fa fa-warning'
	        });
        }
        if(!data.addSystemTypeName){
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$addSystemTypeDialogForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请填写类型名称！",
                icon: 'fa fa-warning'
            });
            return;
        }
        var thisTypeDom = document.getElementsByName('addSystemTypeName')[0];
        var textTypeErro = TextValidate(thisTypeDom,AppAlert);
        if(!textTypeErro){
        	App.unblockUI(blockTarget);
        	return;
        }
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/addAnnouncementType?announcementTypeName=' + data.addSystemTypeName,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            success: function () {
                App.unblockUI(blockTarget);
                callback(true);
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$addSystemTypeDialogForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
                callback(false);
            }
        });
    };

    return {
        // 初始化
        init: function (id) {
            setJqueryMap();
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        addSystemType: function (callback) {
            if (jqueryMap.$addSystemTypeDialogForm.valid()) {
            	addSystemType(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=addSystemTypeDialogedit.js