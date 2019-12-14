
    var echarsDispatch = function () {
    	'use strict';

    	// 全局属性参数
    	var configMap = {
    		path: '',
    		echarstopUrl: '/statisticalanalysis/dispatch/echarstop',//派工排名统计
            ifManager:"",
            chartsURL:"/statisticalanalysis/dispatch/echarsdata?",
            pgbmURL:"/customermanage/charge/getBmws",
            pgjsURL:"/role/roles/role",
            PGGrid:"",
            pgURL:"/dispatch/getDispatchByPaging",
            chart1DaysSign:''
    	};
        // 全局Dom
        var jqueryMap = {
            $blockTarget: null,
            $content: null,
            $manualdata: null
        };

        var setJqueryMap = function () {
            jqueryMap.$blockTarget = $('body');
            jqueryMap.$content = $('#wrapEchartsGLY');
            jqueryMap.$manualdata = $('table#PGtableMain_data', jqueryMap.$content);
        };

    	//  初始化图表父容器宽度
		var initWidth=function(){
			var w=$(window).width()-180;
			$('#echarstop', jqueryMap.$content).width(w-100-20);
            $(".taskExecution", jqueryMap.$content).width(w*0.5-100);
            $(".taskExecution_main", jqueryMap.$content).width(w*0.5-100);
            $(".taskExecution1", jqueryMap.$content).width(w*0.5-100);
            $(".taskExecution_main1", jqueryMap.$content).width(w*0.5-100);
            $(".userWorkNum", jqueryMap.$content).width(w-100-20);
            $("#sevenPG", jqueryMap.$content).width(w-100-20);
		};

		var setchart1DaysSign = function(){
            if(configMap.chart1DaysSign===""){
                var date = new Date();
                var today = date.getTime();
                var sDate = new Date(date.getTime()-6*24*3600*1000);
                configMap.chart1DaysSign = moment(sDate).format('YYYY-MM-DD') + "/" + moment(today).format('YYYY-MM-DD');
            }
        };

		//各部门派工工作量统计
		var echarstop = function () {
            setchart1DaysSign();
			var myChart1 = echarts.init(document.getElementById('echarstop'));
			myChart1.showLoading({
			    text: "正在努力加载图表数据..."
			});
			$.ajax({
				url: configMap.chartsURL + "flag=1&day=" + configMap.chart1DaysSign,
				dataType:'JSON',
                type:'GET',
				success: function(result) {
                    // 指定图表的配置项和数据
                    var option1 = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {readOnly: false},
                                magicType: {type: ['line', 'bar']},
                                saveAsImage: {}
                            }
                        },
                        xAxis:  {

                            type: 'category',
                            boundaryGap: false,
                            data:result.names
                        },
                        yAxis: {
                            name:"客户数量",
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        series: [
                            {
                                type:'line',
                                data:result.values,
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'}
                                    ]
                                },
                                itemStyle:{
                                    normal:{
                                        color: "#74C352" //图标颜色
                                    }
                                },
                                lineStyle:{
                                    normal:{
                                        width:2,  //连线粗细
                                        color: "#74C352"  //连线颜色
                                    }
                                }
                            }
                        ]
                    };
				     myChart1.hideLoading();
				     myChart1.setOption(option1);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$.messager.alert("检索数据异常：" + textStatus, "异常信息：" + errorThrown, "error");
				}
			});
		};

		/*各部门派工占比*/
        function taskExecution() {
            setchart1DaysSign();
            var taskExecution = echarts.init($("#wrapEchartsGLY  .taskExecution_main")[0]);
            $.ajax({
                url:configMap.chartsURL+"flag=4&day=" + configMap.chart1DaysSign,
                type:'get',
                success:function(data){
                    var option3 = {
                        // title: {
                        //     left: '10',
                        //     text: '各部门派工占比情况（按部门）',
                        //     textStyle:{
                        //         color:'#000000',
                        //         fontStyle:'normal',
                        //         fontWeight:'500',
                        //         fontSize:16
                        //     }
                        // },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {readOnly: false},
                                // magicType: {type: ['line', 'bar']},
                                saveAsImage: {}
                            }
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'right',
                            top: 30,
                            data:data.names
                        },
                        color:data.colors,
                        series: [
                            {
                                type:'pie',
                                radius: ['30%', '75%'],
                                center: ['45%', '60%'],
                                avoidLabelOverlap: true,
                                data:data.values,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    taskExecution.hideLoading();
                    taskExecution.setOption(option3);
                }
            });
        }

        /*获取各角色派工占比*/
        function taskExecution1() {
            setchart1DaysSign();
            var taskExecution1 = echarts.init($("#wrapEchartsGLY  .taskExecution_main1")[0]);
            $.ajax({
                url:configMap.chartsURL+"flag=5&day=" + configMap.chart1DaysSign,
                type:'get',
                success:function(data){
                    var option4 = {
                        // title: {
                        //     left: '10',
                        //     text: '各部门派工占比情况（按角色）',
                        //     textStyle:{
                        //         color:'#000000',
                        //         fontStyle:'normal',
                        //         fontWeight:'500',
                        //         fontSize:16
                        //     }
                        // },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {readOnly: false},
                                saveAsImage: {}
                            }
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'right',
                            top:30,
                            data: data.names
                        },
                        color:data.colors,
                        series: [
                            {
                                type:'pie',
                                radius: ['30%', '75%'],
                                center: ['45%', '60%'],
                                avoidLabelOverlap: true,
                                data:data.values,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    taskExecution1.hideLoading();
                    taskExecution1.setOption(option4);
                }
            });
        }

        /*获取被派工量前十的职员*/
        function  userWorkNum() {
            setchart1DaysSign();
            var userWorkNum1 = echarts.init($("#wrapEchartsGLY  .userWorkNum")[0]);
            $.ajax({
                url:configMap.chartsURL+"flag=6&day=" + configMap.chart1DaysSign,
                type: 'get',
                success: function (data) {
                    var option5 = {
                        // title: {
                        //     left: '10',
                        //     text: '员工工作量前十名统计',
                        //     textStyle:{
                        //         color:'#000000',    //文字颜色
                        //         fontStyle:'normal', //字体风格,'normal','italic','oblique'
                        //         fontWeight:'500',   //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                        //         fontSize:16
                        //     }
                        // },
                        color: ['#3398DB'],
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {readOnly: false},
                                magicType: {type: ['line', 'bar']},
                                saveAsImage: {}
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : data.names,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                type:'bar',
                                barWidth: '60%',
                                data:data.values
                            }
                        ]
                    };
                    userWorkNum1.hideLoading();
                    userWorkNum1.setOption(option5);
                }
            })
        }

        // 近七天派工
        var sevenPG = function () {
            setchart1DaysSign();
            var sevenPG1 = echarts.init(document.getElementById('sevenPG'));
            sevenPG1.showLoading({
                text: "正在努力加载图表数据..."
            });
			$.ajax({
                url:configMap.chartsURL+"flag=7&day=" + configMap.chart1DaysSign,
				dataType:'JSON',
                type:'GET',
				success: function(result) {
                    // 指定图表的配置项和数据
                    var option6 = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {readOnly: false},
                                magicType: {type: ['line', 'bar']},
                                saveAsImage: {}
                            }
                        },
                        xAxis:  {
                            type: 'category',
                            boundaryGap: false,
                            data:result.names
                        },
                        yAxis: {
                            name:"派工数量",
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        series: [
                            {
                                name:'派工数量',
                                type:'line',
                                data:result.values,
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'}
                                    ]
                                },
                                itemStyle:{
                                    normal:{
                                        color: "#74C352" //图标颜色
                                    }
                                },
                                lineStyle:{
                                    normal:{
                                        width:2,  //连线粗细
                                        color: "#74C352"  //连线颜色
                                    }
                                }
                            }

                        ]
                    };
                    sevenPG1.hideLoading();
                    sevenPG1.setOption(option6);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$.messager.alert("检索数据异常：" + textStatus, "异常信息：" + errorThrown, "error");
				}
			});
        };

        //获取派工部门
        var getPGBM = function () {
            $.ajax({
                url: configMap.pgbmURL,
                dataType: 'JSON',
                type: 'GET',
                success: function (result) {
                    $(result).each(function () {
                        var option = "<option data='"+$(this)[0].code+"'>"+$(this)[0].name+"</option>";
                        $("select[name='PGBM']").append(option);
                    })
                }
            })
        };

        //获取派工角色
        var getPGJS = function () {
            $.ajax({
                url: configMap.pgjsURL,
                dataType: 'JSON',
                type: 'GET',
                success: function (result) {
                    $(result).each(function () {
                        var option = "<option data='"+$(this)[0].jsdm+"'>"+$(this)[0].name+"</option>";
                        $("select[name='PGJS']").append(option);
                    })
                }
            })
        };

        var PGGrid = function () {
            configMap.PGGrid = $('#wrapEchartsGLY table').DataTable({
                "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
                "ordering": false, //屏蔽排序
                "searching": false,//屏蔽datatales的查询框
                "processing": true, // 打开数据加载时的等待效果
                "serverSide": true, // 打开后台分页
                "ajax": {
                    "url": configMap.path + configMap.pgURL,
                    "dataSrc": "aaData",
                    "data": function (data) {
                        //    开始的时间
                        var sT = $('input[name="starDate"]', '#wrapEchartsGLY').val();
                        //    结束的时间
                        var eT = $('input[name="endDate"]', '#wrapEchartsGLY').val();
                        if($(".openMore").css("display")=="none"){
                            data.sjq = "";
                            data.sjz = "";
                            data.gsmc = $(".query").val();
                            data.js ="" ;
                            data.bm ="" ;
                        }else{
                            data.sjq = sT;
                            data.sjz = eT;
                            data.gsmc = $(".query").val();
                            data.js =$("select[name='PGJS'] option:selected").attr("data") ;
                            data.bm =$("select[name='PGBM'] option:selected").attr("data") ;
                        }
                    }
                },
                "columns": [
                    {
                        "data": "gsmc"
                    },
                    {
                        'class':'text-center',
                        "data": "ygxm"
                    },
                    {
                        'class':'text-center',
                        "data": "pgjs_mc"
                    },
                    {
                        'class':'text-center',
                        "data": "bmmc"
                    },
                    {
                        'class':'text-center',
                        "data": "lrrq",
                        "render": function (data, type, row) {
                            return moment(data)
                                .format('YYYY-MM-DD');
                        }
                    }
                ],
                "language": {
                    "zeroRecords": "暂时没有客户",
                    "infoEmpty": "无记录",
                    "sEmptyTable": "暂时没有客户",
                    "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
                }
            });
        };

        //导出
        var exportExcel = function () {
            stopContinueClick('#wrapEchartsGLY [name="exportExcel"]', 300);
            var sjq = "";
            var sjz = "";
            var gsmc = $(".query").val();
            var js ="" ;
            var bm ="" ;
            if($(".openMore", jqueryMap.$content).css("display")!=="none"){
                sjq = $('input[name="starDate"]', jqueryMap.$content).val();
                sjz = $('input[name="endDate"]', jqueryMap.$content).val();
                gsmc = $(".query", jqueryMap.$content).val();
                js =$("select[name='PGJS'] option:selected", jqueryMap.$content).attr("data") ;
                bm =$("select[name='PGBM'] option:selected", jqueryMap.$content).attr("data") ;
            }
            window.location.href = "/statisticalanalysis/dispatch/downDataExcel?gsmc=" + gsmc + "&sjq=" +sjq+ "&sjz=" +sjz+ "&js="+js+"&bm="+bm;
        };

		return {
			// 初始化
			init: function (ifManager) {
                configMap.ifManager = ifManager;
                //初始化日期控件
                $(".beginTime", jqueryMap.$content).datepicker({
                    clearBtn: true,
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    language: 'zh-CN'
                });
                $(".endTime", jqueryMap.$content).datepicker({
                    clearBtn: true,
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    language: 'zh-CN'
                });
                //调整页面宽度
                initWidth();
                // 获取派工部门
                getPGBM();
                // 获取派工角色
                getPGJS();
                //判断当前登陆人员是否为管理员
                if(configMap.ifManager==="true"){
                    $(".chartsMain_KJ", jqueryMap.$content).hide();
                    $(".chartsMain_admin", jqueryMap.$content).show();
                    echarstop();
                    taskExecution();
                    taskExecution1();
                    userWorkNum();
                }else{
                    $(".chartsMain_KJ", jqueryMap.$content).show();
                    $(".chartsMain_admin", jqueryMap.$content).hide();
                    sevenPG();
                }
                //派工表格
                PGGrid();

                //搜索
                $(".Search-btn", jqueryMap.$content).on("click",function () {
                    configMap.PGGrid.ajax.reload();
                });

                //导出
                $('[name="exportExcel"]', jqueryMap.$content).off('click').on('click', function () {
                    exportExcel();
                });

                //点击右上角切换图表和表格
                $(".clickSwitch li", jqueryMap.$content).on("click",function () {
                    if($(this).attr("data")==="0"){
                        $(".tableMain", jqueryMap.$content).hide();
                        $(".chartsMain", jqueryMap.$content).show();
                        $(".clickSwitch li", jqueryMap.$content).css("background","none");
                        $(".clickSwitch li i", jqueryMap.$content).css("color","#ccc");
                        $(this).find("i").css("color","#666");
                        $(this).css("background","#f4f4f4");
                    }else{
                        $(".chartsMain", jqueryMap.$content).hide();
                        $(".tableMain", jqueryMap.$content).show();
                        $(".clickSwitch li", jqueryMap.$content).css("background","none");
                        $(".clickSwitch li i", jqueryMap.$content).css("color","#ccc");
                        $(this).find("i").css("color","#666");
                        $(this).css("background","#f4f4f4");
                    }
                });

                //更多搜索条件
                $("#pgSearch_btn", jqueryMap.$content).on("click",function () {
                    if($(this).attr("data")==="0"){
                        $(this).next().removeClass("rotate1");
                        $(this).attr("data",1);
                    }else{
                        $(this).next().addClass("rotate1");
                        $(this).attr("data",0);
                    }
                    $(".openMore", jqueryMap.$content).toggle(500);
                });

                //重新调整窗口大小
                $(window).resize(function () {
                    initWidth();
                    if(configMap.ifManager==="true"){
                        echarstop();
                        taskExecution();
                        taskExecution1();
                        userWorkNum();
                    } else {
                        sevenPG();
                    }
                });


                var date = new Date();
                var today = date.getTime();
                var sDate = new Date(date.getTime()-6*24*3600*1000);
                $('.pgdaterange-Mbtn span', jqueryMap.$content).html( moment(sDate).format('YYYY/MM/DD') + '-' + moment(today).format('YYYY/MM/DD'));
                configMap.chart1DaysSign = moment(sDate).format('YYYY-MM-DD')+'/'+ moment(today).format('YYYY-MM-DD');
                var ButtonName = 'pgdaterange-Mbtn1';
                $('.pgdaterange-Mbtn', jqueryMap.$content).off('click').on('click',function(){
                    ButtonName = $(this).attr('name');
                });
                $('.pgdaterange-Mbtn', jqueryMap.$content).daterangepicker({
                        ranges: {
                            '全部': [moment(), moment().subtract(-1, 'days')],
                            '今日': [moment(), moment()],
                            '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            '近七天': [moment().subtract(6, 'days'),moment()],
                            '近30天': [moment().subtract(29, 'days'),moment()],
                            '本月': [moment().startOf('month'), moment().endOf('month')],
                            '本年':  [moment().startOf('year'), moment().endOf('year')]
                        },
                        startDate: moment().subtract(6, 'days'),
                        endDate: moment()
                    },function(start, end,label) {
                        if(label==='全部'){
                            $('[name="' + ButtonName + '"]').html('全部');
                        }else if(label==='今日'){
                            $('[name="' + ButtonName + '"]').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                        }else if(label==='昨日'){
                            $('[name="' + ButtonName + '"]').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
                        }else if(label==='近七天'){
                            $('[name="' + ButtonName + '"]').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                        }else if(label==='近30天'){
                            $('[name="' + ButtonName + '"]').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                        }else if(label==='本月'){
                            $('[name="' + ButtonName + '"]').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                        }else if(label==='本年'){
                            $('[name="' + ButtonName + '"]').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                        } else {
                            $('[name="' + ButtonName + '"]').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                        }
                    }
                ).on('apply.daterangepicker', function(ev, picker) {
                    if(picker.endDate===null){
                        configMap.chart1DaysSign = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.startDate._d).format('YYYY-MM-DD');
                    } else if (picker.startDate===null){
                        configMap.chart1DaysSign = moment(picker.endDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
                    } else {
                        configMap.chart1DaysSign = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
                    }
                    if(picker.chosenLabel==="全部"){
                        configMap.chart1DaysSign='1/1'
                    }
                    if(ButtonName==='pgdaterange-Mbtn1'){
                        sevenPG();
                    } else if(ButtonName==='pgdaterange-Mbtn2'){
                        echarstop();
                    } else if(ButtonName==='pgdaterange-Mbtn3'){
                        taskExecution();
                    } else if(ButtonName==='pgdaterange-Mbtn4'){
                        taskExecution1();
                    } else if(ButtonName==='pgdaterange-Mbtn5'){
                        userWorkNum();
                    }
                });
			},
			// 设置路径
			setPath: function (path) {
				configMap.path = path;
			}
		};
    }();
//@ sourceURL=edit.js