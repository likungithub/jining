var edit = function () {
    'use strict';

    var prefix = 'jcgl/sjxg';

    // 全局属性参数
    var configMap = {
        path: '',
        uuid:'',
        dataUrl: '/'+prefix+'/QueryOne',
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

        
        var idxxs =  jqueryMap.$editForm.find('input[name="id_xx"]');
        var jczs = jqueryMap.$editForm.find('input[id="jcz"]');
        var wds = jqueryMap.$editForm.find('input[id="wd"]');
        var sds = jqueryMap.$editForm.find('input[id="sd"]');

        var arr_id  = [];
        var arr_jcz = [];
        var arr_wd = [];
        var arr_sd = [];

        for(var i=0;i<idxxs.length;i++){
            var id = $(idxxs[i]).attr('idxx');
            arr_id.push(id);
        }

        for(var i=0;i<jczs.length;i++){
            var id = jczs[i].value;
            arr_jcz.push(id);
        }

        for(var i=0;i<wds.length;i++){
            var id = wds[i].value;
            arr_wd.push(id);
        }

        for(var i=0;i<sds.length;i++){
            var id = sds[i].value;
            arr_sd.push(id);
        }



        var data = {
            id:arr_id.join(','),
            jcz:arr_jcz.join(','),
            wd:arr_wd.join(','),
            sd:arr_sd.join(',')
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
                    
                    var html = '';
                    for(var i=0;i<data.data.length;i++){
                        var ypmc = data.data[i].YPMC;
                        var ypid = data.data[i].ypid;
                        var jcxmid = data.data[i].jcxmid;
                        var jcz = data.data[i].jcz;
                        var wd = data.data[i].wd;
                        var sd = data.data[i].sd;

                        var temp_html = '<div class="row"> <div class="col-md-12"> <div class="form-group"> <label class="labelCommon labelWidth-col-one color666">';
                        temp_html+=''+ypmc+'：</label>';
                        temp_html+='检测值：<input name="id_xx" idxx="'+ypid+'_'+jcxmid+'" type="text" id="jcz"style="width: 50px;"  value="'+jcz+'"/>';
                        temp_html+='温度：<input   type="text" id="wd" style="width: 50px;" value="'+wd+'"/>';
                        temp_html+='湿度：<input   type="text" id="sd" style="width: 50px;" value="'+sd+'"/>';
                        temp_html+='</div></div></div>';
                        html+=temp_html;
                    }
                    var ypmcdom = jqueryMap.$editForm.find('#div_continer');
                    ypmcdom.html(html);
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
