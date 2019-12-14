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
var AppSave = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        khdm: ''
    };
    var jsonMap = {
        payService: []
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $appForm: null,
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$appForm = $('#appZH');
    };
    
    var initData = function () {
    	$.ajax({
    		url:'/customermanage/ptkhxx/getKhZh?khbm=' + configMap.khdm,
    		type:'GET',
    		success:function(data){
    			if (data.success) { //有值
    				var khxx = data.data;
    				jqueryMap.$appForm.find('[name="nowZh"]').val(khxx.sjhm);
    				jqueryMap.$appForm.find('[name="bzxx"]').val(khxx.bzxx);
    			} else {
    				Messenger().post({
    	                message: '该客户暂未注册手机APP账号！',
    	                type: 'error'
    	              });
    				jqueryMap.$appForm.closest(".modal-dialog").parent().modal('hide');   				
    			}
    		},
    	});
    };
    
    var saveZh = function (callback) {
    	var modifyZh = jqueryMap.$appForm.find('[name="changeZh"]').val();
    	var bzxx = jqueryMap.$appForm.find('[name="bzxx"]').val();
    	if (modifyZh == "" || modifyZh == null) {
    		Messenger().post({
                message: '修改后的账户不得为空！',
                type: 'error'
              });
    		return false;
    	} else if (!whetherOrNotMobil(modifyZh)) {
    		Messenger().post({
                message: '账号格式应为手机号码格式！',
                type: 'error'
              });
            return false;
    	} else {
    		var data = {
    			dlzh : modifyZh,
    			bzxx : bzxx,
    			khbm : configMap.khdm
    		};
            $.ajax({
            	url:'/customermanage/ptkhxx/saveKhZh',
                type: "POST",
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data:JSON.stringify(data),
                success:function(result){
                	if(result.success){
                		var res = {
                			success	: true,
                			sjhm : modifyZh
                		};
                		callback(res);
                	} else {
                        Messenger().post({
                            message: result.message + '！',
                            type: 'error'
                        });
                		var res = {
                    			success	: false
                    		};
                		callback(res);
                	}
                }
            });
    	}
    };
    
    return {
        // 初始化
        init: function (khdm) {
            configMap.khdm = khdm;
            setJqueryMap();
            initData();
            //设置页面样式
            jqueryMap.$appForm.closest(".modal-content").css("width", "500px");
            jqueryMap.$appForm.closest(".modal-dialog").css("width", "500px");
            jqueryMap.$appForm.closest(".modal-body").attr("style", "padding:15px 15px 0px 15px;height: 240px;");
            jqueryMap.$appForm.find('[id="appForm"]').find(".form-body").attr("style", "padding:0px 15px 0px 15px")
            jqueryMap.$appForm.closest(".modal-dialog").css("margin-top", "100px");
            jqueryMap.$appForm.find('[name="submitfilebutton"]').off("click").on("click", function () {
                savefile();
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveZh: function (callback) {
        	saveZh(callback);
        }
    };
}();
//@ sourceURL=edit.js