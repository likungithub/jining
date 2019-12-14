<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String id = request.getParameter("id");
    String wtid = request.getParameter("wtid");
    String ypmcs = request.getParameter("ypmc");
    String ypsl = request.getParameter("ypsl");
    if (id == null) {
        id = "";
    }
    if (wtid == null) {
        wtid = "";
    }
    if (ypmcs == null) {
        ypmcs = "";
    }
    if (ypsl == null) {
        ypsl = "";
    }
    String uuid = UUID.randomUUID().toString();
%>
<style>

    .dateLabel-q {
        width:100% !important;
        text-align:left;
    }

</style>
<div class="row contentBgColor" id="<%=uuid%>-ypjcEdit-container">
    <div class="dataTables_wrapper no-footer">
        <div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
            <div style="clear:both;overflow: hidden;margin-top: 5px;">
            </div>
        </div>
        <form id="zbksform" >
            <input type="hidden" value="<%=id%>" name="ypids">
            <input type="hidden" value="<%=wtid%>" name="wtids">
            <input type="hidden" value="<%=ypmcs%>" name="ypmcs">
            <input type="hidden" value="0" name="lrzsl" id="lrzsl">


                <label class="labelCommon labelBg color666 dateLabel-q" >  拆分样品:<%=ypmcs%>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;样品数量：<%=ypsl%></label>

            <table class="table table-striped table-hover paramsTab" id="ManagerList_ypjcedit_zb" style="width: 100%">
                <thead>
                <tr class="color333">
                    <th width="1px"></th>
                    <th width="1px"></th>
                    <th width="50%" class="text-center">科室名称</th>
                    <th width="50%" class="text-center">拆分数量</th>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>


<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/ypgl/ypcffc/cfksEditzb.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        zbkszb.setPath("<%=request.getContextPath() %>");
        zbkszb.init("<%=id%>", "<%=uuid%>");
        zbkszb.setData("<%=id%>","<%=wtid%>","<%=ypmcs%>");
    });
</script>