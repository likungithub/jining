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
var appiconEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/appiconmanager/searchById',
        id: ''
    };

    // 全局Dom
    var jqueryMap = {
			$appiconForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$appiconForm = $('#eidtappiconForm');
    };
    var getSchedule = function (){
		$.ajax({
			url : configMap.path + configMap.schedule,
			dataType : 'JSON',
			type : 'GET',
			success : function(result) {
				sessionStorage.status = result.startStatus;
				$(".progress-bar",jqueryMap.$appiconForm).css("width",result.schedule);
				 $(".progress-value",jqueryMap.$appiconForm).html(result.schedule);
			},
		});
	};
    var saveappicon = function (callback) {
        var picName=$('#eidtappiconForm input[name="picture"]').val();
        console.log(picName,'mdw');
        function  warnimgTip(type,msg){
            App.alert({
                container:jqueryMap.$appiconForm.closest(".modal-body"),
                place: 'prepend',
                type: type,
                message:msg,
                icon: 'fa fa-warning'
            });
        }
        console.info($('#memoInfows_wkk').val())

        // if(!$('#eidtappiconForm input[name="picture"]').val()){
        //
        //     warnimgTip('danger','上传图片不能为空,请选择需要上传的图片！');
        //     return false;
        // }
        if(picName){
        if(! (picName.slice(-4)=='.jpg'||picName.slice(-4)=='.gif'||picName.slice(-4)=='.png'||picName.slice(-5)=='.jpeg'))
        {   warnimgTip('warning','上传图片格式不正确,图片的拓展名只能是png 、jpg、 jpeg 、gif格式！');
            return false;
        }}
        if(!$('#eidtappiconForm input[name="pictureName"]').val()){
            warnimgTip('warning','请填写图片名称！');
            return;
        }
        if(!$('#eidtappiconForm input[name="pictureContent"]').val()){
            warnimgTip('warning','请填写图片描述！');
            return;
        }
        if(!$('#memoInfows_wkk').val()){
            warnimgTip('warning','请填写备注信息！');
            return;
        }
        if(!$('#eidtappiconForm input[name="startimeInput"]').val()){
            warnimgTip('warning','请选择有效期起！');
            return;
        }
        if(!$('#eidtappiconForm input[name="endimeInput"]').val()){
            warnimgTip('warning','请选择有效止起！');
            return;
        }
        if($('#eidtappiconForm input[name="startimeInput"]').val()>=$('#eidtappiconForm input[name="endimeInput"]').val()){
            warnimgTip('warning','有效期起不得晚于有效期止！');
            return;
        }

        var blockTarget = jqueryMap.$appiconForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        
        var data = {	
        	type: $("input[name='type']:checked").val(),
        	pictureName: $('#pictureName').val(),
        	pictureContent: $('#pictureContent').val(),
        	memoInfo: $('#memoInfows_wkk').val(),
        	iconStat:$("input[name='TBZT']:checked").val()
        	
        };
        var  AppAlert=function(msg){
            App.alert({
                container: jqueryMap.$appiconForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: msg,
                closeInSeconds:3,
                icon: 'fa fa-warning'
            });
        }
        //参数类型不为空并且格式正确
        if(data.type==''){
            App.unblockUI(blockTarget);
            AppAlert('图片类型不能为空');
            return;
        }/*else {
            var bol=/^[A-Z]{2,10}$/.test(data.type);
            if(!bol){
            App.unblockUI(blockTarget);
            AppAlert('输入格式(2-10大写英文字母)，如‘预警提醒’:YJTX');
            return;
            }
        }*/

        //验证类型名称不能为空
        if(data.pictureName==''){
            App.unblockUI(blockTarget);
            AppAlert('图片名称不能为空');
            return;
        }
        //参数代码不能为空且要求格式正确
        if(data.memoInfo==''){
            App.unblockUI(blockTarget);
            AppAlert('备注信息不能为空');
            return;
        }/*else {
            var bol=/^[0-9]{3}$/.test(data.typecode);
            if(!bol){
                App.unblockUI(blockTarget);
                AppAlert('参数代码的输入格式(3位数字)，如：001');
                return;
            }
        }*/

            //参数名称不能为空
        /*    if(data.paramsname==''){
            App.unblockUI(blockTarget);
            AppAlert('参数名称不能为空');
            return;
        }*/


      

        var file=$('#picture').val();
        var type= $("input[name='type']:checked").val();
    	var pictureName= $('#pictureName').val();
    	var pictureContent= $('#pictureContent').val();
    	var memoInfo= $('#memoInfows_wkk').val();
    	var iconStat=$("input[name='TBZT']:checked").val();
        var url = configMap.path + '/appiconmanager/updateById';
        var requestType = 'POST';
        if (configMap.id) {
            url = url + "/" + configMap.id;
            requestType = 'POST';
        }

		var option={
            url: url,
            type: requestType,
            dataType: 'json',
            headers: {"ClientCallMode": "ajax"}, //添加请求头部
            beforeSend:function(){
            	$("#schedule").css("display","block");
				configMap.get = window.setInterval(getSchedule,"500");	
			},
			complete:function(){
				clearInterval(configMap.get);
				$(".progress-bar",jqueryMap.$appiconForm).css("width","100%");
				$(".progress-value",jqueryMap.$appiconForm).html("100%");
				sessionStorage.removeItem("status");
			},
            success: function () {
                App.unblockUI(blockTarget);
                callback(true);
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$appiconForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
                callback(false);
            }
		}
		$('#eidtappiconForm').ajaxSubmit(option);
    };

    var getappicon = function (id) {
		$.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
            	if(data.iconType==='顶部轮播'){
            		 $('[name="type"][value=0]').attr("checked", true);
            	}else if(data.iconType==='常用图标'){
            		 $('[name="type"][value=1]').attr("checked", true);
            	}else if(data.iconType==='财税服务'){
            		$('[name="type"][value=2]').attr("checked", true);
            	}else if(data.iconType==='财务分析'){
            		$('[name="type"][value=3]').attr("checked", true);
            	}else if(data.iconType==='其他'){
            		$('[name="type"][value=4]').attr("checked", true);
            	}else if(data.iconType==='信用贷'){
                    $('[name="type"][value=5]').attr("checked", true);
                }
               $('#pictureName').val(data.pictureName);
                $('#pictureContent').val(data.pictureContent);
                $('#memoInfows_wkk').val(data.momoInfo);
                if(data.iconStat==='已上架'){
                	 $('[name="TBZT"][value=0]').attr("checked", true);
                }else if(data.iconStat==='下架'){
                	 $('[name="TBZT"][value=1]').attr("checked", true);
                }

                if(data.applx==='0'){
                    $('[name="applx"][value=0]').attr("checked", true);
                }else if(data.applx==='1'){
                    $('[name="applx"][value=1]').attr("checked", true);
                }

                $('#startimeInput2').val(moment(data.startTime).format('YYYY-MM-DD'));
                $('#endimeInput2').val(moment(data.endTime).format('YYYY-MM-DD'));
            },
            error: function () {
                bootbox.alert('获取参数信息失败！');
            }
        });
    };

    var appiconValidation = function () {
        jqueryMap.$appiconForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: { 
            	type: {
                    minlength: 2,
                    required: true
                },
                typename: {
                    minlength: 2,
                    required: true
                },
                typecode: {
                    required: true
                },
                paramsname: {
                    required: true,
                    minlength: 1
                },
            },
            messages: { // 自定义显示消息
            	type: {
                    required: "请填写参数类型！"
                },
                typename: {
                    required: "请填写类型名称！"
                },
                typecode: {
                    required: "请填写参数代码！"
                },
                paramsname: {
                    required: "请填写参数名称！"
                }
            },
            errorPlacement: function (error, element) { // 为每种input设置错误输出位置
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) {
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.checkbox-list').size() > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) {
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function (element) { // 高亮显示控件form-group和has-error都是样式类
                $(element)
                    .closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) { // 取消高亮显示
                $(element)
                    .closest('.form-group').removeClass('has-error');
            },
            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error');
            }
        });

//        // 当下拉列表值发生变化时重新验证
//        $('.nationality', jqueryMap.$paramsForm).change(function () {
//            jqueryMap.$paramsForm.validate().element($(this));
//        });
//
//        // 日期发生变化时重新验证
//        $('.birthday input[name="birthday"]').change(function () {
//            jqueryMap.$paramsForm.validate().element($(this));
//        });
    };

    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            $('#startimeAppicon2').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
            $('#endtimeAppicon2').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });

            // 控件验证
            // paramsValidation();
            if (configMap.id) {
                getappicon(configMap.id);
            }
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        // 保存雇员信息，参数为回掉函数
        saveappicon: function (callback) {
            if (jqueryMap.$appiconForm.valid()) {
                saveappicon(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js