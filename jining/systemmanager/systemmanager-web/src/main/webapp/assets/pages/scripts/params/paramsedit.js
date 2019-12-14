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
var paramsEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/params/params',
        id: ''
    };

    // 全局Dom
    var jqueryMap = {
			$paramsForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$paramsForm = $('#paramsForm');
    };

    var saveParams = function (callback) {
        var blockTarget = jqueryMap.$paramsForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var data = {
        	type: $('input[name="type"]').val(),
        	typename: $('input[name="typename"]').val(),
        	typecode: $('input[name="typecode"]').val(),
        	paramsname: $('input[name="paramsname"]').val()
        };
        var  AppAlert=function(msg){
            App.alert({
                container: jqueryMap.$paramsForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: msg,
                closeInSeconds:3,
                icon: 'fa fa-warning'
            });
        }
        //参数类型不为空并且格式正确
        if(data.type==''){
            App.unblockUI(blockTarget);
            AppAlert('参数类型不能为空');
            return;
        }else {
            var bol=/^[A-Z]{2,10}$/.test(data.type);
            if(!bol){
            App.unblockUI(blockTarget);
            AppAlert('输入格式(2-10大写英文字母)，如‘预警提醒’:YJTX');
            return;
            }
        }

        //验证类型名称不能为空
        if(data.typename==''){
            App.unblockUI(blockTarget);
            AppAlert('类型名称不能为空');
            return;
        }
        //参数代码不能为空且要求格式正确
        if(data.typecode==''){
            App.unblockUI(blockTarget);
            AppAlert('参数代码不能为空');
            return;
        }else {
            var bol=/^[0-9]{3}$/.test(data.typecode);
            if(!bol){
                App.unblockUI(blockTarget);
                AppAlert('参数代码的输入格式(3位数字)，如：001');
                return;
            }
        }
        //参数名称不能为空
        if(data.paramsname==''){
            App.unblockUI(blockTarget);
            AppAlert('参数名称不能为空');
            return;
        }

        var url = configMap.path + configMap.dataUrl;
        var requestType = 'POST';
        if (configMap.id) {
            url = url + "/" + configMap.id;
            requestType = 'PUT';
        }

		$.ajax({
            url: url,
            type: requestType,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
            	if(result.success){
            		App.unblockUI(blockTarget);
                    callback(true);
            	} else {
            		App.unblockUI(blockTarget);
                    AppAlert(result.message);
                    callback(false);
            	}
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$paramsForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
                callback(false);
            }
        });
    };

    var getParams = function (id) {
		$.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                $('[name="type"]').val(data.type);
                $('[name="typename"]').val(data.typename);
                $('[name="typecode"]').val(data.typecode);
                $('[name="paramsname"]').val(data.paramsname);
            },
            error: function () {
                bootbox.alert('获取参数信息失败！');
            }
        });
    };

    var paramsValidation = function () {
        jqueryMap.$paramsForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: { 
            	type: {
                    minlength: 2,
                    required: true
                },
                typename: {
                    minlength: 2,
                    required: true
                },
                typecode: {
                    required: true
                },
                paramsname: {
                    required: true,
                    minlength: 1
                },
            },
            messages: { // 自定义显示消息
            	type: {
                    required: "请填写参数类型！"
                },
                typename: {
                    required: "请填写类型名称！"
                },
                typecode: {
                    required: "请填写参数代码！"
                },
                paramsname: {
                    required: "请填写参数名称！"
                }
            },
            errorPlacement: function (error, element) { // 为每种input设置错误输出位置
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) {
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) {
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function (element) { // 高亮显示控件form-group和has-error都是样式类
                $(element)
                    .closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) { // 取消高亮显示
                $(element)
                    .closest('.form-group').removeClass('has-error');
            },
            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error');
            }
        });

//        // 当下拉列表值发生变化时重新验证
//        $('.nationality', jqueryMap.$paramsForm).change(function () {
//            jqueryMap.$paramsForm.validate().element($(this));
//        });
//
//        // 日期发生变化时重新验证
//        $('.birthday input[name="birthday"]').change(function () {
//            jqueryMap.$paramsForm.validate().element($(this));
//        });
    };

    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();

            // 控件验证
            // paramsValidation();
            if (configMap.id) {
                getParams(configMap.id);
            }
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        // 保存雇员信息，参数为回掉函数
        saveParams: function (callback) {
            if (jqueryMap.$paramsForm.valid()) {
                saveParams(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js