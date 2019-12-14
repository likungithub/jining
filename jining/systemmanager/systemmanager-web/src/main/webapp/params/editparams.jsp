<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<form action="#" id="paramsForm" class="form form-horizontal">
	<div class="form-body">
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						参数类型：
					</label>
						<input type="text" class="inputCommon inputWidth-col-one color666" name="type" placeholder="2~10位大写英文字母，尽量使用类型名称拼音首字母大写，例如：预警提醒：YJTX">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						类型名称：
					</label>
						<input type="text" class="inputCommon inputWidth-col-one" name="typename">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						参数代码：
					</label>
                        <input type="text" class="inputCommon inputWidth-col-one" name="typecode" name="type" placeholder="3位数字，例如：001">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						参数名称：
					</label>
						<input type="text" class="inputCommon inputWidth-col-one" name="paramsname">
				</div>
			</div>
		</div>
	</div>
</form>
<link href="<%=request.getContextPath()%>/assets/pages/css/params/paramsedit.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/params/paramsedit.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		paramsEdit.setPath("<%=request.getContextPath() %>");
		paramsEdit.init("<%=id%>");
	});
</script>