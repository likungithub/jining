var appcustomerinfoView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/appcustomerinfo/appcustomerinfo/'
	};

	var getAppcustomerinfo = function (id) {
		$.ajax({
			url: configMap.path + configMap.dataUrl + id,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				console.info(data);
				if(data.grtx!=null){
//					$('#grtx_appcustomerinfo').text(data.grtx);
					$("#grtx_appcustomerinfo").attr('src',data.grtx);
				}
				if(data.khbm!=null){
					$('#khbm_appcustomerinfo').text(data.khbm);
				}
				if(data.dlzh!=null){
					$('#dlzh_appcustomerinfo').text(data.dlzh);
				}
				if(data.yhmc!=null){
					$('#yhxm_appcustomerinfo').text(data.yhmc);
				}
				if(data.gsmc!=null){
					$('#gsmc_appcustomerinfo').text(data.gsmc);
				}
				if(data.nsrsbh!=null){
					$('#nsrsbh_appcustomerinfo').text(data.nsrsbh);
				}
				if(data.zcrq!=null){
					$('#zcrq_appcustomerinfo').text(moment(data.zcrq).format("YYYY-MM-DD"));
				}
				if(data.frdb!=null){
					$('#frdb_appcustomerinfo').text(data.frdb);
				}
				if(data.sfzhm!=null){
					$('#sfzhm_appcustomerinfo').text(data.sfzhm);
				}
				if(data.lxrmc!=null){
					$('#lxrmc_appcustomerinfo').text(data.lxrmc);
				}
				if(data.bgdh!=null){
					$('#bgdh_appcustomerinfo').text(data.bgdh);
				}
				if(data.sjhm!=null){
					$('#sjhm_appcustomerinfo').text(data.sjhm);
				}
				if(data.czhm!=null){
					$('#czhm_appcustomerinfo').text(data.czhm);
				}
				if(data.qq!=null){
					$('#qq_appcustomerinfo').text(data.qq);
				}
				if(data.email!=null){
					$('#email_appcustomerinfo').text(data.email);
				}
				if(data.xxdz!=null){
					$('#xxdz_appcustomerinfo').text(data.xxdz);
				}
				if(data.hydm!=null){
					$('#hydm_appcustomerinfo').text(data.hydm);
				}
				if(data.hymc!=null){
					$('#hymc_appcustomerinfo').text(data.hymc);
				}
				if(data.sfdm!=null){
					$('#sfdm_appcustomerinfo').text(data.sfdm);
				}
				if(data.sfmc!=null){
					$('#sfmc_appcustomerinfo').text(data.sfmc);
				}
				if(data.tjrdm!=null){
					$('#tjrdm_appcustomerinfo').text(data.tjrdm);
				}

			},
			error: function () {
			}
		});
	};

	return {
		init: function (id) {
			getAppcustomerinfo(id);
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
