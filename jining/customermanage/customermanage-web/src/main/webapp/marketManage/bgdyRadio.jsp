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
        <table>
            <tr>
                <td style="width: 15px;"></td>
                <td>
                    <input id="fp" type="radio" name="Type"  value="1"/> 打印封皮
                </td>
            </tr>

            <tr>
                <td style="width: 15px;"></td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr>
                <td style="width: 15px;"></td>
                <td>
                    <input id="nr" type="radio" name="Type"  value="2"/> 打印内容
                </td>
            </tr>
            <tr>
                <td style="width: 15px;"></td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr>
                <td style="width: 15px;"></td>
                <td>
                    <input id="all" type="radio" name="Type"  value="3"/> 打印封皮和内容
                </td>
            </tr>
        </table>
    </div>
</div>
