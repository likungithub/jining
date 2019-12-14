<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String fjlx = request.getParameter("fjlx");
    if (fjlx == null) {
        fjlx = "";
    }
    String dljgBm = request.getParameter("dljgBm");
    if (dljgBm == null) {
        dljgBm = "";
    }
%>
<style>
    .progress-title {
        font-size: 16px;
        font-weight: 700;
        color: #333;
        margin: 0 0 20px;
    }

    .progress {
        height: 10px;
        background: #333;
        border-radius: 0;
        box-shadow: none;
        margin-bottom: 30px;
        overflow: visible;
        z-index: 10086;
    }

    .progress .progress-bar {
        position: relative;
        -webkit-animation: animate-positive 2s;
        animation: animate-positive 2s;
    }

    .progress .progress-bar:after {
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

    .progress .progress-value {
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

    .checked {
        background-color: #E7F6FD;
    }
</style>
<div class="row" id="customerFileAdd">
    <div class="col-md-5" style="border-right: 1px solid #eee;height: 350px;">
        <div class="col-md-12" style="height: 350px;border-bottom: 1px solid #eee;overflow-y: scroll;">
            <ul class="list-group">
            </ul>
        </div>
        <%-- <div class="col-md-12" style="height: 100px;margin-top: 5px;display: <%=display %>">
            <form action="#" id="customerFileForm" class="form form-horizontal" enctype="multipart/form-data">
                <div class="form-body">
                    <div class="row">
                        <div class="form-group">
                            <div class="col-md-12 input-group">
	                            <label class="labelCommon labelWidth-col-one labelBg color666">附件:</label>
	                            <div class="col-md-5 input-group" id="sfjeinput">
	                               <input type="file" class="form-control" name="file"  title="请上传附件！（5M以内）" style="width: 200px !important;">
	                             </div>
	                        </div>
                        </div>
			        </div>
			        <div class="row">
			            <div class="form-group">
			                <div class="col-md-8 input-group" style="float: left;">
			                    <label>支持文件格式：pdf、doc、jpg、jpeg、png、gif</label>
			                </div> 
			                <div class="col-md-4 input-group" style="float: left;">
                                <button type="button" name="submitfilebutton" class="btn btn btn-default btnBlue btnBorderColor colorfff borderRadius4" style="float: right;">上传</button>
                            </div> 
			            </div>
			        </div>
			    </div>
			</form>
        </div> --%>
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
        src="<%=request.getContextPath()%>/assets/pages/scripts/customer/showfile.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        showFile.setPath('<%=request.getContextPath()%>');
        showFile.init('<%=id%>', '<%=dljgBm%>', '<%=fjlx %>');
    });
</script>