<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<%@ page import="java.util.Date" %>
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
	position:relative;
}
.social-share-icon{
	font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    
 }
.social-share a{z-index:1000;position:relative;text-decoration:none;margin:4px;display:inline-block;outline:none}.social-share .social-share-icon{position:relative;display:inline-block;width:34px;height:34px;font-size:20px;border-radius:50% !important;line-height:32px;color:#666;text-align:center;vertical-align:middle;transition:background 0.6s ease-out 0s;opacity:0.6}.social-share .social-share-icon:hover{opacity:1}
.social-share{font-family:"socialshare" !important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:0.2px;-moz-osx-font-smoothing:grayscale;width: 150px;
    margin-top: 44px;
    margin-left: 11px;}
.modal-footer{
	padding-right:37px !important;
}
.social-share .icon-wechat .wechat-qrcode{display:none;border:1px solid #eee;position:absolute;z-index:9;top:-205px;left:-84px;width:200px;height:192px;color:#666;font-size:12px;text-align:center;background-color:#fff;box-shadow:0 2px 10px #aaa;transition:all 200ms;-webkit-tansition:all 350ms;-moz-transition:all 350ms}.social-share .icon-wechat .wechat-qrcode.bottom{top:40px;left:-84px}.social-share .icon-wechat .wechat-qrcode.bottom:after{display:none}.social-share .icon-wechat .wechat-qrcode h4{font-weight:normal;height:26px;line-height:26px;font-size:12px;background-color:#f3f3f3;margin:0;padding:0;color:#777}.social-share .icon-wechat .wechat-qrcode .qrcode{width:105px;margin:10px auto}.social-share .icon-wechat .wechat-qrcode .qrcode table{margin:0 !important}.social-share .icon-wechat .wechat-qrcode .help p{font-weight:normal;line-height:16px;padding:0;margin:0}.social-share .icon-wechat .wechat-qrcode:after{content:'';position:absolute;left:50%;margin-left:-6px;bottom:-13px;width:0;height:0;border-width:8px 6px 6px 6px;border-style:solid;border-color:#fff transparent transparent transparent}.social-share .icon-wechat:hover .wechat-qrcode{display:block}
.custom-alerts{
	position:absolute;
	top: 7px;
    width: 94%;
}
</style>



<form action="#" id="userinfoForm" class="form form-horizontal">
    <div class="form-body">
        <div  class="row form-group" style="padding-left: 10px;
    margin-left: 0px;
    border-left: 3px solid #10a0f7;">
            基本信息
        </div>
        <div class="row form-group" style="margin-top:7px;">
            <div class="col-md-6" style="padding-right: 0px;
    width: 50.5%;">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        登录账号
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-two" name="userAccount" disabled>
                </div>
            </div>
            <div class="col-md-6" style="padding-right: 0;
    padding-left: 13px;
    width: 46.5%;
    float: left;">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        <span class="colorRed">*</span>
                        员工姓名
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-two" name="name" style=" width: 177px!important;">
                </div>
            </div>
        </div>

        <div class="row form-group">
            <div class="col-md-6">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666 pull-left">
						员工性别
						</label>
						 <div class="radio-list pull-left" data-error-container="#form_sex_error">
                            <label class="radio-inline">
                                <input type="radio" name="xbdm" value="0"> 男
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="xbdm" value="1"> 女
                            </label>
                        </div>
                        <div id="form_sex_error"></div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666 pull-left">
                        员工生日
                    </label>
                    <div class="input-group date csrq">
                        <input type="text" value="<%=new Date()%>" class="form-control inputCommon" style="border-radius:0 !important;width: 138px;" name="csrq">
                        <span class="input-group-btn">
                                <button class="btn btn-default" type="button" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                    </div>

                </div>
            </div>
        </div>

        <div class="row form-group">
            <div class="col-md-6" style="padding-right: 0;
    width: 50.5%;">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        角色信息
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-two" name="roleInfo" disabled>
                </div>
            </div>
            <div class="col-md-6" style="padding-right: 0;
    padding-left: 13px;
    width: 46.5%;
    float: left;">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        入职日期
                    </label>
                    <div class="input-group date cyrq">
                        <input type="text" value="<%=new Date()%>" class="form-control inputCommon" style="border-radius:0 !important;width: 138px;" name="cyrq">
                        <span class="input-group-btn">
                                <button class="btn btn-default" type="button" style="height: 33px;border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                    </div>

                </div>
            </div>
        </div>
        <div  class="row form-group"  style="padding-left: 10px;
    margin-left: 0px;
    border-left: 3px solid #10a0f7;">
            联系方式
        </div>
        <div class="row form-group">
            <div class="col-md-6" style="padding-right: 0px;
    width: 50.5%;">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        <span class="colorRed">*</span>
                        移动电话
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-two" name="yddh">
                </div>
            </div>
            <div class="col-md-6" style="padding-right: 0;
    padding-left: 13px;
    width: 46.5%;
    float: left;">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        固定电话
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-two" name="tel" style="    width: 177px!important;">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-6"  style="padding-right: 0px;
    width: 50.5%;">
                <div class="input-group">
                    	<label class="labelCommon labelWidth-col-one labelBg color666">
						<span class="colorRed">*</span>
						电子邮箱
						</label>
						<input type="text" class="inputCommon inputWidth-col-two" name="email">
                    
                </div>
            </div>
            <div class="col-md-6"  style="padding-right: 0;
    padding-left: 13px;
    width: 46.5%;
    float: left;">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        QQ
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-two" name="qq"  style="    width: 177px!important;">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        联系地址
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="lxdz">
                </div>
            </div>
        </div>
          <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                   	<label class="labelCommon labelWidth-col-one labelBg color666">
						备注信息
						</label>
						<input type="text" class="inputCommon inputWidth-col-one" name="bzxx">
                </div>
            </div>
        </div>

    </div>
</form>
<script src="<%=request.getContextPath()%>/securityassets/scripts/userinfoedit.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/jquery.fx.min.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        userinfoEdit.setPath("<%=request.getContextPath() %>");
        userinfoEdit.init("<%=id%>");
    });
</script>