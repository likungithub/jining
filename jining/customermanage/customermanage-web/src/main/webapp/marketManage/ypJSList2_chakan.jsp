<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String uuid = UUID.randomUUID().toString();
    String wtid = request.getParameter("wtid");
    if (wtid == null) {
        wtid = "";
    }
%>
<div id="htcx_chankan<%=uuid%>">
    <div class="dataTables_wrapper no-footer">
        <table class="table table-striped table-bordered table-hover" id="htcx_chakan_table" style="width:100%">
            <thead>
            <tr>
                <th field="ck" class="text-left" width="20px"><input type="checkbox" class="check-all-td" name="ypjs<%=uuid%>"/></th>
                <th>委托编号</th>
                <th>受检单位</th>
                <th>送样人员</th>
                <th>送样日期</th>
            </tr>
            </thead>
        </table>
        <div class="modal-footer">
            <button type="button" id="ypcb_bc"
                    class="btn btn-success btnBlue borderRadius4 colorfff">
                <i class="fa fa-save  iconMr"></i>保存
            </button>
            <button type="button"
                    class="btn btn-default borderRadius4 color666"
                    data-dismiss="modal">
                <i class="fa fa-times  iconMr"></i>关闭
            </button>
        </div>
    </div>
</div>

<script type="application/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/ypJSList2_chakan.js"></script>
<script type="application/javascript">
    htcx_chakanlist.setPath("<%=request.getContextPath()%>");
    htcx_chakanlist.init("<%=uuid%>", "<%=wtid%>")
</script>
