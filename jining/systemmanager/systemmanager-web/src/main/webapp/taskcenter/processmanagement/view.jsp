<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
    java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    long dateMS = currentTime.getTime();

    currentTime.setTime(dateMS);
    String txtendDate = formatter.format(currentTime); //结束时间

    dateMS = dateMS - 60 * 60 * 24 * 1000 * 7;
    currentTime.setTime(dateMS);
    String txtstarDate = formatter.format(currentTime); //开始时间


    String bz = request.getParameter("bz");
    if (bz == null){
        bz = "";
    }
%>
<style>
.modal-dialog{
    width:750px;
}
#sfjeinput input{
    border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;
    background-color:#fff;
    height: 33px;}
</style>
<form action="#" id="processForm" class="form form-horizontal">
	<div class="form-body">
		<div class="row">
            <div>
				<div class="form-group">
                    <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-two labelBg color666" style="margin-left: 28px;">
                            <span class="colorRed"> * </span>服务项目</label>
                        <div class="col-md-3 input-group">
                            <%--<button type="button" class="btn  inputCommon inputWidth-col-two dropdown-toggle" data-toggle="dropdown" id="selectBtn" style="width:200px !important;font-size:12px;">项目--%>
                            <%--<span class="caret"></span>--%>
                            <%--</button>--%>
                            <%--<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" id="sfxm"><li role="presentation" class="select" onclick="contractAdd.showproject(this);"><a role="menuitem" tabindex="-1" href="#" class="SFXM_001">代理服务费</a></li><li role="presentation" class="select" onclick="contractAdd.showproject(this);"><a role="menuitem" tabindex="-1" href="#" class="SFXM_002">其他</a></li></ul>--%>
                            <select id="addCharge" name="addCharge" style="height: 33px;border-radius: 0 4px 4px 0!important;width: 200px;border-color: #e5e5e5;padding-left: 10px;" class="mr pull-left viewlist">
                                <option value="000">请选择</option>
                                <%--<option value="001">服务费用</option>--%>
                            </select>
                        </div>
                    </div>
					<div class="col-md-6"  style="position: relative;
    left: -28px;">
                        <label class="labelCommon labelWidth-col-two labelBg color666" style="margin-left: 28px;">
                            <span class="colorRed"> * </span>流程名称</label>
						<input type="text" class="inputCommon inputWidth-col-two viewlist" name="lcmc">
                     </div>

				</div>
			</div>
        </div>


		<div class="row">
            <div>
                <div class="form-group">
                    <div class="col-md-6">
                        <label class="labelCommon labelWidth-col-two labelBg color666" style="margin-left: 28px;">
                            <span class="colorRed"> * </span>流程步数</label>
                        <div class="col-md-3 input-group">
                            <%--<button type="button" class="btn  inputCommon inputWidth-col-two dropdown-toggle" data-toggle="dropdown" id="selectBtn" style="width:200px !important;font-size:12px;">项目--%>
                                <%--<span class="caret"></span>--%>
                            <%--</button>--%>
                            <%--<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" id="sfxm"><li role="presentation" class="select" onclick="contractAdd.showproject(this);"><a role="menuitem" tabindex="-1" href="#" class="SFXM_001">代理服务费</a></li><li role="presentation" class="select" onclick="contractAdd.showproject(this);"><a role="menuitem" tabindex="-1" href="#" class="SFXM_002">其他</a></li></ul>--%>
                                <select id="addEducation" name="addEducation" style="height: 33px;border-radius: 0 4px 4px 0!important;width: 200px;border-color: #e5e5e5;padding-left: 10px;" class="mr pull-left viewlist">
                                    <option value="0">请选择</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                </select>
                        </div>
                    </div>
                    <div class="col-md-6" style="position: relative;
    left: -28px;">
                        <div class="input-group date addTime pull-left mr">
                        <label class="labelCommon labelWidth-col-two labelBg color666" style="margin-left: 28px;">
                            <span class="colorRed"> * </span>创建时间</label>
                        <input type="text" readonly="" class="inputCommon appsysinfo-m viewlist" name="addDate" style="border-radius: 0 !important;width: 100px;width: 162px" value='<%=txtendDate%>'>
                        <span>
                                        <a  class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    <i class="fa fa-calendar"></i>
                                    </a>
                                    </span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
		
      <div class="row">
            <div class="col-md-12">
                <div class="form-group" style="margin-bottom: 26px;">
                    <!--  <label class="control-label col-md-3">特别事项： </label>
                     <div class="col-md-9">
                         <input type="text" class="form-control" name="tbsx">
                     </div> -->
                    <!-- <label class="labelCommon labelWidth-col-one labelBg color666">
                        特别事项
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="tbsx"> -->
                    <label class="labelCommon labelWidth-col-two labelBg color666" style="height: 74px;line-height: 74px;margin-left: 28px;">
                        描述信息
                    </label>
                    <!-- <input type="text" class="inputCommon inputWidth-col-one" name="tbsx" style="width:647px !important" max="200"> -->
                    <textarea rows="3" class="form-control viewlist" name="msxx" style="font-size:12px;height: 74px;width:541px !important;background-color: #fff;" maxlength="450"></textarea>
                    <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right: 38px;bottom: 5px;text-align: right;">剩余<span class="num" style="color: red;">300</span>个字符</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" style="padding: 0;">
                <div class="row3 clearfix">
                    <label class="labelCommon labelWidth-col-two color666" style="margin-left: 28px;">上传附件&nbsp;&nbsp;</label>
                    <a href="javascript:;" id="addLcFile" style="width:542px;border-radius: 0 4px 4px 0!important" class="btn btn-default  basic-info inputCommon">
                        <i class="fa fa-arrow-circle-up"></i> <span>单击上传附件</span>
                        <input type="hidden" id="jlid_id" value="jlid"/>
                    </a>
                </div>
        </div>
        <div class="row">
            <div class="col-md-12" style="padding-left:42px;margin-top: 30px">
                <p style="margin: 0!important;color: #999;">备注：<span style="color:#ff8915">流程步数</span>一旦保存将不能修改，请慎重选择。</p>
            </div>
        </div>
	</div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/taskcenter/view.js" type="text/javascript"></script>
<script>
    processmanagementView.setPath("<%= request.getContextPath()%>");
    processmanagementView.init();
</script>
