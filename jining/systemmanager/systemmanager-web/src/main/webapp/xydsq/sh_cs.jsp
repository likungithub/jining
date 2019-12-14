<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
    String id = request.getParameter("sqid");
	if (id == null) {
		id = "";
	}
	String sh = request.getParameter("sh");
    if (sh == null) {
        sh = "";
    }
%>
<style>
.modal-dialog{
    width:600px;
}
.shyj{
    resize:none;height: 80px;
    width: 418px;
    border: 1px solid #ccc;
    border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;padding:10px;
}
</style>
<form id="chargeaudit_m"  action="#" class="form form-horizontal">
    <div class="form-body">
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666 pull-left"><span class="colorRed">*</span>审核状态</label>
                    <div class="radio-list pull-left" data-error-container="#form_sex_error" style="margin-left: 50px">
                        <label class="radio-inline">
                            <input type="radio" name="splxCs" checked value="1"> 同意
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="splxCs" value="2"> 不同意
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666" style="height: 80px !important;line-height: 80px;">
                        审核意见
                    </label>
                    <textarea name="spyjCs" maxlength="500" class="shyj" placeholder="请输入审核意见"></textarea>
                </div>
            </div>
        </div>
        </div>
        </form>
<script
	src="<%=request.getContextPath()%>/assets/pages/scripts/xydsq/cssh.js"
	type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
        cssh_CS.setPath('<%=request.getContextPath()%>');
        cssh_CS.init('<%=id%>','<%=sh%>');
	}); 
</script>