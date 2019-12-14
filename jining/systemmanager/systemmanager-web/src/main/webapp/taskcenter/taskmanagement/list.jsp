<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
	java.util.Date currentTime = new java.util.Date();//得到当前系统时间
	long dateMS = currentTime.getTime();

	currentTime.setTime(dateMS);
	String txtendDate = formatter.format(currentTime); //当前时间

	dateMS = dateMS - 60 * 60 * 24 * 1000 * 7;
	currentTime.setTime(dateMS);
	String txtstarDate = formatter.format(currentTime); //开始时间

	dateMS = dateMS + 60 * 60 * 24 * 1000 * 14;
	currentTime.setTime(dateMS);
	String txtBackDate = formatter.format(currentTime);

	String rwid = request.getParameter("rwid");
	String blzt = request.getParameter("blzt");

%>

<%
UUID uuid = UUID.randomUUID();

boolean add = false;
String khbm = request.getParameter("khbm");
String khmc = request.getParameter("khmc");
String canadd = request.getParameter("canadd");
String sjhm = request.getParameter("sjhm");
String sjly = request.getParameter("sjly");
if("true".equalsIgnoreCase(canadd)){
   add=true; //显示添加任务按钮
}
%>
<style>
	#task-manager-container  .rotate1{
		transform: rotate(180deg);
	}
	#task-manager-container  #searchDepartment
	{
		position: absolute;
		top: 37px;
		left: -78px;
		z-index: 21;
		width: 238px;
		border-radius: 4px!important;
		height: 33px;
		border: 1px solid #dadada;
		outline: none;
		text-indent: 10px;
	}

</style>
<%--<div class="row basicParamsSet product-360-manager" id="task-manager-container_<%=uuid%>">--%>
	<%--<div class="col-md-12">--%>
		<%--<div class="portlet light bordered">--%>
			<%--<div class="portlet-body">--%>
				<%--<div class="table-toolbar">--%>

				<%--</div>--%>
				<%--<div class="dataTables_wrapper no-footer">--%>
					<%--<table class="table table-striped table-bordered table-hover  public-table"--%>
						   <%--id="product_data">--%>
						<%--<thead>--%>
						<%--<tr class="color333">--%>
							<%--<th width="100px">配置类型</th>--%>
							<%--<th class="text-left">值1</th>--%>
							<%--<th class="text-left">值2</th>--%>
							<%--<th class="text-left">值3</th>--%>
							<%--<th class="text-left">值4</th>--%>
							<%--<th>操作</th>--%>
						<%--</tr>--%>
						<%--</thead>--%>
					<%--</table>--%>
				<%--</div>--%>
			<%--</div>--%>
		<%--</div>--%>
	<%--</div>--%>
<%--</div>--%>

<div class="row contentBgColor" id="task-manager-container">
	<input type="hidden" id="khbm_id" value="<%=khbm%>"/>
	<input type="hidden" id="khmc_id" value="<%=khmc%>"/>
	<input type="hidden" id="sjhm_id" value="<%=sjhm%>"/>

	<div class="col-md-12">
		<div class="portlet light bordered" style="padding: 15px">
			<div class="portlet-body" style="padding-top: 0">
				<div class="table-toolbar" style="height: auto;margin-bottom: 15px;margin-top: 0">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body">

								<div class="input-group  pull-left" >
									<%if(add){%>
									<button  id="addrw_id" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">
										<i class="fa fa-plus"></i>创建任务
									</button>
									<%}%>

									<button  id="delBatch" type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr Search-btn" style="height:33px;display: none;" data-loading-text="Loading...">
										<i class="fa fa-trash-o"></i>
										删&nbsp;除&nbsp;</button>
									<button name="exportExcel" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4  pull-left mr">
										<i class="icon iconfont icon-daochu"></i> 导出
									</button>
								</div>
                                <div style="float: right;width:690px;">
									<label class="labelCommon lb1" style="width: 80px;">类型</label>
									<div class="input-group  search-label-small pull-left mr">
										<select class="form-control inputCommon  borderRadius4" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;width:110px;height:33px;border-top-right-radius: 0px !important;
    border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;" id="type" name="type">
											<option value="3" selected="selected">全部</option>
											<option value="0">我发布的</option>
											<option value="1">我参与的</option>
											<option value="2">我负责的</option>
										</select>
									</div>
									<label class="labelCommon" style="width: 100px">状态</label>
									<select class=" inputCommon mr wanchengzhuangtai" style="width: 90px;border-radius: 0 4px 4px 0!important;" id="blzt_id">
										<option value="000">全部</option>
										<option value="006" selected>未开始</option>
										<option value="002">进行中</option>
										<option value="001">已完成</option>

										<option value="003">已取消</option>
										<option value="004">已延迟</option>
										<option value="005">暂停中</option>
									</select>
									<div class="input-group  search-label-small pull-left" style="position: relative">
										<input type="text" class="inputCommon input-sm  input-small borderRadius4" name="rwmc" id="rwmc" style="padding-right: 45px;text-indent:0px !important;width:208px!important;font-size:12px !important;" placeholder="请输入任务名称或客户名称"/>
										<i class="fa fa-search colorBlue-10a0f7 searchIcoBtn " id="searchTerm-m" style="margin-right: 5px;
																																position: absolute;
																																right: -5px;
																																top: 0px;
																																cursor: pointer;
																																height: 33px;
																																line-height: 33px;
																																width: 45px;
																																text-align: center;
																																border-left: 1px solid #dedede;
																																font-size: 20px!important;"></i>
									</div>
									<%--<div id="searchTerm-m" class="input-group  pull-left" style="margin-left: 10px">
										<button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr Search-btn" style="height:33px;" data-loading-text="Loading...">
											<i class="fa fa-search "></i>
											查&nbsp;询&nbsp;</button>
									</div>--%>

									<div class="pull-left" style="height: 33px;line-height: 33px;padding: 0 20px;">
										<a id="moreAsearch" href="javascript:void (0);" class="iconFontColor-10a0f7" style="text-decoration: none;vertical-align: middle;">更多</a>
										<img class="rotate1" src="<%=request.getContextPath()%>/assets/pages/img/arrow.png" alt="arrow" >
									</div>

									<os:hasSecurityResource identifier="TaskFollowBtn"><!-- 任务跟进按钮 -->
										<div id="taskFollow"></div>
									</os:hasSecurityResource>
									<os:hasSecurityResource identifier="TaskEditBtn"><!-- 任务编辑按钮 -->
										<div id="taskEdit"></div>
									</os:hasSecurityResource>
									<os:hasSecurityResource identifier="TaskSpotBtn"><!-- 任务垫付按钮 -->
										<div id="taskSpot"></div>
									</os:hasSecurityResource>
									<os:hasSecurityResource identifier="TaskDelBtn"><!-- 任务删除按钮 -->
										<div id="taskDel"></div>
									</os:hasSecurityResource>
								</div>
							</div>
						</div>
					</div>
					<div class="row" style="margin: 15px -20px;display: none" id="moreSearch">
						<div class="col-md-12" style="    border: 1px solid #ccc;
    border-radius: 4px !important;
    padding: 20px;
    width: 910px;
    float: right;
    margin-right: 20px;">
							<div style="height: 50px;">
								<div class="date beginTime_m pull-left mr">
									<label class="labelCommon labelBg color666  labelWidth-col-two">创建时间</label>
									<input value="<%=txtstarDate%>" type="text" readonly class="appsysinfo-m inputCommon " name="starDate" style="border-radius: 0 !important; width: 80px" >
									<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
								</div>
								<div class="input-group date endTime_m pull-left mr">
									<div class="pull-left mr" style="height: 33px;line-height: 33px">&nbsp;-&nbsp;</div>
									<input value="<%=txtendDate%>" type="text" readonly class="inputCommon appsysinfo-m" name="endDate" style="border-radius: 4px 0 0 4px !important;width: 80px" >
									<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                    </button>
                                    </span>
								</div>
								<div class="form-group pull-left mr">
									<label class="labelCommon labelWidth-col-one labelBg color666">收费项目
									</label>
									<div class="input-group">
										<select id="sfxm" style="height: 33px;border: 1px solid #dadada;border-radius: 0 4px 4px 0!important;">
											<option value="">全部</option>
										</select>
									</div>
								</div>
								<label class="labelCommon" style="width: 80px">发起人部门</label>
								<div class="input-group  search-label-small pull-left" style="position: relative;margin-bottom: 15px">
									<%--<select class="form-control inputCommon  borderRadius4 mr" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;width:160px;height:33px;border-top-right-radius: 0px !important;
        border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
        border-bottom-right-radius: 4px !important;" id="workorderstatus" name="workorderstatus">
                                    </select>--%>
									<input data-code="0" class="form-control inputCommon  borderRadius4 mr" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;width:160px;height:33px;border-top-right-radius: 0px !important;
    border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;padding-left: 0;
    border-bottom-right-radius: 4px !important;" id="workorderstatus" name="workorderstatus">
									<input type="text" id="searchDepartment" style="display: none;">
									<a href="javascript:void(0)" id="taskDepartmentDel"  style="position: absolute;z-index: 21;bottom: -77px;left: -63px;display: none;height: 33px;line-height: 34px;padding-left: 11px;background: rgb(209, 237, 255);text-decoration: none;width: 222px !important;">
										全 部</a>
									<div id="taskTreecontainer" style="display: none;padding: 88px  0 15px;position: absolute;background: #fff;top: 34px; min-width: 242px;left: -80px;z-index: 20;border: 1px solid #ddd;box-shadow: 2px 2px 5px #ddd;"></div>
								</div>
							</div>




							<%--<label class="labelCommon lb1" style="width: 80px;">类型</label>
							<div class="input-group  search-label-small pull-left mr">
								<select class="form-control inputCommon  borderRadius4" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;width:110px;height:33px;border-top-right-radius: 0px !important;
    border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;" id="type" name="type">
									<option value="3" selected="selected">全部</option>
									<option value="0">我发布的</option>
									<option value="1">我参与的</option>
									<option value="2">我负责的</option>
								</select>
							</div>--%>
							<div>
								<label class="labelCommon labelWidth-col-two labelBg color666">
									负责人
								</label>
								<a type="text" id="fzrmc_sl" class="inputCommon mr" style="width: 120px !important;overflow: hidden; color: #666;text-decoration: none;line-height: 33px"></a>

								<label class="labelCommon labelWidth-col-two labelBg color666" style="margin-left:  10px;">
									执行人
								</label>
								<a type="text" id="zxrmc_sl" class="inputCommon mr" style="width: 120px !important;overflow: hidden; color: #666;text-decoration: none;line-height: 33px"></a>

								<label class="labelCommon lb1" style="width: 80px;">紧急程度</label>
								<div class="input-group  search-label-small pull-left">
									<select class="form-control inputCommon  borderRadius4" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;width:110px;height:33px;border-top-right-radius: 0px !important;
    border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;" id="cx_jjcd_id" name="cx_jjcd_name">
										<option value="0" selected="selected">全部</option>
										<option value="001">一般</option>
										<option value="002">重要</option>
										<option value="003">紧急</option>
									</select>
								</div>

								<label class="labelCommon lb1" style="margin-left: 10px;width: 80px;">到期状态</label>
								<div class="input-group  search-label-small pull-left">
									<select class="form-control inputCommon  borderRadius4" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;width:110px;height:33px;border-top-right-radius: 0px !important;
    border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;" id="cx_dqzt_id" name="cx_dqzt_name">
										<option value="0" selected="selected">全部</option>
										<option value="1">即将到期</option>
										<option value="2">已经超期</option>
									</select>
								</div>
							</div>
							</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="taskManagerList_m" width="100%">
						<thead>
						<tr class="color333">
							<%--<th width="30px" class="text-left"><input  type="checkbox" id="task_all_s" style="position: relative;right: 1px;"><label for="task_all_s" style="cursor: pointer;vertical-align: text-bottom;"></label></th>--%>

								<th class="text-left"  width="13%">任务编号</th>
								<th class="text-left"  width="10%">客户名称</th>
							<th width="10%" class="text-left">任务名称</th>
								<th width="10%" class="text-left">收费项目</th>
							<th class="text-left" width="7%">办理进度</th>
							<th width="7%" calss="text-center">开始时间</th>
							<th width="7%" class="text-center">结束时间</th>
							<th width="7%">剩余天数</th>
							<%--<th class="text-left" width="8%">发起人部门</th>--%>
							<th class="text-center" width="8%">创建时间</th>
							<th width="5%">负责人</th>
							<th width="16%">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>





<%--
<link href="<%=request.getContextPath()%>/assets/pages/css/csxtpz/csxtpz.css" rel="stylesheet" type="text/css" />
--%>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/taskcenter/taskmanagement/taskmanagement.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		taskmanagement.setPath("<%= request.getContextPath()%>");
        taskmanagement.init('<%=khbm%>','<%=rwid%>','<%=blzt%>','<%=sjly%>','<%=sjhm%>');

        $('#moreAsearch','#task-manager-container').click(function(){
            $('img[alt="arrow"]').toggleClass('rotate1');
            $('#moreSearch','#task-manager-container').slideToggle(500);
		});

        localStorage.setItem("cjrw_khsjhm",'<%=sjhm%>');
	});
</script>

