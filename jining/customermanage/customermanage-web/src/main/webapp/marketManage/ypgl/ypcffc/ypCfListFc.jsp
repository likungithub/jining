<%@page import="java.util.UUID" %>
<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
	UUID uuid = UUID.randomUUID();
%>
<%
	java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
	java.util.Date currentTime = new java.util.Date();//得到当前系统时间
	String txtDate = format.format(currentTime); //将日期时间格局化
	String loginuser = CurrentLoginUser.getUser().getName();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
%>
<style>
	.search-input-small {
		width: auto !important;
	}

	.btnwhite {
		background-color: #fff;
		border: 1px solid #dedede;
		border-radius: 3px;
	}

	.btnBorderColor {
		color: #10a0f7;
		border: 1px solid #10a0f7;
	}

	#htshDIV1 .rotate1 {
		transform: rotate(180deg);
	}
	/* 总计样式 */

	.total-tfoot th {
		font-weight: normal!important;
		font-size: 12px!important;
		overflow: hidden!important;
		text-overflow: ellipsis!important;
		white-space: nowrap!important;
		padding-right: 8px!important;
		padding-left: 8px!important;
	}

	/*#list_data_wrapper {*/
	/*	overflow-x: auto;*/
	/*}*/

	/*#list_data_wrapper .table {*/
	/*	width: auto !important;*/
	/*}*/

	/*#list_data_wrapper .table th {*/
	/*	white-space: nowrap;*/
	/*}*/
</style>
<div class="" id="ypjs<%=uuid %>">
	<div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
		<div class="portlet light bordered" style="padding: 8px">
			<div class="portlet-body" style="margin-top: 0;padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">样品编号</label>
										<input type="text" class="inputCommon appsysinfo-m" id="ypbm<%=uuid%>" placeholder="请输入样品编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
										<label class="labelCommon labelBg color666 dateLabel-m">单位名称</label>
										<input type="text" class="inputCommon appsysinfo-m" id="dwmc<%=uuid%>" placeholder="请输入单位名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
										<input type="text" class="inputCommon appsysinfo-m" id="ypmc<%=uuid%>" placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left"
										 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">制备状态</label>
										<select class="form-control" id="rwzt" style="width: 214px;font-size:12px !important;">
											<option value="">请选择</option>
											<option value="001" selected>未拆分</option>
											<option value="002">已拆分</option>
											<option value="003">已提交</option>
										</select>
									</div>
								</div>
								<div style="clear: both;padding-top: 10px">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
										<label class="labelCommon labelBg color666 dateLabel-m">开始时间</label>
										<input type="text" class="inputCommon appsysinfo-m" id="btime"  style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
										<label class="labelCommon labelBg color666 dateLabel-m" id="jssja">结束时间</label>
										<input type="text" class="inputCommon appsysinfo-m" id="etime"  style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>

									<div class="input-group  search-label-small pull-left"
										 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">是否抽样</label>
										<select class="form-control" id="ifcy<%=uuid%>" style="width: 214px;font-size:12px !important;">
											<option value="0">否</option>
											<option value="1" selected>是</option>
										</select>
									</div>
									<%--<div class="input-group  search-label-small pull-left"--%>
										 <%--style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">--%>
										<%--<label class="labelCommon labelBg color666 dateLabel-m">选择科室</label>--%>
										<%--<select class="form-control" id="xzks<%=uuid%>" style="width: 214px">--%>
											<%--<option value="">请选择</option>--%>
											<%--<option value="1">微生物</option>--%>
											<%--<option value="2">理化室</option>--%>
										<%--</select>--%>
									<%--</div>--%>
									<%--20190911添加动态科室下拉--%>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">选择科室</label>
										<select class="appsysinfo-m inputCommon" id="xzks<%=uuid%>" name="xzks" style="outline:none;border: 0;width:214px !important;font-size:12px !important;">
										</select>
									</div>
								</div>
								<br>

								<div style="clear: both;padding-top: 10px">
									<button id="zbSave<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>拆分</button>
									<button id="btn_ryxz<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>提交</button>
									<button id="ypjsSearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="reset<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button id="addjcxm<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>检测项</button>
									<button id="btn_dyypbm<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>打印样品编号</button>
									<button id="dyrwd<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>打印样品信息登记表</button>
									<%--<button id="showdzcyd<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>电子抽样单11</button>--%>
									<button id="chaifenbeiyang<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>添加备样</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-bordered table-hover" id="list_data<%=uuid%>" name="ypjs-table" style="width:100% !important;margin-top: 15px!important">
						<thead>
						<tr>
							<th field="ck" width="20px" class="text-left"><input type="checkbox" class="check-all-td" name="zbck"/></th>
							<th>操作</th>
							<th>状态</th>
							<th style="width: 150px">样品编号</th>
							<th>样品名称</th>
							<th>检测项目</th>
							<th>科室</th>
							<th>样品数量</th>
							<th>备样数量</th>
							<th>拆分日期</th>
							<th>产品执行标准</th>
							<th>抽样日期</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/ypgl/ypcffc/ypcfListFc.js" type="text/javascript"></script>
<script type="text/javascript">
	$(document).ready(function () {
		ypjslist.setPath("<%= request.getContextPath()%>");
        ypjslist.setDzcydPath("<%= basePath%>");
		ypjslist.init("<%=uuid %>");
		//全选
		$("[name='zbck']").on('click',function () {
			if($("[name='zbck']").prop("checked")){
				//选中
				$("[name='ck']").prop("checked",true);
			}else{
				$("[name='ck']").prop("checked",false);
			}
		});
	});
</script>
<script>
	$(function () {

		$("#btime").datepicker({
			clearBtn: true,
			format: 'yyyy-mm-dd',
			autoclose: true,
			language: 'zh-CN'
		});
		$("#etime").datepicker({
			clearBtn: true,
			format: 'yyyy-mm-dd',
			autoclose: true,
			language: 'zh-CN',
			startDate:$("#btime").val()
		});
	});
</script>
