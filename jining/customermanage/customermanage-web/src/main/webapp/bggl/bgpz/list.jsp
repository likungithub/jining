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

<%--退回原因模态框--%>
<div class="modal fade" id="pzthyy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width:550px;height:350px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">请填写退回原因</h4>
            </div>

            <div class="col-md-12" style="position: relative;margin-top: 10px;margin-bottom: 10px">
                <label class="labelCommon labelWidth-col-two labelBg color666" style="height: 130px;
                         line-height: 130px;">退回说明</label>
                <textarea rows="3" class="form-control "  id="pzth" maxlength="300" style="height: 130px;
                        border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;
                        width:415px !important;font-size: 12px!important"></textarea>
            </div>

            <div class="modal-footer" >
                <button type="button" class="btn btn-default " data-dismiss="modal">
                    关闭
                </button>
                <button type="button" class="btn btn-primary " id="pztjthyy" >
                    提交
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

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
                                        <input type="text" id="bgpz_htmc" class="appsysinfo-m inputCommon" name="htmc"
                                               placeholder="请输入合同名称"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品编号</label>
                                        <input type="text" name="ypbm" class="appsysinfo-m inputCommon" id="ypbm"  placeholder="请输入样品编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                        <input type="text" id="bgpz_ypmc" class="appsysinfo-m inputCommon" name="ypmc"
                                               placeholder="请输入样品名称"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品状态</label>
                                        <select class="form-control" id="ypzt<%=uuid%>" name="ypzt" style="width: 214px">
                                            <option value="">请选择</option>
                                            <option value="001">待审核</option>
                                            <option value="002">已通过</option>
                                            <option value="003">未通过</option>
                                        </select>
                                    </div>
                                </div>
                                <br>
                                <div>

<%--                                    <button id="<%=uuid%>btn_sjjy_tg"--%>
<%--                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">--%>
<%--                                        <i class="fa fa-plus iconMr"></i>通过--%>
<%--                                    </button>--%>
                                    <button id="<%=uuid%>btn_sjjy_th"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>退回
                                    </button>
                                    <button id="bgpz_searchTerm"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>查询
                                    </button>
                                    <button id="reset"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>重置
                                    </button>
                                    <button id="<%=uuid%>lzdPrinting"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>流转单打印
                                    </button>
                                    <button id="<%=uuid%>cdbgPrinting"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>报告预览
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
                            <th class="text-left">委托编号</th>
                            <th class="text-left">样品编号</th>
                            <th class="text-left">样品名称</th>
                            <th class="text-left">检测项目名称</th>
                            <%--<th class="text-left">数据出具日期</th>--%>
                            <th class="text-left">生产单位名称</th>
                            <th class="text-left">生产者电话</th>
                            <th class="text-left">生产者地址</th>
                            <%--<th class="text-left">委托单位所属省</th>
                            <th class="text-left">所属市</th>
                            <th class="text-left">所属县</th>--%>
                            <th class="text-left">状态</th>
                            <th width="150px" class="text-center">操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/bggl/bgpz/list.js" type="text/javascript"></script>
<script src="<%= request.getContextPath()%>/bggl/bgpz/laydate/laydate.js"></script>
<!-- 改成你的路径 -->
<script type="text/javascript">
    $(function () {
        list.setPath("<%= request.getContextPath()%>");
        list.init('<%=uuid%>');
        $("#reset").click(function () {
            $("input").val("");
        });
        laydate.render({
            elem: "#bgpz_startDate" //指定元素
        });
        laydate.render({
            elem: "#bgpz_endDate" //指定元素
        });
    });
</script>