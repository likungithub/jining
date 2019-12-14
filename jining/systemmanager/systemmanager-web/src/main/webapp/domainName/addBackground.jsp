<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
	String agencyCode = request.getParameter("agencyCode");
	if (agencyCode == null) {
		agencyCode = "";
	}
	String companyName=request.getParameter("companyName");
	if(companyName==null){
		companyName="";
	}
%>
<div class="container-fluid" id="backgroundImg">
	<div>
		<form action="#" id="backgroundImgForm"  enctype="multipart/form-data">
			<div class="pull-right borderRadius4 selectBackground col-xs-4" style="height: 125px;width: 125px; cursor: pointer">
				<div>
				<img title="点击上传背景图" src="<%= request.getContextPath()%>/securityassets/img/imgUpM.jpg" id="logoBg" alt="背景图" style="width: 125px">
				<input type="hidden" name="companyBackgroundImg_ws_mdw">
				<input type="hidden" name="backgroundCode_ws_mdw">
				</div>
			</div>
			<div class="col-sm-8 picCon">

			</div>
		</form>
	</div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/domainName/addBackground.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        addBackground.setPath("<%=request.getContextPath()%>");
        addBackground.init("<%=agencyCode%>","<%=companyName%>");
    });
</script>