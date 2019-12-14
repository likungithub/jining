var setZh = function () {
	// 全局属性参数
	var configMap = {
        dataUrl: '/user/users',
        oldZh: '',
		path:''
	};
	var jqueryMap = {
		$setZh: null	
	};
	
	var setJqueryMap = function () {
        jqueryMap.$setZh = $('#setZh');
    };
	
	var saveZh = function (callback){
        var newZh = $('input[name="changeZh"]', jqueryMap.$setZh).val();
		var data2 = {
				success : false
		};
		if (newZh == '' || newZh == null) {
			App.alert({
                container: jqueryMap.$setZh.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '变更账号不能为空！',
                icon: 'fa fa-warning'
            });
			callback(data2);
			
            return false;
		} else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(newZh)) {
            App.alert({
                container: jqueryMap.$setZh.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请输入6-20数字字母的组合！',
                icon: 'fa fa-warning'
            });
            callback(data2);
            return false;
		} else {
			$.ajax({
				url : configMap.dataUrl + '/updateZh/' + newZh + '/' + configMap.oldZh,
				type : 'GET',
                dataType: 'JSON',
	            success: function (datas) {
	                if (datas.success) {
                        var data = {
                            success : true,
							zh : newZh
                        };
	                    callback(data);
	                } else {
	                    Messenger().post({
	                        message: datas.message,
	                        type: 'error'
	                    });
	                    callback(data2);
	                }
	            },
	            error: function () {
	            	App.alert({
	                    container: jqueryMap.$setZh.closest(".modal-body"),
	                    place: 'prepend',
	                    type: 'danger',
	                    message: '保存失败！',
	                    icon: 'fa fa-warning'
	                });
	                callback(data2);
	            }
	        });
		}
	}
	
	return {
		init : function(path,zh) {
			configMap.path = path;
			configMap.oldZh = zh;
			setJqueryMap();
		},
        saveZh : function(callback){
            saveZh(callback);
		}
	};
}();
