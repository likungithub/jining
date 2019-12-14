var addDomainName = function(){
    'use strict';
    var configMap={
        id:'',
        path:'',
        dataUrl:'/domainNameBasic/addDomainNameBasic/',
        ifview:'',
    };
    var jqueryMap = {
        container: null,
        $employeeDialog: null,
        $employeeForm:null,
    };
    var setJqueryMap = function () {
        jqueryMap.container=$('#addDomainName_M');
        jqueryMap.$employeeForm=$('#addDomainNameInfo_M')
    };
    setJqueryMap();
    jqueryMap.container.parents('.modal-dialog').css({width:703});

    $('.selectLogo',jqueryMap.container).on('click',function (){
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

        $.get("systemmanager/domainName/setlogo.jsp", function(html) {
            jqueryMap.$setlogo = bootbox.dialog({
                title: '选择LOGO',
                message: html,
                buttons: dialogButtons
            });
        });
    });
    $('#icoupload').off('click').on('click',function () {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn-default btnBlue borderRadius4 colorfff",
            callback: function() {
                var file=$('#internetFlagFile').get(0).files[0];
                if(file){
                    if(!file.name.endsWith("ico")){
                        /*jqueryMap.$setlogo.modal('hide');*/
                        Messenger().post({
                            message : "请上传icon格式的文件",
                            type: 'error'
                        });
                        return false;
                    }
                }else{
                    Messenger().post({
                        message : "请上传文件",
                        type: 'error'
                    });
                    return false;
                }
                var url = 'systemmanager/domainNameBasic/saveicon';
                var inputform = {
                    url: url,
                    type: "POST",
                    dataType: 'json',
                    headers: {"ClientCallMode": "ajax"}, //添加请求头部
                   /* beforeSend: function () {
                        $("#righttwo").remove();
                        $("#rightone").css("display", "block");
                        $("#schedule", jqueryMap.$contractForm).css("display", "block");
                        configMap.get = window.setInterval(getSchedule, "500");
                    },
                    complete: function () {
                        clearInterval(configMap.get);
                        $(".progress-bar", jqueryMap.$contractForm).css("width", "100%");
                        $(".progress-value", jqueryMap.$contractForm).html("100%");
                        sessionStorage.removeItem("status");
                        setTimeout(hiddenSchedule, "1000");
                    },*/
                    success: function (data) {

                       /* App.unblockUI(blockTarget);*/
                        if (data.success) {
                        $('#icoupload',jqueryMap.container).attr("src",data.fileUrl);
                        $('#internetFlag',jqueryMap.container).val(data.fileUrl);
                        $("input[name='file']", jqueryMap.container).val("");

                           /* getFileList();*/
                        } else {
                           /* Messenger().post({
                                message: data.message,
                                type: 'error'
                            });*/
                           /*alert("失败")*/
                        }
                    },
                    /*error: function () {
                        App.unblockUI(blockTarget);
                        App.alert({
                            container: jqueryMap.$contractForm.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: '保存失败！',
                            icon: 'fa fa-warning'
                        });
                    }*/
                };
                $("#internetFlagFileForm").ajaxSubmit(inputform);
                /*return false;*/
            }
        };
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'

        };
        $.get("systemmanager/domainName/setInternetFlag.jsp", function(html) {
            jqueryMap.$setlogo = bootbox.dialog({
                title: '选择网站图标',
                message: html,
                buttons: dialogButtons
            });
        });
    });

    var savaDomainName=function (callback) {
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

        var data={
            "agencyCode":$('#agencyCode',jqueryMap.container).val(),
            "companyName":$('#agencyCode',jqueryMap.container).find('option:selected').text(),
            "companyLogo":$('#companyLogo_ws_mdw',jqueryMap.container).val(),
            "domainAddress":$('#domainAddress',jqueryMap.container).val(),
            "hiddenAgencyCode":$('#hiddenAgencyCode',jqueryMap.container).val(),
            "servicePhone":$('#servicePhone',jqueryMap.container).val(),
            "internetFlag":$('#internetFlag',jqueryMap.container).val(),
            "copyrightInfo":$('#copyrightInfo',jqueryMap.container).val(),
            "icpRecord":$('#icpRecord',jqueryMap.container).val(),
            "keyWord":$('#keyWord',jqueryMap.container).val(),
            "title":$('#title',jqueryMap.container).val(),
            "descriptionInfo":$('#descriptionInfo',jqueryMap.container).val()
        }

        var url = configMap.path + configMap.dataUrl;
        var requestType = 'POST';
        if (configMap.id) {
            url=configMap.path+'//domainNameBasic/updateDomainNameBasic/'+configMap.id;
          /*  url = url + "/" + configMap.id;*/
            requestType = 'POST';
        }
        $.ajax({
            url: url,
            type: requestType,
            data: data,
            success: function (d) {
                if(d.success){
                    App.unblockUI(blockTarget);
                    callback(true);
                }else{
                    App.unblockUI(blockTarget);
                    App.alert({
                        container: jqueryMap.$employeeForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: d.message,
                        icon: 'fa fa-warning'
                    });
                }
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
                callback(false);
            }
        });
    }

    var getEmployee = function (id) {
        $.ajax({
            url: "systemmanager/domainNameBasic/showById/"+configMap.id,
            dataType: 'JSON',
            type: 'GET',
            success: function (result) {
                console.info(result);
               $('#agencyCode').find('option[value="'+result.agencyCode+'"]').prop("selected",true);
              /* $('#agencyCode').val(result.agencyCode);*/
              /*  $('#companyName').val(result.companyName);*/
                if(result.domainNameBasic[0].id){
                    $.ajax({
                        url:"systemmanager/domainNameBasic/getCustomer",
                        type:'GET',
                        success:function (d) {
                            var  arr = d.map;
                            $.each(arr,function (i,v) {
                                if (v.id ==result.domainNameBasic[0].id){
                                    v.selected= true;
                                    return false;
                                }
                            })
                            if(d.map.length>0){
                                $("#agencyCode").select2({
                                    data: arr,
                                    placeholder:'请选择',
                                    allowClear:false
                                })
                               /* $('#agencyCode').prop("disabled", true);
                               $('#agencyCode').css('cursor','not-allowed');*/
                            }
                        }
                    })

                }
                $('#companyLogo_ws_mdw',jqueryMap.container).val(result.domainNameBasic[0].GSLOGO);
                $('#domainAddress',jqueryMap.container).val(result.domainNameBasic[0].YMDZ);
                $('#hiddenAgencyCode',jqueryMap.container).val(result.domainNameBasic[0].id);
                $('#servicePhone',jqueryMap.container).val(result.domainNameBasic[0].FWRX);
                $('#internetFlag',jqueryMap.container).val(result.domainNameBasic[0].WZBZ);
                $('#copyrightInfo',jqueryMap.container).val(result.domainNameBasic[0].BQXX);
                $('#icpRecord',jqueryMap.container).val(result.domainNameBasic[0].ICPBA);
                $('#keyWord',jqueryMap.container).val(result.domainNameBasic[0].GJC);
                $('#title',jqueryMap.container).val(result.domainNameBasic[0].BT);
                $('#descriptionInfo',jqueryMap.container).val(result.domainNameBasic[0].MSXX);
                $('#logosrc',jqueryMap.container).attr("src",result.domainNameBasic[0].GSLOGO);
                $('#icoupload',jqueryMap.container).attr('src',result.domainNameBasic[0].WZBZ);
            },
            error: function () {
                bootbox.alert('获取域名配置基础信息失败！');
            }
        });
    };
    var getCustomer=function () {
        $.ajax({
            url:"systemmanager/domainNameBasic/getCustomer",
            type:'GET',
            success:function (result) {
                if(result.map.length>0){
                    $("#agencyCode").select2({
                        data: result.map,
                        placeholder:'请选择',
                        allowClear:false
                    })
                }
            }
        })



    }

    return {
        init: function (id,ifview) {
            configMap.id=id;
            configMap.ifview=ifview;
            if(configMap.id){
                /*$('#domainAddress',jqueryMap.container).attr('readonly',true);*/
                getEmployee();
            }
            if(configMap.ifview){
                $('#icoupload',jqueryMap.container).off('click');
                $('.selectLogo',jqueryMap.container).off('click');
            }
            getCustomer();
            setJqueryMap();
        },
        setPath: function (path) {
            configMap.path = path;
        },
        savaDomainName: function (callback) {
            savaDomainName(callback);
        }
    };
}();