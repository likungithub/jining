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
	<form action="#" class="form form-horizontal" id="bgfpry_form">
		<div class="modal fade" id="bgfpmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:500px">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">报告分配</h4>
					</div>
					<div class="form-body">
						<div class="row" id="bgzjsp">
							<label class="labelCommon labelWidth-col-two color666" ><span class="required"> * </span>主检审批</label>
							<select class="inputCommon inputWidth-col-two"  name="bgfp_bgbz" id="bgfp_bgbz">
							</select>
						</div>
						<br/>
						<input name="bgfp_bgsh" id="bgfp_bgsh" value="KJ1000000062" type="hidden">
						<%--<div class="row">
							<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>报告审核</label>
							<select class="inputCommon inputWidth-col-two"  name="bgfp_bgsh" id="bgfp_bgsh">
							</select>
						</div>--%>
						<br/>
						<div class="row">
							<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>报告批准</label>
							<select class="inputCommon inputWidth-col-two"  name="bgfp_bgpz" id="bgfp_bgpz">
								<%--<option value="">下拉选择人员</option>--%>
								<%--<option value="KJ0000000041">周中华</option>--%>
								<%--<option value="KJ0000000008">李茂峰</option>--%>
							</select>
						</div>
						<br/>
						<div class="row" style="display: none">
							<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>报告打印</label>
							<select class="inputCommon inputWidth-col-two"  name="bgfp_bgdy" id="bgfp_bgdy">
							</select>
						</div>
					</div>

					<div class="modal-footer">
						<button type="button" class="btn btn-default " data-dismiss="modal" id="<%=uuid%>bgfp_close">关闭
						</button>
						<button type="button" class="btn btn-primary " id="<%=uuid%>bgfp_manage" >
							提交
						</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
	</form>
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="height: 33px;margin: 0 0 15px;">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="padding-bottom: 10px;">
								<div style="float: right;width:100%;">

									<div class="col-md-6b " style="padding: 0">
										<div style="clear:both;overflow: hidden;margin: 5px auto;">
											<div class="openMore pull-left" style="margin-bottom: 0px;">
												<div class="date beginTime pull-left"
													 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
													<label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
													<input type="text" class="appsysinfo-m inputCommon" id="ypmc" name="ypmc"  placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
												</div>

												<div class="date beginTime pull-left"
													 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
													<label class="labelCommon labelBg color666 dateLabel-m">样品编码</label>
													<input type="text" class="appsysinfo-m inputCommon" id="ypbm" name="ypbm"  placeholder="请输入样品编码" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
												</div>

												<%--<div class="input-group  search-label-small pull-left"
													 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
													<label class="labelCommon labelBg color666 dateLabel-m">产品种类</label>
													<select name="ifsgr" class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
														<option value="">是否蔬/果/肉</option>
														<option value="1">是</option>
														<option value="0">否</option>
													</select>
												</div>--%>

											</div>
										</div>
										<button  id="<%=uuid%>btn_bgfp" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>
											报告分配
										</button>
										<button style="display: none" id="<%=uuid%>btn_bgbz" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>
											报告编制
										</button>
										<button style="margin-left: 10px;display: none" id="<%=uuid%>btn_ypjc" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>
											报告审核
										</button>
										<button style="margin-left: 10px;display: none" id="<%=uuid%>btn_sjjy" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>
											报告批准
										</button>
										<button style="margin-left: 10px;display: none" id="<%=uuid%>btn_sjsc" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>
											报告打印
										</button>
										<button type="button"  id="searchTerm-m"class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-search iconMr"></i>
											查&nbsp;询&nbsp;</button>
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
							<th width="5%"class="text-left"><input type="checkbox" name="rwfp_checkbox"/>
							</th>
							<th width="5%" class="text-center">操作</th>
							<%--<th class="text-left">合同名称</th>--%>
							<th class="text-left">样品编号</th>
							<th class="text-left">样品名称</th>
							<th class="text-left">检测项目名称</th>
							<th class="text-left">委托单位名称</th>
							<th class="text-left">所属省</th>
							<th class="text-left">所属市</th>
							<th class="text-left">所属县</th>
							<%--<th class="text-left">报告编制</th>--%>
							<th class="text-left">主检审批</th>
							<th class="text-left">报告审核</th>
							<th class="text-left">报告批准</th>
							<%--<th class="text-left">报告打印</th>--%>

						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/bggl/bgfp/list.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        list.setPath("<%= request.getContextPath()%>");
        list.init('<%=uuid%>');
    });
</script>