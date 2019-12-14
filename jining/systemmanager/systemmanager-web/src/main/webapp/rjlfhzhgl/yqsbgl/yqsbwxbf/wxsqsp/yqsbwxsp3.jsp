<%@page import="java.util.UUID"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
 .rotate1 {
		atetransform: rotate(180deg);
	}
</style>
<%
String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<form id="findByNabhsjsp">
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">设备名称</label>
											<input type="text" class="inputCommon appsysinfo-m" id="sbmcsjsp" name="sbmc" placeholder="请输入仪器名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
										</div>
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">受控编号</label>
											<input type="text" class="inputCommon appsysinfo-m" id="skbhsjsp" name="skbh" placeholder="请输入受控编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
										</div>
									</form>
								</div>
								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="<%=uuid%>yqsbtzSeatchwxsjsp"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="<%=uuid%>resetYqsbtzwxsjsp"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button id="<%=uuid%>yqsbtzSpTgsjsp" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>审批通过</button>
									<button id="<%=uuid%>yqsbtzSpThsjsp" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>审批退回</button>
									<%--<button id="<%=uuid%>yqsbtzShanwxbf" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>删除</button>--%>
									<%--<button id="<%=uuid%>yqsbtzAddnewwxbf" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>--%>
									<%--<button id="<%=uuid%>yqsbtzUpdatenewwxbf" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>修改</button>--%>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
 				<form id="<%=uuid%>yqsbtzform_deletesjsp">
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="Yqsbtzwxsjsp" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left"><input type="checkbox" name="yqsbwxbfck"></th>
							<th class="text-left">设备名称</th>
							<th class="text-left">规格型号</th>
							<th class="text-left">生产厂商</th>
							<th class="text-left">设备原值</th>
							<th class="text-left">设备状况</th>
							<th class="text-left">维修原因</th>
							<th class="text-left">报废原因</th>
							<th class="text-left">申请状态</th>
							<th class="text-left">审批状态</th>
							<th class="text-left">维修申请备注</th>
							<th class="text-left">报废申请备注</th>
						</tr>
						</thead>
					</table>
				</div>
				</form>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/wxbfsp/wxsp/yqsbtzwxsp3.js"></script>
<script type="text/javascript">
	$(function () {
        yqyysyListyqsbtzwxsjsp.setPath("<%=request.getContextPath()%>");
        yqyysyListyqsbtzwxsjsp.init("<%=uuid%>")
    })
</script>


