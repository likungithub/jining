<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    UUID uuid = UUID.randomUUID();
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/marketManage//table.css"/>
<div id="qywt_jbxx<%=uuid%>">
    <form id="add_form" method="post" style="width: 100%; height: 50%;" action="/customermanage/qywt/saveZfwt">
        <table class="gridpt" style="table-layout: fixed">
            <tbody>
            <tr>
                <th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">设备名称
                </th>
            </tr>
            <tr class="gridpt">
                <th style="display: none;" class="gridpt_bg">型号</th>
                <td style="display: none;">
                    <input type="text" id="preHandleCode" name="yslbh" class="easyui-validatebox input_bg validatebox-text" readonly="readonly">
                </td>
                <th>生产厂家<span class="required"> * </span></th>
                <td>
                    <input type="text" id="customerName" name="dwmc" class="easyui-validatebox input_bg validatebox-text">
                    <%--<input type="text" id="customerName" name="dwmc" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">--%>
                    <!--onclick="openFzmx()" readonly="readonly" -->
                </td>
                <th>设备编号</th>
                <td><input type="text" id="customerEnglishName" name="ywmc" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>申请人</th>
                <td><input type="text" id="customerEmail" name="text" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>

            <tr class="gridpt">
                <th>申请部门</th>
                <td>
                    <select id="preservationCondition" name="ypbcdm" style="width: 140px;">
                        <option value="001">检测一室</option>
                        <option value="002">检测二室</option>
                        <option value="003">检测三室</option>
                    </select>
                    <%--<input type="text" id="preservationCondition" name="ypbcdm" class="easyui-validatebox validatebox-text combobox-f combo-f textbox-f" style="width: 100%; background-color: rgb(255, 255, 255); border-color: rgb(255, 255, 255); border-width: 0px; display: none;"><span class="textbox easyui-fluid combo" style="width: 169px; height: 20px;"><span class="textbox-addon textbox-addon-right" style="right: 0px;"><a href="javascript:void(0)" class="textbox-icon combo-arrow" icon-index="0" tabindex="-1" style="width: 18px; height: 20px;"></a></span><input type="text" class="textbox-text validatebox-text" autocomplete="off" readonly="readonly" placeholder="" style="margin-left: 0px; margin-right: 18px; padding-top: 3px; padding-bottom: 3px; width: 143px;"><input type="hidden" class="textbox-value" name="" value="退样"></span>--%>
                </td>
                <th class="gridpt_bg">问题描述</th>
                <td>
                    <input type="text" id="salerName" name="ywyxm" class="easyui-validatebox input_bg validatebox-text">
                    <%--<input type="text" id="salerName" name="ywyxm" value="ad" class="easyui-validatebox validatebox-text" style="width: 85%;height:100%;margin-top:1px; background-color: #ffffff; border-color: #ffffff; border-width: 0px">--%>
                    <%--<a href="javascript:void(0)" class="easyui-linkbutton l-btn l-btn-small easyui-fluid" iconcls="icon-add" style="width: 17px; background-color: rgb(255, 255, 255); border-color: rgb(255, 255, 255); border-width: 0px;" onclick="getupcode()" group="" id=""><span class="l-btn-left l-btn-icon-left" style="margin-top: 0px;"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon icon-add">&nbsp;</span></span>--%>
                    <%--</a>--%>
                </td>
                <th>维修验收</th>
                <td>
                    <input type="text" id="comtomerShow" name="zddwmc" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>

            <tr class="gridpt">
                <th class="gridpt_bg">生产日期</th>
                <td>
                    <div class="date beginTime pull-left htscrq">
                        <input type="text" readonly="" id="salerDate" class="appsysinfo-m inputCommon " name="htscrq" style="border-radius: 0 !important; width: 100px">
                        <span>
                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                    <%--<input type="text" id="salerDate" readonly="readonly" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">--%>
                </td>
            </tbody>
        </table>
    </form>
    <!--<input type="button" id="sampleMa" value="管理样品" />
    <input type="button" id="saveQYWT" value="保存" />
    <input type="reset" id="cancelQYWT" value="取消" />-->
    <!--按钮  begin-->
    <div style="clear: both;padding:5px;">
        <%--<button id="sampleMa" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>--%>
        <%--<button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>--%>
        <button id="saveQYWT" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>
    </div>
    <!--按钮  end-->
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/qywt_jbxx.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {

        Addqywt.setPath('<%=request.getContextPath()%>');
        Addqywt.init('<%=id%>', '<%=uuid%>');

    });
</script>