<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="java.util.UUID"%>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
	UUID uuid = UUID.randomUUID();
%>
<form action="#" id="customertypeForm" class="form form-horizontal">
	<div>
		<div class="row">
			<div class="col-md-12" >
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666" style="display:none">
						客户分类编码
					</label>
						<input style="display:none" type="text" class="inputCommon inputWidth-col-one color666" value="<%=uuid%>" id="khflbm" readonly="readonly"  >
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12" style="padding-left: 66px">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						客户分类名称
					</label>
						<input type="text" class="inputCommon inputWidth-col-one color666" id="khflmc" maxlength="20" >
				</div>
			</div>
		</div>
	</div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/customertype/editcustomertype.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
	    $('#customertypeForm').parents('.modal-dialog').css({
			width:720
		});
		customertypeEdit.setPath("<%=request.getContextPath()%>");
		customertypeEdit.init("<%=id%>");
	});
</script>