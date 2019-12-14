<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/4/25 0025
  Time: 13:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    String firstpage = request.getParameter("firstpage");
    if (firstpage == null) {
        firstpage = "0";
    }
    String id = request.getParameter("id");
    String name = request.getParameter("name");
    response.setHeader("Pragma","No-cache");
    response.setHeader("Cache-Control","no-cache");
    response.setDateHeader("Expires", 0);
%>
<style>

</style>
<div class="daizhangandyicixingByLi">

</div>

<script type="text/javascript">
    $(function () {
        $('.daizhangandyicixingByLi').load('/customermanage/customerManage/list.jsp?id=<%=id%>'+'&name=<%=name%>');
    })
</script>
