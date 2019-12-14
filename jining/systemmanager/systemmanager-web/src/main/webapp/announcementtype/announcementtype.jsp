<%@ page import="java.util.UUID" %><%--
  Created by IntelliJ IDEA.
  User: huxinquan
  Date: 2017/7/3
  Time: 8:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String UniqueID= UUID.randomUUID().toString();
%>
<style>
	#page-container #announcementtype_data_info{
		height:30px !important;
		line-height:20px !important;
	}
</style>
<div class="row contentBgColor" id="announcementType_<%=UniqueID%>">
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 15px">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="margin: 0 0 15px;height: 33px">
                    <div class="row">
                        <div class="col-md-6">
                            <button id="addNewGGLXBtn" class="btn btn-default btnAdd pull-left borderRadius4 mr colorfff">
                                <i class="fa fa-plus"></i>
                                新增
                            </button>

                        </div>
                        <div class="col-md-6">
                           <%-- <button type="button" class="btn btn-default borderRadius4 btnBlue colorfff pull-right" id="searchAnnouncementType1" data-loading-text="Loading...">
                                <i class="fa fa-search"></i> 查&nbsp;询&nbsp;
                            </button>--%>
                            <div style="width: 225px;float: right;">
                                <div class="input-icon" style="width: 190px;position: relative">
                                    <%--<i class="fa fa-search colorBlue-10a0f7"></i>--%>
                                    <input type="search" class="form-control borderRadius4" id="searchAnnouncementType" placeholder="类型名称" style="padding-right: 47px;width: 220px;padding-left: 10px">
                                    <i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" id="searchAnnouncementType1" style="margin-right: 5px;
                                                                                                                                        position: absolute;
                                                                                                                                        right: -29px;
                                                                                                                                        top: -11px;
                                                                                                                                        cursor: pointer;
                                                                                                                                        height: 33px;
                                                                                                                                        line-height: 33px;
                                                                                                                                        width: 45px;
                                                                                                                                        text-align: center;
                                                                                                                                        border-left: 1px solid #dedede;
                                                                                                                                        font-size: 20px!important;"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" id="announcementtype_data">
                        <thead>
                        <tr class="color333">
                            <th>类型名称</th>
                            <th>录入日期</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<link href="<%=request.getContextPath()%>/assets/pages/css/announcementType/announcementtype.css" rel="stylesheet" type="text/css" />
<script src="<%= request.getContextPath()%>/assets/pages/scripts/announcementtype/announcementtype.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        announcementtype.setPath("<%= request.getContextPath()%>");
        announcementtype.init("<%= UniqueID%>");
    });
</script>