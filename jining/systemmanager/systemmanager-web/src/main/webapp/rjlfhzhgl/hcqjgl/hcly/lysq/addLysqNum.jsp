<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
	.rotate1 {
		transform: rotate(180deg);
	}
</style>
<%
	String uuid = UUID.randomUUID().toString();
%>
<div class="form-group input-group"  style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
	<span class="input-group-addon"><label  style="width: 80px !important;">耗材数量</label></span>
	<input id="<%=uuid%>LysqNum" type="number" placeholder="请输入耗材数量" class="form-control" style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
</div>
<script type="application/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/hcly/lysq/addLysqNum.js"></script>
<script language="javascript" type="text/javascript">
    addHclyNumList.inint("<%=uuid%>");
</script>
