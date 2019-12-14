<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.io.File"%>
<%@ page import="java.io.InputStream"%>
<%@ page import="java.util.Properties"%>
<%
    String reportPath=request.getContextPath();
%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>文件预览</title>
    <script src="<%=request.getContextPath()%>/assets/pages/scripts/reportmanager/pdfobject.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js"
            type="text/javascript"></script>
    <script type="text/javascript">
        function getParam(paramName) {
            paramValue = "", isFound = !1;
            if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
                arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
                while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
            }
            paramValue == "" && (paramValue = null), paramValue;
            return unescape(paramValue);
        }

            var fileURL = "<%=reportPath%>/reportfile/"+getParam('name');
            //var fileURL = "file:///E:/pdfceshi/7890BGC吹扫.pdf";

            window.onload = function () {
                $("#download").attr("href", fileURL);
                if (PDFObject.supportsPDFs) {
                    PDFObject.embed(fileURL,$("#showPdf"));
                    var signp=$("<p class='showsign'>操作人："+getParam('signer')+"</p>");

                    var signp=$("<p style='background: url(<%=request.getContextPath()%>/assets/pages/scripts/reportmanager/sign.png) no-repeat top right;' class='showsign'>操作人：</p>");

            $("#showPdf").append(signp);
        }
    };
    </script>
    <style>
        .pdfobject-container{
            width: 100%;
            height: 600px;
            margin: 2em 0;
        }
        .showsign{
            width:180px;
            height:60px;
            line-height:70px;

            position:absolute;
            bottom:100px;
            right: 400px;
            z-index:999;
        }
    </style>
</head>
<body>
<div id="showPdf">
<p>It appears you don't have Adobe Reader or PDF support in this web
    browser. <a id="download" href="">下载该pdf文件</a></p>
</div>
</body>
</html>
