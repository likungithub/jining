/**
 * Created by huxinquan on 2017/7/4.
 */
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
var userinfoEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UEditorContainer: null,
        dataUrl: '/user/users',
        UUID: '',
        id: '',
        name:''
    };

    // 全局Dom
    var jqueryMap = {
        $userinfoForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$userinfoForm = $('#userinfoForm');
    };

    var saveUserInfo = function (callback) {
    	
    	var name = jqueryMap.$userinfoForm.find('[name="name"]').val();
        var ifChangName = '0'; //未改变
        if (name != configMap.name) {
        	ifChangName = '1'; //改变了
        }
        var data = {
        	name: name,
            xbdm: jqueryMap.$userinfoForm.find('input[name="xbdm"]:checked').val(), //性别
            csrq: jqueryMap.$userinfoForm.find('input[name="csrq"]').val(), //出生日期
            cyrq: jqueryMap.$userinfoForm.find('input[name="cyrq"]').val(), //从业日期
            email: jqueryMap.$userinfoForm.find('input[name="email"]').val(),
            tel: jqueryMap.$userinfoForm.find('input[name="tel"]').val(),//联系电话
            yddh: jqueryMap.$userinfoForm.find('input[name="yddh"]').val(),//手机
            qq: jqueryMap.$userinfoForm.find('input[name="qq"]').val(), //QQ
            remark: jqueryMap.$userinfoForm.find('input[name="bzxx"]').val(),
            lxdz: jqueryMap.$userinfoForm.find('input[name="lxdz"]').val(),
            ifChangName:ifChangName
        };
        
        function isName(data) {
            return /^[·\u4E00-\u9FA5]{1,20}|[A-Za-z·]{1,20}$/.test(data);
        }
        if(data.name == "" || data.name == null){
        	Messenger().post({message: '用户姓名不能为空!', type: 'error', id:'errorMessenger'});
        	return false;
        } else {
        	var nameCheck = /^[·\u4E00-\u9FA5]{1,20}|[A-Za-z·]{1,20}$/;
    		if(!nameCheck.test(data.name)) {
    			Messenger().post({message: '用户姓名应为20位以内的中文或英文！', type: 'error', id:'errorMessenger'});
                return false;
            }
        }

    	if(data.email == ""){
    		Messenger().post({message: '请输入邮箱!', type: 'error', id:'errorMessenger'});
        	return false;
    	}
    	else{
    		var emailCheck = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    		if(!emailCheck.test(data.email)) {
    			Messenger().post({message: '邮箱格式错误!', type: 'error', id:'errorMessenger'});
    			return false;
    		} else {
                if(data.yddh == ""){
                	Messenger().post({message: '请输入手机号码!', type: 'error', id:'errorMessenger'});
                    return false;
                }
                else{
                    if(!whetherOrNotMobil(data.yddh)){
                    	Messenger().post({message: '请输入正确的手机号码!', type: 'error', id:'errorMessenger'});
                        return false;
                    }
                    else{
                    	var telReg = /^$|^((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5}))$/;
                    	  if(!telReg.test(data.tel)){
                    		  Messenger().post({message: '请输入正确的电话号码,格式xxxx-xxxxxxx!', type: 'error', id:'errorMessenger'});
                              return false;
                          }
                        else{
                        	var qqReg = /^$|^[1-9][0-9]{4,}$/;
                      	    if(!qqReg.test(data.qq)){
                      		    Messenger().post({message: '请输入正确的qq号码!', type: 'error', id:'errorMessenger'});
                                return false;
                            }
                        	else{
                        		var blockTarget = jqueryMap.$userinfoForm.closest(".modal-content");
                                App.blockUI({
                                    target: blockTarget,
                                    boxed: true,
                                    message: '正在保存数据...'
                                });
                                if (configMap.id) {
                                    $.ajax({
                                        url: configMap.path + configMap.dataUrl + '/user/' + configMap.id,
                                        type: 'PUT',
                                        contentType: 'application/json; charset=utf-8',
                                        dataType: 'JSON',
                                        data: JSON.stringify(data),
                                        success: function (res) {
                                            App.unblockUI(blockTarget);
                                            if (res.success) {
                                            	var len = 0;
                                                for (var i = 0; i < data.name.length; i++) {
                                                    var a = data.name.charAt(i);
                                                    if (a.match(/[^\x00-\xff]/ig) != null) {
                                                        len += 2;
                                                    } else {
                                                        len += 1;
                                                    }
                                                }
                                                if (len > 6) {
                                                    $('.username').text(data.name.substr(0, 3) + "...");
                                                } else {
                                                    $('.username').text(data.name);
                                                }
                                                callback(true);
                                            } else {
                                            	Messenger().post({message: res.message + '!', type: 'error', id:'errorMessenger'});
                                            	callback(false);
                                            }
                                        },
                                        error: function () {
                                            App.unblockUI(blockTarget);
                                            Messenger().post({message: '保存失败！', type: 'error', id:'errorMessenger'});
                                            callback(false);
                                        }
                                    });
                                }
                        	}
                        }
                    }
                }
            }
    	}
    };


    var getEwm = function () {
        $.ajax({
            url: '/customermanage/customerManage/getCustomerEwm',
            dataType: 'JSON',
            type: 'POST',
            success: function (data) {
                if(data.result=="success"){
                	var $config = {
                			url                 : "" + data.url + "", 
                			source              : '来源', 
                			title               : '财云互联——会计就在您身边!',
                			description         : '搭建财税服务共享桥梁!',
                			image               : "http://12212456.s21i-12.faiusr.com/4/ABUIABAEGAAgu9GwywUo4qzD6AIwgAQ4gAQ.png", 
                			sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], 
                			disabled            : ['google', 'facebook', 'twitter'], 
                			wechatQrcodeTitle   : "微信扫一扫：分享", 
                			wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下二维码</p><p>便可将注册链接分享至朋友圈。</p>'};
                			$('.social-myshare').share($config);
                    $("#id_ewm").attr("src",data.data);
                    $("#id_url").text(data.url);
                }else {
                    bootbox.alert('获取注册二维码失败！');
                }
            },
            error: function () {
                bootbox.alert('获取注册二维码失败！');
            }
        });
    };


    var getUserInfo = function (id) {
        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/user/' + id,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    jqueryMap.$userinfoForm.find('input[name=userAccount]').val(data.userAccount);
                    jqueryMap.$userinfoForm.find('input[name="roleInfo"]').val(data.roleInfo);
                    jqueryMap.$userinfoForm.find('input[name="name"]').val(data.name);
                    configMap.name = data.name;
                    jqueryMap.$userinfoForm.find('input[name=xbdm][value="' + data.xbdm + '"]').iCheck('check');
                    jqueryMap.$userinfoForm.find('input[name="csrq"]').val(moment(data.csrq).format('YYYY-MM-DD'));
                    if (data.cyrq != null && data.cyrq != "" && data.cyrq !='undefined' ) {
                        jqueryMap.$userinfoForm.find('input[name="cyrq"]').val(moment(data.cyrq).format('YYYY-MM-DD'));
                    }else {
                        jqueryMap.$userinfoForm.find('input[name="cyrq"]').val(moment().format('YYYY-MM-DD'));
                    }
                    jqueryMap.$userinfoForm.find('input[name="email"]').val(data.email);
                    jqueryMap.$userinfoForm.find('input[name="yddh"]').val(data.yddh);
                    jqueryMap.$userinfoForm.find('input[name="tel"]').val(data.tel);
                    jqueryMap.$userinfoForm.find('input[name="qq"]').val(data.qq);
                    jqueryMap.$userinfoForm.find('input[name="bzxx"]').val(data.remark);
                    jqueryMap.$userinfoForm.find('input[name="lxdz"]').val(data.lxdz);
                },
                error: function () {
                    bootbox.alert('获取个人信息失败！');
                }
            });
        }
    };

    return {
        // 初始化
        init: function (id) {
            //getEwm();
            configMap.id = id;
            setJqueryMap();
            getUserInfo(id);

            $('.csrq').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            $('.cyrq').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            $('input[name="xbdm"]').iCheck({
                radioClass: 'iradio_minimal',
                increaseArea: '20%'
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveUserInfo: function (callback) {
        if (jqueryMap.$userinfoForm.valid()) {
            saveUserInfo(callback);
        }
        else {
            callback(false);
        }
    }
    };
}();
//@ sourceURL=userinfoedit.js