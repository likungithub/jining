<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
	<div class="col-md-12 form form-horizontal">
		<div class="form-body">
			<div class="row">
				<div class="col-xs-12">
					<div class="form-group">
						<label class="control-label  col-xs-2  color666 title-thick padding-reset-r ">操作人：</label>
						<div class=" col-md-10 col-xs-10">
							<p class="form-control-static color666" id="staffmembername"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<div class="form-group">
						<label class="control-label col-xs-2  color666 title-thick padding-reset-r">所属公司：</label>
						<div class="col-xs-10">
							<p class="form-control-static color666" id="companyname"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<div class="form-group">
						<label class="control-label col-xs-2  color666 title-thick padding-reset-r">菜单：</label>
						<div class="col-xs-10">
							<p class="form-control-static color666" id="module"></p>
						</div>
					</div>
				</div>
			</div>			
			<div class="row">
				<div class="col-xs-12">
					<div class="form-group">
						<label class="control-label col-xs-2  color666 title-thick padding-reset-r">操作日期：</label>
						<div class="col-xs-10">
							<p class="form-control-static color666" id="operatetime"></p>
						</div>
					</div>
				</div>
			</div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label col-xs-2  color666 title-thick padding-reset-r">日志内容：</label>
                        <div class="col-xs-10">
                            <p class="form-control-static color666 log-content" id="content"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label class="control-label col-xs-2  color666 title-thick padding-reset-r">ip地址：</label>
                        <div class="col-xs-10">
                            <p class="form-control-static color666" id="ip"></p>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/operatelog/view.css" rel="stylesheet" type="text/css" />
<script src="<%= request.getContextPath()%>/assets/pages/scripts/Log/view.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		$(".modal-dialog").css("width","1000px");
		logView.setPath("<%=request.getContextPath() %>");
		logView.init("<%=request.getParameter("id")%>");
	});
</script>