var oneloginCon = function () {
    //'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        initUrl: '/customermanage/ptswsb/getTaxdeclarationByKhbm/',
        login1Url:'/customermanage/taxDeclaration/onekeylogin1.jsp',
        declarationUrl:'/ptswsb/getTaxdeclarationByKhbm',
        khdm:''
    };
    var initData=function (khdm) {
        $.ajax({
            type: 'GET',
            url: configMap.path+configMap.initUrl+khdm,
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSON',
            success: function (data) {
                Cookies.set("fwdlmm",data.data.bsyfwmm,{expires: 7});
                Cookies.set("nsrdlmm",data.data.qydlmm,{expires: 7});
                Cookies.set("nsrsbh",data.data.qynsrsbh,{expires: 7});
                Cookies.set("sfzhm",data.data.bsyzjhm,{expires: 7});
                Cookies.set("zjlxdm",data.data.bsyzjlxDm,{expires: 7});
            }
        });
    };
    function startApp() {
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent('myCustomEvent', true, false, "www.baidu.com");
        // fire the event
        document.dispatchEvent(evt);
    };
    var AppAlert = function(message){
        App.alert({
            container: $(".modal-body"),
            place: 'prepend',
            type: 'danger',
            message: message,
            closeInSeconds:3,
            icon: 'fa fa-warning'
        });
    };
    $(".setBtn").on("click",function () {
        parent.swsblist_data.setFun(localStorage.getItem("index"));
    });

    var swsbsz=function () {
        var rowIndex = localStorage.getItem("index");
        var khdm = configMap.susbListGrid.row(rowIndex).data().khbm;
        var gsmc = configMap.susbListGrid.row(rowIndex).data().gsmc;
        openModal("登录设置——"+gsmc,configMap.path+"/customermanage/taxDeclaration/declarationSetting.jsp?khbm="+encodeURI(khdm),"swsbsz",function () {
            var flag =false;
            var swjlxDm = $("#bssz ul li:nth-child(1)").val();
            var bsyzjlxDm = $('#bssz-bsyzjlx').val();
            var bsyzjhm = $('#bssz-bsyzjhm').val();
            var sfdm =$('#bssz-province').val();
            var csdm = $('#bssz-city').val();
            var bsyfwmm=$('#bssz-bsyfwmm').val();
            var qydlmm = $('#bssz-qydlmm').val();
            if (bsyzjlxDm=="201"){
                if(!whetherOrNotID(bsyzjhm)){
                    AppAlert("请输入正确身份证号码！");
                    return false;
                }
            }
            if(sfdm=="001"||sfdm==""||sfdm==null){
                AppAlert("请选择省份！");
                return false;
            }
            if(csdm=="001"||csdm==""||csdm==null){
                AppAlert("请选择城市！");
                return false;
            }
            if(swjlxDm==""||swjlxDm==null){
                AppAlert("请选择税务局类型！");
                return false;
            }
            if(bsyzjhm==""||bsyzjhm==null){
                AppAlert( "请输入办税员证件号码！");
                return false;
            }
            if(bsyfwmm==""||bsyfwmm==null){
                AppAlert("请输入办税员服务密码！")
                return false;
            }
            if(qydlmm==""||qydlmm==null){
                AppAlert("请输入企业登录密码！");
                return false;
            }
            var sbsz={
                bsyfwmm:bsyfwmm,
                bsyzjhm:bsyzjhm,
                bsyzjlxDm:bsyzjlxDm,
                csdm:csdm,
                csmc:$('#bssz-city option:selected').text(),
                sfdm:sfdm,
                sfmc:$('#bssz-province option:selected').text(),
                gsmc:$('#bssz-gsmc').val(),
                khbm:khdm,
                qydlmm:qydlmm,
                qynsrsbh:$('#bssz-qynsrsbh').val(),
                swjlxDm:swjlxDm,
                id:$('#bssz-id').val()
            };

            $.ajax({
                url:configMap.path+configMap.swsbszUrl,
                type :'POST',
                contentType : 'application/json; charset=utf-8',
                dataType : 'json',
                data : JSON.stringify(sbsz),
                async:false,//同步   如不同步 返回flag值只有false
                success:function (result) {
                    if (result.success){
                        Messenger().post({
                            message: result.message,
                            type: 'success'
                        });

                        flag=true;

                    }else {
                        AppAlert(result.message);
                    }
                }
            });
            return flag;
        });

    };
    return {
        // 初始化
        init: function (khdm) {
            var xy = window.location.protocol;
            var dk = location.host;
            var type;
            var message ;
            $(".setBtn").hide();
            $(".setBtn").parent().parent().css("width","86px");
            if(navigator.userAgent.indexOf("Chrome") > -1){
                // 查找报税信息，如未设置，提示设置报税信息
                $.ajax({
                    url: configMap.path + configMap.declarationUrl + '/' + khdm,
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    success: function (result) {
                        if(result.success){
                            $(".loginBtn").attr("href","OpenIE://"+xy+"//"+ dk +configMap.login1Url+"?khbm="+khdm+"");
                            type = true;
                        }else{
                            $(".loginBtn").attr("disabled","disabled");
                            $(".loginBtn").attr("href","javascript:void(0);");
                            $(".setBtn").css("display","block");
                            $(".setBtn").parent().parent().css("width","180px");
                            type = false;
                            message = result.message;
                            AppAlert(message);
                        }
                    }
                })
                // $(".loginBtn").attr("href","OpenIE://"+xy+"//"+ dk +configMap.login1Url+"?khbm="+khdm+"");
            }else{
                $(".loginBtn").attr("href",""+xy+"//"+ dk +configMap.login1Url+"?khbm="+khdm+"");
            }
            configMap.khdm=khdm;
            $("#swsbswlx li .BSDefault").show();
            $("#swsbswlx li").on("click",function () {
                $("#swsbswlx li .legendTrue").hide();
                $(this).children(".legendTrue").show();
                if($(this).attr("data") == "1"){
                    $(".setBtn").hide();
                    $(".setBtn").parent().parent().css("width","86px");
                    message1 = "该功能暂未开通，尽请期待";
                    AppAlert(message1)
                }else if($(this).attr("data") == "0" && type == false){
                    $(".setBtn").css("display","block");
                    $(".setBtn").parent().parent().css("width","180px");
                    message1 = message;
                    AppAlert(message1)
                }
                if($(this).attr("data") == "1" || type == false){
                    $(".loginBtn").attr("disabled","disabled");
                    $(".loginBtn").attr("href","javascript:void(0);");

                }else{
                    $(".loginBtn").removeAttr("disabled");
                    if(navigator.userAgent.indexOf("Chrome") > -1){
                        $(".loginBtn").attr("href","OpenIE://"+xy+"//"+ dk +configMap.login1Url+"?khbm="+khdm+"");
                    }else{
                        $(".loginBtn").attr("href",""+xy+"//"+ dk +configMap.login1Url+"?khbm="+khdm+"");
                    }

                }
            })

            $("#wsbst").find('.addDate').datepicker({
                clearBtn: true,
                format: 'yyyy-mm',
                autoclose: true,
                language: 'zh-CN',
            });
            initData(khdm);
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();