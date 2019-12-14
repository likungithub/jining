<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    UUID uuid = UUID.randomUUID();
%>
<div class="" id="ypclqr<%=uuid %>" style="float: left;">
    <div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
        <div class="portlet light bordered" style="padding: 8px">
            <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 10px;">
                                <div style="clear:both;">
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" id="ypmc<%=uuid%>" placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">所属委托</label>
                                        <input type="text" class="inputCommon appsysinfo-m" id="wtid<%=uuid%>" placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                </div>
                                <br>
                                <!--按钮  begin-->
                                <div style="clear: both;">
                                    <br>
                                    <button id="ypclsqSearch<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                                    <button id="reset<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                                    <button id="ypclqrAuditPass_btn<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>审批通过</button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" id="list_data<%=uuid%>" name="ypclqr-table" style="width:100%;margin-top: 15px!important">
                        <thead>
                        <tr>
                            <th field="ck" class="text-left" width="20px"><input type="checkbox" class="check-all-td" name="ypclqrck<%=uuid%>"/></th>
                            <th width="12%">申请人</th>
                            <th width="12%">申请时间</th>
                            <th width="12%">样品名称</th>
                            <th width="12%">样品编号</th>
                            <th width="20%">所属委托单</th>
                            <th width="12%">重量</th>
                            <th width="12%">处理原因</th>
                            <th width="12%">处理方式</th>
                            <th width="12%">处理人</th>
                            <th width="10%">状态</th>
                            <th width="10%">备注</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
    <script src="<%= request.getContextPath()%>/assets/pages/scripts/ypgl/ypclqr.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function() {
            ypclqr.setPath("<%= request.getContextPath()%>");
            ypclqr.init('<%=uuid%>');
        });
    </script>
