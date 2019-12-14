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
<div class="" id="ypjsqr<%=uuid%>">
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
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                        <input type="text" class="appsysinfo-m inputCommon" name="ypmc"
                                               placeholder="请输入样品名称"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">接收状态</label>
                                        <select  name="jszt" class="appsysinfo-m inputCommon"   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
                                            <option value="">请选择接收状态</option>
                                            <option value="0">未接收</option>
                                            <option value="1">已接收</option>
                                        </select>
                                </div>
                                <!--按钮  begin-->
                                <div style="clear: both;">
                                    <button id="ypjsqr_jieshou"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>接收
                                    </button>
                                    <button id="ypjsqr_chaxun"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>查询
                                    </button>
                                    <button id="ypjsqr_reset"
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
                           id="ypjsqr_table" style="width:100%;margin-top: 15px!important">
                        <thead>
                        <tr>
                            <th style="width: 10px;"><input type="checkbox" name="check1"/></th>
                            <th>样品名称</th>
                             <th>样品接收状态</th>
                            <th>样品编码</th>
                            <th>样品数量</th>
                            <th>样品数量单位</th>
                            <th>样品接收时间</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/ypjsqr.js"></script>
<script>
    ypjsqrlist.setPath("<%=request.getContextPath()%>");
    ypjsqrlist.inint("<%=uuid%>")
</script>