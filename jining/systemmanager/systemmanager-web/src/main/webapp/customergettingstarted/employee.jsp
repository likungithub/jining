<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div class="row">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-title"><span class="caption-subject bold uppercase">雇员信息列表</span></div>
			<div class="portlet-body">
				<div class="table-toolbar">
					<div class="row">
						<div class="col-md-12">
							<button id="btnNew" class="btn sbold green"> 新增雇员
								<i class="fa fa-plus"></i>
							</button>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-bordered table-hover"
						   id="employee_data">
						<thead>
						<tr>
							<th width="27%">姓名</th>
							<th width="25%">编号</th>
							<th width="10%">性别</th>
							<th width="10%">年龄</th>
							<th width="15%">生日</th>
							<th width="13%">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/systemmanager/employee.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		employee.setPath("<%= request.getContextPath()%>");
		employee.init();
	});
</script>