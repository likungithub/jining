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
									<form id="findByNabh">
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">设备名称</label>
											<input type="text" class="inputCommon appsysinfo-m" id="sbmcjdsp" name="sbmc" placeholder="请输入仪器名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
										</div>
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">受控编号</label>
											<input type="text" class="inputCommon appsysinfo-m" id="skbhjdsp" name="skbh" placeholder="请输入受控编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
										</div>
									</form>
								</div>
								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="<%=uuid%>yqsbjdSeatch"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="<%=uuid%>resetYqsbjd"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button id="<%=uuid%>yqsbjdjhtg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>计划通过</button>
									<button id="<%=uuid%>yqsbjdjhth" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>计划退回</button>
									<%--<button id="yqsbwhjhtg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>维护通过</button>--%>
									<%--<button id="yqsbwhjhth" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>维护退回</button>--%>
									<%--<button id="yqsbhcjhtg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>核查通过</button>--%>
									<%--<button id="yqsbhcjhth" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>核查退回</button>--%>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<form id="<%=uuid%>yqsbjdspform_delete">
						<table class="table table-striped table-hover paramsTab" id="Yqsbjdjhsp" width="100%">
							<thead>
							<tr class="color333">
								<th class="text-left"><input type="checkbox" name="yqsbjdck"></th>
								<th class="text-left">设备名称</th>
								<th class="text-left">规格型号</th>
								<th class="text-left">准确度等级</th>
								<th class="text-left">分辨力</th>
								<th class="text-left">生产厂商</th>
								<th class="text-left">检定机构</th>
								<th class="text-left">检定日期</th>
								<th class="text-left">下次检定日期</th>
								<th class="text-left">检定计划状态</th>
								<%--<th class="text-left">保养频次</th>
								<th class="text-left">维护日期</th>
								<th class="text-left">下次维护日期</th>
								<th class="text-left">核查频次</th>
								<th class="text-left">核查日期</th>--%>
							</tr>
							</thead>
						</table>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/jdwhhcsp/yqsbjdjh.js"></script>
<script type="text/javascript">
	$(function () {
        yqyysyListyqsbjdsp.setPath("<%=request.getContextPath()%>")
        yqyysyListyqsbjdsp.init("<%=uuid%>")
    })
</script>



