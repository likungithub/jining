<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    String uuid = UUID.randomUUID().toString();
%>
<style>

    #htshDIV1 .rotate1 {
        transform: rotate(180deg);
    }
</style>
<div class="" id="htcx<%=uuid%>">
    <div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
        <div class="portlet light bordered" style="padding: 8px">
            <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 10px;">
                                <div style="clear:both;overflow: hidden;">
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">合同名称</label>
                                        <input type="text" class="appsysinfo-m inputCommon" name="htmc" id="htcx_htmc"
                                               placeholder="请输入合同名称"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">委托单位</label>
                                        <input type="text" class="appsysinfo-m inputCommon" name="wtdwmc" id="htcx_dwmc"
                                               placeholder="请输入委托单位名称"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="openMore pull-left" style="margin-bottom: 0px;">
                                        <div class="date beginTime pull-left">
                                            <label class="labelCommon labelBg color666 dateLabel-m">合同录入日期</label>
                                            <input type="text"  class="appsysinfo-m inputCommon "
                                                   name="starDate" id="htcx_startDate"
                                                   style="border-radius: 0 !important; width: 100px">
                                            <span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button"
                                                    style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                        </div>
                                        <span style="float: left;margin: 5px">至</span>
                                        <div class="input-group date endTime pull-left">
                                            <input type="text"  class="inputCommon appsysinfo-m"
                                                   name="endDate" id="htcx_endDate"
                                                   style="border-radius: 4px 0 0 4px!important;width: 100px">
                                            <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button"
                                                style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                        </div>
                                    </div>
                                </div>
                                <!--按钮  begin-->
                                <div style="clear: both;">
                                    <button id="htcx_chaxun"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>查询
                                    </button>
                                    <button id="htcx_reset"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>重置
                                    </button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover"
                           id="htcx_table" style="width:100%;margin-top: 15px!important">
                        <thead>
                        <tr>
                            <th class="text-left">操作</th>
                            <th>委托单位名称</th>
                            <th>委托编号</th>
                            <th>合同名称</th>
                            <th>联系电话</th>
                            <th>邮政编码</th>
                            <th>其他约定说明</th>
                            <th>状态</th>
                            <th>合同录入日期</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/htcx.js" type="text/javascript"></script>
<script>
  htcxlist.setPath("<%=request.getContextPath()%>");
  htcxlist.init("<%=uuid%>");
</script>