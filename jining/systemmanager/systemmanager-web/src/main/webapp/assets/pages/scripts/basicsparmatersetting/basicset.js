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

/*global $, App, moment, jQuery, bootbox, basicsparmatersettingEdit */

var basicsparmatersetting = function() {
	'use strict';

	// 全局属性参数
	var configMap = {
		path : '',
		dataUrl : '/basicsparmatersetting/findFile',
		datatablesLanguageFile : '/assets/global/plugins/datatables/chinese.json',
		basicsparmatersettingGrid : null,
		editcgsPageUrl : '/basicsparmatersetting/editcgs.jsp',
		editPageUrl : '/basicsparmatersetting/edit.jsp',
		viewPageUrl : '/basicsparmatersetting/view.jsp',
		editcgsBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="editcgs" data-toggle="tooltip" title="编辑雇员信息"><i class="fa fa-edit"></i></a>',
		deleteBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除雇员"><i class="fa fa-times"></i></a>',
		viewBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看雇员信息"><i class="fa fa-search"></i></a>'
	};

	// 全局Dom
	var jqueryMap = {
		$blockTarget : null,
		$basicsparmatersettingDialog : null
	};
	var data = {
		taxbeforeday : $('[name=taxbeforeday]').val(),
		paybeforeday : $('[name=paybeforeday]').val(),
		fterpayday : $('[name=afterpayday]').val()
	}
	var setJqueryMap = function() {
		jqueryMap.$blockTarget = $('body');
	};

	/**
	 * 获取到前台数据并把数据拼到文本框中
	 */
	var getbasicsparmatersetting = function() {
		$.ajax({
			url : configMap.path + "/bascisparmatersetting/findday1",
			dataType : 'JSON',
			type : 'GET',
			success : function(data) {
			    /*console.info("asd");
			    console.info(data[7].remindMessage);*/
				//财云管家管理员
				if(data[0].agencyNumber!="DL0000000001"){
					$('#tryTime').hide();
					// $('.shiyongqishezhi').hide();
				}
				if(data.length>7){
                    $('#findByOnTrial').val(data[7].remindMessage);
                }
				$('#taxbeforeday').val(data[0].remindMessage);
                $('#taxbeforeday').attr("disabled",true);
                $('#paybeforeday').val(data[1].remindMessage);
				$('#paybeforeday').attr("disabled",true); 
				$('#afterpayday').val(data[2].remindMessage);
				$('#afterpayday').attr("disabled",true);
				$('#findByTaskOut').val(data[3].remindMessage);
				$('#findByTaskOut').attr("disabled",true);
				$('#findByTaskExpiration').val(data[4].remindMessage);
				$('#findByTaskExpiration').attr("disabled",true);
                $('#findByOnTrial').attr("disabled",true);
                $('#expirecontract').val(data[5].remindMessage);
                $('#expirecontract').attr("disabled",true);
                $('#overduecontract').val(data[6].remindMessage);
                $('#overduecontract').attr("disabled",true);

				$('#check1').attr("checked","checked");
				$('#check2').attr("checked","checked");
				$('#check3').attr("checked","checked");
				$('#check4').attr("checked","checked");
				$('#check5').attr("checked","checked");
				$('#check6').attr("checked","checked");
                $('#check7').attr("checked","checked");
                $('#check8').attr("checked","checked");
			},
			error : function() {
				bootbox.alert('获取基础设置失败！');
			}
		});
	};
	
	/**
	 * 通过点击事件来判断是否选中
	 * 如果选中把文本框中的数据传到后台，成功返回init，并且设置文本框不可编辑状态
	 * 没有选中，文本框可编辑
	 */
	var getcheck=function(){
		$("#check1").on("click",function(){		
			if($("#check1").is(':checked')){
				if(!$('#taxbeforeday').val().trim()){
                    Messenger().post({
                        message: '报税提醒天数不能为空',
                        type: 'warning',
						id:'taxbeforeday1'
                    });
                    $("#check1").prop('checked',false);
                    return;
				}
				
                if(!/^([1-9]|1\d|2[0-5])$/.test($('#taxbeforeday').val().trim())){
                    Messenger().post({
                        message: '报税提醒天数只能是1-25的整数',
                        type: 'warning',
                    });
                    $('#taxbeforeday').val("");
                    $("#check1").prop('checked',false);
                    return;
                }
				var taxbeforeday = $("#taxbeforeday").val();
				$.ajax({
					url:configMap.path+"/bascisparmatersetting/updateRemindDay1/"+taxbeforeday,
					type:'post',
					datatype:'json',
					success:function(data){
                        Messenger().post({
                            message: '报税提醒天数设置成功',
                            type: 'success',
                            id:'taxbeforeday2'
                        });
					}
				})
				$('#taxbeforeday').prop("disabled",true);
			}
			else{
				$(this).prop("checked",false);
				$('#taxbeforeday').val("");
				$('#taxbeforeday').prop("disabled",false);
			}
		});

	//催费预警设置
   $("#check2").on("click",function(){
			if($("#check2").is(':checked')){
                if(!$('#paybeforeday').val().trim()){
                    Messenger().post({
                        message: '催费提醒天数不能为空',
                        type: 'warning',
                        id:'paybeforeday1'
                    });
                    $("#check2").prop('checked',false);
                    return;
                }
                if(!/^([1-9]|1\d|2[0-5])$/.test($('#paybeforeday').val().trim())){
                    Messenger().post({
                        message: '催费提醒天数只能是1-25的整数',
                        type: 'warning',
                    });
                    $('#paybeforeday').val('');
                    $("#check2").prop('checked',false);
                    return;
				}
				var paybeforeday = $("#paybeforeday").val();	
				$.ajax({
					url:configMap.path+"/bascisparmatersetting/updateRemindDay2/"+paybeforeday,
					type:'post',
					datatype:'json',
					success:function(data){
                        Messenger().post({
                            message: '催费提醒天数设置成功',
                            type: 'success',
                            id:'paybeforeday2'
                        });
					}
				})
				$('#paybeforeday').prop("disabled",true);
			}
			else{
				$(this).prop("checked",false);
				$('#paybeforeday').val("");
				$('#paybeforeday').prop("disabled",false);
			}
		});

   //欠费期限提醒设置
   $("#check3").on("click",function(){
	    if($("#check3").is(':checked')){
            if(!$('#afterpayday').val().trim()){
                Messenger().post({
                    message: '欠费提醒天数不能为空',
                    type: 'warning',
                    id:'afterpayday1'
                });
                $("#check3").prop('checked',false);
                return;
            }
            if(!/^([1-9]|1\d|2[0-5])$/.test($('#afterpayday').val().trim())){
                Messenger().post({
                    message: '欠费提醒天数只能是1-25的整数',
                    type: 'warning',
                });
                $('#afterpayday').val('');
                $("#check3").prop('checked',false);
                return;
            }
		var afterpayday = $("#afterpayday").val();
		$.ajax({
			url:configMap.path+"/bascisparmatersetting/updateRemindDay3/"+afterpayday,
			type:'post',
			datatype:'json',
			success:function(data){
				if(data.success){
					console.info(data);
                    Messenger().post({
                        message: '欠费提醒天数设置成功',
                        type: 'success',
                        id:'afterpayday3'
                    });
				}else{
                    Messenger().post({
                        message: '欠费提醒天数设置失败',
                        type: 'success',
                        id:'afterpayday3'
                    });
				}
				
			}
		})
		$('#afterpayday').prop("disabled",true);
	}
	else{
		$(this).prop("checked","");
		$('#afterpayday').val("");

		$('#afterpayday').on('change',function(){
	         $('#check3').removeAttr("disabled");			
		});
		$('#afterpayday').prop("disabled",false);

	}
  });

   //任务超期预警提醒设置
   $("#check4").on("click",function(){		
		if($("#check4").is(':checked')){
			if(!$('#findByTaskOut').val().trim()){
               Messenger().post({
                   message: '任务超期预警提醒天数不能为空',
                   type: 'warning',
					id:'updateTaskOut'
               });
               $("#check4").prop('checked',false);
               return;
			}
           if(!/^([1-9]|1\d|2[0-5])$/.test($('#findByTaskOut').val().trim())){
               Messenger().post({
                   message: '任务超期预警提醒天数只能是1-25的整数',
                   type: 'warning',
               });
               $('#findByTaskOut').val("");
               $("#check4").prop('checked',false);
               return;
           }
			var taxbeforeday = $("#findByTaskOut").val();
			$.ajax({
				url:configMap.path+"/bascisparmatersetting/updateTaskOut/"+taxbeforeday,
				type:'post',
				datatype:'json',
				success:function(data){
                   Messenger().post({
                       message: '任务超期预警提醒天数设置成功',
                       type: 'success',
                       id:'updateTaskOut1'
                   });
				}
			})
			$('#findByTaskOut').prop("disabled",true);
		}
		else{
			$(this).prop("checked",false);
			$('#findByTaskOut').val("");
			$('#findByTaskOut').prop("disabled",false);
		}
	});

   //任务即将到期预警提醒设置
   $("#check5").on("click",function(){		
		if($("#check5").is(':checked')){
			if(!$('#findByTaskExpiration').val().trim()){
               Messenger().post({
                   message: '任务即将到期预警提醒天数不能为空',
                   type: 'warning',
					id:'updateTaskExpiration'
               });
               $("#check5").prop('checked',false);
               return;
			}
           if(!/^([1-9]|1\d|2[0-5])$/.test($('#findByTaskExpiration').val().trim())){
               Messenger().post({
                   message: '任务即将到期预警提醒天数只能是1-25的整数',
                   type: 'warning',
               });
               $('#findByTaskExpiration').val("");
               $("#check5").prop('checked',false);
               return;
           }
			var taxbeforeday = $("#findByTaskExpiration").val();
			$.ajax({
				url:configMap.path+"/bascisparmatersetting/updateTaskExpiration/"+taxbeforeday,
				type:'post',
				datatype:'json',
				success:function(data){
                   Messenger().post({
                       message: '任务即将到期预警提醒天数设置成功',
                       type: 'success',
                       id:'updateTaskExpiration1'
                   });
				}
			})
			$('#findByTaskExpiration').prop("disabled",true);
		}
		else{
			$(this).prop("checked",false);
			$('#findByTaskExpiration').val("");
			$('#findByTaskExpiration').prop("disabled",false);
		}
	});

        //合同到期预警提醒设置
        $("#check6").on("click",function(){
            if($("#check6").is(':checked')){
                if(!$('#expirecontract').val().trim()){
                    Messenger().post({
                        message: '合同到期预警提醒天数不能为空',
                        type: 'warning',
                        id:'expirecontracttx'
                    });
                    $("#check6").prop('checked',false);
                    return;
                }
                if(!/^([1-9]|1\d|2[0-5])$/.test($('#expirecontract').val().trim())){
                    Messenger().post({
                        message: '合同到期预警提醒天数只能是1-25的整数',
                        type: 'warning',
                    });
                    $('#expirecontract').val("");
                    $("#check6").prop('checked',false);
                    return;
                }
                var taxbeforeday = $("#expirecontract").val();
                $.ajax({
                    url:configMap.path+"/bascisparmatersetting/expirecontract/"+taxbeforeday,
                    type:'post',
                    datatype:'json',
                    success:function(data){
                        Messenger().post({
                            message: '合同到期预警提醒天数设置成功',
                            type: 'success',
                            id:'expirecontracttx'
                        });
                    }
                })
                $('#expirecontract').prop("disabled",true);
            }
            else{
                $(this).prop("checked",false);
                $('#expirecontract').val("");
                $('#expirecontract').prop("disabled",false);
            }
        });

        //合同超期预警提醒设置
        $("#check7").on("click",function(){
            if($("#check7").is(':checked')){
                if(!$('#overduecontract').val().trim()){
                    Messenger().post({
                        message: '合同超期预警提醒天数不能为空',
                        type: 'warning',
                        id:'overduecontracttx'
                    });
                    $("#check7").prop('checked',false);
                    return;
                }
                if(!/^([1-9]|1\d|2[0-5])$/.test($('#overduecontract').val().trim())){
                    Messenger().post({
                        message: '合同超期预警提醒天数只能是1-25的整数',
                        type: 'warning',
                    });
                    $('#overduecontract').val("");
                    $("#check7").prop('checked',false);
                    return;
                }
                var taxbeforeday = $("#overduecontract").val();
                $.ajax({
                    url:configMap.path+"/bascisparmatersetting/overduecontract/"+taxbeforeday,
                    type:'post',
                    datatype:'json',
                    success:function(data){
                        Messenger().post({
                            message: '合同超期预警提醒天数设置成功',
                            type: 'success',
                            id:'overduecontracttx'
                        });
                    }
                })
                $('#overduecontract').prop("disabled",true);
            }
            else{
                $(this).prop("checked",false);
                $('#overduecontract').val("");
                $('#overduecontract').prop("disabled",false);
            }
        });


   //财云管家试用期限设置
   $("#check8").on("click",function(){
		if($("#check8").is(':checked')){
			if(!$('#findByOnTrial').val().trim()){
              Messenger().post({
                  message: '财云管家试用期不能为空',
                  type: 'warning',
					id:'updateTaskExpiration'
              });
              $("#check8").prop('checked',false);
              return;
			}
          if(!/^(0?[[1-9]|1[0-2])$/.test($('#findByOnTrial').val().trim())){
              Messenger().post({
                  message: '财云管家试用期只能是1-12的整数',
                  type: 'warning',
              });
              $('#findByOnTrial').val("");
              $("#check8").prop('checked',false);
              return;
          }
			var taxbeforeday = $("#findByOnTrial").val();
			$.ajax({
				url:configMap.path+"/bascisparmatersetting/updateOnTrial/"+taxbeforeday,
				type:'post',
				datatype:'json',
				success:function(data){
                  Messenger().post({
                      message: '财云管家试用期限设置成功',
                      type: 'success',
                      id:'updateTaskExpiration1'
                  });
				}
			})
			$('#findByOnTrial').prop("disabled",true);
		}
		else{
			$(this).prop("checked",false);
			$('#findByOnTrial').val("");
			$('#findByOnTrial').prop("disabled",false);
		}
	  });
	}
	
	
	return {
		init : function() {
			var tabid=$('#basicparamsmastersetting-m').parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid);
			setJqueryMap();
			// 控件验证
			getbasicsparmatersetting();
			getcheck();
//			gettext();
		},
		setPath : function(path) {
			configMap.path = path;
		},
		reload : function() {
			initbasicsparmatersettingData();
		}
	};
}();
// @ sourceURL=basicsparmatersetting.js
