var appcustomerinfoAdd = function () {
    'use strict';

    var configMap = {
        id:'',
        sjhm:'',
        path: '',
        dataUrl: '/appcustomerinfo/appcustomerinfo',
        checkjshmUrl: '/appcustomerinfo/checksjhm',
        flag:'',
        datas :[],
        yxid:'',
        dljgBm:'',
        currentZydm:'',
        yxidflag:'',
        ifEdit:'',
    };

    /* var datasmc={

     }*/
    // 全局Dom
    var jqueryMap = {
        $workorderForm:null
    };
//兼容修改火狐样式
    $(".modal-dialog").css("width","820");
    $(".modal-dialog").css("padding","0");
    var setJqueryMap = function () {
        jqueryMap.$workorderForm = $('#business_m');
        jqueryMap.$workorderForm.parents('.modal-dialog').css("width","820")
            .end()
            .parents('.modal-body')
            .css({padding:0});
    };
    var openModal1 = function (title, url, type) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    $('#addFQR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    $('#tjrmcSl','#business_m').val($('#alreadyPer li','#allotStaffList_m').attr('user'));
                    $('#tjrmcSl1','#business_m').val( $('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                }
            };
        }
        if (type === 'edit1') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    // $('#addFQR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    $('input[name="khjlmc"]','#business_m').val($('#alreadyPer li','#allotStaffList_m').attr('user'));
                    $('input[name="khjldm"]','#business_m').val( $('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                }
            };
        }
        if(type==='edit2'){
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    // $('#addZXR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    var strArr=[],strArr1=[],strArr2=[];
                    $('#alreadyPer li','#allotStaffList_m').each(function(){
                        strArr.push($(this).attr('user'));//用户名称
                        strArr1.push($(this).attr('zydm')+"-"+$(this).attr('user'));//职员代码
                        strArr2.push($(this).children('img').attr('src'));//职员头像
                    });
                    if(configMap.yxid){
                        $.ajax({
                            url:configMap.path+'/intentionCustomer/deleteShareCustomer/'+configMap.yxid+'/'+configMap.dljgBm+'/'+configMap.currentZydm,
                            type:'DELETE',
                            success:function () {
                                /*alert(1);*/
                            }
                        })
                    }

                    // console.log(strArr1);
                    // console.log(strArr2);
                    var str3 =strArr2.join(',');
                    var str1 = strArr.join(' ,');
                    var str2 = strArr1.join(',');
                    // console.log(str2);
                    $('#gxkh').html(str1)
                        .attr("data-original-title",str1)
                        .tooltip();

                    $('#gxkh').attr('zxry_dm',str2);
                    // console.log($('#gxkh').attr('zxry_dm'));
                    var zydms="";
                    /*var zydms=$('#gxkh').html().split(",");*/
                    for(var i=0;i<$('#gxkh').attr('zxry_dm').split(",").length;i++){
                        zydms = $('#gxkh').attr('zxry_dm').split(",")[i];
                        configMap.datas.push(zydms);
                    }
                    /*$('#gxkh').attr('rtx',str3);*/
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };

        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className:'addappcustomerinfo_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    //选择推荐人事件 用focus事件
    $('#tjrmcSl','#business_m').focus(function(){
        if($("#stationblockchooseWrap").attr("type")=="004"||$("#stationblockchooseWrap").attr("type")=="005"){

        }else{
            openModal1('选推荐人', '/systemmanager/businesscooperate/staffList.jsp?type=one','edit');
        }
    });
    //选择客户经理
    $('input[name="khjlmc"]','#business_m').focus(function(){

        if($("#stationblockchooseWrap").attr("type")=="004"||$("#stationblockchooseWrap").attr("type")=="005"){

        }else {
            openModal1('选推荐人', '/systemmanager/businesscooperate/staffList.jsp?type=one', 'edit1');
        }
    });
    $('#gxkh').focus(function () {
        if($("#stationblockchooseWrap").attr("type")=="004"||$("#stationblockchooseWrap").attr("type")=="005"){

        }else{
            openModal1('选择职员','/systemmanager/businesscooperate/staffList.jsp?type=any','edit2');
        }
    })
    //修改意向客户跟进状态
    //跟进意向点击
    $(".yxgj-wrap").prev().click(function () {
        $(".yxgj-wrap").toggleClass("active")
    })
    var generateTab = function (_target, srcStr, menuName, id, icon) {
        //标签移除
        $("#tab-page-nav-" + id).remove();
        //内容移除
        $("#tab-page-content-" + id).remove();
        var _opt;
        var $a_alarm = $('ul.page-sidebar-menu').find('a.nav-link.nav-toggle[url="' + srcStr + '"]');
        if ($a_alarm.length > 0) {
            _opt = {
                title: '<i class="' + $a_alarm.find('i').attr('class') + '"><i></i></i> ' + $a_alarm.find('span').html(),
                id: $a_alarm.data('addtab'),
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        } else {
            _opt = {
                title: '<i class="' + icon + '"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    }
    //正常跟进状态点击
    function addStationBlockChoose() {
        var stationblockchoose= $(".stationblockchooseWrap-item")
        stationblockchoose.confirmation({
            "title": '是否进入此状态？',
            "btnOkLabel": '是',
            "btnCancelLabel": '否',
            "placement": 'left',
            "onConfirm": stationchooseEvent ,
            "btnOkClass": 'btn btn-danger borderRadius4',
            "btnCancelClass": "btn btn-default borderRadius4"
        });
    }
    //步骤跳转控制
    function stepStation(data) {
        //步骤跳转控制
        for (var i = $("#stationblockchooseWrap > div").length;i>0;i--){
            $("#stationblockchooseWrap > div:eq("+(i-1)+")").removeClass("stationblockchooseWrap-item")
            if(data=="002"){
                $(".yxgj-wrap .yxgj-item").addClass("stationblockchooseWrap-item")
            }else if(data=="003"&&$("#stationblockchooseWrap > div:eq("+(i-1)+")").attr("type")=="003"){
                $(".yxgj-wrap .yxgj-item").removeClass("stationblockchooseWrap-item")
                $("#stationblockchooseWrap > div:eq("+(i-1)+")").next().next().addClass("stationblockchooseWrap-item")
            }else if(data=="001"){
                $("#stationblock-cxgj").addClass("stationblockchooseWrap-item")
            }else if($("#stationblockchooseWrap > div:eq("+(i-1)+")").attr("type")==data){
                // console.log("进入下一步")
                // console.log($("#stationblock-cxgj").attr("class")+1)
                $("#stationblockchooseWrap > div:eq("+(i-1)+")").next().addClass("stationblockchooseWrap-item")
                // console.log($("#stationblock-cxgj").attr("class")+2)
                // console.log("进入下一步")
            }else if(data=="004"){
                return false
            }
            if(i==1){
                // console.log("进入下一步")
                // console.log($("#stationblock-cxgj").attr("class")+3)
                addStationBlockChoose()
                // console.log($("#stationblock-cxgj").attr("class")+4)
            }
        }
        // $("#stationblockchooseWrap > div").each(function (i,obj) {
        //
        // })
    }
    function stationchooseEvent (event,element) {
        // if($(element).hasClass("stationblockchooseWrap-item")){
        //     console.log(1)
        // }
        var yxid;
        if(configMap.yxid){
            yxid=configMap.yxid;
        }else{
            yxid=$('#intentionCode').val();
        }
        var stationItem = element;
        if($(element).attr("type")>$("#stationblockchooseWrap").attr("type")&&($(element).attr("type")-$("#stationblockchooseWrap").attr("type")==1)){
            $.ajax({
                url:configMap.path+'/appcustomerinfo/updateType/'+$(element).attr("type")+"/"+yxid,
                type:'GET',
                success:function (data) {
                    if(data.success){
                        appcustomerinfo.reload();
                        // console.log($("#stationblock-cxgj").attr("class")+4)
                        $("#stationblockchooseWrap").attr("type",data.followType)
                        // console.log($("#stationblock-cxgj").attr("class")+5)
                        // console.log("进入下一步")
                        stepStation(data.followType)
                        // console.log($("#stationblock-cxgj").attr("class")+6)
                        // console.log("进入下一步")
                        $("#stationblockchooseWrap > div").each(function (i,obj) {
                            $(this).removeClass("active")
                            if($(this).attr("type")==data.followType){
                                $(this).addClass("active")
                            }else if(data.followType=="004"&&$(this).attr("type")=="003"){
                                $(this).addClass("active")
                            }
                        })
                        if(data.followType=="003"||data.followType=="004"){
                            $("#appcustomerinfoAdd_ws .yxgj-wrap").addClass("active")
                            $("#appcustomerinfoAdd_ws .yxgj-wrap .yxgj-item").each(function (i,obj) {
                                $(this).removeClass("active")
                                if($(this).attr("type")==data.followType){
                                    $(this).addClass("active")
                                }
                            })
                        }
                    }else{
                        App.alert({
                            container: jqueryMap.$workorderForm.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: result.message,
                            closeInSeconds:2,
                            icon: 'fa fa-warning'
                        });
                    }

                }
            })
        }else if($("#stationblockchooseWrap").attr("type")=="003"&&($(element).attr("type")-$("#stationblockchooseWrap").attr("type")==2)){//签约
            if(configMap.id==""||configMap.id==null){
                configMap.id=$('#intentionId').val();
            }
            var data= {
                customer:[{id:configMap.id}]
            };
            $.ajax({
                url:configMap.path+'/appcustomerinfo/appcustomerinfo/confirm',
                type:'PUT',
                contentType: 'application/json; charset=utf-8',
                dataType: 'JSON',
                data:JSON.stringify(data),
                success:function (result) {
                    if(result.success){
                        //?firstpage=1&addappcustomerinfo1=1&id='+result.id+'&name='+result.name
                        // console.log("签约")
                        $.ajax({
                            url:configMap.path+'/appcustomerinfo/updateType/'+$(element).attr("type")+"/"+yxid,
                            type:'GET',
                            success:function (data) {
                                if(data.success){
                                    $("#stationblockchooseWrap .stationblockchooseWrap-item").each(function () {
                                        $(this).removeClass("stationblockchooseWrap-item")
                                    })
                                    appcustomerinfo.reload();
                                    appcustomerinfo.hide();
                                    generateTab(this, '/customermanage/customerManage/khlist.jsp?addappcustomerinfo1=1&id='+result.id+'&name='+result.name, '客户列表', 'ddcc3cba-032d-4a25-811e-a68be21dbd1a', 'icon iconfont icon-daizhangfuwu- iconMr');
                                }else{
                                    App.alert({
                                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                                        place: 'prepend',
                                        type: 'danger',
                                        message: data.message,
                                        closeInSeconds: 2,
                                        icon: 'fa fa-warning'
                                    });
                                }

                            }
                        })
                    }else{
                        App.alert({
                            container: jqueryMap.$workorderForm.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: result.message,
                            closeInSeconds: 2,
                            icon: 'fa fa-warning'
                        });
                    }

                }
            })

        }else if($("#stationblockchooseWrap").attr("type")=="002"&&($(element).attr("type")-$("#stationblockchooseWrap").attr("type")==2)){//流失意向
            $.ajax({
                url:configMap.path+'/appcustomerinfo/updateType/'+$(element).attr("type")+"/"+yxid,
                type:'GET',
                success:function (data) {
                    if(data.success){
                        appcustomerinfo.reload();
                        $("#stationblockchooseWrap").attr("type",data.followType)
                        stepStation(data.followType)
                        $("#stationblockchooseWrap > div").each(function (i,obj) {
                            $(this).removeClass("active")
                            if($(this).attr("type")==data.followType){
                                $(this).addClass("active")
                            }else if(data.followType=="004"&&$(this).attr("type")=="003"){
                                $(this).addClass("active")
                            }
                        })
                        if(data.followType=="003"||data.followType=="004"){
                            $("#appcustomerinfoAdd_ws .yxgj-wrap").addClass("active")
                            $("#appcustomerinfoAdd_ws .yxgj-wrap .yxgj-item").each(function (i,obj) {
                                $(this).removeClass("active")
                                if($(this).attr("type")==data.followType){
                                    $(this).addClass("active")
                                }
                            })
                        }
                    }else{
                        App.alert({
                            container: jqueryMap.$workorderForm.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: result.message,
                            icon: 'fa fa-warning'
                        });
                    }

                }
            })
        }
    }
    //check基本信息
    var check = function (){
        if($('input[name="yhxm"]',jqueryMap.$workorderForm).val()==""||$('input[name="yhxm"]',jqueryMap.$workorderForm).val()==null){
            App.alert({
                container : jqueryMap.$workorderForm.closest(".modal-body"),
                place : 'prepend',
                type : 'danger',
                message :"请填写用户姓名！",
                icon : 'fa fa-warning'
            });
            return false;
        } else if ($('input[name="sjhm"]',jqueryMap.$workorderForm).val()==""||$('input[name="sjhm"]',jqueryMap.$workorderForm).val()==null) {
            App.alert({
                container : jqueryMap.$workorderForm.closest(".modal-body"),
                place : 'prepend',
                type : 'danger',
                message :"请填写手机号码！",
                icon : 'fa fa-warning'
            });
            return false;
        } else if(!whetherOrNotMobil($('input[name="sjhm"]',jqueryMap.$workorderForm).val())){
            App.alert({
                container : jqueryMap.$workorderForm.closest(".modal-body"),
                place : 'prepend',
                type : 'danger',
                message :"请填写正确的手机号码！",
                icon : 'fa fa-warning'
            });
            return false;
        }
        else if(($('input[name="nsrsbh"]',jqueryMap.$workorderForm).val()!="")&&!whetherOrNotNsrbh($('input[name="nsrsbh"]',jqueryMap.$workorderForm).val())){
            App.alert({
                container : jqueryMap.$workorderForm.closest(".modal-body"),
                place : 'prepend',
                type : 'danger',
                message :"请填写正确的纳税人识别号！",
                icon : 'fa fa-warning'
            });
            return false;
        }else if(($('input[name="bjje"]',jqueryMap.$workorderForm).val()!="")&&!whetherOrNotMoney($('input[name="bjje"]',jqueryMap.$workorderForm).val())){
            App.alert({
                container : jqueryMap.$workorderForm.closest(".modal-body"),
                place : 'prepend',
                type : 'danger',
                message :"请填写正确的报价金额!",
                icon : 'fa fa-warning'
            });
            return false;
        }else if($('textarea[name="bzxx"]',jqueryMap.$workorderForm).val()!=""&&$('textarea[name="bzxx"]',jqueryMap.$workorderForm).val().length>300){
            App.alert({
                container : jqueryMap.$workorderForm.closest(".modal-body"),
                place : 'prepend',
                type : 'danger',
                message :"备注信息字数不能超过300字限制！",
                icon : 'fa fa-warning'
            });
            return false;
        } else {
            return true;
        }
    };
    // 判断输入字符串是否为空或者全部都是空格
    function opportunityRecordtextareaIsNull( str ){
        if ( str == "" ) return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
    }
    //check商机跟进
    var checkopportunity = function (){
        if(opportunityRecordtextareaIsNull($("#opportunityRecordtextarea").val()) && $(".addopportunityRecordtextarea").find(".chat-item-files").length==0){
            App.alert({
                container : jqueryMap.$workorderForm.closest(".modal-body"),
                place : 'prepend',
                type : 'danger',
                message :"请填写正确跟进信息！",
                closeInSeconds: 2,
                icon : 'fa fa-warning'
            });
            return false;
        }else if($("#opportunityRecordtextarea").val().length>300){
            App.alert({
                container : jqueryMap.$workorderForm.closest(".modal-body"),
                place : 'prepend',
                type : 'danger',
                message :"跟进信息字数不能超过300字限制！",
                closeInSeconds: 2,
                icon : 'fa fa-warning'
            });
            return false;
        }else {
            return true;
        }
    };
    //获取基本信息
    var getBuinesee=function () {
        $.ajax({
            url:configMap.path+'/appcustomerinfo/getBuinessContent/'+configMap.id,
            type:'GET',
            success:function (data) {
                $("#stationblockchooseWrap").attr("type",data.sjzt)
                //步骤跳转控制
                stepStation(data.sjzt)
                $("#stationblockchooseWrap > div").each(function (i,obj) {
                    $(this).removeClass("active")
                    if($(this).attr("type")==data.sjzt){
                        $(this).addClass("active")
                    }else if(data.sjzt=="004"&&$(this).attr("type")=="003"){
                        $(this).addClass("active")
                    }
                })
                if(data.sjzt=="003"||data.sjzt=="004"){
                    $("#appcustomerinfoAdd_ws .yxgj-wrap").addClass("active")
                    $("#appcustomerinfoAdd_ws .yxgj-wrap .yxgj-item").each(function (i,obj) {
                        $(this).removeClass("active")
                        if($(this).attr("type")==data.sjzt){
                            $(this).addClass("active")
                        }
                    })
                }
                configMap.sjhm=data.dlzh;
                jqueryMap.$workorderForm.find('input[name="yhxm"]').val(data.yhmc);
                /*  jqueryMap.$workorderForm.find('input[name="yhxm"]').attr("readonly",true);*/

                jqueryMap.$workorderForm.find('input[name="sjhm"]').val(data.dlzh);
                /*  jqueryMap.$workorderForm.find('input[name="sjhm"]').attr("readonly",true);*/

                jqueryMap.$workorderForm.find('input[name="nsrsbh"]').val(data.nsrsbh);
                jqueryMap.$workorderForm.find('input[name="gsmc"]').val(data.gsmc);
                jqueryMap.$workorderForm.find('textarea[name="bzxx"]').val(data.bzxx);
                jqueryMap.$workorderForm.find('input[name="tjrmc"]').val(data.tjrdm);
                jqueryMap.$workorderForm.find('input[name="tjrdm"]').val(data.tjrdmm);

                jqueryMap.$workorderForm.find('input[name="khjlmc"]').val(data.khjlmc);
                jqueryMap.$workorderForm.find('input[name="khjldm"]').val(data.khjldm);

                jqueryMap.$workorderForm.find('input[name="wbtjrmc"]').val(data.wbtjrmc);
                $('#sjhmCopy',jqueryMap.$workorderForm).val(data.dlzh);
                $('input[name="bjje"]',jqueryMap.$workorderForm).val(data.bjje);
                //备注信息字数
                surplusHowMany($("#businessBasicinfoRecordtextarea"),$("#businessBasicinfoRecordtextareaWords"),300);
                var zt = data.sjzt;
                var ztt = '003,004'

                if(!(ztt.search(zt)==-1)){
                    jqueryMap.$workorderForm.find('select[name="sjzt"]').val(zt);
                }
                if(data){
                    $.ajax({
                        url:configMap.path+'/intentionCustomer/findByYxId/'+configMap.yxid,
                        type:'GET',
                        success:function (result) {
                            var zydm_zymc="";
                            var datasa="";
                            if(result){
                                for(var i=0;i<result.length;i++){
                                    datasa+=result[i].employeeName+",";
                                    zydm_zymc+=result[i].employeeCode+"-"+result[i].employeeName+",";
                                }
                                $('#gxkh',jqueryMap.$workorderForm).html(datasa.substring(0,datasa.length-1))
                                $('#gxkh',jqueryMap.$workorderForm).attr('zxry_dm',zydm_zymc.substring(0,zydm_zymc.length-1));
                            }

                        }
                    })
                }
            }
        })
    }
    //展示信息append data->展示数据 ztbm->该条信息状态
    var showOpportunity=function (data,ztbm) {
        $('.businessBasic-item-chat').html("");
        var chatItem =""
        $(data).each(function (i,obj) {
            chatItem = '<div class="businessBasic-chat-item" intentionCustomerId="'+this.followUpContentInfo.intentionCustomerId+'" followType="'+this.followUpContentInfo.followType+'" khid="'+this.followUpContentInfo.id+'">'+
                '<i class="businessBasic-chat-img">'+
                '<img src="'+this.followUpContentInfo.inputPeoplePhoto+'" >'+
                '</i>'+
                '<div class="businessBasic-chat-div">'+
                '<p>'+
                '<span>'+this.followUpContentInfo.inputPeopleName+'</span>'+
                '<span>'+getdate(this.followUpContentInfo.inputTime)+'</span>'+
                '<a class="deleteFollowUp businessBasi-chat-btn" href="javascript:;">删除</a>'+
                '<a class="editFollowUp businessBasi-chat-btn" href="javascript:;">编辑</a>'+
                '</p>'+
                '<section class="businessBasic-chat-result">'+
                '<b></b>'+
                '<p class="chat-item-followtime" style="margin-bottom: 10px"><span style="color: #666;margin-right: 0;">沟通时间:</span>'+getdate(this.followUpContentInfo.followTime) +'</p>'+
                '<p class="chat-item-content" style="min-height: 16px;">'+this.followUpContentInfo.followUpContent +'</p>'+
                '</section>'+
                '</div>'+
                '</div>'
            $('.businessBasic-item-chat').append(chatItem);

            if(ztbm=="004"||ztbm=="005"){
                $(".businessBasi-chat-btn").remove()
            }
            if(this.followUpFiles!=[]){
                addChatFiles(this.followUpFiles,1)
            }
            if(i+1==data.length){
                $('.editFollowUp').off('click').on('click',function () {//编辑内容
                    if(configMap.ifEdit==0){
                        configMap.ifEdit="1";
                        $("#closeEditopportunity").css("display","inline")
                        //这个地方是判断对跟进信息的修改还是新增
                        $("#opportunityRecordtextarea").val($(this).parents(".businessBasic-chat-item").find(".chat-item-content").text());//字过来
                        $(this).parents(".businessBasic-chat-item").find(".chat-item-files").each(function () {
                            var fileWrap ='<p class="chat-item-files"></p>'
                            var closeBtn = '<b class="chat-item-editfilesclose">x</b>'
                            $(".addopportunityRecordtextarea").append(fileWrap)
                            var fileStr = $(this).html()
                            $(".addopportunityRecordtextarea .chat-item-files:last").append(fileStr)
                            $(".addopportunityRecordtextarea .chat-item-files:last").append(closeBtn)
                            $(".addopportunityRecordtextarea .chat-item-files:last").attr("followupid",$(this).parents(".businessBasic-chat-item").find(".chat-item-files").attr("followupid"))
                            // $(".addopportunityRecordtextarea .chat-item-files:last").attr("imgid",$(this).parents(".businessBasic-chat-item").find(".chat-item-files").attr("imgid"))
                            $(".addopportunityRecordtextarea .chat-item-files .chat-item-editfilesclose").click(function () {
                                var closeThis = this
                                //编辑删除文件
                                $.ajax({
                                    url:configMap.path+'/intentionCustomer/deleteFile/'+$(this).parents(".chat-item-files").attr("followupid")+'/'+$("#stationblockchooseWrap").attr("type")+"/"+$(this).parents(".chat-item-files").find(".imgId").attr("imgid"),
                                    type:'GET',
                                    success:function (result) {
                                        if(result.success){
                                            if(configMap.yxidflag){
                                                getOpportunity($('#intentionCode').val())
                                            }else{
                                                getOpportunity()
                                            }
                                            if(result.flag){
                                                configMap.ifEdit="";//退出编辑状态
                                                $("#closeEditopportunity").css("display","none")
                                                $("#opportunityRecordtextarea").val("");
                                                $("#opportunityRecordtextareaWords").text("300")
                                                $("#opportunityRecordtextarea").attr("intentionCustomerId","");
                                                $("#opportunityRecordtextarea").attr("followType","");
                                                $("#opportunityRecordtextarea").attr("khid","");
                                                $(".addopportunityRecordtextarea .chat-item-files").remove()
                                            }
                                            // getOpportunity();
                                            App.alert({
                                                container: jqueryMap.$workorderForm.closest(".modal-body"),
                                                place: 'prepend',
                                                type: 'success',
                                                message: "附件删除成功，请继续添加商机跟进。",
                                                closeInSeconds:2,
                                                icon: 'fa fa-warning'
                                            });
                                            $(closeThis).parents(".chat-item-files").remove()
                                        }else{
                                            App.alert({
                                                container: jqueryMap.$workorderForm.closest(".modal-body"),
                                                place: 'prepend',
                                                type: 'danger',
                                                message: result.message,
                                                icon: 'fa fa-warning'
                                            });
                                        }

                                        // console.log("删除成功")
                                    }
                                })
                            })
                        })
                        // $(".addopportunityRecordtextarea").attr("FilesUrl",$(this).parents(".businessBasic-chat-item").find(".businessBasic-chat-result").attr("FilesUrl"))
                        $("#opportunityRecordtextareaWords").text($("#opportunityRecordtextareaWords").text()- $("#opportunityRecordtextarea").val().length)
                        $("#opportunityRecordtextarea").attr("intentionCustomerId",$(this).parents(".businessBasic-chat-item").attr("intentionCustomerId"));
                        $("#opportunityRecordtextarea").attr("followType",$(this).parents(".businessBasic-chat-item").attr("followType"));
                        $("#opportunityRecordtextarea").attr("khid",$(this).parents(".businessBasic-chat-item").attr("khid"));
                    }
                });
                var deleteFollowUp= $(".deleteFollowUp")
                deleteFollowUp.confirmation({
                    "title": '是否确定要删除跟进信息？',
                    "btnOkLabel": '是',
                    "btnCancelLabel": '否',
                    "placement": 'left',
                    "onConfirm": del,
                    "btnOkClass": 'btn btn-danger borderRadius4',
                    "btnCancelClass": "btn btn-default borderRadius4"
                });
            }//append methond
        })
    }
    //时间戳转时间
    var getdate = function(now) {
        var now = new Date(now*1),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }
    var del = function (event,element){//删除商机跟进信息
        var delThis = element
        $.ajax({
            url:configMap.path+'/intentionCustomer/deleteFollowUpInfo/'+$(delThis).parents(".businessBasic-chat-item").attr("intentionCustomerId")+"/"+$("#stationblockchooseWrap").attr("type")+"/"+$(delThis).parents(".businessBasic-chat-item").attr("khid"),
            type:'GET',
            success:function (result) {
                if(result.success){
                    $(delThis).parents(".businessBasic-chat-item").remove()
                    if(configMap.ifEdit=="1"){
                        if($("#opportunityRecordtextarea").attr("khid")==result.id){//退出编辑状态
                            configMap.ifEdit="";
                            $("#closeEditopportunity").css("display","none")
                            $("#opportunityRecordtextarea").val("");
                            $("#opportunityRecordtextareaWords").text("300")
                            $("#opportunityRecordtextarea").attr("intentionCustomerId","");
                            $("#opportunityRecordtextarea").attr("followType","");
                            $("#opportunityRecordtextarea").attr("khid","");
                            $(".addopportunityRecordtextarea .chat-item-files").remove()
                        }
                    }
                    App.alert({
                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'success',
                        message: "删除成功,请继续添加商机跟进。",
                        closeInSeconds: 2,
                        icon: 'fa fa-warning'
                    });
                }else{
                    App.alert({
                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: result.message,
                        closeInSeconds: 2,
                        icon: 'fa fa-warning'
                    });
                    // callback(false);
                }
            }
        })//ajax
    }
    //获取商机跟进信息
    var getOpportunity=function (yxidFlag) {
        if(yxidFlag){
            var yxidURL = configMap.path+'/intentionCustomer/findAllFollowInfo/'+configMap.dljgBm+"/"+yxidFlag
        }else{
            var yxidURL = configMap.path+'/intentionCustomer/findAllFollowInfo/'+configMap.dljgBm+"/"+configMap.yxid
        }
        $.ajax({
            url:yxidURL,
            type:'GET',
            success:function (data) {
                if(data!=""){
                    $(".businessBasic-item-chat").css("background","none")
                    showOpportunity(data.followUpInfo,data.followType)
                }
                // console.info(data);
            }
        })
    }
    //取消编辑
    $("#closeEditopportunity").click(function () {
        configMap.ifEdit="";
        $(this).css("display","none")
        //这个地方是判断对跟进信息的修改还是新增
        $("#opportunityRecordtextarea").val("");
        $("#opportunityRecordtextareaWords").text("300")
        $("#opportunityRecordtextarea").attr("intentionCustomerId","");
        $("#opportunityRecordtextarea").attr("followType","");
        $("#opportunityRecordtextarea").attr("khid","");
        $(".addopportunityRecordtextarea .chat-item-files").remove()
    })
    var savebusiness = function (callback){
        var data = {
            khjlmc: jqueryMap.$workorderForm.find('input[name="khjlmc"]').val(),
            khjldm: jqueryMap.$workorderForm.find('input[name="khjldm"]').val(),
            yhxm: jqueryMap.$workorderForm.find('input[name="yhxm"]').val(),
            sjhm: jqueryMap.$workorderForm.find('input[name="sjhm"]').val(),
            nsrsbh: jqueryMap.$workorderForm.find('input[name="nsrsbh"]').val(),
            gsmc: jqueryMap.$workorderForm.find('input[name="gsmc"]').val(),
            bzxx: jqueryMap.$workorderForm.find('textarea[name="bzxx"]').val(),
            tjrdm:jqueryMap.$workorderForm.find('input[name="tjrdm"]').val(),
            wbtjrmc:jqueryMap.$workorderForm.find('input[name="wbtjrmc"]').val(),
            sjzt:jqueryMap.$workorderForm.find('select[name="sjzt"]').val(),
            zydm:configMap.datas,
            dljgBm:$('#dljgBm',jqueryMap.$workorderForm).val(),
            bjje:$('input[name="bjje"]',jqueryMap.$workorderForm).val(),
            qdlx:"003"
        }
        // console.log(data);
        var blockTarget = jqueryMap.$workorderForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var ifReapt="/appcustomerinfo/addIfRepeat/"
        if(configMap.id||$('#intentionId').val()!=""){
            ifReapt="/appcustomerinfo/updateIfRepeat/"
            $.ajax({
                url:configMap.path+ifReapt+$('input[name="sjhm"]',jqueryMap.$workorderForm).val()+'/'+$('#sjhmCopy',jqueryMap.$workorderForm).val()+'/'+configMap.dljgBm,
                type:'GET',
                success:function (result) {
                    App.unblockUI(blockTarget);
                    if(result.success){
                        var intentionCode = ""//意向id
                        if(configMap.yxid){
                            intentionCode=configMap.yxid
                        }else{
                            intentionCode=$('#intentionCode').val()
                        }
                        var intentionId = ""//id
                        if(configMap.id){
                            intentionId=configMap.id
                        }else{
                            intentionId=$('#intentionId').val()
                        }
                        $.ajax({
                            url:configMap.path+'/appcustomerinfo/updateCustomerInfo/'+intentionId+'/'+intentionCode,
                            type:'POST',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'JSON',
                            data: JSON.stringify(data),
                            success:function (result) {
                                App.unblockUI(blockTarget);
                                if(result.success){
                                    App.alert({
                                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                                        place: 'prepend',
                                        type: 'success',
                                        message: "基本信息编辑成功。",
                                        closeInSeconds: 2,
                                        icon: 'fa fa-warning'
                                    });
                                    $.get('/customermanage/SystemMessageController/getAllMessageReminder', null, function(result) {
//            	console.info(result);
                                        if(result > 0) {
                                            $('#announcementInfoWarningTX').removeClass('circleDisplay');
                                            $('#announcementInfoWarningTX').html(result);
                                            $('.top-message-m').addClass('bellSwingMessage');
                                        } else {
                                            $('#announcementInfoWarningTX').css({display:'none'});
                                            $('.top-message-m').removeClass('bellSwingMessage');
                                        }
                                    });
                                    callback(true);
                                } else {
                                    App.alert({
                                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                                        place: 'prepend',
                                        type: 'danger',
                                        message: result.message,
                                        closeInSeconds: 2,
                                        icon: 'fa fa-warning'
                                    });
                                    callback(false);
                                }
                            }
                        })
                    }else{
                        App.alert({
                            container : jqueryMap.$workorderForm.closest(".modal-body"),
                            place : 'prepend',
                            type : 'danger',
                            message :result.message,
                            closeInSeconds: 2,
                            icon : 'fa fa-warning'
                        });
                        callback(false);
                    }
                }
            })

        }else{
            $.ajax({
                url:configMap.path+ifReapt+$('input[name="sjhm"]',jqueryMap.$workorderForm).val()+'/'+configMap.dljgBm,
                type:'GET',
                success:function (resultData) {
                    App.unblockUI(blockTarget);
                    if(resultData.success){
                        $.ajax({
                            url: configMap.path + configMap.dataUrl,
                            type: 'POST',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'JSON',
                            data: JSON.stringify(data),
                            success: function (result) {
                                $('#sjhmCopy').val(result.phoneNum);
                                //添加意向id
                                $('#intentionCode').val(result.intentionCode);
                                $('#intentionId').val(result.id);
                                configMap.yxidflag = true;
                                //主动切换商机
                                $(".businessBasic .businessBasic-content-opportunity").addClass("active")
                                $(".businessBasic .businessBasic-content-opportunity").prev().removeClass("active")
                                $(".businessBasic-content .businessBasic-content-opportunity").addClass("active")
                                $(".businessBasic-content .businessBasic-content-opportunity").next().removeClass("active")
                                if($(".modal-footer > .form-title").text()!=""){
                                    $(".modal-footer > span").remove()
                                }
                                App.alert({
                                    container: jqueryMap.$workorderForm.closest(".modal-body"),
                                    place: 'prepend',
                                    type: 'success',
                                    message: "基本信息保存成功，请继续添加商机跟进。",
                                    closeInSeconds:2,
                                    icon: 'fa fa-warning'
                                });
                                stepStation("000")
                                App.unblockUI(blockTarget);
                                if(result.success){
                                    $.get('/customermanage/SystemMessageController/getAllMessageReminder', null, function(result) {
//            	console.info(result);
                                        if(result > 0) {
                                            $('#announcementInfoWarningTX').removeClass('circleDisplay');
                                            $('#announcementInfoWarningTX').html(result);
                                            $('.top-message-m').addClass('bellSwingMessage');
                                        } else {
                                            $('#announcementInfoWarningTX').css({display:'none'});
                                            $('.top-message-m').removeClass('bellSwingMessage');
                                        }
                                    });
                                    callback(true);
                                } else {
                                    App.alert({
                                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                                        place: 'prepend',
                                        type: 'danger',
                                        message: result.message,
                                        closeInSeconds: 2,
                                        icon: 'fa fa-warning'
                                    });
                                    callback(false);
                                }
                            },
                            error: function () {
                                App.unblockUI(blockTarget);
                                App.alert({
                                    container: jqueryMap.$workorderForm.closest(".modal-body"),
                                    place: 'prepend',
                                    type: 'danger',
                                    message: '保存失败！',
                                    closeInSeconds: 2,
                                    icon: 'fa fa-warning'
                                });
                                callback(false);
                            }
                        });
                    }else{
                        App.alert({
                            container: jqueryMap.$workorderForm.closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: resultData.message,
                            closeInSeconds: 2,
                            icon: 'fa fa-warning'
                        });
                        callback(false);
                    }
                }
            })

        }
    }
    //商机跟进
    var saveopportunity = function (callback){
        if(checkopportunity()){
            var FilesUrl =$(".addopportunityRecordtextarea").attr("FilesUrl");
            if(FilesUrl!=""){
                var fileUrl = FilesUrl.split(",");// 在每个逗号(,)处进行分解。
            }else{
                var fileUrl = ""
            }
            var data = {
                dljgBm :configMap.dljgBm,
                yxid   :configMap.yxid,
                lrrq:  $("#opportunityTime",jqueryMap.$container).val()+":00",
                content:$("#opportunityRecordtextarea").val(),
                inputPeopleCode:configMap.currentZydm,
                inputPeopleName :$('#currentName').val(),
                followType:$("#stationblockchooseWrap").attr("type"),//跟进状态在当前页面选择的是哪一个就是哪一个'000'
                fileUrl :fileUrl
            }
            var blockTarget = jqueryMap.$workorderForm.closest(".modal-content");
            if(configMap.ifEdit!=""){//编辑&&$('#intentionCode').val()===""
                App.blockUI({
                    target: blockTarget,
                    boxed: true,
                    message: '正在保存数据...'
                });
                $.ajax({
                    url:configMap.path+"/intentionCustomer/updateFollowUpInfo/"+$("#opportunityRecordtextarea").attr("intentionCustomerId")+"/"+$("#stationblockchooseWrap").attr("type")+"/"+$("#opportunityRecordtextarea").attr("khid"),
                    type:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'JSON',
                    data: JSON.stringify(data),
                    success:function (result) {
                        App.unblockUI(blockTarget);
                        if(result.success){
                            //编辑成功清空
                            configMap.ifEdit=""
                            $("#closeEditopportunity").css("display","none")
                            $("#opportunityRecordtextarea").val("");
                            $("#opportunityRecordtextareaWords").text("300")
                            $("#opportunityRecordtextarea").attr("intentionCustomerId","");
                            $("#opportunityRecordtextarea").attr("followType","");
                            $("#opportunityRecordtextarea").attr("khid","");
                            $(".addopportunityRecordtextarea .chat-item-files").remove()
                            $(".addopportunityRecordtextarea").attr("filesurl","")//文件传值清空
                            if(configMap.yxidflag){
                                getOpportunity($('#intentionCode').val())
                            }else{
                                getOpportunity()
                            }
                            App.alert({
                                container: jqueryMap.$workorderForm.closest(".modal-body"),
                                place: 'prepend',
                                type: 'success',
                                message: "编辑成功请继续跟进",
                                closeInSeconds:2,
                                icon: 'fa fa-warning'
                            });
                            callback(true);
                        } else {
                            App.alert({
                                container: jqueryMap.$workorderForm.closest(".modal-body"),
                                place: 'prepend',
                                type: 'danger',
                                message: result.message,
                                closeInSeconds:2,
                                icon: 'fa fa-warning'
                            });
                            callback(false);
                        }
                    }
                })
                //
            }else{//新增
                if(configMap.yxid==""&&$('#intentionCode').val()===""){
                    App.alert({
                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: '请先完善基础信息',
                        closeInSeconds: 2,
                        icon: 'fa fa-warning'
                    });
                }else{
                    // data.yxid=$('#intentionCode').val();
                    if(configMap.yxidflag){
                        data.yxid=$('#intentionCode').val();
                    }
                    App.blockUI({
                        target: blockTarget,
                        boxed: true,
                        message: '正在保存数据...'
                    });
                    $.ajax({
                        url: configMap.path+'/intentionCustomer/addFollowUpInfo' ,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'JSON',
                        data: JSON.stringify(data),
                        success: function (result) {
                            App.unblockUI(blockTarget);
                            if(result.success){
                                //保存成功清空
                                $("#opportunityRecordtextarea").val("")//输入框内容清空
                                $(".addopportunityRecordtextarea .chat-item-files").remove()//文件清空
                                $(".addopportunityRecordtextarea").attr("filesurl","")//文件传值清空
                                $("#opportunityRecordtextareaWords").text(300)
                                if(configMap.yxidflag){
                                    getOpportunity($('#intentionCode').val())
                                }else{
                                    getOpportunity()
                                }
                                App.alert({
                                    container: jqueryMap.$workorderForm.closest(".modal-body"),
                                    place: 'prepend',
                                    type: 'success',
                                    message: "保存成功，请继续跟进！",
                                    closeInSeconds:2,
                                    icon: 'fa fa-warning'
                                });
                                callback(true);
                            } else {
                                App.alert({
                                    container: jqueryMap.$workorderForm.closest(".modal-body"),
                                    place: 'prepend',
                                    type: 'danger',
                                    message: result.message,
                                    closeInSeconds: 2,
                                    icon: 'fa fa-warning'
                                });
                                callback(false);
                            }
                        },
                        error: function () {
                            App.unblockUI(blockTarget);
                            App.alert({
                                container: jqueryMap.$workorderForm.closest(".modal-body"),
                                place: 'prepend',
                                type: 'danger',
                                message: '保存失败！',
                                closeInSeconds: 2,
                                icon: 'fa fa-warning'
                            });
                            callback(false);
                        }
                    });
                }
            }
        }

    }
    //商机跟进添加文件 单文件或多个文件
    function addChatFiles(data,addposition) {
        if(data.length){//多文件
            $(data).each(function (i,obj) {
                addChatFilesProcess(obj,addposition);
            })
        }else if(data.length==0){
            return false;
        }else{//单条文件信息
            addChatFilesProcess(data,addposition);
        }
    }
    //单条文件录入过程
    function addChatFilesProcess(data,addposition) {//addposition->0添加新文件  addposition->1沟通记录内添加文件
        var FilesStr = "";
        var closeBtn = "";
        var FilesUrl=data.fileUrl+"……"+data.fileName;
        var ifImg = GetFileExt(data.fileName);
        if(ifImg==".png"||ifImg==".jpg"){
            FilesStr+='<p class="chat-item-files" FilesUrlItem="'+data.fileUrl+'……'+data.fileName+'"><a class="imgId" href="'+data.fileUrl+'" target="_blank" imgid="'+data.id+'"><img src="'+data.fileUrl+'" alt="'+data.fileName+'" ></a><span>'+data.fileName+'</span></p>'
        }else{
            FilesStr+='<p class="chat-item-files" FilesUrlItem="'+data.fileUrl+'……'+data.fileName+'"><a class="imgId" href="'+data.fileUrl+'" target="_blank" imgid="'+data.id+'"><i class="iconfont icon-genjinguanli" style="font-size: 22px;"></i></a><span>'+data.fileName+'</span></p>'
        }
        if(addposition == 0){
            $(".addopportunityRecordtextarea").append(FilesStr);
            var oldFileUrl = $(".addopportunityRecordtextarea").attr("FilesUrl");
            if(oldFileUrl!=""){
                var usefulFileUrl=oldFileUrl+","+FilesUrl
            }else{
                var usefulFileUrl=FilesUrl
            }
            $(".addopportunityRecordtextarea").attr("FilesUrl",usefulFileUrl);
            closeBtn+='<b class="chat-item-filesclose">x</b>'
            $(".addopportunityRecordtextarea .chat-item-files").append(closeBtn)
            $(".addopportunityRecordtextarea .chat-item-files .chat-item-filesclose").click(function () {
                $(".addopportunityRecordtextarea").attr("FilesUrl",delFilesUrl($(this).parents(".chat-item-files").attr("FilesUrlItem"),$(this).parents(".chat-item-files")))
                $(this).parents(".chat-item-files").remove()
            })
        }else if(addposition == 1){
            $(".businessBasic-item-chat .businessBasic-chat-item:last").find(".businessBasic-chat-result").append(FilesStr)
            $(".businessBasic-item-chat .businessBasic-chat-item:last").find(".chat-item-files").attr("followUpid",data.followUpId)
            // $(".businessBasic-item-chat .businessBasic-chat-item:last").find(".chat-item-files").attr("imgid",data.id)
            $(".businessBasic-item-chat .businessBasic-chat-item:last").find(".businessBasic-chat-result").attr("FilesUrl",FilesUrl);
        }
    }
    //字符转转数组删除某元素再转回去
    function delFilesUrl(data,Dom) {
        // console.log(data)
        var FilesUrl =$(Dom).parents(".addopportunityRecordtextarea").attr("FilesUrl");
        var fileUrl = FilesUrl.split(",")
        for(var i=0; i<fileUrl.length; i++) {
            if(fileUrl[i] == data) {
                fileUrl.splice(i, 1);
                break;
            }
        }
        return fileUrl.join(",")
    }
    //取文件后缀名
    function GetFileExt(filepath) {
        if (filepath != "") {
            var pos = "." + filepath.replace(/.+\./, "");
            return pos;
        }
    }
    //商机意向切换
    $(".businessBasic .businessBasic-content-opportunity").click(function () {
        //openmode  左下角提示信息
        if($(".modal-footer > .form-title").text()!=""){
            $(".modal-footer > span").remove()
        }
        $(this).addClass("active")
        $(this).prev().removeClass("active")
        $(".businessBasic-content .businessBasic-content-opportunity").addClass("active")
        $(".businessBasic-content .businessBasic-content-opportunity").next().removeClass("active")
    })
    //openmode  左下角提示信息
    $(".modal-footer").append("<span class='form-title' style='float:left;color:#ff4343;font-size: 12px;'>备注：纳税人识别号为空时，签约后系统将为您生成一个临时税号。</span>")
    //商机意向切换
    $(".businessBasic .businessBasic-content-info").click(function () {
        //openmode  左下角提示信息
        if($(".modal-footer > .form-title").text()!=""){

        }else{
            $(".modal-footer").append("<span class='form-title' style='float:left;color:#ff4343;font-size: 12px;'>备注：纳税人识别号为空时，签约后系统将为您生成一个临时税号。</span>")
        }
        $(this).addClass("active")
        $(this).next().removeClass("active")
        $(".businessBasic-content .businessBasic-content-info").addClass("active")
        $(".businessBasic-content .businessBasic-content-info").prev().removeClass("active")
    })
    return {
        init: function (id,yxid,dljgBm,currentZydm) {
            // firstRender(dljgBm)
            configMap.id=id;
            configMap.yxid=yxid;
            configMap.dljgBm=dljgBm;
            configMap.currentZydm=currentZydm;
            setJqueryMap();
            var date = new Date();
            var date1 = moment(date.getTime()).format('YYYY-MM-DD HH:mm');
            $("#opportunityTime",jqueryMap.$container).val(date1);
            $("#opportunityTime",jqueryMap.$container).datetimepicker({
                dateformat: 'yyyy-mm-dd',
                timeFormat: 'HH24:mm:ss',//格式化时间
                language: 'zh-CN',
                weekStart: 1,
                autoclose: true,
                todayHighlight: false,
                startView: 2,
                minView: 0,  //Number, String. 默认值：0, 'hour'，日期时间选择器所能够提供的最精确的时间选择视图。
                minuteStep:1,
                pickerPosition: "top-left",
                clearBtn:false,//清除按钮
            });
            //日期btn
            $('#opportunityTimeBtn',jqueryMap.$container).click(function(){
                $("#opportunityTime",jqueryMap.$container).trigger('focus');
            }) ;
            //    上传附件的按钮
            $('#opportunityAddFilesBtn',jqueryMap.$container).click(function(){
                // openModal('上传文件','/customermanage/mybusiness/addFiles.jsp?dljgBm='+encodeURI(configMap.dljgBm))
                var dialogButtons = {};
                dialogButtons.success = {
                    label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                    className: "btn btn-default btnBlue borderRadius4 colorfff",
                    callback: function() {
                        var file=$('#opportunityFlagFile').get(0).files[0];
                        
                        if(file){
                            if(!file.name.endsWith("doc")&&!file.name.endsWith("pdf")&&!file.name.endsWith("jpg")&&!file.name.endsWith("png")&&!file.name.endsWith("gif")&&!file.name.endsWith("xls")&&!file.name.endsWith("zip")&&!file.name.endsWith("docx")&&!file.name.endsWith("xlsx")){
                                Messenger().post({
                                    message : "请上传doc/pdf/jpg/png/gif/xls/zip/docx/xlsx格式的文件",
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
                        var url = configMap.path+'/intentionCustomer/uploadFile/'+configMap.dljgBm;
                        var inputform = {
                            url: url,
                            type: "POST",
                            dataType: 'json',
                            headers: {"ClientCallMode": "ajax"}, //添加请求头部
                            success: function (data) {

                                /* App.unblockUI(blockTarget);*/
                                if (data.success) {
                                    // console.log("成功")
                                    addChatFiles(data,0)
                                } else {
                                    /* Messenger().post({
                                     message: data.message,
                                     type: 'error'
                                     });*/
                                    // alert("失败")
                                }
                            },
                        };
                        $("#opportunityFlagFileForm").ajaxSubmit(inputform);
                    }
                };
                dialogButtons.cancel = {
                    label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
                    className: 'btn btn-default borderRadius4 color666'
                };
                $.get("/customermanage/mybusiness/addFiles.jsp", function(html) {
                    jqueryMap.$setlogo = bootbox.dialog({
                        title: '选择文件',
                        message: html,
                        buttons: dialogButtons
                    });
                });
            })
            //获取商机跟进信息和基础信息
            if(id){
                getBuinesee();
                getOpportunity();
            }
            $('input[name="sjhm"]',jqueryMap.$workorderForm).blur(function () {
                if($('input[name="sjhm"]',jqueryMap.$workorderForm).val()==''||$('input[name="sjhm"]',jqueryMap.$workorderForm).val()==null){
                    App.alert({
                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: "手机号不得为空！",
                        closeInSeconds: 2,
                        icon: 'fa fa-warning'
                    })
                }else{
                    if(configMap.id||$('#intentionId').val()!=""){
                        $.ajax({
                            url:configMap.path+"/appcustomerinfo/updateIfRepeat/"+$('input[name="sjhm"]',jqueryMap.$workorderForm).val()+'/'+$('#sjhmCopy',jqueryMap.$workorderForm).val()+'/'+configMap.dljgBm,
                            type:'GET',
                            success:function (result) {
                                if(result.success){

                                }else{
                                    App.alert({
                                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                                        place: 'prepend',
                                        type: 'danger',
                                        message: result.message,
                                        closeInSeconds: 2,
                                        icon: 'fa fa-warning'
                                    })
                                }
                            }
                        })
                    }else{
                        $.ajax({
                            url:configMap.path+"/appcustomerinfo/addIfRepeat/"+$('input[name="sjhm"]',jqueryMap.$workorderForm).val()+'/'+configMap.dljgBm,
                            type:'GET',
                            success:function (result) {
                                if(result.success){
                                }else{
                                    App.alert({
                                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                                        place: 'prepend',
                                        type: 'danger',
                                        message: result.message,
                                        closeInSeconds: 2,
                                        icon: 'fa fa-warning'
                                    })
                                }
                            }
                        })
                    }
                }
            })
            $('input[name="yhxm"]',jqueryMap.$workorderForm).blur(function () {
                if($('input[name="yhxm"]',jqueryMap.$workorderForm).val()==''||$('input[name="yhxm"]',jqueryMap.$workorderForm).val()==null){
                    App.alert({
                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: "用户姓名不得为空！",
                        closeInSeconds: 2,
                        icon: 'fa fa-warning'
                    })
                }
            })
            $('input[name="sjhm"]',jqueryMap.$workorderForm).focus(function () {
                $('.custom-alerts').hide();
            })
            $('input[name="yhxm"]',jqueryMap.$workorderForm).focus(function () {
                $('.custom-alerts').hide();
            })
        },
        setPath: function (path) {
            configMap.path = path;
        },
        savebusiness: function (callback){
            if(check()){
                if(configMap.id||$('#intentionId').val()!=""){
                    if($('[name="sjhm"]').val()==configMap.sjhm){
                        savebusiness(callback);
                    }else{
                        $.ajax({
                            url: configMap.path + configMap.checkjshmUrl + "/" + $('input[name="sjhm"]',jqueryMap.$workorderForm).val(),
                            type: 'GET',
                            success: function (result) {
                                if(result.success){
                                    savebusiness(callback);
                                } else {
                                    App.alert({
                                        container: jqueryMap.$workorderForm.closest(".modal-body"),
                                        place: 'prepend',
                                        type: 'danger',
                                        message: result.message,
                                        closeInSeconds: 2,
                                        icon: 'fa fa-warning'
                                    });
                                    callback(false);
                                }
                            },
                            error: function () {
                            }
                        });
                    }
                }else{
                    $.ajax({
                        url: configMap.path + configMap.checkjshmUrl + "/" + $('input[name="sjhm"]',jqueryMap.$workorderForm).val(),
                        type: 'GET',
                        success: function (result) {
                            if(result.success){
                                savebusiness(callback);
                            } else {
                                App.alert({
                                    container: jqueryMap.$workorderForm.closest(".modal-body"),
                                    place: 'prepend',
                                    type: 'danger',
                                    message: result.message,
                                    closeInSeconds: 2,
                                    icon: 'fa fa-warning'
                                });
                                callback(false);
                            }
                        },
                        error: function () {
                        }
                    });
                }
            }else {
                callback(false);
            }
        },
        saveopportunity: function (callback){
            saveopportunity(callback);
        }
    };
}();
