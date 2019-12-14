<%@page import="java.util.UUID" %>
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
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 15px">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="height: 33px;margin: 0 0 15px;">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="padding-bottom: 10px;">
                                <div style="clear:both;overflow: hidden;">
                                    <div class="input-group  search-label-small pull-left"
                                         style="display: none;left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">合同名称</label>
                                        <input type="text" id="bgsh_htmc" class="appsysinfo-m inputCommon" name="htmc"
                                               placeholder="请输入合同名称"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                        <input type="text" id="bgsh_ypmc" class="appsysinfo-m inputCommon" name="ypmc"
                                               placeholder="请输入样品名称"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                </div>
                                <br>
                                <div>
                                    <button  id="dayinyddbg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>制表
                                    </button>
                                    <button  id="dayinWtbg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>生成报告
                                    </button>
                                    <%--<button id="<%=uuid%>bgzjsp_tg"--%>
                                            <%--class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">--%>
                                        <%--<i class="fa fa-plus iconMr"></i>提交--%>
                                    <%--</button>--%>
                                    <%--<button id="<%=uuid%>bgzjsp_th"--%>
                                            <%--class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">--%>
                                        <%--<i class="fa fa-plus iconMr"></i>退回--%>
                                    <%--</button>--%>
                                    <button id="bgzjsp_searchTerm"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>查询
                                    </button>
                                    <button id="bgzjsp_reset"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>重置
                                    </button>
                                    <button id="bgzbjsp_yp" style="display: none"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>查看样品
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover paramsTab" id="<%=uuid%>ManagerList_m" width="100%">
                        <thead>
                        <tr class="color333">
                            <th class="text-left" width="20px"><input type="checkbox" name="rwfp_checkbox"/>
                            </th>
                            <%--<th class="text-left">合同名称</th>--%>
                            <th class="text-left">受检单位名称</th>
                            <th class="text-left">抽样地点</th>
                            <th class="text-left">抽样单位联系人</th>
                            <th class="text-left">抽样方式</th>
                            <th class="text-left">抽样日期</th>
                            <%--<th class="text-left">检测项目</th>--%>
                            <%--<th class="text-left">数据出具日期</th>--%>
                            <%--<th class="text-left">状态</th>--%>
                            <th class="text-left">样品数量</th>
                            <th width="150px" class="text-center">操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/bggl/bgzb/list.js" type="text/javascript"></script>
<script src="<%= request.getContextPath()%>/bggl/bgzjsp/laydate/laydate.js"></script>
<!-- 改成你的路径 -->
<script type="text/javascript">
    $(function () {
        list.setPath("<%= request.getContextPath()%>");
        list.init('<%=uuid%>');
        $("#bgzjsp_reset").click(function () {
            $("input").val("");
        });
        laydate.render({
            elem: "#bgsh_startDate" //指定元素
        });
        laydate.render({
            elem: "#bgsh_endDate" //指定元素
        });
    });
</script>