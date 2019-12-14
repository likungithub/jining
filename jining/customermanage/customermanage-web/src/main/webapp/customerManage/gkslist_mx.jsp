<%--
  Created by IntelliJ IDEA.
  User: 小杨
  Date: 2019/7/6
  Time: 16:29
  To change this template use File | Settings | File Templates.
--%>
<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    String jclbdm = request.getParameter("jclbdm");
    if(jclbdm==null){
        jclbdm = "";
    }
//    String uuid = UUID.randomUUID().toString();
    java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    String txtstarDate = formatter.format(currentTime); //将日期时间格局化
    long dateMS = currentTime.getTime();
    dateMS = dateMS + 60 * 60 * 24 * 1000 * 1;
    currentTime.setTime(dateMS);
    String txtendDate = formatter.format(currentTime);
    UUID uuid = UUID.randomUUID();
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
                                        <label class="labelCommon labelBg color666 dateLabel-m">抽样单号</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="ypmc"
                                               placeholder="请输入抽样单号"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="date pull-left beginTime mr">
                                        <label class="labelCommon labelBg color666 dateLabel-m">时间</label>
                                        <input type="text" value="<%=txtstarDate%>" class="appsysinfo-m inputCommon " name="starDate" style="border-radius: 0 !important;width: 100px">
                                        <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                    </div>
                                    <div class="input-group date endTime mr">
                                        <%--<label class="labelCommon labelBg color666 dateLabel-m">结束</label>--%>
                                        <div class="pull-left mr" style="height: 33px;line-height: 33px">&nbsp;-&nbsp;</div>
                                        <input type="text" value="<%=txtendDate%>" class="inputCommon appsysinfo-m" name="endDate" style="border-radius: 0 !important;width:100px">
                                        <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                    </button>
                                    </span>
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
                                    <%--<button id="insertYp"--%>
                                            <%--class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4 ">--%>
                                        <%--<i class="fa fa-plus iconMr"></i>领样--%>
                                    <%--</button>--%>
                                    <%--<button id="deletedYp"--%>
                                            <%--class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4 ">--%>
                                        <%--<i class="fa fa-plus iconMr"></i>清除--%>
                                    <%--</button>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form id="lygl_form">
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" id="example2" name="yplz-table"
                           style="width:100%;margin-top: 15px!important">
                        <thead>
                        <tr>
                            <th style="text-align: center">录入人</th>
                            <%--<th>样品编码</th>--%>
                            <th style="text-align: center">抽样单编号</th>
                            <th style="text-align: center">受检单位名称</th>
                            <th style="text-align: center">受检联系电话</th>
                            <th style="text-align: center">生产单位名称</th>
                            <th style="text-align: center">样品编码</th>
                            <th style="text-align: center">样品名称</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style="text-align: center">于辉</td>
                            <td style="text-align: center">00001781</td>
                            <td style="text-align: center">即墨区蓝村镇赵伟早餐店</td>
                            <td style="text-align: center">13999889278</th>
                            <td style="text-align: center">青岛恒伊有机农业开发有限公司</th>
                            <td style="text-align: center">JMJC2019S2070063</th>
                            <td style="text-align: center">蓝莓果汁</th>
                        </tr>
                        <tr>
                            <td style="text-align: center">于辉</td>
                            <td style="text-align: center">0002160</td>
                            <td style="text-align: center">青岛恒伊有机农业开发有限公司</td>
                            <td style="text-align: center">18561272399</th>
                            <td style="text-align: center">哈尔滨洽洽食品有限公司</th>
                            <td style="text-align: center">JMJC2019S2070056</th>
                            <td style="text-align: center">瓜子</th>
                        </tr>
                        </tbody>
                    </table>
                    <div>
                        <span>第1页 (共4页), 共34条记录,每页</span>
                        <select style="width: 50px">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                        <span>条</span>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<%--<script src="<%= request.getContextPath()%>/assets/pages/scripts/BehaviorLog/behaviorlog.js" type="text/javascript"></script>--%>
<%--<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/gztz/gztz.js"></script>--%>
<%--<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/jquery-ui/jquery-ui.css">--%>
<%--<script src="<%=request.getContextPath()%>/assets/pages/jquery-ui/jquery-ui.js"></script>--%>
<script type="text/javascript">

</script>