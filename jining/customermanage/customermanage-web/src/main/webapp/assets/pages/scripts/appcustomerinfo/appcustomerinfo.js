var appcustomerinfo = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',//
        dataUrl: '/appcustomerinfo/appcustomerinfo',//Controller类中的 @RequestMapping路径/方法名上方的@RequestMapping(value = "????", method = RequestMethod.GET)
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        appcustomerinfoGrid: null,
        viewPageUrl: '/mybusiness/viewappcustomerinfo.jsp',
        // addPageUrl:'/mybusiness/addappcustomerinfo.jsp',
        addPageUrl:'/mybusiness/addappcustomerinfo1.jsp',
        editUrl: '/customermanage/customerManage/edit.jsp',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看详情"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewBtn_html_disabled: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default"   data-toggle="tooltip" title="查看详情"><i style="color: #666 !important" class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        eidtBtn_html_disable:'<button disabled="disabled" href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="跟进意向客户" style="background: none;"><i style="color: #666 !important" class="icon iconfont icon-genjin iconFontColor-10a0f7 iconFontSize"></i></button>',
        eidtBtn_html:'<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="跟进意向客户"><i  class="icon iconfont icon-genjin iconFontColor-10a0f7 iconFontSize"></i></a>',
        delBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除意向客户"><i class="icon iconfont icon-shanchu3  iconFontColor-10a0f7 iconFontSize"></i></a>',
        delBtn_html_disabled: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default"   data-toggle="tooltip" title="删除意向客户"><i style="color: #666 !important" class="icon iconfont icon-shanchu3  iconFontColor-10a0f7 iconFontSize"></i></a>',

        conformBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="conform" data-toggle="tooltip" title="确认后，客户信息将同步到【客户管理】-【客户列表】。"><i class="icon iconfont icon-queren  iconFontColor-10a0f7 iconFontSize"></i></a>',
        conformBtn_html_disabled: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default"   data-toggle="tooltip" title="确认后，客户信息将同步到【客户管理】-【客户列表】。"><i style="color: #666 !important" class="icon iconfont icon-queren  iconFontColor-10a0f7 iconFontSize"></i></a>',

        allotTaskUrl:'/businesscooperate/allotTask.jsp',
        allotTaskBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="allot" data-toggle="tooltip" title="分配任务"><i class="icon iconfont icon-fenpeirenwu iconFontColor-10a0f7 iconFontSize"></i></a>',
        allotTaskBtn_html_disabled: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default"  data-toggle="tooltip" title="分配任务"><i style="color: #666 !important" class="icon iconfont icon-fenpeirenwu iconFontColor-10a0f7 iconFontSize"></i></a>',

        task1_html: '<a href="javascript:;" class="btn btn-xs default" data-type="jumpTask" data-toggle="tooltip" title="历史任务"><i class="icon iconfont icon-lishirenwu  iconFontColor-10a0f7 iconFontSize"></i></a>',
        task1_html_disabled: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default"   data-toggle="tooltip" title="历史任务"><i style="color: #666 !important" class="icon iconfont icon-lishirenwu  iconFontColor-10a0f7 iconFontSize"></i></a>'

    };


    var allotTaskOperate = function(){
        var el = $(this);
        var rowIndex = configMap.appcustomerinfoGrid.cell(el.parent()).index().row;
        var id = configMap.appcustomerinfoGrid.row(rowIndex).data().id;
        var sjhm = configMap.appcustomerinfoGrid.row(rowIndex).data().dlzh;
        var khbm = configMap.appcustomerinfoGrid.row(rowIndex).data().khbm;
        var khmc = configMap.appcustomerinfoGrid.row(rowIndex).data().yhmc;
        var gsmc = configMap.appcustomerinfoGrid.row(rowIndex).data().gsmc;
        var yxkhbm = configMap.appcustomerinfoGrid.row(rowIndex).data().yxkhbm;
        clearRWlocalstore();
        window.localStorage.setItem("cjrw_from",2); //来源
        window.localStorage.setItem("cjrw_ywbs",id);//来源ID

        window.localStorage.setItem("cjrw_yxkhbm",yxkhbm);

        if((((gsmc+"")==""))||((gsmc+"")=="null")||((gsmc+"")==null)){
            khmc = khmc;
        }else{
            khmc = gsmc;
        }
        window.localStorage.setItem("cjrw_gsbsmc",khmc);//客户标识名称
        window.localStorage.setItem("cjrw_gsbsdm",khbm);//客户标识代码
        window.localStorage.setItem("cjrw_khsjhm",sjhm);//客户手机号码
        sessionStorage.setItem("khmbsmc",khmc);
        var title = "分配任务";
        if(khmc!=''){
            title+="-"+khmc;
        }
        openModal1(title, '/systemmanager' + configMap.allotTaskUrl , 'edit');
    }


    var openModal1 = function (title, url, type) {
        var dialogButtons = {};

        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="' + 'fa fa-save  iconMr' + '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    var obj_yxkhbm={},fzr = {}, fqr = {}, zxr = {}, rwid = {}, from = {}, ywbs = {},sjhm={};
                    fzr.name = 'FZR_DM';
                    fqr.name = 'FQR_DM';
                    zxr.name = 'ZXR_DM';
                    rwid.name = "rwid";
                    from.name = "cjrw_from";
                    ywbs.name = "cjrw_ywbs";
                    sjhm.name="sjhm";
                    obj_yxkhbm.name="yxkhbm";
                    var l_from = localStorage.getItem("cjrw_from");
                    var l_ywbs = localStorage.getItem("cjrw_ywbs");
                    var yxkhbm = localStorage.getItem("cjrw_yxkhbm");
                    obj_yxkhbm.value=yxkhbm;
                    from.value = l_from;
                    ywbs.value = l_ywbs;
                    sjhm.value=localStorage.getItem("cjrw_khsjhm");
                    fzr.value = $('#addFZR').attr('fzr_dm');
                    fqr.value = $('#addFQR').attr('fqr_dm');
                    zxr.value = $('#addZXR').attr('zxry_dm');
                    rwid.value = $("#rwid_id").val();
                    var arr = $('#allot-task-form').serializeArray();
                    if(arr[3].value==''||arr[3].value==null){
                        App.alert({
                            container: $('#allot-task-form').closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: '请添加流程！',
                            icon: 'fa fa-warning'
                        });
                        return false;
                    }
                    if (!($('input[name="rwmc"]','#allot-task-form').val())) {
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

                    var  startT = arr[6].value.split('-').join('');
                    //创建时间
                    var createT = arr[7].value.split('-').join('');
                    //结束时间
                    var endT = arr[8].value.split('-').join('');
                    if(endT-startT<0){
                        App.alert({
                            container: $('#allot-task-form').closest(".modal-body"),
                            place: 'prepend',
                            type: 'danger',
                            message: '结束时间不能小于开始时间！',
                            icon: 'fa fa-warning'
                        });
                        return false;
                    }

                    if(createT - startT>0){
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
                    arr.push(obj_yxkhbm);
                    $.post('/systemmanager/rwgljbxx/jbxx/saverwjbxx', arr, function (d) {
                        var rwid = $("#jlid_id").val();
                        var f_rwid = d.rwid;
                        if ("rwid" == rwid) {
                            $("#rwid_id").val(f_rwid);
                        } else {
                            $("#rwid_id").val("rwid");
                        }
                        initappcustomerinfoData();
                        welcome.refreshRW();
                        if(d.success){
                            Messenger().post("保存成功!");
                        }
                        else{
                            Messenger().post("保存失败!");
                        }
                    })
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="'+ 'fa fa-times  iconMr'+ '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 ',
            callback: function () {
                $("#rwid_id").val("rwid");
                $("#rwid_fj_id").val("rwid");
            }
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


    //单个删除
    var del = function (event, el) {
        var rowIndex = configMap.appcustomerinfoGrid.cell(el.closest('td')).index().row;
        var id = configMap.appcustomerinfoGrid.row(rowIndex).data().id;
        var customerjson = [];
        var temp = {id: id};
        customerjson.push(temp);
        var data = {
            customer: customerjson
        };
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除客户，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/del",
            type: 'PUT',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    findByTime();
                    Messenger().post({
                        message: '删除成功！'
                    });
                }
                else {
                    Messenger().post({
                        message: result.message,
                        type: 'error'
                    });
                }
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: '删除失败！',
                    type: 'error'
                });
            }
        });
    }


    //单个通过
    var confirm = function (event, el) {
        var rowIndex = configMap.appcustomerinfoGrid.cell(el.closest('td')).index().row;
        var id = configMap.appcustomerinfoGrid.row(rowIndex).data().id;
        var gsmc = configMap.appcustomerinfoGrid.row(rowIndex).data().gsmc;
        var nsrsbh = configMap.appcustomerinfoGrid.row(rowIndex).data().nsrsbh;

        if(((gsmc+'').trim()=='')||(gsmc=='null')||(gsmc==null)){
            Messenger().post({
                message: "公司名称不能为空!",
                type: 'error'
            });
            return;
        }
        if(((nsrsbh+'').trim()=='')||(nsrsbh=='null')||(nsrsbh==null)){
           /* Messenger().post({
                message: "纳税人识别号不能为空!",
                type: 'error'
            });*/
           var date=new Date();
           var year=date.getFullYear();
           var month=date.getMonth();
           var day= new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
           var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
           var  minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
           var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
           var current=year+month+day+hour+minute+second;
           nsrsbh="L"+current;

        }
        var customerjson = [];
        var temp = {id: id};
        customerjson.push(temp);
        var data = {
            customer: customerjson
        };
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在同步客户，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/confirm",
            type: 'PUT',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    findByTime();
                    Messenger().post({
                        message: '同步成功，请到【客户管理】——【客户列表】中完善客户信息。'
                    });
                }
                else {
                    Messenger().post({
                        message: result.message,
                        type: 'error'
                    });
                }
            },
            error: function () {
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: '同步失败！',
                    type: 'error'
                });
            }
        });
    }


    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $appcustomerinfoDialog: null
    };
    //赋值
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#appcustomerinfo-manager-container' + '_' + uuid);
        jqueryMap.$blockTarget = $('body');
    };
    //查看沟通反馈
    var viewappcustomerinfo = function () {
        var el = $(this);
        var rowIndex = configMap.appcustomerinfoGrid.cell(el.parent()).index().row;
        var id = configMap.appcustomerinfoGrid.row(rowIndex).data().id;
        var khdm = configMap.appcustomerinfoGrid.row(rowIndex).data().khbm;
        var gsmc = configMap.appcustomerinfoGrid.row(rowIndex).data().gsmc;
        //判断同步状态
        if(configMap.appcustomerinfoGrid.row(rowIndex).data().khzt == 0){
            openModal("意向客户信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
        }else{
            generateTab(this,configMap.editUrl + "?khdm=" + khdm + "&id=" + id+ "&type=yxkhxx", gsmc,"yxkhid",'fa fa-file-text-o iconMr');
        }
    };
    //初始化表
    var initappcustomerinfoData = function () {
        configMap.appcustomerinfoGrid.ajax.reload();
        return;
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.appcustomerinfoGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.appcustomerinfoGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };
    //模态框
    var openModal = function (title, url, type,sjzt) {
        var dialogButtons = {};
        if(type=="add"){
        	dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    //基本信息填写 $(".businessBasic .businessBasic-content-info").hasClass("active")
                    if($(".businessBasic .businessBasic-content-info").hasClass("active")){
                        appcustomerinfoAdd.savebusiness(function (result){
                            if(result){
                                // jqueryMap.$appcustomerinfoDialog.modal('hide');
                                initappcustomerinfoData();
                            }
                        });
                    }else{ //商机跟进填写
                        appcustomerinfoAdd.saveopportunity(function (result){
                            if(result){
                                // jqueryMap.$appcustomerinfoDialog.modal('hide');
                                initappcustomerinfoData();
                            }
                        });
                    }
                    return false;
                }
            };
        }
        if(type=="edit"){
            if(sjzt=='004'||sjzt=='005'){

            }else{
                dialogButtons.success = {
                    label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                    className: "btn btn-default btnBlue borderRadius4 colorfff",
                    callback: function () {
                        //基本信息填写
                        if($(".businessBasic .businessBasic-content-info").hasClass("active")){
                            appcustomerinfoAdd.savebusiness(function (result){
                                if(result){
                                    jqueryMap.$appcustomerinfoDialog.modal('hide');
                                    initappcustomerinfoData();
                                }
                            });
                        }else{//商机跟进填写
                            appcustomerinfoAdd.saveopportunity(function (result){
                                if(result){
                                    // jqueryMap.$appcustomerinfoDialog.modal('hide');
                                    initappcustomerinfoData();
                                }
                            });
                        }
                        return false;
                    }
                };
            }
        }
        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4',
            callback:function () {
                initappcustomerinfoData();
            }
        }
        $.get(url, function (html) {
            jqueryMap.$appcustomerinfoDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons,
                className: 'appcustomerinfo-dialog-m'
            });
        });
    };

    var hideModel = function () {
        jqueryMap.$appcustomerinfoDialog.modal('hide');
    }

    //初始化表，放入数据
    var initappcustomerinfoGrid = function () {
        configMap.appcustomerinfoGrid = $('#appcustomerinfo_data', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "data": function (data) {
                    var starttime = $('#startimeAppcustomerinfo_input').val();
                    var endtime = $('#endtimeAppcustomerinfo_input').val();
                    var khzt = $('#id_khzt').val();
                    var sjzt = $('#id_sjzt').val();
                    var searchtxt = $('#searchtxt_id').val();
                    starttime = starttime + " 00:00:00";
                    endtime = endtime + " 23:59:59";

                    if($('#showMoreAppcustomerinfo ').css('display')=='none'){
                     starttime ='';
                     endtime = '';
                      khzt = '-1';
                     sjzt ='-1';
                    searchtxt = $('#searchtxt_id').val();
                        starttime = starttime + " 00:00:00";
                        endtime = endtime + " 23:59:59";

                    }

                    data.starttime=starttime;
                    data.endtime=endtime;
                    data.khzt=khzt;
                    data.sjzt=sjzt;
                    data.searchtxt=searchtxt;
                }
            },
            "columns": [
                // {"data": "khbm"},//table 列对应的字段名称
                {"data": "dlzh"},
                {"data": "gsmc",className:'text-left',
                    "render": function (data, type, row) {
                        return '<div data-toggle="tooltip" data-placement="top" title="'+ data+'">'+data+'</div>';
                    }},
                {"data": "yhmc"},
                {"data": "nsrsbh"},
                {
                    "data": "zcrq",
                    'className': 'text-center',
                    "render": function (data, type, row) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                },
                {
                	"data": "khqdlx",
                    'className': 'text-center',
                	"render": function (data, type, row) {
                		if(data=="001"){
                			return "员工分享";
                		} else if (data=="002") {
                			return "客户分享";
                		}else if(data=="003"){
                		    return "手工录入";
                        }else if(data=="999"){
                		    return "其他";
                        }else{
                            return "";
                        }
                	}
                },
                {
                    "data": "sjzt",
                    'className': 'text-center',
                    "render": function (data, type, row) {
                        if(data=="000"){
                            return "新商机";
                        } else if (data=="001") {
                            return "初步沟通";
                        }else if (data=="002") {
                            return "持续跟进";
                        }else if (data=="003") {
                            return "确定意向";
                        }else if (data=="004") {
                            return "确定流失";
                        }else if (data=="005") {
                            return "签约";
                        }
                    }
                },
                {
                    'className': 'text-center',
                 "data":"tjrdm"
                },
                {
                    'className': 'text-center',
                    "data":"wbtjrmc"
                },
                {
                    "data": "khzt",
                    'className':'text-center',
                    "render": function (data, type, row) {
                        var v_confirm = "";
                        var allottask = "";
                        var edit_ws="";
                            edit_ws=configMap.eidtBtn_html;
                            allottask = configMap.allotTaskBtn_html;
                        if (data === '0') {
                          /* v_confirm = configMap.conformBtn_html;*/
                        }else{
                           /* v_confirm = configMap.conformBtn_html_disabled;*/
                        }

                        if(row.sjzt=='004'){
                            //已流失
                           /* v_confirm = configMap.conformBtn_html_disabled;*/
                            allottask = configMap.allotTaskBtn_html_disabled;
                        }

                        var del = configMap.delBtn_html;

                        if((row.sjzt=="001"||row.sjzt=="002")||(row.sjzt=='003')){
                            del = configMap.delBtn_html_disabled;
                        }
                        if(row.khzt=="1"){
                            del = configMap.delBtn_html_disabled;
                        }
                        var str = ''+
                            /*configMap.viewBtn_html + */edit_ws+allottask+ configMap.task1_html + v_confirm + del;
                        return  str;
                    }
                }
            ],

            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands":",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var viewContainer = $('[data-type="view"]', jqueryMap.$container);
                var delContainer = $('[data-type="del"]', jqueryMap.$container);
                var editContainer=$('[data-type="edit"]',jqueryMap.$container);
                var conformContainer = $('[data-type="conform"]', jqueryMap.$container);
                var taskContainer = $('[data-type="jumpTask"]',jqueryMap.$container);

                var allotContainer= $('[data-type="allot"]', jqueryMap.$container);
                //跳到任务列表
                if(taskContainer.length>0){
                    taskContainer.off('click').click(function(){
                        var $el = $(this);
                        var rowIndex = configMap.appcustomerinfoGrid.cell($el.parent()).index().row;
                        var sjhm = configMap.appcustomerinfoGrid.row(rowIndex).data().yxkhbm;
                        var name = configMap.appcustomerinfoGrid.row(rowIndex).data().gsmc;
                        var yhmc = configMap.appcustomerinfoGrid.row(rowIndex).data().yhmc;
                        if(name==''){
                            name = yhmc;
                        }
                        var tab_id = "54cd63e4-589b-4cb4-ace0-987d7f637a09";
                        tabMenu(tab_id);
                        generateTab($el,"/systemmanager/taskcenter/taskmanagement/list.jsp?sjhm="+sjhm+"&sjly="+'2',name,tab_id,'fa fa-outdent iconMr');
                    });
                }

                if(allotContainer.length > 0){
                    allotContainer.off('click').on('click',allotTaskOperate );
                }
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewappcustomerinfo);
                }
                if(editContainer.length>0){
                    editContainer.off('click').on('click',editModal);
                }
                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '是否确定要删除客户？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": del,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }

                if (conformContainer.length > 0) {
                    conformContainer.confirmation({
                        "title": '是否确认将客户信息将同步到【客户管理】-【客户列表】？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": confirm,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }
            }
        });
    };

function generateTab(_target, srcStr, menuName, id,icon) {
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

    var findByTime = function () {

        configMap.appcustomerinfoGrid.ajax.reload();
        return;
        var starttime = $('#startimeAppcustomerinfo_input').val();
        var endtime = $('#endtimeAppcustomerinfo_input').val();
        var khzt = $('#id_khzt').val();
        var sjzt = $('#id_sjzt').val();

        starttime = starttime + " 00:00:00";

        endtime = endtime + " 23:59:59";

        $.ajax({
            url: configMap.path + configMap.dataUrl + "/" + starttime + "/" + endtime + "/" + khzt+"/"+sjzt,
            dataType: 'JSON',
            type: 'GET',
            success: function (datas) {
                configMap.appcustomerinfoGrid.clear().draw();
                App.unblockUI(jqueryMap.$blockTarget);
                if (datas.length > 0) {
                    return configMap.appcustomerinfoGrid.rows.add(datas).draw();
                }
            },
            error: function () {
                return App.unblockUI(jqueryMap.$blockTarget);
            }
        })
    }

    var editModal=function () {
        var el = $(this);
        var rowIndex = configMap.appcustomerinfoGrid.cell(el.parent()).index().row;
        var id = configMap.appcustomerinfoGrid.row(rowIndex).data().id;
        var yxid=configMap.appcustomerinfoGrid.row(rowIndex).data().yxkhId;
        var sjzt=configMap.appcustomerinfoGrid.row(rowIndex).data().sjzt;
        openModal("编辑意向客户",configMap.path+configMap.addPageUrl+'?id='+encodeURI(id)+'&yxid='+encodeURI(yxid),'edit',sjzt);
    }
    var addbusinessBtn = function (){
    	openModal("添加意向客户", configMap.path + configMap.addPageUrl, 'add');
    }

    $("#clickMore").on("click",function () {
        if($(this).attr("data")==0){
            $(this).next().removeClass("rotate1")
            // $(".search-body").children("span").show();
            $(this).attr("data",1);
        }else{
            $(this).next().addClass("rotate1")
            // $(".search-body").children("span").hide();
            $(this).attr("data",0);
        }
        $(" .appcustomerinfo-manager-container  .showMore").toggle(500);
    })
    return {
        init: function (type, uuid) {
            setJqueryMap(uuid);

            var tabid = $('#appcustomerinfo-manager-container_' + uuid).parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);

            if (type === "welcome") { //从首页下钻过来的
                $("#clickMore", jqueryMap.$container).next().addClass("rotate1")
                $("#clickMore", jqueryMap.$container).attr("data",0);
                $("#showMoreAppcustomerinfo", jqueryMap.$container).show();
                $('#startimeAppcustomerinfo_input', jqueryMap.$container).val('');
                $('#endtimeAppcustomerinfo_input', jqueryMap.$container).val('');
                $('#id_khzt', jqueryMap.$container).val(localStorage.getItem("zhlType")); //同步状态
                $('#id_sjzt', jqueryMap.$container).val('-1'); //处理状态
            }

            initappcustomerinfoGrid();
           // initappcustomerinfoData();
            $('#searchFilter', jqueryMap.$container).on('keyup', function () {
                configMap.appcustomerinfoGrid.search(this.value).draw();
            });
            $('#findByTimeAppcustomerinfo').off('click').on('click', function () {
                var starttime = $('#startimeAppcustomerinfo_input').val();
                var endtime = $('#endtimeAppcustomerinfo_input').val();
                //if (starttime == '' || endtime == '') {
                    //Messenger().post({message: '查询日期不能为空！', type: 'error',id:"startTime11"});
                //} else {
                    findByTime();
                //}
            });
            $('#startimeAppcustomerinfo').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
                defaultDate: new Date()
            });
            $('#endtimeAppcustomerinfo').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
                defaultDate: new Date()
            });
            $('#addbusinessBtn').off('click').on('click',function(){
            	addbusinessBtn();
            });
            //自定义搜索
            /*$.fn.dataTable.ext.search.pop();//清空
             $.fn.dataTable.ext.search.push(
             function( settings, data, dataIndex ) {
             var start = $('#startimeAppcustomerinfo_input').val().format('YYYY-MM-DD');//开始时间
             var end = $('#endtimeAppcustomerinfo_input').val().format('YYYY-MM-DD');//结束时间
             var age = data[5]; // 要匹配的日期列，下标0开始
             if(start==""||end==""){
             return true; //显示
             }else if(start<=age&&end>=age){
             return true;
             }
             return false;//不显示
             }
             );
             //日期改变刷新表单
             $('#startimeAppcustomerinfo,#endtimeAppcustomerinfo').change( function() {
             configMap.appcustomerinfoGrid.draw();
             } );*/
        },
        setPath: function (path) {
            configMap.path = path;
        },
        reload:function () {
            configMap.appcustomerinfoGrid.ajax.reload();
        },
        hide:function () {
            hideModel();
        }
    };
}();
