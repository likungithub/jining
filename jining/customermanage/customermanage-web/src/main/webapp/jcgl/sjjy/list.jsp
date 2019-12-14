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
String jclbdm = request.getParameter("jclbdm");
if(jclbdm==null){
		jclbdm = "";
}
	String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="height: 33px;margin: 0 0 15px;">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="padding-bottom: 10px;">
								<div style="margin-left: 10px;clear:both;overflow: hidden;">
									<div class="input-group  search-label-small pull-left"
										 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
										<input type="text" class="inputCommon appsysinfo-m" name="ypmc" id="ypmc"
											   placeholder="请输入样品名称"
											   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
									</div>
									<div class="input-group  search-label-small pull-left"
											   style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
									<label class="labelCommon labelBg color666 dateLabel-m">样品编号</label>
									<input type="text" class="inputCommon appsysinfo-m" name="ypbm" id="ypbm"
										   placeholder="请输入样品编号"
										   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
								   </div>
								</div>
								<br>
								<div>
									<%--<div class="col-md-6b " style="padding: 0">--%>
									<button style="margin-left: 10px" id="<%=uuid%>btn_sjjy_tg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
										<i class="fa fa-plus iconMr"></i>通过
									</button>
									<button id="searchTerm-b"
											class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
										<i class="fa fa-search iconMr"></i>查询
									</button>
									<button  id="cz" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
										<i class="fa fa-refresh iconMr"></i>重置
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="dataTables_wrapper no-footer">
				<table class="table table-striped table-hover paramsTab" id="<%=uuid%>ManagerList_m" width="100%">
					<thead>
					<tr class="color333">
						<th width="20px" class="text-left"><input type="checkbox" name="rwfp_checkbox"/></th>
						<th width="50px" class="text-center" >操作</th>
						<th class="text-center">样品编号</th>
						<th class="text-center">样品名称</th>
						<th class="text-center">食品水工业产品</th>
						<th class="text-center">检测项目名称</th>
						<th class="text-center">委托单位名称</th>
						<th class="text-center">委托单位所属省</th>
						<th class="text-center">所属市</th>
						<th class="text-center">所属县</th>
						<th class="text-center">状态</th>

					</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/jcgl/sjjy/list.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        list.setPath("<%= request.getContextPath()%>");
        list.init('<%=uuid%>','<%=jclbdm%>');
    });
</script>