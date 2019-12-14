var edit = function () {
    'use strict';

    var prefix = 'jcgl';

    // 全局属性参数
    var configMap = {
        path: '',
        uuid:'',
        dataUrl: '/'+prefix+'/lookjcxm',
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
                        var ypmcdom =  jqueryMap.$editForm.find('input[name="jcxmmc"]');
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
