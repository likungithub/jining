<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
	java.util.Date currentTime = new java.util.Date();//得到当前系统时间
	long dateMS = currentTime.getTime();
	/*String khbm = request.getParameter("khbm");*/
//	if(khbm==null){
//		khbm="";
//	}

	currentTime.setTime(dateMS);
	String txtendDate = formatter.format(currentTime); //结束时间

	dateMS = dateMS - 60 * 60 * 24 * 1000 * 7;
	currentTime.setTime(dateMS);
	String txtstarDate = formatter.format(currentTime); //开始时间

	UUID uuid = UUID.randomUUID();
	String type = request.getParameter("type");
	if (type == null) {
		type = "";
	}
%>
<style>
	.chargeorder_id_div .col-md-12 {
		width: 100%;
		margin-bottom: 15px;
	}

	.bottomstyle {
		border-bottom: 1px dashed #dadada!important;
	}
	/* #chargeaudit_data td,#chargeaudit_data th{text-align: center !important;}
#chargeaudit_data td:nth-child(5){text-align: right !important;}
#chargeaudit_data td:nth-child(6){text-align: right !important;}
#chargeaudit_data td:nth-child(7){text-align: right !important;}
#chargeaudit_data td:nth-child(8){text-align: right !important;} */

	#page-container #chargeaudit_data_info {
		height: 30px !important;
		line-height: 20px !important;
	}

	.moneyinput {
		text-align: right;
	}

	#chargeOrderSearch .useSearch {
		/* width: 280px; */
		height: 33px;
		/* padding-left: 10px; */
		/* padding-top: 10px; */
		margin-bottom: 10px;
		border-radius: 5px !important;
		overflow: hidden;
		border: 1px solid rgb(204, 204, 204);
		float: left;
	}

	#chargeOrderSearch .useSearch input {
		width: 265px;
		height: 33px;
		float: left;
		border: 0;
		padding-left: 10px;
		outline: none;
	}

	#MoreSearch_btn {
		height: 34px;
		width: 30px;
		padding: 0;
		border: none;
		border-radius: 0 4px 4px 0 !important;
		background: none;
		float: left;
		margin-left: 10px;
		color: #10a0f7;
		outline: none;
		margin-right: 10px;
	}

	.positionSpan>span {
		display: block;
		width: 0;
		height: 0;
		border-width: 10px;
		border-style: solid;
		border-color: #CACACA transparent transparent transparent;
		position: absolute;
		top: 32px;
		right: 116px;
	}

	.positionSpan>span>em {
		display: block;
		width: 0;
		height: 0;
		border-width: 10px;
		border-style: solid;
		border-color: #f6f6f6 transparent transparent transparent;
		position: absolute;
		top: -12px;
		left: -10px;
	}

	.rotate1 {
		transform: rotate(180deg);
	}

	.chargeorder_id_div .activeClick {
		background: #DBF1FD;
	}

	.chargeorder_id_div tbody tr td:nth-child(2) {
		text-align: left;
	}

	.chargeorder_id_div tbody tr td:nth-child(8),
	.chargeorder_id_div tbody tr td:nth-child(7) {
		text-align: right;
	}


	.chargeorder_id_div .childtable{
		width:100%;
		table-layout: fixed;
		margin: 4px 0px 4px 0px;
	}
	.chargeorder_id_div .childtable tr{
		height: 30px;
	}
	.chargeorder_id_div .childtable td{
		border:1px solid #EAEAEA !important;
		padding: 2px 10px 2px 10px;
	}
	.chargeorder_id_div .childtable tr:first-child td:first-child{
		width: 30px;
	}
	.chargeorder_id_div .childtable tr:first-child td:last-child{
		background-color: #F9F9F9;
	}
	.chargeorder_id_div .childtable tr:first-child td:last-child .childdivlist{
		padding: 0px 10px 0px 10px;
		float: left;
		height: 34px;
		line-height:34px;
	}
	/*.chargeorder_id_div .childtable tr:first-child td:last-child .childdivlist:nth-child(-n+3){*/
		/*width: 160px;*/
		/*float: left;*/
	/*}*/
	.chargeorder_id_div .childtable tr:first-child td:last-child .childdivlist:last-child{
		float: right;
	}
	.chargeorder_id_div .childtable input[type=text]{
		width:60px;
		/*float:left;*/
		text-align: right;
	}
	.chargeorder_id_div .childtable button{
		background: none!important;
		color: #0EA1F7!important;
		border: none !important;
	}
	.chargeorder_id_div .childtable .fontSize-16{
		font-size:16px;
	}
	.chargeorder_id_div .childtable .hiddendiv{
		display: none;
	}
	.chargeorder_id_div .childtable tr:first-child td:last-child .rotate{
		transform:rotate(90deg);
		-ms-transform:rotate(90deg); /* Internet Explorer */
		-moz-transform:rotate(90deg); /* Firefox */
		-webkit-transform:rotate(90deg); /* Safari 和 Chrome */
		-o-transform:rotate(90deg); /* Opera */
	}
</style>
<div class="row chargeorder_id_div" id="chargeorder_id_div_<%=uuid %>" style="margin-top: 50px">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-body">
				<div class="" style="">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body ml" id="chargeOrderSearch">
								<input type="hidden" value="0" name="showflag" />
								<a style="height:33px;background: #fff;border: #fff;margin-left: -50px;" class="pull-left hiddenadoptAll">
								</a>
								<button name="exportExcel" id="daochuexlsws" style="height:33px;" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4  pull-left mr">
									<i class="icon iconfont icon-daochu"></i>导出
								</button>
								<div class="input-group  pull-right positionSpan" style="margin-left: 10px;">
									<label class="labelCommon" style="width:80px !important;">审核状态</label>
									<div class="input-group  search-label-small pull-left">
										<select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="auditStatic">
											<option value="100">全部</option>
											<option value="000" selected="selected">未审核</option>
											<option value="003">待审核</option>
											<option value="001">已通过</option>
											<option value="002">未通过</option>
										</select>
									</div>
									<div class="useSearch" style="margin-bottom: 0;position: relative">
										<input style="padding-right: 45px" type="text" class="query" style="float: left;" placeholder="请输入客户名称、订单编号或合同编码" name="searchtxt">
										<i class="fa fa-search colorBlue-10a0f7 searchIcoBtn Search-btn" style="margin-right: 5px;
																														position: absolute;
																														right: -5px;
																														top: 0px;
																														cursor: pointer;
																														height: 33px;
																														line-height: 33px;
																														width: 45px;
																														text-align: center;
																														border-left: 1px solid #dedede;
																														font-size: 20px!important;"></i>
										<div style="clear: both"></div>
									</div>
								<%--	<div class="input-group  pull-left" style="margin-left: 10px;">
										<button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr Search-btn" data-loading-text="Loading...">
											<i class="fa fa-search "></i>查&nbsp;询&nbsp;
										</button>
									</div>--%>
									<button type="button" id="MoreSearch_btn" data-loading-text="Loading..." style="outline: none" class="iconFontColor-10a0f7">

										更多
									</button>
									<img style="    margin-right: 10px;vertical-align: middle;margin-top: 12px;" class="rotate1" src="/statisticalanalysis/assets/pages/img/arrow.png" alt="arrow">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row" id="moreSearchDiv" style="display: none;">
					<div class="row search-body" style="width: 1028px;margin-right: 15px;padding: 25px 5px;border-radius: 5px!important;border: 1px solid #ccc;float: right;margin-bottom: 30px;">
						<div class="col-md-12" style="width: 110%">
							<label class="labelCommon" style="width:80px !important;">服务状态</label>
							<select id="fwzt" class="form-control mr" style="float: left; border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;">
								<option value="2">全部</option>
								<option value="1">正在服务的客户</option>
								<option value="0">停止服务的客户</option>
							</select>
							<label class="labelCommon" style="width:80px !important;">收费状态</label>
							<div class="input-group  search-label-small pull-left">
								<select class="form-control" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="chargeStatic">
									<option value="100" selected="selected">全部</option>
									<option value="000">未收费</option>
									<option value="001">已收费</option>
									<option value="003">催费中</option>
									<option value="002">欠费中</option>
									<option value="004">已到账</option>
									<option value="005">坏账</option>
								</select>
							</div>

							<label class="labelCommon ml" style="width:80px !important;">收费项目</label>
							<div class="input-group  search-label-small pull-left">
								<select class="form-control" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="chargeType">

								</select>
							</div>

							<label class="labelCommon" style="width:80px !important;    margin-left: 10px;">收费方式</label>
							<div class="input-group  search-label-small pull-left">
								<select class="form-control" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="chargeMode">
									<option value="100" selected="selected">全部</option>
									<option value="001">按年</option>
									<option value="002">按半年</option>
									<option value="003">按季</option>
									<option value="004">按月</option>
									<option value="005">其他</option>
								</select>
							</div>

							<label class="labelCommon" style="width:80px !important;    margin-left: 10px;">收费模式</label>
							<div class="input-group  search-label-small pull-left">
								<select class="form-control" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="chargeModel">
									<option value="100" selected="selected">全部</option>
									<option value="002">先付</option>
									<option value="001">后付</option>
								</select>
							</div>
						</div>
						<div class="col-md-12">
							<label class="labelCommon" style="width:80px !important;float: left;">主管会计</label>
							<div class="input-group  search-label-small pull-left">
								<select class="form-control" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:100px;height:33px;font-size:12px !important;" id="employee" name="employee">
									<option value="100" selected="selected">全部</option>
								</select>
							</div>
							<div class="date beginTime pull-left">
								<label class="labelCommon labelBg color666 dateLabel-m ml" style="width:80px !important;">服务期限</label>
								<input type="text" readonly class="appsysinfo-m inputCommon " name="starDate" id="startTime" style="border-radius: 0 !important; width: 100px">
								<span>
	                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
	                                            <i class="fa fa-calendar"></i>
	                                        </button>
	                                    </span>
							</div>
							<span style="float: left;margin: 5px">-</span>
							<div class="input-group date endTime pull-left mr">
								<input type="text" readonly class="inputCommon appsysinfo-m" name="endDate" id="endTime" style="border-radius: 4px 0 0 4px !important;width: 100px">
								<span>
	                                       <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
	                                           <i class="fa fa-calendar"></i>
	                                       </button>
	                                    </span>
							</div>
							<label class="labelCommon" style="width:80px !important;float: left;">费用类型</label>
							<div class="input-group  search-label-small pull-left">
								<select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:100px;height:33px;font-size:12px !important;" id="chargews" name="chargews">
									<option value="100" selected="selected">全部</option>
									<option value="001">实际收费</option>
									<option value="002">预计收费</option>
									<option value="003">应收费用</option>
								</select>
							</div>
							<label class="labelCommon" style="width:80px !important;">部门</label>
							<div class="input-group  search-label-small pull-left" >
								<input value="全部" data-code="100" class="form-control inputCommon  borderRadius4 mr" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;width:131px;height:33px;border-top-right-radius: 0px !important;
    border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;padding-left: 0;
    border-bottom-right-radius: 4px !important;" id="department" name="department">
								<input type="text" id="searchDepartment" style="
 	display: none;
    width: 211px;
    height: 33px;
    position: absolute;
    left: -76px;
    top: 44px;
    z-index: 37;
    border: 1px solid rgb(218, 218, 218) !important;
    border-radius: 4px !important;">
								<a href="javascript:void(0)" id="chargeDepartmentDel" style="    position: absolute;
    z-index: 21;
    bottom: -86px;
    left: -76px;
    width: 215px!important;
    background: #D1EDFF;
    height: 33px;
    line-height: 33px;
    color: #000;
    padding-left: 10px;
    text-decoration: none;
display: none;
">
									全 部</a>
								<div id="chargeTreecontainer" style=" display: block;
    padding: 94px 0px 15px;
    position: absolute;
    background: rgb(255, 255, 255);
    top: 34px;
    min-width: 242px;
    left: -80px;
    z-index: 20;
    border: 1px solid #ddd;
    border-top: 1px solid #dedede;
box-shadow: 2px 2px 5px #ddd;
display: none;
"></div>
							</div>
						<div class="col-md-12" style="padding: 0;margin-top: 15px;margin-bottom: 0">
							<label class="labelCommon" style="width:80px !important;float: left;">支付渠道</label>
							<div class="input-group  search-label-small pull-left">
								<select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" id="chargeAccount" name="chargeAccount">
								</select>
							</div>
							<label class="labelCommon" style="width:80px !important;float: left;">收费职员</label>
							<div class="input-group  search-label-small pull-left">
								<select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" id="inputPeople" name="inputPeople">
									<option value="999" selected="selected">全部</option>
								</select>
							</div>
							<label class="labelCommon" style="width:80px !important;float: left;">客户经理</label>
							<div class="input-group  search-label-small pull-left">
								<select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" id="customerMaster" name="inputPeople">
									<option value="999" selected="selected">全部</option>
								</select>
							</div>
							<div class="date beginTime1 pull-left">
								<label class="labelCommon" style="width:80px !important;float: left;">收费时间</label>
								<input type="text" readonly class="appsysinfo-m inputCommon "  name="starDate" id="chargeStartTime" style="border-radius: 0 !important; width: 100px">
								<span>
	                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
	                                            <i class="fa fa-calendar"></i>
	                                        </button>
	                                    </span>
							</div>
							<span style="float: left;margin: 5px">-</span>
							<div class="input-group date endTime1 pull-left mr" >
								<input type="text" readonly class="inputCommon appsysinfo-m"  name="endDate" id="chargeEndTime" style="border-radius: 4px 0 0 4px !important;width: 100px" >
								<span>
	                                       <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
	                                           <i class="fa fa-calendar"></i>
	                                       </button>
	                                    </span>
							</div>
						</div>

							<div class="col-md-12" style="margin-bottom: -40px;">
								<div id="zhuyi" style="    margin-top: 10px;;">
									<div style="float: left">
										<P style="font-size: 14px;color: red;margin-bottom: 10px">注：实际收费是服务期限内已收费的费用订单；&nbsp;&nbsp;</P>
									</div>
									<div style="float: left">
										<P style="font-size: 14px;color: red;margin-bottom: 10px">预计收费是在服务期限内未服务但已收费的订单，即提前收取的费用的订单；&nbsp;&nbsp;</P>
									</div>
									<div style="float: left">
										<P style="font-size: 14px;color: red;margin-bottom: 10px">应收费用是在服务器期限内总收费订单；&nbsp;&nbsp;</P>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="dataTables_wrapper no-footer">
				<table class="table table-striped table-bordered " id="chargeorder_data">
					<thead>
					<tr>
						<th width="20px"></th>
						<th width="10%" style="text-align: left">合同编码</th>
						<th width="15%" style="text-align: left">客户名称</th>
						<th width="12%">服务期限</th>
						<th width="10%">收费项目</th>
						<th width="10%">收费方式</th>
						<th width="10%" style="text-align: right">应收金额</th>
						<th width="10%" style="text-align: right">实际金额</th>
					</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/chargestatistics/list.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        chargestatisticslist.setPath("<%= request.getContextPath()%>");
        chargestatisticslist.init("<%=uuid %>", "<%=type %>");
    });
</script>