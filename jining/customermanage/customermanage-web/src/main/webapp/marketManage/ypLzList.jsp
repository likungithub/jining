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
								<div style="clear:both;overflow: hidden;display: none">
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
								<div style="clear:both;overflow: hidden;margin: 5px auto;display: none">
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
									<button id="btn_ryxz<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>提交</button>
									<button id="yplzSearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
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
							    <th width="20px" class="text-left" field="ck"><input type="checkbox" class="check-all-td"/></th>
								<th width="10%">操作</th>
								<th width="10%">合同编号</th>
							<%--	<th>状态</th>--%>
							<%--	<th width="10%">预受理编号</th>--%>
								<th width="10%">委托单位名称</th>
								<th width="10%">委托单位英文名称</th>
								<%--<th>合同类型缩写</th>--%>
							<%--	<th width="10%">合同来源</th>--%>
							<%--	<th>检测类型</th>--%>
								<%--<th>联系人</th>
								<th>联系电话</th>
								<th>手机</th>
								<th>联系邮箱</th>
								<th>传真</th>
								<th>服务类型</th>
								<th>有效日期</th>
								<th>执行期限</th>
								<th>最晚报告时间</th>--%>
								<th width="10%">所属省</th>
								<th width="10%">所属市</th>
								<th width="10%">所属县</th>
								<th width="10%">所属街道</th>
								<%--<th>要求采样开始时间</th>
								<th>要求采样结束时间</th>
								<th>资质类型</th>
								<th>是否判定</th>
								<th>判定依据</th>
								<th>报告类别</th>
								<th>是否体现生产单位</th>
								<th>指定体现生产单位名称</th>
								<th>指定体现生产单位地址</th>
								<th>有无照片</th>
								<th>其他报告要求</th>
								<th>取报告方式</th>
								<th>取报告单位</th>
								<th>收件人</th>
								<th>取报告地址</th>
								<th>取报告邮编</th>
								<th>业务员名字</th>
								<th>签单日期</th>
								<th>付款单位</th>
								<th>发票类型</th>
								<th>加急费用(元)</th>
								<th>检测费用(元)</th>
								<th>买样付款类型</th>
								<th>买样费</th>
								<th>合同额(元)</th>
								<th>付款方式</th>
								<th>最晚付款日期</th>
								<th>样品保存</th>--%>
								<th width="10%">是否抽样</th>
								<th width="10%">备注</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/ypLzList.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {
		yplzlist.setPath("<%= request.getContextPath()%>");
		yplzlist.init("<%=uuid %>");
	});
</script>