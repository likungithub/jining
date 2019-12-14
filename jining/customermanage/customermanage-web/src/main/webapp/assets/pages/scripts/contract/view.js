
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
var contractShowView = function () {
    'use strict';
    var configMap = {
        path: '',
        contractDataUrl: '/customermanage/contract/contractupdate',
		contractFileUrl: '/customermanage/contract/contractfile',
        imgUrl:'/customermanage/contract/addfile.jsp',
        id: ''
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        container: null
    };


    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.container = $('#checkConcatInfo_m');
    };

	//获取合同的信息
	var getContractInfo = function(){
		$.ajax({
			url:configMap.contractDataUrl + '/' + configMap.id,
            dataType: 'JSON',
			success:function(d){
					if(d.contract.shzt_dm==='001'){
                        jqueryMap.container.find('.reviewPic').removeClass('hide');
                        setTimeout(function(){
                            jqueryMap.container.find('.reviewPic img').removeClass('display-hide');
                            jqueryMap.container.find('.reviewPic img').addClass('narrow');
						},500);
					}else{
                        jqueryMap.container.find('.reviewPic').addClass('hide');
                        setTimeout(function(){
                            jqueryMap.container.find('.reviewNoPic img').removeClass('display-hide');
                            jqueryMap.container.find('.reviewNoPic img').addClass('narrow');
						},500);
					}
                if(d.contract.shzt_dm==='002'){
                    jqueryMap.container.find('.reviewNoPic').removeClass('hide')
                }else{
                    jqueryMap.container.find('.reviewNoPic').addClass('hide')
                }
                jqueryMap.container.find('.contractNum').html(d.contract.htbm).css({color:'#FF4133'}).addClass('h4');
                jqueryMap.container.find('.customerName').html(d.contract.yhmc).css({'margin-top':0});
				jqueryMap.container.find('.chargePro').html(d.contract.sfxm_mc);
                jqueryMap.container.find('.chargeMoney').html(d.contract.zfy.toFixed(2));
                jqueryMap.container.find('.chargeTotalMoney').html(d.contract.hjje.toFixed(2));
                jqueryMap.container.find('.serviceL').html(moment(d.contract.fwqxq).format('YYYY-MM')+'&nbsp;&nbsp;至&nbsp;&nbsp;'+moment(d.contract.fwqxz).format('YYYY-MM'));
                jqueryMap.container.find('.payMethods').html(d.contract.fkfs_mc+d.contract.fkxh_mc);
                jqueryMap.container.find('.specialMarks').html(d.contract.tbsx);
                jqueryMap.container.find('.contractDate').html(moment(d.contract.qyrq).format('YYYY-MM-DD')).css({'margin-top':9});
                jqueryMap.container.find('.auditorName').html(d.contract.shrmc);
                if(d.contract.shrq!==null&&d.contract.shrq!==''){
                    jqueryMap.container.find('.auditTime').html(moment(d.contract.shrq).format('YYYY-MM-DD'));
                }
                jqueryMap.container.find('.auditOpinion').html(d.contract.shyj);
                jqueryMap.container.find('.entryPer').html(d.contract.lrrmc).css({'margin-top':9});
			}
		});
	};

	//获取合同附件
	var getContractFile = function (){
        $.ajax({
            url:configMap.contractFileUrl + "/" + configMap.id,
            dataType: 'JSON',
            success:function(data){
				if(data.length>0){
					$('.fileDiv', jqueryMap.container).removeClass('display-hide');
					var contentHtml = '<ul style="padding: 0px !important;">';
					for(var i = 0;i<data.length;i++){
						contentHtml += '<li style="padding: 2px;">·<a onclick="contractShowView.getURL(' + '\''
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
		init:function(id){
			setJqueryMap(id);
			configMap.id = id;
			getContractInfo();
			getContractFile();
		},
		setPath:function(path){
			configMap.path = path;
		},
        getURL: function (plate, filename, id) {
            var data = {
                plate: plate,
                id: id
            };
            $.ajax({
                url: configMap.path + '/contract/getfileurl',
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
	}
}();
//@ sourceURL=contractShowView.js
