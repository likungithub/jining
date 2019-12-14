<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div><img id="txm"></div>
&emsp;合同名称：<%=request.getParameter("htmc")%>
<br>
&emsp;样品名称：<%=request.getParameter("ypmc")%>
<br>
&emsp;时间：<fmt:formatDate value="<%=new Date() %>" pattern="yyyy-MM-dd HH:mm:ss"/>
<script src="<%= request.getContextPath()%>/assets/pages/laydate/Jquery3.3.1.js" type="text/javascript"></script>
<script src="<%= request.getContextPath()%>/assets/pages/laydate/JsBarcode.all.js" type="text/javascript"></script>
<script type="text/javascript">
    $('#txm').JsBarcode("<%=request.getParameter("ypbm")%>", {
        height: 70,//高度
        margin: 20//设置条形码周围的空白边距
    });
</script>