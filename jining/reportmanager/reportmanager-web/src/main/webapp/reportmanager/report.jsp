<%--
  Created by IntelliJ IDEA.
  User: shanmaoju
  Date: 2018/6/22
  Time: 15:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
    <div class="col-md-12">
        <div class="portlet light bordered">
           <%-- <div class="portlet-title">
                <span class="caption-subject bold uppercase">雇员信息列表</span>
            </div>--%>
            <div class="portlet-body">
                <div class="table-toolbar">
                    <div class="row">
                        <div class="col-md-12">
                            <input type="text" class="form-control input-medium pull-left" id="keyContactName"
                                   placeholder="合同名称">
                            <span class="col-md-1 pull-left">&nbsp;&nbsp;</span>
                            <input type="text" class="form-control input-medium pull-left" id="keySampleName"
                                   placeholder="样品名称">
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover"
                           id="report_data">
                        <thead>
                        <tr>
                            <th width="8%">样品编号</th>
                            <th width="8%">样品名称</th>
                            <th width="8%">报告编号</th>
                            <th width="20%">委托单位名称</th>
                            <th width="20%">委托单位所属省</th>
                            <th width="8%">所属市</th>
                            <th width="8%">所属县</th>
                            <th width="8%">联系电话</th>
                            <th width="8%">操作</th>

                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/reportmanager/report.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        report.setPath("<%= request.getContextPath()%>");
        report.init();
    });
</script>
