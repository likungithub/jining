<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/10/31 0031
  Time: 9:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    #taskFileAdd_m   .progress-title {
        font-size: 16px;
        font-weight: 700;
        color: #333;
        margin: 0 0 20px;
    }

    #taskFileAdd_m   .progress {
        height: 10px;
        background: #333;
        border-radius: 0;
        box-shadow: none;
        margin-bottom: 30px;
        overflow: visible;
        z-index: 10086;
    }

    /* 有点问题 */
    #taskFileAdd_m   .progress .progress-bar {
        position: relative;
        -webkit-animation: animate-positive 2s;
        animation: animate-positive 2s;
    }

    #taskFileAdd_m   .progress .progress-bar:after {
        content: "";
        display: inline-block;
        width: 9px;
        background: #fff;
        position: absolute;
        top: -10px;
        bottom: -10px;
        right: -1px;
        z-index: 1;
        transform: rotate(35deg);
    }

    #taskFileAdd_m   .progress .progress-value {
        display: block;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        position: absolute;
        top: -30px;
        right: -25px;
    }

    @-webkit-keyframes animate-positive {
        0% {
            width: 0;
        }
    }

    @keyframes animate-positive {
        0% {
            width: 0;
        }
    }

    .list-group-item {
        border: none;
    }

    .list-group-item > .opera {
        float: right;
    }

    ul li:HOVER {
        background-color: #E7F6FD;
    }

    #taskFileAdd_m  .checked {
        background-color: #E7F6FD;
    }

    #taskFileAdd_m #picList_m > li:nth-child(1) {
        margin-top: 21px;
    }
</style>
<%
    String rwid = request.getParameter("rwid");
    if(rwid==null){
        rwid="";
    }
%>
<div class="row" id="taskFileAdd_m">
    <div class="col-md-5" style="border-right: 1px solid #eee;height: 350px;">
        <div class="col-md-12" style="height: 250px;border-bottom: 1px solid #eee;overflow-y: scroll;">
            <ul class="list-group" id="picList_m">
            </ul>
        </div>
        <div class="col-md-12" style="height: 100px;margin-top: 5px;">
            <form action="#" id="contractFileForm" class="form form-horizontal" enctype="multipart/form-data">
                <div class="form-body">
                    <div class="row">
                        <div class="form-group">
                            <div class="col-md-12 input-group">
                                <label class="labelCommon labelWidth-col-one labelBg color666">附件:</label>
                                <div class="col-md-5 input-group" id="sfjeinput">
                                    <input type="hidden" id="rwid_fj_id" value="rwid"/>
                                    <input type="file" class="form-control" name="file" title="请上传附件！（5M以内）"
                                           style="width: 200px;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <div class="col-md-8 input-group" style="float: left;">
                                <label>支持文件格式：xls、xlsx、pdf、doc、docx、jpg、jpeg、png、gif</label>
                            </div>
                            <div class="col-md-4 input-group" style="float: left;">
                                <button type="button" name="submitfilebutton"
                                        class="btn btn btn-default btnBlue btnBorderColor colorfff borderRadius4"
                                        style="float: right;">上传
                                </button>
                            </div>
                        </div>
                        <!-- <button type="button" name="submitfilebutton" class="btn btn btn-default btnBlue borderRadius4 colorfff" style="float: right;">上传</button> -->
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="col-md-7" style="height: 350px;display: block;padding:150px 15px 150px 15px;" id="rightone">
        <div class="row" style="display: none;" id="schedule">
            <div class="col-md-12">
                <div class="progress">
                    <div class="progress-bar" style="width:0%; background:#2e9dc2;">
                        <div class="progress-value">0%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/customerManage/addFiles.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var rwid = '<%=rwid%>';
        if((rwid=="null")||(rwid==null)||(rwid=="")){
            rwid="rwid";
        }

        $("#rwid_fj_id").val(rwid);

        taskFiles.setPath('<%=request.getContextPath()%>');
        taskFiles.init(rwid);
    });
</script>