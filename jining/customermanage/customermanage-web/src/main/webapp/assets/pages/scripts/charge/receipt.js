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
        dataUrl: '/charge/receipt',
        ddbh: '',
        chargeGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        startDate: null,
        endDate: null,
        type:''
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
    	//type=1 代表来自手机访问
    	if(configMap.type == "1"){
    		 configMap.dataUrl = 'customermanage/charge/receipt';
    	}
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/" + configMap.ddbh,
            type: 'GET',
            success: function (data) {
                $(".no").html("NO:" + data.charge.ddbh);
                $(".fkdw").html("付款单位：" + data.charge.khmc);
                $(".fkdwgz").html("收款单位盖章：" + data.name);
                $(".skr").html("收款人：" + data.charge.lrrmc);
                $(".sfsj").html(moment(data.charge.sfsj).format("YYYY-MM-DD"));
                var tableHtml = '';
                for (var i = 0; i < data.list.length; i++) {
                    for (var y = 0; y < data.list[i].ContractPay.length; y++) {
                        if (i === 0 && y === 0) {
                            var je = 0;
                            je = (data.list[i].ContractPay[y].sfje);
                            tableHtml += '<tr><td>' + data.list[i].ContractPay[y].sfxm_mc + '</td>';
                            tableHtml += '<td align="right">¥' +  data.charge.ysk.toFixed(2) + '</td><td align="right">¥' + je.toFixed(2) + '</td>';
                            tableHtml += '<td align="right" rowspan="20">';
                            if(data.charge.ysk-data.charge.sjsk>0){
                            	tableHtml += '¥'+ data.charge.qtsf.toFixed(2);
                            } else {
                            	tableHtml += '';
                            }
                            tableHtml += '</td><td rowspan="20">';
                            tableHtml +=data.sfsm+'<br>';
                            tableHtml +='</td></tr>';
                        } else {
                            var je = 0;
                            je = (data.charge.sfyf.split(",").length) * (data.list[i].ContractPay[y].sfje);
                            tableHtml += '<tr><td>' + data.list[i].ContractPay[y].sfxm_mc + '</td>';
                            tableHtml += '<td align="right">¥' + data.list[i].ContractPay[y].sfje.toFixed(2) + '</td><td align="right">¥' + je.toFixed(2) + '</td></tr>';
                        }
                    }
                }
                tableHtml += '<tr><td>其他收费</td><td></td><td align="right"></td></tr>';
                tableHtml += '<tr><td colspan="2">合计：' + data.money + '</td><td align="right">¥' + data.charge.sjsk.toFixed(2) + '</td></tr>';
                $("tbody").append(tableHtml);
            },
            error: function () {
            }
        });
    };

    return {
        // 初始化
        init: function (ddbh,type) {
            configMap.ddbh = ddbh;
            configMap.type = type;
            setJqueryMap();
            //获取已有的合同列表
            if (configMap.ddbh) {
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