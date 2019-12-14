<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String zjdm = request.getParameter("zjdm");
    if (zjdm == null) {
        zjdm = "";
    }
    String uuid = UUID.randomUUID().toString();
%>
<form action="#" id="<%=uuid%>editForm" class="form form-horizontal">
    <div class="form-body">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">
                        <span class="required"> * </span>
                        证件名称：
                        </label>
                    <input placeholder="最多200字符" type="text" class="inputCommon  color666" style="width: 440px"  name="zjmc" maxlength="50">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666" style="height: 80px;line-height: 80px">证件描述：</label>
                    <textarea placeholder="最多300字符" name="zjms" id="zjms" style="padding-left: 10px;height: 80px;border: 1px solid #e5e5e5;border-radius: 0 4px 4px 0!important;width: 440px;outline: none" maxlength="500"></textarea>
                    <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right: 6px;bottom: 0px;text-align: right;">剩余<span class="num" id="zjmsWords" style="color: red;">300</span>个字符</p>
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/zjgl/edit.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        edit.setPath("<%=request.getContextPath() %>");
        edit.init("<%=zjdm%>","<%=uuid%>");
        checkHowMany($("#zjms"),$("#zjmsWords"),300);
    });
</script>