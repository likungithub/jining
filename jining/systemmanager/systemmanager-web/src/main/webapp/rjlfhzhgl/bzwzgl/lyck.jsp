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
        <div class="portlet light bordered" style="padding: 5px 10px;">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 0px;margin-bottom: 10px;">
                                <div style="clear:both;overflow: hidden;margin-top: 5px;">
                                    <input type="text" value="5" name="hclx" style="display: none">
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">耗材名称</label>
                                        <form id="sub_from">
                                            <input type="text" class="inputCommon appsysinfo-m" name="hcmc"  id="hcmc"
                                                   placeholder="请输入耗材名称"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </form>
                                    </div>
                                </div>
                                <!--按钮  begin-->
                                <div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
                                    <button id="lyck_ck"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>出库
                                    </button>
                                    <button id="lyck_cx"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>查询
                                    </button>
                                    <button id="lyck_cz"
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
                    <form id="manage_th">
                        <table class="table table-striped table-hover paramsTab" id="lyck_list" width="100%">
                            <thead data-options="frozen:true">
                            <tr class="color333">
                                <th class="text-left" width="10px"><input type="checkbox" name="lyckCheck"></th>
                                <th class="text-left">耗材名称</th>
                                <th class="text-left">规格</th>
                                <th class="text-left">级别</th>
                                <th class="text-left">库存数量</th>
                                <th class="text-left">领用数量</th>
                                <th class="text-left">领用申请人</th>
                                <th class="text-left">领用申请日期</th>
                               <%-- <th class="text-left">领用申请状态</th>
                                <th class="text-left">一级审批人</th>
                                <th class="text-left">一级审批日期</th>
                                <th class="text-left">二级审批人</th>
                                <th class="text-left">二级审批日期</th>--%>
                            </tr>
                            </thead>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="application/javascript"
        src="<%=request.getContextPath()%>/assets/pages/scripts/hcly/lyck/lyck.js"></script>
<script type="application/javascript">
    lyckList.setPath("<%=request.getContextPath()%>");
    lyckList.inint("<%=uuid%>");
</script>