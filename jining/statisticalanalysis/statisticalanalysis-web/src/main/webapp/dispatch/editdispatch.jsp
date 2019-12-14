<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/css/editdispatch.css">
<div id="dispatch-manager-content-edit">
	<div class="ui-layout-west">
        <div class="ui-layout-content">
            <div class="portlet">
                <!-- <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase">请选择员工</span>
                    </div>
                </div> -->
                <div class="portlet-body">
                    <div class="portlet-scroller">
                        <div class="table-toolbar">
                            <div class="row">
                                <div class="col-md-12">
                                    <div id="orgAndUser_manage_tree_edit"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- <div class="row" id="dtsxx">
    <div class="col-md-12">
        <div class="form-group">
            <div style="float: right;padding-top:2px;">发送APP消息（提醒客户）</div>
            <input id="dispatchTsxx" type="checkbox" value="1" style="float:right;">
        </div>
    </div>
</div> -->
<script src="<%=request.getContextPath()%>/assets/pages/scripts/dispatch/editdispatch.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		dispatchEdit.setPath("<%=request.getContextPath()%>");
		dispatchEdit.init("<%=id%>");
	});
</script>