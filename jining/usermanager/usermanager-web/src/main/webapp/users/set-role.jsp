<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div id="user-manager-roletreedata"></div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/set-roles.js"></script>
<%
	String userId = request.getParameter("userid");
	if (userId == null) {
		userId = "";
	}
%>
<script type="text/javascript">
	setUserRole.setPath('<%=request.getContextPath()%>');
	setUserRole.init('<%=userId%>');
</script>