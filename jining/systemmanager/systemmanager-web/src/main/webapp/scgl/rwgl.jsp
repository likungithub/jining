<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String uuid = UUID.randomUUID().toString();
%>
<style>
	th,td { white-space: nowrap; }
	.dataTables_scrollHead {
		height: 40px;
	}
	#htshDIV1 .rotate1 {
		transform: rotate(180deg);
	}

</style>
<div class="" id="rwgl<%=uuid %>">
	<div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
		<div class="portlet light bordered" style="padding: 8px">
			<div class="portlet-body" style="margin-top: 0;padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
										<input type="text" class="inputCommon appsysinfo-m" name="ypmc" placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">任务类型</label>
										<input type="text" class="inputCommon appsysinfo-m" name="rwlx" placeholder="请输入任务类型" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="openMore pull-left" style="margin-bottom: 0px;">
										<div class="date beginTime pull-left">
											<label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">省抽导入日期</label>
											<input type="text"  class="appsysinfo-m inputCommon " name="cystartDate" id="rwgl_tartDate" style="border-radius: 0 !important; width: 100px">
											<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
										</div>
										<span style="float: left;margin: 5px">至</span>
										<div class="input-group date endTime pull-left">
											<input type="text"  class="inputCommon appsysinfo-m" name="cyendDate" id="rwgl_endDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
											<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
										</div>
										<div style="clear: both"></div>
									</div>
								</div>
								<br>
								<!--按钮  begin-->
								<div style="clear: both">
									<button id="btn_daoru" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导入省抽信息</button>
									<button id="btn_daochu" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-external-link-square iconMr"></i>导出Excel报告</button>
									<button id="chaxun" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button id="shanchu" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-remove iconMr"></i>批量删除</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-bordered table-hover" id="list_rwgl" style="width:700%">
						<thead>
							<tr>
							    <th width="10px"><input type="checkbox" id="check1"/></th>
								<th>抽样单编号</th>
								<th>省抽导入日期</th>
								<th>任务类型</th>
								<th>抽样环节</th>
								<th>抽样地点</th>
								<th>是否补样</th>
								<th>任务来源</th>
								<th>抽样人</th>
								<th>抽样人联系电话</th>
								<th>抽样日期</th>
								<th>是否直通车</th>
								<th>被抽样单位名称</th>
								<th>被抽样单位地址</th>
								<th>企业规模</th>
								<th>业态类型</th>
								<th>区域类型</th>
								<th>营业执照号</th>
								<th>法人代表</th>
								<th>许可证类型</th>
								<th>许可证号</th>
								<th>年销售额(万元)</th>
								<th>被抽样单位联系人</th>
								<th>被抽样单位联系电话</th>
								<th>被抽样单位传真</th>
								<th>被抽样单位邮编</th>
								<th>样品名称</th>
								<th>样品来源</th>
								<th>抽样方式</th>
								<th>样品属性</th>
								<th>样品类型</th>
								<th>商标</th>
								<th>样品批号</th>
								<th>日期/类型</th>
								<th>日期</th>
								<th>保质期</th>
								<th>执行标准</th>
								<th>规格型号</th>
								<th>质量等级</th>
								<th>生产许可证编号</th>
								<th>单价</th>
								<th>是否出口</th>
								<th>抽样基数</th>
								<th>抽样数量</th>
								<th>抽样数量单位</th>
								<th>备样数量</th>
								<th>进货量</th>
								<th>库存量</th>
								<th>包装分类</th>
								<th>样品形态</th>
								<th>抽样时样品储存状态</th>
								<th>储存条件(其他)</th>
								<th>储存条件-温度</th>
								<th>储存条件-湿度</th>
								<th>抽样样品包装</th>
								<th>样品包装(其他)</th>
								<th>抽样工具</th>
								<th>条形码(样品)</th>
								<th>寄送样品截止日期</th>
								<th>标示生产者名称</th>
								<th>标示生产者地址</th>
								<th>标示生产者联系人</th>
								<th>标示生产者联系电话</th>
								<th>抽样单位名称</th>
								<th>抽样单位级别</th>
								<th>抽样单位地址</th>
								<th>抽样单位联系人</th>
								<th>抽样单位电话</th>
								<th>抽样单位联系人电话</th>
								<th>抽样单位联系人Email</th>
								<th>抽样单位传真</th>
								<th>抽样单位邮编</th>
								<th>备注</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script type="application/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/scgl/rwgl.js"></script>
<script>
	rwgllist.setPath("<%=request.getContextPath()%>");
	rwgllist.inint("<%=uuid%>");
</script>

