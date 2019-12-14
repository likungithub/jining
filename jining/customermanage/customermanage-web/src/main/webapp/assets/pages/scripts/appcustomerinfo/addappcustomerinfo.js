var appcustomerinfoAdd = function () {
    'use strict';

    var configMap = {
        id:'',
        sjhm:'',
        path: '',
        dataUrl: '/appcustomerinfo/appcustomerinfo',
        checkjshmUrl: '/appcustomerinfo/checksjhm',
        flag:'',
        datas :[],
        yxid:'',
        dljgBm:'',
        currentZydm:''
    };

   /* var datasmc={

    }*/
    // 全局Dom
    var jqueryMap = {
    	$workorderForm:null
    };

    var setJqueryMap = function () {
        jqueryMap.$workorderForm = $('#business_m');
    };
    var openModal1 = function (title, url, type) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    $('#addFQR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    $('#tjrmcSl','#business_m').val($('#alreadyPer li','#allotStaffList_m').attr('user'));
                    $('#tjrmcSl1','#business_m').val( $('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                }
            };
        }
        if (type === 'edit1') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    // $('#addFQR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    $('input[name="khjlmc"]','#business_m').val($('#alreadyPer li','#allotStaffList_m').attr('user'));
                    $('input[name="khjldm"]','#business_m').val( $('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                }
            };
        }
        if(type==='edit2'){
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    // $('#addZXR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    var strArr=[],strArr1=[],strArr2=[];
                    $('#alreadyPer li','#allotStaffList_m').each(function(){
                        strArr.push($(this).attr('user'));//用户名称
                        strArr1.push($(this).attr('zydm')+"-"+$(this).attr('user'));//职员代码
                        strArr2.push($(this).children('img').attr('src'));//职员头像
                    });
                    if(configMap.yxid){
                        $.ajax({
                            url:configMap.path+'/intentionCustomer/deleteShareCustomer/'+configMap.yxid+'/'+configMap.dljgBm+'/'+configMap.currentZydm,
                            type:'DELETE',
                            success:function () {
                                /*alert(1);*/
                            }
                        })
                    }

                    console.log(strArr1);
                    console.log(strArr2);
                    var str3 =strArr2.join(',');
                    var str1 = strArr.join(' ,');
                    var str2 = strArr1.join(',');
                    console.log(str2);
                    $('#gxkh').html(str1)
                        .attr("data-original-title",str1)
                        .tooltip();

                    $('#gxkh').attr('zxry_dm',str2);
                    console.log($('#gxkh').attr('zxry_dm'));
                    var zydms="";
                    /*var zydms=$('#gxkh').html().split(",");*/
                    for(var i=0;i<$('#gxkh').attr('zxry_dm').split(",").length;i++){
                        zydms = $('#gxkh').attr('zxry_dm').split(",")[i];
                        configMap.datas.push(zydms);
                    }
                    /*$('#gxkh').attr('rtx',str3);*/
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };

        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className:'addappcustomerinfo_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    //选择推荐人事件 用focus事件
    $('#tjrmcSl','#business_m').focus(function(){
        openModal1('选推荐人', '/systemmanager/businesscooperate/staffList.jsp?type=one','edit');
	});
    //选择客户经理
    $('input[name="khjlmc"]','#business_m').focus(function(){
        openModal1('选推荐人', '/systemmanager/businesscooperate/staffList.jsp?type=one','edit1');
    });
    $('#gxkh').focus(function () {
        openModal1('选择职员','/systemmanager/businesscooperate/staffList.jsp?type=any','edit2');
    })
    var check = function (){
    	if($('input[name="yhxm"]',jqueryMap.$workorderForm).val()==""||$('input[name="yhxm"]',jqueryMap.$workorderForm).val()==null){
    		App.alert({
				container : jqueryMap.$workorderForm.closest(".modal-body"),
				place : 'prepend',
				type : 'danger',
				message :"请填写用户姓名！",
				icon : 'fa fa-warning'
			});
    		return false;
    	} else if ($('input[name="sjhm"]',jqueryMap.$workorderForm).val()==""||$('input[name="sjhm"]',jqueryMap.$workorderForm).val()==null) {
    		App.alert({
				container : jqueryMap.$workorderForm.closest(".modal-body"),
				place : 'prepend',
				type : 'danger',
				message :"请填写手机号码！",
				icon : 'fa fa-warning'
			});
    		return false;
    	} else if(!whetherOrNotMobil($('input[name="sjhm"]',jqueryMap.$workorderForm).val())){
    		App.alert({
				container : jqueryMap.$workorderForm.closest(".modal-body"),
				place : 'prepend',
				type : 'danger',
				message :"请填写正确的手机号码！",
				icon : 'fa fa-warning'
			});
    		return false;
    	}
        else if(($('input[name="nsrsbh"]',jqueryMap.$workorderForm).val()!="")&&!whetherOrNotNsrbh($('input[name="nsrsbh"]',jqueryMap.$workorderForm).val())){
            App.alert({
                container : jqueryMap.$workorderForm.closest(".modal-body"),
                place : 'prepend',
                type : 'danger',
                message :"请填写正确的纳税人识别号！",
                icon : 'fa fa-warning'
            });
            return false;
        }else if($('textarea[name="bzxx"]',jqueryMap.$workorderForm).val()!=""&&$('textarea[name="bzxx"]',jqueryMap.$workorderForm).val().length>500){
    		App.alert({
				container : jqueryMap.$workorderForm.closest(".modal-body"),
				place : 'prepend',
				type : 'danger',
				message :"备注信息字数不能超过500字限制！",
				icon : 'fa fa-warning'
			});
    		return false;
    	} else {
    		return true;
    	}
    };
    var getBuinesee=function () {
        $.ajax({
            url:configMap.path+'/appcustomerinfo/getBuinessContent/'+configMap.id,
            type:'GET',
            success:function (data) {
                console.info(data);
                configMap.sjhm=data.dlzh;
                jqueryMap.$workorderForm.find('input[name="yhxm"]').val(data.yhmc);
              /*  jqueryMap.$workorderForm.find('input[name="yhxm"]').attr("readonly",true);*/

                jqueryMap.$workorderForm.find('input[name="sjhm"]').val(data.dlzh);
              /*  jqueryMap.$workorderForm.find('input[name="sjhm"]').attr("readonly",true);*/

                jqueryMap.$workorderForm.find('input[name="nsrsbh"]').val(data.nsrsbh);
                jqueryMap.$workorderForm.find('input[name="gsmc"]').val(data.gsmc);
                jqueryMap.$workorderForm.find('textarea[name="bzxx"]').val(data.bzxx);
                jqueryMap.$workorderForm.find('input[name="tjrmc"]').val(data.tjrdm);
                jqueryMap.$workorderForm.find('input[name="tjrdm"]').val(data.tjrdmm);

                jqueryMap.$workorderForm.find('input[name="khjlmc"]').val(data.khjlmc);
                jqueryMap.$workorderForm.find('input[name="khjldm"]').val(data.khjldm);

                jqueryMap.$workorderForm.find('input[name="wbtjrmc"]').val(data.wbtjrmc);
                $('#sjhmCopy',jqueryMap.$workorderForm).val(data.dlzh);
                $('input[name="bjje"]',jqueryMap.$workorderForm).val((data.bjje).toFixed(2));
                var zt = data.sjzt;
                var ztt = '003,004'

                if(!(ztt.search(zt)==-1)){
                    jqueryMap.$workorderForm.find('select[name="sjzt"]').val(zt);
                }
                if(data){
                    $.ajax({
                        url:configMap.path+'/intentionCustomer/findByYxId/'+configMap.yxid,
                        type:'GET',
                        success:function (result) {
                            var zydm_zymc="";
                            var datasa="";
                            console.info("~~~~~~~~~~~~~~~~~~~~~")
                            console.info(result);
                            if(result){
                                for(var i=0;i<result.length;i++){
                                    datasa+=result[i].employeeName+",";
                                    zydm_zymc+=result[i].employeeCode+"-"+result[i].employeeName+",";
                                }
                                $('#gxkh',jqueryMap.$workorderForm).html(datasa.substring(0,datasa.length-1))
                                $('#gxkh',jqueryMap.$workorderForm).attr('zxry_dm',zydm_zymc.substring(0,zydm_zymc.length-1));
                            }

                        }
                    })
                }
            }
        })
    }
    var savebusiness = function (callback){
    	var data = {
                khjlmc: jqueryMap.$workorderForm.find('input[name="khjlmc"]').val(),
                khjldm: jqueryMap.$workorderForm.find('input[name="khjldm"]').val(),
    			yhxm: jqueryMap.$workorderForm.find('input[name="yhxm"]').val(),
    			sjhm: jqueryMap.$workorderForm.find('input[name="sjhm"]').val(),
    			nsrsbh: jqueryMap.$workorderForm.find('input[name="nsrsbh"]').val(),
    			gsmc: jqueryMap.$workorderForm.find('input[name="gsmc"]').val(),
    			bzxx: jqueryMap.$workorderForm.find('textarea[name="bzxx"]').val(),
			    tjrdm:jqueryMap.$workorderForm.find('input[name="tjrdm"]').val(),
                wbtjrmc:jqueryMap.$workorderForm.find('input[name="wbtjrmc"]').val(),
                sjzt:jqueryMap.$workorderForm.find('select[name="sjzt"]').val(),
                zydm:configMap.datas,
                dljgBm:$('#dljgBm',jqueryMap.$workorderForm).val(),
                bjje:$('input[name="bjje"]',jqueryMap.$workorderForm).val(),
    	}
    	console.log(data);
    	var blockTarget = jqueryMap.$workorderForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var ifReapt="/appcustomerinfo/addIfRepeat/"
        if(configMap.id){
            ifReapt="/appcustomerinfo/updateIfRepeat/"
            $.ajax({
                url:configMap.path+ifReapt+$('input[name="sjhm"]',jqueryMap.$workorderForm).val()+'/'+$('#sjhmCopy',jqueryMap.$workorderForm).val()+'/'+configMap.dljgBm,
                type:'GET',
                success:function (result) {
                    App.unblockUI(blockTarget);
                        if(result.success){
                            $.ajax({
                                url:configMap.path+'/appcustomerinfo/updateCustomerInfo/'+configMap.id+'/'+configMap.yxid,
                                type:'POST',
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'JSON',
                                data: JSON.stringify(data),
                                success:function (result) {
                                    App.unblockUI(blockTarget);
                                    if(result.success){
                                        $.get('/customermanage/SystemMessageController/getAllMessageReminder', null, function(result) {
//            	console.info(result);
                                            if(result > 0) {
                                                $('#announcementInfoWarningTX').removeClass('circleDisplay');
                                                $('#announcementInfoWarningTX').html(result);
                                                $('.top-message-m').addClass('bellSwingMessage');
                                            } else {
                                                $('#announcementInfoWarningTX').css({display:'none'});
                                                $('.top-message-m').removeClass('bellSwingMessage');
                                            }
                                        });
                                        callback(true);
                                    } else {
                                        App.alert({
                                            container: jqueryMap.$workorderForm.closest(".modal-body"),
                                            place: 'prepend',
                                            type: 'danger',
                                            message: result.message,
                                            icon: 'fa fa-warning'
                                        });
                                        callback(false);
                                    }
                                }
                            })
                        }else{
                            App.alert({
                                container : jqueryMap.$workorderForm.closest(".modal-body"),
                                place : 'prepend',
                                type : 'danger',
                                message :result.message,
                                icon : 'fa fa-warning'
                            });
                            callback(false);
                        }
                }
            })

        }else{
            $.ajax({
                url:configMap.path+ifReapt+$('input[name="sjhm"]',jqueryMap.$workorderForm).val()+'/'+configMap.dljgBm,
                type:'GET',
                success:function (resultData) {
                    App.unblockUI(blockTarget);
                    if(resultData.success){
                        $.ajax({
                            url: configMap.path + configMap.dataUrl,
                            type: 'POST',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'JSON',
                            data: JSON.stringify(data),
                            success: function (result) {
                                App.unblockUI(blockTarget);
                                if(result.success){
                                    $.get('/customermanage/SystemMessageController/getAllMessageReminder', null, function(result) {
//            	console.info(result);
                                        if(result > 0) {
                                            $('#announcementInfoWarningTX').removeClass('circleDisplay');
                                            $('#announcementInfoWarningTX').html(result);
                                            $('.top-message-m').addClass('bellSwingMessage');
                                        } else {
                                            $('#announcementInfoWarningTX').css({display:'none'});
                                            $('.top-message-m').removeClass('bellSwingMessage');
                                        }
                                    });
                                    callback(true);
                                } else {
                                    App.alert({
                                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                                        place: 'prepend',
                                        type: 'danger',
                                        message: result.message,
                                        icon: 'fa fa-warning'
                                    });
                                    callback(false);
                                }
                            },
                            error: function () {
                                App.unblockUI(blockTarget);
                                App.alert({
                                    container: jqueryMap.$workorderForm.closest(".modal-body"),
                                    place: 'prepend',
                                    type: 'danger',
                                    message: '保存失败！',
                                    icon: 'fa fa-warning'
                                });
                                callback(false);
                            }
                        });
                    }else{
                        App.alert({
                            container: jqueryMap.$workorderForm.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: resultData.message,
                            icon: 'fa fa-warning'
                        });
                        callback(false);
                    }
                }
            })

        }
    }
    return {
        init: function (id,yxid,dljgBm,currentZydm) {
            configMap.id=id;
            configMap.yxid=yxid;
            configMap.dljgBm=dljgBm;
            configMap.currentZydm=currentZydm;
        	setJqueryMap();
        	if(id){
                getBuinesee();
            }
            $('input[name="sjhm"]',jqueryMap.$workorderForm).blur(function () {
                if($('input[name="sjhm"]',jqueryMap.$workorderForm).val()==''||$('input[name="sjhm"]',jqueryMap.$workorderForm).val()==null){
                    App.alert({
                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: "手机号不得为空！",
                        icon: 'fa fa-warning'
                    })
                }else{
                    if(configMap.id){
                        $.ajax({
                            url:configMap.path+"/appcustomerinfo/updateIfRepeat/"+$('input[name="sjhm"]',jqueryMap.$workorderForm).val()+'/'+$('#sjhmCopy',jqueryMap.$workorderForm).val()+'/'+configMap.dljgBm,
                            type:'GET',
                            success:function (result) {
                                if(result.success){

                                }else{
                                    App.alert({
                                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                                        place: 'prepend',
                                        type: 'danger',
                                        message: result.message,
                                        icon: 'fa fa-warning'
                                    })
                                }
                            }
                        })
                    }else{
                        $.ajax({
                            url:configMap.path+"/appcustomerinfo/addIfRepeat/"+$('input[name="sjhm"]',jqueryMap.$workorderForm).val()+'/'+configMap.dljgBm,
                            type:'GET',
                            success:function (result) {
                                if(result.success){
                                }else{
                                    App.alert({
                                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                                        place: 'prepend',
                                        type: 'danger',
                                        message: result.message,
                                        icon: 'fa fa-warning'
                                    })
                                }
                            }
                        })
                    }
                }
            })
            $('input[name="yhxm"]',jqueryMap.$workorderForm).blur(function () {
                if($('input[name="yhxm"]',jqueryMap.$workorderForm).val()==''||$('input[name="yhxm"]',jqueryMap.$workorderForm).val()==null){
                    App.alert({
                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: "用户姓名不得为空！",
                        icon: 'fa fa-warning'
                    })
                }
            })
            $('input[name="sjhm"]',jqueryMap.$workorderForm).focus(function () {
                $('.custom-alerts').hide();
            })
        },
        setPath: function (path) {
            configMap.path = path;
        },
        savebusiness: function (callback){
    		if(check()){
    		    if(configMap.id){
    		        if($('[name="sjhm"]').val()==configMap.sjhm){
                        savebusiness(callback);
                    }else{
                        $.ajax({
                            url: configMap.path + configMap.checkjshmUrl + "/" + $('input[name="sjhm"]',jqueryMap.$workorderForm).val(),
                            type: 'GET',
                            success: function (result) {
                                if(result.success){
                                    savebusiness(callback);
                                } else {
                                    App.alert({
                                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                                        place: 'prepend',
                                        type: 'danger',
                                        message: result.message,
                                        icon: 'fa fa-warning'
                                    });
                                    callback(false);
                                }
                            },
                            error: function () {
                            }
                        });
                    }
                }else{
    			$.ajax({
    	            url: configMap.path + configMap.checkjshmUrl + "/" + $('input[name="sjhm"]',jqueryMap.$workorderForm).val(),
    	            type: 'GET',
    	            success: function (result) {
    	                if(result.success){
    	                	savebusiness(callback);
    	                } else {
    	                	App.alert({
    	                        container: jqueryMap.$workorderForm.closest(".modal-body"),
    	                        place: 'prepend',
    	                        type: 'danger',
    	                        message: result.message,
    	                        icon: 'fa fa-warning'
    	                    });
    	                	callback(false);
    	                }
    	            },
    	            error: function () {
    	            }
    	        });
                }
        	}else {
        		callback(false); 
        	}
        }
    };
}();
