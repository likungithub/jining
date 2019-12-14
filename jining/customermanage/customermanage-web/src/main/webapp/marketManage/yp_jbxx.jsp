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
    String type = request.getParameter("type");
    if (type == null) {
        type = "";
    }
    UUID uuid = UUID.randomUUID();
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/marketManage/table.css"/>
<div id="yp_jbxx<%=uuid%>">
    <form id="addYp_form" method="post" style="width: 100%; height: 50%;">
        <table class="gridpt" style="table-layout: fixed">
            <tbody>
            <tr>
                <th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">样品信息表
                </th>
            </tr>
            <tr class="gridpt">
                <th>合同名称</th>
                <td>
                    <select id="contractName" name="wtid" class="input_bg">
                        <option></option>
                    </select>
                </td>
                <th>合同类型</th>
                <td>
                    <input type="text" id="contractType" readonly="readonly" name="htlx" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>合同编号</th>
                <td>
                    <input type="text" id="contractNo" readonly="readonly" name="htbh" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>产品大类</th>
                <td>
                    <select id="productClass" name="cpdldm" class="input_bg">
                        <option value="001">乳制品</option>
                        <option value="002">淀粉及淀粉制品</option>
                        <option value="003">粮食加工品</option>
                        <option value="004">蔬菜制品</option>
                        <option value="005">豆制品</option>
                        <option value="006">餐饮食品</option>
                        <option value="007">饮料</option>
                    </select>
                    <%--<input type="text" id="customerName" name="dwmc" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">--%>
                    <!--onclick="openFzmx()" readonly="readonly" -->
                </td>
                <th>检测类别</th>
                <td>
                    <select id="detectionCategory" name="jclbdm" class="input_bg">
                        <option value="001">委托检验</option>
                        <option value="002">考核</option>
                        <option value="003">能力验证</option>
                        <option value="004">科研委托检验</option>
                        <option value="005">饲料委托检验</option>
                        <option value="006">肥料委托检验</option>
                        <option value="007">土壤委托检验</option>
                    </select>
                </td>
                <th class="gridpt_bg">应出报告日期</th>
                <td>
                    <div class="date beginTime pull-left ycbgrq">
                        <input type="text" readonly="readonly" id="dueDate" class="appsysinfo-m inputCommon " name="ycbgrq" style="border-radius: 0 !important; width: 100px">
                        <span>
                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                </td>
            </tr>
            <tr class="gridpt">
                <th>样品名称</th>
                <td>
                    <input type="text" id="sampleName" name="ypmc" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>样品形态</th>
                <td>
                    <select id="sampleCharacter" name="ypxtdm" class="input_bg">
                        <option value="001">固态</option>
                        <option value="002">半固态</option>
                        <option value="003">液态</option>
                        <option value="004">气体</option>
                        <option value="005">Solid</option>
                        <option value="006">Liquid</option>
                        <option value="007">Gas</option>
                        <option value="008">Semisolid</option>
                    </select>
                </td>
                <th class="gridpt_bg">样品数量</th>
                <td>
                    <input type="text" id="sampleQuantity" name="ypsl" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>

            <tr class="gridpt">
                <th class="gridpt_bg">备样数量</th>
                <td>
                    <input type="text" id="sampleQuantityBak" name="bysl" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>样品单位</th>
                <td>
                    <input type="text" id="sampleUnit" name="ypdw" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>规格型号</th>
                <td>
                    <input type="text" id="specifications" name="ggxh" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>

            <tr class="gridpt">
                <th>规格型号单位</th>
                <td>
                    <input type="text" id="specificationsUnit" name="ggxhdw" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th class="gridpt_bg">样品批号</th>
                <td>
                    <input type="text" id="sampleBatSn" name="ypph" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th class="gridpt_bg">保质期</th>
                <td>
                    <input type="text" id="expirationDate" name="bzq" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>

            <tr class="gridpt">
                <th class="gridpt_bg">执行标准/技术文件</th>
                <td>
                    <input type="text" id="standard" name="zxbz" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>质量等级</th>
                <td>
                    <input type="text" id="qualityGrade" name="zldj" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>商标</th>
                <td>
                    <input type="text" id="brand" name="sb" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>

            <tr class="gridpt">
                <th>日期类型</th>
                <td>
                    <select id="dateType" class="input_bg" name="rqlxdm">
                        <option value="001">生产日期</option>
                        <option value="002">加工日期</option>
                        <option value="003">购进日期</option>
                    </select>
                </td>
                <th>日期</th>
                <td>
                    <div class="date beginTime pull-left rq">
                        <input type="text" readonly="readonly" id="productDate" class="appsysinfo-m inputCommon " name="rq" style="border-radius: 0 !important; width: 100px">
                        <span>
                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                </td>
                <th class="gridpt_bg">生产者名称</th>
                <td>
                    <input type="text" id="producerName" name="sczmc" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>

            <tr class="gridpt">
                <th>生产者地址</th>
                <td>
                    <input type="text" id="producerStreet" name="sczdz" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th class="gridpt_bg">样品保存条件</th>
                <td>
                    <select id="preservationCondition" style="height:100%;" name="ypbctj">
                        <option value="001">常温</option>
                        <option value="002">冷藏</option>
                        <option value="003">冷冻</option>
                        <option value="004">避光</option>
                        <option value="005">食密闭</option>
                        <option value="006">干燥</option>
                        <option value="007">其他</option>
                        <option value="008">Normal temperature</option>
                        <option value="009">Cold storage</option>
                        <option value="010">Freeze</option>
                        <option value="011">Lucifuge</option>
                        <option value="012">Dry</option>
                        <option value="013">卫生</option>
                        <option value="014">阴凉</option>
                        <option value="015">通风</option>
                        <option value="016">干燥处</option>
                        <option value="017">0°C~4°C</option>

                    </select>
                </td>
                <th class="gridpt_bg">检验费</th>
                <td>
                    <input type="text" id="sampleTestFee" name="jyf" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>

            <tr class="gridpt">
                <th class="gridpt_bg">分包费</th>
                <td>
                    <input type="text" id="subFee" name="fbf" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th class="gridpt_bg">送样人</th>
                <td>
                    <input type="text" id="sendSampleName" name="syr" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>数据出具日期</th>
                <td>
                    <div class="date beginTime pull-left sjcjrq">
                        <input type="text" readonly="" id="dataIssueDate" class="appsysinfo-m inputCommon " name="sjcjrq" style="border-radius: 0 !important; width: 100px">
                        <span>
                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                </td>
            </tr>
            <tr class="gridpt">
                <th>到样时间</th>
                <td>
                    <div class="date beginTime pull-left dysj">
                        <input type="text" readonly="" id="sampleTime" class="appsysinfo-m inputCommon " name="dysj" style="border-radius: 0 !important; width: 100px">
                        <span>
                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                </td>
                <th>是否分包</th>
                <td>
                    <select style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px" id="isSubpackagedSample" name="if_fb">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
                <th>分包项目</th>
                <td>
                    <input type="text" id="subSampleItems" name="fbxm" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>

            <tr class="gridpt">
                <th class="gridpt_bg">保留副样</th>
                <td>
                    <select style="width: 100%;height:100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px" id="saveFuSample" name="if_blfy">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
                <th>检后样品处理</th>
                <td>
                    <select style="width: 100%;height:100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px" id="sampleHandleWay" name="if_fhcl">
                        <option value="1">返还</option>
                        <option value="0">不返还</option>
                    </select>
                </td>

                <th>报告份数</th>
                <td>
                    <input type="text" id="reportCount" name="bgfs" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>

            <tr class="gridpt">
                <th class="gridpt_bg">检测项目</th>
                <td>
                    <input type="text" id="sampleItems" name="jcxm" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>接样地点</th>
                <td>
                    <input type="text" id="receiveSampleSite" name="jydd" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th class="gridpt_bg">是否加急</th>
                <td>
                    <select style="width: 100%;height:100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px" id="isUrgent" name="if_jj">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
            </tr>

            <tr class="gridpt">
                <th>备注</th>
                <td>
                    <input type="text" id="remark" name="bzxx" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>

            </tbody>
        </table>
    </form>
    <!--<input type="button" id="sampleMa" value="管理样品" />
    <input type="button" id="saveQYWT" value="保存" />
    <input type="reset" id="cancelQYWT" value="取消" />-->
    <!--按钮  begin-->
    <div style="clear: both;padding:5px;">
        <button id="saveYpxx" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>
        <%--<button id="resetYpxx" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>--%>
        <button id="chooseJcxm" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-right borderRadius4"><i class="fa fa-plus iconMr"></i>选择检测项目</button>
    </div>
    <!--按钮  end-->
</div>
<div class="col-md-12" id="jcxmDiv<%=uuid%>" style="width: 96.3333333%;margin: 15px 30px;padding: 0;">
    <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
        <table id="jcxmTable" class="table table-striped table-bordered table-hover dataTable no-footer" cellspacing="0" width="100%" role="grid">
            <thead>
            <tr role="row">
                <%--<th width="2%" style="padding-left: 6px" class="text-left"><input type="checkbox" name="selectjcxmlist"/>--%>
                <th width="10%">检测项目名称</th>
                <th width="5%">检出限</th>
                <th width="8%">限量值 </th>
                <th width="10%">限量值默认值</th>
                <th width="8%">计量单位</th>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/yp_jbxx.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        Addyp.setPath('<%=request.getContextPath()%>');
        Addyp.init('<%=id%>', '<%=uuid%>', '<%=type%>');

    });
</script>