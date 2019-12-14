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
	width: 100px!important;
}
</style>
<form action="#" class="form form-horizontal" id="user-form-datas">
	<div class="form-body">
		<div class="row">
			<div class="col-md-6 col-xs-6">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>用户姓名&nbsp;&nbsp;</label>
						<input type="text" class="inputCommon inputWidth-col-two" name="name">
				</div>
			</div>
			<div class="col-md-6  col-xs-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>登录账号&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon " name="userAccount" style="width:  160px;">
						<span class="input-group-btn" style="float: left!important;">
							<button class="btn default" type="button" id="changZH" data-toggle="tooltip" title="修改账号" style="border-bottom-right-radius: 4px !important;
								border-top-right-radius: 4px !important;height: 33px;background: #dedede;color: #666;">
								<i class="fa fa-wrench"></i>
							</button>
						</span>
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
								name="sex" value="0"> 男
							</label> <label class="radio-inline"> <input type="radio"
								name="sex" value="1"> 女
							</label>
						</div>
						<div id="form_enable_error"></div>
					</div>
				</div>
			</div>
			<div class="col-md-6 col-xs-6">
                <div class="form-group">
                
	                <div class="date birthDay pull-left mr">
	                      <label class="labelCommon labelWidth-col-two color666">出生日期</label>
	                      <input type="text" readonly class="appsysinfo-m inputCommon " name="birthDay" style="width: 160px!important;border-radius: 0 !important;">
	                      <span>
	                          <button class="btn btn-default appsysinfobtn-m" type="button" style="border-radius: 0 4px 4px 0!important;height: 33px;border-left: none">
	                              <i class="fa fa-calendar"></i>
	                          </button>
	                      </span>
	                  </div>
                
                    <%-- <label class="labelCommon labelWidth-col-two color666">出生日期&nbsp;&nbsp;</label>
                    <div class="control-label col-md-8 col-xs-4 input-group search-box search-label-small"  id="birthDay">
                        <input type="text" class="form-control input-sm input-small date-info" style="width: 160px!important;position: relative;bottom: 8px;height: 33px;" value="<%=txtDate%>" readonly name="birth" id="birth">
                        <span class="input-group-btn">
                            <button class="btn btn-default input-sm date-btn" style="    position: relative; top: -8px; height: 33px; " type="button">
                               <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>     --%>            
                    <!-- <label class="control-label col-md-4">出生日期：</label>
                    <div class="col-md-8  input-group search-box search-label-small">
                        <input type="text" class="form-control" name="birth">
                    </div> -->
                </div>
            </div>
		</div>
		<div class="row">
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666">Email&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" name="email">
                </div>
            </div>
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>手机&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" name="phone">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666">联系电话&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" name="tel">
                </div>
            </div>
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666">QQ&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" name="qq">
                </div>
            </div>
        </div>
        
		
		<!-- <div class="row" data-type="pwd">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">密码：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="password" class="form-control" name="userPwd" id="userPwd">
					</div>
				</div>
			</div>
		</div>
		<div class="row" data-type="pwd">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">确认密码：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="password" class="form-control" name="rePwd">
					</div>
				</div>
			</div>
		</div> -->
		<div class="row">
			<div class="col-md-6 col-xs-6">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>所属部门&nbsp;&nbsp;</label>
						<a href="javascript:;" id="btnSelectOrg" style="overflow: hidden;width: 163px;border-radius: 0!important" class="btn btn-default  basic-info inputCommon" >
							<i class="fa fa-wrench"></i> <span>单击选择部门</span>
						</a>
						<button class="btn default" type="button" title="新增部门" id="bmAdd" style="border-bottom-right-radius: 4px !important;
                             border-top-right-radius: 4px !important;height: 33px">
                             <i class="fa fa-plus"></i>
                        </button>
						<input type="text" class="inputCommon inputWidth-col-two" name="bmdm" style="display: none">
				</div>
			</div>
			<div class="col-md-6 col-xs-6">
                <div class="form-group">
					<label class="labelCommon labelWidth-col-two labelBg color666 pull-left">
						入职日期
					</label>
					<div class="input-group date dateOfBusiness">
						<input type="text" readonly value="<%=txtDate%>" class="form-control inputCommon" style="border-radius:0 !important;width: 162px;" name="dateOfBusiness" id="dateOfBusiness">
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
        <div class="row" id="userBMAuthority">
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <label class="role labelCommon labelWidth-col-two color666 borderRadius4" style="height: 34px;border-right:1px solid #ccc !important;"><span class="required"> * </span>权限部门&nbsp;&nbsp;</label>
                        <a href="javascript:;" id="SelectOrgAuth" style="width: 230px;border-radius: 0!important" class="btn btn-default  basic-info inputCommon" >
                            <p style="width: 215px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;margin: 0;margin-left: -15px;font-size: 13px;"><i class="fa fa-wrench"></i>单击选择部门权限(默认本人)</p>
                        </a>
                        <input type="text" class="inputCommon inputWidth-col-two" name="ddtree" style="display: none">
                        <input type="text" class="inputCommon inputWidth-col-two" name="savetree" style="display: none">
                </div>
            </div>
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <span style="font-size: 14px;">注：部门权限为当前员工具有查看所选部门下全部数据的权限</span>
                </div>
            </div>
        </div>
        </os:hasSecurityResource>

		<div class="row">
			<div class="col-md-12 col-xs-12">
				<div class="form-group">
					<label class="role labelCommon labelWidth-col-two color666 borderRadius4" style="height: 34px;border-right:1px solid #ccc !important;">角色&nbsp;&nbsp;</label>
					<div id="roleWrap" class="col-md-8 col-xs-8 maleandfemale"  style="width:578px!important"></div>
				</div>
			</div>
		</div>
		<div class="row">
            <div class="col-md-12 col-xs-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two color666">联系地址&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-one" style="width: 578px!important" name="lxdz" maxlength="300">
                </div>
            </div>
        </div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-two color666" style="height: 80px;line-height: 80px;">备注&nbsp;&nbsp;</label>
					<textarea name="remark" id="remark" maxlength="500" class="inputCommon mr" style="border: 1px solid #e5e5e5!important;height: 80px;width: 578px;border-radius: 0 4px 4px 0!important;"></textarea>
					<p class="wordNum" style="margin: 0;width: 90px;position: absolute;right: 92px;bottom: -15px;text-align: right;">剩余<span class="num" id="remarkWords" style="color: red;">300</span>个字符</p>
				</div>
			</div>
		</div>
	</div>
</form>
<link href="<%=request.getContextPath()%>/assets/pages/css/users/edit.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/edit.js" type="text/javascript"></script>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
    String dljgbm = request.getParameter("dljgbm");
    if (dljgbm == null) {
        dljgbm = CurrentLoginUser.getUser().getDljgBm();
    }
    String zydm = request.getParameter("zydm");
    if (zydm == null) {
        UUID uuid = UUID.randomUUID();
        zydm = uuid+"";
    }

	String orgId = request.getParameter("orgid");
	if (orgId == null) {
		orgId = "";
	}
%>
<script type="text/javascript">
    //textarea输入字数限制
    checkHowMany($("#qualifications"),$("#qualificationsWords"),300);
    checkHowMany($("#remark"),$("#remarkWords"),300);

	userEdit.setPath('<%=request.getContextPath()%>');
	userEdit.init('<%=id%>', '<%=orgId%>', '<%=dljgbm%>', '<%=zydm%>');   
</script>