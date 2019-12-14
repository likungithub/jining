<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<html>
<head>
	<title>没有权限</title>
	<style>.error{color:red;}
	#powerContent
	{
		width: 600px;
		height: 300px;
		margin: 200px auto;
		text-align: center;
	}
	#powerContent>.wrap{
		text-align: center;
		padding-bottom: 15px;
		border-bottom: 1px solid #dadada;
		margin-bottom: 15px;
	}

	</style>
</head>
<body>
<jsp:include page="header.jsp"/>
<section id="powerContent">
	<div class="wrap">
		<img src="<%=request.getContextPath()%>/securityassets/img/nopower.png" alt="无权限图片">
	</div>
	<div class="error"></div>
</section>

<jsp:include page="footer.jsp"/>
</body>
</html>
