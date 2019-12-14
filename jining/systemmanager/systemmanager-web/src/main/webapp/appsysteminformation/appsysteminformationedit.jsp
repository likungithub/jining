<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String id = request.getParameter("id");
	if (id == null) {
		id = "";
	}
%>
<form action="#" id="appsysteminformationForm" class="form form-horizontal">
	<div class="form-body">
		<div class="row">
				<div class="col-md-6  col-xs-6">
					<div class="form-group">
						<label class="labelCommon labelWidth-col-one color666">
							<span class="required"> * </span>客户端类型&nbsp;&nbsp;
						</label>
						<select name="clientType"  id="clientType-m" style="height: 33px;border-radius: 0 4px 4px 0!important; width: 165px;border-color: #e5e5e5;padding-left: 10px;">
							<option value="0">代理APP</option>
							<option value="1">客户APP</option>
							<option value="2">财云管家</option>
						</select>
					</div>
				</div>
				<div class="col-md-6  col-xs-6">
					<div class="form-group">
						<label class="labelCommon labelWidth-col-one color666">
							<span class="required"> * </span>设备类型&nbsp;&nbsp;
						</label>
						<select name="phoneType" id="mobileDevice-m"  style="height: 33px;border-radius: 0 4px 4px 0!important; width: 165px;border-color: #e5e5e5;padding-left: 10px;">
							<option value="2">所有移动端</option>
							<option value="1">android</option>
							<option value="0">ios</option>
							<option value="3">PC端</option>
						</select>
				  </div>
			  </div>
		</div>
		<div class="row">
			<div class="col-md-6  col-xs-6">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>通知类型&nbsp;&nbsp;
					</label>
					<select name="informationType"  id="appInfo-m" style="height: 33px;border-radius: 0 4px 4px 0!important; width: 165px;border-color: #e5e5e5;padding-left: 10px;">
						<option value="001">系统维护</option>
						<option value="002">预警信息</option>
					</select>
				</div>
			</div>
			<div class="col-md-6  col-xs-6">
				<div class="form-group" id="row_sjsj">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>升级时间&nbsp;&nbsp;
					</label>
					<input type="text" id="appInfojj-sjsj" name="sjsj"  class="inputCommon inputWidth-col-one" style="width: 165px!important"/>
				</div>
			</div>
		</div>
		<div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label class="labelCommon labelWidth-col-one color666">
                        <span class="required"> * </span>通知标题&nbsp;&nbsp;
                    </label>
                    <input type="text" id="appInfojj-m" class="inputCommon inputWidth-col-one" style="width: 448px!important"/>
				</div>
            </div>
        </div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>专题地址&nbsp;&nbsp;
					</label>
					<input type="text" id="appInfozt-m" class="inputCommon inputWidth-col-one" style="width: 448px!important"/>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666 col-xs-3" style="padding-right: 0">
						<span class="required"> * </span>通知内容</label>
					<div class=" col-xs-9">
						<!-- 加载编辑器的容器 -->
						<script id="message" name="message" type="text/plain"></script>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/pages/css/appsysterminformation/appsysterminformationedit.css">
<script src="<%=request.getContextPath()%>/assets/pages/scripts/appsysteminformation/appsysteminformationedit.js" type="text/javascript"></script>
<!-- 配置文件 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/ueditor/ueditor.config.js"></script>
<!-- 编辑器源码文件 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/ueditor/ueditor.all.js"></script>
<!-- 实例化编辑器 -->
<script type="text/javascript">
    var ue = UE.getEditor('message',{
        toolbars: [[ 'source','undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough','removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',  'lineheight', '|', 'paragraph', 'fontfamily', 'fontsize', 'simpleupload', 'insertimage', 'emotion','link']], textarea: "message", initialFrameHeight: 245, initialFrameWidth: 432
    });
</script>
<script type="text/javascript">
	$(function () {
		appsysteminformationEdit.setPath("<%=request.getContextPath() %>");
		appsysteminformationEdit.init("<%=id%>", ue);
	});
</script>