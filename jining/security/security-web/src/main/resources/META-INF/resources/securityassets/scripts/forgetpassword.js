var forgetPassword = function () {

    var configMap = {
        path: '',
        dataUrl: '/customer/customer',
        successPath: '/forgetPasswordSuccessfully.jsp',
        failedPath: '/forPasswordFailed.jsp'
    };

    //登录账号的验证
    function clickButton(obj) {
        var obj = $(obj);
        $(obj).val("60(s)");
        obj.attr("disabled", "disabled");
        /*按钮倒计时*/
        var time = 60;
        var set = setInterval(function () {
            obj.val(--time + "(s)");
        }, 1000);
        /*等待时间*/
        setTimeout(function () {
            obj.attr("disabled", false).val("重新获取验证码");
            /*倒计时*/
            clearInterval(set);
        }, 60000);
    }

    $("#gain").off().on("click", function () {
        if($('#dlyhm').valid())
        if($('#phoneNum').valid()) {
            var phoneNum = $("#phoneNum").val();
            clickButton(this);
            $.get(configMap.path + '/caiyunMobile/sendMsg?dlzh=' + phoneNum, function (data) {
            });
        }
    });
    //validate设置验证规则
    jQuery.validator.addMethod("stringCheck", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9]{6,20}$/.test(value);
    }, "只能包括中文字、英文字母、数字和下划线");
    jQuery.validator.addMethod("passCheck", function (value, element) {
        return this.optional(element) || /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value);
    }, "请输入6-20数字字母的组合");

    /* 手机号码验证   */
    jQuery.validator.addMethod("phoneCheck", function (value, element) {
        return this.optional(element) || /^1(3|4|5|6|7|8|9)\d{9}$/.test(value);
    }, "请输入正确的手机号");

    //ajax验证验证码
    jQuery.validator.addMethod("yzmCheck", function (value, element) {    //用jquery ajax的方法验证电话是不是已存在
        var flag = 1;
        $.ajax({
            type: "POST",
            url: configMap.path + '/caiyunMobile/getDxyzm',
            async: false,      //同步方法，如果用异步的话，flag永远为1
            data: {'dlzh': $("#phoneNum").val(), 'dxyzm': $("#yzm").val()},
            success: function (msg) {
                if (msg.code == 0) {
                    flag = 0;
                }

            }
        });
        if (flag == 0) {
            // console.log("验证失败");
            return false;
        } else {
            //console.log("验证成功");
            return true;
        }

    }, "验证码错误");

//       //ajax验证用户名是否存在
    jQuery.validator.addMethod("dlyhmCheck", function (value, element) {    //用jquery ajax的方法验证登录账号是不是已存在
        var flag = 1;
        var data = {'zh': $("#dlyhm").val()};
        $.ajax({
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            url: '/customermanage/customerManage/hasExistByZh',
            data: JSON.stringify(data),
            async: false,                                             //同步方法，如果用异步的话，flag永远为1
            success: function (msg) {
                //console.log("请求成功");
                console.log(typeof msg, msg);
                if (msg + '' == "false") {
                    console.log(122);
                    flag = 0;
                }
            },
            error: function () {
               // console.log('请求失败')
            }
        });

        if (flag == 1) {
            //console.log("验证失败");
            return true;
        } else {
           // console.log("验证成功");
            return false;
        }

    }, "验证码错误");

    //添加账户和手机号码是否匹配的验证
    jQuery.validator.addMethod("phoneCheck1", function (value, element) {    //用jquery ajax的方法验证电话是不是已存在
        if(!$('#dlyhm').valid())
        {
           console.log(1213);
            return true;}
        var flag = 1;
        $.ajax({
            type: "GET",
            url:'/customermanage/customerManage/accountMatchTel?account='+$('#dlyhm').val()+'&tel='+$('#phoneNum').val(),
            async: false,
            success: function (msg) {
                if(msg){
                    flag=0;
                }else {
                    flag=1;
                }

            }
        });
        if (flag == 1) {
            // console.log("验证失败");
            return false;
        } else {
            //console.log("验证成功");
            return true;
        }

    }, "验证码错误");


    //开始验证

    $('#dljg-h').validate({
        onfocusout: function (element) {
            $(element).valid();
        },
        /* 设置验证规则 */
        rules: {
            yhzh: {
                required: true,
                stringCheck: true,
                dlyhmCheck: true
            },
            yhmm: {
                required: true,
                passCheck: true
            },
            repassword: {
                required: true,
                equalTo: "#yhmm"
            },
            sjhm: {
                required: true,
                phoneCheck: true,
                phoneCheck1: true
            },
            yzm: {
                required: true,
                yzmCheck: true
            }
        },

        /* 设置错误信息 */
        messages: {
            yhzh: {
                required: "请填写登录账号",
                stringCheck: "请输入6~20位数字，字母，或数字与字母组合!",
                dlyhmCheck: "用户名不存在"
            },
            yhmm: {
                required: "请输填写密码",
                stringCheck: "请输入6~20位数字与字母组合"
            },
            repassword: {
                required: "请输入确认密码",
                equalTo: "两次输入密码不一致"
            },
            sjhm: {
                required: "请输入手机号码",
                phoneCheck: "请输入正确的手机号码",
                phoneCheck1:"请输入该用户注册时的手机号码"

            },
            yzm: {
                required: "请输入验证码",
                yzmCheck: "验证码输入错误"
            }
        },

        /* 设置验证触发事件 */
        /* 设置错误信息提示DOM */
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        }

    });


    $("#changePassword").click(function () {
        if ($('#dljg-h').valid()) {
            var allData = $("#dljg-h").serializeArray();
            console.log(allData);
            var data = {
                "yhzh": allData[0].value,
                "yhmm": allData[3].value
            };
            $.ajax({
                url: configMap.path + configMap.dataUrl + "/updateCustmerPassword?yhzh=" + data.yhzh + "&yhmm=" + data.yhmm,
                type: 'PUT',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                success: function () {
                    window.location.href = configMap.path + configMap.successPath;
                },
                error: function () {
                    window.location.href = configMap.path + configMap.failedPath;
                }
            });
        } else {
            Messenger().post({
                message: '必选项不能为空,或格式不正确',
                type: 'warning'
            });
        }
    });
    /*var getDomainNameAllMessage=function () {
        var domain=''+window.location.host;
        $.ajax({
            url:'systemmanager/getDomainName/getDomainNameAll',
            type:'GET',
            data:domain,
            success:function (result) {
                console.log(result);
                if(result.domainNameBasic!=null){
                    $('#companyLogo').attr("src",result.domainNameBasic.companyLogo);
                    $('#servicePhone').html("服务热线："+result.domainNameBasic.servicePhone);
                    $('#internetFlag').attr("href",result.domainNameBasic.internetFlag);
                    $('#description').attr("content",result.domainNameBasic.descriptionInfo);
                    $('#keyWord').attr("content",result.domainNameBasic.keyWord);
                    $('#companyName').attr("content",result.domainNameBasic.companyName);
                    $('#title').html(result.domainNameBasic.title);
                    $('#copyInfo').html(result.domainNameBasic.copyrightInfo+result.domainNameBasic.icpRecord);
                }
            }

        })
    }*/
    return {
        setPath: function (path) {
            configMap.path = path;
            //getDomainNameAllMessage();
        }
    };

}();