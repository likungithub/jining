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
var cssh_CS = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/xydsq/xydsqCs',
        dataUrl_Zs:'/xydsq/xydsqZs',
        id: '',
        sh:'',
    };
    // 全局Dom
    var jqueryMap = {
    		$blockTarget: null,
			$contractForm: null,
			$setimg:null
    };

    var setJqueryMap = function () {
    	jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#chargeaudit_m');
    };
	//保存审核
	var saveUserInfo = function (callback){
	    var url = "";
	    if(configMap.sh=="1"){
           url =  configMap.dataUrl;
        }

        if(configMap.sh=="2"){
            url =  configMap.dataUrl_Zs;
        }
		var data = {
			sqid:configMap.id,
            splxCs: jqueryMap.$contractForm.find('input[name="splxCs"]:checked').val(),
            spyjCs: jqueryMap.$contractForm.find('textarea[name="spyjCs"]').val(),
    	}
		var blockTarget = jqueryMap.$contractForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
		$.ajax({
			url: configMap.path + url,
			type: 'POST',
            dataType: 'JSON',
            data: data,
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
			},
			error: function () {
                App.unblockUI(blockTarget);
				bootbox.alert('失败！');
			}
		});
    }
	//校验输入信息
	var checkinfo = function (){
		if($('textarea[name="spyjCs"]').val()!=null&&$('textarea[name="spyjCs"]').val()!=""&&$('textarea[name="spyjCs"]').val().length>500){
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
	}

    return {
        // 初始化
        init: function (id,sh) {
            configMap.id = id;
            configMap.sh = sh;
            setJqueryMap();
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