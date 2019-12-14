<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String ypid = request.getParameter("ypid");
    String wtid = request.getParameter("wtid");
    String ypmc = request.getParameter("ypmc");
    if (ypid == null) {
        ypid = "";
    }
    if (wtid == null) {
        wtid = "";
    }
    if (ypmc == null) {
        ypmc = "";
    }
    String uuid = UUID.randomUUID().toString();
%>
<style>

    .dateLabel-q {
        width:100% !important;
        text-align:left;
    }
    .input-width{
        width: 415px !important;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }
    input[type="number"]{ -moz-appearance: textfield; }
    /* 火狐 */
    input{
        -moz-appearance:textfield;
    }
</style>
<div class="row contentBgColor" id="<%=uuid%>-ypjcEdit-container">
    <div class="dataTables_wrapper no-footer">
        <div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
            <div style="clear:both;overflow: hidden;margin-top: 5px;">
            </div>
        </div>
        <form id="jcxtzform<%=uuid%>" >
            <input type="hidden" value="<%=ypid%>" name="ypid">
            <input type="hidden" value="<%=wtid%>" name="wtid">
            <input type="hidden" value="<%=ypmc%>" name="ypmc">

            <%--<label class="labelCommon labelBg color666 dateLabel-q" >&nbsp;&nbsp;&nbsp;&nbsp;样品名称:<%=ypmc%></label><br>--%>
            <%--<label class="labelCommon labelBg color666 dateLabel-q" >&nbsp;&nbsp;&nbsp;&nbsp;样品编码:<%=wtid%></label>--%>

            <%--<div class="col-md-12" style="position: relative;margin-top: 10px;margin-bottom: 10px">--%>
                <%--<label class="labelCommon labelWidth-col-two labelBg color666" style="height: 130px;--%>
                         <%--line-height: 130px;">调整申请说明：</label>--%>
                <%--<textarea rows="3" class="form-control "  id="tzsm<%=uuid%>" name="tzsm" maxlength="300" style="height: 130px;--%>
                        <%--border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;--%>
                        <%--width:415px !important;font-size: 12px!important"></textarea>--%>
            <%--</div>--%>
            <div class="row" style="margin-left: 15px">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666">样品名称&nbsp;&nbsp;</label>
                    <input type="text" class="inputCommon inputWidth-col-two input-width" id="ypmc" name="ypmc" value="<%=ypmc%>" disabled="disabled">
                </div>
            </div>
            <div class="row" style="margin-left: 15px">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666">
                        <%--<span class="required"> * </span>--%>
                        样品编码&nbsp;&nbsp;</label>
                    <input type="text" class="inputCommon inputWidth-col-two input-width" id="wtid" name="wtid" value="<%=wtid%>" disabled="disabled">
                </div>
            </div>
            <div class="row" style="margin-left: 15px">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666">备样数量&nbsp;&nbsp;</label>
                    <input type="text" class="inputCommon inputWidth-col-two input-width" id="bysl" name="bysl">
                </div>
            </div>
            <%--<div class="row" style="margin-left: 15px">--%>
                <%--<div class="form-group">--%>
                    <%--<label class="labelCommon labelWidth-col-two color666">备样数量单位&nbsp;&nbsp;</label>--%>
                    <%--<input type="text" class="inputCommon inputWidth-col-two input-width" id="bysldw" name="bysldw">--%>
                <%--</div>--%>
            <%--</div>--%>
            <%--<div class="row" style="margin-left: 15px">--%>
                <%--<div class="form-group">--%>
                    <%--<label class="labelCommon labelWidth-col-two color666">备样备注&nbsp;&nbsp;</label>--%>
                    <%--<input type="text" class="inputCommon inputWidth-col-two input-width" name="addEmail">--%>
                <%--</div>--%>
            <%--</div>--%>
            <%--<div class="col-md-12" style="position: relative;margin-top: 10px;margin-bottom: 10px">--%>
                <%--<label class="labelCommon labelWidth-col-two labelBg color666" style="height: 100px;--%>
                         <%--line-height: 100px;">备注说明：</label>--%>
                <%--<textarea rows="3" class="form-control "  id="bzxx" name="bzxx" maxlength="300" style="height: 100px;--%>
                        <%--border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;--%>
                        <%--width:415px !important;font-size: 12px!important"></textarea>--%>
            <%--</div>--%>
        </form>
    </div>
</div>


<script src="<%=request.getContextPath()%>/assets/pages/scripts/ypgl/bygl/addByxx.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        jcxtzsq.setPath("<%=request.getContextPath() %>");
        jcxtzsq.init("<%=ypid%>", "<%=uuid%>");
        jcxtzsq.setData("<%=ypid%>","<%=wtid%>","<%=ypmc%>");
    });
</script>