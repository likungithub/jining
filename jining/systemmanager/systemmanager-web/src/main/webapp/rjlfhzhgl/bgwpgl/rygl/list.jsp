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
									<button id="<%=uuid%>ryglSeatch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="<%=uuid%>resetdrygl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button id="<%=uuid%>adddrygl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>
									<button id="<%=uuid%>deletedrygl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>删除</button>
									<button id="<%=uuid%>updatedrygl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>修改</button>
									<%--<button id="<%=uuid%>xxydrygl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>学习园地</button>--%>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<form id="<%=uuid%>ryxx">
					<table class="table table-striped table-hover paramsTab" id="ryglrygl" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left"><input type="checkbox" name = "ryglck"></th>
							<th class="text-left">姓名</th>
							<th class="text-left">性别</th>
							<th class="text-left">出生日期</th>
							<th class="text-left">民族</th>
							<th class="text-left">籍贯</th>
							<th class="text-left">政治面貌</th>
							<th class="text-left">常住地址</th>
							<th class="text-left">联系方式</th>
							<th class="text-left">所属科室</th>
							<th class="text-left">职称</th>
							<th class="text-left">婚姻状况</th>
							<th class="text-left">初始学历</th>
							<th class="text-left">现有学历</th>
							<th class="text-left">毕业院校</th>
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
<div class="modal fade" id="<%=uuid%>myModalrygl" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
	<div class="modal-dialog  modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabelrygl">
					新增人员信息
				</h4>
			</div>
			<form id="<%=uuid%>rygl_from">
				<div class="modal-body">
					<table>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="rygl1" name="name" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<select id="hclx1" name="sex" class="form-control" style="width: 200px">
									<option value="1">男</option>
									<option value="0">女</option>
								</select>
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>出生日期</label></span>
								<input id="rygl3" name="csrq" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>民族&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="rygl4" name="mz" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>籍贯&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="rygl5" name="jg" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>政治面貌</label></span>
								<input id="rygl6" name="zzmm" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>常住地址</label></span>
								<input id="rygl7" name="czdz" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>联系方式</label></span>
								<input id="rygl8" name="lxfs" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>所属科室</label></span>
								<input id="rygl9" name="ssks" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>职称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="rygl10" name="zc" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>婚姻状况</label></span>
								<select id="rygl11" name="hyzk" class="form-control" style="width: 200px">
									<option value="1">已婚</option>
									<option value="0">未婚</option>
								</select>
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>初始学历</label></span>
								<input id="rygl12" name="csxl" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>现有学历</label></span>
								<input id="rygl13" name="xyxl" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>毕业院校</label></span>
								<input id="rygl14" name="byyx" type="text" class="form-control">
							</div></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" id="ryglgb" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button id="ryglcz" type="button" class="btn btn-primary">
						重置
					</button>
					<button id="ryglsubmit" type="button" class="btn btn-primary">
						提交
					</button>
				</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<!-- 修改模态框（Modal） -->
<div class="modal fade" id="<%=uuid%>myModalryglupdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
	<div class="modal-dialog  modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabelryglupdate">
					修改人员信息
				</h4>
			</div>
			<form id="<%=uuid%>ryglupdate_from">
				<div class="modal-body">
					<table>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updaterygl1" name="name" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<select id="updaterygl2" name="sex" class="form-control" style="width: 220.91px">
									<option value="1" <c:if test="${'1' eq sex}">selected</c:if>>男</option>
									<option value="0" <c:if test="${'0' eq sex}">selected</c:if>>女</option>
								</select>
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>出生日期</label></span>
								<input id="updaterygl3" name="csrq" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>民族&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updaterygl4" name="mz" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>籍贯&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updaterygl5" name="jg" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>政治面貌</label></span>
								<input id="updaterygl6" name="zzmm" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>常住地址</label></span>
								<input id="updaterygl7" name="czdz" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>联系方式</label></span>
								<input id="updaterygl8" name="lxfs" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>所属科室</label></span>
								<input id="updaterygl9" name="ssks" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>职称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="updaterygl10" name="zc" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>婚姻状况</label></span>
								<select id="updaterygl12" name="hyzk" class="form-control" style="width: 220.91px">
									<option value="1" <c:if test="${'1' eq sex}">selected</c:if>>已婚</option>
									<option value="0" <c:if test="${'0' eq sex}">selected</c:if>>未婚</option>
								</select>
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>初始学历</label></span>
								<input id="updaterygl13" name="csxl" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>现有学历</label></span>
								<input id="updaterygl14" name="xyxl" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>毕业院校</label></span>
								<input id="updaterygl15" name="byyx" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>ID</label></span>
								<input id="updaterygl11" name="id" type="text" class="form-control" readonly>
							</div></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" id="ryglupgb" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button id="ryglupcz" type="button" class="btn btn-primary">
						重置
					</button>
					<button id="ryglupsubmit" type="button" class="btn btn-primary">
						提交
					</button>
				</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/rygl/rygl.js"></script>
<script src="<%=request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script type="text/javascript">
    //日期插件
    $("#rygl3").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
    $("#updaterygl3").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
</script>
<script type="text/javascript">
    $(function () {
        yqyysyListrygl.setPath("<%=request.getContextPath()%>")
        yqyysyListrygl.init("<%=uuid%>");
    })
</script>
