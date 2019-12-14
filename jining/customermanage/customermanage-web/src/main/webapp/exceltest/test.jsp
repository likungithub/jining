<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@ page import="java.util.UUID" %>

<%
    UUID uuid = UUID.randomUUID();
    String id = request.getParameter("id");
    String name = request.getParameter("name");
%>

<div>
    <input type="file"onchange="imp(this)" />
    <div id="excelContent"></div>


    <button onclick="exp()">导出</button>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/excel/FileSaver.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/excel/xlsx.full.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/excel/excelutil.js"
        type="text/javascript"></script>
<script type="text/javascript">
function imp(obj) {
    importf(obj,function(datas){
        console.log(datas);
        $.ajax({
            url: '/customermanage/exceltest/imp',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: datas,
            success: function (result) {
                if (result.success) {
                    Messenger().post({
                        message:"保存成功",
                        type:"info"
                    });
                } else {
                    Messenger().post({
                        message: result.message,
                        type: 'danger'
                    });
                }

            },
            error: function (result) {
                Messenger().post({
                    message: '保存失败！'+result.message,
                    type: 'danger'
                });
            }
        });
    });

}

function exp() {
    $.ajax({
        url: '/customermanage/exceltest/exp',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        // data: datas,
        success: function (result) {
            // console.log(result);
            if (result.success) {
                var jsonObj =  JSON.parse(result.data);
                downloadExl(jsonObj);
            } else {
                Messenger().post({
                    message: result.message,
                    type: 'danger'
                });
            }

        },
        error: function (result) {
            Messenger().post({
                message: '保存失败！'+result.message,
                type: 'danger'
            });
        }
    });
}
</script>