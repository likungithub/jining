<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    UUID uuid = UUID.randomUUID(); 
%>
<style>
	.search-input-small {
		width: auto !important;
	}
	
	.btnwhite {
		background-color: #fff;
		border: 1px solid #dedede;
		border-radius: 3px;
	}
	
	.btnBorderColor {
		color: #10a0f7;
		border: 1px solid #10a0f7;
	}
	
	#htshDIV1 .rotate1 {
		transform: rotate(180deg);
	}
	/* 总计样式 */
	
	.total-tfoot th {
		font-weight: normal!important;
		font-size: 12px!important;
		overflow: hidden!important;
		text-overflow: ellipsis!important;
		white-space: nowrap!important;
		padding-right: 8px!important;
		padding-left: 8px!important;
	}
	
	#list_data_wrapper {
		overflow-x: auto;
	}
	
	#list_data_wrapper .table {
		width: auto !important;
	}
	
	#list_data_wrapper .table th {
		white-space: nowrap;
	}
</style>
<div class="" id="ypjshygl">
	<div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
		<div class="portlet light bordered" style="padding: 8px">
			<div class="portlet-body" style="margin-top: 0;padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;">
								<div style="clear:both;overflow: hidden;">
								<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">还样人</label>
										<input type="text" class="inputCommon appsysinfo-m" id="hyry" name="hyry" placeholder="请输入还样人" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">委托合同名称</label>
										<input type="text" class="inputCommon appsysinfo-m" id="htmc" name="htmc" placeholder="请输入委托合同名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
										<input type="text" class="inputCommon appsysinfo-m" id="ypmc" name="ypmc" placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<%--<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">还样时间周期</label>
										<input type="text" class="inputCommon appsysinfo-m" name="htmc" placeholder="请输入样品保存周期" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>--%>
								</div>
<br>
								<!--按钮  begin-->
								<div style="clear: both;">
									<button id="hyglSearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="hyglreset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button id="hyglhyglUpdate" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>还样</button>
									<button  id="btn_khqz" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
										<i class="fa fa-plus iconMr"></i>客户签字
									</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<form id="hygl_form">
					<table class="table table-striped table-bordered table-hover" id="hygl_table" name="hygl-table" style="width:100%;margin-top: 15px!important">
						<thead>
							<tr>
							    <th field="ck" class="text-left" width="20px"><input type="checkbox" class="check-all-td"/></th>
							    <th>委托单号</th>
								<th>合同名称</th>
								<th>样品编号</th>
								<th>样品名称</th>
								<th>退样数量</th>
								<th>样品状态</th>
								<th>还样人员</th>
								<th>还样时间</th>
							</tr>
						</thead>
					</table>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/hygl/hygl.js"></script>
<%-- <script src="<%= request.getContextPath()%>/assets/pages/scripts//marketManage/ypcb.js" type="text/javascript"></script> 
<script type="text/javascript">
	$(function() {
		ypJsList1.setPath("<%= request.getContextPath()%>");
		ypJsList1.init("<%=uuid %>");
	});
</script> --%>