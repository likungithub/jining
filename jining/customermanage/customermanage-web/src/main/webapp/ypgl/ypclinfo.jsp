<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    String txtDate = format.format(currentTime); //将日期时间格局化
    String loginuser = CurrentLoginUser.getUser().getName();
    String ypbm = request.getParameter("ypbm");
    String ypmc = request.getParameter("ypmc");
    String ypid = request.getParameter("ypid");
%>
<div>
    <div class="form-body form form-horizontal"  style="margin-left: 13px;">
        <div class="row">
            <div class="col-md-12 input-group">
                <div class="form-group">
                    <div class="col-md-6" style="position: relative;">
                        <label class="labelCommon labelWidth-col-two labelBg color666">
                            <span class="colorRed"> * </span>退还时间
                        </label>
                        <div class="col-md-6 input-group sfjeinput">
                            <input class="form-control" style="display: block;width: 150px !important;" name="thsj"  id="thsj" value="<%=txtDate%>">
                        </div>
                    </div>
                    <div class="col-md-6" style="position: relative;">
                        <label class="labelCommon labelWidth-col-two labelBg color666">
                            <span class="colorRed"> * </span>退还量
                        </label>
                        <div class="col-md-6 input-group sfjeinput">
                            <input class="form-control" style="display: block;width: 150px !important;" name="thl"  id="thl">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 input-group">
                <div class="form-group">
                    <div class="col-md-6" style="position: relative;">
                        <label class="labelCommon labelWidth-col-two labelBg color666">
                            <span class="colorRed"> * </span>退还人
                        </label>
                        <div class="col-md-6 input-group sfjeinput">
                            <input class="form-control" style="display: block;width: 150px !important;" name="thry"  id="thry">
                        </div>
                    </div>
         <%--           <div class="col-md-6" style="position: relative;">
                        <label class="labelCommon labelWidth-col-two labelBg color666">
                            <span class="colorRed"> * </span>退还量
                        </label>
                        <div class="col-md-6 input-group sfjeinput">
                            <input class="form-control" style="display: block;width: 150px !important;" name="thl"  id="thl">
                        </div>
                    </div>--%>
                </div>
            </div>
        </div>

    </div>
</div>
<script>
    $(function () {
        $("#thsj").datepicker({
            clearBtn: true,
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN'
        });
    });
</script>