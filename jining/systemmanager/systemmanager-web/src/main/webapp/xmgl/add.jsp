<%@ page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String uuid = UUID.randomUUID().toString();
%>

    <div class="form-body" id="addYpForm<%=uuid%>">
        <div class="row">
            <table class="table table-striped table-hover paramsTab" id="<%=uuid%>YpList" width="100%">
                    <thead>
                    <tr class="color333">
                        <th class="text-left"><input type="checkbox" name="yplist_checkbox"/></th>
                        <th class="text-left">样品编号</th>
                        <th class="text-left">样品名称</th>
                        <th class="text-left">样品单位</th>
                        <th class="text-left">规格型号</th>
                    </tr>
                    </thead>
                </table>
        </div>
    </div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/xmgl/add.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        addYpForm.setPath('<%=request.getContextPath()%>');
        addYpForm.init('<%=id%>', '<%=uuid%>');
    });
</script>
