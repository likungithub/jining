<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
 .rotate1 {
		transform: rotate(180deg);
	}
 .modal-content{
     width:730px;
 }
 #user-form-datas	.labelWidth-col-two{
     width: 110px!important;}
</style>
<%
String uuid = UUID.randomUUID().toString();
%>
<%
    java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    String txtDate = format.format(currentTime); //将日期时间格局化
%>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/ygsbgl/yqwxsq/add_yqwxsq.js"></script>

<div class="row contentBgColor" id="manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 5px 10px;">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="margin-bottom: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
								<div style="clear:both;overflow: hidden;margin-top: 5px;">
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">仪器名称</label>
										<input type="text" class="inputCommon appsysinfo-m" name="wtdwmc" placeholder="请输入仪器名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>
									<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
										<label class="labelCommon labelBg color666 dateLabel-m">维护周期</label>
										<input type="text" class="inputCommon appsysinfo-m" name="wtdwmc" placeholder="请输入申请人名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
									</div>

									<div class="openMore pull-left" style="margin-bottom: 0px;">
										<div class="date beginTime pull-left">
											<label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">维护日期</label>
											<input type="text" readonly="" class="appsysinfo-m inputCommon " name="gzrstarDate" style="border-radius: 0 !important; width: 100px" id="stardate">
											<span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
										</div>
										<span style="float: left;margin: 5px">至</span>
										<div class="input-group date endTime pull-left">
											<input type="text" readonly="" class="inputCommon appsysinfo-m" name="gzrendDate" style="border-radius: 4px 0 0 4px!important;width: 100px" id="enddate">
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
									<button  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
									<button  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
									<%--<button  class="btn  btnAdd btnBorderColor colorfff borderRadius4 mr pull-left"></i>提交</button>--%>
									<button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导出</button>

								</div>
								<!--按钮  end-->
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="ManagerList_m" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left">名称</th>
							<th class="text-left">生产日期</th>
							<th class="text-left">设备名称</th>
							<th class="text-left">维护人</th>
							<th class="text-left">维护日期</th>
							<th class="text-left">维护内容</th>
							<th class="text-left">状态</th>
							<th class="text-left">备注信息</th>
						    <th width="150px" class="text-center">操作</th>
						</tr>
						</thead>
						<tbody class="table_tbody">
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script>
    //执行一个laydate实例
    laydate.render({
        elem: '#whrq' //指定元素
    });
    laydate.render({
        elem: '#in2' //指定元素
    });
    laydate.render({
        elem: '#stardate' //指定元素
    });
    laydate.render({
        elem: '#enddate' //指定元素
    });

</script>
<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel12">样品维护记录</h4>
            </div>
            <div class="modal-body">

                <form action="#" class="form form-horizontal" id="addUser-form-datas">
                <div class="form-body">
                    <div class="row">
                        <div class="col-md-6  col-xs-6">
                            <div class="form-group">
                                <label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>维修单号&nbsp;&nbsp;</label>
                                <input type="text" class="inputCommon inputWidth-col-two" placeholder="请输入6-20位字母和数字" name="id" id="dh">
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-6">
                            <div class="form-group">
                                <label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>仪器名称</label>
                                <input type="text" class="inputCommon inputWidth-col-two" placeholder="显示仪器名称 设置为只读属性" name="name" id="mc">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-xs-6">
                            <div class="form-group">
                                <label class="labelCommon labelWidth-col-two labelBg color666 pull-left">
                                    申请维修日期
                                </label>
                                <div class="input-group date dateOfBusiness">
                                    <input type="text" readonly value="<%=txtDate%>" class="form-control inputCommon" style="border-radius:0 !important;width: 162px;" name="sqrq" id="sqrq">
                                    <span class="input-group-btn" style="float: left;">
                            <button class="btn btn-default" type="button" style="border-radius: 0 4px 4px 0!important;height: 33px;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-6">
                            <div class="form-group">
                                <div class="date addBirthDay pull-left mr">
                                    <label class="labelCommon labelWidth-col-two color666">维修日期</label>
                                    <input type="text" readonly class="appsysinfo-m inputCommon " name="whrq" id="whrq" style="width: 160px!important;border-radius: 0 !important;">
                                    <span>
	                          <button class="btn btn-default appsysinfobtn-m" type="button" style="border-radius: 0 4px 4px 0!important;height: 33px;border-left: none">
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
                                <label class="labelCommon labelWidth-col-two color666">维修人&nbsp;&nbsp;</label>
                                <input type="text" class="inputCommon inputWidth-col-two" name="whr" placeholder="使用登陆人ID" id="whr">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-xs-6">
                            <div class="form-group">
                                <label class="labelCommon labelWidth-col-two color666 mr">仪器状态&nbsp;&nbsp;</label>
                                <div class="col-md-8 col-xs-8 maleandfemale" style="width: 180px">
                                    <div class="radio-list" data-error-container="#form_enable_error">
                                        <label class="radio-inline"> <input type="radio"
                                                                            name="zt" value="0"> 已维护
                                        </label> <label class="radio-inline"> <input type="radio"
                                                                                     name="zt" value="1"> 未维护
                                    </label>
                                    </div>
                                    <div id="form_enable_error"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="labelCommon labelWidth-col-two color666" style="height: 80px;line-height: 80px;">维护内容&nbsp;&nbsp;</label>
                                <%--<input type="text" class="inputCommon inputWidth-col-two" name="addRemark" maxlength="500" style="width: 568px!important;"/> --%>
                                <textarea name="whnr" id="whnr" maxlength="300" class="inputCommon mr" style="border: 1px solid #e5e5e5!important;height: 80px;width: 578px;border-radius: 0 4px 4px 0!important;"></textarea>
                                <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right:15px;bottom: -5px;text-align: right;">剩余<span class="num" id="addRemarkWords" style="color: red;">300</span>个字符</p>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="position: relative;left: 70%"; >
                        <button type="button" class="btn btn-default " data-dismiss="modal">关闭
                        </button>
                        <button type="button" class="btn btn-primary " id="tijiao"  >
                            提交
                        </button>
                    </div>
                </div>
            </form>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>