<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    response.setHeader("Pragma","No-cache");
    response.setHeader("Cache-Control","no-cache");
    response.setDateHeader("Expires", 0);
%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="zh" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="zh" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="zh">
<!--<![endif]-->

<head>
    <meta charset="utf-8"/>
    <title id="title"></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta id="companyName" name="author"/>
    <meta id="keyWord" name="keywords"  charset="utf-8"/>
    <meta id="description" name="description" charset="utf-8"/>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <link id="internetFlag" rel="shortcut icon"  type="image/x-icon" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css"
          rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/css/caiyun/public.css">
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/icheck/skins/all.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/css/components.css" rel="stylesheet" id="style_components"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/css/plugins.css" rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/securityassets/css/login.css" rel="stylesheet" type="text/css"/>

    <!--[if gte IE 9]>
    <style>
        .input-icon > i{
            left:0!important;
            top: 25px;
        }

    </style>
    <![endif]-->

    <style>
        html,body{
            height: 100%;
            width: 100%;
        }

        body{
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
        }

        #log-form1 .appPhone-m:hover+img{
            display: block;
        }
        #log-form1 .appPhone-m+img{
            top: -140px;
        }
        #switchBtnM{
            text-decoration: none;
        }
        #switchBtnM:hover{
            text-decoration: underline;
                    }
        #quickRegister,
        #quickRegister1{
            float: right;
        }
    </style>
    </head>

<body class="login">
<div id="loginTopM">
    <div class="wrap">

    </div>
    <div class="wrap1" style="
    float:  right;
    margin-right: 20%;
    height: 50px;
    line-height:  50px;
">
        <span id="servicePhone">
        </span>
    </div>
</div>
<div id="wrap">
    <section id="mid">
        <div class="content" style="position: relative;height: 100%;">
            <%--添加手机验证码登录的方式--%>
            <div class="form-actions mobileVerification text-center" style="margin-bottom: 20px">
                <a href="javascript:void(0)" id="switchBtnM" data-sign="0">手机验证码登录</a>
            </div>
            <%--添加手机验证码登录的方式--%>
            <form class="login-form" action="#" >
                <div class="wrap">
                    <h3 class="form-title font-green">账户登录</h3>
                    <!--<a id="quickRegister" href="<%=request.getContextPath()%>/register.jsp">快速注册</a>-->
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">账户</label>
                    <div class="input-icon">
                        <i class="fa fa-user"></i>
                        <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off"
                               placeholder="账户" name="username"/></div>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">密码</label>
                    <div class="input-icon">
                        <i class="fa fa-lock"></i>
                        <input class="form-control form-control-solid placeholder-no-fix" type="password"
                               autocomplete="off" placeholder="密码" name="password"/></div>
                </div>
                <div class="row jCaptchaCode">
                    <div class="col-md-7">
                        <div class="form-group input-icon">
                            <label class="control-label visible-ie8 visible-ie9">验证码</label>
                            <input class="form-control form-control-solid placeholder-no-fix" autocomplete="off"
                                   placeholder="验证码" name="jCaptchaCode"/>
                        </div>
                    </div>
                    <div class="col-md-5 no-space">
                        <img src="jcaptcha.jpg" style="height: 34px; width: 120px;" id="checkCode"
                             onclick="this.src='jcaptcha.jpg?d='+new Date()*1"/>
                    </div>
                </div>
                <div class="form-actions">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="1" name="rememberme">记住密码</label>
                        <a href="<%=request.getContextPath()%>/forgetpassword.jsp" id="forgetPwd">忘记密码?</a>
                    </div>
                    <button type="button" class="btn btn-primary btn-block" id="btnLogin">&nbsp;&nbsp;登&nbsp;&nbsp;录&nbsp;&nbsp;</button>
                </div>

            </form>
            <!-- END LOGIN FORM -->
             <form id="log-form1" style="display: none">
                    <div class="wrap">
                        <h3 class="titleh3">手机验证码登录</h3>
                        <!--<a id="quickRegister1" href="<%=request.getContextPath()%>/register.jsp">快速注册</a>-->
                    </div>
                    <div class="form-group">
                        <div class="input-icon">
                            <i class="fa fa-user" style="top: 6px;"></i>
                            <input class="form-control inputSty" type="text" autocomplete="off"
                                   placeholder="账户" name="username"/></div>
                    </div>
                    <div class="form-group">
                        <div class="input-icon">
                            <i class="fa fa-lock" style="top: 6px;"></i>
                            <input class="form-control inputSty" type="text" autocomplete="off"
                                   placeholder="手机验证码" name="yzm" style="display: inline-block;width: 173px;"/>
                            <button id="gainYzm" class=" btn  btnBlue borderRadius4 colorfff">获取验证码</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btnBlue borderRadius4 btn-block colorfff" id="btnLogin1" style="height: 42px;box-shadow: 2px 2px 4px #999">&nbsp;&nbsp;登&nbsp;&nbsp;录&nbsp;&nbsp;</button>
                    </div>

                </form>


        </div>
    </section>

    <footer id="foot">
        <ul class="list-unstyled clear color999 text-center">
            <li class="text-center" style="padding: 10px 0">
                <span>
                    推荐使用 <a target="_blank" href="http://rj.baidu.com/soft/detail/14744.html?ald">Chrome</a>、<a target="_blank" href="http://www.firefox.com.cn/">Fire Fox</a>、<a target="_blank" href="javascript:void (0)">Edge</a>、<a target="_blank" href="https://www.microsoft.com/zh-cn/download/internet-explorer.aspx">IE11</a>浏览器访问
                </span>
            </li>

            <li style="padding-top: 0">
                <a href="javascript:void(0)"  id="copyInfo">
                    版权所有：鼎倬信息 (c)2008-2018
                </a>
            </li>
        </ul>
    </footer>
</div>
<!--[if lt IE 9]>
<script src="<%=request.getContextPath()%>/assets/global/plugins/respond.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/js/bootstrap.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/uniform/jquery.uniform.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/jquery.validate.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/js.cookie.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/additional-methods.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/localization/messages_zh.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.bootstrap.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/icheck/icheck.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/scripts/app.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/md5.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/login.js" type="text/javascript"></script>
<script type="text/javascript">
    jQuery(document).ready(function () {

        <%
        boolean flag = CurrentLoginUser.isLogin();
        if (flag){%>
                window.location.href = "/index.jsp";
        <%}%>

        Login.init('<%=request.getContextPath()%>', '/index');


        /**随机获取登录背景**/
        function getloginbg(){
            var currentImg = Math.floor(Math.random()*5);
            if (currentImg==0){
                currentImg =3;
            }
            if (currentImg==1){
                currentImg = 0;
            }
            if (currentImg==2){
                currentImg = 1;
            }
            if (currentImg==3){
                currentImg = 2;
            }
            if (currentImg==4){
                currentImg = 4;
            }
            var imgArr = ['<%=request.getContextPath()%>/securityassets/img/login/login_01.jpg', '<%=request.getContextPath()%>/securityassets/img/login/login_02.jpg', '<%=request.getContextPath()%>/securityassets/img/login/login_03.jpg','<%=request.getContextPath()%>/securityassets/img/login/login_04.jpg','<%=request.getContextPath()%>/securityassets/img/login/login_05.jpg'];
            $('body').css('background', 'url(' + imgArr[currentImg] + ')');
        }

        getloginbg();

        $('#loginRightInfoM>.mainList>li.mediaHelp').click(function(){
            window.open('mediaHelp.jsp');
        });

        $('#switchBtnM').click(function(){
            $('#log-form1,.login-form').hide();
            if($(this).attr('data-sign')==0){
                $(this).attr('data-sign','1')
                        .html('账户密码登录');
                $('#log-form1').show();
                $('#log-form1 input[name="username"],#log-form1 input[name="yzm"]').val('');
            }else{
                $(this).attr('data-sign','0')
                    .html('手机验证码登录');
                $('.login-form').show();
            }
        });
    });
</script>
</body>
</html>