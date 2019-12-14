<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String type = request.getParameter("type");
    if (type == null) {
        type = "";
    }
    java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    String txtDate = format.format(currentTime); //将日期时间格局化
%>

<div class="form-body form form-horizontal"  style="margin-left: 13px;">
    <div class="row"  style="margin-top: 10px">
        <div style="margin-bottom: 10px">
            <span>表格中只显示已拆分科室的样品</span>
        </div>

        <table id="ksTable">

            <%--<tr>--%>
                <%--<td style="width: 15px;"></td>--%>
                <%--<td>--%>
                    <%--<input id="wsw" type="radio" name="dyks"  value="1"/> 微生物--%>
                <%--</td>--%>
            <%--</tr>--%>

            <%--<tr>--%>
                <%--<td style="width: 15px;"></td>--%>
                <%--<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>--%>
            <%--</tr>--%>
            <%--<tr>--%>
                <%--<td style="width: 15px;"></td>--%>
                <%--<td>--%>
                    <%--<input id="lhs" type="radio" name="dyks"  value="2"/> 理化室--%>
                <%--</td>--%>
            <%--</tr>--%>

            <%--<tr>--%>
                <%--<td style="width: 15px;"></td>--%>
                <%--<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>--%>
            <%--</tr>--%>
            <%--<tr>--%>
                <%--<td style="width: 15px;"></td>--%>
                <%--<td>--%>
                    <%--<input id="both" type="radio" name="dyks"  value=""/> 微生物和理化室--%>
                <%--</td>--%>
            <%--</tr>--%>
        </table>
    </div>
</div>
<script>
    $(function () {
        $.ajax({
            url:'/customermanage/ypgl/getKsByDmList',
            type: 'POST',
            async:false,
            success: function (data) {
                $("#ksTable").empty();
                var $line = $("<tr><td style='width: 15px;margin-top: 10px;'></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>")
                for(var i = 0;i<data.length;i++){
                    // $("#ksTable").append($line);
                    var $val = $("<tr><td style='width: 15px;margin-top: 10px;'><td><input id='ks"+i+"' type='radio' name='dyks' value="+data[i].ZBKS_DM+">"+data[i].ZBKS_MC+"</td></td></tr>");
                    $("#ksTable").append($val);
                }
                // $("#ksTable").append($line);
                var $valend = $("<tr><td style='width: 15px;margin-top: 10px;'><td><input id='both' type='radio' name='dyks' value=''>所有</td></td></tr>");
                $("#ksTable").append($valend);
            }
        })
    })
</script>