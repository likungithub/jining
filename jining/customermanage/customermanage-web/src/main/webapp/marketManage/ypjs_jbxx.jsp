<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String wtid = request.getParameter("wtid");
    String htmc = request.getParameter("htmc");
    String htlx = request.getParameter("htlx");
    String yslbh = request.getParameter("yslbh");
    if (yslbh == null || yslbh.equals("null")) {
		yslbh = "";
	}
    UUID uuid = UUID.randomUUID();
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/marketManage//table.css" />
<div id="ypjs_jbxx<%=uuid%>">

	<form id="add_form" method="post" style="width: 100%;overflow:hidden;" action="">
		<table class="gridpt" style="table-layout: fixed;">
			<tbody>
				<tr>
					<th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">样品接收基本信息
					</th>
				</tr>
				<tr class="gridpt">
					<th class="gridpt_bg">合同名称&nbsp;&nbsp;<em>*</em></th>
					<td>
					<%=htmc %>
					</td>
					<th class="gridpt_bg">合同类型 </th>
					<td>
					<%=htlx %>
					</td>
					<th class="gridpt_bg">预受理编号</th>
					<td>
					<%=yslbh %>
					</td>
			</tbody>
		</table>
		<table class="gridpt" style="table-layout: fixed">
			<thead>
				<tr>
					<th colspan="6">样品接收查询</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>样品状态:</th>
					<td>
						<!-- <input id="" style="width: 100%; height: 100%;" class="combobox-f combo-f textbox-f"> -->
						<select name="ypzt_search" style="width: 100%;height:100%;">
						
							<option value="200" selected="selected">待接收</option>
							<option value="204">制备完成</option>
						</select>
					</td>
					<th>产品大类:</th>
					<td>
						<input id="productClass_search" name="cpdlmc" style="width: 100%;height:100%;">
					</td>
					<!-- <th>是否分配检测项目:</th>
					<td>
						<select id="ifHaveItems_search" style="width: 100%;height:100%;">
							<option value=""></option>
							<option value="1">是</option>
							<option value="0">否</option>
						</select>
					</td> -->
				</tr>
				<tr>
					<th>检测项目:</th>
					<td>
						<input id="sampleItems_search" name="jcxm" style="width: 100%;height:100%;">
					</td>
					<!-- <th>下单日期起:</th>
					<td>
						<div class="date beginTime pull-left cyjssj">
							<input type="text" readonly="" id="sampleDateEnd" class="appsysinfo-m inputCommon " name="cyjssj" style="border-radius: 0 !important; width: 100px">
							<span>
                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
						</div>
					</td>
					<th>下单日期止:</th>
					<td>
						<div class="date beginTime pull-left cyjssj">
							<input type="text" readonly="" id="sampleDateEnd" class="appsysinfo-m inputCommon " name="cyjssj" style="border-radius: 0 !important; width: 100px">
							<span>
                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
						</div>
					</td> -->
				</tr>
				<tr>
					<th>执行标准:</th>
					<td>
						<input id="standard_search" name="zxbz" style="width: 100%;height:100%;">
					</td>
					<th>应出报告日期起:</th>
					<td>
						<div class="date pull-left beginTime cyjssj">
							<input type="text" readonly="" id="sampleDateEnd" class="appsysinfo-m inputCommon " name="BgstartTime" style="border-radius: 0 !important; width: 100px">
							<span>
                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span> </div>
					</td>
					<th>应出报告日期止:</th>
					<td>
						<div class="date pull-left beginTime cyjssj">
							<input type="text" readonly="" id="sampleDateEnd" class="appsysinfo-m inputCommon " name="BgendTime" style="border-radius: 0 !important; width: 100px">
							<span>
                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<!--按钮  begin-->
		<div style="clear: both;padding:5px;">
			<button type="button" id="ypjsjbxxSearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
			<button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
			<button type="button" id="btn_ryxz<%=uuid%>" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">提交</button>
			<!-- <button id="saveZFWT" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button> -->
		</div>
	</form>
	<div class="dataTables_wrapper no-footer">
		<table class="table table-striped table-bordered table-hover" id="list_data" name="ypjs-table" style="width:100% !important;margin-top: 15px!important">
			<thead>
				<tr>
					<th field="ck"><input type="checkbox" class="check-all-td" /></th>
					<th>操作</th>
					<th>状态</th>
					<th>产品大类	</th>
					<th>执行标准/技术文件	</th>
				<!-- 	<th>抽样单编号</th> -->
					<th>样品编号	</th>
					<th>分析项目	</th>
					<th>样品名称	</th>
					<th>备注</th>
				</tr>
			</thead>
		</table>
	</div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/ypjs_jbxx.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {

		ypjsjbxx.setPath('<%=request.getContextPath()%>');
		ypjsjbxx.init('<%=id%>', '<%=uuid%>','<%=wtid%>');

	});
</script>