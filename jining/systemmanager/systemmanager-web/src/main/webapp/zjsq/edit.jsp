<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String zjdm = request.getParameter("zjdm");
    if (zjdm == null) {
        zjdm = "";
    }

    String khbm = request.getParameter("khbm");
    if (khbm == null) {
        khbm = "";
    }

    String jjcs = request.getParameter("jjcs");
    if (jjcs == null) {
        jjcs = "";
    }

    String zjsqid = request.getParameter("zjsqid");
    if (zjsqid == null) {
        zjsqid = "";
    }

    java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    long dateMS = currentTime.getTime();

    currentTime.setTime(dateMS);
    String txtendDate = formatter.format(currentTime); //当前时间

    String uuid = UUID.randomUUID().toString();
%>
<form action="#" id="<%=uuid%>editForm" class="form form-horizontal zjsqForm_M">
    <div class="form-body" style="padding-bottom: 0;">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">证件状态</label>
                    <div class="pull-left" style="width: 444px; border: 1px solid #dadada;height: 33px;text-align: center;line-height: 33px;border-radius: 0 4px 4px 0!important;">
                        <input class="mr" type="radio" name="zjzt" value="001" disabled style="vertical-align: sub" />
                        <label style="font-size: 12px">收取</label>
                        <input class="mr" type="radio" name="zjzt" value="002" disabled style="vertical-align: sub;margin-left: 75px" />
                        <label style="font-size: 12px">归还</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <%--  <label class="labelCommon labelWidth-col-one color666">录入时间：</label>
<input  type="text" name="lrsj"/>
--%>
                    <div class="date lrsjWrap pull-left">
                        <label class="labelCommon labelWidth-col-one color666">录入时间</label>
                        <input type="text" readonly="" class="appsysinfo-m inputCommon " value="<%=txtendDate%>" name="lrsj" style="border-radius: 0 !important; width: 116px">
                        <span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                    </div>


                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666"><span class="iconMr" style="color:red">*</span>证件数量</label>
                    <input name="zjsl" value="1" style="text-indent: 10px;border: 1px solid #dadada;height: 33px;width: 165px;border-radius: 0 4px 4px 0!important" />
                </div>
            </div>
        </div>
        <%--<div class="row">
<div class="col-md-12">
<div class="form-group">
<label class="labelCommon labelWidth-col-one color666">证件数量：</label>
<input name="zjsl" class="borderRadius4"/>
</div>
</div>
</div>--%>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666" style="height: 80px;line-height: 80px;">备注信息</label>
                    <textarea id="zjsqTexta" name="bzxx" maxlength="300" placeholder="最多300字符" style="    height: 80px;
    width: 444px;
    border: 1px solid #dadada;
    border-radius: 0 4px 4px 0!important;
    outline: none;
    padding-left: 10px;"></textarea>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div>
                    <div class="pull-right">
                        可输入<span id="zjsqmanyW" style="color: red;">300</span>字符
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/zjsq/edit.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        checkHowMany('#zjsqTexta','#zjsqmanyW',300);
        $('.zjsqForm_M input[name="zjsl"]').blur(function (){
            if (!/^([1-9]\d{1,9}|\d)$/.test($(this).val())){
                $(this).val(1);
                App.alert({
                    container: $(this).closest(".modal-body"),
                    place: 'prepend',
                    type: 'warning',
                    message: '证件数量不能为空，格式必须是10位以内的数字',
                    closeInSeconds:2,
                    icon: 'fa fa-warning'
                });
            }
        });


        edit.setPath("<%=request.getContextPath() %>");
        edit.init("<%=zjdm%>", "<%=uuid%>", "<%=khbm%>", "<%=zjsqid%>", "<%=jjcs%>");
    });
</script>