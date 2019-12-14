<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
	<div class="col-md-3">
		<div id="menuTree" style ="margin-top :10px;"></div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/Log/menuView.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		menuView.setPath("<%=request.getContextPath() %>");
		menuView.init();
	});
</script>