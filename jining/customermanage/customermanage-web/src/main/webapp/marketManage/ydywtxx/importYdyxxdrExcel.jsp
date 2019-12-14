<%@ page import="java.util.Random" %>
<%@ page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String type = request.getParameter("type");
    if (type == null) {
        type = "";
    }
    String uuid= UUID.randomUUID().toString();
%>
<div class="dataTables_wrapper no-footer" id="importExcelydywt<%=uuid%>">
    <div class="auto-table-area" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">
        <form method="POST" enctype="multipart/form-data" id="formydywt" action="/customermanage/zfwt/importExcel/<%=type%>">
            <table class="table table-striped table-bordered table-hover" id="incel_dataydywt">
                <thead style="background-color: rgb(250,255,209);">
                <tr>
                    <td>请选择要导入的Excel文件:</td>
                    <td><input id="upfileydywt" type="file" name="upfile"></td>
                </tr>
                <tr>
                    <td colspan="2"><span>温馨提示：请下载统一的模版，并按相应的格式在Excel软件中填写您的业务数据，然后再导入到系统中</span>
                        <br/><a href="javascript:;" id="importDownydywt">下载模板</a></td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/yygl/ydywtxx/importYdywtExcel.js"></script>
<script type="text/javascript">
    setInydywtExcel.setPath('<%=request.getContextPath()%>');
    setInydywtExcel.init("<%=type%>","<%=uuid%>");
</script>