<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    String jclbdm = request.getParameter("jclbdm");
    if(jclbdm==null){
        jclbdm = "";
    }
    String uuid = UUID.randomUUID().toString();
%>
<style>
    #htshDIV1 .rotate1 {
        transform: rotate(180deg);
    }
</style>
<div class="" id="lygl<%=uuid %>">
    <div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
        <div class="portlet light bordered" style="padding: 8px">
            <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 5px;">
                                <div style="margin-left: 5px;clear:both;overflow: hidden;">
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="ypmc"
                                               placeholder="请输入样品名称"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">领取状态</label>
                                        <select class="form-control" id="lqzt" style="width: 214px">
                                            <option value="">请选择</option>
                                            <option value="002">已领取</option>
                                            <option value="001">未领取</option>
                                        </select>
                                    </div>
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">制备科室</label>
                                        <select id = "lx" name="lx" class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
                                            <option value="">请选择制制备科室</option>
                                            <option value="1">微生物室</option>
                                            <option value="2">理化室</option>
                                            <option value="3">大型设备室</option>
                                        </select>
                                    </div>
                                </div>
                                <br>
                                <!--按钮  end-->
                                <div>
                                    <button id="yplzSearch"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>查询
                                    </button>
                                    <button id="reset"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>重置
                                    </button>
                                    <button id="insertYp"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4 ">
                                        <i class="fa fa-plus iconMr"></i>领样
                                    </button>
<%--                                    <button id="deletedYp"--%>
<%--                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4 ">--%>
<%--                                        <i class="fa fa-plus iconMr"></i>清除--%>
<%--                                    </button>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form id="lygl_form">
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" id="list_datalygl" name="yplz-table"
                           style="width:100%;margin-top: 15px!important">
                        <thead>
                        <tr>
                            <th width="10px"><input type="checkbox"  name="check1"></th>
                            <th>样品名称</th>
                            <%--<th>样品编码</th>--%>
                            <th width="180px">制备样编码</th>
                            <th>检测项目</th>
                            <th>制备科室</th>
                            <th>制备日期</th>
                            <th width="60px">未领取量</th>
                            <th width="60px">领取状态</th>
                            <th>领取人员</th>
                            <th>领取时间</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </form>
        </div>
    </div>
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/ypgl/LyglFc.js"></script>
<script type="text/javascript">
    lyglList.setpath("<%=request.getContextPath()%>");
    lyglList.inint("<%=uuid%>","<%=jclbdm%>");
</script>

