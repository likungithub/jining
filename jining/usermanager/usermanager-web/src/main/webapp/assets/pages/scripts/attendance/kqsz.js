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

/*global $, App, moment, jQuery, bootbox, UsersEdit */
var kqsz=function () {

    var configMap={
        path:'',
        kqbh:'',
        dataUrl:'/attendance/kqsz',
        addKqUrl:'/attendance/addkq.jsp',
        addKqWifiUrl:'/attendance/addkqwifi.jsp',
        setOrgPageUrl: '/user/attendance/set-org-kq.jsp',
        saveKqszUrl:'/attendance/savekqsz'
    };
    var jqueryMap = {
        $kqszDialog:null,
        $kqszForm: null,
        $kqszOrgCon:null,
        $kqszAddress:null,
        $kqszAddWifi:null
    };
    var setJqueryMap = function () {
        jqueryMap.$kqszForm = $('#kqszCon');
        jqueryMap.$kqszOrgCon=$('#kqszCon .setOrg',jqueryMap.$kqszForm);
        jqueryMap.$kqszAddress=$('#addressUl',jqueryMap.$kqszForm);
        jqueryMap.$kqszAddWifi=$('#addWiFiUl',jqueryMap.$kqszForm);
    };

    var openModal = function (title, url, type, fun) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    fun();
                    return false;
                }
            };
        }
        if (type === 'selOrg') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function (result) {
                    setUserOrg.getSelectedOrg(function (result) {
                        if (result) {
                            jqueryMap.$kqszForm.find('input[name=addBmdm]').val(result.dm);
                            if(result.mc.length>14){
                                jqueryMap.$kqszForm.find('[id=addBtnSelectOrg] span').text(result.mc.substring(0,14) + "...");
                            } else {
                                jqueryMap.$kqszForm.find('[id=addBtnSelectOrg] span').text(result.mc);
                            }
                            jqueryMap.$kqszDialog.modal('hide');
                        }
                    });
                    return false;
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭',
            className: 'btn btn-default borderRadius4'
        };
        $.get(url, function (html) {
            jqueryMap.$kqszDialog = bootbox.dialog({
                className: 'edit-users-info',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    /**
     * 添加考勤地址
     */
    var addAddress=function () {
        openModal("添加考勤地址",configMap.path+configMap.addKqUrl,"edit",function () {
            addkq.save(function (result) {
                jqueryMap.$kqszDialog.modal('hide');
                if(result!==''){
                    jqueryMap.$kqszAddress.append('<li data-lng="'+result.lng+'" data-lat="'+result.lat+'" class="pull-left">' +
                        '<span>'+result.address+'</span><i class="fa fa-close closeAd" style="position: absolute;top: 10px;right: 5px;"></i>'+'</li>');
                }
                jqueryMap.$kqszAddress.find('.closeAd').off('click').on('click',function(){
                    $('#showMap').parent().css('display','none');
                    $(this).parent().remove();
                });
                viewMap();
            });
        });
    };

    var viewMap = function (){
        $('#addressUl li').hover(function(){
            $('#showMap').parent().css('display','block');
            var map= new BMap.Map("showMap");
            var defPoint = new BMap.Point($(this).attr('data-lng'),$(this).attr('data-lat'));
            var marker = new BMap.Marker(defPoint);
            map.centerAndZoom(defPoint,17);                                                                     //设置地图的级别
            map.enableScrollWheelZoom(true);                                                                    //启用滚轮放大缩小，默认禁用（不写就是默认），可以添加true或者false
            map.enableContinuousZoom();                                                                         //启用地图惯性拖拽，默认禁用（不写就是默认），可以添加true或者false
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
            var circle = new BMap.Circle(defPoint,Number($('.deviation',jqueryMap.$kqszForm).val()),{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});     //创建圆
            map.addOverlay(circle);
        },function(){
            $('#showMap').parent().css('display','none');
        });
    };

    /**
     * 添加wifi
     */
    var addWifi=function () {
        openModal("添加WiFi",configMap.path+configMap.addKqWifiUrl + '?kqbh=' + configMap.kqbh,"add");
    };

    /**
     * 校验数据
     */
    var checkvalue = function(){
        if($('input[type="checkbox"]:checked',jqueryMap.$kqszForm).length===0){
            App.alert({
                container: jqueryMap.$kqszForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请选择工作日！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if($('#addressUl li',jqueryMap.$kqszForm).length===0){
            App.alert({
                container: jqueryMap.$kqszForm.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请添加考勤地址！',
                icon: 'fa fa-warning'
            });
            return false;
        } else if($('[name="wifi"]:checked', jqueryMap.$kqszForm).val()==='true'){
            if($('#addWiFiUl li',jqueryMap.$kqszForm).length===0){
                App.alert({
                    container: jqueryMap.$kqszForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '请添加WiFi！',
                    icon: 'fa fa-warning'
                });
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    };

    /**
     * 保存考勤设置
     * @param callback
     */
    var saveKqSz=function (callback) {
        var ssDate = $('.statTime', jqueryMap.$kqszForm).val();
        var seDate = $('.endTime', jqueryMap.$kqszForm).val();
        var rsDate = $('.restStartTime', jqueryMap.$kqszForm).val();
        var reDate = $('.restEndTime', jqueryMap.$kqszForm).val();
        var workDay = '';
        $('input[type="checkbox"]:checked',jqueryMap.$kqszForm).each(function(){
            workDay += '(' + $(this).val() + ')';
        });
        var bmbm = $('[name="addBmdm"]', jqueryMap.$kqszForm).val();
        var bkqx = $('.rclockDay', jqueryMap.$kqszForm).val();
        var jsDate = $('.overTime', jqueryMap.$kqszForm).val();
        var kqfw = $('.deviation', jqueryMap.$kqszForm).val();
        var glwifi = $('input[type="radio"]:checked', jqueryMap.$kqszForm).val();
        var wobj, wifixx = [], aobj, address = [];
        if(glwifi==='true'){
            $('#addWiFiUl li', jqueryMap.$kqszForm).each(function(){
                wobj = {};
                wobj.name=$(this).attr('data-name');
                wobj.mac=$(this).attr('data-mac');
                wifixx.push(wobj);
            });
        }
        $('#addressUl li', jqueryMap.$kqszForm).each(function(){
            aobj = {};
            aobj.lng=$(this).attr('data-lng');
            aobj.lat=$(this).attr('data-lat');
            aobj.name=$(this).find('span').html();
            address.push(aobj);
        });
        var kqData = {
            ssDate:ssDate,
            seDate:seDate,
            rsDate:rsDate,
            reDate:reDate,
            workDay:workDay,
            bmbm:bmbm,
            bkqx:bkqx,
            jsDate:jsDate,
            kqfw:kqfw,
            glwifi:glwifi,
            wifixx:wifixx,
            address:address
        };
        var url = configMap.path + configMap.saveKqszUrl;
        var methodType = 'POST';
        if(configMap.kqbh){
            url = configMap.path + configMap.saveKqszUrl + '/' + configMap.kqbh;
            methodType = 'PUT';
        }
        $.ajax({
            url: url,
            type: methodType,
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(kqData),
            success: function (datas) {
                if(datas.success){
                    callback(true);
                } else {
                    App.alert({
                        container: jqueryMap.$kqszForm.closest(".modal-body"),
                        place: 'prepend',
                        type: 'danger',
                        message: datas.message,
                        icon: 'fa fa-warning'
                    });
                    return false;
                }
            },
            error: function () {
                Messenger().post({
                    message: '操作失败！',
                    type: 'error'
                });
                return false;
            }
        });
    };

    var initOrg=function () {
        openModal('选择所属部门', configMap.setOrgPageUrl + "?orgid=" + jqueryMap.$kqszForm.find('input[name=addBmdm]').val(), 'selOrg');
    };

    var getkqxx=function (){
        $.get(configMap.path + configMap.dataUrl + '/' + configMap.kqbh, function(result){
            console.info(result);
            $('.statTime', jqueryMap.$kqszForm).val(result.jbxx.sbsj);
            $('.endTime', jqueryMap.$kqszForm).val(result.jbxx.xbsj);
            $('.restStartTime', jqueryMap.$kqszForm).val(result.jbxx.xxsjq);
            $('.restEndTime', jqueryMap.$kqszForm).val(result.jbxx.xxsjz);
            $('.rclockDay', jqueryMap.$kqszForm).val(result.jbxx.bkqx);
            $('.overTime', jqueryMap.$kqszForm).val(result.jbxx.jbkssj);
            $('.deviation', jqueryMap.$kqszForm).val(result.jbxx.dkyxfw);
            if(result.jbxx.sfglwf){
                $('#wifitrue', jqueryMap.$kqszForm).prop('checked',true);
            } else {
                $('#wififalse', jqueryMap.$kqszForm).prop('checked',true);
                $('.wifidiv', jqueryMap.$kqszForm).css({display:'none'});
            }
            $('input[type="checkbox"]', jqueryMap.$kqszForm).prop('checked', false);
            for(var i=0;i<result.jbxx.gzrsz.split(')').length;i++){
                $('input[type="checkbox"][value="'+result.jbxx.gzrsz.split(')')[i].substring(1)+'"]', jqueryMap.$kqszForm).prop('checked', true);
            }
            $('[name="addBmdm"]', jqueryMap.$kqszForm).val(result.jbxx.syfw);
            for(var i=0;i<result.kqdd.length;i++){
                jqueryMap.$kqszAddress.append('<li data-lng="' + result.kqdd[i].kqddJd + '" data-lat="' +
                    result.kqdd[i].kqddWd+'" class="pull-left"><span>' + result.kqdd[i].kqdz + '</span>' +
                    '<i class="fa fa-close closeAd" style="position: absolute;top: 10px;right: 5px;"></i>'+'</li>');
            }
            for(var i=0;i<result.wifi.length;i++){
                jqueryMap.$kqszAddWifi.append('<li data-name="' + result.wifi[i].glwfmc+ '" data-mac="' +
                    result.wifi[i].glwfdm+'"><span>' + result.wifi[i].glwfmc + '</span>' +
                    '<i class="fa fa-close closeAd" style="position: absolute;top: 10px;right: 5px;"></i>'+'</li>');
            }
            jqueryMap.$kqszForm.find('.closeAd').off('click').on('click',function(){
                $('#showMap').parent().css('display','none');
                $(this).parent().remove();
            });
            viewMap();
        });
    };

    return{
        init:function (kqbh) {
            setJqueryMap();
            configMap.kqbh = kqbh;
            jqueryMap.$kqszForm.find('.statTime').timepicker({
                minuteStep: 1,
                secondStep: 5,
                showInputs: true,
                template: 'dropdown',
                modalBackdrop: true,
                showSeconds: true,
                showMeridian: false,
                explicitMode:true
            });
            jqueryMap.$kqszForm.find('.endTime').timepicker({
                minuteStep: 1,
                secondStep: 5,
                showInputs: true,
                template: 'dropdown',
                modalBackdrop: true,
                showSeconds: true,
                showMeridian: false,
                explicitMode:true
            });
            jqueryMap.$kqszForm.find('.restStartTime').timepicker({
                minuteStep: 1,
                secondStep: 5,
                showInputs: true,
                template: 'dropdown',
                modalBackdrop: true,
                showSeconds: true,
                showMeridian: false,
                explicitMode:true
            });
            jqueryMap.$kqszForm.find('.restEndTime').timepicker({
                minuteStep: 1,
                secondStep: 5,
                showInputs: true,
                template: 'dropdown',
                modalBackdrop: true,
                showSeconds: true,
                showMeridian: false,
                explicitMode:true
            });
            jqueryMap.$kqszForm.find('.overTime').timepicker({
                minuteStep: 1,
                secondStep: 5,
                showInputs: true,
                template: 'dropdown',
                modalBackdrop: true,
                showSeconds: true,
                showMeridian: false,
                explicitMode:true
            });
            $(".addAddress", jqueryMap.$kqszForm).off('click').on('click',addAddress);
            $(".addWifi", jqueryMap.$kqszForm).off('click').on('click',addWifi);
            $("#addBtnSelectOrg", jqueryMap.$kqszForm).off('click').on('click',initOrg);
            $(".doubt", jqueryMap.$kqszForm).tooltip();
            $('[name="wifi"]', jqueryMap.$kqszForm).on('change',function(){
                if($(this).val()==='true'){
                    $('.wifidiv', jqueryMap.$kqszForm).css({display:'block'});
                } else {
                    $('.wifidiv', jqueryMap.$kqszForm).css({display:'none'});
                }
            });
            if(configMap.kqbh!==null&&configMap.kqbh!==''){
                getkqxx();
            }
        },
        setPath:function (path) {
          configMap.path=path;
        },
        saveKqSz:function (callback) {
            if(checkvalue()){
                saveKqSz(callback);
            }
        },
        checkNumber: function (e){
            var thisnumber = $(e).val();
            if(!whetherOrNotPositive(thisnumber)){
                $(e).val(0);
                App.alert({
                    container: jqueryMap.$kqszForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '请填写正整数！',
                    icon: 'fa fa-warning'
                });
            }
        },
        closeAdd: function(e){
            $(e).parent().remove();
        }
    }
}();


//@ sourceURL=kqsz.js