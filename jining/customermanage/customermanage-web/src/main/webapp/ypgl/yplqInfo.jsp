<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
       String ypid = request.getParameter("ypid");
       String uuid =request.getParameter("uuid");
%>
<div class="form-body form form-horizontal"  style="margin-left: 13px;">
    <div class="row"  style="margin-top: 10px;">
<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
    <label class="labelCommon labelBg color666 dateLabel-m">领取数量</label>
    <input type="text" class="inputCommon appsysinfo-m" id="lqsl<%=uuid%>"  style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
</div>
    </div>
<div class="row"  style="margin-top: 10px;">
<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
    <label class="labelCommon labelBg color666 dateLabel-m">单位</label>
    <input type="text" class="inputCommon appsysinfo-m" id="dw<%=uuid%>"  style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
</div>
</div>
</div>
<script>
    $(function () {
        console.log(<%=ypid%>)
        $.ajax({
            url:"customermanage/datatable/getypsl?ypid=<%=ypid%>",
            type:"post",
            success:function (data) {
                $("#lqsl<%=uuid%>").val(data.YPSL);
                $("#dw<%=uuid%>").val(data.YPDW);
            }
        })
    })
</script>
