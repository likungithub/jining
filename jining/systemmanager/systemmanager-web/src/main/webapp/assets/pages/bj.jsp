<%@page import="java.util.UUID"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
java.util.Date currentTime = new java.util.Date();//得到当前系统时间
String txtDate = format.format(currentTime); //将日期时间格局化
%>
<style>
.modal-content{
    width:730px;
}
#user-form-datas	.labelWidth-col-two{
	width: 110px!important;
}
</style>
<h3>仪器维修记录修改</h3>

<%--
<link href="<%=request.getContextPath()%>/assets/pages/css/users/edit.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/add.js" type="text/javascript"></script>
<%
    String dljgbm = request.getParameter("dljgbm");
    if (dljgbm == null) {
        dljgbm = CurrentLoginUser.getUser().getDljgBm();
    }
    String zydm = request.getParameter("zydm");
    if (zydm == null) {
        UUID uuid = UUID.randomUUID();
        zydm = uuid+"";
    }
%>
<script type="text/javascript">
	userAdd.setPath('<%=request.getContextPath()%>');
	userAdd.init('<%=dljgbm%>', '<%=zydm%>');
    //textarea输入字数限制
    checkHowMany($("#addQualifications"),$("#addQualificationsWords"),300);
    checkHowMany($("#addRemark"),$("#addRemarkWords"),300);
</script>--%>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/ygsbgl/yqwxsq/add_yqwxsq.js"></script>
