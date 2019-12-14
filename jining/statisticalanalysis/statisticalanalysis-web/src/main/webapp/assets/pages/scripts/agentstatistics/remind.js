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
var remindagent = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/agentstatistics/remind',
        dljgbm: '',
        contractGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractForm: null,
        $setimg: null,
        $datatable:null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#remindForm');
        jqueryMap.$datatable = $('#remind_data');
    };

    //初始化表格
    var initcontractGrid = function () {
        configMap.contractGrid = jqueryMap.$datatable.DataTable({
        	"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			"ordering": false,
			"destroy": true,
			"lengthMenu": [5],
			"autoWidth": false,
            "columns": [
                {
                	className:"text-center",
                    "data": "cfbh"
                },
                {
                	className:"text-center",
                    "data": "txfs",
                    "render": function (data, type, row) {
                    	if(data=="0"){
                    		return "电话";
                    	} else if(data=="1"){
                    		return "短信";
                    	} else if(data=="2"){
                    		return "微信";
                    	} else if(data=="3"){
                    		return "邮件";
                    	}
                    }
                },
                {
                	className:"text-center",
                    "data": "cfnr",
                    "render":function (data,type,row){
                    	if(data.length>10){
                    		return '<label title="'+data+'">'+data.substring(0, 10)+'...</label>';
                    	} else {
                    		return '<label title="'+data+'">'+data+'</label>';
                    	}
                    }
                },
                {
                	className:"text-center",
                    "data": "cfsj",
                    "render": function (data, type, row) {
                    	if (data != null) {
                            return moment(data).format('YYYY-MM-DD');
                        } else {
                            return "";
                        }
                    }
                },
                {
                	className:"text-center",
                    "data": "lrrmc",
                },
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
            }
        });
    };
    //初始化表格
    var initcontractData = function () {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        var data = {
        		dljgbm:configMap.dljgbm
        }
        $.ajax({
            url: configMap.path + configMap.dataUrl,
            contentType: 'application/json; charset=utf-8',
            type: 'PUT',
            data: JSON.stringify(data),
            success: function (datas) {
                App.unblockUI(jqueryMap.$blockTarget);
                configMap.contractGrid.clear().draw();
                return configMap.contractGrid.rows.add(datas).draw();
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var saveremind = function (){
    	var data = {
    			dljgbm:configMap.dljgbm,
    			cfsj:$('[name="sfnf"]',jqueryMap.$contractForm).val(),
    			txfs:$('[name="txfs"]',jqueryMap.$contractForm).val(),
    			txnr:$('[name="tbsx"]',jqueryMap.$contractForm).val()
    	}
    	$.ajax({
            url: configMap.path + configMap.dataUrl,
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            data: JSON.stringify(data),
            success: function (datas) {
                App.unblockUI(jqueryMap.$blockTarget);
                if(datas.success){
                	$('[name="sfnf"]',jqueryMap.$contractForm).val("");
                	$('[name="tbsx"]',jqueryMap.$contractForm).val("");
                	initcontractData();
                } else {
                	Messenger().post({
						message: datas.message,
						id:"dispatchmessage",
						type: 'error'
					});
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    
    var checkinfo = function (){
    	if($('[name="sfnf"]',jqueryMap.$contractForm).val()==""){
    		App.alert({
                container: jqueryMap.$contractForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请选择催费时间！",
                icon: 'fa fa-info'
            });
    		return false;
    	} else if ($('[name="txfs"]',jqueryMap.$contractForm).val()==""){
    		App.alert({
                container: jqueryMap.$contractForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请选择提醒方式！",
                icon: 'fa fa-info'
            });
    		return false;
    	} else if ($('[name="tbsx"]',jqueryMap.$contractForm).val()==""){
    		App.alert({
                container: jqueryMap.$contractForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "请填写提醒内容！",
                icon: 'fa fa-info'
            });
    		return false;
    	} else if ($('[name="tbsx"]',jqueryMap.$contractForm).val()!="" && $('[name="tbsx"]',jqueryMap.$contractForm).val().length > 500) {
    		App.alert({
                container: jqueryMap.$contractForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: "提醒内容不得超过500字！",
                icon: 'fa fa-info'
            });
    		return false;
    	} else {
    		return true;
    	}
    };
    return {
        // 初始化
        init: function (dljgbm) {
            //客户编码
            configMap.dljgbm = dljgbm;
            setJqueryMap();
            $('.sfnf',jqueryMap.$contractForm).datepicker({
            	format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN',
                clearBtn: true,
            });
            //获取已有催费记录
            initcontractGrid();
            initcontractData();
        },

        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        
        saveremind:function (callback){
        	if(checkinfo()){
        		saveremind(callback);
        	} else {
        		callback(false);
        	}
        }
    };
}();
//@ sourceURL=edit.js