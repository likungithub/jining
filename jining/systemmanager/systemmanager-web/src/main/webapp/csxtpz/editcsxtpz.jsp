<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String id = request.getParameter("id");
	String readonly = "";
	if (id == null) {
		id = "";
	}
	if(!"".equals(id)){
        readonly="readonly";
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
<form action="#" id="productForm"  class="form form-horizontal">
	<div class="form-body">
		<div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
						<label class="labelCommon labelWidth-col-one labelBg color666">
						<span class="colorRed">*</span>
						配置类型
						</label>
                    <input type="hidden" name="id" value="<%=id%>"/>
						<input type="text" class="inputCommon inputWidth-col-one" <%=readonly%> name="dmPzlx" placeholder="配置类型：如001">
                </div>
            </div>
        </div>
		<div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
						<label class="labelCommon labelWidth-col-one labelBg color666">
						<span class="colorRed">*</span>
						值1
						</label>
						<input type="text" class="inputCommon inputWidth-col-one" name="key1">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        值2
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="key2">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        值3
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="key3">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        值4
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="key4">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        值5
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="key5">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        值6
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="key6">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        值7
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="key7">
                </div>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-12">
                <div class="input-group">
                    <label class="labelCommon labelWidth-col-one labelBg color666">
                        值8
                    </label>
                    <input type="text" class="inputCommon inputWidth-col-one" name="key8">
                </div>
            </div>
        </div>
    </div>
</form>
<link href="<%=request.getContextPath()%>/assets/pages/css/csxtpz/csxtpzedit.css" rel="stylesheet" type="text/css" />

<script src="<%=request.getContextPath()%>/assets/pages/scripts/csxtpz/csxtpzedit.js" type="text/javascript"></script>

<script type="text/javascript">
	$(function () {
		productEdit.setPath("<%=request.getContextPath() %>");
		productEdit.init("<%=id%>");
	});
</script>