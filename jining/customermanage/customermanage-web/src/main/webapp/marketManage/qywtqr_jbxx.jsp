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
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/marketManage/table.css"/>
<div id="qywt_jbxx<%=uuid%>">
    <form id="add_form" method="post" style="width: 100%; height: 50%;" action="/customermanage/qywt/saveZfwt">
        <table class="gridpt" style="table-layout: fixed">
            <tbody>
            <tr>
                <th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">一对多抽样基本信息</th>
            </tr>
            <tr class="gridpt">
                <th>抽样单编号</th>
                <td>
                    <input type="text" id="chouyangdanbianhao" name="cydbh" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>抽样地点</th>
                <td>
                    <input type="text" id="chouyangdidian" name="cydd" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>详细地址</th>
                <td>
                    <input type="text" id="xiangxidizhi" name="cydwxxdz" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>联系人</th>
                <td>
                    <input type="text" id="lianxiren" name="cydwlxr" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>联系电话</th>
                <td>
                    <input type="text" id="lianxidianhua" name="cydwlxdh" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>抽样方式</th>
                <td>
                    <input type="text" id="chouyangfangshi" name="cyfs" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>抽样日期</th>
                <td>
                    <div class="date beginTime pull-left cyrq">
                        <input type="text" readonly="" id="chouyangriqi" class="appsysinfo-m inputCommon " name="cyrq" style="border-radius: 0 !important; width: 100px">
                        <span>
                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                </td>
                <th>受检单位名称</th>
                <td>
                    <input type="text" id="shoujiandanwei" name="sjdw" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>抽样类别</th>
                <td>
                    <select id="chouyangleibie" name="cxzt" style="width: 140px">
                        <option value="003">林果农残</option>
                        <option value="006">农产品农残</option>
                    </select>
                </td>
            </tr>
            <tr class="gridpt">
                <th>检验类别</th>
                <td>
                    <select  name="jylb" style="width: 140px">
                        <option value="lxjc">例行监测</option>
                        <option value="jdcc">监督抽查</option>
                        <option value="aqcj">安全抽检</option>
                        <option value="jdjy">监督检验</option>
                    </select>
                </td>
                <th>备注</th>
                <td colspan="3">
                    <input type="text" id="beizhu" name="bz" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <c:forEach items="${fields}" begin="0" step="3" varStatus="status">
                <tr class="gridpt">
                    <c:forEach var="x" begin="0" end="2">
                        <%--<c:out value="${fields[status.index+x]}"></c:out>--%>
                        <c:if test="${!empty fields[status.index + x]}">
                            <c:if test="${fields[status.index + x].mapControlType == 'Text Input'}">
                                <th>${fields[status.index + x].mapAttrName}</th>
                                <td>
                                    <input type="text" id="${fields[status.index + x].mapStoreColum}" name="${fields[status.index + x].mapStoreColum}" class="easyui-validatebox input_bg validatebox-text">
                                </td>
                            </c:if>
                            <c:if test="${fields[status.index + x].mapControlType == 'Date Input'}">
                                <th>${fields[status.index + x].mapAttrName}</th>
                                <td>
                                    <div class="date beginTime pull-left ${fields[status.index + x].storeColumn}">
                                        <input type="text" id="${fields[status.index + x].mapStoreColum}" name="${fields[status.index + x].mapStoreColum}" class="appsysinfo-m inputCommon " style="border-radius: 0 !important; width: 100px">
                                        <span>
                                    <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                        <i class="fa fa-calendar"></i>
                                    </button>
                                </span>
                                    </div>
                                </td>
                            </c:if>
                            <c:if test="${fields[status.index + x].mapControlType == 'Select Basic'}">
                                <th>${fields[status.index + x].mapAttrName}</th>
                                <td>
                                    <c:set value="${ fn:split(fields[status.index + x].mapDefauleValue, ',') }" var="opts" />
                                    <select id="${fields[status.index + x].mapStoreColum}" name="${fields[status.index + x].mapStoreColum}" style="width: 140px">
                                        <c:forEach items="${ opts }" var="opt">
                                            <option value="${opt}">${opt}</option>
                                        </c:forEach>
                                    </select>
                                </td>
                            </c:if>
                        </c:if>
                    </c:forEach>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </form>
    <!--<input type="button" id="sampleMa" value="管理样品" />
    <input type="button" id="saveQYWT" value="保存" />
    <input type="reset" id="cancelQYWT" value="取消" />-->
    <!--按钮  begin-->
    <div style="clear: both;padding:5px;" class="center-block">
        <%--<button id="sampleMa" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>--%>
        <%--<button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>--%>
        <button id="saveQYWT" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>保存</button>
        <%--<button id="savejcx" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>添加检测项</button>--%>
    </div>
    <!--按钮  end-->
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/qywtqr_jbxx.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        Addqywt.setPath('<%=request.getContextPath()%>');
        Addqywt.init('${id}', '<%=uuid%>');
    });
</script>