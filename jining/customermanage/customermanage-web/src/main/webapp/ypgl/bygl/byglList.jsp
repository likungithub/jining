<%--
  Created by IntelliJ IDEA.
  User: 小杨
  Date: 2019/7/6
  Time: 16:29
  To change this template use File | Settings | File Templates.
--%>
<%@page import="java.util.UUID,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    UUID uuid = UUID.randomUUID();
    Calendar cal = Calendar.getInstance();
    cal.setTime(new Date());
    //获取某月最小天数
    int firstDay = cal.getActualMinimum(Calendar.DAY_OF_MONTH);
    //设置日历中月份的最小天数
    cal.set(Calendar.DAY_OF_MONTH, firstDay);
    //格式化日期
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    String dyt = sdf.format(cal.getTime());
    int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
    //设置日历中月份的最大天数
    cal.set(Calendar.DAY_OF_MONTH, lastDay);
    String zhyt = sdf.format(cal.getTime());


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
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品编码</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="ypbm" id="ypbm<%=uuid%>"
                                               placeholder="请输入样品编码"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="ypmc" id="ypmc<%=uuid%>"
                                               placeholder="请输入样品名称"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <%--<div class="date pull-left beginTime mr">--%>
                                        <%--<label class="labelCommon labelBg color666 dateLabel-m">时间</label>--%>
                                        <%--<input type="text" class="inputCommon appsysinfo-m" value="<%=dyt%>" id="rqq<%=uuid%>" readonly name="rqq" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />--%>
                                        <%--<span>--%>
                                        <%--<button class="btn btn-default appsysinfobtn-m" type="button" style="height: 33px;border-radius: 0 4px 4px 0!important;">--%>
                                            <%--<i class="fa fa-calendar"></i>--%>
                                        <%--</button>--%>
                                    <%--</span>--%>
                                    <%--</div>--%>
                                    <%--<div class="input-group date endTime mr">--%>
                                        <%--<div class="pull-left mr" style="height: 33px;line-height: 33px">&nbsp;-&nbsp;</div>--%>
                                            <%--<input type="text" class="inputCommon appsysinfo-m" value="<%=zhyt%>" id="rqz<%=uuid%>" readonly name="rqz" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />--%>
                                        <%--<span>--%>
                                        <%--<button class="btn btn-default appsysinfobtn-m" type="button" style="height: 33px;border-radius: 0 4px 4px 0!important;">--%>
                                    <%--<i class="fa fa-calendar"></i>--%>
                                    <%--</button>--%>
                                    <%--</span>--%>
                                    <%--</div>--%>

                                </div>
                                <br>
                                <!--按钮  end-->
                                <div>
                                    <button id="ypjsSearch<%=uuid%>"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>查询
                                    </button>
                                    <button id="reset<%=uuid%>"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>重置
                                    </button>
                                    <button id="guanli<%=uuid%>"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>管理
                                    </button>
                                    <button id="delete<%=uuid%>"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>删除
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form id="lygl_form">
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" id="list_data<%=uuid%>" name="ypjs-table" style="width:100%;margin-top: 15px!important">
                        <thead>
                        <tr>
                            <th width="10px"><input type="checkbox"  name="check1"></th>
                            <th width="120px">样品名称</th>
                            <th width="120px">样品编号</th>
                            <th width="12%">样品数量</th>
                            <th width="0px" style="width: 0px"></th>
                            <th width="12%">入库时间</th>
                            <th width="12%">保存时间</th>
                            <th width="12%">备注</th>
                            <%--<th width="12%">报告打印数量</th>--%>
                        </tr>
                        </thead>
                    </table>
                </div>
            </form>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/ypgl/bygl/byglList.js" type="text/javascript"></script>
<script type="text/javascript">
    $("#rqq<%=uuid%>").datepicker({
        clearBtn: true,
        format: 'yyyy-mm-dd',
        autoclose: true,
        language: 'zh-CN'
    });
    $("#rqz<%=uuid%>").datepicker({
        clearBtn: true,
        format: 'yyyy-mm-dd',
        autoclose: true,
        language: 'zh-CN'
    });
    $(function() {
        byglList.setPath("<%= request.getContextPath()%>");
        byglList.init("<%=uuid %>","<%=dyt%>","<%=zhyt%>");
    });
    function goto(obj,lie)
    {
        byglList.openmx(obj,lie);
    }
</script>