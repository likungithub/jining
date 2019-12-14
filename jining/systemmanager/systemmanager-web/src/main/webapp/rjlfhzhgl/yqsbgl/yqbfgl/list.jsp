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

										<label class="labelCommon labelBg color666 dateLabel-m">仪器名称</label>
										<input type="text" class="inputCommon appsysinfo-m" name="wtdwmc" placeholder="请输入仪器名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

										<label class="labelCommon labelBg color666 dateLabel-m">仪器种类</label>
										<select id="selectType2" style="width:140px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
								    border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
								    border-bottom-right-radius: 4px !important;">
											<option value="000">请选择仪器种类</option>

										</select>

									</div>
									<div class="openMore pull-left" style="margin-bottom: 0px;">
										<div class="date beginTime pull-left">
											<label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">购置日期</label>
											<input type="text" readonly="" class="appsysinfo-m inputCommon " name="gzrstarDate" style="border-radius: 0 !important; width: 100px">
											<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
										</div>
										<span style="float: left;margin: 5px">至</span>
										<div class="input-group date endTime pull-left">
											<input type="text" readonly="" class="inputCommon appsysinfo-m" name="gzrendDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
											<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
										</div>
										<div style="clear: both"></div>
									</div>
								</div>
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

										<label class="labelCommon labelBg color666 dateLabel-m">申请人</label>
										<input type="text" class="inputCommon appsysinfo-m" name="" placeholder="请输入仪申请人" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

										<label class="labelCommon labelBg color666 dateLabel-m">申请部门</label>
										<select  style="width:140px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
								    border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
								    border-bottom-right-radius: 4px !important;">
											<option value="000">请选择申请部门</option>

										</select>

									</div>
								</div>

								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button  class="btn  btnAdd btnBorderColor colorfff borderRadius4 mr pull-left"></i>提交</button>
									<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>报废申请</button>

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
							<th class="text-left">种类</th>
							<th class="text-left">型号</th>
							<th class="text-left">购置日期</th>
							<th class="text-left">维修周期</th>
							<th class="text-left">当前状态</th>
							<th class="text-left">生产厂家</th>
							<th class="text-left">生产日期</th>
							<th class="text-left">申请人</th>
							<th class="text-left">申请部门</th>
							<th class="text-left">申请日期</th>
							<th class="text-left">审批人</th>
							<th class="text-left">审批日期</th>
							<th class="text-left">处理方式</th>
							<th class="text-left">备注信息</th>
							<th width="150px" class="text-center">操作</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td class="text-left">名称</td>
							<td class="text-left">种类</td>
							<td class="text-left">型号</td>
							<td class="text-left">购置日期</td>
							<td class="text-left">维修周期</td>
							<td class="text-left">当前状态</td>
							<td class="text-left">生产厂家</td>
							<td class="text-left">生产日期</td>
							<td class="text-left">申请人</td>
							<td class="text-left">申请部门</td>
							<td class="text-left">申请日期</td>
							<td class="text-left">审批人</td>
							<td class="text-left">审批日期</td>
							<td class="text-left">处理方式</td>
							<td class="text-left">备注信息</td>
							<td width="150px" class="text-center">
								<a href="#">编辑</a>
								<a href="#">删除</a>
							</td>
						</tr>
						<tr>
							<td class="text-left">名称</td>
							<td class="text-left">种类</td>
							<td class="text-left">型号</td>
							<td class="text-left">购置日期</td>
							<td class="text-left">维修周期</td>
							<td class="text-left">当前状态</td>
							<td class="text-left">生产厂家</td>
							<td class="text-left">生产日期</td>
							<td class="text-left">申请人</td>
							<td class="text-left">申请部门</td>
							<td class="text-left">申请日期</td>
							<td class="text-left">审批人</td>
							<td class="text-left">审批日期</td>
							<td class="text-left">处理方式</td>
							<td class="text-left">备注信息</td>
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