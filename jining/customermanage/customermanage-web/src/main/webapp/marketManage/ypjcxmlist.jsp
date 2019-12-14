<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    UUID uuid = UUID.randomUUID();
    String ypid = request.getParameter("ypid");
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
	
	.selectClass {
		width: 140px;
		height: 33px;
	}
</style>
<div class="" id="jcxm<%=uuid %>">
	<div class="col-md-12" style="padding-left: 6px;padding-right: 6px;">
		<div class="portlet light bordered" style="padding: 8px">
			<div class="portlet-body" style="margin-top: 0;padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;">
								<div style="clear:both;overflow: hidden;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">产品大类</label>
										<input type="text" class="appsysinfo-m inputCommon" name="jcxmmc" placeholder="请输入检测项目名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>

									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">产品大类</label>
										<input type="text" class="inputCommon appsysinfo-m" id="cpdl<%=uuid %>" name="cpdl" placeholder="请输入样品大类" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>

									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">亚类</label>
										<select name="YL" class="selectClass" id="yl<%=uuid %>">
											<option></option>
										</select>
									</div>

									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">次亚类</label>
										<select name="CYL" class="selectClass" id="cyl<%=uuid %>">
											<option></option>
										</select>
									</div>

									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">次亚类</label>
										<select name="XL" class="selectClass" id="xl<%=uuid %>">
											<option></option>
										</select>
									</div>
								</div>
								<!--按钮  begin-->
								<div style="clear: both;padding-top:5px;">
									<button id="jcxmSearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<%--<button id="addQYWT" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>--%>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-bordered table-hover" id="jcxmlist_data" style="width:100%;margin-top: 15px!important">
						<thead>
							<tr>
								<th width="2%" style="padding-left: 6px" class="text-left"><input type="checkbox" name="selectjcxmlist" />
									<th width="10%">操作</th>
									<th width="10%">检测项目名称</th>
									<th width="7%">产品大类名称</th>
									<th width="8%">亚类</th>
									<th width="8%">次亚类</th>
									<th width="8%">细类</th>
									<th width="13%">检测方法</th>
							</tr>
						</thead>
					</table>
				</div>
				<div style="clear: both;padding:5px;">
					<button id="saveYpJcxm" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>保存</button>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/ypjcxmlist.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {
		jcxmlist.setPath("<%= request.getContextPath()%>");
		jcxmlist.init('<%=uuid %>', '<%=ypid%>');
	});
</script>