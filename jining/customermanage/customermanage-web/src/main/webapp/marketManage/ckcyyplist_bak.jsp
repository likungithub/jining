<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%
    String wtid = request.getParameter("wtid");
    if (wtid == null) {
        wtid = "";
    }
    UUID uuid = UUID.randomUUID();
%>
<style>
    #ypTable_data .bb {
        font-size: 12px;
        color: #999;
        margin-top: 2px;
        display: inline-block;
    }

    .next {
        position: relative;
        left: -10px;
    }

    .getTree {
        margin-top: 17px;
    }

    #ypTable_data td:nth-child(2) {
        text-align: left;
    }

    #ypTable_data td:nth-child(3) {
        text-align: center;
    }

    #ypTable_data td {
        padding: 6px !important;
    }

    #ypTable_data td:nth-child(4) {
        text-align: center;
    }

    #ckcyyp<%=uuid%> .slimScrollDiv {
        height: auto !important;
    }

    #ckcyyp<%=uuid%> .slimScrollDiv .portlet-scroller {
        height: auto !important;
    }

    #ckcyyp<%=uuid%> .rotate1 {
        transform: rotate(180deg);
    }

    #ckcyyp<%=uuid%> .moreInfo {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        padding: 0 4px;
        cursor: pointer;
    }

    #ckcyyp<%=uuid%> .btnM {
        width: 100%;
        border: none
    }
</style>
<div class="" id="ckcyyp<%=uuid %>">
    <div class="ui-layout-west" style="padding: 10px!important;">
        <div class="ui-layout-content contentBgColor" style="background:#fff!important;padding: 0;">
            <div class="portlet">
                <div class="portlet-body form" style="overflow-x:hidden;min-height: 242px">
                    <div class="table-toolbar" style="margin-bottom: 0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row search-body" style="margin-left: 10px;">
                                    <div style="clear:both;overflow: hidden;">
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                            <input type="text" class="appsysinfo-m inputCommon" name="ypmc"
                                                   placeholder="请输入样品名称"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                    </div>
                                    <br>
                                    <!--按钮  begin-->
                                    <div style="clear: both;">
                                        <button id="addYddypxx"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-plus iconMr"></i>新增
                                        </button>
                                        <button id="importYpxx"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-plus iconMr"></i>样品批量导入
                                        </button>
                                        <button id="savejcx"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-plus iconMr"></i>增加检测项
                                        </button>
                                        <%-- <button id="addJcb1" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导入检测包</button>--%>
                                        <button id="qywtSearch"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-search iconMr"></i>查询
                                        </button>
                                        <button id="reset"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-refresh iconMr"></i>重置
                                        </button>
                                    </div>
                                    <!--按钮  end-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="clear: both;"></div>
                    <div class="portlet-scroller">
                        <div class="dataTables_wrapper no-footer">
                            <table class="table table-striped table-bordered table-hover" id="yplist_data">
                                <thead>
                                <tr>
                                    <th width="5px" class="text-left"><input type="checkbox" name="check1"/></th>
                                    <th width="6%" class="text-center">操作</th>
                                    <th width="6%" class="text-center">样品编号</th>
                                    <th width="6%" class="text-center">样品名称</th>
                                    <th width="6%" class="text-center">样品等级</th>
                                   <%-- <th width="6%" class="text-center">样品数量</th>
                                    <th width="6%" class="text-center">样品单位</th>
                                    <th width="6%" class="text-center">生产日期</th>--%>
                                    <th width="6%" class="text-center">样品批号或原编号</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   <div class="ui-layout-center" style="padding: 10px!important;">
    <div class="ui-layout-content contentBgColor" style="background:#fff!important;padding: 0;">
        <div class="portlet">
            <div class="portlet-body form" style="overflow-x:hidden;min-height: 242px">
                    <div class="table-toolbar" style="margin-bottom: 0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row search-body" style="margin-left: 10px;">
                                    <div style="clear:both;overflow: hidden;">
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">检测项目名称</label>
                                            <input type="text" class="appsysinfo-m inputCommon" name="jcxmc"
                                                   placeholder="请输入检测项目名称"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                    </div>
                                    <br>
                                    <!--按钮  begin-->
                                    <div style="clear: both;">
                                        <button id="jcxmDel"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-plus iconMr"></i>批量删除
                                        </button>
                                        <button id="jcxmSearch"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-search iconMr"></i>查询
                                        </button>
                                        <button id="jcxmReset"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-refresh iconMr"></i>重置
                                        </button>
                                    </div>
                                    <!--按钮  end-->
                                </div>
                            </div>
                        </div>
                    </div>
                <div style="clear: both;"></div>
                    <div class="portlet-scroller">
                        <div class="dataTables_wrapper no-footer">
                            <table class="table table-striped table-bordered table-hover" id="jcxmlist_data">
                                <thead>
                                <tr>
                                    <th width="5px" class="text-left"><input type="checkbox" name="check2"/></th>
                                    <th width="6%" class="text-center">检测项目名称</th>
                                    <th width="6%" class="text-center">细类</th>
                                    <th width="6%" class="text-center">检出限</th>
                                    <th width="6%" class="text-center">限量值</th>
                                    <th width="6%" class="text-center">检测方法</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/ckcyyplist.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        yddypList.setPath("<%= request.getContextPath()%>");
        yddypList.init("<%=uuid %>", "<%=wtid%>");
    });
</script>