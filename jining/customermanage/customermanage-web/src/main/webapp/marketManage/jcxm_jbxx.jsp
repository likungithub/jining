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
    UUID uuid = UUID.randomUUID();
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/marketManage/table.css"/>
<div id="jcxm_jbxx<%=uuid%>">
    <form id="add_form" method="post" style="width: 100%; height: 50%;">
        <table class="gridpt" style="table-layout: fixed">
            <tbody>
            <tr>
                <th colspan="6" style="background-color: #c1dcb5; width: 100%; height: 30px;font: 27px arial,helvetica,sans-serif; font-weight: bold; text-align: center; ">检测项目基本信息</th>
            </tr>
            <tr class="gridpt">
                <th>检测项目名称</th>
                <td>
                    <input type="text" id="jiancexiangmumingcheng" name="zwmc_bm" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>大类名称</th>
                <td>
                    <input type="text" id="daleimingcheng" name="cpdlmc" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>大类代码</th>
                <td>
                    <input type="text" id="daleidaima" name="cpdldm" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>亚类名称</th>
                <td>
                    <input type="text" id="yalei" name="yl" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>次亚类名称</th>
                <td>
                    <input type="text" id="ciyalei" name="cyl" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>细类名称</th>
                <td>
                    <input type="text" id="xilei" name="xl" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>检测类别代码</th>
                <td>
                    <select id="jianceleibiedaima" name="jclbdm" style="width: 140px;">
                        <option value="001">食品</option>
                        <option value="002">药品</option>
                        <option value="003">农产品</option>
                    </select>
                </td>
                <th>检测方法</th>
                <td>
                    <input type="text" id="jiancefangfa" name="jcfa" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>判定依据</th>
                <td>
                    <input type="text" id="pandingyiju" name="pdyj" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>判定依据名称</th>
                <td>
                    <input type="text" id="pandingyijumingcheneg" name="pdyjmc" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>组名</th>
                <td>
                    <input type="text" id="zuming" name="zm" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>倍率</th>
                <td>
                    <input type="text" id="beilv" name="bl" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>比较符</th>
                <td>
                    <input type="text" id="bijiaofu" name="bjf" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>判断编号</th>
                <td>
                    <input type="text" id="panduanbianhao" name="pdnh" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>限量值默认值</th>
                <td>
                    <input type="text" id="xianliangzhimorenzhi" name="xlzmrz" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>检验依据</th>
                <td>
                    <input type="text" id="jianceyiju" name="jcyj" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>检测依据名称</th>
                <td>
                    <input type="text" id="jianceyijumingcheng" name="jcyjmc" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>检出限</th>
                <td>
                    <input type="text" id="jianchuxian" name="jcx" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>限量值</th>
                <td>
                    <input type="text" id="xianliangzhi" name="xlz" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>计量单位</th>
                <td>
                    <input type="text" id="jiliangdanwei" name="jldw" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>标准方法检出限单位</th>
                <td>
                    <input type="text" id="biaozhunfangfajianchuxiandanwei" name="bzffjcxdw" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>标准最小允许限</th>
                <td>
                    <input type="text" id="biaozhunzuixiaoyunxuxian" name="bzzxyxx" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>标准最小允许限单位</th>
                <td>
                    <input type="text" id="biaozhunzuixiaoyunxuxiandanwei" name="bzzxyxxdw" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>标准最大允许限</th>
                <td>
                    <input type="text" id="biaozhunzuidayunxuxian" name="bzzdyxx" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>标准最大允许限单位</th>
                <td>
                    <input type="text" id="biaozhunzuidayunxuxiandanwei" name="bzzdyxxdw" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>微生物N值</th>
                <td>
                    <input type="text" id="weishengwuNzhi" name="wswnz" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>微生物M值</th>
                <td>
                    <input type="text" id="weishengwuMzhi" name="wswmz" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>微生物C值</th>
                <td>
                    <input type="text" id="weishengwuCzhi" name="wswcz" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>价格</th>
                <td>
                    <input type="text" id="jiage" name="jg" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>制备质量</th>
                <td>
                    <input type="text" id="zhibeizhiliang" name="zbzl" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>制备质量单位</th>
                <td>
                    <input type="text" id="zhibeizhiliangdanwei" name="zbzldw" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>营养参考价值</th>
                <td>
                    <input type="text" id="yingyangcankaojiazhi" name="yyckjz" class="easyui-validatebox input_bg validatebox-text">
                </td>
                <th>备注</th>
                <td>
                    <input type="text" id="beizhu" name="bz" class="easyui-validatebox input_bg validatebox-text">
                </td>
            </tr>
            <tr class="gridpt">
                <th>是否判定</th>
                <td>
                    <select id="shifoupanding" name="if_pd" style="width: 140px;">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
                <th>是否有CMA资质</th>
                <td>
                    <select id="shifouyouCMAzizhi" name="if_cma" style="width: 140px;">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
                <th>是否有CMAF资质</th>
                <td>
                    <select id="shifouyouCMAFzizhi" name="if_cmaf" style="width: 140px;">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
            </tr>
            <tr class="gridpt">
                <th>是否有CNAS资质</th>
                <td>
                    <select id="shifouyouCNASzizhi" name="if_cnas" style="width: 140px;">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
                <th>是否有CATL资质</th>
                <td>
                    <select id="shifouyouCATLzizhi" name="if_catl" style="width: 140px;">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
                <th>是否系统判定</th>
                <td>
                    <select id="shifouxitongpanding" name="if_xtpd" style="width: 140px;">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
            </tr>
            <tr class="gridpt">
                <th>是否标准方法</th>
                <td>
                    <select id="shifoubiaozhunfangfa" name="if_bzff" style="width: 140px;">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
            </tr>
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
        <button id="updateJcxm" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>保存</button>
        <%--<button id="savejcx" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>添加检测项</button>--%>
    </div>
    <!--按钮  end-->
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/jcxm_jbxx.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        updateJcxm.setPath('<%=request.getContextPath()%>');
        updateJcxm.init('<%=id%>', '<%=uuid%>');
    });
</script>