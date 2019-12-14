<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="row" id="customer-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-body">
				<div class="table-toolbar">
					<button id="sh" class="btn btn-default btnAdd pull-left borderRadius4  colorfff">
						<i class="fa fa-plus"></i> 通过
					</button>
                    <div class="pull-right">
                        <div class="input-icon" style="width: 190px;">
                            <i class="fa fa-search"></i>
                            <input type="search" class="form-control borderRadius4" id="customerSearch" placeholder="编号/客户名称">
                        </div>
                    </div>
				</div>
				<table class="table table-striped table-bordered table-hover" width="100%" cellspacing="0" id="customer_data">
					<thead>
						<tr>
						    <th width="2%"><input type="checkbox" name="selectCustomer" /></th>
							<th width="200px">编号</th>
							<th>客户名称</th>
							<th>税号</th>
							<th>联系方式</th>
							<th width="180px">进度</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</div>

<script
	src="<%= request.getContextPath()%>/assets/pages/scripts/customer/list.js"
	type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		customerList.setPath('<%= request.getContextPath()%>');
		customerList.init();
	});
</script>