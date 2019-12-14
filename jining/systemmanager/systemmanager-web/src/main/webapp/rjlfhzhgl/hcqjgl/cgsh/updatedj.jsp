<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="java.util.UUID" %>
<%
    String uuid = UUID.randomUUID().toString();
%>
    <div class="row" id="<%=uuid%>-manager-container">
        <div class="dataTables_wrapper no-footer">
            <div class="auto-table-area" style="-moz-user-select:none;">
                <table class="table table-striped table-hover paramsTab">
                    <tr>
                        <td>
                            <div class="form-group input-group"
                                 style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                                <span class="input-group-addon"><label style="width: 80px !important;">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价</label></span>
                                <input id="hcdjhcbz" name="hcdj" type="number" class="form-control"
                                       style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                            </div>
                        </td>
                        <td>
                            <div class="form-group input-group"
                                 style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                                <span class="input-group-addon"><label style="width: 80px !important;">总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价</label></span>
                                <input id="hczjhcbz"  type="number" class="form-control"
                                       style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

<script type="application/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/hcbz/updatedj.js"></script>
<script type="application/javascript">
    updatecgsqList.inint("<%=uuid%>");
</script>