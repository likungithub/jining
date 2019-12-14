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

/*global $, App, moment, jQuery, bootbox, _ */
var cyrwForm = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/rwgl/updateRW',
        updateUrl: '/contract/contractupdate',
        addUrl:'/xmgl/add.jsp',
        id: '',
        listGrid: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        uuid: '',
        wtid: '',
        res:""
    };

    var strArr=[];

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $cyrwForm: null,
        $setimg: null,
        $Table:null,
        $chooseYPDialog:null
    };

    //新增样品
    $('#addNewYp').on('click',function () {
        $("#cyrwForm"+configMap.uuid).parent().parent().parent().parent().parent().modal('hide');
        /*addYp();*/
        chooseJcxm();
    });
/*    //提交抽样任务
    $("#TiJiao").on('click',function () {
        tiJiao();
    });*/
    var addYp = function () {
        stopContinueClick(this, 300);

        /*   $("#myModal").modal({
               remote: "customermanage/marketManage/yp_jbxx.jsp?type=add"
           });*/
        $
        generateTab(this,"customermanage/marketManage/yp_jbxx.jsp?type=add",'增加样品','ypxx_info','fa fa-outdent iconMr');
    }

    var chooseJcxm = function () {
        /*alert(configMap.id)*/
        $.ajax({
            url:"systemmanager/rwgl/getYpId?ypbm="+configMap.res.ypbm,
            type:"POST",
            success:function (data) {
                console.log(data)
                generateTab(this, 'customermanage/marketManage/jcxmlist.jsp?ypid=' + data, "检测项目列表", "jcxmList_info", 'fa fa-file-text-o iconMr');
            },
            error:function (data) {

            }
        })
        /*    if(configMap.type === 'add') { //如果是新增
                generateTab(this, configMap.path + '/marketManage/jcxmlist.jsp?ypid=' + configMap.uuid, "检测项目列表", "jcxmList_info", 'fa fa-file-text-o iconMr');
            } else {*/
        // }
    }

    var generateTab = function(_target, srcStr, menuName, id,icon) {
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

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$cyrwForm = $('#cyrwForm'+ uuid);
        jqueryMap.$Table = $('#'+uuid+'YpList', jqueryMap.$cyrwForm)
    };
    //提交任务
    var tiJiao = function () {

        openModal1('样品领样-选择执行人', '/systemmanager/businesscooperate/staffList.jsp?type=any','edit2');
        console.log(configMap.res.id)
        $.ajax({
            url:"systemmanager/rwgl/updateblzt",
            type:"post",
            traditional: "true",
            data:{"idlist":[ configMap.res.id],"blzt":"001"},
            success:function () {
                strArr.length=0;
                configMap.listGrid.ajax.reload();

            }
        });
    }

    //弹出选择执行样品抽样人员
    var openModal = function (title, url, type) {
        var dialogButtons = {};
        if(type === "edit"){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractcontinue.saveContract(function (result){
                        if(result){
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            /*configMap.yplzGrid.ajax.reload();*/
                        }
                    });
                    return false;
                }
            };
        }
        if(type === "change"){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractChange.saveChange(function (result){
                        if(result){
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            /* configMap.yplzGrid.ajax.reload();*/
                        }
                    });
                    return false;
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var openModal1 = function (title, url, type) {

        var dialogButtons = {};
        if (type === 'edit2') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    // $('#addZXR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    var strArr=[],strArr1=[],strArr2=[];
                    $('#alreadyPer li','#allotStaffList_m').each(function(){
                        strArr1.push($(this).attr('zydm'));
                    });
                    console.log(strArr1);
                    var str2 = strArr1.join(',');
                    console.log(str2);

                    var data = {};
                    data.zydm=str2;
                    data.jszt='200';
                    // data.dqjszt='202';
                    //获取选中的ID


                    /*      jqueryMap.$content.find('[name=ck]:checked').each(function () {

                              var el = $(this);
                              var rowIndex = configMap.yplzGrid.cell(el.parent().parent()).index().row;
                              var id = configMap.yplzGrid.row(rowIndex).data().ypbm;
                              strArr.push(id);
                          });*/
                    console.log(configMap.res.ypbm)
                    strArr.push(configMap.res.ypbm);

                    var str1 = strArr.join(',');
                    data.id=str1;
                    console.log(data)
                    $.ajax({
                        data:data,
                        url:  'customermanage/ypgl/saveZxry1',
                        type: 'POST',
                        success: function(result) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            if (result.success) {
                                /* configMap.yplzGrid.ajax.reload();*/
                                Messenger().post("分配成功!");
                            } else {
                                Messenger().post({
                                    message:result.message,
                                    type: 'error'
                                });
                            }
                        },
                        error: function() {
                            App.unblockUI(jqueryMap.$blockTarget);
                        }
                    });

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
    //保存
    var saveCYRW = function (callback) {
        var check = checkValue();
        if (!check) {
            return false;
        }
        var blockTarget = jqueryMap.$cyrwForm.closest(".modal-body");
        App.unblockUI(blockTarget);
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var inputV = [];
        $("#"+configMap.uuid+"YpList :input[type='text']").each(function(i){
            inputV.push($(this).val());
        });

        //报税提醒
        var tableData = '[';
        for (var i = 0; i <= 100; i++) {
            console.log(configMap.listGrid)
            var d = configMap.listGrid.row(i).data(); //获取每行数据的对象
            if (typeof(d) == "undefined") {//数据为空，不存在的时候为[]
                if (i == 0) {//若第一行为undefined，代表数据未填写，弹出提醒
                    tableData = tableData + ']';
                } else {//不为第一行undefined,代表合计行数据，正常保存
                    tableData = tableData.substring(0, tableData.length - 1);
                    tableData = tableData + ']';
                    break;
                }
            } else {
                var dd = {
                    id: d.id,
                    cysl: inputV[i]
                }
                var dataStr = JSON.stringify(dd); //对象转字符串
                tableData = tableData + dataStr + ',';
            }
        }

        var data = "{\"rwmc\":\"" + $('input[name="rwmc"]', jqueryMap.$cyrwForm).val() + "\"," + //任务名称
            "\"cyrq\":\"" + $('input[name="cyDate"]', jqueryMap.$cyrwForm).val() + "\"," +//抽样日期
            "\"cylxr\":\"" + $('input[name="cylxr"]', jqueryMap.$cyrwForm).val() + "\"," + //抽样联系人
            "\"blzt\":\"" + $('select[name="cyzt"]', jqueryMap.$cyrwForm).val() + "\"," + //抽样任务状态
            "\"cydd\":\"" + $('input[name="cydd"]', jqueryMap.$cyrwForm).val() + "\"," + //抽样地址
            "\"bzxx\":\"" + $('textarea[name="bzxx"]', jqueryMap.$cyrwForm).val() + "\"," + //备注信息
            "\"cyjs\":\"" + $('input[name="cyjs"]', jqueryMap.$cyrwForm).val() + "\","+//抽样基数
            "\"cylxfs\":\"" + $('input[name="cylxfs"]', jqueryMap.$cyrwForm).val() + "\","+//抽样联系人方式
            "\"list\":" + tableData + "}";
        console.log(data)
        var url = configMap.path + configMap.dataUrl + "/" + configMap.id;
        var requestType = 'POST';
        $.ajax({
            url: url,
            type: requestType,
            contentType: 'application/json; charset=utf-8',
            data: data,
            success: function (result) {
                if (result.success) {
                    console.log("aaa");
                    callback(true);
                } else {
                    console.log("bbb");
                    callback(true);
                }
            },
            error: function () {
                console.log("ccc");
                callback(false);
            }
        });
    };

    /**
     * 校验输入信息
     * @returns {boolean}
     */
    var checkValue = function () {
        var blockTarget = jqueryMap.$cyrwForm.closest(".modal-body");
        var rwmc = $('[name="rwmc"]', jqueryMap.$cyrwForm).val();
        var cylxr = $('[name="cylxr"]', jqueryMap.$cyrwForm).val();
        var cydd = $('[name="cydd"]', jqueryMap.$cyrwForm).val();
        if (rwmc=== "" || rwmc == null) {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "任务名称不得为空！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if ($('input[name="cyDate"]', jqueryMap.$cyrwForm).val() === null
            || $('input[name="cyDate"]', jqueryMap.$cyrwForm).val() === "") {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "请选择抽样时间！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if (cylxr=== "" || cylxr == null) {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "抽样联系人不得为空！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if (cydd=== "" || cydd == null) {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "抽样地点不得为空！",
                icon: 'fa fa-warning'
            });
            return false;
        } else if ($('[name="bzxx"]', jqueryMap.$cyrwForm).val().length >= 300) {
            App.alert({
                container: blockTarget,
                place: 'prepend',
                type: 'danger',
                message: "备注信息字数应在300字以内！",
                icon: 'fa fa-warning'
            });
            return false;
        } else {
            return true;
        }
    };

    var delYplist = function () {
        var inputjson = $('[type="checkbox"]:checked', jqueryMap.$cyrwForm).not(jqueryMap.$cyrwForm.find('[name="yp_checkbox"]'));
        var temp = null;
        $(inputjson).each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().id;
            temp = {id: id};
            strArr.push(temp);
        });

        if (strArr.length == 0) {
            Messenger().post({
                message: "请选择至少一个抽样样品！",
                type: 'warning'
            });
        } else {
            var data = {
                ids: strArr
            }
            bootbox.dialog({
                title: '提示',
                message: '确定要删除样品？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-check"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '正在删除，请稍候...'
                            });
                            $.ajax({
                                url: "/customermanage/ypgl/delCyyp",
                                type: 'POST',
                                dataType: 'JSON',
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify(data),
                                success: function (result) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    if (result) {
                                        Messenger().post({
                                            message: '删除成功！'
                                        });
                                    }
                                    configMap.listGrid.ajax.reload();
                                },
                                error: function () {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    Messenger().post({
                                        message: '删除失败！',
                                        type: 'error'
                                    });
                                    configMap.listGrid.ajax.reload();
                                }
                            });
                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            });
        }
    }

    /**
     * 新增样品
     */
    var YplistAdd = function () {
        openModal('添加样品', configMap.path + configMap.addUrl + '?id=' + configMap.wtid);
    }

    var openModal = function (title, url) {
        var dialogButtons = {};

        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
            className: "btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                console.log(2131)
                addYpForm.addCYYP(function (res) {
                    if (res) {
                        jqueryMap.$chooseYPDialog.modal('hide');
                        configMap.listGrid.ajax.reload();
                    } else {
                        jqueryMap.$chooseYPDialog.modal('hide');
                    }
                });
                return false;
            }
        };

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        }

        $.get(url, function (html) {
            jqueryMap.$chooseYPDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    /**
     * 加载任务数据
     * @constructor
     */
    var initRwxx = function () {
        var blockTarget = jqueryMap.$cyrwForm.closest(".modal-body");
        $.ajax({
            url: configMap.path + '/rwgl/getRw/' + configMap.id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                console.log(data)
                if (data.success) {
                    configMap.res= data.data;
                    // alert(configMap.res.ypbm)
                    console.log(configMap.res.id)
                    configMap.wtid = configMap.res.wtid;
                    console.log( $('[name="rwmc"]',jqueryMap.$cyrwForm))
                    $('[name="rwmc"]',jqueryMap.$cyrwForm).val(configMap.res.rwmc);
                    $('[name="rw_type"]',jqueryMap.$cyrwForm).val(configMap.res.rwType == '001'? '政府委托':'企业委托');
                    $('[name="cyzt"]',jqueryMap.$cyrwForm).val(configMap.res.blzt);
                    if(configMap.res.cyrq == null) {
                        $('[name="cyDate"]',jqueryMap.$cyrwForm).val(moment().format('YYYY-MM-DD'));
                    } else {
                        $('[name="cyDate"]',jqueryMap.$cyrwForm).val(moment(configMap.res.cyrq).format('YYYY-MM-DD'));
                    }
                    $('[name="cylxr"]',jqueryMap.$cyrwForm).val(configMap.res.cylxr);
                    $('[name="cydd"]',jqueryMap.$cyrwForm).val(configMap.res.cydd);
                    $('[name="bzxx"]',jqueryMap.$cyrwForm).val(configMap.res.bzxx);
                    $('[name="cyjs"]',jqueryMap.$cyrwForm).val(configMap.res.cyjs);
                    $('[name="cylxfs"]',jqueryMap.$cyrwForm).val(configMap.res.cylxfs);
                    $("#rwid").val(configMap.res.id)
                   /* alert(configMap.res.id)*/
                } else {
                    Messenger().post({message: '获取任务信息失败！', type: 'warning'});
                }
                initYpList();
            },
            error: function () {
                Messenger().post({message: '获取任务信息失败！', type: 'warning'});
            }
        });
    };

    var initYpList = function () {
        configMap.listGrid = $('#'+configMap.uuid+'YpList', jqueryMap.$cyrwForm).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": false, // 打开数据加载时的等待效果
            "serverSide": false, // 打开后台分页
            "autoWidth": false,
            "paging": false,
            "info": false,
            "lengthChange": false,
            "ajax": {
                "url": '/customermanage/ypgl/getYpxxListByWt',
                "dataSrc": "aaData",
                "data": function(data) {
                    data.wtid=configMap.wtid;
                    data.type = 'view';
                    data.start=0;
                    data.length=0;
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
                    }
                },
                {
                    "data": "ypbm",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "ypmc",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "ypdw",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "ggxh",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    "data": "cysl",
                    render:function(d,t,r){
                        d=delnull(d);
                        return '<input onKeypress="return (\/\[\\d\.\]\/.test(String.fromCharCode(event.keyCode)))" class="swtx table-cell-style" style="text-align: right;width:70px;border: 0.5px solid #dadada;" type="text" value="' + d + '"/>';
                    }
                }],
                "drawCallback":function () {
                    $("#id").val(configMap.id);
                }
        });
    }

    return {
        // 初始化
        init: function (id,uuid) {
            $('[data-toggle="tooltip"]', jqueryMap.$cyrwForm).tooltip();
            //合同编码
            configMap.id = id;
            //当前类型，edit为修改合同信息，空字符串为续签合同
            configMap.uuid = uuid;
            setJqueryMap(uuid);

            var nowDate = new Date;
            $('.cyDate',jqueryMap.$cyrwForm).datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            $('[name="cyDate"]',jqueryMap.$cyrwForm).val(moment(nowDate).format('YYYY-MM-DD'));
            //获取选中合同的信息放入页面中
            initRwxx();

            //删除抽样样品
            $('#delYplist',jqueryMap.$cyrwForm).off().on('click',function () {
                delYplist();
            });

            //添加抽样样品
            $('#addYplist',jqueryMap.$cyrwForm).off().on('click',function () {
                YplistAdd();
            });

            $('[name=yp_checkbox]',jqueryMap.$cyrwForm).on('click',function () {
                if($("[name=yp_checkbox]",jqueryMap.$cyrwForm).prop("checked")){
                    //选中
                    $("[name=checkbox_checkbox]",jqueryMap.$cyrwForm).prop("checked",true);
                }else{
                    $("[name=checkbox_checkbox]",jqueryMap.$cyrwForm).prop("checked",false);
                }
            });

        },
        //保存
        saveCYRW: function (callback) {
            saveCYRW(callback);
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        /*提交抽样任务*/
        TiJiao:function () {
            tiJiao();
        }
    };
}();