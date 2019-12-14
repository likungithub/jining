<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
	<div class="col-md-3">
		<div id="orgTree" style ="margin-top :10px;"></div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/Log/orgView.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		orgView.setPath("<%=request.getContextPath() %>");
		orgView.init();
	});
</script>