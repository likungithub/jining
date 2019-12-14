<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
    String htbm = request.getParameter("htbm");
    String batchSign = request.getParameter("batchSign");
	if (htbm == null) {
		htbm = "";
	}
    if (batchSign == null) {
        batchSign = "";
    }
%>
<style>
.modal-dialog{
    width:600px;
}
.shyj{
    resize:none;height: 80px;
    width:540px;
    border: 1px solid #ccc;
    border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;padding:10px;
}
</style>

<div class="container-fluid" id="reviewContractInfo_m">
    <div class="row infoDis">
        <div class="col-sm-12">
            <span class="pull-right contractNum"></span>
        </div>
        <div class="col-sm-12">
            <div class="customerName text-center h3"></div>
        </div>
        <div class="col-sm-12 form-group">
            <span class="mr h5 color999">收费项目</span>
            <span class="chargePro"></span>
        </div>
        <div class="col-sm-12 form-group">
            <span class="mr h5 color999">收费金额</span>
            <span class="chargeMoney"></span>
        </div>
        <div class="col-sm-12 form-group">
            <span class="mr h5 color999">总金额&nbsp;&nbsp;&nbsp;</span>
            <span class="chargeTotalMoney"></span>
        </div>
        <div class="col-sm-12 form-group">
            <span class="mr h5 color999">服务期限</span>
            <span class="serviceL"></span>
        </div>
        <div class="col-sm-12 form-group">
            <span class="mr h5 color999">付款方式</span>
            <span class="payMethods"></span>
        </div>
        <div class="col-sm-12 form-group">
            <div class="h5 color999" style="margin-bottom: 10px">特别事项</div>
            <div class="specialMarks" style="word-wrap: break-word;word-break: normal;white-space: normal;">
            </div>
        </div>
        <div class="col-sm-12 form-group fileDiv display-hide">
            <div class="h5 color999" style="margin-bottom: 10px">附件</div>
            <div class="contractFiles">
            </div>
        </div>
        <div class="col-sm-12 form-group" style="border-bottom: 1px solid #dedede;padding-bottom: 15px;">
            <span class="pull-right contractDate"></span>
            <span class="pull-right mr h5 color999">签约日期</span>
        </div>
        <%--<div class="col-sm-12 form-group">--%>
            <%--<span class="mr h5 color999 ">审核人</span>--%>
            <%--<span class="mr auditorName"></span>--%>
            <%--<span class="mr h5 color999 ">审核时间</span>--%>
            <%--<span class="auditTime"></span>--%>
        <%--</div>--%>
    </div>
</div>

<form id="audit_m"  action="#" class="form form-horizontal">
    <div style="padding-left: 15px">
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666 pull-left"><span class="colorRed">*</span>审核状态</label>
                    <div class="pull-left text-center"  style="line-height: 33px;border: 1px solid #ddd;height: 33px;width: 250px;border-radius: 0 4px 4px 0!important;">
                        <label class="mr">
                            <input type="radio" name="shzt" value="001" style="vertical-align: sub"> 通过
                        </label>
                        <label class="">
                            <input type="radio" name="shzt" value="002"  style="vertical-align: sub"> 驳回
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="input-group">
                    <textarea name="shyj" maxlength="500" class="shyj borderRadius4" placeholder="请输入审核意见"></textarea>
                </div>
                <div style="padding-right: 15px">
                    <div class="pull-right">
                        剩余<span id="overPlusWord" style="color: red">300</span>个字符
                    </div>
                </div>
            </div>
        </div>
        </div>
        </form>
<script
	src="<%=request.getContextPath()%>/assets/pages/scripts/contractaudit/audit.js"
	type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		audit.setPath('<%=request.getContextPath()%>');
		audit.init('<%=htbm%>','<%=batchSign%>');
        checkHowMany('#audit_m [name="shyj"]','#audit_m  #overPlusWord',300);
    });
</script>