<%--
  Created by IntelliJ IDEA.
  User: shanmaoju
  Date: 2018/6/10
  Time: 22:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>上传pdf文档</title>
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
    <link
            href="<%=request.getContextPath()%>/assets/layouts/layout1/css/themes/darkblue.css"
            rel="stylesheet" type="text/css" id="style_color"/>
</head>
<body>
<div>
    <input type="file" accept="text/csv" name="pdfFile" id="pdfFile"/>
</div>
<div>
    <button id="btnImport" class="btn btn-primary">
        <i class="fa fa-upload"></i>
        导入
    </button>
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
<script src="<%=request.getContextPath()%>/assets/global/plugins/jstree/jstree.plugins.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/echarts/echarts.min.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/echarts/shine.js"
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
<script src="<%=request.getContextPath()%>/assets/global/scripts/datatable-plugin.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/layouts/layout1/scripts/layout.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/layouts/global/scripts/bootstrap-addtabs.js"
        type="text/javascript"></script>
</body>
</html>

<script src="<%= request.getContextPath()%>/assets/pages/scripts/reportmanager/ajaxfileupload.js" type="text/javascript"></script>
<script type="text/javascript">
    var path="<%= request.getContextPath()%>";
    $(function () {
        $("#btnImport").off().on('click', function () {
            importIndex();
        });
    });

    var importIndex =function(){
        //开始上传文件时显示一个图片,文件上传完成将图片隐藏
        //$("#loading").ajaxStart(function(){$(this).show();}).ajaxComplete(function(){$(this).hide();});
        //执行上传文件操作的函数
        $.ajaxFileUpload({
            //处理文件上传操作的服务器端地址(可以传参数,已亲测可用)
            url:path+'/parsereport/import',
            secureuri:false,                       //是否启用安全提交,默认为false
            fileElementId:'pdfFile',           //文件选择框的id属性
            data:{},
            dataType:'text/html',                       //服务器返回的格式,可以是json或xml等
            success:function(data,status){        //服务器响应成功时的处理函数
                data = data.replace("<PRE>", '');  //ajaxFileUpload会对服务器响应回来的text内容加上<pre>text</pre>前后缀
                data = data.replace("</PRE>", '');
                data = data.replace("<pre>", '');
                data = data.replace("</pre>", ''); //本例中设定上传文件完毕后,服务端会返回给前台[0`filepath]
                data=data.replace("/paymanager/",'').replace(".jsp",'');
                $.messager.popup("导入成功！");
            },
            error:function(data, status, e){ //服务器响应失败时的处理函数
                $.messager.popup("导入失败！");
            }
        });
    }
</script>
