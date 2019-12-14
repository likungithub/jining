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
var productEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/product/product',
        schedule : '/product/schedule',
        id: '',
        get:null
    };

    // 全局Dom
    var jqueryMap = {
			$productForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$productForm = $('#productForm');
    };
    var getSchedule = function (){
		$.ajax({
			url : configMap.path + configMap.schedule,
			dataType : 'JSON',
			type : 'GET',
			success : function(result) {
				sessionStorage.status = result.startStatus;
				$(".progress-bar",jqueryMap.$productForm).css("width",result.schedule);
		        $(".progress-value",jqueryMap.$productForm).html(result.schedule);
			},
		});
	};
    var saveProduct = function (callback) {
        var blockTarget = jqueryMap.$productForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var data = {
//        	productNumber: $('input[name="productNumber"]').val(),
        	productName: $('input[name="productName"]').val(),
        	productDescription: $('textarea[name="productDescription"]').val(),
        	downloadAddress: $('input[name="downloadAddress"]').val(),
        	remark: $('textarea[name="remark"]').val()
        };
        var  AppAlert=function(msg){
            App.alert({
                container: jqueryMap.$productForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: msg,
                closeInSeconds:3,
                icon: 'fa fa-warning'
            });
        }
        //产品编号不能为空
//        if(!data.productNumber){
//            App.unblockUI(blockTarget);
//            AppAlert('产品编号不能为空哟');
//            return;
//        }
        //产品名称不能为空
        if(!data.productName){
            App.unblockUI(blockTarget);
            AppAlert('产品名称不能为空!');
            return;
        }
        //产品描述不能为空呦
        if(!data.productDescription){
            App.unblockUI(blockTarget);
            AppAlert('产品描述不能为空!');
            return;
        }
        if(data.productName.length>50){
        	App.unblockUI(blockTarget);
            AppAlert('产品名称不能超过50字!');
            return;
        }
        if(data.productDescription.length>500){
        	App.unblockUI(blockTarget);
            AppAlert('产品描述不能超过500字!');
            return;
        }
        if(data.downloadAddress.length>500){
        	App.unblockUI(blockTarget);
            AppAlert('下载地址不能超过500字!');
            return;
        }
        if(data.remark.length>500){
        	App.unblockUI(blockTarget);
            AppAlert('备注信息不能超过100字!');
            return;
        }
        
        var url = configMap.path + configMap.dataUrl;
        if (configMap.id) {
            url = url + "/" + configMap.id;
            if($("input[id^='imgTest']")[0].files[0]!=null&&$("input[id^='imgTest']")[0].files[0].size>=2097152){
            	App.unblockUI(blockTarget);
                AppAlert('请上传指定大小以内的文件！');
                return;
            }
        } else {
        	//上传文件大小
            if($("input[id^='imgTest']")[0].files[0]==null||$("input[id^='imgTest']")[0].files[0].size>=2097152){
            	App.unblockUI(blockTarget);
                AppAlert('请上传指定大小以内的文件！');
                return;
            }
        }
        var inputform = {
    		url: url,
            type: 'POST',
            dataType: 'json',
//            contentType: 'application/json; charset=utf-8',
//            data: JSON.stringify(data),
            headers: {"ClientCallMode": "ajax"}, //添加请求头部
            beforeSend:function(){
            	$("#schedule").css("display","block");
				configMap.get = window.setInterval(getSchedule,"500");	
			},
			complete:function(){
				clearInterval(configMap.get);
				$(".progress-bar",jqueryMap.$productForm).css("width","100%");
		        $(".progress-value",jqueryMap.$productForm).html("100%");
				sessionStorage.removeItem("status");
			},
            success: function (data) {
                App.unblockUI(blockTarget);
                if(data.success){
                	Messenger().post({
						message : "保存成功！",
					});
                	callback(true);
                } else {
                	Messenger().post({
						message : data.message,
						type : 'error'
					});
                	callback(false);
                }
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$productForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
                callback(false);
            }
        }
        $("#productForm").ajaxSubmit(inputform);
    };

    var getProduct = function (id) {
		$.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
//                $('[name="productNumber"]').val(data.productNumber);
                $('[name="productName"]').val(data.productName);
                $('[name="productDescription"]').val(data.productDescription);
                $('[name="downloadAddress"]').val(data.downloadAddress);
                if(data.productImg!=null&&data.productImg!=""){
                	$('#showImg').css('display','block');
                    $('[name="showImg"]').attr('src',data.productImg);
                }
                $('[name="remark"]').val(data.remark);
            },
            error: function () {
                bootbox.alert('获取参数信息失败！');
            }
        });
    };

    var productValidation = function () {
        jqueryMap.$productForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: { 
//            	productNumber: {
//                    minlength: 2,
//                    required: true
//                },
                productName: {
                    minlength: 2,
                    required: true
                }
            },
            messages: { // 自定义显示消息
//            	productNumber: {
//                    required: "请填写产品编号！"
//                },
                productName: {
                    required: "请填写产品名称！"
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
            // productValidation();
            if (configMap.id) {
                getProduct(configMap.id);
            }
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        // 保存雇员信息，参数为回掉函数
        saveProduct: function (callback) {
            if (jqueryMap.$productForm.valid()) {
                saveProduct(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js