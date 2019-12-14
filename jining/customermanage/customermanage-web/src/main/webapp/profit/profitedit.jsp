<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String groupFlag = request.getParameter("groupFlag");
    String profitFlag = request.getParameter("profitFlag");
    String customerCode = request.getParameter("customerCode");
    if (groupFlag == null) {
        groupFlag = "";
    }
    if (profitFlag == null) {
        profitFlag = "";
    }
    if (customerCode == null) {
        customerCode = "";
    }

    // 当前系统时间
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    String currentTime = sdf.format(new Date());
%>
<style>
    .modal-dialog {
        width: 950px;
    }

    .footInput {
        width: 100px !important;
        border-radius: 4px !important;
        border: 1px solid #e5e5e5 !important;
        outline: none !important;
        text-indent: 5px !important;
        color: #666 !important;
        margin-right: 15px;
    }

    .zc {
        width: 76px;
        text-align: center;
    }

    .hc {
        width: 100px;
        text-align: center;
        margin-left: 24px;
    }

    .ncs {
        width: 67px;
        margin-left: 25px;
    }

    .syzqy {
        width: 100px;
        text-align: center;
        margin-left: 63px;
    }

    .hc {
        width: 100px;
        text-align: center;
        margin-left: 13px;
    }

    .ncs {
        width: 50px;
        text-align: center;
        margin-left: 18px;
    }

    .qms {
        width: 50px;
        text-align: center;
        margin-left: 19px;
    }

    #profitForm .table-bordered {
        border: 1px solid #ddd !important;
    }

    #profitForm .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td, .table-bordered > thead > tr > td {
        border: 1px solid #ddd !important;
    }

    #profitForm .number {
        width: 100% !important;
        border: 1px solid #fff !important;
        text-indent: 5px !important;
        color: #666 !important;
        height: 100%;
        text-align: right;
        padding-right: 3px;
    }

    #profitForm button[disabled], html input[disabled] {
        cursor: default;
        background: #ffff99;
    }

    .zcfzb th {
        background: #F4F8F9;
        margin-bottom: 0px;
        padding: 10px 0px;
    }

    .text-center {
        text-align: center !important;
    }

    #profitForm .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
        padding: 0 !important;
        height: 35px !important;
        text-align: left;
    }
</style>
<form action="#" id="profitForm" class="form form-horizontal">
    <div class="text-center" style="font-size: 18px;">利润表</div>
    <div class="text-right fontSize12">会企02表</div>
    <div class="row">
        <div class="col-md-12" style="margin-top: 15px;
    margin-bottom: 15px;">
            <button id="importExcel_profitedit" type="button"
                    class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4 mr">
                <i class="icon iconfont icon-daoru"></i> 导入
            </button>
            <div>
                <label class="labelCommon labelWidth-col-two labelBg color666"
                       style="width: 80px !important;">编制单位</label>
                <input type="text" maxlength="300" value="<%=CurrentLoginUser.getCustomer().getName()%>"
                       name="companyName" class="inputCommon inputWidth-col-two borderRadius4 footInput"
                       placeholder="编制单位"
                       style="border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;width:220px !important;">
                <input type="text" maxlength="20" name="principal"
                       class="inputCommon inputWidth-col-two borderRadius4 footInput" placeholder="单位负责人">
                <input type="text" maxlength="20" name="auditor"
                       class="inputCommon inputWidth-col-two borderRadius4 footInput" placeholder="审核人">
                <input type="text" maxlength="20" name="tabulators"
                       class="inputCommon inputWidth-col-two borderRadius4 footInput" placeholder="制表人">
            </div>

            <div>
                <div class="input-group date timeUnit pull-right">
                    <label class="labelCommon labelWidth-col-two labelBg color666"
                           style="width: 80px !important;">编制时间</label>
                    <input type="text" value="<%=currentTime%>" disabled class="inputCommon inputWidth-col-two"
                           name="timeUnit" style="border-radius: 0 !important;
    border-right: 0px !important;width:88px !important;background:#fff;">
                    <span>
							<button class="btn btn-default" type="button" style="height: 33px;border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;">
								<i class="fa fa-calendar"></i>
							</button>
						</span>
                    单位:元
                </div>
            </div>
            <!-- <label class="col-md-2 col-xs-2">
                单位：元
            </label> -->
        </div>
    </div>
    <!-- <table class="table">
        <th class="text-left">
            编制单位
        </th>
        <th class="text-center">
            2008年6月30日
        </th>
        <th class="text-right">
            单位:元
        </th>
    </table> -->

    <table class="table table-bordered zcfzb">
        <th class="text-center">项目</th>
        <th class="text-center">行次</th>
        <th class="text-center">本月数</th>
        <th class="text-center">本年累计数</th>
        <tr>
            <td>一、主营业务收入</td>
            <td class="text-center">1</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="1" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="1" style="width: 100px">
            </td>
        </tr>

        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;减：主营业务成本</td>
            <td class="text-center">4</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="4" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="4" style="width: 100px">
            </td>
        </tr>

        <tr>
            <td> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;主营业务税金及附加
            </td>
            <td class="text-center">5</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="5" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="5" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td>二、主营业务利润（亏损以“-”填列）</td>
            <td class="text-center">10</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="10" disabled
                       style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="10" disabled
                       style="width: 100px">
            </td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加：其他业务利润（亏损以“-”填列）</td>
            <td class="text-center">11</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="11" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="11" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;减：营业费用</td>
            <td class="text-center">14</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="14" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="14" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;管理费用</td>
            <td class="text-center">15</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="15" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="15" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;财务费用</td>
            <td class="text-center">16</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="16" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="16" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td>三、营业利润（亏损以“-”填列）</td>
            <td class="text-center">18</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="18" disabled
                       style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="18" disabled
                       style="width: 100px">
            </td>
        </tr>

        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加：投资收益（损失以“-”填列）</td>
            <td class="text-center">19</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="19" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="19" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;补贴收入</td>
            <td class="text-center">22</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="22" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="22" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;营业外收入</td>
            <td class="text-center">23</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="23" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="23" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;减：营业外支出</td>
            <td class="text-center">25</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="25" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="25" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td> 四、利润总额（亏损总额以“-”填列）</td>
            <td class="text-center">27</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="27" disabled
                       style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="27" disabled
                       style="width: 100px">
            </td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;减：所得税</td>
            <td class="text-center">28</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="28" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="28" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td>五：净利润（净亏损以“-”填列）</td>
            <td class="text-center">30</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="30" disabled
                       style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="30" disabled
                       style="width: 100px">
            </td>
        </tr>
    </table>
    <div class="text-left fontSize12">补充资料</div>
    <table class="table table-bordered">
        <th class="text-center">项目</th>
        <th class="text-center">本年累计数</th>
        <th class="text-center">上年实际数</th>
        <tr>
            <td> 1、出售，处置部门或被投资单位所得收益：</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="31" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="31" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td> 2、自然灾害发生的损失</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="32" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="32" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td> 3、会计政策变更增加（或减少）利润总额</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="33" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="33" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td> 4、会计估计变更增加（或减少）利润总额</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="34" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="34" style="width: 100px">
            </td>
        </tr>

        <tr>
            <td> 5、债务重组损失</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="35" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="35" style="width: 100px">
            </td>
        </tr>
        <tr>
            <td> 6、其他</td>
            <td>
                <input type="text" class="number" value="0.00" name="monthData" line-number="36" style="width: 100px">
            </td>
            <td>
                <input type="text" class="number" value="0.00" name="yearData" line-number="36" style="width: 100px">
            </td>
        </tr>
    </table>

</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/profit/profitedit.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        profitEdit.setPath("<%=request.getContextPath() %>");
        profitEdit.init("<%=groupFlag%>", "<%=profitFlag%>", "<%=customerCode	%>");
    });
</script>