/**
 * 公司给员工评价详情页面js
 */
var evaluateView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/evaluateuser/viewevaluate/',
		glbmUrl:'/evaluateuser/glbmViewEvaluate'
	};
	var jqueryMap={
	    $content:'',
    }
    var setJqueryMap=function (uuid) {
        jqueryMap.$content=$('#evaluateByWs'+uuid);
    }

	var getEvaluateView = function (id,glbm) {
		if(id==""){
			$.ajax({
                url: configMap.path + configMap.glbmUrl + glbm,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    $('#name',jqueryMap.$content).text(data[0].ygxm);
                    $('#evaluateTX',jqueryMap.$content).attr('src',data[0].ygtx);
                    $('#gspjsj',jqueryMap.$content).text(moment(data[0].gspjsj).format('YYYY-MM-DD'));
                    $('#zcd',jqueryMap.$content).text(data[0].zcd+"分");
                    $('#zysp',jqueryMap.$content).text(data[0].zysp+"分");
                    $('#yggl',jqueryMap.$content).text(data[0].yggl+"分");
                    $('#ywnl',jqueryMap.$content).text(data[0].ywnl+"分");
                    if(data[0].zcd<=6){
                        $('#zcd',jqueryMap.$content).css("color","green");
                    }
                    if(data[0].zysp<=6){
                        $('#zysp',jqueryMap.$content).css("color","green");
                    }
                    if(data[0].yggl<=6){
                        $('#yggl',jqueryMap.$content).css("color","green");
                    }
                    if(data[0].ywnl<=6){
                        $('#ywnl',jqueryMap.$content).css("color","green");
                    }
                    $('#gspy',jqueryMap.$content).text(data[0].gspy);
                    $('#starzcd',jqueryMap.$content).raty({ readOnly: true, score: data[0].zcd/2 });
                    $('#starzysp',jqueryMap.$content).raty({ readOnly: true, score: data[0].zysp/2 });
                    $('#staryggl',jqueryMap.$content).raty({ readOnly: true, score: data[0].yggl/2 });
                    $('#starywnl',jqueryMap.$content).raty({ readOnly: true, score: data[0].ywnl/2 });
                },
                error: function () {
                }
			})
		}else{
            $.ajax({
                url: configMap.path + configMap.dataUrl + id,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    $('#name',jqueryMap.$content).text(data[0].ygxm);
                    $('#evaluateTX',jqueryMap.$content).attr('src',data[0].ygtx);
                    $('#gspjsj',jqueryMap.$content).text(moment(data[0].gspjsj).format('YYYY-MM-DD'));
                    $('#zcd',jqueryMap.$content).text(data[0].zcd+"分");
                    $('#zysp',jqueryMap.$content).text(data[0].zysp+"分");
                    $('#yggl',jqueryMap.$content).text(data[0].yggl+"分");
                    $('#ywnl',jqueryMap.$content).text(data[0].ywnl+"分");
                    if(data[0].zcd<=6){
                        $('#zcd',jqueryMap.$content).css("color","green");
                    }
                    if(data[0].zysp<=6){
                        $('#zysp',jqueryMap.$content).css("color","green");
                    }
                    if(data[0].yggl<=6){
                        $('#yggl',jqueryMap.$content).css("color","green");
                    }
                    if(data[0].ywnl<=6){
                        $('#ywnl',jqueryMap.$content).css("color","green");
                    }
                    $('#gspy',jqueryMap.$content).text(data[0].gspy);
                    $('#starzcd',jqueryMap.$content).raty({ readOnly: true, score: data[0].zcd/2 });
                    $('#starzysp',jqueryMap.$content).raty({ readOnly: true, score: data[0].zysp/2 });
                    $('#staryggl',jqueryMap.$content).raty({ readOnly: true, score: data[0].yggl/2 });
                    $('#starywnl',jqueryMap.$content).raty({ readOnly: true, score: data[0].ywnl/2 });
                },
                error: function () {
                }
            });
		}
	};

	return {
		init: function (id,glbm,uuid) {
            setJqueryMap(uuid);
			getEvaluateView(id);
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
