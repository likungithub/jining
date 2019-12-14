<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
    String id = request.getParameter("id");
			if (id == null) {
				id = "";
			}
	out.println(id);
%>

<style>
.modal-content{
    width:1200px;
}
</style>
<form action="#" id="customerForm" class="form form-horizontal">
	<div class="form-body">
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-2">客户名称： </label>
                    <div class="col-md-10">
                        <input type="text" class="form-control" name="name">
                    </div>
				</div>   
			</div>
		</div>
		<div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="control-label col-md-2">客户账户： </label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name="yhzh">
                    </div>
                    <label class="control-label col-md-2">企业logo： </label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name="logo">
                    </div>
                </div>   
            </div>
        </div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-2">注册日期： </label>
					<div class="col-md-4">
						<div class="input-group date createDate">
							<input type="text" class="form-control" readonly
								name="createDate"> <span class="input-group-btn">
								<button class="btn default" type="button">
									<i class="fa fa-calendar"></i>
								</button>
							</span>
						</div>
					</div>
					<label class="control-label col-md-2">是否启用：</label>
                    <div class="col-md-4">
                        <div class="radio-list" data-error-container="#form_enable_error">
                            <label class="radio-inline"> <input type="radio"
                                name="state" value="true"> 是
                            </label> <label class="radio-inline"> <input type="radio"
                                name="state" value="false"> 否
                            </label>
                        </div>
                        <div id="form_enable_error"></div>
                    </div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-2">企业类型： </label>
					<div class="col-md-4">
						<input type="text" class="form-control" name="qylxDm">
					</div>
					<label class="control-label col-md-2">手机： </label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name="sjhm">
                    </div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-2">公司税号： </label>
					<div class="col-md-4">
						<input type="text" class="form-control" name="nsrsbh">
					</div>
					<label class="control-label col-md-2">员工编号： </label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name="zydm">
                    </div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-2">省份： </label>
					<div class="col-md-4">
						<input type="text" class="form-control" name="szsf">
					</div>
					<label class="control-label col-md-2">城市： </label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name="szcs">
                    </div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-2">email： </label>
					<div class="col-md-4">
						<input type="text" class="form-control" name="email">
					</div>
					<label class="control-label col-md-2">用户状态： </label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name="yhztDm">
                    </div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-2">备注信息： </label>
                    <div class="col-md-10">
                        <input type="text" class="form-control" name="bzxx">
                    </div>
				</div>
			</div>
		</div>
	</div>
</form>
<script
	src="<%=request.getContextPath()%>/assets/pages/scripts/customer/addCustomer.js"
	type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
			customerAdd.setPath('<%=request.getContextPath()%>');
			customerAdd.init('<%=id%>');
	});
</script>