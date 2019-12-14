
<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    String txtDate = format.format(currentTime); //将日期时间格局化
    String loginuser = CurrentLoginUser.getUser().getName();
    String id = request.getParameter("id");
    String ypmc = request.getParameter("ypmc");
%>
<div>
    <div class="form-body form form-horizontal"  style="margin-left: 13px;">
        <div class="row">
            <div class="col-md-12 input-group">
                <div class="form-group">
                    <div class="col-md-6" style="position: relative;">
                        <label class="labelCommon labelWidth-col-two labelBg color666" id="zjelabel1">
                            <span class="colorRed"> * </span>样品名称
                        </label>
                        <div class="col-md-6 input-group sfjeinput">
                            <input class="form-control" style="display: block;width: 150px !important;" name="zbypbm"  value="<%=ypmc%>" id="ypmc" readonly placeholder="<%=ypmc%>">
                        </div>
                    </div>
                    <div class="col-md-6" style="position: relative;">
                        <label class="labelCommon labelWidth-col-two labelBg color666" id="">
                            <span class="colorRed"> * </span>制备样ID
                        </label>
                        <div class="col-md-6 input-group sfjeinput">
                            <input class="form-control" style="display: block;width: 150px !important;" name="zbypbm1"  value="<%=id%>" id="zbybm" readonly>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 input-group">
                <div class="form-group">
                    <div class="col-md-6" >
                        <label class="labelCommon labelWidth-col-two labelBg color666">
                            <span class="colorRed"> * </span>制备时间
                        </label>
                        <div class="input-group pull-left">
                            <div class="input-group date cyDate beginTime">
                                <input type="text" class="form-control inputCommon inputWidth-col-two"
                                       name="zbDate"  style="width: 133px !important;text-indent:0;
                                border-bottom-right-radius: 0px !important;background:#fff;padding:6px;
                                border-top-right-radius: 0px !important;text-align: center;"  id="zbDate7"/>
                                <span>
                                <button class="btn btn-default" type="button"
                                        style="border-top-right-radius: 4px !important;
                                    border-bottom-right-radius: 4px !important;height: 33px;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                            </div>
                        </div>
                    </div>
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="colorRed"> * </span>制备方式
                    </label>
                    <div class="input-group sfjeinput">
                        <select class="form-control" id="zbfs7" name="zbfs7" readonly style="display: block;width: 117px !important;border-radius: 0 !important">
                        </select>
                    </div>

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 input-group">
                <div class="form-group">
                    <div class="col-md-6" >
                        <label class="labelCommon labelWidth-col-two labelBg color666">
                            <span class="colorRed"> * </span>制备质量
                        </label>
                        <div class="input-group pull-left">
                            <div class="input-group date cyDate ">
                                <input type="text" class="form-control inputCommon inputWidth-col-two"
                                       name="zbzl" id="zbzl7" style="width: 133px !important;text-indent:0;
                                border-bottom-right-radius: 0px !important;background:#fff;padding:6px;
                                border-top-right-radius: 0px !important;text-align: center;"/>
                            </div>
                        </div>
                    </div>
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="colorRed"> * </span>单位
                    </label>
                    <div class="input-group sfjeinput">
                        <select class="form-control" id="dw7" name="dw" readonly style="display: block;width: 117px !important;border-radius: 0 !important">
                            <option value="kg" >kg</option>
                            <option value="袋">袋</option>
                            <option value="mg">mg</option>
                            <option value="g">g</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
</div>
</div>
<script type="text/javascript" src="<%=request.getContextPath() %>/assets/pages/scripts/marketManage/XgYpzb.js"></script>
<script>
   xgypzb().init('<%=id%>');
</script>
