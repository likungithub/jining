<%@page import="java.util.UUID"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
	.rotate1 {
		transform: rotate(180deg);
	}
</style>
<%
	String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="yqsbcgsp-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

										<label class="labelCommon labelBg color666 dateLabel-m">采购名称</label>
										<input type="text" class="inputCommon appsysinfo-m" id="cgmc" name="cgmc" placeholder="请输入仪器名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<%--<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

										<label class="labelCommon labelBg color666 dateLabel-m">仪器种类</label>
										<select id="selectType2" style="width:140px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
								    border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
								    border-bottom-right-radius: 4px !important;">
											<option value="000">请选择仪器种类</option>

										</select>

									</div>--%>
								</div>
								<div style="clear:both;overflow: hidden;margin-top: 5px;">

								</div>

								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="seatchyqcgsp" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="resetyqcgsp" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button id="spyqsp123" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>审批</button>
									<button id="thyqsp123" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>退回</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<form id="yqsbcgsp_form12">
					<table class="table table-striped table-hover paramsTab" id="ManagerList_yqsbcgsp" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left"><input type="checkbox" name="ckq"></th>
							<th class="text-left">采购名称</th>
							<th class="text-left">品牌</th>
							<th class="text-left">数量</th>
							<th class="text-left">报价</th>
							<th class="text-left">种类</th>
							<th class="text-left">型号</th>
							<th class="text-left">申请人</th>
							<th class="text-left">申请部门</th>
							<th class="text-left">申请日期</th>
							<th class="text-left">申请状态</th>
							<th class="text-left">用途</th>
							<th class="text-left">备注信息</th>
						</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/yqsqsp/yqsqsp.js"></script>
<%--
<script type="text/javascript">
    $(function() {
        yqyysyList1yqsbcg.setPath("<%= request.getContextPath()%>");
        yqyysyList1yqsbcg.init('<%=uuid%>');
    });
</script>--%>
