<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
UUID uuid = UUID.randomUUID();
%>
<div class="row basicParamsSet product-360-manager" id="product-manager-container_<%=uuid%>">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="height: 33px;margin: 0 0 15px;">
					<div class="row">
						<div class="col-md-12">
							<button id="btnNew" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">
                                <i class="fa fa-plus"></i>
                                新增
                            </button>
                           <!--  <div class="pull-left">
                                <div class="input-icon" style="width: 190px;">
                                    <i class="fa fa-search btn-icon"></i>
                                    <input type="search" class="form-control border4" id="searchFilter"
                                           placeholder="产品编号/产品名"></div>
                            </div> -->
							<%--<button type="button" class="btn btn-default btnBlue pull-right borderRadius4 mr colorfff" id="searchFilter1" data-loading-text="Loading...">
								<i class="fa fa-search btn-icon"></i>
								查&nbsp;询&nbsp;
							</button>--%>
                            <div class="pull-right mr">
                                <div class="input-icon" style="position: relative;">
                                    <%--<i class="fa fa-search colorBlue-10a0f7"></i>--%>
                                    <input type="search" class="form-control borderRadius4 " id="searchFilter" placeholder="产品编号/产品名" style="padding-right: 47px;width: 220px;padding-left: 10px">
									<i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" id="searchFilter1" style="margin-right: 5px;
																															position: absolute;
																															right: 0px;
																															top: -11px;
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
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-bordered table-hover  public-table"
						   id="product_data">
						<thead>
						<tr class="color333">
							<th width="100px">配置类型</th>
							<th class="text-left">值1</th>
							<th class="text-left">值2</th>
							<th class="text-left">值3</th>
							<th class="text-left">值4</th>
							<th>操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/csxtpz/csxtpz.css" rel="stylesheet" type="text/css" />
<script src="<%= request.getContextPath()%>/assets/pages/scripts/csxtpz/csxtpz.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		product.setPath("<%= request.getContextPath()%>");
		product.init('<%=uuid%>');
	});
</script>

