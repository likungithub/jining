/**
 * Created by huxinquan on 2017/7/31.
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
var appsysteminformationEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UEditorContainer: null,
        dataUrl: '/appSystemInformation',
        UUID: '',
        id: '',
        ue: ''
    };

    // 全局Dom
    var jqueryMap = {
        $appsysteminformationForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$appsysteminformationForm = $('#appsysteminformationForm');
    };

    //    初始化select2
    var  initsle=function(){
        //$('#mobileDevice-m').select2({ minimumResultsForSearch: Infinity});
        //$('#appInfo-m').select2({ minimumResultsForSearch: Infinity});
    }();


    var saveAppSystemInformation = function (callback) {
        var blockTarget = jqueryMap.$appsysteminformationForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var data = {
            phoneType: encodeURIComponent(jqueryMap.$appsysteminformationForm.find('select[name="phoneType"]').val()),
            informationTypeCode: encodeURIComponent(jqueryMap.$appsysteminformationForm.find('select[name="informationType"]').val()),
            messageJj: encodeURIComponent(jqueryMap.$appsysteminformationForm.find('#appInfojj-m').val()),
            messageZt: encodeURIComponent(jqueryMap.$appsysteminformationForm.find('#appInfozt-m').val()),
            message: encodeURIComponent(configMap.ue.getContent()),
            clientType:encodeURIComponent(jqueryMap.$appsysteminformationForm.find('select[name="clientType"]').val()),
            sjsj: encodeURIComponent(jqueryMap.$appsysteminformationForm.find('input[name="sjsj"]').val()),

        };


        var v = $('#appInfo-m').val();
        if(v!='001'){
            var now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth();//得到月份
            var date = now.getDate();//得到日期
            month = month + 1;
            if (month < 10) month = "0" + month;
            data.sjsj=year+'-'+month+'-'+date;
        }

        for(var key in data){
           var value = data[key];
           if(value==''){
               App.alert({
                   container: blockTarget,
                   place: 'prepend',
                   type: 'danger',
                   message: "请将信息填写完整!",
                   icon: 'fa fa-warning'
               });
               App.unblockUI(blockTarget);
               return;
           }
        }

        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/updateAppSystemInformation?id=' + configMap.id +
                '&phoneType=' + data.phoneType + '&informationTypeCode=' + data.informationTypeCode +
                '&messageJj=' + data.messageJj+
                '&messageZt=' + data.messageZt+
                '&message=' + data.message+
                '&clientType='+data.clientType+'&sjsj='+data.sjsj,
                type: 'PUT',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                success: function () {
                    App.unblockUI(blockTarget);
                    callback(true);
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$appsysteminformationForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            });
        } else {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/addAppSystemInformation?phoneType=' + data.phoneType +
                '&informationTypeCode=' + data.informationTypeCode + '&messageJj=' + data.messageJj + '&messageZt=' + data.messageZt +  '&message=' + data.message+
                '&clientType='+data.clientType+'&sjsj='+data.sjsj,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                success: function (dd) {
                    //console.log(data.messageZt);
                    if(dd){
                        App.unblockUI(blockTarget);
                        callback(true);
                    }

                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$appsysteminformationForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '保存失败！',
                        icon: 'fa fa-warning'
                    });
                    callback(false);
                }
            });
        }
    };

    var getAppSystemInformation = function (id) {
        if (configMap.id) {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/getAppSystemInformationById?id=' + id,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    console.log("专题地址："+data.informationSpecial);
                    jqueryMap.$appsysteminformationForm.find('select[name="phoneType"]').val(data.phoneType).trigger('change');
                    jqueryMap.$appsysteminformationForm.find('select[name="informationType"]').val(data.informationTypeCode).trigger('change');
                    jqueryMap.$appsysteminformationForm.find('#appInfojj-m').val(data.messageJj);
                    jqueryMap.$appsysteminformationForm.find('#appInfozt-m').val(data.informationSpecial);
                    jqueryMap.$appsysteminformationForm.find('select[name="clientType"]').val(data.clientType).trigger('change');
                    jqueryMap.$appsysteminformationForm.find('input[name="sjsj"]').val(data.sjsj);
                    configMap.ue.ready(function () {
                        configMap.ue.setContent(data.message);
                    });
                },
                error: function () {
                    bootbox.alert('获取App系统消息失败！');
                }
            });
        }
    };

    return {
        // 初始化
        init: function (id, ue) {
            configMap.id = id;
            configMap.ue = ue;
            setJqueryMap();
            getAppSystemInformation(id);
            $('#appInfojj-sjsj').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            

            $('#appInfo-m').change(function(){
                var p1=$(this).children('option:selected').val();//这就是selected的值
                if(p1=='001'){
                    //显示
                    $('#row_sjsj').show();
                }else{
                    //隐藏
                    $('#row_sjsj').hide();
                }
            });


        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveAppSystemInformation: function (callback) {
            if (jqueryMap.$appsysteminformationForm.valid()) {
                saveAppSystemInformation(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=appsysteminformationedit.js