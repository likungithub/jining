window.onload = function () {
    var bussinessData;
    var bussinessData_date;
    var bussinessData_money;

    $(".weekAndMonth li").on("click",function () {
        $(".weekAndMonth li").removeClass("topCli");
        $(this).addClass("topCli");
        if($(this).attr("data") == "0"){
            weekAndMonth(1)

        }else {
            weekAndMonth(2);
        }
    })

    function weekAndMonth(type) {
        $.ajax({
            url: '/welcome/getSumData?type='+type,
            type: 'get',
            success: function (data) {
                bussinessData = data.bussinessData;
                bussinessData_date = [];
                bussinessData_money = [];
                $(bussinessData).each(function () {
                    bussinessData_date.push($(this)[0].rq);
                    bussinessData_money.push($(this)[0].money);
                })
                $(".ljjyl").html("累计交易量："+ data.sumData.sjsk+"元");
                accumulativeTransaction(bussinessData_date,bussinessData_money);
            }
        })
    }

    $.ajax({
        url: '/welcome/getScreenData',
        type: 'get',
        success: function (data) {
            console.log(data);
            //累计交易量
            var bussinessData = data.bussinessData;
            var bussinessData_date = [];
            var bussinessData_money = [];
            $(bussinessData).each(function () {
                bussinessData_date.push($(this)[0].rq);
                bussinessData_money.push($(this)[0].money);
            })
            $(".ljjyl").html("累计交易量："+ data.sumData.sjsk+"元");
            //会计评价
            var kjpjData = data.kjpjData;
            var kjpjData_num = [data.kjpjData[0].zysp,data.kjpjData[0].twnl,data.kjpjData[0].zcd,data.kjpjData[0].yggl];

            //企业规模
            var qygmData = data.qygmData;
            var qygmData_num = [data.qygmData[0],data.qygmData[1],data.qygmData[2]];

            //代理客户分布
            var CustomerData1 = data.CustomerData1;
            var CustomerData2 = data.CustomerData2;
            $(".dataTop_center a").on("click",function () {
                $(".dataTop_center a").removeClass("topCli");
                $(this).addClass("topCli");
                if($(this).text() == "代理分布"){
                    $("dataTop_center div").removeAttr("_echarts_instance_");
                    CustomerData1 = data.CustomerData1;
                    CustomerData2 = data.CustomerData2;
                    chinaMap(CustomerData1,CustomerData2);
                }else{
                    $("dataTop_center div").removeAttr("_echarts_instance_");
                    CustomerData1 = data.khData1;
                    CustomerData2 = data.khData2;
                    chinaMap(CustomerData1,CustomerData2);
                }
            });

            var allDlNum = JSON.stringify(data.allDlNum.VALUE);
            var allKhNum =  JSON.stringify(data.allKhNum.VALUE);
            var dlNum = "";
            var khNum = "";
            var Num0 = '';
            var Num1 = '';
            if(allDlNum.length !== 7){
                var n = 7 - allDlNum.length;
                for(var i = 0;i < n;i++){
                    Num0 += "<span>0</span>";
                };
                $(".dlNum").append(Num0);
            }
            if(allKhNum.length !== 7){
                var n = 7 - allKhNum    .length;
                for(var i = 0;i < n;i++){
                    Num1 += "<span>0</span>";
                };
                $(".khNum").append(Num1);
            }
            for(var i = 0;i<allDlNum.length;i++){
                dlNum += '<span>'+allDlNum[i]+'</span>';
            }
            for(var i = 0;i<allKhNum.length;i++){
                khNum += '<span>'+allKhNum[i]+'</span>';
            }
            dlNum += '<div class="clear"></div>'
            $(".dlNum").append(dlNum);
            $(".khNum").append(khNum);


            //app启动
            var phonedlData1 = data.phoneDLData;
            var phonekhData1 = data.phoneKHData;
            var phoneDate = [];
            var phoneDLData = [];
            // var phoneLogin = [];
            var phoneKHData = [];
            $(phonedlData1).each(function () {
                phoneDate.push($(this)[0].rq);
                phoneDLData.push($(this)[0].nums);
            });
            $(phonekhData1).each(function () {
                phoneKHData.push($(this)[0].nums);
            })


            //访问量
            var PCCZData1 = data.PCCZData;
            var PCDLData1 = data.PCDLData;
            var pcDate = [];
            var PCCZData = [];
            var PCDLData = [];
            $(PCCZData1).each(function () {
                pcDate.push($(this)[0].rq);
                PCCZData.push($(this)[0].nums);
            });
            $(PCDLData1).each(function () {
                PCDLData.push($(this)[0].nums);
            });


            //客户分布
            var provinceData1 = data.provinceData;
            var cityData1 = data.cityData;

            var provinceAndCity = [];
            var allData = [];
            $(provinceData1).each(function () {
                provinceAndCity.push($(this)[0].name);
                allData.push($(this)[0].value);
            });
            $(".cityData a").on("click",function () {
                $(".cityData a").removeClass("topCli");
                $(this).addClass("topCli");
                if($(this).text() == "省份"){
                    $(".cityData div").removeAttr("_echarts_instance_");
                    provinceAndCity = [];
                    allData = [];
                    $(provinceData1).each(function () {

                        provinceAndCity.push($(this)[0].name);
                        allData.push($(this)[0].value);
                    })

                    cityData(provinceAndCity,allData);
                }else{
                    $(".cityData div").removeAttr("_echarts_instance_");
                    provinceAndCity = [];
                    allData = [];
                    $(cityData1).each(function () {
                        provinceAndCity.push($(this)[0].name);
                        allData.push($(this)[0].value);
                    })
                    cityData(provinceAndCity,allData);
                }
            })

            //新增
            var customerAddData1 = data.customerAddData;
            var khAddData1 = data.khAddData;

            var customerAddData = [];
            var khAddData = [];
            var addDate = [];
            $(customerAddData1).each(function () {
                customerAddData.push($(this)[0].nums);
                addDate.push($(this)[0].rq);
            });
            $(khAddData1).each(function () {
                khAddData.push($(this)[0].nums);
                // addDate.push($(this)[0].rq);
            });

            //登录TOP10
            var customerDLData1 = data.customerDLData;
            var customerDLDataNum = [];
            var customerDLDataName = [];

            $(customerDLData1).each(function () {
                customerDLDataNum.push($(this)[0].count);
                customerDLDataName.push($(this)[0].gsmc);
            })





            $(window).resize(function(){
                initWidth();
                $("div").removeAttr("_echarts_instance_");
                chinaMap(CustomerData1,CustomerData2);
                accumulativeTransaction(bussinessData_date,bussinessData_money);
                accountingEvaluation(kjpjData_num);
                EnterpriseScale(qygmData_num);
                appLogin(phoneDLData,phoneKHData,phoneDate);
                browseAndVisitor(PCCZData,PCDLData,pcDate);
                cityData(provinceAndCity,allData);
                add_customer_data(customerAddData,khAddData,addDate);
                loginTop10(customerDLDataNum,customerDLDataName);
            })


            initWidth();
            chinaMap(CustomerData1,CustomerData2);
            accumulativeTransaction(bussinessData_date,bussinessData_money);
            accountingEvaluation(kjpjData_num);
            EnterpriseScale(qygmData_num);
            appLogin(phoneDLData,phoneKHData,phoneDate);
            browseAndVisitor(PCCZData,PCDLData,pcDate);
            cityData(provinceAndCity,allData);
            add_customer_data(customerAddData,khAddData,addDate);
            loginTop10(customerDLDataNum,customerDLDataName);
        }
    });
    $(".clickF11").on("click",function () {
        var F11Dom = $("#dataVisa");
        if($(this).attr("data") == "false"){
            fullscreen();
            $(this).attr("data","true")
        }else{
            exitFullscreen();
            $(this).attr("data","false")
        }
    })
    // 全屏
    function fullscreen() {
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    }

// 退出全屏
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    function initWidth(){
        var w = $(window).width();
        var h = $(window).height();
        $("#dataVisa").height(h - h * 0.03);
        $(".accumulativeTransaction").width(w * 0.263);
        $(".accumulativeTransaction_main").width(w * 0.263);
        $(".accumulativeTransaction").height((h - h * 0.03)/3.5);
        $(".accumulativeTransaction_main").height((h - h * 0.04)/3.5);
        $(".accountingEvaluation").width(w * 0.14);
        $(".accountingEvaluation_main").width(w * 0.14);
        $(".accountingEvaluation").height((h - h * 0.04)/3.5);
        $(".accountingEvaluation_main").height((h - h * 0.04)/3.5);
        $(".accountingEvaluationAndEnterpriseScale").height((h - h * 0.04)/3.5)
        $(".EnterpriseScale").width(w * 0.123);
        $(".EnterpriseScale_main").width(w * 0.123);
        $(".EnterpriseScale").height((h - h * 0.04)/3.5);
        $(".EnterpriseScale_main").height((h - h * 0.04)/3.5);
        $(".dataTop_center").width(w * 0.426);
        $(".main").width(w * 0.426);
        $(".dataTop_center").height(h /1.75 - h * 0.002);
        $(".main").height(h /1.75 - h * 0.002);
        $(".appStartUp").width(w * 0.266);
        $(".appStartUp_main").width(w * 0.266);
        $(".browseAndVisitor").width(w * 0.266);
        $(".browseAndVisitor_main").width(w * 0.266);
        $(".appStartUp").height((h - h * 0.04)/3.5);
        $(".appStartUp_main").height((h - h * 0.04)/3.5);
        $(".browseAndVisitor").height((h - h * 0.036)/3.45);
        $(".browseAndVisitor_main").height((h - h * 0.036)/3.45);
        $(".cityData").width(w * 0.265);
        $(".cityData_main").width(w * 0.265);
        $(".add_customer_data").width(w * 0.425);
        $(".add_customer_data_main").width(w * 0.425);
        $(".loginTop10").width(w * 0.265);
        $(".loginTop10_main").width(w * 0.265);
        $(".cityData").height((h - h * 0.01) / 2.7);
        $(".cityData_main").height((h - h * 0.01) / 2.7);
        $(".add_customer_data").height((h - h * 0.01) / 2.7);
        $(".add_customer_data_main").height((h - h * 0.01) / 2.7);
        $(".loginTop10").height((h - h * 0.01) / 2.7);
        $(".loginTop10_main").height((h - h * 0.01) / 2.7);

    }


    function chinaMap(data1,data2) {
        var chinaMap1 = echarts.init($(".main")[0]);
        chinaMap1.showLoading({
            text: "正在努力加载图表数据..."
        });
        var app = {};
        var data = data1;
        var geoCoordMap = data2;
        var convertData = function(data) {
            var res = [];
            for(var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if(geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
        option1 = {
//				backgroundColor: '#090e21',
            title: {
                text: '',
                //      subtext: 'data from PM25.in',
                //      sublink: 'http://www.pm25.in',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                extraCssText: 'width:160px;height:50px;',
                formatter: function (params) {
                    var res='<div><p style="margin: 0;">公司数量</p><p style="margin: 0;">'+params.data.name+':<span>'+params.data.value[2]+'</span></p></div>'
                    return res;
                },
            },

            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                data: ['城市数量'],
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#243b61',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#002055'
                    }
                }
            },
            series: [{
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function(a, b) {
                    return b.value - a.value;
                })),
                symbolSize: function(val) {
                    if(val[2] >0 && val[2] <= 10){
                        return 5;
                    }else if(val[2] >10 && val[2] <= 50){
                        return 10;
                    }else if(val[2] >50 && val[2] <= 100){
                        return 15;
                    }else if(val[2] >100 && val[2] <= 500){
                        return 20;
                    }else if(val[2] >500 && val[2] <= 1000){
                        return 25;
                    }else{
                        return 30;
                    }

                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            },{
                //          name: 'pm2.5',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function(val) {
                    if(val[2] >0 && val[2] <= 10){
                        return 5;
                    }else if(val[2] >10 && val[2] <= 50){
                        return 10;
                    }else if(val[2] >50 && val[2] <= 100){
                        return 15;
                    }else if(val[2] >100 && val[2] <= 500){
                        return 20;
                    }else if(val[2] >500 && val[2] <= 1000){
                        return 25;
                    }else{
                        return 30;
                    }
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            },

            ]
        };
        if(option1 && typeof option1 === "object") {
            chinaMap1.hideLoading();
            chinaMap1.setOption(option1);
        }
    }

    function accumulativeTransaction(data1,data2) {
        var accumulativeTransaction1 = echarts.init($(".accumulativeTransaction_main")[0]);
        accumulativeTransaction1.showLoading({
            text: "正在努力加载图表数据..."
        });
        var option2 = {
            grid: {
                x: 45,
                y: 70,
                x2: 15,
                y2: 35,
                borderWidth: 1
            },
//				backgroundColor: '#090e21',
//             tooltip: {
//                 trigger: 'axis',
//                 axisPointer: {
//                     type: 'shadow',
//                     label: {
//                         show: true,
//                         backgroundColor: '#333'
//                     }
//                 }
//             },
//             ,
            tooltip: {
                trigger: 'item',
                    extraCssText: 'width:160px;height:50px;',
                    formatter: function (params) {
                    var res='<div><p style="margin: 0;"></p><p style="margin: 0;">'+params.seriesName+':<span>'+params.value+'</span>万元</p></div>'
                    return res;
                },
            },
            //  legend: {
            //      data: ['line', 'bar'],
            //      textStyle: {
            //          color: '#ccc'
            //      }
            //  },
            xAxis: {
                data: data1,
                axisLine: {
                    lineStyle: {
                        color: '#bdcee1'
                    }
                },
                axisLabel:{ //调整x轴的lable
                    textStyle:{
                        fontSize:12,// 让字体变大
                        color:"#bdcee1"
                    }
                }
            },
            yAxis: {
                name: '单位：万元',
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#bdcee1'
                    }
                },
                axisLabel:{ //调整x轴的lable
                    textStyle:{
                        fontSize:12,// 让字体变大
                        color:"#bdcee1"
                    }
                }
            },
            series: [{
                name: '日交易量',
                type: 'line',
                smooth: true,
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: 6,
                data: data2
            }, {
                name: '日交易量',
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                offset: 0,
                                color: '#14c8d4'
                            },
                                {
                                    offset: 1,
                                    color: '#43eec6'
                                }
                            ]
                        )
                    }
                },
                data: data2
            }]
        };
        accumulativeTransaction1.hideLoading();
        accumulativeTransaction1.setOption(option2);

    }

    function accountingEvaluation(data1) {
        var accountingEvaluation1 = echarts.init($(".accountingEvaluation_main")[0]);
        accountingEvaluation1.showLoading({
            text: "正在努力加载图表数据..."
        });
        var option3= {
            title: {
                text: ''
            },
            grid: {
                x: 30,
                y: 40,
                x2: 5,
                y2: 25,
                borderWidth: 1
            },
            tooltip: {
                trigger: 'item',
                extraCssText: 'width:160px;height:110px;',
                position: [110, 70]
            },
            //			    legend: {
            //			        x: 'center',
            //			        data:['某软件']
            //			    },

            polar: [{
                nameGap: 5, // 图中工艺等字距离图的距离
                center: ['53%', '55%'], // 图的位置
                radius: 30,
                name: {
                    show: true, // 是否显示工艺等文字
                    formatter: null, // 工艺等文字的显示形式
                    textStyle: {
                        color: '#fefefe' // 工艺等文字颜色
                    }
                },
                indicator: [{
                    text: '专业水平',
                    max: 10
                },
                    {
                        text: '业务能力',
                        max: 10
                    },
                    {
                        text: '忠诚度',
                        max: 10
                    },
                    {
                        text: '工龄',
                        max: 10
                    },
                ],
                axisLine: { // 坐标轴线
                    show: false // 默认显示，属性show控制显示与否
                },
                axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                    show: false,
                    textStyle: {
                        color: '#fefefe' // 坐标轴刻度文字的样式
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ["#6f6f6f"] // 图表背景网格的颜色
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#132033' // 图表背景网格线的颜色
                    }
                }
            }],
            series: [{
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: [{
                    value: data1,
                    name: '',
                    itemStyle: {
                        normal: {
                            color: '#2c87e5',
                            // 	                                 label: {
                            //                                       show: true,
                            //                                       formatter:function(params) {
                            //                                           return params.value;
                            //                                       }
                            //                                   },
                            areaStyle: {
                                color: 'rgba(44,135,229,0.3)'
                            }
                        }
                    }
                }],

            }]
        };
        accountingEvaluation1.hideLoading();
        accountingEvaluation1.setOption(option3);
    }

    function EnterpriseScale(data1) {
        var EnterpriseScale1 = echarts.init($(".EnterpriseScale_main")[0]);
        EnterpriseScale1.showLoading({
            text: "正在努力加载图表数据..."
        });
        var option4 = {
            backgroundColor:"RGBA(17,28,48,0.8)",
            tooltip: {
                trigger: 'item',
                extraCssText: 'width:160px;height:50px;',
                position: [130, 70]
            },
            series: [{
                name: '企业类型及数据',
                type: 'pie',
                radius: ['40%', '60%'],
                center: ['50%', '55%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '10',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: data1
            }],
            color: ['#009cdf', '#5047be', '#009570']
        };
        EnterpriseScale1.hideLoading();
        EnterpriseScale1.setOption(option4);
    }

    function appLogin(data1,data2,data3) {
        var appLogin1 = echarts.init($(".appStartUp_main")[0]);
        appLogin1.showLoading({
            text: "正在努力加载图表数据..."
        });
        var option5 = {
            //		    title : {
            //		        text: '某地区蒸发量和降水量',
            //		        subtext: '纯属虚构'
            //		    },
//				backgroundColor:"#090e21",
            tooltip: {
                trigger: 'item',
                extraCssText: 'width:160px;height:50px;',
                position: [130, 30]
            },
            legend: {
                data: [{
                    name: '财云管家',
                    textStyle: {
                        color: '#92afd7',
                        fontSize: 10
                    }
                },
                    {
                        name: '财云互联',
                        textStyle: {
                            color: '#92afd7',
                            fontSize: 10
                        }

                    },

                ],
                top: 10,
                right: 0,
                itemWidth: 6,
                itemHeight: 6,

            },
            grid: {
                x: 45,
                y: 70,
                x2: 15,
                y2: 35,
                borderWidth: 1
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                data: data3,
                axisLine: {
                    lineStyle: {
                        color: '#bdcee1'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#bdcee1',
                        fontSize:12,// 让字体变大
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#bdcee1'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#bdcee1',
                        fontSize:12,// 让字体变大
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#132033',
                        width: 1
                    }
                },
            }],
            series: [{
                name: '财云管家',
                type: 'bar',
                data: data1,
                itemStyle: {
                    normal: {
                        color: '#4ca2ef'
                    }
                },
            },
                {
                    name: '财云互联',
                    type: 'bar',
                    data: data2,
                    itemStyle: {
                        normal: {
                            color: '#6fccb9'
                        }
                    },
                }
            ]
        };
        appLogin1.hideLoading();
        appLogin1.setOption(option5);
    };

    function browseAndVisitor(data1,data2,data3) {
        var browseAndVisitor1 = echarts.init($(".browseAndVisitor_main")[0]);
        browseAndVisitor1.showLoading({
            text: "正在努力加载图表数据..."
        });
        var option6 = {
//				backgroundColor: '#090f1f',
            title: {
                text: '',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#F1F1F3'
                },
                left: '6%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {
                icon: 'rect',
                itemWidth: 6,
                itemHeight: 6,
                itemGap: 13,
                top: 10,
                right: 0,
                data: ['浏览量(PV)', '访客(UV)'],
                right: '4%',
                textStyle: {
                    fontSize: 10,
                    color: '#92afd7'
                }
            },
            grid: {
                left: 10,
                right: 30,
                bottom: 15,
                top: 70,
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#bdcee1'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#bdcee1',
                        fontSize:12,// 让字体变大
                    }
                },
                data:data3
            }],
            yAxis: [{
                type: 'value',
                name: '单位（%）',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#bdcee1'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#bdcee1',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#132033',
                        width: 1
                    }
                },
            }],
            series: [{
                name: '浏览量(PV)',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: "#1b4949",
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#5cf2e4',
                        borderColor: 'rgba(137,189,2,0.27)',
                        borderWidth: 12

                    }
                },
                data: data1
            }, {
                name: '访客(UV)',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#236563',
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#3196a2',
                        borderColor: 'rgba(0,136,212,0.2)',
                        borderWidth: 12

                    }
                },
                data: data2
            }]
        };
        browseAndVisitor1.hideLoading();
        browseAndVisitor1.setOption(option6);
    }

    function cityData(data1,data2) {
        var cityData1 = echarts.init($(".cityData_main")[0]);
        cityData1.showLoading({
            text: "正在努力加载图表数据..."
        });
        var option7 = {
//				backgroundColor: '#090f1f',
            title: {
                text: '客户分布排名',
                left: 'center',
                textStyle: {
                    color: '#ccc',
                    fontSize: 10
                },
                top: 10
            },
            grid: {
                left: 10,
                right: 30,
                bottom: 10,
                containLabel: true
            },

            tooltip: {
                show: "true",
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#bdcee1',
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#bdcee1',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#132033',
                        width: 1
                    }
                },
            },
            yAxis: [{
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#bdcee1',
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#bdcee1',
                    }
                },
                data: data1
            }
            ],
            series: [

                {
                    name: '客户数量',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            show: true,
                            color: '#03b2c7',
                            barBorderRadius: 50,
                            borderWidth: 0,
                            borderColor: '#333',
                        }
                    },
                    barGap: '0%',
                    barCategoryGap: '50%',
                    data: data2
                }

            ]
        };
        cityData1.hideLoading();
        cityData1.setOption(option7);
    }

    function add_customer_data(data1,data2,data3) {

        var add_customer_data1 = echarts.init($(".add_customer_data_main")[0]);
        add_customer_data1.showLoading({
            text: "正在努力加载图表数据..."
        });
        var option8 = {
//				backgroundColor: '#090e21',
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: 10,
                right: 50,
                bottom: 10,
                containLabel: true
            },
            legend: {
                data: ['代理', '客户'],
                icon: 'rect',
                itemWidth: 6,
                itemHeight: 6,
                top: 10,
                right: 0,
                textStyle: {
                    fontSize: 10,
                    color: '#92afd7'
                }
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data3,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#bdcee1',
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#bdcee1',
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#bdcee1',
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#bdcee1',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#132033',
                        width: 1
                    }
                },
            },
            series: [{
                name: '代理',
                type: 'line',
                data: data1,
                itemStyle: {
                    normal: {
                        show: true,
                        color: '#f5e627',
                        barBorderRadius: 50,
                        borderWidth: 0,
                        borderColor: '#333',
                    }
                },
            },
                {
                    name: '客户',
                    type: 'line',
                    data: data2,
                    itemStyle: {
                        normal: {
                            show: true,
                            color: '#4adaff',
                            barBorderRadius: 50,
                            borderWidth: 0,
                            borderColor: '#333',
                        }
                    },
                }
            ]
        };
        add_customer_data1.hideLoading();
        add_customer_data1.setOption(option8);
    };

    function loginTop10(data1,data2) {
        var loginTop101 = echarts.init($(".loginTop10_main")[0]);
        loginTop101.showLoading({
            text: "正在努力加载图表数据..."
        });
        var option9 = {
//				backgroundColor: '#090f1f',
            title: {
                //	     text:'客户分布排名',
                left: 'center',
                textStyle: {
                    color: '#ccc',
                    fontSize: 10
                },
                top: 10
            },
            grid: {
                left: 10,
                right: 30,
                bottom: 10,
                containLabel: true
            },

            tooltip: {
                show: "true",
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#bdcee1',
                    }
                },
                axisLabel: {
                    show: false,
                    margin: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#bdcee1',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#132033',
                        width: 1
                    }
                },
            },
            yAxis: [{
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#bdcee1',
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#bdcee1',
                    }
                },
                data: data2
            }
            ],
            series: [

                {
                    name: '累计登录数量',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            show: true,
                            color: '#03b2c7',
                            barBorderRadius: 50,
                            borderWidth: 0,
                            borderColor: '#333',
                        }
                    },
                    barGap: '0%',
                    barCategoryGap: '50%',
                    data: data1
                }

            ]
        };
        loginTop101.hideLoading();
        loginTop101.setOption(option9);
        //		myChart.setOption(option, true);
    }
}