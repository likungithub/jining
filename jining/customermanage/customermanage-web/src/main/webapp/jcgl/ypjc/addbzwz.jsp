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
String jcxmid = request.getParameter("jcxmid");
if (jcxmid == null) {
	jcxmid = "";
}
String mbzwz = request.getParameter("mbzwz");
if (mbzwz == null) {
    mbzwz = "";
}

	String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 0px;margin-bottom: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<input type="text" value="5" name="hclx" style="display: none">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">耗材名称</label>
										<input type="text" class="inputCommon appsysinfo-m" id="hcmc" name="hcmc" placeholder="请输入采购名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<button id="bzwzSeach"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
								</div>
								<!--按钮  begin-->
								<!-- <div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
								
								
								</div> -->
								<!--按钮  end-->
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left:1px;margin-bottom: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:700px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">已选</label>
										<div class="inputCommon appsysinfo-m" id="add_bzwz"  style="outline:none;border: 0;text-indent:0px !important;width:604px !important;font-size:12px !important; line-height: 30px" ></div>
									</div>

								</div>


							</div>
						</div>
					</div>
				</div>

 				<form id="addYpjc_form_choose">
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="addbzwz_ManagerList" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left" width="10px"><input type="checkbox" name="kcglCheck" disabled></th>
							
							<th class="text-left">耗材名称</th>
							<th class="text-left">规格</th>
							<th class="text-left">级别</th>
						
							<th class="text-left">耗材类型</th>
						</tr>
						</thead>
					</table>
				</div>

				</form>
			</div>
		</div>
	</div>
</div>

<script type="application/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/jcgl/ypjc/addbzwz.js"></script>
<script type="application/javascript">
			<%--addbzwzList.init("<%=jcxmid%>","<%=uuid%>","<%=mbzwz%>");--%>
            addbzwzList.init("<%=jcxmid%>","<%=uuid%>",jcxxlr.getBzwz());
			 console.log("标准物质="+jcxxlr.getBzwz());
</script>