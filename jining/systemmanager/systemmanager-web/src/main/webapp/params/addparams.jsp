<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<form action="#" id="paramsForm" class="form form-horizontal">
	<div class="form-body">
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						参数类型：
					</label>
						<input type="text" class="inputCommon inputWidth-col-one color666" name="type" readonly="readonly" disabled>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						类型名称：
					</label>
						<input type="text" class="inputCommon inputWidth-col-one color666" name="typename" readonly="readonly" disabled>
				</div>
			</div>
		</div>
		<div class="row" style="display: none;">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">
                        <span class="required"> * </span>
						参数代码：
					</label>
                        <input type="text" class="inputCommon inputWidth-col-one color666" name="typecode">
                </div>
            </div>
        </div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						参数名称:
					</label>
						<input type="text" class="inputCommon inputWidth-col-one color666" name="paramsname">
				</div>
			</div>
		</div>
	</div>
</form>
<link href="<%=request.getContextPath()%>/assets/pages/css/params/addparams.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/params/paramsadd.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		paramsAdd.setPath("<%=request.getContextPath() %>");
		paramsAdd.init("<%=id%>");
	});
</script>