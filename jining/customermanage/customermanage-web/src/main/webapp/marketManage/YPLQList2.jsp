<%@ page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    UUID uuid = UUID.randomUUID();
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/marketManage/table.css"/>
<style>
    .col-md-123 {
        position:absolute;
    }
</style>
<div style="clear: both;">

    <div id="qywt_jbxx<%=uuid%>" class="col-md-123" style="z-index:1;">
        <form id="add_form" method="post" style="width: 100%; height: 50%;" action="/customermanage/qywt/savYPAdd">
            <table class="gridpt" style="table-layout: fixed">
                <tbody>
                <input type="hidden" id="yangpinid" name="id">
                <input type="hidden" id="chouyang" name="if_cy" value="0">
                <%--<tr>
                    <th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">委托信息</th>
                </tr>
                <tr class="gridpt">
                    <th>送(受)检单位<span class="required"> * </span></th>
                    <td>
                        <input type="text" id="songjiandanwei" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>联系电话</th>
                    <td>
                        <input type="text" id="customerPhone"  class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>邮政编码</th>
                    <td>
                        <input type="text" id="postalCode"  name="yzbm" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>送(受)检单位所属省</th>
                    <td>
                        <input type="text" id="customerProvince" name="sfmc" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>所属市</th>
                    <td>
                        <input type="text" id="customerZone" readonly=""  name="csmc" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>所属县</th>
                    <td>
                        <input type="text" id="customerCity" readonly=""  name="xjmc" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>详细地址</th>
                    <td colspan="5">
                        <input type="text" id="customerStreet" readonly="" name="xxdz" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>委托单位</th>
                    <td>
                        <input type="text" id="weituodanwei" readonly="" name="wtdw" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>检验类别</th>
                    <td>
                        <select id="jianyanleibie" disabled="disabled" name="jylb" style="width: 140px;">
                            <option value="wtjy">委托检验</option>
                            <option value="dbsy">对比实验</option>
                            <option value="lyfc">留样复测</option>
                        </select>
                    </td>
                    <th>产品类别</th>
                    <td>
                        <select id="chanpinleibie" disabled="disabled" name="cplb" style="width: 140px;">
                            <option value="（食品）">食品</option>
                            <option value="（农产品）">农产品</option>
                            <option value="（土壤）">土壤</option>
                            <option value="（化工）">化工</option>
                            <option value="（水质）">水质</option>
                            <option value="（轻工）">轻工</option>
                            <option value="（建材）">建材</option>
                            <option value="（畜产品）">畜产品</option>
                        </select>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>检验分包</th>
                    <td>
                        <select id="inspectionSubcontract" disabled="disabled" name="jyfb" style="width: 140px">
                            <option value="0">无</option>
                            <option value="1">有</option>
                        </select>
                    </td>
                    <th>备注</th>
                    <td colspan="3">
                        <input type="text" id="beizhu" readonly="" name="bz" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>报告交付方式</th>
                    <td>
                        <input type="text" id="baogaojiaofufangshi" readonly="" name="bgjffs" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>送样人员</th>
                    <td>
                        <input type="text" id="songyangrenyuan" readonly="" name="syry" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>送样日期</th>
                    <td>
                        <input type="text" id="songyangriqi" readonly="" name="syrq" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>--%>
                <tr>
                    <th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">样品信息</th>
                </tr>
                <tr class="gridpt">
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
                            <input type="text"  id="productionDate" class="appsysinfo-m inputCommon " name="scrq" style="border-radius: 0 !important; width: 100px">
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
                    <th>样品保存条件其他</th>
                    <td>
                        <input type="text" id="yangpinbaocunqita" name="ccyqqt" class="easyui-validatebox input_bg validatebox-text">
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
                    <th>样品退还</th>
                    <td>
                        <select id="if_th" name="ypth" style="width: 140px">
                            <option value="0">否</option>
                            <option value="1">是</option>
                        </select>
                    </td>
                </tr>
                <tr class="gridpt">
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
                    <th>是否备样</th>
                    <td>
                        <select id="if_by" name="sfby" style="width: 140px">
                            <option value="0">否</option>
                            <option value="1">是</option>
                        </select>
                    </td>
                    <%--<th>是否抽样</th>
                    <td>
                        <select id="if_cy" name="ifcy" style="width: 140px">
                            <option value="0">否</option>
                            <option value="1">是</option>
                        </select>
                    </td>--%>
                </tr>
                <tr class="gridpt">
                    <th>备样数量</th>
                    <td>
                        <input type="text" id="beiyangshuliang" name="bysl" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>样品来源</th>
                    <td>
                        <select id="qiyeyangpinlaiyuan" name="qyyply" style="width: 140px">
                            <option value="001">送样</option>
                            <option value="002">委托检验机构抽样</option>
                        </select>
                    </td>
                    <%--<th>样品物态</th>
                    <td>
                        <select id="yangpinwutai" name="ypwt" style="width: 140px">
                            <option value="1">固态</option>
                            <option value="2">液态</option>
                            <option value="3">气态</option>
                            <option value="4">其他</option>
                        </select>
                    </td>--%>
                    <th>封条编号</th>
                    <td>
                        <input type="text" id="fengtiaobianhao" name="ftbh" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>抽样方式</th>
                    <td>
                        <input type="text" id="chouyangfangshi" name="wtcyfs" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>抽/送样地点</th>
                    <td>
                        <select id="chouyangdidian" name="cydd" style="width: 140px">
                            <option value="001">检验机构受理处</option>
                            <option value="002">委托/受检单位</option>
                        </select>
                    </td>
                    <th>执行标准</th>
                    <td>
                        <input type="text" id="zhixingbiaozhun" name="ypzxbz" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>

                <tr class="gridpt">
                    <th class="sr-only">合同名称<span class="required"> * </span></th>
                    <td class="sr-only">
                        <input type="text" id="tasksName" name="htmc" class="easyui-validatebox input_bg validatebox-text validatebox-invalid" required="true" value="即墨综合检验检测中心产（商）品质量委托检验协议书">
                    </td>
                    <th class="sr-only">样品编码<span class="required"> * </span></th>
                    <td class="sr-only">
                        <input type="text" id="yangpinbianma" name="ypbm" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
        <!--按钮  begin-->
        <div style="clear: both;padding:5px;">
            <button id="saveQYWT" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>保存</button>
               </div>
        <!--按钮  end-->
    </div>

</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/YPLQList2.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        jcxmlist.setPath('<%=request.getContextPath()%>');
        jcxmlist.init('<%=id%>', '<%=uuid%>');
    });
    //全选
    $("[name='ypjs<%=uuid%>']").on('click',function () {
        if($("[name='ypjs<%=uuid%>']").prop("checked")){
            //选中
            $("[name='checkbox_checkbox']").prop("checked",true);
        }else{
            $("[name='checkbox_checkbox']").prop("checked",false);
        }
    });
</script>
