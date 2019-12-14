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
var expenseadd = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/expensemanagement/expense',
        schedule : '/expensemanagement/schedule',
        id: '',
        get:null
    };

    // 全局Dom
    var jqueryMap = {
			$productForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$productForm = $('#expenseForm');
    };
    var getSchedule = function (){
		$.ajax({
			url : configMap.path + configMap.schedule,
			dataType : 'JSON',
			type : 'GET',
			success : function(result) {
				$(".progress-bar",jqueryMap.$productForm).css("width",result.schedule);
		        $(".progress-value",jqueryMap.$productForm).html(result.schedule);
			},
		});
	};
	var checkinfo = function (){
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
		if($('[name="fylx"]').val()==""||$('[name="fylx"]').val()==null){
			AppAlert('请选择费用类型');
			return false
		} else if($('input[name="cpfy"]').val()==""||$('input[name="cpfy"]').val()==null){
			AppAlert('请输入产品费用(正确的金额)！');
            return false;
		}else if($('textarea[name="bzxx"]').val().length>500){
            AppAlert('备注信息不能超过500字!');
            return false;
        } else if (configMap.id){
        	if($("input[id^='imgTest']")[0].files[0]!=null&&$("input[id^='imgTest']")[0].files[0].size>=2097152){
                AppAlert('请上传指定大小以内的文件！');
                return false;
            } else {
            	return true;
            }
		} else if($("input[id^='imgTest']")[0].files[0]==null||$("input[id^='imgTest']")[0].files[0].size>=3145728){
			AppAlert('请上传指定大小以内的文件(3M以内)！');
            return false;
		}  else {
			return true;
		}
	};
    var saveProduct = function (callback) {
        var blockTarget = jqueryMap.$productForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        /*var data = {
        	cpfy: $('input[name="cpfy"]').val(),
        	jfns: $('input[name="jfns"]').val(),
        	fyzk: $('select[name="fyzk"]').val(),
        	sjfy: $('input[name="sjfy"]').val(),
        	bzxx: $('textarea[name="bzxx"]').val()
        };*/
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
        
        var url = configMap.path + configMap.dataUrl;
        if (configMap.id) {
            url = url + "/" + configMap.id;
        }
        var inputform = {
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
				$(".progress-bar",jqueryMap.$productForm).css("width","100%");
		        $(".progress-value",jqueryMap.$productForm).html("100%");
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
        $("#expenseForm").ajaxSubmit(inputform);
    };

    var getProduct = function (id) {
		$.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
//                $('[name="productNumber"]').val(data.productNumber);
                $('input[name="cpfy"]').val(data.cpfy);
                $('input[name="fyzk"]').val(data.fyzk);
                $('select[name="jfns"]').val(data.jfns);
                $('input[name="sjfy"]').val(data.sjfy);
                if(data.tctp!=null&&data.tctp!=""){
                	$('#showImg').css('display','block');
                    $('[name="showImg"]').attr('src',data.tctp);
                }
                $('textarea[name="bzxx"]').val(data.bzxx);
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
            if (checkinfo()) {
                saveProduct(callback);
            }
            else {
                callback(false);
            }
        },
        countTotsl:function (){
        	var total = 0;
        	var cpfy = $('input[name="cpfy"]').val();
        	var jfns = $('select[name="jfns"]').val();
        	var fyzk = $('input[name="fyzk"]').val();
        	if(!whetherOrNotMoney(cpfy)){
        		App.alert({
                    container: jqueryMap.$productForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '请输入产品费用(正确的金额)！',
                    icon: 'fa fa-warning'
                });
        		$('input[name="cpfy"]').val("");
        		return false;
        	} else if(!whetherOrNotPositive(fyzk)||fyzk>100){
        		App.alert({
                    container: jqueryMap.$productForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '请输入正确的折扣（100以内，例如90即为九折）！',
                    icon: 'fa fa-warning'
                });
        		$('input[name="fyzk"]').val("100");
        		return false;
        	} else {
        		total = (parseInt(jfns)*parseFloat(cpfy)*parseInt(fyzk)/100).toFixed(2);
        		$('input[name="sjfy"]').val(total);
        	}
        }
    };
}();
//@ sourceURL=edit.js