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
var audit = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        updateUrl: '/customermanage/contract/contractupdate',
        dataUrl: '/contractaudit/contractauditmethod',
        contractFileUrl: '/customermanage/contract/contractfile',
        htbm: ''
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractForm: null,
        $info:null,
        $setimg:null
    };

    var setJqueryMap = function () {
    	jqueryMap.$blockTarget = $('body');
        jqueryMap.$contractForm = $('#audit_m');
        jqueryMap.$info = $('#reviewContractInfo_m');
    };
	//保存审核
	var saveUserInfo = function (callback){
		var data = {
			htbm:configMap.htbm,
			shzt: jqueryMap.$contractForm.find('input[name="shzt"]:checked').val(),
			shyj: jqueryMap.$contractForm.find('textarea[name="shyj"]').val()
    	};
		var blockTarget = jqueryMap.$contractForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
		$.ajax({
			url: configMap.path + configMap.dataUrl,
			type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            data: JSON.stringify(data),
			success: function (datas) {
				App.unblockUI(blockTarget);
				if(datas.success){
					callback(true);
				} else {
                	App.alert({
                        container: jqueryMap.$contractForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: datas.message,
                        icon: 'fa fa-warning'
                    });
                	callback(false);
                }
				//增加首页消息提醒数量
                updateMessageNumber();
				//修改首页待审核合同数量
                upDateDSHNumber();
			},
			error: function () {
				bootbox.alert('获取参数信息失败！');
			}
		});
    };
	//校验输入信息
	var checkinfo = function (){
		if($('textarea[name="shyj"]', jqueryMap.$contractForm).val()!==null
            &&$('textarea[name="shyj"]', jqueryMap.$contractForm).val()!==""
            &&$('textarea[name="shyj"]', jqueryMap.$contractForm).val().length>500){
			App.alert({
				container : jqueryMap.$contractForm.closest(".modal-body"),
				place : 'prepend',
				type : 'danger',
				message :"审核意见不能超过500字！",
				icon : 'fa fa-warning'
			});
    		return false;
		} else {
			return true;
		}
	};

	//显示顶部的一些信息
    var displayTopInfo = function () {
        $.get(configMap.updateUrl +'/' + configMap.htbm,function (d){
            jqueryMap.$info.find('.contractNum').html(d.contract.htbm).css({color:'#FF4133'}).addClass('h4');
            jqueryMap.$info.find('.chargePro').html(d.contract.sfxm_mc);
            jqueryMap.$info.find('.customerName').html(d.contract.yhmc).css({'margin-top':0});
            jqueryMap.$info.find('.chargeMoney').html(d.contract.zfy.toFixed(2));
            jqueryMap.$info.find('.chargeTotalMoney').html(d.contract.hjje.toFixed(2));
            jqueryMap.$info.find('.serviceL').html(moment(d.contract.fwqxq).format('YYYY-MM')+'&nbsp;&nbsp;至&nbsp;&nbsp;'+moment(d.contract.fwqxz).format('YYYY-MM'));
            jqueryMap.$info.find('.payMethods').html(d.contract.fkfs_mc+d.contract.fkxh_mc);
            jqueryMap.$info.find('.specialMarks').html(d.contract.tbsx);
            jqueryMap.$info.find('.contractDate').html(moment(d.contract.qyrq).format('YYYY-MM-DD')).css({'margin-top':9});
            // jqueryMap.$info.find('.auditorName').html(d.contract.shrmc);
            // if(d.contract.shrq!==null&&d.contract.shrq!==''){
            //     jqueryMap.$info.find('.auditTime').html(moment(d.contract.shrq).format('YYYY-MM-DD'));
            // }
        })
    };

    //获取合同附件
    var getContractFile = function (){
        $.ajax({
            url:configMap.contractFileUrl + "/" + configMap.htbm,
            dataType: 'JSON',
            success:function(data){
                if(data.length>0){
                    $('.fileDiv', jqueryMap.container).removeClass('display-hide');
                    var contentHtml = '<ul style="padding: 0px !important;">';
                    for(var i = 0;i<data.length;i++){
                        contentHtml += '<li style="padding: 2px;">·<a onclick="audit.getURL(' + '\''
                            + data[i].fjcclj + '\',' + '\'' + data[i].fjmc + '\',' + '\'' + data[i].id + '\'' + ')"' +
                            ' name="downloadfile">' + data[i].fjmc + '</a></li>'
                    }
                    contentHtml += '</ul>';
                    $('.contractFiles', jqueryMap.container).append(contentHtml);
                }
            }
        });
    };

    return {
        // 初始化
        init: function (htbm,batchSign) {
            configMap.htbm = htbm;
            displayTopInfo();
            getContractFile();
            if(!batchSign){
                displayTopInfo(htbm);
            }else{
                $('#reviewContractInfo_m').children('.infoDis').hide();
            }
            setJqueryMap();
            $('input:radio[name="shzt"][value="001"]', jqueryMap.$contractForm).prop("checked",true);
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveUserInfo:function (callback){
        	//校验输入内容
        	if (checkinfo()) {
                saveUserInfo(callback);
            } else {
                callback(false);
            }
        },
        getURL: function (plate, filename, id) {
            var data = {
                plate: plate,
                id: id
            };
            $.ajax({
                url: '/customermanage/contract/getfileurl',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function (result) {
                    var name = filename.replace("." + filename.split(".")[filename.split(".").length - 1], "");
                    var a = $("<a></a>").attr("href", result.url).attr("download", name).attr("target", "_blank").appendTo("body");
                    a[0].click();
                    a.remove();
                }
            });
        }
    };
}();
//@ sourceURL=edit.js