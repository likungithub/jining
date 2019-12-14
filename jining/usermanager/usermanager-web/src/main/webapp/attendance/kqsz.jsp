<%--
  Created by IntelliJ IDEA.
  User: liuhao
  Date: 2018/3/14
  Time: 13:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String kqbh = request.getParameter("kqbh");
    if(kqbh==null){
        kqbh="";
    }
%>
<style>
    .setDate li{
        width: 50px;
        line-height: 30px;
        margin-right: 20px;
    }
    @media (min-width: 768px){
        .modal-dialog {
            width: 938px;
            /*margin: 30px auto;*/
        }
    }

    .setDate li input{
        vertical-align: text-bottom;
    }
    .setDate{
        width: 756px;
        margin: 0;
        height: 33px;
        border: 1px solid #e5e5e5;
        border-radius: 0 4px 4px 0!important;
    }
    #kqszCon .row{
        margin-bottom: 10px;
    }
    .doubt{
        vertical-align: -webkit-baseline-middle;
        margin-left: 10px;
        margin-top: 5px;
        width: 15px;
    }
    .closeAd{
        padding: 0;
        margin-top: -10px;
        font-size: 10px;
        margin-right: -5px;
        outline: none;
    }
    #addWiFiUl li,
    #addressUl li{
        float: left;
        height: 22px;
        line-height: 22px;
        margin-top: 5px;
        border-radius: 4px!important;
        background: #10a0f7;
        padding: 0 5px;
        color: #fff;
        margin-right: 10px;
        padding-bottom: 5px;
        position: relative;
        padding-right: 15px;
    }

    #addWiFiUl li i:hover,
    #addressUl li i:hover{
        cursor: pointer;
    }
</style>
<div id="kqszCon" style="width: 100%;padding: 10px;overflow: hidden">
    <div class="form-group">
        <div class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="required"> * </span>上下班时间</label>
                    <div class="input-group pull-left">
                        <div class="input-group bootstrap-timepicker timepicker">
                            <input type="text" class="inputCommon inputWidth-col-two appsysinfo-m statTime"
                                value="8:30:00" style="border-radius:0!important;width:100px!important;">
                            <span class="input-group-addon" style="border-radius: 0 4px 4px 0 !important;
                                background: #fefefe;">
                                <i class="glyphicon glyphicon-time"></i>
                            </span>
                        </div>
                    </div>
                    <span style="float: left;margin: 5px 6px" class="pull-left">-</span>
                    <div class="input-group pull-left">
                        <div class="input-group bootstrap-timepicker timepicker">
                            <input type="text" class="inputCommon inputWidth-col-two appsysinfo-m endTime"
                                value="17:30:00" style="border-radius:0! important;width:100px !important;">
                            <span class="input-group-addon" style="border-radius: 0 4px 4px 0 !important;
                                background: #fefefe;">
                                <i class="glyphicon glyphicon-time"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="required"> * </span>休息时间</label>
                    <div class="input-group  pull-left">
                        <div class="input-group bootstrap-timepicker timepicker">
                            <input type="text" class="inputCommon inputWidth-col-two appsysinfo-m restStartTime"
                                value="12:00:00" style="border-radius:0 !important;width:100px !important;">
                            <span class="input-group-addon" style="border-radius: 0 4px 4px 0 !important;
                                background: #fefefe;">
                                <i class="glyphicon glyphicon-time"></i>
                            </span>
                        </div>
                    </div>
                    <span style="float: left;margin: 5px 6px" class="pull-left">-</span>
                    <div class="input-group  pull-left">
                        <div class="input-group bootstrap-timepicker timepicker">
                            <input type="text" class="inputCommon inputWidth-col-two appsysinfo-m restEndTime"
                                value="13:00:00" style="border-radius:0 !important;width:100px !important;">
                            <span class="input-group-addon" style="border-radius: 0 4px 4px 0 !important;
                                background: #fefefe;">
                                <i class="glyphicon glyphicon-time"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="required"> * </span>工作日设置</label>
                    <ul class="pull-left setDate" style="">
                        <li class="pull-left">
                            <input type="checkbox" id="kq_Mon" value="1" checked="checked">
                            <label for="kq_Mon">周一</label>
                        </li>
                        <li class="pull-left">
                            <input type="checkbox" id="kq_Tues" value="2" checked="checked">
                            <label for="kq_Tues">周二</label>
                        </li>
                        <li class="pull-left">
                            <input type="checkbox" id="kq_Wed" value="3" checked="checked">
                            <label for="kq_Wed">周三</label>
                        </li>
                        <li class="pull-left">
                            <input type="checkbox" id="kq_Thur" value="4" checked="checked">
                            <label for="kq_Thur">周四</label>
                        </li>
                        <li class="pull-left">
                            <input type="checkbox" id="kq_Fri" value="5" checked="checked">
                            <label for="kq_Fri">周五</label>
                        </li>
                        <li class="pull-left">
                            <input type="checkbox" id="kq_Sat" value="6">
                            <label for="kq_Sat">周六</label>
                        </li>
                        <li class="pull-left">
                            <input type="checkbox" id="kq_Sun" value="7">
                            <label for="kq_Sun">周天</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-two color666">
                        <span class="required"> * </span>试用范围&nbsp;&nbsp;</label>
                    <a href="javascript:;" id="addBtnSelectOrg" class="btn btn-default basic-info inputCommon"
                        style="width: 298px;border-radius:0 4px 4px 0 !important">
                        <i class="fa fa-wrench"></i>
                        <span>全部</span>
                    </a>
                    <input type="text" class="inputCommon inputWidth-col-two inputWidth-col-two"
                        name="addBmdm" style="display: none" value="all">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="required"> * </span>补卡期限</label>
                    <input type="text" class="pull-left inputCommon inputWidth-col-one rclockDay"
                        style="width: 272px!important;" onchange="kqsz.checkNumber(this)" value="0">
                    <label class="pull-left" style="margin-top:8px;margin-left:8px;"> 天 </label>
                    <img class="doubt" src="<%=request.getContextPath()%>/assets/pages/img/question.png"
                        data-toggle="tooltip" title="超过补卡期限后，员工将不能申请补打卡">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-two labelBg color666">加班开始时间</label>
                    <div class="input-group pull-left">
                        <div class="input-group bootstrap-timepicker timepicker">
                            <input type="text" class="inputCommon inputWidth-col-two appsysinfo-m overTime"
                                value="18:00:00" style="border-radius:0 !important;width:257px !important;">
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-time"></i>
                            </span>
                        </div>
                    </div>
                    <img class="doubt" src="<%=request.getContextPath()%>/assets/pages/img/question.png"
                        data-toggle="tooltip"  title="加班时间默认为下班时间" alt="">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="required"> * </span>允许偏差范围</label>
                    <input type="text" class="pull-left inputCommon inputWidth-col-two deviation"
                        style="width: 272px!important;" onchange="kqsz.checkNumber(this)" value="50">
                    <label class="pull-left" style="margin-top:8px;margin-left:8px;">米</label>
                    <img class="doubt" src="/user/assets/pages/img/question.png" data-toggle="tooltip" title="" data-original-title="推荐设置范围在50-100米左右">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="required"> * </span>是否关联WiFi</label>
                    <div class="" style="float:left;width:298px;border-radius: 0 4px 4px 0!important;
                        border:1px solid #e5e5e5;height: 33px;padding: 5px;">
                        <input type="radio" class="pull-left" name="wifi" value="true" id="wifitrue" style="margin-left: 10px;" checked="checked">
                        <label class="pull-left" style="margin-top: 2px;margin-left: 5px;" for="wifitrue">是</label>
                        <input class="pull-left" type="radio" name="wifi" value="false" id="wififalse" style="margin-left: 115px;">
                        <label class="pull-left" style="margin-top: 2px;margin-left: 5px;" for="wififalse">否</label>
                    </div>
                    <img class="doubt" src="<%=request.getContextPath()%>/assets/pages/img/question.png"
                         data-toggle="tooltip" title="启用后，员工必须连上指定WIFI，才能正常签到/签退">
                </div>
            </div>
        </div>
        <div class="row wifidiv">
            <div class="col-md-12">
                <div class="input-group">
                    <div style="float: left;border: 1px solid #ccc;border-radius: 4px!important;">
                        <label class="labelCommon labelWidth-col-two labelBg color666"
                            style="border: none!important;padding-left: 18px;width: auto!important;
                            min-height: 33px!important;height: auto;">
                            <span style="float: left"><span class="required"> * </span>添加WiFi</span>
                            <ul class="pull-left" id="addWiFiUl" style="border-radius: 0 4px 4px 0!important;
                                min-height: 33px;margin-bottom: 0;padding-bottom: 5px;margin-left: 23px;
                                width: 674px;background: #fff;">
                            </ul>
                        </label>
                    </div>
                    <button class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr ml addWifi"
                        type="button"><i class="fa fa-plus mr"></i>添加</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="input-group">
                    <div style="float: left;border: 1px solid #ccc;border-radius: 4px!important;">
                        <label class="labelCommon labelWidth-col-two labelBg color666" style="height: auto;
                            border: none!important;width: auto!important;min-height: 33px!important;
                            padding-left: 18px;">
                            <span style="float: left"><span class="required"> * </span>考勤地点</span>
                            <ul class="pull-left" id="addressUl" style="border-radius: 0 4px 4px 0!important;
                                width: 674px;margin-bottom: 0;padding-bottom: 5px;margin-left: 21px;
                                min-height: 33px;background: #fff;">
                            </ul>
                        </label>
                    </div>
                    <button class="btn btnAdd btnBorderColor colorfff borderRadius4 pull-left mr ml addAddress"
                        type="button"><i class="fa fa-plus mr"></i>添加</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div style="display:none;position: absolute;left:140px;margin-top: -15px;">
    <div id="showMap" style="width: 650px;height: 250px;background-color: red">
    </div>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/attendance/kqsz.js"></script>
<script>
    $(function () {
        kqsz.setPath("<%=request.getContextPath()%>");
        kqsz.init('<%=kqbh%>');
    });
</script>

