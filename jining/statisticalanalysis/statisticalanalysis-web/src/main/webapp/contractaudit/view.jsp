<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
    String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<style>
.modal-dialog{
    width:750px;
}
#contractForm  .indBtn{
    height: 33px;
    border-left:none;
}
#sfjeinput input{width: 220px !important;
    border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;
    background-color:#fff;
    height: 33px;}
</style>
<form action="#" id="contractForm" class="form form-horizontal">
    <div class="form-body">
        <div class="row">
            <div>
                <div class="form-group">
                    <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-two labelBg color666">客户名称</label>
						<input type="text" class="inputCommon inputWidth-col-two" name="yhmc" readonly>
                    </div>
                    <div class="col-md-6" style="position: relative;left: -28px;">
                        <label class="labelCommon labelWidth-col-two labelBg color666">签约日期</label>
						<div class="input-group date qyrq">
                            <input type="text" class="inputCommon inputWidth-col-two" readonly
                                style="width:181px !important;border-top-right-radius:0px !important;border-bottom-right-radius:0px !important;" name="qyrq">
                            <span>
                                <button class="btn btn-default indBtn" type="button" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                        </div>
                    </div>
				</div>   
			</div>
        </div>
        <div class="row">
            <div>
                <div class="form-group">
                    <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-two labelBg color666">收费项目</label>
                        <div class="col-md-3 input-group">
                            <button type="button" class="btn  inputCommon inputWidth-col-two dropdown-toggle" data-toggle="dropdown" id="selectBtn"
                                 style="width:200px !important;font-size:12px;background-color:#fff">项目<span class="caret"></span>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-6" style="position: relative;left: -28px;">
                        <label class="labelCommon labelWidth-col-two labelBg color666">收费金额</label>
                        <div class="col-md-3 input-group" id="sfjeinput">
                            <input type="Number" class="form-control" name="sfxm" readonly style="width: 220px !important;" value="0.00">
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two labelBg color666">服务期限</label>
                    <div class="input-group pull-left">
                        <div class="input-group date createDate">
                            <input type="text" class="form-control inputCommon inputWidth-col-two" name="createDate"  readonly
                                style="width:160px !important;font-size:12px !important;border-top-right-radius:0px !important;border-bottom-right-radius:0px !important;background-color: #fff;">
                            <span>
								<button class="btn btn-default indBtn" type="button" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;">
									<i class="fa fa-calendar"></i>
								</button>
							</span>
                        </div>
                    </div>
                    <label class="control-label" style="padding-left: 15px;padding-right: 15px;">至 </label>
                    <div>
                        <div class="input-group date startDate">
                            <input type="text" class="form-control inputCommon inputWidth-col-two" name="startDate" style="font-size:12px !important;
                                border-top-left-radius:4px !important;border-bottom-left-radius:4px !important;border-top-right-radius: 0px !important;
                                border-bottom-right-radius: 0px !important;width:281px !important;background-color: #fff;" readonly>
                            <span>
                                <button class="btn btn-default indBtn" type="button" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;">
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
                    <div class="col-md-6 input-group pull-left">
                        <label class="labelCommon labelWidth-col-two labelBg color666">付款方式</label>
                        <div class="input-group">
                            <button type="button" class="btn inputCommon inputWidth-col-two dropdown-toggle" style="width:100px !important;font-size: 12px;color: #333;background-color: #fff"
                                 id="typeBtn" data-toggle="dropdown">付款方式<span class="caret"></span>
                            </button>
                            <button type="button" class="btn inputCommon inputWidth-col-two dropdown-toggle" style="width:100px !important;font-size: 12px;color: #333;background-color: #fff"
                                 id="fkxhBtn" data-toggle="dropdown">付款方式<span class="caret"></span>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-6 input-group pull-left">
                        <div class="btn btn-sm btnBlue btnBorderColor colorfff borderRadius4 pull-left mr viewfilelist" style="position: relative;left:-10px;">查看附件</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two labelBg color666" style="height: 74px;line-height: 74px;">特别事项</label>
                    <textarea rows="3" class="form-control " name="tbsx" style="width:560px !important;background-color: #fff;" maxlength="450" readonly></textarea>
                </div>
            </div>
        </div>
        <div class="row">
            <div>
				<div class="form-group">
					<div class="col-md-6">
                        <label class="labelCommon labelWidth-col-two labelBg color666">录入人</label>
						<input type="text" class="inputCommon inputWidth-col-two" name="lrr" readonly>
                    </div>
                    <div class="col-md-6" style="position: relative;left: -25px;">
                        <label class="labelCommon labelWidth-col-two labelBg color666">审核人</label>
                        <input type="text" class="inputCommon inputWidth-col-two" readonly name="shr" style=" width: 220px !important;">
                    </div>
				</div>   
			</div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two labelBg color666" style="height: 74px;line-height: 74px;">审核意见</label>
                    <textarea rows="3" class="form-control " name="shyj" style="width:560px !important;background-color: #fff;" maxlength="450" readonly></textarea>
                </div>
            </div>
        </div>
        <div class="row">
            <div>
                <div class="form-group">
                    <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-two labelBg color666">审核时间</label>
	                    <div class="input-group pull-left">
	                        <div class="input-group date shDate">
	                            <input type="text" class="form-control inputCommon inputWidth-col-two" name="shDate"  readonly
	                                style="width:160px !important;font-size:12px !important;border-top-right-radius:0px !important;border-bottom-right-radius:0px !important;background-color: #fff;">
	                            <span>
	                                <button class="btn btn-default indBtn" type="button" style="border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;">
	                                    <i class="fa fa-calendar"></i>
	                                </button>
	                            </span>
	                        </div>
	                    </div>
                    </div>
                </div>   
            </div>
        </div>
	</div>
</form>
<script
	src="<%=request.getContextPath()%>/assets/pages/scripts/contractaudit/view.js"
	type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
		contractView.setPath('<%=request.getContextPath()%>');
		contractView.init('<%=id%>');
	});
</script>