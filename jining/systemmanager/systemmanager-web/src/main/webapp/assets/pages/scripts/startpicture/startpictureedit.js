/**
 * Created by xinl on 2017/7/28.
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
var startpictureEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
    	schedule:'/schedule',
        path: '',
        dataUrl: '/startPicture',
        UUID: '',
        id: ''
    };

    // 全局Dom
    var jqueryMap = {
    	$container:null,
        $startpictureForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$startpictureForm = $('#startpictureForm');
    };

    var getSchedule = function (){
		$.ajax({
			url : configMap.path + configMap.dataUrl+'/schedule',
			dataType : 'JSON',
			type : 'GET',
			success : function(result) {
				sessionStorage.status = result.startStatus;
				$(".progress-bar",jqueryMap.$startpictureForm).css("width",result.schedule);
				 $(".progress-value",jqueryMap.$startpictureForm).html(result.schedule);
			},
		});
	};
    /**
     * 保存启动图片
     * @param callback
     */
    var saveStartPicture = function (callback) {
        var picName=$('#startpictureForm input[name="imgurl"]').val();
        function  warnimgTip(type,msg){
            App.alert({
                container: jqueryMap.$startpictureForm.closest(".modal-body"),
                place: 'prepend',
                type: type,
                message:msg,
                icon: 'fa fa-warning'
            });
        }

        if(configMap.id){
            if(picName){
            if(! (picName.slice(-4)=='.jpg'||picName.slice(-4)=='.gif'||picName.slice(-4)=='.png'||picName.slice(-5)=='.jpeg'))
            {   warnimgTip('warning','上传图片格式不正确,图片的拓展名只能是png 、jpg、 jpeg 、gif格式！');
                return false;
            }}
            if(!$('#startpictureForm input[name="imgname"]').val()){
                warnimgTip('warning','请填写图片名称！');
                return;
            }
            if(!$('#startpictureForm input[name="imgdesc"]').val()){
                warnimgTip('warning','请填写图片描述！');
                return;
            }
            if(!$('#startpictureForm input[name="startimeInput"]').val()){
	            warnimgTip('warning','请选择有效期起！');
	            return;
	        }
	        if(!$('#startpictureForm input[name="endimeInput"]').val()){
	            warnimgTip('warning','请选择有效期止！');
	            return;
	        }
	        if($('#startpictureForm input[name="startimeInput"]').val()>=$('#startpictureForm input[name="endimeInput"]').val()){
	            warnimgTip('warning','有效期起不得晚于有效期止！');
	            return;
	        }
        }else{
	        if(!$('#startpictureForm input[name="imgurl"]').val()){
	
	            warnimgTip('danger','上传图片不能为空,请选择需要上传的图片！');
	            return false;
	        }
	        if(! (picName.slice(-4)=='.jpg'||picName.slice(-4)=='.gif'||picName.slice(-4)=='.png'||picName.slice(-5)=='.jpeg'))
	        {   warnimgTip('warning','上传图片格式不正确,图片的拓展名只能是png 、jpg、 jpeg 、gif格式！');
	            return false;
	        }
	        if(!$('#startpictureForm input[name="imgname"]').val()){
	            warnimgTip('warning','请填写图片名称！');
	            return;
	        }
	        if(!$('#startpictureForm input[name="imgdesc"]').val()){
	            warnimgTip('warning','请填写图片描述！');
	            return;
	        }
	        if(!$('#startpictureForm input[name="startimeInput"]').val()){
	            warnimgTip('warning','请选择有效期起！');
	            return;
	        }
	        if(!$('#startpictureForm input[name="endimeInput"]').val()){
	            warnimgTip('warning','请选择有效期止！');
	            return;
	        }
	        if($('#startpictureForm input[name="startimeInput"]').val()>=$('#startpictureForm input[name="endimeInput"]').val()){
	            warnimgTip('warning','有效期起不得晚于有效期止！');
	            return;
	        }
        }
        var blockTarget = jqueryMap.$startpictureForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var imgurl= encodeURIComponent(jqueryMap.$startpictureForm.find('input[name="imgurl"]').val());//图片链接
        var imgname= encodeURIComponent(jqueryMap.$startpictureForm.find('input[name="imgname"]').val());//图片名称
        var imgdesc=encodeURIComponent(jqueryMap.$startpictureForm.find('input[name="imgdesc"]').val());//图片描述
        var imgremark= encodeURIComponent(jqueryMap.$startpictureForm.find('#imgremark').val());//备注信息
        var imgstate= encodeURIComponent(jqueryMap.$startpictureForm.find('input[name="imgstate"]:checked').val());//图片状态

        if (configMap.id) {

            //编辑启动图信息
           var  option1={
                url: configMap.path + configMap.dataUrl + '/updateStartPicture/' + configMap.id,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                headers: {"ClientCallMode": "ajax"}, //添加请求头部
                beforeSend:function(){
                	$("#schedule").css("display","block");
    				configMap.get = window.setInterval(getSchedule,"500");	
    			},
    			complete:function(){
    				clearInterval(configMap.get);
    				$(".progress-bar",jqueryMap.$startpictureForm).css("width","100%");
    				$(".progress-value",jqueryMap.$startpictureForm).html("100%");
    				sessionStorage.removeItem("status");
    			},
                success: function () {
                    App.unblockUI(blockTarget);
                    callback(true);
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$startpictureForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
           } 
           $("#startpictureForm").ajaxSubmit(option1);
        } else {
        	var imgurl= encodeURIComponent(jqueryMap.$startpictureForm.find('input[name="imgurl"]').val());//图片链接
            var imgname= encodeURIComponent(jqueryMap.$startpictureForm.find('input[name="imgname"]').val());//图片名称
            var imgdesc=encodeURIComponent(jqueryMap.$startpictureForm.find('input[name="imgdesc"]').val());//图片描述
            var imgremark= encodeURIComponent(jqueryMap.$startpictureForm.find('#imgremark').val());//备注信息
            var imgstate= encodeURIComponent(jqueryMap.$startpictureForm.find('input[name="imgstate"]:checked').val());//图片状态
            //添加启动图
            var option={
                url: configMap.path + configMap.dataUrl +'/insertStartPicture'/*+ '/insertStartPicture?imgurl='+ data.imgurl + '&imgname=' + data.imgname+
                '&imgdesc='+ data.imgdesc + '&imgremark=' + data.imgremark+ '&imgstate=' + data.imgstate*/,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                headers: {"ClientCallMode": "ajax"}, //添加请求头部
                beforeSend:function(){
                	$("#schedule").css("display","block");
    				configMap.get = window.setInterval(getSchedule,"500");	
    			},
    			complete:function(){
    				clearInterval(configMap.get);
    				$(".progress-bar",jqueryMap.$startpictureForm).css("width","100%");
    				$(".progress-value",jqueryMap.$startpictureForm).html("100%");
    				sessionStorage.removeItem("status");
    			},
                success: function () {
                    App.unblockUI(blockTarget);
                    callback(true);
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$startpictureForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            }
            $("#startpictureForm").ajaxSubmit(option);
        }
    };

    /**
     * 获取启动图信息
     * @param id
     */
    var getStartPicture = function (id) {
        if (configMap.id) {
            $('#uploadspan-mw').hide();
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/findStartPicture?id=' + id,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    //console.info(data);
                   /* jqueryMap.$startpictureForm.find('input[name="imgurl"]').val(data.tplj);*/
                    jqueryMap.$startpictureForm.find('input[name="imgname"]').val(data.tpmc);
                    jqueryMap.$startpictureForm.find('input[name="imgdesc"]').val(data.tpms);
                    jqueryMap.$startpictureForm.find('#imgremark').val(data.bzxx);
                    jqueryMap.$startpictureForm.find('#startimeInput3').val(moment(data.yxqq).format("YYYY-MM-DD"));
                    jqueryMap.$startpictureForm.find('#endimeInput3').val(moment(data.yxqz).format("YYYY-MM-DD"));
                   // jqueryMap.$startpictureForm.find('input[name="imgstate"]').iCheck(data.imgstate);
                    if(data.qdtzt=="上架"){
                        jqueryMap.$startpictureForm.find('input[id="imgshelves"]').attr("checked",true);
                    }
                    else{
                        jqueryMap.$startpictureForm.find('input[id="imgshelf"]').attr("checked",true);
                    }

                    if(data.applx=="0"){
                        jqueryMap.$startpictureForm.find('input[id="imgshelves1"]').attr("checked",true);
                    }
                    else{
                        jqueryMap.$startpictureForm.find('input[id="imgshelf1"]').attr("checked",true);
                    }
                },
                error: function () {
                    bootbox.alert('获取常见问题失败！');
                }
            });
        }
    };

    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            getStartPicture(id);
            $('#startimeAppicon3').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
            $('#endtimeAppicon3').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            	defaultDate : new Date()
            });
           
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveStartPicture: function (callback) {
            if (jqueryMap.$startpictureForm.valid()) {
                saveStartPicture(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=startpictureedit.js