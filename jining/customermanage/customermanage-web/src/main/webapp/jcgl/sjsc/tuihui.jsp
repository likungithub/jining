
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
 String uuid = request.getParameter("uuid");
%>
    <div class="form-body form form-horizontal" id="<%=uuid%>scForm" style="margin-left: 13px;">
        <div class="row">
            <div class="col-md-12  input-group">
                <div class="form-group">
                    <div class="col-md-12" style="position: relative;">
                        <label class="labelCommon labelWidth-col-two labelBg color666" style="height: 74px;
                         line-height: 74px;">退回说明</label>
                        <textarea rows="3" class="form-control "  id="<%=uuid%>thsm" maxlength="300" style="height: 74px;
                        border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;
                        width:474px !important;font-size: 12px!important"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>