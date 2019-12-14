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
var appiconAdd = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
    	get:null,	
        path: '',
        adddataUrl: '/appiconmanager/addappicon',
        id: '',
        schedule:'/appiconmanager/schedule'	
    };

    // 全局Dom
    var jqueryMap = {
			$addappicontForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$addappicontForm = $('#addappicon');
    };
    var getSchedule = function (){
		$.ajax({
			url : configMap.path + configMap.schedule,
			dataType : 'JSON',
			type : 'GET',
			success : function(result) {
				sessionStorage.status = result.startStatus;
				$(".progress-bar",jqueryMap.$addappicontForm).css("width",result.schedule);
				 $(".progress-value",jqueryMap.$addappicontForm).html(result.schedule);
			},
		});
	};
    var addappicont = function (callback) {
        var blockTarget = jqueryMap.$addappicontForm.closest(".modal-content");
        var picName=$('#addappicon input[name="file"]').val();
        console.log(picName,'mdw');
        function  warnimgTip(type,msg){
            App.alert({
                container:jqueryMap.$addappicontForm.closest(".modal-body"),
                place: 'prepend',
                type: type,
                message:msg,
                icon: 'fa fa-warning'
            });
        }
        if(!$('#addappicon input[name="file"]').val()){

            warnimgTip('danger','上传图片不能为空,请选择需要上传的图片！');
            return false;
        }

            if(! (picName.slice(-4)=='.jpg'||picName.slice(-4)=='.gif'||picName.slice(-4)=='.png'||picName.slice(-5)=='.jpeg'))
            {   warnimgTip('warning','上传图片格式不正确,图片的拓展名只能是png 、jpg、 jpeg 、gif格式！');
                return false;
            }
        if(!$('#addappicon input[name="pictureName"]').val()){
            warnimgTip('warning','请填写图片名称！');
            return;
        }
        if(!$('#addappicon input[name="pictureContent"]').val()){
            warnimgTip('warning','请填写图片描述！');
            return;
        }
        if(!$('#addappicon input[name="momeInfo"]').val()){
            warnimgTip('warning','请填写备注信息！');
            return;
        }
        if(!$('#startimeInput',jqueryMap.$addappicontForm).val()){
            warnimgTip('warning','请选择有效期起！');
            return;
        }
        if(!$('#endimeInput',jqueryMap.$addappicontForm).val()){
            warnimgTip('warning','请选择有效期止！');
            return;
        }
        if($('#startimeInput',jqueryMap.$addappicontForm).val()>=$('#endimeInput',jqueryMap.$addappicontForm).val()){
            warnimgTip('warning','有效期起不得晚于有效期止！');
            return;
        }

       /* App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });*/
        /*var data = {
        	type: $('input[name="type"]').val(),
            typecode: $('input[name="typecode"]').val(),
        	paramsname: $('input[name="paramsname"]').val(),
        };*/
//        if(!data.paramsname){
//                App.unblockUI(blockTarget);
//            App.alert({
//                container: jqueryMap.$addappicontForm.closest(".modal-body"),
//                place: 'prepend',
//                type: 'danger',
//                message: "请填写参数名称！",
//                icon: 'fa fa-warning'
//            });
//            return;
//        }
        var url = configMap.path + configMap.adddataUrl;
        var requestType = 'POST';
        url = url;
        var inputForm = {
            url: url,
            type: requestType,
            dataType: 'json',
            headers: {"ClientCallMode": "ajax"}, //添加请求头部
            beforeSend:function(){
            	$("#schedule").css("display","block");
				configMap.get = window.setInterval(getSchedule,"500");	
			},
			complete:function(){
				clearInterval(configMap.get);
				$(".progress-bar",jqueryMap.$addappicontForm).css("width","100%");
				$(".progress-value",jqueryMap.$addappicontForm).html("100%");
				sessionStorage.removeItem("status");
			},
            success: function () {
                App.unblockUI(blockTarget);
                callback(true);
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$addappicontForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
                callback(false);
            }
        };
        $("#addappicon").ajaxSubmit(inputForm);
    };
   
    var addappicontValidation = function () {
        jqueryMap.$addappicontForm.validate({
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
            $('#startimeAppicon1').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
            $('#endtimeAppicon1').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
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
        addappicont: function (callback) {
            if (jqueryMap.$addappicontForm.valid()) {
            	addappicont(callback);
            	
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js