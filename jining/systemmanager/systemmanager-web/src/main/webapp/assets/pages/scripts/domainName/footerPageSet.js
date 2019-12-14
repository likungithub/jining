var footerPageSet = function(){
    'use strict';

    var configMap={
        ifeidt:null,
        ifeidt1:null,
        ifeidt2:null,
        ifeidt3:null,
        ue:null,
        ue1:null,
        ue2:null,
        ue3:null,
        id:"",
        path:"",
        code:'001',
        agencyCode:'',
    }
    var jqueryMap = {
        $employeeForm:null,
        container: null,
    };
    var setJqueryMap = function () {
        jqueryMap.$employeeForm=$('#footerPageSetForm');
        jqueryMap.container=$('#footerPageSetWrap');
    };
    setJqueryMap();
    jqueryMap.container.parents('.modal-dialog').css({width:700});

    //选项卡切换
    $('.menu li',jqueryMap.container).click(function(){
        var tag = $(this).index();
        $('.menu li',jqueryMap.container).removeClass('activeStyle').eq(tag).addClass('activeStyle');
        $('.contentM',jqueryMap.container).addClass('hide').eq(tag).removeClass('hide');
        configMap.code=$(this).data("code");
        console.info(configMap.code);
    });

    var getIfEdit=function () {
        $.ajax({
            url: configMap.path + '/domainNameOther/showOther/' + configMap.agencyCode,
            type: 'GET',
            success: function (result) {
                if(result[0]){
                    configMap.ifeidt=true;
                }else{
                    configMap.ifeidt=false;
                }
                if(result[1]){
                    configMap.ifeidt1=true;
                }else{
                    configMap.ifeidt1=false;
                }
                if(result[2]){
                    configMap.ifeidt2=true;
                }else{
                    configMap.ifeidt2=false;
                }
                if(result[3]){
                    configMap.ifeidt3=true;
                }else{
                    configMap.ifeidt3=false;
                }
            }
        })
    }
    var showAboutMeOther=function (callback) {
        $.ajax({
            url:configMap.path+'/domainNameOther/showOther/'+configMap.agencyCode,
            type:'GET',
            success:function (result) {
                if(result[0]){
                    $('#keyWord',jqueryMap.container).val(result[0].keyWord);
                    $('#columnDescription',jqueryMap.container).val(result[0].columnDescript);
                    if(result[0].ifUsed==='1'){
                        $('input[name=ifUsed][value="1"]').attr('checked',true);
                    }else if(result[0].ifUsed==="0"){
                        $('input[name=ifUsed][value="0"]').attr('checked',true);
                    }else{
                        $('input[name=ifUsed][value="2"]').attr('checked',true);
                    }
                    ue.ready(function() {
                        // editor准备好之后才可以使用
                        ue.setContent(result[0].columnContent);
                    });
                    callback=true;
                }
            },
            error: function () {
                callback(false);
            }
        })
    }
    var showtermsOfServiceOther=function (callback) {
        $.ajax({
            url:configMap.path+'/domainNameOther/showOther/'+configMap.agencyCode,
            type:'GET',
            success:function (result) {
                if(result[1]){
                    $('#keyWord1',jqueryMap.container).val(result[1].keyWord);
                    $('#columnDescription1',jqueryMap.container).val(result[1].columnDescript);
                    if(result[1].ifUsed==='1'){
                        $('input[name=ifUsed1][value="1"]').attr('checked',true);
                    }else if(result[1].ifUsed==='0'){
                        $('input[name=ifUsed1][value="0"]').attr('checked',true);
                    }else{
                        $('input[name=ifUsed1][value="2"]').attr('checked',true);
                    }
                    ue1.ready( function () {
                        // editor准备好之后才可以使用
                        ue1.setContent(result[1].columnContent);
                    });
                    callback=true;
                }
            },
            error: function () {
                callback(false);
            }
        })
    }
    var showlegalStatementOther=function (callback) {
        $.ajax({
            url:configMap.path+'/domainNameOther/showOther/'+configMap.agencyCode,
            type:'GET',
            success:function (result) {
                if(result[2]){
                    $('#keyWord2',jqueryMap.container).val(result[2].keyWord);
                    $('#columnDescription2',jqueryMap.container).val(result[2].columnDescript);
                    if(result[2].ifUsed==='1'){
                        $('input[name=ifUsed2][value="1"]').attr('checked',true);
                    }else if(result[2].ifUsed==='0'){
                        $('input[name=ifUsed2][value="0"]').attr('checked',true);
                    }else{
                        $('input[name=ifUsed2][value="2"]').attr('checked',true);
                    }
                    ue2.ready( function () {
                        // editor准备好之后才可以使用
                        ue2.setContent(result[2].columnContent);
                    });
                    callback=true;
                }
            },
            error: function () {
                callback(false);
            }
        })
    }
    var showprivacyStatementOther=function (callback) {
        $.ajax({
            url:configMap.path+'/domainNameOther/showOther/'+configMap.agencyCode,
            type:'GET',
            success:function (result) {
                if(result[3]){
                    $('#keyWord3',jqueryMap.container).val(result[3].keyWord);
                    $('#columnDescription3',jqueryMap.container).val(result[3].columnDescript);
                    if(result[3].ifUsed==='1'){
                        $('input[name=ifUsed3][value="1"]').attr('checked',true);
                    }else if(result[3].ifUsed==='0'){
                        $('input[name=ifUsed3][value="0"]').attr('checked',true);
                    }else{
                        $('input[name=ifUsed3][value="2"]').attr('checked',true);
                    }
                    ue3.ready( function () {
                        // editor准备好之后才可以使用
                        ue3.setContent(result[3].columnContent);
                    });
                    callback=true;
                }
            },
            error: function () {
                callback(false);
            }
        })
    }
    var eidtfooter=function () {
        var blockTarget = jqueryMap.$employeeForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var interest = '';
        var selectedInterests = $('input[name="interest"]:checked');
        _.forEach(selectedInterests, function (value) {
            interest += value.value + ';';
        });
        var url = configMap.path + '/domainNameOther/update/'+configMap.agencyCode
        var d;
        var data= {
            "code":$('#code',jqueryMap.container).val(),
            "keyWord":$('#keyWord',jqueryMap.container).val(),
            "columnDescription":$('#columnDescription',jqueryMap.container).val(),
            "columContent":ue.getContent(),
            "ifUsed":$('input[name=ifUsed]:checked').val(),
        }
            d=data;
            if(!data.code||!data.keyWord||!data.columContent||!data.columnDescription||!data.ifUsed){
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '必填项不得为空！',
                    icon: 'fa fa-warning',
                });
                return false;
            }
        var requestType = 'POST';
        $.ajax({
            url: url,
            type: requestType,
            data: d,
            success: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    message: '保存成功！',
                    icon: 'fa fa-success',
                    closeInSeconds:2
                });
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
            }
        });
    }
    
    var eidtCustomerService=function () {
        var blockTarget = jqueryMap.$employeeForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var interest = '';
        var selectedInterests = $('input[name="interest"]:checked');
        _.forEach(selectedInterests, function (value) {
            interest += value.value + ';';
        });
        var data1= {
            "code":$('#code1',jqueryMap.container).val(),
            "keyWord":$('#keyWord1',jqueryMap.container).val(),
            "columnDescription":$('#columnDescription1',jqueryMap.container).val(),
            "columContent":ue1.getContent(),
            "ifUsed":$('input[name=ifUsed1]:checked').val(),
        }
        if(!data1.code||!data1.keyWord||!data1.columContent||!data1.columnDescription||!data1.ifUsed){
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$employeeForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '必填项不得为空！',
                icon: 'fa fa-warning',
            });
            return false;
        }
        var url = configMap.path + '/domainNameOther/update/'+configMap.agencyCode
        var requestType = 'POST';
        $.ajax({
            url: url,
            type: requestType,
            data: data1,
            success: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    message: '保存成功！',
                    icon: 'fa fa-success',
                    closeInSeconds:2
                });
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
            }
        });

    }

    var editflsm=function () {
        var blockTarget = jqueryMap.$employeeForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var interest = '';
        var selectedInterests = $('input[name="interest"]:checked');
        _.forEach(selectedInterests, function (value) {
            interest += value.value + ';';
        });
        var data2= {
            "code":$('#code2',jqueryMap.container).val(),
            "keyWord":$('#keyWord2',jqueryMap.container).val(),
            "columnDescription":$('#columnDescription2',jqueryMap.container).val(),
            "columContent":ue2.getContent(),
            "ifUsed":$('input[name=ifUsed2]:checked').val(),
        }
        if(!data2.code||!data2.keyWord||!data2.columContent||!data2.columnDescription||!data2.ifUsed){
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$employeeForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '必填项不得为空！',
                icon: 'fa fa-warning',
            });
            return false;
        }
        var url = configMap.path + '/domainNameOther/update/'+configMap.agencyCode
        var requestType = 'POST';
        $.ajax({
            url: url,
            type: requestType,
            data: data2,
            success: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    message: '保存成功！',
                    icon: 'fa fa-success',
                    closeInSeconds:2
                });

            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });

            }
        });
    }
    
    var editYstk=function () {
        var blockTarget = jqueryMap.$employeeForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var interest = '';
        var selectedInterests = $('input[name="interest"]:checked');
        _.forEach(selectedInterests, function (value) {
            interest += value.value + ';';
        });
        var data3= {
            "code":$('#code3',jqueryMap.container).val(),
            "keyWord":$('#keyWord3',jqueryMap.container).val(),
            "columnDescription":$('#columnDescription3',jqueryMap.container).val(),
            "columContent":ue3.getContent(),
            "ifUsed":$('input[name=ifUsed3]:checked').val(),
        }
        if(!data3.code||!data3.keyWord||!data3.columContent||!data3.columnDescription||!data3.ifUsed){
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$employeeForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '必填项不得为空！',
                icon: 'fa fa-warning',
            });
            return false;
        }
        var url = configMap.path + '/domainNameOther/update/'+configMap.agencyCode
        var requestType = 'POST';
        $.ajax({
            url: url,
            type: requestType,
            data: data3,
            success: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    message: '保存成功！',
                    icon: 'fa fa-success',
                    closeInSeconds:2
                });
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
            }
        });
    }

    
    /**
     * 保存关于我们
     * @param callback
     * @returns {boolean}
     */
    var savefooter=function () {
        var blockTarget = jqueryMap.$employeeForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var interest = '';
        var selectedInterests = $('input[name="interest"]:checked');
        _.forEach(selectedInterests, function (value) {
            interest += value.value + ';';
        });
        var d;
        var data= {
            "code":$('#code',jqueryMap.container).val(),
            "keyWord":$('#keyWord',jqueryMap.container).val(),
            "columnDescription":$('#columnDescription',jqueryMap.container).val(),
            "columContent":ue.getContent(),
            "ifUsed":$('input[name=ifUsed]:checked').val(),
        }
        console.log(data);
        if(!data.code||!data.keyWord||!data.columContent||!data.columnDescription||!data.ifUsed){
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$employeeForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '必填项不得为空！',
                icon: 'fa fa-warning',
            });
            }
        var url = configMap.path + '/domainNameOther/add/'+configMap.agencyCode
        var requestType = 'POST';
        $.ajax({
            url: url,
            type: requestType,
            data: data,
            success: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    message: '保存成功！',
                    icon: 'fa fa-success',
                    closeInSeconds:2
                });
                getIfEdit();
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
            }
        });

    }
    /**
     * 保存客户服务
     * @param callback
     * @returns {boolean}
     */
    var saveCustomerService=function () {
        var blockTarget = jqueryMap.$employeeForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var interest = '';
        var selectedInterests = $('input[name="interest"]:checked');
        _.forEach(selectedInterests, function (value) {
            interest += value.value + ';';
        });
        var data1= {
            "code":$('#code1',jqueryMap.container).val(),
            "keyWord":$('#keyWord1',jqueryMap.container).val(),
            "columnDescription":$('#columnDescription1',jqueryMap.container).val(),
            "columContent":ue1.getContent(),
            "ifUsed":$('input[name=ifUsed1]:checked').val(),
        }
        console.info(data1);
        if(!data1.code||!data1.keyWord||!data1.columContent||!data1.columnDescription||!data1.ifUsed){
            App.unblockUI(blockTarget);
            App.alert({
                container: jqueryMap.$employeeForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '必填项不得为空！',
                icon: 'fa fa-warning',
            });
            return false;
        }
        var url = configMap.path + '/domainNameOther/add/'+configMap.agencyCode
        var requestType = 'POST';
        $.ajax({
            url: url,
            type: requestType,
            data: data1,
            success: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    message: '保存成功！',
                    icon: 'fa fa-success',
                    closeInSeconds:2
                });
                getIfEdit();
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
            }
        });
    }
 /*   console.info(data);*/

    /**
     * 保存法律声明
     * @param callback
     * @returns {boolean}
     */
    var saveflsm=function () {
        var blockTarget = jqueryMap.$employeeForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var interest = '';
        var selectedInterests = $('input[name="interest"]:checked');
        _.forEach(selectedInterests, function (value) {
            interest += value.value + ';';
        });
        var data2= {
            "code":$('#code2',jqueryMap.container).val(),
            "keyWord":$('#keyWord2',jqueryMap.container).val(),
            "columnDescription":$('#columnDescription2',jqueryMap.container).val(),
            "columContent":ue2.getContent(),
            "ifUsed":$('input[name=ifUsed2]:checked').val(),
        }
            if(!data2.code||!data2.keyWord||!data2.columContent||!data2.columnDescription||!data2.ifUsed){
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '必填项不得为空！',
                    icon: 'fa fa-warning',
                });
                return false;
            }
        var url = configMap.path + '/domainNameOther/add/'+configMap.agencyCode
        var requestType = 'POST';
        $.ajax({
            url: url,
            type: requestType,
            data: data2,
            success: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    message: '保存成功！',
                    icon: 'fa fa-success',
                    closeInSeconds:2
                });
                getIfEdit();
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
            }
        });
    }
    /**
     * 保存隐私条款
     * @param callback
     * @returns {boolean}
     */
    var saveYstk=function (callback) {
        var blockTarget = jqueryMap.$employeeForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var interest = '';
        var selectedInterests = $('input[name="interest"]:checked');
        _.forEach(selectedInterests, function (value) {
            interest += value.value + ';';
        });
        var data3= {
            "code":$('#code3',jqueryMap.container).val(),
            "keyWord":$('#keyWord3',jqueryMap.container).val(),
            "columnDescription":$('#columnDescription3',jqueryMap.container).val(),
            "columContent":ue3.getContent(),
            "ifUsed":$('input[name=ifUsed3]:checked').val(),
        }
            if(!data3.code||!data3.keyWord||!data3.columContent||!data3.columnDescription||!data3.ifUsed){
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '必填项不得为空！',
                    icon: 'fa fa-warning',
                });
                return false;
            }
        var url = configMap.path + '/domainNameOther/add/'+configMap.agencyCode
        var requestType = 'POST';
        $.ajax({
            url: url,
            type: requestType,
            data: data3,
            success: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    message: '保存成功！',
                    icon: 'fa fa-success',
                    closeInSeconds:2
                });
                getIfEdit();
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$employeeForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
            }
        });
    }

    return {
        init: function (id,agencyCode,ue,ue1,ue2,ue3) {
            configMap.id=id;
            configMap.agencyCode=agencyCode;
            configMap.ue=ue;
          configMap.ue1=ue1;
            configMap.ue2=ue2;
            configMap.ue3=ue3;
            showAboutMeOther();
            showtermsOfServiceOther();
            showlegalStatementOther();
            showprivacyStatementOther();
            getIfEdit();
            $('#aboutMe',jqueryMap.container).off('click').on('click',function () {
                if(configMap.ifeidt){
                    eidtfooter();
                }else{
                    savefooter();
                }
            });
            $('#customerServiceByws',jqueryMap.container).off('click').on('click',function () {
                if(configMap.ifeidt1){
                    eidtCustomerService()
                }else{
                    saveCustomerService()
                }
            });
            $('#flsmByws',jqueryMap.container).off('click').on('click',function () {
                if(configMap.ifeidt2){
                    editflsm();
                }else{
                    saveflsm();
                }
            });
            $('#ystkByws',jqueryMap.container).off('click').on('click',function () {
                if(configMap.ifeidt3){
                    editYstk();
                }else{
                    saveYstk();
                }
            })
        },
        setPath: function (path) {
            configMap.path = path;
        },
    };
}()