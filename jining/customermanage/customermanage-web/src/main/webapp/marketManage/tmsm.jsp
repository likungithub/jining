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

    .btnwhite {
        background-color: #fff;
        border: 1px solid #dedede;
        border-radius: 3px;
    }

    .btnBorderColor {
        color: #10a0f7;
        border: 1px solid #10a0f7;
    }

    #htshDIV1 .rotate1 {
        transform: rotate(180deg);
    }

    /* 总计样式 */

    .total-tfoot th {
        font-weight: normal !important;
        font-size: 12px !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        padding-right: 8px !important;
        padding-left: 8px !important;
    }

    #list_data_wrapper {
        overflow-x: auto;
    }

    #list_data_wrapper .table {
        width: auto !important;
    }

    #list_data_wrapper .table th {
        white-space: nowrap;
    }
</style>
<div class="" id="tmsm<%=uuid %>">
    <div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
        <div class="portlet light bordered" style="padding: 8px">
            <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 10px;">
                                <div style="clear:both;overflow: hidden;">
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品编号</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="ypbmsm" id="ypbmsm"
                                               placeholder="请扫码或输入样品编号"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                </div>
                                <br>
                                <div style="clear: both;">
                                    <button id="Search"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>查询
                                    </button>
                                    <button id="btn_tj"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>提交
                                    </button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" id="tmsm_data" name="tmsm-table"
                           style="width:100%;margin-top: 15px!important">
                        <thead>
                        <tr>
                            <th style="text-align:center;">合同编号</th>
                            <th style="text-align:center;">合同名称</th>
                            <th style="text-align:center;">样品编号</th>
                            <th style="text-align:center;">样品名称</th>
                            <th style="text-align:center;">保质期</th>
                        </tr>
                        </thead>
                        <tr>
                            <td id="td_htbm"><input id="test1" type="text" name="test1"
                                                    style="text-align:center;border:0px;width: 100%">
                            </td>
                            <td id="td_htmc"><input id="test2" type="text" name="test2"
                                                    style="text-align:center;border:0px;width: 100%">
                            </td>
                            <td id="td_ypbm"><input id="test3" type="text" name="test3"
                                                    style="text-align:center;border:0px;width: 100%">
                            </td>
                            <td id="td_ypmc"><input id="test4" type="text" name="test4"
                                                    style="text-align:center;border:0px;width: 100%">
                            </td>
                            <td id="td_bzq"><input id="test5" type="text" name="test5"
                                                   style="text-align:center;border:0px;width: 100%">
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/tmsm.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        tmsmlist.setPath("<%= request.getContextPath()%>");
        tmsmlist.init("<%=uuid %>");
    });
    $("body").keydown(function () {
        if (event.keyCode == "13") {
            $('#Search').click();
        }
    });
</script>