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
var receipt = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/customermanage/charge/receipt',
        sjbm: '',
        htbm: '',
        chargeGrid:null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        startDate:null,
        endDate:null
    };
    // 全局Dom
    var jqueryMap = {
    		$blockTarget: null
    };

    var setJqueryMap = function () {
    	jqueryMap.$blockTarget = $('body');
    };
    //获取收费
    var getCharge = function () {
		$.ajax({
			url: configMap.dataUrl + "/" + configMap.sjbm + "/" + configMap.htbm,
			type: 'GET',
			success: function (data) {
//				$("h1").html(data.name);
                $(".no").html("NO:" + data.charge.sjbm);
                $(".fkdw").html("付款单位：" + data.charge.khmc);
                $(".fkdwgz").html("付款单位盖章：" + data.charge.khmc);
                $(".skr").html("收款人：" + data.charge.lrrmc);
                var tableHtml = '';
                for (var i = 0; i < data.list.length; i++) {
                    for (var y = 0; y < data.list[i].ContractPay.length; y++) {
                        if (i === 0 && y === 0) {
//							var text = data.charge.sfnf+'年';
                            var je = 0;
//							for(var z = 0;z<data.charge.sfyf.split(",").length;z++){
//								var str = data.charge.sfnf+'/'+data.charge.sfyf.split(",")[z]+"/01";
//								var date = new Date(str);
//								var time = (date.getTime());
//								if(time>=data.list[i].ContractInfo.fwqxq&&time<data.list[i].ContractInfo.fwqxz){
//									text += data.charge.sfyf.split(",")[z] + '、'
//								}
//							}
//							text += '月' + data.list[i].ContractPay[y].sfxm_mc;
//							text = text.replace("、月","月");
                            je = (data.charge.sfyf.split(",").length) * (data.list[i].ContractPay[y].sfje);
                            tableHtml += '<tr><td>' + data.list[i].ContractPay[y].sfxm_mc + '</td>';
                            tableHtml += '<td align="right">¥' + data.list[i].ContractPay[y].sfje.toFixed(2) + '</td><td align="right">¥' + je.toFixed(2) + '</td>';
                            tableHtml += '<td align="right" rowspan="20">';
                            if(FloatSub(FloatAdd(data.charge.ysk,data.charge.qtsf),data.charge.sjsk).toFixed(2)>0){
                            	tableHtml += '¥'+FloatSub(FloatAdd(data.charge.ysk,data.charge.qtsf),data.charge.sjsk).toFixed(2);
                            } else {
                            	tableHtml += '¥0';
                            }
                            tableHtml += '</td><td rowspan="20">';
                            for(var z = 0;z<data.charge.sfnf.split(";").length;z++){
                            	tableHtml += data.charge.sfnf.split(";")[z] + '年' + data.charge.sfyf.split(";")[z] + '月';
                            	if(z<data.charge.sfnf.split(";").length-1){
                            		tableHtml += ";";
                            	}
                            }
                            tableHtml += '收费<br>';
                            for(var z = 0;z<data.charge.bzxx.split("|").length;z++){
                            	tableHtml += data.charge.bzxx.split("|")[z] + "<br>";
                            }
                            tableHtml += '</td></tr>';
                        } else {
//							var text = data.charge.sfnf+'年';
                            var je = 0;
//							for(var z = 0;z<data.charge.sfyf.split(",").length;z++){
//								var str = data.charge.sfnf+'/'+data.charge.sfyf.split(",")[z]+"/01";
//								var date = new Date(str);
//								var time = date.getTime();
//								if(time>=data.list[i].ContractInfo.fwqxq&&time<data.list[i].ContractInfo.fwqxz){
//									text += data.charge.sfyf.split(",")[z] + '、'
//								}
//							}
//							text += '月' + data.list[i].ContractPay[y].sfxm_mc;
//							text = text.replace("、月","月");
                            je = (data.charge.sfyf.split(",").length) * (data.list[i].ContractPay[y].sfje);
                            tableHtml += '<tr><td>' + data.list[i].ContractPay[y].sfxm_mc + '</td>';
                            tableHtml += '<td align="right">¥' + data.list[i].ContractPay[y].sfje.toFixed(2) + '</td><td align="right">¥' + je.toFixed(2) + '</td></tr>';
                        }
                    }
                }
                tableHtml += '<tr><td>其他收费</td><td></td><td align="right">¥' + data.charge.qtsf.toFixed(2) + '</td></tr>';
                tableHtml += '<tr><td colspan="2">合计：' + data.money + '</td><td align="right">¥' + data.charge.sjsk.toFixed(2) + '</td></tr>';
                $("tbody").append(tableHtml);
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
//@ sourceURL=edit.js