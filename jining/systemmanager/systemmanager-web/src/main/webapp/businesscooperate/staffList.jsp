<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/10/26 0026
  Time: 9:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String type = request.getParameter("type");
%>
<html>
<head>
    <title>员工列表</title>
    <style>
        /*#allotStaffList_m #staffTree_m i.jstree-icon.jstree-ocl{*/
            /*display: none;*/
        /*}*/
        /*#allotStaffList_m #staffTree_m>ul>li>a{*/
            /*display: none;*/
        /*}*/
        /*#allotStaffList_m #staffTree_m a{*/
            /*height: 38px;*/
            /*line-height: 38px;*/
            /*padding-left: 15px;*/
        /*}*/
        /*#allotStaffList_m #staffTree_m li[role='treeitem']{*/
            /*margin-left:0;*/
        /*}*/
        #allotStaffList_m  #alreadyPer img{
            width: 25px;
        }
        /*#allotStaffList_m  .jstree-wholerow*/
        /*{*/
            /*height: 38px;*/
            /*width: 154px;*/
        /*}*/
        #alreadyPer li{
            height: 38px;
            line-height: 38px;
            width: 455px;
            padding-right: 15px;
        }
        #alreadyPer li:nth-child(even){
            background:#f5f5f5;
        }
        #alreadyPer li a{
            line-height: 38px;
            font-size: 16px;
            text-decoration: none;
        }
        #search_yg {
            border-top: none !important;
            border-left: none !important;
            border-right: none !important;
            border-bottom: 1px solid #ccc;
        }
        /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
        ::-webkit-scrollbar
        {
            width: 10px;
            height: 16px;
            background-color: #F5F5F5;
        }

        /*定义滚动条轨道 内阴影+圆角*/
        ::-webkit-scrollbar-track
        {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            border-radius: 10px;
            background-color: #F5F5F5;
        }

        /*定义滑块 内阴影+圆角*/
        ::-webkit-scrollbar-thumb
        {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: #555;
        }
    </style>
</head>
<body style="width: 500px">
    <section id="allotStaffList_m">
        <div class="container">
            <div class="row">
                <div class="col-xs-5" style="width: 190px;height: 380px;border-right: 1px solid #DBE3EE;overflow: auto">
                    <div class="row">
                        <div class="col-xs-12">
                            <p class="h5">
                                <img src="<%=request.getContextPath()%>/assets/pages/img/list.png" alt="列表图标">
                                员工列表</p>
                        </div>
                        <div class="col-xs-12">
                            <div class="input-icon">
                                <i class="fa fa-search colorBlue-10a0f7"
                                   style="color: #ccc !important;"></i>
                                <input type="search" class="form-control borderRadius4 btnBorderColor"
                                       id="search_yg" placeholder="搜索">
                            </div>
                            <div id="staffTree_m"></div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-7" style="width: 510px;height: 380px;overflow: auto;">
                    <div class="row" style="margin: 0">
                        <p class="h5">
                            <img src="<%=request.getContextPath()%>/assets/pages/img/list.png" alt="列表图标">
                            已选人员列表</p>
                        <ul id="alreadyPer" style="padding-left: 0">

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script
            src="<%=request.getContextPath()%>/assets/pages/scripts/businesscooperate/staffList.js"
            type="text/javascript"></script>
    <script type="text/javascript">
        $(function(){
             staffSelect_m.setPath('<%=request.getContextPath()%>');
             staffSelect_m.init("<%=type%>");
        });

    </script>
</body>
</html>
