<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
java.util.Date currentTime = new java.util.Date();//得到当前系统时间
long dateMS = currentTime.getTime();
String khbm = request.getParameter("khbm");
if(khbm==null){
    khbm="";
}

currentTime.setTime(dateMS);
String txtendDate = formatter.format(currentTime); //结束时间

dateMS = dateMS - 60 * 60 * 24 * 1000 * 7;
currentTime.setTime(dateMS);
String txtstarDate = formatter.format(currentTime); //开始时间

UUID uuid = UUID.randomUUID();
String type = request.getParameter("type");
if (type == null) {
    type = "";
}
%>
<style>
    #page-container #chargeaudit_data_info{
        height:30px !important;
        line-height:20px !important;
    }
    .moneyinput{
       text-align: right;
    }
    #chargeAuditSearch .useSearch {
        height: 33px;
        margin-bottom: 10px;
        border-radius: 5px !important;
        overflow: hidden;
        border: 1px solid rgb(204, 204, 204);
        float: left;

    }
    #chargeAuditSearch .useSearch input {
        width: 265px;
        height: 33px;
        float: left;
        border: 0;
        padding-left: 10px;
        outline: none;
    }
    #chargeAuditSearch .useSearch button {
        height: 33px;
        width: 60px;
        padding: 0;
        border: 0;
        border-left: 1px solid rgb(204, 204, 204);
        background: #f6f6f6;
        color: #555;
        position: relative;
    }


    .positionSpan>span{
        display: block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color:#CACACA transparent transparent transparent  ;
        position: absolute;
        top: 32px;
        right: 116px;
    }
    .positionSpan>span>em{
        display: block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: #f6f6f6 transparent transparent transparent ;
        position: absolute;
        top: -12px;
        left: -10px;
    }
    #MoreSearch_btn{
        height: 34px;
        width: 33px;
        padding: 0;
        border: none;
        border-radius: 0 4px 4px 0 !important;
        background: none;
        float: left;
        margin-left: 10px;
        color: #10a0f7;
        outline: none;
    }
    #chargeAuditSearch  .rotate1 {
        transform: rotate(180deg);
    }
    .chargeAuditM  .activeClick{
        background: #DBF1FD;
    }

    .chargeAuditM .btnxystyle {
	    background-color: transparent;
	    border: none;
	    width: 26px;
	}
	.chargeAuditM .childtd{
        padding: 0px 8px 0px 8px;
        color: #666!important;
    }
    .chargeAuditM .bottomstyle{
        color: #666!important;
        border-bottom: 1px dashed #dadada!important;
    }
    #chargeaudit_data td{
        word-wrap: break-word;
        word-break: normal;
        white-space: normal;
    }




    .chargeAuditM .childtable{
        width:100%;
        table-layout: fixed;
        margin: 4px 0px 4px 0px;
    }
    .chargeAuditM .childtable tr{
        height: 30px;
    }
    .chargeAuditM .childtable td{
        border:1px solid #EAEAEA !important;
        padding: 2px 10px 2px 10px;
    }
    .chargeAuditM .childtable tr:first-child td:first-child{
        width: 30px;
    }
    .chargeAuditM .childtable tr:first-child td:last-child{
        background-color: #F9F9F9;
    }
    .chargeAuditM .childtable tr:first-child td:last-child .childdivlist{
        padding: 0px 10px 0px 10px;
        float: left;
        height: 34px;
        line-height:34px;
    }
    /*.chargeAuditM .childtable tr:first-child td:last-child .childdivlist:nth-child(-n+3){*/
        /*width: 160px;*/
        /*float: left;*/
    /*}*/
    .chargeAuditM .childtable tr:first-child td:last-child .childdivlist:last-child{
        float: right;
    }
    .chargeAuditM .childtable input[type=text]{
        width:60px;
        /*float:left;*/
        text-align: right;
    }
    .chargeAuditM .childtable button{
        background: none!important;
        color: #0EA1F7!important;
        border: none !important;
    }
    .chargeAuditM .childtable .fontSize-16{
        font-size:16px;
    }
    .chargeAuditM .childtable .hiddendiv{
        display: none;
    }

    #getChargeAuditTree {
        margin-top: 17px;
    }

    #getChargeAuditTree .jstree-default .jstree-leaf > .jstree-ocl {
        background-position: -68px -1px;
        /*display: none;*/
    }

    #getChargeAuditTree .jstree-default .jstree-closed > .jstree-ocl {
        background-position: -100px -4px;
        /*display: none;*/
    }

    #search_ChargeAuditay {
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: 1px solid #ccc;
    }
    .chargeAuditM .childtable tr:first-child td:last-child .rotate{
        transform:rotate(90deg);
        -ms-transform:rotate(90deg); /* Internet Explorer */
        -moz-transform:rotate(90deg); /* Firefox */
        -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
        -o-transform:rotate(90deg); /* Opera */
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
<div class=" chargeAuditM" id="chargeaudit_id_div_<%=uuid %>">
    <div class="ui-layout-center" style="padding-top: 15px;padding-right: 15px;">
        <div class="col-md-12">
            <div class="portlet light bordered" style="padding-left: 6px;
    padding-right: 6px;">
                <div class="portlet-body" style="padding-top: 0">
                    <div class="" style="">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row search-body" id="chargeAuditSearch" style="margin-left: 0">
                                    <input  type="hidden" value="0" name="showflag"/>
                                    <button type="button" style="height:33px;" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr adoptAll">
                                        <i class="icon iconfont  icon-shenhe1 iconMr" aria-hidden="true" style="font-size: 14px;margin-right: 5px;"></i>批量审核
                                    </button>
                                    <div style="float: right;height: 33px">
                                        <div class="input-group  pull-left positionSpan" style="margin-left: 10px;">
                                            <label class="labelCommon" style="width:80px !important;    margin-left: 16px;">审核状态</label>
                                            <div class="input-group  search-label-small pull-left">
                                                <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="auditStatic">
                                                    <option value="998">全部</option>
                                                    <option value="003" selected="selected">待审核</option>
                                                    <option value="001">已通过</option>
                                                    <option value="002">未通过</option>
                                                </select>
                                            </div>
                                            <div class="useSearch" style="position:relative;">
                                                <input type="text" class="query" style="float: left;" placeholder="请输入客户名称、订单编号或合同编码" name="searchtxt">
                                                <i class="fa fa-search colorBlue-10a0f7 searchIcoBtn Search-btn" style="    margin-right: 5px;
                                                                                                                                position: absolute;
                                                                                                                                right: -5px;
                                                                                                                                top: -2px;
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
                                                 <button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr Search-btn" data-loading-text="Loading...">
                                                     <i class="fa fa-search " style="margin-right: 5px;"></i>查&nbsp;询&nbsp;
                                                 </button>
                                             </div>--%>
                                            <div style="float: left; margin-right: 10px;">
                                                <button type="button" id="MoreSearch_btn" data-loading-text="Loading..." style="outline: none" class="iconFontColor-10a0f7">
                                                    更多
                                                </button>
                                                <img style="    margin-right: 10px;vertical-align: middle;margin-top: 12px;" class="rotate1" src="<%= request.getContextPath()%>/assets/pages/img/arrow.png" alt="arrow">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="moreSearchDiv" style="display: none;">
                            <div class="col-md-12">
                                <div class="row search-body" style="width:750px;margin-right: 0;padding: 25px 2%;border-radius: 5px!important;border: 1px solid #ccc;float: right;margin-top: 15px;">
                                    <div class="col-md-12" style="margin-bottom: 15px;">
                                        <label class="labelCommon" style="width:80px !important;    margin-left: 16px;">收费状态</label>
                                        <div class="input-group  search-label-small pull-left">
                                            <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="chargeStatic">
                                                <option value="999" selected="selected">全部</option>
                                                <%--<option value="000">未收款</option>--%>
                                                <option value="001">已收款</option>
                                                <%--<option value="003">催费中</option>--%>
                                                <%--<option value="002">欠费中</option>--%>
                                                <option value="004">已到账</option>
                                                <option value="005">坏账</option>
                                            </select>
                                        </div>
                                        <label class="labelCommon" style="width:80px !important;    margin-left: 16px;">收费项目</label>
                                        <div class="input-group  search-label-small pull-left">
                                            <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="chargeType">
                                                <option value="999" selected="selected">全部</option>
                                            </select>
                                        </div>
                                        <label class="labelCommon" style="width:80px !important;    margin-left: 16px;">收费方式</label>
                                        <div class="input-group  search-label-small pull-left">
                                            <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="chargeMode">
                                                <option value="999" selected="selected">全部</option>
                                                <option value="001">按年</option>
                                                <option value="002">按半年</option>
                                                <option value="003">按季</option>
                                                <option value="004">按月</option>
                                                <option value="005">其他</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div class="col-md-12" style="margin-bottom: 15px;">
                                        <label class="labelCommon" style="width:80px !important;    margin-left: 16px;">收费模式</label>
                                        <div class="input-group  search-label-small pull-left">
                                            <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="chargeModel">
                                                <option value="999" selected="selected">全部</option>
                                                <option value="002">先付</option>
                                                <option value="001">后付</option>
                                            </select>
                                        </div>
                                        <label class="labelCommon" style="width:80px !important;    margin-left: 16px;">主管会计</label>
                                        <div class="input-group  search-label-small pull-left">
                                            <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="chargezg">
                                                <option value="999" selected="selected">全部</option>
                                            </select>
                                        </div>
                                        <label class="labelCommon" style="width:80px !important;    margin-left: 16px;">支付渠道</label>
                                        <div class="input-group  search-label-small pull-left">
                                            <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="paychannel">
                                                <option value="999" selected="selected">全部</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <%--<label class="labelCommon" style="width:80px !important;    margin-left: 16px;">服务状态</label>--%>
                                        <%--<div class="input-group  search-label-small pull-left">--%>
                                            <%--<select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="fwzt">--%>
                                                <%--<option value="1" selected="selected">正在服务</option>--%>
                                                <%--<option value="0">停止服务</option>--%>
                                            <%--</select>--%>
                                        <%--</div>--%>

                                        <label class="labelCommon" style="width:80px !important;    margin-left: 16px;">收款职员</label>
                                        <div class="input-group  search-label-small pull-left">
                                            <select class="form-control mr" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;width:110px;height:33px;font-size:12px !important;" name="chargezy">
                                                <option value="999" selected="selected">全部</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dataTables_wrapper no-footer">
                        <table class="table table-striped table-bordered "id="chargeaudit_data" style="margin: 15px 0 0!important">
                            <thead>
                            <tr>
                                <th width="50px"></th>
                                <th width="11%">合同编码</th>
                                <th width="25%" style="text-align: left !important;">客户名称</th>
                                <th style="width: 150px;">服务期限</th>
                                <th width="10%">收费项目</th>
                                <th width="10%">收费方式</th>
                                <th width="10%" style="text-align: right">应收金额</th>
                                <th width="10%" style="text-align: right">实际金额</th>
                            </tr>
                            </thead>
                            <tfoot>
                                <tr class="total-tfoot" style="background: #f9f9f9;border-top: 1px solid #1E9EFF;">
                                    <th>总计</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ui-layout-west">
        <div class="ui-layout-content">
            <div class="portlet">
                <div class="portlet-body">
                    <div class="portlet-scroller">
                        <div class="table-toolbar">
                            <div class="row">
                                <div class="col-md-12" id="getChargeAuditTree">
                                    <div class="input-icon">
                                        <i class="fa fa-search colorBlue-10a0f7"
                                           style="color: #ccc !important;"></i>
                                        <input type="search" class="form-control borderRadius4 btnBorderColor"
                                               id="search_ChargeAuditay" placeholder="搜索">
                                    </div>
                                    <div id="chargeaudit_tree" style="width: 200px;overflow-x: auto;max-width: 200px">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/chargeaudit/list.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		chargeorderauditlist.setPath("<%= request.getContextPath()%>");
		chargeorderauditlist.init("<%=uuid %>");
	});
</script>