<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/11/3 0003
  Time: 19:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%

%>
<%
    java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    long dateMS = currentTime.getTime();

    currentTime.setTime(dateMS);
    String txtendDate = formatter.format(currentTime); //当前时间

    dateMS = dateMS - 60 * 60 * 24 * 1000 * 7;
    currentTime.setTime(dateMS);
    String txtstarDate = formatter.format(currentTime); //开始时间

    dateMS = dateMS + 60 * 60 * 24 * 1000 * 14;
    currentTime.setTime(dateMS);
    String txtBackDate = formatter.format(currentTime);

%>

        <html>
        <head>
            <title>Title</title>
            <style>
                .advanceViewM .modal-dialog{
                    width: 670px;
                }
                * {
                    margin: 0;
                    padding: 0;
                    outline: none
                }

                .companyMessage {
                    width: 198%;
                    /*height: 150px;*/
                    background: white;
                    border: 1px solid #ccc;
                    padding: 0 15px;
                    padding-bottom: 20px;
                    display: none;
                    position: absolute;
                    z-index: 99;
                    box-shadow: 2px 2px 2px #666;
                    border-radius: 5px!important;
                }

                .companyMessage_top {
                    width: 100%;
                    height: 30px;
                    /*background: gray;*/
                    border-bottom: 1px solid #ccc;
                }

                .companyMessage_top input {
                    border: 0;
                    font-size: 12px;
                    width: 200px;
                    height: 20px;
                    margin-left: 10px;
                    /*margin-top: 10px;*/
                }

                .close {
                    margin-left: 35%;
                }

                .companyMessage table,
                .companyMessage thead,
                .companyMessage th,
                .companyMessage tr,
                .companyMessage td {
                    border: 0;
                    font-size: 12px;
                }
                .companyMessage tr{
                    height: 40px;
                }
                .companyMessage td{
                    height: 40px;
                }
                .companyMessage table {
                    border-collapse: collapse;
                }
                .companyMessage thead tr {
                    border-bottom: 1px solid #0090ff;

                }

                .companyMessage tbody tr {
                    height: 30px;
                }

                .companyMessage .companyMessage_top>i {
                    color: blue;
                }

                .companyMessage tbody input {
                    border: 1px solid #ecf1f5;
                    width: 90%;
                    padding: 2px 5px;
                }

                .companyMessage tbody tr:not(:first-child) input {
                    border: none;
                }

                .companyMessage td a {
                    margin-left: 15px;
                }
                /*table thead{
                    border-bottom: 2px solid #0090ff;
                }*/

                .companyMessage tbody tr:nth-child(even) {
                    background: #ECF1F5;
                }

                .companyMessage tbody tr:nth-child(even) input {
                    background: #ECF1F5;
                    border: #ECF1F5 1px solid;
                }

                .companyMessage .editStatue {
                    border: 1px solid #ccc!important;
                }
                .companyMessage_bottom{
                    width: 100%;
                    height: 30px;
                    /*background: gray;*/
                    border-top: 1px solid #ccc;
                    margin: 0;
                }
                .companyMessage_bottom a{
                    width: 60px;
                    height: 30px;
                    float: right;
                    /* margin-right: 20px; */
                    margin-top: 20px;
                    text-align: center;
                    line-height: 30px;
                    font-size: 14px;
                }
                #advanceViewForm .odd{
                    cursor: pointer;
                }
                .required {
                    color: #e02222;
                    font-size: 12px;
                    padding-left: 2px;
                }

                .messageRight{
                    right:20px;
                }
            </style>
        </head>
        <body>
        <form action="" id="advanceViewForm">
                <div class="row">
                    <div class="col-md-6 col-xs-6">
                        <div class="form-group clearfix">
                            <label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>费用项目&nbsp;&nbsp;</label>
                            <select id="rwgl_fyxm" class="inputCommon inputWidth-col-two"></select>
                        </div>
                    </div>
                    <div class="col-md-6 col-xs-6">
                        <div class="form-group clearfix">
                            <label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>垫付金额&nbsp;&nbsp;</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="dfje">
                        </div>
                    </div>

                        <%--<div class="form-group clearfix advanceime_m">--%>
                            <%--<label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>垫付时间&nbsp;&nbsp;</label>--%>
                            <%--&lt;%&ndash;<input type="text" class="inputCommon inputWidth-col-two" name="dfsj">&ndash;%&gt;--%>
                            <%--<input value="<%=txtendDate%>" type="text" readonly class="inputCommon " name="dfsj" style="border-radius: 0 !important; width: 161px" >--%>
                            <%--<span>--%>
                                        <%--<button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">--%>
                                            <%--<i class="fa fa-calendar"></i>--%>
                                        <%--</button>--%>
                                    <%--</span>--%>
                        <%--</div>--%>

                </div>
            <div class="row">
                <div class="col-md-6 col-xs-6">
                    <div class="form-group clearfix">
                        <label class="labelCommon labelBg color666  labelWidth-col-two"><span class="required"> * </span>垫付时间</label>
                        <input value="<%=txtendDate%>" type="text" readonly class="appsysinfo-m inputCommon advanceime_m" name="dfsj" style="border-radius: 0 !important; width: 162px" >
                        <span>
                              <button class="btn btn-default appsysinfobtn-m advanceime_m1" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                 <i class="fa fa-calendar"></i>
                              </button>
                       </span>
                    </div>
                </div>
                <div class="col-md-6 col-xs-6">
                    <div class="form-group clearfix">
                        <label class="labelCommon labelWidth-col-two color666"><span class="required"> * </span>收费单位&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" name="gsname" readonly>
                    </div>
                    <div class="companyMessage messageRight">
                        <p class="companyMessage_top">
                            <i class="fa fa-search"></i><input class="search" type="" name="" id="" value="" placeholder="请输入收费单位/纳税人识别号" />
                            <span class="close">X</span>
                        </p>
                        <table border="" cellspacing="0" cellpadding="0">
                            <thead>
                            <tr class="color333" role="row">
                                <th width="30px" class="text-center sorting_disabled" rowspan="1" colspan="1">选择</th>
                                <th width="120px" class="text-center sorting_disabled" rowspan="1" colspan="1">纳税人识别号</th>
                                <th width="130px" class="sorting_disabled text-center" rowspan="1" colspan="1"><span class="required"> * </span>收费单位</th>
                                <th width=" 90px" rowspan="1" colspan="1">姓名</th>
                                <th width="100px" class="sorting_disabled text-center" rowspan="1" colspan="1">手机号码</th>
                                <th width="100px" class="sorting_disabled text-center" rowspan="1" colspan="1">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" class=" enter">

                                <td class=" text-center"></td>
                                <td class=" text-center"><input class="tjnsrsbh" type="text" value="" /></td>
                                <td class=" text-center"><input class="tjgsmc" type="text" value="" /></td>
                                <td><input class="tjxm" type="text" value="" /></td>
                                <td class=" text-center"><input class="tjlxdh" type="text" value="" /></td>
                                <td class=" text-center">
                                    <a href="javascript:;" class="addMessage" data-type="detail" data-toggle="tooltip" title=""><i class=""></i>添加</a>
                                    <a href="javascript:;" class="cancelEnter" data-type="receive" data-toggle="tooltip" title=""><i class=""></i>取消</a>

                                </td>
                            </tr>

                            </tbody>
                        </table>
                        <p class="companyMessage_bottom">
                            <a class="clickTrue btnBlue borderRadius4 colorfff" href="javascript:;">
                                确定
                            </a>
                        </p>
                    </div>
                </div>

            </div>


            <div class="row">
                <div class="col-md-6  col-xs-6">
                    <div class="form-group clearfix">
                        <label class="labelCommon labelWidth-col-two color666"><span class="required"> </span>纳税人识别号&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" name="userAccount" readonly>
                    </div>
                    <div class="companyMessage">
                        <p class="companyMessage_top">
                            <i class="fa fa-search"></i><input class="search"  placeholder="请输入收费单位/纳税人识别号" />
                            <span class="close">X</span>
                        </p>
                        <table border="" cellspacing="0" cellpadding="0">
                            <thead>
                            <tr class="color333" role="row">
                                <th width="30px" class="text-center sorting_disabled" rowspan="1" colspan="1">选择</th>
                                <th width="120px" class="text-center sorting_disabled" rowspan="1" colspan="1">纳税人识别号</th>
                                <th width="130px" class="sorting_disabled text-center" rowspan="1" colspan="1"><span class="required"> * </span>收费单位</th>
                                <th width=" 90px" rowspan="1" colspan="1">姓名</th>
                                <th width="100px" class="sorting_disabled text-center" rowspan="1" colspan="1">手机号码</th>
                                <th width="100px" class="sorting_disabled text-center" rowspan="1" colspan="1">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" class=" enter">
                                <td class=" text-center"></td>
                                <td class=" text-center"><input class="tjnsrsbh" type="text" value="" /></td>
                                <td class=" text-center"><input class="tjgsmc" type="text" value="" /></td>
                                <td><input class="tjxm" type="text" value="" /></td>
                                <td class=" text-center"><input class="tjlxdh" type="text" value="" /></td>
                                <td class=" text-center">
                                    <a href="javascript:;" class="addMessage" data-type="detail" data-toggle="tooltip" title=""><i class=""></i>添加</a>
                                    <a href="javascript:;" class="cancelEnter" data-type="receive" data-toggle="tooltip" title=""><i class=""></i>取消</a>

                                </td>
                            </tr>

                            </tbody>
                        </table>
                        <p class="companyMessage_bottom">
                            <a class="clickTrue btnBlue borderRadius4 colorfff" href="javascript:;">
                            确定
                            </a>
                        </p>
                    </div>
                </div>
                <div class="col-md-6  col-xs-6">
                    <div class="form-group clearfix">
                        <label class="labelCommon labelWidth-col-two color666"><span class="required"> </span>手机号码&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" name="number" readonly>
                    </div>
                    <div class="companyMessage messageRight">
                        <p class="companyMessage_top">
                            <i class="fa fa-search"></i><input class="search"  placeholder="请输入收费单位/纳税人识别号" />
                            <span class="close">X</span>
                        </p>
                        <table border="" cellspacing="0" cellpadding="0">
                            <thead>
                            <tr class="color333" role="row">
                                <th width="30px" class="text-center sorting_disabled" rowspan="1" colspan="1">选择</th>
                                <th width="120px" class="text-center sorting_disabled" rowspan="1" colspan="1">纳税人识别号</th>
                                <th width="130px" class="sorting_disabled text-center" rowspan="1" colspan="1"><span class="required"> * </span>收费单位</th>
                                <th width=" 90px" rowspan="1" colspan="1">姓名</th>
                                <th width="100px" class="sorting_disabled text-center" rowspan="1" colspan="1">手机号码</th>
                                <th width="100px" class="sorting_disabled text-center" rowspan="1" colspan="1">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" class=" enter">
                                <td class=" text-center"></td>
                                <td class=" text-center"><input class="tjnsrsbh" type="text" value="" /></td>
                                <td class=" text-center"><input class="tjgsmc" type="text" value="" /></td>
                                <td><input class="tjxm" type="text" value="" /></td>
                                <td class=" text-center"><input class="tjlxdh" type="text" value="" /></td>
                                <td class=" text-center">
                                    <a href="javascript:;" class="addMessage" data-type="detail" data-toggle="tooltip" title=""><i class=""></i>添加</a>
                                    <a href="javascript:;" class="cancelEnter" data-type="receive" data-toggle="tooltip" title=""><i class=""></i>取消</a>

                                </td>
                            </tr>

                            </tbody>
                        </table>
                        <p class="companyMessage_bottom">
                            <a class="clickTrue btnBlue borderRadius4 colorfff" href="javascript:;">
                                确定
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-xs-6">
                    <div class="form-group clearfix">
                        <label class="labelCommon labelWidth-col-two color666"><span class="required"> </span>联系人姓名&nbsp;&nbsp;</label>
                        <input type="text" class="inputCommon inputWidth-col-two" name="name" readonly>
                    </div>
                    <div class="companyMessage">
                        <p class="companyMessage_top">
                            <i class="fa fa-search"></i><input class="search" placeholder="请输入收费单位/纳税人识别号" />
                            <span class="close">X</span>
                        </p>
                        <table border="" cellspacing="0" cellpadding="0">
                            <thead>
                            <tr class="color333" role="row">
                                <th width="30px" class="text-center sorting_disabled" rowspan="1" colspan="1">选择</th>
                                <th width="120px" class="text-center sorting_disabled" rowspan="1" colspan="1">纳税人识别号</th>
                                <th width="130px" class="sorting_disabled text-center" rowspan="1" colspan="1"><span class="required"> * </span>收费单位</th>
                                <th width=" 90px" rowspan="1" colspan="1">姓名</th>
                                <th width="100px" class="sorting_disabled text-center" rowspan="1" colspan="1">手机号码</th>
                                <th width="100px" class="sorting_disabled text-center" rowspan="1" colspan="1">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" class=" enter">
                                <td class=" text-center"></td>
                                <td class=" text-center"><input class="tjnsrsbh" type="text" value="" /></td>
                                <td class=" text-center"><input class="tjgsmc" type="text" value="" /></td>
                                <td><input class="tjxm" type="text" value="" /></td>
                                <td class=" text-center"><input class="tjlxdh" type="text" value="" /></td>
                                <td class=" text-center">
                                    <a href="javascript:;" class="addMessage" data-type="detail" data-toggle="tooltip" title=""><i class=""></i>添加</a>
                                    <a href="javascript:;" class="cancelEnter" data-type="receive" data-toggle="tooltip" title=""><i class=""></i>取消</a>

                                </td>
                            </tr>

                            </tbody>
                        </table>
                        <p class="companyMessage_bottom">
                            <a class="clickTrue  btnBlue borderRadius4 colorfff" href="javascript:;">
                            确定
                            </a>
                        </p>
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group clearfix" style="margin-bottom: 26px;">
                        <label class="labelCommon labelWidth-col-two color666" style="height: 150px;line-height: 150px">备注信息&nbsp;&nbsp;</label>
                        <textarea type="text" class="inputCommon inputWidth-col-one" name="bzxx" style="height: 150px;width: 535px!important;padding: 10px;"></textarea>
                        <p class="wordNum" style="margin: 0;width: 90px;position: absolute;right: 38px;bottom: 5px;text-align: right;">剩余<span class="num" style="color: red;">300</span>个字符</p>
                    </div>
                </div>
            </div>
        </form>
        <script src="<%=request.getContextPath()%>/assets/pages/scripts/taskcenter/taskmanagement/advanceView.js"></script>
        <script>
            advanceView.init();
            advanceView.setPath('<%=request.getContextPath()%>')
        </script>
        </body>
        </html>

