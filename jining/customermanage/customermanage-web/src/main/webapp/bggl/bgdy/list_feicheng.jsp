<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
 .rotate1 {
		transform: rotate(180deg);
	}
</style>
<%
String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="height: 33px;margin: 0 0 15px;">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="padding-bottom: 10px;">
								<div style="clear:both;overflow: hidden;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">样品编号</label>
										<input type="text" name="ypbm" class="appsysinfo-m inputCommon" id="ypbm"  placeholder="请输入样品编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
									</div>
									<div class="input-group  search-label-small pull-left"
										 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
										<input type="text" name="ypmc" id="ypmc" class="appsysinfo-m inputCommon"
											   placeholder="请输入样品名称"
											   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
									</div>
									<div class="input-group  search-label-small pull-left"
										 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">委托单位名称</label>
										<input type="text" name="wtdw" id="wtdw" class="appsysinfo-m inputCommon"
											   placeholder="请输入委托单位名称"
											   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">年月</label>
											<div class="date beginTime pull-left wtny">
												<input type="text" readonly="" id="weituonianyue" class="appsysinfo-m inputCommon " name="wtny"
													   style="border-radius: 0 !important; width: 100px">
												<span>
													<button class="btn btn-default appsysinfobtn-m" type="button"
															style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
													<i class="fa fa-calendar"></i>
													</button>
												</span>
											</div>
									</div>
								</div>
								<div style="float: right;width:100%;position: relative;top: 10px">
									<div class="col-md-6b " style="padding: 0;display:none">
										<button id="<%=uuid%>btn_sjjy_th" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">
											退回
										</button>
										<button style="margin-left: 10px" id="<%=uuid%>btn_sjjy_tg" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">
											通过
										</button>
										<button style="margin-left: 10px;display: none" id="<%=uuid%>btn_sjjy_btg" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">
											不通过
										</button>
									</div>
									<button  id="searchTerm-m"
											 class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
										<i class="fa fa-search iconMr"></i>查询
									</button>
<%--									<button  id="dy-jiaojiedan"--%>
<%--											 class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">--%>
<%--										<i class="fa fa-search iconMr"></i>打印交接单--%>
<%--									</button>--%>
									<button  id="dy-cjhzb"
											 class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
										<i class="fa fa-search iconMr"></i>报告台账
									</button>
									<button  id="dy-cjhgb" style="display:none"
											 class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
										<i class="fa fa-search iconMr"></i>抽检合格表
									</button>
									<button  id="dy-cjbhg" style="display:none"
											 class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
										<i class="fa fa-search iconMr"></i>抽检不合格表
									</button>
<%--									<button  id="<%=uuid%>dy-fengpi"--%>
<%--											 class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">--%>
<%--										<i class="fa fa-search iconMr"></i>打印封皮--%>
<%--									</button>--%>
<%--									<button  id="<%=uuid%>dy-neirong"--%>
<%--											 class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">--%>
<%--										<i class="fa fa-search iconMr"></i>打印内容--%>
<%--									</button>--%>
									<button  id="<%=uuid%>dy-baogao"
											 class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
										<i class="fa fa-search iconMr"></i>打印报告
									</button>
									<%--<div id="searchTerm-m" class="input-group  pull-right" style="margin-left: 10px">
										<button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr Search-btn" style="height:33px;" data-loading-text="Loading...">
											<i class="fa fa-search "></i>
											查&nbsp;询&nbsp;</button>
									</div>--%>

									<%--<div class="input-group  search-label-small pull-right" style="position: relative">
										<input type="text" class="inputCommon input-sm  input-small borderRadius4" name="ypmc" id="ypmc" style="padding-right: 47px;margin-right: 14px;text-indent:0px !important;width:220px!important;font-size:12px !important;" placeholder="请输入样品名称" />
										<i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" id="searchTerm-m" style="margin-right: 5px;
																																position: absolute;
																																right: 10px;
																																top: 0px;
																																cursor: pointer;
																																height: 33px;
																																line-height: 33px;
																																width: 45px;
																																text-align: center;
																																border-left: 1px solid #dedede;
																																font-size: 20px!important;"></i>
									</div>--%>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="<%=uuid%>ManagerList_m" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left" width="20px"><input type="checkbox" name="rwfp_checkbox"/>
							</th>
							<th width="80px">操作</th>
							<%--<th class="text-left">合同名称</th>--%>
							<th class="text-center">样品编号</th>
							<th class="text-center">样品名称</th>
							<th class="text-center">检测项目名称</th>
							<%--<th class="text-left">数据出具日期</th>--%>
							<th class="text-center">委托单位名称</th>
							<th class="text-left">报告总审核日期</th>
							<%--<th class="text-left">所属市</th>--%>
							<%--<th class="text-left">所属县</th>--%>
							<%--<th class="text-left">状态</th>--%>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="<%= request.getContextPath()%>/assets/pages/scripts/bggl/bgdy/list_feicheng.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        list.setPath("<%= request.getContextPath()%>");
        list.init('<%=uuid%>');

    });
</script>