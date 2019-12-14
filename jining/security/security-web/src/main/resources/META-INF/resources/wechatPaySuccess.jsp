<%@ page contentType="text/html;charset=GBK" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="zh" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="zh">
<!--<![endif]-->
<%
//String out_trade_no = request.getParameter("out_trade_no");
//String subject = request.getParameter("subject");
//String total_amount = request.getParameter("total_amount");
//String body = request.getParameter("body");
//String param = request.getParameter("param");
%>
<head>
    <meta charset="gbk" />
    <title>微信扫码支付</title>
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
        #head-bar {
            background: #00c800;
            padding: 10px 0;
        }
        #head-bar div.row:nth-child(1) img{
            width: 50px
        }
        #head-bar div.row:nth-child(1) span{
            font-size: 20px;
            vertical-align: bottom;
            color: #fff
        }
        #mainContent1 .container>.row:not(1)>div.col-md-12{
            padding: 12px 0;
            font-size: 30px;
        }
    </style>
</head>
<body style="height: 100%;">
<div id="popmodal" class="container-fluid" style="position: fixed;
    background: rgba(0,0,0,.5);
    z-index: 100;
    height: 100%;
    width: 100%;">
    <div class="row" id="paySuccess" style=" position: absolute; z-index: 20000;background:#fff;width: 500px;height: 250px;left: 50%;margin-left: -250px;top: 50%;margin-top: -250px;padding: 30px 50px;">
        <div class="col-md-12">
            <div class="col-md-3" style="margin-top: 40px">
                <img alt="支付成功的LOGO" src="<%=request.getContextPath()%>/securityassets/img/paysuccess.png">
                <span style="color: #53d653;font-size: 15px;font-weight: 800;display: block;margin-top: 20px;">支付成功</span>
            </div>
            <div class="col-md-9" style="line-height: 37px;margin-top: 30px;">
                您已通过<span style="color: red;">微信扫码支付</span>成功付款<span id="wxzfje"></span>元<br>
                订单编号：<span id="wxddbh"></span>&nbsp;&nbsp;<!-- 支付单号：<span id="wxzfdh"></span> --><br>
                <span id="wxzfdh" style="color: #53d653;"></span>秒后返回订单详情页&nbsp;&nbsp;<button class="btn btn-default" onclick="returnUrl()" id="wxzjfh" style=" color: #fff;   background: #349AE7; border: #349AE7;border-radius: 4px!important;">直接返回</button>
            </div>
        </div>
    </div>
</div>
<header id="head-bar">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <img src="<%=request.getContextPath()%>/securityassets/img/wechatLogo.png" alt="wePayLogo">
                <span>微信支付</span>
            </div>
        </div>
    </div>
</header>
<section id="mainContent1" style="margin-bottom: 15px">
    <div class="container" style="padding: 30px 50px;border:1px solid #dadada;margin-top: 15px">
        <div class="row">
            <div class="col-md-12 text-center">
					<span>
						扫一扫付款(元)
					</span>
            </div>
            <div style="display: none"><input type="text" id="ddbh"></div>
            <div class="col-md-12 text-center">
					<span style="color: #f60" id="mount">
					</span>
            </div>
            <div class="col-md-12 text-center">
                <img src="<%=request.getContextPath()%>/securityassets/img/wePayLogo.png" alt="wePayLogo.png" style="width: 220px;">
            </div>
            <div class="col-md-12 text-center">
                <img src="#" id="zfewm" alt="微信支付二维码" style="height: 220px;width: 220px">
            </div>
            <div class="col-md-12 text-center">
                <img src="<%=request.getContextPath()%>/securityassets/img/wxsm.png" alt="" style="width: 220px">
            </div>
            <input hidden="hidden" id="ddid" /> <!-- 存放订单id -->
        </div>
    </div>
</section>
<jsp:include page="footer.jsp"/>
<!--[if lt IE 9]>
<script src="<%=request.getContextPath()%>/assets/global/plugins/respond.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/js.cookie.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/RegExp/commonRegExp.js" type="text/javascript"></script>
<script type="text/javascript">
$(function(){
		
	//防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });
	$('#popmodal').hide();
	<%--var param = "<%=param%>";--%>
	//解密
	//param = decode64(param);
	//字符串转成JSON对象
	//var data = JSON.parse(param);
	
//    var data = {
//            out_trade_no : data.out_trade_no,
//            subject : data.subject,
//            total_amount : data.total_amount,
//            body : data.body,
//            tcsj : data.tcsj,
//            kssj : data.kssj
//    };

    var data = {
            out_trade_no : sessionStorage.getItem("order_no")
    };
    $.ajax({
        url:'/paymanager/weixinPaymanager/weixinPay',
        type:'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data:JSON.stringify(data),
        success:function(result){
            $('#mount').html(result.total_amount);
            $('#ddbh').val(result.out_trade_no);
            $('#zfewm').attr('src',result.code);
        },
        error:function(){
            alert("加载失败!");
        }
    });
    
    var getData = setInterval(function() {
        var out_trade_no = $("#ddbh").val();
        if (out_trade_no != 0) {
            $.ajax({
                url: "/paymanager/weixinPaymanager/getData?out_trade_no=" + out_trade_no,
                type: "GET",
                dataType:"json",
                data: "",
                success: function (data) {
                    if (data.success) { //订单状态为1表示支付成功
                       $('#ddid').val(data.id);
                       $('#popmodal').show();
                       $('#wxzfje').html($('#mount').html()); //价格
                       $('#wxddbh').html(out_trade_no); //订单编号
                       clearInterval(getData); //清除原来定时器
                       var time = 10;
                       $('#wxzfdh').html(time);
                       var setTime = setInterval(function() {
                           $('#wxzfdh').html(--time);
                           if (time == 0) {
                        	   clearInterval(setTime); //清除定时器并跳转页面
                        	   out_trade_no = encode64(out_trade_no); //加密
                               window.location.href = "/paymanager/ordermanagementbypt/ordercontent.jsp?id=" + data.id; //页面跳转
                           }
                       }, 1000); /*等待时间*/
                    }
                },
                error: function () {
                    window.location.href = "/notify_url.jsp"; //页面跳转
                }
            });
        }
    }, 3000);
});

function returnUrl (){
    window.location.href = "/paymanager/ordermanagementbypt/ordercontent.jsp?id=" + $('#ddid').val(); //页面跳转
}
</script>
</body>
</html>