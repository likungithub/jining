<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
	.viewProductInitpr{
		padding-right: 0!important;
	}
</style>
<div class="row">
	<div class="col-md-12 col-xs-12 form form-horizontal">
		<div class="form-body">
			<div class="row">
				<div class="col-md-12 col-xs-12">
					<div class="form-group">
						<label class="control-label col-md-2 col-xs-2 color333 padding-right-reset modal-title-thick viewProductInitpr">配置类型：</label>
						<div class="col-md-10 col-xs-10">
							<p class="form-control-static color666" id="id_dmPzlx"></p>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12 col-xs-12">
					<div class="form-group">
						<label class="control-label col-md-2 col-xs-2 color333 padding-right-reset modal-title-thick viewProductInitpr">值1：</label>
						<div class="col-md-10 col-xs-10">
							<p class="form-control-static color666" id="id_key1"></p>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12 col-xs-12">
					<div class="form-group">
						<label class="control-label col-md-2 col-xs-2 color333 padding-right-reset modal-title-thick viewProductInitpr">值2：</label>
						<div class="col-md-10 col-xs-10">
							<p class="form-control-static color666" id="id_key2"></p>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12 col-xs-12">
					<div class="form-group">
						<label class="control-label col-md-2 col-xs-2 color333 padding-right-reset modal-title-thick viewProductInitpr">值3：</label>
						<div class="col-md-10 col-xs-10">
							<p class="form-control-static color666" id="id_key3"></p>
						</div>
					</div>
				</div>
			</div>


			<div class="row">
				<div class="col-md-12 col-xs-12">
					<div class="form-group">
						<label class="control-label col-md-2 col-xs-2 color333 padding-right-reset modal-title-thick viewProductInitpr">值4：</label>
						<div class="col-md-10 col-xs-10">
							<p class="form-control-static color666" id="id_key4"></p>
						</div>
					</div>
				</div>
			</div>


			<div class="row">
				<div class="col-md-12 col-xs-12">
					<div class="form-group">
						<label class="control-label col-md-2 col-xs-2 color333 padding-right-reset modal-title-thick viewProductInitpr">值5：</label>
						<div class="col-md-10 col-xs-10">
							<p class="form-control-static color666" id="id_key5"></p>
						</div>
					</div>
				</div>
			</div>


			<div class="row">
				<div class="col-md-12 col-xs-12">
					<div class="form-group">
						<label class="control-label col-md-2 col-xs-2 color333 padding-right-reset modal-title-thick viewProductInitpr">值6：</label>
						<div class="col-md-10 col-xs-10">
							<p class="form-control-static color666" id="id_key6"></p>
						</div>
					</div>
				</div>
			</div>


			<div class="row">
				<div class="col-md-12 col-xs-12">
					<div class="form-group">
						<label class="control-label col-md-2 col-xs-2 color333 padding-right-reset modal-title-thick viewProductInitpr">值7：</label>
						<div class="col-md-10 col-xs-10">
							<p class="form-control-static color666" id="id_key7"></p>
						</div>
					</div>
				</div>
			</div>


			<div class="row">
				<div class="col-md-12 col-xs-12">
					<div class="form-group">
						<label class="control-label col-md-2 col-xs-2 color333 padding-right-reset modal-title-thick viewProductInitpr">值8：</label>
						<div class="col-md-10 col-xs-10">
							<p class="form-control-static color666" id="id_key8"></p>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/csxtpz/csxtpzview.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		productView.setPath("<%=request.getContextPath() %>");
		productView.init("<%=request.getParameter("id")%>");
	});
</script>