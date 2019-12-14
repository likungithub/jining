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
		line-height:25px !important;
	}
</style>
<div class="row contentBgColor operate-log-search-count" id="log_id_div_<%=uuid %>">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="height: 33px;margin:0 0 15px;">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body">
								<div class="input-group search-box  pull-right" style="width: 80px">
									<button type="button" class="btn btn-default btnBlue pull-left borderRadius4 colorfff" id="Search-btn" data-loading-text="Loading...">
										<i class="fa fa-search btn-icon"></i>
										查&nbsp;询&nbsp;</button>
								</div>
								<div class="input-group date endTime pull-right mr">
									<label style="height: 33px;line-height: 33px" class="mr pull-left">-</label>
									<input type="text" value="<%=txtendDate%>" readonly class="inputCommon appsysinfo-m" name="endDate" style="border-radius: 0 !important;width: 100px">
									<span>
										<button class="btn btn-default appsysinfobtn-m" type="button" style="height: 33px;border-radius: 0 4px 4px 0!important;">
	                                		<i class="fa fa-calendar"></i>
	                               		 </button>
	                                </span>
								</div>
								<div class="date beginTime pull-right mr">
	                                <label class="labelCommon labelBg color666 dateLabel-m">日期</label>
	                                <input type="text" value="<%=txtstarDate%>" readonly class="appsysinfo-m inputCommon " name="starDate" style="border-radius: 0 !important;width: 100px">
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
			<div class="dataTables_wrapper no-footer">
				<table class="table table-striped table-hover"
						   id="log_data">
						<thead>
						<tr class="color333">
							<th width="150px">日期</th>
							<th class="text-left">内容</th>
							<th width="200px">公司名称</th>
							<th width="150px">操作人</th>
							<th width="100px">操作</th>
						</tr>
						</thead>
					</table>
			</div>
		</div>
		</div>
	</div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/operatelog/log.css" rel="stylesheet" type="text/css" />
<script src="<%= request.getContextPath()%>/assets/pages/scripts/Log/log.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		log.setPath("<%= request.getContextPath()%>");
		log.init("<%=uuid %>");
	});
/* 	function GetOrg(id,name)
	{			
		log.closeOrg(id,name);
	}
	function GetMenu(id,name)
	{
		log.closeMenu(id,name);
	} */
</script>