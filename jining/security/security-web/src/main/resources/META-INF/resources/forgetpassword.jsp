 <%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="zh">
<!--<![endif]-->

<head>
    <meta charset="utf-8" />
    <title id="title">找回密码</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta id="companyName" content="" name="author"/>
    <meta id="keyWord" name="keywords" content="" charset="utf-8"/>
    <meta id="description" name="description" content="" charset="utf-8"/>
    <link id="internetFlag" rel="shortcut icon" href="<%=request.getContextPath()%>/securityassets/img/favicon.ico" type="image/x-icon" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/messenger/css/messenger.css" rel="stylesheet" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/messenger/css/messenger-theme-block.css" rel="stylesheet" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/icheck/skins/all.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/css/components.css" rel="stylesheet" id="style_components" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/securityassets/css/register.css" rel="stylesheet" type="text/css" />
</head>

<body id="forgetPassword">
<jsp:include page="header.jsp"></jsp:include>
<section id='main'>
    <div class="content">
        <div class="mid">
            <div class="left1">
                <form id="dljg-h" style="height: 333px">
                    <p>
                    <span class="info"><span class="star">*</span>登录账号</span><input type="text" placeholder="请输入6~20位字母与数字组合的账号" name="yhzh" id="dlyhm"/>
                    </p>
                    <p>
                    <span class="info"><span class="star">*</span>手机号码</span><input type="text" placeholder="请输入您的手机号" name="sjhm" id="phoneNum" />
                    <input type="button" id='gain' value="获取验证码">
                    </p>
                    <p>
                    <span class="info"><span class="star">*</span>短信验证码</span><input type="text" placeholder="验证码" name="yzm" id="yzm" />
                    </p>
                    <p>
                    <span class="info"><span class="star">*</span>密码</span><input type="password" placeholder="请输入6~20位字母和数字组合的密码" name="yhmm" id="yhmm"/>
                    </p>
                    <p>
                    <span class="info"><span class="star">*</span>确认密码</span><input type="password" placeholder="请再次输入密码" name="repassword" id="repassword"/>
                    </p>
                </form>
            </div>
            <div class="right">
                <a href="<%=request.getContextPath()%>/login.jsp">已有账号?请登录</a>
            </div>
        </div>
        <div class="bot">
            <button class="btn btn-primary border4" id="changePassword">更改密码</button>
        </div>
    </div>
</section>
<footer id="foot">
    <ul class="list-unstyled">
            <li class="text-center" style="border-top: 1px solid #dadada;margin-top: 20px;padding-top: 15px;">
                <span>
                    推荐使用 <a target="_blank" href="http://rj.baidu.com/soft/detail/14744.html?ald">Chrome</a>、<a target="_blank" href="http://www.firefox.com.cn/">Fire Fox</a>、<a target="_blank" href="javascript:void (0)">Edge</a>、<a target="_blank" href="https://www.microsoft.com/zh-cn/download/internet-explorer.aspx">IE11</a>浏览器访问
                </span>
            </li>
        <li style="text-align: center;width:100%;">
            <span id="copyInfo">版权所有：鼎倬信息 (c)2008-2018</span>
        </li>
    </ul>
</footer>

<!--[if lt IE 9]>
<script src="<%=request.getContextPath()%>/assets/global/plugins/respond.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/js.cookie.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/additional-methods.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/localization/messages_zh.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.bootstrap.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/icheck/icheck.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/scripts/app.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/md5.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/login.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/messenger/js/messenger.min.js"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/forgetpassword.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        forgetPassword.setPath("<%= request.getContextPath()%>");
    });
</script>
</body>
</html>