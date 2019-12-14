<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
    .rotate1 {
        transform: rotate(180deg);
    }
    /*CHARSET "UTF-8";*/

    .behavior-input-style{
        height: 33px;
        width: 85px!important;
    }
    .behavior-label-l
    { line-height: 20px;}
    .behaviorcalendar-btn
    {
        height: 33px;
        border-radius: 0 4px 4px 0!important;
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
                                <form id="bgbz_condition"<%-- style="position: relative;display: inline-block;left: 400px;bottom: 5px"--%>>
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
                                            <label class="labelCommon labelBg color666 dateLabel-m">检测项目名称</label>
                                            <input type="text" class="appsysinfo-m inputCommon"
                                                   name="jcxmc" placeholder="请输入检测项名称"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                        <div class="input-group  search-label-small pull-left"
                                             style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">任务分配状态</label>
                                            <select name="fpzt" class="appsysinfo-m inputCommon" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
                                                <option value="">下拉选择分配状态</option>
                                                <option value="001">未分配</option>
                                                <option value="002">已分配</option>
                                            </select>
                                        </div>
                                        <div style="clear: both;padding-top: 10px">
                                            <div class="input-group  search-label-small pull-left"
                                                 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                                <label class="labelCommon labelBg color666 dateLabel-m">检测状态</label>
                                                <select name="tjzt" class="appsysinfo-m inputCommon" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
                                                    <option value="">下拉选择检测状态</option>
                                                    <option value="0">未检测</option>
                                                    <option value="1">已检测</option>
                                                </select>
                                            </div>
                                            <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
                                                <label class="labelCommon labelBg color666 dateLabel-m">分配时间</label>
                                                <input type="text" class="inputCommon appsysinfo-m" id="fpsj" name="fpsj" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div style="float: right;width:100%;">
                                    <button id="btn_ypjc"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>
                                        检测任务分配
                                    </button>
                                    <%--<button id="btn_back"--%>
                                            <%--class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">--%>
                                        <%--<i class="fa fa-plus iconMr"></i>--%>
                                        <%--任务退回--%>
                                    <%--</button>--%>
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
                    <table class="table table-striped table-hover paramsTab" id="<%=uuid%>ManagerList_m" width="100%">
                        <thead>
                        <tr class="color333">
                            <th width="10px"><input type="checkbox" name="ck"/></th>
                            <th width="1px"></th>
                            <th width="1px"></th>
                            <th width="1px"></th>
                            <th>样品名称</th>
                            <th width="150px">样品制备编码</th>
                            <th>检测项目</th>
                            <th width="150px">委托编号</th>
                            <th>委托受理时间</th>
                            <th>分配状态</th>
                            <th>检测状态</th>
                            <th>分配日期</th>
                            <th>检测人</th>
                            <th>复核人</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<%= request.getContextPath()%>/assets/pages/scripts/jcgl/rwfp/list.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        list.setPath("<%= request.getContextPath()%>");
        list.init('<%=uuid%>');

        $("#fpsj").datepicker({
            clearBtn: true,
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN'
        });
        // $("#etime").datepicker({
        //     clearBtn: true,
        //     format: 'yyyy-mm-dd',
        //     autoclose: true,
        //     language: 'zh-CN',
        //     startDate:$("#btime").val()
        // });
    });
</script>