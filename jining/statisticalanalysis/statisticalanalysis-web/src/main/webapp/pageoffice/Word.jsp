﻿<%@ page language="java"
	import="java.util.*,com.zhuozhengsoft.pageoffice.*"
	pageEncoding="UTF-8"%>
<%
PageOfficeCtrl poCtrl=(PageOfficeCtrl)request.getAttribute("poCtrl");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <title>最简单的打开保存Word文件</title>
</head>
<body>
    <script type="text/javascript">
        function Save() {
            document.getElementById("PageOfficeCtrl1").WebSave();
             window.external.close();//关闭POBrowser窗口
        }

        //加盖印章
        function InsertSeal() {
            try {
                document.getElementById("PageOfficeCtrl1").ZoomSeal.AddSeal();
            } catch(e) {}
        }

        function PrintFile(){
            document.getElementById("PageOfficeCtrl1").ShowDialog(4);

        }

        function CloseFile(){
            window.external.close();

        }
    </script>
    <div style="width:100%; height:100%;">
       <%=poCtrl.getHtmlCode("PageOfficeCtrl1")%>
    </div>
</body>
</html>
