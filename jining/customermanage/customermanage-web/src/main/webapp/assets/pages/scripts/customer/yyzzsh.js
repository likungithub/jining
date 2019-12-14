/*global $, App, moment */

var yyzzshView = function () {
    'use strict';

    var configMap = {
        path: '',
        getOrgUrl: '/organization/organization/org',
        dataUrl: '/customermanage/customerManage/customer',
        id: '',
        customerId:'',
        imgUrl: '/customermanage/customer/showfile.jsp',
        dateUrl: '/customermanage/customerManage/getDays',
        shurl:'/customermanage/customerManage/customer/updateyyzzSh'
    };

    var jqueryMap = {
        $container: null,
        $setimg: null
    };




    var addShAdvise = function (callback) {
        var shzt = $('[type="checkbox"]:checked', jqueryMap.$container).val();
        if (shzt != 1 && shzt != 0) {
            Messenger().post({
                message: '请选择审批状态！',
                type: 'error'
            });
            return false;
        }

        var data = {
        	id: configMap.id,
            zszt: shzt,
            zsrybz: $('#shBzxx').val(),
        }
        $.ajax({
            url: configMap.path +configMap.shurl,
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            type: 'PUT',
            data: JSON.stringify(data),
            success: function (datas) {
                if (datas.success) {
                    callback(true);
                    Messenger().post("审核成功!");
                } else {
                    Messenger().post({
                        message: datas.message,
                        type: 'error'
                    });
                    callback(false);
                }
            },
            error: function () {
                Messenger().post({
                    message: "审核失败！",
                    type: 'error'
                });
                callback(false);
            }
        });
    }

    return {
        init: function (id) {
            configMap.id = id;
            jqueryMap.$container.find('[name="shty"]').prop("checked", true); //默认为同意
        },
        setPath: function (path) {
            jqueryMap.$container = $('#dlsh-manager-view-data');
        },
        addShAdvise: function (callback) {
            addShAdvise(callback);
        }
    };
}();
//@ sourceURL=view.js