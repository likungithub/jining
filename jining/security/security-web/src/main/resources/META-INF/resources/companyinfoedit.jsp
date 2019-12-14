<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String id = CurrentLoginUser.getId();
    if (id == null) {
        id = "";
    }
%>
<style>
.modal-dialog{
	width:688px !important;
}
#companyInfoForm .input-group .select2-container--bootstrap{    width: 158px;
    margin-right: 35px;
    height: 19px !important;}
 #companyInfoForm .select2-container--bootstrap .select2-selection{height: 33px;
        width: 185px !important;
    border: 1px solid #ccc;
    border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;line-height: 21px;}
.modal-footer{
	padding-right:37px !important;
}
#selectlogo{
    position: relative;
}
#logosrc{
    position: absolute;
    z-index: 100;
    width: 81%;
    /*bottom: -200px;*/
    /*left: 31%;*/
    /*display: none;*/
}
#selectlogo:hover>img {
	display: block;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #dadada;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #dadada;
}

#companyInfoForm input:-ms-input-placeholder{
    color: #dadada;
}
#companyInfoForm  textarea:-ms-input-placeholder{
    color: #dadada;
}
#companyInfoForm input::-webkit-input-placeholder{
    color: #dadada;
}
#companyInfoForm textarea::-webkit-input-placeholder{
    color: #dadada;
}
    #logosrc:hover{
        cursor: pointer;
    }
</style>
<form action="#" id="companyInfoForm" class="form form-horizontal">
    <div class="form-body">
        <div class="row form-group" style="padding-left:15px;margin-bottom:0">
            <div class="col-md-8" style="padding: 0">
                <div class="row form-group">
                    <div class="col-md-12">
                        <div class="input-group">
                            <label class="labelCommon labelWidth-col-one labelBg color666">
                                <span class="colorRed">*</span>
                                公司名称
                            </label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="gsmc" maxlength="300" style="width:300px !important;">
                        </div>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-md-12">
                        <div class="input-group">
                            <label class="labelCommon labelWidth-col-one labelBg color666">
                                <span class="colorRed">*</span>
                                公司税号
                            </label>
                            <input type="text" class="inputCommon" name="gssh" readonly="readonly" style="width:262px;border-bottom-right-radius: 0px !important;
                                border-top-right-radius: 0px !important;">
                            <span class="input-group-btn" style="float: left!important;">
                                <button class="btn default" type="button" id="gssh" data-toggle="tooltip" title="修改税号" style="border-bottom-right-radius: 4px !important;
                                    border-top-right-radius: 4px !important;height: 33px;background: #dedede;color: #666;">
                                    <i class="fa fa-wrench"></i>
                                </button>
                            </span>
                        </div>
                    </div>

                </div>
                <div class="row form-group">
                    <div class="col-md-12">
                        <div class="input-group">
                            <label class="labelCommon labelWidth-col-one labelBg color666">
                                <span class="colorRed">*</span>
                                移动电话
                            </label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="yddh" style="width:300px !important;">
                        </div>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-md-12">
                        <div class="input-group">
                            <label class="labelCommon labelWidth-col-one labelBg color666">
                                <span class="colorRed">*</span>
                                电子邮箱
                            </label>
                            <input type="email" class="inputCommon inputWidth-col-two" name="email" style="width:300px !important;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 selectlogo" style="height: 192px;overflow: hidden;">
                <img title="点击上传logo" src="<%=request.getContextPath()%>/securityassets/img/userlogo.png"  id="logosrc" alt="公司logo">
            </div>
        </div>
          <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    	<label class="labelCommon labelWidth-col-one labelBg color666">
							<span class="colorRed">*</span>
							所在省/市
						</label>
						<select name="province" style="width: 168px;">
                            <option value="" checked="">请选择省</option>
	                    </select>
	                    &nbsp;&nbsp;&nbsp;&nbsp;
	                    <label class="labelCommon labelWidth-col-one labelBg color666">
	                        <span class="colorRed">*</span>
				                        所在市/区
			            </label>
	                    <select name="city" style="width: 136px;">
	                        <option value="" checked="">请选择市</option>
	                    </select>
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                                            详细地址
                    </label>
                    <input type=text class="inputCommon inputWidth-col-one" name="xxdz" maxlength="300">
                </div>
            </div>
        </div>
        <%--<div class="row form-group">--%>
            <%--<div class="col-md-12">--%>
                <%--<div class="input-group">--%>
                    <%--<label class="labelCommon labelWidth-col-one labelBg color666">--%>
                                                                        <%--公司logo--%>
                    <%--</label>--%>
                    <%--<!-- <input type="hidden" name="logo" /> -->--%>
                    <%--<button class="btn inputWidth-col-one" type="button" id="selectlogo">logo<img id="logosrc" alt="公司logo"></button>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</div>--%>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        营业执照
                    </label>
                    <input type="text" name="businessLicense" placeholder="营业执照附件仅上传一张" style="height: 33px;
    border: 1px solid #ccc;
    width: 383px;border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;padding:10px;">
                    <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" name="image001" id="businessLicenseImage" type="button" style="height: 32px;
    position: relative;
    top: -2px;margin-left: 15px;">添加附件</button>
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group" style="margin-bottom: 26px">
                    <label class="labelCommon labelWidth-col-one labelBg color666" style="    height: 80px !important;
    line-height: 80px;">
                        公司简介
                    </label>
                    <textarea name="companyProfile" id="companyProfile" maxlength="500" style="resize:none;height: 80px;
    width: 502px;
    border: 1px solid #ccc;
    border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;padding:10px;" placeholder="请输入公司简介"></textarea>
                    <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right: 0px;bottom: -15px;text-align: right;">剩余<span class="num" id="companyProfileWords" style="color: red;">300</span>个字符</p>
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group"  style="margin-bottom: 26px">
                    <label class="labelCommon labelWidth-col-one labelBg color666"  style="    height: 80px !important;
    line-height: 80px;">
                        企业资质
                    </label>
                    <textarea name="qualification" id="qualification" maxlength="500" style="resize:none;height: 80px;
    width: 502px;
    border: 1px solid #ccc;
    border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;padding:10px;margin-bottom: 8px" placeholder="请输入公司资质"></textarea>
                    <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" name="image002" id="qualificationImage" type="button" style=" margin-top: 8px;
    float: right;
    margin-right: 3px;
                    ">添加附件</button>
                    <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right: 2px;bottom: 36px;text-align: right;">剩余<span class="num" id="qualificationWords" style="color: red;">300</span>个字符</p>
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group"  style="margin-bottom: 26px">
                    <label class="labelCommon labelWidth-col-one labelBg color666"  style="    height: 80px !important;
    line-height: 80px;">
                        企业业绩
                    </label>
                    <textarea name="enterprisePerformance" id="enterprisePerformance" maxlength="500" style="resize:none;height: 80px;
    width: 502px;
    border: 1px solid #ccc;
    border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;padding:10px;margin-bottom: 8px" placeholder="请输入公司业绩"></textarea>
                    <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" name="image003" id="enterprisePerformanceImage" type="button" style=" margin-top: 8px;
    float: right;
    margin-right: 3px;
                    ">添加附件</button>
                    <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right: 2px;bottom: 36px;text-align: right;">剩余<span class="num" id="enterprisePerformanceWords" style="color: red;">300</span>个字符</p>
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<%=request.getContextPath()%>/securityassets/scripts/companyinfoedit.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
    	companyInfoEdit.init();
        checkHowMany($("#companyProfile"),$("#companyProfileWords"),300);
        checkHowMany($("#qualification"),$("#qualificationWords"),300);
        checkHowMany($("#enterprisePerformance"),$("#enterprisePerformanceWords"),300);
    });
</script>