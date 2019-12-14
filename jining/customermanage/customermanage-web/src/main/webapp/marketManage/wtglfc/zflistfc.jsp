<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    UUID uuid = UUID.randomUUID();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();

%>
<style>
    .search-input-small {
        width: auto !important;
    }
    .btnwhite{
        background-color: #fff;
        border:1px solid #dedede;
        border-radius: 3px;
    }
    .btnBorderColor{
        color: #10a0f7;
        border:1px solid #10a0f7;
    }
    #htshDIV1   .rotate1 {
        transform: rotate(180deg);
    }
    /* 总计样式 */
    .total-tfoot th{
        font-weight:normal!important;
        font-size: 12px!important;
        overflow: hidden!important;
        text-overflow:ellipsis!important;
        white-space: nowrap!important;
        padding-right: 8px!important;
        padding-left: 8px!important;
    }
</style>
<div class="" id="zfwt<%=uuid %>">
    <div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
        <div class="portlet light bordered" style="padding: 8px">
            <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 10px;">
                                <div style="clear:both;overflow: hidden;">
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品编号</label>
                                        <input type="text" class="appsysinfo-m inputCommon" name="cydbh"  placeholder="请输入样品编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                        <input type="text" class="appsysinfo-m inputCommon" name="ypmc"  placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">年月</label>
                                        <div class="date nianyue pull-left wtny">
                                            <input type="text" readonly="" id="weituonianyue" class="appsysinfo-m inputCommon " name="wtny"
                                                   style="border-radius: 0 !important; width: 100px">
                                            <span>
													<button class="btn btn-default appsysinfobtn-m" type="button"
                                                            style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
													<i class="fa fa-calendar"></i>
													</button>
												</span>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <!--按钮  begin-->
                                <div style="clear: both;">
                                    <button id="addSPCY" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>
                                    <button id="spcySearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                                    <button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                                    <button id="zf_tjReadonly" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>提交</button>
                                   <%-- <button id="btn_zfwtdybq" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>打印标签</button>
                                    <button id="btn_wtbqdy" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>标签</button>--%>
                                    <button id="savejcxZfwt" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>添加检测项</button>
                                    <%--<button id="showdzcyd" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>电子抽样单</button>--%>
                                    <button id="daochu" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>样品库房管理台账</button>
                                  <%--  <button id="djscdc" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>对接市抽导出</button>--%>

                                    <button id="importZFWT" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>委托批量导入</button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" id="list_data" style="width:100%;margin-top: 15px!important">
                        <thead>
                        <tr>
                            <th field="ck" width="5px" class="text-left"><input type="checkbox" name="selectspcylist"/></th>
                            <th style="width: 80px;">操作</th>
                            <th>抽样单编号</th>
                            <th>被抽样单单位地址名称</th>
                            <th>联系电话</th>
                            <th>标称生产者名称</th>
                            <th>样品编号</th>
                            <th>食品名称</th>
                            <th style="width: 60px;">样品数量</th>
                            <th style="width: 60px;">提交状态</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/wtglfc/zflistfc.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        zfwtlist.setPath("<%= request.getContextPath()%>");
        zfwtlist.setDzcydPath("<%= basePath%>");
        zfwtlist.init("<%=uuid %>");
    });
</script>