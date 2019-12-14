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
<form action="#" class="form-horizontal" id="addMenuForm">
    <div class="form-body">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class=" labelCommon labelWidth-col-one color333 labelBg">
                        <span class="required"> * </span> 菜单名称
                    </label>
                    <input type="text" class="form-control inputCommon inputWidth-col-two" name="menuName">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class=" labelCommon labelWidth-col-one color333 labelBg">
                        <span class="required"> * </span> 菜单级别
                    </label>
                    <select id="menuClass" style="width: 200px;height: 33px;">
                        <option value="1">模块</option>
                        <option value="2">菜单</option>
                        <option value="3">按钮</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class=" labelCommon labelWidth-col-one color333 labelBg">
                        <span class="required"> * </span> 菜单UUID
                    </label>
                    <input type="text" class="form-control inputCommon inputWidth-col-two" name="uuid">
                </div>
            </div>
        </div>
        <div class="row" id="modelMenuDiv">
            <div class="col-md-12">
                <div class="form-group">
                    <label class=" labelCommon labelWidth-col-one color333 labelBg">
                        <span class="required"> * </span> 模块菜单
                    </label>
                    <select id="modelMenu" style="width: 200px;height: 33px;">
                    </select>
                </div>
            </div>
        </div>
        <div class="row" id="parentMenuDiv">
            <div class="col-md-12">
                <div class="form-group">
                    <label class=" labelCommon labelWidth-col-one color333 labelBg">
                        <span class="required"> * </span> 上级菜单
                    </label>
                    <select id="parentMenu" style="width: 200px;height: 33px;">
                    </select>
                </div>
            </div>
        </div>
	</div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/roles/addMenu.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
        addMenu.init();
	});
</script>