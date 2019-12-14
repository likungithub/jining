<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
	#page-container #customergettingstarted_data_info{
		height:30px !important;
		line-height:20px !important;
	}
</style>
<div class="row" id="wangshuo1" style="margin: 0">
	<div class="col-md-12" style="padding: 0">
		<div class="portlet light " style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="">
					<div class="row">
						<div class="col-md-12">
							<span id="btnisexit">
								<os:hasSecurityResource identifier="uploadCustomergettingstartedBtn">
								   <button id="ftpshangchuan123" class="btn btn-default btnAdd pull-left borderRadius4 mr colorfff">
									<i class="fa fa-plus"></i>
									上传文件
								  </button>
								<%--<div class="pull-left h4">点击链接进行下载</div>--%>
								</os:hasSecurityResource>
							</span>
							<a href="<%=request.getContextPath()%>/mediaHelp.jsp" target="_blank" class="btn btn-default btnAdd pull-left borderRadius4 mr colorfff">
								<i class="fa fa-video-camera"></i>
								视频教程
							</a>
						</div>
					</div>
				</div>
				
					<os:hasSecurityResource identifier="updateCustomergettingstartedBtn">
					<div id="updateCustomergettingstartedBtn"></div>
					</os:hasSecurityResource>
					<os:hasSecurityResource identifier="deleteCustomergettingstartedBtn">
					<div id="deleteCustomergettingstartedBtn"></div>
					</os:hasSecurityResource>
					
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover" id="customergettingstarted_data" style="margin-top: 15px!important">
						<thead>
						<tr class="color333">
							<th >文件名</th>
							<th>文件描述</th>
							<th width="100px">文件上传日期</th>
							<%--<th>纳税人识别号</th>--%>
							<%--<th >代理机构编码</th>--%>
							<th >操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/customergettingstarted/customergettingstarted.css" rel="stylesheet" type="text/css" />
<script src="<%= request.getContextPath()%>/assets/pages/scripts/customergettingstarted/customergettingstarted.js" type="text/javascript"></script>

<script type="text/javascript">
	$(function () {
		customergettingstarted.setPath("<%= request.getContextPath()%>");
		customergettingstarted.init();
	});
</script>