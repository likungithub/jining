/*global $, App, moment */

var zzshView = function () {
    'use strict';

    var configMap = {
        path: '',
        dataUrl: '/customermanage/customerManage/companyImage',
        shurl:'/customermanage/customerManage/customer/updateyyzzSh',
        dljgbm:'',
    };

    var jqueryMap = {
        $container: null,
        $setimg: null
    };

    var getImgUrl = function () {
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/001/' + configMap.dljgbm,
            type: 'GET',
            success: function (result) {
                if (result.length > 0) {
                    $('#yyzz', jqueryMap.$container).attr('src',result[0].fjcclj);
                    $('#zzsh_jfzt_id').val(result[0].jfzt);
                } else {
                    $('#yyzz',jqueryMap.$container).hide();
                    $('#khwsc',jqueryMap.$container).show();
                }
            },
            error: function () {
            	Messenger().post({
                    message: '照片出错',
                    type: 'error'
                });
            }
        });
    }

    var zzShAdvise = function (callback) {
        var shzt = $('[type="checkbox"]:checked', jqueryMap.$container).val();
        if (shzt != 1 && shzt != 0) {
            Messenger().post({
                message: '请选择审批状态！',
                type: 'error'
            });
            return false;
        }
        var data = {
        	code: configMap.dljgbm,
        	zszt: shzt,
            zsry_bz: $('#shBzxx').val(),
        }
        $.ajax({
            url: configMap.path + configMap.shurl,
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
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
        init: function (dljgbm) {
            configMap.dljgbm = dljgbm;
            jqueryMap.$container.find('[name="shty"]').prop("checked", true); //默认为同意
            $('#khwsc',jqueryMap.$container).hide();
            
            //图片路径
            getImgUrl();
        },
        setPath: function (path) {
            jqueryMap.$container = $('#zzsh-manager-view-data');
        },
        zzShAdvise: function (callback) {
        	zzShAdvise(callback);
        }
    };
}();
//@ sourceURL=view.js