<%--
  Created by IntelliJ IDEA.
  User: MDW
  Date: 2018/4/12 0012
  Time: 9:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%

    String khdm = request.getParameter("khbm");
    if (khdm == null) {
        khdm = "";
    }

    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }

%>
<style>

    #allWrapcommunicationRecord >.top::-webkit-scrollbar{
        width: 10px;
        background-color: #f5f5f5;
    }

    /*楼主的字体*/
    #allWrapcommunicationRecord .floorHostFont{
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: #333333;
    }
    #allWrapcommunicationRecord .replyFont{
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color:#2683f5;
    }

    /*定义滚动条的轨道，内阴影及圆角*/
    #allWrapcommunicationRecord >.top::-webkit-scrollbar-track{
        /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
        border-radius: 4px;
        background-color: #ffff;
    }
    /*定义滑块，内阴影及圆角*/
    #allWrapcommunicationRecord >.top::-webkit-scrollbar-thumb{
        border-radius: 4px;
        /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
        background-color: #cccccc;
    }

    #allWrapcommunicationRecord .myclose
    {
        height: 15px;
        width: 15px;
        background: #fff;
        color: #2683F5;
        border-radius: 50%;
        line-height: 15px;
        text-align: center;
        cursor: pointer;
        position: relative;
    }
    #allWrapcommunicationRecord .top>.floorHost>.info>img{
        position: absolute;
        top: 0;
        left: -52px;
        height: 35px;
        width: 35px;
        border-radius: 50%!important;
    }

    #allWrapcommunicationRecord >.top>.currentsubmitter>img{
        position: absolute;
        top: 0;
        right: -52px;
        height: 35px;
        width: 35px;
        border-radius: 50%!important;
    }
    #allWrapcommunicationRecord .top>.floorHost>.info>.mainInfo>.wrap2{
        background: #eee;
        padding: 10px;
        width: 600px;
        border-radius: 10px!important;
        position: relative;
    }
    #allWrapcommunicationRecord .top>.floorHost>.info>.mainInfo{
        line-height: 20px;
    }
    #allWrapcommunicationRecord .top>.floorHost>.info>.mainInfo>.wrap2:before{
        position: absolute;
        left: -26px;
        top: 10px;
        content: '';
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 12px solid transparent;
        border-right: 20px solid #eee;
        transform: rotate(30deg);
    }
    #allWrapcommunicationRecord >.top>.floorHost>.info>.replyInfo
    {
        border: 1px solid #eee;
        width: 600px;
        padding: 10px;
        line-height: 20px;
    }
    #allWrapcommunicationRecord >.top>.currentsubmitter>.publishContent
    {
        background: #2683F5;
        color: #fff;
        padding: 10px;
        border-radius: 10px!important;
    }
    #allWrapcommunicationRecord >.top>.currentsubmitter>.publishContent:before
    {
        position: absolute;
        right: -27px;
        top: 30px;
        content: '';
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 12px solid transparent;
        border-right: 20px solid #2783f5;
        transform: rotate(160deg);
    }
    #allWrapcommunicationRecord >.bottom .mytool{
        width: 50%;
        background: #F5F5F5;
        height: 33px;
        line-height: 33px
    }
    /*文件展示*/
    #customerManageEditForm .allWrapcommunicationRecord-files .chat-item-files,#customerManageEditForm .files-content .chat-item-files{
        line-height: 30px;
        padding-left: 10px;
        position: relative;
        margin-top:5px!important;
        margin-bottom:5px!important;
        color: #333!important;
    }
    .allWrapcommunicationRecord-files .chat-item-files img,.files-content .chat-item-files img{
        vertical-align: middle;
        width: 30px;
        height: 30px;
    }
    .allWrapcommunicationRecord-files .chat-item-files span,.files-content .chat-item-files span{
        margin-left: 10px;
    }
    .allWrapcommunicationRecord-files .chat-item-files b,.files-content .chat-item-files b{
        position: absolute;
        width: 15px;
        height: 15px;
        line-height: 13px;
        text-align: center;
        border-radius: 50%;
        background-color: #666;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
    }
    .allWrapcommunicationRecord-files::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    .allWrapcommunicationRecord-files::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #666;
        opacity:0.6;
    }
    .allWrapcommunicationRecord-files::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #EDEDED;
    }
    .communicationRecord-bottom{
        margin: 0 2px;
        border-top:1px solid #e8e8e8;
    }
    .communicationRecord-bottom>.clearfix{
        border-left:1px solid #e8e8e8;
        border-right:1px solid #e8e8e8;
    }
    .communicationRecord-bottom .allWrapcommunicationRecord-files{
        border:1px solid ;
        border-color: #4bbeff;
    }
    .communicationRecord-bottom .allWrapcommunicationRecord-files.active{
        /*border-color: #82c70c;*/
        border-image: -webkit-linear-gradient(to left, #82c70c, #4bbeff) 30 165;
        border-image: -webkit-linear-gradient(to left, #82c70c, #4bbeff) 30 165;
        border-image:linear-gradient(to left, #4bbeff, #82c70c) 30 165;
    }
    .communicationRecord-save-wrap{
        height: 35px;
    }
    #communicationRecord-save{
        float: right;
        width: 60px;
        height: 28px;
        background: #10a0f7;
        text-decoration: none;
        color: white;
        text-align: center;
        line-height: 28px;
        font-size: 14px;
        margin-right: 35px;
        margin-top: 15px;
        border-radius: 4px!important;
        cursor: pointer;
    }
    #customerManageEditForm .publishContent .chat-item-files{
        color: #fff!important;
    }
    #customerManageEditForm .publishContent .chat-item-files i{
        color: #fff!important;
    }
</style>

<div id="allWrapcommunicationRecord">
    <input type="hidden" value="0" id="communicationRecordsign">
    <input type="hidden"  id="communicationRecordsign1">
    <input type="hidden"  id="communicationRecordsign2">
    <input type="hidden"  id="communicationRecordsign3">
    <input type="hidden"  id="communicationRecordhflx">
    <div class="top clearfix" style="height: 413px;overflow: auto;overflow-x: hidden">
       <%-- <div class="floorHost" style="margin: 10px 0;">
            <div class="info" style="position:relative;margin-left: 60px">
                <img src="<%=request.getContextPath()%>/assets/pages/img/ReviewPasss.png" alt="头像">
                <div class="mainInfo">
                    <div class="wrap1 clearfix">
                        <span class="hostName">马大伟</span>
                        <span class="hostTime">2018年4月12日10:23:49</span>
                        <a href="javascript:void(0)" class="pull-right" style="margin-right: 136px">回复</a>
                    </div>
                    <div class="wrap2">
                        <div class="timeInfo">
                            <span>沟通时间：</span>
                            <span>2018年4月12日10:24:42</span>
                        </div>
                        <div class="infoContent">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto atque culpa cum debitis delectus dignissimos distinctio eius eos et expedita harum libero maxime obcaecati, odio possimus quam ut vel.
                            </p>
                        </div>
                        <div class="Enclosure">
                            <p>这是附件</p>
                        </div>
                    </div>
                </div>
                <div class="replyInfo" style="margin: 10px 0">
                        <div class="replyTop">
                            <span>张三回复马大伟</span>
                            <span>2018年4月12日10:47:31</span>
                        </div>
                    <div class="replyMid">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet beatae consectetur ea, et expedita in incidunt libero modi optio placeat porro praesentium quaerat quo quod ratione veritatis vero voluptas!
                        </p>
                    </div>
                    <div class="replyEnclosure">
                        <p>这是附件</p>
                    </div>
                </div>
            </div>
        </div>--%>
        <%--<div class="currentsubmitter pull-right" style="padding: 10px 0;width: 600px;margin-right: 60px;position: relative">--%>
            <%--<img src="<%=request.getContextPath()%>/assets/pages/img/ReviewPasss.png" alt="头像">--%>
            <%--<div class="clearfix">--%>
                <%--<span class="pull-right">2018年4月12日13:16:33</span>--%>
            <%--</div>--%>
            <%--<div class="publishContent">--%>
                <%--<div class="clearfix">--%>
                    <%--<i class="fa fa-times myclose"></i>--%>
                    <%--<span class="pull-right">--%>
                        <%--2018年4月12日13:18:02--%>
                    <%--</span>--%>
                <%--</div>--%>
                <%--<div class="text-right">--%>
                    <%--<p>我是发表内容</p>--%>
                <%--</div>--%>
                <%--<div class="text-right">--%>
                    <%--<p>我是附件信息</p>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</div>--%>
    </div>
    <div class="bottom communicationRecord-bottom">
        <div class="clearfix"><%--style="margin-left: -15px;width: 818px"--%>
            <div class="pull-left mytool" style="padding-left: 15px">
                <span>沟通时间：</span>
                <span>
                    <input type="text" id="communicateTime" readonly style="border: none;background: #f5f5f5;width: 110px;height: 33px;">
                </span>
                <a href="javascript:void(0)" id="communicateTimeBtn" style="text-decoration: none;position: relative;left: -16px">
                    <i class="fa fa-calendar mr ml iconFontSize" style="color: #787878"></i>
                </a>
                <a href="javascript:void(0)" id="communicateAddFilesBtn" title="上传附件">
                    <i class="icon iconfont icon-fujian mr iconFontSize" style="color: #787878"></i>
                </a>
            </div>
            <div class="pull-right mytool clearfix" style="padding-right: 15px">
                 <span class="pull-right" style="color: #999">
                    剩余输入<span id="communicationRecordtextareaWords" style="color: #ff3d3d">300</span>字
                </span>
                <label for="checkboxRemind" class="ml pull-right" style="margin-right: 15px;cursor: pointer">提醒</label>
                <input type="checkbox" id="checkboxRemind" class="pull-right" style="margin-top: 10px">
            </div>
        </div>
        <div style="height: 160px;overflow-y: auto" class="allWrapcommunicationRecord-files" FilesUrl="">
            <textarea style="height: 90%;width: 100%;padding-left: 15px;padding-top:10px;outline: none;border: none" id="communicationRecordtextarea"></textarea>
        </div>
    </div>
    <div class="communicationRecord-save-wrap">
        <span id="communicationRecord-save">发送</span>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/customerManage/interactive.js" type="text/javascript"></script>
<script>
    $(function(){
        checkHowMany('#communicationRecordtextarea','#communicationRecordtextareaWords',300);
        interactive.init('<%=khdm%>', '<%=id%>');
        interactive.setPath('<%=request.getContextPath()%>');
    })
</script>