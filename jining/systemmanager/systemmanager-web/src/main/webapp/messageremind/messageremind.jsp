<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
    String type=request.getParameter("type");
    String ydbz=request.getParameter("ydbz");
    if(type==null){
    	type="";
    }
    if(ydbz==null){
    	ydbz="";
    }
%>

<style>
	#page-container #messageRemind_data_info{
		height:30px !important;
		line-height:20px !important;
	}
    .pagination>.active>a{
    	z-index:10;
    }
    
    #messageremindasdf  .slimScrollDiv .portlet-scroller{
    	height:auto !important;
    }
    #messageremindasdf  .slimScrollDiv {
    	height:auto !important;
    }
    #messageremindasdf  .portlet{
    	height:auto !important;
    	overflow-x:hidden;
    }
    
    #messageremindasdf .popver {
        width: 145px;
    }
    
    .fontweight_b{
        font-weight:700; 
    }
    #messageremindasdf .clickMore li{
        /*border-left: 1px solid #10a0f7;*/
        padding: 7px 10px;
        color: #666;
        float: left;
        border-right: 0;
        cursor: pointer;
        width: 100%;
        padding-left: 40px;
    }
    #messageremindasdf .clickMore li:nth-child(1){
        padding-left: 12px;
    }
    #messageremindasdf .clickMore li:hover{
        background: #fefefe;
    }
    #messageremindasdf .clickMore .checked{
        background-color: #fefefe;
        color: #666;
    }

    #messageremindasdf .clickMore>span {
        display: block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: #CACACA transparent transparent transparent;
        position: absolute;
        top: 32px;
        right: 21px;
    }
    #messageremindasdf .clickMore>span>em {
        display: block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: #fff transparent transparent transparent;
        position: absolute;
        top: -12px;
        left: -10px;
    }
    #messageremindasdf .rotate1{
        transform: rotate(180deg);
    }

    #customerEvaluateView-m .star{
        width: 300px!important;
        display: inline-block;
    }

</style>

<div id="messageremindasdf">
    <div class="ui-layout-center">
        <div class="ui-layout-content messageremind">
            <div class="portlet" style="">
                <div class="portlet-body form">
                    <div class="portlet-scroller">
                        <div class="col-md-12">
                            <div style="height: 60px; width: 220px;float: left;padding: 13px 0px;">
                                <div class="input-group date mr pull-left">
                                    <button type="button"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4 "
                                            id="batchReadMess" data-loading-text="Loading...">
                                        <i class="icon iconfont icon-duihao1"></i> 阅读
                                    </button>
                                </div>
                                <div class="input-group date  pull-left">
                                    <button type="button"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4  "
                                            id="batchDeleteMess" data-loading-text="Loading..." style="float: left;">
                                        <i class="icon iconfont icon-shanchu"></i> 删除
                                    </button>
                                    <a style="height:33px;background: #fff;border: #fff;margin-left: -50px;" class="pull-left hiddenadoptAll">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div style="
    width: 100%;    float: right;
    /*border-top: 1px solid #ccc;*/
    padding-top: 10px;background: #F9F9F9;padding-bottom: 10px;padding-left: 27px" class="col-md-12 showMoreMain">
                            <button id="findByWeek" class="searchBtn pull-left mr ws_mdw01">近一周</button>
                            <button id="findByMonth" class="searchBtn pull-left mr ws_mdw01">本月</button>
                            <button id="findByLastMonth" class="searchBtn pull-left mr ws_mdw01">上月</button>
                            <button id="findByYear" class="searchBtn pull-left mr ws_mdw01">今年</button>
                            <form id="searchByTime" style="    width: 580px;padding-right: 0;margin-right: 0;float: right;">
                                <div class="date readtype pull-left" style="margin-right: 10px;">
                                    <label class="labelCommon labelBg color666 dateLabel-m">阅读状态</label>
                                    <select class="form-control inputCommon borderRadius4" name="readtype" style="width: 90px;border-radius: 0 4px 4px 0!important;    font-size: 12px;">
                                        <option value="3">全部</option>
                                        <option value="0">未读</option>
                                        <option value="1">已读</option>
                                    </select>
                                </div>
                                <div class="date beginTime pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m">发送时间</label>
                                    <input type="text" readonly class="appsysinfo-m inputCommon " name="starDate" style="border-radius: 0 !important; width: 78px">
                                    <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                </div>
                                <span style="float: left;margin: 5px">-</span>
                                <div class="input-group date endTime pull-left">
                                    <input type="text" readonly class="inputCommon appsysinfo-m" name="endDate" style="border-radius: 4px 0 0 4px!important;;width: 78px">
                                    <span>
	                                       <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
	                                           <i class="fa fa-calendar"></i>
	                                       </button>
	                                    </span>
                                </div>
                                <div class="input-group search-box pull-left" style="margin-left:6px;margin-right: 6px!important;">
                                    <button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left" name="Search-btn" style="height:33px;" data-loading-text="Loading...">
                                        <i class="fa fa-search "></i>查&nbsp;询&nbsp;</button>
                                </div>
                            </form>
                        </div>
                        <div class="dataTables_wrapper no-footer">
                            <table class="table table-striped table-bordered table-hover backgroundWhite" id="messageRemind_data" style=" width: 100%;">
                                <thead>
                                <tr>
                                    <th style="width:40px">
                                        <label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                            <input type="checkbox" class="group-checkable" id="allCheckMess"/>
                                        </label>
                                    </th>
                                    <th width="130px" class="text-left">消息标题</th>
                                    <th  class="text-left">消息内容</th>
                                    <th width="100px"  class="text-left">发送人</th>
                                    <th width="80px" class="text-center">日期</th>
                                    <th width="80px" class="text-center">阅读状态</th>
                                    <th width="80px" class="text-center">操作</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="ui-layout-west"  style="background: #F1F1F1!important;">
        <div class="ui-layout-content" style="padding: 0;">
            <div class="portlet">
                <div class="portlet-title" style="margin-bottom: 0">
                    <div class="caption" style="font-size: 16px;margin-left: 12px">
                        <span class="caption-subject bold uppercase">消息中心</span>
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="portlet-scroller">
                        <div class="table-toolbar">
                            <div class="row">
                                <div class="col-md-12">
                                    <%--<div id="message_remind_tree"></div>--%>
                                    <ul class="clickMore" style="overflow:hidden;float: left;padding-left: 0;margin-left:2px;width: 100%;
    margin: 0;">
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/css/messageremind/messageremind.css">
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/messageremind/messageremind.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        messageremind.setPath('<%=request.getContextPath()%>');
        messageremind.init('<%=type%>','<%=ydbz%>');
    });
</script>