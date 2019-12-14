<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
.modal-dialog{
   width:682px;
}
.modal-footer {
    padding-right: 34px;
}
</style>
<form action="#" id="pwdForm" class="form form-horizontal">
	<div class="form-body">
		<!-- <div class="row" data-type="pwd">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">原密码
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="password" class="form-control" name="originUserPwd" id="originUserPwd">
					</div>
				</div>
			</div>
		</div> -->
		 <div class="row form-group" data-type="pwd">
            <div class="col-md-12">
                <div class="input-group">
                  <!--   <div class="col-md-12">
                       <div class="input-group-addon col-md-4 required"> <span class="required"> * </span>原密码 </div>
                        <input type="password" class="border4" name="originUserPwd" id="originUserPwd">
                    </div> -->
                    <label class="labelCommon labelWidth-col-one labelBg color666">
						<span class="required colorRed"> * </span>原密码</label>
						<input type="password" class="inputCommon inputWidth-col-one" name="originUserPwd" id="originUserPwd">
                </div>
            </div>
        </div>
        
		
		<!-- <div class="row" data-type="pwd">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">新密码：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="password" class="form-control" name="newUserPwd" id="newUserPwd">
					</div>
				</div>
			</div>
		</div> -->
		 <div class="row form-group" data-type="pwd">
            <div class="col-md-12">
                <div class="input-group">
                  <!--   <div class="col-md-12">
                       <div class="input-group-addon col-md-4 required"><span class="required"> * </span>新密码： </div>
                        <input type="password" class="border4" name="newUserPwd" id="newUserPwd">
                    </div> -->
                     <label class="labelCommon labelWidth-col-one labelBg color666">
						<span class="required colorRed"> * </span>新密码</label>
						<input type="password" class="inputCommon inputWidth-col-one" name="newUserPwd" id="newUserPwd">
                </div>
            </div>
        </div>
		
		<!-- <div class="row" data-type="pwd">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label col-md-3">确认新密码：
						<span class="required"> * </span></label>
					<div class="col-md-9">
						<input type="password" class="form-control" name="rePwd">
					</div>
				</div>
			</div>
		</div> -->
		<div class="row form-group" data-type="pwd">
            <div class="col-md-12">
                <div class="input-group">
                   <!--  <div class="col-md-12">
                       <div class="input-group-addon col-md-4 required"><span class="required"> * </span>确认新密码： </div>
                        <input type="password" class="border4" name="newUserPwd" name="rePwd">
                    </div> -->
                      <label class="labelCommon labelWidth-col-one labelBg color666">
						<span class="required colorRed"> * </span>确认新密码</label>
						<input type="password" class="inputCommon inputWidth-col-one" id="confirmUserPwd" name="rePwd">
                </div>
            </div>
        </div>
		
	</div>
</form>
<script src="<%=request.getContextPath()%>/securityassets/scripts/modifypwd.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/md5.js" type="text/javascript"></script>