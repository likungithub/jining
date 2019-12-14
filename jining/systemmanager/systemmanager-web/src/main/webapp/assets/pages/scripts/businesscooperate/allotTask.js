var allotTaskOperate= function () {
$('#allot-task-form').parents('.modal-dialog').css('width',720);
    //'use strict';
    // 全局属性参数
    var configMap = {
        rwid:'rwid',
        path:'',
        hturl:'/systemmanager/rwgljbxx/htxx',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="fa fa-trash" style="font-size:15px;"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $allotTaskForm: null,
    };
    var setJqueryMap = function () {
        jqueryMap.$allotTaskForm = $('#allot-task-form');
    };


    //加法运算
    var FloatAdd = function (arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    };


    //选择收费年份获取当前年的合同
    var gethtlist = function () {
        var blockTarget = jqueryMap.$allotTaskForm.closest(".modal-content");
        var sfxm = '';			//收费项目
        var sfje;				//收费金额
        var title;				//收费项目
        var splitflag;			//剪切标志
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在获取数据...'
        });
        var l_khbsdm = localStorage.getItem("cjrw_gsbsdm");
        var data = {
            khbm: l_khbsdm
        };
        $.ajax({
            url: configMap.hturl,
            type: "POST",
            data: data,
            async:false,
            success: function (datas) {
                App.unblockUI(blockTarget);
                sfxm += '<option value="" selected >请选择合同</option>'
                //生成合同列表
                for (var y = 0; y < datas.list.length; y++) {
                    sfje = 0;
                    title = '';
                    splitflag = '';
                    sfxm += '<option value="'+datas.list[y].value+'" selected >'+datas.list[y].name+'</option>'
                }
                $('[name="htbh"]').html(sfxm);
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$allotTaskForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '获取合同失败！',
                    icon: 'fa fa-warning'
                });
            }
        });
    };

    var addNewLc = function(){
    	jqueryMap.$allotTaskForm.closest(".modal-dialog").parent().modal('hide');
    	var _target = this;
    	var srcStr = "/systemmanager/taskcenter/processmanagement/list.jsp";
    	var menuName = "流程管理";
    	var id = "6a26a26e-580c-4278-821b-3ef0ace5d4ff";
    	var icon = "fa fa-pencil-square-o iconMr";
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
                title: '<i class="'+icon +'"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    }


    var openModalsfjl = function (title, url) {
        var dialogButtons = {};
        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };
        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className:'allotTask_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var openModal1 = function (title, url, type) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
              $('#addFZR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fzr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                }
            };
        }
        if (type === 'edit1') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    $('#addFQR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                }
            };
        }
        if (type === 'edit2') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    // $('#addZXR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    var strArr=[],strArr1=[],strArr2=[];
                    $('#alreadyPer li','#allotStaffList_m').each(function(){
                        strArr.push($(this).attr('user'));
                        strArr1.push($(this).attr('zydm'));
                        strArr2.push($(this).children('img').attr('src'));
                    });
                    console.log(strArr1);
                    console.log(strArr2);
                   var str3 =strArr2.join(',');
                    var str1 = strArr.join(' ,');
                    var str2 = strArr1.join(',');
                    console.log(str2);
                    $('#addZXR').html(str1)
                        .attr("data-original-title",str1)
                        .tooltip();

                    $('#addZXR').attr('zxry_dm',str2);
                    $('#addZXR').attr('rtx',str3);
                }
            };
        }


        if (type === 'edit3') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    //保存记录ID
                    var rwid_id = $("#rwid_id").val();
                    var rwid_fj_id = $("#rwid_fj_id").val();
                    if(rwid_id!=rwid_fj_id){
                        if("rwid"==rwid_id){
                            $("#rwid_id").val(rwid_fj_id);//赋值
                            configMap.rwid=rwid_fj_id;
                        }else{
                            $("#rwid_id").val("rwid");
                            configMap.rwid="rwid";
                        }
                        $("#rwid_fj_id").val("rwid");//初始化
                    }

                }
            };
        }
            dialogButtons.cancel = {
                label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
                className: 'btn btn-default borderRadius4 color666 '
            };

        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className:'allotTask_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
    $('#addFZR',$('#allot-task-form')).off('click').on('click',function(){
        openModal1('选择负责人',configMap.path + '/businesscooperate/staffList.jsp?type=one','edit');
    });
    $('#addFQR',$('#allot-task-form')).off('click').on('click',function(){
        openModal1('选择发起人',configMap.path + '/businesscooperate/staffList.jsp?type=one','edit1');
});

    $('#addZXR',$('#allot-task-form')).off('click').on('click',function(){
        openModal1('选择执行人',configMap.path + '/businesscooperate/staffList.jsp?type=any','edit2');
    });
    $('#addFJ',$('#allot-task-form')).off('click').on('click',function(){
        openModal1('选择附件',configMap.path + '/businesscooperate/addingAttachmentsFiles.jsp?rwid='+encodeURI(configMap.rwid),'edit3');
    });

    var AppAlert = function(msg) {
        App.alert({
            container: $(".modal-body"),
            place: 'prepend',
            type: 'danger',
            message: msg,
            closeInSeconds:3,
            icon: 'fa fa-warning'
        });
    };

    $.get('/systemmanager/rwgljbxx/jbxx/lccx',function(d){
        for(var i=0;i<d.data.length;i++){
            $('#lc_m','#allot-task-form').append('<option value="'+d.data[i].lcid+'">'+d.data[i].lcmc+'</option>');
        }
        $('#lc_m','#allot-task-form').trigger("change");
    });
    $('#lc_m','#allot-task-form').off("change").on("change",function () {
        if (this.selectedIndex=='undefined'){
            return
        }
        var lcid = this[this.selectedIndex].value;
        //根据流程ID查询流程信息
        $.get("systemmanager/rwgljbxx/jbxx/lcjbxx/"+lcid,function(d){
            var sfwz = d.data.lcjbxx.sfwz;//是否完整
            if(sfwz!=="1"){
                AppAlert("该流程步骤信息不完整，请先完善步骤信息。");
                $("button[data-bb-handler='success']").attr("disabled",true)
                // setTimeout(function () {
                //     $(".custom-alerts.alert.alert-danger.fade.in").css("display","none")
                // },8000)
            }else{
                $("button[data-bb-handler='success']").attr("disabled",false)
                $(".custom-alerts.alert.alert-danger.fade.in").css("display","none")
            }
            //alert(sfwz);
            $('input[name="rwmc"]','#allot-task-form').val(d.data.lcjbxx.lcmc+'任务');
            $('#lcxx_id', '#allot-task-form').show().empty();
            $('#lcxx_id', '#allot-task-form').append(
                '<i class="glyphicon glyphicon-triangle-top" style="position:absolute;left: 150px;top: -10px;color: #cfcfcf;"></i>'+
                '<i class="glyphicon glyphicon-triangle-top" style="position:absolute;left: 150px;top: -8px;color: #fff"></i>'
            );
            if(d.code=="1"){
                var lcms =  d.data.lcjbxx.lcms;
                var lcfj = d.data.lcfjxx;
                if (!lcms&&!lcfj.length){
                    $('#lcxx_id').hide();
                }else
                {
                    $('#lcxx_id').show();
                }

                if((lcms!="") ||(lcfj.length>0)) {

                    // $('#lcxx_id', '#allot-task-form').append("<h4>流程描述和流程附件</h4>");

                    $('#lcxx_id', '#allot-task-form').append('<img class="mr"style="vertical-align: sub;" src="'+configMap.path+'/assets/pages/img/description.png" alt="描述图片">'+'<span>'+lcms+'</span>' + "<br/>");

                    var dd;
                    for (var i = 0; i < lcfj.length; i++) {
                        dd = lcfj[i];
                        var fjmc = dd.fjmc;
                        var fjcclj = dd.fjcclj;
                        $('#lcxx_id', '#allot-task-form').append('<img class="mr"style="vertical-align: sub;margin-top: 5px" src="'+configMap.path+'/assets/pages/img/attachment.png" alt="描述图片">'+"<a href='" + fjcclj + "' download='" + fjmc + "' target='_blank'>" + fjmc + "</a></br>");

                    }
                }

            }

        });

    })

return {
    init: function (rwid) {
        setJqueryMap();
        gethtlist();
        var l_from = localStorage.getItem("cjrw_from");
        var l_ywbs = localStorage.getItem("cjrw_ywbs");
        var l_khbsmc = localStorage.getItem("cjrw_gsbsmc");
        var l_khbsdm = localStorage.getItem("cjrw_gsbsdm");
        var l_sjhm = localStorage.getItem("cjrw_khsjhm");
        $("#khbsmc_id").val("");
        $("#khbsdm_id").val("");
        $("#khbsmc_id").val(l_khbsmc);
        $("#khbsdm_id").val(l_khbsdm);
        $("#sjhm_id").val(l_sjhm);
        $("#khbsmc_id").attr("readonly", true);

        //textarea输入字数限制
        var obj = $("#allot-task-form textarea");
        var num = 300;
        var numObj = $("#allot-task-form .wordNum span")
        checkHowMany(obj,numObj,num);

        jqueryMap.$allotTaskForm.find('.beginTime').datepicker({
            // clearBtn: true,
            // format: 'yyyy-mm-dd',
            // autoclose: true,
            // language: 'zh-CN',
            // endDate: new Date()
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN',
            initialDate: new Date(),
            todayBtn: 'linked',
            todayHighlight: true
        });
        jqueryMap.$allotTaskForm.find('.endTime').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN',
            initialDate: new Date(),
            todayBtn: 'linked',
            todayHighlight: true
        });
        jqueryMap.$allotTaskForm.find('.createTime').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN',
            initialDate: new Date(),
            todayBtn: 'linked',
            todayHighlight: true
        });
        $('#addNewLc', jqueryMap.$allotTaskForm).tooltip();

        /*    $('#addNewLc',jqueryMap.$allotTaskForm).off().on('click',function(){
         addNewLc();
         });*/
        //
        // var rwmcStr = sessionStorage.getItem('khmbsmc');
        // $('input[name="rwmc"]','#allot-task-form').val(rwmcStr);
        configMap.rwid = rwid;
        if ((configMap.rwid != null) && (configMap.rwid != "null")) {
            //获取任务基本信息
            $.get('/systemmanager/rwgljbxx/getrwjbxx?rwid=' + configMap.rwid, function (d) {
                $('select[name="lcid"]', '#allot-task-form').val(d.data.lcid).trigger('change').prop('disabled', 'disabled');
                $("input[name='rwmc']", '#allot-task-form').val(d.data.rwmc).prop('disabled', 'disabled');
                //moment(1512921600000).format('YYYY-MM-DD')
                $("input[name='kssj']", '#allot-task-form').val(moment(d.data.kssj).format('YYYY-MM-DD')).prop('disabled', 'disabled').css('cursor', 'not-allowed');
                $("input[name='jssj']", '#allot-task-form').val(moment(d.data.jssj).format('YYYY-MM-DD')).prop('disabled', 'disabled').css('cursor', 'not-allowed');
                $("input[name='cjsj']", '#allot-task-form').val(moment(d.data.cjsj).format('YYYY-MM-DD')).prop('disabled', 'disabled').css('cursor', 'not-allowed');
                $('button.backfill', '#allot-task-form').off('click').css('cursor', 'not-allowed');
                //    判断复选框  选了哪几个
                $('input[type="checkbox"]', '#allot-task-form').prop('disabled', 'disabled');
                var str = d.data.rwtx;
                //    分割字符串
                var arr = str.split('');
                for (var i = 0; i < arr.length; i++) {
                    $('input[type="checkbox"][value="' + '00' + arr[i] + '"]', '#allot-task-form').prop('checked', 'checked').prop('disabled', 'disabled');
                }
                //固定紧急程度

                $('input[type="radio"][value="' + d.data.jjcd + '"]', '#allot-task-form').prop('checked', 'checked');
                $('input[type="radio"]', '#allot-task-form').prop('disabled', 'disabled');
                //回填发起人
                //$('#addFQR',$('#allot-task-form')).off('click').css('cursor','not-allowed');
                $('#addFQR span', $('#allot-task-form')).html(d.data.fqrMc);
                $('#addFQR', $('#allot-task-form')).attr("fqr_dm", d.data.fqrDm);
                // 回填负责人
                //$('#addFZR',$('#allot-task-form')).off('click').css('cursor','not-allowed');
                $('#addFZR span', $('#allot-task-form')).html(d.data.fzrMc);
                $('#addFZR', $('#allot-task-form')).attr("fzr_dm", d.data.fzrDm);
                //执行人
                //$('#addZXR',$('#allot-task-form')).off('click').css('cursor','not-allowed');
                $('#addZXR', $('#allot-task-form')).html(d.data.zxry)
                    .attr({title: d.data.zxry, dataToggle: "tooltip", dataPlacement: "top"})
                    .tooltip();
                $('#addZXR', $('#allot-task-form')).attr("zxry_dm", d.data.zxrydmmc);
                $('#addZXR', $('#allot-task-form')).attr("rtx", d.data.ygtx);
                // $('select[name="htbh"]').prop('disabled','disabled');
                gethtlist();
                if (d.data.htbh && ((d.data.htbh + "") != null) && ((d.data.htbh + "") != "null")) {

                    $('select[name="htbh"]').val(d.data.htbh);

                } else {
                    $('select[name="htbh"]').val('');
                }

                //回填备注信息
                $('textarea[name="bzxx"][maxlength="500"]', '#allot-task-form').val(d.data.bzxx);


            });

        }
    },
    // 设置路径
    setPath: function (path) {
        configMap.path = path;

    },
    dfjl: function () {
        var from = localStorage.getItem("cjrw_from");
        var cjrw_yxkhbm = localStorage.getItem("cjrw_yxkhbm");
        var khbm = localStorage.getItem("cjrw_gsbsdm");
        localStorage.setItem("dfjl_bs","1");
        var tab_id = "62ba214f-f2e2-4867-8738-c7f8b08160d4";
        var v = $('[role="tablist"]').find('#tab-page-nav-62ba214f-f2e2-4867-8738-c7f8b08160d4');
        if(v.length>0)
        closeTAB(tab_id)
        //alert(from + "==" + cjrw_yxkhbm + "==" + khbm);
        openModalsfjl("垫付记录", "/systemmanager/advanceinfo/list.jsp?from="+from+"&yxkhbm="+cjrw_yxkhbm+"&khbm="+khbm);
    }
}
}();
