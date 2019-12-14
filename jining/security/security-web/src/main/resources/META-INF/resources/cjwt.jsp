<%@ page import="java.util.UUID" %><%--
  Created by IntelliJ IDEA.
  User: huxinquan
  Date: 2017/8/9
  Time: 8:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String UniqueID= UUID.randomUUID().toString();
%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="zh">
<!--<![endif]-->
<head>
    <meta charset="utf-8" />
    <title>常见问题</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <link id="internetFlag" rel="shortcut icon"  type="image/x-icon" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/icheck/skins/all.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/css/components.css" rel="stylesheet" id="style_components" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/caiyun/public.css" />
</head>
<style>
	#commonproblem_data td:nth-child(3){
		text-align:left;
	}
</style>
<body>
        <jsp:include page="header.jsp"/>
<div class="container">
<div class="row contentBgColor" id="cjwt_<%=UniqueID%>"  style="background: #fff!important">
    <div class="col-md-12">
        <div class="portlet light ">
            <div class="portlet-body">
                <div class="table-toolbar">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="pull-left">
                                <div class="input-icon" style="width: 190px;">
                                    <i class="fa fa-search colorBlue-10a0f7"></i>
                                    <input type="search" class="form-control borderRadius4" id="searchCommonProblem"
                                           placeholder="类型/名称" style="width: 220px">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover text-center"
                           id="commonproblem_data">
                        <thead>
                            <tr class="color333">
                            <th style="width: 100px">序号</th>
                            <th>问题类型</th>
                            <th style="text-align:left;width:550px;">问题名称</th>
                            <th style="width: 100px">录入日期</th>
                            <th style="width: 100px">操作</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
        <jsp:include page="footer.jsp"/>
<%--<footer id="foot">--%>
    <%--<ul class="list-unstyled">--%>
        <%--<li>--%>
            <%--<a href="#">关于首页</a>--%>
        <%--</li>--%>
        <%--<li>--%>
            <%--<a href="#">关于财云升</a>--%>
        <%--</li>--%>
        <%--<li>--%>
            <%--<a href="#">客户服务</a>--%>
        <%--</li>--%>
        <%--<li>--%>
            <%--<a href="#">法律声明</a>--%>
        <%--</li>--%>
        <%--<li>--%>
            <%--<a href="#">隐私条款</a>--%>
        <%--</li>--%>
        <%--<li>--%>
            <%--<span>财云升互联网科技有限公司版权所有&copy;2017 ICP证鲁B2-201711021</span>--%>
        <%--</li>--%>
    <%--</ul>--%>
<%--</footer>--%>

<!--[if lt IE 9]>
<script src="<%=request.getContextPath()%>/assets/global/plugins/respond.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/js.cookie.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/moment-with-locales.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/additional-methods.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/localization/messages_zh.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.bootstrap.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/icheck/icheck.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootbox/bootbox.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/scripts/app.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/md5.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/datatables/datatables.min.js" type="text/javascript"></script>
<script src="<%= request.getContextPath()%>/securityassets/scripts/cjwt.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        cjwt.setPath("<%= request.getContextPath()%>");
        cjwt.init('<%=UniqueID%>');
    });
</script>
<script type="text/javascript">
    $(function () {
        var data={
            "domainName":encodeURI(window.location.hostname)
        }
        $.ajax({
            url: 'systemmanager/getDomainName/getDomainNameAll',
            type: 'GET',
            data: data,
            success: function (result) {
                console.log(result);
                if(result.domainNameBasic){
                    $('#internetFlag').attr('href',result.domainNameBasic.intenetFlag)
                }else{
                    $('#internetFlag').attr('href',"/securityassets/img/favicon.ico")
                }
            },
        })
    });
</script>
</body>
</html>