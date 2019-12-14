<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
    java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    long dateMS = currentTime.getTime();

    currentTime.setTime(dateMS);
    String txtendDate = formatter.format(currentTime); //结束时间

    dateMS = dateMS - 60 * 60 * 24 * 1000 * 7;
    currentTime.setTime(dateMS);
    String txtstarDate = formatter.format(currentTime); //开始时间

    UUID uuid = UUID.randomUUID();

    String bz = request.getParameter("bz");
    if (bz == null){
        bz = "";
    }
%>
<style>
    .cusAndMesTab {
        width:100%;
        height: 100%;
        /*padding: 5px 10px;*/
        /*background: red;*/
    }
    ul,ol{
        list-style: none;
    }
    .cusAndMesTab th,
    .cusAndMesTab td{
        text-align: center;
        font-size: 12px;
        padding: 6px 5px;
    }
    .cusAndMesTab thead tr{
        background: #F9F9F9;
    }
    .cusAndMesTab tbody tr:nth-child(odd){
        background: #f9f9f9;
    }
    .cusAndMesTab tbody tr td:nth-child(6),
    .cusAndMesTab tbody tr td:nth-child(7)
    {
        text-align: left;
    }
    .cusAndMesTab tbody tr:hover{
        background: #EDF9FF;
    }
    .cusAndMesTab .clickTab{
        list-style: none;
        border: 1px solid #F9F9F9;
        margin: 0;
        padding: 0;
        width: 202px;
    }
    .cusAndMesTab .clickTab li{
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;

        font-size: 14px;
    }
    .cusAndMesTab .clickTab li:hover{
        cursor: pointer;
    }
    .clickNow{
        background: #F9F9F9;
    }
</style>
<div class="cusAndMesTab">
    <ul class="clickTab">
        <li class="clickNow" data = "1">代理</li>
        <li data='0'>客户</li>
        <div class="clear"></div>
    </ul>
    <table width='100%' style="border-collapse: collapse;" class="listTable">
        <thead  width='100%'>
        <tr width='100%' style="border-bottom: 1px solid #24A1FF;">
            <th width="15%" rowspan="0" colspan="0" style="">登录账号</th>
            <th width="10%"  rowspan="0" colspan="0" style="">用户名</th>
            <th width="10%"  rowspan="0" colspan="0" style="">登录时间</th>
            <th width="10%"  rowspan="0" colspan="0" style="">客户端类型</th>
            <th width="17%"  rowspan="0" colspan="0" style="">用户IP</th>
            <th width="13%"  rowspan="0" colspan="0" style="text-align: left;">代理机构编码</th>
            <th width="25%"  rowspan="0" colspan="0" style="text-align: left;">代理机构名称</th>
        </tr>
        </thead>
    </table>
    <ol class="pageNum">
        <li></li>
    </ol>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/dataVisualization/appListView.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {

        appListView.setPath("<%= request.getContextPath()%>");
        appListView.init();
    });
</script>