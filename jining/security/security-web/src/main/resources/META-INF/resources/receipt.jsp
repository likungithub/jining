<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<%
    String ddbh = request.getParameter("ddbh");
    if (ddbh == null) {
        ddbh = "";
    }
    String type = request.getParameter("type");
    if (type == null) {
        type = "";
    }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <link href="/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/assets/pages/font/iconfont.css" />
    <title>收款收据</title>
    <style>
        body {
            background-color: white;
            margin: 10px;
            font-size: 14px;
        }

        h1 {
            text-align: center;
            font-weight: normal;
            font-size: 22px;
        }

        p {
            margin-bottom: 8px;
        }

        .no {
            text-align: right;
            font-size: 16px;
            float:right;
            line-height: 29px;
        }

        .print-top:after {
            clear: both;
            content: '.';
            display: block;
            width: 0;
            height: 0;
            visibility: hidden;
        }

        .print-footer:after {
            clear: both;
            content: '.';
            display: block;
            width: 0;
            height: 0;
            visibility: hidden;
        }

        .print-top {
            margin-bottom: 10px;
        }

        .print-footer {
            margin-bottom: 10px;
        }

        .mr10 {
            margin-right: 10px;
        }

        .pull-left {
            float: left !important;
        }

        .pull-right {
            float: right !important;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #000;
            margin-bottom: 12px;
        }

        table td {
            border: 1px solid #000;
            padding: 0 3px;
            height: 32px;
        }

        #print {
            float: right;
            background-color: #539eec;
            color: white;
            padding: 4px 10px;
            border-radius: 4px;
            cursor: pointer;
        }

        #print:hover {
            background-color: #68AAF0;
        }

        @media print {
            #print {
                display: none;
            }
        }
    </style>
</head>
<body>
<div class='container'>
<div id="one" class="clearfix">
    <div id="oneleft" style="width: 96%;float: left;">
        <h1>收款收据<label class="no"></label></h1>
        <div class="print-top">
            <span class="pull-left fkdw"></span>
            <span class="pull-right sfsj"></span>
        </div>
        <table>
            <tbody>
            <tr>
                <td align="center" style="width: 300px;">收费项目</td>
                <td align="center" style="width: 80px;">收费标准</td>
                <td align="center" style="width: 80px;">金额</td>
                <td align="center" style="width: 80px;">优惠金额</td>
                <td align="center" style="width: 300px;">收费说明</td>
            </tr>
            </tbody>
        </table>
        <div class="print-footer">
            <span class="pull-left mr10 fkdwgz"></span>
            <span class="pull-right mr10 skr"></span>
        </div>
    </div>
    <div id="oneright" style="float: right;font-size: 20px;padding-top: 80px;width: 3%;height:202px;">
        ①
        <br><br>存
        <br><br>根
    </div>
</div>
<br>
<div id="two" class="clearfix">
    <div id="twoleft" style="width:96%;float:left;">
        <h1>收款收据<label class="no"></label></h1>
        <div class="print-top">
            <span class="pull-left fkdw"></span>
            <span class="pull-right sfsj"></span>
        </div>
        <table>
            <tbody>
            <tr>
                <td align="center" style="width: 300px;">收费项目</td>
                <td align="center" style="width: 80px;">收费标准</td>
                <td align="center" style="width: 80px;">金额</td>
                <td align="center" style="width: 80px;">优惠金额</td>
                <td align="center" style="width: 300px;">收费说明</td>
            </tr>
            </tbody>
        </table>
        <div class="print-footer">
            <span class="pull-left mr10 fkdwgz"></span>
            <span class="pull-right mr10 skr"></span>
        </div>
    </div>
    <div id="tworight" style="float: right;font-size: 20px;padding-top: 80px;width: 3%;height:202px;">
        ②
        <br><br>交
        <br>客
        <br>户
    </div>
</div>
<br>
<div style="width: 100%;float:right"><a name="print" type="button" id="print" onclick="chargePrint();"
                                        style="float:right;">打印</a></div>
 </div>
<script src="/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="/assets/pages/scripts/RegExp/commonRegExp.js" type="text/javascript"></script>
<script src="/assets/global/plugins/moment-with-locales.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/customermanage/assets/pages/scripts/charge/receipt.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        receipt.setPath('<%=request.getContextPath()%>');
        receipt.init('<%= ddbh%>','<%= type%>');
    });
    function chargePrint() {
        window.print();
    }
</script>
</body>
</html>