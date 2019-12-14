<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
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
String dljgbm = CurrentLoginUser.getUser().getDljgBm();
%>

<style>
	#page-container #params_data_info{
		height:30px !important;
		line-height:20px !important;
	}
	#htsh .search-box{margin-right:0px !important;}
	.lb1{
	    width:80px !important;
	}
    .workorderbtn{
        background-color: transparent;
        border:none;
    }
</style>
<div class="row contentBgColor" id="workorder-manager-container_<%=uuid%>">
	<div class="col-md-12">
		<div class="portlet light" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin: 0 0 15px;height: 33px">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body">
                                <div class="input-group  pull-right">
                                    <button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left Search-btn" style="margin-right: 15px;height:33px;" data-loading-text="Loading...">
                                        <i class="fa fa-search "></i>
                                        查&nbsp;询&nbsp;</button>
                                </div>
                                <div class="input-group date endTime pull-right mr">
                                    <%--<label class="labelCommon labelBg color666 dateLabel-m">结束</label>--%>
                                        <span style="float: left;margin: 5px">-</span>
                                    <input type="text" readonly class="inputCommon appsysinfo-m" name="endDate" style="border-radius: 0 !important;width: 100px" value="<%=txtendDate%>">
                                    <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                    </button>
                                    </span>
                                </div>
							     <div class="date beginTime pull-right">
                                    <label class="labelCommon labelBg color666 dateLabel-m">提交时间</label>
                                    <input type="text" readonly class="appsysinfo-m inputCommon " name="starDate" style="border-radius: 0 !important; width: 100px" value="<%=txtstarDate%>">
                                    <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                </div>


                                <div class="input-group  search-label-small pull-right">
                                    <select class="form-control inputCommon  borderRadius4 mr" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;width:97px;height:33px;border-top-right-radius: 0px !important;
    border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;" id="workorderstatus" name="workorderstatus">
                                        <option value  selected="selected">全部</option>
                                        <option value="0">待处理</option>
                                        <option value="1">已处理</option>
                                    </select>
                                </div>
                                <label class="labelCommon lb1"style="float: right">状态</label>
                            </div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer" id="common-basic-params">
					<table class="table table-striped table-hover paramsTab"
						   id="workorder_data">
						<thead>
						<tr class="color333">
							<th width="80px">提交时间</th>
							<th width="80px">优先级</th>
							<th style="text-align: left;">问题内容</th>
							<th width="80px">处理状态</th>
							<th width="90px">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<%-- <link href="<%=request.getContextPath()%>/assets/pages/css/workorder/params.css" rel="stylesheet" type="text/css" /> --%>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/workorder/list.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		workorderlist.setPath("<%= request.getContextPath()%>");
		workorderlist.init('<%=uuid%>','<%=dljgbm%>');
	});
</script>

