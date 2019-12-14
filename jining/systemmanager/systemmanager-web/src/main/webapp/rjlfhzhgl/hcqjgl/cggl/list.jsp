<%@page import="java.util.UUID"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
	.rotate1 {
		transform: rotate(180deg);
	}
	th,td { white-space: nowrap; }
	.dataTables_scrollHead {
		height: 40px;
	}
</style>
<%
	String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>cgsq-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 0px;margin-bottom: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<form id="findByName">
										<input type="text" value="" name="hclx" style="display: none">
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">耗材名称</label>
											<input type="text" class="inputCommon appsysinfo-m" id="hcmc" name="hcmc" placeholder="请输入耗材名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
										</div>
										<div class="input-group  search-label-small pull-left"
											 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">编制状态</label>
											<select id="bzzt"  class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
												<option value="">下拉选择编制状态</option>
												<option value="001">编制中</option>
												<option value="002">编制通过</option>
												<option value="003">编制未通过</option>
											</select>
										</div>
										<div class="input-group  search-label-small pull-left"
											 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">申请状态</label>
											<select id="sqzt"  class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
												<option value="">下拉选择申请状态</option>
												<option value="001">申请中</option>
												<option value="002">申请通过</option>
												<option value="003">申请未通过</option>
											</select>
										</div>
										<div class="openMore pull-left" style="margin-bottom: 0px;">
											<div class="date beginTime pull-left">
												<label class="labelCommon labelBg color666 dateLabel-m"
													   style="width: 80px !important;">申请日期</label>
												<input type="text" class="appsysinfo-m inputCommon " id="cgglStartDate"
													   name="cgglStartDate" style="border-radius: 0 !important; width: 100px">
												<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button"
													style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
											</div>
											<span style="float: left;margin: 5px">至</span>
											<div class="input-group date endTime pull-left">
												<input type="text" class="inputCommon appsysinfo-m" id="cgglEndDate"
													   name="cgglEndDate"
													   style="border-radius: 4px 0 0 4px!important;width: 100px">
												<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button"
												style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
											</div>
										</div>
									</form>
								</div>
								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="cgglPass"class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>通过</button>
									<button id="cgglBack" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>退回</button>
									<button id="cgglExport"class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>打印数据</button>
									<button id="cgglAlertPrice" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>修改信息</button>
									<button id="cgglSeach"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="cgglReast"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<form id="form_cggl">
					<div class="dataTables_wrapper no-footer">
						<table class="table table-striped table-hover paramsTab" id="ManagerList_cggllist" style="width: 130%">
							<thead>
							<tr class="color333">
								<th width="10px">
									<input type="checkbox" name="ckcggl">
								</th>
								<th class="text-center">耗材名称</th>
								<th class="text-center">规格</th>
								<th class="text-center">级别</th>
								<th class="text-center">数量</th>
								<th class="text-center">单价</th>
								<th class="text-center">总价</th>
								<th class="text-center">品牌</th>
								<th class="text-center">采购目的</th>
								<th class="text-center">耗材类型</th>
								<th class="text-center">编制状态</th>
								<th class="text-center">申请状态</th>
								<th class="text-center">申请人</th>
								<th class="text-center">申请日期</th>
								<th class="text-center">备注</th>
							</tr>
							</thead>
						</table>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<script type="application/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/cggl/cggl.js"></script>
<script type="application/javascript">
    cgglList.setPath("<%=request.getContextPath()%>");
    cgglList.inint("<%=uuid%>");
</script>

