<%@page import="java.util.UUID"%>
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
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
								<input type="text" value="" name="hclx" style="display: none">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">条码扫描</label>
										<input type="text" class="inputCommon appsysinfo-m" id="hcbm" name="hcbm" placeholder="请将光标移动到此处" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
								</div>
								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="cgrkReast"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="ManagerList_cgrklist" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left">耗材名称</th>
							<th class="text-left">规格</th>
							<th class="text-left">级别</th>
							<th class="text-left">数量</th>
							<th class="text-left">单价</th>
							<th class="text-left">总价</th>
							<th class="text-left">品牌</th>
							<th class="text-left">采购目的</th>
							<th class="text-left">耗材类型</th>
							<th class="text-left">备注</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/cgrk/cgrk.js"></script>
<script language="javascript" type="text/javascript">
    cgrkList.setPath("<%=request.getContextPath()%>");
    cgrkList.inint("<%=uuid%>");
</script>
