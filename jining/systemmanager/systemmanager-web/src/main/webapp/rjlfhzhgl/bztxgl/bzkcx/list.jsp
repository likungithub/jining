<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
	.rotate1 {
		transform: rotate(180deg);
	}
	th,td { white-space: nowrap; }
	.dataTables_scrollHead {
		height: 40px;
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
										<label class="labelCommon labelBg color666 dateLabel-m">检测项名称</label>
										<input type="text" class="inputCommon appsysinfo-m" id="bzkcx_jcxmc" placeholder="请输入检测项名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<%--<div class="openMore pull-left" style="margin-bottom: 0px;">
										<div class="date beginTime pull-left">
											<label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">登记日期</label>
											<input type="text" readonly="" class="appsysinfo-m inputCommon " name="gzrstarDate" style="border-radius: 0 !important; width: 100px">
											<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
										</div>
										<span style="float: left;margin: 5px">至</span>
										<div class="input-group date endTime pull-left">
											<input type="text" readonly="" class="inputCommon appsysinfo-m" name="gzrendDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
											<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
										</div>
										<div style="clear: both"></div>
									</div>--%>
								</div>
								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="bzkcx_xinzeng" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>增加</button>
									<button id="bzkcx_chaxun" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="bzkcx_chongzhi" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<button id="bzkcx_daochu" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导出Excel</button>
									<%--<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>下载模板</button>--%>
									<button id="bzkcx_daoru" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导入Excel</button>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="bzkcx_ManagerList_m"  style="width: 400%;">
						<thead>
						<tr class="color333">
							<th width="20px" class="text-left"><input id="bzkcx_checkbox" type="checkbox"></th>
							<th class="text-left">操作</th>
							<th class="text-left">检测项名称</th>
							<th class="text-left">英文名称</th>
							<th class="text-left">判断编号</th>
							<th class="text-left">是否求和判断</th>
							<th class="text-left">营养素参考值</th>
							<th class="text-left">倍率</th>
							<th class="text-left">检测方法</th>
							<th class="text-left">检测依据</th>
							<th class="text-left">检测依据名称</th>
						<%--	<th class="text-left">判定依据</th>
							<th class="text-left">判定依据名称</th>--%>
							<th class="text-left">微生物n值</th>
							<th class="text-left">微生物c值</th>
							<th class="text-left">微生物m值</th>
							<th class="text-left">限量值</th>
							<th class="text-left">限量值默认值</th>
							<th class="text-left">检出限单位</th>
							<th class="text-left">最小允许限</th>
							<th class="text-left">最小允许限单位</th>
							<th class="text-left">最大允许限</th>
							<th class="text-left">最大允许限单位</th>
							<th class="text-left">是否系统判断</th>
							<th class="text-left">是否标准方法</th>
							<th class="text-left">CMA</th>
							<th class="text-left">CMAF</th>
							<th class="text-left">CNAS</th>
							<th class="text-left">CATL</th>
							<th class="text-left">制备质量</th>
							<th class="text-left">制备质量单位</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 模态框（Modal） 增加数据模块-->
<div class="modal fade" id="bzkcx_myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					添加项目信息
				</h4>
			</div>
			<div class="modal-body">
				<form  class="form form-horizontal" id="bzkcx_xinzeng_form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">检测项名称&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="zwmc_bm">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">判断编号&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="pdnh">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">英文名称&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="ywmc">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">是否请求判断&nbsp;&nbsp;</label>
									<select name="if_pd" class="inputCommon inputWidth-col-two">
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%-- <input type="text" class="inputCommon inputWidth-col-two" name="if_pd"  placeholder="1 是 0否">--%>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">倍率&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="bl">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">检测方法&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="jcff">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">检测依据&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="jcyj">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">检测依据名称&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="jcyjmc">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">微生物n值&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wswnz">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">微生物c值&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wswcz">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">微生物m值&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wswmz">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">限量值&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="xlz">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">限量值默认值&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="xlzmrz">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">检出限单位&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="bzffjcxdw">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">最小允许限&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="bzzxyxx">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">最小允许限单位&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="bzzxyxxdw">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">最大允许限&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="bzzdyxx">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">最大允许限单位&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="bzzdyxxdw">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">是否系统判断&nbsp;&nbsp;</label>
									<select name="if_xtpd" class="inputCommon inputWidth-col-two">
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%-- <input type="text" class="inputCommon inputWidth-col-two" name="if_xtpd" placeholder="1 是 0否">--%>
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">是否标准方法&nbsp;&nbsp;</label>
									<select name="if_bzff" class="inputCommon inputWidth-col-two">
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%-- <input type="text" class="inputCommon inputWidth-col-two" name="if_bzff" placeholder="1 是 0否">--%>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">CMA&nbsp;&nbsp;</label>
									<select name="if_cma" class="inputCommon inputWidth-col-two">
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%--  <input type="text" class="inputCommon inputWidth-col-two" name="if_cma" placeholder="1 是 0否">--%>
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">CMAF&nbsp;&nbsp;</label>
									<select name="if_cmaf" class="inputCommon inputWidth-col-two">
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%--  <input type="text" class="inputCommon inputWidth-col-two" name="if_cmaf" placeholder="1 是 0否">--%>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">CNAF&nbsp;&nbsp;</label>
									<select  name="if_cnas" class="inputCommon inputWidth-col-two">
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%-- <input type="text" class="inputCommon inputWidth-col-two" name="if_cnas" placeholder="1 是 0否">--%>
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">CATL&nbsp;&nbsp;</label>、
									<select  name="if_catl" class="inputCommon inputWidth-col-two">
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%-- <input type="text" class="inputCommon inputWidth-col-two" name="if_catl" placeholder="1 是 0否">--%>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">制备质量&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="zbzl">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">制备质量单位&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="zbzldw">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">营养参考价值&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="yyckjz" >
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="submit" class="btn btn-primary reset_dialog">重置</button>
				<button type="submit" class="btn btn-success" id="bzkcx_xinzeng_submit">提交</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<!-- 修改框-->
<div class="modal fade" id="bzkcx_myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel1">
					修改项目信息
				</h4>
			</div>
			<div class="modal-body">
				<form  class="form form-horizontal" id="bzkcx_bianji_form">
					<div class="form-body">
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">检测项名称&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="zwmc_bm" id="bzkcx_zwmc_bm">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">英文名称&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="ywmc" id="bzkcx_ywmc">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">是否请求判断&nbsp;&nbsp;</label>
									<select name="if_pd" id="bzkcx_if_pd" class="inputCommon inputWidth-col-two">
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%-- <input type="text" class="inputCommon inputWidth-col-two" name="if_pd" id="if_pd" placeholder="1 是 0否">--%>
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">营养参考价值&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="yyckjz" id="bzkcx_yyckjz" >
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">倍率&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="bl" id="bzkcx_bl">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">检测方法&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="jcff" id="bzkcx_jcff">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">检测依据&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="jcyj" id="bzkcx_jcyj">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">检测依据名称&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="jcyjmc" id="bzkcx_jcyjmc">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">微生物n值&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wswnz" id="bzkcx_wswnz">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">微生物c值&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wswcz" id="bzkcx_wswcz">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">微生物m值&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="wswmz" id="bzkcx_wswmz">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">限量值&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="xlz" id="bzkcx_xlz">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">限量值默认值&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="xlzmrz" id="bzkcx_xlzmrz">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">检出限单位&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="bzffjcxdw" id="bzkcx_bzffjcxdw">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">最小允许限&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="bzzxyxx" id="bzkcx_bzzxyxx">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">最小允许限单位&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="bzzxyxxdw" id="bzkcx_bzzxyxxdw">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">最大允许限&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="bzzdyxx" id="bzkcx_bzzdyxx">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">最大允许限单位&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="bzzdyxxdw" id="bzkcx_bzzdyxxdw">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">是否系统判断&nbsp;&nbsp;</label>
									<select name="if_xtpd" id="bzkcx_if_xtpd" class="inputCommon inputWidth-col-two" placeholder="1 是 0否">
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%-- <input type="text" class="inputCommon inputWidth-col-two" name="if_xtpd" id="if_xtpd" placeholder="1 是 0否">--%>
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">是否标准方法&nbsp;&nbsp;</label>
									<select name="if_bzff" id="bzkcx_if_bzff" class="inputCommon inputWidth-col-two">
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%--   <input type="text" class="inputCommon inputWidth-col-two" name="if_bzff" id="if_bzff" placeholder="1 是 0否">--%>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">CMA&nbsp;&nbsp;</label>
									<select name="if_cma" id="bzkcx_if_cma" class="inputCommon inputWidth-col-two">
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%--  <input type="text" class="inputCommon inputWidth-col-two" name="if_cma" id="if_cma" placeholder="1 是 0否">--%>
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">CMAF&nbsp;&nbsp;</label>
									<select name="if_cmaf" id="bzkcx_if_cmaf" class="inputCommon inputWidth-col-two" >
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%-- <input type="text" class="inputCommon inputWidth-col-two" name="if_cmaf" id="if_cmaf" placeholder="1 是 0否">--%>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">CNAS&nbsp;&nbsp;</label>
									<select name="if_cnas" id="bzkcx_if_cnas" class="inputCommon inputWidth-col-two" >
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%-- <input type="text" class="inputCommon inputWidth-col-two" name="if_cnas" id="if_cnas" placeholder="1 是 0否">--%>
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">CATL&nbsp;&nbsp;</label>
									<select name="if_catl" id="bzkcx_if_catl" class="inputCommon inputWidth-col-two">
										<option value=""></option>
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
									<%--     <input type="text" class="inputCommon inputWidth-col-two" name="if_catl" id="if_catl" placeholder="1 是 0否">--%>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">制备质量&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="zbzl" id="bzkcx_zbzl">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">制备质量单位&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="zbzldw" id="bzkcx_zbzldw">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">检测ID&nbsp;&nbsp;</label>
									<input type="text" readonly="readonly" class="inputCommon inputWidth-col-two" name="id" id="bzkcx_id">
								</div>
							</div>
							<div class="col-md-6 col-xs-6">
								<div class="form-group">
									<label class="labelCommon labelWidth-col-two color666">判断编号&nbsp;&nbsp;</label>
									<input type="text" class="inputCommon inputWidth-col-two" name="pdnh" id="bzkcx_pdnh">
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="submit" class="btn btn-primary reset_dialog">重置</button>
				<button type="submit" class="btn btn-success" id="bzkcx_bianji_submit">提交</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/bztxgl/bzkcx.js"></script>
<script>
	bzkcxList.init();
</script>