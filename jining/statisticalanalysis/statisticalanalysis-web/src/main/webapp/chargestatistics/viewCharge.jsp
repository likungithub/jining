<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
    String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<style>
.modal-dialog{
    width:950px;
}
.ui-datepicker-calendar {  
    display: none;
} 
/* #charge_data th,#charge_data td{
	text-align:center !important;
	    vertical-align: middle !important;
}
#charge_data td:nth-children(2){
	text-align:center !important;
}
#charge_data td:nth-children(3){
	text-align:right !important;
}
#charge_data td:nth-children(4){
	text-align:right !important;
} */
    #charge_data td:nth-child(6) {
        text-align: center !important;
    }

    #charge_data .dateW {
        width: 70px;
        text-align: center;
    }

    #charge_data .chargeDW {
        width: 180px;
        text-align: left;
    }

    #charge_data .ActualCW {
        width: 80px;
        text-align: right;
    }

    #charge_data .stateW {
        width: 80px;
        text-align: center;
    }

    #charge_data .operateW {
        width: 180px;
        text-align: center;
    }

    .modal-body {
        padding-bottom: 0px;
    }

.modal-body{padding-bottom: 0px;}
</style>
<div class="row">
    <div class="col-md-12">
        <div class="portlet light bordered">
            <div class="portlet-body">
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover chargeTab" id="charge_data">
                        <thead>
                        <tr>
                            <th class="dateW">收费日期</th>
                            <th class="chargeDW">收费时段</th>
                            <%--<th width="8%">其他收费</th>--%>
                            <th class="ActualCW">实际收款</th>
                            <th class="ActualCW">应收款</th>
                            <th>收款人</th>
                            <th class="stateW">状态</th>
                            <!-- <th width="15%">说明</th> -->
                            <th class="operateW">操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script
	src="<%=request.getContextPath()%>/assets/pages/scripts/chargestatistics/chargeView.js"
	type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		chargeView.setPath('<%=request.getContextPath()%>');
		chargeView.init('<%=id%>');
	});
</script>