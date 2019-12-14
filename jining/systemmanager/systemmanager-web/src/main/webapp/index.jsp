<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->

<head>
    <title>信海平台</title>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <!-- 第三方类库样式（开始） -->
    <link href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/simple-line-icons/simple-line-icons.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/uniform/css/uniform.default.css"
          rel="stylesheet" type="text/css"/>
    <!-- 第三方类库样式（结束） -->


    <!--页面级样式-->
    <link href="<%=request.getContextPath()%>/assets/global/plugins/datatables/datatables.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/icheck/skins/all.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/select2/css/select2.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/select2/css/select2-bootstrap.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/messenger/css/messenger.css"
          rel="stylesheet"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/messenger/css/messenger-theme-block.css"
          rel="stylesheet"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/jstree/themes/default/style.min.css"
          rel="stylesheet"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/mCustomScrollbar/jquery.mCustomScrollbar.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css"
          rel="stylesheet">
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/plugins/jquery-layout/layout-default-latest.css"
          rel="stylesheet" type="text/css"/>
    <!-- 页面级样式 -->

    <!-- 全局样式类（开始） -->
    <link href="<%=request.getContextPath()%>/assets/global/css/components.css" rel="stylesheet"
          type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/global/css/plugins.css" rel="stylesheet"
          type="text/css"/>
    <!-- 全局样式类（结束） -->

    <link href="<%=request.getContextPath()%>/assets/layouts/layout1/css/layout.css"
          rel="stylesheet" type="text/css"/>
    <link href="<%=request.getContextPath()%>/assets/layouts/layout1/css/themes/blue.css"
          rel="stylesheet" type="text/css" id="style_color"/>
</head>

<body class="page-sidebar-closed-hide-logo page-content-white page-header-fixed page-sidebar-fixed">
<div class="page-header navbar navbar-fixed-top">
    <div class="page-header-inner ">
        <div class="page-logo">
            <a href="#">
                <span class="logo-default">信海平台</span> </a>
        </div>
        <div class="top-menu">
            <ul class="nav navbar-nav pull-right">
                <li class="dropdown dropdown-user">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"
                       data-hover="dropdown" data-close-others="true">
                        <i class="fa fa-user fa-fw"></i>
                        <span class="username username-hide-on-mobile">  </span>
                        <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-default">
                        <li><a href="javascript:;" id="modifyPwd"><i class="fa fa-gear fa-fw"></i>
                            修改密码</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="#" id="logout"><i class="fa fa-sign-out fa-fw"></i> 退出</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="clearfix"></div>
<div class="page-container">
    <div class="page-sidebar-wrapper">
        <div class="page-sidebar navbar-collapse collapse">
            <ul class="page-sidebar-menu page-header-fixed " data-keep-expanded="false"
                data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">
            </ul>
        </div>
        <div class="page-footer">
            <div class="menu-toggler sidebar-toggler">
                <i class="fa fa-chevron-circle-left"></i>
            </div>
        </div>
    </div>
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="tabbable tabbable-tabdrop" id="main-tab" tab-height>
                <ul class="nav nav-tabs close-tab-nav" role="tablist"></ul>
                <div class="tab-content" content-height></div>
            </div>
        </div>
    </div>
</div>
<!--[if lt IE 9]>
<script src="<%=request.getContextPath()%>/assets/global/plugins/respond.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/js/bootstrap.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/metisMenu/metisMenu.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.blockui.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/uniform/jquery.uniform.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/lodash.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/js.cookie.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"
        type="text/javascript"></script>

<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.pin.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/datatables/datatables.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/moment-with-locales.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/icheck/icheck.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/select2/js/select2.full.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/select2/js/i18n/zh-CN.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/jquery.validate.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/additional-methods.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/localization/messages_zh.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-confirmation/bootstrap-confirmation.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootbox/bootbox.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/messenger/js/messenger.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-tabdrop.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jstree/jstree.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/echarts/echarts.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/echarts/vintage.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-tagsinput/bootstrap-tagsinput.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.bootstrap.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/typeahead/typeahead.bundle.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-select/js/i18n/defaults-zh_CN.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-ui/jquery-ui.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-layout/jquery.layout-latest.js"></script>

<script src="<%=request.getContextPath()%>/assets/global/scripts/app.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/scripts/datatable.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/layouts/layout1/scripts/layout.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/layouts/global/scripts/bootstrap-addtabs.js"
        type="text/javascript"></script>
</body>

<script type="text/javascript">
    var configMap = {
        modifyUrl: '<%=request.getContextPath()%>/modifypwd.jsp'
    };
    var jqueryMap = {
        $modifyPwdDialog: null
    };

    var builderMenu = function (menus, parentHtml) {
        _.forEach(menus, function (menu) {
            var attr = menu.url ? (
            ' url="' + menu.url + '" data-addtab="' + menu.id + '"') : '';
            var item = $('<li class="nav-item">' +
                    '<a href="#" ' + attr + ' class="nav-link nav-toggle">' +
                    '<i class="' + menu.icon + '"></i>' +
                    '<span class="title">' + menu.text + '</span>' +
                    (
                            menu.children ? '<span class="arrow"></span>' : '') +
                    '</a>' +
                    '</li>');
            if (menu.children) {
                var childrenHtml = $('<ul class="sub-menu"></ul>');
                $(item).appendTo(parentHtml);
                $(childrenHtml).appendTo(item);
                builderMenu(menu.children, childrenHtml);
            }
            else {
                $(item).appendTo(parentHtml);
            }
        });
    };

    jQuery(document).ready(function () {
        $('.page-sidebar-menu').on('click', '[data-addtab]', function () {
            $.get("<%=request.getContextPath()%>/verifylogin", null, function (result) {
                if (!result) {
                    window.location.href = "<%=request.getContextPath()%>/login.jsp";
                }
            });
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

        $.get('<%=request.getContextPath()%>/getsysinfo', null, function (result) {
            if (result) {
                $('.username').text(result.userinfo);
                var title = result.title ? result.title : '信海平台';
                $('.logo-default').text(title);
                $('title').text(title);
            }
        });

        $('#modifyPwd').on('click', function () {
            var dialogButtons = {
                cancel: {
                    label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                    className: 'btn-default'
                }
            };

            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn-primary",
                callback: function () {
                    modifyPwd.modify(function (result) {
                        if (result) {
                            jqueryMap.$modifyPwdDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };

            $.get(configMap.modifyUrl, function (html) {
                jqueryMap.$modifyPwdDialog = bootbox.dialog({
                    title: '修改密码',
                    message: html,
                    buttons: dialogButtons
                });
            });
        });
    });

</script>
</html>