<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<form action="#" id="announcementtypeForm" class="form form-horizontal">
	<div class="form-body">
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						类型名称：
					</label>


						<input type="text" class="inputCommon inputWidth-col-one color666" name="announcementTypeName">
				</div>
			</div>
		</div>
	</div>
</form>
<link href="<%=request.getContextPath()%>/assets/pages/css/announcementType/eidt.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/announcementtype/announcementtypeedit.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		announcementtypeEdit.setPath("<%=request.getContextPath() %>");
		announcementtypeEdit.init("<%=id%>");
	});
</script>