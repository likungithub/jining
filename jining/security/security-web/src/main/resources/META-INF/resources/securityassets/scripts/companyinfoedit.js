/**
 * Created by huxinquan on 2017/7/4.
 */
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

/*global $, App, moment, jQuery, bootbox, _ */
var companyInfoEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UEditorContainer: null,
        dataUrl: '/user/users',
        UUID: '',
        id: '',
        imgUrl:'/companyinfoimage.jsp',
        nsrsbh:'',
        name:''
    };

    // 全局Dom
    var jqueryMap = {
        $companyInfoForm: null,
        $setimg: null
    };

    var setJqueryMap = function () {
        jqueryMap.$companyInfoForm = $('#companyInfoForm');
    };
    
    var setSelect = function () {
    	/**
         * 获取省级单位,拼接到selectet标签中
         * */
        $.get(configMap.path + '/commonmanager/xzqy/sj',function(data) {
            for(var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].sjdm + '">' + data[i].xzqhMc + '</option>').appendTo($('select[name=province]'));
            }
            $('select[name=province]').select2({
            	placeholder:'选择省份',
            	width:'136px',
            	allowClear:true,
            	language:'zh-CN'
            });
            getCompanyInfo(); //获取值
        });        
    };
    
    var selectCity = function (e) { //省份改变后加载城市

        $('select[name=city]').empty();
        var v = $('select[name=province]').val();
        $.get(configMap.path+'/commonmanager/xzqy/xjXzqy?sjdm=' + v, function(data) {
            console.log(data, 333);
            for(var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('select[name=city]'));
            }
            $('select[name=city]').val(e);
            $('select[name=city]').select2({
            	placeholder:'选择城市',
            	width:'136px',
            	allowClear:true,
            	language:'zh-CN'
            });
        });
    };

    var saveCompanyInfo = function (callback) {
        var blockTarget = jqueryMap.$companyInfoForm.closest(".modal-content");
        var name = $('input[name="gsmc"]').val();
        var ifChangName = '0'; //未改变
        if (name != configMap.name) {
        	ifChangName = '1'; //改变了
        }
        var data = {
        	yhid:configMap.id,
            name: name,
            email: $('input[name="email"]').val(),
            sjhm: $('input[name="yddh"]').val(),//手机
            szsf: $('select[name=province]').val(), //省份
            szcs: $('select[name=city]').val(), //城市
            xxdz: $('input[name="xxdz"]').val(),//详细地址
            yyzz: $('input[name="businessLicense"]').val(),//营业执照
            gsjj: $('textarea[name="companyProfile"]').val(),//公司简介
            qyzz: $('textarea[name="qualification"]').val(),//企业资质
            qyyj: $('textarea[name="enterprisePerformance"]').val(),//企业业绩
            ifChangName:ifChangName
        };
        
        if(data.name == "" || data.name == null){
        	App.alert({
				container : jqueryMap.$companyInfoForm.closest(".modal-body"),
				place : 'prepend',
				type : 'danger',
				message :"公司名称不能为空！",
				icon : 'fa fa-warning'
			});
        	return false;
        }
        else{
        	if(data.sjhm == ""){
        		App.alert({
    				container : jqueryMap.$companyInfoForm.closest(".modal-body"),
    				place : 'prepend',
    				type : 'danger',
    				message :"请输入手机号码！",
    				icon : 'fa fa-warning'
    			});
            	return false;
        	}
        	else{
        		
                if(!whetherOrNotMobil(data.sjhm)){
                    App.alert({
                        container : jqueryMap.$companyInfoForm.closest(".modal-body"),
                        place : 'prepend',
                        type : 'danger',
                        message :"请输入正确的手机号码！",
                        icon : 'fa fa-warning'
                    });
                    return false;
        		
        		} else {
                    if(data.email == ""){
                        App.alert({
                            container : jqueryMap.$companyInfoForm.closest(".modal-body"),
                            place : 'prepend',
                            type : 'danger',
                            message :"请输入邮箱！",
                            icon : 'fa fa-warning'
                        });
                        return false;
                    }
                    else{
                		if(!whetherOrNotEmail(data.email)) {
                			App.alert({
                				container : jqueryMap.$companyInfoForm.closest(".modal-body"),
                				place : 'prepend',
                				type : 'danger',
                				message :"邮箱格式错误！",
                				icon : 'fa fa-warning'
                			});
                			return false;
                        }else{
                        	if(data.szsf == "" || data.szsf == null){
                            	App.alert({
                    				container : jqueryMap.$companyInfoForm.closest(".modal-body"),
                    				place : 'prepend',
                    				type : 'danger',
                    				message :"所在省份不能为空！",
                    				icon : 'fa fa-warning'
                    			});
                            	return false;
                            } else{
                            	if(data.szcs == "" || data.szcs == null){
                                	App.alert({
                        				container : jqueryMap.$companyInfoForm.closest(".modal-body"),
                        				place : 'prepend',
                        				type : 'danger',
                        				message :"所在城市不能为空！",
                        				icon : 'fa fa-warning'
                        			});
                                	return false;
                                }else{
                                	App.blockUI({
                                        target: blockTarget,
                                        boxed: true,
                                        message: '正在保存数据...'
                                    });
                                	
                                	$.ajax({
                                        url: '/customermanage/customerManage/UpdatecustomerByUser/' + configMap.id,
                                        type: 'PUT',
                                        contentType: 'application/json; charset=utf-8',
                                        dataType: 'JSON',
                                        data: JSON.stringify(data),
                                        success: function (result) {
                                            App.unblockUI(blockTarget);
                                            if(result.success){
                                                if (ifChangName === '1') {
                                                    Messenger().post({
                                                        message: '公司名称修改后，需重新登陆，才可生效！',
                                                        type: 'warning'
                                                    });
                                                }
                                            	callback(true);
                                            }
                                        },
                                        error: function () {
                                            App.unblockUI(blockTarget);
                                            App.alert({
                                                container: jqueryMap.$companyInfoForm.closest(".modal-body"),
                                                place: 'prepend',
                                                type: 'danger',
                                                message: '保存失败！',
                                                icon: 'fa fa-warning'
                                            });
                                            callback(false);
                                        }
                                    });
                                }
                            }
                        }
                    }
        		}
        	}
        }
    };

    var getCompanyInfo = function () {
    	$.ajax({
            url: '/customermanage/customerManage/customerByUser',
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
            	configMap.id = data.yhid; //custome r表数据id
                $('input[name="gsmc"]').val(data.name);
                configMap.name = data.name;
                $('input[name="email"]').val(data.email); // 邮箱
                $('input[name="yddh"]').val(data.sjhm); //手机
                $('input[name="gssh"]').val(data.nsrsbh);
                configMap.nsrsbh = data.nsrsbh;
                $('select[name=province]').val(data.szsf).select2(); // 省份
                $('input[name="xxdz"]').val(data.xxdz); //详细地址
                $('input[name="businessLicense"]').val(data.yyzz);//营业执照
                $('textarea[name="companyProfile"]').val(data.gsjj);//公司简介
                $('textarea[name="qualification"]').val(data.qyzz);//企业资质
                $('textarea[name="enterprisePerformance"]').val(data.qyyj);//企业业绩
                $('#businessLicenseImage', jqueryMap.$companyInfoForm).html("查看附件(" + data.yyzzNum + ")");
                $('#qualificationImage', jqueryMap.$companyInfoForm).html("查看附件(" + data.qyzzNum + ")");
                $('#enterprisePerformanceImage', jqueryMap.$companyInfoForm).html("查看附件(" + data.qyyjNum + ")");
                if(data.logo!==null){
                    $('#logosrc').attr("src",data.logo);
                }
                selectCity(data.szcs);
                var num = 300;
                surplusHowMany($("#companyProfile"),$("#companyProfileWords"),num);
                surplusHowMany($("#qualification"),$("#qualificationWords"),num);
                surplusHowMany($("#enterprisePerformance"),$("#enterprisePerformanceWords"),num);
            },
            error: function () {
                bootbox.alert('获取企业信息失败！');
            }
        });
    };

    var addImages = function () {
        jqueryMap.$companyInfoForm.find('[name^=image]').off('click').on('click', function () {
            var fjlx = $(this).attr('name').substr(5);
            var dialogButtons = {
                success : {
                    label: '<i class="fa fa-save"></i> 保&nbsp;存 ',                                                                                                         
                    className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                    callback: function () {
                        companyInfoImage.getfile(function (result) {
                            if (result) {
                                jqueryMap.$setimg.modal('hide');
                                $("#addfile").html("添加附件");
                            }
                        });
                        return false;
                    }
                }
            };

            $.get(configMap.path + configMap.imgUrl + "?id=" + configMap.id + "&status=insert" + "&fjlx=" + fjlx, function (html) {
                jqueryMap.$setimg = bootbox.dialog({
                    title: '添加附件',
                    message: html,
                    buttons: dialogButtons
                });
            });
        });
    };
    $('.selectlogo').on('click',function (){
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn-default btnBlue borderRadius4 colorfff",
            callback: function() {
                setlogourl.getlogo(function(result) {
                    if(result) {
                        jqueryMap.$setlogo.modal('hide');
                        Messenger().post({
                            message : "保存成功",
                            type : 'info'
                        });
                    }
                });
                return false;
            }
        };
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'

        };

        $.get("/setlogo.jsp", function(html) {
            jqueryMap.$setlogo = bootbox.dialog({
                title: '选择LOGO',
                message: html,
                buttons: dialogButtons
            });
        });
    });

    return {
        // 初始化
        init: function () {
            
            setJqueryMap();
            setSelect();
            addImages();

            //textarea输入字数限制
            // var obj1 = $("#companyInfoForm textarea:nth-child(1)");
            // var numObj1 = $("#companyInfoForm .wordNum span:nth-child(1)");
            // var obj2 = $("#companyInfoForm textarea:nth-child(2)");
            // var numObj2 = $("#companyInfoForm .wordNum span:nth-child(2)");
            // var obj3 = $("#companyInfoForm textarea:nth-child(3)");
            // var numObj3 = $("#companyInfoForm .wordNum span:nth-child(3)");
            var num = 300;
            checkHowMany($("#companyProfile"),$("#companyProfileWords"),num);
            checkHowMany($("#qualification"),$("#qualificationWords"),num);
            checkHowMany($("#enterprisePerformance"),$("#enterprisePerformanceWords"),num);
            //省市的选择
            $('select[name=province]').change(function() {
            	selectCity();
            });
            
            //公司税号修改
            $('#gssh').on('click',function (){
            	var dialogButtons = {};
                dialogButtons.success = {
                    label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                    className: "btn btn-default btnBlue borderRadius4 colorfff",
                    callback: function() {
                    	setNsrsbh.save(function(result) {
                            if(result.success) {
                                jqueryMap.$setlogo.modal('hide');
                                Messenger().post({
    								message : "保存成功",
    								type : 'info'
    							});
                                $('input[name="gssh"]').val(result.data);
                            }
                        });
                        return false;
                    }
                };
                dialogButtons.cancel = {
                     label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                     className: 'btn btn-default borderRadius4 color666'

                };

                $.get("/setNsrsbh.jsp?nsrsbh=" + configMap.nsrsbh , function(html) {
                    jqueryMap.$setlogo = bootbox.dialog({
                        title: '修改纳税人识别号',
                        message: html,
                        buttons: dialogButtons
                    });
                });
            });


        },
        saveCompanyInfo: function (callback) {
	        if (jqueryMap.$companyInfoForm.valid()) {
	        	saveCompanyInfo(callback);
	        } else {
	            callback(false);
	        }
	    }
    };
}();
//@ sourceURL=companyInfoedit.js