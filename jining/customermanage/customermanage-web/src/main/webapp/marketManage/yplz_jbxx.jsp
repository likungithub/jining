<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String wtid = request.getParameter("wtid");
    UUID uuid = UUID.randomUUID();
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/marketManage//table.css" />
<div id="yplz_jbxx<%=uuid%>">

	<form id="add_form" method="post" style="width: 100%;overflow:hidden;" action="">
		<table class="gridpt" style="table-layout: fixed;">
			<tbody>
				<tr>
					<th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">样品接收基本信息
					</th>
				</tr>
				<tr class="gridpt">
					<th class="gridpt_bg">合同名称&nbsp;&nbsp;<em>*</em></th>
					<td>
					</td>
					<th class="gridpt_bg">合同类型缩写 </th>
					<td>
					</td>
					<th class="gridpt_bg">预受理编号</th>
					<td>
					</td>
			</tbody>
		</table>
		<table class="gridpt" style="table-layout: fixed">
			<thead>
				<tr>
					<th colspan="6">样品接收查询</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>样品编号</th>
					<td>
						<input id="yplz_ypbh" name="ypbm">
					</td>
					<th>样品名称</th>
					<td>
						<input id="yplz_ypmc" name="ypmc">
					</td>
					
					<!-- <th>抽样单编号</th>
					<td>
						<input id="yplz_cydbh" name="cydbh">
					</td> -->
				</tr>
			</tbody>
		</table>
		<!--按钮  begin-->
		<div style="clear: both;padding:5px;">
			<button type="button" id="yplzjbxxSearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
			<button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
			<button type="button" id="btn_ryxz<%=uuid%>" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">提交</button>
			<!-- <button id="saveZFWT" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button> -->
		</div>
	</form>
	<div class="dataTables_wrapper no-footer">
		<table class="table table-striped table-bordered table-hover" id="list_data" name="yplz-table" style="width:100% !important;margin-top: 15px!important">
			<thead>
				<tr>
					<th field="ck" class="text-left" width="20px"><input type="checkbox" class="check-all-td" /></th>
					<th>操作</th>
					<th>状态</th>
					<th>样品编号</th>
					<th>样品名称</th>
					<th>产品大类</th>
					<th>样品来源</th>
					<th>应出报告日期</th>
					<th>加测类别代码</th>
					<th>备注信息</th>
				</tr>
			</thead>
		</table>
	</div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/yplz_jbxx.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {

		yplzjbxx.setPath('<%=request.getContextPath()%>');
		yplzjbxx.init('<%=id%>', '<%=uuid%>','<%=wtid%>');

	});
</script>