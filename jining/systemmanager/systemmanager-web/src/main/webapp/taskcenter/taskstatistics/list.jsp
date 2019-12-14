
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<title></title>
		<!-- 可选的 Bootstrap 主题文件（一般不用引入） -->
		<%--<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/caiyun/adminBase.css" />--%>
		<%--<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/caiyun//public.css" />--%>
		<%--<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/font/iconfont.css" />--%>
		<style type="text/css">
			body {
				/*overflow: auto;*/
				background: #f0f0f0;
				width: 100%;
				color: #000;
			}
			*{
				margin: 0;
				padding: 0;
			}
			.personInCharge,
			.taskAdded,
			.department{
				height: 355px;
				width: 100%;
				margin: 10px 0;
			}
			.personInCharge_main,
			.taskAdded_main,
			.department_main{
				height: 308px;
				width: 566px;
				margin: 10px 0;
				/*background: yellow;*/

			}
			.personInCharge_top,
			.taskAdded_top,
			.department_top{
				width: 100%;
				height: 45px;
				color: #656565;
				font-size: 18px;
				line-height: 45px;
				padding-left: 10px;
			}
			#taskstatisticsDIV .taskExecution{
				height: 345px;
				margin: 10px 0;
				float: left;
				/* border: 1px solid #666; */
			}
			#taskstatisticsDIV .taskExecution_right{
				float: right;
				width: 125.5px;;
				background: #f4f4f4;
				/* margin: 25px 0; */
				height: 375px;
				padding: 15px 10px;
				margin-bottom: 0;
			}
			#taskstatisticsDIV .taskExecution_top{
				width: 100%;
				height: 45px;
				color: #656565;
				font-size: 18px;
				line-height: 45px;
				padding-left: 10px;
			}
			#taskstatisticsDIV .taskExecution_top span{
				font-size: 16px;
			}
			#taskstatisticsDIV .taskExecution_top span b{
				font-size: 20px;
				color: #7bc14d;
			}
			#taskstatisticsDIV .taskExecution_main{
				width: 380px;
				height: 350px;
			}
			#taskstatisticsDIV .taskExecution_right li{
				border-bottom: 1px solid #d8d8d8;
				padding: 0px 5px;
				height: 51px;
				line-height: 10px;
			}
			#taskstatisticsDIV .taskExecution_right li p:nth-child(1){
				width: 42%;
				text-align: right;
				color: #828282;
				margin-right: 25px;
			}
			#taskstatisticsDIV .taskExecution_right li p{
				float: left;
			}
			#taskstatisticsDIV .taskExecution_right li p:nth-child(2){
				font-size: 18px;
			}
			#taskstatisticsDIV .taskExecution_right li:nth-child(1) p:nth-child(2){
				float: left;
				color: #41771f;
			}
			#taskstatisticsDIV .taskExecution_right li:nth-child(2) p:nth-child(2){ /*已完成*/
				float: left;
				color: #97cf6e;
			}
			#taskstatisticsDIV .taskExecution_right li:nth-child(3) p:nth-child(2){ /*进行中*/
				float: left;
				color: #4ca7ee;
			}
			#taskstatisticsDIV .taskExecution_right li:nth-child(4) p:nth-child(2){ /*已延迟*/
				float: left;
				color: #f23a42;
			}
			#taskstatisticsDIV .taskExecution_right li:nth-child(5) p:nth-child(2){ /*未开始*/
				float: left;
				color: #fa9700;
			}
			#taskstatisticsDIV .taskExecution_right li:nth-child(6) p:nth-child(2){ /*暂停中*/
				float: left;
				color: #fc5be3; /* 828282 */
			}
			#taskstatisticsDIV .taskExecution_right li:nth-child(7) p:nth-child(2){ /*已取消*/
                float: left;
                color: #ccc; /* 828282 */
            }
			
		</style>
	</head>
	<body>
		<div id="firstLoad_m">
			<div>
				<div class="IKnow"></div>
			</div>
		</div>
		<div class="bottom_right" id="taskstatisticsDIV"  style="margin-bottom: 30px">
			<div class="charts">
				<div class="col-lg-6" style="padding-right: 7.5px!important; " >
					<div style="border: 1px solid #ccc;margin-top: 10px;border-radius:5px !important;overflow: hidden;box-shadow: 2px 2px 2px #efefef;position: relative;padding-right: 100px">
						<div class="chargeMenu1 clearfix" style="width: 100%;padding: 5px 10px;border-bottom: 1px solid #dedede">
							<h5 class="pull-left">任务执行情况（<span>完成率<b id="completionRate">%</b></span>）</h5>
							<button type="button" class="btn btn-default pull-right borderRadius4" id="taskOver-Mbtn1" style="margin-right: -100px">
								<span>
								  <i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
								<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
							</button>
						</div>
						<div class="taskExecution">
							<%--<div class="taskExecution_top">任务执行情况（<span>完成率<b id="completaaionRate">%</b></span>）</div>--%>
							<div class="taskExecution_main">

							</div>
						</div>
						<ul class="taskExecution_right" style="width: 150px;
																	position: absolute;
																	right: 0;
																	top: 45px;
																	border-top: 1px solid #ccc;">
							<li>
								<p>总任务</p>
								<p id="allTask"></p>
							</li>
							<li>
								<p>已完成</p>
								<p id="isOver"></p>
							</li>
							<li>
								<p>进行中</p>
								<p id="starting"></p>
							</li>
							<li>
								<p>已延期</p>
								<p id="postponed"></p>
							</li>
							<li>
								<p>未开始</p>
								<p id="notStart"></p>
							</li>
							<li>
								<p>已暂停</p>
								<p id="Paused"></p>
							</li>
							<li>
								<p>已取消</p>
								<p id="cancled"></p>
							</li>
						</ul>
						<div style="clear: both"></div>
					</div>

				</div>
				<div class="col-lg-6" style="padding-left: 7.5px!important">
					<div style="border: 1px solid #ccc;margin-top: 10px;border-radius:5px !important;overflow: hidden;box-shadow: 2px 2px 2px #efefef;">
						<div class="chargeMenu2 clearfix" style="padding: 5px 10px;border-bottom: 1px solid #dedede">
							<h5 class="pull-left">任务新增及完成情况</h5>
							<button type="button" class="btn btn-default pull-right borderRadius4" id="taskOver-Mbtn2">
								<span>
								  <i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
								<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
							</button>
						</div>
						<div class="taskAdded" style="margin: 0">
						<%--	<div class="taskAdded_top">任务新增及完成情况</div>--%>
							<div class="taskAdded_main">

							</div>
						</div>
					</div>
				</div>

			</div>
			<div class="charts">
				<div class="col-lg-6" style="padding-right: 7.5px!important">
					<div style="border: 1px solid #ccc;margin-top: 10px;border-radius:5px !important;overflow: hidden;box-shadow: 2px 2px 2px #efefef;">
						<div class="chargeMenu3 clearfix" style="padding: 5px 10px;border-bottom: 1px solid #dedede">
							<h5 class="pull-left">按负责人统计任务进展情况</h5>
							<button type="button" class="btn btn-default pull-right borderRadius4" id="taskOver-Mbtn3" >
								<span>
								  <i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
								<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
							</button>
						</div>
						<div class="personInCharge">
							<%--<div class="personInCharge_top">按负责人统计任务进展情况(TOP10)</div>--%>
							<div class="personInCharge_main">

							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-6" style="padding-left: 7.5px!important">
					<div style="border: 1px solid #ccc;margin-top: 10px;border-radius:5px !important;overflow: hidden;box-shadow: 2px 2px 2px #efefef;">
						<div class="chargeMenu4 clearfix" style="padding: 5px 10px;border-bottom: 1px solid #dedede">
							<h5 class="pull-left">按负责人部门统计任务进展情况</h5>
							<button type="button" class="btn btn-default pull-right borderRadius4" id="taskOver-Mbtn4">
								<span>
								  <i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
								<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
							</button>
						</div>
						<div class="department">
							<%--<div class="department_top">按负责人部门统计任务进展情况(TOP10)</div>--%>
							<div class="department_main">

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>

	<script type="text/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/libs/moment.js"></script>
	<script type="text/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/libs/daterangepicker.js"></script>
	<!-- <link rel="stylesheet" href="css/followUpRemind.css"> -->
	
	<%--<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>--%>
	<%--<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>--%>

	<%--<script src="js/echarts.min.js"></script>--%>

	<script>
		$(function () {
            $(window).resize(function () {
                initWidth()
                taskExecution()
                taskAdded()
                department()
                personInCharge()

            });
            //  初始化图表父容器宽度
            var initWidth = function () {
                var w = $(window).width() - 180;

                $('#taskstatisticsDIV  .taskExecution_right').width(150);
                $('#taskstatisticsDIV .taskExecution_main').width(w * 0.37 - 25);
                $('#taskstatisticsDIV .taskAdded_main').width(w * 0.47 - 15);
                $('#taskstatisticsDIV .personInCharge_main').width(w * 0.47 - 15);
                $('#taskstatisticsDIV .department_main').width(w * 0.47 - 15);
//			var width = $("#SWTXTable").width();
            }
            var date = new Date();
            var jintian = date.getTime();
            $('#taskOver-Mbtn1 span').html(moment(jintian).format('YYYY/MM/DD') + '-' + moment(jintian).format('YYYY/MM/DD'));
            $('#taskOver-Mbtn2 span').html(moment(jintian).format('YYYY/MM/DD') + '-' + moment(jintian).format('YYYY/MM/DD'));
            $('#taskOver-Mbtn3 span').html(moment(jintian).format('YYYY/MM/DD') + '-' + moment(jintian).format('YYYY/MM/DD'));
            $('#taskOver-Mbtn4 span').html(moment(jintian).format('YYYY/MM/DD') + '-' + moment(jintian).format('YYYY/MM/DD'));
			/*  $('#daterange-Mbtn5 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));
			 $('#daterange-Mbtn6 span').html( moment(jintian).format('YYYY/MM/DD')+'-'+ moment(jintian).format('YYYY/MM/DD'));*/
            var taskOver = moment(jintian).format('YYYY-MM-DD') + '/' + moment(jintian).format('YYYY-MM-DD'),
                tasadd = moment(jintian).format('YYYY-MM-DD') + '/' + moment(jintian).format('YYYY-MM-DD'),
                employee = moment(jintian).format('YYYY-MM-DD') + '/' + moment(jintian).format('YYYY-MM-DD'),
                departmentTime = moment(jintian).format('YYYY-MM-DD') + '/' + moment(jintian).format('YYYY-MM-DD');
			/*  chart5DaysSign5= moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD'),
			 chart6DaysSign6= moment(jintian).format('YYYY-MM-DD')+'/'+ moment(jintian).format('YYYY-MM-DD');*/
            console.log(taskOver);

            $('#taskOver-Mbtn1').daterangepicker({
                    ranges: {
                        '全部': [moment(), moment().subtract(-1, 'days')],
                        '今日': [moment(), moment()],
                        '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        '近七天': [moment().subtract(6, 'days'), moment()],
                        '近30天': [moment().subtract(29, 'days'), moment()],
                        '本月': [moment().startOf('month'), moment().endOf('month')],
                        '本年': [moment().startOf('year'), moment().endOf('year')]
                    },
                    startDate: moment(),
                    endDate: moment()
                },
                function (start, end, label) {
                    if (label == '全部') {
                        $('#taskOver-Mbtn1 span').html('全部');
                    } else if (label == '今日') {
                        $('#taskOver-Mbtn1 span').html(end.format('YYYY/MM/DD') + '-' + end.format('YYYY/MM/DD'));
                    } else if (label == '昨日') {
                        $('#taskOver-Mbtn1 span').html(start.format('YYYY/MM/DD') + '-' + start.format('YYYY/MM/DD'));
                    } else if (label == '近七天') {
                        $('#taskOver-Mbtn1 span').html(start.format('YYYY/MM/DD') + '-' + end.format('YYYY/MM/DD'));
                    } else if (label == '近30天') {
                        $('#taskOver-Mbtn1 span').html(start.format('YYYY/MM/DD') + '-' + end.format('YYYY/MM/DD'));
                    } else if (label == '本月') {
                        $('#taskOver-Mbtn1 span').html(start.format('YYYY/MM/DD') + '-' + end.format('YYYY/MM/DD'));
                    } else if (label == '本年') {
                        $('#taskOver-Mbtn1 span').html(start.format('YYYY/MM/DD') + '-' + end.format('YYYY/MM/DD'));
                    }

                }).on('apply.daterangepicker', function (ev, picker) {
                if (!picker.endDate) {
                    $('#daterange-Mbtn1 span').html(moment(picker.startDate._d).format('YYYY/MM/DD') + '-' + moment(picker.startDate._d).format('YYYY/MM/DD'));
                    taskOver = moment(picker.startDate._d).format('YYYY-MM-DD') + '/' + moment(picker.startDate._d).format('YYYY-MM-DD');
                } else {
                    taskOver = moment(picker.startDate._d).format('YYYY-MM-DD') + '/' + moment(picker.endDate._d).format('YYYY-MM-DD');
                }
                if (picker.chosenLabel == "全部") {
                    taskOver = '1/1'
                }
                taskExecution();
            });
            function taskExecution() {
                var taskExecution = echarts.init($("#taskstatisticsDIV .taskExecution_main")[0]);
                var agentTime = [];
                var agentCount = [];
                var count = [];
                var arr = [];
                var arrs = [];
                var colors = [];
                $.ajax({
                    url: '/systemmanager/taskstatistics/searchCountByEmployeeByZdy/' + taskOver,
                    type: 'get',
                    success: function (data) {
                        var list = data.searchCountByEmployee;
                        if (list.length == 0) {
                            count.push();
                        } else {
                            for (var i = 0; i < list.length; i++) {
//                            var map=list[i];
//                            stat.push(map.statCode);
//                            count.push(map.count);
                                var color = "";
                                if (list[i].statCode == '001') {
                                    list[i].statCode = '已完成';
                                    color = "#97cf6e";
                                    if (list[i].count == 0) {
                                        continue;
                                    }
                                } else if (list[i].statCode == '002') {
                                    list[i].statCode = '进行中';
                                    color = "#4ca7ee";
                                    if (list[i].count == 0) {
                                        continue;
                                    }
                                } else if (list[i].statCode == '003') {
                                    list[i].statCode = '已取消';
                                    color = "#ccc";
                                    if (list[i].count == 0) {
                                        continue;
                                    }
                                } else if (list[i].statCode == '004') {
                                    list[i].statCode = '已延迟';
                                    color = "#f23a42";
                                    if (list[i].count == 0) {
                                        continue;
                                    }
                                }
                                if (list[i].statCode == '005') {
                                    list[i].statCode = '已暂停';
                                    color = "#fc5be3";
                                    if (list[i].count == 0) {
                                        continue;
                                    }
                                } else if (list[i].statCode == '006') {
                                    list[i].statCode = '未开始';
                                    color = "#fa9700";
                                    if (list[i].count == 0) {
                                        continue;
                                    }
                                }
                                var a = {value: list[i].count, name: list[i].statCode};
                                var b = list[i].statCode;
                                arr.push(a)
                                arrs.push(b);
                                colors.push(color);
                            }
                            if (arr.length == 0) { //无数据
                                var a = {value: 0, name: "任务总数"};
                                arr.push(a);
                                arrs.push("任务总数");
                                colors.push("#ccc");
                            }
                            $('#completionRate').html((data.completionRate * 100).toFixed(2) + '%');
                            $('#allTask').html(data.allTaskNum);
                            $('#isOver').html(list[0].count);
                            $('#starting').html(list[1].count);
                            $('#cancled').html(list[2].count);
                            $('#postponed').html(list[3].count);
                            $('#Paused').html(list[4].count);
                            $('#notStart').html(list[5].count)
                        }
                        option = {
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                            },
                            //已完成，进行中，已取消，已延迟，暂停中，未开始
                            //color:['#97cf6e', '#4ca7ee','#333','#f23a42',"#fc5be3","#fa9700"],
                            color: colors,
                            series: [
                                {
                                    name: '任务状态',
                                    type: 'pie',
                                    radius: ['50%', '70%'],
                                    avoidLabelOverlap: true,
                                    data: arr,
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
                        taskExecution.setOption(option);

						/*option.legend.data=stat;

					option.series[0].data=stat;*/
                    },
					error:function () {
						console.info(taskOver)
                    }
                })
            };


            $('#taskOver-Mbtn2').daterangepicker({
                    ranges: {
						 '全部': [moment(), moment().subtract(-1, 'days')],
                        '今日': [moment(), moment()],
                        '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        '近七天': [moment().subtract(6, 'days'), moment()],
                        '近30天': [moment().subtract(29, 'days'), moment()],
                        '本月': [moment().startOf('month'), moment().endOf('month')],
                        '本年': [moment().startOf('year'), moment().endOf('year')]
                    },
                    startDate: moment(),
                    endDate: moment()
                },
                function (start, end, label) {
                if(label=='全部'){
                    $('#taskOver-Mbtn2 span').html('全部');
                }else if(label== '今日'){
                    $('#taskOver-Mbtn2 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                }else if(label=='昨日'){
                    $('#taskOver-Mbtn2 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
                }else if(
                    label=='近七天'){
                    $(' #taskOver-Mbtn2 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                }else if(label=='近30天'){
                    $(' #taskOver-Mbtn2 span').html(start.format('YYYY/MM/DD') +'-' +end.format(
                            'YYYY/MM/DD'));
                }else if(label == '本月'){
                    $('#taskOver-Mbtn2 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                }else if(label=='本年') {
                    $('#taskOver-Mbtn2 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                }

            }).on('apply.daterangepicker', function(ev, picker) {
                tasadd = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
                if(picker.chosenLabel=="全部"){
                    tasadd='1/1'
            }

            taskAdded();
        });
            function taskAdded() {
            var taskAdded
                = echarts.init($("#taskstatisticsDIV .taskAdded_main")[0]);
                var agentTime = [];
            var agentCount = [];

			var count=[];
			var nums=[];
			var insertTime=[];
			$.ajax({
				url: 'systemmanager/taskstatistics/searchCountByDayAndInsertOrOutNew/'+ tasadd,
				type:'get',
				success: function (result) {
				    var list=result.station;
					var newInsert= result.tasklist;
					/*if (list.length>0){
                        count.push();
					}*/
					if(list){
                        if(list.length>0){
                            for(var i=0;i<list.length;i++){
                                count.push(list[i].count); //console.info(list[i])
                                insertTime.push(list[i].startTime);
                            }
                        }
					}
					if(newInsert){
                        if(newInsert.length>0){
                            for(var a = 0;a<newInsert.length;a++){
                                nums.push(newInsert[a].count);
                            };
                        }
					}
					//console.info(nums);
                    option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            orient: 'horizontal',
                            x: 'right',
                            data:[
                                '已完成任务','新增任务']
                        },
                        xAxis:  {
                            name:'日期',
                            type: 'category',
                            boundaryGap: false,
                            data: insertTime,
                        },
                        yAxis: {
                            name:'单位：个',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        series: [
                            {
                                name:'已完成任务',
                                type:'line',
                                data:count,
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'}
                                    ]
                                },
                                itemStyle : {
                                    normal : {
                                        color:'#75C353',
                                        lineStyle: {
                                            color: '#75C353'
                                        }
                                    }
                                },
                            },
                            {
                                name:'新增任务',
                                type:'line',
                                data:nums,
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'}
                                    ]
                                }, itemStyle : {
                                    normal : {
                                        color:'#FB9302',
                                        lineStyle:{
                                            color:'#FB9302'
                                        }
                                    }
                                },
                            }
                        ]
                    };
                    taskAdded.setOption(option);
                }
			});

        };

        $('#taskOver-Mbtn3').daterangepicker({
                ranges: {
                    '全部': [moment(), moment().subtract(-1, 'days')],
                    '今日': [moment(), moment()],
                    '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    '近七天': [moment().subtract(6, 'days'),moment()],
                    '近30天': [moment().subtract(29, 'days'),moment()],
                    '本月': [moment().startOf('month'), moment().endOf('month')],
                    '本年':  [moment().startOf('year'), moment().endOf('year')]
                },
                startDate: moment(), endDate: moment()
            }, function(start, end, label) {
                if(label=='全部'){
                    $(' #taskOver-Mbtn3 span').html('全部');
                }else if(label =='今日'){
                    $('#taskOver-Mbtn3 span').html(end.format('YYYY/MM/DD') + '-'+end.format('YYYY/MM/DD'));
                } else if(label=='昨日'){
                    $('#taskOver-Mbtn3 span').html(start.format('YYYY/MM/DD') + '-' +start.format('YYYY/MM/DD'));
                }else if(label== '近七天'){
                    $('#taskOver-Mbtn3 span').html(start.format('YYYY/MM/DD')+ '-'+end.format('YYYY/MM/DD'));
                }else if(label=='近30天'){
                    $('#taskOver-Mbtn3 span').html(start.format('YYYY/MM/DD') +'-'+end.format('YYYY/MM/DD'));
                }else if(label=='本月'){
                    $('#taskOver-Mbtn3span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                } else if(label=='本年'){
                    $('#taskOver-Mbtn3 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                }

            }).on('apply.daterangepicker', function(ev, picker) {
            if(!picker.endDate){
                $(' #daterange-Mbtn1 span').html(moment(picker.startDate._d).format('YYYY/MM/DD')+'-' +moment(picker.startDate._d).format('YYYY/MM/DD'));
                employee = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+ moment(picker.startDate._d).format('YYYY-MM-DD');
            }else{
                employee = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+moment(picker.endDate._d).format('YYYY-MM-DD');
            }
            if(picker.chosenLabel== "全部"){
                employee='1/1'
            }
            personInCharge();
        });
        function personInCharge() {
            var personInCharge = echarts.init($("#taskstatisticsDIV  .personInCharge_main")[0]);
            var name = [];
            var data1 = [];
            var data2=[];
			$.ajax({
                url: 'systemmanager/taskstatistics/searchCountByPersonInChargeByZdy/'+employee,
                type:'get',
				success: function (result) {
					var isOver=result.isOver;
					var isNotOver=result.isNotOver;
					if(isOver.length>0){
                        for(var i=0;i<isOver.length;i++){
                            name.push(isOver[i].name);
                            data1.push(isOver[i].count);
                        }
					}
					  if(isNotOver.length>0){
                          for(var a=0;a<isNotOver.length;a++){
                              data2.push(isNotOver[a].count);
                          }
					  }
                    option = {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {
                                // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            orient: 'horizontal',
                            x: 'right',
                            data: ['已完成',
                                '未完成']
                        },
                        grid: {
                            left: '10%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis:  {
                            name:'个',
                            type: 'value'
                        },
                        yAxis: {
                            name:'负责人名称',
                            type: 'category',
                            data: name,
                        },
                        series: [
                            {
                                name: '已完成',
                                type: 'bar',
                                stack: '总量',
                                barWidth : 30,
                                //                                label: {
                                //                                    normal: {
                                //                                        show: true,//                                        position: 'insideLeft'
//                                    }
                                //                                },
                                data: data1,
                                itemStyle:{
                                    normal:{
                                        color: '#75c44d'
                                    }
                                },
                            },
                            {
                                name: '未完成',
                                type: 'bar',
                                stack: '总量',
                                barWidth : 30,
                                label: {
                                    normal: {

                                        show: true,
                                        position: 'right'
                                    }
                                },
                                data: data2
                                ,
                                itemStyle:{
                                    normal:{
                                        color:'#ccc'
                                    }
                                },
                            }
                        ]
                    };

                    personInCharge.setOption(option);
                }
			})


        };

        $('#taskOver-Mbtn4').daterangepicker({
            ranges: {
                    '全部': [moment(), moment().subtract(-1, 'days')],
                    '今日': [moment(), moment()], '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    '近七天': [moment().subtract(6, 'days'),moment()], '近30天': [moment().subtract(29, 'days'),moment()],
                    '本月': [moment().startOf('month'), moment().endOf('month')],
                    '本年':  [moment().startOf('year'), moment().endOf('year')]
                },
                startDate: moment(), endDate: moment()
        }, function(start, end, label) {
                if(label=='全部'){
                    $('#taskOver-Mbtn4 span').html('全部');
                }else if(label=='今日'){
                    $('#taskOver-Mbtn4 span').html(end.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                }else if(label=='昨日'){
                    $('#taskOver-Mbtn4 span').html(start.format('YYYY/MM/DD')+'-'+start.format('YYYY/MM/DD'));
                }else if(
                    label=='近七天'){
                    $(' #taskOver-Mbtn4 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                }else if(label== '近30天') {
                    $('#taskOver-Mbtn4 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                }else if(label=='本月'){
                    $('#taskOver-Mbtn4 span').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                }else if(label=='本年'){
                    $('#taskOver-Mbtn4 span ').html(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                }

            }).on(
            'apply.daterangepicker', function(ev, picker) {
            if(!picker.endDate){
                $('#daterange-Mbtn1 span').html(moment(picker.startDate._d).format('YYYY/MM/DD')+'-'+moment(picker.startDate._d).format('YYYY/MM/DD'));
                departmentTime = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+ moment(picker.startDate._d).format('YYYY-MM-DD');
            } else{
                departmentTime = moment(picker.startDate._d).format('YYYY-MM-DD')+'/'+
                    moment(picker.endDate._d).format('YYYY-MM-DD');
            }
            if(picker.chosenLabel=="全部"){
                departmentTime='1/1'
            }
                department();
        });
            function department() {
                var department = echarts.init($(" #taskstatisticsDIV .department_main")[0]);
            var name = [];
            var data1 = [];
            var data2=[];
            $.ajax({
                url:'systemmanager/taskstatistics/searchCountByDepartmentByZdy/'+ departmentTime,
                type:'get',
                success:function (result) {
                    var isOver=result.isOver;
                    var isNotOver=result.isNotOver;
                    if(isOver.length==0){
                        name=[];
                        data1=[]
                    }else{
                        for(var i=0;i< isOver.length;i++) {
                            name.push(isOver[i].name);
                            data1.push(isOver[i].count);
                        }
                    }
                    if(isNotOver.length==0){
                        data2=[];
                    }else{
                        for(var a=0;a<isNotOver.length;a++){
                            data2.push(isNotOver[a].count);
                        }
                    }
                    option = {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'
                                // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            orient: 'horizontal',
                            x: 'right',
                            data: [
                                '已完成'
                                ,'未完成']
                        },
                        grid: {
                            left: '10%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis:  {
                            name:'个',
                            type: 'value'

                        },
						yAxis: {
                            name:'部门名称',
                            type: 'category',
                            data: name
                        },
                        series: [
                            {
                                name: '已完成',

                                type: 'bar',
                                stack: '总量',
                                barWidth : 30,
//                                label: {
//                                    normal: {
//                                        show: true,
//                                        position: 'insideLeft'
//                                    }
//                                },
                                data: data1,
                                itemStyle:{
                                    normal:{
                                        color:'#75c44d'
                                    }
                                },
                            },
                            {
                                name: '未完成',
                                type: 'bar',
                                stack: '总量',
                                barWidth : 30,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'right'
                                    }
                                },
                                data: data2,
                                itemStyle:{
                                    normal:{
                                        color:'#ccc'
                                    }
                                },
                            }
                        ]
                    };

                    department.setOption(option);
                }
            })
        };

            initWidth()
            taskExecution()
            taskAdded()
            department()
            personInCharge()


		})
	</script>
</html>