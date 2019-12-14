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
var customergettingstartededitcgs = function() {
	'use strict';

	// 全局属性参数
	var configMap = {
		get:null,		
		path : '',
		dataUrl : '/customergettingstarted/insertFile',
		id : '',
		schedule:'/customergettingstarted/schedule'	
	};
	//获取真实路径
	var getPath = function(obj, fileQuery, transImg) {

		if (window.navigator.userAgent.indexOf("MSIE") >= 1) {

			obj.select();

			var path = document.selection.createRange().text;

			obj.removeAttribute("src");

			obj.setAttribute("src", transImg);

			obj.style.filter ="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + path
					+ "', sizingMethod='scale');";

		}

		else {

			var file = fileQuery.files[0];

			var reader = new FileReader();

			reader.onload = function(e) {

				obj.setAttribute("src", e.target.result);

			}

			reader.readAsDataURL(file);

		}

	}
	// 全局Dom
	var jqueryMap = {
			
		$customergettingstartedForm : null
	};

	var setJqueryMap = function() {
		jqueryMap.$customergettingstartedForm = $('#customergettingstartedForm');
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
	var savecustomergettingstarted = function(callback) {
		var blockTarget = jqueryMap.$customergettingstartedForm
				.closest(".modal-content");
		/*App.blockUI({
			target : blockTarget,
			boxed : true,
			message : '正在保存数据...'
		});*/

		var data = {
			fileName : $('input[type="file"]', $('#customergettingstartedForm')).val(),
			fileContent : $('input[name="userInfo.userName"]', $('#customergettingstartedForm')).val()
		};
		if (!data.fileName) {
			Messenger().post({
				message: '附件为必填项',
				type: 'warning',
				id: 'fileContent'
			});
			return;
		}
        var ExtendedName=data.fileName.substr(-3,3);
        if(!(ExtendedName=='xls'||ExtendedName=='doc'||ExtendedName=='pdf')){
            Messenger().post({
                message: '附件格式只能是pdf、doc、xls',
                type: 'warning',
                id: 'fileContent'
            });
            return;
        }
		
		var file = $('input[type="file"]').val()

		var url = configMap.path + configMap.dataUrl;
		var requestType = 'POST';

		 if (!""===configMap.id) {
	            var data = {
	                fileContent: $("#fileContent").val(),
	                id: $("[name='id']").val()
	            };
	            $("#btnaaa").click(function () {
	                $.ajax({

	                    url: '/systemmanager/customergettingstarted/updatefileContent',
	                    type: 'post',
	                    data: JSON.stringify(data),
	                    dataType: 'json',
	                    contentType: 'application/json; charset=utf-8',
	                    success: function (data) {

	                        customergettingstarted.reload();
	                        return true;
	                    }
	                });
	            });

	        } else {
	            var value = $("#pic").val();
	            var fileContent = $("#fileContent").val();
	            var option = {
	                url: '/systemmanager/customergettingstarted/insertFile',
	                type: 'POST',
	                dataType: 'json',
	                headers: {"ClientCallMode": "ajax"}, //添加请求头部
	                beforeSend:function(){
	                	$("#schedule").css("display","block");
	    				configMap.get = window.setInterval(getSchedule,"500");	
	    			},
	    			complete:function(){
	    				clearInterval(configMap.get);
	    				$(".progress-bar",jqueryMap.$customergettingstartedForm).css("width","100%");
	    				$(".progress-value",jqueryMap.$customergettingstartedForm).html("100%");
	    				sessionStorage.removeItem("status");
	    			},
	                success: function (data) {
	                    if(data.success){
		                    App.unblockUI(blockTarget);
		                    callback(true);
	                    }else{
	                    	Messenger().post({
		            			message: data.message,
		        				type: 'error'
		            		});
	                    }
	                    
	                },
	                error: function (data) {
	                	 App.unblockUI(blockTarget);
	                     App.alert({
	                         container: jqueryMap.$customergettingstartedForm.closest(".modal-body"),
	                         place: 'prepend',
	                         type: 'danger',
	                         message: '保存失败！',
	                         icon: 'fa fa-warning'
	                     });
	                     callback(false);
	                 }
	                
	            };
	            $("#customergettingstartedForm").ajaxSubmit(option);
	            return false; //最好返回false，因为如果按钮类型是submit,则表单自己又会提交一次;返回false阻止表单再次提交
	        }
	};

	var getcustomergettingstarted = function() {
		if(configMap.id){
		     var ui =document.getElementsByName("file");
		     for (var i = 0; i<ui.length;i++) {
		    	 ui[i].style.display="none";
		    	 };
		     
			$.ajax({
				url : configMap.path + "/customergettingstarted/findFileContent?id=" + configMap.id,
				dataType : 'JSON',
				type : 'GET',
				success : function(data) {
					$('[name="userInfo.userName"]').val(data.fileContent);
				},
				error : function() {
					bootbox.alert('获取文件描述失败！');
				}
			});
			$()
		}
		
	};

	
	var customergettingstartedValidation = function() {
		jqueryMap.$customergettingstartedForm.validate({
			errorElement : 'span',
			errorClass : 'help-block help-block-error',
			focusInvalid : false,
			ignore : "",
			rules : { // rules 中的属性name、code、sex等为Input的name属性值
				fileContent : {
					minlength : 2,
					required : true
				},
			},
//			messages : { // 自定义显示消息
//				sex : {
//					required : "请选择性别！"
//				},
//				interest : {
//					required : "请选择至少2个兴趣爱好！",
//					minlength : jQuery.validator.format("请选择至少{0}个兴趣爱好！")
//				}
//			},
//			errorPlacement : function(error, element) { // 为每种input设置错误输出位置
//				if (element.parent(".input-group").size() > 0) {
//					error.insertAfter(element.parent(".input-group"));
//				} else if (element.attr("data-error-container")) {
//					error.appendTo(element.attr("data-error-container"));
//				} else if (element.parents('.checkbox-list').size() > 0) {
//					error.appendTo(element.parents('.checkbox-list').attr(
//							"data-error-container"));
//				} else if (element.parents('.radio-list').size() > 0) {
//					error.appendTo(element.parents('.radio-list').attr(
//							"data-error-container"));
//				} else {
//					error.insertAfter(element);
//				}
//			},
			highlight : function(element) { // 高亮显示控件form-group和has-error都是样式类
				$(element).closest('.form-group').addClass('has-error');
			},
			unhighlight : function(element) { // 取消高亮显示
				$(element).closest('.form-group').removeClass('has-error');
			},
			success : function(label) {
				label.closest('.form-group').removeClass('has-error');
			}
		});
		// 日期发生变化时重新验证
//		$('input[name="userInfo.userName"]').change(function() {
//			jqueryMap.$customergettingstartedForm.validate().element($(this));
//		});
	};

	return {
		// 初始化
		init : function(id) {
			configMap.id = id;
			setJqueryMap();
			// 控件验证
			getcustomergettingstarted();
			// customergettingstartedValidation();
			if (configMap.id) {
				getcustomergettingstarted(configMap.id);
			}
		},
		// 设置路径
		setPath : function(path) {
			configMap.path = path;
		},
		// 保存雇员信息，参数为回掉函数
		savecustomergettingstarted : function(callback) {
			if (jqueryMap.$customergettingstartedForm.valid()) {
					savecustomergettingstarted(callback);
				
			} else {
				callback(false);
			}
		}
	};
}();
// @ sourceURL=edit.js
