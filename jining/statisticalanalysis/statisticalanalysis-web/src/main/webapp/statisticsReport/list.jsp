<%--
  Created by IntelliJ IDEA.
  User: MDW
  Date: 2018/3/22 0022
  Time: 8:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    #statisticReportByM table td, #statisticReportByM table th{
        border: 1px solid #dddddd!important;
        text-align: center;
    }
    #statisticReportByM span.select2.select2-container.select2-container--bootstrap
    {
    float: left;
    }
    #statisticReportByM span.select2-selection.select2-selection--single{
        height: 33px;
        border-radius: 0 4px 4px 0!important;
    }
#statisticReportByMtable,#staffReportByMtable{
    border-collapse: collapse!important;
}

</style>
<div class="container-fluid" id="statisticReportByM">
    <div class="row">
        <div class="col-md-12" style="padding: 15px 15px 0 15px">
            <div class="wrap1 pull-left">
                <label class="labelCommon" style="width: 100px">按根部门查询</label>
                <select  id="branch" class="inputCommon ">
                    <option ></option>
                </select>
            </div>
            <div class="wrap1 pull-left">
                <label class="labelCommon ml" style="width: 100px">按员工查询</label>
                <select  id="staff">
                    <option ></option>
                </select>
            </div>
            <div class="wrap1 pull-left">
                <div class="date orderTime pull-left">
                    <label class="labelCommon ml  color666 " style="width: 100px">按时间查询</label>
                    <input id="oTime" type="text" readonly="" class="oTime inputCommon"  style="border-radius: 0 !important; width: 100px">
                    <span>
                        <button class="btn btn-default " type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                            <i class="fa fa-calendar"></i>
                        </button>
                      </span>
                </div>
            </div>
        </div>
    </div>
    <div class="tableWrap" style="margin-top: 15px;overflow: auto">
        <table class="table table-bordered" style="width: 2000px;" id="statisticReportByMtable">
            <thead>
            <tr>
                <th colspan="24" style="font-size: 18px!important">
                   全流程报表查询
                </th>
            </tr>
            <tr>
                <th rowspan="2">部门名称</th>
                <th rowspan="2">执行时间</th>
                <th colspan="4">商机数据</th>
                <th colspan="3">客户数据</th>
                <th colspan="4">合同数据</th>
                <th colspan="5">收费数据</th>
                <th colspan="2">记账数据</th>
                <th colspan="2">报税数据</th>
                <th colspan="2">任务数据</th>
            </tr>
            <tr>
                <th>新增</th>
                <th>丢失</th>
                <th>转化</th>
                <th>跟进</th>
                <th>新增</th>
                <th>丢失</th>
                <th>服务中</th>
                <th>新增</th>
                <th>合同金额</th>
                <th>续约</th>
                <th>续约金额</th>
                <th>已收</th>
                <th>超期</th>
                <th>欠费</th>
                <th>坏账</th>
                <th>垫付费用</th>
                <th>已完成</th>
                <th>未完成</th>
                <th>已报税</th>
                <th>未报税</th>
                <th>已完成节点</th>
                <th>进行中节点</th>
            </tr>
            </thead>
            <tbody>
                <tr>

                </tr>
            </tbody>
        </table>
    </div>

    <div class="row hide"  id="yugongtiaojian_m">
        <div class="col-md-12" style="padding: 15px 15px 0 15px">
            <div class="wrap1 pull-left">
                <label class="labelCommon" style="width: 100px">按节点部门查询</label>
                <select  id="branch1" class="inputCommon ">
                </select>
            </div>
            <div class="wrap1 pull-left">
                <label class="labelCommon ml" style="width: 100px">按员工查询</label>
                <select  id="staff1">
                </select>
            </div>
            <div class="wrap1 pull-left">
                <div class="date orderTime pull-left">
                    <label class="labelCommon ml  color666 " style="width: 100px">按时间查询</label>
                    <input id="oTime1" type="text" readonly="" class="oTime inputCommon"  style="border-radius: 0 !important; width: 100px">
                    <span>
                        <button class="btn btn-default " type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                            <i class="fa fa-calendar"></i>
                        </button>
                      </span>
                </div>
            </div>
        </div>
    </div>
    <div class="tableWrap1 hide" id="yugongtiaojianb_m" style="margin-top: 15px;overflow: auto">
        <table class="table table-bordered" style="width: 2000px;" id="staffReportByMtable">
            <thead>
            <tr>
                <th colspan="25" style="font-size: 18px!important">
                    员工查询
                </th>
            </tr>
            <tr>
                <th rowspan="2">子部门名称</th>
                <th rowspan="2">员工名称</th>
                <th rowspan="2">执行时间</th>
                <th colspan="4">商机数据</th>
                <th colspan="3">客户数据</th>
                <th colspan="4">合同数据</th>
                <th colspan="5">收费数据</th>
                <th colspan="2">记账数据</th>
                <th colspan="2">报税数据</th>
                <th colspan="2">任务数据</th>
            </tr>
            <tr>
                <th>新增</th>
                <th>丢失</th>
                <th>转化</th>
                <th>跟进</th>
                <th>新增</th>
                <th>丢失</th>
                <th>服务中</th>
                <th>新增</th>
                <th>合同金额</th>
                <th>续约</th>
                <th>续约金额</th>
                <th>已收</th>
                <th>超期</th>
                <th>欠费</th>
                <th>坏账</th>
                <th>垫付费用</th>
                <th>已完成</th>
                <th>未完成</th>
                <th>已报税</th>
                <th>未报税</th>
                <th>已完成节点</th>
                <th>进行中节点</th>
            </tr>
            </thead>
            <tbody>
            <tr>

            </tr>
            </tbody>
        </table>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/statisticsReport/list.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        statisticsReportFun.setPath("<%= request.getContextPath()%>");
        statisticsReportFun.init();

      /*  var date = (new Date()).getTime();
        var a=moment(date).format('YYYY-MM-DD');
        var b =  moment(date+24*60*60*1000*7).format('YYYY-MM-DD');
        $('.manager-container-sl input[name="jjsj_q"]').val(a);
        $('.manager-container-sl input[name="jjsj_z"]').val(b);*/
    });
</script>

