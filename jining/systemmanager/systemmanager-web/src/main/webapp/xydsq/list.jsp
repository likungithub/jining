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

%>

<%
%>
<style>
	/*#task-manager-container .rotate1 {*/
		/*transform: rotate(180deg);*/
	/*}*/

	/*#task-manager-container #searchDepartment {*/
		/*position: absolute;*/
		/*top: 37px;*/
		/*left: -46px;*/
		/*z-index: 21;*/
		/*width: 188px;*/
		/*border-radius: 4px!important;*/
		/*height: 33px;*/
		/*border: 1px solid #dadada;*/
		/*outline: none;*/
		/*text-indent: 10px;*/
	/*}*/
 .rotate1 {
		transform: rotate(180deg);
	}
</style>
<div class="row contentBgColor" id="xydsq-manager-container">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-body">
				<div class="table-toolbar" style="height: auto">
					<div class="row">
						<div class="col-md-12">
							<div class="row search-body" style="padding-bottom: 10px;">

								<div class="input-group  pull-left">
									<button name="exportExcel" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4  pull-left mr">
										<i class="icon iconfont icon-daochu"></i> 导出
									</button>
								</div>
								<div style="float: right;width:915px;">

									<div class="pull-right" style="height: 33px;line-height: 33px;padding: 0 20px;">
										<a id="moreAsearch" href="javascript:void (0);" class="mr iconFontColor-10a0f7" style="text-decoration: none;vertical-align: middle;">更多</a>
										<img class="rotate1" src="<%=request.getContextPath()%>/assets/pages/img/arrow.png" alt="arrow">
									</div>

									<%--<div id="searchTerm-m" class="input-group  pull-right" style="margin-left: 10px">
										<button type="button" class="btn  btnBlue btnBorderColor colorfff borderRadius4 pull-left mr Search-btn" style="height:33px;" data-loading-text="Loading...">
											<i class="fa fa-search "></i>
											查&nbsp;询&nbsp;</button>
									</div>--%>

									<div class="input-group  search-label-small pull-right" style="position: relative">
										<input type="text" class="inputCommon input-sm  input-small borderRadius4" name="jkrxm" id="jkrxm" style="padding-right: 47px;text-indent:0px !important;width:236px!important;font-size:12px !important;" placeholder="请输入用户姓名" />
										<i id="searchTerm-m" class="fa fa-search colorBlue-10a0f7 searchIcoBtn" style=" margin-right: 5px;
																																position: absolute;
																																right: -4px;
																																top: 0;
																																cursor: pointer;
																																height: 33px;
																																line-height: 33px;
																																width: 45px;
																																text-align: center;
																																border-left: 1px solid #dedede;
																																font-size: 20px!important;"></i>
									</div>

									<div class="input-group date endTime_m pull-right mr">
										<div class="pull-left mr" style="height: 33px;line-height: 33px">&nbsp;-&nbsp;</div>
										<input value="<%=txtendDate%>" type="text" readonly class="inputCommon appsysinfo-m" name="endDate" style="border-radius: 4px 0 0 4px !important;width: 80px">
										<span>
											<button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
										<i class="fa fa-calendar"></i>
										</button>
										</span>
									</div>

									<div class="date beginTime_m pull-right mr">
										<label class="labelCommon labelBg color666  labelWidth-col-two">申请时间</label>
										<input value="<%=txtstarDate%>" type="text" readonly class="appsysinfo-m inputCommon " name="starDate" style="border-radius: 0 !important; width: 80px">
										<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
									</div>



									<label class="labelCommon labelBg color666  labelWidth-col-two pull-left">初审状态</label>
									<div class="input-group  search-label-small pull-left">
										<select name="cszt" class="inputCommon mr" style="width: 100px!important;">
											<option value="">全部</option>
											<option value="0">未审核</option>
											<option value="1">同意</option>
											<option value="2">不同意</option>
										</select>
									</div>



								</div>
							</div>
						</div>
					</div>
					<div class="row" style="margin: 15px -20px;display: none" id="moreSearch">
						<div class="col-md-12" style="    border: 1px solid #ccc;
    border-radius: 4px !important;
    padding: 20px;
    width: 1090px;
    float: right;
    margin-right: 20px;">

							<div class="date beginTime_m pull-left mr">
								<label class="labelCommon labelBg color666  labelWidth-col-two">初审时间</label>
								<input value="<%=txtstarDate%>" type="text" readonly class="appsysinfo-m inputCommon " name="cssj_q" style="border-radius: 0 !important; width: 80px">
								<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
							</div>

							<div class="input-group date endTime_m pull-left mr">
								<div class="pull-left mr" style="height: 33px;line-height: 33px">&nbsp;-&nbsp;</div>
								<input value="<%=txtendDate%>" type="text" readonly class="inputCommon appsysinfo-m" name="cssj_z" style="border-radius: 4px 0 0 4px !important;width: 80px">
								<span>
											<button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
										<i class="fa fa-calendar"></i>
										</button>
										</span>
							</div>

							<div class="date beginTime_m pull-left mr">
								<label class="labelCommon labelBg color666  labelWidth-col-two">终审时间</label>
								<input value="<%=txtstarDate%>" type="text" readonly class="appsysinfo-m inputCommon " name="zssj_q" style="border-radius: 0 !important; width: 80px">
								<span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
							</div>

							<div class="input-group date endTime_m pull-left mr">
								<div class="pull-left mr" style="height: 33px;line-height: 33px">&nbsp;-&nbsp;</div>
								<input value="<%=txtendDate%>" type="text" readonly class="inputCommon appsysinfo-m" name="zssj_z" style="border-radius: 4px 0 0 4px !important;width: 80px">
								<span>
											<button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
										<i class="fa fa-calendar"></i>
										</button>
										</span>
							</div>


							<label class="labelCommon labelBg color666  labelWidth-col-two pull-left">终审状态</label>
							<div class="input-group  search-label-small pull-left">
								<select name="zszt" class="inputCommon mr" style="width: 100px!important;">
									<option value="">全部</option>
									<option value="0">未审核</option>
									<option value="1">同意</option>
									<option value="2">不同意</option>
								</select>
							</div>


						</div>
					</div>
				</div>
				<div class="dataTables_wrapper no-footer">
					<table class="table table-striped table-hover paramsTab" id="xydsqManagerList_m" width="100%">
						<thead>
						<tr class="color333">
							<th class="text-left" width="14%">申请编号</th>
							<th class="text-left" width="9%">姓名</th>
							<th class="text-left" width="10%">手机号码</th>
							<th width="11%" style="text-align: right!important">申请金额</th>
							<th width="7%" calss="text-center">申请期限</th>
							<th width="10%" class="text-center">申请时间</th>
							<th width="8%" class="text-center">初审状态</th>
							<th class="text-center" width="8%">终审时间</th>
							<th width="8%" class="text-center">终审状态</th>
							<th width="15%" class="text-center">操作</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>




<script src="<%=request.getContextPath()%>/assets/pages/scripts/lib/jquery.validate.min.js" type="text/javascript"></script>
<script src="http://static.runoob.com/assets/jquery-validation-1.14.0/dist/localization/messages_zh.js"></script>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/xydsq/list.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        xydsqlist.setPath("<%= request.getContextPath()%>");
        xydsqlist.init();

        $('#moreAsearch', '#xydsq-manager-container').click(function() {
            $('img[alt="arrow"]').toggleClass('rotate1');
            $('#moreSearch', '#xydsq-manager-container').slideToggle(500);
        });


    });
</script>