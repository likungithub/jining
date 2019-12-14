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
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">名称</label>
										<input type="text" class="inputCommon appsysinfo-m" name="name" placeholder="请输入名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
								</div>
								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="<%=uuid%>dzbglSeatch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="<%=uuid%>resetdzbgl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<%--<button id="<%=uuid%>adddzbgl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>--%>
									<button id="<%=uuid%>adddzbgl2" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>
									<button id="<%=uuid%>deletedzbgl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>删除</button>
									<%--<button id="<%=uuid%>updatedzbgl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>修改</button>--%>
									<button id="<%=uuid%>fczzdzbgl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>文件管理</button>
									<%--<button id="<%=uuid%>xxyddzbgl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>学习园地</button>--%>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<form id="<%=uuid%>dzbxx">
					<table class="table table-striped table-hover paramsTab" id="dzbgldzbgl" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left"><input type="checkbox" name = "dzbglck"></th>
							<th class="text-left">姓名</th>
							<th class="text-left">性别</th>
							<th class="text-left">出生年月</th>
							<th class="text-left">民族</th>
							<th class="text-left">参加工作时间</th>
							<th class="text-left">入党时间</th>
							<th class="text-left">行政职务</th>
							<th class="text-left">党内职务</th>
							<th class="text-left">籍贯</th>
							<th class="text-left">文化程度</th>
							<th class="text-left">备注</th>

						</tr>
						</thead>
					</table>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 新增模态框（Modal） -->
<div class="modal fade" id="<%=uuid%>myModaldzbgl" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
	<div class="modal-dialog  modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabeldzbgl">
					新增党员信息
				</h4>
			</div>
			<form id="<%=uuid%>dzbgl_from">
				<div class="modal-body">
					<table>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="dzbgl1" name="name" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<select id="dzbgl2" name="sex" class="form-control" style="width: 200px">
									<option value=""></option>
									<option value="1">男</option>
									<option value="0">女</option>
								</select>
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>出生年月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="dzbgl3" name="csrq" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>民族&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="dzbgl4" name="mz" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>参加工作时间</label></span>
								<input id="dzbgl5" name="gzsj" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>入党时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="dzbgl6" name="rdsj" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>行政职务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="dzbgl7" name="dnzw" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>党内职务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="dzbgl8" name="dnzw1" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>籍贯&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="dzbgl9" name="jg" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>文化程度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="dzbgladd10" name="whcd" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>备注信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="dzbgladd11" name="bzxx" type="text" class="form-control">
							</div></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" id="dzbglgb" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button id="dzbglcz" type="button" class="btn btn-primary">
						重置
					</button>
					<button id="dzbglsubmit" type="button" class="btn btn-primary">
						提交
					</button>
				</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<!-- 修改模态框（Modal） -->
<div class="modal fade" id="<%=uuid%>myModaldzbglupdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
	<div class="modal-dialog  modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabeldzbglupdate">
					修改党员信息
				</h4>
			</div>
			<form id="<%=uuid%>dzbglupdate_from">
				<div class="modal-body">
					<table>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updatedzbgl1" name="name" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<select id="updatedzbgl2" name="sex" class="form-control" style="width: 220.91px">
									<option value="1" <c:if test="${'1' eq sex}">selected</c:if>>男</option>
									<option value="0" <c:if test="${'0' eq sex}">selected</c:if>>女</option>
								</select>
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>出生年月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updatedzbgl3" name="csrq" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>民族&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updatedzbgl4" name="mz" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>参加工作时间</label></span>
								<input id="updatedzbgl5" name="gzsj" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>入党时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updatedzbgl6" name="rdsj" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>行政职务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updatedzbgl7" name="dnzw" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>党内职务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updatedzbgl9" name="dnzw1" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>文化程度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updatedzbgl11" name="whcd" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>备注信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updatedzbgl12" name="bzxx" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>籍贯&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updatedzbgl10" name="jg" type="text" class="form-control">
							</div></td>
							<td></td>
							<td hidden><div class="form-group input-group">
								<span class="input-group-addon"><label>ID</label></span>
								<input id="updatedzbgl8" name="id" type="text" class="form-control" hidden>
							</div></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" id="dzbglupgb" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button id="dzbglupcz" type="button" class="btn btn-primary">
						重置
					</button>
					<button id="dzbglupsubmit" type="button" class="btn btn-primary">
						提交
					</button>
				</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/dzbgl/dzbgl.js"></script>
<script src="<%=request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script type="text/javascript">
    $(function () {
        yqyysyListdzbgl.setPath("<%=request.getContextPath()%>")
        yqyysyListdzbgl.init("<%=uuid%>");
    })
</script>
