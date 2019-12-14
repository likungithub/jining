<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<form action="#" id="editcgsws" class="form form-horizontal" enctype="multipart/form-data">
	<div class="form-body">
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						文件描述
					</label>
						<input type="text" class="inputCommon inputWidth-col-one color666" name="fileContent">	
				</div>
				
			</div>
				<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						上传文件
					</label>
						<input type="file" class="inputCommon inputWidth-col-one color666" name="file" style="text-indent: 300px;padding-top: 5px;">
				</div>
				
			</div>
			 <div class="row" style="margin-top: 10px;display: none;" id="schedule">
            <div class="col-md-12">
                <div class="progress">
                    <div class="progress-bar" style="width:0%; background:#2e9dc2;">
                        <div class="progress-value">0%</div>
                    </div>
                </div>
            </div>
        </div>
		</div>
	</div>
</form>
<link href="<%=request.getContextPath()%>/assets/pages/css/customergettingstarted/edit.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/customergettingstarted/edit.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		customeredit.setPath("<%=request.getContextPath() %>");
		customeredit.init("<%=request.getParameter("id")%>");
	});
</script>