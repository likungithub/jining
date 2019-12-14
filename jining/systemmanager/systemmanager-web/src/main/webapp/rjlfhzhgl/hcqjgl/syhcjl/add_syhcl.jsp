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
                                <span class="input-group-addon"><label style="width: 80px !important;">耗材名称</label></span>
                                <input id="hcmcsyljl" name="hcmcsyljl" type="text" class="form-control"
                                       style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                            </div>
                        </td>
                        <td>
                            <div class="form-group input-group"
                                 style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                                <span class="input-group-addon"><label style="width: 80px !important;">开启人&nbsp;&nbsp;&nbsp;</label></span>
                                <input id="kqrsyljl"  type="text" class="form-control"
                                       style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group input-group"
                                 style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                                <span class="input-group-addon"><label style="width: 80px !important;">开启时间</label></span>
                                <input id="kqsjsyljl"  type="text" class="form-control"
                                       style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                            </div>
                        </td>
                        <td>
                            <div class="form-group input-group"
                                 style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                                <span class="input-group-addon"><label style="width: 80px !important;">剩余量&nbsp;&nbsp;&nbsp;</label></span>
                                <input id="syljlsyljl" type="text" class="form-control"
                                       style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group input-group"
                                 style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                                <span class="input-group-addon"><label style="width: 80px !important;">保质期</label></span>
                                <input id="bzq" name="hcmcsyljl" type="text" class="form-control"
                                       style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                            </div>
                        </td>
                        <td>
                            <div class="form-group input-group"
                                 style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                                <span class="input-group-addon"><label style="width: 80px !important;">存放位置&nbsp;&nbsp;&nbsp;</label></span>
                                <input id="cfwz"  type="text" class="form-control"
                                       style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

<script type="application/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/syljl/add_syhcl.js"></script>
<script src="<%=request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script type="application/javascript">
    add_syhcl.inint("<%=uuid%>");
</script>