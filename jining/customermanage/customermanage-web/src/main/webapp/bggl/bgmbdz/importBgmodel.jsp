<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String type = request.getParameter("type");
    if (type == null) {
        type = "";
    }
%>
<div class="dataTables_wrapper no-footer" id="importBgmodel">
    <div class="auto-table-area" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">
        <form method="POST" enctype="multipart/form-data" id="form1">
            <table class="table table-striped table-bordered table-hover" id="incel_data">
                <thead style="background-color: rgb(250,255,209);">
                <tr>
                    <td>请选择要导入的报告模板:</td>
                    <td><input id="upfile" type="file" name="upfile"></td>
                </tr>
                <tr>
                    <td>
                        <label class="labelCommon labelWidth-col-two labelBg color666" id="zjelabel11">
                            <span class="colorRed"> * </span>模板名称
                        </label>
                        <div class="col-md-6 input-group sfjeinput">
                            <input class="form-control" style="height: 33px; !important;" name="BGNAME"  value="" id="BGNAME" placeholder="">
                        </div>
                    </td>
                    <td>
                        <label class="labelCommon labelWidth-col-two labelBg color666" id="zjelabel1">
                            <span class="colorRed"> * </span>版本号
                        </label>
                        <div class="col-md-6 input-group sfjeinput">
                            <input class="form-control" style="height: 33px; !important;" name="BBH"  value="" id="BBH"  placeholder="">
                        </div>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/bggl/bgmbdz/importBgmodel.js"></script>
<script type="text/javascript">
    importBgmodel.init();
</script>
<%--
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/importExcel.js"></script>
<script type="text/javascript">
    setInExcel.setPath('<%=request.getContextPath()%>');
    setInExcel.init("<%=type%>");
</script>--%>
