<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/11/1 0001
  Time: 15:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String id = request.getParameter("id");
    if(id==null){
        id="";
    }
%>
<html>
<head>
    <title>任务详情</title>
    <script src="<%= request.getContextPath()%>/assets/pages/scripts/taskcenter/lib/js/modernizr.custom.js"></script>
    <style>
        #detailStepView_m .clickdisbtn
        {
            width: 767px;
            text-align: center;
            margin: 10px auto 0px;
            padding: 10px;
            cursor: pointer;
            color: #10A0F7;
            letter-spacing: 3px;
            border: 1px solid #dadada;
            border-left: none;
            border-right: none;
        }
        #detailStepView_m .discontent
        { transition: height 1s linear;
            border: 1px solid #dadada;
            min-height: 100px;
            border-radius:0 0 4px 4px!important;
            border-top:none;
        }
        #detailStepView_m .stepActive{
            background:#79BE01 ;
        }
        #detailStepView_m .stressRed{
            color: red;
        }
        #detailStepView_m .remindMethod
        {
            height: 33px;
            border: 1px solid #dadada;
            width: 357px;
            padding-top: 5px;
            text-indent: 34px;
            border-radius: 0 4px 4px 0!important;
        }
        #detailStepView_m .remindMethod  input{
            margin-left: 5px;
            vertical-align: sub;
        }
        #detailStepView_m .remindMethod label{
            text-indent: 10px;
        }
        #detailStepView_m .remindMethod>label{
            text-indent:13px;
            cursor: pointer;
        }

        .clearMDW:after{
            content: '';display: block;visibility: hidden;clear: both;height: 0;
        }
        .clearMDW{-ms-zoom: 1}
        .task_step_list_m .modal-dialog{
            width: 800px;
        }
        div.outwrap{
            float: left;
            height: 50px;
        }
        div.outwrap>div{
            float: left;
            width: 32px;
            height: 33px;
            background: #10A0F7;
        }
        div.outwrap>div:nth-child(2n+1){
            margin: 14px 0;
            height: 4px;
            width: 18px;
            background:#D7D7D7!important ;
        }
        div.outwrap>div:nth-child(2){
            height: 33px;width: 33px;
            border-radius: 50%!important;
            line-height: 33px;
            text-align: center;
            color: #fff;
            font-size: 20px;
            font-weight: bolder;
        }
        .stepcontainer{
            /*height: 50px;*/
            padding: 9px 0 0 19px;
            background:#f1f1f1;
        }

        #detailStepView_m  .area1 .row4>.container{
            margin-top: 10px;
            width: 768px!important;
            height: 260px;
            overflow-y: auto;
        }
        #detailStepView_m  .area0>.row1>div{
            width: 383px;
            float: left;
            padding: 10px 20px;
        }
        /*时间轴的样式*/
        #detailStepView_m  .area1>.row4 .active{
            border: none!important;
            background: #F8F8F8!important;
        }
        #detailStepView_m  .area1>.row4 .active1{
            display: none;
        }
        #detailStepView_m  .area1>.row4  .active2
        {
            background: #119FF6!important;
        }
        #detailStepView_m  .area1>.row4  ul{
            background: #F8F8F8;
            padding-top: 15px;
        }
        #detailStepView_m  .area1>.row4  ul>li>p:nth-child(1){
            width: 160px;
            text-align: right;
        }
        #detailStepView_m  .area1>.row4 ul>li>p:nth-child(2){
            width: 2px;
            background: #E7E7E7;
            margin: 0 15px;
            min-height: 50px;
        }

        #detailStepView_m  .area1>.row4 ul>li>p:nth-child(2)>span{
            display: inline-block;
            height: 10px;
            width: 10px;
            background: #BCBDCF;
            border-radius: 50%!important;
            margin-top: 5px;
            position: relative;
            top: 11px;
            right: 4px;
        }

        #detailStepView_m  .area1>.row4  ul>li>p:nth-child(3){
            background: #fff;
            border: 1px solid #dadada;
            width: 575px;
            border-radius: 4px;
            /* min-height: 50px; */
            letter-spacing: 2px;
            text-align: justify;
            padding: 10px 0;
        }
        #detailStepView_m  .area1>.row4  ul>li>p:nth-child(3)>i:nth-child(1){
            position: relative;
            right: 10px;
            color: #dadada;
        }
        #detailStepView_m  .area1>.row4  ul>li>p:nth-child(3)>i:nth-child(2){
            position: relative;
            right: 21px;
            color: #fff;
        }
        #detailStepView_m  .area1>.row4  ul>li>p:nth-child(3)>span{
            display: block;
            padding: 0px 16px;
            position: relative;
            bottom:18px;
        }
        #detailStepView_m  .area1>.row4  ul>li:first-child{
            color: #119FF6!important;
        }
        #detailStepView_m  .area1>.row4  ul
        {
            max-height: 300px;
            overflow-y: auto;
            width: 780px;
            margin-top: 15px;
        }
        #detailStepView_m  .area1>.row4  p{
            margin: 0;
        }
        /*步骤容器的调整*/
        #detailStepView_m >.stepcontainer>div.outwrap:last-child>div:nth-last-of-type(1),
        #detailStepView_m >.stepcontainer>div.outwrap:first-child>div:first-child{
            display: none;
        }
        #detailStepView_m >.stepcontainer>div.outwrap:first-child>img{
            display: none!important;
        }
        /*公用的样式*/
        #detailStepView_m  .fontS{
            font-size: 30px;
        }
        #detailStepView_m  .fScale {
            transform: rotate(90deg);
            -ms-transform: rotate(90deg); /* IE 9 */
            -webkit-transform: rotate(-180deg); /* Safari and Chrome */
        }

        /*时间轴上的动态类名*/
        #detailStepView_m  .area1>.row4>ul>li .NObgandbor{
            background:none;
            border:none;
        }
        /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
        ::-webkit-scrollbar
        {
            width: 10px;
            height: 10px;
            background-color: #F5F5F5;
        }

        /*定义滚动条轨道 内阴影+圆角*/
        ::-webkit-scrollbar-track
        {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            border-radius: 10px;
            background-color: #F5F5F5;
        }

        /*定义滑块 内阴影+圆角*/
        ::-webkit-scrollbar-thumb
        {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: #555;
        }

        #detailStepView_m .stepcontainer>.outwrap>div:nth-child(2){
            cursor: pointer;
        }
        #detailStepView_m .stepcontainer>.outwrap>div:nth-child(2):hover{
            box-shadow: 0 0 5px 5px #aaa;
        }



     #detailStepView_m  #chuanbingsign {
         height: 33px;
         border: 1px solid #dadada;
         width: 258px;
         border-radius: 0 4px 4px 0!important;
         cursor: help;
         text-align: center;
         font-weight: 800;
        }
        #detailStepView_m  strong.taskInfoClose-m{
            color: #eee;
        }
        #detailStepView_m  strong.taskInfoClose-m:hover{
            color:#119FF6!important;
        }

        /*当前正在办理的步骤号码*/
        #detailStepView_m  .activeNum{
            background: #FE9200;
        }
        #detailStepView_m .padL77{
            padding-left: 77px;
        }
        #detailStepView_m .xuxianrow1:after{
            content: '';
            position: relative;
            visibility: visible;
            display: block;
            border-top: 1px dashed #dedede;
            width: 750px;
            left: 8px;
            top: 15px;
        }

    </style>
</head>
<body>
    <section id="detailStepView_m">
        <div style="height: 30px;line-height: 30px;color: #10A0F7;padding-left: 20px;">
            <img style="margin-right: 5px; vertical-align: sub;" src="<%=request.getContextPath()%>/assets/pages/img/remindBulb.png" alt="提示的图标">
            <span>点击编号可以预览流程和任务信息</span>
        </div>
        <div class="stepcontainer clearMDW borderRadius4" style="margin-bottom: 10px">
        </div>
        <div class="area0">
            <div class="row1 clearfix xuxianrow1" style="border: 1px solid #dedede;border-radius: 4px 4px 0 0 !important;padding: 15px 0;border-bottom: none">
                <div>
                    <i class="icon iconfont icon-shijian1 mr fontS" style="font-size: 25px;vertical-align: middle;color: #b1d3df"></i>
                    <span>起止时间：</span>
                    <span>20170630</span>
                    <span>至</span>
                    <span>20170708</span>
                </div>
                <div>
                    <i class="icon iconfont icon-shouyijibie mr fontS" style="vertical-align: middle;margin-left: 12px;color: #b1d3df"></i>
                    <span>级别：</span>
                    <span>重要</span>
                </div>
                <div>
                    <i class="icon iconfont icon-cy_fqr mr fontS" style="vertical-align: middle;color: #b1d3df"></i>
                    <span>发起人：</span>
                    <span>张三</span>
                </div>
                <div>
                    <i class="icon iconfont icon-cy_fqr mr fontS" style="vertical-align: middle;margin-left: 12px;color: #b1d3df"></i>
                    <span>负责人：</span>
                    <span>李四</span>
                </div>
                <div style="width: 770px!important">
                    <i class="icon iconfont icon-cy_fqr mr fontS"  style="vertical-align: middle;color: #b1d3df"></i>
                    <span>执行人：</span>
                    <span style="display: inline-block;width: 634px; vertical-align: text-top;">马大伟</span>
                </div>
            </div>
            <div class="row4 clearfix" style="border: 1px solid #dedede;border-top: none;border-radius: 0 0 4px 4px!important;">
                <div class="form-group">
                    <div class="row">
                        <div class="col-xs-12 padL77">
                            <button id="gongsineirongBtn" class="btn btnBlue btnBorderColor colorfff borderRadius4 pull-right mr" style="font-size: 12px">展开公司信息 <i class="glyphicon glyphicon-menu-down"></i></button>
                        </div>
                    </div>
                </div>
                <div  id="gongsineirongWrap" class="hide">
                    <div class="form-group">
                     <div class="row">
                         <div class="col-xs-12 padL77">
                             <span>公司名称：</span>
                             <span class="companyInfo"></span>
                         </div>
                     </div>
                   </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-xs-6 padL77
">
                                <span style="padding-left: 62px;">税务登记号：</span>
                                <span  class="companyInfo"></span>
                            </div>
                            <div class="col-xs-6 padL77">
                                <span>主管会计：</span>
                                <span class="companyInfo"></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-xs-6 padL77">
                                <span>法人代表：</span>
                                <span class="companyInfo"></span>
                            </div>
                            <div class="col-xs-6 padL77">
                                <span>证件号码：</span>
                                <span class="companyInfo"></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-xs-6 padL77">
                                <span>联系人：</span>
                                <span class="companyInfo"></span>
                            </div>
                            <div class="col-xs-6 padL77">
                                <span>手机号码：</span>
                                <span class="companyInfo"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row2 clearfix" style="border-bottom: 1px solid #dadada;min-height: 120px;padding-left: 50px;padding-top: 15px">

            </div>
            <div class="row3" style="min-height: 120px;padding-left: 50px;">

            </div>
        </div>
        <div class="area1" style="display: none;background: #f7f7f7">
            <div class="row0">
                <div class="clickdisbtn">备注和附件<i class="glyphicon glyphicon-menu-down fontS" style="font-size: 18px;vertical-align: sub;"></i></div>
                <div class="contentcontainer discontent clearfix" style="padding: 10px">

                </div>
            </div>
            <div class="row1 clearfix" style="margin: 10px 0">
                <label class="labelCommon" style="width: 100px"><span class="stressRed">*</span>办理状态</label>
                <select class=" inputCommon mr wanchengzhuangtai" style="width: 200px;border-radius: 0 4px 4px 0!important;" name="blzt" id="rw_blzt_id">
                    <option value="006">未开始</option>
                    <option value="002">进行中</option>
                    <option value="001">已完成</option>
                    <option value="003">已取消</option>
                    <option value="004">已延迟</option>
                    <option value="005">暂停中</option>
                </select>
                <label class="labelCommon" style="width: 100px"> <span class="stressRed">*</span>提醒方式</label>
                <div class="pull-left remindMethod">
                    <form  id="remindMethod_m">
                    <input type="checkbox" id="remindMethod1" name="txfs[]" value="001" checked><label for="remindMethod1">站内信</label>
                    <%--<input type="checkbox" id="remindMethod2" name="txfs[]" value="002"><label for="remindMethod2">短信</label>--%>
                    <%--<input type="checkbox" id="remindMethod3" name="txfs[]" value="003"><label for="remindMethod3">微信</label>--%>
                    <input type="checkbox" id="remindMethod4" name="txfs[]" value="004"><label for="remindMethod4">app提醒</label>
                    </form>
                </div>
            </div>
            <div class="row2" style="margin-bottom:10px;position: relative; " >
                <textarea placeholder="请输入工作内容" style="margin-bottom: 26px;border-color: #119FF6;width: 100%;min-height: 90px;padding: 10px" class="borderRadius4" name="gznr" maxlength="500"></textarea>
                <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right: 38px;bottom: 5px;text-align: right;">剩余<span class="num" style="color: red;">300</span>个字符</p>
            </div>
            <div class="row3 clearfix">
                <label class="labelCommon labelWidth-col-two color666">上传附件&nbsp;&nbsp;</label>
                <a href="javascript:;" id="tsakupLoadM" style="width: 300px;border-radius: 0 4px 4px 0!important" class="btn btn-default  basic-info inputCommon">
                    <i class="fa fa-arrow-circle-up"></i> <span>点击上传附件</span>
                    <input type="hidden" id="jlid_id" value="jlid"/>
                </a>
                <label class="labelCommon labelWidth-col-two color666 ml">串并行标志&nbsp;&nbsp;</label>
                <input type="text" readonly id="chuanbingsign">
            </div>
            <div class="row4">
                <ul class="list-unstyled">
                    <li class="clearfix">
                        <p class="pull-left"></p>
                        <p class="pull-left">
                            <span class="active2"></span>
                        </p>
                        <p class="pull-left"><i class="glyphicon glyphicon-triangle-left"></i><i class="glyphicon glyphicon-triangle-left"></i></p>
                    </li>
                    <li class="clearfix">
                        <p class="pull-left"></p>
                        <p class="pull-left">
                            <span></span>
                        </p>
                        <p class="pull-left active"><i class="active1 glyphicon glyphicon-triangle-left"></i><i class="active1 glyphicon glyphicon-triangle-left"></i></p>
                    </li>
                    <li  class="clearfix">
                        <p class="pull-left"></p>
                        <p class="pull-left">
                            <span></span>
                        </p>
                        <p class="pull-left active"><i class="active1 glyphicon glyphicon-triangle-left"></i><i class="active1 glyphicon glyphicon-triangle-left"></i></p>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <script src="<%= request.getContextPath()%>/assets/pages/scripts/taskcenter/taskmanagement/taskdetail.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            taskdetailList_m.setPath("<%= request.getContextPath()%>");
            taskdetailList_m.init('<%=id %>');
            $('.contentcontainer','#detailStepView_m').hide();
            $('.clickdisbtn','#detailStepView_m').click(function(){

                    $('.contentcontainer','#detailStepView_m').slideToggle();
                $('.clickdisbtn i','#detailStepView_m').toggleClass('fScale');

            });
        });
        
        $('#gongsineirongBtn',$('#detailStepView_m')).click(function () {
            $(('#gongsineirongWrap'),$('#detailStepView_m')).toggleClass('hide');
            if ($(('#gongsineirongWrap'),$('#detailStepView_m')).hasClass('hide')){
                $('#gongsineirongBtn',$('#detailStepView_m')).html('展开公司信息 <i class="glyphicon glyphicon-menu-down"></i>');
        }else {
                $('#gongsineirongBtn',$('#detailStepView_m')).html('收起公司信息 <i class="glyphicon glyphicon-menu-up"></i>');
            }


        });
        
        
        
    </script>

</body>
</html>

