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

</style>
<form action="#" id="addlxrForm" class="form form-horizontal">
	<div class="form-body">
		<div class="row">
        <div>
            <div class="form-group">
                <div class="col-md-12">
                    <label class="labelCommon labelWidth-col-one labelBg color666" style="margin-left: 28px;">
                        <span class="colorRed"> * </span>联系人或单位</label>
                    <input type="text" class="inputCommon inputWidth-col-one viewlist" name="lxr" style="width: 400px!important;">
                </div>
            </div>
        </div>
    </div>
		<div class="row">
            <div>
                <div class="form-group">
                    <div class="col-md-12">
                        <div class="input-group pull-left mr">
                        <label class="labelCommon labelWidth-col-one labelBg color666" style="margin-left: 28px;">
                            <span class="colorRed"> * </span>手机号码</label>
                        <input type="text" class="inputCommon appsysinfo-m viewlist" name="phoneNum" style="width: 400px;">
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div>
                <div class="form-group">
                    <div class="col-md-12">
                        <div class="input-group pull-left mr">
                            <label class="labelCommon labelWidth-col-one labelBg color666" style="margin-left: 28px;">办公电话</label>
                            <input type="text" class="inputCommon appsysinfo-m viewlist" name="telNum" style="width: 400px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div>
                <div class="form-group">
                    <div class="col-md-12">
                        <div class="input-group  pull-left mr">
                            <label class="labelCommon labelWidth-col-one labelBg color666" style="margin-left: 28px;">QQ</label>
                            <input type="text" class="inputCommon appsysinfo-m viewlist" name="QQNum" style="width: 400px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div>
                <div class="form-group">
                    <div class="col-md-12">
                        <div class="input-group  pull-left mr">
                            <label class="labelCommon labelWidth-col-one labelBg color666" style="margin-left: 28px;">Email</label>
                            <input type="text" class="inputCommon appsysinfo-m viewlist" name="EmailNum" style="width: 400px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div>
                <div class="form-group">
                    <div class="col-md-12">
                        <div class="input-group date addTime pull-left mr">
                            <label class="labelCommon labelWidth-col-one labelBg color666" style="margin-left: 28px;">联系地址</label>
                            <input type="text" class="inputCommon appsysinfo-m viewlist" name="address" style="width: 400px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <div class="row">
            <div class="col-md-12">
                <div class="form-group" style="margin-bottom: 26px">
                    <label class="labelCommon labelWidth-col-one labelBg color666" style="height: 74px;line-height: 74px;margin-left: 28px;">
                        备注信息
                    </label>
                    <textarea rows="3" class="form-control viewlist" name="bzxx" style="font-size:12px;height: 74px;width:400px !important;background-color: #fff;" maxlength="450"></textarea>
                    <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right: 38px;bottom: 5px;text-align: right;">剩余<span class="num" style="color: red;">300</span>个字符</p>
                </div>
            </div>
        </div>
	</div>
</form>
<%--<script src="<%=request.getContextPath()%>/assets/pages/scripts/taskcenter/view.js" type="text/javascript"></script>--%>
<script>
    //textarea输入字数限制
    var obj = $("#addlxrForm textarea");
    var num = 300;
    var numObj = $("#addlxrForm .wordNum span")
    checkHowMany(obj,numObj,num);
</script>
