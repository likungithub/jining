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

										<label class="labelCommon labelBg color666 dateLabel-m">目录名称</label>
										<input type="text" class="inputCommon appsysinfo-m" id="bzwjgl_wjml" placeholder="请输入目录名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>

								</div>


								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="bzwjgl_xinzeng" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>增加</button>
									<button id="bzwjgl_chaxun" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4 reset"><i class="fa fa-refresh iconMr"></i>重置</button>
									<%--<button  class="btn  btnAdd btnBorderColor colorfff borderRadius4 mr pull-left"></i>目录管理</button>
--%>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="bzwjgl_ManagerList_m" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left">文件名称</th>
							<th class="text-left">所属目录</th>
							<th class="text-left">文件版本</th>
							<th class="text-left">受控编号</th>
							<th class="text-left">上传时间</th>
							<th class="text-left">上传人</th>
							<th class="text-left">审核人</th>
							<th class="text-left">审核时间</th>
							<%--<th class="text-left">修订人</th>
							<th class="text-left">修订时间</th>
							<th class="text-left">借阅人</th>
							<th class="text-left">借阅时间</th>
							<th class="text-left">回收人</th>
							<th class="text-left">回收时间</th>--%>
							<th class="text-left">文档说明</th>
							<th width="150px" class="text-center">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 模态框（Modal） 增加数据模块-->
<div class="modal fade" id="bzwjgl_myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title">
					添加文件信息
				</h4>
			</div>
			<div class="modal-body">
				<form  class="form form-horizontal" id="bzwjgl_xinzeng_form" enctype="multipart/form-data">
					<div class="form-body">
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">文件版本&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wjbb" id="xz_wjbb">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">所属目录&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wjml" id="xz_wjml">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">受控编号&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wjbh" id="xz_wjbh" >
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">文档说明&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wdsm" id="xz_wdsm" >
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<input id="file1" type="file" style="display:none" name="file1">
									<div class="input-append">
									<label class="labelCommon labelWidth-col-two color666"><a style="color: black" class="btn" onclick="$('input[id=file1]').click();">选择上传文件</a>&nbsp;&nbsp;</label>
										<input id="photoCover" class="inputCommon inputWidth-col-two" type="text">
									</div>
									<%--<input type="file" name="file1" id="file1">--%>
									<%--	<input type="file" name="file1" id="file1" multiple>--%>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="submit" class="btn btn-primary reset">重置</button>
				<button type="submit" class="btn btn-success" id="bzwjgl_xinzeng_submit">提交</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 模态框（Modal） 编辑数据模块-->
<div class="modal fade" id="bzwjgl_bianji_myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title">
					添加文件信息
				</h4>
			</div>
			<div class="modal-body">
				<form  class="form form-horizontal" id="bzwjgl_bianji_form" >
					<div class="form-body">
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">文件名称&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wjmc" id="wjmc">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">所属目录&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wjml" id="wjml">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">文件版本&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wjbb" id="wjbb">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">受控编号&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wjbh" id="wjbh">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">上传人&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="scr" id="scr">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two labelBg color666 pull-left">
										上传日期
									</label>
									<div class="input-group date dateOfBusiness">
										<input type="text" class="form-control inputCommon" style="border-radius:0 !important;width: 162px;" name="scsj" id="scsj">
										<span class="input-group-btn" style="float: left;">
                            <button class="btn btn-default" type="button" style="border-radius: 0 4px 4px 0!important;height: 33px;">
                                <i class="fa fa-calendar"></i>
                            </button>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">文档说明&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wdsm"  id="wdsm">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666" hidden="hidden">ID&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="id" id="id" hidden="hidden">
								</div>
							</div>
						</div>

					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="submit" class="btn btn-primary reset">重置</button>
				<button type="submit" class="btn btn-success" id="mbzwjgl_bianji_subit">提交</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<script src="<%=request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/bztxgl/bzwjgl.js"></script>
<script>
	bzwjglList.init();
</script>