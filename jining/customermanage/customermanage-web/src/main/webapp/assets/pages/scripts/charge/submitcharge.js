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
var submitChargeAudit = function () {
    'use strict';
    /**
	 * 全局属性参数
     */
    var configMap = {
        path: '',
        dataUrl: '/charge/chargelist',
        editUrl: '/charge/editcharge',
        id: '',
        type:'',
        ispay:null,
        orderNumber:'',
        size:null
    };

    /**
	 * 全局Dom
     * @type {{$blockTarget: null, $contractForm: null, $setimg: null}}
     */
    var jqueryMap = {
    		$blockTarget: null,
			$contractForm: null,
			$setimg:null
    };

    var setJqueryMap = function () {
    	jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#submit_m');
    };

    /**
	 * 保存审核
     * @param callback
     */
	var saveUserInfo = function (callback){
		var data = {
			id:configMap.id,
			shyj: jqueryMap.$contractForm.find('textarea[name="shyj"]').val(),
			paydm: jqueryMap.$contractForm.find('select[name="paytype"]').val(),
			paymc: jqueryMap.$contractForm.find('select[name="paytype"]').find("option:selected").text(),
			ispay:configMap.ispay,
			ddbh:configMap.orderNumber
    	};
		var blockTarget = jqueryMap.$contractForm.closest(".modal-content");
		App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
		$.ajax({
			url: configMap.path + configMap.editUrl,
			type: "POST",
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(data),
			success: function (datas) {
				App.unblockUI(blockTarget);
		      	if(datas.success){
		      		callback(true);
                    updateMessageNumber();																				//增加首页消息提醒数量
                    sendMessage(configMap.id.split(",")[0]);															//发送极光推送
		      	}else{
		      		App.alert({
                        container: jqueryMap.$contractForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: datas.message,
                        icon: 'fa fa-warning'
                    });
                	callback(false);
		      	}
			},
			error: function () {
			}
		});
    };

    /**
	 * 发送极光推送
     * @param id
	 * 			收费id
     */
	var sendMessage = function (id) {
        $.ajax({
            url: configMap.path + configMap.editUrl + "/" + id,
            type: "GET",
            success: function (datas) {
            },
            error: function () {
            }
        });
    };

    /**
	 * 校验输入信息
     * @returns {boolean}
     */
	var checkinfo = function (){
		if($('textarea[name="shyj"]', jqueryMap.$blockTarget).val() !== null
			&& $('textarea[name="shyj"]', jqueryMap.$blockTarget).val() !== ""
			&& $('textarea[name="shyj"]', jqueryMap.$blockTarget).val().length > 500){
			App.alert({
				container : jqueryMap.$contractForm.closest(".modal-body"),
				place : 'prepend',
				type : 'danger',
				message :"审核意见不能超过500字！",
				icon : 'fa fa-warning'
			});
    		return false;
		} else if(configMap.size === 0){
			App.alert({
                container: jqueryMap.$contractForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请先设置“支付渠道”！',
                icon: 'fa fa-warning'
            });
			return false;
        } else {
			return true;
		}
	};


    /**
	 * 获取所选台账的收费信息
     */
	var getSFXX = function (){
		var data = {
			id:configMap.id
		};
		$.ajax({
			url: configMap.path + configMap.dataUrl,
			type: "POST",
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(data),
            async: false,
			success: function (datas) {
				var monthHtml = '';
				if(datas.onlinePay){																					//如果是线上支付，则将支付渠道选择禁用，一般支付渠道变成线上支付时，支付状态必定为已收费，
					$('[name="paytype"]', jqueryMap.$contractForm).html(datas.paytype);
					$('[name="paytype"]', jqueryMap.$contractForm).attr("disabled","disabled");
				} else {																								//如果不是线上支付,判断是否已填写过付款渠道（未通过），已填写过直接带出
					if(datas.paytype !== null && datas.paytype !== ""){
                        $('[name="paytype"]', jqueryMap.$contractForm).find('[value="'+datas.paytype+'"]')
							.attr("selected", true);
					}
				}
                // '<div class="dateAndMoney">
                // <p>2018年5月</p>
                // <p>实收：<span>1100.00</span></p>
                // </div>'
                // $('[name="prompt"]', jqueryMap.$contractForm).val(datas.message);
				for(var i = 0;i < datas.message.length;i++){
                    monthHtml += '<div class="dateAndMoney">';
                    monthHtml += '<p>' + datas.message[i].sfnf + '年' + datas.message[i].sfyf + '月</p>';
                    monthHtml += '<p>实收：<span>' + datas.message[i].sjsk + '</span></p>';
                    monthHtml += '</div>';
				}
				$('.monthtitle', jqueryMap.$contractForm).append(monthHtml);
				configMap.orderNumber = datas.orderNumber;															//订单编号
				configMap.ispay = datas.ispay;																			//是否已支付
			}
		})
	};

    /**
	 * 获取当前代理机构的全部支付渠道（线下）
     */
	var getPayType = function (){
		$.ajax({
			url: configMap.path + configMap.editUrl,
			type: "GET",
            async: false,
			success: function (datas) {
				configMap.size = datas.length;
				var selecthtml = '';
				for(var i=0;i<datas.length;i++){
					selecthtml += '<option value="'+datas[i].zfdm+'">'+datas[i].zfmc+'</option>';
				}
				$('[name="paytype"]').append(selecthtml);
			}
		})
	};

    return {
        init: function (id,type) {
            configMap.id = id;
            configMap.type = type;
            setJqueryMap();
            getPayType();																								//获取线下收费渠道
            getSFXX();																									//获取所选台账的收费信息
            //上传附件
            jqueryMap.$contractForm.closest('.modal-content').css({"cssText":"width: 780px!important;"});
            jqueryMap.$contractForm.closest('.modal-dialog').css({"cssText":"width: 780px!important;"});
			jqueryMap.$contractForm.find('[name="inputfile"]').off('click').on('click',function(){
            	var dialogButtons = {
                };
            	dialogButtons.cancel = {
            			label: '<i class="fa fa-times"></i>关&nbsp;闭',
                        className: "btn btn btn-default borderRadius4"
            	};
                $.get(configMap.path+"/charge/addfile.jsp?id="+configMap.orderNumber, function (html) {
                    jqueryMap.$setimg = bootbox.dialog({
                        title: '添加附件',
                        message: html,
                        buttons: dialogButtons
                    });
                });
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveUserInfo: function (callback){
        	//校验输入内容
        	if (checkinfo()) {
                saveUserInfo(callback);
            } else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=submitcharge.js