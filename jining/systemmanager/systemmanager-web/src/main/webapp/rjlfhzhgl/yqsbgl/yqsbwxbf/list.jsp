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
											<input type="text" class="inputCommon appsysinfo-m" id="sbmc" name="sbmc" placeholder="请输入仪器名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
										</div>
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">受控编号</label>
											<input type="text" class="inputCommon appsysinfo-m" id="skbh" name="skbh" placeholder="请输入受控编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
										</div>
									</form>
								</div>
								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="<%=uuid%>yqsbtzSeatchwxbf"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="<%=uuid%>resetYqsbtzwxbf"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button id="<%=uuid%>yqsbtzWxSq" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>维修申请</button>
									<button id="<%=uuid%>yqsbtzBfSq" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>报废申请</button>
									<%--<button id="<%=uuid%>yqsbtzShanwxbf" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>删除</button>--%>
									<%--<button id="<%=uuid%>yqsbtzAddnewwxbf" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>--%>
									<%--<button id="<%=uuid%>yqsbtzUpdatenewwxbf" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>修改</button>--%>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
 				<form id="yqsbtzform_delete">
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="Yqsbtzwxbfsq" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left"><input type="checkbox" name="yqsbwxbfck"></th>
							<th class="text-left">设备名称</th>
							<th class="text-left">规格型号</th>
							<th class="text-left">生产厂商</th>
							<th class="text-left">设备原值</th>
							<th class="text-left">设备状况</th>
							<th class="text-left">维修原因</th>
							<th class="text-left">报废原因</th>
							<th class="text-left">申请状态</th>
							<th class="text-left">维修申请备注</th>
							<th class="text-left">报废申请备注</th>
						</tr>
						</thead>
					</table>
				</div>
				</form>
			</div>
		</div>
	</div>
</div>
<%--维修申请模态框--%>
<div class="modal fade" id="<%=uuid%>myModalyqsbtzwx" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
	<div class="modal-dialog  modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabelwx">
					维修申请
				</h4>
			</div>
			<form id="<%=uuid%>addYqsbtzwx_from">
				<div class="modal-body">
					<table>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>设备名称</label></span>
								<input id="inwx1" name="sbmc" type="text" class="form-control" readonly>
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>规格型号</label></span>
								<input id="inwx2" name="ggxh" type="text" class="form-control" readonly>
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>设备状况</label></span>
								<input id="inwx3" name="sbzk" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>维修原因</label></span>
								<input id="inwx4" name="wxyy" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>维修备注</label></span>
								<input id="inwx5" name="wxbz" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>受控编号</label></span>
								<input id="inwx6" name="skbh" type="text" class="form-control" readonly>
							</div></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" id="gbyqsbtzwx" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button id="buyqsbtzwx" type="button" class="btn btn-primary">
						重置
					</button>
					<button id="submityqsbtzwx" type="button" class="btn btn-primary">
						提交
					</button>
				</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<%--报废申请模态框--%>
<div class="modal fade" id="<%=uuid%>myModalyqsbtzbf" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
	<div class="modal-dialog  modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabelbf">
					报废申请
				</h4>
			</div>
			<form id="<%=uuid%>addYqsbtzbf_from">
				<div class="modal-body">
					<table>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>设备名称</label></span>
								<input id="inbf1" name="sbmc" type="text" class="form-control" readonly>
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>规格型号</label></span>
								<input id="inbf2" name="ggxh" type="text" class="form-control" readonly>
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>设备状况</label></span>
								<input id="inbf3" name="sbzk" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>报废原因</label></span>
								<input id="inbf4" name="bfyy" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>报废备注</label></span>
								<input id="inbf5" name="bfbz" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>受控编号</label></span>
								<input id="inbf6" name="skbh" type="text" class="form-control" readonly>
							</div></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" id="gbyqsbtzbf" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button id="buyqsbtzbf" type="button" class="btn btn-primary">
						重置
					</button>
					<button id="submityqsbtzbf" type="button" class="btn btn-primary">
						提交
					</button>
				</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/yqsbwxbfsq/yqsbtzwxbf.js"></script>
<script type="text/javascript">
	$(function () {
        yqyysyListyqsbtzwxbf.setPath("<%=request.getContextPath()%>")
        yqyysyListyqsbtzwxbf.init("<%=uuid%>")
    })
</script>


