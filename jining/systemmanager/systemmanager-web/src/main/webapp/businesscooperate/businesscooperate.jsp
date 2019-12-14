<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<%@ page import="java.util.UUID" %>
<%--
  Created by IntelliJ IDEA.
  User: huxinquan
  Date: 2017/7/28
  Time: 8:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String UniqueID= UUID.randomUUID().toString();
    Boolean isManager = CurrentLoginUser.getUser().getId().equals("332f67bc-5b09-4352-bd6c-c108fe098067");

    //时间计算
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
<style>
	#page-container #businesscooperate_data_info{
		height:30px !important;
		line-height:20px !important;
	}
	#page-container th{
		text-align:center;
	}

</style>
<div class="row contentBgColor" id="businessCooperate_<%=UniqueID%>">
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 15px">
            <div>
                <div class="table-toolbar" style="margin: 0 0 15px;height: 33px;">
                    <div class="row">
                        <div class="col-md-12" style="width: 696px;float: right;">
                            <%--<button hidden id="btnDelAll" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                <i class="icon iconfont icon-del"></i>
                                删除
                            </button>--%>
                            <label class="control-label  labelCommon" style="width:80px;height: 33px;">
                                申请日期
                            </label>
                            <div class="input-group date timeUnit pull-left mr" id="startsqrq" >
                                <input style="width:90px !important;height:33px;font-size:12px;padding: 0;padding-left: 10px; " type="text"
                                       id="startsqrq_input"
                                       class="form-control appcustomerinfo-input-m" value="<%=txtstarDate%>">
                                <span class="input-group-btn pull-left">
										<button class="btn btn-default appcustomerinfo-btn-m" type="button" style="border-radius: 0 4px 4px 0!important">
											<i class="fa fa-calendar"></i>
										</button>
									</span>
                            </div>
                            <div class="input-group date timeUnit pull-left mr" id="endsqrq" style="margin-top: 1px;">
                                <div class="pull-left mr" style="height: 33px;line-height: 33px">&nbsp;-&nbsp;</div>
                                <input style="width:90px !important;height: 33px;font-size:12px;border-radius: 4px 0 0 4px!important;" type="text"
                                       id="endsqrq_input"
                                       class="form-control appcustomerinfo-input-m" value="<%=txtendDate%>">
                                <span class="input-group-btn pull-left">
										<button class="btn btn-default appcustomerinfo-btn-m" type="button" style="border-radius: 0 4px 4px 0!important;">
											<i class="fa fa-calendar"></i>
										</button>
									</span>
                            </div>
                           <%-- <button id="btnIsAnswer" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                <i class="icon iconfont icon-duihao1"></i>
                                答复
                            </button>--%>
                            <label class="labelCommon lb1 ml" style="width: 85px!important;margin-top: 1px;">受理状态</label>
                                <div class="input-group search-box search-label-small pull-left" style="margin-top: 1px">
                                    <select class="form-control inputCommon  borderRadius4" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;width:97px;height:33px;border-top-right-radius: 0px !important;
    border-right: 0px;border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;" id="yfhz_dfbz" name="yfhz_dfbz">
                                        <option value ="all">全部</option>
                                        <option value="001" selected="selected">未受理</option>
                                        <option value="002">已受理</option>
                                        <option value="003">已完成</option>
                                        <option value="004">已流失</option>
                                    </select>
                                </div>
                                <div
							class="input-group date  pull-left">
							<button type="button"
								class="btn btn-default borderRadius4 btnBlue colorfff "
								id="findByDfbz_busin" data-loading-text="Loading..." style="margin-top: 1px;">
								<i class="fa fa-search"></i> 查&nbsp;询&nbsp;
							</button>
						</div> 
                            <!-- <div class="pull-left">
                                <div class="input-icon" style="width: 190px;">
                                    <i class="fa fa-search colorBlue-10a0f7"></i>
                                    <input type="search" class="form-control borderRadius4" id="searchBusinessCooperate"
                                           placeholder="类型/信息" style="width: 220px"></div>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover text-center"
                           id="businesscooperate_data">
                        <thead>
                        <tr class="color333">
                            <th style="width:0px">
                                <label class="mt-checkbox mt-checkbox-single mt-checkbox-outline" style="display: none">
                                    <input type="checkbox" class="group-checkable" id="allCheck"/>
                                    <span></span>
                                </label>
                            </th>
                            <th width="10%">用户名称</th>
                            <th width="15%">公司名称</th>
                            <th width="15%">客户经理</th>
                            <th width="20%" class="text-left">业务类型</th>
                            <th class="text-left">留言信息</th>
                            <th width="8%">受理状态</th>
                            <th width="10%">申请日期</th>
                            <th width="12%">操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/businesscooperate/businesscooperate.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        businesscooperate.setPath("<%= request.getContextPath()%>");
        businesscooperate.init("<%= UniqueID%>", "<%=isManager%>");
    });
</script>