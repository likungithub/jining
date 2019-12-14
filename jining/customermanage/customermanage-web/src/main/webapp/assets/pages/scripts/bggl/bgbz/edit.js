var edit = function () {
    'use strict';

    var prefix = 'bggl';

    // 全局属性参数
    var configMap = {
        path: '',
        uuid:'',
        dataUrl: '/'+prefix+'/QueryRy',
        updateUrl:'/'+prefix+'/updateData',
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
            YPMC:(jqueryMap.$editForm.find('input[name="YPMC"]').val()),
            id:configMap.id
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
        }
    };

    var getinfo = function (id) {
        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.dataUrl,
                dataType: 'JSON',
                type: 'POST',
                data:{"id":configMap.id},
                success: function (data) {
                    var list = data.data;
                    console.log(list);
                    if(list.length>=1){
                        var rymc = list[0].rymc;
                        var ypmcdom =  jqueryMap.$editForm.find('input[name="ypjcry"]');
                        ypmcdom.val(rymc);
                    }
                    if(list.length>=2){
                        var rymc = list[1].rymc;
                        var ypmcdom =  jqueryMap.$editForm.find('input[name="sjjyry"]');
                        ypmcdom.val(rymc);
                    }

                    if(list.length>=3){
                        var rymc = list[2].rymc;
                        var ypmcdom =  jqueryMap.$editForm.find('input[name="sjscry"]');
                        ypmcdom.val(rymc);
                    }



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
