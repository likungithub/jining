<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
	java.util.Date currentTime = new java.util.Date();//得到当前系统时间
	long dateMS = currentTime.getTime();

	currentTime.setTime(dateMS);
	String txtendDate = formatter.format(currentTime); //结束时间

	dateMS = dateMS - 60 * 60 * 24 * 1000 * 7;
	currentTime.setTime(dateMS);
	String txtstarDate = formatter.format(currentTime); //开始时间

	UUID uuid = UUID.randomUUID();

	String bz = request.getParameter("bz");
	if (bz == null){
		bz = "";
	}
%>
<style>
	/*.search-input-small {*/
		/*width: auto !important;*/
	/*}*/
	/*#tjlcDIV .popover {*/
		/*width: 156px !important;*/
	/*}*/
	/*#htsh td:nth-child(10)*/
	/*{*/
		/*text-align:center !important;*/
	/*}*/
	/*#htsh td:nth-child(2)*/
	/*{*/
		/*text-align:left !important;*/
	/*}*/
	/*#htsh td:nth-child(3)*/
	/*{*/
		/*text-align:center !important;*/
	/*}*/
	/*#htsh td:nth-child(4)*/
	/*{*/
		/*text-align:center !important;*/
	/*}*/
	/*#htsh td:nth-child(5)*/
	/*{*/
		/*text-align:center !important;*/
	/*}*/
	/*#htsh td:nth-child(6)*/
	/*{*/
		/*text-align:right !important;*/
	/*}*/
	/*#htsh td:nth-child(7)*/
	/*{*/
		/*text-align:center !important;*/
	/*}*/
	/*#htsh td:nth-child(8)*/
	/*{*/
		/*text-align:center !important;*/
	/*}*/
	/*#htsh td:nth-child(9)*/
	/*{*/
		/*text-align:center !important;*/
	/*}*/
	/*#chargeaudit_data_wrapper td:nth-child(10)*/
	/*{*/
		/*text-align:center !important;*/
	/*}*/
	/*.lb1{*/
		/*width:80px !important;*/
	/*}*/
	 /*#htsh td:nth-child(4){*/
            /*position: relative !important;*/
        /*left: -137px !important;*/
    /*}*/
	/*#htsh .search-box{margin-right:0px !important;}*/
	#page-container #contractaudit_data_info{
		height:30px !important;
		line-height:20px !important;
	}
	/*#tjlcDIV .table-toolbar{*/
		/*padding-bottom: 15px;*/
		/*border-bottom:1px solid #ccc;*/
	/*}*/
	#tjlcDIV  .search-input-small{
		width: auto!important;
	}
	/*#tjlcDIV .query{*/
		/*height: 33px ;*/
		/*margin-right: 10px;*/
		/*border:1px solid #e9edf1;*/
		/*border-radius: 3px;*/
		/*width: 205px;*/
		/*padding: 5px;*/
	/*}*/
	#tjlcDIV .portlet.light.bordered{
		border: 0 !important;
	}
	/*#tjlcDIV  .dataTables_wrapper{*/
		/*background: #f5f5f5 !important;*/
	/*}*/
	#processmanagement_data td:nth-child(3),
	#processmanagement_data td:nth-child(6)
	{
		text-align: center!important;
	}
	#processmanagement_data td>a{
		margin: 0 5%!important;
		color: #43A1E8!important;
	}
	#tjlcDIV .table-striped>tbody>tr:nth-of-type(odd) {
		background-color: #fff!important;
	}
/*	#tjlcDIV .table-striped>tbody>tr{
		border-bottom: 1px solid #ccc!important;

	}*/
	#tjlcDIV .table-striped>thead>tr{
		background: #f3f3f3!important;
	}
	. text-center{
		text-align: center;
	}
	/*#tjlcDIV  .useSearch {*/
		/*!*width: 280px;*!*/
		/*height: 33px;*/
		/*!*padding-left: 10px;*!*/
		/*!*padding-top: 10px;*!*/
		/*margin-bottom: 20px;*/
		/*border-radius: 5px !important;*/
		/*overflow: hidden;*/
		/*border: 1px solid #10a0f7;*/
		/*float: left;*/
	/*}*/
	/*#tjlcDIV .useSearch input {*/
		/*width: 150px;*/
		/*height: 33px;*/
		/*float: left;*/
		/*border: 0;*/
		/*padding-left: 10px;*/
		/*outline: none;*/
	/*}*/
	/*#tjlcDIV  .useSearch button {*/
		 /*height: 33px;*/
		 /*width: 33px;*/
		 /*padding: 0;*/
		 /*border: 0;*/
	 /*}*/
	/*#processmanagement .clear{*/

		/*clear: both;*/
	/*}*/
</style>
<div class="row" id="processmanagement">
	<div class="col-md-12" id="tjlcDIV">
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 15px">
					<div class="row">
						<div class="col-md-12" style="margin-left:19px;">
							<div class="row search-body">
								<!-- <label class="search-label search-label-small">功能:</label>
								<div  class="input-group search-box search-label-small pull-left">
									<input type="text" id="txtmenuName" name="txtmenuName" class="form-control input-sm pull-right" placeholder="选择功能" readonly="true"  style="width:110px;">
									<div id=“clearMenu-btn” class="input-group-addon" onclick="document.getElementById('txtmenuName').value = '';document.getElementById('hidemenuID').value = '';"><i class="fa fa-trash"></i></div>
								</div> -->
								<%-- <label class="labelCommon lb1 ml">开始</label>
								<div class="input-group search-box search-label-small pull-left" id="starDate_div">
									<input type="text" class="inputCommon input-sm  input-small borderRadius4" value="<%=txtstarDate%>" style="border-top-right-radius: 0px !important;
    border-right: 0px;border-bottom-right-radius: 0px !important;border-top-left-radius: 0px !important;
    border-right: 0px;border-bottom-left-radius: 0px !important;width:94px !important;" name="starDate" id="starDate" readonly>
									<span class="input-group-btn">
										<button class="btn btn-default input-sm" type="button" style="border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;height: 33px;
    border-left: 0px;">
											<i class="fa fa-calendar"></i>
										</button>
									</span>
								</div> --%>
								<div class="input-group search-box search-input-small pull-left">
									<button data="add" id="technologicalProcess" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">
										<i class="fa fa-plus"></i> 添加流程
									</button>
								</div>

								<div style="float: right;margin-right:8px">
									<div class="date beginTime pull-left">
										<label class="labelCommon labelBg color666 dateLabel-m">创建时间</label>
										<input value="" type="text" readonly class="appsysinfo-m inputCommon " name="starDate" style="border-radius: 0 !important; width: 100px">
										<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
									</div>
									<%-- <label class="labelCommon lb1 ml">结束</label>
                                    <div class="input-group search-box search-label-small pull-left"  id="endDate_Div">
                                        <input type="text" class="inputCommon input-sm  input-small borderRadius4" style="border-top-right-radius: 0px !important;
        border-right: 0px;border-bottom-right-radius: 0px !important;width:94px !important;border-top-left-radius: 0px !important;border-bottom-left-radius: 0px !important;" value="<%=txtendDate%>" name="endDate" id="endDate" readonly>
                                        <span class="input-group-btn">
                                            <button class="btn btn-default input-sm" type="button" style="border-top-right-radius: 4px !important;
        border-bottom-right-radius: 4px !important;height: 33px;
        border-left: 0px;">
                                               <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                    </div> --%>
									<span style="float: left;margin: 5px">-</span>
									<div class="input-group date endTime pull-left mr">
										<input value="" type="text" readonly class="inputCommon appsysinfo-m" name="endDate" style="border-radius: 0 !important;width: 100px;border-radius: 4px 0 0 4px!important;">
										<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                    </button>
                                    </span>
									</div>
									<%--<label class="labelCommon lb1">状态</label>--%>
									<%--<div class="input-group  search-label-small pull-left">--%>
									<%--<select class="form-control inputCommon  borderRadius4" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;width:97px;height:33px;border-top-right-radius: 0px !important;--%>
									<%--border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;--%>
									<%--border-bottom-right-radius: 4px !important;" id="txtorgName" name="txtorgName">--%>
									<%--<option value>全部</option>--%>
									<%--<option value="000" selected="selected">未审核</option>--%>
									<%--<option value="001">同意</option>--%>
									<%--<option value="002">不同意</option>--%>
									<%--</select>--%>
									<%--<!-- <input type="text" id="txtorgName" name="txtorgName" class="form-control input-sm pull-right" placeholder="选择用户" readonly="true" style="width:110px;"> -->--%>

									<%--</div>--%>
									<%--<label class="labelCommon lb1 ml">客户</label>--%>
									<%--<div class="input-group  search-label-small pull-left">--%>
									<%--<input type="text" class="inputCommon input-sm  input-small borderRadius4" name="khbm" id="khbm" style="border-top-right-radius:0 !important;text-indent:0px !important;--%>
									<%--border-bottom-right-radius:0 !important;width:126px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;font-size:12px !important;;" placeholder="客户名/客户编码"/>--%>

									<%--</div>--%>
									<%--<div>--%>
									<%--<!-- <input type="hidden" id="hidemenuID" name="hidemenuID" > -->--%>
									<%--<!-- <input type="hidden" id="hideuserID" name="hideuserID" > -->--%>
									<%--</div>--%>
									<div class="input-group search-box search-input-small pull-left" style="position: relative;margin-right: 25px">
										<%--<input type="text" class="query" style="float: left;" placeholder="请输入流程名称"><button id="lccx-btn" data-loading-text="Loading..."  class="clickSearch btn  btnBlue btnBorderColor colorfff pull-left"><i class="fa fa-search "></i></button>--%>
										<%--<div style="clear: both"></div>--%>
										<input type="text" class="query inputCommon appsysinfo-m " style=";padding-right: 45px;float: left; width: 250px;border-radius: 4px !important;" placeholder="请输入流程名称">
											<i class="fa fa-search colorBlue-10a0f7 searchIcoBtn " id="lccx-btn" style="margin-right: 5px;
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
									<%--	<button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr" id="lccx-btn" style="height:33px; margin-left: 10px" data-loading-text="Loading...">
											<i class="fa fa-search "></i>
											查&nbsp;询&nbsp;</button>--%>

										<!-- <button type="button" class="btn btn-sm btnBlue btnBorderColor colorfff borderRadius4 pull-left">
                                                     <i class="icon iconfont icon-daochu"></i>
                                        导出</button> -->
									</div>
								</div>




							</div>
						</div>
						<!-- <div class="col-md-12">

                        </div>	 -->
					</div>
					<!-- <div class="row">

                    </div> -->
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped  table-hover"
						   id="processmanagement_data">
						<thead>
						<tr>
							<%--<th width="5%">全选</th>--%>
							<th width="15%" class="text-left">流程ID</th>
							<th width="11%" class="text-left">流程名称</th>
							<th width="5%">步骤</th>
							<th width="20%" class="text-left">流程描述</th>
							<th width="6%">创建人</th>
							<th width="10%">创建时间</th>
							<th width="10%">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/taskcenter/processmanagemennt.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {

        processmanagement.setPath("<%= request.getContextPath()%>");
        processmanagement.init();
    });
</script>