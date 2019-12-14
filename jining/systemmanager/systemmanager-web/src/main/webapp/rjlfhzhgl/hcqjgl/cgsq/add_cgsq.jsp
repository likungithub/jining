<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="java.util.UUID" %>
<%
    String uuid = UUID.randomUUID().toString();
    String zl = request.getParameter("zl");
    if (zl == null) {
        zl = "";
    }
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
                            <input id="hcmc1" name="hcmc" type="text" class="form-control"
                                   style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                        </div>
                    </td>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label style="width: 80px !important;">规&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</label></span>
                            <input id="gg1" type="text" class="form-control"
                                   style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label style="width: 80px !important;">级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</label></span>
                            <input id="jb1" type="text" class="form-control"
                                   style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                        </div>
                    </td>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label style="width: 80px !important;">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</label></span>
                            <input id="sl1" type="number" class="form-control"
                                   style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label
                                    style="width: 80px !important;">品牌</label></span>
                            <input id="sccj1" type="text" class="form-control"
                                   style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                        </div>
                    </td>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label
                                    style="width: 80px !important;">采购目的</label></span>
                            <input id="cgmd1" type="text" class="form-control"
                                   style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label style="width: 80px !important;">单价(元)</label></span>
                            <input id="dj1" type="number" class="form-control"
                                   style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                        </div>
                    </td>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label style="width: 80px !important;">总价(元)</label></span>
                            <input id="zj1" type="number" class="form-control"
                                   style=";text-indent:0px !important;width:220px !important;font-size:12px !important;">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label style="width: 80px !important;">耗材类型</label></span>
                            <select id="hclx1" class="form-control"
                                    style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                                <%
                                    if ("ybhc".equals(zl)) {
                                %>
                                <option value="1">一般耗材</option>
                                <option value="2">化学品</option>
                                <option value="3">易制毒</option>
                                <option value="4">易制爆</option>
                                <%
                                } else if ("bzwz".equals(zl)) {
                                %>
                                <option value="5">标准物质</option>
                                <%
                                } else {
                                %>
                                <option value="1">一般耗材</option>
                                <option value="2">化学品</option>
                                <option value="3">易制毒</option>
                                <option value="4">易制爆</option>
                                <option value="5">标准物质</option>
                                <%
                                    }
                                %>

                            </select>
                        </div>
                    </td>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label style="width: 80px !important;">备注信息</label></span>
                            <input id="bz1" type="text" class="form-control" style="text-indent:0px !important;width:220px !important;font-size:12px !important;">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>

<script type="application/javascript"
        src="<%=request.getContextPath()%>/assets/pages/scripts/cgsq/add_cgsq.js"></script>
<script type="application/javascript">
    add_cgsqList.inint("<%=uuid%>");
</script>