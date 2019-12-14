<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/multiple_select/multiple-select.css"/>
<%
    String uuid = UUID.randomUUID().toString();
%>
<form action="#" id="<%=uuid%>editForm" class="form form-horizontal">
    <div class="form-body">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">
                        样品检测：
                    </label>
                    <select class="inputCommon inputWidth-col-two" name="rwfp_ypjc" id="rwfp_ypjc">
                    </select>
                    <br/>
                </div>
                <br>
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">
                        复核人员：
                    </label>
                    <select class="inputCommon inputWidth-col-two" name="fhry" id="rwfp_fhry">
                    </select>
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/multiple_select/multiple-select.js"  type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/ypgl/rwfpXz.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        rwfp_ypjc.setPath("<%=request.getContextPath() %>");
        rwfp_ypjc.init("<%=uuid%>");
    });
</script>