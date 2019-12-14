<%@page import="com.xinhai.resourcemanager.entity.Resource" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<%@page import="java.util.Date" %>
<%@ page import="java.util.List" %>
<%
    String dljgBm = CurrentLoginUser.getUser().getDljgBm();
    boolean ifMessage = CurrentLoginUser.getUser().isIfManager();
    Date fwjsrq = CurrentLoginUser.getCustomer().getFwjsrq();
    long jsrqValue = 0;
    if (fwjsrq != null) {
        jsrqValue = fwjsrq.getTime();
    } else {
        jsrqValue = 99999999999999l;
    }
    List<Resource> list = CurrentLoginUser.getResources();
    String resources = "";
    for (Resource r : list) {
        resources += r.getId() + ",";
    }

    response.setHeader("Pragma","No-cache");
    response.setHeader("Cache-Control","no-cache");
    response.setDateHeader("Expires", 0);
%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="CN-zh">
<!--<![endif]-->

<head>
    <title id="title"></title>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <style>
        #jiaxin-mcs-fixed-btn div {
            width: 33px !important;
        }
        #jiaxin-mcs-fixed-btn{
            top: 370px!important;
            bottom: auto!important;
        }
        .nav-tabs .dropdown > .dropdown-menu{
            z-index: 10040!important;
        }
    </style>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/css/lib/animate.css">
    <link id="internetFlag" rel="shortcut icon"
          href="<%=request.getContextPath()%>/securityassets/img/favicon.ico"
          type="image/x-icon"/>
    <!-- 第三方类库样式（开始） -->
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css"
            rel="stylesheet" type="text/css"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/simple-line-icons/simple-line-icons.min.css"
            rel="stylesheet" type="text/css"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css"
            rel="stylesheet" type="text/css"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/uniform/css/uniform.default.css"
            rel="stylesheet" type="text/css"/>
    <!-- 第三方类库样式（结束） -->



        <!--PageOffice.js和jquery.min.js文件一定要引用-->
        <script type="text/javascript" src="customermanage/jquery.min.js"></script>
        <script type="text/javascript" src="customermanage/pageoffice.js" id="po_js_main"></script>

    <!--页面级样式-->
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/datatables/datatables.min.css"
            rel="stylesheet" type="text/css"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css"
            rel="stylesheet" type="text/css"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/icheck/skins/all.css"
            rel="stylesheet" type="text/css"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/select2/css/select2.min.css"
            rel="stylesheet" type="text/css"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/select2/css/select2-bootstrap.min.css"
            rel="stylesheet" type="text/css"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/messenger/css/messenger.css"
            rel="stylesheet"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/messenger/css/messenger-theme-block.css"
            rel="stylesheet"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/jstree/themes/default/style.min.css"
            rel="stylesheet"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/mCustomScrollbar/jquery.mCustomScrollbar.min.css"
            rel="stylesheet" type="text/css"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css"
            rel="stylesheet">
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css"
            rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/user/assets/pages/css/timepicker/bootstrap-timepicker.min.css" rel="stylesheet" type="text/css">
    <%--<link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet" type="text/css" />--%>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css"
            rel="stylesheet" type="text/css"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/jquery-layout/layout-default-latest.css"
            rel="stylesheet" type="text/css"/>
    <!-- 页面级样式 -->

    <!-- 全局样式类（开始） -->
    <link
            href="<%=request.getContextPath()%>/assets/global/css/components.css"
            rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/css/plugins.css"
          rel="stylesheet" type="text/css"/>
    <!-- 全局样式类（结束） -->

    <link
            href="<%=request.getContextPath()%>/assets/layouts/layout1/css/layout.css"
            rel="stylesheet" type="text/css"/>
    <link
            href="<%=request.getContextPath()%>/assets/layouts/layout1/css/themes/blue.css"
            rel="stylesheet" type="text/css" id="style_color"/>

    <%--<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/font/demo.css" />--%>
    <link rel="stylesheet" type="text/css"
          href="<%=request.getContextPath()%>/assets/pages/font/iconfont.css"/>
    <link rel="stylesheet" type="text/css"
          href="<%=request.getContextPath()%>/assets/pages/css/caiyun/public.css"
          id="skinChange1_m"/>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/css/followUpRemind/swiper-3.4.2.min.css">

    <link rel="stylesheet" href="/statisticalanalysis/assets/pages/css/iconfont.css">
    <link rel="stylesheet" href="/statisticalanalysis/assets/pages/css/daterangepicker.css">
    <style>

        body {
            overflow: hidden;
        }


        .tipMain {
            position: absolute;
            width: 500px;
            /* height: 154px; */
            margin: 0 auto;
            top: 160px;
            left: 50%;
            margin-left: -250px;
        }

        /*.tipMain h3 {*/
        /*color: #6cb6f5;*/
        /*}*/

        /*.tipMain h2:nth-child(3) {*/
        /*margin-top: 20px;*/
        /*}*/
        .tipMain p {
            width: 500px;
            margin: 0;
            font-size: 12px;
            margin-top: 10px;
            line-height: 20px;
            /*margin-left: -50px;*/
            white-space: normal;
            word-break: break-all;
        }

        .animateHJ {
            animation: HJ 1.3s ease-in normal;
            animation-fill-mode: forwards
        }

        @keyframes HJ {
            0% {
                /*top: -102.5px;*/
                left: 50%;
                margin-left: -81px;
            }
            3% {
                left: 50%;
                margin-left: -101px;
            }
            6% {
                left: 50%;
                margin-left: -81px;
            }
            9% {
                left: 50%;
                margin-left: -101px;
            }
            12% {
                left: 50%;
                margin-left: -81px;
            }
            15% {
                left: 50%;
                margin-left: -101px;
            }
            18% {
                left: 50%;
                margin-left: -81px;
            }
            22% {
                left: 50%;
                margin-left: -101px;
            }
            28% {
                left: 50%;
                margin-left: -81px;
            }
            30% {
                left: 50%;
                margin-left: -101px;
            }
            50% {
                left: 50%;
                margin-left: -91px;
                top: 50%;
                transform: scale(1.2);
            }
            100% {
                top: -500%;
                transform: scale(1.2);
            }
        }
        /*.animateIM {*/
        /*animation: IM 1.3s ease-in normal;*/
        /*animation-fill-mode: forwards*/
        /*}*/
        /*@keyframes IM {*/
        /*0% {*/
        /*!*top: -102.5px;*!*/
        /*left: 50%;*/
        /*margin-left: -81px;*/
        /*}*/
        /*3% {*/
        /*left: 50%;*/
        /*margin-left: -101px;*/
        /*}*/
        /*6% {*/
        /*left: 50%;*/
        /*margin-left: -81px;*/
        /*}*/
        /*9% {*/
        /*left: 50%;*/
        /*margin-left: -101px;*/
        /*}*/
        /*12% {*/
        /*left: 50%;*/
        /*margin-left: -81px;*/
        /*}*/
        /*15% {*/
        /*left: 50%;*/
        /*margin-left: -101px;*/
        /*}*/
        /*18% {*/
        /*left: 50%;*/
        /*margin-left: -81px;*/
        /*}*/
        /*22% {*/
        /*left: 50%;*/
        /*margin-left: -101px;*/
        /*}*/
        /*28% {*/
        /*left: 50%;*/
        /*margin-left: -81px;*/
        /*}*/
        /*30% {*/
        /*left: 50%;*/
        /*margin-left: -101px;*/
        /*}*/
        /*50% {*/
        /*left: 50%;*/
        /*margin-left: -91px;*/
        /*top: 50%;*/
        /*transform: scale(1.2);*/
        /*}*/
        /*100% {*/
        /*top: -500%;*/
        /*transform: scale(1.2);*/
        /*}*/
        /*}*/

        #winpop {
            border-radius: 5px;
        }

        .swiper-container {
            width: 100%;
            height: 100%;
        }

        .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
            left: 204px !important;
            top: 155px;
            width: 6px !important;
            background-size: 100% !important;
        }

        .swiper-button-next, .swiper-container-rtl .swiper-button-prev {
            right: 15px !important;
            width: 6px !important;
            background-size: 100% !important;
            top: 155px
        }

        .fastEntrance {
            float: left;
            height: 100%;
            /*background: red;*/
            width: 28%;
            position: absolute;
            left: 50%;
            margin-left: -17%;
        }

        .commonMenu-m span span {
            transform: scale(0.8);
            display: block;
        }

        .fastEntrance ul li:hover {
            cursor: pointer;
        }

        .slimScrollDiv ul li.nav-item i {
            vertical-align: middle !important;
            top: 0 !important;
        }

        .animateIM {
            animation: imPhoneDH 0.5s infinite linear;
        }
        @keyframes imPhoneDH {
            0%{
                margin-top: 10px;
            }
            50%{
                margin-top: 5px;
            }
            100%{
                margin-top: 15px;
            }
        }

    </style>
</head>

<body
        class="page-sidebar-closed-hide-logo page-content-white page-header-fixed page-sidebar-fixed">

<div class="spinnerWrap">
    <div class="loader"></div>
</div>
<div class="page-header navbar navbar-fixed-top" id='head'>
    <div class="page-header-inner ">
        <div class="page-logo">
            <%--<span class="logo"><img alt="" id="logo" src="#" width="25px" height="25px"></span>--%>
            <span class="logo-default" style="color: white">检测管理系统</span>
        </div>
        <div class="fastEntrance">
            <ul style="    height: 100%;
    padding: 0;width: 100%;
    ">

                <li class="commonBtn" id="XZYG_MDW" title="新增员工">
                    新增员工
                </li>
                <li class="commonBtn" id="FBGG_MDW" title="发布公告">
                    发布公告
                </li>
                <li class="commonBtn" id="TXL_MDW" title="通讯录">
                    通讯录
                </li>

            </ul>
        </div>
        <div class="top-menu" id='top-menu'>
            <div class='question-mask pull-right'>
                <i class='icon iconfont icon-bangzhuxiantiao'></i>
            </div>
            <ul class="nav navbar-nav pull-right">
                <li class="dropdown dropdown-user">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                       data-close-others="true" id="mainMenu-m">

                        <span class="username username-hide-on-mobile" style="margin-top: 7px;"></span>
                        <i class="icon iconfont icon-Admin">
                            <!--<img alt="" id="photo" src="" width="25px" height="25px"
                                 style="border-radius: 50%!important;">-->
                        </i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-default" id='admin'>
                        <!--<li id="companyInfoWrap">
                            <a href="javascript:;" id="companyInfo">
                                企业信息</a>
                        </li>-->
                        <li>
                            <a href="javascript:;" id="userInfo">
                                个人信息</a>
                        </li>

                        <!--<li><a href="javascript:;" id="headPortrait">
                            个人头像
                        </a></li>-->
                        <li><a href="javascript:;" id="modifyPwd">
                            修改密码
                        </a></li>
                        <li><a href="#" id="logout">
                            退出
                        </a></li>
                    </ul>
                </li>
            </ul>
            <div class="top-remind-m commonMenu-m" title="系统公告">
                <i class="icon iconfont icon-weibiaoti9"></i> <span
                    id='announcementInfoWarning' class="circleDisplay"></span>
            </div>
            <div class="top-message-m commonMenu-m" title="消息提醒">
                <i class="icon iconfont icon-xiaoxi"></i> <span
                    id='announcementInfoWarningTX' class="circleDisplay"></span>
            </div>
            <div class="changeSkin_m commonMenu-m" title="换肤">
                <i class="icon iconfont icon-skin" style="font-size: 24px"></i>
                <span id="HFbtn" class="HFbtn"></span>
            </div>

        </div>
    </div>
</div>
<div class="clearfix"></div>
<div class="page-container" id='page-container'>
    <div class="page-sidebar-wrapper">
        <div class="page-sidebar navbar-collapse collapse">
            <ul class="page-sidebar-menu page-header-fixed "
                data-keep-expanded="false" data-auto-scroll="true"
                data-slide-speed="200" style="padding-top: 20px">
                <li class="nav-item"><a href="#"
                                        url="<%=request.getContextPath()%>/caiyun/home.html"
                                        data-addtab="firstpage" class="nav-link nav-toggle"
                                        id='homePageButton'> <i
                        class="icon iconfont icon-shouye-"></i> <span class="title">工作台</span>
                </a></li>
            </ul>
        </div>
        <div class="page-footer hidden-sm hidden-xs">
            <div class="menu-toggler sidebar-toggler" id="main-net-nav-menu">
                <span class="netmav" id="netmav">菜单导航</span> <i
                    class="icon iconfont icon-iconfontshousuo"></i> <i
                    class="icon iconfont icon-shouqi-copy"></i>
            </div>
        </div>
    </div>
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="tabbable tabbable-tabdrop admin-tab" id="main-tab"
                 tab-height>
                <ul class="nav nav-tabs close-tab-nav" role="tablist"></ul>
                <div class="tab-content" id="bottom" content-height></div>
            </div>
        </div>
    </div>
</div>
<script>
    /**
     * 扫码器相应事件
     */
    $(function () {
        var code = "";
        var lastTime, nextTime;
        var lastCode, nextCode;
        var code2="";
        document.onkeypress = function (e) {
            nextCode = e.which;
            // console.log(nextCode);
            if(nextCode != 13) {
                code2 += String.fromCharCode(nextCode);
            } else {
                var myInput = document.getElementById('fileNames');
                if(myInput != null && myInput != undefined){
                    if (myInput != document.activeElement) {
                        if(code2 != "") {
                            if($('#saoma') != null && $('#saoma') != undefined) {
                                $('#saoma').val(code2);
                                $("#saoma").change();
                            }
                            if($('#zbsaoma') != null && $('#zbsaoma') != undefined) {
                                $('#zbsaoma').val(code2);
                                $("#zbsaoma").change();
                            }
                        }
                    }
                } else {
                    if($('#saoma') != null && $('#saoma') != undefined) {
                        $('#saoma').val(code2);
                        $("#saoma").change();
                    }
                    if($('#zbsaoma') != null && $('#zbsaoma') != undefined) {
                        $('#zbsaoma').val(code2);
                        $("#zbsaoma").change();
                    }
                }
                code2 = "";
            }
        }

    });
</script>
<!--[if lt IE 9]>
<script src="<%=request.getContextPath()%>/assets/global/plugins/respond.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=hZ2VzQKb7hgqhSlcrBkcw0T9BoDEbu8Z"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/js/bootstrap.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/metisMenu/metisMenu.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/jquery.blockui.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/uniform/jquery.uniform.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/lodash.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/js.cookie.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"
        type="text/javascript"></script>

<script
        src="<%=request.getContextPath()%>/assets/global/plugins/jquery.pin.min.js"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/datatables/datatables.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/moment-with-locales.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/icheck/icheck.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/select2/js/select2.full.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/select2/js/i18n/zh-CN.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/jquery.validate.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/additional-methods.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/localization/messages_zh.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-confirmation/bootstrap-confirmation.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootbox/bootbox.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/messenger/js/messenger.min.js"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-tabdrop.js"></script>
<script src="<%=request.getContextPath()%>user/assets/pages/scripts/timepicker/bootstrap-timepicker.min.js"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/jstree/jstree.min.js"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/RegExp/echarts.min.js"
        type="text/javascript"></script>

<script
        src="<%=request.getContextPath()%>/assets/global/plugins/echarts/vintage.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-tagsinput/bootstrap-tagsinput.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/jquery.bootstrap.min.js"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/typeahead/typeahead.bundle.min.js"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-select/js/i18n/defaults-zh_CN.min.js"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/jquery-ui/jquery-ui.min.js"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/plugins/jquery-layout/jquery.layout-latest.js"></script>

<script
        src="<%=request.getContextPath()%>/assets/global/scripts/app.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/scripts/datatable.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/global/scripts/datatable-plugin.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/layouts/layout1/scripts/layout.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/layouts/global/scripts/bootstrap-addtabs.js"
        type="text/javascript"></script>

<!-- form表单的ajax提交方式 -->
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/caiyun/jquery-form.js"
        type="text/javascript"></script>
<!-- 行为记录 -->
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/RegExp/commonRegExp.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/RegExp/BootstrapMenu.min.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/RegExp/closetab.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/RegExp/swiper-3.4.2.min.js"></script>

<script type="text/javascript" src="/statisticalanalysis/assets/pages/scripts/libs/moment.js"></script>
<script type="text/javascript" src="/statisticalanalysis/assets/pages/scripts/libs/daterangepicker.js"></script>

</body>

<script type="text/javascript">

    var setURL = "<%=request.getContextPath()%>/index.jsp";
    var setTitle = "工作台";

    // 缓存设置
    $.ajaxSetup({cache: false});
    $(".spinnerWrap").height($(window).height());

    jQuery(document).ready(function () {
        var configMap = {
            modifyUrl: '<%=request.getContextPath()%>/modifypwd.jsp',
            imgUrl: '<%=request.getContextPath()%>/setimg.jsp',
            userinfoUrl: '<%=request.getContextPath()%>/userinfoedit.jsp',
            companyInfoUrl: '<%=request.getContextPath()%>/companyinfoedit.jsp',
            paymentUrl: '<%=request.getContextPath()%>/payment.jsp'
        };

        var jqueryMap = {
            $modifyPwdDialog: null,
            $setimg: null,
            $userInfoDialog: null,
            $paymentDialog: null,
            $companyInfoDialog: null,
            $setlogo: null,
            $workorder: null
        };
        var account = '<%=CurrentLoginUser.getUser().getUserAccount()%>';
        var zydm = '<%=CurrentLoginUser.getUser().getZydm()%>';
        var name = '<%=CurrentLoginUser.getUser().getName()%>';

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////

        function swiperPz() {
            var mySwiper = new Swiper('.swiper-container', {
                direction: 'horizontal',
                onlyExternal: true,
//        loop: true,
//
//                // 如果需要分页器
//                pagination: '.swiper-pagination',

                // 如果需要前进后退按钮
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                initialSlide: 0,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
//                // 如果需要滚动条
//                scrollbar: '.swiper-scrollbar',
            })
            setTimeout(function () {
                $(".swiper-wrapper").css("transitionDuration", "0ms").css("transform", "translate3d(0px, 0px, 0px)");
                for (var i = 0; i < $(".messagecontent button").length; i++) {
                    $(".messagecontent button")[i].onclick = function () {
                        clickMessage($(this));
                    }
                }

            }, 500)
        }


        $("#winpop div:nth-child(1)>span.close").on("click", function () {
            tips_pop("", 1,0)
        })


        var builderMenu = function (menus, parentHtml) {
            _.forEach(menus, function (menu) {
                var attr = menu.url ? (
                ' url="' + menu.url + '" data-addtab="' + menu.id + '"') : '';
                var item = $('<li class="nav-item">' +
                    '<a href="#" ' + attr + ' class="nav-link nav-toggle">' +
                    '<i class="' + menu.icon + ' iconMr' + '"></i>' +
                    '<span class="title">' + menu.text + '</span>' +
                    (
                        menu.children ? '<span class="arrow"></span>' : '') +
                    '</a>' +
                    '</li>');
                if (menu.children) {
                    var childrenHtml = $('<ul class="sub-menu" style="padding-bottom:10px;"></ul>');
                    $(item).appendTo(parentHtml);
                    $(childrenHtml).appendTo(item);
                    builderMenu(menu.children, childrenHtml);
                } else {
                    $(item).appendTo(parentHtml);
                }
            });
        };

        var url = '';
        var dljgbm = "<%=dljgBm%>";
        if (dljgbm == "DL0000000001") {
            //添加首页
            var _opt = {
                id: 'firstpage',
                title: '<i class="icon iconfont icon-shouyeshouye"></i>工作台',
                tabMonitor: $('#main-tab'),
                url: '<%=request.getContextPath()%>/caiyun/adminWelcome.jsp'
            };
            addTabs.add(_opt);
            $(".fastEntrance").hide();
        } else {
            var jsrqValue = ("<%=jsrqValue%>"); //服务结束日期值
            var now = new Date().getTime();

            var diffValue = now - jsrqValue;
            if (diffValue > 0) { //代需表超时，要提示缴费
                $.get("<%=request.getContextPath()%>/customermanage/customerManage/getDljgInfo?dljgBm=<%=dljgBm%>", null, function (result) {
                    var data = {
                        year: result.year,
                        month: result.month,
                        day: result.day
                    };
                    //json对象转成字符串
                    var param = JSON.stringify(data);
                    //加密
                    param = encode64(param);
                    window.location.href = "<%=request.getContextPath()%>/pay.jsp?param=" + param;
                });
            } else {
                //添加首页
                var _opt = {
                    id: 'firstpage',
                    title: '<i class="icon iconfont icon-shouyeshouye"></i>工作台',
                    tabMonitor: $('#main-tab'),
                    url: '<%=request.getContextPath()%>/caiyun/welcome.jsp'
                };
                addTabs.add(_opt);
            }
        }

        $('.page-sidebar-menu').on('click', '[data-addtab]', function () {
            var s_tab_id = $(this).attr("data-addtab");
            var tab_id = "54cd63e4-589b-4cb4-ace0-987d7f637a09";
            tabMenu(s_tab_id);
            if (s_tab_id == tab_id) {
                closeTAB(tab_id);
            }
            if (s_tab_id == "efad007b-94f4-4d95-b048-52d5506ae27c") {
                window.open("<%=request.getContextPath()%>/statisticalanalysis/dataVisualization/list.jsp");
                setTimeout(function () {
                    closeTAB("efad007b-94f4-4d95-b048-52d5506ae27c");
                }, 200);
                window.location.reload();
            }
        })

        var RWTab = function (_target, srcStr, menuName, id, icon) {
            //标签移除
            $("#tab-page-nav-" + id).remove();
            //内容移除
            $("#tab-page-content-" + id).remove();
            var _opt;
            var $a_alarm = $('ul.page-sidebar-menu').find('a.nav-link.nav-toggle[url="' + srcStr + '"]');
            if ($a_alarm.length > 0) {
                _opt = {
                    title: '<i class="' + $a_alarm.find('i').attr('class') + '"><i></i></i> ' + $a_alarm.find('span').html(),
                    id: $a_alarm.data('addtab'),
                    tabMonitor: $('#main-tab'),
                    url: srcStr
                };
            } else {
                _opt = {
                    title: '<i class="' + icon + '"></i>' + menuName,
                    id: id,
                    tabMonitor: $('#main-tab'),
                    url: srcStr
                };
            }
            $(_target).addTabs(_opt);
        }

        /*初始化首页菜单的样式*/
        $('#page-container ul.page-sidebar-menu>li').addClass('active');
        $('<span class="selected"></span>').appendTo($("#homePageButton"));


        $('body').on('click', function () {
            $.get("<%=request.getContextPath()%>/verifylogin", null, function (result) {
                if (!result) {
                    var dialogButtons = {};
                    dialogButtons.success = {
                        label: '<i class="fa fa-save"></i> 确&nbsp;定 ',
                        className: "btn btn-default btnBlue borderRadius4 colorfff",
                        callback: function () {
                            window.location.href = "<%=request.getContextPath()%>/login.jsp";
                        }
                    };

                    bootbox.dialog({
                        title: '提示',
                        message: '您的账号长时间未操作或在另一地点登录，您被迫下线',
                        buttons: dialogButtons
                    });
                    $(".bootbox-close-button").on("click", function () {
                        window.location.href = "<%=request.getContextPath()%>/login.jsp";
                    })
                    /* var oError = $("<div style='width: 100%;color: #b94a48;background-color: #f2dede;border-color: #eed3d7;height: 60px;position: absolute;z-index: 15855555555;top: 0px;text-align: center;line-height: 60px;'>您的账号在另一地点登录，您被迫下线。</div>");
                     $("body").append(oError);
                     setTimeout(function(){},3000); //等待1s */

                }
            });
//            $("#calendar").addClass("hide")
        });

        App.setAssetsPath('<%=request.getContextPath()%>/assets/');
        $('#logout').off().on('click', function () {
            $.get("<%=request.getContextPath()%>/logout", null, function (result) {
                if (!result.failed) {
                    window.location.href = "<%=request.getContextPath()%>/login.jsp";
                }
            });
        });



        $.get('<%=request.getContextPath()%>/menu', null, function (result) {
            if (result) {
                var menuTreeHtml = $('.page-sidebar-wrapper .page-sidebar-menu');
                builderMenu(result.menus, menuTreeHtml);
                $('.page-sidebar-wrapper .page-sidebar-menu > li').addClass('nav-top-menu');
            }
        });

        $.get('<%=request.getContextPath()%>/user/users/setCustomerInfoToRedis', null, function (result) {
            debugger
            if (result) {
                debugger
                $.get('<%=request.getContextPath()%>/user/users/getCustomerInfo', null, function (result) {
                    debugger
                    if (result) {
                        debugger
                        var len = 0;
                        for (var i = 0; i < result.infoName.length; i++) {
                            var a = result.infoName.charAt(i);
                            if (a.match(/[^\x00-\xff]/ig) != null) {
                                len += 2;
                            } else {
                                len += 1;
                            }
                        }
                        if (len > 6) {
                            $('.username').text(result.infoName.substr(0, 4) + "...");
                        } else {
                            $('.username').text(result.infoName);
                        }
                        var title = result.titleName;
                        $('.logo-default').text(title);
                        /*if (result.logo != "" && result.logo != null) {
                         $("#logo").attr("src", result.logo);
                         } else {
                         $("#logo").css("display", "none");
                         }*/
                    }
                });
            }
        });

        $.get('<%=request.getContextPath()%>/systemmanager/systemAnnouncement/getAllSystemAnnouncementUnread', null, function (result) {
            if (result.length > 0) {
                $('#announcementInfoWarning').removeClass('circleDisplay');
                if(result.length > 99){
                    var num = "99+";
                    $('#announcementInfoWarning').html("<span>" + num + "<span/>");
                }else{
                    $('#announcementInfoWarning').html("<span>" + result.length + "<span/>");
                }

                $('.top-remind-m').addClass('bellSwing');
            } else {
                $('#announcementInfoWarning').css({display: 'none'});
                $('.top-remind-m').removeClass('bellSwing');
            }
        });

        //查询所有未读的消息提醒
        /*function getAllMessageReminder() {*/
        $.get('<%=request.getContextPath()%>/customermanage/SystemMessageController/getAllMessageReminder', null, function (result) {
//              console.info(result);
            window.set
            if (result > 0) {
                $('#announcementInfoWarningTX').removeClass('circleDisplay');
                if(result > 99){
                    var num = "99+";
                    $('#announcementInfoWarningTX').html('<span>' + num + '</span>');
                }else{
                    $('#announcementInfoWarningTX').html('<span>' + result + '</span>');
                }
                $('.top-message-m').addClass('bellSwingMessage');
            } else {
                $('#announcementInfoWarningTX').css({display: 'none'});
                $('.top-message-m').removeClass('bellSwingMessage');
            }
        });
        /* }*/

        $('#khlogo').on('click', function () {
            var dialogButtons = {};
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    setlogourl.getlogo(function (result) {
                        if (result) {
                            jqueryMap.$setlogo.modal('hide');
                        }
                    });
                    return false;
                }
            };

            dialogButtons.cancel = {
                label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                className: 'btn btn-default borderRadius4 color666'
            };

            $.get("/setlogo.jsp", function (html) {
                jqueryMap.$setlogo = bootbox.dialog({
                    title: '选择LOGO',
                    message: html,
                    buttons: dialogButtons
                });
            });
        });

        /*
        $('#headPortrait').on('click', function () {
            var dialogButtons = {};
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    setimgurl.getimg(function (result) {
                        if (result) {
                            jqueryMap.$setimg.modal('hide');
                            $.get('<%=request.getContextPath()%>/user/users/getimg', null, function (results) {
                                if (results) {
                                    $("#photo").attr("src", results);
                                }
                            });
                        }
                    });
                    return false;
                }
            };
            dialogButtons.cancel = {
                label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',

                className: 'btn btn-default borderRadius4 color666'
            };

            $.get(configMap.imgUrl, function (html) {
                jqueryMap.$setimg = bootbox.dialog({
                    title: '选择头像',
                    message: html,
                    buttons: dialogButtons
                });
                $('.modal-dialog').css("width", "680px");
            });
        });
        */

        $("#addsc").on("click", function () {
            var dialogButtons = {};

            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    companyInfoEdit.saveCompanyInfo(function (result) {
                        if (result) {
                            jqueryMap.$companyInfoDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };

            dialogButtons.cancel = {
                label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                className: 'btn btn-default borderRadius4 color666'
            };

            $.get(configMap.companyInfoUrl, function (html) {
                jqueryMap.$companyInfoDialog = bootbox.dialog({
                    title: '企业信息',
                    message: html,
                    buttons: dialogButtons
                });
            });
        })

        $('#modifyPwd').on('click', function () {
            var dialogButtons = {};
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    modifyPwd.modify(function (result) {
                        if (result) {
                            jqueryMap.$modifyPwdDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };

            dialogButtons.cancel = {
                label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                className: 'btn btn-default borderRadius4 color666'
            };

            $.get(configMap.modifyUrl, function (html) {
                jqueryMap.$modifyPwdDialog = bootbox.dialog({
                    title: '修改密码',
                    message: html,
                    buttons: dialogButtons
                });
            });
        });


        $('#XZYG_MDW').off('click').on('click', function () {
            if ($('#xzyg', jqueryMap.$welcomeDIV).length == 1) {
                XZYG();
            } else {
                Messenger().post({
                    message: '您没有此项权限！',
                    type: 'warning'
                });
            }
        });

        $('#FBGG_MDW').off('click').on('click', function () {
            if ($('#fbgg', jqueryMap.$welcomeDIV).length == 1) {
                FBGG();
            } else {
                Messenger().post({
                    message: '您没有此项权限！',
                    type: 'warning'
                });
            }
        });


        $('#TXL_MDW').off('click').on('click', function () {
            TXL();
        });

        //新手入门
        var XSRM = function () {
            generateTab(this, "/systemmanager/customergettingstarted/customergettingstarted.jsp", "新手入门", "0984cd89-23ea-4bd0-9d6c-85221a251c9a");
        };
        //新增客户
        var XZKH = function () {
            generateTab(this, "/customermanage/customerManage/add.jsp","创建客户","khxx_info",'fa fa-file-text-o iconMr');
            //generateTab(this, "/customermanage/customerManage/list.jsp?firstpage=1", "客户列表", "2327c868-34d2-4107-92f2-7fc5f94d8738", 'icon iconfont icon-yuangongfenxi iconMr');
        };

        //新增员工
        var XZYG = function () {
            generateTab(this, "/user/users/list.jsp?firstpage=1", "员工管理", "6d192b89-7750-4b2d-940a-bc6559a92c55", 'icon iconfont icon-yuangongfenxi iconMr');
        };

        //发布公告
        var FBGG = function () {
            generateTab(this, "/systemmanager/systemannouncement/systemannouncement.jsp?firstpage=1", "系统公告", "2c713032-4afd-4b76-aa50-429cc9d21261");
        };

        //通讯录
        var TXL = function () {
            generateTab(this, "/customermanage/contacts/contacts.jsp", "通讯录", "41e47056-b70f-4895-a7de-d41591f5ed60");
        };

        $('#userInfo').on('click', function () {
            var dialogButtons = {};

            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    userinfoEdit.saveUserInfo(function (result) {
                        if (result) {
                            jqueryMap.$userInfoDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };

            dialogButtons.cancel = {
                label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                className: 'btn btn-default borderRadius4 color666'
            };

            $.get(configMap.userinfoUrl, function (html) {
                jqueryMap.$userInfoDialog = bootbox.dialog({
                    title: '个人信息',
                    message: html,
                    buttons: dialogButtons
                });
            });
        });


        $('#mailList').on('click', function () {
            RWTab(this, "/customermanage/contacts/contacts.jsp", "通讯录", "41e47056-b70f-4895-a7de-d41591f5ed60", 'fa fa-user iconMr')
        });

        /*
        $('#companyInfo').on('click', function () {
            var dialogButtons = {};

            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    companyInfoEdit.saveCompanyInfo(function (result) {
                        if (result) {
                            jqueryMap.$companyInfoDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };

            dialogButtons.cancel = {
                label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                className: 'btn btn-default borderRadius4 color666'
            };

            $.get(configMap.companyInfoUrl, function (html) {
                jqueryMap.$companyInfoDialog = bootbox.dialog({
                    title: '企业信息',
                    message: html,
                    buttons: dialogButtons
                });
            });
        });
        */

        //添加标签的方法
        var generateTab = function (_target, srcStr, menuName, id, iconName) {
            //标签移除
            $("#tab-page-nav-" + id).remove();
            //内容移除
            $("#tab-page-content-" + id).remove();
            var _opt;
            var $a_alarm = $('ul.page-sidebar-menu').find('a.nav-link.nav-toggle[url="' + srcStr + '"]');
            //console.info("aaa:" + $a_alarm);
            if ($a_alarm.length > 0) {
                _opt = {
                    title: '<i class="' + $a_alarm.find('i').attr('class') + '"></i> ' + $a_alarm.find('span').html(),
                    id: $a_alarm.data('addtab'),
                    tabMonitor: $('#main-tab'),
                    url: srcStr
                };
            } else {
                _opt = {
                    title: '<i class="' + iconName + '"></i>' + menuName,
                    id: id,
                    tabMonitor: $('#main-tab'),
                    url: srcStr
                };
            }
            $(_target).addTabs(_opt);
        }

        //  添加标签并打开jsp
        $('.top-remind-m').off('click').on('click', function () {
            generateTab(this, "/systemmanager/systemannouncement/systemannouncement.jsp", "系统公告", "2c713032-4afd-4b76-aa50-429cc9d21261", "icon iconfont icon-weibiaoti9");
        });
        $('.top-message-m').off('click').on('click', function () {
            generateTab(this, "/systemmanager/messageremind/messageremind.jsp", "消息提醒", "b9df8b20-1fd0-426a-b35a-8f6f9a102799", "icon iconfont icon-xiaoxi");
        });

        //处理admin用户下拉菜单的样式
        $('#top-menu>ul.nav>li.dropdown-user').hover(function () {
            $('#admin').css({width: "120px"});
            $('#admin').addClass('mainStyle');
            $('#admin>li>a').addClass('mainStyle');
        });

        $('#admin>li').hover(function () {
            //初始化菜单的颜色
            $('#admin>li>a').addClass('mainStyle');
            $(this.children[0]).addClass('mainActive');
            /* $('.dropdown-toggle').css({background:'#1b222a'}); */
        }, function () {
            $(this.children[0]).removeClass('mainActive');
            $('#admin>li>a').addClass('mainStyle');
        });

        $('#mainMenu-m').addClass('mainMenuOut')
            .hover(function () {
                $('#mainMenu-m').addClass('mainMenuIn');
                $('li.dropdown.dropdown-user').addClass('mainMenuIn');
            }, function () {
                $('#mainMenu-m').removeClass('mainMenuIn')
                $('#mainMenu-m').addClass('mainMenuOut');
                $('li.dropdown.dropdown-user').addClass('mainMenuOut').removeClass('mainMenuIn');
            });


    });

    var openModal = function (title, url,type) {
        var $workorder = null;
        var dialogButtons = {};

        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn borderRadius4 btn-default'
        };

        $.get(url, function (html) {
            $workorder = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                className: 'commonProblemType-dialog'
            });
        });
    };
    $(function () {


        var cookie_Skin = Cookies.get('myCssSkin');
        var cookie_Skin1 = Cookies.get('myCssSkin1');
        if (cookie_Skin && cookie_Skin1) {
            $('#skinChange1_m').attr('href', "<%=request.getContextPath()%>/assets/pages/css/caiyun/" + cookie_Skin + '.css');
            $('#skinChange2_m').attr('href', "<%=request.getContextPath()%>/assets/pages/css/caiyun/" + cookie_Skin1 + '.css');
            Cookies.set('myCssSkin', cookie_Skin, {expires: 365});
            Cookies.set('myCssSkin1', cookie_Skin1, {expires: 365});
        }
        $('.changeSkin_m').click(function () {
            var dialogButtons = {};
            dialogButtons.success = {
                label: '<i class="' + 'icon iconfont icon-duihao1  iconMr' + '"></i>提交',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    $('#themeList_m li').find('input').each(function (i, v) {
                        if ($(v).is(':checked')) {
                            var str = this.value;
                            var arr = str.split(' ');
                            $('#skinChange1_m').attr('href', "<%=request.getContextPath()%>/assets/pages/css/caiyun/" + arr[0] + '.css');
                            $('#skinChange2_m').attr('href', "<%=request.getContextPath()%>/assets/pages/css/caiyun/" + arr[1] + '.css');
                            Cookies.set('myCssSkin', arr[0], {expires: 365});
                            Cookies.set('myCssSkin1', arr[1], {expires: 365});
                        }
                    });

                }
            };

            dialogButtons.cancel = {
                label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
                className: 'btn borderRadius4 btn-default'
            };

            $.get('/caiyun/changeSkin.jsp', function (html) {
                bootbox.dialog({
                    title: '选择皮肤',
                    message: html,
                    buttons: dialogButtons,
                    className: 'changeSkin-dialog'
                });
            });


        });


    });


</script>

<script type="text/javascript"
        src="<%=request.getContextPath()%>/assets/pages/scripts/caiyun/setlog.js"></script>
</html>