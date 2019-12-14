/**
 * Created by xinl on 2017/7/31.
 */
/*jshint
 strict:true,
 noempty:true,
 noarg:true,
 eqeqeq:true,
 browser:true,
 bitwise:true,
 curly:true,
 undef:true,
 nonew:true,
 forin:true */

/*global $, App, moment, jQuery, bootbox, startpictureEdit */
var startpicture = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UniqueID: '',
        dataUrl: '/startPicture',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        startPictureGrid: null,
        searchStartPicture: '',
        editPageUrl: '/startpicture/startpictureedit.jsp',
        viewPageUrl: '/startpicture/startpictureview.jsp',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑启动图"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除启动图"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看启动图"><i class="icon iconfont icon-xiangqing1  iconFontColor-10a0f7 iconFontSize"></i></a>',
        checkbox_html: '<input type="checkbox" class="group-checkbox" data-type="check" data-toggle="tooltip" />'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $startpictureDialog: null,
        $startPicture: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$startPicture = $('#startPicture_' + configMap.UniqueID);
    };

    /**
     * 所有启动图
     */
    var initStartPictureData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/findAllStartPicture',
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.startPictureGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.startPictureGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    /**
     * 弹出框
     * @param title
     * @param url
     * @param type
     */
    var openModal = function (title, url, type) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save iconMr"></i> 保存 ',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    startpictureEdit.saveStartPicture(function (result) {
                        if (result) {
                            configMap.startPictureGrid.ajax.reload();
                            jqueryMap.$startpictureDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label :'<i class="fa fa-times iconMr"></i> 关闭 ',
            className: 'btn btn-default borderRadius4 color666 '
        };

        $.get(url, function (html) {
            jqueryMap.$startpictureDialog = bootbox.dialog({
                className:'common-pro-modal',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    /**
     * 查看启动图
     */
    var viewStartPicture = function () {
        var el = $(this);
        var rowIndex = configMap.startPictureGrid.cell(el.parent()).index().row;
        var id = configMap.startPictureGrid.row(rowIndex).data().id;
        openModal("查看启动图", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
    };

    /**
     * 添加启动图
     */
    var addStartPicture = function () {
        openModal('添加启动图', configMap.path + configMap.editPageUrl, 'edit');
    };

    /**
     * 编辑启动图
     */
    var editStartPicture = function () {
        var el = $(this);
        var rowIndex = configMap.startPictureGrid.cell(el.parent()).index().row;
        var id = configMap.startPictureGrid.row(rowIndex).data().id;
        openModal('编辑启动图', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
    };

    /**
     * 删除启动图
     * @param event
     * @param element
     */
    var delStartPicture = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });

        var rowIndex = configMap.startPictureGrid.cell(element.parent()).index().row;
        var id = configMap.startPictureGrid.row(rowIndex).data().id;

        $.ajax({
            url:  configMap.path + configMap.dataUrl
			+ "/deleteappstart/" + id,
            type: 'DELETE',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    configMap.startPictureGrid.ajax.reload();
                    Messenger().post("删除成功!");
                }
                else {
                    Messenger().post({
                        message: "删除成功!",
                        type: 'error'
                    });
                }
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    /**
     * 初始化
     */
    var initStartPictureGrid = function () {
        configMap.startPictureGrid = jqueryMap.$startPicture.find('#startPicture_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax":{
                "url":configMap.path + configMap.dataUrl + '/findAllStartPicture',
                "dataSrc":"aaData",
                "data":function(data){
                    var searchText=$('#searchFilter1',jqueryMap.$startPicture).val();
                    var more=configMap.more;
                    var begin=$('#startimeInputapp',jqueryMap.$startPicture).val();
                    var end =$('#endtimeInputapp',jqueryMap.$startPicture).val();
                    var applx =$('#applx_id',jqueryMap.$startPicture).val();


                    data.searchText=searchText;
                    data.more=more;
                    data.begin=begin;
                    data.end=end;
                    data.applx=applx;
                }
            },
            "columns": [
				{'className' : 'text-center',
					"render" : function(data, type, row) {
						return configMap.checkbox_html;
					}
				},                     
                {"data": "tpmc"},
                {"data": "tpms"},
                {"data": "qdtzt",
                className:'text-center',
                },
                {"data": "applx",
                    className:'text-center',
                    "render": function (data, type, row) {
                        var str = "";
                        if(data=='0'){
                            str = "客户APP";
                        }else{
                            str = "会计APP";
                        }
                        return str;
                    }
                },
                {   className:'text-center',
                    "data": "lrrq",
                    "render": function (data, type, row) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                },
                {   className:'text-center',
                    "render": function (data, type, row) {
                        return configMap.viewBtn_html + configMap.editBtn_html + configMap.deleteBtn_html ;
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$startPicture);
                var editContainer = $('[data-type="edit"]', jqueryMap.$startPicture);
                var delContainer = $('[data-type="del"]', jqueryMap.$startPicture);
                var viewContainer = $('[data-type="view"]', jqueryMap.$startPicture);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editStartPicture);
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delStartPicture,
                        "btnOkClass":'btn btn-danger borderRadius4',
                        "btnCancelClass":"btn btn-default borderRadius4"
                    });
                }

                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewStartPicture);
                }
            }
        });
    };

  //批量删除
	var deleteBatchAppStart = function () {
		var id = '';
		jqueryMap.$startPicture.find(':checked[data-toggle="tooltip"]').each(function () {
            var el = $(this);
            var rowIndex = configMap.startPictureGrid.cell(el.parent()).index().row;
            var ids = configMap.startPictureGrid.row(rowIndex).data().id;
            id += ids + ',';
		});
		if(id==''){
			Messenger().post({message: '请选择要删除的数据！', type: 'error'});
		}else{
			$.ajax({
				url : configMap.path +configMap.dataUrl +"/deleteappstart/"+id,
				type : 'DELETE',
				success : function(result) {
					App.unblockUI(jqueryMap.$blockTarget);
					if (result) {
                        configMap.startPictureGrid.ajax.reload();
						Messenger().post("删除成功!");
					} else {
						Messenger().post({
							message : "删除失败!",
							type : 'error'
						});
					}
				},
				error : function() {
					App.unblockUI(jqueryMap.$blockTarget);
				}
			});
			$('#allCheck').attr("checked", false);
		}
	};
    /**
     * 搜索启动图
     */
   /* var searchStartPictureByText = function () {
        configMap.searchStartPicture = jqueryMap.$startPicture.find("#searchStartPicture");
        configMap.searchStartPicture.on('blur', function () {
            var searchText = configMap.searchStartPicture.val();
            if (searchText !== '') {
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/searchStartPictureByText?searchText=" + searchText,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function (datas) {
                        configMap.startPictureGrid.clear().draw();
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (datas.length > 0) {
                            return configMap.startPictureGrid.rows.add(datas).draw();
                        }
                    },
                    error: function () {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            } else {
                initStartPictureData();
            }
        });
    };*/

    return {
    	init : function(UniqueID) {
    	    configMap.more="0";
			configMap.UniqueID = UniqueID;
			setJqueryMap();
			initStartPictureGrid();
			var tabid=$('#startPicture_'+UniqueID).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid);
            $('#moreSearchByWsAndMdw002').on('click',function () {
                $('.contentBgColor img[alt="arrow"]').toggleClass('rotate1');
                $('#moreConditionInstartPicture').toggle(200);
            });
           /* jqueryMap.$startPicture.find('#allCheckaa').off('click').on('click', function () {
		          if (this.checked) {
		              jqueryMap.$startPicture.find($('[data-type="check"]')).prop("checked", true);
		          } else {
		              jqueryMap.$startPicture.find($('[data-type="check"]')).prop("checked", false);
		          }
	        });*/
			/*searchStartPictureByText();*/
			jqueryMap.$startPicture.find('#btnNew').off('click').on('click',
					function() {
						addStartPicture();
					});
			/*$('#searchFilter', jqueryMap.$startPicture).on('click', function () {
		        /!*configMap.startPictureGrid.search($('#searchFilter1', jqueryMap.$startPicture).val()).draw();*!/

		    });*/
			$('#searchFilter',jqueryMap.$startPicture).off('click').on('click',function () {
                configMap.startPictureGrid.ajax.reload();
            })
			$('#startimeAppStart').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
            $('#endtimeAppEnd').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
			/* //自定义搜索
            $.fn.dataTable.ext.search.pop();//清空
            $.fn.dataTable.ext.search.push(
        	      function( settings, data, dataIndex ) {
        	    	  var start = $('#startimeInputapp').val().format('YYYY-MM-DD');//开始时间
        	    	  var end = $('#endtimeInputapp').val().format('YYYY-MM-DD');//结束时间
        	    	  var age = data[4]; // 要匹配的日期列，下标0开始
        	    	  /!*console.info("start:"+start);
        	    	  console.info("end:"+end);*!/
        	          if(start==""||end==""){
        	        	 return true; //显示
        	          }else if(start<=age&&end>=age){
        	        	  return true; 
        	          }
        	          return false;//不显示
        	      }
        	    );*/
          /*  //日期改变刷新表单
        	$('#startimeAppStart,#endtimeAppEnd').change( function() {
        		configMap.startPictureGrid.draw();
            } );*/
        	$('#deleteStartpicture').off('click').on('click',function(){
        		deleteBatchAppStart();
        	})
		},
		
		setPath : function(path) {
			configMap.path = path;
		}
	};
}();
