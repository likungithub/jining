<%@page import="java.util.UUID" %>
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
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 15px">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="height: 20px;margin: 0 0 15px;">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="padding-bottom: 10px;">
                                    <div style="clear:both;overflow: hidden;margin: 5px auto;">
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">样品编码</label>
                                            <input type="text" class="appsysinfo-m inputCommon"
                                                   name="ypbm" placeholder="请输入样品编码"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                            <input type="text" class="appsysinfo-m inputCommon" name="ypmc"
                                                   placeholder="请输入样品名称"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">任务分配状态</label>
                                            <select name="zbfpzt" class="appsysinfo-m inputCommon" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
                                                <option value="">下拉选择分配状态</option>
                                                <option value="001">未分配</option>
                                                <option value="002">已分配</option>
                                            </select>
                                        </div>
                                    </div>
                                <div style="float: right;width:100%;">
                                    <button id="btn_rwfp"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>
                                        制备任务分配
                                    </button>
                                    <button id="btn_back"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>
                                        制备任务退回
                                    </button>
                                    <button style="margin-left: 10px" id="searchTerm-m"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>
                                        查&nbsp;询&nbsp;
                                    </button>
                                    <button style="margin-left: 10px" id="reset"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>
                                        重&nbsp;置&nbsp;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover paramsTab" id="ManagerList" width="100%">
                        <thead>
                        <tr class="color333">
                            <th width="10px"><input type="checkbox" name="ck"/></th>
                            <th>样品编码</th>
                            <th>样品名称</th>
                            <th>生产单位</th>
                            <th>是否蔬果肉</th>
                            <th>制备分配状态</th>
                            <th>制备状态</th>
                            <th>制备人员</th>
                            <th>制备分配时间</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<%= request.getContextPath()%>/assets/pages/scripts/ypgl/ypzbfp/ypzbfp.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        ypzbfpList.setPath("<%= request.getContextPath()%>");
        ypzbfpList.init('<%=uuid%>');
    });
</script>