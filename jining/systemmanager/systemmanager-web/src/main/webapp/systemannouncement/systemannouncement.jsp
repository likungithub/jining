<%@ page import="java.util.UUID" %>
<%--
  Created by IntelliJ IDEA.
  User: huxinquan
  Date: 2017/6/23
  Time: 8:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String UniqueID = UUID.randomUUID().toString();
	String firstpage = request.getParameter("firstpage");
	if (firstpage == null) {
	    firstpage = "0";
	}
%>

<div class="row contentBgColor systemAnnouncement-m" id="systemAnnouncement_<%=UniqueID%>">
    <div class="col-md-12">
        <div class="portlet light bordered">
            <div class="portlet-body">
                <div class="table-toolbar">
                    <div class="row">
                        <div class="col-md-12">
                            <os:hasSecurityResource identifier="editSystemAnnouncement">
                                <button id="addNewGGbtn" class="btn btn-default btnAdd pull-left borderRadius4 mr colorfff" style="margin-left: -14px;
    padding: 6px 8px;">
                                    <i class="fa fa-plus"></i>
                                发布公告
                                </button>
                                <div id="editSystemAnnouncementBtnPermissions"></div>
                            </os:hasSecurityResource>
                            <os:hasSecurityResource identifier="deleteSystemAnnouncement">
                                <button id="btnDelAll" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                    <i class="icon iconfont icon-del"></i>
                                    删除
                                </button>
                                <div id="deleteSystemAnnouncementBtnPermissions"></div>
                            </os:hasSecurityResource>
                            <button id="btnIsRead" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 pull-left borderRadius4">
                                <i class="icon iconfont icon-duihao1"></i>
                                阅读
                            </button>
                            <div style="float: right">
                                <div class="pull-left" id="jieshoufangleixingM">
                                    <label class="labelCommon color666" style="width: 96px">
                                        接收方类型
                                    </label>
                                    <select class="mr" name="jsflx" id="cx_id_jsflx" style="width: 96px;border: 1px solid #ccc;border-radius: 0 5px 5px 0!important;height: 33px;">
                                        <option value="000">全部</option>
                                        <option value="0">员工</option>
                                        <1--<option value="1">客户</option>-->
                                    </select>
                                </div>

                                <div class="date beginTime pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m">录入日期</label>
                                    <input type="text" readonly class="appsysinfo-m inputCommon" name="beginTime" style="border-radius: 0 !important;width: 80px">
                                    <span>
                                    <button class="btn btn-default appsysinfobtn-m publicBtn" type="button">
                                        <i class="fa fa-calendar"></i>
                                    </button>
                                </span>
                                </div>
                                <span style="float: left;margin: 5px">-</span>
                                <div class="input-group date endTime pull-left mr">
                                    <input type="text" readonly class="inputCommon appsysinfo-m" name="endTime" style="border-radius:4px 0 0 4px !important;width: 80px">
                                    <span>
                                    <button class="btn btn-default appsysinfobtn-m publicBtn" type="button">
                                <i class="fa fa-calendar"></i>
                                </button>
                                </span>
                                </div>
                                <div class="pull-left mr">
                                    <div class="input-icon" style="width: 144px;">
                                        <input style="padding: 12px" type="search" class="form-control borderRadius4" id="searchSystemAnnouncement"
                                               placeholder="标题">
                                    </div>
                                </div>
                                <button id="btnSearch" class="btn btn-default btnBlue borderRadius4  colorfff mr" style="padding: 6px 8px">
                                    <i class="fa fa-search iconMr"></i>
                                    搜索
                                </button>
                               <%-- <button id="btnReset" class="btn btn-default btnBlue borderRadius4  colorfff">
                                    <i class="fa fa-refresh iconMr"></i>
                                    重置
                                </button>--%>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped  table-hover paramsTab"
                           id="systemannouncement_data">
                        <thead>
                        <tr>
                            <th style="width:2%">
                                <label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                    <input type="checkbox" class="group-checkable" id="allCheck"/>
                                    <span></span>
                                </label>
                            </th>
                            <th width="18%" class="text-left">类型</th>
                            <th class="text-left" width="15%">标题</th>
                            <th class="text-left" id="jieshoufangleixingMT" width="15%">接收方类型</th>
                            <th class="text-left" width="20%">发布人</th>
                            <th width="15%">录入日期</th>
                            <th width="15%">操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/systemannouncement/systemannouncement.css" rel="stylesheet" type="text/css" />
<script src="<%= request.getContextPath()%>/assets/pages/scripts/systemannouncement/systemannouncement.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        systemannouncement.setPath("<%= request.getContextPath()%>");
        systemannouncement.init("<%= UniqueID%>","<%=firstpage%>");
    });
</script>