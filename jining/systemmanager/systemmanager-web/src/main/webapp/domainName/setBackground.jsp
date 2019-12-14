<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<style>
	#setBackgroundImgUpload input[name="setBackgroundImg"]
	{
		height: 33px;
		padding-top: 5px;
		border: 1px solid #999;
		padding-left: 5px;
		border-radius: 4px!important;
		margin-bottom: 20px;
	}
	#setBackgroundImgUpload textarea[name="descriotionInfo"]
	{
		width: 538px;
		height: 60px;
		border-radius: 4px!important;
	}
</style>
<%
	String backgroundImgCode=request.getParameter("backgroundImgCode");
	if(backgroundImgCode==null){
	    backgroundImgCode="";
	}
	String info=request.getParameter("info");
	if(info==null){
		info="";
	}
%>
<div class="container" id="setBackgroundImgUpload">
	<div>
		<form action="#" id="setBackgroundImgUploadForm"  enctype="multipart/form-data">
			<input type="file" id="setBackgroundImg" name="setBackgroundImg" data-code="<%=backgroundImgCode%>" placeholder="请选择图片文件">
			<textarea  id="descriotionInfo" name="descriotionInfo" maxlength="100" placeholder="最多100字符"><%=info%></textarea>
		</form>
	</div>
</div>