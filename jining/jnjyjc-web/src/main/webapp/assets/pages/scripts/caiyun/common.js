window.onload = function () {
    // 处理图表和和echarts的高度
    function initHeight() {
        var winHeight = $(window).height();
        var w = $(window).width() - 180;
        /* console.log(winHeight,$('.page-header-inner').height(),$(".info").outerHeight(true)); */
        if (winHeight > 850) {
            var totalH = winHeight - $('div.info').innerHeight() - 52 - 42;
            var singleH = Math.floor((totalH - 15) / 2) - 25;
            /* console.log(singleH); */
            $('#charge1').height(singleH-50);
            // $('#charge').width();
            $('#client1').height(singleH-50);
            $('#charge').height(singleH);
            // $('#charge').width();
            $('#client').height(singleH);
            // $('.remind').innerHeight(singleH);
            // $('#operatebtn').innerHeight(singleH);
        } else {
            $('#charge').height(262);
            // $('#charge1').width($('#charge').width()-20);
            $('#client').height(262);
            $('#charge1').height(262-50);
            // $('#charge1').width($('#charge').width()-20);
            $('#client1').height(262-50);
            // $('.remind').innerHeight(280);
            // $('#operatebtn').innerHeight(280);
        }
        $('#charge1').width(w * 0.49);
        $('#client1').width(w * 0.49);
    }

    $(window).resize(function () {
        initHeight();
        drawCharts();
        drawChart();
    });

    // 处理图表
    initHeight();
    drawCharts();
    // drawChart();
    // 基于准备好的dom，初始化echarts实例
    function drawCharts() {
        var myChart1 = echarts.init(document.getElementById('charge1'));
        var myChart2 = echarts.init(document.getElementById('client1'));
        myChart1.showLoading({
            text: "正在努力加载图表数据..."
        });
        // 指定图表的配置项和数据
        var option1 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            // grid:{
            //     x:15,
            //
            // },
            grid: {
                left: '5%',
                right: '12%',
                bottom: '9%',
                top: "20%",
                containLabel: true
            },
            xAxis: {
//				data : [ "孙月1", "李凯军", "代用名", "刘晓阳", "陈瑞", "王硕", '杨刚' ]
                name: "员工",
                axisLabel: { //横向字体斜体
                    interval: 0,
                    rotate: -40
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: "金额(元)",
                }
            ],
            series: [{
                name: '回款',
                type: 'bar',
//				data : [ 5, 20, 36, 10, 10, 20, 40 ],
                itemStyle: {
                    normal: {
                        color: '#4CB7FE'
                    }
                },

            }],

        };

        var names = [];
        var money = [];
        $.ajax({
            url: "/welcome/charge",
            dataType: 'JSON',
            type: 'GET',
//			data: {
//				cxnd:cxnd,
//				xz:cxxz
//			},
            success: function (result, textStatus) {
                var list = result.list;//获取菜单信息

                /*第一种写法*/
                for (var i = 0; i < list.length; i++) {
                    var map = list[i];
//		       	  	console.info(map);
                    names.push(map.LRRMC);

                    money.push(parseFloat(map.MONEY));
                }

                // 第二种写法：
                /*$.each(yjcds, function(index, item){
                 arr.push({value:item.money, name: item.lrrmc});
                 });*/
                option1.series[0].data = money;
                option1.xAxis.data = names;

                myChart1.hideLoading();
                myChart1.setOption(option1);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.info("检索数据异常：" + textStatus, "异常信息：" + errorThrown, "error");
                //$.messager.alert("检索数据异常：" + textStatus, "异常信息：" + errorThrown, "error");
            }
        });


        myChart2.showLoading({
            text: "正在努力加载图表数据..."
        });
        // var option2 = {
        //     tooltip: {
        //         trigger: 'axis',
        //     },
        //     legend: {
        //         data: ['新增客户', '停止服务客户']
        //     },
        //     xAxis: [{
        //         name: "年月"
        //     }],
        //     yAxis: [{
        //         type: 'value',
        //         name: "户数",
        //     }],
        //     series: [
        //         {
        //             name: '新增客户',
        //             type: 'line',
        //         },
        //         {
        //             name: '停止服务客户',
        //             type: 'line'
        //         }
        //     ]
        // };
        var option2 = {
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['新增客户', '停止服务客户'],
                top:"5%"
            },
            grid: {
                left: '5%',
                right: '12%',
                bottom: '9%',
                top: "22%",
                containLabel: true
            },
            // grid: {
            //     left: '6%',
            //     right: '6%',
            //     bottom: '3%',
            //     containLabel: true
            // },
            xAxis : [
                {
                    name:"年月",
                    type : 'category',
                    boundaryGap : false,
                    data : [1,2,3,4,5,6,7,8,9,10,11,12]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name: '户数',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series : [
                {
                    name:'新增客户',
                    type:'line',
                    stack: '总数',
                    itemStyle: {
                        normal: {
                            color: "#2ec7c9",
                            lineStyle: {
                                color: "#2ec7c9"
                            }
                        }
                    },
                    areaStyle: {normal: {
                        color:"#4ffab8"
                    }},
                    data:[1,2,3,4,5,6,7,8,9,10,11,12]
                },
                {
                    name:'停止服务客户',
                    type:'line',
                    stack: '总数',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#2ec7c9",
                            lineStyle: {
                                color: "#2ec7c9"
                            }
                        }
                    },
                    areaStyle: {normal: {
                        color:"#4fd0fa"
                    }},
                    data:[1,2,3,4,5,6,7,8,9,10,11,12]
                }
            ]
        };

        var date = [];
        var num = [];
        var date1 = [];
        var num1 = [];
        $.ajax({
            url: "/welcome/customer",
            dataType: 'JSON',
            type: 'GET',
            success: function (result, textStatus) {
                $('#khlcrs').html(result.lcnum);
                var list = result.list;//获取菜单信息
                var list1 = result.list1;
                /*第一种写法*/
                for (var i = 0; i < list.length; i++) {
                    var map = list[i];
                    //alert(yjcd.HJ);
                    //var value=yjcd.VALUE;
                    date.push(map.MONTH);
                    num.push(parseFloat(map.NUM));
                }
                for (var i = 0; i < list1.length; i++) {
                    var map = list1[i];
                    //alert(yjcd.HJ);
                    //var value=yjcd.VALUE;
                    date1.push(map.MONTH);
                    num1.push(map.count);
                    /*num.push(parseFloat(map.count));*/
                }
                // 第二种写法：
                /*$.each(yjcds, function(index, item){
                 arr.push({value:item.money, name: item.lrrmc});
                 });*/
                option2.series[0].data = num;
                option2.xAxis[0].data = date;
                option2.series[1].data = num1;
                myChart2.hideLoading();
                myChart2.setOption(option2);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.info("检索数据异常：" + textStatus, "异常信息：" + errorThrown, "error");
                //$.messager.alert("检索数据异常：" + textStatus, "异常信息：" + errorThrown, "error");
            }
        });

        // 使用刚指定的配置项和数据显示图表。
//		myChart1.setOption(option1);
        //myChart2.setOption(option2);

    }

    function drawChart() {
        var myChart3 = echarts.init(document.getElementById('chartWrap_lmf'));
        myChart3.showLoading({
            text: ""
        });
        // 指定图表的配置项和数据
        var option3 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['A', 'B', 'C', 'D'],
                    name: '级别',
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            grid: { // 控制图的大小，调整下面这些值就可以，,
                left: 50,
                x2: 50
            },
            yAxis: {
                name: "数量(户)"
            },
            series: [{
                name: '人数',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#4CB7FE'
                    }
                },
            }],
        };

        var rank = [];
        var num = [0, 0, 0, 0];
        $.ajax({
            url: "/welcome/customerGrade",
            dataType: 'JSON',
            type: 'GET',
            success: function (result, textStatus) {
                var list = result.list;//获取菜单信息
                /* 第一种写法*/
                for (var i = 0; i < list.length; i++) {
                    var map = list[i];
                    if (map.KHDJ_MC == null || map.KHDJ_MC == "") {
                        continue;
                    } else if (map.KHDJ_MC == 'A') {
                        num[0] = map.KHDJ_SL;
                    } else if (map.KHDJ_MC == 'B') {
                        num[1] = map.KHDJ_SL;
                    } else if (map.KHDJ_MC == 'C') {
                        num[2] = map.KHDJ_SL;
                    } else if (map.KHDJ_MC == 'D') {
                        num[3] = map.KHDJ_SL;
                    }
                }
                option3.series[0].data = num;
                //option3.xAxis.data = rank;

                myChart3.hideLoading();
                myChart3.setOption(option3);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //$.messager.alert("检索数据异常：" + textStatus, "异常信息：" + errorThrown, "error");
            }
        });
    }


//	function creBar(myChart,option){}

};
