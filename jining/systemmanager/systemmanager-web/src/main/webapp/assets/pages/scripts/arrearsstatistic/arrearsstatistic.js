/**
 * Created by Administrator on 2017/11/23 0023.
 */
var arrearsstatisticFun = function() {
    'use strict';

    // 全局属性参数
    var configMap = {
        time:"0",
        time1:"0"
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
    var chartW;
    var setJqueryMap = function() {
        jqueryMap.allContainer = $('#totalContainer');
        jqueryMap.chart1 = $('#chargePicCon1', jqueryMap.allContainer);
        jqueryMap.chart2 = $('#chargePicCon2', jqueryMap.allContainer);
        jqueryMap.chart3 = $('#chargePicCon3', jqueryMap.allContainer);
        jqueryMap.chart4 = $('#chargePicCon4', jqueryMap.allContainer);
        jqueryMap.chart5 = $('#pieCon1', jqueryMap.allContainer);
        jqueryMap.chart6 = $('#pieCon2', jqueryMap.allContainer);

    };
    setJqueryMap();
    /**********************************设置图表容器的大小***********************************/
    //窗口大小
    function winSize() {
        var winW = $(window).width();
        chartW = (winW - 290) / 2;
        //按照1.8的比例计算的高度
        var chartH = chartW / 1.8;
        $('.chartAraea .totalContainer', jqueryMap.allContainer).css({
            height: chartH,
            width: chartW
        });
    }

    winSize();
    /**********************************设置图表容器的大小***********************************/

    /**********************************图表和列表的切换***********************************/
    $('#switchbtnContainer .pull-right', jqueryMap.allContainer).click(function() {
        $('#chargeArea1,#chargeArea2').hide();

        if ($(this).attr('data-sign') == '1') {
            $('#chargeArea1').show();
            $(this).children('img').attr('src', configMap.path + '/assets/pages/img/chart-checked.png')
                .end()
                .css('background', '#f4f4f4');
            $(this).siblings('div').children('img').attr('src', configMap.path + '/assets/pages/img/list-unchecked.png')
                .end()
                .css('background', '#fff');
        } else {
            $('#chargeArea2').show()
                               .empty()
                .load('/statisticalanalysis/arrears/arrears.jsp');

            $(this).children('img').attr('src', configMap.path + '/assets/pages/img/list-checked.png')
                .end()
                .css('background', '#f4f4f4');
            $(this).siblings('div').children('img').attr('src', configMap.path + '/assets/pages/img/chart-unchecked.png')
                .end()
                .css('background', '#fff');
        }
    });
    /**********************************图表和列表的切换***********************************/
    var  date = new Date();
    var jintian = date.getTime();
    $('#daterange-Mdbtn1 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
    $('#daterange-Mdbtn2 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
    $('#daterange-Mdbtn3 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
    $('#daterange-Mdbtn4 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
    $('#daterange-Mdbtn5 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
    $('#daterange-Mdbtn6 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
    var chart1DaysSign =moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD'),
        chart3DaysSign3=moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD'),
        chart2DaysSign2=moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD'),
        chart4DaysSign4=moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD'),
        chart5DaysSign5=moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD'),
        chart6DaysSign6=moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD');
    $('#daterange-Mdbtn1').daterangepicker({
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
                $('#daterange-Mdbtn1 span').html('全部');
            }else if(label=='今日'){
                $('#daterange-Mdbtn1 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='昨日'){
                $('#daterange-Mdbtn1 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
            }else if(label=='近七天'){
                $('#daterange-Mdbtn1 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='近30天'){
                $('#daterange-Mdbtn1 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本月'){
                $('#daterange-Mdbtn1 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本年'){
                $('#daterange-Mdbtn1 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }

        }).on('apply.daterangepicker', function(ev, picker) {
        if(!picker.endDate){
            $('#daterange-Mdbtn1 span').html(moment(picker.startDate._d).format('YYYY/MM/DD')+'-'+moment(picker.startDate._d).format('YYYY/MM/DD'));
            chart1DaysSign = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.startDate._d).format('YYYY-MM-DD');
        }else{
            chart1DaysSign = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
        }
        if(picker.chosenLabel=="全部"){
            chart1DaysSign='1/1'
        }
        chartFn1();
    });

    chartFn1();
    /**********************************指定每个图表的配置项和数据***********************************/
    //    图表1的配置项
    function chartFn1() {
        var data1 = null;
        $.ajax({
            url: '/systemmanager/arrearsStatistic/arrearsStatisticByDepartmentsMemberByZdy/'+chart1DaysSign,
            // async:false,
            success: function(d) {
                console.log(d.arrearsStatisticByDepartmentsMember);
                data1 = d.arrearsStatisticByDepartmentsMember;
                //x轴的上的数据
                var arrX1 = [];
                //Y轴上的数据
                var arrY1 = [];
                for (var i = 0; i < data1.length; i++) {
                    arrX1.push(data1[i].BMDM);
                    arrY1.push(data1[i].count);
                }


                var option1 = {
                    color: ['#75C353'],
                    //图表标题
                    // title: {
                    //     text: "今日各部门欠费台账数量统计情况", //正标题
                    //     // link: "http://www.stepday.com", //正标题链接 点击可在新窗口中打开
                    //     x: "left", //标题水平方向位置
                    //     // subtext: "From:http://www.stepday.com", //副标题
                    //     // sublink: "http://www.stepday.com", //副标题链接
                    //     //正标题样式
                    //     textStyle: {
                    //         fontSize: 16
                    //     },
                    //
                    //     // //副标题样式
                    //     // subtextStyle: {
                    //     //     fontSize: 12,
                    //     //     color: "red"
                    //     // }
                    // },

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
                        name: "部门"
                    }

                    ],

                    //Y轴配置
                    yAxis: [{
                        type: 'value',
                        // splitArea: {
                        //     show: true
                        // },
                        name: "客户数量"
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
                        name: '欠费台账数量',
                        type: 'line',
                        data: arrY1
                    }]
                };


                //    发送  ajax请求数据

                var myChart1 = echarts.init(jqueryMap.chart1.get(0));
                myChart1.setOption(option1);
            }
        });

    }


    //    图表2的配置项
    $('#daterange-Mdbtn2').daterangepicker({
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
                $('#daterange-Mdbtn2 span').html('全部');
            }else if(label=='今日'){
                $('#daterange-Mdbtn2 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='昨日'){
                $('#daterange-Mdbtn2 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
            }else if(label=='近七天'){
                $('#daterange-Mdbtn2 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='近30天'){
                $('#daterange-Mdbtn2 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本月'){
                $('#daterange-Mdbtn2 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本年'){
                $('#daterange-Mdbtn2 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }

        }).on('apply.daterangepicker', function(ev, picker) {
        if(!picker.endDate){
            $('#daterange-Mdbtn2 span').html(moment(picker.startDate._d).format('YYYY/MM/DD')+'-'+moment(picker.startDate._d).format('YYYY/MM/DD'));
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
        var data2 = null;
        $.ajax({
            url: '/systemmanager/arrearsStatistic/arrearsStatisticByDepartmentsMoneyByZdy/'+chart2DaysSign2,
            success: function(d) {
                data2 = d.arrearsStatisticByDepartmentsMember;
                //x轴的上的数据
                var arrX2 = [];
                //Y轴上的数据
                var arrY2 = [];
                for (var i = 0; i < data2.length; i++) {
                    arrX2.push(data2[i].BMDM);
                    arrY2.push(data2[i].count);
                }

                var option2 = {
                    //图表标题
                    color: ['#75C353'],
                    // title: {
                    //     text: "今日各部门欠费金额统计情况", //正标题
                    //     x: "left", //标题水平方向位置
                    //     //正标题样式
                    //     textStyle: {
                    //         fontSize: 16
                    //     },
                    // },
                    //数据提示框配置
                    tooltip: {
                        trigger: 'axis' //触发类型，默认数据触发，见下图，可选为：'item' | 'axis' 其实就是是否共享提示框
                    },
                    //工具箱配置
                    toolbox: {
                        right: 100,
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
                    calculable: true,
                    //轴配置
                    xAxis: [{
                        type: 'category',
                        data: arrX2,
                        name: "部门"
                    }

                    ],

                    //Y轴配置
                    yAxis: [{
                        type: 'value',
                        name: "欠费金额"
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
                        "name": '欠费金额',
                        "type": 'line',
                        "data": arrY2
                    }

                    ],

                };
                var myChart2 = echarts.init(jqueryMap.chart2.get(0));
                myChart2.setOption(option2);
            }
        });

    }

    //    图表3的配置项
    $('#daterange-Mdbtn3').daterangepicker({
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
            if(label=='今日'){
                $('#daterange-Mdbtn3 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));

            }else if(label=='昨日'){
                $('#daterange-Mdbtn3 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
            }else if(label=='近7天'){
                $('#daterange-Mdbtn3 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='近30天'){
                $('#daterange-Mdbtn3 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本月'){
                $('#daterange-Mdbtn3 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本年'){
                $('#daterange-Mdbtn3 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }
        }).on('apply.daterangepicker', function(ev, picker) {
        console.info(moment(picker.endDate._d).format('YYYY-MM-DD'),moment(picker.startDate._d).format('YYYY-MM-DD'));
         chart3DaysSign3 = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
         console.info(ev,picker);
        if(picker.chosenLabel=="全部"){
            chart3DaysSign3='1/1'
        }
        chartFn3();
    });


    chartFn3();

    function chartFn3() {
        var data3 = null;
        $.ajax({
            url: '/systemmanager/arrearsStatistic/arrearsStatisticMoneyByTimeNew/'+chart3DaysSign3,
            success: function(d) {
                console.info(d);
                data3 = d.list;
                //x轴的上的数据
                var arrX3 = [];
                //Y轴上的数据
                var arrY3 = [];
                for (var i = 0; i < data3.length; i++) {
                    arrX3.push(data3[i].yssj);
                    arrY3.push(data3[i].sjsk);
                }



                var option3 = {
                    color: ['#75C353'],
                    //设置标题
                   /* title: {
                        text: '近7天欠费金额统计',
                    },*/
                    //设置提示
                    tooltip: {
                        trigger: 'axis' //触发类型，默认数据触发，见下图，可选为：'item' | 'axis' 其实就是是否共享提示框
                    },
                    toolbox: {
                        right: 100,
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
                    //设置图例
                    // legend: {
                    //     // data:['销量']
                    // },
                    //设置坐标轴
                    xAxis: [{
                        type: 'category',
                        data: arrX3,
                        name: '日期'
                    }],
                    yAxis: [{
                        name: '金额/元',
                        type: 'value'
                    }],
                    //设置数据
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
                        "name": "欠费金额",
                        "type": "bar",
                        "data": arrY3,
                    }]
                };
                var myChart3 = echarts.init(jqueryMap.chart3.get(0));
                myChart3.setOption(option3);
            }
        });

    }


    //    图表4的配置项

    $('#daterange-Mdbtn4').daterangepicker({
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
            if(label=='今日'){
                $('#daterange-Mdbtn4 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));

            }else if(label=='昨日'){
                $('#daterange-Mdbtn4 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
            }else if(label=='近7天'){
                $('#daterange-Mdbtn4 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='近30天'){
                $('#daterange-Mdbtn4 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本月'){
                $('#daterange-Mdbtn4 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本年'){
                $('#daterange-Mdbtn4 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }
        }).on('apply.daterangepicker', function(ev, picker) {
         console.info(moment(picker.endDate._d).format('YYYY-MM-DD'),moment(picker.startDate._d).format('YYYY-MM-DD'));
         chart3DaysSign3 = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
         console.info(ev,picker);
        if(picker.chosenLabel=="全部"){
            chart3DaysSign3='1/1'
        }
        chartFn4();
    });

    chartFn4();
    function chartFn4() {
        var data4 = null;
        $.ajax({
            url: '/systemmanager/arrearsStatistic/arrearsStatisticMumberByTimeNew/'+chart3DaysSign3,
            async: false,
            success: function(d) {
                data4 = d.list;
                //x轴的上的数据
                var arrX4 = [];
                //Y轴上的数据
                var arrY4 = [];
                for (var i = 0; i < data4.length; i++) {
                    arrX4.push(data4[i].time);
                    arrY4.push(data4[i].KHBM);
                }



                var option4 = {
                    toolbox: {
                        right: 100,
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
                    color: ['#75C353'],
                    //设置标题
                    // title: {
                    //     text: '近7天欠费台账统计',
                    // },
                    // //设置提示
                    tooltip: {
                        trigger: 'axis' //触发类型，默认数据触发，见下图，可选为：'item' | 'axis' 其实就是是否共享提示框
                    },
                    //设置图例
                    legend: {
                        // data:['销量']
                    },
                    //设置坐标轴
                    xAxis: [{
                        type: 'category',
                        data: arrX4,
                        name: '日期'
                    }],
                    yAxis: [{
                        name: '客户数量',
                        type: 'value'
                    }],
                    //设置数据
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
                        "name": "欠费台账数量",
                        "type": "bar",
                        "data": arrY4,
                    }]
                };
                var myChart4 = echarts.init(jqueryMap.chart4.get(0));
                myChart4.setOption(option4);
            }
        });

    }

    //    图表5的配置项
    $('#daterange-Mdbtn5').daterangepicker({
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
        function(start, end,label) {
            if(label=='全部'){
                $('#daterange-Mdbtn5 span').html('全部');
            }else if(label=='今日'){
                $('#daterange-Mdbtn5 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='昨日'){
                $('#daterange-Mdbtn5 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
            }else if(label=='近7天'){
                $('#daterange-Mdbtn5 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='近30天'){
                $('#daterange-Mdbtn5 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本月'){
                $('#daterange-Mdbtn5 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本年'){
                $('#daterange-Mdbtn5 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }

        }).on('apply.daterangepicker', function(ev, picker) {
        if(!picker.endDate){
            $('#daterange-Mdbtn5 span').html(moment(picker.startDate._d).format('YYYY/MM/DD')+'-'+moment(picker.startDate._d).format('YYYY/MM/DD'));
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
        var data5 = null;
        var dataByProject = [];
        $.ajax({
            url: '/systemmanager/arrearsStatistic/arrearsStatisticByProjectByZdy/'+chart5DaysSign5,
            success: function(d) {
                if (d.list.length < 1) {
                    dataByProject.push({
                        "value": 0,
                        "key": "0"
                    });
                }
                console.info(d);
                for (var i = 0; i < d.list.length; i++) {
                    var a = {};
                    a.value = d.list[i].COUNT;
                    a.name = d.list[i].name;
                    dataByProject.push(a);

                }

                console.log(dataByProject);

                var option5 = {
                    color: ['#ED3F40', '#FF9201', '#4FAFFC', '#74C252'],
                    // title: {
                    //     text: '今日欠费台账收费项目占比情况',
                    //     // subtext: '纯属虚构',
                    //     x: 'left'
                    // },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    calculable: true,
                    series: [

                        {
                            name: '欠费台账收费项目数量',
                            type: 'pie',
                            center: ['50%', '50%'],
                            radius: [chartW * 0.08, chartW * 0.15],
                            data: dataByProject,
                        }
                    ]
                };;
                var myChart5 = echarts.init(jqueryMap.chart5.get(0));
                myChart5.setOption(option5);

            }

        });



    }


    //    图表6的配置项
    $('#daterange-Mdbtn6').daterangepicker({
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
                $('#daterange-Mdbtn6 span').html('全部');
            }else if(label=='今日'){
                $('#daterange-Mdbtn6 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='昨日'){
                $('#daterange-Mdbtn6 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
            }else if(label=='近七天'){
                $('#daterange-Mdbtn6 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='近30天'){
                $('#daterange-Mdbtn6 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本月'){
                $('#daterange-Mdbtn6 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }else if(label=='本年'){
                $('#daterange-Mdbtn6 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
            }

        }).on('apply.daterangepicker', function(ev, picker) {
        if(!picker.endDate){
            $('#daterange-Mdbtn6 span').html(moment(picker.startDate._d).format('YYYY/MM/DD')+'-'+moment(picker.startDate._d).format('YYYY/MM/DD'));
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
        var data6 = [];
        var info6 = [];
        $.ajax({
            url: '/systemmanager/arrearsStatistic/arrearsStatisticByTypeByZdy/'+chart6DaysSign6,
            success: function(d) {
                info6['total'] = d.all;
                for (var i = 0; i < d.list.length; i++) {
                    var a = {};
                    a.value = d.list[i].count;
                    a.name = d.list[i].SFFS_MC;
                    data6.push(a);

                }

                info6['year'] = data6[3].value;
                info6['month'] = data6[4].value;
                info6['season'] = data6[2].value;
                info6['halfyear'] = data6[1].value;
                info6['other'] = data6[0].value;

                var option6 = {
                    color: ['#ED3F40', '#FF9201', '#4FAFFC', '#FD5BE4', '#75C353'],
                    // title: {
                    //     text: '今日欠费台账收费方式占比情况',
                    //     // subtext: '纯属虚构',
                    //     x: 'left'
                    // },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    calculable: true,
                    series: [

                        {
                            name: '欠费台账收费方式数量',
                            type: 'pie',
                            center: ['35%', '50%'],
                            radius: [chartW * 0.08, chartW * 0.15],
                            data: data6
                        }
                    ]
                };;
                var myChart6 = echarts.init(jqueryMap.chart6.get(0));
                myChart6.setOption(option6);
                /*$('#pieCon2', '#totalContainer').append(
                    ' <ul class="list-unstyled" id="piePic2">' +
                    ' <li><span>欠费台账总数</span><span class="fontSpan" style="color: #75C353;">' + info6["total"] + '</span></li>' +
                    ' <li><span>按年</span><span class="fontSpan" style="color:#FD5BE4;">' + info6["year"] + '</span></li>' +
                    ' <li><span>按半年</span><span class="fontSpan" style="color:#FF9201 ">' + info6["halfyear"] + '</span></li>' +
                    ' <li><span>按季</span><span class="fontSpan" style="color: #4FAFFC;">' + info6["season"] + '</span></li>' +
                    '<li><span>按月</span><span class="fontSpan" style="color: #75C353;">' + info6["month"] + '</span></li>' +
                    '<li><span>其他</span><span class="fontSpan" style="color: #ED3F40;">' + info6["other"] + '</span></li>' +
                    ' </ul>'
                );*/
                $('#hasInfoCon_M  #piePic2').remove();
                $(
                    ' <ul class="list-unstyled" id="piePic2" style="margin-top: 45px;position: absolute;right: 0;top: 0;height: 100%;background: #f4f4f4;width: 200px;border-top: 1px solid #dedede;padding: 0 15px">' +
                    ' <li><span>欠费台账总数</span><span class="fontSpan" style="color: #75C353;">' + info6["total"] + '</span></li>' +
                    ' <li><span>按年</span><span class="fontSpan" style="color:#FD5BE4;">' + info6["year"] + '</span></li>' +
                    ' <li><span>按半年</span><span class="fontSpan" style="color:#FF9201 ">' + info6["halfyear"] + '</span></li>' +
                    ' <li><span>按季</span><span class="fontSpan" style="color: #4FAFFC;">' + info6["season"] + '</span></li>' +
                    '<li><span>按月</span><span class="fontSpan" style="color: #75C353;">' + info6["month"] + '</span></li>' +
                    '<li><span>其他</span><span class="fontSpan" style="color: #ED3F40;">' + info6["other"] + '</span></li>' +
                    ' </ul>'
                ).appendTo($('#hasInfoCon_M'));


            }
        });
        console.log(data6);


    }

    // chartFn1();
    // chartFn2();
    // chartFn3();
    // chartFn4();
    // chartFn5();
    // chartFn6();
    /**********************************指定每个图表的配置项和数据***********************************/

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

        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();