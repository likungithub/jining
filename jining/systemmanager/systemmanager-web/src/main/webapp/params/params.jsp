<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
UUID uuid = UUID.randomUUID();
%>

<style>
	#page-container #params_data_info{
		height:30px !important;
		line-height:20px !important;
	}
</style>
<div class="row contentBgColor" id="params-manager-container_<%=uuid%>">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="height: 33px;margin: 0 0 15px;">
					<div class="row">
						<div class="col-md-12" style="padding-left: 0">
							<button id="btnNew" class="btn btn-default btnAdd pull-left borderRadius4 mr colorfff">
                                <i class="fa fa-plus"></i>
                                新增
                            </button>

							<%--<button type="button" class="btn btn-default btnBlue pull-right borderRadius4 mr colorfff" id="searchFilter1" data-loading-text="Loading...">
								<i class="fa fa-search btn-icon"></i>
								查&nbsp;询&nbsp;
							</button>--%>
                            <div class="pull-right">
                                <div class="input-icon" style="width:222px;position: relative">
                                    <%--<i class="fa fa-search btn-icon colorBlue-10a0f7"></i>--%>
                                    <input type="search" class="form-control  borderRadius4" id="searchFilter"
                                           placeholder="类型名称/参数名称/代码" style="padding-right: 50px;width: 220px;padding-left: 10px"></div>
								<i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" id="searchFilter1" style="margin-right: 5px;
																															position: absolute;
																															right: 15px;
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
				<div class="dataTables_wrapper no-footer" id="common-basic-params">
					<table class="table table-striped table-hover paramsTab"
						   id="params_data">
						<thead>
						<tr class="color333">
							<th width="20%">参数类型</th>
							<th width="20%">类型名称</th>
							<th width="20%">参数名称</th>
							<th width="20%">代理机构编码</th>
							<th width="20%">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/params/params.css" rel="stylesheet" type="text/css" />
<script src="<%= request.getContextPath()%>/assets/pages/scripts/params/params.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		params.setPath("<%= request.getContextPath()%>");
		params.init('<%=uuid%>');
	});
</script>

