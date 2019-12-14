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
<div class="" id="ypjs<%=uuid %>">
    <div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
        <div class="portlet light bordered" style="padding: 8px">
            <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 10px;">
                                <div style="clear:both;">
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" id="ypmc<%=uuid%>" placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品编码</label>
                                        <input type="text" class="inputCommon appsysinfo-m" id="ypbm<%=uuid%>" placeholder="请输入样品编码" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important; display: none">
                                        <label class="labelCommon labelBg color666 dateLabel-m">单位名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" id="dwmc<%=uuid%>" placeholder="请输入单位名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;display: none">
                                        <label class="labelCommon labelBg color666 dateLabel-m">处理方式</label>
                                        <select id="yyclclfs" name="clfs" style="width:140px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
								    border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
								    border-bottom-right-radius: 4px !important;">
                                            <option value="不返还">不返还</option>
                                            <option value="返还">返还</option>
                                        </select>
                                    </div>
                                </div>
                                <br>
                                <!--按钮  begin-->
                                <div style="clear: both;">
                                    <br>
                                    <button id="btn_ryxz<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr">处理</i></button>
                                    <button id="ypjsSearch<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                                    <button id="reset<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                                    <button id="scypjs<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4" style="display: none"><i class="fa fa-plus iconMr"></i>删除</button>
                                    <button id="ypth<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>退还</button>
                                    <button id="daochu<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-file-word-o"></i> 产品质量检验样品台账</button>
                                    <button id="ypcljl<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-file-excel-o"></i> 样品处理记录</button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" id="list_data<%=uuid%>" name="ypjs-table" style="width:100%;margin-top: 15px!important">
                        <thead>
                        <tr>
                            <th field="ck" class="text-left" width="20px"><input type="checkbox" class="check-all-td" name="ypjs<%=uuid%>"/></th>
                            <th width="12%">样品编码</th>
                            <th width="12%">样品名称</th>
                            <th width="12%">委托联系人</th>
                            <th width="12%">委托联电话</th>
                            <th width="12%">是否退还</th>
                            <th width="12%">保质期(天)</th>
                            <th width="12%">处理方式</th>
                            <th width="12%">处理人</th>
                            <th width="12%">处理时间</th>
                            <th width="12%">处理量</th>
                            <th width="12%">退还时间</th>
                            <th width="12%">退还人</th>
                            <th width="12%">退还量</th>
                            <th width="12%">执行人</th>
                            <th width="12%">状态</th>
                            <th width="12%">是否过期</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/ypgl/yycl.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        yycl.setPath("<%= request.getContextPath()%>");
        yycl.init("<%=uuid %>");
        //全选
        $("[name='ypjs<%=uuid%>']").on('click',function () {
            if($("[name='ypjs<%=uuid%>']").prop("checked")){
                //选中
                $("[name='checkbox_checkbox']").prop("checked",true);
            }else{
                $("[name='checkbox_checkbox']").prop("checked",false);
            }
        });
    });
</script>
