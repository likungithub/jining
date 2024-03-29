<%@page import="java.util.UUID" %>
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
<div class="row contentBgColor" id="<%=uuid%>-fykzEdit-container">
    <div class="dataTables_wrapper no-footer">
        <div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
            <div style="clear:both;overflow: hidden;margin-top: 5px;">
                <div class="input-group  search-label-small pull-left"
                     style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                    <label class="labelCommon labelBg color666 dateLabel-m">检测项名称</label>
                    <input type="text" class="inputCommon appsysinfo-m" id="jcxmc" name="jcxmc" placeholder="请输入检测项名称"
                           style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                </div>
            </div>
            <!--按钮  begin-->
            <div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
                <button id="fywhSeach"
                        class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i
                        class="fa fa-search iconMr"></i>查询
                </button>
                <button id="fywhReast"
                        class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i
                        class="fa fa-refresh iconMr"></i>重置
                </button>
            </div>
            <!--按钮  end-->
        </div>
        <form method="post" id="yqjc_form_choose">
            <table class="table table-striped table-hover paramsTab" id="ManagerList_ypjcedit" width="1700px">
                <thead>
                <tr class="color333">
                    <th width="10px"><input type="checkbox" name="ck"/></th>
                    <th width="1px"></th>
                    <th class="text-center">检测项目</th>
                    <th class="text-center">仪器名称</th>
                    <th class="text-center">检出限</th>
                    <th class="text-center">检测值</th>
                    <%--<th class="text-center">温度</th>
                    <th class="text-center">湿度</th>--%>
                    <th class="text-center" style="width: 66px">费用</th>
                    <th class="text-center" style="width: 120px">备注</th>
                    <th class="text-center">结束日期</th>
                   <%-- <th class="text-center">标准物质</th>
                    <th class="text-center">检测状态</th>
                    <th class="text-center">提交状态</th>--%>
                    <th class="text-center">检测人</th>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/bggl/jcxfywh/edit.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        fykzlr.setPath("<%=request.getContextPath() %>");
        fykzlr.init("<%=id%>", "<%=uuid%>");
    });
</script>