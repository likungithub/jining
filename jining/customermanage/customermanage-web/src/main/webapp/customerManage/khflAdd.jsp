<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="java.util.UUID" %>
<%
    UUID uuid = UUID.randomUUID();
%>
<style>
    /* .modal-dialog {
        width: 400px;
        margin: 30px auto;
    } */
    /* .labelBg {
        margin-left: 40px;
        } */
</style>
<form action="#" class="form-horizontal" id="khflAddForm">
    <div class="form-body">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666" style="display:none">
                        客户分类编码:
                    </label>
                    <input style="display:none" type="text" class="inputCommon inputWidth-col-one color666"
                           value="<%=uuid%>" name="khflDm" readonly="readonly">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group" style="margin-top: 15px;">
                    <label class=" labelCommon labelWidth-col-one color333 labelBg" style="margin-left: 40px;">
                        <span class="required"> * </span> 分类名称
                    </label>
                    <input type="text" class="form-control inputCommon" style="width: 408px;" name="khflName">
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/customerManage/khflAdd.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        khflAdd.init();
    });
</script>