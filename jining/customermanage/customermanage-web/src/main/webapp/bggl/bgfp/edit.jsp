<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String uuid = UUID.randomUUID().toString();
%>
<form action="#" id="<%=uuid%>editForm" class="form form-horizontal">
    <div class="form-body">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">
                        主检审批：
                    </label>
                    <input  type="text" class="inputCommon  color666" style="width: 440px"  name="zjsp" maxlength="50">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">
                        报告审核：
                        </label>
                    <input  type="text" class="inputCommon  color666" style="width: 440px"  name="bgsh" maxlength="50">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">
                        报告批准：
                    </label>
                    <input  type="text" class="inputCommon  color666" style="width: 440px"  name="bgpz" maxlength="50">
                </div>
            </div>
        </div>
        <div class="row" style="display: none">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">
                        报告打印：
                    </label>
                    <input  type="text" class="inputCommon  color666" style="width: 440px"  name="sjscry" maxlength="50">
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/bggl/bgfp/edit.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        edit.setPath("<%=request.getContextPath() %>");
        edit.init("<%=id%>","<%=uuid%>");
    });
</script>