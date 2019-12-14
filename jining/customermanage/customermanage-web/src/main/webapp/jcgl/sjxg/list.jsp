<%@page import="java.util.UUID"%>
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
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="height: 33px;margin: 0 0 15px;">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="padding-bottom: 10px;">
								<div style="float: right;width:100%;">
									<div class="col-md-6b " style="padding: 0">
										<%--<button id="<%=uuid%>btn_sjxg_tg" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">
											修改
										</button>--%>
										<button style="margin-left: 10px" id="<%=uuid%>btn_sjxg_tg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-wrench iconMr"></i>修改
										</button>
										<%--<button style="margin-left: 10px" id="<%=uuid%>btn_sjxg_btg" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">
											不通过
										</button>--%>
									</div>

									<%--<div id="searchTerm-m" class="input-group  pull-right" style="margin-left: 10px">
										<button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr Search-btn" style="height:33px;" data-loading-text="Loading...">
											<i class="fa fa-search "></i>
											查&nbsp;询&nbsp;</button>
									</div>--%>

									<div class="input-group  search-label-small pull-right" style="position: relative">
										<input type="text" class="inputCommon input-sm  input-small borderRadius4" name="ypmc" id="ypmc" style="padding-right: 47px;margin-right: 14px;text-indent:0px !important;width:220px!important;font-size:12px !important;" placeholder="请输入样品名称" />
										<i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" id="searchTerm-m" style="margin-right: 5px;
																																position: absolute;
																																right: 10px;
																																top: 0px;
																																cursor: pointer;
																																height: 33px;
																																line-height: 33px;
																																width: 45px;
																																text-align: center;
																																border-left: 1px solid #dedede;
																																font-size: 20px!important;"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="<%=uuid%>ManagerList_m" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left"><input type="checkbox" name="rwfp_checkbox"/>
							</th>
							<th class="text-left">合同名称</th>
							<th class="text-left">样品编号</th>
							<th class="text-left">样品名称</th>
							<th class="text-left">检测项目名称</th>
							<th class="text-left">数据出具日期</th>
							<th class="text-left">委托单位名称</th>
							<th class="text-left">委托单位所属省</th>
							<th class="text-left">所属市</th>
							<th class="text-left">所属县</th>
							<%--<th class="text-left">状态</th>--%>
							<th width="150px" class="text-center" style="display: none">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/jcgl/sjxg/list.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        list.setPath("<%= request.getContextPath()%>");
        list.init('<%=uuid%>');
    });
</script>