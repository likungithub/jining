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
                                    <form id="findByNamesyljl">
                                        <input type="text" value="5" name="hclx" style="display: none">
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">耗材名称</label>
                                            <input type="text" class="inputCommon appsysinfo-m" id="hcmcsyljl" name="hcmc"
                                                   placeholder="请输入耗材名称"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                    </form>
                                </div>
                                <!--按钮  begin-->
                                <div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
                                    <button id="xzsyljl"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>新增
                                    </button>
                                    <button id="cgsqScsyljl"
                                            class="btn  btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-trash iconMr"></i> 批量删除
                                    </button>
                                    <button id="cgsqCncgsqCnsyljl"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>查询
                                    </button>
                                    <button id="cgsqCzsyljl"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>重置
                                    </button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="dataTables_wrapper no-footer">
                        <table class="table table-striped table-hover paramsTab" id="ManagerList_mcgsq1syljl" width="100%">
                            <thead>
                            <tr class="color333">
                                <th class="text-left" width="10px"><input type="checkbox" name="check"></th>
                                <th class="text-left">耗材名称</th>
                                <th class="text-left">开启人</th>
                                <th class="text-left">开启时间</th>
                                <th class="text-left">剩余量</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/syljl/syljl.js"></script>
<script src="<%=request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script type="text/javascript">
    cgsqListsyljl.setPath("<%=request.getContextPath()%>");
    cgsqListsyljl.inint("<%=uuid%>");
</script>

