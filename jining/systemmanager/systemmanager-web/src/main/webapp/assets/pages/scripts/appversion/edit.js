$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.fn.populateForm = function(data){
    return this.each(function(){
        var formElem, name;
        if(data == null){this.reset(); return; }
        for(var i = 0; i < this.length; i++){
            formElem = this.elements[i];
            //checkbox的name可能是name[]数组形式
            name = (formElem.type == "checkbox")? formElem.name.replace(/(.+)\[\]$/, "$1") : formElem.name;
            if(data[name] == undefined) continue;
            if( formElem.id=='id_rjlx'){
               if( data[name]=='0'){
                   data[name]='ios';
                   $("#id_ios_url").show();
                   $("#id_picture").hide();
               }else{
                   data[name]='android';
                   $("#id_picture").show();
                   $("#id_ios_url").hide();
               }
            }
            switch(formElem.type){
                case "checkbox":
                    if(data[name] == ""){
                        formElem.checked = false;
                    }else{
                        //数组查找元素
                        if(data[name].indexOf(formElem.value) > -1){
                            formElem.checked = true;
                        }else{
                            formElem.checked = false;
                        }
                    }
                    break;
                case "radio":
                    if(data[name] == ""){
                        formElem.checked = false;
                    }else if(formElem.value == data[name]){
                        formElem.checked = true;
                    }
                    break;
                case "button","file": break;
                default: formElem.value = data[name];
            }
        }
    });
};
var edit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/appversion/show',
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
			url : configMap.path + "/appversion/schedule",
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
        var blockTarget = jqueryMap.$appiconForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
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

        var url = configMap.path + '/appversion/updateById';
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
                jqueryMap.$appiconForm.populateForm(data);
            },
            error: function () {
                bootbox.alert('获取信息失败！');
            }
        });
    };

    var appiconValidation = function () {
        $('#eidtappiconForm').validate({
            onfocusout: function(element) { $(element).valid(); },
            rules: {
                picture: {
                     required: true
                 },
                rjbb:{
                    required: true
                },
                xzdz:{
                   required:true
                }
            },
            messages: { // 自定义显示消息
                picture: {
                    required: "请选择更新包！"
                },
                rjbb:{
                    required:"请填写软件版本！"
                },
                xzdz:{
                    required:"请输入更新包地址！"
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.parent());
            }

        });
    };



    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            if (configMap.id) {
                getappicon(configMap.id);
            }
            appiconValidation();
        },

        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        // 保存，参数为回掉函数
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