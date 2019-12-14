<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
	<div class="col-md-12 form form-horizontal">
		<div class="form-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">姓名：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="name"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">编号：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="code"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">性别：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="sex"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">年龄：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="age"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">出生日期：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="birthday"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/statisticalanalysis/view.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		employeeView.setPath("<%=request.getContextPath() %>");
		employeeView.init("<%=request.getParameter("id")%>");
	});
</script>