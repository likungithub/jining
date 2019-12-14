/**
 * Created by huxinquan on 2017/7/28.
 */
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
/*global $, App, moment, jQuery, bootbox, businesscooperateEdit */
var businesscooperate = function() {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        UniqueID: '',
        isManager: '',
        dataUrl: '/businessCooperate',
        dataUrlByDfbz: '/businessCooperate/businessCooperateByDfbz',
        dataUrlByDfbzCode: '/businessCooperate/businessCooperateByDfbzCode',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        businesscooperateGrid: null,
        searchBusinessCooperate: '',
        viewPageUrl: '/businesscooperate/businesscooperateview.jsp',
        allotTaskUrl: '/businesscooperate/allotTask.jsp',
        answerBtn_html1: '<a href="javascript:;" class="btn btn-xs default" data-type="answer" data-toggle="tooltip" title="回复业务受理"><i class="icon iconfont icon-queren iconFontColor-10a0f7 iconFontSize"></i></a>',
        answerBtn_html: '',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除业务受理"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html_disabled: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default"  data-toggle="tooltip" title="删除业务受理"><i style="color: #666!important" class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',

        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看业务受理"><i class="icon iconfont icon-xiangqing1 iconFontColor-10a0f7 iconFontSize"></i></a>',

        allotTaskBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="allot" data-toggle="tooltip" title="分配任务"><i class="icon iconfont icon-fenpeirenwu iconFontColor-10a0f7 iconFontSize"></i></a>',
        allotTaskBtn_html_disabled: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default"   data-toggle="tooltip" title="分配任务"><i style="color: #666!important" class="icon iconfont icon-fenpeirenwu iconFontColor-10a0f7 iconFontSize"></i></a>',

        checkbox_html: '<input type="checkbox" class="group-checkbox" data-type="check" data-toggle="tooltip"  style="display: none;"/>',

        task2_html: '<a href="javascript:;" class="btn btn-xs default" data-type="jumpTask2" data-toggle="tooltip" title="历史任务"><i class="icon iconfont icon-lishirenwu  iconFontColor-10a0f7 iconFontSize"></i></a>',
        task2_html_disabled: '<a href="javascript:;" disabled="disabled" class="btn btn-xs default"   data-toggle="tooltip" title="历史任务"><i style="color: #666 !important" class="icon iconfont icon-lishirenwu  iconFontColor-10a0f7 iconFontSize"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $businesscooperateDialog: null,
        $businessCooperate: null
    };

    var setJqueryMap = function() {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$businessCooperate = $('#businessCooperate_' + configMap.UniqueID);
    };

    var initBusinessCooperateData = function() {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在加载数据，请稍候...'
        });
        if (configMap.isManager === 'true') {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/getAllBusinessCooperate',
                dataType: 'JSON',
                type: 'GET',
                success: function(datas) {
                    configMap.businesscooperateGrid.clear().draw();
                    App.unblockUI(jqueryMap.$blockTarget);
                    if (datas.length > 0) {
                        return configMap.businesscooperateGrid.rows.add(datas).draw();
                    }
                },
                error: function() {
                    return App.unblockUI(jqueryMap.$blockTarget);
                }
            });
        } else {
            $.ajax({
                url: configMap.path + configMap.dataUrl + '/getBusinessCooperateByAgencyCode',
                dataType: 'JSON',
                type: 'GET',
                success: function(datas) {
                    configMap.businesscooperateGrid.clear().draw();
                    App.unblockUI(jqueryMap.$blockTarget);
                    if (datas.length > 0) {
                        return configMap.businesscooperateGrid.rows.add(datas).draw();
                    }
                },
                error: function() {
                    return App.unblockUI(jqueryMap.$blockTarget);
                }
            });
        }
    };

    var openModal = function(title, url, type) {
        var dialogButtons = {};

        dialogButtons.cancel = {
            label: '关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };
        $.get(url, function(html) {
            jqueryMap.$businesscooperateDialog = bootbox.dialog({
                className: 'common-pro-modal-hxq',
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
                    var fzr = {},
                        fqr = {},
                        zxr = {},
                        rwid = {},
                        from = {},
                        ywbs = {},
                        ywmc = {},
                        sjhm={};
                    fzr.name = 'FZR_DM';
                    fqr.name = 'FQR_DM';
                    zxr.name = 'ZXR_DM';
                    rwid.name = "rwid";
                    from.name = "cjrw_from";
                    ywbs.name = "cjrw_ywbs";
                    ywmc.name="cjrw_ywmc";
                    sjhm.name="sjhm";
                    var l_from = localStorage.getItem("cjrw_from");
                    var l_ywbs = localStorage.getItem("cjrw_ywbs");
                    var l_ywmc = localStorage.getItem("cjrw_ywmc");
                    var l_sjhm = localStorage.getItem("cjrw_khsjhm");
                    from.value = l_from;
                    ywbs.value = l_ywbs;
                    ywmc.value=l_ywmc;
                    sjhm.value=l_sjhm;
                    fzr.value = $('#addFZR').attr('fzr_dm');
                    fqr.value = $('#addFQR').attr('fqr_dm');
                    zxr.value = $('#addZXR').attr('zxry_dm');
                    rwid.value = $("#rwid_id").val();
                    var arr = $('#allot-task-form').serializeArray();
                    //开始时间
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
                    arr.push(ywmc);
                    arr.push(sjhm);
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


                    $.post('/systemmanager/rwgljbxx/jbxx/saverwjbxx', arr, function(d) {

                        var rwid = $("#jlid_id").val();
                        var f_rwid = d.rwid;
                        if ("rwid" == rwid) {
                            $("#rwid_id").val(f_rwid);
                        } else {
                            $("#rwid_id").val("rwid");
                        }
                        initBusinessCooperatePaging();
                        if(d.success){
                            Messenger().post("保存成功!");
                            $.get('/customermanage/SystemMessageController/getAllMessageReminder', null, function(result) {
                                if(result > 0) {
                                    $('#announcementInfoWarningTX').removeClass('circleDisplay');
                                    $('#announcementInfoWarningTX').html(result);
                                    $('.top-message-m').addClass('bellSwingMessage');
                                } else {
                                    $('#announcementInfoWarningTX').css({display:'none'});
                                    $('.top-message-m').removeClass('bellSwingMessage');
                                }
                            });

                        }
                        else{
                            Messenger().post("保存失败!");
                        }
                    });
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

    var viewBusinessCooperate = function() {
        var el = $(this);
        var rowIndex = configMap.businesscooperateGrid.cell(el.parent()).index().row;
        var cooperateId = configMap.businesscooperateGrid.row(rowIndex).data().cooperateId;
        openModal("查看业务受理", configMap.path + configMap.viewPageUrl + "?cooperateId=" + encodeURI(cooperateId), 'view');
    };
    var allotTaskOperate = function() {
        var el = $(this);
        var rowIndex = configMap.businesscooperateGrid.cell(el.parent()).index().row;
        var cooperateId = configMap.businesscooperateGrid.row(rowIndex).data().cooperateId;
        var khbsmc = configMap.businesscooperateGrid.row(rowIndex).data().customerName;
        var khbsdm = configMap.businesscooperateGrid.row(rowIndex).data().customerCode;
        var ywmc = configMap.businesscooperateGrid.row(rowIndex).data().ywmc;

        var sjhm =configMap.businesscooperateGrid.row(rowIndex).data().contactInformation;
        var gsmc =configMap.businesscooperateGrid.row(rowIndex).data().gsmc;
        khbsmc = gsmc;
        clearRWlocalstore();
        sessionStorage.setItem("khmbsmc",khbsmc);
        window.localStorage.setItem("cjrw_from", 1); //来源
        window.localStorage.setItem("cjrw_gsbsmc", khbsmc); //客户标识名称
        window.localStorage.setItem("cjrw_gsbsdm", khbsdm); //客户标识代码
        window.localStorage.setItem("cjrw_ywbs", cooperateId); //来源ID
        window.localStorage.setItem("cjrw_ywmc",ywmc);
        window.localStorage.setItem("cjrw_khsjhm",sjhm);
        var title = "分配任务";
        if (khbsmc != '') {
            title += "-" + khbsmc;
        }
        openModal1(title, configMap.path + configMap.allotTaskUrl, 'edit');
    }

    var delBusinessCooperate = function(event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });

        var rowIndex = configMap.businesscooperateGrid.cell(element.parent()).index().row;
        var id = configMap.businesscooperateGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/deleteBusinessCooperate?id=" + id,
            type: 'PUT',
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    initBusinessCooperatePaging();
                    Messenger().post("删除成功!");
                    $("#yfhz_dfbz").val('all');
                } else {
                    Messenger().post({
                        message: "删除失败!",
                        type: 'error'
                    });
                }
            },
            error: function() {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var answerBusinessCooperate = function(event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '请稍候...'
        });

        var rowIndex = configMap.businesscooperateGrid.cell(element.parent()).index().row;
        var id = configMap.businesscooperateGrid.row(rowIndex).data().id;
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/answerBusinessCooperate?id=" + id,
            type: 'PUT',
            success: function(result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    initBusinessCooperatePaging();
                    Messenger().post("答复成功!");
                    $("#yfhz_dfbz").val('0');
                } else {
                    Messenger().post({
                        message: "答复失败!",
                        type: 'error'
                    });
                }
            },
            error: function() {
                App.unblockUI(jqueryMap.$blockTarget);
            }
        });
    };

    var initBusinessCooperateGrid = function() {
        configMap.businesscooperateGrid = jqueryMap.$businessCooperate.find('#businesscooperate_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "columnDefs": [{
                "targets": [0],
                "searchable": false
            }, {
                "targets": [3],
                "searchable": false
            }, {
                "targets": [4],
                "searchable": false
            }],
            "columns": [{
                "render": function(data, type, row) {
                    return configMap.checkbox_html;
                }
            }, {
                "data": "cooperateType",
                "render": function(data, type, row) {
                    if (row.isAnswer == '1') {
                        return data;
                    } else {
                        var bv = '<B>' + data + '</B>';
                        return bv;
                    }
                }
            }, {
                "data": "message",
                "render": function(data, type, row) {
                    if (row.isAnswer == '1') {
                        return data;
                    } else {
                        var bv = '<B>' + data + '</B>';
                        return bv;
                    }
                }
            }, {
                "data": "isAnswer",
                "render": function(data, type, row) {
                    if (row.isAnswer == '1') {
                        return '已答复';
                    } else {
                        var bv = '<B>' + '未答复' + '</B>';
                        return bv;
                    }
                }
            }, {
                "data": "messageDate",
                "render": function(data, type, row) {
                    if (row.isAnswer == '1') {
                        return moment(data).format('YYYY-MM-DD');
                    } else {
                        var bv = '<B>' + moment(data).format('YYYY-MM-DD') + '</B>';
                        return bv;
                    }
                }
            }, {
                "render": function(data, type, row) {
                    return configMap.viewBtn_html+configMap.answerBtn_html + configMap.deleteBtn_html  ;
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$businessCooperate);
                var answerContainer = $('[data-type="answer"]', jqueryMap.$businessCooperate);
                var delContainer = $('[data-type="del"]', jqueryMap.$businessCooperate);
                var viewContainer = $('[data-type="view"]', jqueryMap.$businessCooperate);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (answerContainer.length > 0) {
                    answerContainer.confirmation({
                        "title": '确定已答复？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": answerBusinessCooperate,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delBusinessCooperate,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }

                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewBusinessCooperate);
                }
            }
        });
    };

    var searchBusinessCooperateByText = function() {
        configMap.searchBusinessCooperate = jqueryMap.$businessCooperate.find("#searchBusinessCooperate");
        configMap.searchBusinessCooperate.on('blur', function() {
            var searchText = encodeURIComponent(configMap.searchBusinessCooperate.val());
            if (searchText !== '') {
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/searchBusinessCooperateByText?searchText=" + searchText,
                    dataType: 'JSON',
                    type: 'GET',
                    success: function(datas) {
                        configMap.businesscooperateGrid.clear().draw();
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (datas.length > 0) {
                            return configMap.businesscooperateGrid.rows.add(datas).draw();
                        }
                    },
                    error: function() {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            } else {
                initBusinessCooperatePaging();
            }
        });
    };

    function tip(mes) {
        var dialog = bootbox.dialog({
            title: '温馨提示',
            message: '<p>' + mes + '</p>',
            buttons: {
                ok: {
                    label: "<i class='fa fa-check'></i>确定",
                    className: 'btn btn-default btnBlue borderRadius4 colorfff',

                }
            }
        });
    }

    var findbyDfbz = function(dfbz) {
        if (configMap.isManager === 'true') {
            $.ajax({
                url: configMap.path + configMap.dataUrl + "/businessCooperateByDfbz/" + dfbz,
                type: 'GET',
                success: function(result) {
                    configMap.businesscooperateGrid.clear().draw();
                    configMap.businesscooperateGrid.rows.add(result).draw();
                },
                error: function() {
                    App.unblockUI(jqueryMap.$blockTarget);
                }
            });
        } else {
            $.ajax({
                url: configMap.path + configMap.dataUrl + "/businessCooperateByDfbzCode/" + dfbz,
                type: 'GET',
                success: function(result) {
                    configMap.businesscooperateGrid.clear().draw();
                    configMap.businesscooperateGrid.rows.add(result).draw();
                },
                error: function() {
                    App.unblockUI(jqueryMap.$blockTarget);
                }
            });
        }
    }
    var answerCheckedBusinessCooperate = function() {
        var ids = '';
        jqueryMap.$businessCooperate.find('#btnIsAnswer').off('click').on('click', function() {
            if (jqueryMap.$businessCooperate.find(':checked[data-type="check"]').length == '0') {
                Messenger().post({
                    message: '请选择要答复的业务受理信息！',
                    type: 'error'
                });

            } else {
                jqueryMap.$businessCooperate.find(':checked[data-type="check"]').each(function() {
                    var el = $(this);
                    var rowIndex = configMap.businesscooperateGrid.cell(el.parent()).index().row;
                    var id = configMap.businesscooperateGrid.row(rowIndex).data().id;
                    ids += id + ',';
                });
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/answerCheckedBusinessCooperate?ids=" + ids,
                    type: 'PUT',
                    success: function(result) {
                        ids = '';
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (result) {
                            jqueryMap.$businessCooperate.find('#allCheck').prop("checked", false);
                            //                            initBusinessCooperatePaging();
                            configMap.businesscooperateGrid.ajax.reload();
                            Messenger().post("答复成功!");
                        } else {
                            Messenger().post({
                                message: "答复成功!",
                                type: 'error'
                            });
                        }
                    },
                    error: function() {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            }
        });
    };

    var deleteCheckedBusinessCooperate = function() {
        var ids = '';
        jqueryMap.$businessCooperate.find('#btnDelAll').off('click').on('click', function() {
            if (jqueryMap.$businessCooperate.find(':checked[data-type="check"]').length == '0') {
                Messenger().post({
                    message: '请选择要删除的业务受理信息！',
                    type: 'error'
                });
            } else {
                jqueryMap.$businessCooperate.find(':checked[data-type="check"]').each(function() {
                    var el = $(this);
                    var rowIndex = configMap.businesscooperateGrid.cell(el.parent()).index().row;
                    var id = configMap.businesscooperateGrid.row(rowIndex).data().id;
                    ids += id + ',';
                });
                $.ajax({
                    url: configMap.path + configMap.dataUrl + "/deleteCheckedBusinessCooperate?ids=" + ids,
                    type: 'PUT',
                    success: function(result) {
                        ids = '';
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (result) {
                            jqueryMap.$businessCooperate.find('#allCheck').prop("checked", false);
                            //                            initBusinessCooperatePaging();
                            configMap.businesscooperateGrid.ajax.reload();
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
            }
        });
    };

    var initBusinessCooperatePaging = function() {
        configMap.businesscooperateGrid = jqueryMap.$businessCooperate.find('#businesscooperate_data').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "lengthMenu": [10, 20, 50, 100],
            "autoWidth": false,
            "columnDefs": [{
                "targets": [0],
                "searchable": false
            }, {
                "targets": [3],
                "searchable": false
            }, {
                "targets": [4],
                "searchable": false
            }],
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "ajax": {
                "url": configMap.path + configMap.dataUrl + "/getBusinessCooperateByPaging",
                "dataSrc": "aaData",
                "data": function(data) {
                    data.searchText = $("#yfhz_dfbz").val();
                    data.ksrq = $("#startsqrq_input").val();
                    data.jsrq = $("#endsqrq_input").val();
                    data.isManager = configMap.isManager;
                }
            },
            "columns": [{
                "render": function(data, type, row) {
                    return configMap.checkbox_html;
                }
            }, {
                className: 'text-left',
                "data": "customerName",
                "render": function(data, type, row) {
                    if (row.isAnswer == '1') {
                        return data;
                    } else {
                        var bv =  data
                        return bv;
                    }
                }
            },
                {
                    className: 'text-left',
                    "data": "gsmc",
                    "render": function(data, type, row) {
                        if (data!=null) {
                            return data;
                        } else {
                            return "";
                        }
                    }
                },
                {
                    className: 'text-left',
                    "data": "khjlmc",
                    "render": function(data, type, row) {
                        if (data!=null) {
                            return data;
                        } else {
                            return "";
                        }
                    }
                },{
                className: 'text-left',
                "data": "ywmc",
                "render": function(data, type, row) {
                    if (row.isAnswer == '1') {
                        return data;
                    } else {
                        var bv = data;
                        return bv;
                    }
                }
            }, {
                className: 'text-left',
                "data": "message",
                "render": function(data, type, row) {
                    if (row.isAnswer == '1') {
                        return data;
                    } else {
                        var bv = data;
                        return bv;
                    }
                }
            }, {
                "data": "blzt",
                "render": function(data, type, row) {
                    if (row.blzt == '001') {
                        var bv =  '未受理';
                        return bv;
                    } else if (row.blzt == '002') {
                        return '已受理';
                    } else if (row.blzt == '003') {
                        return '已完成';
                    } else if (row.blzt == '004') {
                        return '已流失';
                    }
                }
            }, {
                "data": "messageDate",
                "render": function(data, type, row) {
                    if (row.isAnswer == '1') {
                        return moment(data).format('YYYY-MM-DD');
                    } else {
                        var bv =  moment(data).format('YYYY-MM-DD');
                        return bv;
                    }
                }
            }, {
                "render": function(data, type, row) {
                    var allottask = "";
                    var del = "";
                    if (row.isAnswer == '0') {
                        allottask = configMap.allotTaskBtn_html;
                        del = configMap.deleteBtn_html;
                    }else{
                        allottask = configMap.allotTaskBtn_html_disabled;
                        del = configMap.deleteBtn_html_disabled;
                    }
                    //已流失可以删除

                    if (row.blzt == '004') {
                        del = configMap.deleteBtn_html;
                    }
                    return  configMap.viewBtn_html + configMap.answerBtn_html + allottask +configMap.task2_html+ del ;
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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$businessCooperate);
                var answerContainer = $('[data-type="answer"]', jqueryMap.$businessCooperate);
                var delContainer = $('[data-type="del"]', jqueryMap.$businessCooperate);
                var viewContainer = $('[data-type="view"]', jqueryMap.$businessCooperate);
                var allotContainer = $('[data-type="allot"]', jqueryMap.$businessCooperate);
                var task2Container =$('[data-type="jumpTask2"]',jqueryMap.$businessCooperate);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if(task2Container.length>0){
                    task2Container.off('click').click(function(){
                        var $el = $(this);
                        var rowIndex = configMap.businesscooperateGrid.cell($el.parent()).index().row;
                        var khbm = configMap.businesscooperateGrid.row(rowIndex).data().customerCode;
                        var name = configMap.businesscooperateGrid.row(rowIndex).data().gsmc;

                        //var name = configMap.businesscooperateGrid.row(rowIndex).data().gsmc;
                        var tab_id = "54cd63e4-589b-4cb4-ace0-987d7f637a09";
                        tabMenu(tab_id);
                       generateTab($el,"/systemmanager/taskcenter/taskmanagement/list.jsp?khbm="+khbm+"&sjly="+'1',name,tab_id,'fa fa-outdent iconMr');
                    });
                }


                if (answerContainer.length > 0) {
                    answerContainer.confirmation({
                        "title": '确定已答复？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": answerBusinessCooperate,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }

                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": delBusinessCooperate,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }

                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', viewBusinessCooperate);
                }
                if (allotContainer.length > 0) {
                    allotContainer.off('click').on('click', allotTaskOperate);
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
    return {
        init: function(UniqueID, isManager) {
            configMap.UniqueID = UniqueID;
            configMap.isManager = isManager;
            setJqueryMap();
            var tabid = $('#businessCooperate_' + configMap.UniqueID).parents('.tab-pane').attr('id').slice(17);

            tabMenu(tabid);
            //            initBusinessCooperateGrid();
            //            initBusinessCooperatePaging();
            answerCheckedBusinessCooperate();
            deleteCheckedBusinessCooperate();
            initBusinessCooperatePaging();
            //searchBusinessCooperateByText();
            //            jqueryMap.$businessCooperate.find('#searchBusinessCooperate').on('keyup', function () {
            //                configMap.businesscooperateGrid.search(this.value).draw();
            //            });
            //            $("#yfhz_dfbz").bind("change",function(){
            ////            	var dfbz = $(this).val();
            ////            	findbyDfbz(dfbz);
            //            	configMap.businesscooperateGrid.ajax.reload();
            //            });
            $("#findByDfbz_busin").bind("click", function() {
                //        	var dfbz = $(this).val();
                //        	findbyDfbz(dfbz);
                configMap.businesscooperateGrid.ajax.reload();
            });

            jqueryMap.$businessCooperate.find('#allCheck').off('click').on('click', function() {
                if (this.checked) {
                    jqueryMap.$businessCooperate.find($('[data-type="check"]')).prop("checked", true);
                } else {
                    jqueryMap.$businessCooperate.find($('[data-type="check"]')).prop("checked", false);
                }
            });

            $('#startsqrq').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
                defaultDate: new Date()
            });

            $('#endsqrq').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
                defaultDate: new Date()
            });

        },
        setPath: function(path) {
            configMap.path = path;
        }
    };
}();
//@ sourceURL=systemannouncement.js