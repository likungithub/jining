<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="zh" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="zh">
<!--<![endif]-->
<%
    //String ddbh = request.getParameter("ddbh");
    String ddbh = new String(request.getParameter("ddbh").getBytes("ISO8859-1"), "UTF-8");
    String name = new String(request.getParameter("name").getBytes("ISO8859-1"), "UTF-8");
    String tel = new String(request.getParameter("tel").getBytes("ISO8859-1"), "UTF-8");
%>
<head>
    <meta charset="gbk" />
    <title>收费账单</title>
    <meta charset="utf-8" />
    <title></title>
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <meta content="telephone=no" name="format-detection">
    <meta content="email=no" name="format-detection">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="shortcut icon" href="<%=request.getContextPath()%>/securityassets/img/favicon.ico" type="image/x-icon" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/securityassets/css/reset.css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/icheck/skins/all.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/css/components.css" rel="stylesheet" id="style_components" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/font/iconfont.css" />
    <script src="<%=request.getContextPath()%>/securityassets/scripts/remCom.js"></script>
    <script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ddbh = '<%=ddbh%>';
            var name =  '<%=name%>';
            var tel =  '<%=tel%>';

            $.get("/paymanager/paymanager/scanPay?id="+encodeURIComponent(ddbh), function (result) {
                if (result.success) {
                    $('#ddbh').html(result.ddbh);
                    $('#ddsj').html(result.ddsj);
                    $('#fwxm').html(result.fwxm);
                    $('#fwfy').html('￥' + result.fwfy);
                    $('#bzxx').html(result.bzxx);
                    $('#weixin').attr('src',result.wxcode);
                    $('#zfb').attr('src',result.zfbcode);
                }else {
                    alert(result.message);
                    //alert('订单号错误，请检查网址或联系管理员！');
                }
            });
//            var num = "4V%2FDhYI4F6u3qB%2BOn3KZd4A7ZbFNJCLDFFes06aG6vI%3D";
//            $.get("/paymanager/paymanager/getZDData?out_trade_no="+num+"&name="+encodeURIComponent(name)+"&tel="+encodeURIComponent(tel), function (result) {
//                $(".payType_wrap").show();
//                $(".payType").show();
//                $(".closePage").show();
//                if(result.success){
//
//                    $(".payType>img").attr("src","securityassets/img/paySuccess1.png");
//                    $(".payType .ddbh span").text(result.ddbh);
//                    $(".payType h4").html('支付成功<p style="width: 1rem;margin: 0 auto;border: 1px solid #ccc;margin-top: 0.1rem;"></p>');
//                    $(".payType .jeNum span").text("￥"+result.jfje);
//                }else{
//                    $(".payType>img").attr("src","securityassets/img/payFail1.png");
//                    $(".payType .ddbh").text(result.message);
//                    $(".payType .jeNum").html("<span style='margin-right: 0.2rem;'>"+result.name+"</span><span>"+result.tel+"</span>");
//                    $(".payType h4").html('支付失败<p style="width: 1rem;margin: 0 auto;border: 1px solid #ccc;margin-top: 0.1rem;"></p>');
//                }
//            });
//            $(".closePage").on("click",function () {
//                $(".payType_wrap").hide();
//                $(".payType").hide();
//                $(".closePage").hide();
//            })
        });

    </script>
    <style>
        #SFZD{
            width: 6.4rem;
            height: 11.38rem;
            background: url(securityassets/img/SFZDbg.png) no-repeat 100% 100%;
            background-size: 100% 100%;
            position: relative;
            margin: 0 auto;
            overflow: hidden;
        }
        .payType_wrap{
            width: 6.4rem;
            height: 11.38rem;
            position: fixed;
            z-index: 998;
            background: #7f7f7f;
            opacity: 0.5;
            display: none;
        }
        #SFZD .payType{
            position: absolute;
            width: 3.63rem;
            height:2.28rem;
            background: #fff;
            top: 2.86rem;
            z-index: 999;
            left: 1.47rem;
            display: none;

        }
        #SFZD .payType img{
            position: absolute;
            width: 90px;
            top: -0.9rem;
            left: 1rem;
        }
        #SFZD .payType h4{
            text-align: center;
            margin-top: 30px;
        }
        #SFZD .payType p{
            margin: 5px 0;
            text-align: center;
            color: #656565;
            font-size: 10px;
        }
        #SFZD>img{
            height: 3.69rem;
            width: 5.86rem;
            position: absolute;
            top: 2.95rem;
            left: 0.29rem;
            z-index: 100;
        }
        #SFZD .SFZDmain{
            width: 5.2rem;
            height: 3.2rem;
            position: absolute;
            left: 0.65rem;
            top: 1.2rem;
            background: white;
        }

        #SFZD .SFZDmain h4{
            margin: 0;
            padding: 0.15rem 0.12rem;
            font-size: 0.24rem;
            color: #333;
            text-align: center;
            margin-top: 0.2rem;
        }
        #SFZD .SFZDmain p{
            width: 4.9rem;
            margin: 0;
            margin-left: 1.4rem;
            color: #333333;
            font-size:0.2rem ;
            margin-bottom: 0.12rem;
        }
        #SFZD .sfEWM{
            width: 6.2rem;
            height: 3rem;
            position: absolute;
            top: 6.8rem;
            left: 0.29rem;
        }
        #SFZD .sfEWM>div{
            width: 2.66rem;
            height: 2.66rem;
            float: left;
            margin-top: 0.1rem;
            border: 2px solid #f3bb6e;
        }
        #SFZD .sfEWM>div:nth-child(2){
            margin-left: 0.44rem;
        }
        #SFZD .sfEWM>div img{
            width: 92%;
            height: 92%;
            margin-top: 0.1rem;
            margin-left: 0.1rem;
        }
        #SFZD .sfEWM> p{
            margin: 0;
            font-size: 0.24rem;
            text-align: center;
            color: #333;
            width: 2.6rem;
            float: left;
            margin-left: 0.05rem;
            margin-top: 0.03rem;
        }
        #SFZD .sfEWM>p:nth-child(4){
            margin-left: 0.6rem;
        }
        #SFZD .sfEWM>p:nth-child(3) span{
            color: #1fcf00;
        }
        #SFZD .sfEWM>p:nth-child(4) span{
            color: #2bb4e5;
        }
        #SFZD .SFZDfoot{
            position: absolute;
            bottom: -0.1rem;
            width: 5.88rem;
            height: 1rem;
            left: 50%;
            margin-left: -2.9rem;
        }
        #SFZD .SFZDfoot p{
            margin: 0;
            font-size: 0.2rem;
            text-align: center;
            margin-bottom: 0.1rem;
            color: #fbe8d2;
        }

        @media only screen and (min-width: 1024px) and (max-width: 1920px) {
            #SFZD{
                width: 331px;
                height: 600px;
                background: url(securityassets/img/SFZDbg.png) no-repeat;
                background-size: 100%;
                top: 30px;
                overflow: hidden;
            }
            #SFZD>img{
                height:193px;
                width: 304px;
                position: absolute;
                top: 157px;
                left: 14px;
                z-index: 100;
            }
            #SFZD .SFZDmain{
                width: 278px;
                height: 172px;
                position: absolute;
                left: 28px;
                top: 58px;
                background: white;
            }
            #SFZD .SFZDmain h4{
                margin: 0;
                padding: 10px 10px;
                font-size: 12px;
                color: #333;
                text-align: center;
                margin-top: 10px;
            }
            #SFZD .SFZDmain p{

                margin: 0;
                width: 166px;
                margin-left: 70px;
                color: #333333;
                font-size: 12px;
                margin-bottom: 5px;
            }

            #SFZD .sfEWM{
                width: 305px;
                height: 141px;
                position: absolute;
                top: 364px;
                left: 14px;
            }
            #SFZD .sfEWM>div{
                width: 140px;
                height: 140px;
                float: left;
                margin-top: 0px;
                border: 2px solid #f3bb6e;
            }
            #SFZD .sfEWM>div:nth-child(2){
                margin-left: 15px;
            }
            #SFZD .sfEWM>div img{
                width: 90%;
                height: 90%;
                margin-top:8px;
                margin-left: 8px;
            }
            #SFZD .sfEWM> p{
                margin: 0;
                font-size:14px ;
                text-align: center;
                color: #333;
                width: 145px;
                float: left;
                margin-left: 5px;
                margin-top: 5px;
            }
            #SFZD .sfEWM>p:nth-child(4){
                margin-left: 5px;
            }
            #SFZD .sfEWM>p:nth-child(3) span{
                color: #1fcf00;
            }
            #SFZD .sfEWM>p:nth-child(4) span{
                color: #2bb4e5;
            }

            #SFZD .SFZDfoot{
                position: absolute;
                bottom: 0;
                width: 250px;
                height: 50px;
                left: 50%;
                margin-left: -125px;
            }
            #SFZD .SFZDfoot p{
                margin: 0;
                font-size: 12px;
                text-align: center;
                margin-bottom: 5px;
                color: #fbe8d2;
            }

        }
        .closePage{
            position: absolute;
            top: 0.3rem;
            right: 0.4rem;
            z-index: 999;
        }
        .closePage img{
            width: 100%;
        }
    </style>
</head>
<!-- [endif]-->
<body>
<div id="SFZD">
    <div class="closePage"><img src="securityassets/img/close.png" alt=""></div>
    <div class="payType_wrap">

    </div>
    <div class="payType">

        <img src="securityassets/img/paySuccess1.png" alt="">
        <h4>支付成功<p style="width: 1rem;
    margin: 0 auto;
    border: 1px solid #ccc;
    margin-top: 0.1rem;"></p></h4>
        <p class="ddbh">订单号：<span>11111111111111</span></p>
        <p class="jeNum">金额：<span style="color: red;
    font-size: 15px;
    font-weight: 600;">￥2380</span></p>
    </div>
    <img src="securityassets/img/SFZDxf.png"/>
    <div class='SFZDmain'>
        <h4>尊敬的用户您好，您本次收费账单如下所示：</h4>
        <p>订单编号：<span id="ddbh">123345678923344</span></p>
        <p>订单时间：<span id="ddsj">2017-10-10</span></p>
        <p>服务项目：<span id="fwxm">代理记账</span></p>
        <p>服务费用：<span id="fwfy">￥2380</span></p>
        <p>备注信息：<span id="bzxx">123</span></p>
    </div>
    <div class="sfEWM">
        <div>
            <img id="weixin" src="securityassets/img/wechaterweima.png"/>
        </div>

        <div>
            <img id="zfb" src="securityassets/img/ZFBeriweima.png"/>
        </div>
        <p>使用<span>微信</span>扫码付款</p>
        <p>使用<span>支付宝</span>扫码付款</p>
    </div>
    <div class="SFZDfoot">
        <p>代理记账公司：山东财云升互联网有限公司</p>
        <p>咨询电话：400-050-1800</p>
    </div>
</div>
</body>
</html>