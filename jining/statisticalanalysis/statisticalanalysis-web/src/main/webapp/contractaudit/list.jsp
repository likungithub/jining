<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
UUID uuid = UUID.randomUUID();
String bz = request.getParameter("bz");
if (bz == null){
 bz = "";
}
%>
<style>
	.search-input-small {
    width: auto !important;
}
#htsh .popover {
    width: 156px !important;
}
#chargeaudit_data_wrapper td:nth-child(10)
{
	text-align:center !important;
}
.lb1{
	width:80px !important;
}
/* #htsh td:nth-child(4){
	    position: relative !important;
    left: -137px !important;
} */
#htsh .search-box{margin-right:0px !important;}
#page-container #contractaudit_data_info{
	height:30px !important;
	line-height:20px !important;
}
    #htshDIV .openMore{
        padding: 25px 20px;
        /*width: 40%;*/
        /*margin: 20px;*/
        border: 1px solid #ccc;
        margin-top: 20px;
        border-radius: 5px!important;
        display: none;
        float: right;
        margin-right: 18px;
        margin-bottom: 10px;
    }
    #htshDIV .search-body>span {
        display: none;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: #CACACA transparent transparent transparent;
        position: absolute;
        top: 35px;
        right:149px;
        z-index: 1;
    }
    #htshDIV .search-body>span em {
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

    #htshDIV   .rotate1 {
        transform: rotate(180deg);
    }

    #getHtshTree {
        margin-top: 17px;
    }

    #getHtshTree .jstree-default .jstree-leaf > .jstree-ocl {
        background-position: -68px -1px;
        /*display: none;*/
    }

    #getHtshTree .jstree-default .jstree-closed > .jstree-ocl {
        background-position: -100px -4px;
        /*display: none;*/
    }

    #search_Htshay {
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: 1px solid #ccc;
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
<div class="" id="contractaudit_id_div_<%=uuid %>">
    <div class="ui-layout-center" style="padding-top: 15px;padding-right: 15px;">
        <div class="col-md-12" id="htshDIV" style="padding-left: 6px;
    padding-right: 6px;">
            <div class="portlet light bordered" style="padding: 15px">
                <div class="portlet-body" style="padding: 0">
                    <div class="table-toolbar" style="margin-bottom: 0;height: 33px">
                        <div class="row">
                            <div class="col-md-12" style="margin-left:19px;">
                                <button type="button" style="    margin-left: -20px;height:33px;" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr adoptAll">
                                    <i class="icon iconfont  icon-shenhe1 iconMr" aria-hidden="true" style="font-size: 14px;"></i>审&nbsp;核&nbsp;
                                </button>
                                <div class="row search-body" style="    float: right;margin-right: -3px;">
                                    <label class="labelCommon lb1" style="margin-left: 100px;height: 33px!important;">状态</label>
                                    <div class="input-group  search-label-small pull-left mr">
                                        <select class="form-control inputCommon borderRadius4" style="height: 33px!important;border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;width:97px;height:33px;
                                            border-top-right-radius: 0px !important;border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-bottom-right-radius: 4px !important;
                                            border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;" id="txtorgName" name="txtorgName">
                                            <option value>全部</option>
                                            <option value="000" selected="selected">未审核</option>
                                            <option value="001">同意</option>
                                            <option value="002">不同意</option>
                                        </select>
                                    </div>
                                    <%--<span><em></em></span>--%>
                                    <div class="input-group  search-label-small pull-left mr" style="position: relative;width:218px!important;border-radius: 4px!important;border: 1px solid #ccc;overflow: hidden;">
                                        <input class=" input-sm  input-small" name="khbm" id="khbm" style="padding-right: 24px;outline:none;border: 0;text-indent:0px !important;width:194px !important;font-size:12px !important;" placeholder="客户名/合同编码" type="text"/>
                                        <i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" id="Search-btn" style="cursor: pointer;
                                                                                                                        border-left: 1px solid #dedede;
                                                                                                                        height: 33px;
                                                                                                                        position: absolute;
                                                                                                                        width: 45px;
                                                                                                                        right: 0;
                                                                                                                        font-size: 20px!important;
                                                                                                                        line-height: 29px;
                                                                                                                        padding-left: 10px;"></i>
                                    </div>
                                    <%--<div class="input-group search-box search-input-small pull-left">
                                        <button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr" id="Search-btn" style="height:33px;" data-loading-text="Loading...">
                                            <i class="fa fa-search iconMr"></i>查&nbsp;询&nbsp;
                                        </button>
    
                                        <a style="height:33px;background: #fff;border: #fff;margin-left: -50px;" class="pull-left hiddenadoptAll">
                                        </a>
                                    </div>--%>
                                    <div style="float: left;margin-right: 10px;">
                                        <button data=0 class="clickMore iconFontColor-10a0f7" style="height: 34px;
    width: 30px;
    padding: 0;
    border: none;
    border-radius: 0 4px 4px 0 !important;
    background: none;
    float: left;
    color: #10a0f7;outline: none">更多</button>
                                        <img style="    margin-right: 10px;vertical-align: middle;margin-top: 12px;" class="rotate1" src="<%= request.getContextPath()%>/assets/pages/img/arrow.png" alt="arrow">

                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="openMore" style="">
                                        <div class="date beginTime pull-left">
                                            <label class="labelCommon labelBg color666 dateLabel-m" style="">签约日期</label>
                                            <input type="text" readonly class="appsysinfo-m inputCommon " name="starDate" style="border-radius: 0 !important; width: 100px">
                                            <span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                        </div>
                                        <span style="float: left;margin: 5px">-</span>
                                        <div class="input-group date endTime pull-left">
                                            <input type="text" readonly class="inputCommon appsysinfo-m" name="endDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
                                            <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                        </div>
                                        <div style="clear: both"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dataTables_wrapper no-footer">
                        <table class="table table-striped table-bordered table-hover" id="contractaudit_data" style="margin-top: 15px!important">
                            <thead>
                            <tr role="row">
                                <th style="width:8px;" class="text-left sorting_disabled" rowspan="1" colspan="1">
                                    <input type="checkbox" name="selectAll">
                                </th>
                                <th style="width:90px;" class="sorting_disabled text-center" rowspan="1" colspan="1">合同编码</th>
                                <th class="text-left sorting_disabled" style="width: 150px" rowspan="1" colspan="1">客户</th>
                                <th width="10%" class="sorting_disabled text-center" rowspan="1" colspan="1">签约日期</th>
                                <th width="8%" class="sorting_disabled text-center" rowspan="1" colspan="1">服务期限</th>
                                <th width="10%" class="sorting_disabled text-center" rowspan="1" colspan="1">收费项目</th>
                                <%--<th width="8%" class="sorting_disabled text-center" rowspan="1" colspan="1">付款方式</th>--%>
                                <th width="8%" style="text-align: right!important" class="sorting_disabled text-right" rowspan="1" colspan="1">总金额</th>
                                <%--<th width="8%" style="text-align: right!important" class="sorting_disabled text-right" rowspan="1" colspan="1">收费金额/月</th>--%>
                                <th width="8%" class="sorting_disabled text-center" rowspan="1" colspan="1">记录人</th>
                                <th width="8%" class="sorting_disabled text-center" rowspan="1" colspan="1">审核状态</th>
                                <th width="15%" class="sorting_disabled text-center" rowspan="1" colspan="1">操作</th>
                            </tr>
                            </thead>
                            <tfoot>
                                <tr class="total-tfoot" style="background: #f9f9f9;border-top: 1px solid #1E9EFF;">
                                    <th></th>
                                    <th>总计</th>
                                    <th></th>
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
                                <div class="col-md-12" id="getHtshTree">
                                    <div class="input-icon">
                                        <i class="fa fa-search colorBlue-10a0f7"
                                           style="color: #ccc !important;"></i>
                                        <input type="search" class="form-control borderRadius4 btnBorderColor"
                                               id="search_Htshay" placeholder="搜索">
                                    </div>
                                    <div id="htsh_tree" style="width: 200px;overflow-x: auto;max-width: 200px">
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
<script src="<%= request.getContextPath()%>/assets/pages/scripts/contractaudit/list.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		contractaudit.setPath("<%= request.getContextPath()%>");
		contractaudit.init("<%=uuid %>","<%=bz %>");
	});
</script>