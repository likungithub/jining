var appcustomerinfo = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',//
		more:'',
		dataUrl: '/appcustomerinfo/appcustomerinfo',//Controller类中的 @RequestMapping路径/方法名上方的@RequestMapping(value = "????", method = RequestMethod.GET)
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		appcustomerinfoGrid: null,
		viewPageUrl:'/appcustomerinfo/viewappcustomerinfo.jsp',
		viewBtn_html:'<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看详情"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>'
	};

	// 全局Dom
	var jqueryMap = {
		$container: null,
		$blockTarget: null,
		$appcustomerinfoDialog: null
	};
	//赋值
	var setJqueryMap = function (uuid) {
		jqueryMap.$container = $('#appcustomerinfo-manager-container'+'_'+uuid);
		jqueryMap.$blockTarget = $('body');
	};
	//查看详情
	var viewappcustomerinfo = function () {
		var el = $(this);
		var rowIndex = configMap.appcustomerinfoGrid.cell(el.parent()).index().row;
		var id = configMap.appcustomerinfoGrid.row(rowIndex).data().id;
		openModal("查看客户信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
	};
	//初始化表
	var initappcustomerinfoData = function () {
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
				configMap.appcustomerinfoGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.appcustomerinfoGrid.rows.add(datas).draw();
				}
			},
			error: function () {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};
	//模态框
	var openModal = function (title, url, type) {
		var dialogButtons = {};
        dialogButtons.cancel={
            label: '<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
                className: 'btn btn-default borderRadius4'
        }
		$.get(url, function (html) {
			jqueryMap.$appcustomerinfoDialog = bootbox.dialog({
				title: title,
				message: html,
				buttons: dialogButtons,
				className:'appcustomerinfo-dialog-m'
			});
		});
	};
	//初始化表，放入数据
	var initappcustomerinfoGrid = function () {
		configMap.appcustomerinfoGrid = $('#appcustomerinfo_data', jqueryMap.$container).DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
			"ajax":{
				"url":configMap.path+configMap.dataUrl,
                "dataSrc":"aaData",
                "data":function(data){
                    var starttime = $('#startimeAppcustomerinfo_input').val();
                    var endtime = $('#endtimeAppcustomerinfo_input').val();
                    var searchText =	$('#searchFilter',jqueryMap.$container).val();
                    var more = configMap.more;
                    data.startTime=starttime;
                    data.endTime=endtime;
                    data.searchText=searchText;
                    data.more=more;

					}
                },
			"columns": [
				{"data": "khbm"},//table 列对应的字段名称
				{"data": "dlzh"},
				{"data": "yhmc"},
				{"data": "gsmc"},
				{"data": "nsrsbh"},
				{"data": "zcrq",
	                  'className':'text-center',
		        	  "render":function(data,type,row){
		        		  return moment(data).format('YYYY-MM-DD');
		        	  }
		        },
				{
					"render": function (data, type, row) {
		                return ''
		                  +configMap.viewBtn_html;
		              }
				}
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
				var viewContainer = $('[data-type="view"]', jqueryMap.$container);

				if (tootipContainer.length > 0) {
					tootipContainer.tooltip();
				}
				
				if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewappcustomerinfo);
				}
			}
		});
	};

	var findByTime = function () {
		var starttime = $('#startimeAppcustomerinfo_input').val();
		var endtime = $('#endtimeAppcustomerinfo_input').val();
		starttime = starttime +" 00:00:00";
		endtime =endtime +" 23:59:59";
		$.ajax({
			url:configMap.path+configMap.dataUrl+"/"+starttime+"/"+endtime,
			dataType:'JSON',
			type:'GET',
			success:function(datas){
				configMap.appcustomerinfoGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.appcustomerinfoGrid.rows.add(datas).draw();
				}
			},
			error : function() {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		})
	}
	return {
		init: function (uuid) {
			configMap.more=0;
			setJqueryMap(uuid);
			initappcustomerinfoGrid();
		/*	initappcustomerinfoData();*/
		/*	$('#searchFilter', jqueryMap.$container).on('keyup', function () {
		        configMap.appcustomerinfoGrid.search(this.value).draw();
		    });*/
			$('#findByTimeAppcustomerinfo').off('click').on('click',function(){
				/*var starttime = $('#startimeAppcustomerinfo_input').val();
                var endtime = $('#endtimeAppcustomerinfo_input').val();
                if(starttime==''||endtime==''){
                    Messenger().post({message: '查询日期不能为空！', type: 'error'});
                }else{
                    findByTime();
                }*/
				configMap.appcustomerinfoGrid.ajax.reload();
			});
			$('#startimeAppcustomerinfo').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
            $('#endtimeAppcustomerinfo').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
            $('#moreSearchByWsAndMdw001').on('click',function () {
                $('.contentBgColor img[alt="arrow"]').toggleClass('rotate1');
                $('.contentBgColor .moreCondition').toggle(200);
            });
        //自定义搜索   
        /*$.fn.dataTable.ext.search.pop();//清空
        $.fn.dataTable.ext.search.push(
    	      function( settings, data, dataIndex ) {
    	    	  var start = $('#startimeAppcustomerinfo_input').val().format('YYYY-MM-DD');//开始时间
    	    	  var end = $('#endtimeAppcustomerinfo_input').val().format('YYYY-MM-DD');//结束时间
    	    	  var age = data[5]; // 要匹配的日期列，下标0开始
    	          if(start==""||end==""){
    	        	 return true; //显示
    	          }else if(start<=age&&end>=age){
    	        	  return true; 
    	          }
    	          return false;//不显示
    	      }
    	    );
        //日期改变刷新表单
    	$('#startimeAppcustomerinfo,#endtimeAppcustomerinfo').change( function() {
    		configMap.appcustomerinfoGrid.draw();
        } );*/
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
