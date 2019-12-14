<%@ page language="java"
	import="java.util.*,com.zhuozhengsoft.pageoffice.*"
	pageEncoding="UTF-8"%>
<%
PageOfficeCtrl poCtrl=(PageOfficeCtrl)request.getAttribute("poCtrl");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <title>报告预览</title>
</head>
<body>
    <script type="text/javascript">
        function Save() {
            document.getElementById("PageOfficeCtrl1").WebSave();
             // window.external.close();//关闭POBrowser窗口
        }

        //加盖印章
        function InsertSeal() {
            try {
                // document.getElementById("PageOfficeCtrl1").ZoomSeal.AddSeal();
            // var bRet=document.getElementById("PageOfficeCtrl1").ZoomSeal.AddSealByName("1");
                document.getElementById("PageOfficeCtrl1").ZoomSeal.AddSealQFZ("即墨检验检测","");
                document.getElementById("PageOfficeCtrl1").WebSaveAsPDF();
                // if(bRet){
                //     alert("盖章成功！");
                // }else{
                //     alert("盖章失败！");
                // }
            } catch(e) {}
        }

        function PrintFile(){
            document.getElementById("PageOfficeCtrl1").ShowDialog(4);

        }

        function CloseFile(){
            window.external.close();

        }
        function AfterDocumentOpened() {
            document.getElementById("PageOfficeCtrl1").WebSaveAsPDF();
        }
        function AfterDocumentOpenedBgbz() {
            document.getElementById("PageOfficeCtrl1").WebSave();
        }
    </script>
    <div style="width:100%; height:100%;">
       <%=poCtrl.getHtmlCode("PageOfficeCtrl1")%>
    </div>
</body>
</html>
