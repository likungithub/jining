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
    <div class="row"  style="margin-top: 10px;">
        <tr>
            <td>
                <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
                    <label class="labelCommon labelBg color666 dateLabel-m">复核日期</label>
                    <input type="text" class="inputCommon appsysinfo-m" id="fhrq" value="<%=txtDate%>" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                </div>
            </td>
        </tr>

        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
        </tr>
        <tr>
            <td>
                <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
                    <label class="labelCommon labelBg color666 dateLabel-m">检验日期</label>
                    <input type="text" class="inputCommon appsysinfo-m" id="jyrq" value="<%=txtDate%>" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                </div>
            </td>
        </tr>

    </div>
</div>
<script type="text/javascript">
    $(function () {
        $("#fhrq").datepicker({
            clearBtn: true,
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN'
        });

        $("#jyrq").datepicker({
            clearBtn: true,
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN'
        });
    });
</script>
