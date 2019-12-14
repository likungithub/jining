<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
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
<style>
    required{
        color: #f00;
    }
    .hint{
        color: blue;
        font-weight: bold;
    }
    /*.title_font{*/
    /*    font-size: 50px;*/
    /*}*/
</style>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/marketManage//table.css"/>
<div id="zfwt_jbxx<%=uuid%>">
    <form id="add_form" method="post" style="width: 100%;" action="/customermanage/zfwt/saveZfwt">
        <input type="hidden" id="wtid" name="wtid">
<%--        新--%>
        <div>
            <table class="gridpt" style="table-layout: fixed;border:3px solid blue">
                <tbody>
                    <tr>
                        <th colspan="6" style="background-color: blue; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: left;color: white; ">样品管理 <span id="ypbm1" name ="ypbm1" style="color: white;"></span></th>
                    </tr>
                    <tr class="gridpt">
                        <th class="hint title_font">抽样单编号<span class="required"> * </span></th>
                        <td>
                            <input type="text" id="chouyangdanbianhao" name="cydbm" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                        <th class="hint title_font">食品名称<span class="required"> * </span></th>
                        <td>
                            <input type="text" id="yangpinmingcheng" name="ypmc" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                       <%-- <th class="hint">任务类型</th>
                        <td>
                            <select id="renwuleixing" name="rwlx" style="width: 140px">
                                <option value="S2">食药任务(2)</option>
                                <option value="S3">食药任务(3)</option>
                                <option value="M2">畜牧任务(2)</option>
                                <option value="M3">畜牧任务(3)</option>
                                <option value="N2">农业任务(2)</option>
                                <option value="N3">农业任务(3)</option>
                                <option value="L2">水利任务(2)</option>
                                <option value="L3">水利任务(3)</option>
                                <option value="G2">粮食任务(2)</option>
                                <option value="G3">粮食任务(3)</option>
                                <option value="Y2">海洋渔业任务(2)</option>
                                <option value="Y3">海洋渔业任务(3)</option>
                                <option value="W2">卫生任务(2)</option>
                                <option value="W3">卫生任务(3)</option>
                                <option value="H2">化工(2)</option>
                                <option value="H3">化工(3)</option>
                                <option value="X2">纺织/纤维(2)</option>
                                <option value="X3">纺织/纤维(3)</option>
                                <option value="Q2">轻工产品(2)</option>
                                <option value="Q3">轻工产品(3)</option>
                            </select>
                        </td>--%>
                        <th class="title_font">商标</th>
                        <td style="border-bottom:1px solid black;">
                            <input type="text" id="tradeMark" name="sb" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                    </tr>
                    <%--<tr class="gridpt">
                        <th class="title_font">商标</th>
                        <td style="border-bottom:1px solid black;">
                            <input type="text" id="tradeMark" name="sb" class="easyui-validatebox input_bg validatebox-text">
                        </td>

                    </tr>--%>

                    <tr>
                        <td colspan="6" style="width: 100%;height:3px;background-color: blue"></td>
                    </tr>

                    <tr class="gridpt">
                        <th class="hint title_font">被抽样单单位名称</th>
                        <td>
                            <input type="text" id="shoujiandanwei" name="sjdw" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                        <th class="hint title_font">联系电话</th>
                        <td>
                            <input type="text" id="cydwdh" name="bcjdwyddh" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                       <%-- <th class="hint title_font">受检单位地址</th>
                        <td colspan="2">
                            <input type="text" id="danweidizhi" name="bcjdwdz" class="easyui-validatebox input_bg validatebox-text">
                        </td>--%>

                    </tr>
                    <%--<tr class="gridpt">
                        &lt;%&ndash;<th class="hint">受检单位法人</th>
                        <td>
                            <input type="text" id="farendaibiao" name="frdb" class="easyui-validatebox input_bg validatebox-text">
                        </td>&ndash;%&gt;
                        <th class="hint title_font">联系电话</th>
                        <td>
                            <input type="text" id="yidongdianhua" name="bcjdwyddh" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                    </tr>--%>
                    <%--<tr class="gridpt">
                        <th class="hint title_font">委托单位名称</th>
                        <td>
                            <input type="text" id="cydw" name="cydw" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                        <th class="hint title_font">委托单位地址</th>
                        <td>
                            <input type="text" id="cydwxxdz" name="cydwxxdz" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                        <th class="hint title_font">委托单位电话</th>
                        <td>
                            <input type="text" id="cydwdh" name="cydwdh" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                    </tr>--%>
                    <tr class="gridpt">
                        <th class="hint title_font">标称生产者名称</th>
                        <td>
                            <input type="text" id="productionUnit" name="scdw" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                       <%-- <th class="title_font">生产地址</th>
                        <td>
                            <input type="text" id="shengchandizhi" name="scdz" class="easyui-validatebox input_bg validatebox-text">
                        </td>--%>
                        <th class="title_font">联系电话</th>
                        <td>
                            <input type="text" id="scdwlxdh" name="scdwlxdh" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                        <th class="title_font">任务来源</th>

                        <td>
                            <input type="text" id="renwulaiyuan" name="rwly" class="easyui-validatebox input_bg validatebox-text" value="">
                        </td>
                    </tr>
                    <%--<tr class="gridpt">
                        &lt;%&ndash;<th class="hint title_font">检验类别</th>
                        <td>
                            <select id="jianyanleibie" name="jylb" style="width: 140px">
                            </select>
                        </td>&ndash;%&gt;
                        <th class="title_font">任务来源</th>

                        <td>
                            <input type="text" id="renwulaiyuan" name="rwly" class="easyui-validatebox input_bg validatebox-text" value="">
                        </td>

                    </tr>--%>

                    <tr>
                        <td colspan="6" style="width: 100%;height:3px;background-color: blue"></td>
                    </tr>

                    <tr class="gridpt">
                        <th class="hint title_font">抽样日期</th>
                        <td>
                            <div class="date beginTime pull-left cyrq">
                                <input type="text" id="chouyangriqi" class="appsysinfo-m inputCommon " name="cyrq"
                                       style="border-radius: 0 !important; width: 100px">
                                <span>
                                <button class="btn btn-default appsysinfobtn-m" type="button"
                                        style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                            </div>
                        </td>
                        <th class="hint title_font">生产日期</th>
                        <%--<td>
                            <select id="riqileixingxuanze" name="rqlxxz" style="width: 140px">
                                <option value="1">生产</option>
                                <option value="2">加工</option>
                                <option value="3">购进日期</option>
                            </select>
                        </td>--%>
                        <td> <!--日期-->
                            <div class="date beginTime pull-left scrq">
                                <input type="text"  id="productionDate" class="appsysinfo-m inputCommon " name="scrq" style="border-radius: 0 !important; width: 100px">
                                <span>
                                <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                            </div>
                        </td>
                    </tr>
                    <tr class="gridpt">
                        <th class="title_font">接样时间</th>
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
                        <th class="hint title_font">样品数量</th>
                        <td>
                            <input type="text" id="SampleQuantity" name="ypsl" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                        <th class="hint title_font">抽样基数</th>
                        <td>
                            <input type="text" id="yangbenjishu" name="ybjs" class="easyui-validatebox input_bg validatebox-text">
                        </td>

                    </tr>
                    <tr class="gridpt">

                        <%--<th>封存状态</th>
                        <td>
                            <input type="text" id="sampleStatus" name="ypzt" class="easyui-validatebox input_bg validatebox-text">
                        </td>--%>
                            <th  class="hint title_font">检验依据<span class="required"> * </span></th>
                            <td>
                                <input type="text" id="zhixingbiaozhun" name="ypzxbz" class="easyui-validatebox input_bg validatebox-text">
                            </td>
                        <th>质量等级</th>
                        <td>
                            <input type="text" id="sampleGrade" name="ypdj" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                        <th class="hint title_font">抽样人</th>
                        <td>
                            <input type="text" id="chouyangrenyuan" name="cyry" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                    </tr>
                    <tr class="gridpt">
                       <%-- <th  class="hint title_font">检验依据<span class="required"> * </span></th>
                        <td>
                            <input type="text" id="zhixingbiaozhun" name="ypzxbz" class="easyui-validatebox input_bg validatebox-text">
                        </td>--%>
                        <th class="hint title_font">规格型号</th>
                        <td>
                            <input type="text" id="specificationsModels" name="ggxh" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                           <th>抽样地点</th>
                           <td>
                               <input type="text" id="cydd" name="cydd" class="easyui-validatebox input_bg validatebox-text">
                           </td>
                           <th>检查封样人员</th>
                           <td>
                               <input type="text" id="syry" name="syry" class="easyui-validatebox input_bg validatebox-text">
                           </td>
                    </tr>

                    <tr>
                        <td colspan="6" style="width: 100%;height:3px;background-color: blue"></td>
                    </tr>

                    <tr class="gridpt">
                        <th>备注</th>
                        <td colspan="3">
                            <input type="text" id="beizhu" name="bzxx" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                        <%--<th>是否作废</th>
                        <td>
                            <select id="shifouzuofei" name="zfbs" style="width: 140px;">
                                <option value=""></option>
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </td>--%>
                    </tr>
                   <%-- <tr class="gridpt">
                        <th>作废原因</th>
                        <td colspan="3">
                            <input type="text" id="zuofeiyuanyin" name="zfyy" class="easyui-validatebox input_bg validatebox-text">
                        </td>
                    </tr>--%>
                    <tr>
                        <td colspan="6" style="width: 100%;height:6px;background-color: blue"></td>
                    </tr>

                    <tr class="gridpt"></tr>
                    <tr class="gridpt"></tr>
                    <tr class="gridpt"></tr>
                </tbody>
            </table>
        </div>
<%--        旧--%>
        <div style="display:none;">
            <table class="gridpt" style="table-layout: fixed">
                <tbody>
                <tr>
                    <th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">抽样基本信息
                    </th>
                </tr>
                <tr class="gridpt">
                    <th>任务来源</th>
                    <td colspan="3">
<%--                        <input type="text" id="renwulaiyuan" name="rwly" class="easyui-validatebox input_bg validatebox-text" value="">--%>
                    </td>

                    <th>受检单位区域类型</th>
                    <td>
                        <select id="quyuleixing" name="qylx" style="width: 140px">
                            <option value="cs">城市</option>
                            <option value="xc">乡村</option>
                            <option value="jd">景点</option>
                        </select>
                    </td>
                </tr>

                <tr class="gridpt">
                    <th>受检单位法人代表（负责人）</th>
                    <td>
                        <%--<input type="text" id="farendaibiao" name="frdb" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th>受检单位年销售额</th>
                    <td>
                        <input type="text" id="nianxiaoshoue" name="nxse" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>受检单位营业执照号</th>
                    <td>
                        <input type="text" id="yingyezhizhaohao" name="yyzzh" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>食品许可（登记、公示卡）证（编）号</th>
                    <td>
                        <input type="text" id="shipinxukezheng" name="spxkzbh" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>受检单位固定电话</th>
                    <td>
                        <input type="text" id="shoujiandanweilianxidianhua" name="sjdwlxdh" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>受检单位邮编</th>
                    <td>
                        <input type="text" id="youbian" name="bcjdwyb" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>

                <tr class="gridpt">
                    <th>抽样地点</th>
                    <td>
                        <select id="cyddLevel1" name="jylb" style="width: 140px">

                        </select>
                    </td>
                    <td>
                        <select id="cyddLevel2" name="jylb" style="width: 140px">

                        </select>
                    </td>
                    <td>
                        <select id="cyddLevel3" name="jylb" style="width: 140px">

                        </select>
                    </td>
                    <th>其他</th>
                    <td>
                        <input type="text" id="cyddqita" name="cyddqt" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>

                <tr class="gridpt">
                    <th>接样时间</th>
                    <td>
<%--                        <div class="date beginTime pull-left syrq">--%>
<%--                            <input type="text" readonly="" id="songyangriqi" class="appsysinfo-m inputCommon " name="syrq" style="border-radius: 0 !important; width: 100px">--%>
<%--                            <span>--%>
<%--                                    <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">--%>
<%--                                        <i class="fa fa-calendar"></i>--%>
<%--                                    </button>--%>
<%--                                </span>--%>
<%--                        </div>--%>
                    </td>

                    <th>报告分类1</th>
                    <td>
                        <select id="baogaofenlei1" name="bgfl1" style="width: 140px;">
                            <option value="非风险检测报告">非风险检测报告</option>
                            <option value="风险检测报告">风险检测报告</option>
                        </select>
                    </td>
                    <th>报告分类</th>
                    <td>
                        <select id="baogaofenlei" name="bgfl" style="width: 140px;">
                            <option value="24小时限时报告">24小时限时报告</option>
                            <option value="一般不合格（问题）报告">一般不合格（问题）报告</option>
                            <option value="合格报告">合格报告</option>
                        </select>
                    </td>
                    <%--<th class="hint">收样人员</th>--%>
                    <%--<td>--%>
                        <%--<input type="text" id="shouyangrenyuan" name="shouyry" class="easyui-validatebox input_bg validatebox-text">--%>
                    <%--</td>--%>
                </tr>
                <tr class="gridpt">

                    <th>是否作废</th>
                    <td>
<%--                        <select id="shifouzuofei" name="zfbs" style="width: 140px;">--%>
<%--                            <option value=""></option>--%>
<%--                            <option value="1">是</option>--%>
<%--                            <option value="0">否</option>--%>
<%--                        </select>--%>
                    </td>
                    <th>作废原因</th>
                    <td colspan="3">
<%--                        <input type="text" id="zuofeiyuanyin" name="zfyy" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                </tr>

                <tr>
<%--                    <th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">样品基本信息 <span id="ypbm1" name ="ypbm1"></span></th>--%>
                </tr>
                <tr class="gridpt">
                    <th class="hint">抽样单编号<span class="required"> * </span></th>
                    <td>
<%--                        <input type="text" id="chouyangdanbianhao" name="cydbm" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th class="hint">任务类型</th>
                    <td>
<%--                        <select id="renwuleixing" name="rwlx" style="width: 140px">--%>
<%--                            <option value="S2">食药任务(2)</option>--%>
<%--                            <option value="S3">食药任务(3)</option>--%>
<%--                            <option value="M2">畜牧任务(2)</option>--%>
<%--                            <option value="M3">畜牧任务(3)</option>--%>
<%--                            <option value="N2">农业任务(2)</option>--%>
<%--                            <option value="N3">农业任务(3)</option>--%>
<%--                            <option value="L2">水利任务(2)</option>--%>
<%--                            <option value="L3">水利任务(3)</option>--%>
<%--                            <option value="G2">粮食任务(2)</option>--%>
<%--                            <option value="G3">粮食任务(3)</option>--%>
<%--                            <option value="Y2">海洋渔业任务(2)</option>--%>
<%--                            <option value="Y3">海洋渔业任务(3)</option>--%>
<%--                            <option value="W2">卫生任务(2)</option>--%>
<%--                            <option value="W3">卫生任务(3)</option>--%>
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
<%--                        <select id="jianyanleibie" name="jylb" style="width: 140px">--%>
<%--                            <option value="jdjy">监督抽检</option>--%>
<%--                            <option value="fxjc">风险监测</option>--%>
<%--                        </select>--%>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th class="hint">受检单位名称</th>
                    <td>
<%--                        <input type="text" id="shoujiandanwei" name="sjdw" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th class="hint">(标称)生产者名称</th>
                    <td>
<%--                        <input type="text" id="productionUnit" name="scdw" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th class="hint">受检单位地址</th>
                    <td>
<%--                        <input type="text" id="danweidizhi" name="bcjdwdz" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th class="hint">受检单位联系人</th>
                    <td>
                        <input type="text" id="lianxiren" name="bcjdwlxr" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th class="hint">受检单位电话</th>
                    <td>
<%--                        <input type="text" id="yidongdianhua" name="bcjdwyddh" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th class="hint">委托单位名称</th>
                    <td>
<%--                        <input type="text" id="cydw" name="cydw" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>

                    <th class="hint">委托单位地址</th>
                    <td>
<%--                        <input type="text" id="cydwxxdz" name="cydwxxdz" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th class="hint">委托单位电话</th>
                    <td>
<%--                        <input type="text" id="cydwdh" name="cydwdh" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                </tr>


                <%--<tr class="gridpt">
                    <th>样品名称</th>
                    <td>
                        <input type="text" id="yangpinmingcheng" name="ypmc" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>样品编号</th>
                    <td>
                        <input type="text" id="yangpinbianhao" name="ypbm" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>规格型号</th>
                    <td>
                        <input type="text" id="guigexinghao" name="ggxh" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>生产单位</th>
                    <td>
                        <input type="text" id="shengchandanwei" name="scdw" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>生产单位联系电话</th>
                    <td>
                        <input type="text" id="shengchandanweilianxidianhua" name="scdwlxdh" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>生产日期</th>
                    <td>
                        <div class="date beginTime pull-left scrq">
                            <input type="text" readonly="" id="shengchanriqi" class="appsysinfo-m inputCommon " name="scrq" style="border-radius: 0 !important; width: 100px">
                            <span>
                                <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                        </div>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>样品等级</th>
                    <td>
                        <input type="text" id="yangpindengji" name="ypdj" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>商标</th>
                    <td>
                        <input type="text" id="shangbiao" name="sb" class="easyui-validatebox input_bg validatebox-text">
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
                    <th>样品数量</th>
                    <td>
                        <input type="text" id="yangpinshuliang" name="ypsl" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>样品单位</th>
                    <td>
                        <input type="text" id="yangpindanwei" name="ypdw" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>封样状态</th>
                    <td>
                        <input type="text" id="fengyangzhuangtai" name="fyzt" class="easyui-validatebox input_bg validatebox-text">
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
                </tr>--%>
                <input type="hidden" id="chouyang" name="if_cy" value="1">
                <tr class="gridpt">
                    <th class="hint">样品名称<span class="required"> * </span></th>
                    <td>
<%--                        <input type="text" id="yangpinmingcheng" name="ypmc" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th>样品来源其他</th>
                    <td>
                        <input type="text" id="yangpinlaiyuanqita" name="yplaiyuanqt" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>样品属性</th>
                    <td>
                        <select id="ypshuxing" name="yangpinshuxing" style="width: 140px;">
                            <option value="001">普通属性</option>
                            <option value="002">特殊膳食食品</option>
                            <option value="003">节令食品</option>
                            <option value="004">重大活动保障食品</option>
                        </select>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>样品类型</th>
                    <td>
                        <select id="ypleixin" name="yangpinleibie" style="width: 140px;">
                            <option value="001">食用农产品</option>
                            <option value="002">现场制售食品</option>
                            <option value="003">工业加工食品</option>
                            <option value="004">餐饮加工食品</option>
                            <option value="005">食品添加剂</option>
                            <option value="006">食品相关产品</option>
                            <option value="007">其他</option>
                        </select>
                    </td>
                    <th>样品类型其他</th>
                    <td>
                        <input type="text" id="yangpinleixingqita" name="ypleixinqt" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>样品来源</th>
                    <td>
                        <select id="yplaiyuan" name="yangpinlaiyuan" style="width: 140px;">
                            <option value="001">加工/自制</option>
                            <option value="002">委托生产</option>
                            <option value="003">外购</option>
                            <option value="004">其他</option>
                        </select>
                    </td>
                    <%--<th>样品形态</th>
                    <td>
                        <select id="yangpinxingtai" name="ypxt" style="width: 140px">
                            <option value="1">固体</option>
                            <option value="2">半固体</option>
                            <option value="3">液体</option>
                            <option value="4">气体</option>
                        </select>
                    </td>--%>
                </tr>
                <tr class="gridpt">
                    <th class="hint">注册商标</th>
                    <td>
<%--                        <input type="text" id="tradeMark" name="sb" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th class="hint">生产日期</th>
                    <td>
<%--                        <select id="riqileixingxuanze" name="rqlxxz" style="width: 140px">--%>
<%--                            <option value="1">生产</option>--%>
<%--                            <option value="2">加工</option>--%>
<%--                            <option value="3">购进日期</option>--%>
<%--                        </select>--%>
                    </td>
                    <td> <!--日期-->
<%--                        <div class="date beginTime pull-left scrq">--%>
<%--                            <input type="text"  id="productionDate" class="appsysinfo-m inputCommon " name="scrq" style="border-radius: 0 !important; width: 100px">--%>
<%--                            <span>--%>
<%--                                <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">--%>
<%--                                    <i class="fa fa-calendar"></i>--%>
<%--                                </button>--%>
<%--                            </span>--%>
<%--                        </div>--%>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>规格型号</th>
                    <td>
<%--                        <input type="text" id="specificationsModels" name="ggxh" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th>样品批号</th>
                    <td>
                        <input type="text" id="sampleNumber" name="ypphhbh" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>保质期（天）</th>
                    <td>
                        <input type="text" id="expirationDate" name="bzq" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th  class="hint">执行标准/技术文件<span class="required"> * </span></th>
                    <td>
<%--                        <input type="text" id="zhixingbiaozhun" name="ypzxbz" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th>质量等级</th>
                    <td>
<%--                        <input type="text" id="sampleGrade" name="ypdj" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th>生产许可证编号</th>
                    <td>
                        <input type="text" id="shengchanxukebianhao" name="scxkbh" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>单价</th>
                    <td>
                        <input type="text" id="danjia" name="ypdanjia" class="easyui-validatebox input_bg validatebox-text">
                    </td>

                    <th>是否出口</th>
                    <td>
                        <select id="if_ck" name="ifck" style="width: 140px">
                            <option value="0">否</option>
                            <option value="1">是</option>
                        </select>
                    </td>
                    <th class="hint">抽样数量(含备样)</th>
                    <td>
<%--                        <input type="text" id="SampleQuantity" name="ypsl" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                </tr>
                <tr class="gridpt">

                    <th class="hint">抽样基数/批量</th>
                    <td>
<%--                        <input type="text" id="yangbenjishu" name="ybjs" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th>是否备样</th>
                    <td>
                        <select id="if_by" name="sfby" style="width: 140px">
                            <option value="0">否</option>
                            <option value="1" selected="selected">是(封样留存于本单位)</option>
                            <option value="1">是(封样留存于其他位置)</option>
                        </select>
                    </td>
                    <th class="hint">备样数量</th>
                    <td>
                        <input type="text" id="beiyangshuliang" name="bysl" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>样品形态</th>
                    <td>
                        <select id="yangpinxingtai" name="ypxt" style="width: 140px">
                            <option value="1">固体</option>
                            <option value="2">半固体</option>
                            <option value="3">液体</option>
                            <option value="4">气体</option>
                        </select>
                    </td>
                    <th>包装分类</th>
                    <td>
                        <select id="yangpinbaozhuangfenlei" name="ypbgfl" style="width: 140px">
                            <option value="1">散包</option>
                            <option value="2">预包装</option>
                        </select>
                    </td>

                </tr>
                <tr class="gridpt">
                    <th>(标称)生产者地址</th>
                    <td>
<%--                        <input type="text" id="shengchandizhi" name="scdz" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    </td>
                    <th>(标称)联系电话</th>
                    <td>
<%--                        <input type="text" id="lianxidianhua" name="scdwlxdh" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th>(标称)样品储存条件</th>
                    <td>
                        <select id="preservationCondition" name="ypbctj" style="width: 140px;">
                            <option value="001">常温</option>
                            <option value="002">避光</option>
                            <%--<option value="003">干燥</option>--%>
                            <option value="004">冷藏</option>
                            <option value="005">冷冻</option>
                            <option value="007">密闭</option>
                            <option value="006">其他</option>
                        </select>
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>样品储存条件其他</th>
                    <td>
                        <input type="text" id="yangpincucuntiaojianqita" name="ccyqqt" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>抽样样品包装</th>
                    <td>
                        <select id="chouyangyangpinbaozhuang" name="cyypbz" style="width: 140px;">
                            <option value="001">玻璃瓶</option>
                            <option value="002">塑料瓶</option>
                            <option value="003" selected="selected">塑料袋</option>
                            <option value="004">无菌袋</option>
                            <option value="005">其他</option>
                        </select>
                    </td>
                    <th>抽样样品包装其他</th>
                    <td>
                        <input type="text" id="yangpinbaozhuangqita" name="cyypbzqt" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>送/抽样方式</th>
                    <td>
                        <select id="chouyangfangshi" name="cyfangshi" style="width: 140px;">
                            <option value="001">无菌抽样</option>
                            <option value="002" selected="selected">非无菌抽样</option>
                        </select>
                    </td>
                    <th class="hint">抽样人</th>
                    <td>
<%--                        <input type="text" id="chouyangrenyuan" name="cyry" class="easyui-validatebox input_bg validatebox-text">--%>
                    </td>
                    <th class="hint">抽样日期</th>
                    <td>
<%--                        <div class="date beginTime pull-left cyrq">--%>
<%--                            <input type="text" readonly="" id="chouyangriqi" class="appsysinfo-m inputCommon " name="cyrq"--%>
<%--                                   style="border-radius: 0 !important; width: 100px">--%>
<%--                            <span>--%>
<%--                                <button class="btn btn-default appsysinfobtn-m" type="button"--%>
<%--                                        style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">--%>
<%--                                <i class="fa fa-calendar"></i>--%>
<%--                                </button>--%>
<%--                            </span>--%>
<%--                        </div>--%>
                    </td>
                </tr>
                <tr class="gridpt">
                    <%--<th class="hint">电话</th>--%>
                    <%--<td>--%>
                        <%--<input type="text" id="chouyangdaiweidianhua" name="cydwdh" class="easyui-validatebox input_bg validatebox-text">--%>
                    <%--</td>--%>
                    <th>邮编</th>
                    <td>
                        <input type="text" id="chouyangdanweiyoubian" name="cydwyb" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>备注</th>
                    <td>
<%--                        <input type="text" id="beizhu" name="bzxx" class="easyui-validatebox input_bg validatebox-text">--%>
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
        </div>
    </form>
    <!--按钮  begin-->
    <div style="clear: both;padding:5px;">
        <button id="saveSPCY" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>保存</button>
        <button id="zf_SaveQYWTDy" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>保存并打印</button>
        <button id="zf_WtXZ" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>历史抽样单</button>
    </div>
    <!--按钮  end-->
    <div style="height: 50px;"></div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/zfwt_jbxx.js" type="text/javascript"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/jquery-ui/jquery-ui.css">
<script src="<%=request.getContextPath()%>/assets/pages/jquery-ui/jquery-ui.js"></script>
<script type="text/javascript">
    $(function() {
        Addzfwt.setPath('<%=request.getContextPath()%>');
        Addzfwt.init('${id}', '<%=uuid%>');

    });
</script>