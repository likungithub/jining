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
/*global $, App, moment, jQuery, bootbox, employeeEdit */
var taskmanagement = function() {
    'use strict';

    // 全局属性参数
    var configMap = {
        rwid: '',
        blzt: '',
        khbm: '',
        path: '',
        sjly:'',
        sjhm:'',
        SFXMUrl:'/contract/sfxm',
        dataUrl: '/rwgljbxx/jbxx/rwlb',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        taskmanagementGrid: null,
        allotTaskUrl: '/businesscooperate/allotTask.jsp',
        editPageUrl: '',
        viewPageUrl: '',
        // detailBtn_html: '<a href="javascript:;" data-type="detail" class="mr">详情</a>',
        detailBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="detail" data-toggle="tooltip" title="任务跟进"><i class="icon iconfont icon-genjin iconFontColor-10a0f7 iconFontSize"></i></a>',
        detailBtn_html_disabled: '<a disabled="disabled" href="javascript:;" class="btn btn-xs default" data-toggle="tooltip" title="任务跟进"><i style="color:#666;" class="icon iconfont icon-genjin iconFontSize"></i></a>',
        //receiveBtn_html: '<a href="javascript:;" data-type="receive" class="mr">收款</a>',
        receiveBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="receive" data-toggle="tooltip" title="收款"><i class="fa fa-cc-visa iconFontColor-10a0f7 iconFontSize  iconFontSize"></i></a>',
        //advanceBtn_html: '<a href="javascript:;" data-type="advance" class="mr">垫付</a>',
        advanceBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="advance" data-toggle="tooltip" title="垫付"><i class="icon iconfont icon-dianfu iconFontColor-10a0f7 iconFontSize"></i></a>',
        advanceBtn_html_disabled: '<a disabled="disabled" href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" title="垫付"><i style="color:#666;" class="icon iconfont icon-dianfu  iconFontSize"></i></a>',
        contract_html:'<a href="javascript:void(0);" class="btn btn-xs default" data-type="contract" data-toggle="tooltip" title="合同"><i class="icon iconfont icon-hetong- iconFontColor-10a0f7 iconFontSize " ></i></a>',
        contract_html_disabled:'<a disabled="" href="javascript:void(0);" class="btn btn-xs default" data-type="contract1" data-toggle="tooltip" title="暂无合同"><i class="icon iconfont icon-hetong- iconFontSize" style="color: #666;"></i></a>',
        //deleteBtn_html: '<a href="javascript:;"  data-type="del" class="mr" >删除</a>'
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html_disabled: '<a disabled="disabled" href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" title="删除"><i style="color:#666;" class="icon iconfont icon-shanchu3  iconFontSize"></i></a>',

        viewBtn_html: '<a href="javascript:;" class="lcbj btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑" data-original-title="编辑"><i class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewBtn_html_disabled: '<a href="javascript:;"  disabled="disabled" class="lcbj btn btn-xs default"  data-toggle="tooltip" title="编辑" data-original-title="编辑"><i style="color:#666;" class="icon iconfont icon-bianji1  iconFontSize"></i></a>'

    };
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

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $taskmanagementDialog: null,
        fileUrl: '/rwgljbxx/getfileurl'
    };
    //赋值
    var setJqueryMap = function() {
        jqueryMap.$container = $('#task-manager-container');
        jqueryMap.$blockTarget = $('body');
    };

    //初始步骤数目
    var initstepnum = 2;
    var allstep = 1;
    var bzid = null;
    var rwid = null;

    //打开编辑的模态框
    var openModalEdit = function(title, url, type) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="' + 'fa fa-save  iconMr' + '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function() {
                    var rwid = url.split('id=')[1];
                    //if ($('textarea[name="bzxx"]', '#allot-task-form').val()) {
                    var fzr = {},
                        fqr = {},
                        zxr = {},
                        htbh={};
                    fzr.name = 'FZR_DM';
                    fqr.name = 'FQR_DM';
                    zxr.name = 'ZXR_DM';
                    htbh.name='htbh';
                    fzr.value = $('#addFZR').attr('fzr_dm');
                    fqr.value = $('#addFQR').attr('fqr_dm');
                    zxr.value = $('#addZXR').attr('zxry_dm');
                    htbh.value=$('#htselect').val();
                    var arr = new Array();
                    //arr =  $('#allot-task-form').serializeArray();
                    arr.push(htbh);
                    arr.push(fzr);
                    arr.push(fqr);
                    arr.push(zxr);
                    $.ajax({
                        type: "POST",
                        url: "/systemmanager/rwgljbxx/updaterwjbxx?rwid=" + rwid + '&bzxx=' + encodeURIComponent( $('textarea[name="bzxx"]', '#allot-task-form').val()),
                        data:arr,
                        success: function(msg) {
                            if (msg.success) {
                                configMap.taskmanagementGrid.ajax.reload();
                                Messenger().post({
                                    message: "保存成功!",
                                    type: 'success'
                                });
                            }else{
                                Messenger().post({
                                    message: "保存失败!",
                                    type: 'error'
                                });
                            }

                        }
                    });


                    //}
                }
            }
        }

        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };
        $.get(url, function(html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className: 'editTaskViewM',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };




    // 垫付按钮
    var advanceCommon = function() {

        var dfxmdm = $('#rwgl_fyxm', '#advanceViewForm').val();
        var dfxmmc = $("#rwgl_fyxm").find("option:selected").text()

        var dfje = $('input[name="dfje"]', '#advanceViewForm').val();
        var dfsj = $('input[name="dfsj"]', '#advanceViewForm').val();


        var gsname = $('input[name="gsname"]', '#advanceViewForm').val();
        var userAccount = $('input[name="userAccount"]', '#advanceViewForm').val();
        var name = $('input[name="name"]', '#advanceViewForm').val();
        var number = $('input[name="number"]', '#advanceViewForm').val();
        var bzxx = $('textarea[name="bzxx"]', '#advanceViewForm').val();
        var rwid = localStorage.getItem("rwid");
        var sfbz = localStorage.getItem("bz");
        if (dfje == "") {
            AppAlert("请输入垫付金额");
            return false;
        } else if (whetherOrNotMoney(dfje) == false) {
            AppAlert("请输入正确的垫付金额");
            return false;
        }
        if (dfsj == "") {
            AppAlert("请输入垫付时间");
            return false;
        }
        if (gsname == "") {
            AppAlert("请输入公司名称");
            return false;
        }
        var data = {
            rwid: rwid,
            bzxx: bzxx,
            qymc: gsname,
            sfsj: dfsj,
            je: dfje,
            lxrxm: name,
            lxrdh: number,
            qysh: userAccount,
            sfbz: sfbz,
            dfxmMc:dfxmmc,
            dfxmDm:dfxmdm,
        }
        $.ajax({
            url: '/systemmanager/rwgljbxx/jbxx/sfjl',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            data: data,
            type: 'post',
            success: function(result) {
                configMap.taskmanagementGrid.ajax.reload();
            }
        })

        return true;

    }
    var openModal2 = function(title, url, type) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="' + 'fa fa-save  iconMr' + '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function() {
                    if (!advanceCommon()) {
                        return false;
                    };
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };
        $.get(url, function(html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className: 'advanceViewM',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };


    var openModal1 = function(title, url, type) {

        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="' + 'fa fa-save  iconMr' + '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function() {
                    /*  commonproblemEdit.saveCommonProblem(function (result) {
                     if (result) {
                     initCommonProblemData();
                     jqueryMap.$commonproblemDialog.modal('hide');
                     }
                     });
                     */


                    //保存记录ID
                    /*  var jlid_fj_id = $("#jlid_fj_id").val();
                     var jlid_id = $("#jlid_id").val();
                     if ("jlid" == jlid_id) {
                     $("#jlid_id").val(jlid_fj_id); //赋值
                     } else {
                     $("#jlid_id").val("jlid");
                     }
                     $("#jlid_fj_id").val("jlid"); //初始化*/


                    var fileNum = localStorage.getItem('fileNum');
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
                    //sessionStorage.setItem("fj_fjid",jlid_fj_id);
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

        $.get(url, function(html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className: 'taskFileUp-modal',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    //删除任务
    var delTaskF = function(event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });

        var rowIndex = configMap.taskmanagementGrid.cell(element.parent()).index().row;
        var id = configMap.taskmanagementGrid.row(rowIndex).data().rwid;
        $.ajax({
            url: configMap.path + '/rwgljbxx/jbxx/' + id,
            type: 'DELETE',
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    configMap.taskmanagementGrid.ajax.reload();
                    Messenger().post("删除成功!");
                } else {
                    Messenger().post({
                        message: "删除成功!",
                        type: 'error'
                    });
                }
            },
            error: function() {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };


    var openModal12 = function(title, url, type) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="' + 'fa fa-save  iconMr' + '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function() {
                    var fzr = {},
                        fqr = {},
                        zxr = {},
                        rwid = {},
                        from = {},
                        ywbs = {},
                        sjhm={};
                    fzr.name = 'FZR_DM';
                    fqr.name = 'FQR_DM';
                    zxr.name = 'ZXR_DM';
                    rwid.name = "rwid";
                    from.name = "cjrw_from";
                    ywbs.name = "cjrw_ywbs";
                    sjhm.name="sjhm";
                    var l_from = localStorage.getItem("cjrw_from");
                    var l_sjhm = localStorage.getItem("cjrw_khsjhm");
                    var l_ywbs = localStorage.getItem("cjrw_ywbs");
                    from.value = l_from;
                    ywbs.value = l_ywbs;
                    fzr.value = $('#addFZR').attr('fzr_dm');
                    fqr.value = $('#addFQR').attr('fqr_dm');
                    zxr.value = $('#addZXR').attr('zxry_dm');
                    sjhm.value=l_sjhm;
                    rwid.value = $("#rwid_id").val();
                    var arr = $('#allot-task-form').serializeArray();
                    //开始时间
                    var startT = arr[6].value.split('-').join('');
                    //创建时间
                    var createT = arr[7].value.split('-').join('');
                    //结束时间
                    var endT = arr[8].value.split('-').join('');
                    if (endT - startT < 0) {
                        App.alert({
                            container: $('#allot-task-form').closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: '结束时间不能小于开始时间！',
                            icon: 'fa fa-warning'
                        });
                        return false;
                    }

                    if (createT - startT > 0) {
                        App.alert({
                            container: $('#allot-task-form').closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: '创建时间不能大于开始时间！',
                            icon: 'fa fa-warning'
                        });
                        return false;
                    }

                    arr.push(fzr);
                    arr.push(fqr);
                    arr.push(zxr);
                    arr.push(rwid);
                    arr.push(ywbs);
                    arr.push(from);
                    arr.push(sjhm);
                    if (arr[3].value == '' || arr[3].value == null) {
                        App.alert({
                            container: $('#allot-task-form').closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: '请添加流程！',
                            icon: 'fa fa-warning'
                        });
                        return false;
                    }
                    if (!($('input[name="rwmc"]', '#allot-task-form').val())) {
                        App.alert({
                            container: $('#allot-task-form').closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: '任务名称不能为空！',
                            icon: 'fa fa-warning'
                        });
                        return false;
                    }
                    if (!$('#addZXR').attr('zxry_dm') || !$('#addZXR').attr('zxry_dm').trim()) {

                        App.alert({
                            container: $('#allot-task-form').closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: '请选择执行人！',
                            icon: 'fa fa-warning'
                        });
                        return false;

                    }

                    $.post('/systemmanager/rwgljbxx/jbxx/saverwjbxx', arr, function(d) {
                        var rwid = $("#jlid_id").val();
                        var f_rwid = d.rwid;
                        if ("rwid" == rwid) {
                            $("#rwid_id").val(f_rwid);
                        } else {
                            $("#rwid_id").val("rwid");
                        }
                        configMap.taskmanagementGrid.ajax.reload();
                        if (d.success) {
                            Messenger().post("保存成功!");
                        } else {
                            Messenger().post("保存失败!");
                        }
                    })
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 ',
            callback: function() {
                $("#rwid_id").val("rwid");
                $("#rwid_fj_id").val("rwid");
            }
        };
        $.get(url, function(html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className: 'allotTask_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    //查看产品信息
    var viewtaskmanagement = function() {
        var el = $(this);
        var rowIndex = configMap.taskmanagementGrid.cell(el.parent()).index().row;
        var id = configMap.taskmanagementGrid.row(rowIndex).data().id;
        openModal("查看参数信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
    };
    //初始化表
    var inittaskmanagementData = function() {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });

        //    开始的时间
        var sT = $('input[name="starDate"]', '#task-manager-container').val();
        //    结束的时间
        var eT = $('input[name="endDate"]', '#task-manager-container').val();
        //    部门代码
        var bmdm = $('#workorderstatus', '#task-manager-container').attr('data-code');

        $.ajax({
            //url: configMap.path + configMap.dataUrl+"?khbm="+$("#khbm_id").val(),
            url: configMap.path + '/rwgljbxx/jbxx/rwlb/?' + 'kssj=' + sT + '&jssj=' + eT + '&bmdm=' + bmdm + "&khbm=" + configMap.khbm,
            dataType: 'JSON',
            type: 'GET',
            success: function(data) {
                configMap.taskmanagementGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (data.success) {
                    if (data.data.length > 0) {
                        return configMap.taskmanagementGrid.rows.add(data.data).draw();
                    }
                }
            },
            error: function() {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    //        当前步骤的颜色
    function fullCurrentStep(n) {
        $('.stepcontainer>div>div:nth-child(2)', '#detailStepView_m').removeClass('stepActive');
        $('.stepcontainer>div:nth-child(' + n + ')' + '>div:nth-child(2)', '#detailStepView_m').addClass('stepActive');
    }



    //任务详情的模态框
    var openModal = function(title, url, type) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="' + 'fa fa-save iconMr' + '"></i>保存',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function() {
                    $('#detailStepView_m .stepcontainer>.outwrap>div:nth-child(2)').removeClass('activeNum');
                    var storeBZH = localStorage.getItem('currentStepMDW');
                    initstepnum = storeBZH * 1 + 2;
                    var mybzmc;
                    $.ajax({
                        url: '/systemmanager/rwgljbxx/getbzxx/' + url.split('?id=')[1] + '/' + (initstepnum - 2),
                        async: false,
                        success: function(d) {
                            bzid = d.lcbzxx.lcbzjbxx.bzid;
                            mybzmc = d.lcbzxx.lcbzjbxx.bzmc
                        }
                    });


                    //清空步骤的展示
                    // $(' #detailStepView_m  .area1>.row4>ul').empty();
                    // 这一步改成任务内容不为空的时候去清空
                    $('button[data-bb-handler="cancel"]', '.task_step_list_m ').removeProp('disabled');

                    //收集表单的信息的方法
                    var collectForm = function() {
                        var a = $('select[name="blzt"]', '#detailStepView_m').val();
                        var bb = $('#remindMethod_m').serializeArray();
                        var b = '';
                        for (var i = 0; i < bb.length; i++) {
                            b += bb[i].value + ',';
                        }
                        b = b.slice(0, -1);
                        var c = $('textarea[name="gznr"]', '#detailStepView_m').val();
                        if(!localStorage.getItem('htbhSign')){
                            if (!(c.search(/(\d{1,}[.]\d{1,})|(\d{1,})/)==-1)){
                                Messenger().post({
                                    message: "如果涉及到收费，请选择合同",
                                    type: 'success'
                                });
                            }
                        }
                        var d = url.split('?id=')[1];
                        var e = bzid;
                        //var jlid = $("#jlid_id").val();
                        var jlid =sessionStorage.getItem("fj_fjid");
                        if((jlid==null)||(jlid=="")){
                            jlid='jlid';
                        }
                        // alert(bzid);

                        var data = {
                            'blzt': a,
                            'txfs': b,
                            'gznr': c,
                            'rwid': d,
                            'bzid': e,
                            'jlid': jlid,
                            'bzmc': mybzmc
                        };

                        if(data.gznr.trim()==''){
                            Messenger().post({
                                message: '请输入工作内容！',
                                type: 'warning',
                                id:'taskgznr12'
                            });
                            return false;
                        }
                        $(' #detailStepView_m  .area1>.row4>ul').empty();
                        $.ajax({
                            type: 'post',
                            async: false,
                            url: '/systemmanager/rwgljbxx/jbxx/saverwbzxx',
                            data: data,
                            success: function(d) {
                                /* $("#jlid_id").val("jlid");
                                 $("#jlid_fj_id").val("jlid");*/
                                if (d.success) {

                                   var tid= sessionStorage.getItem('aboutTaskId_dh');
                                    if (tid){
                                        $.get('/systemmanager/rwgljbxx/jbxx/rwjbxx/' + tid , function (myd) {
                                            $('#detailStepView_m .stepcontainer>.outwrap>img').addClass('hide');
                                            for (var j=0;j<myd.data.lcbzxx.length;j++ ){
                                                if(myd.data.lcbzxx[j].lcbzjbxx.blzt=='001')
                                                    $('#detailStepView_m .stepcontainer>.outwrap:nth-child('+(j+2)+')>img').removeClass('hide');
                                            }

                                        })
                                    }
                                    sessionStorage.setItem("fileNum", 0);
                                    var fileNum = sessionStorage.getItem('fileNum');
                                    $('#tsakupLoadM span').empty().append('单机上传附件&nbsp;&nbsp;&nbsp;(' + fileNum + ')');
                                    sessionStorage.removeItem("fj_fjid");
                                    var idR = url.split('?id=')[1];
                                    var b = initstepnum - 2;
                                    var requestbf = function(i, j) {
                                        $.get('/systemmanager/rwgljbxx/getbzxx/' + i + '/' + j, function(d) {
                                            // alert('/systemmanager/rwgljbxx/getbzxx/'+i+'/'+j);
                                            //这里判断流程过来的串并行,如果是串行 是阻塞的,并行是可以非阻塞的,所以如果的串行的话我把下一步隐藏掉
                                            if (!d.lcbzxx.lcbzjbxx.cxbxbz) {
                                                $('button[data-bb-handler="cancel"]', '.task_step_list_m ').hide();
                                                try {
                                                    if (d.rwbzxx.rwbzjbxx.blzt == '001') {
                                                        $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();
                                                        $('.task_step_list_m button[data-bb-handler="success"]').hide();
                                                    }
                                                } catch (e) {
                                                    $('button[data-bb-handler="cancel"]', '.task_step_list_m ').hide();
                                                }
                                            } else {
                                                // $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();

                                                if (d.lcbzxx.lcbzjbxx.cxbxbz == 0) {
                                                    $('#chuanbingsign').val('该步骤与下一步是串行');
                                                    try {
                                                        if (d.rwbzxx.rwbzjbxx.blzt == '001') {
                                                            sessionStorage.setItem('sfksc', false);
                                                            $('#detailStepView_m .wanchengzhuangtai option[value="001"]').prop('selected', 'selected').siblings('option').removeProp('selected');
                                                            $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();
                                                            $('.task_step_list_m button[data-bb-handler="success"]').hide();
                                                            $('textarea[name="gznr"]').prop('disabled', 'disabled').css({
                                                                'cursor': 'not-allowed'
                                                            });
                                                            $('select[name="blzt"]').prop('disabled', 'disabled').css({
                                                                'cursor': 'not-allowed'
                                                            });
                                                        } else {
                                                            sessionStorage.setItem('sfksc', true);
                                                            $('#detailStepView_m .wanchengzhuangtai option[value="006"]').prop('selected', 'selected').siblings('option').removeProp('selected');
                                                            $('button[data-bb-handler="cancel"]', '.task_step_list_m ').hide();
                                                            $('.task_step_list_m button[data-bb-handler="success"]').show();
                                                            $('textarea[name="gznr"]').removeProp('disabled').css({
                                                                'cursor': 'default'
                                                            });
                                                            $('select[name="blzt"]').removeProp('disabled').css({
                                                                'cursor': 'text'
                                                            });
                                                        }
                                                    } catch (e) {
                                                        $('#detailStepView_m .wanchengzhuangtai option[value="006"]').prop('selected', 'selected').siblings('option').removeProp('selected');
                                                        $('button[data-bb-handler="cancel"]', '.task_step_list_m ').hide();
                                                        $('textarea[name="gznr"]').removeProp('disabled').css({
                                                            'cursor': 'default'
                                                        });
                                                        $('select[name="blzt"]').removeProp('disabled').css({
                                                            'cursor': 'text'
                                                        });
                                                    }
                                                }
                                                if (d.lcbzxx.lcbzjbxx.cxbxbz == 1) {
                                                    $('#chuanbingsign').val('该步骤与下一步是并行');
                                                    try {
                                                        if (d.rwbzxx.rwbzjbxx.blzt == '001') {
                                                            sessionStorage.setItem('sfksc', false);
                                                            $('#detailStepView_m .wanchengzhuangtai option[value="001"]').prop('selected', 'selected').siblings('option').removeProp('selected');
                                                            $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();
                                                            $('.task_step_list_m button[data-bb-handler="success"]').hide();
                                                            $('textarea[name="gznr"]').prop('disabled', 'disabled').css({
                                                                'cursor': 'not-allowed'
                                                            });
                                                            $('select[name="blzt"]').prop('disabled', 'disabled').css({
                                                                'cursor': 'not-allowed'
                                                            });
                                                        } else {
                                                            sessionStorage.setItem('sfksc', true);
                                                            $('#detailStepView_m .wanchengzhuangtai option[value="006"]').prop('selected', 'selected').siblings('option').removeProp('selected');
                                                            $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();
                                                            $('.task_step_list_m button[data-bb-handler="success"]').show();
                                                            $('textarea[name="gznr"]').removeProp('disabled').css({
                                                                'cursor': 'default'
                                                            });
                                                            $('select[name="blzt"]').removeProp('disabled').css({
                                                                'cursor': 'text'
                                                            });
                                                        }
                                                    } catch (e) {
                                                        $('#detailStepView_m .wanchengzhuangtai option[value="006"]').prop('selected', 'selected').siblings('option').removeProp('selected');
                                                        $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();
                                                        $('textarea[name="gznr"]').removeProp('disabled').css({
                                                            'cursor': 'default'
                                                        });
                                                        $('select[name="blzt"]').removeProp('disabled').css({
                                                            'cursor': 'text'
                                                        });
                                                    }
                                                }


                                            }




                                            bzid = d.lcbzxx.lcbzjbxx.bzid;
                                            d.rwbzxx.gzjlxx = d.rwbzxx.gzjlxx.reverse();
                                            for (var p = 0; p < d.rwbzxx.gzjlxx.length; p++) {

                                                var gzjlfj = d.rwbzxx.gzjlxx[p].gzjlfj; //i am a array
                                                var gzjljbxx = d.rwbzxx.gzjlxx[p].gzjljbxx; // i am jbxx

                                                var a_fj_html = '';
                                                if (gzjlfj.length > 0) {
                                                    //工作记录附件遍历
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
                                                    ' <p class="pull-left borderRadius4" style="position: relative"><i class="glyphicon glyphicon-triangle-left"></i><i class="glyphicon glyphicon-triangle-left"></i>' + '<span>'+'<span>'+d.rwbzxx.gzjlxx[p].gzjljbxx.lrrmc  +'</span>'+'<span>'+d.rwbzxx.gzjlxx[p].gzjljbxx.blztmc +'，</span>' + d.rwbzxx.gzjlxx[p].gzjljbxx.gznr + '</span>' + '<span>' + a_fj_html + '</span>' + '<strong data-bzh="' + (initstepnum - 2) + '"  data-rwid="' + d.rwbzxx.rwbzjbxx.rwid + '"' + ' data-jlid="' + d.rwbzxx.gzjlxx[p].gzjljbxx.jlid + '"' + ' data-bzid="' + d.lcbzxx.lcbzjbxx.bzid + '"   class="taskInfoClose-m" style="position: absolute;top: 0; right: 5px;cursor: pointer;">X</strong>' +
                                                    '</p>' +
                                                    '</li>'
                                                ).appendTo($(' #detailStepView_m  .area1>.row4>ul'));

                                            }
                                            //   处理下边时间轴的样式
                                            $(' #detailStepView_m  .area1>.row4>ul>li>p:last-child').each(function() {
                                                $(this).prev('p').height($(this).height() + 45);
                                                var a = new Date($(this).parent('p').siblings('.pFirst').text());
                                            });

                                        });
                                    }
                                    requestbf(idR, b);
                                }
                            }
                        });

                        configMap.taskmanagementGrid.ajax.reload();

                    }
                    collectForm();
                    //点击保存的时候要去掉textarea中的数据和提醒方式的复选框
                    $('#detailStepView_m .area1 .row2 textarea').val('');
                    // $('#detailStepView_m .area1 .row1 .remindMethod>form>input').removeProp('checked');
                    return false;

                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="' + 'icon iconfont icon-xiayibu  iconMr' + '"></i>下一步',
            className: 'btn btn-default borderRadius4',
            callback: function() {
                //移除当前步骤的类名
                $('#detailStepView_m .stepcontainer>.outwrap>div:nth-child(2)').removeClass('activeNum');
                var storeBZH = localStorage.getItem('currentStepMDW');
                initstepnum = storeBZH * 1 + 2;
                $('#detailStepView_m .area1>.row4 ul>li>p:nth-child(3)').each(function(i, v) {
                    $(this).prev().css('height', $(this).height() + 10);
                });
                //显示保存按钮
                $('.task_step_list_m button[data-bb-handler="success"]').show();

                var idR = url.split('?id=')[1];
                $.get('/systemmanager/rwgljbxx/jbxx/rwjbxx/' + idR , function (myd) {
                    $('#detailStepView_m .stepcontainer>.outwrap>img').addClass('hide');
                    for (var j=0;j<myd.data.lcbzxx.length;j++ ){
                        if(myd.data.lcbzxx[j].lcbzjbxx.blzt=='001')
                            $('#detailStepView_m .stepcontainer>.outwrap:nth-child('+(j+2)+')>img').removeClass('hide');
                    }

                    })

                fullCurrentStep(initstepnum);
                initstepnum++;
                localStorage.setItem('currentStepMDW', initstepnum - 2);
                if (initstepnum > 2) {
                    //清空流程的展示
                    $('#detailStepView_m .area1 >.row0>.discontent').empty();
                    //清空步骤的展示
                    $(' #detailStepView_m  .area1>.row4>ul').empty();
                    //有任务内容直接展示
                    // alert(bzid+"下一步之前");
                    var requestbf = function(i, j) {
                        $.get('/systemmanager/rwgljbxx/getbzxx/' + i + '/' + j, function(d) {
                            bzid = d.lcbzxx.lcbzjbxx.bzid;
                            //这里判断流程过来的串并行,如果是串行 是阻塞的,并行是可以非阻塞的,所以如果的串行的话我把下一步隐藏掉

                            if (!d.lcbzxx.lcbzjbxx.cxbxbz) {
                                $('button[data-bb-handler="cancel"]', '.task_step_list_m ').hide();
                                try {
                                    if (d.rwbzxx.rwbzjbxx.blzt == '001') {
                                        $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();
                                        $('.task_step_list_m button[data-bb-handler="success"]').hide();
                                    }
                                } catch (e) {
                                    $('button[data-bb-handler="cancel"]', '.task_step_list_m ').hide();
                                }
                            } else {
                                // $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();

                                if (d.lcbzxx.lcbzjbxx.cxbxbz == 0) {
                                    $('#chuanbingsign').val('该步骤与下一步是串行');
                                    try {
                                        if (d.rwbzxx.rwbzjbxx.blzt == '001') {
                                            sessionStorage.setItem('sfksc', false);
                                            $('#tsakupLoadM', '#detailStepView_m').off('click');
                                            $('.wanchengzhuangtai option[value="001"]').prop('selected', 'selected').siblings('option').removeProp('selected');
                                            $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();
                                            $('.task_step_list_m button[data-bb-handler="success"]').hide();
                                            $('textarea[name="gznr"]').prop('disabled', 'disabled').css({
                                                'cursor': 'not-allowed'
                                            });
                                            $('select[name="blzt"]').prop('disabled', 'disabled').css({
                                                'cursor': 'not-allowed'
                                            });
                                        } else {
                                            sessionStorage.setItem('sfksc', true);
                                            $('#tsakupLoadM', '#detailStepView_m').off('click').click(function() {
                                                openModal1('上传附件', configMap.path + '/taskcenter/taskmanagement/addTaskFileM.jsp?rwid=' + encodeURI(rwid) + '&bzid=' + encodeURI(bzid) + '&jlid=' + $("#jlid_id").val(), 'edit');
                                            });
                                            $('.wanchengzhuangtai option[value="006"]').prop('selected ', 'selected').siblings('option').removeProp('selected');
                                            $('button[data-bb-handler="cancel"]', '.task_step_list_m ').hide();
                                            $('.task_step_list_m button[data-bb-handler="success"]').show();
                                            $('textarea[name="gznr"]').removeProp('disabled').css({
                                                'cursor': 'default'
                                            });
                                            $('select[name="blzt"]').removeProp('disabled').css({
                                                'cursor': 'text'
                                            });
                                        }
                                    } catch (e) {
                                        $('#tsakupLoadM', '#detailStepView_m').off('click').click(function() {
                                            openModal1('上传附件', configMap.path + '/taskcenter/taskmanagement/addTaskFileM.jsp?rwid=' + encodeURI(rwid) + '&bzid=' + encodeURI(bzid) + '&jlid=' + $("#jlid_id").val(), 'edit');
                                        });
                                        $('.wanchengzhuangtai option[value="006"]').prop('selected ', 'selected').siblings('option').removeProp('selected');
                                        $('button[data-bb-handler="cancel"]', '.task_step_list_m ').hide();
                                        $('textarea[name="gznr"]').removeProp('disabled').css({
                                            'cursor': 'default'
                                        });
                                        $('select[name="blzt"]').removeProp('disabled').css({
                                            'cursor': 'text'
                                        });
                                    }
                                }
                                if (d.lcbzxx.lcbzjbxx.cxbxbz == 1) {
                                    $('#chuanbingsign').val('该步骤与下一步是并行');
                                    try {
                                        if (d.rwbzxx.rwbzjbxx.blzt == '001') {
                                            sessionStorage.setItem('sfksc', false);
                                            $('#tsakupLoadM', '#detailStepView_m').off('click');
                                            $('.wanchengzhuangtai option[value="001"]').prop('selected', 'selected').siblings('option').removeProp('selected');
                                            $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();
                                            $('.task_step_list_m button[data-bb-handler="success"]').hide();
                                            $('textarea[name="gznr"]').prop('disabled', 'disabled').css({
                                                'cursor': 'not-allowed'
                                            });
                                            $('select[name="blzt"]').prop('disabled', 'disabled').css({
                                                'cursor': 'not-allowed'
                                            });
                                        } else {
                                            sessionStorage.setItem('sfksc', true);
                                            $('#tsakupLoadM', '#detailStepView_m').off('click').click(function() {
                                                openModal1('上传附件', configMap.path + '/taskcenter/taskmanagement/addTaskFileM.jsp?rwid=' + encodeURI(rwid) + '&bzid=' + encodeURI(bzid) + '&jlid=' + $("#jlid_id").val(), 'edit');
                                            });
                                            $('.wanchengzhuangtai option[value="006"]').prop('selected', 'selected').siblings('option').removeProp('selected');
                                            $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();
                                            $('.task_step_list_m button[data-bb-handler="success"]').show();
                                            $('textarea[name="gznr"]').removeProp('disabled').css({
                                                'cursor': 'default'
                                            });
                                            $('select[name="blzt"]').removeProp('disabled').css({
                                                'cursor': 'text'
                                            });
                                        }
                                    } catch (e) {
                                        $('#tsakupLoadM', '#detailStepView_m').off('click').click(function() {
                                            openModal1('上传附件', configMap.path + '/taskcenter/taskmanagement/addTaskFileM.jsp?rwid=' + encodeURI(rwid) + '&bzid=' + encodeURI(bzid) + '&jlid=' + $("#jlid_id").val(), 'edit');
                                        });
                                        $('.wanchengzhuangtai option[value="006"]').prop('selected', 'selected').siblings('option').removeProp('selected');
                                        $('button[data-bb-handler="cancel"]', '.task_step_list_m ').show();
                                        $('textarea[name="gznr"]').removeProp('disabled').css({
                                            'cursor': 'default'
                                        });
                                        $('select[name="blzt"]').removeProp('disabled').css({
                                            'cursor': 'text'
                                        });
                                    }
                                }
                            }

                            try {
                                d.rwbzxx.gzjlxx = d.rwbzxx.gzjlxx.reverse();
                            } catch (e) {
                                return;
                            }

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
                                    ' <p class="pull-left borderRadius4" style="position: relative"><i class="glyphicon glyphicon-triangle-left"></i><i class="glyphicon glyphicon-triangle-left"></i>' + '<span><span>'+ d.rwbzxx.gzjlxx[p].gzjljbxx.lrrmc+'</span><span>'+ d.rwbzxx.gzjlxx[p].gzjljbxx.blztmc+'，</span>' + d.rwbzxx.gzjlxx[p].gzjljbxx.gznr + '</span>' + '<span>' + a_fj_html + '</span>' + '<strong data-bzh="' + (initstepnum - 2) + '"  data-jlid="' + d.rwbzxx.gzjlxx[p].gzjljbxx.jlid + '" class="taskInfoClose-m" data-bzid="' + d.lcbzxx.lcbzjbxx.bzid + '" data-rwid="' + d.rwbzxx.rwbzjbxx.rwid + '"  style="position: absolute;top: 0; right: 5px;cursor: pointer;">X</strong>' +
                                    '</p>' +
                                    '</li>'
                                ).appendTo($(' #detailStepView_m  .area1>.row4>ul'));

                            }
                            //   处理下边时间轴的样式
                            $(' #detailStepView_m  .area1>.row4>ul>li>p:last-child').each(function() {
                                $(this).prev('p').height($(this).height() + 45);
                                var a = new Date($(this).parent('p').siblings('.pFirst').text());
                            });
                        });
                    }
                    requestbf(idR, initstepnum - 2);


                    //**有任务内容直接展示**
                    //上传文件的点击事件
                    $('#tsakupLoadM', '#detailStepView_m').off('click').click(function() {
                        openModal1('上传附件', configMap.path + '/taskcenter/taskmanagement/addTaskFileM.jsp?rwid=' + encodeURI(rwid) + '&bzid=' + encodeURI(bzid) + '&jlid=' + $("#jlid_id").val(), 'edit');
                    });
                    $('.area0', '#detailStepView_m').hide();
                    $('.area1', '#detailStepView_m').show();
                    var b = initstepnum - 2;
                    // $('button[data-bb-handler="cancel"]','.task_step_list_m ').prop('disabled','disabled');
                    var requestbf = function(i, j) {
                        $.get('/systemmanager/rwgljbxx/getbzxx/' + i + '/' + j, function(d) {
                            $('.task_step_list_m .modal-header h4').html(d.lcbzxx.lcbzjbxx.bzmc);
                            bzid = d.lcbzxx.lcbzjbxx.bzid;
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
                    switch (b) {
                        case 1:
                            requestbf(idR, b);
                            break;
                        case 2:
                            requestbf(idR, b);
                            break;
                        case 3:
                            requestbf(idR, b);
                            break;
                        case 4:
                            requestbf(idR, b);
                            break;
                        case 5:
                            requestbf(idR, b);
                            break;
                        case 6:
                            requestbf(idR, b);
                            break;
                        case 7:
                            requestbf(idR, b);
                            break;
                        case 8:
                            requestbf(idR, b);
                            break;
                        case 9:
                            requestbf(idR, b);
                            break;
                        default:
                            requestbf(idR, b);
                    }

                }
                //
                // $.get('/systemmanager/rwgljbxx/jbxx/rwjbxx/' + idR, function(d) {
                //
                //
                // });


                if (initstepnum == allstep + 2) {
                    $('button[data-bb-handler="cancel"]', '.task_step_list_m ').html('<i class="' + 'fa fa-times  iconMr' + '"></i>关闭');
                }

                if (initstepnum != allstep + 3) {
                    return false;
                } else {
                    initstepnum = 2;

                }
            }
        }

        $.get(url, function(html) {
            jqueryMap.$productDialog = bootbox.dialog({
                className: "task_step_list_m",
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    //打开详情的模态框
    var detailView = function() {
        var el = $(this);
        var rowIndex = configMap.taskmanagementGrid.cell(el.parent()).index().row;
        var id = configMap.taskmanagementGrid.row(rowIndex).data().rwid;
        var khmc = configMap.taskmanagementGrid.row(rowIndex).data().khmc;
        var htbh1 =configMap.taskmanagementGrid.row(rowIndex).data().htbh;
        var khbm =configMap.taskmanagementGrid.row(rowIndex).data().khbm;
        var yxkhbm =configMap.taskmanagementGrid.row(rowIndex).data().yxkhbm;
        sessionStorage.setItem('aboutTaskId_dh',id);
        sessionStorage.setItem('taskMkhbm',khbm);
        sessionStorage.setItem('taskMyxkhbm',yxkhbm);
        localStorage.setItem('htbhSign',htbh1);
        localStorage.setItem('khmcM', khmc);
        initstepnum = 2;
        bzid = null;
        rwid = id;
        $.get('/systemmanager/rwgljbxx/jbxx/rwjbxx/' + id, function(d) {
            allstep = d.data.rwjbxx.lcbz;
        });
        openModal('基本信息-' + khmc, configMap.path + '/taskcenter/taskmanagement/taskDtail.jsp?id=' + encodeURI(id), 'edit');
    }

    //编辑任务模态框
    var edittaskView = function() {
        sessionStorage.setItem('deltag',0);
        var el = $(this);
        var rowIndex = configMap.taskmanagementGrid.cell(el.parent()).index().row;
        var id = configMap.taskmanagementGrid.row(rowIndex).data().rwid;
        var khmc = configMap.taskmanagementGrid.row(rowIndex).data().khmc;
        var khbm = configMap.taskmanagementGrid.row(rowIndex).data().khbm;
        localStorage.setItem('khmcM', khmc);
        localStorage.setItem("cjrw_gsbsdm",khbm);
        openModalEdit('基本信息-' + khmc, configMap.path + '/businesscooperate/allotTask.jsp?id=' + encodeURI(id), 'edit');
    }

    //打开垫付的模态框
    var advanceView = function() {
        var el = $(this);
        var rowIndex = configMap.taskmanagementGrid.cell(el.parent()).index().row;
        var id = configMap.taskmanagementGrid.row(rowIndex).data().rwid;
        window.localStorage.setItem('rwid', id);
        window.localStorage.setItem('bz', 1);
        openModal2('垫付', configMap.path + '/taskcenter/taskmanagement/advanceView.jsp', 'edit');
    }


    //删除产品
    var deltaskmanagement = function(event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });

        var rowIndex = configMap.taskmanagementGrid.cell(element.parent()).index().row;
        var id = configMap.taskmanagementGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/" + id,
            type: 'DELETE',
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    inittaskmanagementData();
                    Messenger().post("删除成功!");
                } else {
                    Messenger().post({
                        message: result.message,
                        type: 'error'
                    });
                }
            },
            error: function() {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    //选择负责人,并打开模态框
    var openModalFzr = function (title, url, type) {
        var dialogButtons = {};

        if (type === 'edit') {
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
                    var str3 =strArr2.join(',');
                    var str1 = strArr.join(' ,');
                    var str2 = strArr1.join(',');
                    $('#fzrmc_sl').html(str1);
                    $('#fzrmc_sl').attr('fzrmc',str2);
                    $('#fzrmc_sl').attr('title',str1);
                    $('#fzrmc_sl').attr('rtx',str3);
                }
            };
        };

        if (type === 'zxedit') {
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
                    var str3 =strArr2.join(',');
                    var str1 = strArr.join(' ,');
                    var str2 = strArr1.join(',');
                    $('#zxrmc_sl').html(str1);
                    $('#zxrmc_sl').attr('zxrmc',str2);
                    $('#zxrmc_sl').attr('title',str1);
                    $('#zxrmc_sl').attr('rtx',str3);
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };

        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className: 'allotTask_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    }



    $('#fzrmc_sl',jqueryMap.$container).click(function(){
        sessionStorage.setItem('deltag',1);
        openModalFzr('选择负责人',configMap.path + '/businesscooperate/staffList.jsp?type=any','edit');
    });

    $('#zxrmc_sl',jqueryMap.$container).click(function(){
        sessionStorage.setItem('deltag',1);
        openModalFzr('选择执行人',configMap.path + '/businesscooperate/staffList.jsp?type=any','zxedit');
    });


    //初始化表，放入数据
    var dataJson1 = '';
    var inittaskmanagementGrid = function() {
        configMap.taskmanagementGrid = $('#taskManagerList_m', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + '/rwgljbxx/jbxx/rwlb/',
                "dataSrc": "aaData",
                "data": function(data) {

                    //    开始的时间
                    var sT = $('input[name="starDate"]', '#task-manager-container').val();
                    //    结束的时间
                    var eT = $('input[name="endDate"]', '#task-manager-container').val();
                    //    部门代码
                    var bmdm = $('#workorderstatus', '#task-manager-container').attr('data-code');
                    //    类型代码
                    var type = $('[name="type"]', jqueryMap.$container).val();
                    var rwmc = $('[name="rwmc"]', jqueryMap.$container).val();
                    var jjcd = $('#cx_jjcd_id', jqueryMap.$container).val();
                    var dqzt = $('#cx_dqzt_id', jqueryMap.$container).val();
                    var blzt = $('#blzt_id', jqueryMap.$container).val();
                    var sfxmdm = $('#sfxm', jqueryMap.$container).val();
                    var khbm = configMap.khbm;
                    var fzrmc = $('#fzrmc_sl', jqueryMap.$container).attr('fzrmc');
                    var zxrmc = $('#zxrmc_sl', jqueryMap.$container).attr('zxrmc');



                    if ($('#moreSearch').css('display')=='none'){
                        // $('#fzrmc_sl', jqueryMap.$container).attr('fzrmc','');
                        sT = "";
                        //    结束的时间
                        eT = "";
                        //    部门代码
                        bmdm = "0";

                        dqzt="0";
                        //    类型代码
                        //  type = "3";
                        rwmc = $('[name="rwmc"]', jqueryMap.$container).val();
                        jjcd ="0";
                        blzt = $('#blzt_id', jqueryMap.$container).val();
                        khbm = configMap.khbm;
                        fzrmc = '';
                        zxrmc = '';
                        sfxmdm='';
                    }

                    if((configMap.rwid!=null)&&(configMap.rwid!="")&&(configMap.rwid!="null")){
                        data.blzt=blzt;
                        data.jjcd = jjcd;
                        data.rwid=configMap.rwid;
                    }else{
                        data.kssj = sT;
                        data.jssj = eT;
                        data.bmdm = bmdm;
                        data.type = type;
                        data.rwmc = rwmc;
                        // data.khbm = configMap.khbm;
                        data.jjcd = jjcd;
                        data.blzt = blzt;
                        data.rwid = configMap.rwid;
                        data.khbm = khbm;
                        data.fzrmc= fzrmc;
                        data.zxrmc = zxrmc
                        data.sjly=configMap.sjly;
                        data.sjhm=configMap.sjhm;
                        data.sfxmdm=sfxmdm;
                        data.dqzt=dqzt;
                    }



                }
            },
            "columns": [

                //     {
                //     "data": "rwid",
                //     render: function(data, type, row) {
                //         return '<input class="taskInput"  type="checkbox">';
                //     }
                // },
                {
                    "data": "rwid",
                    render:function(d,t,r){
                        var tag='',tip='';
                       if(r.htbh){
                           tag='<i class="fa fa-check-circle" style="font-size: 18px;margin-right: 5px;color:#9BC68E"></i>'
                       }else{
                           tag='<i class="fa fa-exclamation-circle" style="font-size: 18px;margin-right: 5px;color: #CC6F82;cursor: pointer"data-toggle="tooltip" title="暂无合同"></i>';
                           tip='&nbsp;&nbsp;&nbsp;暂无合同';
                       }
                        return tag+'<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+tip+'">'+d+'</span>';
                    }
                }, {
                    data: 'khmc',
                    render:function(data,type,row){
                        return '<span style="cursor: pointer;" id="" data-toggle="tooltip" data-placement="top" title="'+row.khmc +'" >'+row.khmc+'</span>';
                    }

                },
                {
                    "data": "rwmc",
                    render:function (data,type,row) {
                        return '<span style="cursor: pointer;" id="" data-toggle="tooltip" data-placement="top" title="'+row.rwmc +'" >'+row.rwmc+'</span>';
                    }


                },
                {
                    "data": "sfxmmc",
                    render:function (data,type,row) {
                        if(data==null)data='';
                        return '<span style="cursor: pointer;" id="" data-toggle="tooltip" data-placement="top" title="'+data +'" >'+data+'</span>';
                    }


                }, {
                    "data": "blztmc",
                    "render": function(data, type, row) {
                        if (row.blzt == '001') {
                            // return '已完成';
                            return '<a style="cursor: pointer;" class="finishStation_m"  data-toggle="tooltip" data-placement="top" title="'+'已完成' +'" >'+"已完成"+'</a>'
                        }
                        // return "第"+row.dqbz+"步"+data;
                        return '<a style="cursor: pointer;" class="finishStation_m"  data-toggle="tooltip" data-placement="top" title="'+row.dqbzmc +'" >'+row.dqbzmc+'</a>';
                    }
                }, {
                    className: 'text-center',
                    "data": "kssj",
                    "render": function(data, type, row) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                }, {
                    className: 'text-center',
                    data: 'jssj',
                    "render": function(data, type, row) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                }, {
                    data: 'syts',
                    className: 'text-center',
                    render: function(d, t, r) {
                        if (r.blzt == '001') {
                            return '0';
                        }
                        if (d >= 0) {
                            return d;
                        } else {
                            return '<span style="color: red">' + d + '</span>'
                        }
                    }

                }, {
                    className: 'text-center',
                    "data": "lrrq",
                    "render": function(data, type, row) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                }, {
                    data: 'fzrMc',
                    className: 'text-center'
                },
                {

                    className: "text-center",
                    "render": function(data, type, row) {
                        //可删除
                        var btn = '';
                        if ($('#taskFollow').length > 0) { //有跟进按钮
                            btn = btn + configMap.detailBtn_html;
                        } else {
                            btn = btn + configMap.detailBtn_html_disabled;
                        }

                        btn = btn + configMap.viewBtn_html;//编辑

                        if (!row.htbh) {//合同
                            btn = btn + configMap.contract_html_disabled;
                        } else {
                            btn = btn + configMap.contract_html;
                        }

                        if ($('#taskSpot').length > 0) { //有垫付按钮
                            btn = btn + configMap.advanceBtn_html;
                        } else {
                            btn = btn + configMap.advanceBtn_html_disabled;
                        }
                        if ((row.blzt == "006") || row.blzt == "003") {
                            //未开始 已取消  可删除
                            btn = btn + configMap.deleteBtn_html;
                        } else {
                            if ($('#taskDel').length > 0) { //删除
                                btn = btn + configMap.deleteBtn_html;
                            } else {
                                btn = btn + configMap.deleteBtn_html_disabled;
                            }
                        }
                        return btn;
                    }

                }],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function() { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var detailContainer = $('[data-type="detail"]', jqueryMap.$container);
                var receiveContainer = $('[data-type="receive"]', jqueryMap.$container);
                var advanceContainer = $('[data-type="advance"]', jqueryMap.$container);
                var delContainer = $('[data-type="del"]', jqueryMap.$container);
                var contractContainer = $('[data-type="contract"]', jqueryMap.$container);
                var editContainer = $('[data-type="edit"]', jqueryMap.$container);

                $('[data-toggle="tooltip"]').tooltip();


                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if(contractContainer.length>0){
                    contractContainer.off('click').on('click', function(){
                        var el = $(this);
                        var rowIndex = configMap.taskmanagementGrid.cell(el.parent()).index().row;
                        var id = configMap.taskmanagementGrid.row(rowIndex).data().htbh;
                        openModal2("查看合同信息——"+id, "/customermanage/contract/view.jsp?id=" + encodeURI(id), 'view');
                    });
                }
                if (detailContainer.length > 0) {
                    detailContainer.off('click').on('click', detailView);
                }
                if (advanceContainer.length > 0) {
                    advanceContainer.off('click').on('click', advanceView);
                }


                if (editContainer.length > 0) {
                    //编辑任务
                    editContainer.off('click').on('click', edittaskView);
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delTaskF,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }

                // if (delContainer.length > 0) {
                // 	delContainer.confirmation({
                // 		"title": '确定要删除？',
                // 		"btnOkLabel": '是',
                // 		"btnCancelLabel": '否',
                // 		"placement": 'left',
                // 		"onConfirm": deltaskmanagement,
                //        'btnOkClass':"btn btn-danger borderRadius4",
                // 		"btnCancelClass":"btn btn-default borderRadius4"
                // 	});
                // }
                //
                // if (viewContainer.length > 0) {
                // 	viewContainer.off('click').on('click', viewtaskmanagement);
                // }

                //批量删除
                var dataJson = [];
                $('#task_all_s', jqueryMap.$container).off('click').click(function() {
                    dataJson = [];
                    if ($(this).is(':checked')) {
                        jqueryMap.$container.find('input.taskInput').each(function() {
                            $(this).prop('checked', 'checked');
                            var rowIndex = configMap.taskmanagementGrid.cell($(this).parent()).index().row;
                            var id = configMap.taskmanagementGrid.row(rowIndex).data().rwid;
                            dataJson.push(id);
                        });
                    } else {
                        jqueryMap.$container.find('input.taskInput').each(function() {
                            $(this).removeProp('checked');
                        })
                    }
                    dataJson1 = dataJson.join('&rwid=');
                });

                //   复合选择删除的获取rwid
                jqueryMap.$container.find('input.taskInput').click(function() {
                    var rowIndex = configMap.taskmanagementGrid.cell($(this).parent()).index().row;
                    var id = configMap.taskmanagementGrid.row(rowIndex).data().rwid;
                    if ($(this).is(':checked')) {
                        dataJson.push(id);
                    } else {
                        dataJson.pop(id);
                    }

                    dataJson1 = dataJson.join('&rwid=');
                });

                //跳转过来的
                //configMap.rwid='';
                //configMap.blzt='000';

            }
        });
    }


    //批量删除的
    var totalDel = function() {
        $.ajax({
            url: '/systemmanager/rwgljbxx/jbxx/delXz?rwid=' + dataJson1,
            type: 'DELETE',
            success: function(d) {
                if (d.success) {
                    Messenger().post({
                        message: "删除成功!",
                        type: 'warning'
                    });
                    configMap.taskmanagementGrid.ajax.reload();
                }

            }
        });
        dataJson1 = '';
        $('#task_all_s', jqueryMap.$container).removeProp('checked');

    }

    //根据日期和部门查询的函数
    var searchTermMdw = function() {
        configMap.taskmanagementGrid.ajax.reload();
        return;
        //    开始的时间
        var sT = $('input[name="starDate"]', '#task-manager-container').val();
        //    结束的时间
        var eT = $('input[name="endDate"]', '#task-manager-container').val();
        //    部门代码
        var bmdm = $('#workorderstatus', '#task-manager-container').attr('data-code');
        //客户编码
        var khbm = configMap.khbm;
        var fzrmc = $('#fzrmc_sl').attr('fzrmc');
        var zxrmc = $('#zxrmc_sl').attr('zxrmc');
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在查询，请稍候...'
        });
        $.ajax({
            url: configMap.path + '/rwgljbxx/jbxx/rwlb/?' + 'kssj=' + sT + '&jssj=' + eT + '&bmdm=' + bmdm + "&khbm=" + khbm + '&fzrmc=' + fzrmc + '&zxrmc=' + zxrmc,
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.taskmanagementGrid.clear().draw();
                    Messenger().post("查询成功!");
                    configMap.taskmanagementGrid.rows.add(result.data).draw();
                } else {
                    Messenger().post({
                        message: result.message,
                        type: 'error'
                    });
                }
            },
            error: function() {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    }


    var allotTaskOperate = function() {
        clearRWlocalstore();
        var khbsmc = $("#khmc_id").val();
        var khbsdm = $("#khbm_id").val();
        var sjhm = $("#sjhm_id").val();
        window.localStorage.setItem("cjrw_from", 3); //来源
        window.localStorage.setItem("cjrw_khsjhm", sjhm); //手机号码
        window.localStorage.setItem("cjrw_gsbsmc", khbsmc); //客户标识名称
        window.localStorage.setItem("cjrw_gsbsdm", khbsdm); //客户标识代码
        sessionStorage.setItem("khmbsmc", khbsmc);
        var title = "添加任务";
        if (khbsmc != '') {
            title += "-" + khbsmc;
        }
        openModal12(title, configMap.path + configMap.allotTaskUrl, 'edit');
    }
    /**
     * 获取当前代理机构的收费项目
     */
    var getSFXM = function (){
        $.ajax({
            url: '/customermanage/'+ configMap.SFXMUrl,
            dataType: 'JSON',
            type: 'GET',
            success: function (d) {
                if (d.length > 0) {
                    for (var i = 0; i < d.length; i++) {
                        $('<option value="' + d[i].serviceCode + '">' + d[i].serviceName + '</option>').appendTo($('#sfxm', '#task-manager-container'));
                    }
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    $('#searchTerm-m', '#task-manager-container').on('click', searchTermMdw);
    //批量删除任务
    $('#delBatch').on('click', 'button', totalDel);




    //发起人部门的树
    var initOrganization = function () {
        $('#taskTreecontainer').jstree({
            'core': {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': {
                    'url':'/organization/organization/getDLOrg'
                }
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            'plugins': ["types","search"],
//	      "expand": {
//	        level: 2
//	      }
        });

        var to = false;
        $('#searchDepartment').keyup(function () {
            if(to) { clearTimeout(to); }
            to = setTimeout(function () {
                var v = $('#searchDepartment').val();
                $('#taskTreecontainer').jstree(true).search(v);
            }, 250);
        });

        $('#taskTreecontainer').bind("activate_node.jstree", function(obj, e) {
            $('#workorderstatus', '#task-manager-container')
                .val(e.node.text)
                .attr('data-code',e.node.id);
            $('#taskTreecontainer ,#searchDepartment,#taskDepartmentDel', '#task-manager-container').css('display','none');
        });

    }

    $('#taskDepartmentDel', '#task-manager-container').click(function(){
        $('#workorderstatus', '#task-manager-container')
            .val('全 部')
            .attr('data-code','0');
        $('#taskTreecontainer ,#searchDepartment,#taskDepartmentDel', '#task-manager-container').css('display','none');
    });

    //导出
    var exportExcel = function () {
        stopContinueClick('#task-manager-container [name="exportExcel"]', 300);
        var sT = $('input[name="starDate"]', '#task-manager-container').val();
        var eT = $('input[name="endDate"]', '#task-manager-container').val();
        var bmdm = $('#workorderstatus', '#task-manager-container').attr('data-code');
        var type = $('[name="type"]', jqueryMap.$container).val();
        var rwmc = $('[name="rwmc"]', jqueryMap.$container).val();
        var jjcd = $('#cx_jjcd_id', jqueryMap.$container).val();
        var blzt = $('#blzt_id', jqueryMap.$container).val();
        var fzrmc = $('#fzrmc_sl', jqueryMap.$container).attr('fzrmc');
        var zxrmc = $('#zxrmc_sl', jqueryMap.$container).attr('zxrmc');
        var sfxmdm = $('#sfxm', jqueryMap.$container).val();
        var dqzt = $('#cx_dqzt_id', jqueryMap.$container).val();
        if ($('#moreSearch').css('display')=='none'){
            sT = "";
            eT = "";
            sfxmdm='';
            bmdm = "0";
            fzrmc = '';
            zxrmc = '';
            jjcd ="0";
            dqzt = "0";
        }
        window.location.href = configMap.path + "/rwgljbxx/downDataExcel?sjq=" + sT + "&sjz=" + eT + "&fqbm="
            + bmdm + "&khbm=" + configMap.khbm + "&type=" + type + "&rwmc=" + rwmc + "&jjcd=" + jjcd + "&blzt=" + blzt +
            "&rwid=" + configMap.rwid + "&fzr=" + fzrmc + "&zxr=" + zxrmc + "&sjly=" + configMap.sjly + "&sjhm="
            + configMap.sjhm + "&sfxmdm=" + sfxmdm + "&dqzt=" + dqzt;

        // window.location.href = configMap.path + "/rwgljbxx/downDataExcel?rwmc=" + rwmc + "&type=" + type + "&blzt=" +
        //     blzt + "&sjq=" + sT + "&sjz=" + eT + "&fqbm=" + bmdm + "&fzr=" + fzrmc + "&zxr=" + zxrmc + "&jjcd=" + jjcd +
        //     "&khbm=" + khbm + "&rwid=" + rwid+"&sjly="+configMap.sjly+"&sjhm="+configMap.sjhm;
        // var rwmc = $('#task-manager-container [name="rwmc"]').val();
        // var type = $('[name="type"]', '#task-manager-container').val();
        // var blzt = $('#blzt_id', '#task-manager-container').val();
        // var sjq = $('input[name="starDate"]', '#task-manager-container').val();
        // var sjz = $('input[name="endDate"]', '#task-manager-container').val();
        // var fqbm = $('[name="workorderstatus"]').attr('data-code');
        // var fzr = $('#fzrmc_sl').attr('fzrmc');
        // var jjcd = $('[name="cx_jjcd_name"]').val();
        // var khbm = configMap.khbm;
        // var rwid = configMap.rwid;
    }

    return {
        init: function(khbm, rwid, blzt,sjly,sjhm) {
            sessionStorage.removeItem("fj_fjid");
            configMap.khbm = khbm;
            configMap.rwid = rwid;
            configMap.blzt = blzt;
            configMap.sjly=sjly;
            configMap.sjhm=sjhm;
            $('#workorderstatus', '#task-manager-container').focus(function(){
                $('#taskTreecontainer ,#searchDepartment,#taskDepartmentDel', '#task-manager-container').css('display','block');
            });
            initOrganization();
            //选择部门的填充
            // $.ajax({
            //     url: "/systemmanager/rwgljbxx/getbmxx",
            //     async: false,
            //     success: function(d) {
            //         $('<option value="' + '0' + '">' + '全部' + '</option>').appendTo($('#workorderstatus', '#task-manager-container'));
            //         for (var i = 0; i < d.length; i++) {
            //             $('<option value="' + d[i].code + '">' + d[i].name + '</option>').appendTo($('#workorderstatus', '#task-manager-container'));
            //         }
            //     }
            // });

            setJqueryMap();
            // var tabid=$('#task-manager-container_'+uuid).parents('.tab-pane').attr('id').slice(17);
            // tabMenu(tabid,taskmanagement);

            //选中办理状态
            if (blzt != 'null') {
                $("#blzt_id").val(blzt);
            }

            if (configMap.path == "") {
                configMap.path = "/systemmanager";
            }
            inittaskmanagementGrid();

            //inittaskmanagementData();
            jqueryMap.$container.find('.beginTime_m').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });
            jqueryMap.$container.find('.endTime_m').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
            });


            $("#addrw_id").off("click").on("click", function() {
                //添加任务
                allotTaskOperate();
            })

            if((configMap.rwid!=null)&&(configMap.rwid!="")&&(configMap.rwid!="null")){
                $(".table-toolbar").hide();
            }else{
                $(".table-toolbar").show();
            }

            //导出
            $('#task-manager-container [name="exportExcel"]').off('click').on('click', function () {
                exportExcel();
            });

            if($("#addrw_id")){
                $("#addrw_id").click();
            }
            getSFXM();

        //    查看完成状态
            $('#task-manager-container').on('click','.finishStation_m',function (){
                var el = $(this);
                var rowIndex = configMap.taskmanagementGrid.cell(el.parent()).index().row;
                var rwid = configMap.taskmanagementGrid.row(rowIndex).data().rwid;
               $.post('/systemmanager/rwgljbxx/rwbzxx?rwid='+rwid,function (result){
                   if(result) {
                       $.get(configMap.path + '/taskcenter/taskmanagement/HandlingProgress.jsp', function (html) {

                           var myDialog = bootbox.dialog({
                               title: '办理进度',
                               message: html
                           });
                           $('#HandlingProgress_mdw .taskName').html(result.jbxx.rwmc);
                           $('#HandlingProgress_mdw .yujichaoqiTitle .yjjssj').html(result.jbxx.yjjssj);
                           if (result.jbxx.ycqts<=0){
                               $('#HandlingProgress_mdw span[class="borderRadius4 ml yjcqStyle"]').addClass('hide');
                           }else{
                               $('#HandlingProgress_mdw span[class="borderRadius4 ml yjcqStyle"]').removeClass('hide');
                               $('#HandlingProgress_mdw .yujichaoqiTitle .ycqts').html(result.jbxx.ycqts);
                           }

                           $.each(result.bzxx.reverse(),function(i,v){
                               var  station = '',station1='';

                               if(v.blzt=='未开始'){
                                   station = 'bCcc';
                               }else{
                                   station = '';
                               }
                               if(v.blzt=='已完成'){
                                   station1 = ' fa fa-check yiwancheng';
                               }else{
                                   station1 = '';
                               }


                               $('<div class="col-xs-12 info">'+
                                   '<div>'+
                                   '<i class="xuhao '+station+station1+'">'+(result.bzxx.length - i)
                                   +'</i>'+
                                   '<div class="line '+station+'"></div>'+
                                   '</div>'+
                                   '<div>'+
                                   v.bzmc+
                                   '</div>'+
                                   '<div>'+
                                   v.blzt+
                                   '</div>'+
                                   '<div>'+
                                   v.blry+
                                   '</div>'+
                                   '<div>'+
                                   v.blrq.split(' ')[0]+
                                   '</div>'+
                                   '</div>').insertAfter($('#HandlingProgress_mdw .yujichaoqiTitle'));
                           })

                           $('#HandlingProgress_mdw .yiwancheng').empty();

                       })
                   }

               })


            })





        },
        setPath: function(path) {
            configMap.path = path;
        },
        getURL: function(plate, filename, id) {
            var data = {
                plate: plate,
                id: id
            }
            //获取文件真实路径,下载
            $.ajax({
                url: configMap.path + jqueryMap.fileUrl,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function(result) {
                    //    				window.open(result.url);
                    //    				$('[name="downloadfile"]').attr("href",result.url);
                    var name = filename.replace("." + filename.split(".")[filename.split(".").length - 1], "");
                    var a = $("<a></a>").attr("href", result.url).attr("download", name).attr("target", "_blank").appendTo("body");
                    a[0].click();
                    a.remove();
                },
            });
        },
    };
}();
//@ sourceURL=product.js