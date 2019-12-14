<%--
  Created by IntelliJ IDEA.
  User: MDW
  Date: 2018/1/24 0024
  Time: 15:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String id = request.getParameter("sqid");
    if (id == null) {
        id = "";
    }
%>
<html>
<head>
    <title>编辑</title>
    <style>
        #xydedit_M table,table th{
            border: none!important;
        }
        #xydedit_M table td{
            border:1px solid #dadada!important;
        }
        /*#xydedit_M table input,.noBorder{*/
            /*border: none!important;*/
        /*}*/
        #xydedit_M.verMid{
            vertical-align: middle;
        }
        #xydedit_M .mustSign{
            color: red;
        }
        #xydedit_M .address input{
            width: 5%;
        }
    </style>
</head>
<body>
<form id="xydForm_m">
    <input type="hidden" name="sqid">
    <div class="container" id="xydedit_M" style="width: 1000px !important;">
        <div class="row">
            <div class="col-md-12">
                <h4 class="text-center" style="font-weight: 800;border: none;">财云信用贷申请表</h4>
            </div>
            <div class="col-md-12">
                <%--<table class="table table-bordered" border="1" style="border-collapse:collapse;" cellpadding="0" cellspacing="0">--%>
                <table class="table table-bordered" >
                    <thead>
                    <tr>
                        <th colspan="5">
                            放款银行
                            <input type="text" name="fkyh" style="text-indent: 2em;border: none;" readonly>
                        </th>
                        <th colspan="7">
                            业务联系人
                            <input type="text" name="ywlxrxm" style="text-indent: 2em;border: none;" readonly>
                            <input type="text" name="ywlxrsjh" style="border: none" readonly>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colspan="5">
                            申请贷款金额（元）：
                            <input type="text" name="sqdkje"  class="noBorder text-right"/>
                        </td>
                        <td colspan="7">
                            <span class="mustSign">*</span>
                            申请期限：
                            <input type="radio"  name="sqqx" id="limitDate1" value="3" />
                            <label for="limitDate1">3月</label>
                            <input type="radio"   name="sqqx" id="limitDate2" value="6"/>
                            <label for="limitDate2">6月</label>
                            <input type="radio"   name="sqqx" id="limitDate3" value="12"/>
                            <label for="limitDate3">12月</label>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="12">
                            <span style="vertical-align: sub">贷款用途：</span>
                            <textarea placeholder="最大字数90字" maxlength="90" class="noBorder " name="dkyt" style="padding-top: 4px;width: 90%;resize: none;vertical-align: top" ></textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-12">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th colspan="20">借款人信息</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colspan="5" width="21%">
                            <span class="mustSign">*</span>
                            姓名：
                            <input type="text" name="jkrxm" style="width: 60%;"/>
                        </td>
                        <td colspan="3">
                            <span class="mustSign">*</span>
                            性别：
                            <%--<input type="text" name="jkrxb" style="width: 60%"/>--%>
                            <select name="jkrxb">
                                <option value="0">男</option>
                                <option value="1">女</option>
                            </select>
                            
                        </td>
                        <td colspan="6" width="31%">
                            <span class="mustSign">*</span>
                            手机号码：
                            <input type="text" name="jkrsjh" style="width: 60%"/>
                        </td>
                        <td colspan="6" width="29%">
                            <span class="mustSign">*</span>
                            身份证号：
                            <input type="text"  name="jkrsfzh" style="width: 66%;"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="20" class="address">
                            <span class="mustSign">*</span>
                            居住地址：
                            <%--<input type="text" name="jkrsfmc"/>--%>
                            <%--<input type="text" name="jkrcsmc"/>--%>
                            <%--<input type="text" name="jkrxqmc"/>--%>

                            <select name="jkrsfdm" style="width: 130px;height: 30px"></select>
                            <%--<input type="hidden" name="jkrsfmc">--%>
                            <select name="jkrcsdm" style="width: 130px;height: 30px"></select>
                            <%--<input type="hidden" name="jkrcsmc">--%>
                            <select name="jkrxqdm" style="width: 130px;height: 30px"></select>
                            <%--<input type="hidden" name="jkrxqmc">--%>
                            <input type="text" name="jkrljmc" style="width: 400px;height: 30px"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="20">
                            职务：
                            <input type="text" name="jkrzw"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-12">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th colspan="12">企业信息</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colspan="5">
                            <span class="mustSign">*</span>
                            企业名称：
                            <input type="text" name="qymc"/>
                        </td>
                        <td colspan="7">
                            企业性质：
                            <input type="radio" name="qyxz"id="enterpriseNature1" value="1"/>
                            <label for="enterpriseNature1">国有企业</label>
                            <input type="radio"name="qyxz" id="enterpriseNature2" value="2"/>
                            <label for="enterpriseNature2">集体企业</label>
                            <input type="radio" name="qyxz" id="enterpriseNature3" value="3"/>
                            <label for="enterpriseNature3">联营企业</label>
                            <input type="radio" name="qyxz" id="enterpriseNature4" value="4"/>
                            <label for="enterpriseNature4">股份合作制企业</label>
                            <input type="radio" name="qyxz" id="enterpriseNature5" value="5"/>
                            <label for="enterpriseNature5">私营企业</label>
                            <input type="radio" name="qyxz" id="enterpriseNature6" value="6"/>
                            <label for="enterpriseNature6">个体户</label>
                            <input type="radio" name="qyxz" id="enterpriseNature7" value="7"/>
                            <label for="enterpriseNature7">合伙企业</label>
                            <input type="radio" name="qyxz" id="enterpriseNature8" value="8"/>
                            <label for="enterpriseNature8">有限责任公司</label>
                            <input type="radio" name="qyxz" id="enterpriseNature9" value="9"/>
                            <label for="enterpriseNature9">股份有限公司</label>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6">
                            <span class="mustSign">*</span>
                            纳税人识别号：
                            <input type="text" name="nsrsbh"/>
                        </td>
                        <td colspan="6">
                            经营行业：
                            <select name="jyhyMc"></select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <span class="mustSign">*</span>
                            成立时间：
                            <input type="text" name="clsj" style="width: 60%" id="xydClsjM"/>
                        </td>
                        <td colspan="3">
                            企业人数：
                            <input type="text" name="qyrs"/>
                        </td>
                        <td colspan="6">
                            企业固话：
                            <input type="text" name="qygh"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6">
                            企业地址：
                            <input type="text"name="qydz" />
                        </td>
                        <td colspan="6">
                            企业开户行：
                            <input type="text" name="jbkhh"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6">
                            企业登记注册类型：
                            <select name="qydjzclxdm"></select>
                        </td>
                        <td colspan="6">
                            增值税纳税人类型：
                            <input type="text" name="zzsnsrlxmc"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-12">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th colspan="2">企业开票数据</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style="width: 50%;">
                            <span class="mustSign">*</span>
                            <span id="xydQin"></span>年度开票总金额
                        </td>
                        <td>
                            <input type="text" name="snkpje"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="mustSign">*</span>
                            <span id="xydQun"></span>年开票总金额
                        </td>
                        <td>
                            <input type="text" name="qnkpje"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-12">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th colspan="3">告知、授权及声明</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td rowspan="4"  style="vertical-align: middle;"> 本人授权及事项说明 &nbsp;&nbsp;</td>
                        <td>1</td>
                        <td>同意以此申请表及其他附加资料作为贵公司借款的依据，承诺所提供的各项资料属实，如资料失实或虚假，本人愿意承担相应的法律责任；</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td colspan="2">同意以此申请表及其他附加资料作为贵公司借款的依据，承诺所提供的各项资料属实，如资料失实或虚假，本人愿意承担相应的法律责任同意以此申请表及其他附加资料作为贵公司借款的依据，承诺所提供的各项资料属实，如资料失实或虚假，本人愿意承担相应的法律责任；</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colspan="2">
                            同意贵公司收集、处理、应用及保留本人个人资料，无论本次贷款申请被批准或者否决，所有申请资料均留存贵公司；为获得更全面的服务，本人同意将个人信息提供予贵司认为有必要的第三方；同时公司需遵守国家关于公民个人信息保护的相关规定；								</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td colspan="2">
                            本人同意贷款人委托正规设立的征信机构，查询本人个人信息、银行、信用信息、贷款信息等。在贷款业务存续期间（含贷前、贷中、贷后），向委托/授权任何第三方（包括但不限于中国人民银行个人金融信用信息基础数据库、其他金融机构、文件出具机构、其他正规成立的征信机构）多次查询 本人资产、信息信息（包括但不限于个人基本信息、个人信用报告、个人信贷交易记录及其他反映个人资信状况的信息），以作贷前审查及贷后管理之用。
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <span class="mustSign">*</span>
                            借款人签名：
                            <input type="text" name="jkrqm" style="border: none" readonly/>
                            <input type="text" name="year"class="text-right" style="width: 500px;border: none" readonly/>
                            年
                            <input type="text" name="month"  class="text-right" style="width: 25px;border:none;" readonly/>
                            月
                            <input type="text" name="day"  class="text-right" style="width: 25px;border: none"/>
                            日
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/lib/jquery.validate.min.js" type="text/javascript"></script>
<script src="http://static.runoob.com/assets/jquery-validation-1.14.0/dist/localization/messages_zh.js"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/xydsq/xydEdit.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        xydEdit.setPath('<%=request.getContextPath()%>');
        xydEdit.init('<%=id%>');
    });
</script>



</body>
</html>
