/**
 * Created by huxinquan on 2017/6/23.
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
var commonproblemEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UEditorContainer: null,
        dataUrl: '/commonProblem',
        UUID: '',
        id: '',
        ue: '',
        selectCommonProblem: ''
    };

    // 全局Dom
    var jqueryMap = {
        $commonproblemForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$commonproblemForm = $('#commonproblemForm');
    };

    var saveCommonProblem = function (callback) {
        var blockTarget = jqueryMap.$commonproblemForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var data = {
            problemCategory: encodeURIComponent(jqueryMap.$commonproblemForm.find('select[name="problemCategory"]').val()),
            problemCategoryName: encodeURIComponent(jqueryMap.$commonproblemForm.find('option[value=' + jqueryMap.$commonproblemForm.find('[name="problemCategory"]').val() + ']').text()),
            problemName: encodeURIComponent(jqueryMap.$commonproblemForm.find('input[name="problemName"]').val()),
            problemContent: encodeURIComponent(configMap.ue.getContent())
        };

        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/updateCommonProblem?id=' + configMap.id +
                '&problemCategory=' + data.problemCategory + '&problemCategoryName=' + data.problemCategoryName +
                '&problemName='+ data.problemName + '&problemContent=' + data.problemContent,
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
                        container: jqueryMap.$commonproblemForm.closest(".modal-body"),
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
                url: configMap.path + configMap.dataUrl + '/addCommonProblem?problemCategory=' + data.problemCategory +
                '&problemCategoryName=' + data.problemCategoryName + '&problemName=' + data.problemName +
                '&problemContent=' + data.problemContent,
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
                        container: jqueryMap.$commonproblemForm.closest(".modal-body"),
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

    var getCommonProblem = function (id) {
        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/getCommonProblemById?id=' + id,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    jqueryMap.$commonproblemForm.find('select[name="problemCategory"]').val(data.problemCategory).trigger('change');
                    jqueryMap.$commonproblemForm.find('input[name="problemName"]').val(data.problemName);
                    configMap.ue.ready(function () {
                        configMap.ue.setContent(data.problemContent);
                    });
                },
                error: function () {
                    bootbox.alert('获取常见问题失败！');
                }
            });
        }
    };

    var getSelect = function () {
        configMap.selectCommonProblem = jqueryMap.$commonproblemForm.find('select[name=problemCategory]');
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/getAllCommonProblemType',
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                if (datas !== null) {
                    configMap.selectCommonProblem.select2({
                        data: datas,
                        allowClear: false
                    });
                }
                getCommonProblem(configMap.id);
            }
        });
    };

    return {
        // 初始化
        init: function (id, ue) {
            configMap.id = id;
            configMap.ue = ue;
            setJqueryMap();
            getSelect();
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveCommonProblem: function (callback) {
            if (jqueryMap.$commonproblemForm.valid()) {
                saveCommonProblem(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=commonproblemedit.js