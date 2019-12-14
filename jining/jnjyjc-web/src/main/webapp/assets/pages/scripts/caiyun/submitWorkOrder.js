/**
 * Created by huxinquan on 2017/7/4.
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
var submitWorkOrder = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/workorder/workorder',
        id: ''
    };

    // 全局Dom
    var jqueryMap = {
        $setimg: null,
        $userinfoForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$workorderForm = $('#workOrder_m');
    };

    /**
     * 校验输入信息
     * @returns {boolean}
     */
    var checkinfo = function () {
        if ($('textarea[name="wtms"]', jqueryMap.$workorderForm).val() === null
            || $('textarea[name="wtms"]', jqueryMap.$workorderForm).val() === "") {
            App.alert({
                container: jqueryMap.$workorderForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "问题描述不能为空！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if ($('input[name="sjhm"]', jqueryMap.$workorderForm).val() === null
            || $('input[name="sjhm"]', jqueryMap.$workorderForm).val() === "") {
            App.alert({
                container: jqueryMap.$workorderForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "手机号码不能为空！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if ($('input[name="dzyx"]', jqueryMap.$workorderForm).val() === null
            || $('input[name="dzyx"]', jqueryMap.$workorderForm).val() === "") {
            App.alert({
                container: jqueryMap.$workorderForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "电子邮箱不能为空！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if (!whetherOrNotMobil($('input[name="sjhm"]', jqueryMap.$workorderForm).val())) {
            App.alert({
                container: jqueryMap.$workorderForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请填写正确的手机号码！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if (!whetherOrNotEmail($('input[name="dzyx"]', jqueryMap.$workorderForm).val())) {
            App.alert({
                container: jqueryMap.$workorderForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请填写正确的电子邮箱！",
                icon: 'fa fa-warning'
            });
            return false;
        } else {
            return true;
        }
    };

    /**
     * 保存工单
     * @param callback
     */
    var saveUserInfo = function (callback) {
        var data = {
            uuid: configMap.id,
            yxjdm: jqueryMap.$workorderForm.find('input[name="yxjdm"]:checked').val(),
            wtms: jqueryMap.$workorderForm.find('textarea[name="wtms"]').val(),
            sjhm: jqueryMap.$workorderForm.find('input[name="sjhm"]').val(),
            dzyx: jqueryMap.$workorderForm.find('input[name="dzyx"]').val()
        };
        var blockTarget = jqueryMap.$workorderForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data: JSON.stringify(data),
            success: function (result) {
                App.unblockUI(blockTarget);
                if (result.success) {
                    callback(true);
                } else {
                    App.alert({
                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: result.message,
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$workorderForm.closest(".modal-body"),
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
        init: function (uuid) {
            configMap.id = uuid;
            setJqueryMap();
            $('input[name="yxjdm"]', jqueryMap.$workorderForm).iCheck({
                radioClass: 'iradio_minimal',
                increaseArea: '20%'
            });
            $('input:radio[name="yxjdm"][value="1"]', jqueryMap.$workorderForm).iCheck("check");
            jqueryMap.$workorderForm.find('[name^=submitfile]').off('click').on('click', function () {
                var dialogButtons = {
                    success: {
                        label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                        className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                        callback: function () {
                            jqueryMap.$setimg.modal('hide');
                            return false;
                        }
                    }
                };
                $.get("/caiyun/addfile.jsp?id=" + configMap.id, function (html) {
                    jqueryMap.$setimg = bootbox.dialog({
                        title: '添加附件',
                        message: html,
                        buttons: dialogButtons
                    });
                });
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveworkorder: function (callback) {
            //校验输入内容
            if (checkinfo()) {
                saveUserInfo(callback);
            } else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=submitWorkOrder.js