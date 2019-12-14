<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String sjbm = request.getParameter("sjbm");
    if (sjbm == null) {
        sjbm = "";
    }
    String htbm = request.getParameter("htbm");
    if (htbm == null) {
        htbm = "";
    }
%>
<style>
/* .modal-dialog{
    width:688px !important;
} */
/* .modal-footer{
    padding-right:37px !important;
} */
#chargeDetails .inputWidth-col-one {
    width: 193px !important;
}
</style>
<form action="#" id="chargeDetails" class="form form-horizontal">
    <div class="form-body">
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        收费类型
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one mr" name="sflx" readonly="readonly">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        收费时段
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="sfsd" readonly="readonly">
                </div>
            </div>
        </div>
        
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        收费日期
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one mr" name="sfsj" readonly="readonly">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        录入日期
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="lrrq" readonly="readonly">
                </div>
            </div>
        </div>

        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        应收款
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one mr" name="ysk" readonly="readonly">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        其他收费
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="qtsk" readonly="readonly">
                    

                </div>
            </div>
        </div>

        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        实际收款
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one mr" name="sjsk" readonly="readonly">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        优惠金额
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="yhje" readonly="readonly">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        收款人
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="skr" readonly="readonly">
                </div>
            </div>
        </div>

        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <!-- <label class="labelCommon labelWidth-col-one labelBg color666">
                        收费说明
                    </label>
                    <textarea rows="" cols="" name="sfsm" readonly="readonly"></textarea> -->
                    <!-- <input type="text" class="inputCommon inputWidth-col-one" name="skr" readonly="readonly"> -->
                    <label class="labelCommon labelWidth-col-one labelBg color666"
                           style="height: 74px;line-height: 74px;">收费说明</label>
                    <textarea rows="3" class="form-control " name="sfsm" style="width:505px !important;height: 74px;background-color:#fff;
    border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;" maxlength="450" readonly="readonly"></textarea>
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        审核人
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one mr" name="shr" readonly="readonly">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        审核日期
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="shrq" readonly="readonly">
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/chargestatistics/chargeDetails.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        chargeDetails.setPath("<%=request.getContextPath() %>");
        chargeDetails.init("<%=sjbm%>","<%=htbm%>");
    });
</script>