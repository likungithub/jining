<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="zh">
<!--<![endif]-->
<head>
    <meta charset="utf-8" />
    <title>财云管家注册成功</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/securityassets/img/favicon.ico" type="image/x-icon" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/icheck/skins/all.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/css/components.css" rel="stylesheet" id="style_components" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/font/iconfont.css" />
    <style>
        #registerSuccessfully-m .wrap{
            width: 600px;
        }
        #registerSuccessfully-m .wrap:nth-child(1){
            width: 600px;
            margin: 80px auto 15px;
            border-bottom: 1px solid #dadada;
            color:#F69700;
        }
        #registerSuccessfully-m .wrap:nth-child(2){
            text-align: center;
            margin: 0 auto;
        }
    </style>

</head>
<body>
<jsp:include page="header.jsp"/>
    <section id="registerSuccessfully-m">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="wrap text-center">
                        <img src="<%=request.getContextPath()%>/securityassets/img/success.png" alt="成功的图片" style="margin-bottom: 15px">
                    </div>
                    <div class="wrap">
                        <p class="color333" style="line-height: 150%;text-align: left;text-indent: 31px;letter-spacing: 2px;">
                            恭喜您成为财云管家的一员，为保障您有更好的服务，请耐心等待管理员的审核，客服专员会在48小时内与您联系。
                        </p>
                        <a class="btn btn-success btn-circle" style="margin-bottom: 80px;" href="<%=request.getContextPath()%>/login.jsp"><i class="fa fa-reply" style="margin-right: 5px;" aria-hidden="true"></i>跳转到登录页</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <jsp:include page="footer.jsp"/>
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
<script src="<%=request.getContextPath()%>/securityassets/scripts/register.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        registerPage.setPath("<%= request.getContextPath()%>");
    });
</script>
</body>
</html>