<%@page import="java.util.UUID" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
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
<div class="row contentBgColor" id="<%=uuid%>cgsq-manager-container">
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 5px 10px;">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 1px;margin-bottom: 10px;">
                                <div style="clear:both;overflow: hidden;margin-top: 5px;">
                                        <input type="text" value="5" name="hclx" style="display: none">
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">耗材名称</label>
                                            <input type="text" class="inputCommon appsysinfo-m" id="hcmc" name="hcmc"
                                                   placeholder="请输入耗材名称"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">申请状态</label>
                                            <select id="sqzt" class="inputCommon appsysinfo-m"
                                                    style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
                                                <option value="">下拉选择申请状态</option>
                                                <option value="001">申请中</option>
                                                <option value="002">审批通过</option>
                                                <option value="003">审批未通过</option>
                                                <option value="004">已采购</option>
                                            </select>
                                        </div>
                                        <div class="openMore pull-left" style="margin-bottom: 0px;">
                                            <div class="date beginTime pull-left">
                                                <label class="labelCommon labelBg color666 dateLabel-m"
                                                       style="width: 80px !important;">申请日期</label>
                                                <input type="text" class="appsysinfo-m inputCommon " id="date1"
                                                       name="date1" style="border-radius: 0 !important; width: 100px">
                                                <span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button"
                                                    style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                            </div>
                                            <span style="float: left;margin: 5px">至</span>
                                            <div class="input-group date endTime pull-left">
                                                <input type="text" class="inputCommon appsysinfo-m" id="date2"
                                                       name="date2"
                                                       style="border-radius: 4px 0 0 4px!important;width: 100px">
                                                <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button"
                                                style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                            </div>
                                            <div style="clear: both"></div>
                                        </div>
                                </div>
                                <!--按钮  begin-->
                                <div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
                                    <button id="xz"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>新增
                                    </button>
                                    <button id="cgsqSc"
                                            class="btn  btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-trash iconMr"></i> 批量删除
                                    </button>
                                    <button id="cgsqCncgsqCn"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>查询
                                    </button>
                                    <button id="cgsqCz"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>重置
                                    </button>
                                    <button id="cgsqDaoRu"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>批量导入
                                    </button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="dataTables_wrapper no-footer">
                        <table class="table table-striped table-hover paramsTab" id="ManagerList_mcgsq1" width="100%">
                            <thead>
                            <tr class="color333">
                                <th class="text-left" width="10px"><input type="checkbox" name="check"></th>
                                <th class="text-left" width="30px">操作</th>
                                <th class="text-left">耗材名称</th>
                                <th class="text-left">规格</th>
                                <th class="text-left">级别</th>
                                <th class="text-left">数量</th>
                                <th class="text-left">单价</th>
                                <th class="text-left">总价</th>
                                <th class="text-left">品牌</th>
                                <th class="text-left">采购目的</th>
                                <th class="text-left">申请日期</th>
                                <th class="text-left">审核状态</th>
                                <th class="text-left">编制状态</th>
                                <th class="text-left">申请状态</th>
                                <th class="text-left">耗材类型</th>
                                <th class="text-left">备注</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/cgsq/cgsq.js"></script>
<script src="<%=request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script type="text/javascript">
    cgsqList.setPath("<%=request.getContextPath()%>");
    cgsqList.inint("<%=uuid%>","bzwz");
</script>

