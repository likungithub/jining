<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row" id="messageview">
	<div class="col-md-12 form form-horizontal">
		<div class="form-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3 color666 title-thick padding-reset-r">消息标题：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="messageTitle"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3 color666 title-thick padding-reset-r">消息内容：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="messageContent"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3 color666 title-thick padding-reset-r">来源：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="messageSource"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3 color666 title-thick padding-reset-r">日期：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="time"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-3 color666 title-thick padding-reset-r">阅读状态：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="readStat"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/customergettingstarted/view.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/messageremind/messageview.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		messageView.setPath("<%=request.getContextPath() %>");
		messageView.init("<%=request.getParameter("id")%>");
	});
</script>