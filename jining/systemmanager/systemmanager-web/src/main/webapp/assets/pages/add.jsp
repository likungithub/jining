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
<h3>新增维修申请</h3>
<form action="#" class="form form-horizontal" id="addUser-form-datas">

</form>
