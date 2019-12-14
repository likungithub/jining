var chargeDetails = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/customermanage/charge/chargeDetails',
        sjbm: '',
        htbm: '',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json'
    };
    // 全局Dom
    var jqueryMap = {
    		$main: null,
    		$blockTarget: null
    };

    var setJqueryMap = function () {
    	jqueryMap.$main = $('#chargeDetails');
    	jqueryMap.$blockTarget = $('body');
    };
    //获取收费
    var getCharge = function () {
		$.ajax({
			url: configMap.dataUrl + "/" + configMap.sjbm + "/" + configMap.htbm,
			type: 'GET',
			success: function (data) {
				var sflx = "";
            	var flag = "";
            	for(var i = 0; i < data.contractpay.length;i++){
            		sflx += flag + data.contractpay[i].sfxm_mc + "(" + data.contractpay[i].sfje + "/月)";
            		flag =",";
            	}
            	$('[name="sflx"]').val(sflx);
            	$('[name="sflx"]').attr("title",sflx);
                $('[name="sfsj"]').val(moment(data.charge.sfsj).format('YYYY-MM-DD'));
                var sfsd = "";
                for(var i = 0;i <data.charge.sfnf.split(";").length;i++){
                	sfsd += data.charge.sfnf.split(";")[i] + "年" + data.charge.sfyf.split(";")[i] + "月;";
                }
                $('[name="sfsd"]').val(sfsd);
                $('[name="sfsd"]').attr("title",sfsd);
                $('[name="sjsk"]').val(data.charge.sjsk.toFixed(2));
                $('[name="ysk"]').val(data.charge.ysk.toFixed(2));
                $('[name="qtsk"]').val(data.charge.qtsf.toFixed(2));
                $('[name="skr"]').val(data.charge.lrrmc);
                var bzxx = "";
                for(var i = 0; i< data.charge.bzxx.split("|").length;i++){
                	if(data.charge.bzxx.split("|")[i] != ""){
                		bzxx += data.charge.bzxx.split("|")[i] + ";";
                	} else {
                		bzxx += "";
                	}
                }
                $('[name="sfsm"]').html(bzxx);
                $('[name="lrrq"]').val(moment(data.charge.lrrq).format('YYYY-MM-DD'));
                $('[name="shr"]').val(data.charge.shrmc);
                if (data.charge.shrq != null && data.charge.shrq != "") {
                    $('[name="shrq"]').val(moment(data.charge.shrq).format('YYYY-MM-DD'));
                } else {
                    $('[name="shrq"]').val();
                }
                if(FloatSub(FloatAdd(data.charge.ysk,data.charge.qtsf),data.charge.sjsk).toFixed(2)>0){
                	$('[name="yhje"]').val(FloatSub(FloatAdd(data.charge.ysk,data.charge.qtsf),data.charge.sjsk).toFixed(2));
                } else {
                	$('[name="yhje"]').val("0.00");
                }
				
			},
			error: function () {
			}
		});
	};
    return {
        // 初始化
    	init: function (sjbm,htbm) {
            configMap.sjbm = sjbm;
            configMap.htbm = htbm;
            setJqueryMap();
            jqueryMap.$main.closest(".modal-dialog").css("width", "688px");
            //获取已有的合同列表
            if (configMap.sjbm&&configMap.htbm) {
                getCharge();
            }
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
