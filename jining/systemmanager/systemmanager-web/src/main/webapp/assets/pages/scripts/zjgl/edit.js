var edit = function () {
    'use strict';

    var prefix = 'zjgl';

    // 全局属性参数
    var configMap = {
        path: '',
        uuid:'',
        dataUrl: '/'+prefix+'/QueryOne',
        updateUrl:'/'+prefix+'/update',
        addUrl:'/'+prefix+'/add'
    };

    // 全局Dom
    var jqueryMap = {
        $editForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$editForm = $('#'+configMap.uuid+'editForm');
    };

    var save = function (callback) {
        var blockTarget = jqueryMap.$editForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var data = {
            zjmc:(jqueryMap.$editForm.find('input[name="zjmc"]').val()),
            zjdm:configMap.id,
            zjms:(jqueryMap.$editForm.find('textarea[name="zjms"]').val())
        };

        var AppAlert = function(message){
            App.alert({
                container: jqueryMap.$editForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: message,
                icon: 'fa fa-warning',
                closeInSeconds:3
            });
        }
        if(!data.zjmc){
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$editForm.closest(".modal-body"),
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
                data:data,
                success: function (d) {
                    App.unblockUI(blockTarget);
                    if(d.success) {
                        callback(true);
                        return true;
                    }else{
                        App.alert({
                            container: jqueryMap.$editForm.closest(".modal-body"),
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
                        container: jqueryMap.$editForm.closest(".modal-body"),
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
                data:data,
                success: function (d) {
                    App.unblockUI(blockTarget);
                    if(d.success) {
                        callback(true);
                        return true;
                    }else{
                        App.alert({
                            container: jqueryMap.$editForm.closest(".modal-body"),
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
                        container: jqueryMap.$editForm.closest(".modal-body"),
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

    var getinfo = function (id) {
        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.dataUrl,
                dataType: 'JSON',
                type: 'POST',
                data:{"dm":configMap.id},
                success: function (data) {
                    var mc = data.data.zjmc;
                    var ms = data.data.zjms;
                    var mcdom = jqueryMap.$editForm.find('input[name="zjmc"]');
                    var msdom = jqueryMap.$editForm.find('textarea[name="zjms"]');
                    mcdom.val(mc);
                    msdom.val(ms);
                },
                error: function () {
                    bootbox.alert('获取证件信息失败！');
                }
            });
        }
    };

    return {
        // 初始化
        init: function (id,uuid) {
            configMap.id = id;
            configMap.uuid=uuid;
            setJqueryMap();
            getinfo(id);
            //textarea输入字数限制
            var obj = $("#editForm textarea");
            var num = 300;
            var numObj = $("#editForm .wordNum span")
            checkHowMany(obj,numObj,num);
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        save: function (callback) {
            if (jqueryMap.$editForm.valid()) {
               return  save(callback);
            }
            else {
                callback(false);
                return false;
            }
        }
    };
}();
