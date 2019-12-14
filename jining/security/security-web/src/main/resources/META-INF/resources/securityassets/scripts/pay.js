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

var paymanager = function () {
  'use strict';

  // 全局属性参数
  var configMap = {
    path: '',
    dataUrl: '/paymanager/paymanager/getTradeNo',
    payUrl: '/paymanager/paymanager/pay',
    setAuthPageUrl: '/resource/resources/set-auth.jsp',
    createUserPageUrl: '/user/users/edit.jsp',
    currentSelectedNode: null,
    optType: null,
    orgTypes: [],
    verifyType: ''
  };

  // 全局Dom
  var jqueryMap = {
    $container: null,
    $orgFrom: null,
    $blockTarget: null
    };

  var setJqueryMap = function () {
    jqueryMap.$container = $('#paymanager-content');
    jqueryMap.$blockTarget = jqueryMap.$container;
    jqueryMap.$orgFrom = $('#payForm', jqueryMap.$container);
  };
  
  //加载订单号
  var getTradeNo = function () {
	  $.ajax({
		  url:configMap.dataUrl,
		  type:'GET',
		  success:function(result){
			  $('input[name="out_trade_no"]', jqueryMap.$container).val(result); //订单编号
			  $('input[name="subject"]', jqueryMap.$container).val($('#pay_FWXM', jqueryMap.$container).html()); //订单名城
			  var a = $('#pay_SPMS', jqueryMap.$container).html();
			  $('input[name="body"]', jqueryMap.$container).val($('#pay_SPMS', jqueryMap.$container).html()); //商品描述
		  },
		  error:function(){
			  Messenger().post({message: '加载失败！', type: 'error'});
		  }
	  });
  }
  
  //支付宝支付使用
  var aliPay = function () {
	  var total_amount = $('#totalAll').html();
	  if (total_amount == null || total_amount == '' || total_amount == 0) {
		  Messenger().post({message: '金额不得为空！', type: 'error'});
		  return false;
	  } 
	  $('input[name="total_amount"]', jqueryMap.$container).val(total_amount);
	  $('input[name="tcsj"]', jqueryMap.$container).val($('#YOfSer').val()); //套餐时间
	  
	  //$('input[name="tckssj"]', jqueryMap.$container).val(); //套餐开始时间
	  
	  $("#payForm").submit();
  }
  
  var weixinPay = function () {
	  var total_amount = $('#totalAll').html();
	  if (total_amount == null || total_amount == '' || total_amount == 0) {
		  Messenger().post({message: '金额不得为空！', type: 'error'});
		  return false;
	  } 
	  $('input[name="total_amount"]', jqueryMap.$container).val(total_amount);
	  var out_trade_no = $('input[name="out_trade_no"]', jqueryMap.$container).val();
	  var subject = $('input[name="subject"]', jqueryMap.$container).val();
	  var total_amount = $('input[name="total_amount"]', jqueryMap.$container).val()*100;
	  var body = $('input[name="body"]', jqueryMap.$container).val();
	  var tcsj = $('#YOfSer', jqueryMap.$container).val();
	  var kssj = $('input[name="kssj"]', jqueryMap.$container).val();
	  var data = {
		  out_trade_no : out_trade_no,
		  subject : subject,
		  body : body,
		  kssj : kssj,
		  total_amount : total_amount,
		  tcsj : tcsj
	  };
	  //json对象转成字符串
	  //var param = JSON.stringify(data);
	  //加密
	  //param = encode64(param);
	  //界面跳转
	  //window.location.href="/wechatPaySuccess.jsp?param=" + param;

	  //先插入订单信息到数据库，然后根据id查询结果后展示二维码
      $.ajax({
          url:'/paymanager/weixinPaymanager/insertData',
          type:'POST',
          dataType: 'json',
          contentType: 'application/json; charset=utf-8',
          data:JSON.stringify(data),
          success:function(result){
              sessionStorage.setItem("order_no",result.order_no);
              window.location.href="/wechatPaySuccess.jsp";
          },
          error:function(){
              alert("提交订单失败!");
          }
      });

  };
  
  var calculateTime = function () {
  	var set = setInterval(function() {
  		configMap.amountTimes = configMap.amountTimes - 1000;
  		var days = Math.floor(configMap.amountTimes/(3600*24*1000)); //天数
          var hours = Math.floor((configMap.amountTimes - days*3600*24*1000)/(3600*1000)); //小时
          var minutes= Math.floor((configMap.amountTimes - days*3600*24*1000 - hours*3600*1000) / (60*1000)); //分钟
          var seconds= Math.floor((configMap.amountTimes - days*3600*24*1000 - hours*3600*1000 - minutes*60*1000) / 1000); //秒            
          $("#timerDays").text(days);
          $("#timerHours").text(hours);
          $("#timerMins").text(minutes);
          $("#timerSeconds").text(seconds);
      }, 1000); /*等待时间*/
  }

  var getTimer = function () {
      $.ajax({
          url: configMap.path + '/getTimer',
          dataType: 'JSON',
          type: 'GET',
          success: function (data) {
              if(data.success){
              	configMap.amountTimes = data.amountTimes;
              	var days = Math.floor(configMap.amountTimes/(3600*24*1000)); //天数
              	if (days < 0) {
              		$('#payFWQX').html('<span class="payExpireTime1">尊敬的用户您好，您财云管家服务已到期！</span>');
              	} else {
              		var hours = Math.floor((configMap.amountTimes - days*3600*24*1000)/(3600*1000)); //小时
                    var minutes= Math.floor((configMap.amountTimes - days*3600*24*1000 - hours*3600*1000) / (60*1000)); //分钟
                    var seconds= Math.floor((configMap.amountTimes - days*3600*24*1000 - hours*3600*1000 - minutes*60*1000) / 1000); //秒            
                    $("#timerDays").text(days);
                    $("#timerHours").text(hours);
                    $("#timerMins").text(minutes);
                    $("#timerSeconds").text(seconds);
                    calculateTime();
              	}
              }else {
              	bootbox.alert('获取时间失败！');
              }
          },
          error: function () {
          	bootbox.alert('获取时间失败！');
          }
      });
  };

  return {
    // 初始化
    init: function () {
      setJqueryMap();
      getTradeNo();
      getTimer();
      
      $('#aliPay', jqueryMap.$container).off().on('click', function () {
    	  aliPay();
      });
      
      $('#weixinPay', jqueryMap.$container).off().on('click', function () {
    	  weixinPay();
      });

    },
    // 设置路径
    setPath: function (path) {
      configMap.path = '';
    }
  };
}();
//@ sourceURL=org/org.js