<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
    String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<style>
.modal-dialog{
    width:600px;
}
.shyj{
    resize:none;height: 80px;
    width: 416px;
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
                    <div class="radio-list pull-left" data-error-container="#form_sex_error" style="height: 33px; border: 1px solid #ddd; width: 417px;border-radius: 0 4px 4px 0!important;text-indent: 55px;">
                        <label class="radio-inline">
                            <input type="radio" name="shzt" value="001">同&nbsp;&nbsp;&nbsp;意
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="shzt" value="002"> 不同意
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666 pull-left"><span class="colorRed">*</span>收费确认</label>
                    <div class="radio-list pull-left" data-error-container="#form_sex_error" style="height: 33px; border: 1px solid #ddd; width: 417px;border-radius: 0 4px 4px 0!important;text-indent: 55px;">
                        <label class="radio-inline">
                            <input type="radio" name="confirm" value="004"> 已到账
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="confirm" value="001"> 未到账
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
                    <textarea name="shyj" maxlength="500" class="shyj" placeholder="请输入审核意见"></textarea>
                    <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right: 0px;bottom: -16px;text-align: right;">剩余<span class="num" style="color: red;">300</span>个字符</p>
                </div>
            </div>
        </div>
        </div>
        </form>
<script
	src="<%=request.getContextPath()%>/assets/pages/scripts/chargeaudit/audit.js"
	type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		orderaudit.setPath('<%=request.getContextPath()%>');
		orderaudit.init('<%=id%>');
	}); 
</script>