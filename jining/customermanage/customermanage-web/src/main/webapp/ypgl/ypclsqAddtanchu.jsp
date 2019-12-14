<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String uuid = UUID.randomUUID().toString();
%>
<!--样品选择-->
<div id="ypclsq_chankan<%=uuid%>">
    <div class="dataTables_wrapper no-footer">
        <table class="table table-striped table-bordered" id="SampleSelection_chakan_table" style="width:100%">
            <thead>
            <tr>
                <th field="ck" class="text-left" width="20px"><input type="checkbox" class="check-all-td" name="ypjs<%=uuid%>"/></th>
                <th>样品名称</th>
                <th>样品编号</th>
                <th>所属委托单</th>
                <th>样本基数</th>
                <th>样品数量</th>
                <th>备注</th>
            </tr>
            </thead>
        </table>
        <div class="modal-footer">
            <button type="button" id="SampleSelection_btnQD"
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
<script type="application/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/ypgl/ypclsqAddtanchu.js"></script>
<script type="application/javascript">
    ypclsq_add_tanchu.setPath("<%=request.getContextPath()%>");
    ypclsq_add_tanchu.init("<%=uuid%>")
</script>
