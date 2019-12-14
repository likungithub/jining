<%--
  Created by IntelliJ IDEA.
  User: MDW
  Date: 2017/10/23 0023
  Time: 17:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>

<%
    java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    long dateMS = currentTime.getTime();

    currentTime.setTime(dateMS);
    String txtendDate = formatter.format(currentTime); //当前时间

    dateMS = dateMS - 60 * 60 * 24 * 1000 * 7;
    currentTime.setTime(dateMS);
    String txtstarDate = formatter.format(currentTime); //开始时间

    dateMS = dateMS + 60 * 60 * 24 * 1000 * 14;
    currentTime.setTime(dateMS);
    String txtBackDate = formatter.format(currentTime);

   String zydm =  CurrentLoginUser.getUser().getZydm();//人员代码
   String zymc =  CurrentLoginUser.getUser().getName();//人员名称

    String id = request.getParameter("id");

%>





<html>
<head>
    <title>allotTask</title>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/css/businesscooperate/allotTask.css">
    <style>
        #allot-task-form .moveInput{
            padding-left: 38px;
            width: 356px;
        }
        #allot-task-form .vB
        {
            vertical-align: text-bottom;
        }
        #allot-task-form .addA
        {
            float: left;
            width: 33px;
            height: 33px;
            line-height: 33px;
            text-align: center;
            border-radius: 0 4px 4px 0!important;
            color: #333;
            cursor: help;
        }
        #allot-task-form .addA>i:after,#chargeContractTip>i::after{
            content: '';
            display: block;
            width: 20px;
            height: 20px;
            border: 1px solid skyblue;
            margin-top: -17px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
<form class="form form-horizontal" id="allot-task-form">
    <div class="form-body">
        <div class="row" hidden>
            <div class="col-md-12 col-xs-12">
                <div class="form-group">
                    <label class="labelCommon  color666" style="width: 205px"><span class="required"> * </span>客户标示(名称/账号/手机号)&nbsp;&nbsp;</label>
                    <input type="text" id="khbsmc_id"  class="appsysinfo-m inputCommon " name="khbsmc"
                           style="width:434px">
                    <input type="hidden" name="khbsdm" id="khbsdm_id"/>
                    <input type="hidden" name="sjhm" id="sjhm_id"/>


                </div>
            </div>
        </div>
        <%--<div class="row" >
            <div class="col-md-12 col-xs-12">
                <div class="form-group">
                    <label class="labelCommon  color666" style="width: 189px"><span class="required"> * </span>合同&nbsp;&nbsp;</label>
                    <select id="htselect" style="width: 450px"  class="inputCommon" name="htbh"></select>
                </div>
            </div>
        </div>--%>
        <div class="row">
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="colorRed"> * </span>业务流程</label>
                    <select name="lcid" class="inputCommon inputWidth-col-one zg" id="lc_m"
                            style="width:167px!important;float: left;border-radius: 0!important">
                    </select>
                    <a href="javascript:void(0)" class="addA" data-toggle="tooltip" data-placement="bottom" title="任务无流程，请到【任务管理】-【流程管理】添加流程" id="addNewLc">
                        <i class="fa fa-question" style="color: skyblue;"></i>
                    </a>
                </div>
                <div class="borderRadius4" id="lcxx_id" style="width:678px;padding: 10px;position: relative;right: 15px;border: 1px solid #cfcfcf;margin-bottom: 15px;display: none">

                </div>
            </div>
            <div class="col-xs-6">
                <div class="form-group moveInput">
                    <label class="labelCommon labelWidth-col-two labelBg color666" style="width: 205px">合同&nbsp;&nbsp;</label>
                    <select style="width: 167px!important;border-radius: 0!important" class="inputCommon inputWidth-col-one" id="htselect" name="htbh"></select>
                    <div id="chargeContractTip" data-toggle="tooltip" data-placement="bottom" title="如果有收费内容，请选择合同。" style="float: left;height: 33px;line-height: 33px;text-align: center;border-radius: 0 4px 4px 0!important;cursor: help;">
                        <i class="fa fa-question" style="color: skyblue;margin-left: 8px"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-6">
                <div class="form-group ">
                    <label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>任务名称&nbsp;&nbsp;</label>
                    <input type="hidden" id="rwid_id" value="rwid"/>
                    <input type="text" class="inputCommon inputWidth-col-two" name="rwmc" maxlength="200">
                </div>
            </div>
            <div class="col-md-6  col-xs-6">
                <div class="form-group moveInput">
                    <div class="date beginTime pull-left mr">
                        <label class="labelCommon labelBg color666 labelWidth-col-two"><span class="required"> * </span>开始时间</label>
                        <input value="<%=txtendDate%>" type="text" readonly class="appsysinfo-m inputCommon " name="kssj"
                               style="border-radius: 0 !important; width:162px">
                        <span>
                            <button class="btn btn-default appsysinfobtn-m backfill" type="button"
                                    style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <div class="date createTime pull-left">
                        <label class="labelCommon labelBg color666 labelWidth-col-two" ><span class="required"> * </span>创建时间</label>
                        <input value="<%=txtendDate%>" type="text" readonly class="appsysinfo-m inputCommon " name="cjsj"
                               style="border-radius: 0 !important; width: 162px">
                        <span>
                            <button class="btn btn-default appsysinfobtn-m backfill" type="button"
                                    style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <div class="date endTime pull-left mr" style="width: 349px">
                        <label class="labelCommon labelBg color666 labelWidth-col-two" style="margin-left: 38px"><span class="required"> * </span>结束时间</label>
                        <input value="<%=txtBackDate%>" type="text" readonly class="appsysinfo-m inputCommon " name="jssj"
                               style="border-radius: 0 !important; width: 162px">
                        <span>
                            <button class="btn btn-default appsysinfobtn-m backfill" type="button"
                                    style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <%--<div class="col-md-6 col-xs-6">
                <div class="form-group moveInput">
                    <label class="labelCommon labelWidth-col-two color666">任务提醒&nbsp;&nbsp;</label>
                    <div class="pull-left taskM" style="text-indent: 16px;border: 1px solid #e5e5e5;height: 33px;border-radius: 0 4px 4px 0!important;border-left: none;width: 200px;padding-top: 4px">
                        <input type="checkbox" name="rwtx[]" value="001" id="taskRemind1" checked><label
                            for="taskRemind1">站内信</label>
                        &lt;%&ndash;<input type="checkbox" name="rwtx[]" value="002" id="taskRemind2"><label
                            for="taskRemind2">短信</label>
                        <input type="checkbox" name="rwtx[]" value="003" id="taskRemind3"><label
                            for="taskRemind3">微信</label>&ndash;%&gt;
                        <input type="checkbox" name="rwtx[]" value="004" id="taskRemind4" checked><label
                            for="taskRemind4">APP</label>
                    </div>
            </div>
            </div>--%>



        </div>
        <div class="row">
       <%--     <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="colorRed"> * </span>负责人</label>
                    <a href="javascript:;" id="addFZR" fzr_dm="<%=zydm%>" style="width: 200px;" class="btn btn-default  basic-info inputCommon" >
                        <i class="fa fa-wrench"></i> <span><%=zymc%></span>
                    </a>
                </div>
            </div>--%>



           <div class="col-md-6 col-xs-6">
               <div class="form-group">
                   <label class="labelCommon labelWidth-col-two color666">任务提醒&nbsp;&nbsp;</label>
                   <div class="pull-left taskM" style="text-indent: 16px;border: 1px solid #e5e5e5;height: 33px;border-radius: 0 4px 4px 0!important;border-left: none;width: 200px;padding-top: 4px">
                       <input type="checkbox" name="rwtx[]" value="001" id="taskRemind1" checked><label
                           for="taskRemind1">站内信</label>
                       <%--<input type="checkbox" name="rwtx[]" value="002" id="taskRemind2"><label
                           for="taskRemind2">短信</label>
                       <input type="checkbox" name="rwtx[]" value="003" id="taskRemind3"><label
                           for="taskRemind3">微信</label>--%>
                       <input type="checkbox" name="rwtx[]" value="004" id="taskRemind4"><label
                           for="taskRemind4">APP</label>
                   </div>
               </div>
           </div>


            <div class="col-md-6  col-xs-6">
                <div class="form-group moveInput">
                    <label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>紧急程度&nbsp;&nbsp;</label>
                    <div class="pull-left" style="padding-left: 16px;border: 1px solid #e5e5e5;height: 33px;border-radius: 0 4px 4px 0!important;border-left: none; width: 200px;padding-top: 4px;">
                        <input type="radio" id="jjcd1" name="jjcd" value="001" checked> <label for="jjcd1" class="mr vB">一般</label>
                        <input type="radio" id="jjcd2" name="jjcd" value="002"> <label for="jjcd2" class="mr vB">重要</label>
                        <input type="radio" id="jjcd3" name="jjcd" value="003"> <label for="jjcd3" class="mr vB">紧急</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
           <%-- <div class="col-md-6 col-xs-6">
                <div class="form-group">
                    <div class="date createTime pull-left mr">
                        <label class="labelCommon labelBg color666 labelWidth-col-two"><span class="required"> * </span>创建时间</label>
                        <input value="<%=txtendDate%>" type="text" readonly class="appsysinfo-m inputCommon " name="cjsj"
                               style="border-radius: 0 !important; width: 162px">
                        <span>
                            <button class="btn btn-default appsysinfobtn-m" type="button"
                                    style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                <i class="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>--%>
               <div class="col-md-6 col-xs-6">
                   <div class="form-group">
                       <label class="labelCommon labelWidth-col-two labelBg color666">
                           <span class="colorRed"> * </span>负责人</label>
                       <a href="javascript:;" id="addFZR" fzr_dm="<%=zydm%>" style="width: 200px;" class="btn btn-default  basic-info inputCommon" >
                           <i class="fa fa-wrench"></i> <span><%=zymc%></span>
                       </a>
                   </div>
               </div>
            <div class="col-md-6 col-xs-6">
                <div class="form-group moveInput">
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="colorRed"> * </span>发起人</label>
                    <a href="javascript:;" id="addFQR" fqr_dm="<%=zydm%>" style="width: 200px" class="btn btn-default  basic-info inputCommon" >
                        <i class="fa fa-wrench"></i> <span><%=zymc%></span>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-xs-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        <span class="colorRed"> * </span>执行人</label>
                    <a href="javascript:;" id="addZXR" style="width:568px;overflow: hidden" class="btn btn-default  basic-info inputCommon">
                        <i class="fa fa-wrench"></i> <span>单击选择执行人</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-xs-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        添加附件</label>
                    <a href="javascript:;" id="addFJ" style="width:568px;overflow: hidden" class="btn btn-default  basic-info inputCommon">
                        <i class="fa fa-wrench"></i> <span>单击选择附件</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-xs-12">
                <div class="form-group" style="margin-bottom: 26px">
                    <label class="labelCommon labelWidth-col-one labelBg color666" style="height: 80px;line-height: 80px">备注</label>
                     <textarea maxlength="500" name="bzxx" style="width: 568px!important;height: 80px;" class="inputCommon inputWidth-col-one color666"></textarea>
                    <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right: 0px;bottom: 5px;text-align: right;">剩余<span class="num" style="color: red;">300</span>个字符</p>
                </div>
            </div>
        </div>
    </div>
</form>
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/businesscooperate/allotTask.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function(){
        $('#chargeContractTip').tooltip();
        allotTaskOperate.setPath('<%=request.getContextPath()%>');
        allotTaskOperate.init('<%=id%>');
        $('a.addA','#allot-task-form').click(function(){

        });


        var dfjlhtml='<a style="font-size: 15px;margin-left: 16px;" onclick="allotTaskOperate.dfjl()">[垫付历史]</a>';
        //添加查看垫付记录
        $('.modal-title').append(dfjlhtml);
    });

</script>
</body>
</html>
