var setlogourl = function () {
	// 全局属性参数
	var configMap = {
		path: '',
		id: '',
		dataUrl : '/systemmanager/domainNameBasic/savelogo',
		schedule : '/systemmanager/customerManage/schedule',
		get:null
	};
	var jqueryMap = {
			$companyInfoForm: $("#logoselect"),
			$addNewDomainName:$('#addDomainNameInfo_M')
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
		getlogo : function(callback) {
			var imgid = {
					imgurl:$("#imgid").val(),
			}
			var blockTarget = jqueryMap.$companyInfoForm.closest(".modal-content");
			App.blockUI({
				target: blockTarget,
		        boxed: true,
		        message: '正在保存，请稍候...'
		      });
//			var content = '<div class="progress"><div class="progress-bar" style="width:0%; background:#2e9dc2;"><div class="progress-value">0%</div></div></div>'
//			jqueryMap.$companyInfoForm.closest(".modal-dialog").append(content);
			if($(".cropped").find("img").length==0){
				App.unblockUI(blockTarget);
				Messenger().post({
					message : '请先裁切头像后进行保存！',
					id:'returnlogoone',
					type : 'error'
				});
				return false;
				callback(false);
			}
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
					App.unblockUI(blockTarget);
					var data = null;
					console.info(result,result.success,result.info.success);
					if(result.success){
						if(result.info.success){
							$("#logo").attr("src",result.info.fileURL);
							$('#companyLogo_ws_mdw').val(result.info.fileURL);
							console.info($('#companyLogo_ws_mdw'),111);
							$('#logosrc').attr("src",result.info.fileURL);
							callback(true);
						}else{
							Messenger().post({
								message : result.info.message,
								id:'returnlogoone',
								type : 'error'
							});
							callback(false);
						}
					}else{
						Messenger().post({
							message : result.message,
							id:'returnlogoone',
							type : 'error'
						});
						callback(false);
					}
				},
				error : function() {
					App.unblockUI(blockTarget);
					Messenger().post({
						message : '获取失败！',
						id:'returnlogoone',
						type : 'error'
					});
					callback(false);
				}
			});
		}
	};
}();
//@ sourceURL=users/set-org.js