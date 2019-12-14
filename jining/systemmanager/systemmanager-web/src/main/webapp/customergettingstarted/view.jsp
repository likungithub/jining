<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
	<div class="col-md-12 form form-horizontal">
		<div class="form-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3 color666 title-thick padding-reset-r">姓名</label>
						<div class="col-md-9">
							<p class="form-control-static" id="name"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3 color666 title-thick padding-reset-r">编号</label>
						<div class="col-md-9">
							<p class="form-control-static" id="code"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3 color666 title-thick padding-reset-r">性别</label>
						<div class="col-md-9">
							<p class="form-control-static" id="sex"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3 color666 title-thick padding-reset-r">年龄</label>
						<div class="col-md-9">
							<p class="form-control-static" id="age"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3 color666 title-thick padding-reset-r">出生日期</label>
						<div class="col-md-9">
							<p class="form-control-static" id="birthday"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/customergettingstarted/view.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/systemmanager/view.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		employeeView.setPath("<%=request.getContextPath() %>");
		employeeView.init("<%=request.getParameter("id")%>");
	});
</script>