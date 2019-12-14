/*global $, App, moment */

var dlshView = function () {
    'use strict';

    var configMap = {
        path: '',
        getOrgUrl: '/organization/organization/org',
        dataUrl: '/customermanage/customerManage/customer',
        id: '',
        customerId:'',
        imgUrl: '/customermanage/customer/showfile.jsp',
        dateUrl: '/customermanage/customerManage/getDays'

    };

    var jqueryMap = {
        $container: null,
        $setimg: null
    };

    var getDate = function () {
        $.ajax({
            url: configMap.path + configMap.dateUrl,
            type: 'GET',
            success: function (result) {
                jqueryMap.$container.find('[name="shEndDate"]').val(moment(result, "YYYY/MM/DD").format("YYYY-MM-DD"));
            },
            error: function () {
                jqueryMap.$container.find('[name="shEndDate"]').val(moment().format("YYYY-MM-DD"));
            }
        });
    }

    var addShAdvise = function (callback) {
        var shzt = $('[type="checkbox"]:checked', jqueryMap.$container).val();
        var startTime = $('[name="shStartDate"]', jqueryMap.$container).val();
        var endTime = $('[name="shEndDate"]', jqueryMap.$container).val();
        if (shzt != 1 && shzt != 0) {
            Messenger().post({
                message: '请选择审批状态！',
                type: 'error'
            });
            return false;
        } else if (shzt == 1 && (startTime == null || startTime == "" || endTime == null || endTime == "")) {
            Messenger().post({
                message: '请填写完整的试用日期',
                type: 'error'
            });
            return false;
        } else if (startTime > endTime) {
            Messenger().post({
                message: '开始日期需早于结束日期',
                type: 'error'
            });
            return false;
        }

        var userid = configMap.id.split(",");
        var customerId = configMap.customerId.split(",");
        var useridjson = [];
        var customerIdjson = [];
        var usertemp = null;
        var customertemp = null;
        for (var i = 0; i < userid.length; i++) {
        	usertemp = {userid: userid[i]};
        	useridjson.push(usertemp);
        }
        for (var i = 0; i < customerId.length; i++) {
        	customertemp = {customerId: customerId[i]};
        	customerIdjson.push(customertemp);
        }
        var data = {
        	userid: useridjson,
        	customerId: customerIdjson,
            shzt: shzt,
            startTime: startTime,
            endTime: endTime,
            bzxx: $('#shBzxx').val(),
        }
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/sh/1',
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
        init: function (id,customerId) {
            configMap.id = id;
            configMap.customerId = customerId;
            jqueryMap.$container.find('.shStartDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            jqueryMap.$container.find('[name="shStartDate"]').val(moment().format("YYYY-MM-DD"));
            jqueryMap.$container.find('[name="shty"]').prop("checked", true); //默认为同意

            jqueryMap.$container.find('.shEndDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            //三个月后日期
            getDate();
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