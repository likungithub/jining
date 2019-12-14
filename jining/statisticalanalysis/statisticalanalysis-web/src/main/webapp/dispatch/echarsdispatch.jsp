<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="com.xinhai.security.api.CurrentLoginUser" %>
<%
	boolean ifManager = CurrentLoginUser.getUser().isIfManager();
%>
<style>
	#wrapEchartsGLY
	{
		background:#F4F9F8;
	}
	#wrapEchartsGLY .echarstop,#wrapEcharts .echarstyesday{
		margin: 30px 10px;
		/*border: 1px solid #DFDFDF;*/
		box-shadow: 1px 1px 4px #DFDFDF;
		background: #ffffff;
	}

	#wrapEchartsGLY  .taskExecution,.taskExecution1{
		width: 95%;
		height: 230px;
		/*margin: 10px 0;*/
		float: left;
		/* border: 1px solid #666; */
	}
	#wrapEchartsGLY .taskExecution_right{
		float: left;
		width: 25%;
		background: #f4f4f4;
		/* margin: 25px 0; */
		padding: 14px 10px;
		margin-bottom: 0;
		height: 99%;

	}
	#wrapEchartsGLY   .taskExecution_top{
		width: 100%;
		height: 45px;
		color: #656565;
		font-size: 18px;
		line-height: 45px;
		padding-left: 10px;

	}
	#wrapEchartsGLY    .taskExecution_top span{
		font-size: 16px;

	}
	#wrapEchartsGLY    .taskExecution_top span b{
		font-size: 20px;
		color: #7bc14d;
	}
	#wrapEchartsGLY   .taskExecution_main,.taskExecution_main1{
		width: 424px;
		height: 285px;
		margin-top: 20px;
	}
	#wrapEchartsGLY   .taskExecution_right li{
		border-bottom: 1px solid #d8d8d8;
		padding: 5px 5px;
		height: 14%;
		line-height: 22px;
	}
	#wrapEchartsGLY   .taskExecution_right li:hover{
		cursor: pointer;
	}
	#wrapEchartsGLY   .taskExecution_right li p:nth-child(1){
		width: 50%;
		text-align: right;
		color: #828282;
		margin-right: 25px;
	}
	#wrapEchartsGLY   .taskExecution_right li p{
		float: left;
		margin: 0;
	}
	#wrapEchartsGLY   .taskExecution_right li p:nth-child(2){
		font-size: 18px;
		float: right;
	}
	#wrapEchartsGLY   .taskExecution_right li:nth-child(1) p:nth-child(2){
		color: #666666;
	}
	#wrapEchartsGLY   .taskExecution_right li:nth-child(2) p:nth-child(2){ /*已完成*/
		color: #97cf6e;
	}
	#wrapEchartsGLY   .taskExecution_right li:nth-child(3) p:nth-child(2){ /*进行中*/
		color: #4ca7ee;
	}
	#wrapEchartsGLY   .taskExecution_right li:nth-child(4) p:nth-child(2){ /*已延迟*/
		color: #f23a42;
	}
	#wrapEchartsGLY  .taskExecution_right li:nth-child(5) p:nth-child(2){ /*未开始*/
		color: #fa9700;
	}
	#wrapEchartsGLY  .taskExecution_right li:nth-child(6) p:nth-child(2){ /*暂停中*/
		color: #fc5be3;
	}
	#wrapEchartsGLY  .taskExecution_right li:nth-child(7) p:nth-child(2){ /*已取消*/
		color: #ccc; /* 828282 */
	}
	.clickSwitch{
		width: 52px;
		border:1px solid #ccc;
		padding:0;
		margin-bottom: -5px;
		margin-top: 10px;
		border-radius: 4px!important;
		margin-right: 10px;
	}
	.clickSwitch li{
		float: left;
		width: 25px;
		height: 25px;
		text-align: center;
		line-height: 25px;
	}
	#wrapEchartsGLY .pgSearch {
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
	#wrapEchartsGLY .pgSearch input {
		width: 250px;
		height: 33px;
		float: left;
		border: 0;
		padding-left: 10px;
		outline: none;
	}
	#wrapEchartsGLY .pgSearch button {
		height: 33px;
		width: 60px;
		padding: 0;
		border: 0;
		border-left: 1px solid rgb(204, 204, 204);
		background: #f6f6f6;
		color: #555;
		position: relative;
	}


	.positionSpan>span{
		display: block;
		width: 0;
		height: 0;
		border-width: 10px;
		border-style: solid;
		border-color:#CACACA transparent transparent transparent  ;
		position: absolute;
		top: 32px;
		right: 116px;
	}
	.positionSpan>span>em{
		display: block;
		width: 0;
		height: 0;
		border-width: 10px;
		border-style: solid;
		border-color: #f6f6f6 transparent transparent transparent ;
		position: absolute;
		top: -12px;
		left: -10px;
	}
	#pgSearch_btn{
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
	}
	#wrapEchartsGLY  .rotate1 {
		transform: rotate(180deg);
	}
	#wrapEchartsGLY .openMore{
		padding: 25px 20px;
		/*width: 40%;*/
		margin: 10px;
		border: 1px solid #ccc;
		/*margin-top: 20px;*/
		border-radius: 5px!important;
		display: none;
		float: right;
		margin-right: 18px;

	}
	#PGtableMain_data{
		width: 100%!important;
	}
</style>

	<div class="container-fluid" id="wrapEchartsGLY">
		<div class="echarstop  row" >

			<div class="top col-xs-12">
				<ul style="float: right" class="clickSwitch">
					<li data="0" style="border-right: 1px solid #ccc;background: #F4F4F4"><a href="javascript:;"><i style="color: #666;" class="iconfont icon-tubiao iconFontSize"></i></a></li>
					<li data="1"><a href="javascript:;"><i style="color: #ccc;" class="fa fa-outdent iconMr"></i></a></li>
				</ul>
			</div>

			<div class="chartsMain">
				<%-- 管理员查看图表 --%>
				<div class="chartsMain_admin">
					<div class="top col-xs-12">
						<div style="border: 1px solid #ccc;margin: 10px 10px;height: 320px;">
							<div class="clearfix" style="border-bottom: 1px solid #dedede;padding: 5px 10px">
								<h4 class="pull-left">各部门派工工作量统计</h4>
								<button type="button" class="btn btn-default pull-right pgdaterange-Mbtn" name="pgdaterange-Mbtn2">
								<span>
								  	<i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
									<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
								</button>
							</div>
							<div id='echarstop'style="height: 260px;width: 100%;padding-left:0 "  class="col-xs-6"></div>
						</div>
					</div>
					<div class="col-lg-6 charts">
						<div style="border: 1px solid #ccc;margin: 10px 10px;height: 370px;">
							<div class="clearfix" style="border-bottom: 1px solid #dedede;padding: 5px 10px">
								<h4 class="pull-left">各部门派工占比情况（按部门）</h4>
								<button type="button" class="btn btn-default pull-right pgdaterange-Mbtn" name="pgdaterange-Mbtn3">
								<span>
								  	<i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
									<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
								</button>
							</div>
							<div class="taskExecution">
								<div class="taskExecution_main">
								</div>
							</div>
							<div style="clear: both"></div>
						</div>
					</div>
					<div class="col-lg-6 charts">
						<div style="border: 1px solid #ccc;margin: 10px 10px;height: 370px;">
							<div class="clearfix" style="border-bottom: 1px solid #dedede;padding: 5px 10px">
								<h4 class="pull-left">各部门派工占比情况（按角色）</h4>
								<button type="button" class="btn btn-default pull-right pgdaterange-Mbtn" name="pgdaterange-Mbtn4">
								<span>
								  	<i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
									<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
								</button>
							</div>
							<div class="taskExecution1">
								<div class="taskExecution_main1">
								</div>
							</div>
							<div style="clear: both"></div>
						</div>
					</div>
					<div class="col-xs-12">
						<div  style="border: 1px solid #ccc;margin: 10px 10px;height: 320px;">
							<div class="clearfix" style="border-bottom: 1px solid #dedede;padding: 5px 10px">
								<h4 class="pull-left">员工工作量前十名统计</h4>
								<button type="button" class="btn btn-default pull-right pgdaterange-Mbtn" name="pgdaterange-Mbtn5">
								<span>
								  	<i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
									<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
								</button>
							</div>
							<div class="userWorkNum" style="height: 260px;width: 100%;padding-left:0 "  class="col-xs-6"></div>
						</div>
					</div>
				</div>

				<%-- 普通员工查看图表 --%>
				<div class="chartsMain_KJ">
					<div class="top col-xs-12">
						<div style="border: 1px solid #ccc;margin: 10px 10px;height: 320px;">
							<div class="clearfix" style="border-bottom: 1px solid #dedede;padding: 5px 10px">
								<h4 class="pull-left">派工情况情况</h4>
								<button type="button" class="btn btn-default pull-right pgdaterange-Mbtn" name="pgdaterange-Mbtn1">
							<span>
							  <i class="icon iconfont icon-calendar1"></i> 日期选择
							</span>
									<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
								</button>
							</div>
							<div id='sevenPG'style="height: 260px;width: 100%;padding-left:0 "  class="col-xs-6"></div>
						</div>
					</div>
				</div>
			</div>

			<%-- 派工数据表格 --%>
			<div class="tableMain" style="display: none;margin-top: 50px;">
				<div class="col-md-12" style="float: right;">
					<button name="exportExcel" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4  pull-left mr">
						<i class="icon iconfont icon-daochu"></i> 导出
					</button>
					<div class="pull-right">
						<div class="pgSearch" style="position: relative;">
							<input type="text" class="query" style="float: left;padding-right: 45px;" placeholder="请输入公司名称进行搜索" name="searchtxt">
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
						<div style="float: left;margin-right: 10px">
							<button data="0" type="button" id="pgSearch_btn" data-loading-text="Loading..." style="outline: none" class="iconFontColor-10a0f7">
								更多
							</button>
							<img style="    margin-right: 10px;vertical-align: middle;margin-top: 12px;" class="rotate1" src="<%= request.getContextPath()%>/assets/pages/img/arrow.png" alt="arrow">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="openMore" style="">
							<div class="date beginTime pull-left">
								<label class="labelCommon labelBg color666 dateLabel-m" style="">派工时间</label>
								<input type="text" readonly class="appsysinfo-m inputCommon starDate" name="starDate" style="border-radius: 0 !important; width: 100px">
								<span>
									<button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
										<i class="fa fa-calendar"></i>
									</button>
								</span>
							</div>
							<span style="float: left;margin: 5px">-</span>
							<div class="input-group date endTime pull-left">
								<input type="text" readonly class="inputCommon appsysinfo-m endDate" name="endDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
								<span>
									<button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
										<i class="fa fa-calendar"></i>
									</button>
								</span>
							</div>
							<label class="labelCommon" style="width:80px !important;    margin-left: 16px;">派工部门</label>
							<div class="input-group  search-label-small pull-left">
								<select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="PGBM">
								</select>
							</div>
							<label class="labelCommon" style="width:80px !important;    margin-left: 16px;">派工角色</label>
							<div class="input-group  search-label-small pull-left">
								<select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="PGJS">
								</select>
							</div>
							<div style="clear: both"></div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer" style="padding: 10px;">
					<table class="table table-striped table-bordered table-hover" id="PGtableMain_data" style="">
						<thead>
							<tr>
								<th class="text-left">客户名称</th>
								<th width="5%">职员名称</th>
								<th width="14%">派工角色</th>
								<th width="6%">所属部门</th>
								<th width="10%">派工时间</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
	<script src="<%=request.getContextPath()%>/assets/pages/scripts/dispatch/echarsdispatch.js" type="text/javascript"></script>
	<script type="text/javascript">
		 $(function () {
			echarsDispatch.setPath("<%=request.getContextPath()%>");
			echarsDispatch.init('<%=ifManager%>');
		}); 
	</script>
</html>