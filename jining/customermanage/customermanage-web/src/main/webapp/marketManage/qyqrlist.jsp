<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    UUID uuid = UUID.randomUUID();
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
<div id="wtqrList-manager-content">
    <div class="" id="qywtqr<%=uuid %>">
        <div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
            <div class="portlet light bordered" style="padding: 8px">
                <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                    <div class="table-toolbar" style="margin-bottom: 0">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row search-body" style="margin-left: 10px;">
                                    <div style="clear:both;overflow: hidden;">
                                        <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">抽样单编号</label>
                                            <input type="text" class="appsysinfo-m inputCommon" name="cydbh"  placeholder="请输入抽样单编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                    </div>
                                    <!--按钮  begin-->
                                    <div style="clear: both;">
                                        <button id="addYDDCY" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>增加抽样单</button>
                                        <button id="qywtSearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                                        <button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                                        <%--<button id="importQYWT" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导入</button>--%>
                                    </div>
                                    <!--按钮  end-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dataTables_wrapper no-footer">
                        <table class="table table-striped table-bordered table-hover" id="qyqrlist_data" style="width:100%;margin-top: 15px!important">
                            <thead>
                            <tr>
                                <th field="ck" width="20px" class="text-left"><input type="checkbox" name="selectqywtqrlist"/></th>
                                <th>操作</th>
                                <th>抽样单编号</th>
                                <th>抽样地点</th>
                                <th>抽样联系人</th>
                                <th>抽样联系电话</th>
                                <th>抽样日期</th>
                                <th>受检单位</th>
                                <th>抽样类别</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/qyqrlist.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        yddcydList.setPath("<%= request.getContextPath()%>");
        yddcydList.init("<%=uuid %>");
    });
</script>