<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
    String khbm=request.getParameter("khbm");
    if(khbm==null){
        khbm="";
    }
    String startTime=request.getParameter("startTime");
    if(startTime==null){
        startTime="";
    }
    String endTime=request.getParameter("endTime");
    if(endTime==null){
        endTime="";
    }
%>
<style>
	/* #chargeaudit_data td,#chargeaudit_data th{text-align: center !important;}
	#chargeaudit_data td:nth-child(5){text-align: right !important;}
	#chargeaudit_data td:nth-child(6){text-align: right !important;}
	#chargeaudit_data td:nth-child(7){text-align: right !important;}
	#chargeaudit_data td:nth-child(8){text-align: right !important;} */
	#page-container #summaryStatistics_view_data_info{
		height:30px !important;
		line-height:20px !important;
	}
	.moneyinput{
	   text-align: right;
	}
	#summaryStatistics_viewSearch .useSearch {
	    /* width: 280px; */
	    height: 33px;
	    /* padding-left: 10px; */
	    /* padding-top: 10px; */
	    margin-bottom: 20px;
	    border-radius: 5px !important;
	    overflow: hidden;
        border: 1px solid rgb(204, 204, 204);
	    float: left;

    }
    #summaryStatistics_viewSearch .useSearch input {
	    width: 250px;
	    height: 33px;
	    float: left;
	    border: 0;
	    padding-left: 10px;
	    outline: none;
	}
	#summaryStatistics_viewSearch .useSearch button {
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
        width: 82px;
        padding: 0;
        border: none;
        border-radius: 0 4px 4px 0 !important;
        background: none;
        float: left;
        margin-left: 10px;
        color: #10a0f7;
        outline: none;
    }
    #summaryStatistics_viewSearch  .rotate1 {
        transform: rotate(180deg);
    }
    .summaryStatistics_viewM  .activeClick{
        background: #DBF1FD!important;
    }
    .summaryStatistics_viewM .activeTop{
        border-top:1px solid #30AEF8!important;
    }
    .summaryStatistics_viewM .activeLeft{
        border-left:1px solid #30AEF8!important;
    }
    .summaryStatistics_viewM .activeRight{
        border-right:1px solid #30AEF8!important;
    }
    .summaryStatistics_viewM .activeBottom{
        border-bottom:1px solid #30AEF8!important;
    }
    #summaryStatistics_view_data td{
        white-space:normal;
    }
    .summaryStatistics_viewM .childtd{
        padding: 0px 8px 0px 8px;
        color: #666!important;
    }
    .summaryStatistics_viewM .bottomstyle{
        border-bottom: 1px dashed #dadada!important;
    }
    .summaryStatistics_viewM .wordbreak{
        word-break: keep-all;
    }



    .summaryStatistics_viewM .childtable{
        width:100%;
        table-layout: fixed;
        margin: 4px 0px 4px 0px;
    }
    .summaryStatistics_viewM .childtable tr{
        height: 30px;
    }
    .summaryStatistics_viewM .childtable td{
        border:1px solid #EAEAEA !important;
        padding: 2px 10px 2px 10px;
    }
    .summaryStatistics_viewM .childtable tr:first-child td:first-child{
        width: 30px;
    }
    .summaryStatistics_viewM .childtable tr:first-child td:last-child{
        background-color: #F9F9F9;
    }
    .summaryStatistics_viewM .childtable tr:first-child td:last-child .childdivlist{
        padding: 0px 10px 0px 10px;
        float: left;
        height: 34px;
        line-height:34px;
    }
    /*.summaryStatistics_viewM .childtable tr:first-child td:last-child .childdivlist:nth-child(-n+3){*/
        /*width: 160px;*/
        /*float: left;*/
    /*}*/
    .summaryStatistics_viewM .childtable tr:first-child td:last-child .childdivlist:last-child{
        float: right;
    }
    .summaryStatistics_viewM .childtable input[type=text]{
        width:60px;
        /*float:left;*/
        text-align: right;
    }
    .summaryStatistics_viewM .childtable button{
        background: none!important;
        color: #0EA1F7!important;
        border: none !important;
    }
    .summaryStatistics_viewM .childtable .fontSize-16{
        font-size:16px;
    }
    .summaryStatistics_viewM .childtable .hiddendiv{
        display: none;
    }
    .summaryStatistics_viewM .childtable tr:first-child td:last-child .rotate{
        transform:rotate(90deg);
        -ms-transform:rotate(90deg); /* Internet Explorer */
        -moz-transform:rotate(90deg); /* Firefox */
        -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
        -o-transform:rotate(90deg); /* Opera */
    }
</style>
<div class="row summaryStatistics_viewM" id="summaryStatistics_view_id_div">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-body">
                <div class="dataTables_wrapper no-footer">
                    <div>
                        <button name="exportExcel" id="daoctaizhang001" style="height:33px;" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4  pull-left mr">
                            <i class="icon iconfont icon-daochu"></i>导出
                        </button>
                    </div>
				    <table class="table table-striped table-bordered"id="summaryStatistics_view_data">
						<thead>
                        <tr role="row">
                            <th width="20px" class="sorting_disabled text-center" rowspan="1" colspan="1">
                            </th><th width="20%" class="sorting_disabled text-center" rowspan="1" colspan="1">合同编码</th>
                            <th width="20%" class="sorting_disabled text-left" rowspan="1" colspan="1">服务期限</th>
                            <th width="15%" class="sorting_disabled text-center" rowspan="1" colspan="1">收费项目</th>
                            <th width="15%" class="sorting_disabled text-center" rowspan="1" colspan="1">收费方式</th>
                            <th width="15%" style="text-align: right" class="sorting_disabled text-right" rowspan="1" colspan="1">应收金额</th>
                            <th width="15%" style="text-align: right" class="sorting_disabled text-right" rowspan="1" colspan="1">实收金额</th>
                        </tr>
						</thead>
					</table>
                </div>
            </div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/summaryStatistics/listView.js" type="text/javascript"></script>
<%--<script src="<%= request.getContextPath()%>/assets/pages/scripts/taskcenter/processmanagemennt.js" type="text/javascript"></script>--%>
<script type="text/javascript">
    summaryStatistics_viewlist.setPath("<%= request.getContextPath()%>");
    summaryStatistics_viewlist.init("<%=khbm%>","<%=startTime%>","<%=endTime%>");
</script>