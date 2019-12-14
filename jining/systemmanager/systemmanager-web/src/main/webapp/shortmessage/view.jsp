<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
	<div class="col-md-12 form form-horizontal">
		<div class="form-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">纳税人识别号：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="nsrsbh"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">接收人代码：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="nsrmc"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">接收人电话：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="jsrdh"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">发送人代码：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="fsr_dm"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">代理机构编码：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="dljgbm"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">短信类型：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="type"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">短信内容：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="messageContent"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">发送状态：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="sendStat"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3">发送时间：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="sendTime"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/shortmessage/view.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		employeeView.setPath("<%=request.getContextPath() %>");
		employeeView.init("<%=request.getParameter("id")%>");
	});
</script>