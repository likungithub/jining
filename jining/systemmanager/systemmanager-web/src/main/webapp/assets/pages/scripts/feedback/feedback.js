var feedback = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',//
		more:'',
		dataUrl: '/feedback/feedback',//Controller类中的 @RequestMapping路径/方法名上方的@RequestMapping(value = "????", method = RequestMethod.GET)
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		feedBackGrid: null,
		editPageUrl: '/feedback/editfeedback.jsp',
		viewPageUrl:'/feedback/viewfeedback.jsp',
		editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑沟通反馈"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
		deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除沟通反馈"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
		viewBtn_html:'<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看沟通反馈"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>'
	};

	// 全局Dom
	var jqueryMap = {
		$container: null,
		$blockTarget: null,
		$feedbackDialog: null
	};
	//赋值
	var setJqueryMap = function (uuid) {
		jqueryMap.$container = $('#feedback-manager-container'+'_'+uuid);
		jqueryMap.$blockTarget = $('body');
	};
	//查看沟通反馈
	var viewFeedback = function () {
		var el = $(this);
		var rowIndex = configMap.feedBackGrid.cell(el.parent()).index().row;
		var id = configMap.feedBackGrid.row(rowIndex).data().id;
        var fkbz = configMap.feedBackGrid.row(rowIndex).data().fkbz;
		openModal("查看意见反馈信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id)+"&fkbz="+encodeURI(fkbz), 'view');
	};

	//初始化表
	var initfeedbackData = function () {
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
				configMap.feedBackGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.feedBackGrid.rows.add(datas).draw();
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
		if (type === 'edit') {
			dialogButtons.success = {
				label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
				className: "btn btn-success btnBlue borderRadius4 colorfff",
				callback: function () {
					feedBackEdit.saveFeedback(function (result) {
						if (result) {
							/*initfeedbackData();*/
							configMap.feedBackGrid.ajax.reload();
							jqueryMap.$feedbackDialog.modal('hide');
						}
					});

					return false;
				}
			};
		}

        dialogButtons.cancel={
            label: '<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
                className: 'btn btn-default borderRadius4'
        }

		$.get(url, function (html) {
			jqueryMap.$feedbackDialog = bootbox.dialog({
				title: title,
				message: html,
				buttons: dialogButtons,
				className:'feedback-dialog-m'
			});
		});
	};
	//修改沟通反馈答复标志
	var editFeedback = function () {
		var el = $(this);
		var rowIndex = configMap.feedBackGrid.cell(el.parent()).index().row;
		var id = configMap.feedBackGrid.row(rowIndex).data().id;
		var fkbz= configMap.feedBackGrid.row(rowIndex).data().fkbz;
		openModal('编辑沟通反馈', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id)+"&fkbz="+ encodeURI(fkbz), 'edit');
	};


	//删除沟通反馈
	var delFeedback = function (event, element) {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在删除数据，请稍候...'
		});

		var rowIndex = configMap.feedBackGrid.cell(element.parent()).index().row;
		var id = configMap.feedBackGrid.row(rowIndex).data().id;
        var fkbz= configMap.feedBackGrid.row(rowIndex).data().fkbz;
		$.ajax({
			url: configMap.path + configMap.dataUrl + "/" + id+"?fkbz="+fkbz,
			type: 'DELETE',
			success: function (result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result.success) {
					/*initfeedbackData();*/
					configMap.feedBackGrid.ajax.reload();
					Messenger().post("删除成功!");
				}
				else {
					Messenger().post({
						message: result.message,
						type: 'error'
					});
				}
			},
			error: function () {
				App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};
	var findByTime = function () {
		var starttime = $('#startimeFeedback_input').val();
		var endtime = $('#endtimeFeedback_input').val();
		starttime = starttime +" 00:00:00";
		endtime =endtime +" 23:59:59";
		$.ajax({
			url:configMap.path+configMap.dataUrl+"/"+starttime+"/"+endtime,
			dataType:'JSON',
			type:'GET',
			success:function(datas){
				configMap.feedBackGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.feedBackGrid.rows.add(datas).draw();
				}
			},
			error : function() {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		})
	}
	//初始化表，放入数据
	var initfeedBackGrid = function () {
		configMap.feedBackGrid = $('#feedback_data', jqueryMap.$container).DataTable({
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
					var startTime=$('#startimeFeedback_input',jqueryMap.$container).val();
					var endTime=$('#endtimeFeedback_input',jqueryMap.$container).val();
					var searchText=$('#searchFilter',jqueryMap.$container).val();
					var more = configMap.more;
					data.startTime=startTime;
					data.endTime=endTime;
					data.searchText=searchText;
					data.more=more;
				}
			},
			"columns": [
				{"data": "sjlx",
					"render":function(data,type,row){
						var value="";
						if(data=="1"){
							value="Andriod";
						}else{
							value="IOS";
						}
						return value;
					}
				},//table 列对应的字段名称
				{"data": "khbm"},
                {"data": "gsmc"},
                {"data": "yhdh"},
				{"data": "fkxx"},
				{	className:'text-center',
					"data": "fkrq",
					"render":function(data,type,row){
						return moment(data).format('YYYY-MM-DD');
					}
				},
				{	className:'text-center',
					"data": "dfbz",
					"render":function(data,type,row){
						var value="";
						if(data=="0"){
							value="未答复";
						}else{
							value="已答复";
						}
						return value;
					}
				},
                {	className:'text-center',
                    "data": "fklx"
                },
                {
                	className:'text-center',
					"data": "fkbz"
				},
				{	className:'text-center',
					"render": function (data, type, row) {
		                return ''
						  + configMap.viewBtn_html
		                  + configMap.editBtn_html
		                  + configMap.deleteBtn_html;
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
				var editContainer = $('[data-type="edit"]', jqueryMap.$container);
				var delContainer = $('[data-type="del"]', jqueryMap.$container);
				var viewContainer = $('[data-type="view"]', jqueryMap.$container);

				if (tootipContainer.length > 0) {
					tootipContainer.tooltip();
				}

				if (editContainer.length > 0) {
					editContainer.off('click').on('click', editFeedback);
				}

				if (delContainer.length > 0) {
					delContainer.confirmation({
						"title": '确定要删除？',
						"btnOkLabel": '是',
						"btnCancelLabel": '否',
						"placement": 'left',
						"onConfirm": delFeedback,
                        "btnOkClass":'btn btn-danger borderRadius4',
                        "btnCancelClass":"btn btn-default borderRadius4"

					});
				}
				
				if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewFeedback);
				}
			}
		});
	};

	return {
		init: function (uuid) {
			configMap.more=0;
			setJqueryMap(uuid);
			initfeedBackGrid();
			/*initfeedbackData();*/
			/*$('#searchFilter', jqueryMap.$container).on('click', function () {
			 configMap.feedBackGrid.ajax.reload();
			 });*/

            $('#moreSearchByWsAndMdw004').on('click',function () {
                $('.contentBgColor img[alt="arrow"]').toggleClass('rotate1');
                $('#feedback-manager-containermoreCondition').toggle(200);
            });
			$('#startimeFeedback').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
            $('#endtimeFeedback').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
            $('#findByTimeFeedback').off('click').on('click',function(){
                    configMap.feedBackGrid.ajax.reload();
			});
        /*//自定义搜索   
        $.fn.dataTable.ext.search.pop();//清空
        $.fn.dataTable.ext.search.push(
    	      function( settings, data, dataIndex ) {
    	    	  var start = $('#startimeFeedback_input').val().format('YYYY-MM-DD');//开始时间
    	    	  var end = $('#endtimeFeedback_input').val().format('YYYY-MM-DD');//结束时间
    	    	  var age = data[3]; // 要匹配的日期列，下标0开始
    	          if(start==""||end==""){
    	        	 return true; //显示
    	          }else if(start<=age&&end>=age){
    	        	  return true; 
    	          }
    	          return false;//不显示
    	      }
    	    );
        //日期改变刷新表单
    	$('#startimeFeedback,#endtimeFeedback').change( function() {
    		configMap.feedBackGrid.draw();
        } );*/
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
