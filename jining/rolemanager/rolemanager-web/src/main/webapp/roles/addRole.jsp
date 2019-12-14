<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<style>
.modal-dialog {
    width: 400px;
    margin: 30px auto;
}
.labelBg {
    margin-left: 40px;
    }
</style>
<form action="#" class="form-horizontal" id="addRoleForm">
    <div class="form-body">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class=" labelCommon labelWidth-col-one color333 labelBg">
                        <span class="required"> * </span> 角色名称
                    </label>
                    <input type="text" class="form-control inputCommon inputWidth-col-two" name="roleName" maxlength="100">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class=" labelCommon labelWidth-col-one color333 labelBg">备注</label>
                    <input type="text" class="form-control inputCommon inputWidth-col-two" name="roleRemark" maxlength="300">
                </div>
            </div>
        </div>
	</div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/roles/addRole.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		addRole.init();
	});
</script>