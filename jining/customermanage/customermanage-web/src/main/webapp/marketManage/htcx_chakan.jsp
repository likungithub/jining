<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String uuid = UUID.randomUUID().toString();
    String wtid = request.getParameter("wtid");
    if (wtid == null) {
        wtid = "";
    }
%>
<div id="htcx_chankan<%=uuid%>">
    <div class="dataTables_wrapper no-footer">
        <table class="table table-striped table-bordered table-hover" id="htcx_chakan_table" style="width:100%">
            <thead>
            <tr>
                <th>样品名称</th>
                <th>样品ID</th>
                <th>规格型号</th>
                <th>样品等级</th>
                <th>检验类别</th>
                <th>样品数量</th>
                <th>样品状态</th>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script type="application/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/htcx_chakan.js"></script>
<script type="application/javascript">
    htcx_chakanlist.setPath("<%=request.getContextPath()%>");
    htcx_chakanlist.init("<%=uuid%>", "<%=wtid%>")
</script>
