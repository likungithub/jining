<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
String zh = request.getParameter("zh");
%>
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/securityassets/css/style.css"
	type="text/css" />

<div class="container" id="setZh">
	<div class="col-md-12" style="height: 100px;margin-top: 5px;">
         <div class="form-body">
             <div class="row">
                 <div class="form-group"> 
                     <div class="col-md-12 input-group">
                         <label class="labelCommon labelWidth-col-one labelBg color666" style="height: 34px;">当前账号</label>
                         <div class="col-md-8 input-group" id="nowZh">
                             <input type="text" class="form-control" name="nowZh" readonly="readonly" value="<%=zh%>">
                         </div>
                     </div>
                 </div>
                 <div class="form-group"> 
                     <div class="col-md-12 input-group">
                         <label class="labelCommon labelWidth-col-one labelBg color666" style="height: 34px;">变更账号</label>
                         <div class="col-md-8 input-group" id="changeZh">
                             <input type="text" class="form-control" name="changeZh" >
                         </div>

                     </div>
                 </div>
             </div>
         </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/users/updateZh.js" type="text/javascript"></script>
<script type="text/javascript">
    $("#setZh").closest(".modal-content").css("width","550px");
    $("#setZh").closest(".modal-content").css("margin-left","70px");
    $(function(){
        setZh.init('<%=request.getContextPath()%>','<%=zh%>');
    });
    
</script>