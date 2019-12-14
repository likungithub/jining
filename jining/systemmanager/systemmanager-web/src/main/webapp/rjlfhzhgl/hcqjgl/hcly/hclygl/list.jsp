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
										<label class="labelCommon labelBg color666 dateLabel-m">耗材名称</label>
										<input type="text" class="inputCommon appsysinfo-m" name="hcmc" placeholder="请输入耗材名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">耗材类型</label>
										<select name="hclx"  class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
											<option value="">下拉选择耗材类型</option>
											<option value="1">一般耗材</option>
											<option value="2">化学品</option>
											<option value="3">易制毒</option>
											<option value="4">易制爆</option>
										</select>
									</div>
									<div class="openMore pull-left" style="margin-bottom: 0px;">
										<div class="date beginTime pull-left">
											<label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">领用日期</label>
											<input type="text" readonly="" class="appsysinfo-m inputCommon " id="startDate" style="border-radius: 0 !important; width: 100px">
											<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
										</div>
										<span style="float: left;margin: 5px">至</span>
										<div class="input-group date endTime pull-left">
											<input type="text" readonly="" class="inputCommon appsysinfo-m" id="endDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
											<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
										</div>
										<div style="clear: both"></div>
									</div>
								</div>
								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="lyglReport"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>领用记录</button>
									<button id="lyglDel"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-remove iconMr"></i>批量删除</button>
									<button id="lyglSeach"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="lyglReast"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="ManagerList" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left" width="20px"><input type="checkbox" name="check1"></th>
							<th class="text-center">耗材名称</th>
							<th class="text-center">规格</th>
							<th class="text-center">级别</th>
							<th class="text-center">品牌</th>
							<th class="text-center">库存数量</th>
							<th class="text-center">领用数量</th>
							<th class="text-center">领用人</th>
							<th class="text-center">领用日期</th>
							<th class="text-center">耗材类型</th>
						<%--	<th class="text-left">领用申请状态</th>--%>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/hcly/hclygl/hclygl.js"></script>
<script language="javascript" type="text/javascript">
    hclyglList.setPath("<%=request.getContextPath()%>");
    hclyglList.inint("<%=uuid%>");
</script>
