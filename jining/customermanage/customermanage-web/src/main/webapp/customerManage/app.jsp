<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%
    String khdm = request.getParameter("khdm");
    if (khdm == null) {
    khdm = "";
    }
%>

<div class="row" id="appZH">
        <div class="col-md-12" style="height: 100px;margin-top: 5px;">
            <form action="#" id="appForm" class="form form-horizontal" enctype="multipart/form-data">
                <div class="form-body">
                    <div class="row">
                        <div class="form-group"> 
                            <div class="col-md-12 input-group">
                                <label class="labelCommon labelWidth-col-one labelBg color666" style="margin-left: 30px;height: 34px;">当前登录手机号</label>
                                <div class="col-md-8 input-group" id="nowZh">
                                    <input type="text" class="form-control" name="nowZh" readonly="readonly">
                                </div>
                            </div>
                        </div>
                        <div class="form-group"> 
                            <div class="col-md-12 input-group">
                                <label class="labelCommon labelWidth-col-one labelBg color666" style="margin-left: 30px;height: 34px;">变更登录手机号</label>
                                <div class="col-md-8 input-group" id="changeZh">
                                    <input type="text" class="form-control" name="changeZh" >
                                </div>
                            </div>
                        </div>
                        <div class="form-group"> 
                            <div class="col-md-12 input-group">
                                <label class="labelCommon labelWidth-col-one labelBg color666" style="margin-left: 30px;height: 80px;line-height: 80px;">备注信息</label>
                                <div class="col-md-8 input-group" id="bzxx">
                                    <textarea type="text" class="form-control" name="bzxx" style="height: 80px;"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
</div>
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/customerManage/app.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
    	AppSave.setPath('<%=request.getContextPath()%>');
    	AppSave.init('<%=khdm %>');
    });
</script>