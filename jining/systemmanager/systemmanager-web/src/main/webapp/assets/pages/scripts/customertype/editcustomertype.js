var customertypeEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/customertype/customertype',
        id: ''
    };

    // 全局Dom
    var jqueryMap = {
			$customertypeForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$customertypeForm = $('#customertypeForm');
    };

    var savecustomertype = function (callback) {
        debugger
        var blockTarget = jqueryMap.$customertypeForm.closest(".modal-content");
        var khflmc = $('#khflmc').val();
        if ( khflmc == "undefined" || khflmc == null || khflmc == "") {
            Messenger().post({
                message: '客户分类名称不得为空！',
                type: 'warning'
            });
        } else {
            App.blockUI({
                target: blockTarget,
                boxed: true,
                message: '正在保存数据...'
            });
            var data = {
                khfl_mc: $('#khflmc').val(),
                khfl_dm: $('#khflbm').val()
            };

            var url = configMap.path + configMap.dataUrl;
            var requestType = 'POST';
            if (configMap.id) {
                url = url + "/" + configMap.id;
                requestType = 'PUT';
            }
            var AppAlert = function(message){
                App.alert({
                    container: jqueryMap.$customertypeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: message,
                    closeInSeconds:3,
                    icon: 'fa fa-warning'
                });
            }
            var thisTypeDom = document.getElementById('khflmc');
            var textTypeErro = TextValidate(thisTypeDom,AppAlert);
            if(!textTypeErro){
                App.unblockUI(blockTarget);
                return;
            }
            $.ajax({
                url: url,
                type: requestType,
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function (data) {
                    App.unblockUI(blockTarget);
                    if(data.success){
                        Messenger().post("保存成功!");
                        callback(true);
                    } else {
                        App.alert({
                            container: jqueryMap.$customertypeForm.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: data.message,
                            icon: 'fa fa-warning'
                        });
                        callback(false);
                    }
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$customertypeForm.closest(".modal-body"),
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

    var getcustomertype = function (id) {
		$.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                $('#khflbm').val(data.khfl_dm);
                $('#khflmc').val(data.khfl_mc);
            },
            error: function () {
                bootbox.alert('获取参数信息失败！');
            }
        });
    };

    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
//            console.info(jqueryMap.$customertypeForm.closest(".modal-body"));
            // 控件验证
            if (configMap.id) {
                getcustomertype(configMap.id);
            }
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        // 保存客户分类信息，参数为回掉函数
        savecustomertype: function (callback) {
            if (jqueryMap.$customertypeForm.valid()) {
                savecustomertype(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js