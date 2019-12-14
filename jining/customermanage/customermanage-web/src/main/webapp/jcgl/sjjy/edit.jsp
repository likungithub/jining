<%@page import="java.util.UUID" %>
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

<div class="dataTables_wrapper no-footer">
    <table class="table table-striped table-hover paramsTab" id="ManagerList_sjjhck" width="100%">
        <thead>
        <tr class="color333">
            <th class="text-left">检测项目</th>
            <th class="text-left">限量值</th>
            <th class="text-left">检测值</th>
            <%--  <th class="text-left">温度</th>
              <th class="text-left">湿度</th>--%>
           <%-- <th class="text-left">检测方法</th>--%>
            <th class="text-left">开始日期</th>
            <th class="text-left">结束日期</th>
            <th class="text-left">执行人员</th>
        </tr>
        </thead>
    </table>
</div>


<script src="<%=request.getContextPath()%>/assets/pages/scripts/jcgl/sjjy/edit1.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        sjjyEditList.setPath("<%=request.getContextPath() %>");
        sjjyEditList.init("<%=id%>", "<%=uuid%>");
    });
</script>


