var setimgurl = function () {
	// 全局属性参数
	var configMap = {
		path: '',
		id: '',
		dataUrl : '/user/users/saveimg',
		schedule : '/user/users/schedule',
		get:null
	};
//	var getSchedule = function (){
//		$.ajax({
//			url : configMap.path + configMap.schedule,
//			dataType : 'JSON',
//			type : 'GET',
//			success : function(result) {
//				sessionStorage.status = result.startStatus;
//				$(".progress-bar").css("width",result.schedule);
//		        $(".progress-value").html(result.schedule);
//			},
//		});
//	}
	return {
		getimg : function(callback) {
			var imgid = {
					imgurl:$("#imgid").val(),
			}
			App.blockUI({
		        boxed: true,
		        message: '正在保存，请稍候...'
		      });
			if($(".cropped").find("img").length==0){
				App.unblockUI($('body'));
				Messenger().post({
					message : '请先裁切头像后进行保存！',
					id : 'returnimgone',
					type : 'error'
				});
				return false;
				callback(false);
			}
//			var content = '<div class="progress"><div class="progress-bar" style="width:0%; background:#2e9dc2;"><div class="progress-value">0%</div></div></div>'
//			$(".modal-dialog").append(content);
			$.ajax({
				url : configMap.path + configMap.dataUrl,
				contentType : 'application/json; charset=utf-8',
				dataType : 'JSON',
				type : 'POST',
				data : JSON.stringify(imgid),
//				beforeSend:function(){
//					configMap.get = window.setInterval(getSchedule,"500");	
//				},
//				complete:function(){
//					clearInterval(configMap.get);
//					$(".progress-bar").css("width","100%");
//			        $(".progress-value").html("100%");
//					sessionStorage.removeItem("status");
//				},
				success : function(result) {
					App.unblockUI($('body'));
					var data = null;
					if(result.success){
						if(result.info.success){
							$("#photo").attr("src",result.info.fileURL);
//							data = {
//									success:true,
//									fileURL:result.fileURL
//							}
//							console.info(data);
//							callback(data);
							callback(true);
						}else{
							Messenger().post({
								message : result.info.message,
								id : 'returnimgone',
								type : 'error'
							});
							callback(false);
						}
					}else{
						Messenger().post({
							message : result.message,
							id : 'returnimgone',
							type : 'error'
						});
						callback(false);
					}
				},
				error : function() {
					App.unblockUI($('body'));
					Messenger().post({
						message : '获取失败！',
						id : 'returnimgone',
						type : 'error'
					});
					callback(false);
				}
			});
		}
	};
}();
//@ sourceURL=users/set-org.js