<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
    String ypbm = request.getParameter("ypbm");
	String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    UUID uuid = UUID.randomUUID();
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/marketManage//table.css" />
<div id="ypjs_jcxm<%=uuid%>">
	<form id="add_form" method="post" style="width: 100%;" action="/customermanage/zfwt/saveZfwt">
		<table class="gridpt" style="table-layout:fixed">
			<tbody>
				<tr class="gridpt">
					<th>产品大类</th>
					<td>
						<!-- <input type="text" id="productClass" name="" class="easyui-validatebox validatebox-text" style="width: 85%;height:100%;margin-top:1px; background-color: #ffffff; border-color: #ffffff; border-width: 0px"> -->
						<!-- <a href="javascript:void(0)" class="easyui-linkbutton l-btn l-btn-small l-btn-plain" iconcls="icon-add" onclick="openFzmx()" plain="true" group="" id=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon icon-add">&nbsp;</span></span>
						</a> -->
		<!-- 				<input type="hidden" class="textbox-value" name="SelectProvince" value=""> -->
					   <select id="productClass" name="cpdldm" class="input_bg">
                        <option value="001">乳制品</option>
                        <option value="002">淀粉及淀粉制品</option>
                        <option value="003">粮食加工品</option>
                        <option value="004">蔬菜制品</option>
                        <option value="005">豆制品</option>
                        <option value="006">餐饮食品</option>
                        <option value="007">饮料</option>
                    </select>
						
					</td>
					<th>任务来源</th>
					<td>
						<input type="text" id="sampleTaskFrom" name="rwly" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">任务类别</th>
					<td>

						 <select id="detectionCategory" name="rwlb" class="input_bg">
							<option  value="001">委托检验</option>
							<option  value="002" >监督抽检</option>
							<option  value="003" >风险监测</option>
						</select>
					</td>
				</tr>
				<tr class="gridpt">

					<th class="gridpt_bg">区域类型</th>
					<td>
						<select id="areaType" name="qylx" style="height:100%;">
							<option value="城市">城市</option>
							<option value="乡村">乡村</option>
							<option value="景点">景点</option>
						</select>
					</td>
					<th class="gridpt_bg">应出报告日期</th>
					<td>
						<div class="date beginTime pull-left">

							<input type="text"  class="appsysinfo-m inputCommon " name="ycbgrq" style="border-radius: 0 !important; width: 100px">
							<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
						</div>
					</td>

					<th>样品名称</th>
					<td>
						<input type="text" id="sampleName" name="ypmc" class="easyui-validatebox input_bg validatebox-text">
					</td>

				</tr>
				<tr class="gridpt">
					<th>样品形态</th>
					<td>
						<select id="sampleCharacter" name="ypxtdm" style="height:100%;">
							<option value="固态">固态</option>
							<option value="半固态">半固态</option>
							<option value="液态">液态</option>
							<option value="气体">气体</option>
							<option value="Solid">Solid</option>
							<option value="Liquid">Liquid</option>
							<option value="Gas">Gas</option>
							<option value="Semisolid">Semisolid</option>

						</select>
					</td>

					<th class="gridpt_bg" >样品数量</th>
					<td>
						<input type="text" name="ypsl" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">抽样基数/批量</th>
					<td>
						<input type="text" name = "cyjs" class="easyui-validatebox input_bg validatebox-text"></td>
				</tr>

				<tr class="gridpt">
					<th class="gridpt_bg">备样数量</th>
					<td>
						<input type="text" name = "bysl" class="easyui-validatebox input_bg validatebox-text"></td>
					<th>样品单位</th>
					<td>
						<input type="text" id="sampleUnit" name= "ypdw" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>规格型号</th>
					<td>
						<input type="text" id="specifications" name= "ggxh" class="easyui-validatebox input_bg validatebox-text">
					</td>
				</tr>
				<tr class="gridpt">
					<th>规格型号单位</th>
					<td>
						<input type="text" id="specificationsUnit"  name= "ggxhdw"class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">样品批号</th>
					<td>
						<input type="text" id="sampleBatSn" name= "ypph"class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">保质期</th>
					<td>
						<input type="text" id="expirationDate"  name= "bzq" class="easyui-validatebox input_bg validatebox-text">
					</td>
				</tr>
				<tr class="gridpt">
					<th class="gridpt_bg">执行标准/技术文件</th>
					<td>
						<input type="text" id="standard" name= "zxbz" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>质量等级</th>
					<td>
						<input type="text" id="qualityGrade" name= "zldj" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<!-- <th>包装分类</th>
					<td>
						<select id="packageType" name= "bzlx" class="input_bg">
							<option value="预包装">预包装</option>
							<option value="散装">散装</option>
							<option value="Prepackage">Prepackage</option>
							<option value="In bulk">In bulk</option>

						</select>
					</td> -->
				</tr>
				<tr class="gridpt">
					<th>样品来源</th>
					<td>
						<input type="text" id="sampleType" name="yply" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">样品属性</th>
					<td>
						<select id="sampleProperty" name="ypsx" class="input_bg">
							<option value="特殊膳食食品">特殊膳食食品</option>
							<option value="普通食品">普通食品</option>
							<option value="节令食品">节令食品</option>
							<option value="重大活动保障食品">重大活动保障食品</option>
							<option value="其他">其他</option>

						</select>
					</td>
					<th class="gridpt_bg">样品类型</th>
					<td>
						<select id="sampleForm"  name = "yplx" class="input_bg">
							<option value="食用农产品">食用农产品</option>
							<option value="工业加工食品">工业加工食品</option>
							<option value="餐饮加工食品">餐饮加工食品</option>
							<option value="食品添加剂">食品添加剂</option>
							<option value="食品相关产品">食品相关产品</option>
							<option value="其他(  )">其他( )</option>
							<option value="饲料样品">饲料样品</option>
							<option value="肥料样品">肥料样品</option>
							<option value="化妆品样品">化妆品样品</option>

						</select>
					</td>

				</tr>

				<tr class="gridpt">

					<th>商标</th>
					<td>
						<input type="text" id="brand" name="sb" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>日期类型</th>
					<td>
						<select id="dateType" name = "rqlxdm" class="input_bg">
							<option value="生产日期">生产日期</option>
							<option value="加工日期">加工日期</option>
							<option value="购进日期">购进日期</option>

						</select>
					</td>
					<th>日期</th>
					<td>
						<div class="date beginTime pull-left">

							<input type="text" readonly="" name = "rq" class="appsysinfo-m inputCommon " style="border-radius: 0 !important; width: 100px">
							<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
						</div>
					</td>
				</tr>
				<tr class="gridpt">
					<th class="gridpt_bg">单价（元）</th>
					<td>
						<input type="text" name="dj" class="easyui-validatebox input_bg validatebox-text"></td>
					<th class="gridpt_bg">是否出口</th>
					<td>
						<select class="input_bg" id="isExport" name="if_ck">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</td>
					<th class="gridpt_bg">资质类型</th>
					<td>
						<select name="zzlx">
						<option>
						</option>
						</select>
					
					</td>
				</tr>
				<tr class="gridpt">
					<th>进货量（流通环节）</th>
					<td>
						<input type="text" name="jhl" id="replenishmentQuantity" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>库存量（流通环节）</th>
					<td>
						<input type="text" id="stock" name="ccl" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">生产者名称</th>
					<td>
						<input type="text" id="producerName" name="sczmc" class="easyui-validatebox input_bg validatebox-text">
					</td>
				</tr>
				<tr class="gridpt">
					<th class="gridpt_bg">生产许可证编号</th>
					<td>
						<input type="text" id="qsNum" name="scxkzbh" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">所属省</th>
					<td>
						<input type="text" id="sfmc" name="sfmc" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>所属市</th>
					<td>
						<!-- <select id="producerZone" name="SelectProvince" onmouseover="mousedown2()" class="input_bg">
					<option value=""></option>
					</select> -->
					<input type="text" id="csmc" name="csmc" class="easyui-validatebox input_bg validatebox-text">
					</td>
				</tr>
				<tr class="gridpt">
					<th>所属县</th>
					<td>
						<!-- <select id="producerCity" name="SelectDistrict" onmouseover="mousedown2()" class="input_bg">
						<option value=""></option>
						</select>  -->
						<input type="text" name="xjmc" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>所属街道</th>
					<td>
						<input type="text" id="producerStreet" name="jdmc" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">联系人</th>
					<td>
						<input type="text" id="producerContacts" name="lxr" class="easyui-validatebox input_bg validatebox-text">
					</td>
				</tr>
				<tr class="gridpt">

					<th class="gridpt_bg">电话</th>
					<td>
						<input type="text" id="producerTel" name="dh" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">样品保存条件</th>
					<td>
						<select id="preservationCondition" name="ypbctj" style="height:100%;">
							<option value="常温">常温</option>
							<option value="冷藏">冷藏</option>
							<option value="冷冻">冷冻</option>
							<option value="避光">避光</option>
							<option value="食密闭">食密闭</option>
							<option value="干燥">干燥</option>
							<option value="其他">其他</option>
							<option value="Normal temperature">Normal temperature</option>
							<option value="Cold storage">Cold storage</option>
							<option value="Freeze">Freeze</option>
							<option value="Lucifuge">Lucifuge</option>
							<option value="Dry">Dry</option>
							<option value="卫生">卫生</option>
							<option value="阴凉">阴凉</option>
							<option value="通风">通风</option>
							<option value="干燥处">干燥处</option>
							<option value="0°C~4°C">0°C~4°C</option>

						</select>
					</td>
					<th>寄、送样品截止日期</th>
					<td>
						<div class="date beginTime pull-left">

							<input type="text" readonly=""  name="jsypjzrq" class="appsysinfo-m inputCommon " style="border-radius: 0 !important; width: 100px">
							<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
						</div>
					</td>
				</tr>

				<tr class="gridpt">
					<th>寄送样品地址</th>
					<td>
						<input type="text" id="sendAddr" name="jsypdz" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">检验费</th>
					<td>
						<input type="text" name="jyf" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">分包费</th>
					<td>
						<input type="text" name="fbf" class="easyui-validatebox input_bg validatebox-text"></td>
				</tr>
				<tr class="gridpt" style="display: none;">
					<th>抽样单编号</th>
					<td>
						<input type="text" id="sampleFormSn" name="cydbh" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">被抽样单位名称</th>
					<td>
						<input type="text" id="testedCustomerName" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">所属省</th>
					<td>
						<select id="testedCustomerProvince" class="input_bg combobox-f combo-f textbox-f" textboxname="SelectProvince" style="display: none;" comboname="SelectProvince"></select><span class="textbox combo" style="width: 98.0093px; height: 20.0093px;"><span class="textbox-addon textbox-addon-right" style="right: 0px;"><a href="javascript:void(0)" class="textbox-icon combo-arrow" icon-index="0" tabindex="-1" style="width: 18px; height: 20.0093px;"></a></span><input type="text" class="textbox-text validatebox-text textbox-prompt" autocomplete="off" readonly="readonly" placeholder="" style="margin-left: 0px; margin-right: 19px; padding-top: 3px; padding-bottom: 3px; width: 72.0093px;"><input type="hidden" class="textbox-value" name="SelectProvince" value=""></span>
					</td>
					<th class="gridpt_bg">所属市</th>
					<td>
						<select id="testedCustomerZone" name="SelectCity" onmouseover="mousedown1()" class="input_bg">
							<option value=""></option>
						</select>
					</td>
					<th>所属县</th>
					<td>
						<select id="testedCustomerCity" name="SelectDistrict" onmouseov="mousedown1()" class="input_bg">
							<option value=""></option>
						</select>
					</td>
					<th>所属街道</th>
					<td>
						<input type="text" id="testedCustomerStreet" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>法人代表</th>
					<td>
						<input type="text" id="legalPerson" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">年销售额（万元）</th>
					<td style="">
						<input type="text" id="saleYear" class="easyui-numberbox numberbox-f textbox-f" style="width: 100%; background-color: rgb(255, 255, 255); border-color: rgb(255, 255, 255); border-width: 0px; display: none;"><span class="textbox easyui-fluid numberbox" style="width: 21.0093px; height: 20.0093px;"><input type="text" class="textbox-text validatebox-text textbox-prompt" autocomplete="off" placeholder="" style="margin-left: 0px; margin-right: 0px; padding-top: 3px; padding-bottom: 3px; width: 13.0093px;"><input type="hidden" class="textbox-value" value=""></span>
					</td>
					<th class="gridpt_bg">营业执照号</th>
					<td>
						<input type="text" id="businessLicenseNo" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">联系人</th>
					<td>
						<input type="text" id="contacts" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>电话</th>
					<td>
						<input type="text" id="tel" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>传真</th>
					<td>
						<input type="text" id="fax" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>邮编</th>
					<td>
						<input type="text" id="postcode" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>抽样环节</th>
					<td style="">
						<input type="text" id="sampleFromLink" class="easyui-validatebox validatebox-text combobox-f combo-f textbox-f" style="width: 100%; background-color: rgb(255, 255, 255); border-color: rgb(255, 255, 255); border-width: 0px; display: none;"><span class="textbox easyui-fluid combo" style="width: 21.0093px; height: 20.0093px;"><span class="textbox-addon textbox-addon-right" style="right: 0px;"><a href="javascript:void(0)" class="textbox-icon combo-arrow" icon-index="0" tabindex="-1" style="width: 18px; height: 20.0093px;"></a></span><input type="text" class="textbox-text validatebox-text" autocomplete="off" readonly="readonly" placeholder="" style="margin-left: 0px; margin-right: 19px; padding-top: 3px; padding-bottom: 3px; width: 0px;"><input type="hidden" class="textbox-value" name="" value="食品生产"></span>
					</td>
					<th>抽样地点</th>
					<td style="">
						<input type="text" id="sampleFrom" class="easyui-validatebox validatebox-text combobox-f combo-f textbox-f" style="width: 100%; background-color: rgb(255, 255, 255); border-color: rgb(255, 255, 255); border-width: 0px; display: none;"><span class="textbox easyui-fluid combo" style="width: 21.0093px; height: 20.0093px;"><span class="textbox-addon textbox-addon-right" style="right: 0px;"><a href="javascript:void(0)" class="textbox-icon combo-arrow" icon-index="0" tabindex="-1" style="width: 18px; height: 20.0093px;"></a></span><input type="text" class="textbox-text validatebox-text" autocomplete="off" placeholder="" style="margin-left: 0px; margin-right: 19px; padding-top: 3px; padding-bottom: 3px; width: 0px;"><input type="hidden" class="textbox-value" name="" value="原辅料库"></span>
					</td>
					<th>采样费</th>
					<td style="">
						<input type="text" id="sampleFee" class="easyui-numberbox numberbox-f textbox-f" style="width: 100%; background-color: rgb(255, 255, 255); border-color: rgb(255, 255, 255); border-width: 0px; display: none;"><span class="textbox easyui-fluid numberbox" style="width: 21.0093px; height: 20.0093px;"><input type="text" class="textbox-text validatebox-text textbox-prompt" autocomplete="off" placeholder="" style="margin-left: 0px; margin-right: 0px; padding-top: 3px; padding-bottom: 3px; width: 13.0093px;"><input type="hidden" class="textbox-value" value=""></span>
					</td>

					<th>抽样样品包装</th>
					<td>
						<input type="text" id="samplePack" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>抽样方式</th>
					<td>
						<select id="sampleFromMethod">
							<option value="无菌采样">无菌采样</option>
							<option value="非无菌采样">非无菌采样</option>

						</select>
					</td>
					<th>抽样单位名称</th>
					<td>
						<input type="text" id="testerName" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>地址</th>
					<td>
						<input type="text" id="testerAddr" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>联系人</th>
					<td>
						<input type="text" id="testerContacts" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>电话</th>
					<td>
						<input type="text" id="testerTel" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>传真</th>
					<td>
						<input type="text" id="testerFax" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>邮编</th>
					<td>
						<input type="text" id="testerPostcode" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
				</tr>

				<tr class="gridpt" style="display: none;">
					<th>采样日期</th>
					<td>
						<div class="date beginTime pull-left">

							<input type="text" readonly="" class="appsysinfo-m inputCommon " name="htlrstarDate" style="border-radius: 0 !important; width: 100px">
							<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
						</div>
					</td>
					<th>抽样人1</th>
					<td>
						<input type="text" id="samplePerson1" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>抽样人2</th>
					<td>
						<input type="text" id="samplePerson2" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>抽样人3</th>
					<td>
						<input type="text" id="samplePerson3" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>抽样人4</th>
					<td>
						<input type="text" id="samplePerson4" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>陪同人1</th>
					<td>
						<input type="text" id="samplePersonAcc1" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>陪同人2</th>
					<td>
						<input type="text" id="samplePersonAcc2" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>抽样人3</th>
					<td>
						<input type="text" id="samplePersonAcc3" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>陪同人4</th>
					<td>
						<input type="text" id="samplePersonAcc4" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>是否计算抽样费</th>
					<td>
						<select style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px" id="isCalFee" name="isCalFee">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</td>
				</tr>

				<tr class="gridpt">

					<th class="gridpt_bg">存储温度</th>
					<td>
						<input type="text" id="storeTemp" name="ccwd" class="easyui-validatebox input_bg validatebox-text">
					</td>

					<th>检查封样人员</th>
					<td>
						<input type="text" id="checkSealPerson" name="jcfcry" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>封样状态</th>
					<td>
						<input type="text" id="sealState" name="fyzt" class="easyui-validatebox input_bg validatebox-text">
					</td>
				</tr>

				<tr class="gridpt">

					<th>补助</th>
					<td>
						<input type="text" id="subsidyFee" name="bz" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">送样人</th>
					<td>
						<input type="text" id="sendSampleName" name="syr" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th class="gridpt_bg">购样费</th>
					<td>
						<input type="text" name="gyf" class="easyui-validatebox input_bg validatebox-text"></td>
				</tr>
				<tr class="gridpt" style="display: none;">
					<th>补助费2</th>
					<td>
						<input type="text" id="subsidyFee2" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>补助费3</th>
					<td>
						<input type="text" id="subsidyFee3" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>补助费4</th>
					<td>
						<input type="text" id="subsidyFee4" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
				</tr>
				<tr class="gridpt">

					<th class="gridpt_bg">购置日期</th>
					<td>
						<div class="date beginTime pull-left">

							<input type="text" name="gzrq" readonly="" class="appsysinfo-m inputCommon " name="htlrstarDate" style="border-radius: 0 !important; width: 100px">
							<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
						</div>
					</td>
					<th>业态类型</th>
					<td>
						<select name="ytlx" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px" id="businessType" >
							<option value="0">特大型餐馆</option>
							<option value="1">大型餐馆</option>
							<option value="2">中型餐馆</option>
							<option value="3">小型餐馆</option>
							<option value="4">小吃店</option>
							<option value="5">快餐店</option>
							<option value="6">饮品店</option>
							<option value="7">食堂</option>
							<option value="8">集体用餐配送单位</option>
							<option value="9">中央厨房</option>
							<option value="10">/</option>
						</select>
					</td>
					<th>数据出具日期</th>
					<td>
						<div class="date beginTime pull-left">

							<input type="text"  name="sjcjrq" readonly="" class="appsysinfo-m inputCommon " name="htlrstarDate" style="border-radius: 0 !important; width: 100px">
							<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
						</div>
					</td>
				</tr>

				<tr class="gridpt">
					<th class="gridpt_bg">许可证类型</th>
					<td>
						<select name="xkzlx" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px" id="licenceType" >
							<option value="0">食品生产许可证</option>
							<option value="1">食品流通许可证</option>
							<option value="2">餐饮服务许可证</option>
							<option value="3">食品经营许可证</option>
						</select>
					</td>
					<th class="gridpt_bg">许可证号</th>
					<td>
						<input type="text" name="xkzh" id="licenceNum" class="easyui-validatebox input_bg validatebox-text">
					</td>
					
				</tr>
				<tr class="gridpt">
					
					<th>送样人地址</th>
					<td>
						<input type="text" name="syrdz" id="sendSamplePersonAddress" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>送样人邮编</th>
					<td>
						<input type="text" name="syryb" id="sendSamplePersonPostcode" class="input_bg">
					</td>
				</tr>
				<tr class="gridpt">

					<th class="gridpt_bg">送样人电话或传真</th>
					<td>
						<input type="text" name="syrdh" id="sendSamplePersonTelOrFax" class="easyui-validatebox input_bg validatebox-text">
					</td>

					<th class="gridpt_bg">是否加急</th>
					<td>
						<select name="if_Jj" style="width: 100%;height:100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px" id="isUrgent" >
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</td>
					<th>样品编号</th>
					<td>
						<input type="text" name="ypbm" id="sampleSn" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>

				</tr>
				<tr>
					<th>检测类别</th>
					<td>
						<select id="" name="jclbdm" class="input_bg">
                        <option value="001">委托检验</option>
                        <option value="002">考核</option>
                        <option value="003">能力验证</option>
                        <option value="004">科研委托检验</option>
                        <option value="005">饲料委托检验</option>
                        <option value="006">肥料委托检验</option>
                        <option value="007">土壤委托检验</option>
                    </select>
						
					</td>
					<th>接样地点</th>
					<td>
						<input type="text" id="receiveSampleSite" name="jydd" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>备注</th>
					<td>
						<input type="text" id="remark" name="bzxx" class="easyui-validatebox input_bg validatebox-text">
					</td>
				</tr>
				<tr>
					<th id="isAssignmentTh" style="display: none;">是否任务分配</th>
					<td id="isAssignmentTd" style="display: none;">
						<select style="width: 100%;height:100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px" id="isAssignment" name="isAssignment">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</td>
				</tr>
				<tr class="gridpt" style="display: none;">
					<th>企业规模</th>
					<td>
						<input type="text" id="companyScale" class="easyui-validatebox input_bg validatebox-text">
					</td>
					<th>抽样品种</th>
					<td>
						<input type="text" id="testedSampleType" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>对比抽样费</th>
					<td>
						<input type="text" id="contrastSampleFee" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>抽样人联系电话</th>
					<td>
						<input type="text" id="samplePersonTel" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>报告编号</th>
					<td>
						<input type="text" id="reportSn" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>

					<th>样品制备状态</th>
					<td>
						<input type="text" id="samplePreparationState" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>是否是分包样</th>
					<td>
						<select style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px" id="isSubpackagedSample" name="isSubpackagedSample">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</td>
					<th>是否分包完成</th>
					<td>
						<select style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px" id="isSubpackagedEnd" name="isSubpackagedEnd">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</td>
					<th>分包类型</th>
					<td>
						<input type="text" id="subpackageType" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
				</tr>
				<tr class="gridpt" style="display: none;">
					<th>生产单位所属省ID</th>
					<td><input type="text" id="producerProvinceId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>生产单位所属市ID</th>
					<td><input type="text" id="producerZoneId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>生产单位所属县ID</th>
					<td><input type="text" id="producerCityId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
				</tr>

				<tr style="display: none;">
					<th>合同主键ID</th>
					<td>
						<input type="text" id="salesId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>部门ID</th>
					<td>
						<input type="text" id="hrmDepId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>是否删除</th>

					<td>
						<input type="text" id="isDelete" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>

					<th>状态</th>
					<td>
						<input type="text" id="state" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>分包样品id</th>
					<td>
						<input type="text" id="subpackageRecourceSampleId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>原分包样品id</th>
					<td>
						<input type="text" id="subpackagedSampleId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>公司ID</th>
					<td>
						<input type="text" id="companyId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>送样人id</th>
					<td>
						<input type="text" id="sendSampleId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>实验室接样人id</th>
					<td>
						<input type="text" id="labReceiveSampleId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>报告编制人ID</th>
					<td>
						<input type="text" id="reportMakerId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>报告审核人id</th>
					<td>
						<input type="text" id="reportCheckerId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>报告签发人id</th>
					<td>
						<input type="text" id="reportAuditerId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>样品是否合格，其有一个item不合格则样品不合格</th>
					<td>
						<input type="text" id="isOk" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>进度展示状态</th>
					<td>
						<input type="text" id="showState" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>追加人id</th>
					<td>
						<input type="text" id="extraAddId" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>附件</th>
					<td>
						<input type="text" id="attachment" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>样品接收日期</th>
					<td>
						<div class="date beginTime pull-left">

							<input type="text" readonly="" class="appsysinfo-m inputCommon " name="htlrstarDate" style="border-radius: 0 !important; width: 100px">
							<span>
                                <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
						</div>
					</td>
					<th>接收人</th>
					<td>
						<input type="text" id="receiveName" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>接收时间</th>
					<td>
						<input type="text" id="receiveTime" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>报告编制人</th>
					<td>
						<input type="text" id="reportMakerName" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>报告编制日期</th>
					<td>
						<div class="date beginTime pull-left">

							<input type="text" readonly="" class="appsysinfo-m inputCommon " name="htlrstarDate" style="border-radius: 0 !important; width: 100px">
							<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
      </button>                                  </span>
						</div>
					</td>

					<th>报告审核人</th>
					<td>
						<input type="text" id="reportCheckerName" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>报告审核时间</th>
					<td>
						<input type="text" id="reportCheckDate" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>

					<th>报告签发人</th>
					<td>
						<input type="text" id="reportAuditerName" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>报告签发时间</th>
					<td>
						<input type="text" id="reportAuditDate" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>是否是三级采样</th>
					<td>
						<input type="text" id="ifThreeSample" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>质控留样pk</th>
					<td>
						<input type="text" id="qcRetentionSamplePk" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>样品质控编号</th>
					<td>
						<input type="text" id="sampleQcSn" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>被质控样品编号</th>
					<td>
						<input type="text" id="sampleSnQced" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>分析项目</th>
					<td>
						<input type="text" id="sampleItems" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>是否被质控</th>
					<td>
						<input type="text" id="isQced" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>是否质控样</th>
					<td>
						<input type="text" id="isQcSample" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>是否是已生成报告</th>
					<td>
						<input type="text" id="isReport" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>样品满足测试</th>
					<td>
						<input type="text" id="sampleQuantityIfEnough" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>是否流转</th>
					<td>
						<input type="text" id="isFlowed" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>是否已维护市场费用</th>
					<td>
						<input type="text" id="isSalesFeeSub" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>质控类型</th>
					<td>
						<input type="text" id="qcType" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>送样时间</th>
					<td>
						<input type="text" id="sampleTime" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>追加人</th>
					<td>
						<input type="text" id="extraAddName" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>追加时间</th>
					<td>
						<input type="text" id="extraAddDate" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>多种质控类型拼接</th>
					<td>
						<input type="text" id="qcTypeStr" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>质控是否通过</th>
					<td>
						<input type="text" id="isLinkedQcOk" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>质控是否完成</th>
					<td>
						<input type="text" id="isQcCheckComplete" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<td><input type="text" id="ifBreakUpSample" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>是否追加</th>
					<td>
						<input type="text" id="isExtraAdd" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
					<th>实验室接样人</th>
					<td>
						<input type="text" id="labReceiveSampleName" class="easyui-validatebox validatebox-text" style="width: 100%; background-color: #ffffff; border-color: #ffffff; border-width: 0px">
					</td>
				</tr>
			</tbody>
		</table>
	</form>
	<!--按钮  begin-->
	<div style="clear: both;padding:5px;">
		<span> 中文名称及编号 <input type="text" name="zwmcBm" class="easyui-validatebox input_bg validatebox-text" style="display: inline-block;width: 150px;height: 32px;border: 1px solid #ccc;margin-right: 10px;"></span>
	<span> 检测方法 <input type="text" name="jcfa" class="easyui-validatebox input_bg validatebox-text" style="display: inline-block;width: 150px;height: 32px;border: 1px solid #ccc;margin-right: 10px;"></span>
	<button id="ypjsjbxxSearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
	<button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
	<button id="savejcxm" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr borderRadius4"><i class="fa fa-plus iconMr"></i>保存</button>

	</div>
	<!--按钮  end-->
	
	<div class="col-md-12" id="jcxmDiv1" style="width: 96.3333333%;margin: 15px 30px;padding: 0;">
    <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
        <table id="ypjsjcxmTable" class="table table-striped table-bordered table-hover dataTable no-footer" cellspacing="0" width="100%" role="grid">
            <thead>
            <tr role="row">
                <th field="ck"><input type="checkbox" class="check-all-td" /></th>
                <th>检测方法</th>
                <th>中文名称及编号 </th>
                <th>细类</th>
                <th>亚类</th>
                <th>次亚类</th>
                <th>判定依据</th>
                <th>检查依据</th>
            </tr>
            </thead>
        </table>
    </div>
</div>
	
	
	
	
	
	
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/ypjs_jcxm.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {

		ypjsjcxm.setPath('<%=request.getContextPath()%>');
		ypjsjcxm.init('<%=id%>', '<%=uuid%>','<%=ypbm%>');

	});
</script>