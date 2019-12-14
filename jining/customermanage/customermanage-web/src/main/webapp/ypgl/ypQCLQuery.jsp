<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String uuid = UUID.randomUUID().toString();
%>
<!--样品选择-->
<div id="ypqcl_chankan<%=uuid%>">
    <div class="dataTables_wrapper no-footer">
        <table class="table table-striped table-bordered" id="ypqcl_chankan_table<%=uuid%>" style="width:100%">
            <thead>
            <tr>
                <th field="ck" class="text-left" width="20px"><input type="checkbox" class="check-all-td" name="ypqcl<%=uuid%>"/></th>
                <th>所属委托单</th>
                <th>样品编号</th>
                <th>样品名称</th>
                <th>商标</th>
                <th>样品数量</th>
            </tr>
            </thead>
        </table>
        <div class="modal-footer">
            <button type="button" id="ypqcl_SampleSelection_btnQD"
                    class="btn btn-success btnBlue borderRadius4 colorfff">
                <i class="fa fa-save"></i>确定
            </button>
            <button type="button"
                    class="btn btn-default borderRadius4 color666"
                    data-dismiss="modal">
                <i class="fa fa-times  iconMr"></i>关闭
            </button>
        </div>
    </div>
</div>

<script type="application/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/ypgl/ypQCLQuery.js"></script>
<script type="application/javascript">
    ypqcl_query.setPath("<%=request.getContextPath()%>");
    ypqcl_query.init("<%=uuid%>");

</script>
