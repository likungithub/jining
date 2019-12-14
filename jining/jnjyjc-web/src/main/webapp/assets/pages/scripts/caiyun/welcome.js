var welcome = function () {
    //'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        tableDataUrl: '/systemmanager/ptnssb/ptnssb',
        updateDataUrl: '/systemmanager/ptnssb/updatePtnssb',
        SWSBUrl: '/caiyun/swsb.jsp',
        JZBSUrl:'/caiyun/jzbsList.jsp',
        HTXXUrl: '/customermanage/contract/addContract.jsp',
        CFTXUrl: '/customermanage/ptcftx/getCftx',
        GJXXUrl: '/caiyun/followupremind.jsp',
        SWTXGrid: null,
        PGTXUrl: '/systemmanager/messageremind/searchCount',
        ifManager: false,
        id: '',
        name: '',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="申报"><i class="fa fa-check" style="font-size:15px;"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="撤回"><i class="fa fa-close" style="font-size:15px;"></i></a>',
        charts1Url:"/welcome/hztj/"
    };

    // 全局Dom
    var jqueryMap = {
        $welcomeDIV: null,
        $customerManageDialog: null,
        blockTarget: null
    };

    var setJqueryMap = function () {
        jqueryMap.$welcomeDIV = $('#welcomeDIV');
        jqueryMap.$SWTXDataTable = $('#SWTXData', jqueryMap.$welcomeDIV);
        jqueryMap.blockTarget = jqueryMap.$welcomeDIV.closest(".modal-content");
    };
    //首次登陆的遮罩层
    var $firstLoadMask = $('#firstLoad_m');

    //打开税务申报页面
    var SWTXMore = function () {
        openModal("税务申报", configMap.SWSBUrl, 'SWSB', function () {
        });
    };

    //打开意向客户tab
    var ZHLMore = function () {
        generateTab(this, "/customermanage/mybusiness/list.jsp?type=welcome", "意向客户", "634d875e-e79d-4f74-884c-c87b75dde4b7", 'fa fa-user-plus iconMr');
    };

    //打开记账列表页面
    var JZMore = function () {
        openModal("客户记账列表", configMap.JZBSUrl + "?type=khjz", "JZBS", function () {
        });
    };

    //打开报税列表页面
    var BSMore = function () {
        openModal("客户报税列表", configMap.JZBSUrl + "?type=khbs", "JZBS", function () {
        });
    };

    //打开合同提醒页面
    var HTTXMore = function () {
        if ($('#htsh').length === 1) { //该div存在，跳转到审核界面
            generateTab(this, "/statisticalanalysis/contractaudit/list.jsp?bz=welcome", "合同审核", "7025a486-4970-4911-a2a9-90a44a3b1623", 'fa fa-cogs iconMr');
        } else {
            openModal("合同信息", configMap.HTXXUrl + "?name=" + encodeURI(configMap.name), 'HTXX', function () {
            });
        }
    };

    //打开任务列表页面
    var RWTab = function (rwid, blzt) {
        var tab_id = "54cd63e4-589b-4cb4-ace0-987d7f637a09";
        closeTAB(tab_id)
        generateTab(this, "/systemmanager/taskcenter/taskmanagement/list.jsp?rwid=" + rwid + "&blzt=" + blzt, "任务管理", tab_id, 'fa fa-cogs iconMr')
    };

    //合同续约界面
    var HTXYMore = function () {
        generateTab(this, "/customermanage/contractcontinue/list.jsp", "合同续约", "a16785a4-8ed2-4414-afe8-0d3a7fc30efe", 'fa fa-cogs iconMr');
    };

    //打开跟进提醒页面
    var GJTXMore = function () {
        stopContinueClick("#GJTX", 300);
        openModal("跟进提醒", configMap.GJXXUrl + "?name=" + encodeURI(configMap.name), 'GJXX', function () {
        });
    }
    var openModal = function (title, url, type, func) {
        var dialogButtons = {
            cancel: {
                label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                className: 'btn btn-default borderRadius4'
            }
        };

        $.get(url, function (html) {
            jqueryMap.$customerManageDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                className: "followRemind-m"
            });
        });
    };

    //待审核合同数据
    // var HTXX = function () {
    //     var htdata = {
    //         'status': '000',
    //         'khxx': null,
    //         'starDate': null,
    //         'endDate': null
    //     };
    //     $.ajax({
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         url: '/statisticalanalysis/contractaudit/findContractaudit',
    //         dataType: 'JSON',
    //         type: 'POST',
    //         data: JSON.stringify(htdata),
    //         success: function (datas) {
    //             $('#dshhtxx').text(datas.dshLength);
    //             $('#dxyhtxx').text(datas.dqyLength);
    //         },
    //         error: function () {
    //             $('#dshhtxx').text(0);
    //             $('#dxyhtxx').text(0);
    //         }
    //     });
    // }

    // var del = function () {
    //     bootbox.dialog({
    //         title: '提示',
    //         message: '确定撤回吗？',
    //         buttons: {
    //             cancel: {
    //                 label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
    //                 className: 'btn-default'
    //             },
    //             success: {
    //                 label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
    //                 className: "btn-primary",
    //                 callback: function () {
    //                     $.ajax({
    //                         url: configMap.path + configMap.updateDataUrl + "/" + id,
    //                         dataType: 'JSON',
    //                         type: 'PUT',
    //                         success: function (result) {
    //                             if (result.success) {
    //                                 SWTXTableData();
    //                             }
    //                         }
    //                     });
    //                 }
    //             }
    //         }
    //     });
    //
    // }

    /**
     * 标记申报
     */
    // var check = function (e) {
    //     var el = $(e);
    //     var rowIndex = configMap.SWTXGrid.cell(el.parent()).index().row;
    //     var row = rowIndex + 1;
    //     var skje = $("#SWTXData tbody tr").eq(rowIndex).find(".table-cell-style").eq(0).val(); //获得input框里面的值
    //     var id = configMap.SWTXGrid.row(rowIndex).data().id;
    //     if (skje == null || skje == "" || typeof(skje) == "undefined") {
    //         Messenger().post({
    //             message: '请输入第' + row + 1 + '行税款！',
    //             type: 'error'
    //         });
    //     } else {
    //         $.ajax({
    //             url: configMap.path + configMap.updateDataUrl + "/" + skje + "/" + id,
    //             dataType: 'JSON',
    //             type: 'PUT',
    //             success: function (result) {
    //                 if (result.success) {
    //                     configMap.SWTXGrid.row(rowIndex).remove().draw(false);
    //                 }
    //             }
    //         });
    //     }
    // }

    //获取催欠费，派工，合同，报税信息
    var GetFourModelData = function () {
            $.ajax({
                url: '/customermanage/ptcftx/getFourModelData',
                dataType: 'JSON',
                type: 'GET',
                success: function (result) {
                    //催费
                    $('#cfkhsl').text(result.cfkhsl); //催费客户数量
                    $('#cfkhje').text(result.cfkhje); //催费金额
                    //欠费
                    $('#qfkhsl').text(result.qfkhsl); //欠费客户数量
                    $('#qfkhje').text(result.qfkhje); //欠费客户金额
                    //派工
                    $('#pgtxsl').text(result.searchCount); //派工数量
                    //合同
                    $('#dshhtxx').text(result.dshLength); //待审核
                    $('#dxyhtxx').text(result.dqyLength); //待续约
                    //报税提醒
                    $('#bsjts').text(result.dbsnum); //待报税
                },
                error: function () {
                    $('#cfkhsl').text(0); //客户数量
                    $('#cfkhje').text(0.00); //客户金额
                    $('#qfkhsl').text(0); //客户数量
                    $('#qfkhje').text(0.00); //客户金额
                    $('#pgtxsl').text(0); //客户金额
                    $('#dshhtxx').text(0);//待审核
                    $('#dxyhtxx').text(0);//待续约
                    $('#bsjts').text(0); //待报税
                }
            });
        }

    // //催费
    // var CFTX = function () {
    //     $.ajax({
    //         url: configMap.CFTXUrl + '/003',
    //         dataType: 'JSON',
    //         type: 'GET',
    //         success: function (result) {
    //             $('#cfkhsl').text(result.khsl); //客户数量
    //             $('#cfkhje').text(result.je); //客户金额
    //         },
    //         error: function () {
    //             $('#cfkhsl').text(0); //客户数量
    //             $('#cfkhje').text(0.00); //客户金额
    //         }
    //     });
    // }
    //
    // //欠费
    // var QFTX = function () {
    //     $.ajax({
    //         url: configMap.CFTXUrl + '/002',
    //         dataType: 'JSON',
    //         type: 'GET',
    //         success: function (result) {
    //             $('#qfkhsl').text(result.khsl); //客户数量
    //             $('#qfkhje').text(result.je); //客户金额
    //         },
    //         error: function () {
    //             $('#qfkhsl').text(0); //客户数量
    //             $('#qfkhje').text(0.00); //客户金额
    //         }
    //     });
    // }
    // var PGTX = function () {
    //     $.ajax({
    //         url: '/systemmanager/messageremind/searchCount',
    //         dataType: 'JSON',
    //         type: 'GET',
    //         success: function (data) {
    //             $('#pgtxsl').text(data);
    //         },
    //         error: function () {
    //             $('#pgtxsl').text(0);
    //         }
    //     })
    // };

    //获取报税提醒的数目
    // var setBSTXCount = function () {
    //     $.ajax({
    //         url: configMap.path + configMap.tableDataUrl + "/week/no",
    //         //+ "/" + ifAll,
    //         dataType: 'JSON',
    //         type: 'GET',
    //         success: function (result) {
    //             $('#bsjts').text(result.length);
    //         }
    //     });
    // }

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

    /*实现打开新选项卡创建出库单
     * @param   -target  this
     * @param   srcStr  选项卡显示的网页的地址
     * @param   menuName   选项卡名称
     * @param   id       唯一标识选项卡
     */
    var CFTXMore = function () {
        generateTab(this, "/customermanage/charge/list.jsp?type=CFTX", "催费提醒", "CFTX", 'fa fa-jpy iconMr');
    };

    //欠费提醒展示
    var QFTXMore = function () {
        generateTab(this, "/customermanage/charge/list.jsp?type=QFTX", "欠费提醒", "QFTX", 'fa fa-credit-card-alt iconMr');
    };

    //派工提醒
    var PGTXMore = function () {
        generateTab(this, "/systemmanager/messageremind/messageremind.jsp?tx=pgtx&type=001&ydbz=0", "消息提醒", "b9df8b20-1fd0-426a-b35a-8f6f9a102799", 'fa fa-cogs iconMr');
    };

    //权限管理
    var QXGL = function () {
        generateTab(this, "/role/roles/customerList.jsp", "权限管理（代理）", "f7632cdb-87bb-4f6a-b493-f4aad78a91c0");
        $firstLoadMask.hide();
    };

    //部门管理
    var BMGL = function () {
        generateTab(this, "/organization/organization/customerList.jsp", "部门管理（代理）", "a3c8e3e7-c493-4347-a7c2-31ddfb1d8967");
        $firstLoadMask.hide();
    };

    //公告类型管理
    var GGLXGL = function () {
        generateTab(this, "/systemmanager/announcementtype/announcementtype.jsp", "公告类型管理", "91647e70-de4d-4d8a-b92e-1f40f5b88339");
        $firstLoadMask.hide();
    };

    //流程管理
    var LCGL = function () {
        generateTab(this, "/systemmanager/taskcenter/processmanagement/list.jsp", "流程管理", "6a26a26e-580c-4278-821b-3ef0ace5d4ff");
    };

    //员工管理
    var YGGL = function () {
        generateTab(this, "/user/users/list.jsp", "员工管理", "6d192b89-7750-4b2d-940a-bc6559a92c55");
    };

    //税项设置
    var SXSZ = function () {
        generateTab(this, "/systemmanager/tax/tax.jsp", "税项设置", "d9c70297-7069-4cb7-b6dd-24d33da054d5");
        $firstLoadMask.hide();
    };

    //客户分类
    var KHFL = function () {
        generateTab(this, "/systemmanager/customertype/customertype.jsp", "客户分类管理", "d824276d-e12d-4370-8d59-ab2949964819");
        $firstLoadMask.hide();
    };

    //收费项目管理
    var SFXM = function () {
        generateTab(this, "/systemmanager/costprojectmanagement/costprojectmanagement.jsp", "收费项目管理", "ab646f5d-8262-49ed-b605-7721cf595479");
    };

    //新手入门
    var XSRM = function () {
        generateTab(this, "/systemmanager/customergettingstarted/customergettingstarted.jsp", "新手入门", "0984cd89-23ea-4bd0-9d6c-85221a251c9a");
    };



    //加载数据
//    var SWTXTableData = function(){
//    	var ifAll = '0'; //默认只能看到自己的客户
//    	App.blockUI({
//			target : jqueryMap.blockTarget,
//			boxed : true,
//			message : '正在加载数据...'
//		});
//    	if($('#khpgtj').length === 1){ //该div存在，具有全部客户的税务提醒权限(派工按钮)，看到全部
//    		ifAll = '1';
//    	} //反之只有自己分配的客户的税务提醒权限
//    		
//		$.ajax({
//			url : configMap.path + configMap.tableDataUrl + "/" + ifAll,
//			dataType: 'JSON',
//			type: 'GET',
//			success : function(result) {
//				App.unblockUI(jqueryMap.blockTarget);
//				configMap.SWTXGrid.clear().draw();
//				if (result.length > 0) {
//					$.each(result,function(index,item){
//	                	//将获取的数据进行小数点处理
//	            		if(item.skje == null || item.skje == ""){
//	            			item.skje = 0;
//	            		}		
//	                	item.skje = editpoint(item.skje);
//	                 });
//				}
//				configMap.SWTXGrid.rows.add(result).dra+w();
//			}
//		});
//	}

    // var resetDataTable = function (e) {
    //     var el = $(e);
    //     var rowIndex = configMap.SWTXGrid.cell(el.parent()).index().row;
    //     var d = configMap.SWTXGrid.row(rowIndex).data();
    //     var je = $("#SWTXData tbody tr").eq(rowIndex).find(".table-cell-style").val();
    //     d.skje = editpoint(je);
    //     configMap.SWTXGrid.row(rowIndex).data(d).draw();
    // }

//    var SWTXTableGrid = function(){
//		configMap.SWTXGrid = jqueryMap.$SWTXDataTable.DataTable({
//	        "dom": 'rt<"row"><"clear">',
//	        "ordering": false,
//	        "iDisplayLength":5, //最多显示5条
//	        "destroy": true,
//	        "autoWidth": false,
//	        "language": {
//	        	"zeroRecords": "暂无提醒数据",
//	        	"infoEmpty": "无记录",
//	        	"sEmptyTable": "暂无提醒数据",
//	        },
//	        "columns": [
//	          {"data": "id"},
//	          {"data": "yhmc"},
//	          {"data": "zsxmDm"},
//	          {"data": "zsxmMc"},
//	          {"data": "bsr",
//				  className:'text-center',
//        	  "render": function (data, type, row) {
//              	if(data == null || data == ""){
//            		return "";
//            	}else{
//            		return moment(data).format('YYYY-MM-DD');
//            	}
//	          } 
//	          },
//	          {"data": "skje",
//	           "render": function(data, type, row) {
//	      			if (data == 0 || data == "0" || data == null) {
//	                    return '<input onKeypress="return (\/\[\\d\.\]\/.test(String.fromCharCode(event.keyCode)))" class="swtx table-cell-style" style="text-align: right;width: 100px;border: 0.5px solid #dadada;" type="text" value="0.00"/>';
//	                } else {
//	                    return '<input onKeypress="return (\/\[\\d\.\]\/.test(String.fromCharCode(event.keyCode)))" class="swtx table-cell-style" style="text-align: right;width: 100px;border: 0.5px solid #dadada;" type="text" value="' + data + '"/>';
//	                }
//              }  
//	          },
//	          {
//	        	"data" : "bszt",
//				  className:'text-center',
//	            "render": function (data, type, row) {
//	            	if(data == true){
//	            		if ($('#khnssb').length === 1) { //该div存在，具有按钮的操作权限
//		            		return "<div class='back' style='cursor:pointer; '><i class='icon iconfont icon-bianji iconFontColor-10a0f7 iconFontSize'></i>撤销</div>";
//	                	} else {
//		            		return "<div style='cursor:pointer;' title='无操作权限'><i class='icon iconfont icon-bianji style='color: #888888 !important;' iconFontSize'></i></div>";
//	                	}
//	            	}else{
//	            		if ($('#khnssb').length === 1) { //该div存在，具有按钮的操作权限
//		            		return "<div class='bjsb' style='cursor:pointer;'><i class='icon iconfont icon-bianji iconFontColor-10a0f7 iconFontSize'></i>标记申报</div>";
//	                	} else {
//		            		return "<div style='cursor:pointer;' title='无操作权限'><i class='icon iconfont icon-bianji style='color: #888888 !important;' iconFontSize'></i></div>";
//	                	}
//	            	}
//	            }
//	          }
//	        ],
//	        "columnDefs": [
//			   {
//			    "targets": [ 0 ],
//			    "visible": false,
//			    "searchable": false
//			   },
//	           {
//	             "targets": [ 2 ],
//	             "visible": false,
//	             "searchable": false
//	           }
//	                     ],
//	        "drawCallback": function () { // 数据加载完成后执行
//	          $('.back', jqueryMap.$SWTXDataTable).off('click').on('click',function(){
//	        	  del();
//	          });
//	          
//	          $('.bjsb', jqueryMap.$SWTXDataTable).off().on('mousedown',function(){
//	        	  check(this);
//	          });
//	          
//	          $('.swtx', jqueryMap.$SWTXDataTable).on('blur',function(){
//	        	  resetDataTable(this);
//	          });
//	        }
//	      });
//	}

    var toKh = function () { //跳到客户
        // $('.wrap', jqueryMap.$welcomeDIV).hide();
        // $('.wrap1', jqueryMap.$welcomeDIV).hide();
        // $('.wrap2', jqueryMap.$welcomeDIV).show();
        // $(".chartWrap").width($(".wrap2").width()*2.19)
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
        //var rank = [];
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

    //毛利
    function grossProfitFun(lastyear,year,date) {
        var myChart4 = echarts.init($(".grossProfitMain")[0]);
        myChart4.showLoading({
            text: "正在努力加载图表数据..."
        });
        var option4 = {
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
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
                    boundaryGap : false,
                    data : date
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name: '单位：万',
                    axisLabel: {
                    formatter: '{value}'
        }
                }
            ],
            series : [
                {
                    name:'去年同期',
                    type:'line',
                    stack: '总数',
                    itemStyle: {
                        normal: {
                            color: "#000",
                            lineStyle: {
                                color: "#2ec7c9"
                            }
                        }
                    },
                    areaStyle: {normal: {
                        color:"#4ffab8"
                    }},
                    data:lastyear
                },
                {
                    name:'今年',
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
                            color: "#000",
                            lineStyle: {
                                color: "#2ec7c9"
                            }
                        }
                    },
                    areaStyle: {normal: {
                        color:"#4fd0fa"
                    }},
                    data:year
                }
            ]
        };

        myChart4.hideLoading();
        myChart4.setOption(option4);
    }

    //商机转换率
    $.ajax({
        url: configMap.path + configMap.charts1Url + 1,
        type: 'get',
        success: function (data) {
            $(".conversionOfData p:nth-child(1) a").text(data.data[2].tj);
            $(".conversionOfData p:nth-child(2) a").text(data.data[1].tj);
            $(".conversionOfData p:nth-child(3) a").text(data.data[0].tj);
            if(parseInt(data.data[2].tj) == 0){
                var num = 0
                $(".taxStatistics li:nth-child(1) div:nth-child(2) p:nth-child(2)").width(num*0.9*100+"%")
                $(".taxStatistics li:nth-child(1) div:nth-child(2) p:nth-child(3) span").text(parseInt(num*100))
            }else{
                var num = parseInt(data.data[1].tj)/parseInt(data.data[2].tj);
                $(".taxStatistics li:nth-child(1) div:nth-child(2) p:nth-child(2)").width(num*0.9*100+"%")
                $(".taxStatistics li:nth-child(1) div:nth-child(2) p:nth-child(3) span").text(parseInt(num*100))
            }
        }
    })

    //报税统计
    $.ajax({
        url: configMap.path + configMap.charts1Url + "2",
        type: 'get',
        success: function (data) {
            $(".accountingData p:nth-child(1) a").text(data.data[2].tj);
            $(".accountingData p:nth-child(2) a").text(data.data[0].tj);
            $(".accountingData p:nth-child(3) a").text(data.data[1].tj);
            if(parseInt(data.data[2].tj) == 0){
                var num = 0;
                $(".taxStatistics li:nth-child(2) div:nth-child(2) p:nth-child(2)").width(0.9*num*100+"%")
                $(".taxStatistics li:nth-child(2) div:nth-child(2) p:nth-child(3) span").text(parseInt(num*100))
            }else{
                var num = parseInt(data.data[0].tj)/parseInt(data.data[2].tj);
                $(".taxStatistics li:nth-child(2) div:nth-child(2) p:nth-child(2)").width(0.9*num*100+"%")
                $(".taxStatistics li:nth-child(2) div:nth-child(2) p:nth-child(3) span").text(parseInt(num*100))
            }
        }
    })

    //记账统计
    $.ajax({
        url: configMap.path + configMap.charts1Url + "3",
        type: 'get',
        success: function (data) {
            $(".taxData p:nth-child(1) a").text(data.data[2].tj);
            $(".taxData p:nth-child(2) a").text(data.data[0].tj);
            $(".taxData p:nth-child(3) a").text(data.data[1].tj);
            if(parseInt(data.data[2].tj) == 0){
                var num = 0;
                $(".taxStatistics li:nth-child(3) div:nth-child(2) p:nth-child(2)").width(0.9*num*100+"%")
                $(".taxStatistics li:nth-child(3) div:nth-child(2) p:nth-child(3) span").text(parseInt(num*100))
            }else{
                var num = parseInt(data.data[0].tj)/parseInt(data.data[2].tj);
                $(".taxStatistics li:nth-child(3) div:nth-child(2) p:nth-child(2)").width(0.9*num*100+"%")
                $(".taxStatistics li:nth-child(3) div:nth-child(2) p:nth-child(3) span").text(parseInt(num*100))
            }
        }
    })

    var toCsh = function () { //跳到初始化
        $('.wrap', jqueryMap.$welcomeDIV).hide();
        $('.wrap1', jqueryMap.$welcomeDIV).show();
        $('.wrap2', jqueryMap.$welcomeDIV).hide();
    }

    var isfirst = function () {
        $.ajax({
            url: configMap.path + '/welcome/if_first',
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                if (result.first === '0') {
                    $firstLoadMask[0].style.display = 'block';
                    $('<img src=' + configMap.path + "/assets/pages/img/guide.png" + ' alt="guide picture">').appendTo($('#firstLoad_m>div'));
                    $('.IKnow', $firstLoadMask).off().on('click', function () {
                        $firstLoadMask.hide();
                    });
                    $.ajax({
                        url: configMap.path + '/welcome/is_first',
                        type: 'GET',
                        dataType: 'json',
                        success: function () {

                        },
                    });
                } else {
                }
            },
        });

    }

    /*
     * 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
     */
    var dateObj = (function () {
        var _date = new Date(); // 默认为当前系统时间
        return {
            getDate: function () {
                return _date;
            },
            setDate: function (date) {
                _date = date;
            }
        };
    })();


    /**
     * 渲染html结构
     */
    function renderHtml() {
        var calendar = document.getElementById("calendar");
        var titleBox = document.createElement("div"); // 标题盒子 设置上一月 下一月 标题
        var bodyBox = document.createElement("div"); // 表格区 显示数据

        // 设置标题盒子中的html
        titleBox.className = 'calendar-title-box';
        titleBox.innerHTML = "<span class='prev-month' id='prevMonth'></span>" +
            "<span class='calendar-title' id='calendarTitle'></span>" +
            "<span id='nextMonth' class='next-month'></span>";
        calendar.appendChild(titleBox); // 添加到calendar div中

        // 设置表格区的html结构
        bodyBox.className = 'calendar-body-box';
        var _headHtml = "<tr>" +
            "<th>日</th>" +
            "<th>一</th>" +
            "<th>二</th>" +
            "<th>三</th>" +
            "<th>四</th>" +
            "<th>五</th>" +
            "<th>六</th>" +
            "</tr>";
        var _bodyHtml = "";

        // 一个月最多31天，所以一个月最多占6行表格
        for (var i = 0; i < 6; i++) {
            _bodyHtml += "<tr>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "</tr>";
        }
        bodyBox.innerHTML = "<table id='calendarTable' class='calendar-table'>" +
            _headHtml + _bodyHtml +
            "</table>";
        // 添加到calendar div中
        calendar.appendChild(bodyBox);
        $(".calendar1 td").each(function () {
            $(this).on("click", function () {
                var clickThis = $(this)
                clickDate(clickThis)
            })
        })
    }

    /**
     * 表格中显示数据，并设置类名
     */
    function showCalendarData() {
        var _year = dateObj.getDate().getFullYear();
        var _month = dateObj.getDate().getMonth() + 1;
        var _dateStr = getDateStr(dateObj.getDate());

        // 设置顶部标题栏中的 年、月信息
        var calendarTitle = document.getElementById("calendarTitle");
        var titleStr = '<span>' + _dateStr.substr(4, 2) + '</span>' + '<span>月，</span>' + '<span>' + _dateStr.substr(0, 4) + '年</span>';

        $("#calendarTitle").append(titleStr)

        // 设置表格中的日期数据
        var _table = document.getElementById("calendarTable");
        var _tds = _table.getElementsByTagName("td");
        var _firstDay = new Date(_year, _month - 1, 1); // 当前月第一天
        for (var i = 0; i < _tds.length; i++) {
            var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
            var _thisDayStr = getDateStr(_thisDay);
            _tds[i].innerText = _thisDay.getDate();
            //_tds[i].data = _thisDayStr;
            _tds[i].setAttribute('data', _thisDayStr);
            if (_thisDayStr == getDateStr(new Date())) { // 当前天
                _tds[i].className = 'currentDay';
            } else if (_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
                _tds[i].className = 'currentMonth'; // 当前月
            } else { // 其他月
                _tds[i].className = 'otherMonth';
            }
        }
    }

    /**
     * 绑定上个月下个月事件
     */
    function bindEvent() {
        var prevMonth = document.getElementById("prevMonth");
        var nextMonth = document.getElementById("nextMonth");
        addEvent(prevMonth, 'click', toPrevMonth);
        addEvent(nextMonth, 'click', toNextMonth);
    }

    /**
     * 绑定事件
     */
    function addEvent(dom, eType, func) {
        if (dom.addEventListener) { // DOM 2.0
            dom.addEventListener(eType, function (e) {
                func(e);
            });
        } else if (dom.attachEvent) { // IE5+
            dom.attachEvent('on' + eType, function (e) {
                func(e);
            });
        } else { // DOM 0
            dom['on' + eType] = function (e) {
                func(e);
            }
        }
    }

    /**
     * 点击上个月图标触发
     */
    function toPrevMonth() {
        var date = dateObj.getDate();
        dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        $("#calendarTitle span").remove()
        showCalendarData();
    }

    /**
     * 点击下个月图标触发
     */
    function toNextMonth() {
        var date = dateObj.getDate();
        dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
        $("#calendarTitle span").remove()
        showCalendarData();
    }

    /**
     * 日期转化为字符串， 4位年+2位月+2位日
     */
    function getDateStr(date) {
        var _year = date.getFullYear();
        var _month = date.getMonth() + 1; // 月从0开始计数
        var _d = date.getDate();

        _month = (_month > 9) ? ("" + _month) : ("0" + _month);
        _d = (_d > 9) ? ("" + _d) : ("0" + _d);
        return _year + _month + _d;
    }


    function clickDate(data) {
        $(".calendar1 td").each(function () {
            if ($(this).hasClass("currentDay")) {
                $(this).removeClass("currentDay").addClass("currentMonth")
            }
        })
        $(data).removeClass("currentMonth").addClass("currentDay")
        var day = $(data).html();
        var mouth = $("#calendarTitle span:nth-child(1)").html();
        var year = $("#calendarTitle span:nth-child(3)").html();
        year = year.substr(0, year.length - 1);
        var thisDate = year + "-" + mouth + "-" + day;
        getRWTX(thisDate);
        $("#calendar").addClass("hide")
    }


    function getRWTX(data) {
        if (!data) {
            var nowDay = $(".currentDay").html();
            var nowMonth = $("#calendarTitle span:nth-child(1)").html();
            var nowYear = $("#calendarTitle span:nth-child(3)").html();
            nowYear = nowYear.substr(0, nowYear.length - 1);
            var nowDate = nowYear + "-" + nowMonth + "-" + nowDay;
            $.ajax({
                url: "/systemmanager/rwgljbxx/getRWList/" + nowDate,
                type: 'GET',
                dataType: 'json',
                success: function (result) {
                    if (result.success) {
                        // var rwMessage;
                        $(".RWTXmain table tbody").remove()

                        var len = 5;
                        if (result.data.length <= 5) {
                            len = result.data.length;
                        }

                        for (var i = 0; i < len; i++) {
                            var status;
                            if (result.data[i].blzt == "001") {
                                status = "<i data='001' class='iconfont icon-duihao1 iconFontColor-10a0f7 iconFontSize' style='margin-right: 5px'></i>已完成"
                            } else if (result.data[i].blzt == "002") {
                                status = "<i data='002' class='iconfont icon-funnel iconFontColor-10a0f7 iconFontSize' style='margin-right: 5px'></i>进行中"
                            } else if (result.data[i].blzt == "003") {
                                status = "<i data='003' class='iconfont icon-cuohao iconFontColor-10a0f7 iconFontSize' style='margin-right: 5px'></i>已取消"
                            } else if (result.data[i].blzt == "004") {
                                status = "<i data='004' class='iconfont icon-shijianzhongbiao iconFontColor-10a0f7 iconFontSize' style='margin-right: 5px'></i>已延迟"
                            } else if (result.data[i].blzt == "005") {
                                status = "<i data='005' class='iconfont icon-kaishi iconFontColor-10a0f7 iconFontSize' style='margin-right: 5px'></i>暂停中"
                            } else if (result.data[i].blzt == "006") {
                                status = "<i data='006' class='iconfont icon-ziyuan iconFontColor-10a0f7 iconFontSize' style='margin-right: 5px'></i>未开始"
                            }
                            var cjsj = Time.f(result.data[i].cjsj).substr(0, 10)
                            var rwMessage = '<tbody><tr data=' + result.data[i].rwid + '><td>' + status + '</td><td>' + result.data[i].rwmc + '</td><td>' + result.data[i].fzrMc + '</td><td>' + cjsj + '</td><td><div class="RWJD"><span>' + result.data[i].rwwcl + '</span><div class="RWJDblue" style="width: ' + result.data[i].rwwcl + '"></div></div></td></tr></tbody>';
                            $(".RWTXmain table").append(rwMessage)


                        }


                        $(".RWTXmain table tr").each(function () {
                            $(this).on("click", function () {
                                var thisRWID = $(this).attr("data");
                                var thisRWZT = $(this).children("td:eq(0)").children("i").attr("data");
                                RWTab(thisRWID, thisRWZT);
                                //openModal('基本信息',  '/systemmanager/taskcenter/taskmanagement/taskDtail.jsp?id=' + encodeURI(thisRWID), 'edit');
                            })
                        })

                    } else {
                        $(".RWTXmain table tbody").remove();
                        var notMessage = '<tbody><tr><td colspan="8">' + result.message + '</td></tr></tbody>';
                        $(".RWTXmain table").append(notMessage)
                    }
                }
            })
        } else {
            $.ajax({
                url: "/systemmanager/rwgljbxx/getRWList/" + data,
                type: 'GET',
                dataType: 'json',
                success: function (result) {
                    if (result.success) {
                        $(".RWTXmain table tbody").remove();
                        var len = 5;
                        if (result.data.length <= 5) {
                            len = result.data.length;
                        }
                        for (var i = 0; i < len; i++) {
                            var status;
                            if (result.data[i].blzt == "001") {
                                status = "<i data='001' class='iconfont icon-duihao1 iconFontColor-10a0f7 iconFontSize' style='margin-right: 5px'></i>已完成"
                            } else if (result.data[i].blzt == "002") {
                                status = "<i data='002' class='iconfont icon-funnel iconFontColor-10a0f7 iconFontSize' style='margin-right: 5px'></i>进行中"
                            } else if (result.data[i].blzt == "003") {
                                status = "<i data='003' class='iconfont icon-cuohao iconFontColor-10a0f7 iconFontSize' style='margin-right: 5px'></i>已取消"
                            } else if (result.data[i].blzt == "004") {
                                status = "<i data='004' class='iconfont icon-shijianzhongbiao iconFontColor-10a0f7 iconFontSize' style='margin-right: 5px'></i>已延迟"
                            } else if (result.data[i].blzt == "005") {
                                status = "<i data='005' class='iconfont icon-kaishi iconFontColor-10a0f7 iconFontSize' style='margin-right: 5px'></i>暂停中"
                            } else if (result.data[i].blzt == "006") {
                                status = "<i data='006' class='iconfont icon-ziyuan iconFontColor-10a0f7 iconFontSize' style='margin-right: 5px'></i>未开始"
                            }
                            var cjsj = Time.f(result.data[i].cjsj).substr(0, 10);
                            var rwMessage = '<tbody><tr data=' + result.data[i].rwid + '><td>' + status + '</td><td>' + result.data[i].rwmc + '</td><td>' + result.data[i].fzrMc + '</td><td>' + cjsj + '</td><td><div class="RWJD"><span>' + result.data[i].rwwcl + '</span><div class="RWJDblue" style="width: ' + result.data[i].rwwcl + '"></div></div></td></tr></tbody>';
                            $(".RWTXmain table").append(rwMessage)
                        }
                        $(".RWTXmain table tr").each(function () {
                            $(this).on("click", function () {
                                var thisRWID = $(this).attr("data");
                                var thisRWZT = $(this).children("td:eq(0)").children("i").attr("data");
                                RWTab(thisRWID, thisRWZT);
                                //openModal('基本信息',  '/systemmanager/taskcenter/taskmanagement/taskDtail.jsp?id=' + encodeURI(thisRWID), 'edit');
                            })
                        })
                    } else {
                        $(".RWTXmain table tbody").remove()
                        var notMessage = '<tbody><tr><td colspan="8">' + result.message + '</td></tr></tbody>';
                        $(".RWTXmain table").append(notMessage)
                    }
                }
            })
        }


    }

    return {
        // 初始化
        init: function (name, ifManager, resources) {
            var chargeStatisticsDefault;
            configMap.name = name;
            configMap.ifManager = ifManager;
            /*configMap.is_first=is_first;*/
            var chartsWidth = $("#welcomeDIV").width() - $("#welcomeDIV").width() * 0.65 - $("#welcomeDIV").width() * 0.38 * 0.455
            $(".chartWrap").height("240px")
            $(".chartWrap").width(chartsWidth)
            // $(".chartWrap").height($(".chartWrap").height())
            setJqueryMap();

            //加载表格与数据
            //SWTXTableGrid();
            //SWTXTableData();

            // 设置calendar div中的html部分
            renderHtml();
            // 表格中显示日期
            showCalendarData();
            // 绑定事件
            bindEvent();
            getRWTX();
            var time, i = 0;
            $(window).resize(function () {
                initWidth();
                taskExecution();
                toKh();
                $.ajax({
                    url: 'welcome/getProfit/'+0,
                    type: 'get',
                    success: function (data) {
                        var lastyear = [];
                        var year = [];
                        for(var i = 0;i<data.lastsjsk.length;i++) {
                            var lastsjsk = data.lastsjsk[i];
                            for(var j = 0;j<data.lastje.length;j++) {
                                lastyear[i] = (parseInt(lastsjsk) - parseInt(data.lastje[j]))
                            }
                        }
                        for(var g = 0;g<data.sjsk.length;g++) {
                            var sjsk = data.sjsk[g];
                            for(var h = 0;h<data.je.length;h++) {
                                year[g] = (parseInt(sjsk) - parseInt(data.lastje[h]))
                            }
                        }
                        grossProfitFun(lastyear,year,data.months);
                    }
                })
                // business();
                // bookkeepingStatistics();
                // tax();
                chargeStatisticsMain(chargeStatisticsDefault);
            });
            //  初始化图表父容器宽度
            var initWidth = function () {
                var w = $(window).width() - 180;
                $('#RWTXTable.taskExecution_right').width(w * 0.14);
                $('#RWTXTable .taskExecution_main').width(w - w * 0.18 - 15 - w * 0.14 - w * 0.24);
                var chartsWidth = $("#welcomeDIV").width() - $("#welcomeDIV").width() * 0.65 - $("#welcomeDIV").width() * 0.38 * 0.455
                $(".chartWrap").height("240px")
                $(".chartWrap").width(chartsWidth)
                // $(".chartWrap").width($(".chartWrap").innerWidth())
                // $(".chartWrap").height($(".chartWrap").innerHeight())
            }

            initWidth();
            taskExecution();
            toKh();
            $.ajax({
                url: 'welcome/getProfit/'+0,
                type: 'get',
                success: function (data) {
                    var lastyear = [];
                    var year = [];
                    for(var i = 0;i<data.lastsjsk.length;i++) {
                        var lastsjsk = data.lastsjsk[i];
                        for(var j = 0;j<data.lastje.length;j++) {
                            lastyear[i] = (parseInt(lastsjsk) - parseInt(data.lastje[j]))
                        }
                    }
                    for(var g = 0;g<data.sjsk.length;g++) {
                        var sjsk = data.sjsk[g];
                        for(var h = 0;h<data.je.length;h++) {
                            year[g] = (parseInt(sjsk) - parseInt(data.lastje[h]))
                        }
                    }
                    grossProfitFun(lastyear,year,data.months);
                }
            })

            // business();
            // bookkeepingStatistics();
            // tax();
            $.ajax({
                url: 'welcome/threeDatas/1/1/',
                type: 'get',
                success: function (data) {
                    chargeStatisticsDefault = {
                        bm:data.bmmc,
                        last:data.lastsk,
                        now:data.thissk
                    }
                    chargeStatisticsMain(chargeStatisticsDefault)
                }
            })
            $.ajax({
                url: 'welcome/findYJBM',
                type: 'get',
                success: function (data) {
                    var option = "";
                    var i;
                    var j;
                    for (i = 0;i<data.bmmc.length;i++){
                        option += "<option>"+data.bmmc[i]+"</option>"
                    }
                    $(".grossProfitTop select").append(option);
                    var b = 1;
                    for(j = 0;j<data.code.length;j++){

                        var a = b + 1;
                        $(".grossProfitTop select option:nth-child("+a+")").attr("value",data.code[j])
                        b++;
                    }
                    var selectOpt = $(".grossProfitTop select option:selected").val();
                    grossProfit(selectOpt)
                    $(".grossProfitTop select").on("change",function () {
                        grossProfit($(".grossProfitTop select option:selected").val())
                    })
                }
            })
            function grossProfit(data) {
                $.ajax({
                    url: 'welcome/getProfit/'+data,
                    type: 'get',
                    success: function (data) {
                        var lastyear = [];
                        var year = [];
                        for(var i = 0;i<data.lastsjsk.length;i++) {
                            var lastsjsk = data.lastsjsk[i];
                            for(var j = 0;j<data.lastje.length;j++) {
                                lastyear[i] = (parseInt(lastsjsk) - parseInt(data.lastje[j]))
                            }
                        }
                        for(var g = 0;g<data.sjsk.length;g++) {
                            var sjsk = data.sjsk[g];
                            for(var h = 0;h<data.je.length;h++) {
                                year[g] = (parseInt(sjsk) - parseInt(data.lastje[h]))
                            }
                        }

                        grossProfitFun(lastyear,year,data.months);
                    }
                })
            }

            function taskExecution() {
                var taskExecution = echarts.init($(" .taskExecution_main")[0]);
                var agentTime = [];
                var agentCount = [];
                var count = [];
                var arr = []; //给环形使用的数据
                var arrs = []; //给颜色使用的数据
                $.ajax({
                    url: '/systemmanager/taskstatistics/searchCountByEmployee/0',
                    type: 'get',
                    success: function (data) {
                        var list = data.searchCountByEmployee;
                        if (list.length != 0) { //不为空值
                            for (var i = 0; i < list.length; i++) {
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
                                } else if (list[i].statCode == '005') {
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
                                //var b = list[i].statCode;
                                arr.push(a);
                                arrs.push(color);
                            }

                            if (arr.length == 0) { //无数据
                                var a = {value: 0, name: "任务总数"};
                                arr.push(a);
                                arrs.push("#ccc");
                            }

                            $('#FirstAllTask').html(data.allTaskNum);

                            $('#FirstIsOver').html(list[0].count);
                            $('#FirstStarting').html(list[1].count);
                            $('#FirstCancled').html(list[2].count);
                            $('#FirstPostponed').html(list[3].count);
                            $('#FirstPaused').html(list[4].count);
                            $('#FirstNotStart').html(list[5].count)

                            $(".taskExecution_right li").each(function () {
                                $(this).on("click", function () {
                                    var BLZTID = $(this).attr("data");
                                    RWTab("", BLZTID);
                                })
                            })


                        }
                        option = {
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            //已完成，进行中，已取消，已延迟，暂停中，未开始
                            //['#97cf6e', '#4ca7ee','#333','#f23a42',"#fc5be3","#fa9700"],
                            color: arrs,
                            series: [
                                {
                                    type: 'pie',
                                    radius: ['40%', '75%'],
                                    center: ['50%', '50%'],
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
                    }
                });
            }
            function chargeStatisticsMain(data) {
                var chargeStatisticsMain1 = echarts.init($(" .chargeStatisticsMain")[0]);
                chargeStatisticsMain1.showLoading({
                    text: "正在努力加载图表数据..."
                });
                var option = {
                    tooltip : {
                        trigger: 'axis'
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : data.bm
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name: '单位：万',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'按月',
                            type:'bar',
                            data:data.last,
                        },
                        {
                            name:'按年',
                            type:'bar',
                            data:data.now,
                        }
                    ]
                };
                chargeStatisticsMain1.hideLoading();
                chargeStatisticsMain1.setOption(option);
            }

            if (configMap.ifManager == "true") { //为true代表是管理员
                $(".taxStatistics").css("width","60.3%").css("marginLeft",0).css("marginRight",0);
                $("#operatebtn").show()
                $('.wrap1', jqueryMap.$welcomeDIV).show();
                // $('.fastEntrance').hide();
                $('.wrap2', jqueryMap.$welcomeDIV).show();
                $(".RWmore a:nth-child(3)").html('<i class="icon iconfont icon-liebiao- iconFontColor-10a0f7 iconFontSize" title="表格"></i>')
                $("#RWTXTable").addClass("hide")
                $(".RWTXmain table").css("display", "none");
                $(".RWTXmain .charts").css("display", "block");
                $(".chargeStatistics").removeClass("hide")
                $(".grossProfit").removeClass("hide")
                $(".charts").addClass("hide")
                $("#switchIndex").parent().removeClass("hide")
                isfirst();
                // time=setInterval(function(){
                // i++;
                // if (i%2==0){
                //        $('.wrap1',jqueryMap.$welcomeDIV).show();
                //        $('.wrap',jqueryMap.$welcomeDIV).hide();
                //        $('.wrap2',jqueryMap.$welcomeDIV).hide();
                // 	}else{
                //        $('.wrap1',jqueryMap.$welcomeDIV).hide();
                //        $('.wrap',jqueryMap.$welcomeDIV).hide();
                //        $('.wrap2',jqueryMap.$welcomeDIV).show();
                // 	}
                // },60000);
            } else {
                // clearInterval(time);
                $("#operatebtn").hide();
                $(".taxStatistics").css("width","37.9%").css("marginRight",0).css("marginLeft","0.6%");
                $(".chargeStatistics").css("width","49.5%");
                $('.wrap1', jqueryMap.$welcomeDIV).hide();
                // $('.fastEntrance').show();
                $('.wrap2', jqueryMap.$welcomeDIV).hide();
                $(".RWmore a:nth-child(3)").html('<i class="icon iconfont icon-tubiao-  iconFontColor-10a0f7 iconFontSize" title="图表"></i>')
                $(".RWTXmain table").css("display", "table");
                $(".RWTXmain .charts").css("display", "none");
                $("#RWTXTable").removeClass("hide");
                $(".chargeStatistics").addClass("hide")
                $(".grossProfit").addClass("hide")
                $(".charts").removeClass("hide")
                $("#switchIndex").parent().addClass("hide")

            }

            //催费提醒
            //CFTX();
            //欠费提醒
            //QFTX();
            //派工提醒
            //PGTX();
            //合同数据
            //HTXX();

            //首页ajax数据加载
            GetFourModelData();
            //图表表格切换
            $(".RWmore a:nth-child(3)").on("click", function () {
                if ($(this).find('i').attr('title') == "图表") {
                    $(".RWTXmain table").css("display", "none");
                    $(".RWTXmain .charts").css("display", "block");
                    $(this).html('<i class="icon iconfont icon-liebiao- iconFontColor-10a0f7 iconFontSize " title="表格"></i>');
                } else {
                    $(".RWTXmain table").css("display", "table");
                    $(".RWTXmain .charts").css("display", "none");
                    $(this).html('<i class="icon iconfont icon-tubiao-  iconFontColor-10a0f7 iconFontSize" title="图表"></i>');
                }

            })
            //日期
            $(".RWmore a:nth-child(2)").on("click", function () {
                if($("#calendar").hasClass("hide")){
                    $("#calendar").removeClass("hide")
                }else{
                    $("#calendar").addClass("hide")
                }
            })

            //根据实收欠收预收
            $(".chargeStatisticsTop select").on("change",function () {
                var thisVal = this.options[this.options.selectedIndex].value;
                var daysData;
                $(".chargeStatisticsTop button:not(:nth-child(3))").each(function () {
                    if($(this).hasClass("colorBlueIndex")){
                        daysData = $(this).attr("data");
                    }
                })
                $.ajax({
                    url: 'welcome/threeDatas/'+thisVal+'/'+daysData,
                    type: 'get',
                    success: function (data) {
                        var chargeStatisticsData = {
                            bm:data.bmmc,
                            last:data.lastsk,
                            now:data.thissk
                        }
                        chargeStatisticsMain(chargeStatisticsData)
                    }
                })
            })

            // 点击刷新
            $(".refreshRWLB").on("click", function () {
                getRWTX();
                taskExecution();
            })
            $(".chargeStatistics div.chargeStatisticsTop div button").each(function () {

                $(this).on("click",function () {
                    $(".chargeStatistics div.chargeStatisticsTop div button").removeClass("colorBlueIndex");
                    $(this).addClass("colorBlueIndex");
                    var daysData =  $(this).attr("data");
                    var optionVal = $(".chargeStatisticsTop select option:selected").val();
                    $.ajax({
                        url: 'welcome/threeDatas/'+optionVal+'/'+daysData,
                        type: 'get',
                        success: function (data) {
                            var chargeStatisticsData = {
                                bm:data.bmmc,
                                last:data.lastsk,
                                now:data.thissk
                            }
                            chargeStatisticsMain(chargeStatisticsData)
                        }
                    })
                })
            })
            /**
             * 打开更多信息展示界面
             */
            $('#BSTX', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                SWTXMore();
            });
            $('#dshht', jqueryMap.$welcomeDIV).off('click').on('click', function () { //合同信息跳转
                if (resources.indexOf("c55572d0-3212-465f-b243-880aefcacb15") >= 0) { //当前用户权限中有客户360
                    HTTXMore();
                } else {
                    Messenger().post({
                        message: '您没有此项权限！',
                        id: "msg_htxx",
                        type: 'warning'
                    });
                }
            });

            $('#dxyht', jqueryMap.$welcomeDIV).off('click').on('click', function () { //待续约合同信息跳转
                if (resources.indexOf("a16785a4-8ed2-4414-afe8-0d3a7fc30efe") >= 0) { //当前用户权限中有合同续约界面
                    HTXYMore();
                } else {
                    Messenger().post({
                        message: '您没有此项权限！',
                        id: "msg_htxy",
                        type: 'warning'
                    });
                }
            });

//            $('#GJTX', jqueryMap.$welcomeDIV).off('click').on('click',function(){
//        	   GJTXMore();
//            });


            $('#CFTX', jqueryMap.$welcomeDIV).off('click').on('click', function () { //催费提醒跳转
                if (resources.indexOf("c55572d0-3212-465f-b243-880aefcacb15") >= 0) { //当前用户权限中有客户360
                    CFTXMore();
                } else {
                    Messenger().post({
                        message: '您没有此项权限！',
                        id: "msg_cftx",
                        type: 'warning'
                    });
                }
            });

            $('#QFTX', jqueryMap.$welcomeDIV).off('click').on('click', function () { //欠费提醒跳转
                if (resources.indexOf("c55572d0-3212-465f-b243-880aefcacb15") >= 0) { //当前用户权限中有客户360
                    QFTXMore();
                } else {
                    Messenger().post({
                        message: '您没有此项权限！',
                        id: "msg_qftx",
                        type: 'warning'
                    });
                }
            });

            $('#PGTX', jqueryMap.$welcomeDIV).off('click').on('click', function () { //派工信息跳转
                if (resources.indexOf("b9df8b20-1fd0-426a-b35a-8f6f9a102799") >= 0) { //当前用户权限中有消息提醒
                    PGTXMore();
                } else {
                    Messenger().post({
                        message: '您没有此项权限！',
                        id: "msg_pgxx",
                        type: 'warning'
                    });
                }
            });

            $('#toKh', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                toKh(); //调到客户设置
                $firstLoadMask.hide();
            });
            $('#toCsh', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                toCsh(); //跳到初始化设置
            });

            $('#QXGL_MDW', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                QXGL();
            });
            $('#BMGL_MDW', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                BMGL();
            });
            $('#GGLXGL_MDW', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                GGLXGL();
            });
            $('#SXSZ_MDW', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                SXSZ();
            });
            $('#KHFL_MDW', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                KHFL();
            });
            $('#LCGL_MDW', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                LCGL();
            });
            $('#YGGL_MDW', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                YGGL();
            });
            //服务项目
            $('#SFXM_MDW', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                SFXM();
            });

            //商机转化率
            $('.conversionOfData p a', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                localStorage.clear();
                var thisData = $(this).closest('p').attr("data");
                localStorage.setItem("zhlType",thisData)
                ZHLMore();

            });

            //记账列表
            function delay(t){
                var tag = 0 ;
                var time = setInterval(function () {
                    tag++;
                    if (tag==t){
                        clearInterval(time);
                    }
                },1000);
            };

            $('.accountingData p a', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                localStorage.clear();
                var thisData = $(this).closest('p').attr("data");
                localStorage.setItem("jzType",thisData);
                JZMore();
                $(this).off('click');
                delay(3);
                $(this).on('click', function () {
                    localStorage.clear();
                    var thisData = $(this).closest('p').attr("data");
                    localStorage.setItem("jzType", thisData);
                    JZMore();
                });
            });

            //报税列表
            $('.taxData p a', jqueryMap.$welcomeDIV).off('click').on('click', function () {
                localStorage.clear();
                var thisData = $(this).closest('p').attr("data");
                localStorage.setItem("bsType",thisData)
                BSMore();
                $(this).off('click');
                delay(3);
                $(this).on('click', function () {
                    localStorage.clear();
                    var thisData = $(this).closest('p').attr("data");
                    localStorage.setItem("bsType", thisData);
                    BSMore();
                });
            });
            //setBSTXCount();
        },
        //保存收费
        SWTXTableData: function () {
            SWTXTableData();
        },
        refreshRW: function () { //更新任务
            getRWTX();
        },
        // refreshBS: function () { //更新报税
        //     setBSTXCount();
        // },
        refreshPG: function () { //更新派工
            PGTX();
        },
        GetFourModelData: function () { //更新4项信息
            GetFourModelData();
        },
    };
}();
//@ sourceURL=edit.js