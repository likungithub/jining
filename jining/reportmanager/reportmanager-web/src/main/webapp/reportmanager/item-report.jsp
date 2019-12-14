<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
    <div class="col-md-12">
        <div class="portlet">
            <div class="portlet-body">
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover"
                           id="itemToReport">
                        <thead>
                        <tr>
                            <th width="30%">监测项目</th>
                            <th width="40%">文件名称</th>
                            <th width="30%">操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/reportmanager/itemreport.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/scripts/datatable-plugin.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        itemReportSetter.setPath("<%=request.getContextPath() %>");
        itemReportSetter.init("<%=request.getParameter("sampleId")%>");
    });
</script>