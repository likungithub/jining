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
var employeeEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/costprojectmanagement/insertCostProject',
        id: '',
        schedule:'/costprojectmanagement/schedule'
    };

    // 全局Dom
    var jqueryMap = {
			$employeeForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$employeeForm = $('#costprojectmanagementedit');
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
        var blockTarget = jqueryMap.$employeeForm.closest(".modal-content");
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
    /*    var data = {
            name: $('input[name="name"]').val(),
            code: $('input[name="code"]').val(),
            sex: $('input[name="sex"]:checked').val(),
            age: $('input[name="age"]').val(),
            birthday: $('input[name="birthday"]').val(),
            nationality: $('select[name="nationality"]').val(),
            interest: interest
        };*/

        var url = configMap.path + configMap.dataUrl;
        var requestType = 'POST';
        if (configMap.id) {
            url = '/systemmanager/costprojectmanagement/updateCostProject' + "/" + configMap.id;
            requestType = 'POST';
        }

        var option={
        	 url: url,
             type: requestType,
             dataType: 'json',
             headers: {"ClientCallMode": "ajax"}, //添加请求头部
             beforeSend:function(){
             	// $("#schedule").css("display","block");
                 console.info($('[name="photo"]').val());
                 if($('[name="photo"]').val()!=null&&$('[name="photo"]').val()!=""){
                     $("#schedule").css("display","block");
                     // $("#schedule").css("display","none");
                 }
                 // else {
                 //
                 // }
 				configMap.get = window.setInterval(getSchedule,"500");	
 			},
 			complete:function(){
 				clearInterval(configMap.get);
 				$(".progress-bar",jqueryMap.$employeeForm).css("width","100%");
 				$(".progress-value",jqueryMap.$employeeForm).html("100%");
 				sessionStorage.removeItem("status");
 			},
             success:function(data){
            	 if(data.success){
	                    App.unblockUI(blockTarget);
	                    callback(true);
                 }else{
                	 App.unblockUI(blockTarget);
                     App.alert({
                         container: jqueryMap.$employeeForm.closest(".modal-body"),
                         place: 'prepend',
                         type: 'danger',
                         message: data.message,
                         icon: 'fa fa-warning'
                     });
                 }  
             },
             error:function(){
            	 App.unblockUI(blockTarget);
                 App.alert({
                     container: jqueryMap.$employeeForm.closest(".modal-body"),
                     place: 'prepend',
                     type: 'danger',
                     message: '保存失败！',
                     icon: 'fa fa-warning'
                 });
                 callback(false);
             }
        };
        $('#costprojectmanagementedit').ajaxSubmit(option);
        return false;
    };
    var costprojectmanagementYanzheng=function(){
    	console.info(jqueryMap.$employeeForm);
    	console.info($('[name="name"]').val()=="");
    	if($('[name="name"]').val()==""){
    		App.alert({
				container : jqueryMap.$employeeForm.closest(".modal-body"),
				place : 'prepend',
				type : 'danger',
				message :"项目名称不得为空！",
				icon : 'fa fa-warning'
			});
    		return false;
    	}else if($('[name="businessType"]').val()==""){
            App.alert({
                container : jqueryMap.$employeeForm.closest(".modal-body"),
                place : 'prepend',
                type : 'danger',
                message :"业务类型不得为空！",
                icon : 'fa fa-warning'
            });
            return false;
        }/*else if($('#charge',jqueryMap.$employeeForm).val()==""){
    		App.alert({
				container : jqueryMap.$employeeForm.closest(".modal-body"),
				place : 'prepend',
				type : 'danger',
				message :"收费标准不得为空！",
				icon : 'fa fa-warning'
			});
    		return false;
    	}else if($('#discount',jqueryMap.$employeeForm).val()==''){
    		App.alert({
				container : jqueryMap.$employeeForm.closest(".modal-body"),
				place : 'prepend',
				type : 'danger',
				message :"费用折扣不得为空！",
				icon : 'fa fa-warning'
			});
    		return false;
    	}else if($('#truecost',jqueryMap.$employeeForm).val()==''){
    		App.alert({
    			container : jqueryMap.$employeeForm.closest(".modal-body"),
    			place : 'prepend',
    			type : 'danger',
    			message :"实际费用不得为空！",
    			icon : 'fa fa-warning'
    		});
        	return false;
    	}*/else{
    		return true;
    	}
    	
    };
    var getEmployee = function (id) {
		$.ajax({
            url: configMap.path + '' + '/costprojectmanagement/findById/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                $('[name="name"]',jqueryMap.$employeeForm).val(data.serviceName);
                $('[name="businessType"]',jqueryMap.$employeeForm).val(data.businessType)
                $('[name="charge"]',jqueryMap.$employeeForm).val(data.payStandard.toFixed(2));
                $('[name="discount"]',jqueryMap.$employeeForm).val(data.costDiscount);
                $('[name="truecost"]',jqueryMap.$employeeForm).val(data.actualCharge.toFixed(2));
                $('[name="serviceRole"]',jqueryMap.$employeeForm).val(data.serviceRegulations);
                $('[name="memo"]',jqueryMap.$employeeForm).val(data.memoInformation);
                surplusHowMany($("#serviceRole"),$("#serviceRoleWords"),300);
                surplusHowMany($("#memo"),$("#memoWords"),300);
            },
            error: function () {
                bootbox.alert('获取收费项目信息失败！');
            }
        });
    };

   

    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            // 控件验证
            if (configMap.id) {
                getEmployee(configMap.id);
            }
            // $('#truecost').focus(function () {
            //     var i=$('#charge',jqueryMap.$employeeForm).val();
            //     var b=$('#discount',jqueryMap.$employeeForm).val();
            //     if(i!=null&&b!=null){
            //         $('#truecost',jqueryMap.$employeeForm).val(i*(b/100));
            //     }
            // })
            jqueryMap.$employeeForm.closest(".modal-content").css("width", "656px");
            jqueryMap.$employeeForm.closest(".modal-dialog").css({"cssText":"width:656px !important"});
            $('#charge',jqueryMap.$employeeForm).blur(function () {
               if(!whetherOrNotMoney($('#charge',jqueryMap.$employeeForm).val())) {
                   $('#charge',jqueryMap.$employeeForm).val('');
               }
                $('#truecost').val(($('#charge',jqueryMap.$employeeForm).val()*$('#discount',jqueryMap.$employeeForm).val()/100).toFixed(2));
            }).blur(function(){

                if(!whetherOrNotMoney($('#charge',jqueryMap.$employeeForm).val())) {
                    $('#charge',jqueryMap.$employeeForm).val('');
                }
                $('#truecost').val(($('#charge',jqueryMap.$employeeForm).val()*$('#discount',jqueryMap.$employeeForm).val()/100).toFixed(2));
            });
            $('#discount',jqueryMap.$employeeForm).keyup(function () {

                if(isNaN($('#discount',jqueryMap.$employeeForm).val()*1)){
                    $('#discount',jqueryMap.$employeeForm).val('');
                }
                if($('#discount',jqueryMap.$employeeForm).val()>999||$('#discount',jqueryMap.$employeeForm).val()<0){
                    $('#discount',jqueryMap.$employeeForm).val('');
                }
                console.log($('#discount',jqueryMap.$employeeForm).val().search(/\./));
                if($('#discount',jqueryMap.$employeeForm).val().search(/\./)!=(-1)){
                    $('#discount',jqueryMap.$employeeForm).val('');
                }

                $('#truecost').val(($('#charge',jqueryMap.$employeeForm).val()*$('#discount',jqueryMap.$employeeForm).val()/100).toFixed(2));
            }).blur(function(){
                if(isNaN($('#discount',jqueryMap.$employeeForm).val()*1)){
                    $('#discount',jqueryMap.$employeeForm).val('');
                }
                if($('#discount',jqueryMap.$employeeForm).val()>999||$('#discount',jqueryMap.$employeeForm).val()<0){
                    $('#discount',jqueryMap.$employeeForm).val('');
                }
                if($('#discount',jqueryMap.$employeeForm).val().search(/\./)!=(-1)){
                    $('#discount',jqueryMap.$employeeForm).val('');
                }
                $('#truecost').val(($('#charge',jqueryMap.$employeeForm).val()*$('#discount',jqueryMap.$employeeForm).val()/100).toFixed(2));
            });
            //textarea输入字数限制
            var obj = $("#serviceRole");
            var num = 300;
            var numObj = $("#serviceRoleWords");
            checkHowMany(obj,numObj,num);
            var obj1 = $("#memo");
            var num = 300;
            var numObj1 = $("#memoWords");
            checkHowMany(obj1,numObj1,num);


        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        // 保存雇员信息，参数为回掉函数
        saveEmployee: function (callback) {
        	console.info("sd");
            if (costprojectmanagementYanzheng()) {
                saveEmployee(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js