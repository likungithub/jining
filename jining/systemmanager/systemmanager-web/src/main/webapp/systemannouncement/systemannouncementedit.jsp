<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="com.xinhai.security.api.CurrentLoginUser" %>
<%
	String systemAnnouncementId = request.getParameter("systemAnnouncementId");
	if (systemAnnouncementId == null) {
		systemAnnouncementId = "";
	}
%>
<form action="#" id="systemannouncementForm" class="form form-horizontal">
	<div class="form-body">
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						标题
					</label>
						<input type="text" class="inputCommon inputWidth-col-one color666" name="announcementName">
						<div class="wrap12">
							<input type="checkbox" name="checkAnnouncementIsTop" id="checkAnnouncementIsTop123" style="position: relative;top: 2px;"><label for="checkAnnouncementIsTop123" style="cursor: pointer">置顶</label>
						</div>
				</div>
			</div>
		</div>
		<div class="row form-group">
			<div class="col-md-6" style="padding: 0">
				<div>
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						类型
					</label>
						<select name="announcementTypeCode" style="width: 200px">
						</select>
					<button  type="button" style="position: absolute" class="addBtn" title="快速添加公告类型"><i class="fa fa-plus"></i></button>
				</div>
			</div>
			<div class="col-md-6" style="padding: 0">
				<div >
					<label class="labelCommon labelWidth-col-one color666 ml">
						<span class="required"> * </span>
						接收方类型
					</label>
					<select name="jsflx" id="id_jsflx" style="width: 216px;
    border: 1px solid #ccc;
    border-radius: 0 5px 5px 0!important;
    height: 33px;">
						<option value="0">员工</option>
						<!--<option value="1">客户</option>-->
					</select>
				</div>
			</div>
		</div>


		<div class="row form-group">
			<div class="col-md-6 pad0">
				<label class="labelCommon labelWidth-col-one color666">发布人</label>
				<input type="text" class="inputCommon  color666 " name="announcementSource" value="<%=CurrentLoginUser.getUser().getName()%>" style="width: 216px">
			</div>
			<div class="col-md-6 pad0 hide" id="khflByM">
					<label class="labelCommon labelWidth-col-one color666 ml">
						<span class="required"> * </span>
						客户分类
					</label>
					<select id="customerStyle" style="width: 200px">
						<option value="" selected>全部</option>
					</select>
					<button type="button" style="position: absolute" class="addBtn"  id="khflAdd" title="新增客户分类"><i class="fa fa-plus"></i></button>
			</div>
		</div>


		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						关键词
					</label>
						<input maxlength="100" placeholder="100个字符以内" type="text" class="inputCommon inputWidth-col-one color666 iputNewlength" name="keyword">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> <!-- * -->&nbsp;</span>
						描述
					</label>
						<input maxlength="200" placeholder="200个字符以内" type="text" class="inputCommon inputWidth-col-one color666 iputNewlength" name="announcementDescription">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="labelCommon labelWidth-col-one color666">
						<span class="required"> * </span>
						内容
					</label>
					<div class="col-md-9">
						<%--<textarea name="announcementContent"></textarea>--%>
						<!-- 加载编辑器的容器 -->
						<script id="announcementContent" name="announcementContent" type="text/plain"></script>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
<link href="<%=request.getContextPath()%>/assets/pages/css/systemannouncement/systemannouncementedit.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/assets/pages/scripts/systemannouncement/systemannouncementedit.js" type="text/javascript"></script>
<!-- 配置文件 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/ueditor/ueditor.config.js"></script>
<!-- 编辑器源码文件 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/ueditor/ueditor.all.js"></script>
<!-- 实例化编辑器 -->
<script type="text/javascript">
    var ue = UE.getEditor('announcementContent',{
        toolbars: [[ 'source','undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough','removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',  'lineheight', '|', 'paragraph', 'fontfamily', 'fontsize', 'simpleupload', 'insertimage', 'emotion',"link"]], textarea: "announcementContent", initialFrameHeight: 245, initialFrameWidth: 560
    });
    //var ue = UE.getEditor('announcementContent');
</script>
<script type="text/javascript">
    $(function () {
        systemannouncementEdit.setPath("<%=request.getContextPath() %>");
        systemannouncementEdit.init("<%=systemAnnouncementId%>", ue);
			$('[name="jsflx"]',$('#systemannouncementForm')).change(function(){
			    if($(this).val()==0){
                    $('#khflByM',$('#systemannouncementForm')).addClass('hide');
				}else{
                    $('#khflByM',$('#systemannouncementForm')).removeClass('hide');
				}
			});

    });
</script>