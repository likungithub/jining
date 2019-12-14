<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    UUID uuid = UUID.randomUUID();
    String szsf = CurrentLoginUser.getCustomer().getSzsf(); //所在省份
    String szcs = CurrentLoginUser.getCustomer().getSzcs(); //所在城市
    if (szsf == null) {
        szsf = "";
    }
    if ( szcs == null) {
        szcs = "";
    }
%>

<style>
    #customerManageForm .titleInfo {
        margin-left: 16px;
        margin-right: 16px;
        background: #E7F2F8;
    }

    #customerManageForm .titleInfo .titleSty {
        border-left: 5px solid #53A9FC;
        padding-left: 5px;
    }

    #customerManageForm .contentSty {
        width: 675px;
        padding: 15px 0 3px;
    }

    #customerManageForm ul,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    #customerManageForm .zg {
        width: 535px !important;
    }

    #customerManageForm .kehufenlei .input-group .select2-container--bootstrap {
        width: 206px !important;
    }

    #customerManageForm .kehuzhuguan .input-group .select2-container--bootstrap {
        width: 533px !important;
    }

    #customerManageForm .kehufenlei .select2-container--bootstrap .select2-selection--single {
        width: 158px !important;
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px;
        outline: none;
        text-indent: 10px;
        float: left;
        font-size: 12px;
        line-height: 20px;
        color: #666;
    }

    #customerManageForm .zhengzhishui .select2-container--bootstrap .select2-selection--single {
        width: 202px !important;
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px;
        outline: none;
        text-indent: 10px;
        float: left;
        font-size: 12px;
        line-height: 20px;
        color: #666;
    }

    #customerManageForm .suozaidiqu .select2-container--bootstrap .select2-selection--single {
        width: 202px !important;
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px;
        outline: none;
        text-indent: 10px;
        float: left;
        font-size: 12px;
        line-height: 20px;
    }
    /********************************/

    #customerManageForm #suozaidiquM1 #loc_city + .select2-container {
        width: 295px!important;
        margin-right: 0;
    }

    #customerManageForm #suozaidiquM1 #loc_city + .select2-container .select2-selection--single {
        width: 300px!important;
    }

    #customerManageForm #suozaihangyeM1 #DL + .select2-container {
        width: 295px!important;
        margin-right: 0;
    }

    #customerManageForm #suozaihangyeM1 #DL + .select2-container .select2-selection--single {
        width: 300px!important;
    }

    #customerManageForm .suozaidiqu .input-group .select2-container--bootstrap {
        margin-right: 51px;
        border-radius: 4px !important;
    }

    #customerManageForm .suozaidiqu .select2-container--bootstrap .select2-selection--single:nth-child(2) {
        border-bottom-left-radius: 4px !important;
        border-top-left-radius: 4px !important;
    }

    #customerManageForm .suozaidiqu .select2-container--bootstrap .select2-selection--single {
        width: 202px !important;
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px;
        outline: none;
        text-indent: 10px;
        float: left;
    }

    #customerManageForm .kehuzhuguan .select2-container--bootstrap .select2-selection--single {
        width: 533px !important;
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px;
        outline: none;
        text-indent: 10px;
        float: left;
    }

    #customerManageForm .select2-container--bootstrap .select2-selectio {
        border-radius: 4px !important;
        font-size: 12px;
    }

    #customerManageForm p {
        margin: 0px !important;
    }

    #customerManageForm .portlet-form .form-body,
    #customerManageForm .form .form-body {
        padding-top: 15px;
    }

    #customerManageForm .o-m {
        background: #f8f8f8;
        width: 100%;
    }

    #customerManageForm .o-m .ul-o {
        position: absolute;
        top: 0;
        left: 0;
        width: 170px;
        background: #f9f9f9;
        height: 546px
    }

    #customerManageForm .o-m .ul-o li {
        width: 100%;
        cursor: pointer;
        position: relative;
        z-index: 2
    }

    #customerManageForm .o-m .ul-o li p {
        float: left;
        line-height: 36px;
        color: #666;
        font-size: 14px;
        width: 100%;
        text-align: center;
        position: relative
    }

    #customerManageForm .o-m .ul-o li p i {
        width: 0;
        position: absolute;
        top: 9px;
        height: 0;
        right: -1px;
        display: block;
        border-top: 10px solid transparent;
        border-right: 20px solid #fff;
        border-bottom: 10px solid transparent;
        display: none;
    }

    #customerManageForm .o-m .ul-o li.on b {
        display: block;
    }

    #customerManageForm .o-m .ul-t {
        background: #fff;
        margin-left:170px;
        padding-top: 12px;
    }

    #customerManageForm .o-m .ul-t li {
        list-style-type: none;
        position: relative;
        display: none;
    }

    #customerManageForm .o-m .ul-t .li-top {
        padding: 25px 0 0 50px;
    }

    #customerManageForm .o-m .ul-t h5 {
        color: #666;
        font-size: 24px;
        line-height: 38px;
    }

    #customerManageForm .o-m .ul-t p {
        color: #999;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 5px
    }

    #customerManageForm .o-m .ul-t .li-a a {
        color: #2b91b8;
        font-size: 14px;
        margin-right: 30px;
        cursor: default;
        line-height: 22px;
    }

    #customerManageForm .o-m .ul-t .li-a span {
        color: #999;
        font-size: 14px
    }

    #customerManageForm .o-m .ul-t .li-img {
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 0;
    }

    #customerManageForm .active1 {
        background: #10A0F7;
        color: #fff !important;
    }

    #customerManageForm .sectext {
        height: 34px;
        line-height: 34px;
    }

    #customerManageForm .addNum {
        background: transparent !important;
        border: none;
        margin-top: 8px;
        margin-left: -15px;
        outline: none;
    }

    #customerManageForm .zck {
        position: absolute;
        width: 300px;
        height: 400px;
        top: 50%;
        left: 50%;
        border-radius: 4px !important;
        margin-top: -200px;
        margin-left: -150px;
        background: #fff;
        z-index: 100;
        border: 1px solid #eee;
        display: none;
    }

    #customerManageForm .btngroup {
        position: absolute;
        width: 100%;
        height: 70px;
        border-top: 1px solid #eee;
        bottom: 0px;
        text-align: right;
        /* line-height: 28px; */
        padding-top: 17px;
        padding-right: 16px;
    }

    #customerManageForm .fa-plus-square:before {
        color: #10A0F7 !important;
    }

    #customerManageForm .li-mask {
        text-align: center;
        float: left;
        margin-left: 44px;
        margin-top: 15px;
    }

    #customerManageForm #szData_wrapper {
        overflow-x: hidden;
    }

    #customerManageForm {
        position: relative;
        overflow: hidden;
    }

    #customerManageForm .select2-container--bootstrap .select2-selection {
        border-radius: 4px !important;
        font-size: 12px;
        line-height: 21px;
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
    }

    #customerManageForm label {
        color: #666;
    }

    #customerManageForm .select2-container--bootstrap .select2-selection--single .select2-selection__placeholder {
        font-size: 12px;
    }

    #customerManageForm .select2-selection .select2-selection--single:nth-child(2) {
        background: red;
        border-top-left-radius: 4px !important;
        border-bottom-left-radius: 4px !important;
    }

    #customerManageForm .zgkj.suozaidiqu .select2-container--bootstrap .select2-selection--single {
        width: 155px !important;
    }
</style>
<script>
    $(document).ready(function() {
        $(".month").hide();
        $("#Chinese").hide();
        $("#selectSbzq").change(function() {
            if ($(this).val() == 004) {
                $(".month").show();
                $("#Chinese").show();
            } else {
                $(".month").hide();
                $("#Chinese").hide();
            }
        });
        $("#selectBsy").change(function() { // 选择月份后
            var month = $("#selectBsy").val();
            $("#selectBsrq").empty();
            $.ajax({
                url: '/customermanage/customerManage/getDaysByMonth/' + month,
                dataType: 'TEXT',
                type: 'GET',
                success: function(dataghs) {
                    if (dataghs != "") {
                        var days = dataghs.split(',');
                        $("#selectBsrq").append("<option></option>")
                        for (var i = 0; i < days.length; i++) {
                            $("#selectBsrq").append("<option value='" + days[i] + "'>" + days[i] + "</option>");
                        }
                    }
                    $('#selectBsrq').select2({
                        placeholder: '报税日',
                        width: '100%',
                        allowClear: true,
                        language: 'zh-CN'
                    });
                }
            });
        })
    })
</script>
<form action="#" id="customerManageForm" class="form form-horizontal container-fluid" style="height: 100%">
    <div class="zck">
        <div class="btngroup">
            <button data-bb-handler="success" type="button" class="btn btn btn-success btnBlue borderRadius4 colorfff mr" id="zcksave"><i class="fa fa-save iconMr"></i> 保存 </button>
            <button data-bb-handler="cancel" type="button" class="btn btn btn-default borderRadius4 color666" id="zckcancel"><i class="fa fa-times iconMr"></i> 关闭 </button>
        </div>

    </div>
    <div class="form-body" style="height: 100%;padding: 0">
        <div class="o-m clearfix" style="position: relative;height: 100%">
            <div class="ul-o" style="height: 100%">
                <ul>
                    <li class="li-o" style="margin-top: 12px">
                        <p class="active1">基本资料<i style="display:block" class="arrow"></i></p>
                        <div class="clear"></div><b></b></li>
                    <li class="li-t">
                        <p>联系方式<i class="arrow"></i></p>
                        <div class="clear"></div><b></b></li>
                    <li class="li-s">
                        <p>税务资料<i class="arrow"></i></p>
                        <div class="clear"></div><b></b></li>
                    <li class="li-f">
                        <p>客户状态<i class="arrow"></i></p>
                        <div class="clear"></div><b></b></li>
                    <div class="li-mask">
                        <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" name="addfiles" id="addfiles" type="button">添加附件</button>
                    </div>
                    <!-- <div class="li-mask">
<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" name="changApp" id="changApp" type="button" style="width: 110px;">APP账户修改</button>
</div> -->
                </ul>
            </div>
            <div class="ul-t" style="height: 100%;overflow: auto">
                <li style="display:block">
                    <div class="titleInfo row" style="margin-left:16px;margin-bottom: 15px ">
                        <div class="col-xs-12">
                            <div class="h5 titleSty" style="display: inline-block">公司基本信息</div>
                            <i class="glyphicon glyphicon-menu-up clickSlideDown1" style="float: right;font-size: 20px;margin-top: 10px;cursor: pointer;color: #10A0F7;"></i>
                        </div>
                    </div>
                    <div class="contentSty clickSlideDownC1" style="padding-top: 0">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            <span class="colorRed"> * </span>税务登记号</label>
                                        <input type="text" class="inputCommon" name="nsrsbh" id="nsrsbhInput" style="width:157px;border-bottom-right-radius: 0px !important;
                                    border-top-right-radius: 0px !important;">
                                        <span class="input-group-btn">
                                    <button class="btn default" type="button" id="nsrsbh" data-toggle="tooltip" title="查询提取手机端已录入数据" style="border-bottom-right-radius: 4px !important;
                                        border-top-right-radius: 4px !important;height: 33px;background: #dedede;color: #666;">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </span>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">公司简称</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="gsjc">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            <span class="colorRed"> * </span>公司名称</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="gsmc">
                                    </div>
                                    <div class="col-md-6 kehufenlei">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            客户分类</label>
                                        <select id="customerStyle"></select>
                                        <button class="btn default" type="button" id="khflAdd" title="新增客户分类" style="border-bottom-right-radius: 4px !important;
                                     border-top-right-radius: 4px !important;height: 33px;background: #dedede;color: #666;position: relative;z-index: 100;">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group suozaidiqu" id="suozaihangyeM1">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            所在行业</label>
                                        <select id="ML" style="width:186px;">
                                            <option></option>
                                        </select>
                                        <select id="DL" style="width:186px;">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group suozaidiqu" id="suozaidiquM1">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            所在地区</label>
                                        <select id="loc_province" style="width:186px;">
                                            <option></option>
                                        </select>
                                        <select id="loc_city" style="width:186px;">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <label class="labelCommon labelWidth-col-two labelBg color666" style="margin-left: 15px">
                                        <%--<span class="colorRed"> * </span>--%>证件类型</label>
                                    <select id="IDType" style="float: left;border: 1px solid #dadada; height: 33px;width: 200px;margin-right: 37px">
                                        <option value="000">请选择证件类型</option>
                                        <option value="001">居民身份证</option>
                                        <option value="002">中国人民解放军军人身份证件</option>
                                        <option value="003">中国人民武装警察身份证件</option>
                                        <option value="004">港澳居民来往内地通行证</option>
                                        <option value="005">台湾人民来往大陆通行证</option>
                                        <option value="006">外国公民护照</option>
                                    </select>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="sfzh" placeholder="证件号" style="width:300px!important;">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            法人代表</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="frdb">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            海关代码</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="hgdm">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            营业执照号</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="yyzz">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            组织机构码</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="zzjgdm">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666 pull-left">
                                            成立日期</label>
                                        <div class="input-group date createDate">
                                            <input type="text" class="form-control starttime inputCommon" readonly="readonly" name="createDate" style="width:156px;background: #fff;border-bottom-right-radius: 0px !important;
                                        border-top-right-radius: 0px !important;"> <span>
                                        <button class="btn default" type="button" style="border-bottom-right-radius: 4px !important;
                                            border-top-right-radius: 4px !important;height: 33px;
                                            background: #dedede;
                                            color: #666;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6" style="position:relative;left:2px;">
                                        <label class="labelCommon labelWidth-col-two labelBg color666 pull-left" style="font-size:12px;margin-left:4px;">
                                            开始代账日期</label>
                                        <div class="input-group date startDate">
                                            <input type="text" class="form-control starttime inputCommon" style="width:153px;background:#fff;border-bottom-right-radius: 0px !important;
                                        border-top-right-radius: 0px !important;" readonly="readonly" name="startDate"> <span class="input-group-btn" style="width: 50px">
                                        <button class="btn default" type="button" style="border-bottom-right-radius: 4px !important;
                                            border-top-right-radius: 4px !important;height: 33px;
                                            background: #dedede;
                                            color: #666;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="titleInfo row" style="margin-left:16px;margin-bottom: 15px ">
                        <div class="col-xs-12">
                            <div class="h5 titleSty" style="display: inline-block">公司注册基本信息</div>
                            <i class="glyphicon glyphicon-menu-up clickSlideDown2" style="float: right;font-size: 20px;margin-top: 10px;cursor: pointer;color: #10A0F7;"></i>
                        </div>
                    </div>

                    <div class="contentSty clickSlideDownC2" style="padding-top: 0">
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            注册资金</label>
                                        <input type="text" class="inputCommon" name="zczj" style="width: 155px;" onKeyup="value=test2(value)?value:''">
                                        <label class="labelCommon labelWidth-col-two labelBg color666" style="border-right: 1px solid #ccc !important;
                                border-radius: 0px !important;
                                border-top-right-radius: 4px !important;
                                border-bottom-right-radius: 4px !important;width: 50px !important;
                                border-left: 0px !important;">
                                            万元</label>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            公司备用名称</label>
                                        <input type="text" i class="inputCommon inputWidth-col-two" name="bygsmc">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            注册地址</label>
                                        <input type="text" class="inputCommon inputWidth-col-one zg" name="zcdz">
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            经营范围</label>
                                        <input type="text" class="inputCommon inputWidth-col-one zg" name="jyfw">
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            备注信息</label>
                                        <input type="text" class="inputCommon inputWidth-col-one zg" name="bzxx">
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- 客户主管修改按钮 -->
                        <os:hasSecurityResource identifier="khzydmChangeBtn">
                            <div id="khzydmChange"></div>
                        </os:hasSecurityResource>
                    </div>
                    <%--服务人员信息--%>
                    <div class="titleInfo row" style="margin-left:16px ">
                        <div class="col-xs-12">
                            <div class="h5 titleSty">服务人员信息</div>
                        </div>
                    </div>
                    <div class="contentSty">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6 suozaidiqu zgkj">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            <span class="colorRed"> * </span>主管会计</label>
                                        <select name="gjr" class="inputCommon inputWidth-col-one zg" id="gjr" style="width:155px;" data-error-container="#form_resource_error">
                                        </select>
                                        <label class="labelCommon labelWidth-col-two labelBg color666" style="border-right: 1px solid #ccc !important;
                                border-radius: 0px !important;
                                border-top-right-radius: 4px !important;
                                border-bottom-right-radius: 4px !important;width: 50px !important;
                                border-left: 0px !important;">
                                            调户</label>
                                    </div>
                                    <div class="col-md-6 suozaidiqu">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            <span class="colorRed"> * </span>客户经理</label>
                                        <select name="khjl" class="inputCommon inputWidth-col-two" id="khjl" data-error-container="#form_resource_error">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            推荐人</label>
                                        <input id="tjrmcSl" type="text" class="inputCommon inputWidth-col-two" name="tjrmc">
                                        <input id="tjrmcSl1" type="hidden" class="inputCommon inputWidth-col-two" name="tjrdm">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            外部推荐人</label>
                                        <input type="text" id="wbtjrmc" class="inputCommon inputWidth-col-two" name="wbtjrmc">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>


                <li id="IncreaseInfoWrapLi">
                    <div class="titleInfo row" style="margin-left:16px;">
                        <div class="col-xs-12">
                            <div class="h5 titleSty">联系人信息</div>
                        </div>
                    </div>
                    <div class="contentSty">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            <span class="colorRed"> * </span>联系人</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="lxr">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            办公电话</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="bgdh">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            <span class="colorRed"> * </span>手机号码</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="sjhm" id="sjhm">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            传真号码</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="czhm">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            QQ</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="qq">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            email</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="email">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            其他</label>
                                        <input type="text" class="inputCommon inputWidth-col-one zg" name="qt">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 kehufenlei">
                                <div class="input-group col-md-12">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            详细地址</label>
                                        <input type="text" class="inputCommon inputWidth-col-one zg" name="xxdz">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="IncreaseInfoWrap">
                        <div class="titleInfo row" style="margin-left:16px ">
                            <div class="col-xs-12">
                                <div class="h5 titleSty" style="display: inline-block">股东信息</div>
                                <i class="glyphicon glyphicon-plus IncreaseInfo" title="增加股东信息" style="float: right;font-size: 20px;margin-top: 10px;cursor: pointer;color: #10A0F7;"></i>
                            </div>
                        </div>
                        <div class="contentSty">
                            <div class="row form-group">
                                <div class="col-md-12">
                                    <div class="input-group col-md-12">
                                        <div class="col-md-6">
                                            <label class="labelCommon labelWidth-col-two labelBg color666">
                                                股东姓名</label>
                                            <input type="text" class="inputCommon inputWidth-col-two" name="gdxm">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="labelCommon labelWidth-col-two labelBg color666">
                                                身份证</label>
                                            <input type="text" class="inputCommon inputWidth-col-two" name="gdsfzh">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-md-12">
                                    <div class="input-group col-md-12">
                                        <div class="col-md-4">
                                            <label class="labelCommon  labelBg color666" style="width: 75px">
                                                手机号码</label>
                                            <input type="text" class="inputCommon " name="gddh" style="width: 119px">
                                        </div>
                                        <div class="col-md-4" style="padding: 0">
                                            <label class="labelCommon  labelBg color666" style="width: 75px">
                                                邮箱</label>
                                            <input type="text" class="inputCommon " name="gdyx" style="width: 149px">
                                        </div>
                                        <div class="col-md-4">
                                            <label class="labelCommon  labelBg color666" style="width: 75px">
                                                占股比例</label>
                                            <input type="text" class="inputCommon " name="gdzgbl" style="width:119px;" onKeyup="value=test(value)?value:''">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="titleInfo row" style="margin-left:16px ">
                        <div class="col-xs-12">
                            <div class="h5 titleSty">房东信息</div>
                        </div>
                    </div>
                    <div class="contentSty">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            房东姓名</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="fdxm">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            身份证</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="fdsfzh">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>


                <li>
                    <div class="contentSty">
                        <div class="row form-group">
                            <div class="col-md-12 zhengzhishui">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            增值税性质</label>
                                        <select id="zzsxz" style="width:186px;"></select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            税率</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="sl" style="width: 151px !important; border-radius: 0px !important;" onKeyup="value=test(value)?value:''">
                                        <label class="labelCommon labelWidth-col-two labelBg color666" style="border-right: 1px solid #ccc !important;
                                border-radius: 0px !important;
                                border-top-right-radius: 4px !important;
                                border-bottom-right-radius: 4px !important;width: 50px !important;
                                border-left: 0px !important;
                                background: #dedede!important;
                                     color: #666!important;
                                     font-weight: 800;
    ">
                                            %</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            纳税人编码</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="nsrbm">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666" style="font-size: 13px;">
                                            主管税务分局</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="zgswfj">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            备注</label>
                                        <input type="text" class="inputCommon inputWidth-col-one zg" name="swzlbz">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 税务资料选择  -->
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group">
                                    <div style="width: 100px;margin-left:16px;float:left;">
                                        <select name="selectSz" class="form-control" id="selectSz" data-error-container="#form_resource_error">
                                            <option ></option>
                                        </select>
                                    </div>
                                    <div style="width: 100px;margin-left:16px;float:left;">
                                        <select name="selectSbzq" class="form-control" id="selectSbzq" data-error-container="#form_resource_error">
                                            <option value="001">月报</option>
                                            <option value="002">季报</option>
                                            <!-- <option value="003">半年报</option> -->
                                            <option value="004">年报</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2 month">
                                        <select name="selectBsrq" class="form-control col-md-3" id="selectBsy" data-error-container="#form_resource_error">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                    </div>
                                    <div class="sectext" style="display: block;width: 8px;float: left;" id="Chinese">月</div>

                                    <div class="col-md-2">
                                        <select name="selectBsrq" class="form-control col-md-3" id="selectBsrq" data-error-container="#form_resource_error">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2 sectext">日前报税</div>

                                    <div class="col-md-1">
                                        <button type="button" class="addNum borderNone bgNone" id="szAdd"><i class="fa fa-plus-square" style="font-size:30px;" aria-hidden="true"></i></button>
                                    </div>
                                    <!--  <div class="col-md-1">
     <label>税税通账号</label>
        <input type="text" id="taxtaxUserName">
     </div>
      <div class="col-md-1">
     <label>税税通密码</label>
        <input type="text" id="taxtaxPassword">
     </div> -->
                                </div>
                            </div>
                        </div>
                        <!-- 税务资料table区域 -->
                        <div class="row">
                            <div class="col-md-12" style="overflow: auto;height:200px;">
                                <div class="col-md-12">
                                    <table class="table table-striped table-bordered table-hover" cellspacing="0" width="100%" id="szData">
                                        <thead>
                                        <tr>
                                            <th width="0%"></th>
                                            <th width="30%"></th>
                                            <th width="0%"></th>
                                            <th width="20%"></th>
                                            <th width="20%"></th>
                                            <th width="20%"></th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>


                <li>
                    <div class="contentSty">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label col-md-2">服务状态：</label>
                                    <div class="col-md-4">
                                        <div class="radio-list" data-error-container="#form_enable_error">
                                            <label class="radio-inline"> <input type="radio"
                                                                                name="fwzt" value="true"> 启用服务
                                            </label> <label class="radio-inline"> <input type="radio"
                                                                                         name="fwzt" value="false"> 停止服务
                                        </label>
                                        </div>
                                        <div id="form_enable_error1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label col-md-2">账套创建：</label>
                                    <div class="col-md-4">
                                        <div class="radio-list" data-error-container="#form_enable_error">
                                            <label class="radio-inline"> <input type="radio"
                                                                                name="ztzt" value="true"> 创建
                                            </label> <label class="radio-inline"> <input type="radio"
                                                                                         name="ztzt" value="false"> 不创建
                                        </label>
                                        </div>
                                        <div id="form_enable_error2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label col-md-2">客户级别：</label>
                                    <div class="col-md-4">
                                        <div class="radio-list" data-error-container="#form_enable_error">
                                            <label class="radio-inline"> <input type="radio"
                                                                                name="khjb" value="A"> A级
                                            </label> <label class="radio-inline"> <input type="radio"
                                                                                         name="khjb" value="B"> B级
                                        </label> <label class="radio-inline"> <input type="radio"
                                                                                     name="khjb" value="C"> C级
                                        </label> <label class="radio-inline"> <input type="radio"
                                                                                     name="khjb" value="D"> D级
                                        </label>
                                        </div>
                                        <div id="form_enable_error3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label col-md-2">开通APP：</label>
                                    <div class="col-md-4">
                                        <div class="radio-list" data-error-container="#form_enable_error">
                                            <label class="radio-inline"> <input type="radio"
                                                                                name="ktapp" value="true"> 开通
                                            </label> <label class="radio-inline"> <input type="radio"
                                                                                         name="ktapp" value="false"> 不开通
                                        </label>
                                        </div>
                                        <div id="form_enable_error4"></div>
                                    </div>
                                    <div class="col-md-4"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group" style="margin-left: 31px;">
                                    <p style="color: #ff0000;">注：客户APP开通后，客户首次登录请通过输入手机号使用验证码的方式登录并设置账号。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <div class="contentSty text-center">
                    <a data-index="0" href="javascript:void(0)" class="btn btn btn btn-default btnBlue btnBorderColor colorfff borderRadius4 nextStep">
                        <i class="icon iconfont icon-xiayibu  iconMr"></i> 下一步
                    </a>
                    <a href="javascript:void(0)" id="saveKhxx" class="hide btn btn btn btn-default btnBlue btnBorderColor colorfff borderRadius4 ">
                        <i class="fa fa-save iconMr"></i> 保存
                    </a>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/customerManage/add.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {

        customerManage.setPath('<%=request.getContextPath()%>');
        customerManage.init('<%=id%>', '<%=uuid%>', '<%=szsf%>', '<%=szcs%>');

        /*<关于样式js设置>*/
        //1.菜单标签右侧容器的大小的设置
        //        var totalW = $(window).width();
        //        var rightContentW = totalW - 350;
        //        console.info(rightContentW,2314324242);
        //        $('#customerManageForm .ul-t').css({width:rightContentW,background:'#fff'});


        $('.clickSlideDown1').click(function() {
            if ($(this).hasClass('glyphicon glyphicon-menu-up')) {
                $(this).removeClass('glyphicon glyphicon-menu-up').addClass('glyphicon glyphicon-menu-down');
            } else {
                $(this).removeClass('glyphicon glyphicon-menu-down').addClass('glyphicon glyphicon-menu-up');
            }
            $('.clickSlideDownC1').toggleClass('hide');
        })
        $('.clickSlideDown2').click(function() {
            if ($(this).hasClass('glyphicon glyphicon-menu-up')) {
                $(this).removeClass('glyphicon glyphicon-menu-up').addClass('glyphicon glyphicon-menu-down');
            } else {
                $(this).removeClass('glyphicon glyphicon-menu-down').addClass('glyphicon glyphicon-menu-up');
            }
            $('.clickSlideDownC2').toggleClass('hide');
        })

        //关于处理股东信息的添加
        $('.IncreaseInfo').click(function() {
            $(this).parents('.IncreaseInfoWrap').clone(false, true).insertAfter($(this).parents('.IncreaseInfoWrap'))
                .find('.IncreaseInfo')
                .attr({
                    title: '删除该条股东信息'
                })
                .removeClass('glyphicon glyphicon-plus')
                .addClass('glyphicon glyphicon-minus deleteGuDongInfo_M')
                .end()
                .find('input')
                .val('');;
        })

        $('#IncreaseInfoWrapLi').on('click', '.deleteGuDongInfo_M', function() {
            $(this).parents('.IncreaseInfoWrap').remove();
        })

        /*</关于样式js设置>*/


        $("#nsrsbh").click(function() {
            var v = $("input[name='nsrsbh']").val();
            if (v == null || v == "") {
                Messenger().post({
                    message: '请填写税务登记号之后点击查询！',
                    type: 'warning'
                });
            } else {
                $.ajax({
                    url: '/customermanage/ptkhxx/getInformation?nsrsbh=' + v + '&khbm=null',
                    type: 'GET',
                    success: function(data) {
                        if (data.ztztDm) { //为true,有数据
                            $('input[name="lxr"]').val(data.yhmc); //联系人
                            $('input[name="gsmc"]').val(data.gsmc); //公司名称
                            $('input[name="sjhm"]').val(data.sjhm); //手机号码
                            $('input[name="frdb"]').val(data.frdb); //法人代表
                            $('input[name="bgdh"]').val(data.bgdh); //办公电话
                            $('input[name="czhm"]').val(data.czhm); //传真号码
                            $('input[name="yyzz"]').val(data.yyzz); //营业执照
                            $('input[name="qq"]').val(data.qq); //QQ
                            $('input[name="email"]').val(data.email); //email
                            $('input[name="xxdz"]').val(data.xxdz); //详细地址
                            Messenger().post({
                                message: '提取成功！',
                                type: 'warning'
                            });
                        } else {
                            Messenger().post({
                                message: '暂未查询到此客户信息，请手工录入！',
                                type: 'warning'
                            });
                        }
                    }
                });
            }
        });
    });
</script>
<script type="text/javascript">
    /* $(document).ready(function(){
     $("#selectSbzq").delegate("","click",function(){
     alert(1);
     alert($(this).html());
     })
     }) */


    //下一步事件



    /**
     * 只允许输入100以内整数
     */
    function test(num) {
        if (num <= 100) {
            var reg = /^(100|[1-9]\d|\d)$/;
            if (!num.match(reg)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }

    }

    function test2(num) {
        if (num <= 10000000000) {
            var reg = /^(|[1-9]\d{1,12}|\d)$/;
            if (!num.match(reg)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }

    }

    /* $(document).ready(function(){
     $("#selectSbzq").delegate("","click",function(){
     alert(1);
     alert($(this).html());
     })
     }) */
</script>