var echarsArrears = function () {
	  'use strict';

	  // 全局属性参数
	  var configMap = {
	    path: '',
	    sumqfzhsUrl:'/statisticalanalysis/arrears/sumqfzhs',
	    sumqfzjeUrl:'/statisticalanalysis/arrears/sumqfzje',
	    echarsqfhsUrl: '/statisticalanalysis/arrears/echarsqfhs',
	    echarsqfjeUrl: '/statisticalanalysis/arrears/echarsqfje'
	  };
	  
	   //初始化表
	   var initsumqfzhs = function () {
			$.ajax({
				url: configMap.path + configMap.sumqfzhsUrl,
				dataType: 'JSON',
				type: 'GET',
				success: function (datas) {
					$('#qfhs').text(datas.NUM);
				},
				error: function () {
					 Messenger().post({message: '获取数据失败！', type: 'error'});
				}
			});
	    };
	  //初始化表
	   var initsumqfzje = function () {
			$.ajax({
				url: configMap.path + configMap.sumqfzjeUrl,
				dataType: 'JSON',
				type: 'GET',
				success: function (datas) {
					var money = new Number(datas.MONEY);
					$('#qfje').text(money.toFixed(2));
				},
				error: function () {
					 Messenger().post({message: '获取数据失败！', type: 'error'});
				}
			});
	    };
			
	  var echarsqfhs = function () {
			var myChart1 = echarts.init(document.getElementById('echarsqfhs'));
			myChart1.showLoading({
			    text: "正在努力加载图表数据..."
			});
			// 指定图表的配置项和数据
			var option1 = {
					color: ['#45d94d'],
					  toolbox: {
					        show : true,
					        right:150,
					        feature : {
					            mark : {show: true},
					            dataView : {show: false, readOnly: false},
					            magicType : {show: true, type: ['line', 'bar']},
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },

						legend: {
							x:"left",
					    y:"bottom"

					    },
						tooltip : {
							trigger : 'axis',
							axisPointer : { // 坐标轴指示器，坐标轴触发有效
								type : 'line' // 默认为直线，可选为：'line' | 'shadow'
							},
							formatter: "{b} <br/>{a} : {c}"
						},
						xAxis : [ {
							boundaryGap : false,
							axisLabel: {  
								   interval:0,  
								   rotate:40  
								},
							name: "年月"
						} ],
						yAxis : [ {
							type : 'value',
							name: "户数",
						} ],
						series : [
								{
									name : '户数',
									type : 'line',
								}
								]
				};

		    var dates = [];
		    var nums = [];
			$.ajax({
				url: configMap.echarsqfhsUrl,
				dataType:'JSON',
				  	type:'GET',
//				data: {
//					cxnd:cxnd,
//					xz:cxxz
//				},
				success: function(result, textStatus) {
				    var list = result.list;//获取菜单信息
				   
				   /*第一种写法*/
				    for(var i=0;i<list.length;i++)
			       	 {
			       	  	var map = list[i];
//			       	  	console.info(map);
			       	  	dates.push(map.DATE);
			       	    
			       	  	nums.push(map.NUM);
			       	 }
				     
			       // 第二种写法：
					/*$.each(yjcds, function(index, item){
						arr.push({value:item.nums, name: item.lrrmc});
					});*/
				     option1.series[0].data =nums;
				     option1.xAxis[0].data = dates;
					
					myChart1.hideLoading();
					myChart1.setOption(option1);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$.messager.alert("检索数据异常：" + textStatus, "异常信息：" + errorThrown, "error");
				}
			});
		};
		
		var echarsqfje = function () {
			var myChart2 = echarts.init(document.getElementById('echarsqfje'));
			myChart2.showLoading({
				text: "正在努力加载图表数据..."
			});
			// 指定图表的配置项和数据
			var option2 = {
					color: ['#45d94d'],
				  toolbox: {
				        show : true,
				        right:150,
				        feature : {
				            mark : {show: true},
				            dataView : {show: false, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },

//					legend : {
//						data : [ '2007', '2008' ]
//					},
					tooltip : {
						trigger : 'axis',
						axisPointer : { // 坐标轴指示器，坐标轴触发有效
							type : 'line' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: "{b} <br/>{a} : {c}"
					},
					xAxis : [ {
						boundaryGap : false,
						axisLabel: {  
							   interval:0,  
							   rotate:40  
							},
						name: "年月"
					} ],
					yAxis : [ {
						type : 'value',
						name: "金额",
					} ],
					series : [
							{
								name : '金额',
								type : 'line',
								itemStyle:{
									lineStyle:{
										color:"#438ee4"
									}
								}
							}
							]
			};
			
			var dates = [];
			var money = [];
			$.ajax({
				url: configMap.echarsqfjeUrl,
				dataType:'JSON',
				type:'GET',
//				data: {
//					cxnd:cxnd,
//					xz:cxxz
//				},
				success: function(result, textStatus) {
					var list = result.list;//获取菜单信息
					
					/*第一种写法*/
					for(var i=0;i<list.length;i++)
					{
						var map = list[i];
//			       	  	console.info(map);
						dates.push(map.DATE);
						var data = new Number(map.MONEY);
						money.push(data.toFixed(2));
					}
					
					// 第二种写法：
					/*$.each(yjcds, function(index, item){
						arr.push({value:item.money, name: item.lrrmc});
					});*/
					option2.series[0].data =money;
					option2.xAxis[0].data = dates;
					
					myChart2.hideLoading();
					myChart2.setOption(option2);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$.messager.alert("检索数据异常：" + textStatus, "异常信息：" + errorThrown, "error");
				}
			});
		};

	  return {
	    // 初始化
	    init: function () {
	    	var tabid=$('#echarsqfhs').parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);
	    	initsumqfzhs();
	    	initsumqfzje();
	    	echarsqfhs();
	    	echarsqfje();
	    },
	    // 设置路径
	    setPath: function (path) {
	      configMap.path = '';
	    },
	  };
}();
//@ sourceURL=edit.js