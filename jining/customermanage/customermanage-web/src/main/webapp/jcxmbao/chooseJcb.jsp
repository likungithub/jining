<%@page import="java.util.UUID"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    UUID uuid = UUID.randomUUID();
    String ypxx = request.getParameter("ypxx");
%>
<style>
    .modal-content{
        width:730px;
    }
    #user-form-datas	.labelWidth-col-two{
        width: 100px!important;
    }
</style>
<div class="form-body" id="ssss">
    <div class="row">
        <div class="portlet-scroller">
            <div class="dataTables_wrapper no-footer">
                <div class="input-group  search-label-small pull-left" style="margin-left: 10px;margin-bottom: 10px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                    <label class="labelCommon labelBg color666 dateLabel-m">检测包名称</label>
                    <input type="text" class="inputCommon appsysinfo-m" id="jcbname<%=uuid%>" placeholder="请输入检测包名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                </div>
                <div  style="margin-left: 10px;margin-bottom: 10px;position:relative;">
                    <button id="jcbSearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                    <button id="reset<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                </div>
                <table class="table table-striped table-bordered table-hover backgroundWhite"
                       id="chooseJcb">
                    <thead>
                    <tr>
                        <th width="2%">选择</th>
                        <%--<th width="12%">检测包序号</th>--%>
                        <th width="11%">检测包名称</th>
                        <th width="10%">检测包大类</th>
                        <th width="10%">检测项目</th>
                        <th width="10%">检测项项目数量</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<script src='<%=request.getContextPath()%>/assets/pages/scripts/marketManage/jcxmbao/chooseJcb.js'></script>
<script>
    $(function () {
        chooseJcb.init('<%=ypxx%>',"<%=uuid %>");
    })
</script>