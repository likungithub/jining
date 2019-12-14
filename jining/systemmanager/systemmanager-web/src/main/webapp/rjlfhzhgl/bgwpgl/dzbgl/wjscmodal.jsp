<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String type = request.getParameter("type");
	if (type == null) {
		type = "";
	}
%>
<div class="dataTables_wrapper no-footer" id="importFczzwj">
	<div class="auto-table-area" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">
		<form method="POST" enctype="multipart/form-data" id="formFczzwj">
			<table class="table table-striped table-bordered table-hover" id="incel_data">
				<thead style="background-color: rgb(250,255,209);">
				<tr>
					<td>
						<div style="clear:both;overflow: hidden;margin-top: 5px;">
							<input id="upFczzwj" type="file" name="upFczzwj">
						</div>
					</td>
				</tr>
				<tr hidden>
					<td>
						<div style="clear:both;overflow: hidden;margin-top: 5px;">
							<label class="labelCommon labelWidth-col-two labelBg color666" id="zl11">
								<span class="colorRed"> * </span>文件名称
							</label>
							<input class="form-control col-md-10" style="height: 33px; !important;width: 200px" name="WJFCNAME"  value="" id="WJFCNAME" placeholder="">
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div style="clear:both;overflow: hidden;margin-top: 5px;">
							<label class="labelCommon labelWidth-col-two labelBg color666" id="zl12">
								<span class="colorRed"> * </span>文件类型
							</label>
							<%--<input class="form-control" style="height: 33px; !important;" name="WJFCLX"  value="" id="WJFCLX" placeholder="">--%>
							<select id="WJFCLX" name="WJFCLX" class="form-control col-md-10" style="width: 200px">
								<option value="1">组织风采</option>
								<option value="2">学习园地</option>
							</select>
						</div>
					</td>
				</tr>
				</thead>
			</table>
		</form>
	</div>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/dzbgl/wjscmodal.js"></script>
<script type="text/javascript">
	$(function () {
        yqyysyListwjscmodal.init();
    })
</script>

