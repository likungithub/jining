<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>

<div id="changeHistory-manager-content">
    <div class="portlet">
        <div class="portlet-body form">
            <div class="table-toolbar container-fluid" style="margin-bottom: 10px;">
                <div class="row">
                    <div class="col-md-12" style="margin-top: 15px">
                        <div style="float: right;position:relative">
                            <input type="search" class="inputCommon inputWidth-col-two " id="searchchangeHistory" name="searchchangeHistory" placeholder="客户名称" style="padding-right: 45px;width:122px;color: #555;padding-left: 10px;border-radius: 4px!important">
                            <i class="fa fa-search colorBlue-10a0f7" id="btnchangeHistorySearch" style="position: absolute; right: 1px; top: 0px;cursor: pointer;border-left: 1px solid #dedede;height: 33px;line-height: 33px;width: 40px;font-size: 20px;padding-left: 10px;"></i>
                        </div>
                        <div class="input-group date  pull-right mr editEndDate">
                            <input type="text" readonly="" class="inputCommon appsysinfo-m " name="editEndDate" style="border-radius: 4px 0 0 4px!important;width: 85px">
                            <span>
                                 <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0 !important;">
                                     <i class="fa fa-calendar"></i>
                                 </button>
                             </span>
                        </div>
                        <span style="float: right;margin: 5px">-</span>
                        <div class="date  pull-right editStarDate">
                            <label class="labelCommon labelBg color666 dateLabel-m " style="">变更日期</label>
                            <input type="text" readonly="" class="appsysinfo-m inputCommon " name="editStarDate" style="width: 85px;border-radius: 0!important">
                            <span>
                                <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped table-bordered table-hover backgroundWhite"
                           id="changeHistory_data">
                        <thead>
                        <tr>
                            <th style="text-align:left">客户名称</th>
                            <th width="15%" style="text-align:center;">变更前主管会计</th>
                            <th width="15%" style="text-align:center;">变更后主管会计</th>
                            <th width="15%" style="text-align:center;">变更前客户经理</th>
                            <th width="15%" style="text-align:center;">变更后客户经理</th>
                            <th width="10%" style="text-align:center;">变更人</th>
                            <th width="10%" style="text-align: center;">变更日期</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/changeHistory/list.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        changeHistory.setPath('<%=request.getContextPath()%>');
        changeHistory.init();
    });
</script>