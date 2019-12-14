<%@page import="java.util.Random"%>
<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
java.util.Date currentTime = new java.util.Date();//得到当前系统时间
String txtstarDate = formatter.format(currentTime); //将日期时间格局化
long dateMS = currentTime.getTime();
dateMS = dateMS + 60 * 60 * 24 * 1000 * 1;
currentTime.setTime(dateMS);
String txtendDate = formatter.format(currentTime);
UUID uuid = UUID.randomUUID();
%>

<style>
	#page-container #log_data_info{
		height:30px !important;
		line-height:20px !important;
	}
</style>
<div class="row  contentBgColor loginLogWrap-m" id="log_id_div_<%=uuid%>">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 15px">
			 <!-- <div class="portlet-title"><span class="caption-subject bold uppercase">日志信息</span></div> -->
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin: 0 0 15px;height: 33px;">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body">
								<!-- <label class="search-label search-label-small">功能:</label>
								<div  class="input-group search-box search-label-small pull-left">
									<input type="text" id="txtmenuName" name="txtmenuName" class="form-control input-sm pull-right" placeholder="选择功能" readonly="true"  style="width:110px;">
									<div id=“clearMenu-btn” class="input-group-addon" onclick="document.getElementById('txtmenuName').value = '';document.getElementById('hidemenuID').value = '';"><i class="fa fa-trash"></i></div>
								</div> -->
								<!-- <label class="search-label search-label-small">用户:</label>
								<div class="input-group search-box search-label-small pull-left">
									<input type="text" id="txtorgName" name="txtorgName" class="form-control input-sm pull-right" placeholder="选择用户" readonly="true" style="width:110px;">
									<div id="clearOrg-btn" class="input-group-addon" onclick="document.getElementById('txtorgName').value = '';document.getElementById('hideuserID').value = '';"><i class="fa fa-trash"></i></div>
								</div> -->
								<%-- <label class="search-label search-label-small labelCommon label-line-h">开始</label>
								<div class="input-group search-box search-label-small pull-left" id="starDate_div">
									<input type="text" class="form-control input-sm  input-small input-log-style" value="<%=txtstarDate%>"   name="starDate" id="starDate">
									<span class="input-group-btn">
										<button class="btn btn-default input-sm calendar-btn" type="button">
											<i class="fa fa-calendar"></i>
										</button>
									</span>
								</div>
								<label class="search-label search-label-small labelCommon label-line-h">结束</label>
								<div class="input-group search-box search-label-small pull-left"  id="endDate_Div">
									<input type="text" class="form-control input-sm  input-small input-log-style" value="<%=txtendDate%>"  name="endDate" id="endDate">
                                    <span class="input-group-btn">
										<button class="btn btn-default input-sm calendar-btn" type="button">
										   <i class="fa fa-calendar"></i>
										</button>
									</span>
								</div> --%>
								<div class="input-group search-box  pull-right">
									<button type="button" class="btn btn-default btnBlue pull-left borderRadius4 mr colorfff" id="Search-btn" data-loading-text="Loading...">
										<i class="fa fa-search "></i>
										查&nbsp;询&nbsp;</button>
								</div>
								<div class="input-group date endTime pull-right mr">
									<label  style="    float: left;margin-right: 10px;line-height: 33px;height: 33px;">-</label>
									<input type="text" value="<%=txtendDate%>" readonly class="inputCommon appsysinfo-m" name="endDate" style="border-radius: 0 !important;width: 100px">
									<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                    </button>
                                    </span>
								</div>
								<div class="date beginTime pull-right mr">
                                    <label class="labelCommon labelBg color666" style="width: 80px!important">登录时间</label>
                                    <input type="text" value="<%=txtstarDate%>" readonly class="appsysinfo-m inputCommon " name="starDate" style="border-radius: 0 !important; width: 100px">
                                    <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                </div>

								<div> 
    								<!-- <input type="hidden" id="hidemenuID" name="hidemenuID" > -->
									<!-- <input type="hidden" id="hideuserID" name="hideuserID" > -->
    							</div>

    							
							</div>						 							 
						</div>						
					</div>
				</div>			
			<div class="dataTables_wrapper no-footer loginlog-m">
				<table class="table table-striped  table-hover"
						   id="log_data">
					<thead>
					<tr class="color333">
						<th width="150px" class="color333">登录时间</th>
						<th width="150px" class="color333">退出时间</th>
						<th class="text-left">操作人</th>
						<th width="100px" class="text-left">登录类型</th>
						<th width="100px">操作</th>
					</tr>
					</thead>
				</table>
			</div>
		</div>
		</div>
	</div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/loginlog/loginlog.css" rel="stylesheet" type="text/css" />
<script src="<%= request.getContextPath()%>/assets/pages/scripts/LoginLog/loginlog.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		loginlog.setPath("<%= request.getContextPath()%>");
		loginlog.init("<%=uuid%>");
	});
	/* function GetOrg(id,name)
	{			
		loginlog.closeOrg(id,name);
	}
	function GetMenu(id,name)
	{
		loginlog.closeMenu(id,name);
	} */
</script>