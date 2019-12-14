/**
 * Created by huxinquan on 2017/8/7.
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
var commonproblemtypeEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UEditorContainer: null,
        dataUrl: '/commonProblemType',
        UUID: '',
        id: '',
        ue: ''
    };

    // 全局Dom
    var jqueryMap = {
        $commonproblemtypeForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$commonproblemtypeForm = $('#commonproblemtypeForm');
    };

    var saveCommonProblemType = function (callback) {
        var blockTarget = jqueryMap.$commonproblemtypeForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var data = {
            commonProblemTypeName: encodeURIComponent(jqueryMap.$commonproblemtypeForm.find('input[name="commonProblemTypeName"]').val())
        };
        if(!data.commonProblemTypeName){
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$commonproblemtypeForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请填写类型名称！",
                icon: 'fa fa-warning'
            });
            return;
        }

        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/updateCommonProblemType?id=' + configMap.id +
                '&commonProblemTypeName='+ data.commonProblemTypeName,
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
                        container: jqueryMap.$commonproblemtypeForm.closest(".modal-body"),
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
                url: configMap.path + configMap.dataUrl + '/addCommonProblemType?commonProblemTypeName=' + data.commonProblemTypeName,
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
                        container: jqueryMap.$commonproblemtypeForm.closest(".modal-body"),
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

    var getCommonProblemType = function (id) {
        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/getCommonProblemTypeById?id=' + id,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    jqueryMap.$commonproblemtypeForm.find('input[name="commonProblemTypeName"]').val(data.commonProblemTypeName);
                },
                error: function () {
                    bootbox.alert('获取常见问题类型失败！');
                }
            });
        }
    };

    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            getCommonProblemType(id);
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveCommonProblemType: function (callback) {
            if (jqueryMap.$commonproblemtypeForm.valid()) {
                saveCommonProblemType(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=commonproblemtypeedit.js