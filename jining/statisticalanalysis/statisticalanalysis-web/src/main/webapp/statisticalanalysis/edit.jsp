<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<form action="#" id="employeeForm" class="form form-horizontal">
	<div class="form-body">
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">姓名：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="name">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">编号：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="code">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">性别：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<div class="radio-list" data-error-container="#form_sex_error">
							<label class="radio-inline">
								<input type="radio" name="sex" value="male"> 男
							</label>
							<label class="radio-inline">
								<input type="radio" name="sex" value="female"> 女
							</label>
						</div>
						<div id="form_sex_error"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">年龄：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="text" class="form-control" name="age">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">兴趣爱好：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<div class="checkbox-list" data-error-container="#form_interest_error">
							<label class="checkbox-inline">
								<input type="checkbox" value="basketball" name="interest"> 篮球 </label>
							<label class="checkbox-inline">
								<input type="checkbox" value="football" name="interest"> 足球 </label>
							<label class="checkbox-inline">
								<input type="checkbox" value="running" name="interest"> 跑步 </label>
							<label class="checkbox-inline">
								<input type="checkbox" value="other" name="interest"> 其他 </label>
						</div>
						<div id="form_interest_error"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">出生日期：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<div class="input-group date birthday">
							<input type="text" class="form-control" readonly name="birthday">
                                                        <span class="input-group-btn">
                                                            <button class="btn default" type="button">
																<i class="fa fa-calendar"></i>
															</button>
                                                        </span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">籍贯：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<select name="nationality" class="form-control nationality" data-error-container="#form_nationality_error">
							<option></option>
							<optgroup label="亚洲">
								<option value="cn">中国</option>
								<option value="kr">韩国</option>
								<option value="jp">日本</option>
							</optgroup>
							<optgroup label="欧洲">
								<option value="uk">英国</option>
								<option value="ger">德国</option>
								<option value="fr">法国</option>
							</optgroup>
						</select>
						<div id="form_nationality_error"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/statisticalanalysis/edit.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		employeeEdit.setPath("<%=request.getContextPath() %>");
		employeeEdit.init("<%=id%>");
	});
</script>