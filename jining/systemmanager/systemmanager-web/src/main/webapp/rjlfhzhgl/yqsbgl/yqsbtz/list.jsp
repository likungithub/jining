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
									<button id="yqsbtzSeatch"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="resetYqsbtz"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<%--<button id="xz" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>--%>
										<%--<button id="sc"
												class="btn  btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-trash iconMr"></i> 批量删除
										</button>
										<button id="xg"
												class="btn  btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-wrench iconMr"></i>修改
										</button>--%>
									<button id="yqsbtzDaochu" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导出</button>
									<button id="yqsbtzDaoru" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导入</button>
									<button id="yqsbtzShan" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>删除</button>
									<button id="yqsbtzAddnew" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>
									<button id="yqsbtzUpdatenew" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>修改</button>
									<button id="yqsbtzfswjxx" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>维检消息</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
 				<form id="yqsbtzform_delete">
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="Yqsbtzfeiqiu" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left"><input type="checkbox" name="yqsbck"></th>
							<th class="text-left">设备名称</th>
							<th class="text-left">规格型号</th>
							<th class="text-left">准确度等级</th>
							<th class="text-left">分辨力</th>
							<th class="text-left">生产厂商</th>
							<th class="text-left">设备原值</th>
							<th class="text-left">检定机构</th>
							<th class="text-left">检定日期</th>
							<th class="text-left">备注信息</th>
						</tr>
						</thead>
						<tbody id="sss">

						</tbody>
					</table>
				</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- 新增模态框（Modal） -->
<div class="modal fade" id="<%=uuid%>myModalyqsbtz" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
	<div class="modal-dialog  modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel2">
					新增仪器设备
				</h4>
			</div>
			<form id="<%=uuid%>addYqsbtz_from">
				<div class="modal-body">
					<table>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>设备名称</label></span>
								<input id="in1" name="sbmc" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>规格型号</label></span>
								<input id="in2" name="ggxh" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>准确等级</label></span>
								<input id="in3" name="zqddj" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>分辨力&nbsp;&nbsp;&nbsp;</label></span>
								<input id="in4" name="fbl" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>生产厂商</label></span>
								<input id="in5" name="sccs" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>设备原值</label></span>
								<input id="in6" name="sbyz" type="text" class="form-control">
							</div></td>
						</tr>
						<%--<tr>
							<td><div class="form-group input-group">&lt;%&ndash; value="<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date())%>"&ndash;%&gt;
								<span class="input-group-addon"><label>检定机构</label></span>
								<input id="in7" name="jdjg" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>检定日期</label></span>
								<input id="in8" name="jdrq" type="text" class="form-control" value="<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date())%>" readonly>
							</div></td>
						</tr>--%>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>备注信息</label></span>
								<input id="in9" name="bzxx" type="text" class="form-control">
							</div></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" id="gbyqsbtz" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button id="buyqsbtz" type="button" class="btn btn-primary">
						重置
					</button>
					<button id="submityqsbtz" type="button" class="btn btn-primary">
						提交
					</button>
				</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<!-- 修改模态框（Modal） -->
<div class="modal fade" id="<%=uuid%>myModalyqsbtzUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
	<div class="modal-dialog  modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel4">
					修改仪器设备
				</h4>
			</div>
			<form id="<%=uuid%>updateYqsbtz_from">
				<div class="modal-body">
					<table>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>设备名称</label></span>
								<input id="ins1" name="sbmc" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>规格型号</label></span>
								<input id="ins2" name="ggxh" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>准确等级</label></span>
								<input id="ins3" name="zqddj" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>分辨力&nbsp;&nbsp;&nbsp;</label></span>
								<input id="ins4" name="fbl" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>生产厂商</label></span>
								<input id="ins5" name="sccs" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>设备原值</label></span>
								<input id="ins6" name="sbyz" type="text" class="form-control">
							</div></td>
						</tr>
						<%--<tr>
							<td><div class="form-group input-group">&lt;%&ndash; value="<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date())%>"&ndash;%&gt;
								<span class="input-group-addon"><label>检定机构</label></span>
								<input id="ins7" name="jdjg" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>检定日期</label></span>
								<input id="ins8" name="jdrq" type="text" class="form-control" value="<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date())%>" readonly>
							</div></td>
						</tr>--%>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>备注信息</label></span>
								<input id="ins9" name="bzxx" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>受控编号</label></span>
								<input id="ins10" name="skbh" type="text" class="form-control" readonly>
							</div></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" id="gbyqsbtzupdate" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button id="buyqsbtzupdate" type="button" class="btn btn-primary">
						重置
					</button>
					<button id="submityqsbtzupdate" type="button" class="btn btn-primary">
						提交
					</button>
				</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/yqsbtz/yqsbtz.js"></script>
<script type="text/javascript">
	$(function () {
        yqyysyListyqsbtz.setPath("<%=request.getContextPath()%>")
        yqyysyListyqsbtz.init("<%=uuid%>")
    })
</script>


