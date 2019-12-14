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

var khflAdd = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/systemmanager/customertype/customertype',
        id: ''
    };

    // 全局Dom
    var jqueryMap = {
        $khflAddForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$khflAddForm = $('#khflAddForm');
    };

    var saveKhfl = function (callback) {

        var data = {
            khfl_mc: jqueryMap.$khflAddForm.find('input[name=khflName]').val(),
            khfl_dm: jqueryMap.$khflAddForm.find('input[name=khflDm]').val()
        };
        if (data.khfl_mc == "" || data.khfl_mc == null || data.khfl_mc == "undefined") {
            App.alert({
                container: jqueryMap.$khflAddForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '客户分类名称不得为空！',
                icon: 'fa fa-warning'
            });
            return false;
        }

        $.ajax({
            url: configMap.path + configMap.dataUrl,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data: JSON.stringify(data),
            success: function (result) {
                callback(true);
            },
            error: function () {
                App.alert({
                    container: jqueryMap.$khflAddForm.closest(".modal-body"),
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
        init: function () {
            setJqueryMap();

        },
        // 保存雇员信息，参数为回掉函数
        saveKhfl: function (callback) {
            saveKhfl(callback);
        }
    };
}();
//@ sourceURL=roles/edit.js