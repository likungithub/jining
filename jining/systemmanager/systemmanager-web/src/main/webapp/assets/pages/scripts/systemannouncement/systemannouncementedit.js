/**
 * Created by huxinquan on 2017/6/23.
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
var systemannouncementEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UEditorContainer: null,
        dataUrl: '/systemAnnouncement',
        UUID: '',
        systemAnnouncementId: '',
        ue: '',
        addkhflPageUrl: 'systemmanager/customertype/editcustomertype.jsp',
        selectAnnouncement: ''
    };

    // 全局Dom
    var jqueryMap = {
        $systemannouncementForm: null,
        $addSystemTypeDialog: null
    };

    var setJqueryMap = function () {
        jqueryMap.$systemannouncementForm = $('#systemannouncementForm');
    };

    var saveSystemAnnouncement = function (callback) {

        var blockTarget = jqueryMap.$systemannouncementForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });

        var data = {
            announcementName: encodeURIComponent(jqueryMap.$systemannouncementForm.find('input[name="announcementName"]').val()),
            checkAnnouncementIsTop: encodeURIComponent(jqueryMap.$systemannouncementForm.find('input[name="checkAnnouncementIsTop"]').prop('checked')),
            announcementTypeCode: encodeURIComponent(jqueryMap.$systemannouncementForm.find('[name="announcementTypeCode"]').val()),
            announcementTypeName: encodeURIComponent(jqueryMap.$systemannouncementForm.find('option[value=' + jqueryMap.$systemannouncementForm.find('[name="announcementTypeCode"]').val() + ']').text()),
            keyword: encodeURIComponent(jqueryMap.$systemannouncementForm.find('input[name="keyword"]').val()),
            announcementSource: encodeURIComponent(jqueryMap.$systemannouncementForm.find('input[name="announcementSource"]').val()),
            announcementDescription: encodeURIComponent(jqueryMap.$systemannouncementForm.find('input[name="announcementDescription"]').val()),
            announcementContent: encodeURIComponent(configMap.ue.getContent()),
            announcementNameFh: encodeURIComponent(jqueryMap.$systemannouncementForm.find('input[name="announcementName"]')),
            jsflx:encodeURIComponent($("#id_jsflx").val()),
            khflmc:encodeURIComponent($("#customerStyle").find("option:selected").text()),
            khfldm:encodeURIComponent($("#customerStyle").val()),

    };

        var AppAlert=function(msg){
            App.alert({
                container: jqueryMap.$systemannouncementForm .closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: msg,
                closeInSeconds:3,
                icon: 'fa fa-warning'
            });
        };
        if(!data.announcementName){
            App.unblockUI(blockTarget);
            AppAlert('带有*的必填项不能为空哟');
            return;
        }
        if(data.announcementTypeCode=='null'){
            App.unblockUI(blockTarget);
            AppAlert('公告类型不能为空,请到系统管理下的公告类型管理设置');
            return;
        }
        //data.keyword&&data.announcementSource/*&&data.announcementDescription*/&&
        if(!(data.announcementContent)){
            App.unblockUI(blockTarget);
            AppAlert('带有*的必填项不能为空哟');
            return;
        }
        var thisNameDom = document.getElementsByName('announcementName')[0];
       
        var textNameErro = TextValidate1(thisNameDom,AppAlert);
        
        if(!textNameErro){
        	App.unblockUI(blockTarget);
        	return;
        }
        
        if (configMap.systemAnnouncementId) {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/updateSystemAnnouncement?systemAnnouncementId=' + configMap.systemAnnouncementId +
                '&announcementName='+ data.announcementName + "&announcementTypeCode=" + data.announcementTypeCode +
                '&announcementTypeName=' + data.announcementTypeName + '&keyword='+ data.keyword + "&announcementSource=" + data.announcementSource +
                '&announcementDescription=' + data.announcementDescription + '&announcementContent=' + data.announcementContent +
                '&checkAnnouncementIsTop=' + data.checkAnnouncementIsTop+"&jsflx="+data.jsflx+"&khflmc="+data.khflmc+"&khfldm="+data.khfldm,
                type: 'PUT',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                success: function () {
                    App.unblockUI(blockTarget);
                    $.ajax({
                        url: configMap.path + configMap.dataUrl + '/getAllSystemAnnouncementUnread',
                        type: 'GET',
                        success: function (result) {
                            if(result.length > 0) {
                                $('#announcementInfoWarning').html(result.length);
                                $('#announcementInfoWarning').css({display:'block'});
                                $('.top-remind-m').addClass('bellSwing');
                            } else {
                                $('#announcementInfoWarning').css({display:'none'});
                                $('.top-remind-m').removeClass('bellSwing');
                            }
                        }
                    });
                    callback(true);
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$systemannouncementForm.closest(".modal-body"),
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
                url: configMap.path + configMap.dataUrl + '/addSystemAnnouncement?announcementName='+
                data.announcementName + '&announcementTypeCode=' + data.announcementTypeCode + '&announcementTypeName=' + data.announcementTypeName +
                '&keyword='+ data.keyword + "&announcementSource=" + data.announcementSource +
                '&announcementDescription=' + data.announcementDescription + '&announcementContent=' + data.announcementContent +
                '&checkAnnouncementIsTop=' + data.checkAnnouncementIsTop+"&jsflx="+data.jsflx+"&khflmc="+data.khflmc+"&khfldm="+data.khfldm,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                success: function () {
                    App.unblockUI(blockTarget);
                    $.ajax({
                        url: configMap.path + configMap.dataUrl + '/getAllSystemAnnouncementUnread',
                        type: 'GET',
                        success: function (result) {
                            if(result.length > 0) {
                                $('#announcementInfoWarning').html(result.length);
                                $('#announcementInfoWarning').css({display:'block'});
                                $('.top-remind-m').addClass('bellSwing');
                            } else {
                                $('#announcementInfoWarning').css({display:'none'});
                                $('.top-remind-m').removeClass('bellSwing');
                            }
                        }
                    });
                    callback(true);
                },
                error: function () {
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$systemannouncementForm.closest(".modal-body"),
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

    var getSystemAnnouncement = function (systemAnnouncementId) {
        if (configMap.systemAnnouncementId) {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/getSystemAnnouncementBySystemAnnouncementId?systemAnnouncementId=' + systemAnnouncementId,
                dataType: 'JSON',
                type: 'GET',
                success: function (data) {
                    jqueryMap.$systemannouncementForm.find('input[name="announcementName"]').val(data.systemAnnouncement.announcementName);
                    if (data.systemAnnouncement.isTop) {
                        jqueryMap.$systemannouncementForm.find('input[name="checkAnnouncementIsTop"]').iCheck('check');
                    }
                    jqueryMap.$systemannouncementForm.find('select[name="announcementTypeCode"]').val(data.announcementType.id).trigger('change');
                    jqueryMap.$systemannouncementForm.find('input[name="keyword"]').val(data.systemAnnouncement.keyword);
                    jqueryMap.$systemannouncementForm.find('input[name="announcementSource"]').val(data.systemAnnouncement.announcementSource);
                    jqueryMap.$systemannouncementForm.find('input[name="announcementDescription"]').val(data.systemAnnouncement.announcementDescription);
                    $("#id_jsflx").val(data.systemAnnouncement.jsflx);
                    $("#customerStyle").val(data.systemAnnouncement.khfldm).select2();
                    //$("#customerStyle").text(data.systemAnnouncement.khflmc);
                    //$("#customerStyle").find("option[text='"+data.systemAnnouncement.khflmc+"']").attr("selected",true);
                    configMap.ue.ready(function () {
                        configMap.ue.setContent(data.systemAnnouncement.announcementContent);
                    });
                },
                error: function () {
                    bootbox.alert('获取系统公告失败！');
                }
            });
        }
    };


    var openModal = function (title, url, type, func) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 增&nbsp;加 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn borderRadius4 color666'
        }

        $.get(url, function (html) {

            jqueryMap.$khflAddDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    //新增客户分类
    var khflAddFun = function () {
        openModal('新增客户分类',  configMap.addkhflPageUrl, 'edit', function () {
            customertypeEdit.savecustomertype(function (result) {
                if (result) {
                    jqueryMap.$khflAddDialog.modal('hide');
                    getCustomerStyle();
                } else {
                    App.alert({
                        container: jqueryMap.$systemannouncementForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '客户分类增加失败',
                        icon: 'fa fa-warning'
                    });
                    jqueryMap.$khflAddDialog.modal('hide');
                }
            });
        });
    }



    //客户分类
    var getCustomerStyle = function () {
        $('#customerStyle').empty();
        var custorStyleNum = [];
        $.ajax({
            url: 'systemmanager/customertype/customertype',
            type: "get",
            dataType: "json",
            async:false,
            success: function (data) {
                for (var j = 0; j < data.length; j++) {
                    custorStyleNum.push(data[j].khfl_mc);
                }
                //客户分类
                $('#customerStyle').select2({
                    data: custorStyleNum,
                    placeholder: '请选择',//默认文字提示
                    language: "zh-CN",//汉化
                    allowClear: false,//允许清空
                    width: '156px',
                });
                for (var j = 0; j < data.length; j++) {
                    $("#customerStyle option").eq(j).val(data[j].khfl_dm);
                }
            },
            error: function (result) {
            }
        });
    }

    var getSelect = function () {
        configMap.selectAnnouncement = jqueryMap.$systemannouncementForm.find('select[name=announcementTypeCode]');
        $.ajax({
            url: configMap.path + configMap.dataUrl + '/getAllAnnouncementType',
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                if (datas.length!=0) {
                    configMap.selectAnnouncement.select2({
                        data: datas,
                        allowClear: false
                    });
                    $("#announcementtittle_m").hide();
                }else{
                    $("#announcementtittle_m").show();
                    configMap.selectAnnouncement.select2({
                        data: datas,
                        allowClear: false,
                        
                     
                    });
                }
                getSystemAnnouncement(configMap.systemAnnouncementId)
            }
        });
    };
    //快速增加公告类型
    var openDialog=function(){
        var btn={};
        var url = configMap.path + '/systemannouncement/addSystemTypeDialog.jsp';
        btn.confirm={
            label: '<i class="fa fa-plus iconMr"></i>增加',
            className: 'btn btn btn-success btnBlue borderRadius4 colorfff',
            callback: function (result) {
            	addSystemTypeDialogEdit.addSystemType(function(){
                	if(result) {
                		getSelect();
                        jqueryMap.$addSystemTypeDialog.modal('hide');
                	}
            	});             
                return false;
            }
        };
        btn.cancel={
            label: '<i class="fa fa-times iconMr"></i>关闭',
                className: 'btn btn btn-default borderRadius4 color666'
        };

        $.get(url, function (html) {
            jqueryMap.$addSystemTypeDialog = bootbox.dialog({
                title: '<div class="h4" style="margin: 0">快速添加公告类型</div>',
                message: html,
                buttons: btn,
                className:'addAnnounceTypeQuickly'
            });
        });
        
//        bootbox.dialog({
//            className:'addAnnounceTypeQuickly',
//            title: '<div class="h4" style="margin: 0">快速添加公告类型</div>',
//            message: "This is a confirm with custom button text and color! Do you like it?",
//            buttons: btn,
//        });
    }
$('.addBtn', '#systemannouncementForm').click(function(){
    openDialog();
    return false;
});

    //添加新的客户分类
    $('#khflAdd').off().on('click', function () {

        khflAddFun();
    });




    return {
        // 初始化
        init: function (systemAnnouncementId, ue) {
            configMap.systemAnnouncementId = systemAnnouncementId;
            configMap.ue = ue;
            setJqueryMap();
            getSelect();
            getCustomerStyle();
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        saveSystemAnnouncement: function (callback) {
            if (jqueryMap.$systemannouncementForm.valid()) {
                saveSystemAnnouncement(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=announcementtypeedit.js