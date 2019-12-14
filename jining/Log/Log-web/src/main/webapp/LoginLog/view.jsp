<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
	<div class="col-md-12 form form-horizontal">
		<div class="form-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-2 color666 title-thick padding-reset-r">人员名称：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="personname"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">登录账号：</label>
                        <div class="col-md-9">
                            <p class="form-control-static" id="loginaccount"></p>
                        </div>
                    </div>
                </div>
            </div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-2 color666 title-thick padding-reset-r">登录时间：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="logintime"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-2 color666 title-thick padding-reset-r">退出时间：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="outtime"></p>
						</div>
					</div>
				</div>
			</div>			
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-2 color666 title-thick padding-reset-r">登录类型：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="logintype"></p>
						</div>
					</div>
				</div>
			</div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">用户IP：</label>
                        <div class="col-md-9">
                            <p class="form-control-static" id="ip"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">MAC地址：</label>
                        <div class="col-md-9">
                            <p class="form-control-static" id="mac"></p>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/loginlog/view.css" rel="stylesheet" type="text/css" />
<script src="<%= request.getContextPath()%>/assets/pages/scripts/LoginLog/view.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		loginlogView.setPath("<%=request.getContextPath() %>");
		loginlogView.init("<%=request.getParameter("id")%>");
	});
</script>