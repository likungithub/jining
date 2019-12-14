<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<%
	String uuid = UUID.randomUUID().toString();
	String loginuser = CurrentLoginUser.getUser().getZydm();
%>
<style>
 .rotate1 {
		transform: rotate(180deg);
	}
 #<%=uuid%>ManagerList_m_wrapper .table th {
	 white-space: nowrap;
 }
</style>
<script language=javascript src='<%=request.getContextPath()%>/assets/pages/scripts/tanchaungjs/tanchuang.js'></script>
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="height: 33px;margin: 0 0 15px;">
					<div class="row">
						<div class="input-group  search-label-small pull-left"
							 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
							<label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
							<input type="text" class="inputCommon appsysinfo-m" id="ypmc"
								   placeholder="请输入样品名称"
								   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
						</div>
						<div class="input-group  search-label-small pull-left"
							 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
							<label class="labelCommon labelBg color666 dateLabel-m">任务状态</label>
							<select class="form-control" id="rwzt" style="width: auto">
								<option value="004">请选择</option>
								<option value="002">未分配</option>
								<option value="003">已分配</option>
								<option value="001">已完成</option>
							</select>
						</div>
					</div>
					<br>
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="padding-bottom: 10px;">
								<div style="float: right;width:100%;">

									<div class="col-md-6b " style="padding: 0">
									<button id="<%=uuid%>btn_rwfp" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											任务分配
										</button>

										<button id="<%=uuid%>btn_jdzy" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											就地制样
										</button>

										<button id="<%=uuid%>btn_rwsc" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											任务撤回
										</button>
										<button id="searchTerm-m<%=uuid%>"
												class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-search iconMr"></i>查询
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
							<th class="text-left"><input type="checkbox" name="cyrw_checkbox"/>
							</th>
							<th width="150px" class="text-center">操作</th>
							<th class="text-left">委托单位名称</th>
							<th class="text-left">委托类型</th>
							<th class="text-left">任务状态</th>
							<%--<th class="text-left">合同名称</th>--%>
							<th class="text-left">规格型号</th>
							<th class="text-left">样品等级</th>
						<%--	<th class="text-left">生产地址</th>--%>
						<%--	<th class="text-left">检验类别</th>--%>
							<th class="text-left">样品数量</th>
							<%--<th class="text-left">生产日期</th>--%>
							<th class="text-left">样品编码</th>
							<th class="text-left">保质期</th>
							<%--<th class="text-left">包装</th>--%>
							<th class="text-left">样品状态</th>
							<th class="text-left">样品保存条件</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/xmgl/cyrwList.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        cyrwList.setPath("<%= request.getContextPath()%>");
        cyrwList.init('<%=uuid%>');
        cyrwList.setZydm("<%=loginuser%>");
    });
</script>