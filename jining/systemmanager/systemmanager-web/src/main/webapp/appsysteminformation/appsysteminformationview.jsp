<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
	.appSystermInformation-m img
	{
		width: 463px;
	}
</style>
<div class="row" id="appsysteminformationView">
	<div class="form-body  container-fluid">
			<div class="row">
				<div class="col-sm-6 form-group">
					<span class="mr h5 color999">客户端类型：</span><span  id="clientType"></span>
				</div>
				<div class="col-sm-6 form-group">
					<span class="mr h5 color999">设备类型：</span><span id="phoneType"></span>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6 form-group">
					<span class="mr h5 color999">通知类型：</span><span id="informationType"></span>
				</div>
				<div class="col-sm-6 form-group">
					<span class="mr h5 color999">升级时间：</span><span  id="bbsjsj"></span>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 form-group">
					<span class="mr h5 color999">专题地址：</span><span><a href="#" target="_blank"  id="messageZt"></a></span>
				</div>
			</div>
			<div class="row">
                <div class="col-sm-12 form-group">
                        <div class="h5 color999">通知标题：</div>
                        <div style="word-break: break-all;" id="messageJj"> </div>
                </div>
            </div>
			<div class="row">
				<div class="col-sm-12 form-group">
						<div class="h5 color999">通知内容：</div>
						<div  style="word-break: break-all;"  id="message"></div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 form-group">
					<span class="mr h5 color999">录入时间：</span><span id="enterDate"></span>
				</div>
			</div>
		</div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/appsysteminformation/appsysteminformationview.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
        appsysteminformationView.setPath("<%=request.getContextPath() %>");
        appsysteminformationView.init("<%=request.getParameter("id")%>");
	});
</script>