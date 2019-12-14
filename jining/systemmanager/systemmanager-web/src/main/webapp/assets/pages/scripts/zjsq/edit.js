var edit = function () {
    'use strict';

    var prefix = 'zjgl/zjsq';

    // 全局属性参数
    var configMap = {
        path: '',
        uuid:'',
        khbm:'',
        zjdm:'',
        jjcs:'',
        zjsqid:'',
        addUrl:'/'+prefix+'/add'
    };

    // 全局Dom
    var jqueryMap = {
        $editForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$editForm = $('#'+configMap.uuid+'editForm');
        jqueryMap.$container = jqueryMap.$editForm;
    };

if( localStorage.getItem('sqghBZ')=='sq'){
    $('input[type="radio"]',$('.zjsqForm_M')).eq(0).prop('checked','checked')
}else{
    $('input[type="radio"]', $('.zjsqForm_M')).eq(1).prop('checked','checked')
}

    var save = function (callback) {
        var blockTarget = jqueryMap.$editForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var data = {
            zjzt: (jqueryMap.$editForm.find('input[name="zjzt"]:checked').val()),
            lrsj: (jqueryMap.$editForm.find('input[name="lrsj"]').val()),
            zjsl: (jqueryMap.$editForm.find('input[name="zjsl"]').val()),
            bzxx: (jqueryMap.$editForm.find('textarea[name="bzxx"]').val()),
            zjdm: configMap.zjdm,
            khbm: configMap.khbm,
            jjcs: configMap.jjcs,
            zjsqid:configMap.zjsqid
        };

        var AppAlert = function (message) {
            App.alert({
                container: jqueryMap.$editForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: message,
                icon: 'fa fa-warning',
                closeInSeconds: 3
            });
        }
        /*if (!data.zjmc) {
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
        }*/

        $.ajax({
            url: configMap.path + configMap.addUrl,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (d) {
                App.unblockUI(blockTarget);
                if (d.success) {
                    callback(true);
                    return true;
                } else {
                    App.alert({
                        container: jqueryMap.$editForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: d.message,
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
    };
    return {
        // 初始化
        init: function (id,uuid,khbm,zjsqid,jjcs) {
            configMap.zjdm = id;
            configMap.uuid=uuid;
            configMap.khbm=khbm;
            configMap.jjcs=jjcs;
            configMap.zjsqid=zjsqid;
            setJqueryMap();
            jqueryMap.$container.find('.lrsjWrap').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
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
