<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
	String txtstarDate=format.format(new Date());
%>
<head>
	<link rel="stylesheet" href="<%= request.getContextPath()%>/assets/pages/css/shortmessage/shortmessage.css">
</head>
<div id="shortmessage">
<div class="row">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-title" style="display: none;"><span class="caption-subject bold uppercase">短息日志列表</span></div>
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="height: 33px;margin: 0 0 15px">
					<div class="row">
						<div class="col-md-12">
							<button id="deleteAllShortMessage" class="btn btn-default btnBlue colorfff borderRadius4">
								<i class="icon iconfont icon-shanchu  iconFontSize"></i>
								批量删除
							</button>

							<img style="    margin-right: 10px;vertical-align: middle;margin-top: 12px;" class="rotate1 pull-right" src="/statisticalanalysis/assets/pages/img/arrow.png" alt="arrow">
							<p class="moreChoice pull-right mr" data="0" style="padding: 0;height: 33px;line-height: 33px;cursor: pointer;margin: 0" id="moreBywsAndMdw">更多</p>
							<form id="searchByTime" class="clearfix pull-right" style="width: 218px">
								<div id="searchByNsrsbh" class="pull-left" style="position: relative;">
									<%--<label class="labelCommon labelWidth-col-one labelBg color666 ">纳税人识别号/名称--%>
									<%--</label>--%>
									<input placeholder="接收人电话/发送人代码" type="text" class="borderRR mr" id="searchByNsrsbhText" style="padding-right: 47px;text-indent: 10px;width: 210px;height: 33px;border:1px solid #ccc" />
									<i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" id="findByZdy" style="margin-right: 5px;
																														position: absolute;
																														right: 6px;
																														top: 0;
																														cursor: pointer;
																														height: 33px;
																														line-height: 33px;
																														width: 45px;
																														text-align: center;
																														border-left: 1px solid #dedede;
																														font-size: 20px!important;"></i>
								</div>
<%--
								<div
										class="input-group date search-box  pull-left">
									<button type="button"
											class="btn btn-default borderRadius4 btnBlue colorfff "
											id="findByZdy" data-loading-text="Loading...">
										<i class="fa fa-search btn-icon"></i> 查&nbsp;询&nbsp;
									</button>
								</div>--%>
								<%--<div id="reInitShortMessage" class="pull-left">
									<button id="reInitShortMessageBtn" class="btn btn-default btnBlue borderRadius4 colorfff">
										<i class="fa fa-refresh"></i>
										重置
									</button>
								</div>--%>
							</form>

							<!-- <div class="col-md-12">
										<button id="openModelAdvance">增加</button>
									</div> -->
						</div>
						<div class="col-md-12" id="shortmessageinfowrap" style="margin-top: 15px;padding: 15px;width: 626px;border: 1px solid #dadada; float: right;border-radius: 4px!important;display: none">

							<label class="labelCommon labelWidth-col-one labelBg color666 dateLabel-m">
								<!-- <span class="colorRed">*</span> --> 开始
							</label>
							<div class="input-group date search-box search-label-small pull-left mr"
								 id="starDate_div">
								<input type="text" class="form-control   inputsmall datePikerInput"
									   value="<%=txtstarDate%>" name="beginTime"
									   id="beginTime" style="height: 33px;width: 100px">
								<div class="input-group-addon calendarIcon borderRR" style="border-radius: 0 4px 4px 0!important">
									<span class="fa fa-calendar"></span>
								</div>
							</div>


							<label class="labelCommon labelWidth-col-one labelBg color666 dateLabel-m">
								<!-- <span class="colorRed">*</span> --> 结束
							</label>


							<div class="input-group date search-box search-label-small pull-left mr"
								 id="starDate_div1" >
								<input type="text" class="form-control   inputsmall datePikerInput"
									   name="endTime"
									   id="endTime" style="width: 100px;height: 33px;">

								<div class="input-group-addon calendarIcon borderRR"  style="border-radius: 0 4px 4px 0!important">
									<span class="fa fa-calendar"></span>
								</div>
							</div>

							<div class="select pull-left mr">
								<select id="shortMessageType" style="height: 33px;border-radius: 4px!important;width: 166px;">
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-bordered table-hover"
						   id="shortmessage_data">
						<thead>
						<tr>
							<th width="44px"><input type="checkbox" id="allshortmessagecheck"></th>
							<th width="60px">ID</th>
							<%--<th width="10%">纳税人识别号</th>--%>
							<%--<th width="10%">接收人代码</th>--%>
							<th width="120px">接收人电话</th>
							<th width="120px">发送人代码</th>
							<%--<th width="10%">代理机构编码</th>--%>
							<%--<th width="10%">短信类型</th>--%>
							<th>短信内容</th>
							<th width="80px">发送状态</th>
							<th width="80px">发送时间</th>
							<th width="100px">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/shortmessage/shortmessage.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		employee.setPath("<%= request.getContextPath()%>");
		employee.init();
	});
</script>