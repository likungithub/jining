<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <meta charset="utf-8"/>
    <title>登录TEST2</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css"
          rel="stylesheet" type="text/css"/>

    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/uniform/css/uniform.default.css"
          rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/css/components.css" rel="stylesheet"
          type="text/css"/>
</head>

<style type="text/css">
    #login_wrap {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }

    .L_logo {
        width: 100%;
        height: 51px;
        position: absolute;
        z-index: 3;
        font: 30px 'Microsoft YaHei', tahoma, arial, 宋体;
        color: #fff;
        text-align: center;
    }

    .login_con {
        background: url(securityassets/img/login_box.png) no-repeat;
        width: 587px;
        height: 383px;
        left: 50%;
        top: 60%;
        margin: -220px 0 0 -294px;
        position: absolute;
        z-index: 3;
        padding: 107px 0 0 138px;
    }

    .login_con table tr td {
        padding-bottom: 18px;
        font: bold 14px/30px 'Microsoft YaHei', tahoma, arial, 宋体;
        color: #454545;
    }

    .login_con table tr td i {
        display: block;
        padding-right: 10px;
        text-align: right;
        font-style: normal;
    }

    .login_con table tr td input.text,
    .login_con table tr td input.yzm {
        height: 29px;
        padding: 2px 17px 0;
        border: 0;
        font: 14px/24px 'Microsoft YaHei', tahoma, arial, 宋体;
        color: #a6a6a6;
    }

    .login_con table tr td button.L_Btn {
        width: 203px;
        height: 36px;
        display: block;
        background: url(securityassets/img/login_btn.png) no-repeat 0 0;
        font: 18px/36px 'Microsoft YaHei', tahoma, arial, 宋体;
        color: #fff;
        text-align: center;
        border: none;
        cursor: pointer;
        line-height: 30px;
    }

    .login_con table tr td button:hover.L_Btn, .login_con table tr td button:focus.L_Btn {
        background: url(securityassets/img/login_btn.png) no-repeat 0 -44px;
    }

    .login_box {
        position: absolute;
        top: 45%;
        left: 50%;
        margin-top: -240px;
        margin-left: -325px;
        width: 650px;
        height: 500px;
    }

    .copyright {
        width: 450px;
        margin: 0 auto;
        text-align: center;
        line-height: 24px;
        color: #6C8EAD;
        position: fixed;
        bottom: 15px;
        left: 50%;
        margin-left: -225px;
    }

    .form-group .help-block{
        padding: 0;
        margin: 2px 0 0 5px;
    }
</style>

<body>
<form class="login-form" action="#">
    <img src="securityassets/img/loginbg.jpg" id="login_wrap"/>
    <div class="login_box">
        <div class="L_logo logo">
        </div>
        <div class="login_con">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td width="70"><i>用户名：</i></td>
                    <td class="form-group">

                        <input class="form-control form-control-solid placeholder-no-fix input-medium pull-left"
                               type="text"
                               autocomplete="off"
                               data-error-container="#form_username_error"
                               placeholder="用户名" name="username"/>
                        <div class="pull-left" id="form_username_error"></div>
                    </td>
                </tr>
                <tr>
                    <td><i>密码：</i></td>
                    <td class="form-group">
                        <input class="form-control form-control-solid placeholder-no-fix input-medium pull-left"
                               type="password"
                               autocomplete="off"
                               data-error-container="#form_password_error"
                               placeholder="密码" name="password"/>
                        <div class="pull-left" id="form_password_error"></div>
                    </td>
                </tr>
                <tr class="jCaptchaCode">
                    <td><i>验证码：</i></td>
                    <td class="form-group">
                        <div class="pull-left">
                            <input class="form-control form-control-solid placeholder-no-fix input-small"
                                   data-error-container="#form_checkcode_error"
                                   autocomplete="off"
                                   placeholder="验证码" name="jCaptchaCode"/>
                        </div>
                        <div class="pull-left">
                            <img src="jcaptcha.jpg" style="height: 34px; width: 120px;"
                                 id="checkCode"
                                 onclick="this.src='jcaptcha.jpg?d='+new Date()*1"/></div>
                        <div class="pull-left" id="form_checkcode_error"></div>
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>
                        <button class="L_Btn" type="button" id="btnLogin">登&nbsp;&nbsp;&nbsp;录
                        </button>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value="1" name="rememberme">记住密码</label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div class="copyright">
        <p></p>
    </div>
</form>
<!--[if lt IE 9]>
<script src="<%=request.getContextPath()%>/assets/global/plugins/respond.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/js/bootstrap.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/uniform/jquery.uniform.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/js.cookie.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/jquery.validate.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/additional-methods.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/localization/messages_zh.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.bootstrap.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/scripts/app.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/md5.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/login.js"
        type="text/javascript"></script>
<script type="text/javascript">
    jQuery(document).ready(function () {
        Login.init('<%=request.getContextPath()%>', '/index');
    });
</script>
</body>

</html>