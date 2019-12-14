var feedBackEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/feedback/feedback',
        id: '',
        fkbz:''
    };

    // 全局Dom
    var jqueryMap = {
			$feedbackForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$feedbackForm = $('#feedbackForm');
    };

    var saveFeedback = function (callback) {
        var blockTarget = jqueryMap.$feedbackForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var data = {
        	dfbz: $('#dfbz').val()
        };

        var url = configMap.path + configMap.dataUrl;
        var requestType = 'POST';
        if (configMap.id) {
            url = url + "/" + configMap.id+"?fkbz="+configMap.fkbz;
            requestType = 'PUT';
        }

		$.ajax({
            url: url,
            type: requestType,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function () {
                App.unblockUI(blockTarget);
                callback(true);
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$feedbackForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
                callback(false);
            }
        });
    };

    var getFeedback = function (id,fkbz) {
		$.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id+"?fkbz="+fkbz,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
            	if(data.sjlx==1){
            		$('input[name="sjlx"]').val("Andriod");
            	}else{
            		$('input[name="sjlx"]').val("IOS");
            	}
                $('input[name="khbm"]').val(data.khbm);
                $('input[name="gsmc"]').val(data.gsmc);
                $('input[name="yhdh"]').val(data.yhdh);
                $('#fkxx').val(data.fkxx);
                $('input[name="fkrq"]').val(moment(data.fkrq).format('YYYY-MM-DD'));
                $('#dfbz').val(data.dfbz);
                if(data.dfbz==1){
                	$("#dfbz").attr("disabled", "disabled");//如果已答复则不能修改答复状态
                }

                $('input[name="yhlx"]').val(data.fklx);
            },
            error: function () {
                bootbox.alert('获取参数信息失败！');
            }
        });
    };

    return {
        // 初始化
        init: function (id,fkbz) {
            configMap.id = id;
            configMap.fkbz=fkbz;
            setJqueryMap();
            // 控件验证
            if (configMap.id) {
                getFeedback(configMap.id,configMap.fkbz);
            }
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        // 保存雇员信息，参数为回掉函数
        saveFeedback: function (callback) {
            if (jqueryMap.$feedbackForm.valid()) {
                saveFeedback(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js