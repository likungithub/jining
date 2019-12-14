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
                       主检人：
                    </label>
                    <select class="inputCommon inputWidth-col-two" name="bgbz_bzr" id="bgbz_bzr">
                    </select>
                    <br/>
                </div>
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">
                        审核人：
                    </label>
                    <select class="inputCommon inputWidth-col-two" name="bgbz_shr" id="bgbz_shr">
                    </select>
                    <br/>
                </div>
                <br>
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">
                        批准人：
                    </label>
                    <select class="inputCommon inputWidth-col-two" name="bgbz_spr" id="bgbz_spr">
                    </select>
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/multiple_select/multiple-select.js"
        type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/bggl/bgbz/bgbztj.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        bgbz_tjfp.setPath("<%=request.getContextPath() %>");
        bgbz_tjfp.init("<%=uuid%>");
    });
</script>