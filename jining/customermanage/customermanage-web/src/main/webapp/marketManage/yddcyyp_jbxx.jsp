<%@ page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String wtid = request.getParameter("wtid");
    if (wtid == null) {
        wtid = "";
    }
    UUID uuid = UUID.randomUUID();
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/marketManage/table.css"/>
<div id="qywt_jbxx<%=uuid%>">
    <form id="add_form" method="post" style="width: 100%; height: 50%;" action="/customermanage/qywt/saveZfwt">
        <table class="gridpt" style="table-layout: fixed">
            <tbody>
            <tr>
                <th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">样品信息</th>
            </tr>
            <tr class="gridpt">
                <th>样品编码</th>
                <td>
                    <input type="text" id="yangpinbianma" name="ypbm" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>样品名称</th>
                <td>
                    <input type="text" id="sampleName" name="ypmc" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>注册商标</th>
                <td>
                    <input type="text" id="tradeMark" name="sb" class="easyui-validatebox input_bg validatebox-text">
                </td>

            </tr>
            <tr class="gridpt">
                <th>规格型号</th>
                <td>
                    <input type="text" id="specificationsModels" name="ggxh" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>样品等级</th>
                <td>
                    <input type="text" id="sampleGrade" name="ypdj" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>样品数量</th>
                <td>
                    <input type="text" id="SampleQuantity" name="ypsl" class="easyui-validatebox input_bg validatebox-text">
                </td>

            </tr>
            <tr class="gridpt">
                <th>样品单位</th>
                <td>
                    <input type="text" id="yangpinshuliangdanwei" name="ypdw" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>生产日期</th>
                <td>
                    <div class="date beginTime pull-left scrq">
                        <input type="text" readonly="" id="productionDate" class="appsysinfo-m inputCommon " name="scrq" style="border-radius: 0 !important; width: 100px">
                        <span>
                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                </td>
                <th>样品批号或原编号</th>
                <td>
                    <input type="text" id="sampleNumber" name="ypphhbh" class="easyui-validatebox input_bg validatebox-text">
                </td>

            </tr>
            <tr class="gridpt">
                <th>样品状态</th>
                <td>
                    <input type="text" id="sampleStatus" name="ypzt" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>样品保存条件</th>
                <td>
                    <select id="preservationCondition" name="ypbctj" style="width: 140px;">
                        <option value="001">常温</option>
                        <option value="002">避光</option>
                        <option value="003">干燥</option>
                        <option value="004">冷藏</option>
                        <option value="005">冷冻</option>
                        <option value="006">其他</option>
                    </select>
                </td>
                <th>生产单位</th>
                <td>
                    <input type="text" id="productionUnit" name="scdw" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>生产单位联系电话</th>
                <td>
                    <input type="text" id="shengchandanweilianxidianhua" name="scdwlxdh" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>封样人员</th>
                <td>
                    <input type="text" id="fengyangrenyuan" name="fyry" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>封样状态</th>
                <td>
                    <input type="text" id="fengyangzhuangtai" name="fyzt" class="easyui-validatebox input_bg validatebox-text">
                </td>

            </tr>
            <tr class="gridpt">
                <th>样本基数</th>
                <td>
                    <input type="text" id="yangbenjishu" name="ybjs" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>保质期（天）</th>
                <td>
                    <input type="text" id="expirationDate" name="bzq" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>样品物态</th>
                <td>
                    <select id="yangpinwutai" name="ypwt" style="width: 140px">
                        <option value="1">固态</option>
                        <option value="2">液态</option>
                        <option value="3">气态</option>
                        <option value="4">其他</option>
                    </select>
                </td>
            </tr>
            <tr class="gridpt">
                <th>样品退还</th>
                <td>
                    <select id="if_th" name="ypth" style="width: 140px">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
                <th>是否蔬/果/肉</th>
                <td>
                    <select id="if_sgr" name="sfsgr" style="width: 140px">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
                <th>样品到达日期</th>
                <td>
                    <div class="date beginTime pull-left ypddrq">
                        <input type="text" readonly="" id="yangpindaodariqi" class="appsysinfo-m inputCommon " name="ypddrq" style="border-radius: 0 !important; width: 100px">
                        <span>
                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                </td>
            </tr>
            <tr class="gridpt">
                <th>抽样地点</th>
                <td colspan="5">
                    <input type="text"  name="cydd" class="easyui-validatebox input_bg validatebox-text">
                </td>

            </tr>
            </tbody>
        </table>
    </form>
    <!--按钮  begin-->
    <div style="clear: both;padding:5px;" class="center-block">
        <button id="saveQYWT" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>保存</button>
    </div>
    <!--按钮  end-->
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/yddcyyp_jbxx.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        Addqywt.setPath('<%=request.getContextPath()%>');
        Addqywt.init('<%=wtid%>','<%=id%>', '<%=uuid%>');
    });

</script>