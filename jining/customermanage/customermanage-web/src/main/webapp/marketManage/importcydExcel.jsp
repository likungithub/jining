<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String type = request.getParameter("type");
    if (type == null) {
        type = "";
    }
%>

<div class="dataTables_wrapper no-footer" id="importcydExcel" style="width: 100%">
    <div class="auto-table-area" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">
        <form method="POST" enctype="multipart/form-data" id="formyqsbcgtz">
            <div class="dataTables_wrapper no-footer">
                <table class="table table-striped table-bordered table-hover" id="wtdlist" style="width:100%;margin-top: 15px!important">
                    <thead>
                    <tr>
                        <th field="ck" width="5px" class="text-left"></th>
                        <th>委托编号</th>
                        <th>委托单位名称</th>
                        <th>联系电话</th>
                        <th>邮政编码</th>
                        <th>样品名称</th>
                        <th>样品数量</th>
                        <th>是否受理</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <table class="table table-striped table-bordered table-hover" id="incel_data" style="margin-top: 10px;">
                <thead style="background-color: rgb(250,255,209);">
                <tr><td></td><td></td></tr>
                <tr>
                    <td>请选择要导入的Excel文件:</td>
                    <td><input id="upcydxxglFile" type="file" name="upcydxxglFile"></td>
                </tr>
                <tr>
                    <td colspan="2"><span>温馨提示：请下载统一的模版，并按相应的格式在Excel软件中填写您的业务数据，然后再导入到系统中</span>
                        <br/><a href="javascript:;" id="importDown">下载模板</a></td>
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
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/importcydExcel.js"></script>
<script type="text/javascript">
    setInExcel.setPath('<%=request.getContextPath()%>');
    setInExcel.init("<%=type%>");
</script>
