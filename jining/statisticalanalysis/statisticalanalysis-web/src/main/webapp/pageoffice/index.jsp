<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	 <!--PageOffice.js和jquery.min.js文件一定要引用-->
     <script type="text/javascript" src="jquery.min.js"></script>
     <script type="text/javascript" src="pageoffice.js" id="po_js_main"></script>
  </head>
  
  <body>
   <div style="text-align:center;">
    <b>在线编辑保存Office文档</b><br>
    <a href="javascript:POBrowser.openWindowModeless('openword.do' , 'width=1200px;height=800px;');">在线编辑保存Word文档</a><br>
    <a href="javascript:POBrowser.openWindowModeless('openexcel.do' , 'width=1200px;height=800px;');">在线编辑保存Excel文档</a><br>
   </div>
  </body>
</html>
