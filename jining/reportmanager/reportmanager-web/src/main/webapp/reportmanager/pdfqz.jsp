<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
    <div class="col-md-12">
        <div class="portlet">
            <div class="portlet-body">
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover"
                           id="tFiles">
                        <thead>
                        <tr>
                            <th width="100%">文件名称</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/reportmanager/reportfile.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/scripts/datatable-plugin.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        reportFile.setPath("<%=request.getContextPath() %>");
        reportFile.init("<%=request.getParameter("sampleId")%>","<%=request.getParameter("itemId")%>");
    });
</script>