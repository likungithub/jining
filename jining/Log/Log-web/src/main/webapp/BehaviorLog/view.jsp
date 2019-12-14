<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
	<div class="col-md-12 form form-horizontal">
		<div class="form-body">
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-2 color666 title-thick padding-reset-r">受访时间：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="time"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">ip地址：</label>
                        <div class="col-md-9">
                            <p class="form-control-static" id="ip"></p>
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
						<label class="control-label col-md-2 color666 title-thick padding-reset-r">访客地区：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="address"></p>
						</div>
					</div>
				</div>
			</div>			
			<div class="row">
				<div class="col-md-12">
					<div class="form-group">
						<label class="control-label col-md-2 color666 title-thick padding-reset-r">设备类型：</label>
						<div class="col-md-9">
							<p class="form-control-static" id="device"></p>
						</div>
					</div>
				</div>
			</div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">浏览器信息：</label>
                        <div class="col-md-9">
                            <p class="form-control-static" id="browser"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">分辨率：</label>
                        <div class="col-md-9">
                            <p class="form-control-static" id="resolution"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="control-label col-md-2 color666 title-thick padding-reset-r">来源：</label>
                        <div class="col-md-9">
                            <p class="form-control-static" id="referrer"></p>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/behaviorlog/view.css" rel="stylesheet" type="text/css" />
<script src="<%= request.getContextPath()%>/assets/pages/scripts/BehaviorLog/view.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		behaviorlogView.setPath("<%=request.getContextPath() %>");
		behaviorlogView.init("<%=request.getParameter("id")%>");
	});
</script>