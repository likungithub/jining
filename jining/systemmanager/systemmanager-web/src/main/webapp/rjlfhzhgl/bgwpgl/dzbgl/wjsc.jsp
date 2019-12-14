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
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">名称</label>
											<input type="text" class="inputCommon appsysinfo-m" id="wjselectname" name="name" placeholder="请输入名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
										</div>
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">文件类型</label>
											<select id="wjselect" name="wjselectlx" class="form-control" style="width: 200px">
												<option value="">请选择</option>
												<option value="1">风采文件</option>
												<option value="2">学习园地</option>
											</select>
										</div>
									</form>
								</div>
								<!--按钮  end-->
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<button id="<%=uuid%>wjsc" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>文件上传</button>
									<button id="<%=uuid%>wjxz" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>文件下载</button>
									<button id="<%=uuid%>seatch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>查询</button>
								</div>
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<button id="<%=uuid%>zdry" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>指定人员</button>
									<button id="<%=uuid%>xzjl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>下载记录</button>
									<button id="<%=uuid%>reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>重置</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<form id="wjscform">
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="wjscwjsc" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left"><input type="checkbox" name="wjscck"  onclick="bigChange(this)"/></th>
							<th class="text-left">文件名</th>
							<th class="text-left">文件类型</th>
							<th class="text-left">操作</th>
						</tr>
						</thead>
						<tbody id="tbody">
						</tbody>
					</table>
				</div>
				</form>
			</div>
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/dzbgl/wjsc.js"></script>
<script type="text/javascript">
	$(function () {
        yqyysyListwjsc.setPath("<%=request.getContextPath()%>")
        yqyysyListwjsc.init("<%=uuid%>")
    })
</script>

