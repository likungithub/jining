/**
 * Created by huxinquan on 2017/7/4.
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

/*global $, App, moment, jQuery, bootbox, _ */
var viewWorkOrder = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/workordermanager/updateworkorder',
        filedataUrl:'/workordermanager/workorderfile',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        id: '',
        dljgBm:'',
        contractGrid:null,
        downloadBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="download" data-toggle="tooltip" title="下载">下载</a>',
    };

    // 全局Dom
    var jqueryMap = {
    	$blockTarget: null,
    	$setimg:null,
        $userinfoForm: null
    };

    var setJqueryMap = function () {
    	jqueryMap.$blockTarget = $('body');
        jqueryMap.$workorderForm = $('#workOrder_m');
    };
    
    var checkinfo = function (){
    	if($('textarea[name="clfk"]').val()==null||$('textarea[name="clfk"]').val()==""){
    		App.alert({
				container : jqueryMap.$workorderForm.closest(".modal-body"),
				place : 'prepend',
				type : 'danger',
				message :"处理反馈不能为空！",
				icon : 'fa fa-warning'
			});
    		return false;
    	} else {
    		return true;
    	}
    };
    
    var saveUserInfo = function (callback){
    	var data = {
    			clfk: jqueryMap.$workorderForm.find('textarea[name="clfk"]').val(),
    	}
    	var blockTarget = jqueryMap.$workorderForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
    	$.ajax({
            url: configMap.path + configMap.dataUrl + "/" + configMap.id,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data: JSON.stringify(data),
            success: function (result) {
                App.unblockUI(blockTarget);
                if(result.success){
                	callback(true);
                } else {
                	App.alert({
                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: result.message,
                        icon: 'fa fa-warning'
                    });
                	callback(false);
                }
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$workorderForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
                callback(false);
            }
        });
    }
    
    //获取信息
    var getGdglJbxx = function (){
    	$.ajax({
            url: configMap.path + configMap.dataUrl + "/" + configMap.id,
            type: 'GET',
            success: function (data) {
            	$('input:radio[name="yxjdm"][value="'+ data.yxj +'"]').iCheck("check");
            	$('.wtms').val(data.wtms);
            	$('input[name="sjhm"]').val(data.sjhm);
            	$('input[name="dzyx"]').val(data.dzyx);
            	$('.clfk').val(data.clfk);
            	if(data.dljg_bm==configMap.dljgBm){			//如果当前为代理机构查看
            		if(data.clzt_dm=="0"){					//出里状态未处理时，不展示处理反馈结果
            			$(".clfk").parent('.input-group').css("display","none");
            		} else {								//已处理时，去除必填符号
            			$(".clspan").css("display","none");
            		}
            	} else {									//如果为平台管理员查看
            		if(data.clzt_dm=="1"){					//如果处理状态为已处理，设置无法修改处理反馈，去除必填符号
                		$(".clfk").attr("disabled","disabled");
                		$(".clspan").css("display","none");
                	}
            	}
            },
        });
    }
    var initworkorderGrid = function(){
		configMap.contractGrid = $('#workorderfile_data').DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			"ordering": false,
			"destroy": true,
			"lengthMenu": [5],
			"autoWidth": false,
			"columns": [
				{
					className:'text-center',
					"data": "fjmc"
				},
				{
					className:'text-center',
					"render": function (data, type, row) {
						return '<a href="' + row.fjcclj + '" class="btn btn-xs default" data-type="download" data-toggle="tooltip" title="下载" download="' + row.fjmc + '">下载</a>';
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
				var downloadContainer = $('[data-type="download"]');
				if (downloadContainer.length > 0) {
//					downloadContainer.off('click').on('click', editParams);
				}
			}
		});
    }
    var editParams=function (){
    	
    }
    var initworkorderData = function () {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在加载数据，请稍候...'
		});
		$.ajax({
			url:configMap.path + configMap.filedataUrl + "/" +configMap.id,
			dataType: 'JSON',
			type: 'GET',
			success: function (datas) {
				configMap.contractGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.contractGrid.rows.add(datas).draw();
				}
			},
			error: function () {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};	
    return {
        // 初始化
        init: function (id,dljgBm) {
        	configMap.id = id;
        	configMap.dljgBm = dljgBm;
            setJqueryMap();
            getGdglJbxx();
            initworkorderGrid();
            initworkorderData();
            $('input[name="yxjdm"]').iCheck({
                radioClass: 'iradio_minimal',
                increaseArea: '20%'
            });
            $('input[name="yxjdm"]').iCheck('disable');
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveworkorder:function (callback){
        	//校验输入内容
        	if (checkinfo()) {
                saveUserInfo(callback);
            } else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=userinfoedit.js