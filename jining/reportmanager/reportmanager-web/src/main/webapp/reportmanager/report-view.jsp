<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
    <div class="col-md-12">
        <div class="portlet">
            <div class="portlet-body">
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover"
                           id="report_details" style="width:100%">
                        <thead>
                        <tr>
                            <th width="60px">检测项目</th>
                            <th width="120px">实验室名称</th>
                            <th width="60px">仪器</th>
                            <th width="60px">人员</th>
                            <th width="30px">批次</th>
                            <th width="60px">原始文件名称</th>
                            <th width="60px">样品类型</th>
                            <th width="100px">位置</th>
                            <th width="100px">日期</th>
                            <th width="50px">样品注入量</th>
                            <th width="50px">复合名称</th>
                            <th width="50px">总区</th>
                            <th width="50px">时间</th>
                            <th width="50px">结果值</th>
                            <th width="50px">单位</th>
                            <th width="50px">上传人</th>
                            <th width="60px">上传时间</th>
                            <th width="80px">操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/reportmanager/reportview.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/scripts/datatable-plugin.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/reportmanager/pdfobject.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        reportView.setPath("<%=request.getContextPath() %>");
        reportView.init("<%=request.getParameter("sampleId")%>","<%=request.getParameter("itemId")%>");
    });
</script>