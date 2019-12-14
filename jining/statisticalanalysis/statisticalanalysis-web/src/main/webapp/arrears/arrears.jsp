<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
    java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    long dateMS = currentTime.getTime();
    String khbm = request.getParameter("khbm");
    if (khbm == null) {
        khbm = "";
    }

    currentTime.setTime(dateMS);
    String txtendDate = formatter.format(currentTime); //结束时间

    dateMS = dateMS - 60 * 60 * 24 * 1000 * 7;
    currentTime.setTime(dateMS);
    String txtstarDate = formatter.format(currentTime); //开始时间

    UUID uuid = UUID.randomUUID();
    String type = "QFTX";
    if (type == null) {
        type = "";
    }
%>
<style>
    #page-container #chargeorder_data_info {
        height: 30px !important;
        line-height: 20px !important;
    }

    .moneyinput {
        text-align: right;
    }

    #chargeOrderSearch .useSearch {
        height: 33px;
        margin-bottom: 10px;
        border-radius: 5px !important;
        overflow: hidden;
        border: 1px solid rgb(204, 204, 204);
        float: left;
    }

    #chargeOrderSearch .useSearch input {
        width: 265px;
        height: 33px;
        float: left;
        border: 0;
        padding-left: 10px;
        outline: none;
    }

    #chargeOrderSearch .useSearch button {
        height: 33px;
        width: 60px;
        padding: 0;
        border: 0;
        border-left: 1px solid rgb(204, 204, 204);
        background: #f6f6f6;
        color: #555;
        position: relative;
    }

    .positionSpan > span {
        display: block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: #CACACA transparent transparent transparent;
        position: absolute;
        top: 32px;
        right: 116px;
    }

    .positionSpan > span > em {
        display: block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: #f6f6f6 transparent transparent transparent;
        position: absolute;
        top: -12px;
        left: -10px;
    }

    #MoreSearch_btn {
        height: 34px;
        width:30px;
        padding: 0;
        border: none;
        border-radius: 0 4px 4px 0 !important;
        background: none;
        float: left;
        margin-left: 10px;
        color: #10a0f7;
        outline: none;
    }

    #chargeOrderSearch .rotate1 {
        transform: rotate(180deg);
    }

    .chargeorderM .activeClick {
        background: #DBF1FD;
    }

    /*#chargeorder_data td {*/
        /*white-space: normal;*/
    /*}*/

    .chargeorderM .childtd {
        padding: 0px 8px 0px 8px;
        color: #666 !important;
    }

    .chargeorderM .bottomstyle {
        color: #666!important;
        border-bottom: 1px dashed #dadada !important;
    }

    .chargeorderM .wordbreak {
        word-break: keep-all;
    }
    .inputstyle{
        height: 25px;
        line-height: 25px;
    }



    .chargeorderM .childtable{
        width:100%;
        table-layout: fixed;
        margin: 4px 0px 4px 0px;
    }
    .chargeorderM .childtable tr{
        height: 30px;
    }
    .chargeorderM .childtable td{
        border:1px solid #EAEAEA !important;
        padding: 2px 10px 2px 10px;
    }
    .chargeorderM .childtable tr:first-child td:first-child{
        width: 30px;
    }
    .chargeorderM .childtable tr:first-child td:last-child{
        background-color: #F9F9F9;
    }
    .chargeorderM .childtable tr:first-child td:last-child .childdivlist{
        padding: 0px 10px 0px 10px;
        float: left;
        height: 34px;
        line-height:34px;
    }
    /*.chargeorderM .childtable tr:first-child td:last-child .childdivlist:nth-child(-n+3){*/
        /*width: 160px;*/
        /*float: left;*/
    /*}*/
    .chargeorderM .childtable tr:first-child td:last-child .childdivlist:last-child{
        float: right;
    }
    .chargeorderM .childtable input[type=text]{
        width:60px;
        /*float:left;*/
        text-align: right;
    }
    .chargeorderM .childtable button{
        background: none!important;
        color: #0EA1F7!important;
        border: none !important;
    }
    .chargeorderM .childtable .fontSize-16{
        font-size:16px;
    }
    .chargeorderM .childtable .hiddendiv{
        display: none;
    }
    .chargeorderM .childtable tr:first-child td:last-child .rotate{
        transform:rotate(90deg);
        -ms-transform:rotate(90deg); /* Internet Explorer */
        -moz-transform:rotate(90deg); /* Firefox */
        -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
        -o-transform:rotate(90deg); /* Opera */
    }
</style>
<div class="row chargeorderM" id="chargeorder_id_div_<%=uuid %>">
    <div class="col-md-12">
        <div class="portlet light bordered">
            <div class="portlet-body">
                <div class="" style="">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body ml" id="chargeOrderSearch">
                                <input type="hidden" value="0" name="showflag"/>
                                <button name="exportExcel" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4  pull-left mr">
                                    <i class="icon iconfont icon-daochu"></i> 导出
                                </button>
                                <a style="height:33px;background: #fff;border: #fff;margin-left: -50px;"
                                   class="pull-left hiddenadoptAll">
                                </a>
                                <a style="height:33px;background: #fff;border: #fff;margin-left: -50px;"
                                   class="pull-left hiddenadoptAll">
                                </a>
                                <div class="procedure"></div>
                                <div style="float: right;">
                                    <div class="input-group  pull-left positionSpan" style="margin-left: 10px;">
                                        <label class="labelCommon" style="width:80px !important;    margin-left: 16px;">审核状态</label>
                                        <div class="input-group  search-label-small pull-left">
                                            <select class="form-control mr"
                                                    style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;"
                                                    name="auditStatic">
                                                <option value="999">全部</option>
                                                <option value="000" selected="selected">未审核</option>
                                                <option value="003">待审核</option>
                                                <option value="001">已通过</option>
                                                <option value="002">未通过</option>
                                            </select>
                                        </div>
                                        <div class="useSearch" style="position: relative">
                                            <input type="text" class="query" style="float: left;padding-right: 45px"
                                                   placeholder="请输入客户名称、订单编号或合同编码" name="searchtxt">
                                            <i class="fa fa-search colorBlue-10a0f7 searchIcoBtn Search-btn" style="margin-right: 5px;
																														position: absolute;
																														right: -5px;
																														top: 0px;
																														cursor: pointer;
																														height: 33px;
																														line-height: 33px;
																														width: 45px;
																														text-align: center;
																														border-left: 1px solid #dedede;
																														font-size: 20px!important;"></i>
                                            <div style="clear: both"></div>
                                        </div>
                                       <%-- <div class="input-group  pull-left" style="margin-left: 10px;">
                                            <button type="button"
                                                    class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr Search-btn"
                                                    data-loading-text="Loading...">
                                                <i class="fa fa-search " style="margin-right: 5px;"></i>查&nbsp;询&nbsp;
                                            </button>
                                        </div>--%>
                                        <div style="float: left;        margin-right: 10px;">
                                            <button type="button" id="MoreSearch_btn" data-loading-text="Loading..."
                                                    style="outline: none" class="iconFontColor-10a0f7">
                                                更多
                                            </button>
                                            <img style="    margin-right: 10px;vertical-align: middle;margin-top: 12px;"
                                                 class="rotate1"
                                                 src="<%= request.getContextPath()%>/assets/pages/img/arrow.png"
                                                 alt="arrow">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="moreSearchDiv" style="display: none;">
                        <div class="col-md-12 pull-right borderRadius4" style="width: 1018px;border: 1px solid #dedede;margin-bottom: 10px;padding: 0">
                            <div class="row search-body"
                                 style="margin-right: 0;padding: 10px;border-radius: 5px!important;">
                                <label class="labelCommon" style="width:80px !important;margin-left: 15px">服务状态</label>
                                <div class="input-group  search-label-small pull-left">
                                    <select class="form-control mr"
                                            style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;"
                                            id="serviceStat">
                                        <option value="2">全部</option>
                                        <option value="1" selected="selected">正在服务</option>
                                        <option value="0">停止服务</option>
                                    </select>
                                </div>
                                <label class="labelCommon"
                                       style="width:80px !important;">收费状态</label>
                                <div class="input-group  search-label-small pull-left">
                                    <select class="form-control mr"
                                            style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;"
                                            name="chargeStatic">
                                        <option value="999" selected="selected">全部</option>
                                        <option value="000">未收费</option>
                                        <option value="001">已收费</option>
                                        <option value="003">催费中</option>
                                        <option value="002">欠费中</option>
                                        <option value="004">已到账</option>
                                        <option value="005">坏账</option>
                                    </select>
                                </div>
                                <label class="labelCommon"
                                       style="width:80px !important;">收费项目</label>
                                <div class="input-group  search-label-small pull-left">
                                    <select class="form-control mr"
                                            style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;"
                                            name="chargeType">
                                    </select>
                                </div>
                                <label class="labelCommon"
                                       style="width:80px !important;">收费方式</label>
                                <div class="input-group  search-label-small pull-left">
                                    <select class="form-control"
                                            style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;"
                                            name="chargeMode">
                                        <option value="999" selected="selected">全部</option>
                                        <option value="001">按年</option>
                                        <option value="002">按半年</option>
                                        <option value="003">按季</option>
                                        <option value="004">按月</option>
                                        <option value="005">其他</option>
                                    </select>
                                </div>
                                <label class="labelCommon"
                                       style="width:80px !important;margin-left: 16px;">收费模式</label>
                                <div class="input-group  search-label-small pull-left">
                                    <select class="form-control"
                                            style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;"
                                            name="chargeModel">
                                        <option value="999" selected="selected">全部</option>
                                        <option value="002">先付</option>
                                        <option value="001">后付</option>
                                    </select>
                                </div>
                                </div>
                            <div class="row form-group">
                                    <label class="labelCommon" style=" margin-left: 25px;width:80px !important;float: left;">主管会计</label>
                                    <div class="input-group  search-label-small pull-left">
                                        <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" id="customerZhuguan" name="customerZhuguan">
                                        </select>
                                    </div>
                                    <label class="labelCommon" style="width:80px !important;float: left;" >客户经理</label>
                                    <div class="input-group  search-label-small pull-left">
                                        <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" id="customerMaster" name="inputPeople">
                                        </select>
                                    </div>
                                    <label class="labelCommon" style="width:80px !important;float: left;" >支付渠道</label>
                                    <div class="input-group  search-label-small pull-left">
                                        <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" id="chargeAccount" name="chargeAccount">
                                        </select>
                                    </div>
                                    <label class="labelCommon" style="width:80px !important;float: left;" >收费职员</label>
                                    <div class="input-group  search-label-small pull-left">
                                        <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" id="inputPeople" name="inputPeople">
                                        </select>
                                    </div>
                            </div>
                            <%--<div class="row form-group">
                                <label class="labelCommon" style="width:80px !important;float: left;" >客户经理</label>
                                <div class="input-group  search-label-small pull-left">
                                    <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" id="customerMaster" name="inputPeople">
                                    </select>
                                </div>
                            </div>--%>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered" id="chargeorder_data">
                        <thead>
                        <tr>
                            <th width="20px"></th>
                            <th width="10%">合同编码</th>
                            <th width="25%" style="text-align: left !important;">客户名称</th>
                            <th width="15%">服务期限</th>
                            <th width="10%">收费项目</th>
                            <th width="10%">收费方式</th>
                            <th width="10%" style="text-align: right">应收金额</th>
                            <th width="10%" style="text-align: right">实收金额</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="systemmanager/assets/pages/scripts/arrearsstatistic/list.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        chargeorderliststatistics.setPath("customermanage/");
        chargeorderliststatistics.init("<%=uuid %>", "<%=type %>", "<%=khbm%>");
    });
</script>