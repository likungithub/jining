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
                <input type="hidden" id="chouyang" name="if_cy" value="1">
                <tr>
                    <th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">样品信息</th>
                </tr>
                <tr class="gridpt">
                    <th>样品来源</th>
                    <td>
                        <select id="yplaiyuan" name="yangpinlaiyuan" style="width: 140px;">
                            <option value="001">加工/自制</option>
                            <option value="002">委托生产</option>
                            <option value="003">外购</option>
                            <option value="004">其他</option>
                        </select>
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
                    <th>样品名称<span class="required"> * </span></th>
                    <td>
                        <input type="text" id="yangpinmingcheng" name="ypmc" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>商标</th>
                    <td>
                        <input type="text" id="tradeMark" name="sb" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>生产/加工/购进日期</th>
                    <td>
                        <select id="riqileixingxuanze" name="rqlxxz" style="width: 140px">
                            <option value="1">生产</option>
                            <option value="2">加工</option>
                            <option value="3">购进日期</option>
                        </select>
                    </td>
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
                    <th>规格型号</th>
                    <td>
                        <input type="text" id="specificationsModels" name="ggxh" class="easyui-validatebox input_bg validatebox-text">
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
                    <th>执行标准/技术文件</th>
                    <td>
                        <input type="text" id="zhixingbiaozhun" name="ypzxbz" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>质量等级</th>
                    <td>
                        <input type="text" id="sampleGrade" name="ypdj" class="easyui-validatebox input_bg validatebox-text">
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
                    <th>抽样基数/批量</th>
                    <td>
                        <input type="text" id="yangbenjishu" name="ybjs" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>抽样数量(含备样)<span class="required"> * </span></th>
                    <td>
                        <input type="text" id="SampleQuantity" name="ypsl" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    <th>是否备样</th>
                    <td>
                        <select id="if_by" name="sfby" style="width: 140px">
                            <option value="0">否</option>
                            <option value="1">是</option>
                        </select>
                    </td>
                    <th>备样数量</th>
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
                    <th>(标称)生产者名称</th>
                    <td>
                        <input type="text" id="productionUnit" name="scdw" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                </tr>
                <tr class="gridpt">
                    <th>(标称)生产者地址</th>
                    <td>
                        <input type="text" id="shengchandizhi" name="scdz" class="easyui-validatebox input_bg validatebox-text">
                    </td>
                    </td>
                    <th>(标称)联系电话</th>
                    <td>
                        <input type="text" id="lianxidianhua" name="scdwlxdh" class="easyui-validatebox input_bg validatebox-text">
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
                            <option value="003">塑料袋</option>
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
                    <th>抽样方式</th>
                    <td>
                        <select id="chouyangfangshi" name="cyfangshi" style="width: 140px;">
                            <option value="001">无菌抽样</option>
                            <option value="002">非无菌抽样</option>
                        </select>
                    </td>
                    <th>备注</th>
                    <td>
                        <input type="text" id="beizhu" name="bzxx" class="easyui-validatebox input_bg validatebox-text">
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
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/YPLQList2CY.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        YPLQListCY.setPath('<%=request.getContextPath()%>');
        YPLQListCY.init('<%=id%>', '<%=uuid%>');
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
