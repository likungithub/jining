<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String type = request.getParameter("type");
    if (type == null) {
        type = "";
    }
%>

<div class="dataTables_wrapper no-footer" id="importYpclExcel" style="width: 100%">
    <div class="auto-table-area" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">
        <form method="POST" enctype="multipart/form-data" id="formYpcl">
            <table class="table table-striped table-bordered table-hover" id="incel_data" style="margin-top: 10px;">
                <thead style="background-color: rgb(250,255,209);">
                <tr><td></td><td></td></tr>
                <tr>
                    <td>请选择要导入的Excel文件:</td>
                    <td><input id="ypclFile" type="file" name="ypclFile"></td>
                </tr>
                <tr>
                    <td colspan="2"><span>温馨提示：请下载统一的模版，并按相应的格式在Excel软件中填写您的业务数据，然后再导入到系统中</span>
                        <br/><a href="javascript:;" id="importDownYpcl">下载模板</a></td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>
<%--<script>
    $.post("<%=request.getContextPath()%>/customermanage/cydxxgl/cydXl",function (data) {
        for (var i=0;i<data.length;i++) {
            console.log(data)
            $("#name").append("<option value="+data[i]+">"+data[i]+"</option>")
            $("#selectname").append("<option value="+data[i]+">"+data[i]+"</option>");

        }
    });
</script>--%>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/ypgl/importYpclExcel.js"></script>
<script type="text/javascript">
    setInExcel.setPath('<%=request.getContextPath()%>');
    setInExcel.init("<%=type%>");
</script>
