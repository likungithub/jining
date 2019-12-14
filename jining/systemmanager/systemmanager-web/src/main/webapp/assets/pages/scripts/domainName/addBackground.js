var addBackground = function(){
    'use strict';
    var configMap={
        id:'',
        agencyCode:'',
        $dialog:null,
        path:'',
        dataUrl:'/domainNameBackground/add/',
        companyName:'',
    };
    var jqueryMap = {
        container: null,
        $employeeDialog: null,
        $employeeForm:null,
    };
    var setJqueryMap = function () {
        jqueryMap.container=$('#backgroundImg');
        jqueryMap.$employeeForm=$('#backgroundImgForm')
    };
    setJqueryMap();

    var openModal = function (url,title,type) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save iconMr"></i>保存',
                className: "btn btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    var backgroundImgCode=$('#setBackgroundImg').attr("data-code");
                    var url = 'systemmanager/domainNameBackground/update/'+backgroundImgCode+'/'+configMap.companyName;
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
                            console.info(data);
                            /* App.unblockUI(blockTarget);*/
                            if (data.success) {
                                /*  $('#logoBg').attr("src",data.fileUrl);*/
                                /*$('input[name=companyBackgroundImg_ws_mdw]').val(data.fileUrl);*/
                                $("input[name='file']", jqueryMap.container).val("");
                                $('.picCon').empty();
                                show()
                                /* getFileList();*/
                            } else {
                                /* Messenger().post({
                                 message: data.message,
                                 type: 'error'
                                 });*/
                                alert("失败")
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
                    $("#setBackgroundImgUploadForm").ajaxSubmit(inputform);
                    /*return false;*/

                }
            };
        }
        dialogButtons.cancel= {
            label: '<i class="fa fa-times iconMr"></i>关闭',
            className: 'btn btn btn btn-default borderRadius4 color666'
        };

        $.get(url, function (html) {
            jqueryMap.$dialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    }


    jqueryMap.container.parents('.modal-dialog').css({width:716});
    var show=function () {
        $.ajax({
            url:"systemmanager/domainNameBackground/show/"+configMap.agencyCode,
            type:'get',
            success:function (data) {
                if(data.length>0){
                    for(var i=0;i<data.length;i++){
                        $('.picCon').append('<div title="点击编辑背景图" class="pull-left borderRadius4 selectBackground selectBackground_m" style="width: 125px; cursor: pointer;margin-right: 10px;margin-bottom: 15px;position: relative">'
                            +'<img  src="'+data[i].backgroundImg+'" data-id="'+data[i].backgroundImgCode+'" alt="背景图" style="width: 125px;height: 94px;margin-bottom: 15px">'+
                            '<i class="closeMe fa fa-times hide" title="点击删除该背景图片"style="opacity: 1;font-size: 25px;color: #999;background: #dedede;height: 25px;line-height:25px;width: 25px;text-align: center;border-radius: 50%;position: absolute;right: 5px;top: 5px;"></i>'+
                            '<textarea title="'+data[i].descriptionInfo +'" readonly type="text" style="cursor: pointer;overflow:hidden;outline: none;display: block;width: 125px;height: 50px;border: none;border-radius: 4px!important" name="descriptionInfo"'+'">'+data[i].descriptionInfo+'</textarea>'+
                            '</div>');
                    }
                }

            //   给显示出来的图片添加背景图片
                $('#backgroundImg .selectBackground_m').click(function () {
                    var  backgroundImgCode = $(this).children('img').attr('data-id');
                    var a = $(this).children('textarea').val();
                   openModal('systemmanager/domainName/setBackground.jsp?backgroundImgCode='+encodeURI(backgroundImgCode)+'&info='+a,'编辑当前背景图片','edit');
                });

                $('#backgroundImg .selectBackground_m').hover(function () {
                    $(this).find('.closeMe').removeClass('hide');
                },function () {
                    $(this).find('.closeMe').addClass('hide');
                });
                $('#backgroundImg .selectBackground_m .closeMe').click(function (event) {
                    var _this=this;
                   /* alert('close me')*/
                    $.post('systemmanager/domainNameBackground/delete/'+$(this).siblings('img').attr('data-id')+'/'+configMap.agencyCode,function (data) {
                       console.info(data);
                        if(data.ifSuccess){
                           /* for(var i=0;i<data.list.length;i++){
                                $('.picCon').html('<div class="pull-left borderRadius4 selectBackground selectBackground_m" style="width: 125px; cursor: pointer;margin-right: 10px;margin-bottom: 15px;position: relative">'
                                    +'<img title="点击编辑背景图" src="'+data.list[i].backgroundImg+'" data-id="'+data.list[i].backgroundImgCode+'" alt="背景图" style="width: 125px;height: 94px;margin-bottom: 15px">'+
                                    '<i class="closeMe fa fa-times hide" title="点击删除该背景图片"style="opacity: 1;font-size: 25px;color: #999;background: #dedede;height: 25px;line-height:25px;width: 25px;text-align: center;border-radius: 50%;position: absolute;right: 5px;top: 5px;"></i>'+
                                    '<textarea readonly type="text" style="cursor: default;outline: none;display: block;width: 125px;height: 50px;border: 1px solid #dedede;border-radius: 4px!important" name="descriptionInfo"  value="'+data.list[i].descriptionInfo+'">'+'</textarea>'+
                                    '</div>');
                            }*/
                            $(_this).parents('.selectBackground_m').css({'display':'none'});

                        }
                    });
                    event.stopPropagation();
                })



            }
         });
    };
   /* $('.selectLogo',jqueryMap.container).on('click',function (){
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
    })*/;
    $('#logoBg').off('click').on('click',function () {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn-default btnBlue borderRadius4 colorfff",
            callback: function() {
                var file=$('#setBackgroundImg').get(0).files[0];
                console.info(file);
                var url = 'systemmanager/domainNameBackground/upload/'+configMap.agencyCode+'/'+configMap.companyName;
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
                        console.info(data);
                       /* App.unblockUI(blockTarget);*/
                        if (data.success) {
                      /*  $('#logoBg').attr("src",data.fileUrl);*/
                        /*$('input[name=companyBackgroundImg_ws_mdw]').val(data.fileUrl);*/
                            $("input[name='file']", jqueryMap.container).val("");
                            $('.picCon').empty();
                            show()
                           /* getFileList();*/
                        } else {
                           /* Messenger().post({
                                message: data.message,
                                type: 'error'
                            });*/
                           alert("失败")
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
                $("#setBackgroundImgUploadForm").ajaxSubmit(inputform);
                /*return false;*/
            }
        };
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'

        };
        $.get("systemmanager/domainName/setBackground.jsp", function(html) {
            jqueryMap.$setlogo = bootbox.dialog({
                title: '选择背景图',
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
            "companyName":configMap.companyName,
            "backgroundImg":$('#companyBackgroundImg_ws_mdw').val(),
            "descriptionInfo":$('#descriptionInfo',jqueryMap.container).val()
        }

        var url = configMap.path + configMap.dataUrl;
        var requestType = 'POST';
        if (id) {/*此处判断隐藏域中是否有id*/
            url=configMap.path+'/domainNameBackground/update/'+configMap.id;
          /*  url = url + "/" + configMap.id;*/
            requestType = 'POST';
        }
        console.info(data);
        $.ajax({
            url: url,
            type: requestType,
            data: data,
            success: function () {
                App.unblockUI(blockTarget);
                callback(true);
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
    return {
        init: function (agencyCode,companyName) {
            configMap.agencyCode=agencyCode;
            configMap.companyName=companyName;
            show();
            setJqueryMap();
            $('.baocunBybackground').off('click').on('click',function () {
                savaDomainName();
            })
            $('.bianjiBybackground').off('click').on('click',function () {
                savaDomainName();
            })
        },
        setPath: function (path) {
            configMap.path = path;
        },
       /* savaDomainName: function (callback) {
            savaDomainName(callback);
        }*/
    };
}();