<%@page import="java.util.UUID"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
 .rotate1 {
		atetransform: rotate(180deg);
	}
</style>
<%
String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<form id="findByNabh">
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">设备名称</label>
											<input type="text" class="inputCommon appsysinfo-m" name="sbmc" placeholder="请输入设备名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
										</div>
									</form>
								</div>
								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="<%=uuid%>yqsbtzSeatch"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="<%=uuid%>resetYqsbtz"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button id="<%=uuid%>YqsbtzSyjl"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>使用记录</button>
									<button id="<%=uuid%>YqsbtzSywb"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>使用完毕</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
 				<form id="<%=uuid%>yqsbsyjl">
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="Yqsbtzsyjl12" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left"><input type="checkbox" name="yqsbsyck"></th>
							<th class="text-left">仪器名称</th>
							<th class="text-left">样品名称</th>
							<th class="text-left">检测项目</th>
							<th class="text-left">使用开始时间</th>
							<th class="text-left">使用结束时间</th>
							<th class="text-left">设备使用前状况</th>
							<th class="text-left">设备使用后状况</th>
							<th class="text-left">操作人</th>
						</tr>
						</thead>
					</table>
				</div>
				</form>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="<%=uuid%>yqypmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
	<div class="modal-dialog  modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel2">
					仪器设备使用记录
				</h4>
			</div>
			<form id="<%=uuid%>yqyp_from">
				<div class="modal-body">
					<div class="row">
						<label class="labelCommon labelWidth-col-two color666" ><span class="required"> * </span>仪器名称</label>
						<select class="inputCommon inputWidth-col-two"  name="skbh" id="yqsbmc"  multiple1="value">
							<option>请选择</option>
						</select>
						<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>样品名称</label>
						<select class="inputCommon inputWidth-col-two"  name="ypid" id="yqypmc">
							<option>请选择</option>
						</select>
					</div>
					<br/>
					<div class="row">
						<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>检测项目</label>
						<select class="inputCommon inputWidth-col-two"  name="jcxmid" id="yqjcxm">
							<option>请选择</option>
						</select>
						<%--<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>使用开始时间</label>--%>
						<%--<input class="inputCommon inputWidth-col-two" type="text" name = "kssj" id="sykssj">--%>
					<%--</div>--%>
					<%--<br>--%>
					<%--<div class="row">--%>
						<%--<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>使用结束时间</label>--%>
						<%--<input class="inputCommon inputWidth-col-two" type="text" name = "jssj" id="syjssj">--%>
						<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>设备是用前状况</label>
						<input class="inputCommon inputWidth-col-two" type="text" name = "yqzk">
					</div>
					<br>
					<div class="row">
						<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>使用后状况</label>
						<input class="inputCommon inputWidth-col-two" type="text" name = "yhzk">
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-default " data-dismiss="modal">关闭
					</button>
					<button type="button" class="btn btn-primary " id="<%=uuid%>yqsbsyjl_manage" >
						提交
					</button>
				</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/yqsyjl/yqsyjl.js"></script>
<script type="text/javascript">
	$(function () {
        yqyysyListyqsbsyjl.setPath("<%=request.getContextPath()%>");
        yqyysyListyqsbsyjl.init("<%=uuid%>")
    })
</script>
<script src="<%=request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script type="text/javascript">
    //日期插件
    $("#sykssj").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
    $("#syjssj").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
</script>


