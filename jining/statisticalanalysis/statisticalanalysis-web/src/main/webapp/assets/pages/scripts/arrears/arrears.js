var arrears = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',//
		dataUrl: '/arrears/arrears',//Controller类中的 @RequestMapping路径/方法名上方的@RequestMapping(value = "????", method = RequestMethod.GET)
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		arrearsGrid: null,
	};

	// 全局Dom
	var jqueryMap = {
		$container: null,
		$blockTarget: null
	};
	//赋值
	var setJqueryMap = function (uuid) {
		jqueryMap.$container = $('#arrears-manager-container'+'_'+uuid);
		jqueryMap.$blockTarget = $('body');
	};
	//初始化表
	var initarrearsData = function () {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在加载数据，请稍候...'
		});
		$.ajax({
			url: configMap.path + configMap.dataUrl,
			dataType: 'JSON',
			type: 'GET',
			success: function (datas) {
				configMap.arrearsGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.arrearsGrid.rows.add(datas).draw();
				}
			},
			error: function () {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};
	var findByTime = function () {
		var starttime = $('#startimeArrears_input').val();
		var endtime = $('#endtimeArrears_input').val();
		starttime = starttime +" 00:00:00";
		endtime =endtime +" 23:59:59";
		$.ajax({
			url:configMap.path+configMap.dataUrl+"/"+starttime+"/"+endtime,
			dataType:'JSON',
			type:'GET',
			success:function(datas){
				configMap.arrearsGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.arrearsGrid.rows.add(datas).draw();
				}
			},
			error : function() {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		})
	}
	
	//初始化表，放入数据
	var initarrearsGrid = function () {
		configMap.arrearsGrid = $('#arrearsData', jqueryMap.$container).DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
			"ajax":{
                "url":configMap.path + configMap.dataUrl,
                "dataSrc":"aaData",
                "data":function(data){
                  var searchText=$('#searchFilter').val();
                  data.searchText=searchText;
				}
            },
			"columns": [
				{"data": "htbm"},//table 列对应的字段名称
				{"data": "yhmc"},
				{"data": "sfxm_mc"},
				{"data": "sjsk",
					"render":function(data,type,row){
						var number = new Number(data);
						return number.toFixed(2);
					}
				},
				{"data": "cfje",
					"render":function(data,type,row){
						var number = new Number(data);
						return number.toFixed(2);
					}
				},
				{"data": "zyxm"},
				{"data": "cfzt",
					"render":function(data,type,row){
						var value="";
						if(data=="001"){
							value="催费";
						}else if(data=="002"){
							value="已交费";
						}else{
							value="欠费";
						}
						return value;
					}
				},
//				{"data": "sfsj",
//	                  'className':'text-center',
//		        	  "render":function(data,type,row){
//		        		  if(data==null){
//		        			  return "";
//		        		  }
//		        		  return moment(data).format('YYYY-MM-DD');
//		        	  }
//		        },
//				{
//					"render": function (data, type, row) {
//		                return ''
//		                  + configMap.editBtn_html
//		                  + configMap.deleteBtn_html
//		                  + configMap.viewBtn_html;
//		              }
//				}
			],
			"language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
			},
			"drawCallback": function () { // 数据加载完成后执行
				var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
				if (tootipContainer.length > 0) {
					tootipContainer.tooltip();
				}

			}
		});
	};

	return {
		init: function (uuid) {
			setJqueryMap(uuid);
			var tabid=$('#arrears-manager-container_' + uuid).parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);
			initarrearsGrid();
			/*nitarrearsData();*/
			/*$('#searchFilter', jqueryMap.$container).on('keyup', function () {
		        configMap.arrearsGrid.search(this.value).draw();
		    });*/
			$('#searchFilter1').off('click').on('click',function () {
				configMap.arrearsGrid.ajax.reload();
            })
//			$('#findByTimeArrears').off('click').on('click',function(){
//				var starttime = $('#startimeArrears_input').val();
//				var endtime = $('#endtimeArrears_input').val();
////				console.log(starttime,endtime)
//				if(starttime==''||endtime==''){
//					console.log(starttime,endtime)
//					Messenger().post({message: '查询日期不能为空！', type: 'error',id:"jszmd"});
//				}else if (starttime>=endtime){
//					Messenger().post({message: '请输入正确的结束日期！', type: 'error',id:"jszmd"});
//				}else{
//					findByTime();
//				}
//			});
//			$('#startimeArrears').datepicker({
//                clearBtn: true,
//                format: 'yyyy-mm-dd',
//                autoclose: true,
//                language: 'zh-CN',
//            	defaultDate : new Date()
//            });
//            $('#endtimeArrears').datepicker({
//                clearBtn: true,
//                format: 'yyyy-mm-dd',
//                autoclose: true,
//                language: 'zh-CN',
//            	defaultDate : new Date()
//            });
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
