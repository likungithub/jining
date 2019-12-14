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
    UUID uuid = UUID.randomUUID();
%>
<div id="ypjs<%=uuid %>">
    <div class="form-body form form-horizontal"  style="margin-left: 13px;">
        <div class="dataTables_wrapper no-footer">
            <table class="table table-striped table-bordered table-hover" id="list_data<%=uuid%>" name="ypjs-table" style="width:100% !important;margin-top: 15px!important">
                <thead>
                <tr>
                 <%--   <th field="ck" width="20px" class="text-left"><input type="checkbox" class="check-all-td" name="zbck"/></th>--%>
                     <th>修改</th>
                     <th>样品编号</th>
                     <th>样品名称</th>
                     <th>制备编码</th>
                     <th>制备方式</th>
                     <th>存储地址</th>
                     <th>单位</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript" src="<%=request.getContextPath() %>/assets/pages/scripts/marketManage/ChaKanYpZb.js"></script>
<script>
    chakanYpzb.init('<%=uuid%>','<%=ypid%>')
    chakanYpzb.setPath("<%= request.getContextPath()%>");
</script>
