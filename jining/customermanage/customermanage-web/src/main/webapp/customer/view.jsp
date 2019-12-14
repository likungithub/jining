<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="com.xinhai.caiyun.commonmanager.utils.GetDate"%>
<%@page import="java.util.Date"%>
<%
    Date future = GetDate.getFutureDay(new Date(),"02", 3);
%>
<style>
.modal-dialog{
    width:688px !important;
}
.modal-footer{
    padding-right:37px !important;
}
.inputWidth-col-three {
    width: 161px !important;
}

#Customerlogosrc{
    position: absolute;
    z-index: 100;
    bottom: -200px;
    left: 31%;
    display: none;
}
#Customerlogo:hover>img {
    display: block;
}
</style>
<div class="row" id="customer-manager-view-data">
    <div class="col-md-12 form form-horizontal">
        <div class="form-body">
            <div class="row form-group">
                <div class="input-group col-md-12">
                   <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                            <span class="colorRed">*</span>
                                                                 公司名称
                        </label>
                        <input type="text" class="inputCommon inputWidth-col-three" id="CustomerName" name="gssh" readonly="readonly">
                    </div>
                    <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                            <span class="colorRed">*</span>
                                                            公司税号
                        </label>
                        <input type="text" class="inputCommon inputWidth-col-three" id="CustomerNSRSBH" name="gssh" readonly="readonly">
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="input-group col-md-12">
                    <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                            <span class="colorRed">*</span>
                                                         移动电话
                        </label>
                        <input type="text" class="inputCommon inputWidth-col-three" id="CustomerPhone" name="yddh" readonly="readonly">
                    </div>
                    <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                            <span class="colorRed">*</span>
                                                            电子邮箱
                        </label>
                        <input type="text" class="inputCommon inputWidth-col-three" id="CustomerEmail" name="email" readonly="readonly">
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="input-group col-md-12">
                    <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                            <span class="colorRed">*</span>
                                                                 所在省/市
                        </label>
                        <input type="text" class="inputCommon inputWidth-col-three" id="CustomerSF" name="szsf" readonly="readonly">
                    </div>
                    <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                            <span class="colorRed">*</span>
                                                            所在市/区
                        </label>
                        <input type="text" class="inputCommon inputWidth-col-three" id="CustomerCS" name="szcs" readonly="readonly">
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                                                详细地址
                        </label>
                        <input type=text class="inputCommon inputWidth-col-one" id="CustomerXXDZ" name="xxdz" maxlength="300" readonly="readonly">
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                                                  公司logo
                        </label>
                        <button class="btn inputWidth-col-one" type="button" id="Customerlogo">logo<img id="Customerlogosrc" alt="公司logo"></button>
                    </div>
                </div>
            </div> 
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                                               营业执照
                        </label>
                        <input type="text" id="CustomerYyzz" name="businessLicense" readonly="readonly"
                        style="height: 33px;border: 1px solid #ccc;
                        width: 386px;border-top-right-radius: 4px !important;
                        border-bottom-right-radius: 4px !important;padding: 10px;">
                        <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" id="CustomerYyzzBTn" name="image001" id="businessLicenseImage" type="button" style="height: 32px;
                        position: relative;
                        top: -2px;margin-left: 15px;">查看附件</button>
                        <!-- <button  type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4" data-type="shyyzz" style="margin-left: 10px;margin-top: -5px;height: 32px;"><i class="icon iconfont icon-hetong" style="padding-right:3px;position:relative;top:2px;"></i>审核</button> -->
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666" style="    height: 80px !important;
                           line-height: 80px;">
                                             公司简介
                        </label>
                        <textarea id="CustomerGsjj" name="companyProfile" maxlength="500" readonly="readonly" style="resize:none;height: 80px;
                        width: 502px;
                        border: 1px solid #ccc;
                        border-top-right-radius: 4px !important;
                        border-bottom-right-radius: 4px !important;padding:10px;"></textarea>
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666"  style="    height: 80px !important;
                        line-height: 80px;">
                                   企业资质
                        </label>
                        <textarea id="CustomerQyzz" name="qualification" maxlength="500" readonly="readonly" style="resize:none;height: 80px;
                        width: 502px;
                        border: 1px solid #ccc;
                        border-top-right-radius: 4px !important;
                        border-bottom-right-radius: 4px !important;padding:10px;"></textarea>
                        <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" id="CustomerQyzzBTn" name="image002" type="button" style=" margin-top: 8px;
                        float: right;
                        margin-right: 33px;">查看附件</button>
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666"  style="    height: 80px !important;
                        line-height: 80px;">
                                    企业业绩
                        </label>
                        <textarea id="CustomerQyyj" name="enterprisePerformance" maxlength="500" readonly="readonly" style="resize:none;height: 80px;
                            width: 502px;
                            border: 1px solid #ccc;
                            border-top-right-radius: 4px !important;
                            border-bottom-right-radius: 4px !important;padding:10px;"></textarea>
                        <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" id="CustomerQyyjBTn" name="image003" type="button" style=" margin-top: 8px;
                            float: right;
                            margin-right: 33px;">查看附件</button>
                    </div>
                </div>
           </div>
           <div class="row form-group">
                <div class="col-md-12">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                            <span class="colorRed">*</span>
                                                                服务起止
                        </label>
                        <div class="input-group pull-left">
                            <div class="input-group date shViewStartDate">
                                <input type="text" class="form-control inputCommon inputWidth-col-two" name="shViewStartDate" readonly 
                                    style="width: 188px !important;border-top-right-radius: 0px !important;border-bottom-right-radius: 0px !important;background:#fff;" />
                                <span>
                                    <button class="btn default" type="button" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;">
                                        <i class="fa fa-calendar"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                        <label class="control-label" style="padding: 0px 10px;height: 32px;line-height: 32px;">至 </label>
                        <div class="pull-left" style="margin-right:18px;">
                            <div class="input-group date shViewEndDate">
                                <input type="text" class="form-control inputCommon inputWidth-col-two" readonly name="shViewEndDate" 
                                    style="width: 188px !important;border-top-left-radius: 4px !important;border-bottom-left-radius: 4px !important;
                                    border-top-right-radius: 0px !important;border-bottom-right-radius: 0px !important;background:#fff;" />
                                <span>
                                    <button class="btn default" type="button" style="border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;">
                                        <i class="fa fa-calendar"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                                                    初审备注
                        </label>
                        <input type=text class="inputCommon inputWidth-col-one" id="CustomerBZXX" name="bzxx" maxlength="300">
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <label class="labelCommon labelWidth-col-one labelBg color666">
                                                    终审备注
                        </label>
                        <input type=text class="inputCommon inputWidth-col-one" id="CustomerZSBZ" name="zsbz" maxlength="300">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/customer/view.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        customerView.setPath("<%=request.getContextPath() %>");
        customerView.init("<%=request.getParameter("id")%>","<%=request.getParameter("userId")%>", "<%=request.getParameter("dljgBm")%>", "<%=future%>");
    });
</script>