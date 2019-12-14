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
var paramsAdd = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/params/params',
        adddataUrl: '/params/addparams',
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
            typecode: $('input[name="typecode"]').val(),
        	paramsname: $('input[name="paramsname"]').val(),
        };
        if(!data.paramsname){
                App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$paramsForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请填写参数名称！",
                icon: 'fa fa-warning'
            });
            return;
        }

        var url = configMap.path + configMap.adddataUrl;
        var requestType = 'POST';
        url = url + "/" + configMap.id;

		$.ajax({
            url: url,
            type: requestType,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function () {
                App.unblockUI(blockTarget);
                callback(true);
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
                $('[name="typecode"]').val(data.typecode);
                $('[name="typename"]').val(data.typename);
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
                paramsname: {
                    required: true,
                    minlength: 2
                },
            },
            messages: { // 自定义显示消息
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