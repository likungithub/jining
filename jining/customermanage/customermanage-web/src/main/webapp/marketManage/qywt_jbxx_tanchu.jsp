<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String puuid = request.getParameter("uuid");
    if (puuid == null) {
        puuid = "";
    }
    UUID uuid = UUID.randomUUID();
%>
<div id="CustomerInformation_chankan<%=uuid%>">
    <div class="dataTables_wrapper no-footer">
        <table class="table table-striped table-bordered table-hover" id="CustomerInformation_chakan_table" style="width:100%">
            <thead>
            <tr>
                <th field="ck" class="text-left" width="20px"><input type="checkbox" class="check-all-td" name="ypjs<%=uuid%>"/></th>
                <th>客户名称</th>
                <th>联系电话</th>
                <th>所属省份</th>
                <th>所属市</th>
                <th>详细地址</th>
                <th>联系人</th>
            </tr>
            </thead>
        </table>
        <div class="modal-footer">
            <button type="button" id="CustomerInformation_bc"
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
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/qywt_jbxx_tanchu.js" type="text/javascript"></script>
<script type="application/javascript">
    CustomerInformation_chakanlist.init('<%=id%>','<%=uuid%>','<%=puuid%>')
    CustomerInformation_chakanlist.setPath('<%= request.getContextPath()%>');
</script>
