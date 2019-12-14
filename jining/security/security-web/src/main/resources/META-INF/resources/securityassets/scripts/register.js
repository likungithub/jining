var registerPage=function(){
    var configMap = {
        path: ''
    };
    //注册机构
    var institution ;
    // var wodemingcheng = "公司名";
    //获取代理会计标签
    $("#main .top>span:nth-child(1)").click(function() {
        //console.log(12311);
        institution=2;
        // wodemingcheng = "用户名";
        /*$(".form_one").validate().resetForm();
         $("form").removeClass("form_one");
         $("form").addClass("form_two");*/
        // $(".ogsmc").text("用户名称");
        // $("#txtname").attr("placeholder","请输入用户名称");
        // $(".form_one input").val("");
        // $("#gain").val("获取验证码");
        // institution = 3;
        // $(".error").html("");
        $('#cover2').removeClass('activeDis');
        $('#cover1').addClass('activeDis');
        // $('.companyNum').css('display', 'none');
        $('#dljg-m').addClass('formActive');
        $('#dlkj-m').removeClass('formActive');
        $("#agree").click(function () {
            if ($(this).is(":checked")) {
                $("#register").removeAttr("disabled","disabled").css("background","#059bf2");
            } else {
                $("#register").attr("disabled","disabled");
            }
        });
        function clickButton(obj) {
            var obj = $(obj);
            $(obj).val("60(s)");
            obj.attr("disabled", "disabled"); /*按钮倒计时*/
            var time = 60;
            var set = setInterval(function() {
                obj.val(--time + "(s)");
            }, 1000); /*等待时间*/
            setTimeout(function() {
                obj.attr("disabled", false).val("重新获取"); /*倒计时*/
                clearInterval(set);
            }, 60000);
        }
//        var dljgId = $('.activeDis').parent().attr("id");
//        if(dljgId == 'cover1'){
//
//        }
        $("#gain1").off().on("click", function() {
            if($('#phoneNum').valid()){
            var phoneNum = $("#phoneNum").val();
            clickButton(this);
            $.get(configMap.path +'/caiyunMobile/sendMsg?dlzh='+phoneNum, function(data) {
            });
            }
        });
        //validate设置验证规则
        jQuery.validator.addMethod("stringCheck", function(value, element) {
            return this.optional(element) || /^[a-zA-Z0-9]{6,20}$/.test(value);
        }, "只能包括中文字、英文字母、数字和下划线");
        jQuery.validator.addMethod("passCheck", function(value, element) {
            return this.optional(element) || /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value);
        }, "请输入6-20数字字母的组合");

        /* 手机号码验证   */
        jQuery.validator.addMethod("phoneCheck", function(value, element) {
            return this.optional(element) || /^1(3|4|5|6|7|8|9)\d{9}$/.test(value);
        }, "请输入正确的手机号");

        //纳税人识别号普通验证
        jQuery.validator.addMethod("nsrsbhCheck", function(value, element) {
            return this.optional(element) || /^((?![a-zA-Z]*$)[a-zA-Z0-9]{15,18})$|(^\d{15,18}$)/.test(value);

        }, "请输入正确纳税人识别号");

        //纳税人识别号ajax验证
        jQuery.validator.addMethod("nsrsbhCheckAjax", function(value, element) {    //用jquery ajax的方法验证电话是不是已存在
            var flag = 1;
            $.ajax({
                type:"GET",
                url:'/customermanage/ptkhxx/getDlNsrsbhExist?nsrsbh=' + $("input.companyNum").val(),
                async:false,                                             //同步方法，如果用异步的话，flag永远为1
                success: function(msg){
                   // console.log(msg);
                    if(msg){
                        flag = 0;
                    }
                }
            });
            if(flag == 0){
                //console.log("纳税人识别号验证失败");
                return false;
            }else{
                //console.log("纳税人识别号验证成功");
                return true;
            }

        }, "验证码错误");

        //ajax验证验证码
        jQuery.validator.addMethod("yzmCheck", function(value, element) {    //用jquery ajax的方法验证电话是不是已存在
            var flag = 1;
            $.ajax({
                type:"POST",
                url:configMap.path +'/caiyunMobile/getDxyzm',
                async:false,                                             //同步方法，如果用异步的话，flag永远为1
                data:{'dlzh':$("#phoneNum").val(),'dxyzm':$("#yzm").val()},
                success: function(msg){
                    if(msg.code == 0){
                        flag = 0;
                    }

                }
            });
            if(flag == 0){
                // console.log("验证失败");
                return false;
            }else{
                //console.log("验证成功");
                return true;
            }

        }, "验证码错误");

//       //ajax验证用户名是否存在
        jQuery.validator.addMethod("dlyhmCheck", function(value, element) {    //用jquery ajax的方法验证登录账号是不是已存在
            var flag = 1;
            var data = {'zh':$("#dlyhm").val()};
            $.ajax({
                type:"POST",
                contentType: 'application/json; charset=utf-8',
                url:'/customermanage/customerManage/hasExistByZh',
                data:JSON.stringify(data),
                async:false,                                             //同步方法，如果用异步的话，flag永远为1
                success: function(msg){
                 //console.log("请求成功");
                    //console.log(typeof msg,msg);
                    if(msg+''== "false"){
                        //console.log(122);
                        flag = 0;
                    }
                },
                error:function(){
                    //console.log('请求失败')
                }
            });

            if(flag == 0){
                //console.log("验证失败");
                return true;
            }else{
                //console.log("验证成功");
                return false;
            }

        }, "验证码错误");

        //开始验证

        $('#dljg-m').validate({
            onfocusout: function(element) { $(element).valid(); },
            /* 设置验证规则 */
            rules: {
                yhzh: {
                    required:true,
                    stringCheck:true,
                    dlyhmCheck:true,
                },
                yhmm: {
                    required:true,
                    passCheck:true,
                },
                repassword: {
                    required:true,
                    equalTo:"#yhmm",
                },
                sjhm: {
                    required:true,
                    phoneCheck:true,
                },
                yzm:{
                    required:true,
                    yzmCheck:true,
                },
                name:{
                    required:true
                },
                nsrsbh:{
                    required : true,
                    nsrsbhCheck : true,
                    nsrsbhCheckAjax : true
                },
                province : {
                    required : true
                },
                city:{
                    required : true
                },
                email : {
                    required : true,
                    email : true
                }
            },

            /* 设置错误信息 */
            messages: {
                yhzh: {
                    required: "请填写用户名",
                    stringCheck: "请输入6~20位数字，字母，或数字与字母组合!",
                    dlyhmCheck: "用户名已经存在",
                },
                yhmm: {
                    required: "请输填写密码",
                    stringCheck: "请输入6~20位数字与字母组合",
                },
                repassword:{
                    required: "请输入确认密码",
                    equalTo: "两次输入密码不一致",
                },
                sjhm:{
                    required: "请输入手机号码",
                    phoneCheck:"请输入正确的手机号码",
                },
                yzm:{
                    required:"请输入验证码",
                    yzmCheck : "验证码输入错误",
                },
                name : {
                    required : "请输入公司名称",
                },
                nsrsbh : {
                    required : "请输入纳税人识别号",
                    nsrsbhCheck : "请输入15-18纳税人识别号!",
                    nsrsbhCheckAjax : "纳税人识别号已经存在"
                },
                province : {
                    required : "请选择省!"
                },
                city:{
                    required : "请选择市!"
                },
                email : {
                    required : "请输入邮箱",
                    email : "请输入正确的邮箱"
                }
            },

            /* 设置验证触发事件 */
            /* 设置错误信息提示DOM */
            errorPlacement: function(error, element) {
                error.appendTo( element.parent());
            }

        });
        // $('#phoneNum').keyup(function(){
        //     if(! $(this).valid()) {
        //         // 自定义错误处理样式，并显示错误消息
        //         $("#gain1").attr("disabled","disabled").css("background","#ddd");
        //
        //     } else {
        //         // 验证成功后删除
        //         $("#gain1").removeAttr("disabled","disabled").css("background","#ccc");
        //     }
        // });
//        $("#register").click(function(){
//     	   //alert("我正在验证....");
//     	   //$('form').submit();
//     	   if($('form').valid()){
//     		   var allData = $("form").serializeArray();
//     		   if(institution == 2) {
//     			   var data1 = {
//                            "qylx_dm": "002",
//                            "yhzh": allData[2].value,
//                            "yhmm": allData[3].value,
//                            "sjhm": allData[5].value,
//                            "name": allData[7].value,
//                            "nsrsbh": allData[8].value,
//                            "szsf": allData[9].value,
//                            "szcs": allData[10].value,
//                            "email": allData[11].value
//                        };
//     			   $.ajax({
//
//                        url: "/customer/customer/customer",
//                        type: "POST",
//                        contentType: 'application/json; charset=utf-8',
//                        data: JSON.stringify(data1),
//                        success: function(result) {
//                            if(result.success){
//                                window.location.href = "registerSuccessfully.jsp";
//                            }else{
//                                window.location.href = "registerFailed.jsp";
//                            }
//
//                        }
//                    });
//     		   }
//     		   if(institution == 3) {
//     			   var data2 = {
//                            'qylx_dm': "003",
//                            'yhzh': allData[2].value,
//                            'yhmm': allData[3].value,
//                            "sjhm": allData[5].value,
//                            "name": allData[7].value,
//                            "szsf": allData[9].value,
//                            "szcs": allData[10].value,
//                            "email": allData[11].value
//                        };
//     			   $.ajax({
//
//                        url: "/customer/customer/customer",
//                        type: "POST",
//                        contentType: 'application/json; charset=utf-8',
//                        data: JSON.stringify(data2),
//                        success: function() {
//                            console.log('提交成功,欢迎注册');
//                        }
//                    });
//     		   }
//     	   }
//     	   else{
//     		   //alert("验证失败");
//     	   }
//        });
    });
    //获取代理机构标签

    $("#main .top>span:nth-child(2)").click(function() {
        //console.log(123);
        institution=3;
        //wodemingcheng = "名称";
        //$(".form_two").validate().resetForm();
        //$("form").removeClass("form_two");
        // $(".ogsmc").text("公司名称");
        // $("#txtname").attr("placeholder","请输入公司名称");
        // $("form input").val("");
        // $("#gain").val("获取验证码");
        // institution = 3;
        // $(".error").html("");
        // institution = 2;
        //$("form").addClass("form_one");
        $('#cover1').removeClass('activeDis');
        $('#cover2').addClass('activeDis');
        // $('.companyNum').css('display', 'inline-block');

        $('#dlkj-m').addClass('formActive');
        $('#dljg-m').removeClass('formActive');

        $("#agree").click(function () {
            if ($(this).is(":checked")) {
                $("#register").removeAttr("disabled","disabled").css("background","#059bf2");
            } else {
                $("#register").attr("disabled","disabled");
            }
        });
        function clickButton(obj) {
            var obj = $(obj);
            $(obj).val("60(s)");
            obj.attr("disabled", "disabled"); /*按钮倒计时*/
            var time = 60;
            var set = setInterval(function() {
                obj.val(--time + "(s)");
            }, 1000); /*等待时间*/
            setTimeout(function() {
                obj.attr("disabled", false).val("重新获取验证码"); /*倒计时*/
                clearInterval(set);
            }, 60000);
        }
        $("#gain2").off().on("click", function() {
            if($('#phoneNum1').valid()){
            var phoneNum = $("#phoneNum1").val();
            clickButton(this);
            $.get(configMap.path +'/caiyunMobile/sendMsg?dlzh='+phoneNum, function(data) {
            });}
        });
        //validate设置验证规则
        jQuery.validator.addMethod("stringCheck", function(value, element) {
            return this.optional(element) || /^[a-zA-Z0-9]{6,20}$/.test(value);
        }, "请输入数字与字母的组合");
        jQuery.validator.addMethod("passCheck", function(value, element) {
            return this.optional(element) || /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value);
        }, "请输入6-20数字字母的组合");

        /* 手机号码验证   */
        jQuery.validator.addMethod("phoneCheck", function(value, element) {
            return this.optional(element) || /^1(3|4|5|6|7|8|9)\d{9}$/.test(value);
        }, "请输入正确的手机号");

        //纳税人识别号普通验证
        jQuery.validator.addMethod("nsrsbhCheck", function(value, element) {
            return this.optional(element) || /^((?![a-zA-Z]*$)[a-zA-Z0-9]{15,18})$|(^\d{15,18}$)/.test(value);
        }, "请输入正确纳税人识别号");

        //纳税人识别号ajax验证
        jQuery.validator.addMethod("nsrsbhCheckAjax", function(value, element) {    //用jquery ajax的方法验证电话是不是已存在
            var flag = 1;
            $.ajax({
                type:"GET",
                url:'/customermanage/ptkhxx/getDlNsrsbhExist?nsrsbh=' + $("input.companyNum").val(),
                async:false,                                             //同步方法，如果用异步的话，flag永远为1
                success: function(msg){
                    if(msg){
                        flag = 0;
                    }
                }
            });
            if(flag == 0){
                //console.log("纳税人识别号验证失败");
                return false;
            }else{
                //console.log("纳税人识别号验证成功");
                return true;
            }

        }, "验证码错误");

        //ajax验证验证码
        jQuery.validator.addMethod("yzmCheck", function(value, element) {
            //用jquery ajax的方法验证电话是不是已存在
            var flag = 1;
            $.ajax({
                type:"POST",
                url:configMap.path +'/caiyunMobile/getDxyzm',
                async:false,                                             //同步方法，如果用异步的话，flag永远为1
                data:{'dlzh':$("#phoneNum1").val(),'dxyzm':$("#yzm1").val()},
                success: function(msg){
                    if(msg.code == 0){
                        flag = 0;
                    }
                }
            });
            if(flag == 0){
                // console.log("验证失败");
                return false;
            }else{
                //console.log("验证成功");
                return true;
            }

        }, "验证码错误");

        //ajax验证用户名是否存在
        jQuery.validator.addMethod("dlyhmCheck", function(value, element) {    //用jquery ajax的方法验证电话是不是已存在
            var flag = 1;
            var data = {'zh':$("#dlyhm1").val()};
            $.ajax({
                type:"POST",
                contentType: 'application/json; charset=utf-8',
                url:'/customermanage/customerManage/hasExistByZh',
                data:JSON.stringify(data),
                async:false,                                             //同步方法，如果用异步的话，flag永远为1
                success: function(msg){
                    if(msg){
                        flag = 0;
                    }
                }
            });
            if(flag == 0){
                //console.log("验证失败");
                return false;
            }else{
                //console.log("验证成功");
                return true;
            }

        }, "验证码错误");

        //开始验证

        $('#dlkj-m').validate({
            onfocusout: function(element) { $(element).valid(); },
            /* 设置验证规则 */
            rules: {
                yhzh: {
                    required:true,
                    dlyhmCheck:true,
                    stringCheck:true

                },
                yhmm: {
                    required:true,
                    passCheck:true,
                },
                repassword: {
                    required:true,
                    equalTo:"#yhmm1",
                },
                sjhm: {
                    required:true,
                    phoneCheck:true,
                },
                yzm:{
                    required:true,
                    yzmCheck:true,
                },
                name:{
                    required:true
                },
                nsrsbh:{
                    required : true,
                    nsrsbhCheck : true,
                    nsrsbhCheckAjax : true
                },
                province : {
                    required : true
                },
                city:{
                    required : true
                },
                email : {
                    required : true,
                    email : true
                }
            },

            /* 设置错误信息 */
            messages: {
                yhzh: {
                    required: "请填写用户名",
                    stringCheck: "请输入6~20位数字，字母，或数字与字母组合!",
                    dlyhmCheck: "用户名已经存在",
                },
                yhmm: {
                    required: "请输填写密码",
                    stringCheck: "请输入6~20位数字与字母组合",
                },
                repassword:{
                    required: "请输入确认密码",
                    equalTo: "两次输入密码不一致",
                },
                sjhm:{
                    required: "请输入手机号码",
                    phoneCheck:"请输入正确的手机号码",
                },
                yzm:{
                    required:"请输入验证码",
                    yzmCheck : "验证码输入错误",
                },
                name : {
                    required : "请输入用户名称",
                },
                nsrsbh : {
                    required : "请输入纳税人识别号",
                    nsrsbhCheck : "请输入15-18位纳税人识别号!",
                    nsrsbhCheckAjax : "纳税人识别号已存在"
                },
                province : {
                    required : "请选择省!"
                },
                city:{
                    required : "请选择市!"
                },
                email : {
                    required : "请输入邮箱",
                    email : "请输入正确的邮箱"
                }
            },

            /* 设置验证触发事件 */
            /* 设置错误信息提示DOM */
            errorPlacement: function(error, element) {
                error.appendTo( element.parent());
            }

        });
        // $('#phoneNum1').keyup(function(){
        //     if(! $(this).valid()) {
        //         // 自定义错误处理样式，并显示错误消息
        //         $("#gain2").attr("disabled","disabled").css("background","#ddd");
        //
        //     } else {
        //         // 验证成功后删除
        //         $("#gain2").removeAttr("disabled","disabled").css("background","#ccc");
        //     }
        // });


    });
    $("#main .top>span:nth-child(1)").trigger("click");
    $("#register").click(function(){
        //alert("我正在验证....");
        //$('form').submit();
        if($('#dljg-m').valid()){
            App.blockUI({
                boxed: true,
                message: '正在跳转，请稍候...'
            });
            var allData = $("#dljg-m").serializeArray();
            //console.log(allData,2123);
            if(institution == 2) {
                var data1 = {
                    "qylx_dm": "002",
                    "yhzh": allData[1].value,
                    "yhmm": allData[2].value,
                    "sjhm": allData[4].value,
                    "name": allData[6].value,
                    "nsrsbh": allData[7].value,
                    "szsf": allData[8].value,
                    "szcs": allData[9].value,
                    "email": allData[10].value
                };
                //console.log(data1,2123);
                $.ajax({

                    url: "/customermanage/customerManage/customer",
                    type: "POST",
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(data1),
                    success: function(result) {
                        if(result.success){
                            App.unblockUI($('body'));
                            window.location.href = "registerSuccessfully.jsp";
                        }else{
                            App.unblockUI($('body'));
                            window.location.href = "registerFailed.jsp";
                        }

                    }
                });
            }

        }
        else{
            //alert("验证失败");
        }

        if($('#dlkj-m').valid()){
            var allData1 = $("#dlkj-m").serializeArray();
            //console.log(allData1,'mdw');
            if(institution == 3) {
                var data2 = {
                    'qylx_dm': "003",
                    'yhzh': allData1[1].value,
                    'yhmm': allData1[2].value,
                    "sjhm": allData1[4].value,
                    "name": allData1[6].value,
                    "szsf": allData1[7].value,
                    "szcs": allData1[8].value,
                    "email": allData1[9].value
                };
                //console.log(data2,2123);
                $.ajax({

                    url: "/customermanage/customerManage/customer",
                    type: "POST",
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(data2),
                    success: function(result) {
                        if(result.success){
                            window.location.href = "registerSuccessfully.jsp";
                        }else{
                            window.location.href = "registerFailed.jsp";
                        }

                    }
                });
            }

        }
        else{
            //alert("验证失败");
        }

    });
    //循环写入省市
    /**
     * 获取省级单位,拼接到selectet标签中
     * */
    var passed = {
        city : false
    }
    $.get(configMap.path + '/commonmanager/xzqy/sj',function(data) {
        for(i = 0; i < data.length; i++) {
            $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#dljg-m select[name=province]'));
        }
    });
    $.get(configMap.path + '/commonmanager/xzqy/sj',function(data) {
        for(i = 0; i < data.length; i++) {
            $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#dlkj-m select[name=province]'));
        }
    });
    //省市的选择
    $('#dljg-m select[name=province]').change(function() {
        $('#dljg-m select[name=city]').empty();
        var v = $('#dljg-m select[name=province]').val();
        $('#dljg-m select[name=city]').change(function() {
            if(v && $('#dljg-m select[name=city]').val()) {
                passed.city = true;
            } else {
                passed.city = false;
            }
        });
        $.get(configMap.path+'/commonmanager/xzqy/xjXzqy?sjdm=' + v, function(data) {
            //console.log(data, 333);
            for(i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#dljg-m select[name=city]'));
            }
        });
    });
    $('#dlkj-m select[name=province]').change(function() {
        $('#dlkj-m select[name=city]').empty();
        var v = $('#dlkj-m select[name=province]').val();
        $('#dlkj-m select[name=city]').change(function() {
            if(v && $('#dlkj-m select[name=city]').val()) {
                passed.city = true;
            } else {
                passed.city = false;
            }
        });
        $.get(configMap.path+'/commonmanager/xzqy/xjXzqy?sjdm=' + v, function(data) {
            //console.log(data, 333);
            for(i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#dlkj-m select[name=city]'));
            }
        });
    });
    $("#agree").click(function () {
        if ($(this).is(":checked")) {
            $("#register").removeAttr("disabled","disabled").css("background","#059bf2");
        } else {
            $("#register").attr("disabled","disabled");
        }
    });
    $("#agree1").click(function () {
        if ($(this).is(":checked")) {
            $("#register").removeAttr("disabled","disabled").css("background","#059bf2");
        } else {
            $("#register").attr("disabled","disabled");
        }
    });
    //    免费获取验证码

    return {
        setPath: function (path) {
            configMap.path = path;
        }
    };

}();