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
                                        <label class="labelCommon labelBg color666 dateLabel-m">人员名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="ypmc"
                                               placeholder="请输入人员名称"
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
                            <th style="text-align: center">人员名称</th>
                            <%--<th>样品编码</th>--%>
                            <th style="text-align: center">企业委托</th>
                            <th style="text-align: center">政府委托</th>
                            <th style="text-align: center">领样</th>
                            <th style="text-align: center">制备</th>
                            <th style="text-align: center">检测</th>
                            <th style="text-align: center">编制</th>
                            <th style="text-align: center">审核</th>
                            <th style="text-align: center">打印</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style="text-align: center">孙琛琛</td>
                            <%--<th>样品编码</th>--%>
                            <td style="text-align: center">32</td>
                            <td style="text-align: center">20</td>
                            <td style="text-align: center">33</th>
                            <td style="text-align: center">33</th>
                            <td style="text-align: center">15</th>
                            <td style="text-align: center">14</th>
                            <td style="text-align: center">9</th>
                            <td style="text-align: center">8</th>
                        </tr>
                        <tr>
                            <td style="text-align: center">朱铎坤</th>
                            <%--<th>样品编码</th>--%>
                            <td style="text-align: center">22</th>
                            <td style="text-align: center">52</th>
                            <td style="text-align: center">33</th>
                            <td style="text-align: center">28</th>
                            <td style="text-align: center">20</th>
                            <td style="text-align: center">19</th>
                            <td style="text-align: center">15</th>
                            <td style="text-align: center">15</th>
                        </tr>
                        <tr>
                            <td style="text-align: center">于辉</th>
                            <%--<th>样品编码</th>--%>
                            <td style="text-align: center"><span style="cursor: pointer;color: blue;" onclick="goto()">2</span></th>
                            <td style="text-align: center">5</th>
                            <td style="text-align: center">7</th>
                            <td style="text-align: center">28</th>
                            <td style="text-align: center">32</th>
                            <td style="text-align: center">19</th>
                            <td style="text-align: center">43</th>
                            <td style="text-align: center">11</th>
                        </tr>
                        <tr>
                            <td style="text-align: center">张鹏飞</th>
                            <%--<th>样品编码</th>--%>
                            <td style="text-align: center">7</th>
                            <td style="text-align: center">9</th>
                            <td style="text-align: center">20</th>
                            <td style="text-align: center">28</th>
                            <td style="text-align: center">33</th>
                            <td style="text-align: center">29</th>
                            <td style="text-align: center">22</th>
                            <td style="text-align: center">12</th>
                        </tr>
                        <tr>
                            <td style="text-align: center">李健</th>
                            <%--<th>样品编码</th>--%>
                            <td style="text-align: center">1</th>
                            <td style="text-align: center">4</th>
                            <td style="text-align: center">42</th>
                            <td style="text-align: center">39</th>
                            <td style="text-align: center">21</th>
                            <td style="text-align: center">11</th>
                            <td style="text-align: center">10</th>
                            <td style="text-align: center">7</th>
                        </tr>
                        <tr>
                            <td style="text-align: center">王娟</th>
                            <%--<th>样品编码</th>--%>
                            <td style="text-align: center">3</th>
                            <td style="text-align: center">10</th>
                            <td style="text-align: center">22</th>
                            <td style="text-align: center">39</th>
                            <td style="text-align: center">32</th>
                            <td style="text-align: center">15</th>
                            <td style="text-align: center">19</th>
                            <td style="text-align: center">14</th>
                        </tr>
                        <tr>
                            <td style="text-align: center">于华</th>
                            <td style="text-align: center">2</th>
                            <%--<th>样品编码</th>--%>
                            <td style="text-align: center">3</th>
                            <td style="text-align: center">8</th>
                            <td style="text-align: center">13</th>
                            <td style="text-align: center">11</th>
                            <td style="text-align: center">54</th>
                            <td style="text-align: center">49</th>
                            <td style="text-align: center">62</th>
                        </tr>
                        <tr>
                            <td style="text-align: center">邵帅</th>
                            <td style="text-align: center">8</th>
                            <%--<th>样品编码</th>--%>
                            <td style="text-align: center">14</th>
                            <td style="text-align: center">11</th>
                            <td style="text-align: center">36</th>
                            <td style="text-align: center">32</th>
                            <td style="text-align: center">23</th>
                            <td style="text-align: center">18</th>
                            <td style="text-align: center">16</th>
                        </tr>
                        <tr>
                            <td style="text-align: center">邵恬恬</th>
                            <td style="text-align: center">4</th>
                            <%--<th>样品编码</th>--%>
                            <td style="text-align: center">22</th>
                            <td style="text-align: center">26</th>
                            <td style="text-align: center">24</th>
                            <td style="text-align: center">14</th>
                            <td style="text-align: center">29</th>
                            <td style="text-align: center">10</th>
                            <td style="text-align: center">9</th>
                        </tr>
                        <tr>
                            <td style="text-align: center">矫文文</th>
                            <td style="text-align: center">7</th>
                            <%--<th>样品编码</th>--%>
                            <td style="text-align: center">13</th>
                            <td style="text-align: center">20</th>
                            <td style="text-align: center">15</th>
                            <td style="text-align: center">43</th>
                            <td style="text-align: center">25</th>
                            <td style="text-align: center">28</th>
                            <td style="text-align: center">17</th>
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
<script type="text/javascript">
    var goto = function () {
            viewJcxmTab(this, "/customermanage/customerManage/gkslist_mx.jsp" , "台账明细", "tzglmx", '');
    };
    var viewJcxmTab = function (_target, srcStr, menuName, id, icon) {
        //标签移除
        $("#tab-page-nav-" + id).remove();
        //内容移除
        $("#tab-page-content-" + id).remove();
        var _opt;
        var $a_alarm = $('ul.page-sidebar-menu').find('a.nav-link.nav-toggle[url="' + srcStr + '"]');
        if ($a_alarm.length > 0) {
            console.log(11111);
            _opt = {
                title: '<i class="' + $a_alarm.find('i').attr('class') + '"><i></i></i> ' + $a_alarm.find('span').html(),
                id: $a_alarm.data('addtab'),
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        } else {
            console.log(222222);
            _opt = {
                title: '<i class="' + icon + '"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    };
</script>