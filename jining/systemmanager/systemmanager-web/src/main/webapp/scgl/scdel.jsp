<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String uuid = UUID.randomUUID().toString();
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
	
	#list_data_wrapper {
		overflow-x: auto;
	}
	
	#list_data_wrapper .table {
		width: auto !important;
	}
	
	#list_data_wrapper .table th {
		white-space: nowrap;
	}
</style>
<div class="" id="sjsc<%=uuid %>">
	<div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
		<div class="portlet light bordered" style="padding: 8px">
			<div class="portlet-body" style="margin-top: 0;padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">抽样单编号</label>
										<input type="text" class="inputCommon appsysinfo-m" name="cydbh" placeholder="请输入抽样单编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="openMore pull-left" style="margin-bottom: 0px;">
										<div class="date beginTime pull-left">
											<label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">抽样日期</label>
											<input type="text"  class="appsysinfo-m inputCommon " name="cystarDate" style="border-radius: 0 !important; width: 100px">
											<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
										</div>
										<span style="float: left;margin: 5px">至</span>
										<div class="input-group date endTime pull-left">
											<input type="text"  class="inputCommon appsysinfo-m" name="cystendDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
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
										<label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
										<input type="text" class="inputCommon appsysinfo-m" name="ypmc" placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">抽样地区</label>
										<select name="sheng" class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:71px !important;font-size:12px !important;">
											<option>请选择省</option>
										</select>
										<select name="shi" class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:71px !important;font-size:12px !important;">
											<option>请选择市</option>
										</select>
										<select name="xian" class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:71px !important;font-size:12px !important;">
											<option>请选择县</option>
										</select>
									</div>
								</div>
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">检测报告状态</label>
										<select name="xian" class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
										<option>请选择检测状态</option>
										</select>
									</div>
							        <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<button id="chaxun" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
										<button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									</div>
								</div>
								<br>
								<!--按钮  begin-->
								<div style="clear: both;">
									<button id="btn_tuihui" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-backward iconMr"></i>退回到移交确认</button>
									<button id="btn_baogao" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>检测报告录入</button>
									<button id="btn_daoru" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导入Excel报告</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-bordered table-hover" id="list_sjsc"  style="width:100%;margin-top: 15px!important">
						<thead>
							<tr>
							    <th><input type="checkbox" id="check1"/></th>
								<th>抽样单编号</th>
								<th>任务类型</th>
								<th>样品名称</th>
								<th>样品来源</th>
								<th>收样日期</th>
								<th>检验报告状态</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<%--<script src="<%=request.getContextPath()%>/assets/pages/scripts/scgl/sjsc.js"></script>
<script>
	sjsclist.setPath("<%=request.getContextPath()%>");
	sjsclist.inint("<%=uuid%>");
</script>--%>
