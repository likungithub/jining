<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
 .rotate1 {
		transform: rotate(180deg);
	}
</style>
<%
	String pdfname = request.getParameter("name");
	if (pdfname == null) {
		pdfname = "";
	}
	String uuid = UUID.randomUUID().toString();
%>
<html>
<head>
	<title>Show PDF</title>
	<meta charset="utf-8" />
	<script src="<%= request.getContextPath()%>/assets/pages/scripts/bggl/pdfqz/pdfobject.js" type="text/javascript"></script>
	<style type="text/css">
		html,body,#pdf_viewer{
			width: 100%;
			height: 100%;
			margin: 0;
			padding: 0;
		}
	</style>
</head>
<body>
<div id="pdf_viewer"></div>
<input type="hidden" id="pdfname" value="<%= pdfname%>">
</body>
<script type="text/javascript">
	console.log("<%=pdfname%>");
	//var pdfname = document.getElementById('pdfname').value;
	var pdfname = encodeURI(document.getElementById('pdfname').value).replace(/\+/g,'%2B');
	console.log(pdfname);
if(PDFObject.supportsPDFs){
	// PDF嵌入到网页
	PDFObject.embed("<%= request.getContextPath()%>/pdfwj/"+pdfname, "#pdf_viewer" );
    } else {
        location.href = "/canvas";
    }
</script>
</html>
