<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
String id = request.getParameter("id");
if(id==null){
    id="";
}
String dljgBm = CurrentLoginUser.getUser().getDljgBm();
%>
<style>
.textareas{
    resize:none;height: 80px;
    width: 418px;
    border: 1px solid #ccc;
    border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;padding:10px;
    }
.fff{
    background-color: #fff;
}
    .form_sex_error-style{
        border:1px solid #ccc;
        margin-left: 0!important;
        padding-left: 10px;
        height:33px;
        width:418px;
        border-bottom-right-radius: 4px!important;
        border-top-right-radius: 4px!important;
        display: flex;
        justify-content: center;
    }
</style>
<form id="workOrder_m"  action="#" class="form form-horizontal">
    <div class="form-body">
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666 pull-left">
                        <!-- <span class="colorRed">*</span> -->
                        优先级
                        </label>
                         <div class="radio-list pull-left ml form_sex_error-style" data-error-container="#form_sex_error">
                            <label class="radio-inline">
                                <input type="radio" name="yxjdm" value="0"> 重要
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="yxjdm" value="1"> 一般
                            </label>
                        </div>
                        <div id="form_sex_error"></div>
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666" style="height: 80px !important;line-height: 80px;">
                        问题描述
                    </label>
                    <textarea name="wtms" maxlength="500" class="wtms fff textareas" disabled="disabled"></textarea>
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                        手机号码
                        </label>
                        <input type="text" class="inputCommon inputWidth-col-one fff" name="sjhm" style="width:418px !important"  disabled="disabled">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                        电子邮箱
                        </label>
                        <input type="text" class="inputCommon inputWidth-col-one fff" name="dzyx" style="width:418px !important"  disabled="disabled">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group" >
                    <label class="labelCommon labelWidth-col-one labelBg color666" style="height: 80px !important;line-height: 80px;">
                    <span class="colorRed clspan">*</span>
                        处理反馈
                    </label>
                    <textarea name="clfk" maxlength="500" class="clfk textareas fff"></textarea>
                </div>
            </div>
        </div>
    </div>
</form>

<div class="row" id="workorder_data_list" style="display: block;">
    <div class="col-md-12">
        <div class="portlet light bordered">
            <div class="portlet-body">
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover contractTab" id="workorderfile_data">
                        <thead>
                        <tr>
                            <th width="80%">附件名称</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/workorder/view.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
    	viewWorkOrder.setPath("<%=request.getContextPath() %>");
    	viewWorkOrder.init("<%=id%>","<%=dljgBm%>");
    });
</script>
