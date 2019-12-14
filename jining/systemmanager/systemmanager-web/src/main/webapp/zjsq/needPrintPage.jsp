<%--
  Created by IntelliJ IDEA.
  User: Mdw
  Date: 2018/3/5
  Time: 10:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ page import="com.xinhai.security.api.CurrentLoginUser,com.xinhai.caiyun.commonmanager.utils.AESCipher" %>
<!DOCTYPE html>
<html lang="zh-CN">
<meta charset="utf-8">
<head>
    <%

        String yddh = AESCipher.aesDecryptString(CurrentLoginUser.getUser().getYddh(), "Gx_Cys_key@2017!");
        String username = CurrentLoginUser.getUser().getName();

    %>
    <title>证件打印</title>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css"
            rel="stylesheet" type="text/css"/>
    <link
            href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css"
            rel="stylesheet" type="text/css" />
    <style>
        @media print {
                #needPrintPage .printRow{
                display: none;
            }
            html{
                font-size: 12px;
                font-family: 'arial','宋体', '微软雅黑';
            }
            #needPrintPage tbody td,#needPrintPage th{
                font-size: 13px!important;
            }
        }
        html{
            font-family: 'arial','宋体', '微软雅黑';
        }
        body{
            margin: 0;
        }
        .dljg{
           margin: 8px auto;
        }
        #needPrintPage{
            width: 1024px!important;
        }
        #needPrintPage tbody td,#needPrintPage th{
            font-size: 13px!important;
        }
    </style>
</head>
<body>

<div class="container" id="needPrintPage">
    <div class="row">
        <div class="col-md-12" style="padding-top: 15px ">
            <div class="contentWrap1" style="padding: 15px;border: 1px solid #666;">
                <div class="top clearfix" style="border-bottom: 1px solid #dedede;margin-bottom: 15px">
                    <div class="left pull-left">
                        <h4 class="dljg">
                            青岛卓安会计事物有限公司
                        </h4>
                    </div>
                    <div class="right pull-right">
                        <span style="    display: inline-block;
                                            margin-top: 28px;
                                            background-color: #0FA7FD;
                                            color: #fff;
                                            padding: 0 5px;"><span class="year"></span>年<span class="mon"></span>月<span class="day"></span>日 <span class="h"></span>:<span class="min"></span>:<span class="sec"></span></span>
                    </div>
                </div>
                <div class="bottom">
                    <p ><span class="khmc"></span>的以下证件信息</p>
                    <table class="table table-bordered">
                        <thead>
                            <th class="text-left" width="23%">证件名称</th>
                            <th class="text-center" width="7%">数量</th>
                            <th class="text-left" width="70%">备注信息</th>
                           <%-- <th class="text-left">证件名称</th>
                            <th class="text-center">数量</th>
                            <th class="text-left">备注信息</th>--%>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    <p style="color: #12A5FA;margin: 5px 0;">
                        温馨提示：通过快递方式移交资料，收到快递后请立即核对资料，如有漏缺请立即联系相关工作人员。
                    </p>
                    <div class="personInfo clearfix">
                        <div class="col-xs-3">签收人：</div>
                        <div class="col-xs-3">签收时间：</div>
                        <div class="col-xs-3">交接人：</div>
                        <div class="col-xs-3">监交人：</div>
                    </div>
                    <hr style=" margin: 5px  auto 8px auto;">
                    <span id="user"><%=username%></span>
                    <span id="phoneNum"><%=yddh%></span>
                </div>
            </div>
        </div>
        <div class="col-md-12" style="height: 60px;line-height: 55px">
            <i class="fa fa-scissors" style="font-size: 20px;position: relative;top: 4px;"></i>
            <div style="border-bottom: 2px dashed #999;display: inline-block;width: 96%;"></div>
        </div>
        <div class="col-md-12 contentWrap2">

        </div>
        <div class="col-md-12 printRow" style="padding-top: 30px">
            <button class="btn btn-default btn-lg pull-right"style="background: #0FA7FD;color: #fff;">
                <i class="fa fa-print"></i>
                打印</button>
            <br>
            <br>
        </div>
    </div>
</div>


</body>
</html>
<script src="/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script>
    jQuery( function (){
        //1,拿到要打印的数据
        var dataP = localStorage.getItem('needPrintInfo');

        $('#needPrintPage .dljg').html(localStorage.getItem('dljgmc_sl'));
        $('#needPrintPage .khmc').html(localStorage.getItem('khmc_sl'));
        var date = new Date();

        $('#needPrintPage .year').html(date.getFullYear());
        $('#needPrintPage .mon').html(date.getMonth()+1);
        $('#needPrintPage .day').html(date.getDate());
        if (date.getHours()<10){
            $('#needPrintPage .h').html('0'+date.getHours());
        }else {
            $('#needPrintPage .h').html(date.getHours());
        }
        if (date.getMinutes()<10){
            $('#needPrintPage .min').html('0'+date.getMinutes());
        }else {
            $('#needPrintPage .min').html(date.getMinutes());
        }
        if (date.getSeconds()<10){
            $('#needPrintPage .sec').html('0'+date.getSeconds());
        }else {
            $('#needPrintPage .sec').html(date.getSeconds());
        }


        //2.切个成数组
        var dataPArr = dataP.split(',');
        //3.往表格里边插入，每6个换一行
        for (var  i= 0;i<dataPArr.length;i+=3){
            $(' <tr>'+
                '<td>'+dataPArr[i]+'</td>'+
                '<td class="text-center">'+dataPArr[i+1]+'</td>'+
                '<td class="text-justify">'+
                dataPArr[i+2]+
                '</td>'+
                '</tr>').appendTo($('#needPrintPage tbody'));
            if ((i+1)%3==0){
                $(' <tr>'+
                    '<td>'+dataPArr[i]+'</td>'+
                    '<td class="text-center">'+dataPArr[i+1]+'</td>'+
                    '<td class="text-justify">'+
                    dataPArr[i+2]+
                    '</td>'+
                    '</tr>').appendTo($('#needPrintPage tbody'));
            }
        }
        //如果有undefined值那么就清空
        $('#needPrintPage tbody td').each(function (i, v) {
            if ($(v).text()=='undefined'){
                $(v).text('');
            }
        });

        //复制第一个表格到第二个中去
        $('#needPrintPage .contentWrap1').clone(true,true).appendTo(
            $('#needPrintPage .contentWrap2')
        )

        //打印事件
        $('#needPrintPage button').click(function () {
            window.print();
        })
    })
</script>


