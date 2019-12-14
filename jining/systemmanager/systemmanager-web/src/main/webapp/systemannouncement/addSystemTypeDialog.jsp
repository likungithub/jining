<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<form action="#" id="addSystemTypeDialogForm" class="form form-horizontal">
	<div>
		<div class="row">
			<div class="col-md-12" style="margin-left: 66px;">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">类型名称：
						<span class="required"> * </span></label>
						<input type="text" class="inputCommon inputWidth-col-one color666" name="addSystemTypeName">
				</div>
			</div>
		</div>
	</div>
</form>
<link href="<%=request.getContextPath()%>/assets/pages/css/announcementType/eidt.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/systemannouncement/addSystemTypeDialog.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		addSystemTypeDialogEdit.setPath("<%=request.getContextPath() %>");
		addSystemTypeDialogEdit.init("<%=id%>");
	});
</script>