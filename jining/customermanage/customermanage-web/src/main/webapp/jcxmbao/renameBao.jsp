<%@page import="java.util.UUID"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    UUID uuid = UUID.randomUUID();
    String jcbname = request.getParameter("jcbname");
    String jcbdl = request.getParameter("jcbdl");
%>
<style>
    .modal-content{
        width:730px;
    }
    #user-form-datas	.labelWidth-col-two{
        width: 100px!important;
    }
</style>
<div class="form-body">
    <div class="row">
        <div class="col-md-12 col-xs-6">
            <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                <label class="labelCommon labelBg color666 dateLabel-m">包名称</label>
                <input type="text" class="inputCommon appsysinfo-m"  id="jcxmNewName" name="jcxmNewName" value="<%=jcbname%>" placeholder="请输入新名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
            </div>
            <div class="input-group  search-label-small pull-left" style="display:inline-block;left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                <label class="labelCommon labelBg color666 dateLabel-m">大类名称</label>
                <input type="text" class="inputCommon appsysinfo-m"  id="jcxmNewDl" name="jcxmNewDl" value="<%=jcbdl%>" placeholder="请输入新大类名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
            </div>
        </div>
    </div>
</div>

