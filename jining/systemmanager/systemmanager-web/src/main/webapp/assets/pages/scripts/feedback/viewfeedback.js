var feedbackView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/feedback/feedback/'
	};

	var getFeedback = function (id,fkbz) {
		$.ajax({
			url: configMap.path + configMap.dataUrl + id+"?fkbz="+fkbz,
			dataType: 'JSON',
			type: 'GET',
			success: function (data) {
				if(data.sjlx=="1"){
					$('#sjlx').text("Andriod");
				}else{
					$('#sjlx').text("IOS");
				}

                if (data.khbm==null|| data.khbm==""){}
				else{
                    $('#khbm').text(data.khbm);
				}
				if(data.gsmc==null||data.gsmc==""){

				}else{
					$('#gsmc').text(data.gsmc);
				}
				if(data.yhdh==null||data.yhdh==""){

				}else{
                    $('#yhdh').text(data.yhdh);
				}
				$('#fkxx').text(data.fkxx);
				$('#fkrq').text(moment(data.fkrq).format('YYYY-MM-DD'));
				if(data.dfbz=="0"){
					$('#dfbz').text("未答复");
				}else{
					$('#dfbz').text("已答复");
				}
                $('#yhlx').text(data.fklx);
			},
			error: function () {
			}
		});
	};

	return {
		init: function (id,fkbz) {
			getFeedback(id,fkbz);
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
