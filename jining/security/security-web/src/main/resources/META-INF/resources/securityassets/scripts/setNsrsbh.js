var setNsrsbh = function () {
	// 全局属性参数
	var configMap = {
		path: '',
		id: '',
		dataUrl : '/customermanage/customerManage/savelogo',
		schedule : '/customermanage/customerManage/schedule',
		get:null
	};
	var jqueryMap = {
		$setNsrsbh: null	
	};
	
	var setJqueryMap = function () {
        jqueryMap.$setNsrsbh = $('#setNsrsbh');
    };
	
	var save = function (callback){
		var data2 = {
				success : false
		};
		var newSh = $('input[name="changeNsrsbh"]', jqueryMap.$setNsrsbh).val();
		if (newSh == '' || newSh == null) {
			App.alert({
                container: jqueryMap.$setNsrsbh.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '变更纳税人识别号不能为空！',
                icon: 'fa fa-warning'
            });
			callback(data2);
			
            return false;
		} else if (!whetherOrNotNsrbh(newSh)) {
            App.alert({
                container: jqueryMap.$setNsrsbh.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '税务登记号请输入15-18位数字，字母或数字与字母组合！',
                icon: 'fa fa-warning'
            });
            callback(data2);
            return false;
		} else {
			$.ajax({
				url : configMap.path + '/updateNsrsbh',
				type : 'post',
	            data: {
	            	nsrsbh : newSh
	            },
	            success: function (datas) {
	                if (datas.success) {
	                    callback(datas);
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
	                    container: jqueryMap.$setNsrsbh.closest(".modal-body"),
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
		init : function(path) {
			configMap.path = path;
			setJqueryMap();
		},
		save : function(callback){
			save(callback);
		}
	};
}();
