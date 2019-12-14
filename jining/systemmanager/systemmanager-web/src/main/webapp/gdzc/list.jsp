<%@page import="java.util.UUID"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/multiple_select/multiple-select.css"/>

<style>
 .rotate1 {
		atetransform: rotate(180deg);
	}
 .form_width {
	 width: 100%;
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
											<label class="labelCommon labelBg color666 dateLabel-m">资产编码</label>
											<input type="text" class="inputCommon appsysinfo-m" id="gdzcbm" name="gdzcbm" placeholder="请输入固定资产编码" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
										</div>
										<%--<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">--%>
											<%--<label class="labelCommon labelBg color666 dateLabel-m">受控编号</label>--%>
											<%--<input type="text" class="inputCommon appsysinfo-m" id="skbh" name="skbh" placeholder="请输入受控编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />--%>
										<%--</div>--%>
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
									<%--<button id="yqsbtzDaochu" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导出</button>--%>
									<%--<button id="yqsbtzDaoru" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导入</button>--%>

									<button id="gdzcAddnew" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>
									<button id="gdzcUpdatenew" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>修改</button>
									<button id="yqsbtzShan" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>删除</button>
									<%--<button id="yqsbtzfswjxx" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>维检消息</button>--%>
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
							<th class="text-left">资产编码</th>
							<th class="text-left">财务编码</th>
							<th class="text-left">资产大类</th>
							<th class="text-left">资产细类</th>
							<th class="text-left">名称</th>
							<th class="text-left">规格型号</th>
							<th class="text-left">生产厂家</th>
							<th class="text-left">厂家电话</th>
							<th class="text-left">单位</th>
							<th class="text-left">数量</th>
							<th class="text-left">单价</th>
							<th class="text-left">小计</th>
							<th class="text-left">所在楼层</th>
							<th class="text-left">科室</th>
							<th class="text-left">办公室</th>
							<th class="text-left">房间号</th>
							<th style="width: 0px;" class="text-left"></th>
							<th class="text-left">是否绑定</th>
							<th class="text-left">备注</th>
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
					新增固定资产
				</h4>
			</div>
			<form id="<%=uuid%>addYqsbtz_from">
				<div class="modal-body">
					<table style="width: 100%">
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>固定资产编码</label></span>
								<input name="gdzcbm" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>财务编码</label></span>
								<input name="cwbm" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>资产大类</label></span>
								<select name="zcdl" class="form-control">
									<option value="资产大类1">资产大类1</option>
									<option value="资产大类2">资产大类2</option>
									<option value="资产大类3">资产大类3</option>
									<option value="资产大类4">资产大类4</option>
									<option value="资产大类5">资产大类5</option>
									<option value="资产大类6">资产大类6</option>
								</select>
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>资产细类</label></span>
								<select name="zcxl" class="form-control">
									<option value="资产细类1">资产细类1</option>
									<option value="资产细类2">资产细类2</option>
									<option value="资产细类3">资产细类3</option>
									<option value="资产细类4">资产细类4</option>
									<option value="资产细类5">资产细类5</option>
									<option value="资产细类6">资产细类6</option>
								</select>
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>名称</label></span>
								<input name="gdzcmc" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>规格型号</label></span>
								<input name="ggxh" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>生产厂家</label></span>
								<input name="sccj" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>厂家电话</label></span>
								<input name="cjdh" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>单位</label></span>
								<input name="dw" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>数量</label></span>
								<input name="sl" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>单价</label></span>
								<input name="dj" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>小计</label></span>
								<input name="xj" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>所在楼层</label></span>
								<input name="szlc" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>科室</label></span>
								<input name="ks" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>办公室</label></span>
								<input name="bgs" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>房间号</label></span>
								<input name="fjh" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>使用人</label></span>
								<select name="syry" id="syry" multiple="multiple">
								</select>
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>是否绑定</label></span>
								<select name="isbd" class="form-control">
									<option value="否">否</option>
									<option value="是">是</option>
								</select>
							</div></td>
						</tr>
						<tr>
							<td colspan="3"><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>备注信息</label></span>
								<input name="bz" type="text" class="form-control">
							</div></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" id="gbyqsbtz" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button id="submityqsbtz" type="button" class="btn btn-primary">
						保存
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
					<input type="hidden" id="id" name="id">
					<table style="width: 100%">
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>固定资产编码</label></span>
								<input id="ins1" name="gdzcbm" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>财务编码</label></span>
								<input id="ins2" name="cwbm" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>资产大类</label></span>
								<select id="ins3" name="zcdl" class="form-control">
									<option value="资产大类1">资产大类1</option>
									<option value="资产大类2">资产大类2</option>
									<option value="资产大类3">资产大类3</option>
									<option value="资产大类4">资产大类4</option>
									<option value="资产大类5">资产大类5</option>
									<option value="资产大类6">资产大类6</option>
								</select>
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>资产细类</label></span>
								<select id="ins4" name="zcxl" class="form-control">
									<option value="资产细类1">资产细类1</option>
									<option value="资产细类2">资产细类2</option>
									<option value="资产细类3">资产细类3</option>
									<option value="资产细类4">资产细类4</option>
									<option value="资产细类5">资产细类5</option>
									<option value="资产细类6">资产细类6</option>
								</select>
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>名称</label></span>
								<input id="ins5" name="gdzcmc" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>规格型号</label></span>
								<input id="ins6" name="ggxh" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>生产厂家</label></span>
								<input id="ins7" name="sccj" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>厂家电话</label></span>
								<input id="ins8" name="cjdh" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>单位</label></span>
								<input id="ins9" name="dw" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>数量</label></span>
								<input id="ins10" name="sl" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>单价</label></span>
								<input id="ins11" name="dj" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>小计</label></span>
								<input id="ins12" name="xj" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>所在楼层</label></span>
								<input id="ins13" name="szlc" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>科室</label></span>
								<input id="ins14" name="ks" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>办公室</label></span>
								<input id="ins15" name="bgs" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>房间号</label></span>
								<input id="ins16" name="fjh" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>使用人</label></span>
								<select name="syry" id="ins17" multiple="multiple">
								</select>
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>是否绑定</label></span>
								<select id="ins18" name="isbd" class="form-control">
									<option value="否">否</option>
									<option value="是">是</option>
								</select>
							</div></td>
						</tr>
						<tr>
							<td colspan="3"><div class="form-group input-group form_width">
								<span class="input-group-addon"><label>备注信息</label></span>
								<input id="ins19" name="bz" type="text" class="form-control">
							</div></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" id="gbyqsbtzupdate" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button id="submityqsbtzupdate" type="button" class="btn btn-primary">
						提交
					</button>
				</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<script src="<%=request.getContextPath()%>/assets/pages/multiple_select/multiple-select.js"
		type="text/javascript"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/gdzc/gdzclist.js"></script>
<script type="text/javascript">
	$(function () {
        gdzcListy.setPath("<%=request.getContextPath()%>")
        gdzcListy.init("<%=uuid%>")
    })
</script>


