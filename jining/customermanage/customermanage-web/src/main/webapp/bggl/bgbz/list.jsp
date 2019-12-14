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
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="height: 20px;margin: 0 0 15px;">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="padding-bottom: 10px;">
								<form id="bgbz_condition"<%-- style="position: relative;display: inline-block;left: 400px;bottom: 5px"--%>>
									<div style="clear:both;overflow: hidden;margin: 5px auto;">
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">样品编号</label>
											<input type="text" name="ypbm" class="appsysinfo-m inputCommon" id="ypbm"  placeholder="请输入样品编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
										</div>
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
											<input type="text" name="ypmc" class="appsysinfo-m inputCommon" id="ypmc"  placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
										</div>
										<div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">委托单位名称</label>
											<input type="text" name="wtdw" class="appsysinfo-m inputCommon" id="wtdw"  placeholder="请输入委托单位名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
										</div>
										<div class="input-group  search-label-small pull-left"
											 style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
											<label class="labelCommon labelBg color666 dateLabel-m">报告状态</label>
											<select id = "bgzt" name="bgzt" class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
												<option value="">请选择报告状态</option>
												<option value="001">未提交</option>
												<option value="002">已提交</option>
												<option value="003">未通过</option>
												<option value="004">已退回</option>
											</select>
										</div>
									</div>
								</form>
								<div style="float: right;width:100%;">
									<div class="col-md-6b " style="padding: 0">
										<button id="<%=uuid%>btn_sjjy_tg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>提交
										</button>
										<button  id="dayinWtbg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>生成报告
										</button>
										<button  id="bgzjr" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>选择主检人员
										</button>
										<button  id="bjWtbg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-plus iconMr"></i>编辑报告
										</button>
										<button style="margin-left: 10px;display: none" id="<%=uuid%>btn_sjjy_btg" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left">
											不通过
										</button>
										<button  id="searchTerm1" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-search iconMr"></i>查询
										</button>
                                        <button id="btn_thbg" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-plus iconMr"></i>退回
                                        </button>
										<button id="<%=uuid%>lzdPrinting"
												class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
											<i class="fa fa-refresh iconMr"></i>流转单打印
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="<%=uuid%>ManagerList_m" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-center" width="20px"><input type="checkbox" name="rwfp_checkbox"/></th>
							<th class="text-center" width="40px;">操作</th>
							<%--	<th class="text-left">合同名称</th>--%>
							<th style="width: 0px"></th>
							<%--<th style="width: 0px"></th>--%>
							<th class="text-center">样品编号</th>
							<th class="text-center">委托单编号</th>
							<th class="text-center">样品名称</th>
							<%--<th class="text-center">检测项目名称</th>--%>
							<%--<th class="text-left">数据出具日期</th>--%>
							<th class="text-center">委托单位名称</th>
							<%--<th class="text-left">委托单位所属省</th>--%>
							<%--<th class="text-left">所属市</th>--%>
							<%--<th class="text-left">所属县</th>--%>
							<th class="text-center">委托信息状态</th>
							<th class="text-center">生成状态</th>
							<th class="text-center">报告编制</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/bggl/bgbz/list.js" type="text/javascript"></script>
<script src="<%= request.getContextPath()%>/bggl/bgbz/laydate/laydate.js"></script> <!-- 改成你的路径 -->
<script type="text/javascript">
    $(function() {
        list.setPath("<%= request.getContextPath()%>");
        list.init('<%=uuid%>');

        laydate.render({
            elem: "#text1" //指定元素
        });
        laydate.render({
            elem: "#text2" //指定元素
        });
    });
</script>

<script type="text/javascript">
    $(document).ready(function () {
        $.post("customermanage/xzmb/mbxz?date=" + new Date().getTime(), {
        }, function(data) {
            for (var i = 0; i < data.length; i++) {
                var $val = $("<option value="+ data[i].ID+">" + data[i].BGNAME + "</option>");
                $("#xzmb").append($val);
            }
        }, "json");
    })
</script>