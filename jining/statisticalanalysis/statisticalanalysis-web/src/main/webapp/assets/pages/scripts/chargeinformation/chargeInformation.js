var chargeInformationFn = function(){
    'use strict';

    // 全局属性参数
    var configMap = {
        time:"0",
    };

    // 全局Dom
    var jqueryMap = {
        allContainer: null,
        chart1: null,
        chart2: null,
        chart3: null,
        chart4: null,
        chart5: null,
        chart6: null,
    };
    var chartW,chartW1,chartW2;
    var setJqueryMap = function() {
        jqueryMap.allContainer = $('#chargeTotalContainer');
        jqueryMap.chart1 = $('#chargePieCon1', jqueryMap.allContainer);
        jqueryMap.chart2 = $('#chargePieCon2', jqueryMap.allContainer);
        jqueryMap.chart3 = $('#chargeLineCon3', jqueryMap.allContainer);
        jqueryMap.chart4 = $('#chartPic4', jqueryMap.allContainer);
        jqueryMap.chart5 = $('#chartPic5', jqueryMap.allContainer);
        jqueryMap.chart6 = $('#chartPic6', jqueryMap.allContainer);

    };
    setJqueryMap();
    /**********************************设置图表容器的大小***********************************/
    //窗口大小
    function winSize() {
        var winW = $(window).width();
        chartW = (winW - 244) / 2;
        chartW1 = (winW- 350);
        chartW2 = (winW - 450) / 3;
        //按照1.8的比例计算的高度
        var chartH = chartW / 1.8;
        var chartH1 = chartW*400/800;
        var chartH2 = chartW*185/284;
        $('#chargePieCon1,#chargePieCon2',jqueryMap.allContainer).css({
            height: chartH,
            width: chartW
        });
        $('.chartAraea:nth-child(3)>#chargeLineCon3', jqueryMap.allContainer).css({
            height: chartH1,
            width: chartW1
        });
        $('#chartPic4,#chartPic5,#chartPic6', jqueryMap.allContainer).css({
            height: chartH2,
            width: chartW2
        });
    }

    winSize();
    /**********************************设置图表容器的大小***********************************/
    /**********************************图表和列表的切换***********************************/
    $('#switchbtnContainer1 .pull-right', jqueryMap.allContainer).click(function() {
        $('#chargeChargeArea1,#chargeChargeArea2').hide();
        if ($(this).attr('data-sign') == '1') {
            $('#chargeChargeArea1').show();
            $(this).children('img').attr('src', '/systemmanager/assets/pages/img/chart-checked.png')
                .end()
                .css('background', '#f4f4f4');
            $(this).siblings('div').children('img').attr('src','/systemmanager/assets/pages/img/list-unchecked.png')
                .end()
                .css('background', '#fff');
        } else {
            $('#chargeChargeArea2').show()
                .empty()
                .load('/statisticalanalysis/chargestatistics/chargestatistics.jsp');
            $(this).children('img').attr('src', '/systemmanager/assets/pages/img/list-checked.png')
                .end()
                .css('background', '#f4f4f4');
            $(this).siblings('div').children('img').attr('src', '/systemmanager/assets/pages/img/chart-unchecked.png')
                .end()
                .css('background', '#fff');
        }
    });
    /**********************************图表和列表的切换***********************************/
        //图表1日期的选择
    var  date = new Date();
    var jintian = date.getTime();
    $('#daterange-Mbtn1 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
    $('#daterange-Mbtn2 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
    $('#daterange-Mbtn3 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
    $('#daterange-Mbtn4 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
    $('#daterange-Mbtn5 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
    $('#daterange-Mbtn6 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
    var chart1DaysSign = moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD'),
        chart3DaysSign3= moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD'),
        chart2DaysSign2= moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD'),
        chart4DaysSign4= moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD'),
        chart5DaysSign5= moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD'),
        chart6DaysSign6= moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD');
    $('#daterange-Mbtn1').daterangepicker({
            ranges: {
                '全部': [moment(), moment().subtract(-1, 'days')],
                '今日': [moment(), moment()],
                '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '近七天': [moment().subtract(6, 'days'),moment()],
                '近30天': [moment().subtract(29, 'days'),moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '本年':  [moment().startOf('year'), moment().endOf('year')]
            },
            startDate: moment(),
            endDate: moment()
        },
        function(start, end,label) {
            if(label=='全部'){
                $('#daterange-Mbtn1 span').html('全部');
            }else if(label=='今日'){
                $('#daterange-Mbtn1 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='昨日'){
                $('#daterange-Mbtn1 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
            }else if(label=='近七天'){
                $('#daterange-Mbtn1 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='近30天'){
                $('#daterange-Mbtn1 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本月'){
                $('#daterange-Mbtn1 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本年'){
                $('#daterange-Mbtn1 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }

        }).on('apply.daterangepicker', function(ev, picker) {
            console.info(picker);
            // console.log(moment(picker.startDate._d).format('YYYY-MM-DD'));
            // console.info(moment(picker.endDate._d).format('YYYY-MM-DD'));

            if(!picker.endDate){
                $('#daterange-Mbtn1 span').html(moment(picker.startDate._d).format('YYYY/MM/DD')+'-'+moment(picker.startDate._d).format('YYYY/MM/DD'));
                chart1DaysSign = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.startDate._d).format('YYYY-MM-DD');
            }else{
                chart1DaysSign = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
            }
        if(picker.chosenLabel=="全部"){
            chart1DaysSign='1/1'
        }
        chartFn1();
    });








    /**********************************指定每个图表的配置项和数据********************************************************************************/

    //    图表1的配置项



    chartFn1();

    function chartFn1() {
        var data1 = [];
        var info1 = [];
        $.ajax({
            url: '/statisticalanalysis/chargeInformation/chargeAuditByMemberCountByCustomByDay/'+chart1DaysSign,
            success: function(d) {
                info1['all'] = d.all;
                for (var i=0;i < d.list.length; i++){
                    var  a = {};
                    if (d.list[i].shzt=='000'){
                        a.name = '未审核';
                        a.value = d.list[i].count;
                        data1.push(a);
                        info1['wsh'] = d.list[i].count;
                    }
                    if (d.list[i].shzt=='001'){
                        a.name = '同意';
                        a.value = d.list[i].count;
                        data1.push(a);
                        info1['ty'] = d.list[i].count;
                    }
                    if (d.list[i].shzt=='002'){
                        a.name = '不同意';
                        a.value = d.list[i].count;
                        data1.push(a);
                        info1['bty'] = d.list[i].count;
                    }
                    if (d.list[i].shzt=='003'){
                        a.name = '审核中';
                        a.value = d.list[i].count;
                        data1.push(a);
                        info1['shz'] = d.list[i].count;
                    }
                }
                var option1 = {
                    color: ['#ED3F40', '#FE9201', '#4FAFFB', '#75C353'],
                    /* title: {
                     text: '收费台账审核占比情况',
                     // subtext: '纯属虚构',
                     x: '15',
                     y:'15'
                     },*/
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    calculable: true,
                    series: [

                        {
                            name: '收费台账审核占比情况',
                            type: 'pie',
                            center: ['35%', '50%'],
                            radius: [chartW * 0.08, chartW * 0.15],
                            data: data1
                        }
                    ]};
                var myChart1 = echarts.init(jqueryMap.chart1.get(0));
                myChart1.setOption(option1);
                    $('#firstChartDis_M #chargePiePic1').remove();
                    $('<ul class="list-unstyled" id="chargePiePic1" title="收费台账审核占比情况是指对已经收费的台账进行审核状态的统计" style="border-top: 1px solid #dedede;margin-top: 45px;position: absolute;right:0px;top: 0;height: 100%;background: #f4f4f4;width: 200px;padding: 0 15px">' +
                     ' <li><span>账单总数&nbsp;&nbsp;&nbsp;</span><span class="fontSpan" style="color: #75C353;">' + info1['all'] + '</span></li>' +
                     ' <li><span>未审核&nbsp;&nbsp;&nbsp;</span><span class="fontSpan" style="color:#ED3F40;">' + info1['wsh'] + '</span></li>' +
                     ' <li><span>同意&nbsp;&nbsp;&nbsp;</span><span class="fontSpan" style="color:#FF9201 ">' + info1['ty'] + '</span></li>' +
                     ' <li><span>不同意&nbsp;&nbsp;&nbsp;</span><span class="fontSpan" style="color: #4FAFFC;">' + info1['bty'] + '</span></li>' +
                     '<li><span>审核中&nbsp;&nbsp;&nbsp;</span><span class="fontSpan" style="color: #75C353;">' + info1['shz'] + '</span></li>' +
                     ' </ul>').appendTo($('#firstChartDis_M'));

            }
        });
    }


    //    图表2的配置项

    //初始是1表示近7天的数据2是本月的数据

    $('#daterange-Mbtn2').daterangepicker({
            ranges: {
                '全部': [moment(), moment().subtract(-1, 'days')],
                '今日': [moment(), moment()],
                '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '近七天': [moment().subtract(6, 'days'),moment()],
                '近30天': [moment().subtract(29, 'days'),moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '本年':  [moment().startOf('year'), moment().endOf('year')]
            },
            startDate: moment(),
            endDate: moment()
        },
        function(start, end,label) {
            if(label=='全部'){
                $('#daterange-Mbtn2 span').html('全部');
            }else if(label=='今日'){
                $('#daterange-Mbtn2 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='昨日'){
                $('#daterange-Mbtn2 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
            }else if(label=='近七天'){
                $('#daterange-Mbtn2 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='近30天'){
                $('#daterange-Mbtn2 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本月'){
                $('#daterange-Mbtn2 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本年'){
                $('#daterange-Mbtn2 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }

        }).on('apply.daterangepicker', function(ev, picker) {

        if(!picker.endDate){
            $('#daterange-Mbtn2 span').html(moment(picker.startDate._d).format('YYYY/MM/DD')+'-'+moment(picker.startDate._d).format('YYYY/MM/DD'));
            chart2DaysSign2 = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.startDate._d).format('YYYY-MM-DD');
        }else{
            chart2DaysSign2 = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
        }

        if(picker.chosenLabel=="全部"){
            chart2DaysSign2='1/1'
        }
        chartFn2();
    });


    chartFn2();

    function chartFn2() {
        var data2 = [];
        var info2 = [];
        $.ajax({
            url: '/statisticalanalysis/chargeInformation/chargeStatMemberCountByCustomByZdy/'+chart2DaysSign2,
            success: function(d) {
                info2['all']=d.all;
                for (var i=0;i < d.list.length; i++){
                    var  a = {};
                    if (d.list[i].sfzt=='000'){
                        a.name = '未收费';
                        a.value = d.list[i].count;
                        data2.push(a);
                        info2['wsf']=d.list[i].count;
                    }
                    if (d.list[i].sfzt=='001'){
                        a.name = '已收费';
                        a.value = d.list[i].count;
                        data2.push(a);
                        info2['ysf']=d.list[i].count;
                    }
                    if (d.list[i].sfzt=='002'){
                        a.name = '欠费中';
                        a.value = d.list[i].count;
                        data2.push(a);
                        info2['qf']=d.list[i].count;
                    }
                    if (d.list[i].sfzt=='003'){
                        a.name = '催费中';
                        a.value = d.list[i].count;
                        data2.push(a);
                        info2['cf']=d.list[i].count;
                    }
                    if (d.list[i].sfzt=='004'){
                        a.name = '已到款';
                        a.value = d.list[i].count;
                        data2.push(a);
                        info2['ydk']=d.list[i].count;
                    }
                    if (d.list[i].sfzt=='005'){
                        a.name = '坏账';
                        a.value = d.list[i].count;
                        data2.push(a);
                        info2['hz']=d.list[i].count;
                    }
                }
                var option2 = {
                    color: ['#ED3F40', '#FE9201', '#4FAFFB', '#75C353','#f3bb6e','#1f2024'],
                  /*  title: {
                        text: '收费台账收费状态占比情况',
                        x: '15',
                        y:'15'
                    },*/
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    calculable: true,
                    series: [

                        {
                            name: '收费台账收费状态占比情况',
                            type: 'pie',
                            center: ['35%', '50%'],
                            radius: [chartW * 0.08, chartW * 0.15],
                            data: data2
                        }
                    ]};
                var myChart2 = echarts.init(jqueryMap.chart2.get(0));
                myChart2.setOption(option2);
                $('#firstChartDis_M  #chargePiePic2').remove();
                $(
                    ' <ul class="list-unstyled" id="chargePiePic2" style="margin-top: 45px;position: absolute;right: 0;top: 0;height: 100%;background: #f4f4f4;width: 200px;border-top: 1px solid #dedede;padding: 0 15px">' +
                    ' <li><span>账单总数&nbsp;&nbsp;&nbsp;</span><span class="fontSpan" style="color: #75C353;">' + info2['all'] + '</span></li>' +
                    ' <li><span>已收费&nbsp;&nbsp;&nbsp;</span><span class="fontSpan" style="color:#FE9201;">' + info2['ysf'] + '</span></li>' +
                    ' <li><span>未收费&nbsp;&nbsp;&nbsp;</span><span class="fontSpan" style="color:#ED3F40 ">' + info2['wsf'] + '</span></li>' +
                    ' <li><span>催费中&nbsp;&nbsp;&nbsp;</span><span class="fontSpan" style="color: #75C353">' + info2['cf'] + '</span></li>' +
                    '<li><span>欠费中&nbsp;&nbsp;&nbsp;</span><span class="fontSpan" style="color: #4FAFFB;">' + info2['qf'] + '</span></li>' +
                    '<li><span>已到款&nbsp;&nbsp;&nbsp;</span><span class="fontSpan" style="color: #f3bb6e;">' + info2['ydk'] + '</span></li>'+
                    '<li><span>坏账&nbsp;&nbsp;&nbsp;</span><span class="fontSpan" style="color: #1f2024;">' + info2['hz'] + '</span></li>'+
                    ' </ul>'
                ).appendTo($('#secondChartDis_M'));



            }
        });

    }


    //图表3的配置

    //    图表3的配置项
    $('#daterange-Mbtn3').daterangepicker({
            ranges: {
                '全部': [moment(), moment().subtract(-1, 'days')],
                '今日': [moment(), moment()],
                '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '近7天': [moment().subtract(6, 'days'),moment()],
                '近30天': [moment().subtract(29, 'days'),moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '本年':  [moment().startOf('year'), moment().endOf('year')]
            },
            startDate: moment(),
            endDate: moment()
        },
        function(start, end,label,type) {
            if(label=='全部'){
                $('#daterange-Mbtn3 span').html('全部');
            }else if(label=='今日'){
                $('#daterange-Mbtn3 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='昨日'){
                $('#daterange-Mbtn3 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
            }else if(label=='近7天'){
                $('#daterange-Mbtn3 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='近30天'){
                $('#daterange-Mbtn3 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本月'){
                $('#daterange-Mbtn3 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本年'){
                $('#daterange-Mbtn3 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }
        }).on('apply.daterangepicker', function(ev, picker) {
         console.info(moment(picker.endDate._d).format('YYYY-MM-DD'),moment(picker.startDate._d).format('YYYY-MM-DD'));
         chart3DaysSign3 = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
         console.info(ev,picker);
       if(picker.chosenLabel=="全部"){
           chart3DaysSign3="1/1"
        }
        chartFn3();
    });


    chartFn3();
    function chartFn3() {
        var data1 = null;
        var data2,data3,data4;
        $.ajax({
            url: '/statisticalanalysis/chargeInformation/chargeByStatisticsMonth/'+chart3DaysSign3,
            success: function(d) {
                console.info(d);
                data1 = d.list1;
                //x轴的上的数据
                var arrX1 = [];
                for(var i=0; i<d.list1.length;i++){
                    arrX1.push(d.list1[i].yssj);
                }
                //Y轴上的数据
                //1.已收费  2.未收费  3.催费,4.欠费  ,5已到账，6.坏账
                var arrY1 = [],arrY2 = [],arrY3 = [],arrY4 = [],arrY5=[],arrY6=[];

                for(var i=0; i<d.list1.length;i++){
                    arrY1.push(d.list1[i].sjsk);
                    arrY2.push(d.list2[i].sjsk);
                    arrY3.push(d.list3[i].sjsk);
                    arrY4.push(d.list4[i].sjsk);
                    arrY5.push(d.list5[i].sjsk);
                    arrY6.push(d.list6[i].sjsk);
                }
                /*console.log(arrY1,arrY2,arrY3,arrY4,arrY5);*/
                var option3 = {
                    color: ['#75C353','#5AB4FC','#FF9404','#F05F61','#E6679B','#1f2024'],
                    //图表标题
                    legend: {
                        top:55,
                        left:'30%',
                        data:['已收费','未收费','催费中','欠费中','已到款','坏账'],
                        right:'20%'
                    },
                    grid: {
                        top:'30%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                   /* title: {
                        text: "收费统计情况", //正标题
                        // link: "http://www.stepday.com", //正标题链接 点击可在新窗口中打开
                        x: "15", //标题水平方向位置
                        y:"55",
                        // subtext: "From:http://www.stepday.com", //副标题
                        // sublink: "http://www.stepday.com", //副标题链接
                        //正标题样式
                        textStyle: {
                            fontSize: 16
                        },

                        // //副标题样式
                        // subtextStyle: {
                        //     fontSize: 12,
                        //     color: "red"
                        // }
                    },*/

                    //数据提示框配置
                    tooltip: {
                        trigger: 'axis', //触发类型，默认数据触发，见下图，可选为：'item' | 'axis' 其实就是是否共享提示框
                    },

                    //图例配置
                    // legend: {
                    //     data: ['蒸发量', '降水量'], //这里需要与series内的每一组数据的name值保持一致
                    //     y: "bottom"
                    // },

                    //工具箱配置

                    toolbox: {
                        top:55,
                        right: 100,
                        show: true, //是否显示工具箱
                        // feature: {
                        //     mark: false, // 辅助线标志，上图icon左数1/2/3，分别是启用，删除上一条，删除全部
                        //     dataView: {
                        //         readOnly: false
                        //     }, // 数据视图，上图icon左数8，打开数据视图
                        //     magicType: ['line', 'bar'], // 图表类型切换，当前仅支持直角系下的折线图、柱状图转换，上图icon左数6/7，分别是切换折线图，切换柱形图
                        //     restore: true, // 还原，复位原始图表，上图icon左数9，还原
                        //     saveAsImage: true // 保存为图片，上图icon左数10，保存
                        // },
                        feature: {
                            dataView: {
                                readOnly: false
                            },
                            magicType: {
                                type: ['line', 'bar']
                            },
                            saveAsImage: {}
                        }

                    },
                    calculable: true,
                    //轴配置
                    xAxis: [{
                        type: 'category',
                        data: arrX1,
                        name: "时间"
                    }

                    ],

                    //Y轴配置
                    yAxis: [{
                        type: 'value',
                        // splitArea: {
                        //     show: true
                        // },
                        name: "金额/元"
                    }

                    ],

                    //图表Series数据序列配置

                    series: [{
                        markPoint: {
                            data: [{
                                type: 'max',
                                name: '最大值'
                            }, {
                                type: 'min',
                                name: '最小值'
                            }]
                        },
                        name: '已收费',
                        type: 'line',
                        data: arrY1
                    },
                        {
                            markPoint: {
                                data: [{
                                    type: 'max',
                                    name: '最大值'
                                }, {
                                    type: 'min',
                                    name: '最小值'
                                }]
                            },
                            name: '未收费',
                            type: 'line',
                            data: arrY2
                        },
                        {
                            markPoint: {
                                data: [{
                                    type: 'max',
                                    name: '最大值'
                                }, {
                                    type: 'min',
                                    name: '最小值'
                                }]
                            },
                            name: '催费中',
                            type: 'line',
                            data: arrY3
                        },
                        {
                            markPoint: {
                                data: [{
                                    type: 'max',
                                    name: '最大值'
                                }, {
                                    type: 'min',
                                    name: '最小值'
                                }]
                            },
                            name: '欠费中',
                            type: 'line',
                            data: arrY4
                        },
                        {
                            markPoint: {
                                data: [{
                                    type: 'max',
                                    name: '最大值'
                                }, {
                                    type: 'min',
                                    name: '最小值'
                                }]
                            },
                            name: '已到款',
                            type: 'line',
                            data: arrY5
                        },
                        {
                            markPoint: {
                                data: [{
                                    type: 'max',
                                    name: '最大值'
                                }, {
                                    type: 'min',
                                    name: '最小值'
                                }]
                            },
                            name: '坏账',
                            type: 'line',
                            data: arrY6
                        }


                    ]
                };


                //    发送  ajax请求数据

                var myChart3 = echarts.init(jqueryMap.chart3.get(0));
                myChart3.setOption(option3);
            }
        });

    }


    //图表4的函数

    $('#daterange-Mbtn4').daterangepicker({
            ranges: {
                '全部': [moment(), moment().subtract(-1, 'days')],
                '今日': [moment(), moment()],
                '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '近七天': [moment().subtract(6, 'days'),moment()],
                '近30天': [moment().subtract(29, 'days'),moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '本年':  [moment().startOf('year'), moment().endOf('year')]
            },
            startDate: moment(),
            endDate: moment()
        },
        function(start, end,label) {
            if(label=='全部'){
                $('#daterange-Mbtn4 span').html('全部');
            }else if(label=='今日'){
                $('#daterange-Mbtn4 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='昨日'){
                $('#daterange-Mbtn4 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
            }else if(label=='近七天'){
                $('#daterange-Mbtn4 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='近30天'){
                $('#daterange-Mbtn4 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本月'){
                $('#daterange-Mbtn4 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本年'){
                $('#daterange-Mbtn4 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }

        }).on('apply.daterangepicker', function(ev, picker) {
        /*console.info(picker.type());*/
        if(!picker.endDate){
            $('#daterange-Mbtn4 span').html(moment(picker.startDate._d).format('YYYY/MM/DD')+'-'+moment(picker.startDate._d).format('YYYY/MM/DD'));
            chart4DaysSign4 = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.startDate._d).format('YYYY-MM-DD');
        }else{
            chart4DaysSign4 = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
        }
        if(picker.chosenLabel=="全部"){
            chart4DaysSign4='1/1'
        }
        chartFn4();
    });


    chartFn4();



    function  chartFn4(){

        $.ajax({
            url:'/statisticalanalysis/chargeInformation/rankingByDepartmentByZdy/'+chart4DaysSign4,
            success:function(d){
                var data1 = [],data2 = [];

                for(var i = 0; i < d.list.length; i++){
                    data1.push(d.list[i].BMDM);
                    data2.push(d.list[i].MONEY);
                }

                var option4 = {
                    color: ['#75C353'],
                    toolbox: {
                        top:  15,
                        right: 15,
                        show: true, //是否显示工具箱
                        feature: {
                            dataView: {
                                readOnly: false
                            },
                            magicType: {
                                type: ['line', 'bar']
                            },
                            saveAsImage: {}
                        }

                    },
                 /*   title: {
                        text: "各部门收费已到账排名情况", //正标题
                        x: "left", //标题水平方向位置
                        y:'15',
                        textStyle: {
                            fontSize: 16
                        },

                    },*/
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top:'25%',
                        left: '5%',
                        right: '4%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : data1,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {   name:'金额/元',
                            type : 'value',
                        }
                    ],
                    series : [
                        {
                            name:'收费已到账金额',
                            type:'bar',
                            barWidth: '60%',
                            data:data2
                        }
                    ]
                }


                var myChart4 = echarts.init(jqueryMap.chart4.get(0));
                myChart4.setOption(option4);
            }
        });

    }

    //chartFn4();

    //图表5的函数
    $('#daterange-Mbtn5').daterangepicker({
            ranges: {
                '全部': [moment(), moment().subtract(-1, 'days')],
                '今日': [moment(), moment()],
                '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '近七天': [moment().subtract(6, 'days'),moment()],
                '近30天': [moment().subtract(29, 'days'),moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '本年':  [moment().startOf('year'), moment().endOf('year')]
            },
            startDate: moment(),
            endDate: moment()
        },
        function(start, end,label) {
            if(label=='全部'){
                $('#daterange-Mbtn5 span').html('全部');
            }else if(label=='今日'){
                $('#daterange-Mbtn5 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='昨日'){
                $('#daterange-Mbtn5 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
            }else if(label=='近七天'){
                $('#daterange-Mbtn5 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='近30天'){
                $('#daterange-Mbtn5 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本月'){
                $('#daterange-Mbtn5 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本年'){
                $('#daterange-Mbtn5 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }

        }).on('apply.daterangepicker', function(ev, picker) {
        if(!picker.endDate){
            $('#daterange-Mbtn5 span').html(moment(picker.startDate._d).format('YYYY/MM/DD')+'-'+moment(picker.startDate._d).format('YYYY/MM/DD'));
            chart5DaysSign5 = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.startDate._d).format('YYYY-MM-DD');
        }else{
            chart5DaysSign5 = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
        }
        if(picker.chosenLabel=="全部"){
            chart5DaysSign5='1/1'
        }
        chartFn5();
    });


    chartFn5();

    function chartFn5() {

        $.ajax({
            url: '/statisticalanalysis/chargeInformation/auditedByDepartmentByZdy/'+chart5DaysSign5,
            // async:false,
            success: function(d) {
                var data1 = null;
                data1 = d.list;
                //x轴的上的数据
                var arrX1 = [];
                //Y轴上的数据
                var arrY1 = [];
                for (var i = 0; i < data1.length; i++) {
                    arrX1.push(data1[i].BMDM);
                    arrY1.push(data1[i].MONEY);
                }


                var option5 = {
                    grid: {
                        top:'25%',
                        left: '5%',
                        right: '4%',
                        bottom: '10%',
                        containLabel: true
                    },
                    color: ['#75C353'],
                    //图表标题
               /*     title: {
                        text: "各部门待审收费", //正标题
                        // link: "http://www.stepday.com", //正标题链接 点击可在新窗口中打开
                        x: "15", //标题水平方向位置
                        y:'15',
                        // subtext: "From:http://www.stepday.com", //副标题
                        // sublink: "http://www.stepday.com", //副标题链接
                        //正标题样式
                        textStyle: {
                            fontSize: 16
                        },

                        // //副标题样式
                        // subtextStyle: {
                        //     fontSize: 12,
                        //     color: "red"
                        // }
                    },
*/
                    //数据提示框配置
                    tooltip: {
                        trigger: 'axis' //触发类型，默认数据触发，见下图，可选为：'item' | 'axis' 其实就是是否共享提示框
                    },

                    //图例配置
                    // legend: {
                    //     data: ['蒸发量', '降水量'], //这里需要与series内的每一组数据的name值保持一致
                    //     y: "bottom"
                    // },

                    //工具箱配置

                    toolbox: {
                        right: 15,
                        top:15,
                        show: true, //是否显示工具箱
                        // feature: {
                        //     mark: false, // 辅助线标志，上图icon左数1/2/3，分别是启用，删除上一条，删除全部
                        //     dataView: {
                        //         readOnly: false
                        //     }, // 数据视图，上图icon左数8，打开数据视图
                        //     magicType: ['line', 'bar'], // 图表类型切换，当前仅支持直角系下的折线图、柱状图转换，上图icon左数6/7，分别是切换折线图，切换柱形图
                        //     restore: true, // 还原，复位原始图表，上图icon左数9，还原
                        //     saveAsImage: true // 保存为图片，上图icon左数10，保存
                        // },
                        feature: {
                            dataView: {
                                readOnly: false
                            },
                            magicType: {
                                type: ['line', 'bar']
                            },
                            saveAsImage: {}
                        }

                    },
                    calculable: true,
                    //轴配置
                    xAxis: [{
                        type: 'category',
                        data: arrX1,
                    }

                    ],

                    //Y轴配置
                    yAxis: [{
                        type: 'value',
                        // splitArea: {
                        //     show: true
                        // },
                        name: "金额/元"
                    }

                    ],

                    //图表Series数据序列配置

                    series: [{
                        markPoint: {
                            data: [{
                                type: 'max',
                                name: '最大值'
                            }, {
                                type: 'min',
                                name: '最小值'
                            }]
                        },
                        name: '待审收费金额',
                        type: 'bar',
                        data: arrY1
                    }]
                };


                //    发送  ajax请求数据

                var myChart5 = echarts.init(jqueryMap.chart5.get(0));
                myChart5.setOption(option5);
            }
        });

    }
    //chartFn5();

    //图表6的函数

    $('#daterange-Mbtn6').daterangepicker({
            ranges: {
                '全部': [moment(), moment().subtract(-1, 'days')],
                '今日': [moment(), moment()],
                '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '近七天': [moment().subtract(6, 'days'),moment()],
                '近30天': [moment().subtract(29, 'days'),moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')],
                '本年':  [moment().startOf('year'), moment().endOf('year')]
            },
            startDate: moment(),
            endDate: moment()
        },
        function(start, end,label) {
            if(label=='全部'){
                $('#daterange-Mbtn6 span').html('全部');
            }else if(label=='今日'){
                $('#daterange-Mbtn6 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='昨日'){
                $('#daterange-Mbtn6 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
            }else if(label=='近七天'){
                $('#daterange-Mbtn6 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='近30天'){
                $('#daterange-Mbtn6 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本月'){
                $('#daterange-Mbtn6 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本年'){
                $('#daterange-Mbtn6 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }

        }).on('apply.daterangepicker', function(ev, picker) {

        if(!picker.endDate){
            $('#daterange-Mbtn6 span').html(moment(picker.startDate._d).format('YYYY/MM/DD')+'-'+moment(picker.startDate._d).format('YYYY/MM/DD'));
            chart6DaysSign6 = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.startDate._d).format('YYYY-MM-DD');
        }else{
            chart6DaysSign6 = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
        }
        if(picker.chosenLabel=="全部"){
            chart6DaysSign6='1/1'
        }
        chartFn6();
    });


    chartFn6();

    function chartFn6() {

        $.ajax({
            url: '/statisticalanalysis/chargeInformation/arrearsByDepartmentByZdy/'+chart6DaysSign6,
            // async:false,
            success: function(d) {
                var data1 = null;
                data1 = d.list;
                //x轴的上的数据
                var arrX1 = [];
                //Y轴上的数据
                var arrY1 = [];
                for (var i = 0; i < data1.length; i++) {
                    arrX1.push(data1[i].BMDM);
                    arrY1.push(data1[i].MONEY);
                }


                var option6 = {
                    grid: {
                        top:'25%',
                        left: '5%',
                        right: '4%',
                        bottom: '10%',
                        containLabel: true
                    },
                    color: ['#75C353'],
                    //图表标题
                  /*  title: {
                        text: "各部门欠费情况", //正标题
                        // link: "http://www.stepday.com", //正标题链接 点击可在新窗口中打开
                        x: "15", //标题水平方向位置
                        y:'15',
                        // subtext: "From:http://www.stepday.com", //副标题
                        // sublink: "http://www.stepday.com", //副标题链接
                        //正标题样式
                        textStyle: {
                            fontSize: 16
                        },

                        // //副标题样式
                        // subtextStyle: {
                        //     fontSize: 12,
                        //     color: "red"
                        // }
                    },
*/
                    //数据提示框配置
                    tooltip: {
                        trigger: 'axis' //触发类型，默认数据触发，见下图，可选为：'item' | 'axis' 其实就是是否共享提示框
                    },

                    //图例配置
                    // legend: {
                    //     data: ['蒸发量', '降水量'], //这里需要与series内的每一组数据的name值保持一致
                    //     y: "bottom"
                    // },

                    //工具箱配置

                    toolbox: {
                        right: 15,
                        top:15,
                        show: true, //是否显示工具箱
                        // feature: {
                        //     mark: false, // 辅助线标志，上图icon左数1/2/3，分别是启用，删除上一条，删除全部
                        //     dataView: {
                        //         readOnly: false
                        //     }, // 数据视图，上图icon左数8，打开数据视图
                        //     magicType: ['line', 'bar'], // 图表类型切换，当前仅支持直角系下的折线图、柱状图转换，上图icon左数6/7，分别是切换折线图，切换柱形图
                        //     restore: true, // 还原，复位原始图表，上图icon左数9，还原
                        //     saveAsImage: true // 保存为图片，上图icon左数10，保存
                        // },
                        feature: {
                            dataView: {
                                readOnly: false
                            },
                            magicType: {
                                type: ['line', 'bar']
                            },
                            saveAsImage: {}
                        }

                    },
                    calculable: true,
                    //轴配置
                    xAxis: [{
                        type: 'category',
                        data: arrX1,
                    }

                    ],

                    //Y轴配置
                    yAxis: [{
                        type: 'value',
                        // splitArea: {
                        //     show: true
                        // },
                        name: "金额/元"
                    }

                    ],

                    //图表Series数据序列配置

                    series: [{
                        markPoint: {
                            data: [{
                                type: 'max',
                                name: '最大值'
                            }, {
                                type: 'min',
                                name: '最小值'
                            }]
                        },
                        name: '欠费金额',
                        type: 'bar',
                        data: arrY1
                    }]
                };


                //    发送  ajax请求数据

                var myChart6 = echarts.init(jqueryMap.chart6.get(0));
                myChart6.setOption(option6);
            }
        });

    }
    //chartFn6();

    /**********************************指定每个图表的配置项和数据***********************************************************************************************/
    //当窗口改变的时候,需要重新计算容器的大小和图表的重汇
    $(window).resize(function() {
        winSize();
        chartFn1();
        chartFn2();
        chartFn3();
        chartFn4();
        chartFn5();
        chartFn6();

    });


    return {
        init: function() {
            $('#chargeMenu1').select2();
        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();