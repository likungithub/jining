<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ page import="com.xinhai.security.api.CurrentLoginUser,com.xinhai.caiyun.commonmanager.utils.AESCipher" %>
<style>
 .rotate1 {
		transform: rotate(180deg);
	}
.manager-container-sl .btnF{
	background: #fff;
	cursor: pointer;
	outline: none;
	color: #52A2E9;
}
 .manager-container-sl  .dateInput{
	 width: 79px!important;
 }
.manager-container-sl .mainH{
	border: 1px solid #52A2E9;
	border-bottom: none;
}
 .manager-container-sl .mainB{
	 border: 1px solid #52A2E9;
	 border-top: none;
 }
</style>
<%
String uuid = UUID.randomUUID().toString();
String khbm = request.getParameter("khbm");
String yddh = AESCipher.aesDecryptString(CurrentLoginUser.getUser().getYddh(), "Gx_Cys_key@2017!");
String username = CurrentLoginUser.getUser().getName();
%>
<div class="row contentBgColor manager-container-sl" id="<%=uuid%>-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-body">
				<div class="table-toolbar" style="height: auto">
					<div class="row">
						<div class="col-md-12" style="padding-left:0 ;margin-bottom: 15px">
									<div  class="pull-left borderRadius4" style="border: 1px solid #12A0F4;padding: 1px;position: relative;top: -2px;">
										<a id="<%=uuid%>btnsqzj" class="btn btnF shouquzhengjian_sl">
											收取证件
										</a>
										<a id="<%=uuid%>btnghzj" class="btn btnF guihuanzhengjian_sl">
											归还证件
										</a>
										<a id="<%=uuid%>btncxjl" class="btn btnF piliangchexiao">
											撤销记录
										</a>
										<a id="<%=uuid%>btndyjjd" class="btn btnF dayinjiaojiedan_sl" >
											打印交接单
										</a>
									</div>
									<div class="input-group  search-label-small pull-right" style="position:relative;">
										<input type="text" class="inputCommon input-sm  input-small borderRadius4" name="zjmc" id="zjmc" style="padding-right: 34px;text-indent:0px !important;width:135px!important;font-size:12px !important;" placeholder="请输入证件名称" />
										<i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" id="searchTerm-m" style=" margin-right: 5px;
																																position: absolute;
																																right: -4px;
																																top: 0px;
																																cursor: pointer;
																																height: 33px;
																																line-height: 33px;
																																width: 34px;
																																text-align: center;
																																border-left: 1px solid #dedede;
																																font-size: 20px!important;"></i>
									</div>
							<div class="pull-right mr" style="margin-bottom: 0px;">
								<div class="date beginTime pull-left">
									<label class="labelCommon labelBg color666 dateInput">录入日期</label>
									<input type="text" readonly="" class="appsysinfo-m inputCommon dateInput" name="jjsj_q" style="border-radius: 0 !important;">
									<span>
                                            <button class="btn btn-default " type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
								</div>
								<span style="float: left;margin: 5px">-</span>
								<div class="input-group date endTime pull-left">
									<input type="text" readonly="" class="inputCommon appsysinfo-m dateInput" name="jjsj_z" style="border-radius: 4px 0 0 4px!important;">
									<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
								</div>
								<div style="clear: both"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab ManagerListzhengjian_m" id="<%=uuid%>ManagerList_m" width="100%">
						<thead>
						<tr class="color333">
							<th width="20px"></th>
							<th style="width:15px;" class="text-left sorting_disabled" rowspan="1" colspan="1">
								<input type="checkbox" name="selectAll">
							</th>
							<th class="text-left" width="30px">编号</th>
							<th class="text-left">最新状态</th>
							<th class="text-left" width="170px">证件名称</th>
							<th class="text-center" width="65px">交接次数</th>
							<th>收取人</th>
							<th width="80px">录入时间</th>
							<th>备注</th>
							<th>系统时间</th>
							<%--<th class="text-left">最新交接</th>--%>
							<th width="90px" class="text-center">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/zjsq/list.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        list.setPath("<%= request.getContextPath()%>");
        list.init('<%=uuid%>','<%=khbm%>');
        var date = (new Date()).getTime();
        var a=moment(date).format('YYYY-MM-DD');
		var b =  moment(date+24*60*60*1000*7).format('YYYY-MM-DD');
		$('.manager-container-sl input[name="jjsj_q"]').val(a);
        $('.manager-container-sl input[name="jjsj_z"]').val(b);
    });
</script>