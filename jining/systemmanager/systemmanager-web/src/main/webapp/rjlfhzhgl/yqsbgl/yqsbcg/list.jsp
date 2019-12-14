<%@page import="java.util.UUID"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
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
<div class="row contentBgColor" id="yqsbcg0-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

										<label class="labelCommon labelBg color666 dateLabel-m">采购名称</label>
										<input type="text" class="inputCommon appsysinfo-m" id="cgmc" name="cgmc" placeholder="请输入仪器名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<%--<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

										<label class="labelCommon labelBg color666 dateLabel-m">仪器种类</label>
										<select id="selectType2" style="width:140px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
								    border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
								    border-bottom-right-radius: 4px !important;">
											<option value="000">请选择仪器种类</option>

										</select>

									</div>--%>
								</div>
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<%--<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

										<label class="labelCommon labelBg color666 dateLabel-m">申请人</label>
										<input type="text" class="inputCommon appsysinfo-m" id="sqr" name="sqr" placeholder="请输入仪申请人" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>--%>
									<%--<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

										<label class="labelCommon labelBg color666 dateLabel-m">申请部门</label>
										<select  style="width:140px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
								    border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
								    border-bottom-right-radius: 4px !important;">
											<option value="000">请选择申请部门</option>

										</select>

									</div>--%>
								</div>

								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="seatchyq" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="resetyq" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button id="submityq" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>
									<button id="bfsubyq" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>删除</button>
									<button id="updateyq" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>修改</button>
									<button id="cgsqsubmit" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>提交</button>
									<button id="yqcgsqDaoRu"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>批量导入</button>
									<button id="cgddy"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>打印</button>
                                    <%--<button id="CgAndRk"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>采购并入库</button>--%>
                                </div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<form id="yqsbcgsq_form">
					<table class="table table-striped table-hover paramsTab" id="ManagerList_yqsbcg" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left"><input type="checkbox" name="ckq"></th>
							<th class="text-left">采购名称</th>
							<th class="text-left">品牌</th>
							<th class="text-left">数量</th>
							<th class="text-left">报价</th>
							<th class="text-left">种类</th>
							<th class="text-left">型号</th>
							<th class="text-left">申请人</th>
							<th class="text-left">申请部门</th>
							<th class="text-left">申请日期</th>
							<th class="text-left">用途</th>
							<th class="text-left">备注信息</th>
							<th class="text-left">提交状态</th>
							<%--<th width="150px" class="text-center">操作</th>--%>
						</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
<%--修改模态框--%>
<div class="modal fade" id="myModalyqsbcgupdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
	<div class="modal-dialog  modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel21">
					修改采购申请
				</h4>
			</div>
			<form id="updateyqsbcg_form">
				<div class="modal-body">
					<table>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>采购名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="ins1" name="cgmc" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="ins2" name="pp" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="ins3" name="sl" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>报&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="ins4" name="bj" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>种&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<%--<input id="in5" name="dw" type="text" class="form-control">--%>
								<input id="ins5" name="zl" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="ins6" name="xh" type="text" class="form-control">
							</div></td>
						</tr>
						<%--<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>申请人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="ins7" name="sqr" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>申请部门&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="ins8" name="sqbm" type="text" class="form-control">
							</div></td>
						</tr>--%>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;途&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="ins9" name="yt" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>备注信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="ins10" name="bzxx" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>申请ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="ins11" name="id" type="text" class="form-control" readonly>
							</div></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" id="gbcgsqclo1" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button id="bucgsqre1" type="button" class="btn btn-primary">
						重置
					</button>
					<button id="bucgsqtiji1" type="button" class="btn btn-primary">
						提交
					</button>
				</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<%--新增模态框--%>
<div class="modal fade" id="myModalyqsbcg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
	<div class="modal-dialog  modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel2">
					新增采购申请
				</h4>
			</div>
			<form id="addyqsbcg_form">
				<div class="modal-body">
					<table>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>采购名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="in1" name="cgmc" type="text" class="form-control">
							</div></td>
							<td></td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="in2" name="pp" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="in3" name="sl" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>报&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="in4" name="bj" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>种&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<%--<input id="in5" name="dw" type="text" class="form-control">--%>
								<input id="in5" name="zl" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;</td>
							<td><div class="form-group input-group"><%--<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date()) %>--%>
								<span class="input-group-addon"><label>申请日期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="in6" name="sqrq" type="text" class="form-control" value="<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date())%>" readonly>
							</div></td>
						</tr>
						<tr>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="in7" name="xh" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;</td>
							<%--<td><div class="form-group input-group">
								<span class="input-group-addon"><label>申请人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="in8" name="sqr" type="text" class="form-control">
							</div></td>--%>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;途&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="in12" name="yt" type="text" class="form-control">
							</div></td>
						</tr>
						<tr>
							<%--<td><div class="form-group input-group">
								<span class="input-group-addon"><label>申请部门&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="in11" name="sqbm" type="text" class="form-control">
							</div></td>
							<td>&nbsp;&nbsp;</td>
							<td><div class="form-group input-group">
								<span class="input-group-addon"><label>用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;途&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="in12" name="yt" type="text" class="form-control">
							</div></td>--%>
								<td><div class="form-group input-group">
									<span class="input-group-addon"><label>备注信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
									<input id="in13" name="bzxx" type="text" class="form-control">
								</div></td>
						</tr>
						<%--<tr>
							&lt;%&ndash;<td><div class="form-group input-group">
								<span class="input-group-addon"><label>备注信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="in13" name="bzxx" type="text" class="form-control">
							</div></td>&ndash;%&gt;
						</tr>--%>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" id="gbcgsqclo" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button id="bucgsqre" type="button" class="btn btn-primary">
						重置
					</button>
					<button id="bucgsqtiji" type="button" class="btn btn-primary">
						提交
					</button>
				</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/yqsbcg/yqsbcg.js"></script>
<%--
<script type="text/javascript">
    $(function() {
        yqyysyList1yqsbcg.setPath("<%= request.getContextPath()%>");
        yqyysyList1yqsbcg.init('<%=uuid%>');
    });
</script>--%>
