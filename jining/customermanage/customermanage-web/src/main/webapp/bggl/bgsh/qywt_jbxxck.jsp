<%@ page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    UUID uuid = UUID.randomUUID();
%>
<%--<script type="text/javascript">--%>
    <%--window.onload = function(){--%>
        <%--function getDate(){--%>
            <%--;--%>
            <%--var today = new Date();--%>
            <%--var date;--%>
            <%--date = (today.getFullYear()) +"-" + (today.getMonth() + 1 ) + "-" + today.getDate();--%>
            <%--return date;--%>
        <%--}--%>
        <%--window.setInterval(function(){--%>
            <%--document.getElementById("chouyangshijian").value=getDate();--%>
            <%--document.getElementById("productionDate").value=getDate();--%>
            <%--document.getElementById("syrq").value=getDate();--%>
        <%--}, 1000);--%>
    <%--}--%>
<%--</script>--%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/marketManage/table.css"/>
<style type="text/css">
    .hint{
        color: blue;
        font-weight: bold;
    }
</style>
<div id="qywt_jbxx<%=uuid%>">
    <form id="add_form" method="post" style="width: 100%; height: 50%;" action="/customermanage/qywt/saveZfwt">
        <input type="hidden" id="ypwtid" name="wtid">
<%--    新--%>
        <div>
            <table class="gridpt" style="table-layout: fixed">
                <tbody>
                <tr>
                    <div>
                        <th colspan="6" style="background-color: blue; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: left;color: white; ">样品管理<span id="ypbm2" name ="ypbm2" style="color: white;"></span></th>
                    </div>
                </tr>
                <tr class="gridpt">
                    <th class="hint">委托单No<span class="required"> * </span></th>
                    <td>
                        <input type="text" id="chouyangdanbianhao" name="cydbm" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th class="hint">样品名称<span class="required"> * </span></th>
                    <td>
                        <input type="text" id="sampleName" name="ypmc" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th class="hint">任务类型</th>
                    <td>
                        <select id="renwuleixing" name="rwlx" style="width: 140px">
                            <option value="F2">企业(2)</option>
                            <option value="F3">企业(3)</option>
                            <option value="H2">化工(2)</option>
                            <option value="H3">化工(3)</option>
                            <option value="X2">纺织/纤维(2)</option>
                            <option value="X3">纺织/纤维(3)</option>
                            <option value="Q2">轻工产品(2)</option>
                            <option value="Q3">轻工产品(3)</option>
                        </select>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th class="hint">商标</th>
                    <td>
                        <input type="text" id="tradeMark" name="sb" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr>
                    <td colspan="6" style="width: 100%;height:3px;background-color: blue"></td>
                </tr>

                <tr class="gridpt">
                    <th class="hint">委托单位</th>
                    <td>
                        <input type="text" id="weituodanwei" name="wtdw" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th class="hint">委托单位地址</th>
                    <%--                    <td colspan="5">--%>
                    <td>
                        <input type="text" id="weituodanweidizhi" name="wtdwdz" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th class="hint">委托单位电话</th>
                    <td>
                        <input type="text" id="weituodanweidianhua" name="wtdwdh" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>

                <tr class="gridpt">
                    <th class="hint">生产单位</th>
                    <td>
                        <input type="text" id="productionUnit" name="scdw" class="easyui-validatebox input_bg validatebox-text">
                    </td>


                </tr>
                <tr class="gridpt">
                    <th class="hint">检验类别</th>
                    <td>
                        <select id="jianyanleibie" name="jylb" style="width: 140px;">
                            <option value="wtjy">委托检验</option>
                            <option value="zxjy">专项检验</option>
                            <option value="jdjy">监督检验</option>
                            <option value="ssjy">型式检验</option>
                            <option value="dbsy">对比实验</option>
                            <option value="dxbg">典型报告</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td colspan="6" style="width: 100%;height:3px;background-color: blue"></td>
                </tr>

                <tr class="gridpt">
                    <th class="hint">生产日期</th>
                    <td>
                        <div class="date beginTime pull-left scrq">
                            <input type="text"  id="productionDate" class="appsysinfo-m inputCommon " name="scrq" style="border-radius: 0 !important; width: 100px">
                            <span>
                                <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                        </div>
                    </td>
                    <th>送样日期</th>
                    <td>
                        <div class="date beginTime pull-left syrq">
                            <input type="text" id="songyangriqi" class="appsysinfo-m inputCommon " name="syrq" style="border-radius: 0 !important; width: 100px">
                            <span>
                                <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                        </div>
                    </td>
                    <th class="hint">送样人员</th>
                    <td>
                        <input type="text" id="songyangrenyuan" name="syry" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th class="hint">样品数量</th>
                    <td>
                        <input type="text" id="SampleQuantity" name="ypsl" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th class="hint">标签打印数量</th>
                    <td>
                        <input type="text" id="dybqsl" name="dybqsl" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>

                <tr class="gridpt">
                    <th class="hint">样品等级</th>
                    <td>
                        <input type="text" id="sampleGrade" name="ypdj" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>样品特性和状态</th>
                    <td>
                        <input type="text" id="sampleStatus" name="ypzt" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>

                <tr class="gridpt">
                    <th class="hint">执行标准<span class="required"> * </span></th>
                    <td>
                        <input type="text" id="zhixingbiaozhun" name="ypzxbz" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th class="hint">规格型号</th>
                    <td>
                        <input type="text" id="specificationsModels" name="ggxh" class="easyui-validatebox input_bg validatebox-text">
                    </td>

                </tr>
                <tr class="gridpt">
                    <th>备注</th>
                    <td colspan="3">
                        <input type="text" id="beizhu" name="bz" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr>
                    <td colspan="6" style="width: 100%;height:6px;background-color: blue"></td>
                </tr>
                <tr class="gridpt"></tr>
                <tr class="gridpt"></tr>

                </tbody>
            </table>
        </div>
<%--    旧--%>
        <div style="display: none">
            <table class="gridpt" style="table-layout: fixed">
                <tbody>
                <tr>
                    <th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">基本信息</th>
                </tr>
                <%--<tr class="gridpt">--%>
                    <%--<th>送(受)检单位<span class="required"> * </span></th>--%>
                    <%--<td>--%>
                        <%--<div class="date pull-left">--%>
                          <%--<input type="text" id="customerName" name="dwmc" class="easyui-validatebox validatebox-text appsysinfo-m inputCommon" style="width: 100px;">--%>
                          <%--<span style="float: left;">--%>
                                    <%--<button id="btn_QueryCustomerInformation" class="btn btn-default appsysinfobtn-m" type="button" style="float: left;border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">--%>
                                        <%--选择--%>
                                    <%--</button>--%>
                         <%--</span>--%>
                        <%--</div>--%>
                    <%--</td>--%>
                    <%--<th>联系电话</th>--%>
                    <%--<td>--%>
                        <%--<input type="text" id="customerPhone" name="lxdh" class="easyui-validatebox input_bg validatebox-text">--%>
                    <%--</td>--%>
                    <%--<th>邮政编码</th>--%>
                    <%--<td>--%>
                        <%--<input type="text" id="postalCode" name="yzbm" class="easyui-validatebox input_bg validatebox-text">--%>
                    <%--</td>--%>
                <%--</tr>--%>
                <%--<tr class="gridpt">--%>
                    <%--<th>送(受)检单位所属省</th>--%>
                    <%--<td>--%>
                        <%--<select id="customerProvince" name="sfdm" style="width: 140px;">--%>
                            <%--<option></option>--%>
                        <%--</select>--%>
                    <%--</td>--%>
                    <%--<th>所属市</th>--%>
                    <%--<td>--%>
                        <%--<select id="customerZone" name="csdm" style="width: 140px;">--%>
                            <%--<option></option>--%>
                        <%--</select>--%>
                    <%--</td>--%>
                    <%--<th>所属县</th>--%>
                    <%--<td>--%>
                        <%--<select id="customerCity" name="xjdm" style="width: 140px;">--%>
                            <%--<option></option>--%>
                        <%--</select>--%>
                    <%--</td>--%>
                <%--</tr>--%>
                <%--<tr class="gridpt">--%>
                    <%--<th>详细地址</th>--%>
                    <%--<td colspan="5">--%>
                        <%--<input type="text" id="customerStreet" name="xxdz" class="easyui-validatebox input_bg validatebox-text">--%>
                    <%--</td>--%>
                <%--</tr>--%>


                <tr class="gridpt">
                    <th>技术文件</th>
                    <td>
                        <select id="jswj" name="jswj" style="width: 140px;">
                            <option value="qybz">企业标准</option>
                            <option value="jsgf">技术规范</option>
                            <option value="cyd">抽样单</option>
                            <option value="wts" selected="selected">委托书</option>
                            <option value="jsht">技术合同</option>
                            <option value="qt">其它</option>
                        </select>
                    </td>
                    <th>技术文件为其他时</th>
                    <td>
                        <input type="text" name="jswjqt"
                               class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>检验结论</th>
                    <td>
                        <select id="yzjl" name="yzjl" style="width: 140px;">
                            <option value="pd">判定</option>
                            <option value="bpd">不判定</option>
                        </select>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>检验完成日期</th>
                    <td>
                        <div class="date beginTime pull-left jywcrq">
                            <input type="text" readonly="" id="jywcriqi" class="appsysinfo-m inputCommon " name="jywcrq" style="border-radius: 0 !important; width: 100px">
                            <span>
                                <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                        </div>
                    </td>
                    <th>检验说明</th>
                    <td>
                        <select id="jysm" name="jysm" style="width: 140px;">
                            <option value="001">存在外包检验项目的，委托方同意由检验机构再行指定</option>
                            <option value="002">提供技术文件的，委托方对技术文件的真实性负责</option>
                        </select>
                    </td>
                    <th>检毕样品处理意见</th>
                    <td>
                        <select id="clyj" name="clyj" style="width: 140px;">
                            <option value="001">自愿放弃，由检验机构销毁</option>
                            <option value="002">自行领回，对检验报告无异议后15日内领取；超过三个月，自愿放弃</option>
                        </select>
                    </td>
                </tr>

                <tr class="gridpt">
                    <th>缴费方式</th>
                    <td>
                        <select id="jffs" name="jffs" style="width: 140px;">
                            <option value="001">已缴纳</option>
                            <option value="002">取报告时缴纳</option>
                            <option value="003">已协议收费</option>
                        </select>
                    </td>
                    <th>报告接收</th>
                    <td>
                        <select id="baogaojiaofufangshi" name="bgjffs" style="width: 140px;">
                            <option value="001">自行领取</option>
                            <option value="002">邮寄</option>
                            <option value="003">其他</option>
                        </select>
                    </td>

                </tr>
                <tr class="gridpt">

                    <th>委托单位邮政编码</th>
                    <td>
                        <input type="text" id="weituodanweiyouzhengbianma" name="wtdwyzbm" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>送样日期</th>
                    <td>
<%--                        <div class="date beginTime pull-left syrq">--%>
<%--                            <input type="text" readonly="" id="songyangriqi" class="appsysinfo-m inputCommon " name="syrq" style="border-radius: 0 !important; width: 100px">--%>
<%--                            <span>--%>
<%--                                <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">--%>
<%--                                    <i class="fa fa-calendar"></i>--%>
<%--                                </button>--%>
<%--                            </span>--%>
<%--                        </div>--%>
                    </td>
                </tr>
                <tr class="gridpt">

                    <th>是否作废</th>
                    <td>
                        <select id="shifouzuofei" name="zfbs" style="width: 140px;">
                            <option value=""></option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </td>
                    <th>作废原因</th>
                    <td colspan="3">
                        <input type="text" id="zuofeiyuanyin" name="zfyy" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>

                <%--<c:forEach items="${fields}" begin="0" step="3" varStatus="status">--%>
                <%--<tr class="gridpt">--%>
                    <%--<c:forEach var="x" begin="0" end="2">--%>
                        <%--&lt;%&ndash;<c:out value="${fields[status.index+x]}"></c:out>&ndash;%&gt;--%>
                        <%--<c:if test="${!empty fields[status.index + x]}">--%>
                            <%--<c:if test="${fields[status.index + x].mapControlType == 'Text Input'}">--%>
                                <%--<th>${fields[status.index + x].mapAttrName}</th>--%>
                                <%--<td>--%>
                                    <%--<input type="text" id="${fields[status.index + x].mapStoreColum}" name="${fields[status.index + x].mapStoreColum}" class="easyui-validatebox input_bg validatebox-text">--%>
                                <%--</td>--%>
                            <%--</c:if>--%>
                            <%--<c:if test="${fields[status.index + x].mapControlType == 'Date Input'}">--%>
                                <%--<th>${fields[status.index + x].mapAttrName}</th>--%>
                                <%--<td>--%>
                                    <%--<div class="date beginTime pull-left ${fields[status.index + x].storeColumn}">--%>
                                        <%--<input type="text" id="${fields[status.index + x].mapStoreColum}" name="${fields[status.index + x].mapStoreColum}" class="appsysinfo-m inputCommon " style="border-radius: 0 !important; width: 100px">--%>
                                        <%--<span>--%>
                                        <%--<button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">--%>
                                            <%--<i class="fa fa-calendar"></i>--%>
                                        <%--</button>--%>
                                    <%--</span>--%>
                                    <%--</div>--%>
                                <%--</td>--%>
                            <%--</c:if>--%>
                            <%--<c:if test="${fields[status.index + x].mapControlType == 'Select Basic'}">--%>
                                <%--<th>${fields[status.index + x].mapAttrName}</th>--%>
                                <%--<td>--%>
                                    <%--<c:set value="${ fn:split(fields[status.index + x].mapDefauleValue, ',') }" var="opts" />--%>
                                    <%--<select id="${fields[status.index + x].mapStoreColum}" name="${fields[status.index + x].mapStoreColum}" style="width: 140px">--%>
                                        <%--<c:forEach items="${ opts }" var="opt">--%>
                                            <%--<option value="${opt}">${opt}</option>--%>
                                        <%--</c:forEach>--%>
                                    <%--</select>--%>
                                <%--</td>--%>
                            <%--</c:if>--%>
                        <%--</c:if>--%>

                    <%--</c:forEach>--%>
                <%--</tr>--%>
                <%--</c:forEach>--%>
                <%--//20190319 Lims3.0修改。创建委托时不创建样品信息--%>
                <tr>
                    <div>
<%--                        <th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">样品信息 <span id="ypbm2" name ="ypbm2"></span></th>--%>
                    </div>
                </tr>
                <tr class="gridpt">
<%--                    <th class="hint">委托单No<span class="required"> * </span></th>--%>
<%--                    <td>--%>
<%--                        <input type="text" id="chouyangdanbianhao" name="cydbm" class="easyui-validatebox input_bg validatebox-text">--%>
<%--                    </td>--%>
                    <th class="hint">任务类型</th>
                    <td>
<%--                        <select id="renwuleixing" name="rwlx" style="width: 140px">--%>
<%--                            <option value="F2">企业(2)</option>--%>
<%--                            <option value="F3">企业(3)</option>--%>
<%--                            <option value="H2">化工(2)</option>--%>
<%--                            <option value="H3">化工(3)</option>--%>
<%--                            <option value="X2">纺织/纤维(2)</option>--%>
<%--                            <option value="X3">纺织/纤维(3)</option>--%>
<%--                            <option value="Q2">轻工产品(2)</option>--%>
<%--                            <option value="Q3">轻工产品(3)</option>--%>
<%--                        </select>--%>
                    </td>
                    <th class="hint">检验类别</th>
                    <td>
<%--                        <select id="jianyanleibie" name="jylb" style="width: 140px;">--%>
<%--                            <option value="wtjy">委托检验</option>--%>
<%--                            <option value="zxjy">专项检验</option>--%>
<%--                            <option value="jdjy">监督检验</option>--%>
<%--                            <option value="ssjy">型式检验</option>--%>
<%--                            <option value="dbsy">对比实验</option>--%>
<%--                            <option value="dxbg">典型报告</option>--%>
<%--                        </select>--%>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th class="hint">收样人员</th>
                    <td>
                        <input type="text" id="shouyangrenyuan" name="shouyry" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th class="hint">送样人员</th>
                    <td>
<%--                        <input type="text" id="songyangrenyuan" name="syry" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th class="hint">标签打印数量</th>
                    <td>
<%--                        <input type="text" id="dybqsl" name="dybqsl" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th class="hint">检验依据</th>
                    <td>
                        <select id="jyyj" name="jyyj" style="width: 140px;">
                            <option value="azxbz">按执行标准</option>
                            <option value="zjswj">按技术文件</option>
                            <option value="qt">其它</option>
                        </select>
                    </td>
                    <th>检验依据为其他时</th>
                    <td colspan="3">
                        <input type="text" name="jyyjbzqt"
                               class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th class="hint">委托单位</th>
                    <td>
<%--                        <input type="text" id="weituodanwei" name="wtdw" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th class="hint">生产单位</th>
                    <td>
<%--                        <input type="text" id="productionUnit" name="scdw" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>

                    <th class="hint">委托单位电话</th>
                    <td>
<%--                        <input type="text" id="weituodanweidianhua" name="wtdwdh" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th class="hint">委托单位通讯地址</th>
                    <td colspan="5">
<%--                        <input type="text" id="weituodanweidizhi" name="wtdwdz" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                </tr>
                <%--<tr class="gridpt">
                    <th>样品名称<span class="required"> * </span></th>
                    <td>
                        <input type="text" id="sampleName" name="ypmc" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>注册商标</th>
                    <td>
                        <input type="text" id="tradeMark" name="sb" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>规格型号</th>
                    <td>
                        <input type="text" id="specificationsModels" name="ggxh" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>样品等级</th>
                    <td>
                        <input type="text" id="sampleGrade" name="ypdj" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>样品数量</th>
                    <td>
                        <input type="text" id="SampleQuantity" name="ypsl" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>样品单位</th>
                    <td>
                        <input type="text" id="yangpinshuliangdanwei" name="ypdw" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
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
                    <th>样品特性和状态</th>
                    <td>
                        <input type="text" id="sampleStatus" name="ypzt" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>生产单位</th>
                    <td>
                        <input type="text" id="productionUnit" name="scdw" class="easyui-validatebox input_bg validatebox-text">
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
                    &lt;%&ndash;<th>检验依据(标准)<span class="required"> * </span></th>&ndash;%&gt;
                    &lt;%&ndash;<td>&ndash;%&gt;
                        &lt;%&ndash;<input type="text" id="" name="jyyjbz" class="easyui-validatebox input_bg validatebox-text">&ndash;%&gt;
                    &lt;%&ndash;</td>&ndash;%&gt;
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
                    <th>是否食/水/工</th>
                    <td>
                        <select id="if_ssg" name="sfssg" style="width: 140px">
                            <option value="0">否</option>
                            <option value="1">是</option>
                        </select>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>检验项目</th>
                    <td colspan="5">
                        <input type="text" id="jianyanxiangmu" name="jyxm" class="easyui-validatebox input_bg validatebox-text" readonly>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th class="sr-only">合同名称<span class="required"> * </span></th>
                    <td class="sr-only">
                        <input type="text" id="tasksName" name="htmc" class="easyui-validatebox input_bg validatebox-text validatebox-invalid" required="true" value="临淄区检验检测中心产（商）品质量委托检验协议书">
                    </td>
                    <th class="sr-only">样品编码<span class="required"> * </span></th>
                    <td class="sr-only">
                        <input type="text" id="yangpinbianma" name="ypbm" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>--%>
                <tr class="gridpt">
<%--                    <th class="hint">样品名称<span class="required"> * </span></th>--%>
<%--                    <td>--%>
<%--                        <input type="text" id="sampleName" name="ypmc" class="easyui-validatebox input_bg validatebox-text">--%>
<%--                    </td>--%>
                    <th class="hint">执行标准<span class="required"> * </span></th>
                    <td>
<%--                        <input type="text" id="zhixingbiaozhun" name="ypzxbz" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th>样品来源</th>
                    <td>
                        <select id="qiyeyangpinlaiyuan" name="qyyply" style="width: 140px">
                            <option value="001">送样</option>
                            <option value="002">委托检验机构抽样</option>
                        </select>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>封条编号</th>
                    <td>
                        <input type="text" id="fengtiaobianhao" name="ftbh" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th class="hint">注册商标</th>
                    <td>
<%--                        <input type="text" id="tradeMark" name="sb" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th>规格型号</th>
                    <td>
<%--                        <input type="text" id="specificationsModels" name="ggxh" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th class="hint">样品等级</th>
                    <td>
<%--                        <input type="text" id="sampleGrade" name="ypdj" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th class="hint">样品数量</th>
                    <td>
<%--                        <input type="text" id="SampleQuantity" name="ypsl" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th class="hint">样品单位</th>
                    <td>
                        <input type="text" id="yangpinshuliangdanwei" name="ypdw" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th class="hint">生产日期</th>
                    <td>
<%--                        <div class="date beginTime pull-left scrq">--%>
<%--                            <input type="text"  id="productionDate" class="appsysinfo-m inputCommon " name="scrq" style="border-radius: 0 !important; width: 100px">--%>
<%--                            <span>--%>
<%--                                <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">--%>
<%--                                    <i class="fa fa-calendar"></i>--%>
<%--                                </button>--%>
<%--                            </span>--%>
<%--                        </div>--%>
                    </td>
                    <th class="hint">入库日期</th>
                    <td>
                        <div class="date beginTime pull-left scrq">
                            <input type="text"  id="enterDate" class="appsysinfo-m inputCommon " name="rkrq" style="border-radius: 0 !important; width: 100px">
                            <span>
                                <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                        </div>
                    </td>

                    <th>样品特性和状态</th>
                    <td>
<%--                        <input type="text" id="sampleStatus" name="ypzt" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                </tr>
                <tr class="gridpt">


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
                    <th>样本基数</th>
                    <td>
                        <input type="text" id="yangbenjishu" name="ybjs" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">

                    <th>保质期（天）</th>
                    <td>
                        <input type="text" id="expirationDate" name="bzq" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>样品退还</th>
                    <td>
                        <select id="if_th" name="ypth" style="width: 140px">
                            <option value="0">否</option>
                            <option value="1">是</option>
                        </select>
                    </td>
                    <th>送/抽样方式</th>
                    <td>
                        <input type="text" id="chouyangfangshi" name="wtcyfs" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">

                    <th>抽/送样地点</th>
                    <td>
                        <select id="chouyangdidian" name="cydd" style="width: 140px">
                            <option value="001">检验机构受理处</option>
                            <option value="002">委托/受检单位</option>
                        </select>
                    </td>
                    <%--<th>是否蔬/果/肉</th>
                    <td>
                        <select id="if_sgr" name="sfsgr" style="width: 140px">
                            <option value="0">否</option>
                            <option value="1">是</option>
                        </select>
                    </td>
                    <th>是否食/水/工</th>
                    <td>
                        <select id="if_ssg" name="sfssg" style="width: 140px">
                            <option value="0">否</option>
                            <option value="1">是</option>
                        </select>
                    </td>--%>
                    <%--<th>是否备样</th>--%>
                    <%--<td>--%>
                        <%--<select id="if_by" name="sfby" style="width: 140px">--%>
                            <%--<option value="0">否</option>--%>
                            <%--<option value="1">是</option>--%>
                        <%--</select>--%>
                    <%--</td>--%>
                    <%--<th>是否抽样</th>
                    <td>
                        <select id="if_cy" name="ifcy" style="width: 140px">
                            <option value="0">否</option>
                            <option value="1">是</option>
                        </select>
                    </td>--%>
                    <th>样品批号或原编号</th>
                    <td>
                        <input type="text" id="sampleNumber" name="ypphhbh" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>样品保存条件其他</th>
                    <td>
                        <input type="text" id="yangpinbaocunqita" name="ccyqqt" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>备注</th>
                    <td colspan="5">
<%--                        <input type="text" id="beizhu" name="bz" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                </tr>
                <%--<tr class="gridpt">--%>
                    <%--<th>备样数量</th>--%>
                    <%--<td>--%>
                        <%--<input type="text" id="beiyangshuliang" name="bysl" class="easyui-validatebox input_bg validatebox-text">--%>
                    <%--</td>--%>

                    <%--<th>样品物态</th>
                    <td>
                        <select id="yangpinwutai" name="ypwt" style="width: 140px">
                            <option value="1">固态</option>
                            <option value="2">液态</option>
                            <option value="3">气态</option>
                            <option value="4">其他</option>
                        </select>
                    </td>--%>

                <%--</tr>--%>

                </tbody>
            </table>
        </div>
    </form>

    <!--<input type="button" id="sampleMa" value="管理样品" />
    <input type="button" id="saveQYWT" value="保存" />
    <input type="reset" id="cancelQYWT" value="取消" />-->
    <!--按钮  begin-->

    <!--按钮  end-->
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts//bggl/bgsh/qywt_jbxxck.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        console.log('${type}');
        ckqywt.setPath('<%=request.getContextPath()%>');
        ckqywt.setType('${type}');
        ckqywt.init('${id}', '<%=uuid%>');
        DisableElements()
    });
    function DisableElements()
    {
        //$(":input").attr("disabled", "disabled");
        $("form input").attr("disabled", "disabled");
        $("form select").attr("disabled", "disabled");
        $("form button").attr("disabled", "disabled");
        //$("#qywt_jbxx<%=uuid%>").children("input").attr("disabled", "disabled");
    }
</script>