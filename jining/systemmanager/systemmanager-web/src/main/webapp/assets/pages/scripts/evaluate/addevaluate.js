/**
 * 新增公司给员工评价页面js
 */
var addEvaluate = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl:'/evaluateuser/addevaluate'
	};
	// 全局Dom
    var jqueryMap = {
			$evaluateForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$evaluateForm = $('#evaluateFrom');
    };
    
    var saveEvaluate = function (callback) {
    	var zcd = $('#starzcd').raty('getScore');
        var zysp = $('#starzysp').raty('getScore');
        var yggl = $('#staryggl').raty('getScore');
        var ywnl = $('#starywnl').raty('getScore');
        var name = $('#name').text();
        var ygid = $('#id').val();
        var gspy = $('#gspy').val();
        //校验数据是否为空
        var AppAlert = function(message){
        	Messenger().post({message: message, type: 'error'});
    	}
        var thisTypeDom = document.getElementById('gspy');
        var textTypeErro = TextValidate(thisTypeDom,AppAlert);
        
        if(typeof(zcd)=="undefined"){
        	Messenger().post({message: '请给员工的忠诚度打分', type: 'error'});
        }else if(typeof(zysp)=="undefined"){
        	Messenger().post({message: '请给员工的专业水平打分', type: 'error'});
        }else if(typeof(yggl)=="undefined"){
        	Messenger().post({message: '请给员工的员工工龄打分', type: 'error'});
        }else if(typeof(ywnl)=="undefined"){
        	Messenger().post({message: '请给员工的业务能力打分', type: 'error'});
        }else if(thisTypeDom.value==''){
        	Messenger().post({message: '请填写公司评语', type: 'error'});
        }else if(!textTypeErro){
        	App.unblockUI(blockTarget);
        	return;
        }else{
        	//检验数据后保存
        	var blockTarget = $('body');
        	App.blockUI({
        		target: blockTarget,
        		boxed: true,
        		message: '正在保存数据...'
        	});
        	var data = {
        			zydm : ygid, //把员工ID传到后台在得出员工代码
        			zcd  : zcd*2,//星级乘以2等于总得分，一颗星等于2分
        			zysp : zysp*2,
        			yggl : yggl*2,
        			ywnl : ywnl*2,
        			ygxm : name,
        			gspy : gspy
        	};
        	
        	var url = configMap.path + configMap.dataUrl;
        	
        	$.ajax({
        		url: url,
        		type: 'PUT',
        		contentType: 'application/json; charset=utf-8',
        		data: JSON.stringify(data),
        		success: function () {
        			App.unblockUI(blockTarget);
        			Messenger().post("保存成功！");
        			$('.bootbox-close-button').trigger("click");//调用点击事件
        			callback(true);
                    $.get('/customermanage/SystemMessageController/getAllMessageReminder', null, function(result) {
                        if(result > 0) {
                            $('#announcementInfoWarningTX').removeClass('circleDisplay');
                            $('#announcementInfoWarningTX').html(result);
                            $('.top-message-m').addClass('bellSwingMessage');
                        } else {
                            $('#announcementInfoWarningTX').css({display:'none'});
                            $('.top-message-m').removeClass('bellSwingMessage');
                        }
                    });
        		},
        		error: function () {
        			Messenger().post({message: '获取数据失败！', type: 'error'});
        			callback(false);
        		}
        	});
        }
    }
    
//    var onClick = function(){
//    	saveEvaluate();
//    }
//    
    //初始化星级
    var starinit = function(){
            $("#starzcd").raty({});
            $("#starzysp").raty({});
            $("#staryggl").raty({});
            $("#starywnl").raty({});
        var reviewsArr = ["2分 失望", "4分 不满", "6分 一般", "8分 满意", "10分 很棒"];
        $("#starzcd").on("click", function(e) {
        	$("#zcd").text(reviewsArr[parseInt($("#starzcd input").val()) - 1]);
        	if($('#starzcd').raty('getScore')<=3){
        		 $("#zcd").css("color","green");
        	}else{
        		$("#zcd").css("color","red");
        	}
        });
        $("#starzysp").on("click", function(e) {
        	if ($("#starzysp input").val()) {
        		$("#zysp").text(reviewsArr[parseInt($("#starzysp input").val()) - 1]);
        		if($('#starzysp').raty('getScore')<=3){
	           		 $("#zysp").css("color","green");
	           	}else{
	           		$("#zysp").css("color","red");
	           	}
        	}
            
        });
        $("#staryggl").on("click", function(e) {
        	if ($("#staryggl input").val()) {
        		$("#yggl").text(reviewsArr[parseInt($("#staryggl input").val()) - 1]);
        		if($('#staryggl').raty('getScore')<=3){
	           		 $("#yggl").css("color","green");
	           	}else{
	           		$("#yggl").css("color","red");
	           	}
        	}
            
        });
        $("#starywnl").on("click", function(e) {
        	if ($("#starywnl input").val()) {
        		$("#ywnl").text(reviewsArr[parseInt($("#starywnl input").val()) - 1]);
        		if($('#starywnl').raty('getScore')<=3){
	           		 $("#ywnl").css("color","green");
	           	}else{
	           		$("#ywnl").css("color","red");
	           	}
        	}
            
        });
    }
    
	return {
		init: function () {
			starinit();
			$("#pub_reviews").on("click", function(e) {
				onClick();
			});
            //textarea输入字数限制
            var obj = $("#evaluateFrom textarea");
            var num = 300;
            var numObj = $("#evaluateFrom .wordNum span")
            checkHowMany(obj,numObj,num);
		},
		setPath: function (path) {
			configMap.path = path;
		},
		saveEvaluate: function (callback) {
        	saveEvaluate(callback);
        }
	};
}();
