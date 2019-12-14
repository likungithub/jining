<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
String dljgbm = request.getParameter("dljgbm");
UUID uuid = UUID.randomUUID();
%>
<style>
	#page-container #chargeaudit_data_info{
		height:30px !important;
		line-height:20px !important;
	}
	.number{
	   color: red;
	   font-size: 14px !important;
	}
</style>
<div class="row" id="agentstatistics_kh_id_div_<%=uuid %>">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-body">
				<div class="table-toolbar">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body ml">
							</div>
						</div>		
					</div>
				</div>	
			<div class="dataTables_wrapper no-footer">
				<table class="table table-striped table-bordered table-hover"
						   id="agentstatistics_kh_data">
						<thead>
						<tr>
						    <!-- <th width="15%">客户编码</th> -->
						    <th width="25%" class="text-left">公司名称</th>
						    <th width="20%" class="text-center">APP登录账号</th>
							<th width="20%" class="text-center">成立日期</th>
							<th width="10%" class="text-center">关联状态</th>
							<th width="10%" class="text-center">服务状态</th>
							<th width="15%" class="text-center">操作</th>
						</tr>
						</thead>
					</table>
			</div>
		</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/agentstatistics/khlist.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		agentkhlist.setPath("<%= request.getContextPath()%>");
		agentkhlist.init("<%=uuid %>","<%=dljgbm %>");
	});
</script>