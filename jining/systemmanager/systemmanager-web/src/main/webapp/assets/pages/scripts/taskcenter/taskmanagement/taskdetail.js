var taskdetailList_m = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        fileUrl: '/rwgljbxx/getfileurl'
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
    };
    //赋值
    var setJqueryMap = function () {
        jqueryMap.$container = $('#detailStepView_m');
        jqueryMap.$blockTarget = $('body');
    };


    var getURL = function (plate, filename, id) {
        var data = {
            plate: plate,
            id: id
        }
        //获取文件真实路径,下载
        $.ajax({
            url: configMap.path + configMap.fileUrl,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
//    				window.open(result.url);
//    				$('[name="downloadfile"]').attr("href",result.url);
                var name = filename.replace("." + filename.split(".")[filename.split(".").length - 1], "");
                var a = $("<a></a>").attr("href", result.url).attr("download", name).attr("target", "_blank").appendTo("body");
                a[0].click();
                a.remove();
            },
        });
    }
    var openModal1 = function (title, url, type) {

        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="' + 'fa fa-save  iconMr' + '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    /*  commonproblemEdit.saveCommonProblem(function (result) {
                     if (result) {
                     initCommonProblemData();
                     jqueryMap.$commonproblemDialog.modal('hide');
                     }
                     });
                     */

                    var fileNum = localStorage.getItem('fileNum');
                      
                    console.log(fileNum);
                    $('#tsakupLoadM span','#detailStepView_m').html('单机上传附件&nbsp;&nbsp;&nbsp;('+fileNum+')');
                    $('#tsakupLoadM span').html('单机上传附件&nbsp;&nbsp;&nbsp;('+fileNum+')');

                   /* //保存记录ID
                    var jlid_fj_id = $("#jlid_fj_id").val();
                    var jlid_id = $("#jlid_id").val();
                    if ("jlid" == jlid_id) {
                        $("#jlid_id").val(jlid_fj_id);//赋值
                    } else {
                        $("#jlid_id").val("jlid");
                    }
                    $("#jlid_fj_id").val("jlid");//初始化
                */

                    //保存记录ID
                    //var jlid_fj_id = $("#jlid_fj_id").val();
                   // sessionStorage.setItem("fj_fjid",jlid_fj_id);
                    /*var jlid_id = $("#jlid_id").val();
                    if ("jlid" == jlid_id) {
                        $("#jlid_id").val(jlid_fj_id);//赋值
                    } else {
                        //$("#jlid_id").val("jlid");
                    }*/
                   // $("#jlid_fj_id").val("jlid");//初始化
                }
            };
        }

        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className: 'taskFileUp-modal',
                title: title,
                message: html,
                buttons: dialogButtons
            });

        });
    };

// 有几步骤显示几步
    function displayStep(n) {
        if (n > 1) {
            for (var i = 0; i < n; i++) {
                $('.stepcontainer', '#detailStepView_m').append('<div class="outwrap clearMDW" style="position:relative "> <div></div> <div title="点击查看信息">' + i + '</div> <div></div>'+'<img class="hide" style="position: absolute;top: -10px;left: 36px;height: 22px;" src="'+ configMap.path+'/assets/pages/img/selected.png'+'" >' +' </div>');
            }
        }
    }

    function fullCurrentStep(n) {
        $('.stepcontainer>div>div', '#detailStepView_m').removeClass('stepActive');
        $('.stepcontainer>div:nth-child(' + n + ')' + '>div', '#detailStepView_m').addClass('stepActive');
    }


    //填充数据
    var fillData = function (i) {
        //首先把保存按钮隐藏掉,展示完成后到一步解开
        $('.task_step_list_m button[data-bb-handler="success"]').hide();
            $.ajax({
                url:'/systemmanager/rwgljbxx/jbxx/rwjbxx/' + i,
                success:function (d) {
                    displayStep(d.data.rwjbxx.lcbz + 1);
                    fullCurrentStep(1);
                    $('#detailStepView_m .stepcontainer>.outwrap>img').addClass('hide');
                    for (var j=0;j<d.data.lcbzxx.length;j++ ){
                       if(d.data.lcbzxx[j].lcbzjbxx.blzt=='001')
                        $('#detailStepView_m .stepcontainer>.outwrap:nth-child('+(j+2)+')>img').removeClass('hide');
                    }
                   $('#detailStepView_m .stepcontainer>.outwrap:eq('+d.data.rwjbxx.dqbz +')>div:nth-child(2)').addClass('activeNum');
                    // console.log(d.data,'伟大的aaaaaaaaaaaaaa');
                    console.log('mmm', $('.area0 .row1>span:eq(2)', jqueryMap.$container));
                    $('.area0 .row1>div>span:eq(1)', jqueryMap.$container).html(moment(d.data.rwjbxx.kssj).format('YYYY-MM-DD'));
                    $('.area0 .row1>div:nth-child(1)>span:eq(3)', jqueryMap.$container).html(moment(d.data.rwjbxx.jssj).format('YYYY-MM-DD'));
                    $('.area0 .row1>div:nth-child(2)>span:eq(1)', jqueryMap.$container).html(d.data.rwjbxx.jjcdmc);
                    $('.area0 .row1>div:nth-child(3)>span:eq(1)', jqueryMap.$container).html(d.data.rwjbxx.fqrMc);
                    $('.area0 .row1>div:nth-child(4)>span:eq(1)', jqueryMap.$container).html(d.data.rwjbxx.fzrMc);
                    $('.area0 .row1>div:nth-child(5)>span:eq(1)', jqueryMap.$container).html(d.data.rwjbxx.zxry);
                    //console.info(d.data,'啦啦啦啦啦啦');
                    //公司的信息
                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        type: "POST",
                        url: "/systemmanager/rwgljbxx/jbxx/queryKhxx?khbm="+sessionStorage.getItem('taskMkhbm')+'&yxkhbm='+sessionStorage.getItem('taskMyxkhbm'),
                        success: function(msg){
                           console.info(msg,$('.companyInfo',$('#detailStepView_m')).eq(2));
                        /*    $('.companyInfo',$('#detailStepView_m')).eq(0).html(msg.data.gsmc);
                            $('.companyInfo',$('#detailStepView_m')).eq(1).html(msg.data.nsrsbh);
                            $('.companyInfo',$('#detailStepView_m')).eq(2).html(msg.data.zyxm);
                            $('.companyInfo',$('#detailStepView_m')).eq(3).html(msg.data.frdb);
                            $('.companyInfo',$('#detailStepView_m')).eq(5).html(msg.data.lxrmc);
                            $('.companyInfo',$('#detailStepView_m')).eq(4).html(msg.data.sfzhm);
                            $('.companyInfo',$('#detailStepView_m')).eq(6).html(msg.data.sjhm);
*/

                            if(d.data.rwjbxx.sjly==2){
                                var hide1 = '',hide2='',hide3='',hide4='',hide5='';
                                if (!msg.data.gsmc){
                                    hide1 = 'hide';
                                }
                                if (!msg.data.nsrsbh){
                                    hide2 = 'hide';
                                }
                                if (!msg.data.zyxm){
                                    hide3 = 'hide';
                                }
                                if (!msg.data.frdb){
                                    hide4 = 'hide';
                                }
                                if (!msg.data.sfzhm){
                                    hide5 = 'hide';
                                }
                                $('#gongsineirongWrap',$('#detailStepView_m')).html(

                                    '<div class="form-group '+hide1+'">'+
                                    '<div class="row">'+
                                    '<div class="col-xs-12 padL77">'+
                                    '<span>公司名称：</span>'+
                                    '<span class="companyInfo">'+msg.data.gsmc+'</span>'+
                                    '</div>'+
                                    '</div>'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                    '<div class="row">'+
                                    '<div class="col-xs-6 padL77">'+
                                    '<span>联系人：</span>'+
                                    '<span class="companyInfo">'+msg.data.lxrmc +'</span>'+
                                    '</div>'+
                                    '<div class="col-xs-6" style="padding-left: 62px">'+
                                    '<span>手机号码：</span>'+
                                    '<span class="companyInfo">'+msg.data.sjhm+'</span>'+
                                    '</div>'+
                                    '</div>'+
                                    '</div>'+
                                    '<div class="col-xs-6 '+hide2+'" style="padding-left: 62px;margin-bottom: 15px;">'+
                                    '<span >税务登记号：</span>'+
                                    '<span  class="companyInfo">'+msg.data.nsrsbh+'</span>'+
                                    '</div>'+
                                    '<div class="col-xs-6 '+hide3+'"  style="padding-left: 62px;margin-bottom: 15px;">'+
                                    '<span>主管会计：</span>'+
                                    '<span class="companyInfo">'+msg.data.zyxm+'</span>'+
                                    '</div>'+
                                    '<div class="col-xs-6 '+hide4+'"  style="padding-left: 62px;margin-bottom: 15px;">'+
                                    '<span>法人代表：</span>'+
                                    '<span class="companyInfo">'+msg.data.frdb +'</span>'+
                                    '</div>'+
                                    '<div class="col-xs-6 '+hide5+'"  style="padding-left: 62px;margin-bottom: 15px;">'+
                                    '<span>证件号码：</span>'+
                                    '<span class="companyInfo">'+ msg.data.sfzhm+'</span>'+
                                    '</div>'


                                );
                            }else{
                            $('#gongsineirongWrap',$('#detailStepView_m')).html(
                            '<div class="form-group">'+
                                    '<div class="row">'+
                                    '<div class="col-xs-12 padL77">'+
                                    '<span>公司名称：</span>'+
                               '<span class="companyInfo">'+msg.data.gsmc+'</span>'+
                                    '</div>'+
                                    '</div>'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                    '<div class="row">'+
                                    '<div class="col-xs-6 padL77">'+
                                '<span>税务登记号：</span>'+
                                '<span  class="companyInfo">'+msg.data.nsrsbh+'</span>'+
                                    '</div>'+
                                    '<div class="col-xs-6 padL77">'+
                                    '<span>主管会计：</span>'+
                                '<span class="companyInfo">'+msg.data.zyxm+'</span>'+
                                    '</div>'+
                                    '</div>'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                    '<div class="row">'+
                                    '<div class="col-xs-6 padL77">'+
                                    '<span>法人代表：</span>'+
                                '<span class="companyInfo">'+msg.data.frdb +'</span>'+
                                    '</div>'+
                                    '<div class="col-xs-6 padL77">'+
                                    '<span>证件号码：</span>'+
                                '<span class="companyInfo">'+ msg.data.sfzhm+'</span>'+
                                    '</div>'+
                                    '</div>'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                    '<div class="row">'+
                                    '<div class="col-xs-6 padL77">'+
                                    '<span>联系人：</span>'+
                                '<span class="companyInfo">'+msg.data.lxrmc +'</span>'+
                                    '</div>'+
                                    '<div class="col-xs-6 padL77">'+
                                    '<span>手机号码：</span>'+
                                '<span class="companyInfo">'+msg.data.sjhm+'</span>'+
                                    '</div>'+
                                    '</div>'+
                                    '</div>'
                            );
                            }





                        }
                    });



                    // console.log(getURL(d.data.rwjbxxfj[0].fjmc,d.data.rwjbxxfj[0].fjcclj,d.data.rwjbxx.rwid)) ;
                    if (d.data.rwjbxxfj.length > 0) {
                        for (var i = 0; i < d.data.rwjbxxfj.length; i++) {

                            // $('.area0 .row2',jqueryMap.$container) .append('<a plate='+  d.data.rwjbxxfj[i].fjcclj+' filename='+d.data.rwjbxxfj[i].fjmc + ' rwid='+d.data.rwjbxxfj[i].rwid +'>'+d.data.rwjbxxfj[i].fjmc+'</a>');
                            $('.area0 .row2', jqueryMap.$container).append(
                                '<div class="pull-left text-center" style="margin: 10px 10px 0 0;width: 100px;word-break: break-all">' +
                                '<div style="margin-bottom: 10px;">' +
                                '<i class="iconfont icon-genjinguanli" style="font-size: 30px;color:#b1d3df;"></i>' +
                                '</div>' +
                                '<a  rwid="' + d.data.rwjbxxfj[i].rwid + '" filename="' + d.data.rwjbxxfj[i].fjmc + '" plate="' + d.data.rwjbxxfj[i].fjcclj + '">' + d.data.rwjbxxfj[i].fjmc + '</a>' +
                                '</div>'
                            );

                        }

                        $($('.area0 .row2', jqueryMap.$container).on('click', 'a', function () {
                            getURL($(this).attr('plate'), $(this).attr('filename'), $(this).attr('rwid'));
                        }));
                    } else {
                        /*  $('.area0 .row2',jqueryMap.$container) .append('<h3>没有附件</h3>')*/
                        // $('.area0 .row2',jqueryMap.$container).html('<img src="'+ configMap.path+'/assets/pages/img/noData.png'+'" alt="暂无数据">');
                        $('.area0 .row2', jqueryMap.$container).html(
                            '<div class="text-center">' +
                            '<img style="width: 130px" src="' + configMap.path + '/assets/pages/img/noData.png' + '" alt="暂无数据">' +
                            '<div style="margin-bottom: 15px">暂无附件信息</div>' +
                            '</div>'
                        );
                    }
                    if (d.data.rwjbxx.bzxx) {
                        $('.area0 .row3', jqueryMap.$container).append(
                            '<div><h5>备注信息：</h5>'+'<p style="text-indent: 2em;text-align: justify">' + d.data.rwjbxx.bzxx + '</p></div> '
                        );
                    } else {
                        $('.area0 .row3', jqueryMap.$container).html(
                            '<div  class="text-center">' +
                            '<img style="width: 130px" src="' + configMap.path + '/assets/pages/img/noData.png' + '" alt="暂无数据">' +
                            '<div>暂无备注信息</div>' +
                            '</div>'
                        );
                    }

                }
            });
    }




    return {
        init: function (i) {
            setJqueryMap();
            fillData(i);
            var obj = $("#detailStepView_m textarea");
            var num = 300;
            var numObj = $("#detailStepView_m .wordNum span")
            checkHowMany(obj,numObj,num);
            var myrwid = i;
            localStorage.setItem('currentStepMDW',0);

            $("#rw_blzt_id").change(function(){
                var v =  $(this).val();
                if("001"==v){
                    $('textarea[name="gznr"]').val("已完成");
                }
            });


            //为上边的步骤编号添加点击事件
            $('#detailStepView_m>.stepcontainer').on('click','.outwrap>div:nth-child(2)',function(){
                //移除当前步骤的类名
                $('#detailStepView_m .stepcontainer>.outwrap>div:nth-child(2)').removeClass('activeNum');
                //var sfksc = true;//可删除  判断当前步骤001 sfksc=false;
                sessionStorage.setItem('sfksc',true);
                console.log($(this).html(),2132134,i);
                console.log($('button[data-bb-handler="cancel"]'),'这是取消按钮');
                var bzh = $(this).html()*1;
                $.get('/systemmanager/rwgljbxx/jbxx/rwjbxx/' + i , function (myd) {
                    console.log(myd,9999,myd.data.lcbzxx);
                    $('#detailStepView_m .stepcontainer>.outwrap>img').addClass('hide');
                    for (var j=0;j<myd.data.lcbzxx.length;j++ ){
                        if(myd.data.lcbzxx[j].lcbzjbxx.blzt=='001')
                            $('#detailStepView_m .stepcontainer>.outwrap:nth-child('+(j+2)+')>img').removeClass('hide');
                    }
                    for (var j=1;j<myd.data.lcbzxx.length+1;j++){
                        if(bzh == j){
                            localStorage.setItem('bzidMDW',myd.data.lcbzxx[j-1].lcbzjbxx.bzid);
                            break;
                        }
                    }

                //console.log(localStorage.getItem('bzidMDW'),2123214213334323143214321);

                    if(bzh==myd.data.rwjbxx.lcbz){
                        $('button[data-bb-handler="cancel"]').html('<i class="' + 'fa fa-times  iconMr' + '"></i>关闭');
                    }else{
                        $('button[data-bb-handler="cancel"]').html('<i class="' + 'icon iconfont icon-xiayibu  iconMr' + '"></i>下一步');
                    }
                });

               localStorage.setItem('currentStepMDW',$(this).html()*1);
                /*$.ajax({
                    url:'/systemmanager/rwgljbxx/jbxx/rwjbxx/' + i,
                    success:function(data){
                        console.info(data);
                    }
                })*/
                if($(this).html()=='0'){
                    var khmc = localStorage.getItem('khmcM');
                    $('.task_step_list_m .modal-header h4').html('基本信息-'+khmc);
                    $('div.modal-footer').show();
                    $('button[data-bb-handler="cancel"]').show();
                    $('.area0', '#detailStepView_m').show();
                    $('.area1', '#detailStepView_m').hide();
                    $('.stepcontainer', '#detailStepView_m').empty();
                    $('.area0 .row2', jqueryMap.$container).empty();
                    $('.area0 .row3', jqueryMap.$container).empty();
                    fillData(i);
                }else{
                    $('.task_step_list_m button[data-bb-handler="success"]').show();
                    $('.area0', '#detailStepView_m').hide();
                    $('.area1', '#detailStepView_m').show();
                    var bzh = $(this).html()*1;
                    fullCurrentStep(bzh+1);
                //  如果有信息就直接展示
                    //清空流程的展示
                    $('#detailStepView_m .area1 >.row0>.discontent').empty();
                    //清空步骤的展示
                    $(' #detailStepView_m  .area1>.row4>ul').empty();
                    var bzid1;
/********************************************************************************************************/
                    var requestbf = function (i, j) {
                        console.log(i,j);
                        var rwid_sl=i;
                        var data_bzh=j;
                        $.get('/systemmanager/rwgljbxx/getbzxx/' + i + '/' + j, function (d) {
                            try{
                                bzid1 = d.lcbzxx.lcbzjbxx.bzid;
                                console.log(bzid1,'这是步骤id');
                            }catch (e){
                                console.log('没有rwbzjbxx');
                            }

                            //这里判断流程过来的串并行,如果是串行 是阻塞的,并行是可以非阻塞的,所以如果的串行的话我把下一步隐藏掉
                            //查询串并行标志
                            if (!d.lcbzxx.lcbzjbxx.cxbxbz) {
                                $('button[data-bb-handler="cancel"]', '.task_step_list_m ').hide();
                                try {
                                    if (d.rwbzxx.rwbzjbxx.blzt == '001') {
                                        $('button[data-bb-handler="cancel"]').show();
                                        $('button[data-bb-handler="success"]').hide();
                                    }
                                } catch (e) {
                                    $('button[data-bb-handler="cancel"]').hide();
                                }
                            } else {
                                // $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();

                                if(d.lcbzxx.lcbzjbxx.cxbxbz==0){
                                    $('#chuanbingsign').val('该步骤与下一步是串行');
                                    try {
                                        if (d.rwbzxx.rwbzjbxx.blzt == '001') {
                                            console.log('串行任务完成了');
                                            sessionStorage.setItem('sfksc',false);
                                              
                                            $('#tsakupLoadM', '#detailStepView_m').off('click');
                                            $('#detailStepView_m .wanchengzhuangtai option[value="001"]').prop('selected','selected').siblings('option').removeProp('selected');
                                            $('button[data-bb-handler="cancel"]').show();
                                            $('button[data-bb-handler="success"]').hide();
                                            $('textarea[name="gznr"]').prop('disabled','disabled').css({'cursor':'not-allowed'});
                                            $('select[name="blzt"]').prop('disabled','disabled').css({'cursor':'not-allowed'});
                                        }else{
                                            console.log('串行任务还未完成了');
                                            sessionStorage.setItem('sfksc',true);
                                            $('#tsakupLoadM', '#detailStepView_m').on('click');
                                            $('#detailStepView_m .wanchengzhuangtai option[value="006"]').prop('selected','selected').siblings('option').removeProp('selected');
                                            $('button[data-bb-handler="cancel"]').hide();
                                            $('button[data-bb-handler="success"]').show();
                                            $('textarea[name="gznr"]').removeProp('disabled').css({'cursor':'default'});
                                            $('select[name="blzt"]').removeProp('disabled').css({'cursor':'text'});
                                        }
                                    } catch (e) {
                                        $('#tsakupLoadM', '#detailStepView_m').on('click');
                                        $('#detailStepView_m .wanchengzhuangtai option[value="006"]').prop('selected','selected').siblings('option').removeProp('selected');
                                        $('button[data-bb-handler="cancel"]').hide();
                                        $('textarea[name="gznr"]').removeProp('disabled').css({'cursor':'default'});
                                        $('select[name="blzt"]').removeProp('disabled').css({'cursor':'text'});
                                    }
                                }
                                if(d.lcbzxx.lcbzjbxx.cxbxbz==1){
                                    $('#chuanbingsign').val('该步骤与下一部是并行');
                                    try {
                                        if (d.rwbzxx.rwbzjbxx.blzt == '001') {
                                            sessionStorage.setItem('sfksc',false);
                                            $('#tsakupLoadM', '#detailStepView_m').off('click');
                                            $('#detailStepView_m .wanchengzhuangtai option[value="001"]').prop('selected','selected').siblings('option').removeProp('selected');
                                            $('button[data-bb-handler="cancel"]').show();
                                            $('button[data-bb-handler="success"]').hide();
                                            $('textarea[name="gznr"]').prop('disabled','disabled').css({'cursor':'not-allowed'});
                                            $('select[name="blzt"]').prop('disabled','disabled').css({'cursor':'not-allowed'});

                                        }else{
                                            sessionStorage.setItem('sfksc',true);
                                            $('#tsakupLoadM', '#detailStepView_m').on('click');
                                            $('#detailStepView_m .wanchengzhuangtai option[value="006"]').prop('selected','selected').siblings('option').removeProp('selected');
                                            $('button[data-bb-handler="cancel"]').show();
                                            $(' button[data-bb-handler="success"]').show();
                                            ('textarea[name="gznr"]').removeProp('disabled').css({'cursor':'default'});
                                            $('select[name="blzt"]').removeProp('disabled').css({'cursor':'text'});
                                        }
                                    } catch (e) {
                                        $('#tsakupLoadM', '#detailStepView_m').on('click');
                                        $('#detailStepView_m .wanchengzhuangtai option[value="006"]').prop('selected','selected').siblings('option').removeProp('selected');
                                        $('button[data-bb-handler="cancel"]').show();
                                        $('textarea[name="gznr"]').removeProp('disabled').css({'cursor':'default'});
                                        $('select[name="blzt"]').removeProp('disabled').css({'cursor':'text'});
                                    }
                                }


                            }
                            var flag = true;
                            try {
                                d.rwbzxx.gzjlxx = d.rwbzxx.gzjlxx.reverse();
                            } catch (e) {
                                flag = false;
                            }

                            if(flag) {
                                for (var p = 0; p < d.rwbzxx.gzjlxx.length; p++) {
                                    var gzjlfj = d.rwbzxx.gzjlxx[p].gzjlfj; //i am a array
                                    var gzjljbxx = d.rwbzxx.gzjlxx[p].gzjljbxx; // i am jbxx

                                    var a_fj_html = '';
                                    if (gzjlfj.length > 0) {
                                        //工作记录附件遍历
                                        for (var a = 0; a < gzjlfj.length; a++) {
                                            var dgfjxx = gzjlfj[a];
                                            var filename = dgfjxx.fjmc;
                                            var plate = dgfjxx.fjcclj;
                                            var url = '<span style="display: block;width: 100px;letter-spacing: 0;float: left;margin: 10px 10px 0 0;text-align: center;">' + '<i class="iconfont icon-genjinguanli"></i>' + '<a style="display: block;padding-top: 10px" onclick="taskmanagement.getURL(' + '\'' + plate + '\',' + '\'' + filename + '\',' + '\'' + '' + '\'' + ')" name="downloadfile">' + filename + '</a>' + '</span>';
                                            a_fj_html += url;
                                        }
                                    }

                                    $('<li class="clearfix">' +
                                        ' <p class="pull-left pFirst">' + '<span style="padding-top: 14px;display: none;padding-right: 10px;">' + d.rwbzxx.gzjlxx[p].gzjljbxx.lrrmc + '</span>' + '<span style="display: inline-block;padding-top: 11px;width: 200px;text-align: center">' + Time.f(d.rwbzxx.gzjlxx[p].gzjljbxx.lrrq) + '</span>' + '</p>' +
                                        '<p class="pull-left">' +
                                        '<span class="active2"></span>' +
                                        ' </p>' +
                                        ' <p class="pull-left borderRadius4" style="position: relative"><i class="glyphicon glyphicon-triangle-left"></i><i class="glyphicon glyphicon-triangle-left"></i>' + '<span><span>'+ d.rwbzxx.gzjlxx[p].gzjljbxx.lrrmc +'</span><span>'+d.rwbzxx.gzjlxx[p].gzjljbxx.blztmc +'，</span>' + d.rwbzxx.gzjlxx[p].gzjljbxx.gznr + '</span>' + '<span>' + a_fj_html + '</span>' +'<strong class="taskInfoClose-m" data-rwid='+rwid_sl+' data-bzh='+data_bzh +' data-jlid='+d.rwbzxx.gzjlxx[p].gzjljbxx.jlid+ ' data-bzid='+d.rwbzxx.gzjlxx[p].gzjljbxx.bzid+ ' style="position: absolute;top: 0; right: 5px;cursor: pointer;">X</strong>'+
                                        '</p>' +
                                        '</li>'
                                    ).appendTo($(' #detailStepView_m  .area1>.row4>ul'));

                                }
                            }
                            //   处理下边时间轴的样式
                            //console.log($(' #detailStepView_m  .area1>.row4>ul>li>p:last-child').length,'伟大码');
                            $(' #detailStepView_m  .area1>.row4>ul>li>p:last-child').each(function () {
                                $(this).prev('p').height($(this).height() + 45);
                                var a = new Date($(this).parent('p').siblings('.pFirst').text());
                            });


                            $(' .modal-header h4').html(d.lcbzxx.lcbzjbxx.bzmc);
                           //bzid = d.lcbzxx.lcbzjbxx.bzid;
                            $('#detailStepView_m .area1 >.row0>.discontent').append(
                                '<p>' +
                                '<h5>备注信息：</h5>' +
                                '<p style="text-indent: 2em">' + d.lcbzxx.lcbzjbxx.bzxx + '</p>' +
                                '</p>'
                            );
                            for (var i = 0; i < d.lcbzxx.lcbzfj.length; i++) {
                                $('#detailStepView_m .area1 >.row0>.discontent').append(
                                    '<div class="pull-left" style="text-align: center;width: 100px">' +
                                    '<div>' + '<i class="iconfont icon-genjinguanli" style="font-size: 26px;margin-bottom: 10px"></i>' + '</div>' +
                                    '<div>' + "<a href='" + d.lcbzxx.lcbzfj[i].fjcclj + "' download='" + d.lcbzxx.lcbzfj[i].fjmc + "' target='_blank'>" + d.lcbzxx.lcbzfj[i].fjmc + "</a>" + '</div>' +
                                    '</div>'
                                );
                            }



                        });

                    }
/******************************************************************************************************************************/
                //调用上边的函数 第一参数是任务id  第二个参数是当前的步骤号
                    requestbf(myrwid,bzh);
                    $('#tsakupLoadM').off('click').click(function () {
                        openModal1('上传附件', configMap.path + '/taskcenter/taskmanagement/addTaskFileM.jsp?rwid=' + encodeURI(i) + '&bzid=' + encodeURI(bzid1) + '&jlid=' + $("#jlid_id").val(), 'edit');
                    });

                //    如果当前位置前边有串行未完成的  那么久隐藏下一步和保存

                    $.get('/systemmanager/rwgljbxx/getbzcxwc/'+i+'/'+bzh,function(result){
                        if(result.result){
                                // $('button[data-bb-handler="cancel"]').hide();
                                // $('button[data-bb-handler="success"]').hide();
                            $('div.modal-footer').hide();
                            console.log(result.result);
                            Messenger().post({
                                message: '当前步骤之前有未完成的串行任务，只允许查看流程信息。',
                                type: 'warning',
                                id:'3213214wq321'
                            });
                        }else{
                            $('div.modal-footer').show();

                        }
                    });



                }




            });




            //taskInfoClose-m
        $('#detailStepView_m  .area1>.row4>ul').on('click','.taskInfoClose-m',function(){
            if (sessionStorage.getItem('sfksc')=='false'){
                Messenger().post("该步骤已经完成，不能进行删除！");
                return false;
            }
          console.log(this);
          var  data={};
          data.rwid=$(this).attr('data-rwid');
          data.jlid = $(this).attr('data-jlid');
          data.bzid = $(this).attr('data-bzid');
          data.bzh=$(this).attr('data-bzh');

          $.ajax({
             url:'/systemmanager/rwgljbxx/gzjl?rwid='+data.rwid+"&bzid="+data.bzid+"&jlid="+data.jlid,
              type: "DELETE",
              success:function(d){
                 if (d.success){
                     Messenger().post("删除成功!");
                     $.get('/systemmanager/rwgljbxx/getbzxx/' +  data.rwid + '/' + data.bzh, function (d) {
                           
                         console.log(d.rwbzxx.gzjlxx);
                         $(' #detailStepView_m  .area1>.row4>ul').empty();
                         for (var p = 0; p < d.rwbzxx.gzjlxx.length; p++) {
                             var gzjlfj = d.rwbzxx.gzjlxx[p].gzjlfj; //i am a array
                             var gzjljbxx = d.rwbzxx.gzjlxx[p].gzjljbxx; // i am jbxx

                             var a_fj_html = '';
                             if (gzjlfj.length > 0) {
                                 //工作记录附件遍历
                                 for (var a = 0; a < gzjlfj.length; a++) {
                                     var dgfjxx = gzjlfj[a];
                                     var filename = dgfjxx.fjmc;
                                     var plate = dgfjxx.fjcclj;
                                     var url = '<span style="display: block;width: 100px;letter-spacing: 0;float: left;margin: 10px 10px 0 0;text-align: center;">' + '<i class="iconfont icon-genjinguanli"></i>' + '<a style="display: block;padding-top: 10px" onclick="taskmanagement.getURL(' + '\'' + plate + '\',' + '\'' + filename + '\',' + '\'' + '' + '\'' + ')" name="downloadfile">' + filename + '</a>' + '</span>';
                                     a_fj_html += url;
                                 }
                             }

                             $('<li class="clearfix">' +
                                 ' <p class="pull-left pFirst">' + '<span style="padding-top: 14px;display: inline-block;padding-right: 10px;">' + d.rwbzxx.gzjlxx[p].gzjljbxx.lrrmc + '</span>' + '<span>' + Time.f(d.rwbzxx.gzjlxx[p].gzjljbxx.lrrq) + '</span>' + '</p>' +
                                 '<p class="pull-left">' +
                                 '<span class="active2"></span>' +
                                 ' </p>' +
                                 ' <p class="pull-left borderRadius4" style="position: relative"><i class="glyphicon glyphicon-triangle-left"></i><i class="glyphicon glyphicon-triangle-left"></i>' + '<span><span>'+ d.rwbzxx.gzjlxx[p].gzjljbxx.lrrmc+ '&nbsp;&nbsp;&nbsp;</span><span>'+ d.rwbzxx.gzjlxx[p].gzjljbxx.blztmc+'&nbsp;&nbsp;&nbsp;</span>'+ d.rwbzxx.gzjlxx[p].gzjljbxx.gznr + '</span>' + '<span>' + a_fj_html + '</span>' +'<strong class="taskInfoClose-m" data-rwid='+ data.rwid +' data-bzh='+data.bzh +' data-jlid='+d.rwbzxx.gzjlxx[p].gzjljbxx.jlid+ ' data-bzid='+d.rwbzxx.gzjlxx[p].gzjljbxx.bzid+ ' style="position: absolute;top: 0; right: 5px;cursor: pointer;">X</strong>'+
                                 '</p>' +
                                 '</li>'
                             ).appendTo($(' #detailStepView_m  .area1>.row4>ul'));

                         }

                         //   处理下边时间轴的样式
                         //console.log($(' #detailStepView_m  .area1>.row4>ul>li>p:last-child').length,'伟大码');
                         $(' #detailStepView_m  .area1>.row4>ul>li>p:last-child').each(function () {
                             $(this).prev('p').height($(this).height() + 45);
                             var a = new Date($(this).parent('p').siblings('.pFirst').text());
                         });


                     })


                 }

              }
          });

        });


        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();
