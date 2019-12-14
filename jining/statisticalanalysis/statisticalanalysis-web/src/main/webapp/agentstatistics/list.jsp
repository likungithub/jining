<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
UUID uuid = UUID.randomUUID();
%>
<style>
	#chargeaudit_data td,#chargeaudit_data th{text-align: center !important;}
	#chargeaudit_data td:nth-child(5){text-align: right !important;}
	#chargeaudit_data td:nth-child(6){text-align: right !important;}
	#chargeaudit_data td:nth-child(7){text-align: right !important;}
	#page-container #chargeaudit_data_info{
		height:30px !important;
		line-height:20px !important;
	}
	.number{
	   color: red;
	   font-size: 14px !important;
	}

	.useSearch{
		width: 214px;
		/*height: 50px;*/
		/*padding-left: 10px;*/
		/*padding-top: 10px;*/
		margin-bottom: 20px;
		border-radius: 5px!important;
		overflow: hidden;
		border:1px solid #ccc;
		float: left;
	}
	.useSearch input{
		width: 200px;
		height: 33px;
		float: left;
		border:0;
		outline: none;

	}
	.useSearch button{
		height: 28px;
		width: 28px;
		padding: 0;
		border:0;
	}
	/*.moreChoice{*/
		/*float: left;*/
		/*color: #999;*/
		/*height: 28px;*/
		/*line-height: 28px;*/
		/*!*margin-left: 20px;*!*/
	/*}*/
	.moreChoice:hover{
		cursor: pointer;
	}
	/*.agentstatistics_id_div .dataTables_wrapper{
		border-top: 1px solid #ccc;
	}*/

	.agentstatistics_id_div .moreChoice {
		height: 34px;
		line-height: 34px;
		padding: 0;
		border: none;
		background: none;
		float: left;
		margin-left: 10px;
		color: #10a0f7;
		outline: none;
		margin-right: 5px;
	}
	.agentstatistics_id_div .rotate1{
		transform: rotate(180deg);
	}
</style>
<div class="row agentstatistics_id_div" id="agentstatistics_id_div_<%=uuid %>">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-body">
				<div>
					<div class="row">
					   <div class="col-md-12" style="padding-left: 25px;padding-top: 5px;padding-bottom: 5px;background: #F3F3F3;width: 98%;margin-left: 13px;margin-bottom: 15px">
					       <!-- 截止今日，平台共入住代理记账公司<label class="allnumber number"></label>户，其中今日审核通过的户数有<label class="todaynumber number"></label>位。 -->
						   <img style="vertical-align: text-bottom;margin-right: 5px;" src="<%= request.getContextPath()%>/assets/pages/img/remind.png" alt="">截止今日，平台共入住代理记账公司<label class="allnumber number"></label>户，其中已缴费（含欠费）<label class="yjfnumber number"></label>户，试用中（含已过试用期）<label class="tryoutnumber number"></label>户，未审核用户<label class="wshnumber number"></label>户
					   </div>
						<div class="col-md-12" style="margin-bottom: 15px">
							<img style="    margin-right: 10px;vertical-align: middle;margin-top: 12px;" class="rotate1 pull-right" src="<%= request.getContextPath()%>/assets/pages/img/arrow.png" alt="arrow">
							<p class="moreChoice pull-right" data="0" style="margin-bottom: 0">更多</p>
							<div class="useSearch pull-right mr" style="margin-bottom: 0">
								<div class="input-group search-box search-label-small pull-left" style="position: relative">
									<input type="text" class="form-control input-sm  input-small" name="khbm" id="khbm" placeholder="代理机构名称" style="padding-right: 61px;height:33px;border-radius: 4px !important;width: 220px!important;
   "/>
									<i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" name="Search-btn"  style="margin-right: 5px;
																															position: absolute;
																															right: 3px;
																															top: 0px;
																															cursor: pointer;
																															height: 33px;
																															line-height: 33px;
																															width: 45px;
																															text-align: center;
																															border-left: 1px solid #dedede;
																															font-size: 20px!important;
																															z-index: 10;"></i>
								</div>
							</div>



					</div>
						<div class="col-md-12" style="padding-left: 4px;width: 870px;float: right;">
							<div class="row search-body ml" style="margin-bottom: 15px;display: none;border: 1px solid #ccc;padding: 20px 10px;border-radius: 4px!important;">
								<div class="date beginTime pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m" style="    margin-left: 10px;">审核时间</label>
                                    <input type="text" readonly class="appsysinfo-m inputCommon " name="shstarDate" style="border-radius: 0 !important; width: 120px">
                                    <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                </div>
								<div class="input-group date endTime pull-left mr" style="margin-right: 10px">
									<span style="float: left;margin: 10px;">-</span>
                                    <input type="text" readonly class="inputCommon appsysinfo-m" name="shendDate" style="border-radius: 0 !important;width: 120px">
                                    <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                    </button>
                                    </span>
                                </div>
                                <div class="date beginTime pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m">注册时间</label>
                                    <input type="text" readonly class="appsysinfo-m inputCommon " name="zcstarDate" style="border-radius: 0 !important; width: 120px">
                                    <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                </div>
                                <div class="input-group date endTime pull-left mr" style="margin-right: 10px">
									<span style="float: left;margin: 10px;">-</span>
                                    <input type="text" readonly class="inputCommon appsysinfo-m" name="zcendDate" style="border-radius: 0 !important;width: 120px">
                                    <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                    </button>
                                    </span>
                                </div>


							</div>						 							 
						</div>		
									
					</div>
				</div>	
			<div class="dataTables_wrapper no-footer">
				<table class="table table-striped table-bordered table-hover" id="agentstatistics_data" style="margin-top: 0!important">
						<thead>
						<tr>
						    <th width="100px" style="text-align: center!important;">登录账号</th>
						    <th width="25%" style="text-align: left;">代理机构名称</th>
							<th width="150px" style="text-align: center;">公司税号</th>
							<th width="100px" style="text-align: center!important;">注册时间</th>
							<th width="100px" style="text-align: center!important;">审核时间</th>
							<th width="100px" style="text-align: center;">审核状态</th>
							<th width="50px" style="text-align: center;">客户</th>
							<th width="50px" style="text-align: center;">登录次数</th>
							<th width="100px" style="text-align: center;">操作</th>
						</tr>
						</thead>
					</table>
			</div>
		</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/agentstatistics/list.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		agentlist.setPath("<%= request.getContextPath()%>");
		agentlist.init("<%=uuid %>");
	});
</script>