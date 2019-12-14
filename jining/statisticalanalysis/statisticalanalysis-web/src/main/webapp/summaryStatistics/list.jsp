<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    String firstpage = request.getParameter("firstpage");
    if (firstpage == null) {
        firstpage = "0";
    }
    String name= CurrentLoginUser.getUser().getName();
    SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
    String date=format.format(new Date());
%>
<style>

    #summaryStatistics_data .bb {
        float: left;
        font-size: 12px;
        color: #999;
        margin-top: 2px;
    }

    .next {
        position: relative;
        left: -10px;
    }

    #summaryStatistics  #getTree {
        margin-top: 17px;
    }

    #summaryStatistics_data>td:nth-child(2) {
        text-align: left;
    }

    #summaryStatistics_data>td:nth-child(3) {
        text-align: center;
    }

    #summaryStatistics_data td {
        padding: 6px !important;
    }

    #summaryStatistics_dat>td:nth-child(4) {
        text-align: center;
    }

    #search_summaryStatistics {
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: 1px solid #ccc;
    }
    .nameImg{
        width: 22px;
        height: 22px;
        margin-left: 1px;
        margin-top: 2px;
    }
    /*#getTree .jstree-default .jstree-node, #getTree .jstree-default {*/
        /*background-image: none;*/
    /*}*/

    #summaryStatistics #getTree .jstree-icon {
        /* background: url(http://tui518.oss-cn-shanghai.aliyuncs.com/avatar/2017082….jpg); */
        /* background-size: cover; */
    }
    /*#getTree .jstree-children .jstree-open a{*/
        /*margin-left:30px ;*/
    /*}*/
    #summaryStatistics #getTree .jstree-default .jstree-leaf > .jstree-ocl {
        background-position: -68px -1px;
        /*display: none;*/
    }

    #summaryStatistics  #getTree .jstree-default .jstree-closed > .jstree-ocl {
        background-position: -100px -4px;
        /*display: none;*/
    }

    /*#getTree .jstree-default .jstree-clicked {*/
        /*border: 0;*/
        /*background-color: #e5e5e5;*/
        /*box-shadow: none;*/
    /*}*/

    /*#getTree .jstree-default .jstree-hoverd {*/
           /*border: 0;*/
           /*background-color: #e5e5e5;*/
           /*box-shadow: none;*/
           /*border-radius: 5px !important;*/
       /*}*/

    /*#getTree .jstree-default .jstree-anchor {*/
        /*line-height: 39px;*/
        /*height: 39px;*/
        /*width: 100%;*/
        /*border-bottom: 1px solid #f6f6f6;*/
        /*text-indent: 8px;*/
    /*}*/

    /*#getTree .jstree-default .jstree-node, #getTree .jstree-default .jstree-icon {*/
        /*margin-left: 0px;*/
    /*}*/

    #summaryStatistics_data .ff {
        width: 13px;
        height: 13px;
        background: #FF2625;
        margin-top: 4px;
        position: relative;
        top: 1px;
        border-radius: 4px !important;
    }

    /*#getTree .jstree-default .jstree-open > .jstree-ocl {*/
        /*display: none;*/
    /*}*/

    #summaryStatistics_data .cc {
        width: 13px;
        height: 13px;
        background: #A8E240;
        margin-top: 4px;
        border-radius: 4px !important;
    }

    #summaryStatistics_data .dd {
        width: 13px;
        height: 13px;
        background: #00B8EE;
        margin-top: 4px;
        border-radius: 4px !important;
    }

    #summaryStatistics_data .ee {
        width: 13px;
        height: 13px;
        background: #DADADA;
        margin-top: 4px;
        border-radius: 4px !important;
    }

    .monthcolor1 {
        color: #A8E240;
    }

    .monthcolor2 {
        color: #00B8EE;
    }

    .monthcolor3 {
        color: #DADADA;
    }

    .monthcolor4 {
        color: #FF2625;
    }

    .monthcolor5 {
        color: orange;
    }

    #summaryStatistics_data .orange {
        width: 13px;
        height: 13px;
        background: orange;
        margin-top: 4px;
        border-radius: 4px !important;
        position: relative;
        top: 1px;
    }

    #summaryStatistics_data .btn-default:hover {
        border-color: #10a0f7 !important;
    }

    /*  .cycz{
            width: 80px;
        height: 35px;
        line-height: 35px;
        background: #fff;
        text-align: center;
        margin-bottom: -6px;
        border-top: 2px solid #10a0f7;
     } */

    #summaryStatistics_data .table > tbody > tr > td, #summaryStatistics_data .table > tbody > tr > th, #summaryStatistics_data .table > tfoot > tr > td, #summaryStatistics_data .table > tfoot > tr > th, #summaryStatistics_data .table > thead > tr > td, #summaryStatistics_data .table > thead > tr > th {
        vertical-align: middle !important;
        text-align: left;
        font-weight: normal !important;
    }

    #summaryStatistics .pad {
        display: inline-block;
        /* padding: 3px; */
        border: 1px solid #dadada;
        margin-right: 4px;
        background: #fff;
        width: 20px;
        height: 20px;
        line-height: 19px;
        text-align: center;
        position: relative;
        top: 2px;
        border-radius: 4px !important;
        cursor: pointer;
    }

    #summaryStatistics_data table.dataTable tbody td {
        text-overflow: ellipsis;
        white-space: nowrap;
    }
/*
    .summaryStatistics_data td:nth-child(4) {
        text-align: left !important;
        padding-left: 29px !important;
    }*/

  /*  #summaryStatistics_data td:nth-child(2) {
        text-align: left !important;
    }*/

    #summaryStatistics_data .ui-layout-content {
        padding: 0px;
    }

    #page-container #summaryStatistics_data_info {
        height: 30px;
        line-height: 20px;
        padding-left: 8px;
    }

    /* .bootbox .inputCommon{
        width:188px !important;;
    } */
    .pagination > .active > a {
        z-index: 99 !important;
    }

    /*#summaryStatistics_manage_tree .jstree-anchor span {*/
        /*float: left;*/
    /*}*/

    #summaryStatistics .slimScrollDiv {
        height: auto !important;
    }

    #summaryStatistics .slimScrollDiv .portlet-scroller {
        height: auto !important;
    }

    .khlistBtn{ /*列表图标样式*/
	    color: #10a0f7;
	    background: none;
	    border: none;
	    margin-right: 5px;
	    padding: 0;
	    text-align: center;
	    width: 25px;
	    height: 25px;
    }
    .number {
        color: #FDBA34;
        font-size: 14px !important;
    }
    .summaryStatistics-dialog .modal-dialog{
        width: 80%!important;
        /*margin-left: -29%!important;*/
    }
    .bmTable tr{
        height: 37px;
        background: #f9f9f9;
    }
    .bmTable tr:nth-child(odd){
        background: #fff;
    }
    .bmTable td,
    .bmTable th{
        padding-left: 5px;
    }

    .zyTable tr{
        height: 37px;
        background: #f9f9f9;
    }
    .zyTable tr:nth-child(odd){
        background: #fff;
    }
    .zyTable td,
    .zyTable th{
        padding-left: 5px;
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
<div id="summaryStatistics">
    <div class="ui-layout-center" id="zhklb">
        <div class="ui-layout-content contentBgColor">
            <div class="portlet">
                <!--  <div class="portlet-title">
                     <div class="caption">
                         <span class="caption-subject bold uppercase">客户管理</span>
                     </div>
                 </div> -->
                <div class="portlet-body form" style="overflow-x:hidden">
                    <div  class="row" style="padding: 0 20px">
                        <div style="float: left;color: #10a0f7;">
                            <!-- 截止今日，平台共入住代理记账公司<label class="allnumber number"></label>户，其中今日审核通过的户数有<label class="todaynumber number"></label>位。 -->
                            <img style="vertical-align: text-bottom;margin-right: 5px;" src="/statisticalanalysis/assets/pages/img/remind.png" alt=""><span id="wsandweikeName"><%=name%></span>正在服务的客户收费情况：应收费用<label class="tryoutnumber number" id="wsandweikeYsk"></label>元，实际收费<label class="allnumber number"id="wsandweikeSjsk" ></label>元。
                            <%--</div>--%>
                        </div>

                    </div>
                    <div class="table-toolbar" style="background: #fff!important;height: 46px!important;line-height: 46px;margin-bottom: 0;">

                        <div class="row" style="padding: 0 20px">
                            <div style="float: left; padding-top:6px; ">
                                <button name="exportExcel" id="daochuexlsByws001" style="height:33px;" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4  pull-left mr">
                                    <i class="icon iconfont icon-daochu"></i>导出
                                </button>
                            </div>
                            <div style="float: left;  padding-top:6px; ">
                                <button name="exportExcel" id="daochuexlsByws002" style="height:33px;display: none;float: right !important;" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4  pull-left mr">
                                    <i class="icon iconfont icon-daochu"></i>导出
                                </button>
                            </div>
                            <div style="float: left;  padding-top:6px; ">
                                <button name="exportExcel" id="daochuexlsByws003" style="height:33px;display: none;float: right !important;" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4  pull-left mr">
                                    <i class="icon iconfont icon-daochu"></i>导出
                                </button>
                            </div>
                            <%--<div class="col-md-12" style="padding-top: 5px;padding-bottom: 5px;background: #F3F3F3;width: 98%;margin-bottom: 15px">--%>
                                <div style="float: right;">
                                    <div class="date beginTime pull-left" style="margin-top: 6px">
                                        <label class="labelCommon labelBg color666 dateLabel-m" style= "width:80px !important;    margin-left: 16px;">收款时间</label>
                                        <input type="text" readonly class="appsysinfo-m inputCommon "  name="starDate" id="startTime" style="border-radius: 0 !important; width: 100px">
                                        <span>
	                                        <button class="btn btn-default appsysinfobtn-m pull-left" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
	                                            <i class="fa fa-calendar"></i>
	                                        </button>
	                                    </span>
                                    </div>
                                    <span style="float: left;margin:0 5px">-</span>
                                    <div class="input-group date endTime pull-left mr" style="margin-top: 6px">
                                        <input type="text" readonly class="inputCommon appsysinfo-m"  name="endDate" id="endTime" style="border-radius: 4px 0 0 4px !important;width: 100px" >
                                        <span>
	                                       <button class="btn btn-default appsysinfobtn-m pull-left" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
	                                           <i class="fa fa-calendar"></i>
	                                       </button>
	                                    </span>
                                    </div>
                                    <div class="input-group  pull-left" style="margin-left: 10px;margin-top: 6px">
                                        <button type="button" id="searchAllByTimeByws" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr Search-btn" data-loading-text="Loading...">
                                            <i class="fa fa-search "></i>查&nbsp;询&nbsp;
                                        </button>
                                    </div>
                                </div>

                        </div>
                        
                    </div>

                    <div class="ygMain">
                        <div class="portlet-scroller ">
                            <div class="dataTables_wrapper no-footer" style="padding: 10px">
                                <table style="margin-top: 0!important;" class="table table-striped table-bordered table-hover backgroundWhite"
                                       id="summaryStatistics_data">
                                    <thead>
                                    <tr>
                                        <th width="40%" style="text-align:left">客户名称</th>
                                        <th width="10%" style="text-align:right">应收费用</th>
                                        <th width="10%" style="text-align:right">实际收费</th>
                                        <th width="10%" style="text-align:center">操作</th>
                                    </tr>
                                    </thead>
                                    <tfoot>
                                    <tr class="total-tfoot" style="background: #f9f9f9;border-top: 1px solid #1E9EFF;">
                                        <th>总计</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="bmTable" style="width: 100%;display: none" id="bmTableaaa">

                        <table style="width: 100%;">
                            <thead>
                            <tr>
                                <th width="40%" style="text-align:left">部门名称</th>
                                <th width="10%" style="text-align:right">应收费用</th>
                                <th width="10%" style="text-align:right">实际收费</th>
                                <th width="10%" style="text-align:center">操作</th>
                            </tr>
                            </thead>
                            <tbody id="bmTable_tbodyByws">

                            </tbody>
                        </table>
                    </div>
                    <div class="zyTable" style="width: 100%;display: none" id="zyTableaaa">

                        <table style="width: 100%;">
                            <thead>
                            <tr>
                                <th width="40%" style="text-align:left">员工名称</th>
                                <th width="10%" style="text-align:right">应收费用</th>
                                <th width="10%" style="text-align:right">实际收费</th>
                                <th width="10%" style="text-align:center">操作</th>
                            </tr>
                            </thead>
                            <tbody id="zyTable_tbodyByws">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%-- <os:hasSecurityResource identifier="dispatchedStaffBtn"> --%>
        <div class="ui-layout-west">
            <div class="ui-layout-content">
                <div class="portlet">
                    <!--  <div class="portlet-title">
                         <div class="caption">
                             <span class="caption-subject bold uppercase">分组</span>
                         </div>
                     </div> -->
                    <div class="portlet-body">
                        <div class="portlet-scroller">
                            <div class="table-toolbar">
                                <div class="row">
                                    <div class="col-md-12" id="getTree">
                                        <div class="input-icon">
                                            <i class="fa fa-search colorBlue-10a0f7"
                                               style="color: #ccc !important;"></i>
                                            <input type="search" class="form-control borderRadius4 btnBorderColor"
                                                   id="search_summaryStatistics" placeholder="搜索"></div>
                                        <div id="summaryStatistics_manage_tree" style="width: 200px;overflow-x: auto;max-width: 200px">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <%-- </os:hasSecurityResource> --%>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/summaryStatistics/list.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        summaryStatistics_data.setPath('<%=request.getContextPath()%>');
        summaryStatistics_data.init('<%=firstpage%>');
    });
</script>