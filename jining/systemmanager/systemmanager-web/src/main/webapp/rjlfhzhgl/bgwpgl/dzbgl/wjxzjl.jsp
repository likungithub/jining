<%@page import="java.util.UUID"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
	.rotate1 {
		transform: rotate(180deg);
	}
</style>
<%
	String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<form id="findByName">

									</form>
								</div>
								<!--按钮  end-->

							</div>
						</div>
					</div>
				</div>
				<form id="wjxzjlform">
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="wjxzjlwjxzjl" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left"><input type="checkbox" name="wjxzjlck"  onclick="bigChange(this)"/></th>
							<th class="text-left">文件名</th>
							<th class="text-left">姓名</th>
							<th class="text-left">下载时间</th>
						</tr>
						</thead>
					</table>
				</div>
				</form>
			</div>
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/dzbgl/wjxzjl.js"></script>
<script type="text/javascript">
	$(function () {
        yqyysyListwjxzjl.setPath("<%=request.getContextPath()%>")
        yqyysyListwjxzjl.init("<%=uuid%>")
    })
</script>

