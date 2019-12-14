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
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="height: 20px;margin: 0 0 15px;">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="padding-bottom: 10px;">
								<form id="bgbz_condition"<%-- style="position: relative;display: inline-block;left: 400px;bottom: 5px"--%>>
									<div style="clear:both;overflow: hidden;margin: 5px auto;">
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
											<input type="text" name="ypmc" class="appsysinfo-m inputCommon" name="htmc"  placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
										</div>
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">样品编码</label>
											<input type="text" name="ypbm" class="appsysinfo-m inputCommon" id="ypbm"  placeholder="请输入样品编码" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
										</div>
									</div>
								</form>
								<div style="float: right;width:100%;">
									<div class="col-md-6b " style="padding: 0;display:none">
										<button id="<%=uuid%>btn_ypjc" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">
											报告审核
										</button>
										<button style="margin-left: 10px" id="<%=uuid%>btn_sjjy" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">
											报告批准
										</button>
										<button style="margin-left: 10px" id="<%=uuid%>btn_sjsc" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">
											报告打印
										</button>
									</div>
									<div class="col-md-6b " style="padding: 0">
										<button style="display: none" id="<%=uuid%>btn_sjjy_th" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">
											退回
										</button>
										<button  id="dayinWtbg" style="display: none" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>生成报告
										</button>
										<button id="<%=uuid%>btn_sjjy_tg" style="display: none" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>提交
										</button>
										<button  id="searchTerm1" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-search iconMr"></i>查询
										</button>
										<button  id="kehuqz" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>客户签字
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
							<th class="text-left" width="20px"><input type="checkbox" name="rwfp_checkbox"/></th>
							<th class="text-left">操作</th>
							<%--	<th class="text-left">合同名称</th>--%>
							<th class="text-left">样品编号</th>
							<th class="text-left">样品名称</th>
							<th class="text-left">检测项目名称</th>
							<%--<th class="text-left">数据出具日期</th>--%>
							<th class="text-left">委托单位名称</th>
							<th class="text-left">委托单位所属省</th>
							<th class="text-left">所属市</th>
							<th class="text-left">所属县</th>
							<th class="text-left">报告编制</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/bggl/bglq/list.js" type="text/javascript"></script>
<script>
    $(function() {
        bglqlist.setPath("<%= request.getContextPath()%>");
        bglqlist.init('<%=uuid%>');

    });
</script>
