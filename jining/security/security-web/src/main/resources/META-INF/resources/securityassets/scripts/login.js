
var Login = function () {
  var configMap = {
    path: '',
    cookiePwd: false,
    successPath: '/index',
    verifyType: '',
    gethostname: ''
  };

  var getPwd = function (ucode, password) {
    var str1 = hex_md5(password);
    return hex_md5(str1 + ucode);
  };

  var getEncryption = function (password, ucode, vcode) {
    var str2 = configMap.cookiePwd ? Cookies.get('pwd') : getPwd(ucode, password);
    var str3 = hex_md5(str2 + vcode.toUpperCase());
    return str3;
  };

  var rememberme = function (userName, pwd) {
    var remember = $('input[name="rememberme"]:checked').length > 0 ? true : false;
    if (remember) {
      Cookies.set('username', userName, {expires: 7});
      if (configMap.cookiePwd) {
        Cookies.set('pwd', pwd, {expires: 7});
      }
      else {
        Cookies.set('pwd', getPwd(userName, pwd), {expires: 7});
      }
    }

    if (!remember) {
      Cookies.remove('username');
      Cookies.remove('pwd');
    }
  };

  var login = function () {
    var loginForm = $('.login-form');
    if (loginForm.validate().form()) {
    App.blockUI({
        boxed: true,
        message: '正在登录，请稍候...'
      });

      var userName = $('input[name="username"]').val();
      var password = $('input[name="password"]').val();
      var jCaptchaCode = $('input[name="jCaptchaCode"]').val();
      var pwd = '';
      if (configMap.verifyType && configMap.verifyType.toLocaleLowerCase() === 'ad') {
        pwd = getEncryption(password, userName, jCaptchaCode) + '|@' + password;
      } else {
        pwd = getEncryption(password, userName, jCaptchaCode);
      }
      var postData = 'username=' + encodeURI(userName) + '&password=' + pwd + '&jCaptchaCode=' + jCaptchaCode;
      //生成等待中div
      
      $.ajax({
        url: configMap.path + '/login',
        type: 'POST',
        dataType: 'JSON',
        data: postData,
        success: function (result) {
        	App.unblockUI($('body'));
          if (result.failed) {
            $.messager.popup(result.msg);
            $('input[name="jCaptchaCode"]').val('');
            $('#checkCode').attr('src', 'jcaptcha.jpg?d=' + new Date() * 1);
          }
          else {
        	 
            rememberme(userName, password);
            window.location.href = configMap.path + configMap.successPath;
        	/*var ozhezhao = $("<div style='width:100px;height:150px;background:red;position:absolute;'></div>")
            $("body").append(ozhezhao);*/
          }
        },
        error: function (ex, e, ee) {
          App.unblockUI($('body'));
          $('input[name="jCaptchaCode"]').val('');
          $('#checkCode').attr('src', 'jcaptcha.jpg?d=' + new Date() * 1);
          $.messager.popup('登录失败！');
        }
      })
    }
  };

  var handleLogin = function () {
    $('.login-form').validate({
      errorElement: 'span',
      errorClass: 'help-block',
      focusInvalid: false,
      rules: {
        username: {
          required: true
        },
        password: {
          required: true
        },
        jCaptchaCode:{
            required: true
        }
      },
      messages: {
        username: {
          required: '请输入账户'
        },
        password: {
          required: '请输入密码'
        },
        jCaptchaCode: {
              required: '请输入验证码'
          }
      },
      highlight: function (element) {
        $(element)
          .closest('.form-group').addClass('has-error');
      },
      success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
      },
      errorPlacement: function (error, element) {
        if (element.attr("data-error-container")) {
          error.appendTo(element.attr("data-error-container"));
        } else {
          error.insertAfter(element.closest('.input-icon'));
        }
      }
    });

    $('#btnLogin').off().on('click', function () {
      login();
    });

    $('.login-form input').keypress(function (e) {
      if (e.which == 13) {
        login();
        return false;
      }

      if ($(this).attr('name') === 'username') {
        $('input[name="password"]').val('');
      }

      if ($(this).attr('name') === 'password') {
        configMap.cookiePwd = false;
      }
    });
  };

  var initInfo = function () {
    if (Cookies.get('username')) {
      $('input[name="username"]').val(Cookies.get('username'));
      $('input[name="password"]').val(Cookies.get('pwd'));
      $('input[name="rememberme"]').attr('checked', 'checked');
      configMap.cookiePwd = true;
    }
    $('input[name="password"]').focus(function () {
      $(this).val('');
    });

    $('input:checkbox').uniform();
    $.get(configMap.path + '/getsysinfo', null, function (result) {
      if (result) {
          $('title').text(result.title ? result.title : '财云管家');
        //$('.logo').text(result.title ? result.title : '云管家');
        //$('.copyright').text(result.copyright ? result.copyright : '云管家');

        if (result.jCaptchaDisabled) {
          $('.jCaptchaCode').hide();
        }

        configMap.verifyType = result.verifytype;
      }
    });
  };

  //验证码登录
    var countdown=60,shoujihm='123';

    function settime(obj) {
        if (countdown == 0) {
            $(obj).attr("disabled",false);
            $(obj).text("获取验证码");
            countdown = 60;
            return;
        } else {
            $(obj).attr("disabled",true);
            $(obj).text("(" + countdown + ") s 重新发送");
            countdown--;
        }
        setTimeout(function() {
                settime(obj) }
            ,1000)
    }

    /**
     * 以下为手机号码登陆
     */
    $('#gainYzm').click(function(e){
      if(!$('#log-form1 input[name="username"]').val().trim()){
          $.messager.popup('用户名不能为空');
      }else{
        $.get('/user/users/getPhone/'+$('#log-form1 input[name="username"]').val(),function(d){
            if (d.success){
                settime('#gainYzm');
                shoujihm=d.yddh;
                $('input[name="password"]').val(d.password);
                $('input[name="jCaptchaCode"]').val('1111');
              $.get('/caiyunMobile/sendMsg?dlzh='+d.yddh,function(data){
              });
            }else {
                $.messager.popup('此账户不存在，请重新输入');
                $('#log-form1 input[name="username"]').val('');
            }


        });
      }
        e.preventDefault();
    });

  //登录的时候的验证
      $('#btnLogin1').click(function(e){
          e.preventDefault();
        if(!$('#log-form1 input[name="username"]').val()){
            $.messager.popup('用户名不能为空');
            return false;
        }
          if(!$('#log-form1 input[name="yzm"]').val()){
              $.messager.popup('验证码不能为空');
              return false;
          }
          var data1 = {dlzh:shoujihm,dxyzm:$('#log-form1 input[name="yzm"]').val()};
          $.ajax({
              type:"POST",
              url:'/caiyunMobile/getDxyzm',
              data:data1,
              success: function(msg){
                  App.blockUI({
                      boxed: true,
                      message: '正在登录，请稍候...'
                  });

                  var userName = $('#log-form1 input[name="username"]').val();
                  var password = $('input[name="password"]').val(); //已经MD5加密的
                  var jCaptchaCode = $('input[name="jCaptchaCode"]').val();
                  var pwd = '';

                  var str2 = hex_md5(password + userName);
                  pwd = hex_md5(str2 + jCaptchaCode.toUpperCase());
                  var postData = 'username=' + encodeURI(userName) + '&password=' + pwd + '&jCaptchaCode=' + jCaptchaCode;
                  //生成等待中div

                  $.ajax({
                      url: configMap.path + '/phonelogin',
                      type: 'POST',
                      dataType: 'JSON',
                      data: postData,
                      success: function (result) {
                          App.unblockUI($('body'));
                          if (result.failed) {
                              $.messager.popup(result.msg);
                          }else {

                              rememberme(userName, password);
                              window.location.href = configMap.path + configMap.successPath;
                          }
                      },
                      error: function (ex, e, ee) {
                          App.unblockUI($('body'));
                          $.messager.popup('登录失败！');
                      }
                  })
              }
          });


      });
    /**
     *
     */
    var getDomainNameAllMessage=function () {
            var data={
                "domainName":encodeURI(configMap.gethostname)
            }
            console.info(configMap.gethostname)

      }

  return {
    init: function (path, successPath) {
        configMap.path = path;
        configMap.gethostname=encodeURI(window.location.hostname);
      if (successPath) {
        configMap.successPath = successPath;
      }
       // getDomainNameAllMessage();
      $('#cjwtCustomer').off('click').on('click', function () {
          window.open('/cjwt.jsp');
      });
      initInfo();
      handleLogin();
    }
  };

}();
if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<10){
	/*var timing = 3;
	if(timing == 0){
		window.open("http://rj.baidu.com/soft/detail/14744.html?ald","_blank");
		$(".toptip").hide();
	}
	var oErrorTime = setInterval(function(){
		var oError = $("<div class='toptip' style='width:100%;position:absolute;text-align:center;line-height:35px;height:45px;background:#ccc;color:#333'>您的浏览器版本过低，请下载IE9及以上版本，推荐使用chrome浏览器！"+"<span>"+timing+" s后跳转到chrome下载地址！</span>"+"</div>")
	    $("body").append(oError);
		timing--;
	},1000);*/
	 run();             //加载页面时启动定时器  
     var interval;  
     var timing = 3;
         function run() {  
            interval = setInterval(chat, "1000");  
         }  
         function chat() {  
        	 if(timing == 0){
        		 window.open("http://rj.baidu.com/soft/detail/14744.html?ald","_blank");
        			$(".toptip").hide();
        		 clearTimeout(interval);  //关闭定时器  
        	 }
             
             var oError = $("<div class='toptip' style='width:100%;position:absolute;text-align:center;line-height:45px;height:45px;background:#ccc;color:#333'>您的浏览器版本过低，请下载IE9及以上版本，推荐使用chrome浏览器！"+"<span>"+timing+" s后跳转到chrome下载地址！</span>"+"</div>")
     	    $("body").append(oError);
             timing--;
         }  

	
}


//@ sourceURL=login.js