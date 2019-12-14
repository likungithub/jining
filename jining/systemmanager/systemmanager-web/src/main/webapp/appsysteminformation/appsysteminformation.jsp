<%@ page import="java.util.UUID" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%--
  Created by IntelliJ IDEA.
  User: huxinquan
  Date: 2017/7/31
  Time: 17:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String UniqueID= UUID.randomUUID().toString();
%>

<div class="row contentBgColor" id="appSystemInformation_<%=UniqueID%>">
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 15px">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="margin: 0 0 15px;height: 33px">
                    <div class="row">
                        <div class="col-md-12" style="padding-left: 0">
                            <os:hasSecurityResource identifier="addNewNoticeBtn">
                            <button id="btnNew" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                <i class="fa fa-plus iconMr"></i>发布通知
                            </button>
                            </os:hasSecurityResource>
                            <os:hasSecurityResource identifier="delNoticeBtn">
                            <button id="btnDelAll" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                <i class="icon iconfont icon-del"></i>
                                删除
                            </button>
                            </os:hasSecurityResource>
                            <os:hasSecurityResource identifier="editNoticeBtn">
                                <div id="editNoticeBtn"></div>
                            </os:hasSecurityResource>
                            <%--<div class="pull-left">
                                <div class="input-icon" style="width: 190px;">
                                    <i class="fa fa-search colorBlue-10a0f7"></i>
                                    <input type="search" class="form-control borderRadius4" id="searchAppSystemInformation"
                                           placeholder="" style="width: 220px"></div>
                            </div>--%>
                            <div style="float: right">
                                <div class="date beginTime pull-left mr">
                                    <label class="labelCommon labelBg color666 dateLabel-m">录入日期</label>
                                    <input type="text"  readonly class="appsysinfo-m inputCommon " name="beginTime" style="border-radius: 0 !important;">
                                    <span>
                                    <button class="btn btn-default appsysinfobtn-m" type="button">
                                        <i class="fa fa-calendar"></i>
                                    </button>
                                </span>
                                </div>
                                <div class="input-group date endTime pull-left mr">
                                    <div class="pull-left mr" style="height: 33px;line-height: 33px">&nbsp;-&nbsp;</div>
                                    <input type="text"  readonly class="inputCommon appsysinfo-m" name="endTime" style="border-radius: 0 !important;">
                                    <span>
                                    <button class="btn btn-default appsysinfobtn-m" type="button">
                                <i class="fa fa-calendar"></i>
                                </button>
                                </span>
                                </div>
                                <button id="searchByDate" class="btn btn-default btnBlue borderRadius4  colorfff mr">
                                    <i class="fa fa-search iconMr"></i>
                                    查询
                                </button>
                                <button id="btnReset" class="btn btn-default btnBlue borderRadius4  colorfff">
                                    <i class="fa fa-refresh iconMr"></i>
                                    重置
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover text-center"
                           id="appsysteminformation_data">
                        <thead>
                            <tr class="color333">
                                <th style="width: 40px">
                                    <label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                        <input type="checkbox" class="group-checkable" id="allCheck"/>
                                        <span></span>
                                    </label>
                                </th>
                                <th width="80px">客户端类型</th>
                                <th width="80px">通知类型</th>
                                <th width="80px">设备类型</th>
                                <th style="text-align: left;">通知标题</th>
                                <th width="80px">升级时间</th>
                                <th width="120px">操作</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<link rel="stylesheet" href="<%= request.getContextPath()%>/assets/pages/css/appsysterminformation/appsysterminformation.css">
<script src="<%= request.getContextPath()%>/assets/pages/scripts/appsysteminformation/appsysteminformation.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        appsysteminformation.setPath("<%= request.getContextPath()%>");
        appsysteminformation.init("<%= UniqueID%>");
    });
</script>