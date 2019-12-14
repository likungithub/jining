<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
 .rotate1 {
		transform: rotate(180deg);
	}
 @media (min-width: 992px) {
	 .modal-lg {
		 width: 1200px;
	 }
 }
	 .modal-lg {
		 width: 1200px;
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
								<div style="float: right;width:100%;">
									<div style="margin-left: 10px;clear:both;overflow: hidden;">
										<div class="input-group  search-label-small pull-left"
											 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">样品编号</label>
											<input type="text" class="inputCommon appsysinfo-m" name="ypbm" id="ypbm"
												   placeholder="请输入样品编号"
												   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
										</div>
										<div class="input-group  search-label-small pull-left"
											 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
											<input type="text" class="inputCommon appsysinfo-m" name="ypmc" id="ypmc"
												   placeholder="请输入样品名称"
												   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
										</div>

										<div class="input-group  search-label-small pull-left"
											 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">检测项目</label>
											<input type="text" class="inputCommon appsysinfo-m" name="jcxmc" id="jcxmc"
												   placeholder="请输入检测项目名称"
												   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
										</div>
										<div class="input-group  search-label-small pull-left"
											 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">样品状态</label>
											<select class="form-control" id="ypjczt" name="ypjczt" style="width: 214px">
												<option value="">请选择</option>
												<option value="000">退回</option>
												<option value="001">检测中</option>
												<option value="002">检测完成</option>
											</select>
										</div>
									</div>
									<br>
										<button  style="margin-left: 10px" id="<%=uuid%>btn_ypjc_tg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>提交
										</button>
										<button  style="margin-left: 10px" id="<%=uuid%>btn_ypjc_lrjcz" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>录入检测值
										</button>
										<button  style="margin-left: 10px" id="searchTerm-m" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-search iconMr"></i>查询
										</button>
										<button  style="margin-left: 10px" id="searchTerm-reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-refresh iconMr"></i>重置
										</button>
										<button  style="margin-left: 10px" id="<%=uuid%>dyysjl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>打印原始记录
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="ManagerList_ypjc" width="100%">
						<thead>
						<tr class="color333">
							<th width="20px" class="text-left"><input type="checkbox" name="rwfp_checkbox"/></th>
							<th width="50px" class="text-center">操作</th>
							<th class="text-center">样品名称</th>
							<th class="text-center">样品编号</th>
							<th class="text-center">检测项目名称</th>
							<th class="text-center">委托单编号</th>
							<th class="text-center">样品等级</th>
							<%--<th class="text-center">批次</th>--%>
							<th class="text-center">规格型号</th>
							<th class="text-center">执行标准</th>
							<th class="text-center">检测领样时间</th>
							<%--<th class="text-center">食品水工业产品</th>--%>
							<%--<th class="text-center">领样人员</th>
							<th class="text-center">领样时间</th>--%>
							<%--<th class="text-center">制备类型</th>--%>
							<th class="ttext-center">状态</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/jcgl/ypjc/list.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        list.setPath("<%= request.getContextPath()%>");
        list.init('<%=uuid%>',"<%=jclbdm%>");
    });
</script>