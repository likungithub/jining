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
var customeredit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
    	get:null,
        path: '',
        getdataUrl: '/customergettingstarted/findFileContent',
        dataUrl: '/customergettingstarted/updatefileContent',
        id: '',
        schedule:'/customergettingstarted/schedule'	
    };

    // 全局Dom
    var jqueryMap = {
			$employeeForm: null,
			$editForm:null
    };

    var setJqueryMap = function () {
        jqueryMap.$employeeForm = $('#customerform');
        jqueryMap.$editForm=$('#editcgsws')
    };
    var getSchedule = function (){
		$.ajax({
			url : configMap.path + configMap.schedule,
			dataType : 'JSON',
			type : 'GET',
			success : function(result) {
				sessionStorage.status = result.startStatus;
				$(".progress-bar",jqueryMap.$customergettingstartedForm).css("width",result.schedule);
				 $(".progress-value",jqueryMap.$customergettingstartedForm).html(result.schedule);
			},
		});
	};
    var saveEmployee = function (callback) {
        var blockTarget = jqueryMap.$editForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var interest = '';
        var selectedInterests = $('input[name="interest"]:checked');
        _.forEach(selectedInterests, function (value) {
            interest += value.value + ';';
        });

        var data = {	
            fileContent: $('input[name="fileContent"]').val(),
            fileContent:$('input[name="file"]').val()
        };

        var url = configMap.path + configMap.dataUrl;
        var requestType = 'POST';
        if (configMap.id) {
            url = url + "/" + configMap.id;
            requestType = 'PUT';
        }

        var option={
            url: url,
            type: 'POST',
            dataType: 'json',
            headers: {"ClientCallMode": "ajax"}, //添加请求头部
            beforeSend:function(){
            	$("#schedule").css("display","block");
				configMap.get = window.setInterval(getSchedule,"500");	
			},
			complete:function(){
				clearInterval(configMap.get);
				$(".progress-bar",jqueryMap.$editForm).css("width","100%");
				$(".progress-value",jqueryMap.$editForm).html("100%");
				sessionStorage.removeItem("status");
			},
            success: function (data) {
                App.unblockUI(blockTarget);
                if(data.success){
                    callback(true);
                } else {
                    App.alert({
                        container: jqueryMap.$editForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: data.message,
                        icon: 'fa fa-warning'
                    });
                    callback(false);
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
            }
		}
        $("#editcgsws").ajaxSubmit(option);
    };

    var getEmployee = function (id) {
		$.ajax({
            url: configMap.path + configMap.getdataUrl + '?id=' + configMap.id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                $('[name="fileContent"]').val(data.fileContent);
            },
            error: function () {
                bootbox.alert('获取雇员信息失败！');
            }
        });
    };

    var employeeValidation = function () {
        jqueryMap.$editForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: { // rules 中的属性name、code、sex等为Input的name属性值
                fileContent: {
                    minlength: 2,
                    required: true
                }
            },
            messages: { // 自定义显示消息
            	fileContent: {
                    required: "请填写"
                },
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
            // employeeValidation();
            if (configMap.id) {
                getEmployee(configMap.id);
            }
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        // 保存雇员信息，参数为回掉函数
        saveEmployee: function (callback) {
            if (jqueryMap.$editForm.valid()) {
                saveEmployee(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js