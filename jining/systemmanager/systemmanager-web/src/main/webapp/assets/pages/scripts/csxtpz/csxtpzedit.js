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
                case "button": break;
                default: formElem.value = data[name];
            }
        }
    });
};

var productEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/csxtpz/csxtpz',
        id: '',
        get:null
    };

    // 全局Dom
    var jqueryMap = {
			$productForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$productForm = $('#productForm');
    };
    var saveProduct = function (callback) {
        var blockTarget = jqueryMap.$productForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var data =$("#productForm").serializeObject();
        var  AppAlert=function(msg){
            App.alert({
                container: jqueryMap.$productForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: msg,
                icon: 'fa fa-warning'
            });
        }

        if((data.dmPzlx.length>3)||(data.dmPzlx.length<=0)){
        	App.unblockUI(blockTarget);
            AppAlert('配置类型不能为空并且长度不能大于3!');
            return;
        }

        if(data.key1.length<=0){
            App.unblockUI(blockTarget);
            AppAlert('K1不能为空!');
            return;
        }
        
        var url = configMap.path + configMap.dataUrl;
        if (configMap.id) {
            url = url + "/" + configMap.id;
        }
          ;
        //var getDate =  JSON.stringify(data);

        $.ajax({
            url: url,
            type: 'POST',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success:function(data){
                App.unblockUI(blockTarget);
                if(data.success){
                    Messenger().post({
                        message : "保存成功！",
                    });
                    callback(true);
                } else {
                    Messenger().post({
                        message : data.message,
                        type : 'error'
                    });
                    callback(false);
                }
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$productForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
                callback(false);
            }
        });
    };

    var getCsxtpz = function (id) {
		$.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                //$('[name="productName"]').val(data.productName);
                $("#productForm").populateForm(data);
            },
            error: function () {
                bootbox.alert('获取参数信息失败！');
            }
        });
    };

    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            if (configMap.id) {
                getCsxtpz(configMap.id);
            }
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },

        saveProduct: function (callback) {
            if (jqueryMap.$productForm.valid()) {
                saveProduct(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js