<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="java.util.UUID" %>
<%
    String uuid = UUID.randomUUID().toString();
    String zl = request.getParameter("zl");
    if (zl == null) {
        zl = "";
    }
%>
<div class="row" id="<%=uuid%>-manager-container">
    <div class="dataTables_wrapper no-footer">
        <div class="auto-table-area" style="-moz-user-select:none;">
            <table class="table table-striped table-hover paramsTab">
                <tr>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label>名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<input id="dzbgl1" name="name" type="text" class="form-control">
                        </div>
                    </td>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label>性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
								<select id="dzbgl2" name="sex" class="form-control" style="width: 200px">
									<option value=""></option>
									<option value="1">男</option>
									<option value="0">女</option>
								</select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label>出生年月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                            <input id="dzbgl3" name="csrq" type="text" class="form-control">
                        </div>
                    </td>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label>民族&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                            <input id="dzbgl4" name="mz" type="text" class="form-control">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label>参加工作时间</label></span>
                            <input id="dzbgl5" name="gzsj" type="text" class="form-control">
                        </div>
                    </td>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label>入党时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                            <input id="dzbgl6" name="rdsj" type="text" class="form-control">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label>行政职务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                            <input id="dzbgl7" name="dnzw" type="text" class="form-control">
                        </div>
                    </td>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label>党内职务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                            <input id="dzbgl8" name="dnzw1" type="text" class="form-control">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label>籍贯&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                            <input id="dzbgl9" name="jg" type="text" class="form-control">
                        </div>
                    </td>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label>文化程度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                            <input id="dzbgladd10" name="whcd" type="text" class="form-control">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group input-group"
                             style="left: -3px;margin-left: 3px;position:relative;;width:300px!important;border-radius: 4px!important;overflow: hidden;">
                            <span class="input-group-addon"><label>备注信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                            <input id="dzbgladd11" name="bzxx" type="text" class="form-control">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>

<script type="application/javascript"
        src="<%=request.getContextPath()%>/assets/pages/scripts/dzbgl/dzb/add_dyxx.js"></script>
<script type="application/javascript">
    add_dyxxList.inint("<%=uuid%>");
</script>