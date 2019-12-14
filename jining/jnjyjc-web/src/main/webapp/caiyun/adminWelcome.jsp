<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.UUID" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String UniqueID = UUID.randomUUID().toString();
%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title></title>

    <!-- 可选的 Bootstrap 主题文件（一般不用引入） -->

    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/caiyun/adminBase.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/caiyun//public.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/font/iconfont.css"/>
    <style type="text/css">
        body {
            /*overflow: auto;*/
            background: #f0f0f0;
            width: 100%;
        }

        #welcomeDIV .col-md-2 {
            width: 20% !important;
        }

        #welcomeDIV #GJTX {
            width: 100%;
            height: 100%;
            border: none;
            position: absolute;
            z-index: 10;
            background: transparent;
        }

        .myh4 {
            font-size: 16px;
            /*margin-bottom: 16px;*/
            text-align: left;
        }

        .remin-head {
            width: 98%;
            background: #ffffff;
            height: 70px;
            padding: 5px 0;
            margin-top: 20px;
            margin-left: 15px;
            margin-bottom: 0;
        }

        .remin-head > li {
            /*background: blue;*/
            border-right: 1px solid #dbdbdb;
            float: left;
        }

        .remin-head > li:nth-child(1) {
            width: 12%;
        }

        .remin-head > li:nth-child(2) {
            width: 18%;
        }

        .remin-head > li:nth-child(2) p:nth-child(1) {
            height: 23px;
            line-height: 23px;
            margin: 0 !important;
            text-align: center;
        }

        .remin-head > li:nth-child(2) p:nth-child(2) {
            height: 23px;
            line-height: 23px;
            text-align: right;
            margin-top: 7px;
            margin-bottom: 4px;
            margin-right: 50px;
            color: #66aafd;
        }

        .remin-head > li:nth-child(3) {
            width: 18%;
        }

        .remin-head > li:nth-child(3) p:nth-child(1) {
            height: 23px;
            line-height: 23px;
            margin: 0 !important;
            text-align: center;
        }

        .remin-head > li:nth-child(3) p:nth-child(2) {
            height: 23px;
            line-height: 23px;
            text-align: right;
            margin-top: 7px;
            margin-bottom: 4px;
            margin-right: 50px;
            color: #66aafd;
        }

        .remin-head > li:nth-child(4) {
            width: 18%;
        }

        .remin-head > li:nth-child(4) p:nth-child(1) {
            height: 23px;
            line-height: 23px;
            margin: 0 !important;
            text-align: center;
        }

        .remin-head > li:nth-child(4) p:nth-child(2) {
            height: 23px;
            line-height: 23px;
            text-align: right;
            margin-top: 7px;
            margin-bottom: 4px;
            margin-right: 65px;
            color: #66aafd;
        }

        .remin-head > li:nth-child(5) {
            width: 22%;
            border: 0;
        }

        .remin-head > li:nth-child(5) p:nth-child(1) {
            height: 23px;
            line-height: 23px;
            margin: 0 !important;
            text-align: center;
        }

        .remin-head > li:nth-child(5) p:nth-child(2) {
            height: 23px;
            line-height: 23px;
            text-align: right;
            margin-top: 7px;
            margin-bottom: 4px;
            margin-right: 115px;
            color: #66aafd;
        }

        .remin-head li i {
            font-size: 40px;
            margin-left: 45px;
            color: #4eb4ff;
            line-height: 57px;
        }



        .colorBlue {
            color: #0092E3;
            border-bottom: 2px solid #0092E3;
        }

        .titleSize-m span {
            display: block;
            float: left;
            margin-bottom: 5px;
            font-size: 14px;
        }

        .titleSize-m span:not(:nth-child(1)) {
            margin-left: 20px;
        }

        #charge .titleSize-m span {
            height: 20px;
            line-height: 20px;
            height: 30px;
        }

        .clearBoth {
            clear: both;
        }


        .user_login {
            width: 340px;
            height: 260px;
        }


        .landingTimes {
            width: 340px;
            height: 240px;
            margin-top: 30px;
        }
        .appStartView{
            font-size: 12px;
            float: left;
            margin-left: 10px;
            margin-top: 1px;
        }
        .admin-tab {
            background: #f1f1f1;
        }




        #main-tab{
            /*height: 875px!important;*/
            overflow: hidden!important;
        }
        .page-content{
            /*min-height: 875px!important;*/
            height:100%;
        }
        .gsMore{
            float: right;
        }
        .cusList .modal-dialog{
            width: 1000px!important;
            margin: 30px auto;
        }



    </style>
    <style type="text/css">
        .welcomebox p,.welcomebox ul,.welcomebox li,.welcomebox h2{margin: 0;padding: 0;list-style: none;}
        .welcomebox{
            overflow: hidden;
            clear: both;
            width: 98%;
            margin: 0 auto;
            font-size: 12px;
        }
        .sbox{
            float: left;
            height: 300px;
            width:49%;
            border: 1px solid #dedede;
            margin-top: 10px;
            background: #fff;
        }
        .sbox h2{
            background:cornflowerblue;
            font-size:14px;
            height: 30px;
            vertical-align:middle;
            line-height: 30px;
            text-indent:6px;
            color: #fff;
        }
        .sbox li{
            height: 25px;
            line-height: 25px;
            vertical-align: middle;
            padding:2px 5px;
        }
        .sboxh{
            float: left;
            height: 226px;
            width:100%;
            border: 1px solid #dedede;
            margin-top: 10px;
            background: #fff;
        }
        .sbox li  a{
            color:#666;
            text-decoration: none;
        }
        .sbox li  a:hover{
            color:#666;
            text-decoration: underline;
        }
        .sbox li span{
            float: right;
        }
        .sboxr{
            float: right;
        }
    </style>
    <style>
        /** {*/
            /*margin: 0;*/
            /*padding: 0;*/
        /*}*/
        /*table{*/
            /*!*设置相邻单元格的边框间的距离*!*/
            /*border-spacing: 0;*/
            /*!*表格设置合并边框模型*!*/
            /*border-collapse: collapse;*/
            /*text-align: center;*/
        /*}*/
        /*!*关键设置 tbody出现滚动条*!*/
        /*table tbody{*/
            /*display: block; /*/
           /*!* height: 160px;*!*/
            /*overflow-y: scroll;*/
        /*}*/
        /*table thead,*/
        /*tbody tr{*/
            /*display: table;*/
            /*width: 100%;*/
            /*table-layout: fixed;*/
        /*}*/
        /*!*关键设置：滚动条默认宽度是16px 将thead的宽度减16px*!*/
        /*table thead{*/
            /*width: calc(100% - 1em);*/
        /*}*/
    </style>
</head>

<body>
<div id="firstLoad_m">
    <div>
        <div class="IKnow"></div>
    </div>
</div>
<div class="bottom_right" id="welcomeDIV">
    <div class="welcomebox">
        <div class="sbox">
            <h2>通知通告</h2>
            <ul id="list_tztg">

            </ul>
        </div>
        <div class="sbox sboxr">
            <h2>待办工作</h2>
            <ul>
                <li><span></span><a href="#"></a></li>
                <li><span></span><a href="#"></a></li>
                <li><span></span><a href="#"></a></li>
                <li><span></span><a href="#"></a></li>
                <li><span></span><a href="#"></a></li>
                <li><span></span><a href="#"></a></li>
                <li><span></span><a href="#"></a></li>
                <li><span></span><a href="#"></a></li>
                <li><span></span><a href="#"></a></li>
                <li><span></span><a href="#"></a></li>
            </ul>
        </div>
       <%-- <div class="sboxh">
            <iframe width="100%" height="300px" src="http://www.foodmate.net/"></iframe>
        </div>--%>
        <div class="sbox sboxh" id="mainBox" >
            <h2>报告查看面板</h2>
            <div style="overflow-y:auto;height: 200px;">
                <table class="table table-striped table-bordered table-hover"
                       style="width:100%;border: 1px;">
                    <thead>
                        <tr>
                            <th>委托编号1</th>
                            <th>样品名称</th>
                            <th>样品编号</th>
                            <th>生产单位名称</th>
                            <th>检测项目</th>
                        </tr>
                    </thead>
                    <tbody id="list_SampleCollection" align="left"><!--style="height: 160px;"-->

                    </tbody>
                </table>
                <%--<div style="height:160px; overflow:scroll;">
                    <table  id="list_SampleCollection" class="table table-striped table-hover" style="width:100%">

                    </table>
                </div>--%>
            </div>
        </div>
    </div>
</div>

</body>

<script type="text/javascript">

    $(".spinnerWrap").remove();
    $(window).resize(function () {

        initWidth();

        //user_login();

        //landingTimes();
    });

    /*实现打开新选项卡创建出库单
     * @param   -target  this
     * @param   srcStr  选项卡显示的网页的地址
     * @param   menuName   选项卡名称
     * @param   id       唯一标识选项卡
     */

    var generateTab = function (_target, srcStr, menuName, id, icon) {
        //标签移除
        $("#tab-page-nav-" + id).remove();
        //内容移除
        $("#tab-page-content-" + id).remove();
        var _opt;
        var $a_alarm = $('ul.page-sidebar-menu').find('a.nav-link.nav-toggle[url="' + srcStr + '"]');
        if ($a_alarm.length > 0) {
            _opt = {
                title: '<i class="' + $a_alarm.find('i').attr('class') + '"><i></i></i> ' + $a_alarm.find('span').html(),
                id: $a_alarm.data('addtab'),
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        } else {
            _opt = {
                title: '<i class="' + icon + '"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    }



    //  初始化图表父容器宽度
    var initWidth = function () {
        var w = $(window).width() - 180;
        // var w1=$('div.echarstyesday.row').width();

        $('#user_login .user_login').width(w * 0.33 - 40);

        $('#landingTimes .landingTimes').width(w * 0.65 - 40);
//			var width = $("#SWTXTable").width();
    }

    initWidth();

    //getTopTztg();

    getORSampleCollection();

    //user_login();

    //landingTimes()

    function user_login() {
        var login_charts = echarts.init($(".user_login")[0]);
        //		近七天登录情况
        var user_loginCount = [];
        var user_loginDay = [];
        $.ajax({
            type: "get",
            url: "<%=request.getContextPath()%>/adminWelcome/loginStatByWeek",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.loginStatByWeek.length; i++) {
                    user_loginCount.push(data.loginStatByWeek[i].count)
                    user_loginDay.push(data.loginStatByWeek[i].DAY)
                }

                option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            //          mark : {show: true},
                            //          dataView : {show: true, readOnly: false},
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            selfButtons: { //自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
                                show: true, //是否显示
                                title: '自定义', //鼠标移动上去显示的文字
                                icon: 'test.png', //图标
                                option: {},
                                onclick: function (option1) { //点击事件,这里的option1是chart的option信息
                                    alert('1'); //这里可以加入自己的处理代码，切换不同的图形
                                }
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    grid: {
                        left: '1%',
                        right: '20%',
                        bottom: '15%',
                        top: "15%",
                        containLabel: true
                    },
                    xAxis: {
                        name: "年/月/日",
                        type: 'category',
                        boundaryGap: false,
                        data: user_loginDay
                    },
                    yAxis: {
                        name: "/次",
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}/次'
                        }
                    },
                    series: [{
                        name: '最高人数',
                        type: 'line',
                        data: user_loginCount,
                        //          markPoint: {
                        //              data: [
                        //                  {type: 'max', name: '最大值'},
                        //                  {type: 'min', name: '最小值'}
                        //              ]
                        //          },
                        //          markLine: {
                        //              data: [
                        //                  {type: 'average', name: '平均值'}
                        //              ]
                        //          },
                        itemStyle: {
                            normal: {
                                color: '#3091fa',
                                lineStyle: {
                                    color: '#3091fa'
                                }
                            }
                        }
                    }]
                };
                login_charts.setOption(option);
            }
        });


    };



    function landingTimes() {
        var landing_charts = echarts.init($(".landingTimes")[0]);
        //		用户登录情况
        var landingTimes_name = [];
        var landingTimes_count = [];
        $.ajax({
            type: "get",
            url: "<%=request.getContextPath()%>/adminWelcome/LoginStationByEveryDay",
            async: true,
            success: function (data) {
                $('#currentLoginNums').text(data.num);
                for (var i = 0; i < data.LoginStationByEveryDay.length; i++) {

                    landingTimes_count.push(data.LoginStationByEveryDay[i].count);
                    landingTimes_name.push(data.LoginStationByEveryDay[i].DLZH)
                }
                option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '6%',
                        bottom: '5%',
                        top: "20%",
                        containLabel: true
                    },
                    xAxis: {
                        name: "/次",
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        axisLabel: {
                            formatter: '{value}/次'
                        }
                    },
                    yAxis: {
                        name: "名称",
                        type: 'category',
                        data: landingTimes_name
                    },
                    series: [
                        {
                            type: 'bar',
                            data: landingTimes_count,
                            itemStyle: {
                                normal: {
                                    color: '#3091fa',
                                    lineStyle: {
                                        color: '#3091fa'
                                    }
                                }
                            }
                        }
                    ]
                };
                landing_charts.setOption(option);
            }
        });

    }


    $(".dayReceivables").on("click", function () {
        $("#charge .titleSize-m span:not(:nth-child(1))").removeClass("colorBlue");
        $(this).addClass("colorBlue");
        dayReceivables();
    })
    $(".weekReceivables").on("click", function () {
        $("#charge .titleSize-m span:not(:nth-child(1))").removeClass("colorBlue");
        $(this).addClass("colorBlue");
        weekReceivables();
    })
    $(".monthReceivables").on("click", function () {
        $("#charge .titleSize-m span:not(:nth-child(1))").removeClass("colorBlue");
        $(this).addClass("colorBlue");
        monthReceivables();
    })
    $(".lastMonthReceivables").on("click", function () {
        $("#charge .titleSize-m span:not(:nth-child(1))").removeClass("colorBlue");
        $(this).addClass("colorBlue");
        lastMonthReceivables();
    })

    /*获取最新通知通告*/
    function getTopTztg(){
        var tzobj = [];
        $.ajax({
                 url:" <%=request.getContextPath()%>/systemmanager/systemAnnouncement/getAllSystemAnnouncement?tzNumber=10",
                 dataType: 'JSON',
                 type: 'GET',
                 success: function (data) {
                     for (var i = 0; i < data.length; i++) {
                         tzobj.push("<li style='cursor: pointer;' onclick=\"viewTztg('"+data[i].systemAnnouncementId+"')\" id='"+data[i].id+"'>"+data[i].announcementName+"</li>");

                     }
                     $("#list_tztg").html(tzobj);

                 },
                 error: function () {
                     //return App.unblockUI(jqueryMap.$blockTarget);
                 }
        });
    }


    /**
     * 弹出窗口
     * @param title
     * @param url
     */
    var openModal = function (title, url) {
        var dialogButtons = {};
        dialogButtons.cancel = {
            label: '<i class="fa fa-times iconMr"></i> 关闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };

        $.get(url, function (html) {
            bootbox.dialog({
                className: 'system-announce-dialog',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    /**
     * 查看公告
     * @param ggid
     */
    var viewTztg = function (id) {
        openModal("查看公告", "<%=request.getContextPath()%>/systemmanager/systemannouncement/systemannouncementview.jsp?systemAnnouncementId=" + encodeURI(id));

        /*$.ajax({
            url:  "<%=request.getContextPath()%>/systemmanager/systemannouncement/readSystemAnnouncement?id=" + id,
            type: 'PUT',
            success: function (result) {
                debugger;
                if (result) {
                    openModal("查看公告", "<%=request.getContextPath()%>/systemmanager/systemannouncement/systemannouncementview.jsp?systemAnnouncementId=" + encodeURI(id));
                }
                else {
                    Messenger().post({
                        message: "出错啦!",
                        type: 'error'
                    });
                }
            },
            error: function (e) {
                console.log("日志："+e.error());
            }
        });*/

    }

    /*超时提醒 样品收样 console.log();*/
    function getORSampleCollection(){
        $.ajax({
            url:" <%=request.getContextPath()%>/systemmanager/OverdueReminder/SelectOverdueReminder1",
            dataType: 'JSON',
            type: 'GET',
            /*type: 'POST',*/
            success: function (data) {
                console.log(11111);
                console.log(JSON.stringify(data)+"123");
               var obj = eval(data);
              /* var obj = JSON.parse(data);*/
                /* for (var i = 0; i < obj.length; i++) {  //判断	受检单位字段是否为空
                      if(obj[i].dwmc == null){
                          obj[i].dwmc='';
                      }
                  }*/
                console.log(222222222);
                var html = '';
                for (var i = 0; i < obj.data.length; i++) {
                   /* html = html + '<tr role="row" class="odd"><td>' +data.WTID.get(0).ID +'</td>'
                    + '<td>' +obj[i].wtid +'</td>'
                        + '<td>' +obj[i].ypbm +'</td>'
                    +'<td>' + obj[i].ypmc +'</td>'
                    +'<td>' + obj[i].scdw +'</td></tr>';*/
                    html = html + '<tr role="row" class="odd"><td>' +obj.data[i].WTID +'</td>'
                        + '<td>' +obj.data[i].YPBM +'</td>'
                        +'<td>' + obj.data[i].YPMC +'</td>'
                        +'<td>' + obj.data[i].SCDW +'</td> '
                        +'<td>' + obj.data[i].JCXM +'</td></tr>';
                    // obj.push("<li style='cursor: pointer;' onclick=\"viewBGXX('"+data.data[i].ID+"')\" id='"+data.data[i].ID+"'>"+
                    //     "委托编号:"+data.data[i].WTID+" 样品名称："+data.data[i].YPMC+" 样品编号："+data.data[i].YPBM+" 生产单位名称："+data.data[i].SCDW+" </li>"+" 查看");
                }
                console.log(obj);
                $("#list_SampleCollection").html(html);
            },
            error: function () {
            }
        });
    }



</script>



</html>