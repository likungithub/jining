﻿
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="com.zhuozhengsoft.pageoffice.PDFCtrl"%>
<%
//PageOfficeCtrl poCtrl=(PageOfficeCtrl)request.getAttribute("poCtrl");
    PDFCtrl pdfCtrl = (PDFCtrl)request.getAttribute("PDFCtrl");;//定义PDFCtrl控件对象
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <title>报告预览</title>
      <script language="javascript" type="text/javascript">
          function Print() {
              //alert(document.getElementById("PDFCtrl1").Caption);//显示标题
              document.getElementById("PDFCtrl1").ShowDialog(4);
          }
          function SwitchFullScreen() {
              document.getElementById("PDFCtrl1").FullScreen = !document
                  .getElementById("PDFCtrl1").FullScreen;
          }
          function SetPageReal() {
              document.getElementById("PDFCtrl1").SetPageFit(1);
          }
          function SetPageFit() {
              document.getElementById("PDFCtrl1").SetPageFit(2);
          }
          function SetPageWidth() {
              document.getElementById("PDFCtrl1").SetPageFit(3);
          }
          function ZoomIn() {
              document.getElementById("PDFCtrl1").ZoomIn();
          }
          function ZoomOut() {
              document.getElementById("PDFCtrl1").ZoomOut();
          }
          function FirstPage() {
              document.getElementById("PDFCtrl1").GoToFirstPage();
          }
          function PreviousPage() {
              document.getElementById("PDFCtrl1").GoToPreviousPage();
          }
          function NextPage() {
              document.getElementById("PDFCtrl1").GoToNextPage();
          }
          function LastPage() {
              document.getElementById("PDFCtrl1").GoToLastPage();
          }
          function RotateRight() {
              document.getElementById("PDFCtrl1").RotateRight();
          }
          function RotateLeft() {
              document.getElementById("PDFCtrl1").RotateLeft();
          }
      </script>
</head>
<body>

    ﻿<form id="form1">
        <div style="width: auto; height: 700px;">
            <%=pdfCtrl.getHtmlCode("PDFCtrl1")%>
        </div>
    </form>
</body>
</html>
