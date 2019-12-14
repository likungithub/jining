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
var announcementtypeEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UEditorContainer: null,
        dataUrl: '/announcementType',
        checktypeUrl:'/systemmanager/systemAnnouncement/getAnnouncementTypeByName',
        UUID: '',
        id: '',
        ue: ''
    };

    // 全局Dom
    var jqueryMap = {
        $announcementtypeForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$announcementtypeForm = $('#announcementtypeForm');
    };

    var saveAnnouncementType = function (callback) {
        var blockTarget = jqueryMap.$announcementtypeForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var data = {
            announcementTypeName: encodeURIComponent(jqueryMap.$announcementtypeForm.find('input[name="announcementTypeName"]').val()),
            dm:configMap.id
        };

        var flag = true;

        //判断重复类型
        $.ajax({
            url:configMap.checktypeUrl,
            type: 'GET',
            async :false,
            data:{'name': encodeURIComponent(data.announcementTypeName),'dm':data.dm},
            success: function (result) {
                if(result){
                    if(result>0){
                        App.alert({
                            container: jqueryMap.$announcementtypeForm.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: '类型名称重复',
                            icon: 'fa fa-warning'
                        });
                        flag=false;
                        return;
                    }
                }
            }
        });

        if(!flag){
            App.unblockUI(blockTarget);
            return;
        }

        var AppAlert = function(message){
        	App.alert({
        		 container: jqueryMap.$announcementtypeForm.closest(".modal-body"),
                 place: 'prepend',
                 type: 'danger',
                 message: message,
                closeInSeconds:3,
                 icon: 'fa fa-warning'
	        });
        }
        if(!data.announcementTypeName){
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$announcementtypeForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请填写类型名称！",
                icon: 'fa fa-warning'
            });
            return;
        }
        var thisTypeDom = document.getElementsByName('announcementTypeName')[0];
        var textTypeErro = TextValidate(thisTypeDom,AppAlert);
        if(!textTypeErro){
        	App.unblockUI(blockTarget);
        	return;
        }
        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/updateAnnouncementType?id=' + configMap.id +
                '&announcementTypeName='+ data.announcementTypeName,
                type: 'PUT',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                success: function () {
                    App.unblockUI(blockTarget);
                    callback(true);
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$announcementtypeForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            });
        } else {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/addAnnouncementType?announcementTypeName=' + data.announcementTypeName,
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
                        container: jqueryMap.$announcementtypeForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            });
        }
    };

    var getAnnouncementType = function (id) {
        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/getAnnouncementTypeById?id=' + id,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    jqueryMap.$announcementtypeForm.find('input[name="announcementTypeName"]').val(data.announcementTypeName);
                },
                error: function () {
                    bootbox.alert('获取公告类型失败！');
                }
            });
        }
    };

    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            getAnnouncementType(id);
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveAnnouncementType: function (callback) {
            if (jqueryMap.$announcementtypeForm.valid()) {
                saveAnnouncementType(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=announcementtypeedit.js