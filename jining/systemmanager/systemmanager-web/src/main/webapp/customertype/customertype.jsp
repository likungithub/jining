<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
UUID uuid = UUID.randomUUID();
%>
<div id="customertype-manager-container_<%=uuid%>">
<style>
	.customertype-manager-containe input::-ms-clear{display:none;}
	#page-container #customertype_data_info{
		height:30px !important;
		line-height:20px !important;
	}
</style>
<div id="customertype-manager-container_<%=uuid%>" class="customertype-manager-containe">
	<div class="col-md-12" style="padding: 0">
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 15px">
					<div class="row">
						<div class="col-md-12">
							<button id="addCustomertype"  class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">
								<i class="fa fa-plus"></i>
								新增
							</button>
                            <div class="pull-right">
                                <div class="input-icon" style="position: relative">
                                    <input style="width: 220px;padding-left: 15px;padding-right: 47px" type="search" class="form-control borderRadius4 pull-left" id="searchFilter" placeholder="客户分类名称">
									<i class="fa fa-search colorBlue-10a0f7 searchIcoBtn"id="searchFilterBtn" style="margin-right: 5px;
                                                                                                                                        position: absolute;
                                                                                                                                        right: -6px;
                                                                                                                                        top: -11px;
                                                                                                                                        cursor: pointer;
                                                                                                                                        height: 33px;
                                                                                                                                        line-height: 33px;
                                                                                                                                        width: 45px;
                                                                                                                                        text-align: center;
                                                                                                                                        border-left: 1px solid #dedede;
                                                                                                                                        font-size: 20px!important;"></i>
									<%--<button class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left" id="searchFilterBtn">  <i class="fa fa-search iconMr"></i> 搜索</button>--%>
                                </div>

                            </div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover customertype-table"
						   id="customertype_data">
						<thead>
						<tr class="color333">
							<th class="text-left">客户分类名称</th>
							<th>操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/customertype/customertype.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		customertype.setPath("<%= request.getContextPath()%>");
		customertype.init('<%=uuid%>');
	});
</script>

