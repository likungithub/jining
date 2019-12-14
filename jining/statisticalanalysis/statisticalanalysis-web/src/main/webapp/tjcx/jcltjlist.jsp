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
										<label class="labelCommon labelBg color666 dateLabel-m">检测人员</label>
										<input type="text" class="inputCommon appsysinfo-m" name="jcry" id="jcltj_jcry" placeholder="请输入检测人员" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">检测类别</label>
										<input type="text" class="inputCommon appsysinfo-m" name="jcke" id="jcltj_jclb" placeholder="请输入检测类别" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>

									<div class="openMore pull-left" style="margin-bottom: 0px;">
										<div class="date beginTime pull-left">
											<label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">合同完成日期</label>
											<input type="text" class="appsysinfo-m inputCommon " name="starDate" id="jcltj_startDate" style="border-radius: 0 !important; width: 100px">
											<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
										</div>
										<span style="float: left;margin: 5px">至</span>
										<div class="input-group date endTime pull-left">
											<input type="text"  class="inputCommon appsysinfo-m" name="endDate" id="jcltj_endDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
											<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                       </span>
										</div>
										<div style="clear: both"></div>
									</div>

									<div class="input-group  search-label-small pull-left" style="display:none;left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;margin-top: 5px;">
										<label class="labelCommon labelBg color666 dateLabel-m">检测科室</label>
										<input type="text" class="inputCommon appsysinfo-m" name="jcke" id="jcltj_jcks" placeholder="请输入检测科室" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
								</div>


								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="jcltj_cx" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="jcltj_cz" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<%--<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导出Excel</button>--%>

								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="jcltj_ManagerList_m" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left">序号</th>
							<th class="text-left">合同名称</th>
							<th class="text-left">合同编码</th>
							<th class="text-left">样品名称</th>
							<th class="text-left">检测项数量</th>
							<th class="text-left">样品数量</th>
							<th class="text-left">检测人员</th>
							<th class="text-left">合同完成日期</th>
							<th class="text-left">当前状态</th>
							<th width="150px" class="text-left">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/tjcx/laydate/laydate.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/tjcx/jcltj.js" type="text/javascript"></script>



<div class="modal fade" id="jcltjModal" tabindex="-1" role="dialog" aria-labelledby="myModalLable" aria-hidden="true">
	<div class="modal-dialog">
		<!--模态框内容-->
		<div class="modal-content">
			<!--模态框头部-->
			<div class="modal-header">
				<!--添加关闭按钮-->
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<!--标题部分-->
				<h4 class="modal-title" id="myModalTitle">查看详细</h4>
			</div>
			<div class="modal-body">
				<form role="form" class="form-inline">
					<div class="form-group input-group">
						<span class="input-group-addon"><label>检测人员</label></span>
						<input type="text" id="jcry1" class="form-control" readonly>
					</div>
					<div class="form-group input-group">
						<span class="input-group-addon"><label>检测科室</label></span>
						<input type="text" id="jcks1" class="form-control" readonly>
					</div>
					<div class="form-group input-group">
						<span class="input-group-addon"><label>合同完成日期</label></span>
						<input type="text" id="htwcrq1" class="form-control" readonly>
					</div>
					<div class="form-group input-group">
						<span class="input-group-addon"><label>所在省</label></span>
						<select class="form-control">
							<option>山东省</option>
							<option>山西省</option>
						</select>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<%--<button type="button" class="btn btn-primary">保存</button>--%>
			</div>
		</div>
	</div>
</div>
