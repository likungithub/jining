<%@ page import="java.util.*" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
    .rotate1 {
        transform: rotate(180deg);
    }
</style>
<%
    String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
    <!-- 查询区域-->
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 5px 10px;">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
                                <div style="clear:both;overflow: hidden;margin-top: 5px;">
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">检测项名称</label>
                                            <input type="text" class="inputCommon appsysinfo-m" id="yqyysy_jcxmc"
                                                   placeholder="请输入检测项名称"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                      <%--  <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">是否仪器分配</label>
                                            <select class="inputCommon appsysinfo-m" id="yqyysy_if_yqfp" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
                                                <option value=""></option>
                                                <option value="001">未分配</option>
                                                <option value="002">已分配</option>
                                            </select>
                                        </div>--%>
                                </div>
                                <!--按钮  begin-->
                                <div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
                                    <button id="yqyysy_chaxun"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>查询
                                    </button>
                                    <button id="yqyysy_zjyq"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>增加仪器
                                    </button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <form method="post" id="yqyysy_form_choose">
                        <table class="table table-striped table-hover paramsTab" id="yqyysy_ManagerList_m"
                               width="100%">
                            <thead id="th">
                            <tr class="color333">
                                <th class="text-left">选择</th>
                                <th class="text-left">检修项目名称</th>
                                <th class="text-left">细类</th>
                                <th class="text-left">次亚类</th>
                                <th class="text-left">亚类</th>
                                <th class="text-left">判定依据</th>
                                <th class="text-left">检测依据</th>
                                <th class="text-left">是否仪器分配</th>
                            </tr>
                            </thead>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/yqgl/yqyysy.js"></script>


