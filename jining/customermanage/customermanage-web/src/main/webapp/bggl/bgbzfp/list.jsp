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

								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>报告编制</button>
									<button  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>报告审核</button>
									<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>报告批准</button>
									<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>报告打印</button>
									<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>报告交付</button>

								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="<%=uuid%>ManagerList_m" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left">名称</th>
							<th class="text-left">版本</th>
							<th class="text-left">修改人</th>
							<th class="text-left">修改时间</th>
							<th class="text-left">说明</th>
							<th width="150px" class="text-center">操作</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td class="text-left">名称</td>
							<td class="text-left">版本</td>
							<td class="text-left">修改人</td>
							<td class="text-left">修改时间</td>
							<td class="text-left">说明</td>
							<td width="150px" class="text-center">
								<a href="#">编辑</a>
								<a href="#">删除</a>
							</td>
						</tr>
						<tr>
							<td class="text-left">名称</td>
							<td class="text-left">版本</td>
							<td class="text-left">修改人</td>
							<td class="text-left">修改时间</td>
							<td class="text-left">说明</td>
							<td width="150px" class="text-center">
								<a href="#">编辑</a>
								<a href="#">删除</a>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>