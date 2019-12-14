var customerAdd = function() {
	'use strict';

	// 全局属性参数
	var configMap = {
		path : '',
		dataUrl : '/customer/customer',
		id : ''
	};

	// 全局Dom
	var jqueryMap = {
		$customerForm : null
	};

	var setJqueryMap = function() {
		jqueryMap.$customerForm = $('#customerForm');
	};

	var savecustomer = function(callback) {
		var blockTarget = jqueryMap.$customerForm.closest(".modal-content");
		App.blockUI({
			target : blockTarget,
			boxed : true,
			message : '正在保存数据...'
		});

		var data = {
			name : $('input[name="name"]').val(),
			yhzh : $('input[name="yhzh"]').val(),
			create_date : $('input[name="createDate"]').val(),
			state : $('input[name="state"]:checked').val(),
			qylx_dm : $('input[name="qylxDm"]').val(),
			sjhm : $('input[name="sjhm"]').val(),
			nsrsbh : $('input[name="nsrsbh"]').val(),
			zydm : $('input[name="zydm"]').val(),
			szsf : $('input[name="szsf"]').val(),
			szcs : $('input[name="szcs"]').val(),
			email : $('input[name="email"]').val(),
			bzxx : $('input[name="bzxx"]').val(),
			yhzt_dm : $('input[name="yhztDm"]').val(),
			logo : $('input[name="logo"]').val(),
		};
		var url = configMap.path + configMap.dataUrl;
		var requestType = 'POST';
		if (configMap.id) {
			url = url + "/" + configMap.id;
			requestType = 'PUT';
		}

		$.ajax({
			url : url,
			type : requestType,
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(data),
			success : function() {
				App.unblockUI(blockTarget);
				callback(true);
			},
			error : function() {
				App.unblockUI(blockTarget);
				App.alert({
					container : jqueryMap.$customerForm.closest(".modal-body"),
					place : 'prepend',
					type : 'danger',
					message : '保存失败！',
					icon : 'fa fa-warning'
				});
				callback(false);
			}
		});
	};

	var getcustomer = function(id) {
		$.ajax({
			url : configMap.path + configMap.dataUrl + '/' + id,
			dataType : 'JSON',
			type : 'GET',
			success : function(data) {
				$('[name="name"]').val(data.name);
				$('[name="yhzh"]').val(data.yhzh);
				$('.createDate').datepicker('update',
						moment(data.createDate).format('YYYY-MM-DD'));
				$('[value="' + data.state + '"]').attr('checked', true);
				//$('[name="state"]').attr('checked', true);
				$('[name="qylxDm"]').val(data.qylxDm);
				$('[name="sjhm"]').val(data.sjhm);
				$('[name="nsrsbh"]').val(data.nsrsbh);
				$('[name="zydm"]').val(data.zydm);
				$('[name="szsf"]').val(data.szsf);
				$('[name="szcs"]').val(data.szcs);
				$('[name="email"]').val(data.email);
				$('[name="bzxx"]').val(data.bzxx);
				$('[name="yhztDm"]').val(data.yhztDm);
				$('[name="logo"]').val(data.logo);
			},
			error : function() {
				bootbox.alert('获取信息失败！');
			}
		});
	};

var customerValidation = function () {
jqueryMap.$customerForm.validate({
			errorElement : 'span',
			errorClass : 'help-block help-block-error',
			focusInvalid : false,
			ignore : "",
			rules : {},
			messages : { // 自定义显示消息
			},
			errorPlacement : function(error, element) { // 为每种input设置错误输出位置
				if (element.parent(".input-group").size() > 0) {
					error.insertAfter(element.parent(".input-group"));
				} else if (element.attr("data-error-container")) {
					error.appendTo(element.attr("data-error-container"));
				} else if (element.parents('.checkbox-list').size() > 0) {
					error.appendTo(element.parents('.checkbox-list').attr(
							"data-error-container"));
				} else if (element.parents('.radio-list').size() > 0) {
					error.appendTo(element.parents('.radio-list').attr(
							"data-error-container"));
				} else {
					error.insertAfter(element);
				}
			},
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
	};

	return {
		// 初始化
		init : function(id) {
			configMap.id = id;
			setJqueryMap();
			$('.createDate').datepicker({
				clearBtn : true,
				format : 'yyyy-mm-dd',
				autoclose : true,
				language : 'zh-CN'
			});

			// 控件验证
			customerValidation();
			//若id不为空，展示已有数据
			if (configMap.id) {
				getcustomer(configMap.id);
			}else{
				$('input[name=state][value="true"]').iCheck('check');
			}
			
		},
		// 设置路径
		setPath : function(path) {
			configMap.path = path;
		},
		// 保存雇员信息，参数为回掉函数
		savecustomer : function(callback) {
			if (jqueryMap.$customerForm.valid()) {
				savecustomer(callback);
			} else {
				callback(false);
			}
		}
	};
}();