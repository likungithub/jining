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
var orderaudit = function () {
    'use strict';

    /**
     * 全局属性参数
     * @type {{path: string, dataUrl: string, id: string}}
     */
    var configMap = {
        path: '',
        dataUrl: '/chargeaudit/charge',
        id: ''
    };

    /**
     * 全局Dom
     * @type {{$blockTarget: null, $contractForm: null, $setimg: null}}
     */
    var jqueryMap = {
    		$blockTarget: null,
			$contractForm: null,
			$setimg:null
    };

    /**
     * 赋值
     */
    var setJqueryMap = function () {
    	jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#chargeaudit_m');
    };

    /**
     * 保存审核
     * @param callback
     */
	var saveUserInfo = function (callback){
		var data = {
			id:configMap.id,
			shzt: jqueryMap.$contractForm.find('input[name="shzt"]:checked').val(),
			sfzt: jqueryMap.$contractForm.find('input[name="confirm"]:checked').val(),
			shyj: jqueryMap.$contractForm.find('textarea[name="shyj"]').val()
    	};
		var blockTarget = jqueryMap.$contractForm.closest(".modal-content");
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
			success: function (datas) {
				App.unblockUI(blockTarget);
				if(datas.success){
					callback(true);
				} else {
                	App.alert({
                        container: jqueryMap.$contractForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: datas.message,
                        icon: 'fa fa-warning'
                    });
                	callback(false);
                }
                // sendMessage();
                updateMessageNumber();                                                                                  //增加首页消息提醒数量
			},
			error: function () {
                App.alert({
                    container: jqueryMap.$contractForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: "保存失败！",
                    icon: 'fa fa-warning'
                });
			}
		});
    };

    /**
     * 发送消息提醒以及极光推送
     */
	var sendMessage = function (){
	    var data = {
	      id:configMap.id
        };
        $.ajax({
            url: configMap.path + '/chargeaudit/sendmessage',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data: JSON.stringify(data),
            success: function (datas) {
            },
            error: function () {
            }
        });
    };

    /**
     * 校验输入信息
     * @returns {boolean}
     */
	var checkinfo = function (){
		if($('textarea[name="shyj"]').val() !== null && $('textarea[name="shyj"]').val() !== ""
            && $('textarea[name="shyj"]').val().length > 500){
			App.alert({
				container : jqueryMap.$contractForm.closest(".modal-body"),
				place : 'prepend',
				type : 'danger',
				message :"审核意见不能超过500字！",
				icon : 'fa fa-warning'
			});
    		return false;
		} else {
			return true;
		}
	};

    return {
        init: function (id) {                                                                                          // 初始化
            configMap.id = id;
            setJqueryMap();
            $('input[name="shzt"]',jqueryMap.$contractForm).iCheck({
                radioClass: 'iradio_minimal',
                increaseArea: '20%'
            });
            $('input:radio[name="shzt"][value="001"]',jqueryMap.$contractForm).iCheck("check");               //初始化单选框的值
            $('input[name="confirm"]',jqueryMap.$contractForm).iCheck({
                radioClass: 'iradio_minimal',
                increaseArea: '20%'
            });
            $('input:radio[name="confirm"][value="004"]',jqueryMap.$contractForm).iCheck("check");            //初始化单选框的值
            $('input:radio[name="shzt"]',jqueryMap.$contractForm).on('ifClicked',function(){
            	if($(this).val() === "001"){
            		$('input:radio[name="confirm"][value="004"]',jqueryMap.$contractForm).iCheck("check");
            	} else {
            		$('input:radio[name="confirm"][value="001"]',jqueryMap.$contractForm).iCheck("check");
            	}
            });
            $('input:radio[name="confirm"]',jqueryMap.$contractForm).on('ifClicked',function(){
            	if($(this).val() === "004"){
            		$('input:radio[name="shzt"][value="001"]',jqueryMap.$contractForm).iCheck("check");
            	} else {
            		$('input:radio[name="shzt"][value="002"]',jqueryMap.$contractForm).iCheck("check");
            	}
            });
            //textarea输入字数限制
            var obj = $("#chargeaudit_m textarea");
            var num = 300;
            var numObj = $("#chargeaudit_m .wordNum span")
            checkHowMany(obj,numObj,num);
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveUserInfo:function (callback){
        	//校验输入内容
        	if (checkinfo()) {
                saveUserInfo(callback);
            } else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js