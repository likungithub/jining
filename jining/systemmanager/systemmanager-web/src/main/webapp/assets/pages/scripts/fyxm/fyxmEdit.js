var fyxmtypeEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/fyxm/fyxmQueryOne',
        updateUrl:'/fyxm/updatefyxm',
        addUrl:'/fyxm/addfyxm'
    };

    // 全局Dom
    var jqueryMap = {
        $fyxmtypeEditForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$fyxmtypeEditForm = $('#fyxmtypeForm');
    };

    var saveFyxmType = function (callback) {
        var blockTarget = jqueryMap.$fyxmtypeEditForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var data = {
            fyxmMc:(jqueryMap.$fyxmtypeEditForm.find('input[name="fyxmTypeName"]').val()),
            fyxmDm:configMap.id
        };




        var AppAlert = function(message){
            App.alert({
                container: jqueryMap.$fyxmtypeEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: message,
                icon: 'fa fa-warning',
                closeInSeconds:3
            });
        }
        if(!data.fyxmMc){
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$fyxmtypeEditForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请填写名称！",
                icon: 'fa fa-warning'
            });
            callback(false);
            return false;
        }
        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.updateUrl,
                type: 'POST',
                //contentType: 'application/json; charset=utf-8',
                //dataType: 'JSON',
                data:data,
                success: function (d) {
                    App.unblockUI(blockTarget);
                    if(d.success) {
                        callback(true);
                        return true;
                    }else{
                        App.alert({
                            container: jqueryMap.$fyxmtypeEditForm.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message:d.message,
                            icon: 'fa fa-warning'
                        });
                        callback(false);
                        return false;
                    }
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$fyxmtypeEditForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                    return false;
                }
            });
        } else {
            $.ajax({
                url: configMap.path + configMap.addUrl,
                type: 'POST',
               // contentType: 'application/json; charset=utf-8',
                //dataType: 'JSON',
                data:data,
                success: function (d) {
                    App.unblockUI(blockTarget);
                    if(d.success) {
                        callback(true);
                        return true;
                    }else{
                        App.alert({
                            container: jqueryMap.$fyxmtypeEditForm.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message:d.message,
                            icon: 'fa fa-warning'
                        });
                        callback(false);
                        return false;
                    }
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$fyxmtypeEditForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                    return false;
                }
            });
        }
    };

    var getfyxmType = function (id) {
        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.dataUrl,
                dataType: 'JSON',
                type: 'POST',
                data:{"dm":configMap.id},
                success: function (data) {
                    var mc = data.data.fyxmMc;
                    var mcdom = jqueryMap.$fyxmtypeEditForm.find('input[name="fyxmTypeName"]');
                    mcdom.val(mc);
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
            getfyxmType(id);
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveFyxmType: function (callback) {
            if (jqueryMap.$fyxmtypeEditForm.valid()) {
               return  saveFyxmType(callback);
            }
            else {
                callback(false);
                return false;
            }
        }
    };
}();
