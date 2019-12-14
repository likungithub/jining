<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    UUID uuid = UUID.randomUUID(); 
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
<div class="" id="yplz<%=uuid %>">
	<div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
		<div class="portlet light bordered" style="padding: 8px">
			<div class="portlet-body" style="margin-top: 0;padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;">
								<div style="clear:both;overflow: hidden;" hidden="hidden">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">业务人员</label>
										<input type="text" class="inputCommon appsysinfo-m" name="ywry" placeholder="请输入业务人员" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">合同名称</label>
										<input type="text" class="inputCommon appsysinfo-m" name="htmc" placeholder="请输入合同名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">合同类型</label>
										<input type="text" class="inputCommon appsysinfo-m" name="htlx" placeholder="请输入合同类型" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
								</div>
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">合同编号</label>
										<input type="text" class="inputCommon appsysinfo-m" name="htbh" placeholder="请输入合同编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">委托单位名称</label>
										<input type="text" class="inputCommon appsysinfo-m" name="wtdwmc" placeholder="请输入委托单位名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="openMore pull-left" style="margin-bottom: 0px;">
										<div class="date beginTime pull-left">
											<label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">合同录入日期</label>
											<input type="text" readonly="" class="appsysinfo-m inputCommon " name="htlrstarDate" style="border-radius: 0 !important; width: 100px">
											<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
										</div>
										<span style="float: left;margin: 5px">至</span>
										<div class="input-group date endTime pull-left">
											<input type="text" readonly="" class="inputCommon appsysinfo-m" name="htlrendDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
											<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
										</div>
										<div style="clear: both"></div>
									</div>
								</div>
								<div style="clear:both;overflow: hidden;margin: 5px auto;" hidden="hidden">
									<div class="openMore pull-left" style="margin-bottom: 0px;">
										<div class="date beginTime pull-left">
											<label class="labelCommon labelBg color666 dateLabel-m">最晚报告</label>
											<input type="text" readonly="" class="appsysinfo-m inputCommon " name="zwbgstarDate" style="border-radius: 0 !important; width: 100px">
											<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
										</div>
										<span style="float: left;margin: 5px">至</span>
										<div class="input-group date endTime pull-left">
											<input type="text" readonly="" class="inputCommon appsysinfo-m" name="zwbgendDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
											<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
										</div>
									</div>
								</div>
								<br>
								<!--按钮  begin-->
								<div style="clear: both;">
									<button id="yplzSearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
								<button id="btn_ryxz<%=uuid%>" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">打印</button>
								<!-- 	<button id="addyplz" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button> -->
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-bordered table-hover" id="list_data" name="yplz-table" style="width:100%;margin-top: 15px!important">
						<thead>
							<tr>
							    <th field="ck" class="text-left" width="20px"><input type="checkbox" class="check-all-td"/></th>
								<th>样品名称</th>
								<th>样品状态</th>
								<th>样品编号</th>
								<th>样品数量</th>
								<th>收样日期</th>
								<th>规格</th>
								<th>生产日期</th>
								<th>等级</th>
								<th>检验类别</th>
								<th>保质期</th>
								<th>检验依据</th>
								<th>留样</th>
								<th>抽样人</th>
								<th>样品受理</th>
								<th>样品领取</th>
								<th>样品制备</th>
								<th>样品检验</th>
								<th>检毕</th>
								<th>报告编制</th>
								<th>报告审核</th>
								<th>报告批准</th>
								<th>备注</th>
							</tr>
						</thead>
						<tbody>
						<tr>
							<th field="ck"><input type="checkbox" class="check-all-td"/></th>
							<th>样品名称</th>
							<th>样品状态</th>
							<th>样品编号</th>
							<th>样品数量</th>
							<th>收样日期</th>
							<th>规格</th>
							<th>生产日期</th>
							<th>等级</th>
							<th>检验类别</th>
							<th>保质期</th>
							<th>检验依据</th>
							<th>留样</th>
							<th>抽样人</th>
							<th>样品受理</th>
							<th>样品领取</th>
							<th>样品制备</th>
							<th>样品检验</th>
							<th>检毕</th>
							<th>报告编制</th>
							<th>报告审核</th>
							<th>报告批准</th>
							<th>备注</th>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
	$(document).ready(function () {
		$("#btn_ryxz<%=uuid%>").click(function () {
            POBrowser.openWindowModeless('/customermanage/openword.do' , 'width=1200px;height=800px;');
        });
    });
</script>