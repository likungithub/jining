<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/multiple_select/multiple-select.css"/>
<%
    String uuid = UUID.randomUUID().toString();

    String zbwcIds = request.getParameter("zbwcIds");
    String zbypbms = request.getParameter("zbypbms");
    String ypmcs = request.getParameter("ypmcs");
    if(ypmcs==null)
    {
        ypmcs="";
    }
    if(zbwcIds==null)
    {
        zbwcIds="";
    }
%>
<style>
    .dateLabel-q {
        width:100% !important;
        text-align:left;
    }

</style>
<form action="#" id="<%=uuid%>zbfsForm" class="form form-horizontal">
    <div class="form-body">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <span style="font-size: 20px">制备样品:<%=ypmcs%></span><br>
                    <div id="zbfslab">
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/jcgl/ypzbfc/ypzbfs.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        ypzbFsxz.setPath("<%=request.getContextPath() %>");
        ypzbFsxz.init("<%=uuid%>","<%=zbwcIds%>");
    });
</script>