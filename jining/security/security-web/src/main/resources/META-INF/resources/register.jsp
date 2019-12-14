<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="zh">
<!--<![endif]-->

<head>
    <meta charset="utf-8"/>
    <title>财云管家注册</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="山东财云升互联网科技有限公司" name="author"/>
    <meta name="keywords" content="财云 财税 管家 财管家 轻松财税 公司注册 代理注册 代理记账  代账个人  代账企业 财税大管家  财税知识 一键报税  财税机器人" charset="utf-8"/>
    <meta name="description" content="财云管家---财税服务行业，一体化综合服务平台！是专门针对财税服务行业的系统解决方案，帮助实现高效管理、拓客增利、便捷记账的综合性SaaS平台。" charset="utf-8"/>
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/securityassets/img/favicon.ico" type="image/x-icon" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/icheck/skins/all.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/css/components.css" rel="stylesheet" id="style_components"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/css/plugins.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/font/iconfont.css"/>
    <link href="<%=request.getContextPath()%>/securityassets/css/register.css" rel="stylesheet" type="text/css"/>
</head>
<style>
    select.error {
        color: #666 !important;
    }
</style>
<body id="registerPage">
<jsp:include page="header.jsp"></jsp:include>
<section id='main'>
    <div class="content">
        <div class="top">
            <span>注册<div id="cover1" class="activeDis"></div></span><span style="display: none">注册 <div id="cover2"></div></span>
        </div>
        <div class="mid">
            <div class="left1">
                <form id="dljg-m" class="formActive">
                    <input type="hidden" value="002" name="qylx_dm"/>
                    <%--<input type="hidden" value="003" name='qylx_dm' />--%>
                    <p>
                        <span class="info"><span class="star">*</span>登录账号</span>
                        <input type="text" placeholder="请输入6~20位数字或字母或数字与字母" name="yhzh" type="text" id="dlyhm" class="black"/>
                    </p>
                    <p>
                        <span class="info"><span class="star">*</span>密码</span>
                        <input type="password" placeholder="请输入6~20位字母和数字组合的密码" name="yhmm" id="yhmm" class="black"/>
                    </p>

                    <p>
                        <span class="info"><span class="star">*</span>确认密码</span>
                        <input type="password" placeholder="请再次输入密码" name="repassword" class="black"/>
                    </p>

                    <p>
                        <span class="info"><span class="star">*</span>手机号码</span>
                        <input type="text" placeholder="请输入您的手机号" name="sjhm" id="phoneNum" class="black" style="width: 296px!important"/>
                        <input type="button" id='gain1' value="获取验证码" style=" border-radius: 0!important;outerline:none;font-size: 12px!important;color: #059bf2" >
                    </p>

                    <p>
                        <span class="info"><span class="star">*</span>验证码</span>
                        <input type="text" placeholder="验证码" name="yzm" id="yzm" class="black" style="width: 296px!important"/>
                    </p>

                    <p>
                        <span class="info companyName"><span class="star">*</span><span class="ogsmc">公司名称</span></span>
                        <input type="text" placeholder="请输入公司名称" class="companyName black" name="name" id="txtname"/>
                    </p>

                    <p>
                        <span class="info companyNum "><span class="star">*</span>公司税号</span>
                        <input type="text" placeholder="请输入公司税号" class="companyNum black" name="nsrsbh"/>
                    </p>
                    <p style="display: inline-block;">
                        <span class="info"><span class="star">*</span>所在省/市</span>
                        <select name="province" style="width: 136px;">
                            <option value="" checked="">请选择省</option>
                        </select>

                    </p>
                    <p style="display: inline-block;" id="city-m">
                        <span class="info" style="width: 0px"></span>
                        <select name="city" style="width: 136px;">
                            <option value="" checked="">请选择市</option>
                        </select>
                    </p>

                    <br/>
                    <p>
                        <span class="info"><span class="star">*</span>电子邮箱</span>
                        <input type="email" placeholder="请输入您的电子邮箱" name="email" class="black"/>
                    </p>

                    <p class="agree">
                        <span class="info"></span>
                        <input type="checkbox" id="agree" value="true" style="padding-left: 0"/> 同意《<a href="<%=request.getContextPath()%>/registrationProtocol.jsp" target="_blank">用户协议</a>》
                    </p>
                </form>
                <form id="dlkj-m">
                    <%--<input type="hidden" value="002" name="qylx_dm" />--%>
                    <input type="hidden" value="003" name='qylx_dm'/>
                    <p>
                        <span class="info"><span class="star">*</span>登录账号</span>
                        <input type="text" placeholder="请输入6~20位数字或字母或数字与字母" name="yhzh" type="text" id="dlyhm1" class="black"/>
                    </p>
                    <p>
                        <span class="info"><span class="star">*</span>密码</span>
                        <input type="password" placeholder="请输入6~20位字母和数字组合的密码" name="yhmm" id="yhmm1" class="black"/>
                    </p>

                    <p>
                        <span class="info"><span class="star">*</span>确认密码</span>
                        <input type="password" placeholder="请再次输入密码" name="repassword" class="black"/>
                    </p>

                    <p>
                        <span class="info"><span class="star">*</span>手机号码</span>
                        <input type="text" placeholder="请输入您的手机号" name="sjhm" id="phoneNum1" class="black"/>
                        <input type="button" id='gain2' value="获取验证码" >
                    </p>

                    <p>
                        <span class="info"><span class="star">*</span>验证码</span>
                        <input type="text" placeholder="验证码" name="yzm" id="yzm1" class="black"/>
                    </p>

                    <p>
                        <span class="info companyName"><span class="star">*</span><span class="ogsmc">用户名称</span></span>
                        <input type="text" placeholder="请输入用户名称" class="companyName black" name="name" id="txtname1"/>
                    </p>

                    <p style="display: inline-block;">
                        <span class="info"><span class="star">*</span>所在省/市</span>
                        <select name="province" style="width: 136px;">
                            <option value="" checked="">请选择省</option>
                        </select>

                    </p>
                    <p style="display: inline-block;">
                        <span class="info">所在市/区</span>
                        <select name="city" style="width: 136px;">
                            <option value="" checked="">请选择市</option>
                        </select>
                    </p>

                    <br/>
                    <p>
                        <span class="info"><span class="star">*</span>电子邮箱</span>
                        <input type="email" placeholder="请输入您的电子邮箱" name="email" class="black"/>
                    </p>

                    <p class="agree">
                        <span class="info"></span>
                        <input type="checkbox" id="agree1" value="true" style="padding-left: 0!important"/> 同意《
                        <a href="<%=request.getContextPath()%>/registrationProtocol.jsp " target="_blank">用户协议</a>》
                    </p>
                </form>
            </div>
        </div>
        <div class="bot">
            <button class="btn btn-primary border4" id="register" disabled="disabled">立即注册</button>
        </div>
    </div>
</section>
<footer id="foot">
    <ul class="list-unstyled">
         <li class="text-center" style="border-top: 1px solid #dadada;margin-top: 20px;padding-top: 10px">
                <span>
                   推荐使用 <a target="_blank" href="http://rj.baidu.com/soft/detail/14744.html?ald">Chrome</a>、<a target="_blank" href="http://www.firefox.com.cn/">Fire Fox</a>、<a target="_blank" href="javascript:void (0)">Edge</a>、<a target="_blank" href="https://www.microsoft.com/zh-cn/download/internet-explorer.aspx">IE11</a>浏览器访问
                </span>
         </li>
    </ul>
</footer>

<!--[if lt IE 9]>
<script src="<%=request.getContextPath()%>/assets/global/plugins/respond.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<%--<script src="http://static.runoob.com/assets/jquery-validation-1.14.0/lib/jquery.js"></script>--%>
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
<script src="<%=request.getContextPath()%>/securityassets/scripts/login.js" type="text/javascript"></script>

<%--<script src="http://static.runoob.com/assets/jquery-validation-1.14.0/dist/jquery.validate.min.js"></script>--%>
<script src="<%=request.getContextPath()%>/securityassets/scripts/jquery.validate.min.js" type="text/javascript"></script>
<script src="http://static.runoob.com/assets/jquery-validation-1.14.0/dist/localization/messages_zh.js"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/register.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        registerPage.setPath("<%= request.getContextPath()%>");
    });
</script>
</body>
</html>