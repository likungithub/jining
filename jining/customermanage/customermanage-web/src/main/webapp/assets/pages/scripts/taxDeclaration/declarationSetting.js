var declarationSettings = function(){

    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        customerUrl:'/ptkhxx/findCustomer',
        declarationUrl:'/ptswsb/getTaxdeclarationByKhbm',
        khbm:''
    };

    // 全局Dom
    var jqueryMap = {

    };

    var setJqueryMap = function () {

    };
    //根据客户编码先获取客户信息
    var initCustomer = function (khbm) {
        $.ajax({
            url:configMap.path+configMap.customerUrl+'/'+khbm,
            type:'POST',
            contentType: 'application/json; charset=utf-8',
            success:function (data) {
                console.log(data)
                //循环写入省
                $.get('/commonmanager/xzqy/sj',function(result) {
                    for(var i = 0; i < result.length; i++) {
                        $('<option value="' + result[i].xzqhDm + '">' + result[i].xzqhMc + '</option>').appendTo($('#bssz-province'));
                    }
                    $('#bssz-province').val(data.khxx.sfdm);
                });

                //根据省写入市

                var v = data.khxx.sfdm;
                $.get('/commonmanager/xzqy/xjXzqy?sjdm=' + v, function(result) {
                    for(var i = 0; i < result.length; i++) {
                        $('<option value="' + result[i].xzqhDm + '">' + result[i].xzqhMc + '</option>').appendTo($('#bssz-city'));
                    }
                    $('#bssz-city').val(data.khxx.csdm);
                    $("#bssz li .BSDefault").show();
                    if($("#bssz li").attr("data") == "0"&&$("#bssz-city").val() == "370200"){
                        $(".bssz_LoginMess").show();
                        $('#bssz-ds').hide();
                    }else{
                        $(".bssz_LoginMess").hide();
                        $('#bssz-ds').show();
                    }
                });
                $('#bssz-qynsrsbh').val(data.khxx.nsrsbh);
                $('#bssz-gsmc').val(data.khxx.gsmc);
            },
            error:function () {
                Messenger().post({
                    message: "初始化客户信息失败！",
                    type: 'error'
                });
                return false;
            }
        })
    };


    //查找报税信息，如未设置，提示设置报税信息
    var initDeclaration = function (khbm) {
        $.ajax({
            url:configMap.path+configMap.declarationUrl+'/'+khbm,
            type:'GET',
            contentType: 'application/json; charset=utf-8',
            success:function (result) {
                //console.log(result);

                if(result.success){
                    var data = result.data;
                    //循环写入省
                    $.get('/commonmanager/xzqy/sj',function(data) {
                        for(var i = 0; i < data.length; i++) {
                            $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#bssz-province'));
                        }
                        $('#bssz-province').val(result.data.sfdm);
                    });

                    //根据省写入市

                        var v = data.sfdm;
                        $.get('/commonmanager/xzqy/xjXzqy?sjdm=' + v, function(data) {
                            for(var i = 0; i < data.length; i++) {
                                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#bssz-city'));
                            }
                            $('#bssz-city').val(result.data.csdm);
                            $("#bssz li .BSDefault").show();
                            if($("#bssz li").attr("data") == "0"&&$("#bssz-city").val() == "370200"){
                                $(".bssz_LoginMess").show();
                                $('#bssz-ds').hide();
                            }else{
                                $(".bssz_LoginMess").hide();
                                $('#bssz-ds').show();
                            }
                        });


                    $('#bssz-qynsrsbh').val(data.qynsrsbh);
                    $('#bssz-bsyzjlx').val(data.bsyzjlxDm);
                    $('#bssz-bsyzjhm').val(data.bsyzjhm);
                    $('#bssz-qydlmm').val(data.qydlmm);
                    $('#bssz-bsyfwmm').val(data.bsyfwmm);
                    $('#bssz-id').val(data.id);
                    $('#bssz').find('input[name="bssz-swjlxDm"][value='+data.swjlxDm+']').iCheck('check');
                }else {
                    initCustomer(khbm);
                    Messenger().post({
                        message: result.message,
                        type: 'warning'
                    });
                }
            }
        })
    };

    return{
        init:function (khbm) {
            configMap.khbm = khbm;
        /*  //循环写入省
            $.get('/commonmanager/xzqy/sj',function(data) {
                for(var i = 0; i < data.length; i++) {
                    $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#bssz-province'));
                }
            });*/
            //根据省写入市
            $('#bssz-province').change(function() {
                $('#bssz-city').empty();
                var v = $('#bssz-province').val();
                $.get('/commonmanager/xzqy/xjXzqy?sjdm=' + v, function(data) {
                    //console.log(data, 333);
                    for(var i = 0; i < data.length; i++) {
                        $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#bssz-city'));
                    }
                });
            });
            /**
             * 证件类型切换   清空输入框
             * */
            $('#bssz-bsyzjlx').change(function () {
               $('#bssz-bsyzjhm').val("");
               $('#bssz-bsyfwmm').val("");
            });

            /**
             * 切换国税 地税 国地税联合 信息输入div
             * */
            $('#bssz').find('input[name="bssz-swjlxDm"]').off().on('change',function () {
               if($(this).val()=="001"){
                    $('#bssz-gs').show();
                    $('#bssz-ds').hide();
                    $('#bssz-gds').hide();
               }else if($(this).val()=="002"){
                   $('#bssz-gs').hide();
                   $('#bssz-ds').show();
                   $('#bssz-gds').hide();
               }else if($(this).val()=="003"){
                   $('#bssz-gs').hide();
                   $('#bssz-ds').hide();
                   $('#bssz-gds').show();
               }
            });

            // //获取客户信息  地区 税号
            // initCustomer(khbm);
            //查找报税信息，如未设置，提示设置报税信息


            initDeclaration(configMap.khbm);

            $("#bssz li").on("click",function () {
                $("#bssz li .legendTrue").hide();
                $(this).children(".legendTrue").show();
                $("#bssz li .legendTrue").removeClass("BSDefault")
                $(this).children(".legendTrue").addClass("BSDefault")
                if($(this).attr("data") == "0"&&$("#bssz-city").val() == "370200"){
                    $(".bssz_LoginMess").show();
                    $('#bssz-ds').hide();
                }else{
                    $(".bssz_LoginMess").hide();
                    $('#bssz-ds').show();
                }
            });

            $("#bssz-city").on("change",function () {
                if($(".BSDefault").parent().attr("data") == "0"&&$("#bssz-city").val() == "370200"){
                    $(".bssz_LoginMess").show();
                    $('#bssz-ds').hide();
                }else{
                    $(".bssz_LoginMess").hide();
                    $('#bssz-ds').show();
                }
            })
        },
        setPath: function (path) {
            configMap.path = path;
        }
    }
}()





