<%--
  Created by IntelliJ IDEA.
  User: liuhao
  Date: 2018/3/16
  Time: 15:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String kqbh = request.getParameter("kqbh");
    if(kqbh==null){
        kqbh="";
    }
%>
<style>
    .colorred{
        color:#e02222;
    }
    #addWiFiDiv .inputStyle{
        border:none;
        border-bottom: 1px solid rgb(30,158,255);
        background-color: rgba(0,0,0,0);
    }
</style>
<div style="width: 100%;overflow: hidden" id="addWiFiDiv">
    <div class="dataTables_wrapper no-footer">
        <table class="table table-striped table-bordered table-hover" style="width:100%;" id="WiFiListTable">
            <thead>
            <tr>
                <th width="40%" style="text-align: center;">WiFi名称</th>
                <th width="40%" style="text-align: center;">Mac地址</th>
                <th style="text-align: center;">操作</th>
            </tr>
            </thead>
        </table>
    </div>
    <%--<div class="input-group" style="margin-bottom: 10px;width: 100%">--%>
        <%--<label class="labelCommon labelWidth-col-two labelBg color666">--%>
            <%--<span class="colorred"> * </span>WiFi名称：</label>--%>
        <%--<input type="text" class="inputCommon wifiName" placeholder="请输入WiFi名称" style="width: 88%;float: left">--%>
    <%--</div>--%>
    <%--<div class="input-group" style="margin-bottom: 10px;width: 100%">--%>
        <%--<label class="labelCommon labelWidth-col-two labelBg color666">--%>
            <%--<span class="colorred"> * </span>Mac地址：</label>--%>
        <%--<input type="text" class="inputCommon wifiMac" placeholder="请输入WiFi硬件地址" style="width: 88%;float: left">--%>
    <%--</div>--%>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/attendance/addkqwifi.js"></script>
<script>
    $(function () {
       addkqWifiCon.setPath("<%=request.getContextPath()%>");
       addkqWifiCon.init('<%=kqbh%>');
    });
</script>