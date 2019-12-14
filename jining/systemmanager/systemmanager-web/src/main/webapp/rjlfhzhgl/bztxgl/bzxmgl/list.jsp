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
<div class="row contentBgColor">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">委托合同</label>
										<input type="text" class="inputCommon appsysinfo-m" id="bzxmgl_htmc" placeholder="请输入委托合同名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
										<input type="text" class="inputCommon appsysinfo-m" id="bzxmgl_ypmc" placeholder="请输入仪器名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="openMore pull-left" style="margin-bottom: 0px;">
										<div class="date beginTime pull-left">
											<label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">检测日期</label>
											<input type="text"  class="appsysinfo-m inputCommon " id="bzxmgl_startDate" style="border-radius: 0 !important; width: 100px">
											<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
										</div>
										<span style="float: left;margin: 5px">至</span>
										<div class="input-group date endTime pull-left">
											<input type="text"  class="inputCommon appsysinfo-m" id="bzxmgl_endDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
											<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
										</div>
										<div style="clear: both"></div>
									</div>
								</div>


								<!--按钮  begin-->
								<div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
									<button id="bzxmgl_chaxun" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button id="bzxmgl_chongzhi" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
								<%--	<button id="bzxmgl_xinzeng" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增分析项目</button>--%>
								<%--	<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>维护分析项目</button>
									<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导出Excel</button>
									<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>下载模板</button>
									<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导入Excel</button>--%>
								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-bordered table-hover" id="bzxmgl_ManagerList_m" style="width: 400%;">
						<thead>
						<tr class="color333">
                            <th class="text-left">操作</th>
							<th class="text-left">样品名称</th>
							<th class="text-left">样品编号</th>
							<th class="text-left">检测项名称</th>
							<th class="text-left">英文名称</th>
							<th class="text-left">检测日期</th>
							<th class="text-left">判断编号</th>
							<th class="text-left">是否求和判断</th>
							<th class="text-left">营养素参考值</th>
							<th class="text-left">倍率</th>
							<th class="text-left">检测方法</th>
							<th class="text-left">检测依据</th>
							<th class="text-left">检测依据名称</th>
							<%--<th class="text-left">判定依据</th>
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
							<th class="text-left">CAL</th>
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
<div class="modal fade" id="bzxmgl_myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                <form  class="form form-horizontal" id="bzxmgl_xinzeng_form">
                    <div class="form-body">
                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">产品名称&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" placeholder="请输入产品名称" name="ypmc">
                                </div>
                            </div>
                            <div class="col-md-6  col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">中文名称及编号&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" placeholder="请输入中文名称及编号" name="ypbm">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">项目别名&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="zwmc_bm">
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two labelBg color666 pull-left">
                                       检测日期
                                    </label>
                                    <div class="input-group date dateOfBusiness">
                                        <input type="text" class="form-control inputCommon" style="border-radius:0 !important;width: 162px;" name="rq" id="bzxmgl_rq">
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
                                    <label class="labelCommon labelWidth-col-two color666">英文名称&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="ywmc">
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
                                    <label class="labelCommon labelWidth-col-two color666">是否求和判断&nbsp;&nbsp;</label>
                                    <select name="if_pd" class="inputCommon inputWidth-col-two">
                                        <option value=""></option>
                                        <option value="是">是</option>
                                        <option value="否">否</option>
                                    </select>
                                   <%-- <input type="text" class="inputCommon inputWidth-col-two" name="if_pd"  placeholder="1 是 0否">--%>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">营养参考价值&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="yyckjz" >
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
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="submit" class="btn btn-primary reset_dialog">重置</button>
                <button type="submit" class="btn btn-success" id="bzxmgl_xinzeng_submit">提交</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<div class="modal fade" id="bzxmgl_myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                <form  class="form form-horizontal" id="bzxmgl_bianji_form">
                    <div class="form-body">
                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">产品名称&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" placeholder="请输入产品名称" name="ypmc" id="ypmc">
                                </div>
                            </div>
                            <div class="col-md-6  col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">中文名称及编号&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" placeholder="请输入中文名称及编号" name="ypbm" id="ypbm">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">项目别名&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="zwmc_bm" id="zwmc_bm">
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two labelBg color666 pull-left">
                                        检测日期
                                    </label>
                                    <div class="input-group date dateOfBusiness">
                                        <input type="text" class="form-control inputCommon" style="border-radius:0 !important;width: 162px;" name="rq" id="rq">
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
                                    <label class="labelCommon labelWidth-col-two color666">英文名称&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="ywmc" id="ywmc">
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">判断编号&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="pdnh" id="pdnh">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">是否请求判断&nbsp;&nbsp;</label>
                                    <select name="if_pd" id="if_pd" class="inputCommon inputWidth-col-two">
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
                                    <input type="text" class="inputCommon inputWidth-col-two" name="yyckjz" id="yyckjz" >
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">倍率&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="bl" id="bl">
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">检测方法&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="jcff" id="jcff">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">检测依据&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="jcyj" id="jcyj">
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">检测依据名称&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="jcyjmc" id="jcyjmc">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">微生物n值&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="wswnz" id="wswnz">
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">微生物c值&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="wswcz" id="wswcz">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">微生物m值&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="wswmz" id="wswmz">
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">限量值&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="xlz" id="xlz">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">限量值默认值&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="xlzmrz" id="xlzmrz">
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">检出限单位&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="bzffjcxdw" id="bzffjcxdw">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">最小允许限&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="bzzxyxx" id="bzzxyxx">
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">最小允许限单位&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="bzzxyxxdw" id="bzzxyxxdw">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">最大允许限&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="bzzdyxx" id="bzzdyxx">
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">最大允许限单位&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="bzzdyxxdw" id="bzzdyxxdw">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">是否系统判断&nbsp;&nbsp;</label>
                                    <select name="if_xtpd" id="if_xtpd" class="inputCommon inputWidth-col-two" placeholder="1 是 0否">
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
                                    <select name="if_bzff" id="if_bzff" class="inputCommon inputWidth-col-two">
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
                                    <select name="if_cma" id="if_cma" class="inputCommon inputWidth-col-two">
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
                                    <select name="if_cmaf" id="if_cmaf" class="inputCommon inputWidth-col-two" >
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
                                    <select name="if_cnas" id="if_cnas" class="inputCommon inputWidth-col-two" >
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
                                    <select name="if_catl" id="if_catl" class="inputCommon inputWidth-col-two">
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
                                    <input type="text" class="inputCommon inputWidth-col-two" name="zbzl" id="zbzl">
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">制备质量单位&nbsp;&nbsp;</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="zbzldw" id="zbzldw">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-xs-6">
                                <div class="form-group">
                                    <label class="labelCommon labelWidth-col-two color666">检测ID&nbsp;&nbsp;</label>
                                    <input type="text" readonly="readonly" class="inputCommon inputWidth-col-two" name="yjid" id="yjid">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="submit" class="btn btn-primary reset_dialog">重置</button>
                <button type="submit" class="btn btn-success" id="bzxmgl_bianji_submit">提交</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/bztxgl/bzxmgl.js"></script>
<script src="<%=request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script>
	bzxmgllist.init();
</script>