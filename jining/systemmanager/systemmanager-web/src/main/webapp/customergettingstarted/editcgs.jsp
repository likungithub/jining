<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
%>
<style>
	.modal-dialog{
		width:682px;
	}
	.progress-title{
           font-size: 16px;
           font-weight: 700;
           color: #333;
           margin: 0 0 20px;
       }
       .progress{
           height: 10px;
           background: #333;
           border-radius: 0;
           box-shadow: none;
           margin-bottom: 30px;
           overflow: visible;
           z-index: 10086;
       }
       .progress .progress-bar{
           position: relative;
           -webkit-animation: animate-positive 2s;
           animation: animate-positive 2s;
       }
       .progress .progress-bar:after{
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
       .progress .progress-value{
           display: block;
           font-size: 16px;
           font-weight: 600;
           color: #333;
           position: absolute;
           top: -30px;
           right: -25px;
       }
       @-webkit-keyframes animate-positive{
           0%{ width: 0; }
       }
       @keyframes animate-positive {
           0%{ width: 0; }
       }
</style>
<!-- <form action='' enctype="multipart/form-data" method="post" id="form0" name="fileForm">


附件: <input type="file" name="file" id="pic" />
文件描述: <input type="text" name="fileContent" id="fileContent" autocomplete="off"/>
<input type="button" value="提交" id="btn" onclick="ajaxSubmitForm();"/>
</form> -->

<form id="customergettingstartedForm" method="post" action="#" enctype="multipart/form-data">
    <ul id="newcomer-edit" class="list-unstyled text-align">
        <li class="clearfix" style="margin-bottom: 15px">
           <span class="labelCommon labelWidth-col-one color666"> 描述</span> <input class="inputCommon inputWidth-col-one color666" type="text" id="fileContent" name="fileContent" autocomplete="off"/>
            <input type="hidden" name="id" value="<%=request.getParameter("id")%>"/>
        </li>
        <li class="clearfix"  style="margin-bottom: 15px">
            <span class="labelCommon labelWidth-col-one color666"><span class="iconMr" style="color: #FF0000;position: relative; top: 3px;">*</span>附件</span> <input type="file" style="text-indent: 300px;padding-top: 5px" name="file" class="inputCommon inputWidth-col-one color666" id="pic"/>
        </li>
    </ul>
    <div class="row" style="margin-top: 10px;display: none;" id="schedule">
            <div class="col-md-12">
                <div class="progress">
                    <div class="progress-bar" style="width:0%; background:#2e9dc2;">
                        <div class="progress-value">0%</div>
                    </div>
                </div>
            </div>
        </div>
</form>
<link href="<%=request.getContextPath()%>/assets/pages/css/customergettingstarted/editcgs.css" rel="stylesheet" type="text/css" />
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/customergettingstarted/editcgs.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/customergettingstarted/customergettingstarted.js"
        type="text/javascript"></script>
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/customergettingstarted/jquery-form.js"
        type="text/javascript"></script>


<script type="text/javascript">
    $(function () {
        customergettingstartededitcgs.setPath("<%=request.getContextPath()%>");
        customergettingstartededitcgs.init("<%=id%>");
    });
</script>