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
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">委托编号</label>
										<input type="text" class="inputCommon appsysinfo-m"  id="wtid" placeholder="请输入委托编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">产品名称</label>
										<input type="text" class="inputCommon appsysinfo-m"  id="ypmc" placeholder="请输入产品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="openMore pull-left" style="margin-bottom: 0px;">
										<div class="date beginTime pull-left">
											<label class="labelCommon labelBg color666 dateLabel-m"
												   style="width: 80px !important;">报告发放日期</label>
											<input type="text" class="appsysinfo-m inputCommon " id="date1"
												   name="date1" style="border-radius: 0 !important; width: 100px">
											<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button"
													style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
										</div>
										<span style="float: left;margin: 5px">至</span>
										<div class="input-group date endTime pull-left">
											<input type="text" class="inputCommon appsysinfo-m" id="date2"
												   name="date2"
												   style="border-radius: 4px 0 0 4px!important;width: 100px">
											<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button"
												style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
										</div>
										<div style="clear: both"></div>
									</div>
								</div>
								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="bgfftj_ff" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>报告发放</button>
									<button id="bgfftj_bg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>领用记录报告</button>
									<button id="bgfftj_cx" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="bgfftj_cz" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<form id="form_bgfftj">
					<div class="dataTables_wrapper no-footer">
						<table class="table table-striped table-hover paramsTab" id="bgfftj_ManagerList_m" width="100%">
							<thead>
							<tr class="color333">
								<th class="text-left" width="20px"><input type="checkbox" name="rwfp_checkbox"/>
								</th>
								<th class="text-left">委托编号</th>
								<th class="text-left">委托企业</th>
								<th class="text-left">产品名称</th>
								<th class="text-left">发放日期</th>
								<th class="text-left">报告发放状态</th>
								<th class="text-left">备注</th>
							</tr>
							</thead>
						</table>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/tjcx/bgfftj.js" type="application/javascript"></script>
<script type="application/javascript">
    bgfftjList.setPath("<%=request.getContextPath()%>");
    bgfftjList.init("<%=uuid%>");
</script>
