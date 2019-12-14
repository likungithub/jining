<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<style>
.auto-table-area {
	width: 100%;
	overflow: auto;
}

.row {
	margin: 0 !important;
}
</style>
<div id="goWorkList-manager-content">
	<div class="col-md-12">
		<div class="portlet-body">
			<ul id="myTab" class="nav nav-tabs">
				<li class="active"><a href="#goWork" data-toggle="tab">派工 </a></li>
				<li><a href="#goWorkSearch" data-toggle="tab">派工查询</a></li>
			</ul>
			<div id="myTabContent" class="tab-content">
				<div class="tab-pane fade in active" id="goWork"></div>
				<div class="tab-pane fade" id="goWorkSearch"></div>
			</div>
		</div>
	</div>
</div>

<script
	src="<%= request.getContextPath()%>/assets/pages/scripts/customer/goWorkList.js"
	type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		goWorkList.setPath('<%= request.getContextPath()%>');
		goWorkList.init();
	});
</script>