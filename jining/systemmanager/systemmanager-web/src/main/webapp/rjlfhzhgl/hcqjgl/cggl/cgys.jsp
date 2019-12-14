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
<div class="row contentBgColor" id="<%=uuid%>cgys-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 0px;margin-bottom: 10px;">
								<input type="text" value=""  name="hclx" style="display: none">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<form id="findByName">
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">耗材名称</label>
											<input type="text" class="inputCommon appsysinfo-m" id="hcmc" name="hcmc" placeholder="请输入耗材名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
										</div>
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">耗材名称</label>
											<select id="yszt" name="yszt" class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
												<option value="">请选择验收状态</option>
												<option value="001">未验收</option>
												<option value="002">已验收</option>
											</select>
										</div>
									</form>
								</div>
								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="cgys_ys" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>验收通过</button>
									<button id="cgys_barCode" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>条码打印</button>
									<button id="cgys_sysysjl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>实验室验收记录</button>
									<button id="cgys_gtsj" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>固体试剂验收记录</button>
									<button id="cgys_wjyt" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>无机液体试剂验收记录</button>
									<button id="cgys_yjsj" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>有机试剂验收记录</button>
									<button id="cgys_Seach"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="cgys_Reast"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<form id="form_cgglsp">
					<div class="dataTables_wrapper no-footer">
						<table class="table table-striped table-hover paramsTab" id="ManagerList_cgyslist" width="100%">
							<thead>
							<tr class="color333">
								<th width="10px">
									<input type="checkbox" name="cgys">
								</th>
								<th class="text-left">耗材名称</th>
								<th class="text-left">规格</th>
								<th class="text-left">级别</th>
								<th class="text-left">数量</th>
								<th class="text-left">单价</th>
								<th class="text-left">总价</th>
								<th class="text-left">品牌</th>
								<th class="text-left">采购目的</th>
								<th class="text-left">申请人</th>
								<th class="text-left">申请日期</th>
								<th class="text-left">审批人</th>
								<th class="text-left">审批日期</th>
								<th class="text-left">申请状态</th>
								<th class="text-left">验收状态</th>
								<th class="text-left">耗材类型</th>
								<th class="text-left">备注</th>
							</tr>
							</thead>
						</table>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<script  type="application/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/cggl/cgys.js"></script>
<script>
	cgysList.setPath("<%=request.getContextPath()%>");
	cgysList.inint("<%=uuid%>");
</script>

