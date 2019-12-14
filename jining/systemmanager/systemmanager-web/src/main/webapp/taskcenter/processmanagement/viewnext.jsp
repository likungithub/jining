<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
%>
<style>
    .modal-dialog {
        width: 750px;
    }

    #sfjeinput input {
        border-top-right-radius: 4px !important;
        border-bottom-right-radius: 4px !important;
        background-color: #fff;
        height: 33px;
    }

    .stepHint {
        width: 670px;
        /*			background: red;*/
        height: 50px;
        /*border-bottom: 1px solid #ccc;*/
        padding-left: 15px;
    }

    /*.stepHint li{
        width: 31px;
        height: 31px;
        background: #d8d7d7;
        border-radius:50% ;
        z-index: 99;
        position: absolute;
        text-align: center;
        line-height: 31px;
        margin-right: 50px;
    }*/
    .stepHint li {
        height: 45px;
        width: 64px;
        position: relative;
        float: left;
    }

    .stepHint li div {
        width: 31px;
        height: 31px;
        background: #d8d7d7;
        border-radius: 50% !important;
        z-index: 99;
        position: absolute;
        text-align: center;
        line-height: 31px;
        margin-right: 50px;
    }

    .stepHint li span {
        color: #f3f3f3;
    }

    .stepHint img {
        position: absolute;
        top: -3%;
        margin-top: 16px;
        left: 31px;
        z-index: 1;
    }

    #stepForm .labelCommon {
        margin-left: 20px;
    }

    .stepHint li div.editColor {
        background: #79C002;
    }

    .stepHint li div.preservationColor {
        background: #0EA1F7;
    }
</style>
<form action="#" id="stepForm" class="form form-horizontal">
    <div class="form-body">
        <div class="clickTrue" style="border-bottom: 1px solid #dadada;height: 30px;/* background: #f1f1f1; */line-height: 30px;color: #10A0F7;/* padding-left: 20px; */padding-bottom: 40px;margin-bottom: 20px;">
            <img style="margin-right: 5px; vertical-align: sub;" src="/systemmanager/assets/pages/img/remindBulb.png" alt="提示的图标">
            <span>点击编号可以预览流程和任务信息</span>
        </div>
        <ul class="stepHint">

        </ul>
        <div class="row">
            <div>
                <div class="form-group">
                    <div class="col-md-12">
                        <label class="labelCommon labelWidth-col-one labelBg color666" style="margin-left:25px">
                            <span class="colorRed"> * </span>步骤名称</label>
                        <input type="text" class="inputCommon inputWidth-col-two bjbzList" name="bzmc"
                               style="width: 540px!important;">
                    </div>

                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666" style="margin-left:25px;float: left">
                        <span class="colorRed"> * </span>与下环节
                    </label>
                    <div style="width: 540px!important;height: 33px;float: left;
    border: 1px solid #e5e5e5;
    border-radius: 0 4px 4px 0!important;line-height: 33px">
                        <input class="link bjbzList" type="radio" name="type1" data=1 style="margin-left: 15px;vertical-align: text-bottom;"><span>并行</span>
                        <input class="link bjbzList" type="radio" name="type1" data=0 style="margin-left: 15px;vertical-align: text-bottom;"><span>串行</span>
                    </div>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-md-12">
                <div class="form-group" style="margin-bottom: 26px">

                    <label class="labelCommon labelWidth-col-two labelBg color666"
                           style="    width: 110px!important;height: 74px;line-height: 74px;margin-left:25px">
                        备注事项
                    </label>
                    <!-- <input type="text" class="inputCommon inputWidth-col-one" name="tbsx" style="width:647px !important" max="200"> -->
                    <textarea rows="3" class="form-control bjbzList" name="bzsx"
                              style="width:541px !important;background-color: #fff;height: 74px" maxlength="450"></textarea>
                    <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right: 38px;bottom: 5px;text-align: right;">剩余<span class="num" style="color: red;">300</span>个字符</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" style="padding: 0;">
                <div class="row3 clearfix">
                    <label class="labelCommon labelWidth-col-two color666" style="margin-left: 25px;width: 110px!important;">上传附件&nbsp;&nbsp;</label>
                    <a href="javascript:;" id="addbzFile" style="width:542px;border-radius: 0 4px 4px 0!important" class="btn btn-default  basic-info inputCommon">
                        <i class="fa fa-arrow-circle-up"></i> <span>单击上传附件</span>
                        <input type="hidden" id="jlid_id" value="jlid"/>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" style="margin-left:5px;margin-top: 30px">
                <p style="margin: 0!important;color: #999;padding-left: 5px;">备注：并行，指上一环节与下一环节可以同时进行；串行，指必须办理完上一环节后才能进行下一环节。</p>
            </div>
        </div>

    </div>
</form>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/taskcenter/nextview.js" type="text/javascript"></script>
<script>
    $(function () {
        stepHint.setPath('<%=request.getContextPath()%>');
        stepHint.init('<%=request.getContextPath()%>');
    });
</script>