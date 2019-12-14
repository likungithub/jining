<%--
  Created by IntelliJ IDEA.
  User: 小杨
  Date: 2019/7/6
  Time: 16:29
  To change this template use File | Settings | File Templates.
--%>
<%@page import="java.util.UUID,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    UUID uuid = UUID.randomUUID();
    String rqq = request.getParameter("rqq");
    String rqz = request.getParameter("rqz");
    String name = request.getParameter("name");
    String lie = request.getParameter("lie");


%>
<style>
    #htshDIV1 .rotate1 {
        transform: rotate(180deg);
    }
</style>
<div class="" id="lygl<%=uuid %>">
    <div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
        <div class="portlet light bordered" style="padding: 8px">
            <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 5px;">
                                <div style="margin-left: 5px;clear:both;overflow: hidden;">
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form id="lygl_form">
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" id="list_data<%=uuid%>" name="ypjs-table" style="width:2000px;margin-top: 15px!important">
                        <thead>
                        <tr>
                            <th width="100%">抽样单号</th>
                            <th width="130px">样品编码</th>
                            <th width="200px">样品名称</th>
                            <th width="200px">委托单位</th>
                            <th width="200px">受检单位</th>
                            <th width="100%">受理人员</th>
                            <th width="100%">受理时间</th>
                            <th width="100%">领样人员</th>
                            <th width="100%">领样时间</th>
                            <th width="100%">主检人员</th>
                            <th width="100%">主检时间</th>
                            <th width="100%">编制人员</th>
                            <th width="100%">编制时间</th>
                            <th width="100%">批准人员</th>
                            <th width="100%">批准时间</th>
                            <th width="100%">打印人员</th>
                            <th width="100%">打印时间</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </form>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/gztz/gzltj/wtslMx.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        wtslMx.setPath("<%= request.getContextPath()%>");
        wtslMx.init("<%=uuid %>","<%=rqq%>","<%=rqz%>","<%=name%>","<%=lie%>");
    });
</script>