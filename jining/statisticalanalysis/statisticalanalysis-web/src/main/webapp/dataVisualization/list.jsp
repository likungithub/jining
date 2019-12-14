<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title></title>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        body,
        html {
            width: 100%;
            height: 100%;
            background: #091023 url(../assets/pages/img/bg.png) no-repeat;
            background-size: 100% 100%;
            margin: 0!important;
            padding: 0!important;
        }
        a:hover{ 
            text-decoration: none;
            color:#efefef;
        }
        /** {*/
            /**/
        /*}*/
        /*a{*/
            /*text-decoration: none;*/
        /*}*/
        #dataVisa {
            width:100%;
            /*height: 98.6%;*/

            padding: 10px 7px;
            /*padding-bottom: 0;*/
        }

        #dataVisa .main {
            width: 100%;
            height: 385px;
        }

        #dataVisa .dataTop {
            width: 100%;
            /*height: 400px;*/
            /*background: red;*/
            /*margin-top: 10px;*/
        }

        #dataVisa .dataTop_left {
            width: 27%;
            /*height: 400px;*/
            margin-right: 0.9%;
            float: left;
            /*background: yellow;*/
            margin-left: 6px;
        }

        #dataVisa .dataTop_left .accumulativeTransaction {
            width: 98%;
            height: 186px;
            background: url(../assets/pages/img/aaa.png) no-repeat;
            background-size:100% 100%;
            margin-bottom: 10px;
            /*padding-top: 10px;*/
            padding-top: 1.42%;
            padding-left: 1.6%;
        }

        #dataVisa .dataTop_left .accountingEvaluationAndEnterpriseScale {
            /*width: 100.5%;*/
            /*height: 186px;*/
            background: url(../assets/pages/img/aaa.png) no-repeat;
            background-size:100% 100%;
            padding: 4px 2px;
        }

        #dataVisa .dataTop_left .accountingEvaluationAndEnterpriseScale div {
            float: left;
            width: 160px;
            height: 189px;
        }

        #dataVisa .dataTop_left .accountingEvaluationAndEnterpriseScale .accountingEvaluation {
            /*background: #090e21;*/
        }

        #dataVisa .dataTop_left .accountingEvaluationAndEnterpriseScale .EnterpriseScale {
            /*background: #090e21;*/
        }

        #dataVisa .dataTop_center {
            width: 43%;
            height: 390px;
            float: left;
            margin-right: .92%;
            background: url(../assets/pages/img/bbb.png) no-repeat;
            background-size:100% 100%;
            padding: 4px 2px;
        }

        #dataVisa .dataTop_right {
            /*width: 27%;*/
            height: 384px;
            /*background: blue;*/
            float: left;
        }

        #dataVisa .dataTop_right .browseAndVisitor_main,
        #dataVisa .dataTop_right .appStartUp_main {
            width: 100%;
            height: 188px;

        }

        #dataVisa .dataTop_right .appStartUp {
            background: url(../assets/pages/img/aaa.png) no-repeat;
            background-size: 100% 100%;
            padding: 4px 2px;
            margin-bottom: 10px;
        }

        #dataVisa .dataTop_right .browseAndVisitor {
            background: url(../assets/pages/img/aaa.png) no-repeat;
            background-size: 100% 100%;
            padding: 2px 2px;
        }

        .dataTitle {
            padding: 5px 8px!important;
            font-size: 12px;
            color: #9aaec4;
            background: #090f1f;
            text-align: center;
            float: left;
        }

        #dataVisa .dataBottom {
            margin-top: 11px;
            height: 270px;
            width: 100%;
            /*background: green;*/
            /*margin-bottom: 20px;*/
        }

        #dataVisa .dataBottom>div {
            float: left;
        }

        #dataVisa .dataBottom .cityData
        {
            margin-right: 0.8%;
            margin-left: 0.3%;
        }
        #dataVisa .dataBottom .add_customer_data{
            margin-right: 1%;
            /*margin-left: 0.18%;*/
        }
        #dataVisa .dataBottom .loginTop10,
        #dataVisa .dataBottom .cityData {
            width: 26.5%;
            height: 265px;
            background: url(../assets/pages/img/aaa.png) no-repeat;
            background-size: 100% 100%;
            padding-top: 0.2%;
            padding-left: 0.4%;
        }
        #dataVisa .dataBottom .loginTop10{
            margin-left: -2px;
            width: 26.65%;
        }


        #dataVisa .dataBottom .add_customer_data {
            width: 43%;
            height: 265px;
            background: url(../assets/pages/img/ccc.png) no-repeat;
            background-size: 100% 100%;
            padding-top: 0.2%;
            padding-left: 0.4%;
        }

        #dataVisa .accumulativeTransaction_main {
            height: 186px;
            /*background: black;*/
        }

        #dataVisa .cityData_main,
        #dataVisa .add_customer_data_main,
        #dataVisa .loginTop10_main {
            height: 265px;
        }
        #dataVisa  .dlAndkhAll div > span{
            color: #9aaec4;
            font-size: 12px;
            position: absolute;
            top: 16px;
            left:20%;
        }
        #dataVisa  .dlAndkhAll div .dataNum{
            position: absolute;
            top: 14px;
            left:46%;
            width: 45%;
        }
        #dataVisa  .dlAndkhAll div .dataNum span{
            color: #9aaec4;
            font-size: 14px;
            margin-right: 5.5%;
        }
        .box_top {
            padding: 5px 11px!important;
            height: 20px;
            position: absolute;
            z-index: 100;
            width: 25%;
        }

        .topCli {
            background: #223c5a!important;
        }

        .clear {
            clear: both;
        }
        #dataVisa div a:hover{
            cursor: pointer;
        }
        .clickF11{
            position: fixed;
            top: 40px;
            right: 0;

            text-align: center;
            color: #fff;
            font-size: 12px;
            border-radius: 6px 0px 0px 6px;
            overflow: hidden;
            cursor: pointer;
        }
        .clickF11 img{
            width: 15px;
            vertical-align: text-bottom;
            margin-right: 7px;
        }
        .weekAndMonth{
            float: right;
            color: #9aaec4;
            list-style: none;
            border: 1px solid #223c5a;
            padding: 0;
        }
        .weekAndMonth li{
            padding: 5px 8px!important;
            font-size: 12px;
            color: #9aaec4;
            background: #090f1f;
            text-align: center;
            float: left;
        }
    </style>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts-gl/echarts-gl.min.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts-stat/ecStat.min.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/dataTool.min.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ZUONbpqGBsYGXNIYHicvbAbM"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/simplex.js"></script>
    <script type="text/javascript">
    </script>
</head>

<body>
<div id="dataVisa">
    <div class="dataTop">
        <div class='dataTop_left'>
            <!--累计交易量-->
            <div class="accumulativeTransaction">
                <div class="box_top">
                    <a class="topCli dataTitle ljjyl">累计交易量</a>
                   <ul class="weekAndMonth" >
                       <li class="topCli" data="0">周</li>
                       <li data="1">月</li>
                   </ul>
                </div>
                <div class="accumulativeTransaction_main">

                </div>
            </div>
            <div class="accountingEvaluationAndEnterpriseScale">
                <div class="accountingEvaluation">
                    <p class="box_top">
                        <a class="topCli dataTitle">会计评价</a>
                    </p>
                    <div class="accountingEvaluation_main">

                    </div>
                </div>
                <div class="EnterpriseScale">
                    <p class="box_top">
                        <a class="topCli dataTitle">企业规模</a>
                    </p>
                    <div class="EnterpriseScale_main">

                    </div>
                </div>
                <div class="clear" style="height: 0;"></div>
            </div>
        </div>
        <div class='dataTop_center' style="position: relative;">
            <div class="box_top" style="position: absolute;z-index: 100;width: 100%;">
                <div style='border:1px solid #223c5a;width: 130px;'>
                    <a class="topCli dataTitle">代理分布</a>
                    <a class="dataTitle">客户分布</a>
                    <div class="clear"></div>
                </div>
                <div class="dlAndkhAll" style="margin: 0 auto!important; margin-top: 10px!important;width: 500px">
                    <div style="width: 200px;height: 50px;background: url(../assets/pages/img/dataBg.png) no-repeat;background-size:100% 100%;float: left;margin-right: 8%!important;margin-left: 6%!important;position: relative;">
                        <span>代理</span>
                        <p class="dataNum dlNum">

                        </p>
                    </div>
                    <div style="width:200px;height: 50px;background:  url(../assets/pages/img/dataBg.png) no-repeat;background-size:100% 100%;float: left;position: relative;">
                        <span>客户</span>
                        <p class="dataNum khNum">

                        </p>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class='main'>

            </div>
        </div>
        <div class='dataTop_right'>
            <div class="appStartUp">
                <p class="box_top">
                    <a class="topCli dataTitle appStart">APP启动</a>
                </p>
                <div class="appStartUp_main">

                </div>
            </div>
            <div class="browseAndVisitor">
                <div class="box_top" style="position: absolute;z-index: 100;">
                    <a class="topCli dataTitle">访问量</a>
                </div>
                <div class="browseAndVisitor_main">

                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
    <div class="dataBottom">
        <div class='cityData'>
            <div class="box_top" style="position: absolute;z-index: 100;">
                <div style='border:1px solid #223c5a;'>
                    <a class="topCli dataTitle">省份</a>
                    <a class="dataTitle">城市</a>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="cityData_main">

            </div>
        </div>
        <div class='add_customer_data'>
            <p class="box_top">
                <a class="topCli dataTitle">新增</a>
            </p>
            <div class="add_customer_data_main">

            </div>
        </div>
        <div class='loginTop10'>
            <p class="box_top">
                <a class="topCli dataTitle">累计登录Top10</a>
            </p>
            <div class="loginTop10_main">

            </div>
        </div>
    </div>
    <div class="clear"></div>
</div>
<div class="clickF11"  data = "false">
    <div style="background-color: #009DDF;
            width: 88px;
            height: 38px;
            line-height: 38px;opacity: 0.4;">

    </div>
    <div style="position: absolute;top: 12px;
    left: 18px;">
        <img src="<%=request.getContextPath()%>/assets/pages/img/f11.png" alt="">
        <span>全屏</span>
    </div>
</div>
</body>
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/dataVisualization/list.js">

</script>

</html>