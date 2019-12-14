<%@page import="java.util.UUID"%>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
    .rotate1 {
        transform: rotate(180deg);
    }
</style>
<%
    String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
    <div class="modal-dialog  modal-lg">
        <%--<div class="modal-content">--%>
            <div class="modal-header">
                <h4 class="modal-title" id="wtdbmgz">
                    委托单编码规则：
                </h4>
            </div>
            <form id="<%=uuid%>updateBmgz_from">
                <div class="modal-body">
                    <table>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>编码段1</label></span>
                                <input id="bmd1" name="bmd1" type="text" class="form-control">
                            </div></td>
                            <td></td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>年份&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                                <input id="year" name="year" type="text" class="form-control" value="<%=new SimpleDateFormat("yyyy").format(Calendar.getInstance().getTime())%>" readonly>
                            </div></td>
                        </tr>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>编码段2</label></span>
                                <input id="bmd2" name="bmd2" type="text" class="form-control">
                            </div></td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>月份&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                                <input id="months" name="year" type="text" class="form-control" value="<%=new SimpleDateFormat("MM").format(Calendar.getInstance().getTime())%>" readonly>
                            </div></td>

                        </tr>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>序号&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                                <input id="xh" name="xh" type="text" class="form-control" value="9999" readonly>
                            </div></td>
                        </tr>
                    </table>
                </div>
                <div class="modal-header">
                    <h4 class="modal-title" id="ypbmgz">
                        样品编码规则：
                    </h4>
                </div>
                    <div class="modal-body">
                        <table>
                            <tr>
                                <td><div class="form-group input-group">
                                    <span class="input-group-addon"><label>地名&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                                    <input id="ypaddress" name="ypaddress" type="text" class="form-control">
                                </div></td>
                            </tr>
                            <tr>
                                <td><div class="form-group input-group">
                                    <span class="input-group-addon"><label>年份&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                                    <input id="ypyear" name="ypyear" type="text" class="form-control" value="<%=new SimpleDateFormat("yyyy").format(Calendar.getInstance().getTime())%>" readonly>
                                </div></td>
                            </tr>
                            <tr>
                                <td><div class="form-group input-group">
                                    <span class="input-group-addon"><label>序号&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                                    <input id="ypxh" name="bmd3" type="text" class="form-control"  value="9999" readonly>
                                </div></td>
                            </tr>
                        </table>
                    </div>
                <div class="modal-footer">
                    <button id="submityqsbtzupdate" type="button" class="btn btn-primary">
                        保存
                    </button>
                </div>
            </form>
        <%--</div><!-- /.modal-content -->--%>
    </div><!-- /.modal -->
    </div>
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/bmgz/bmgz.js"></script>
<script type="text/javascript">
    $(function () {
        yqyysyListbmgz.setPath("<%=request.getContextPath()%>")
        yqyysyListbmgz.init("<%=uuid%>")
    })
</script>