/**
 * 客户给员工评价详情页面js
 */
var evaluateStaffView = function () {
	'use strict';

	var configMap = {
		path: '',
		dataUrl: '/evaluateuserstaff/viewevaluatestaff/',
        glbmUrl:'/evaluateuserstaff/viewevaluatestaffGlbm/'
	};

	var getEvaluateStaffView = function (id,glbm) {
		if(id==""){
            $.ajax({
                url: configMap.path + configMap.glbmUrl + glbm,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    $('#evaluateStaffTX').attr('src',data[0].ygtx);
                    $('#name').text(data[0].ygxm);
                    $('#gsmc').text(data[0].gsmc);
                    $('#khpjsj').text(moment(data[0].khpjsj).format('YYYY-MM-DD'));
                    $('#fwtd').text(data[0].fwtd+"分");
                    $('#zysz').text(data[0].zysz+"分");
                    $('#jsx').text(data[0].jsx+"分");
                    if(data[0].fwtd<=6){
                        $('#fwtd').css("color","green");
                    }
                    if(data[0].zysz<=6){
                        $('#zysz').css("color","green");
                    }
                    if(data[0].jsx<=6){
                        $('#jsx').css("color","green");
                    }
                    $('#plxx').text(data[0].plxx);
                    $('#starfwtd').raty({ readOnly: true, score: data[0].fwtd/2 });
                    $('#starzysz').raty({ readOnly: true, score: data[0].zysz/2 });
                    $('#starjsx').raty({ readOnly: true, score: data[0].jsx/2 });
                },
                error: function () {
                }
            });

		}else{
            $.ajax({
                url: configMap.path + configMap.dataUrl + id,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    $('#evaluateStaffTX').attr('src',data[0].ygtx);
                    $('#name').text(data[0].ygxm);
                    $('#gsmc').text(data[0].gsmc);
                    $('#khpjsj').text(moment(data[0].khpjsj).format('YYYY-MM-DD'));
                    $('#fwtd').text(data[0].fwtd+"分");
                    $('#zysz').text(data[0].zysz+"分");
                    $('#jsx').text(data[0].jsx+"分");
                    if(data[0].fwtd<=6){
                        $('#fwtd').css("color","green");
                    }
                    if(data[0].zysz<=6){
                        $('#zysz').css("color","green");
                    }
                    if(data[0].jsx<=6){
                        $('#jsx').css("color","green");
                    }
                    $('#plxx').text(data[0].plxx);
                    $('#starfwtd').raty({ readOnly: true, score: data[0].fwtd/2 });
                    $('#starzysz').raty({ readOnly: true, score: data[0].zysz/2 });
                    $('#starjsx').raty({ readOnly: true, score: data[0].jsx/2 });
                },
                error: function () {
                }
            });
		}
	};

	return {
		init: function (id,glbm) {
			getEvaluateStaffView(id,glbm);
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
