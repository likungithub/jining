<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String dljgbm = request.getParameter("dljgbm");
    if (dljgbm == null) {
        dljgbm = "";
    }
%>
<style>
    .modal-dialog {
        width: 950px;
    }

    .ui-datepicker-calendar {
        display: none;
    }

    .modal-body {
        padding-bottom: 0px;
    }
</style>
<div class="row" id="agentloginlist">
    <div class="col-md-12">
        <div class="portlet light bordered">
            <div class="portlet-body">
                <div class="table-toolbar">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body">
                                <div class="input-group search-box pull-right">
                                    <button type="button" class="btn btn-default btnBlue pull-left borderRadius4 mr colorfff Search-btn" data-loading-text="Loading...">
                                        <i class="fa fa-search "></i>
                                        查&nbsp;询&nbsp;</button>
                                </div>
                                <div class="input-group date endTime pull-right mr">
                                    <label style="    float: left;margin-right: 10px;line-height: 33px;height: 33px;">-</label>
                                    <input type="text" value="" readonly="" class="inputCommon appsysinfo-m" name="endDate" style="border-radius: 0 !important;width: 100px">
                                    <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                    </button>
                                    </span>
                                </div>
                                <div class="date beginTime pull-right mr">
                                    <label class="labelCommon labelBg color666" style="width: 80px!important">登录时间</label>
                                    <input type="text" value="" readonly="" class="appsysinfo-m inputCommon " name="starDate" style="border-radius: 0 !important; width: 100px">
                                    <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                </div>
                                <div class="input-group pull-right">
                                    <label class="labelCommon labelBg color666" style="width: 80px!important">职员</label>
                                    <select name="username" class="pull-left inputCommon mr" style="width: 100px">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover chargeTab" id="charge_data">
                        <thead>
                        <tr>
                            <th>登录时间</th>
                            <th>退出时间</th>
                            <th>职员</th>
                            <th>登录类型</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/agentstatistics/loginlist.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        chargeView.setPath('<%=request.getContextPath()%>');
        chargeView.init('<%=dljgbm%>');
    });
</script>