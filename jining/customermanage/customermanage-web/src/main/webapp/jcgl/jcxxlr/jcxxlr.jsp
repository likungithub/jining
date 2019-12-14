<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
    .rotate1 {
        transform: rotate(180deg);
    }

    /* th,td { white-space: nowrap; }
     .dataTables_scrollHead {
         height: 40px;
     }*/
</style>
<%
    String jclbdm = request.getParameter("jclbdm");
    if(jclbdm==null){
        jclbdm = "";
    }
    String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-ypjcJcxxlr-container">
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 15px">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="height: 33px;margin: 0 0 15px;">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="padding-bottom: 10px;">
                                <div style="float: right;width:100%;">
                                    <div style="margin-left: 10px;clear:both;overflow: hidden;">
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">样品编码</label>
                                            <input type="text" class="inputCommon appsysinfo-m" name="ypbm" id="ypbm"
                                                   placeholder="请输入样品编码"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                            <input type="text" class="inputCommon appsysinfo-m" name="ypmc" id="ypmc"
                                                   placeholder="请输入样品名称"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">检测项目</label>
                                            <input type="text" class="inputCommon appsysinfo-m" name="jcxmc" id="jcxmc"
                                                   placeholder="请输入检测项目名称"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">检测状态</label>
                                            <select name="tjzt"  class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
                                                <option value="">下拉选择检测状态</option>
                                                <option value="0">未检测</option>
                                                <option value="1">已检测</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="col-md-6b " style="padding: 0">
                                        <button style="margin-left: 10px" id="jcxxlrSave"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-plus iconMr"></i>
                                            提交
                                        </button>
                                        <button style="margin-left: 10px" id="jcxxlrAddYq"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-plus iconMr"></i>
                                            添加设备
                                        </button>
                                        <%--<button style="margin-left: 10px" id="jcxxlrStart"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-plus iconMr"></i>
                                            开始检测
                                        </button>
                                        <button style="margin-left: 10px" id="jcxxlrEnd"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-plus iconMr"></i>
                                            结束检测
                                        </button>--%>
                                        <button style="margin-left: 10px" id="jcxxlrSeach"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-search iconMr"></i>
                                            查询
                                        </button>
                                        <button style="margin-left: 10px" id="jcxxlrReast"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-refresh iconMr"></i>
                                            重置
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover paramsTab" id="jcxxlr_List" style="width: 100%">
                        <thead>
                        <tr class="color333">
                            <th width="10px"><input type="checkbox" name="ck"/></th>
                            <th width="1px"></th>
                            <th>样品编码</th>
                            <th>样品名称</th>
                            <th>设备名称</th>
                            <th>检测项目</th>
                            <th>检出限</th>
                            <th>限量值</th>
                            <th>检测值</th>
                            <th style="width: 100px;">温度</th>
                            <th style="width: 100px;">湿度</th>
                            <%--   <th width="10%">检测方法</th>--%>
                            <%--<th>开始日期</th>--%>
                            <%--<th>结束日期</th>--%>
                            <th>检测状态</th>
                            <th>检测人</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="application/javascript" src="<%=request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script type="application/javascript"
        src="<%=request.getContextPath()%>/assets/pages/scripts/jcgl/jcxxlr/jcxxlr.js"></script>
<script>
    jcxxlrList.setPath("<%=request.getContextPath()%>");
    jcxxlrList.init("<%=uuid%>","<%=jclbdm%>");
</script>
