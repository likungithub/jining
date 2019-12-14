/**
 *
 *
 */
var ypcblist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        pathl: '',
        path: '',
        dataUrl: '/ypgl/ypcb',
        dataUrll: '/ypgl/cf',
        editUrl: null,
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        ypcbGrid: null,
        ypcfGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="ypcbEdit" title="修改"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="ypcbDelete" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        classType: '',
        fwzt: '',
        other: '',
        jszt: '',
        dqjszt: ''

    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#ypcb' + uuid);
        // jqueryMap.$contentl = $('#ypcb' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#ypcb_data');
        jqueryMap.$manualdatal = jqueryMap.$content.find('table#ypcf_data');
    };

    /*时间格式转换*/
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    var initypcbGrid = function () {
        configMap.ypcbGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "dataSrc": "aaData",
                "type": "POST",
                "url": configMap.path + configMap.dataUrl,
                "data": function (data) {
                    data.htmc = $('[name="htmc"]', jqueryMap.$content).val();
                    data.ypmc = $('[name="ypmc"]', jqueryMap.$content).val();
                    // data.jcjg = $('[name="jcjg"]', jqueryMap.$content).val();
                    // alert(3);
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data) {
                        return '<div class="datagrid-cell-check"><input type="checkbox" name="ck" value=' + data + '></div>';
                    }
                },
                {
                    class: "text-center",
                    "data": "htmc",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
                {
                    class: "text-center",
                    "data": "ypmc",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
                {
                    class: "text-center",
                    "data": "jclbdm",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
                {
                    class: "text-center",
                    "data": "ypsl",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
                {
                    class: "text-center",
                    "data": "wbjg",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
                // {
                //     class: "text-center",
                //     "data": "yl",
                //     "render": function (data) {
                //         if (data != null) {
                //             return data;
                //         } else {
                //             return '';
                //         }
                //     }
                // },
                // {
                //     class: "text-center",
                //     "data": "cyl",
                //     "render": function (data) {
                //         if (data != null) {
                //             return data;
                //         } else {
                //             return '';
                //         }
                //     }
                // },
                {
                    class: "text-center",
                    "data": "dwmc",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
                {
                    class: "text-center",
                    "data": "jyxm",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands": ",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function (uuid) { // 数据加载完成后执行
                var editContainer = jqueryMap.$content.find('[name="ypcbEdit"]');
                var deleteContainer = jqueryMap.$content.find('[name="ypcbDelete"]');
                //修改样品接收信息
                var editYpcb = function () {
                    stopContinueClick(this, 300);
                    var el = $(this);

                    var rowIndex = configMap.ypcbGrid.cell(el.parent()).index().row;
                    var id = configMap.ypcbGrid.row(rowIndex).data().id;
                    var wtid = configMap.ypcbGrid.row(rowIndex).data().wtid;
                    var htmc = configMap.ypcbGrid.row(rowIndex).data().htmc;
                    var htlx = configMap.ypcbGrid.row(rowIndex).data().htlxsx;
                    var yslbh = configMap.ypcbGrid.row(rowIndex).data().yslbh;
                    generateTab(this, configMap.path + configMap.editUrl + '?id=' + id + '&wtid=' + wtid + '&htmc=' + htmc + '&htlx=' + htlx + '&yslbh=' + yslbh, "编辑委托信息", "qywt_info", 'fa fa-file-text-o iconMr');
                };
                $('[data-toggle="tooltip"]').tooltip();
                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', editypcb);
                }

                if (deleteContainer.length > 0) {
                    deleteContainer.off('click').on('click', delypcb);
                }

                //点击选择所有
                $('.check-all-td').change(function () {
                    checkAll($(this).is(':checked'), $(this).parentsUntil('table').attr("name"));
                });
                var checkAll = function (status, tableId) {
                    $("table[name='ypcb-table'] input[type=checkbox]").prop("checked", status);
                };

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

                /*模态框数据回显*/
                var findContainer = $('#btn_cb');
                findContainer.off('click').on('click', function () {
                    if ($("input[type='checkbox']:checked", jqueryMap.$content).length == 0) {
                        Messenger().post("请选择一条数据");
                        return;
                    }else{
                        var dd = $("[name='ck']:checked")[0];
                        var rowIndex = configMap.ypcbGrid.cell($(dd).parent().parent()).index().row;
                        var data1 = configMap.ypcbGrid.row(rowIndex).data();
                        $("#cb_id").val(data1.id);
                        $("#cb_zwmc_bm").val(data1.zwmc_bm);
                        $("#cb_psr").val(data1.apsr);
                    }
                });
                /*分包保存按钮*/
                var updateContainer = $('#ypcb_bc');
                updateContainer.off('click').on('click', function () {
                    console.log($("#ypcb_mtk").serialize());
                    $.ajax({
                        type: "post",
                        url: "customermanage/ypgl/ypcb_up",
                        data: $("#ypcb_mtk").serialize(),
                        success: function () {
                            $("#myModalYpcb").modal('hide');
                            configMap.ypcbGrid.ajax.reload();
                        },
                        error: function () {
                            alert("失败");
                        }
                    });
                });
                /*接收按钮*/
                var jsContainer = $('#btn_js');
                jsContainer.off('click').on('click', function () {
                    if ($("input[type='checkbox']:checked", jqueryMap.$content).length == 0) {
                        Messenger().post("请选择一条数据");
                        return;
                    }
                    var ids=[];//定义一个数组
                    $('input[name="ck"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
                        ids.push($(this).val());//将选中的值添加到数组ids中
                    });
                    var data = {
                        cbid: ids
                    }
                    $.ajax({
                        url: configMap.path + "/ypgl/ypcb_jsr",
                        type: 'POST',
                        dataType: 'JSON',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify(data),
                        success: function (result) {
                            if (result.success) {
                                Messenger().post({
                                    message: "接收成功",
                                    type: "info"
                                });
                                ypcblist.reload();
                            } else {
                                Messenger().post({
                                    message: result.message,
                                    type: 'danger'
                                });
                            }

                        },
                        error: function (result) {
                            $('#saveKhxx').html("保存");
                            Messenger().post({
                                message: '接收失败！',
                                type: 'danger'
                            });
                        }
                    })
                    // var dd = $("[name='ck']:checked")[0];
                    // var rowIndex = configMap.ypcbGrid.cell($(dd).parent().parent()).index().row;
                    // var data1 = configMap.ypcbGrid.row(rowIndex).data();
                    // $.ajax({
                    //     type: "post",
                    //     url: "customermanage/ypgl/ypcb_jsr",
                    //     data: {id: $("[name='ck']:checked").val(), jcxmid: data1.jcxmid},
                    //     success: function () {
                    //         alert("接收成功");
                    //         configMap.ypcbGrid.ajax.reload();
                    //     },
                    //     error: function () {
                    //         alert("失败");
                    //     }
                    // });
                });

            }
        });
    };

    var findContainer = $('#btn_cf');
    findContainer.off('click').on('click', function () {

        
        if ($("input[type='checkbox']:checked", jqueryMap.$content).length == 0) {
            Messenger().post("请选择一条数据");
            return;
        }else{
            var dd = $("[name='ck']:checked")[0];
            var rowIndex = configMap.ypcbGrid.cell($(dd).parent().parent()).index().row;
            var data1 = configMap.ypcbGrid.row(rowIndex).data();
            $("#cf_id").val(data1.id);
            $("#cf_zwmc_bm").val(data1.zwmc_bm);
            $("#cf_zwmc_bm1").val(data1.zwmc_bm);
            $("#cf_ypsl").val(data1.ypsl);
            $("#cf_ypdw").val(data1.ypdw);
            $("#cf_ypdw1").val(data1.ypdw);
            $("#cf_jcxmid").val(data1.jcxmid);
            $("#cf_psr").val(data1.apsr);
            $("#cf_wbjg").val(data1.wbjg);
            $("#cf_wbjgsl").val(data1.wbjgsl);
            $("#cf_htbm").val(data1.htbm);
            $("#cf_ypid").val(data1.ypid);
            $("#cf_jcjg").val(data1.jcjg);
            $("#cf_jcksjb").val(data1.jcksjb);
            $("#cf_jcypsl").val(data1.jcypsl);
            $("#cf_yp").val(data1.ypsl+data1.ypdw);
            $("#cf_ypdw").val(data1.ypdw);
            $("#cf_jcks").val(data1.jcks);
            $("#cf_ypmc").val(data1.ypmc);
            $("#cf_ypmc1").val(data1.ypmc);
            $("#cf_jcxm").val(data1.jcxm);
            $("#cf_jcff").val(data1.jcff);
            $("#cf_ks1").val(data1.ks1);
            $("#cf_ks2").val(data1.ks2);
            var ss = $("#cf_id").val(data1.id);
            initypcfGrid();
        }
    });


    var findContainerl = $('#btn_ypjcfb');
    findContainerl.off('click').on('click', function () {
        if ($("input[type='checkbox']:checked", jqueryMap.$content).length == 0) {
            Messenger().post("请选择一条数据");
            return;
        }else{
            var dd = $("[name='ck']:checked")[0];
            var rowIndex = configMap.ypcbGrid.cell($(dd).parent().parent()).index().row;
            var data1 = configMap.ypcbGrid.row(rowIndex).data();
            $("#cf_id").val(data1.id);
            $("#cf_zwmc_bm").val(data1.zwmc_bm);
            $("#cf_zwmc_bm1").val(data1.zwmc_bm);
            $("#cf_ypsl").val(data1.ypsl);
            $("#cf_ypdw").val(data1.ypdw);
            $("#cf_ypdw1").val(data1.ypdw);
            $("#cf_jcxmid").val(data1.jcxmid);
            $("#cf_psr").val(data1.apsr);

            $("#cf_htbm").val(data1.htbm);
            $("#cf_ypid").val(data1.ypid);
            $("#cf_jcjg").val(data1.jcjg);
            $("#cf_jcksjb").val(data1.jcksjb);
            $("#cf_jcypsl").val(data1.jcypsl);
            $("#cf_ypdw").val(data1.ypdw);
            $("#cf_jcks").val(data1.jcks);
            $("#cf_ypmc").val(data1.ypmc);
            $("#cf_ypmc1").val(data1.ypmc);
            $("#cf_jcxm").val(data1.jcxm);
            $("#cf_jcff").val(data1.jcff);
            $("#cf_ks1").val(data1.ks1);
            $("#cf_ks2").val(data1.ks2);

        }
    });
    /*分包保存按钮*/
    var updateContainer = $('#ypcf_bc');
    updateContainer.off('click').on('click', function () {
        $.ajax({
            type: "post",
            url: "customermanage/ypgl/ypcf_up",
            data: $("#ypcf_mtk").serialize(),
            success: function () {
                $("#myModalYpcf").modal('hide');
                configMap.ypcbGrid.ajax.reload();
                alert("成功");
            },
            error: function () {
                alert("失败");
            }
        });
    });

    /*拆分保存按钮*/
    var updateContainer = $('#ypfb_bc');
    updateContainer.off('click').on('click', function () {
        $.ajax({
            type: "post",
            url: "customermanage/ypgl/jcypfb_up",
            data: $("#ypcf_mtk").serialize(),
            success: function () {
                $("#myModalYpcf").modal('hide');
                configMap.ypcbGrid.ajax.reload();
                alert("成功");
            },
            error: function () {
                alert("失败");
            }
        });
    });

    var openModal = function (title, url, type) {
        var dialogButtons = {};
        if (type === "edit") {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractcontinue.saveContract(function (result) {
                        if (result) {
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.ypcbGrid.ajax.reload();
                        }
                    });
                    return false;
                }
            };
        }
        if (type === "change") {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存 ',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    contractChange.saveChange(function (result) {
                        if (result) {
                            Messenger().post("操作成功，请等待审核!");
                            jqueryMap.$contractauditDialog.modal('hide');
                            configMap.ypcbGrid.ajax.reload();
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
                label: '<i class="' + 'fa fa-save  iconMr' + '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    // $('#addZXR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    var strArr = [], strArr1 = [], strArr2 = [];
                    $('#alreadyPer li', '#allotStaffList_m').each(function () {
                        strArr1.push($(this).attr('zydm'));
                    });


                    console.log(strArr1);
                    var str2 = strArr1.join(',');
                    console.log(str2);

                    var data = {};
                    data.zydm = str2;
                    data.jszt = '201';
                    data.dqjszt = '200';
                    //获取选中的ID

                    jqueryMap.$content.find('[name=ck]:checked').each(function () {
                        var el = $(this);
                        var rowIndex = configMap.ypcbGrid.cell(el.parent().parent()).index().row;
                        var id = configMap.ypcbGrid.row(rowIndex).data().wtid;
                        strArr.push(id);
                    });

                    var str1 = strArr.join(',');
                    data.id = str1;
                    $.ajax({
                        data: data,
                        url: configMap.path + '/ypgl/saveZxry',
                        type: 'POST',
                        success: function (result) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            if (result.success) {
                                configMap.ypcbGrid.ajax.reload();
                                Messenger().post("分配成功!");
                            } else {
                                Messenger().post({
                                    message: result.message,
                                    type: 'error'
                                });
                            }
                        },
                        error: function () {
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
                className: 'allotTask_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    //修改委托信息
    var editypcb = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.ypcbGrid.cell(el.parent()).index().row;
        var id = configMap.ypcbGrid.row(rowIndex).data().id;
        generateTab(this, configMap.path + configMap.editUrl + '?id=' + id, "创建政府委托", "ypcb_info", 'fa fa-file-text-o iconMr');
    };

    //删除合同
    var delypcb = function () {
        var el = $(this);
        var rowIndex = configMap.ypcbGrid.cell(el.parent()).index().row;
        var wtid = configMap.ypcbGrid.row(rowIndex).data().wtid;
        $.ajax({
            url: configMap.path + "/ypgl/delWtxx/" + wtid,
            type: 'POST',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result) {
                    configMap.ypcbGrid.ajax.reload();
                    Messenger().post("删除成功!");
                } else {
                    Messenger().post({
                        message: result,
                        type: 'error'
                    });
                }
            },
            error: function () {
                Messenger().post({
                    message: "删除失败！",
                    type: 'error'
                });
            }
        });
    };

    //提交拆包审批
    var btn_sp = function () {
        var ids=[];//定义一个数组
        $('input[name="ck"]:checked',jqueryMap.$content).each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组ids中
        });
        var data = {
            cbid: ids
        }
        $.ajax({
            url: configMap.path + "/ypgl/cbsp",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (result) {
                if (result.success) {
                    Messenger().post({
                        message: "提交成功",
                        type: "info"
                    });
                    ypcblist.reload();
                } else {
                    Messenger().post({
                        message: result.message,
                        type: 'danger'
                    });
                }

            },
            error: function (result) {
                $('#saveKhxx').html("保存");
                Messenger().post({
                    message: '提交失败！',
                    type: 'danger'
                });
            }
        })
    }

    //增加政府委托
    /* var addypcb = function () {
         stopContinueClick("#addCustomerManage", 300);
         generateTab(this, configMap.path + configMap.editUrl, "创建政府委托", "ypcb_info", 'fa fa-file-text-o iconMr');
     };*/

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
    // var generateTab = function (_target, srcStr, menuName, id, icon) {
    var initypcfGrid = function () {
        configMap.ypcfGrid = jqueryMap.$manualdatal.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "dataSrc": "aaData",
                "type": "POST",
                "dataType": "JSON",
                // "data":JSON.stringify(database),
                "url": configMap.path + configMap.dataUrll,
                "data": function (data) {
                    data.htmc = $('[name="htmc"]', jqueryMap.$content).val();
                    data.ypmc = $('[name="ypmc"]', jqueryMap.$content).val();
                    // data.jcjg = $('[name="jcjg"]', jqueryMap.$content).val();
                }
            },
            "columns": [
                // {
                //     "data": "id",
                //     "render": function (data) {
                //         return '<div class="datagrid-cell-check"><input type="checkbox" name="ck" value=' + data + '></div>';
                //     }
                // },
                {
                    class: "text-center",
                    "data": "zwmc_bm",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
                {
                    class: "text-center",
                    "data": "ypmc",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
                {
                    class: "text-center",
                    "data": "cpdlmc",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
                {
                    class: "text-center",
                    "data": "xl",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
                {
                    class: "text-center",
                    "data": "jyxm",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
                {
                    class: "text-center",
                    "data": "jcfa",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
                    }
                },
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands": ",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            }
        });
    }

    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            var tabid = $('#ypcb' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid, ypcblist);
            jqueryMap.$content.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            jqueryMap.$content.find('.endTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            //提交拆包审批
            $("#btn_sp",jqueryMap.$content).off('click').on('click',function (){
                btn_sp();
            });

            initypcbGrid();
            /*$("#addypcb",jqueryMap.$content).off('click').on('click',function (){
                addypcb();
            });*/

            //查询
            $("#ypcbSearch", jqueryMap.$content).off('click').on('click', function () {
                configMap.ypcbGrid.ajax.reload();
            })
            //重置
            $('#reset',jqueryMap.$content).off('click').on('click',function (){
                $('[name="htmc"]', jqueryMap.$content).val("");
                // $('input').val("");
                $('[name="ypmc"]', jqueryMap.$content).val("");
                // alert(1);
                configMap.ypcbGrid.ajax.reload();
                // alert(2);
            })
            //选择人员
            $($('#btn_ryxz' + uuid)).off('click').on('click', function () {
                if ($("input[type='checkbox']:checked", jqueryMap.$content).length == 0) {
                    //console.info($("input[type='checkbox']:checked",jqueryMap.$content).length);
                    Messenger().post("请选择人员!");
                    return;
                }
                //选择人员
                openModal1('样品接收-选择执行人', '/systemmanager/businesscooperate/staffList.jsp?type=any', 'edit2');
            });
        },
        setPath: function (path) {
            configMap.path = path;
        },
        reload: function () {
            configMap.ypcbGrid.ajax.reload();
        }
    };

}();
