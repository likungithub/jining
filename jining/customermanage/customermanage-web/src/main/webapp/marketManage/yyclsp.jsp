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
        font-weight: normal!important;
        font-size: 12px!important;
        overflow: hidden!important;
        text-overflow: ellipsis!important;
        white-space: nowrap!important;
        padding-right: 8px!important;
        padding-left: 8px!important;
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
<div class="" id="yycl12-manager-container">
    <div class="col-md-12" id="htshDIV112" style="padding-left: 6px;padding-right: 6px;">
        <div class="portlet light bordered" style="padding: 8px">
            <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 10px;">
                                <div style="clear:both;overflow: hidden; ">
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;display: none">
                                        <label class="labelCommon labelBg color666 dateLabel-m">委托合同名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" id="yyclhtmc" name="htmc" placeholder="请输入委托合同名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" id="yyclypmc"  name="ypmc" placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;display: none">
                                        <label class="labelCommon labelBg color666 dateLabel-m">处理方式</label>
                                        <select id="yyclclfs1" name="clfs" style="width:140px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
								    border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
								    border-bottom-right-radius: 4px !important;">
                                            <option value="">请选择处理方式</option>
                                            <option value="0">不返还</option>
                                            <option value="1">返还</option>
                                        </select>
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;display: none">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品是否变质</label>
                                        <select id="yyclsfbz1" name="sfbz" style="width:140px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
								    border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
								    border-bottom-right-radius: 4px !important;">
                                            <option value="">样品是否变质</option>
                                            <option value="1">未变质</option>
                                            <option value="2">已变质</option>
                                        </select>
                                    </div>
                                </div>

                                <!--按钮  begin-->
                                <div style="clear: both;">
                                    <button id="yyclTy1" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>审批</button>
                                    <button id="yyclthcl1" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>退回</button>
                                    <button id="yyclSearch1" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                                    <button id="yyclreset1" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <form id="yyclsp_form12">
                        <table class="table table-striped table-bordered table-hover" id="list_datayycl12" name="yycl-tableyycl" style="width:100%;margin-top: 15px!important">
                            <thead>
                            <tr>
                                <th field="ck"><input type="checkbox" class="check-all-td"/></th>
                                <th>样品编号</th>
                                <th>样品名称</th>
                                <th>领样日期</th>
                                <th>委托单位</th>
                                <th>样品类型</th>
                                <th>备注信息</th>
                            </tr>
                            </thead>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(document).ready(function () {
        <!-- 重置查询条件-->
        $("#yyclreset1").click(function () {
            $("input").val("");
            $("#yyclclfs1").val("");
            $("#yyclsfbz1").val("");
        });
    });

</script>


<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/yycl/yyclsp.js" type="text/javascript"></script>



