<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
  String firstpage = request.getParameter("firstpage");
  if (firstpage == null) {
      firstpage = "0";
  }
%>
<style>
	
	#user-manager-container #userlistMoreSearch
    {
        width: 590px;
        border: 1px solid #dadada;
        padding: 10px;
        float: right;
        margin-right: 30px;
        margin-top: 10px;
        border-radius: 4px!important;
        margin-bottom: 10px;
    }
    #user-manager-container   .rotate1 {
        transform: rotate(180deg);
    }
</style>
<div class="row contentBgColor" id="user-manager-container">
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 15px">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="border-bottom: none;margin: 0 0 15px;height: 33px;">
                    <div class="row">
                        <div class="col-md-12" style="padding-left: 0">
                            <os:hasSecurityResource identifier="addAndEditUserManager">
                                <button id="btnNewUser" class="btn btn-default btnAdd pull-left borderRadius4 mr colorfff">
                                    <i class="fa fa-plus iconMr"></i>新增员工
                                </button>
                                <div id="editUserManagerBtn"></div>
                            </os:hasSecurityResource>
                            <os:hasSecurityResource identifier="leaveAndDeleteUserManager">
                                <button id="btnDelUser" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                    <i class="icon iconfont icon-yuangonglizhi"></i>员工离职
                                </button>
                                <button id="btnReUser" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                    <i class="icon iconfont icon-yuangonglizhi"></i>离职恢复
                                </button>
                                <div id="deleteUserManagerBtn"></div>
                            </os:hasSecurityResource>
                            <os:hasSecurityResource identifier="setTheRoleUserManager">
                                <button id="btnSetRole" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                    <i class="icon iconfont icon-jiaoseshezhi"></i>设置角色
                                </button>
                            </os:hasSecurityResource>
<!--                             <button id="btnSetUserAuth" class="btn btn-default">
                                <i class="fa fa-wrench"></i>
                                设置功能权限
                            </button> -->
                            <os:hasSecurityResource identifier="changeTheDepartmentUserManager">
                                <button id="btnSetOrg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                    <i class="icon iconfont icon-genggaibumen"></i>更改部门
                                </button>
                            </os:hasSecurityResource>
                            <os:hasSecurityResource identifier="resetPasswordUserManager">
                                <button id="btnResetPwd" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                    <i class="icon iconfont icon-zhongzhimima"></i>重置密码
                                </button>
                            </os:hasSecurityResource>
                            <div style="float: right">
                                <div class="pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m">员工状态</label>
                                    <select id="ygzt" class="form-control inputCommon" style="width: 85px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
								    border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
								    border-bottom-right-radius: 4px !important;" name="searchFilter">
                                        <option value="1">在职</option>
                                        <option value="0">离职</option>
                                    </select>
                                </div>
                                <div class="pull-left">
                                    <div class="input-icon" style="width: 155px;float: left;position: relative ;margin-left: 10px;margin-right: 15px;">
                                        <input type="search" class="form-control  borderRadius4" id="searchFilter" name="searchFilter" placeholder="用户名/账号" style="padding-left: 10px;padding-right: 49px; ">
                                        <i class="fa fa-search colorBlue-10a0f7 searchIcoBtn " id="userSearchBtn" style="    margin-right: 5px;
                                                                                                                                        position: absolute;
                                                                                                                                        right: -5px;
                                                                                                                                        top: -11px;
                                                                                                                                        cursor: pointer;
                                                                                                                                        height: 33px;
                                                                                                                                        line-height: 33px;
                                                                                                                                        width: 45px;
                                                                                                                                        border-left: 1px solid #dedede;
                                                                                                                                        font-size: 20px!important;"></i>
                                    </div>
                                   <%-- <button type="button" id="userSearchBtn" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr" id="lccx-btn" style="height:33px; margin-left: 14px;float: left!important;" data-loading-text="Loading...">
                                        <i class="fa fa-search "></i>查&nbsp;询&nbsp;
                                    </button>--%>
                                </div>
                                <div class="pull-right" style="height: 33px;line-height: 33px;padding: 0 10px;">
                                    <a id="userlistMoreAsearch" data-sign="0" href="javascript:void (0);" class="iconFontColor-10a0f7" style="text-decoration: none;vertical-align: middle;">更多</a>
                                    <img class="rotate1" src="/systemmanager/assets/pages/img/arrow.png" alt="arrow">
                                </div>
                            </div>
                         </div>
                         <div class="col-md-12" id="userlistMoreSearch" style="display: none">
                                <div class="pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m">所属部门</label>
                                    <select id="ygssbm" class="form-control inputCommon" style="width: 115px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
                                    border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
                                    border-bottom-right-radius: 4px !important;" name="searchFilter">
                                        <option value="0">全部</option>
                                    </select>
                                </div>
                                <div class="pull-left" style="margin-left: 10px;">
                                    <label class="labelCommon labelBg color666 dateLabel-m">员工角色</label>
                                    <select id="ygssjs" class="form-control inputCommon" style="width: 115px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
                                    border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
                                    border-bottom-right-radius: 4px !important;" name="searchFilter">
                                        <option value="0">全部</option>
                                    </select>
                                </div>
                                <div class="pull-left" style="margin-left: 10px;">
                                    <div class="date userCreateDate">
		                                <label class="labelCommon labelBg color666 dateLabel-m">创建时间</label>
		                                <input type="text" class="appsysinfo-m inputCommon " name="searchFilter" id="userCreateDate" style="border-radius: 0 !important; width: 100px">
		                                <span>
		                                    <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
		                                        <i class="fa fa-calendar"></i>
		                                    </button>
		                                </span>
		                            </div>
	                            </div>
                         </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover"
                           id="users_data">
                        <thead>
                        <tr class="color3">
                            <th width="24px"><input type="checkbox" id="selectUser" /></th>
                            <th width="120px" class="text-left">用户名</th>
                            <th width="130px" class="text-left">登录账号</th>
                            <th width="100px" class="text-left">部门</th>
                            <th class="text-left">角色</th>
                            <th width="100px">创建时间</th>
                            <th width="180px" class="text-left">邮箱</th>
                            <th width="120px">操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/users/list.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/users.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
    	$('#userlistMoreAsearch').click(function(){
            if($(this).attr('data-sign')=='0'){
                $(this).attr('data-sign','1')
                $(this).next('img').addClass('rotate1')
            }else {
                $(this).attr('data-sign','0');
                $(this).next('img').removeClass('rotate1')
            }
            $('#userlistMoreSearch').fadeToggle('slow');
        });
        users.setPath('<%=request.getContextPath()%>');
        users.init('<%=firstpage%>');
    });
</script>