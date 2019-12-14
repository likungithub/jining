<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String uuid = UUID.randomUUID().toString();
%>
<form action="#" id="<%=uuid%>editForm" class="form form-horizontal">
    <div class="form-body">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">
                        检测项目：
                        </label>
                    <input  type="text" class="inputCommon  color666" style="width: 440px"  name="jcxmmc" maxlength="50">
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/jcgl/rwfp/edit1.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        edit.setPath("<%=request.getContextPath() %>");
        edit.init("<%=id%>","<%=uuid%>");
    });
</script>