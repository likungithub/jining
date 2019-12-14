<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row" id="role-manger-setuser">
    <div class="col-md-12">
        <div class="portlet light bordered">
            <div class="portlet-body">
                <div class="table-toolbar">
                    <div class="row">
                        <div class="col-md-12">
                           <!--  <div class="pull-right" style="margin-right: 18px">
                                <div class="input-icon">
                                    <i class="fa fa-search"></i>
                                    <input type="search" class="form-control" id="searchFilter" placeholder="用户名/所属组织结构"> </div>
                            </div> -->
                            <div class="pull-left ml">
                                <div class="input-icon">
                                    <i class="fa fa-search colorBlue-10a0f7"></i>
                                    <input type="search" class="form-control borderRadius4 btnBorderColor" id="searchFilter" placeholder="用户名/所属组织结构"> </div>
	                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover"
                           id="role-users">
                        <thead>
                        <tr>
                            <th width="10%"><input type="checkbox" class="group-checkable"/></th>
                            <th width="45%">用户名</th>
                            <th width="45%">所属组织结构</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/roles/set-role-user.js"
        type="text/javascript"></script>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
%>
<script type="text/javascript">
    $(function () {
        SetRoleUser.init('<%=id%>');
    });
</script>