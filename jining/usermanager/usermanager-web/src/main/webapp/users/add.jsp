<%@page import="java.util.UUID"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
java.util.Date currentTime = new java.util.Date();//得到当前系统时间
String txtDate = format.format(currentTime); //将日期时间格局化
%>
<style>
.modal-content{
    width:730px;
}
#user-form-datas	.labelWidth-col-two{
	width: 110px!important;
}
</style>
<form action="#" class="form form-horizontal" id="addUser-form-datas">
	<div class="form-body">
		<div class="row">
			<div class="col-md-6 col-xs-6">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>用户姓名&nbsp;&nbsp;</label>
						<input type="text" class="inputCommon inputWidth-col-two" placeholder="请输入20位以内的中文或英文" name="addName">
				</div>
			</div>
			<div class="col-md-6  col-xs-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>登录账号&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" placeholder="请输入6-20位字母和数字" name="addUserAccount">
                </div>
            </div>
		</div>
		<div class="row">
			<div class="col-md-6 col-xs-6">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-two color666 mr">性别&nbsp;&nbsp;</label>
					<div class="col-md-8 col-xs-8 maleandfemale" style="width: 180px">
						<div class="radio-list" data-error-container="#form_enable_error">
							<label class="radio-inline"> <input type="radio"
								name="addSex" value="0"> 男
							</label> <label class="radio-inline"> <input type="radio"
								name="addSex" value="1"> 女
							</label>
						</div>
						<div id="form_enable_error"></div>
					</div>
				</div>
			</div>
			<div class="col-md-6 col-xs-6">
                <div class="form-group">
	                <div class="date addBirthDay pull-left mr">
	                      <label class="labelCommon labelWidth-col-two color666">出生日期</label>
	                      <input type="text" readonly class="appsysinfo-m inputCommon " name="addBirthDay" style="width: 160px!important;border-radius: 0 !important;">
	                      <span>
	                          <button class="btn btn-default appsysinfobtn-m" type="button" style="border-radius: 0 4px 4px 0!important;height: 33px;border-left: none">
	                              <i class="fa fa-calendar"></i>
	                          </button>
	                      </span>
	                  </div>
                </div>
            </div>
		</div>
		<div class="row">
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666">Email&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" name="addEmail">
                </div>
            </div>
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>手机&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" name="addPhone">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666">联系电话&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" name="addTel">
                </div>
            </div>
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666">QQ&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" name="addQq">
                </div>
            </div>
        </div>
		<div class="row">
			<div class="col-md-6 col-xs-6">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>所属部门&nbsp;&nbsp;</label>
						<a href="javascript:;" id="addBtnSelectOrg" style="width: 163px;border-radius: 0!important" class="btn btn-default  basic-info inputCommon" >
							<i class="fa fa-wrench"></i> <span>单击选择部门</span>
						</a>
						<button class="btn default" type="button" title="新增部门" id="addBmAdd" style="border-bottom-right-radius: 4px !important;
                             border-top-right-radius: 4px !important;height: 33px">
                             <i class="fa fa-plus"></i>
                        </button>
						<input type="text" class="inputCommon inputWidth-col-two" name="addBmdm" style="display: none">
				</div>
			</div>
			<div class="col-md-6 col-xs-6">
                <div class="form-group">
					<label class="labelCommon labelWidth-col-two labelBg color666 pull-left">
						入职日期
					</label>
					<div class="input-group date dateOfBusiness">
						<input type="text" readonly value="<%=txtDate%>" class="form-control inputCommon" style="border-radius:0 !important;width: 162px;" name="addDateOfBusiness" id="addDateOfBusiness">
						<span class="input-group-btn" style="float: left;">
                            <button class="btn btn-default" type="button" style="border-radius: 0 4px 4px 0!important;height: 33px;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
					</div>
                </div>
            </div>
		</div>
		<os:hasSecurityResource identifier="userBMAuthorityUserManager"> <!-- 按钮权限 -->
        <div class="row" id="adduserBMAuthority">
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <label class="role labelCommon labelWidth-col-two color666 borderRadius4" style="height: 34px;border-right:1px solid #ccc !important;"><span class="required"> * </span>权限部门&nbsp;&nbsp;</label>
                        <a href="javascript:;" id="addSelectOrgAuth" style="width: 230px;border-radius: 0!important" class="btn btn-default  basic-info inputCommon" >
                            <p style="width: 215px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;margin: 0;margin-left: -15px;font-size: 13px;"><i class="fa fa-wrench"></i>单击选择部门权限(默认本人)</p>
                        </a>
                        <input type="text" class="inputCommon inputWidth-col-two" name="addddtree" style="display: none">
                        <input type="text" class="inputCommon inputWidth-col-two" name="addsavetree" style="display: none">
                </div>
            </div>
            <div class="col-md-6 col-xs-6">
                <div class="form-group" style="margin-top: 6px;">
                    <span style="font-size: 14px;">注：为员工添加所选部门的数据权限。</span>
                </div>
            </div>
        </div>
        </os:hasSecurityResource>
        <div class="row">
            <div class="col-md-12 col-xs-12">
                <div class="form-group">
                    <label class="role labelCommon labelWidth-col-two color666 borderRadius4" style="height: 34px;border-right:1px solid #ccc !important;"><span class="required"> * </span>角色&nbsp;&nbsp;</label>
                    <div id="addRoleWrap" class="col-md-8 col-xs-8 maleandfemale"  style="width:578px!important"></div>
                </div>
            </div>
        </div>

		<div class="row">
			<div class="col-md-12 col-xs-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-two color666">联系地址&nbsp;&nbsp;</label>
						<input type="text" class="inputCommon inputWidth-col-one" style="width: 578px!important" name="addLxdz" maxlength="300">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-two color666" style="height: 80px;line-height: 80px;">备注&nbsp;&nbsp;</label>
					<%--<input type="text" class="inputCommon inputWidth-col-two" name="addRemark" maxlength="500" style="width: 568px!important;"/> --%>
                    <textarea name="addRemark" id="addRemark" maxlength="300" class="inputCommon mr" style="border: 1px solid #e5e5e5!important;height: 80px;width: 578px;border-radius: 0 4px 4px 0!important;"></textarea>
                    <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right:15px;bottom: -5px;text-align: right;">剩余<span class="num" id="addRemarkWords" style="color: red;">300</span>个字符</p>
				</div>
			</div>
		</div>
	</div>
</form>
<link href="<%=request.getContextPath()%>/assets/pages/css/users/edit.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/add.js" type="text/javascript"></script>
<%
    String dljgbm = request.getParameter("dljgbm");
    if (dljgbm == null) {
        dljgbm = CurrentLoginUser.getUser().getDljgBm();
    }
    String zydm = request.getParameter("zydm");
    if (zydm == null) {
        UUID uuid = UUID.randomUUID();
        zydm = uuid+"";
    }
%>
<script type="text/javascript">
	userAdd.setPath('<%=request.getContextPath()%>');
	userAdd.init('<%=dljgbm%>', '<%=zydm%>');
    //textarea输入字数限制
    checkHowMany($("#addQualifications"),$("#addQualificationsWords"),300);
    checkHowMany($("#addRemark"),$("#addRemarkWords"),300);
</script>