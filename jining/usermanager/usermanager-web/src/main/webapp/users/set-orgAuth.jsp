<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div id="user-manager-orgAuthtree"></div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/set-orgAuth.js"></script>
<%
	String id = request.getParameter("orgid");
	if (id == null) {
		id = "";
	}
%>
<script type="text/javascript">
	setUserOrgAuth.setPath('<%=request.getContextPath()%>');
	setUserOrgAuth.init('<%=id%>');
</script>