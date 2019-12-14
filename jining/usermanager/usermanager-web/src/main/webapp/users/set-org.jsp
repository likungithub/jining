<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div id="user-manager-orgtreedata"></div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/set-org.js"></script>
<%
	String id = request.getParameter("orgid");
	if (id == null) {
		id = "";
	}
%>
<script type="text/javascript">
	setUserOrg.setPath('<%=request.getContextPath()%>');
	setUserOrg.init('<%=id%>');
</script>