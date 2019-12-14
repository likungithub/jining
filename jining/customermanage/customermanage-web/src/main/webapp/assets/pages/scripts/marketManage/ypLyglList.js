/**
 *
 */
var yplzlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/ypgl/getTypjslygl',
        addUrl: '/marketManage/yplz_jbxx.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        yplzGrid: null,
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="yplzedit" title="修改样品接收信息"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"   name="yplzdelete" title="删除政府委托信息"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        classType: '',
        fwzt: '',
        other: ''
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
        jqueryMap.$content = $('#yplz' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('table#list_data');
    };

    var inityplzGrid = function () {

        configMap.yplzGrid = jqueryMap.$manualdata.DataTable({
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
                    data.jszt = '202';
                    data.zwmc_bm = $('[name="jcxm"]', jqueryMap.$content).val();
                    data.htbm = $('[name="htbm"]', jqueryMap.$content).val();
                    data.ypbm = $('[name="ypbm"]', jqueryMap.$content).val();
                    data.htmc = $('[name="htmc"]', jqueryMap.$content).val();

                    data.zm = $('[name="zm"]', jqueryMap.$content).val();
                    data.jcff = $('[name="jcff"]', jqueryMap.$content).val();
                    data.sjcjrqend = $('[name="sjcjrqend"]', jqueryMap.$content).val();
                    data.sjcjrqstart = $('[name="sjcjrqstart"]', jqueryMap.$content).val();
                }
            },
            "columns": [
                {
                    "data": "id",
                    "render": function (data) {
                        return '<div class="datagrid-cell-check"><input type="checkbox" name="ck"/></div>';
                    }
                },
                {
                    class: "text-center",
                    "render": function (data) {
                        return /*configMap.editBtn_html+*/configMap.deleBtn_html;
                    }
                },

                {
                    class: "text-center",
                    "data": "if_jj",
                    "render": function (data) {
                        var status = '';
                        if (data === "1") {
                            status = "是";
                        } else if (data === "0") {
                            status = "否";
                        }
                        return status;
                    }
                },
                {
                    class: "text-center",
                    "render": function (data) {
                        return "是否复测XX";
                    }
                },
                /*{
                	class:"text-center",
                	 "data": "zm"
                },*/
                {
                    class: "text-center",
                    "data": "htbm"
                },
                {
                    class: "text-center",
                    "data": "htmc"
                },


                {
                    class: "text-center",
                    "data": "ypbm"
                },
                {
                    class: "text-center",
                    "data": "ypmc"
                },
                {
                    class: "text-center",
                    "data": "zwmc_bm"
                },
                /*{
                    class:"text-center",
                    "render": function (data) {
                        return "计划领样完成时间XX";
                    }
                },*/
                {
                    class: "text-center",
                    "data": "jcfa"
                },
                /*{
                    class:"text-center",
                    "data": "ycbgrq"
                },*/
                /*{
                	class:"text-center",
                	"data": "sjcjrq"
                },*/
                {
                    class: "text-center",
                    "data": "jcx"
                },

                {
                    class: "text-center",
                    "data": "jldw"
                },
                {
                    class: "text-center",
                    "data": "jcyj"
                },
                {
                    class: "text-center",
                    "data": "cpdlmc"
                },
                {
                    class: "text-center",
                    "data": "yl"
                },
                {
                    class: "text-center",
                    "data": "cyl"
                },
                {
                    class: "text-center",
                    "data": "xl"
                },
                {
                    class: "text-center",
                    "data": "jszt"
                },
                /*{
                    class:"text-center",
                    "render": function (data) {
                        return "是否占用XX";
                    }
                },*/
                {
                    class: "text-center",
                    "data": "bzxx"
                }

            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands": ",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                var editContainer = jqueryMap.$content.find('[name="yplzedit"]');
                var deleteContainer = jqueryMap.$content.find('[name="yplzdelete"]');
                //修改样品接收信息
                var edityplz = function () {
                    stopContinueClick(this, 300);
                    var el = $(this);
                    var rowIndex = configMap.yplzGrid.cell(el.parent()).index().row;
                    var id = configMap.yplzGrid.row(rowIndex).data().id;

                    var wtid = configMap.yplzGrid.row(rowIndex).data().wtid;
                    generateTab(this, configMap.path + configMap.addUrl + '?id=' + id + '&wtid=' + wtid, "编辑委托信息", "qywt_info", 'fa fa-file-text-o iconMr');
                };
                $('[data-toggle="tooltip"]').tooltip();
                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', edityplz);
                }

                if (deleteContainer.length > 0) {
                    deleteContainer.off('click').on('click', delyplz);
                }


                //点击选择所有
                $('.check-all-td').change(function () {
                    selectAll($(this).is(':checked'), $(this).parentsUntil('table').attr("name"));
                });
                var selectAll = function (status, tableId) {
                    $("table[name='yplz-table'] input[type=checkbox]").prop("checked", status);
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

            }
        });
    };


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
                            configMap.yplzGrid.ajax.reload();
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
                            configMap.yplzGrid.ajax.reload();
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
                    data.jszt = '203';
                    data.lx = '3';
                    // data.dqjszt='202';
                    //获取选中的ID


                    jqueryMap.$content.find('[name=ck]:checked').each(function () {

                        var el = $(this);
                        var rowIndex = configMap.yplzGrid.cell(el.parent().parent()).index().row;
                        var id = configMap.yplzGrid.row(rowIndex).data().ypbm;
                        strArr.push(id);
                    });

                    var str1 = strArr.join(',');
                    data.id = str1;
                    $.ajax({
                        data: data,
                        url: configMap.path + '/ypgl/saveZxry1',
                        type: 'POST',
                        success: function (result) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            if (result.success) {
                                configMap.yplzGrid.ajax.reload();
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
    var edityplz = function () {
        stopContinueClick(this, 300);
        var el = $(this);
        var rowIndex = configMap.yplzGrid.cell(el.parent()).index().row;
        var id = configMap.yplzGrid.row(rowIndex).data().id;
        generateTab(this, configMap.path + configMap.addUrl + '?id=' + id, "创建政府委托", "yplz_info", 'fa fa-file-text-o iconMr');
    };

    //删除合同
    var delyplz = function () {
        ;
        var el = $(this);
        var rowIndex = configMap.yplzGrid.cell(el.parent()).index().row;
        var id = configMap.yplzGrid.row(rowIndex).data().id;
        $.ajax({
            //  url: configMap.path + "/yplz/delyplz/" + id,
            url: configMap.path + "/ypgl/delypjs/" + id,
            type: 'POST',
            success: function (result) {
                if (result) {
                    configMap.yplzGrid.ajax.reload();
                    Messenger().post({
                        message: "删除成功",
                        type: 'info',
                        id: "ordermessenger"
                    });
                } else {
                    Messenger().post({
                        message: "删除失败",
                        type: 'error',
                        id: "ordermessenger"
                    });
                }
            },
            error: function () {
                Messenger().post({
                    message: "删除失败！",
                    type: 'error',
                    id: "ordermessenger"
                });
            }
        });
    };

    //增加政府委托
    /* var addyplz = function () {
         stopContinueClick("#addCustomerManage", 300);
         generateTab(this, configMap.path + configMap.addUrl, "创建政府委托", "yplz_info", 'fa fa-file-text-o iconMr');
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

    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            var tabid = $('#yplz' + uuid).parents('.tab-pane').attr('id').slice(17);
            tabMenu(tabid, yplzlist);
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

            inityplzGrid();
            /*$("#addyplz",jqueryMap.$content).off('click').on('click',function (){
                addyplz();
            });*/

            //查询
            $("#yplzSearch", jqueryMap.$content).off('click').on('click', function () {
                configMap.yplzGrid.ajax.reload();
            })

            //选择人员
            $($('#btn_ryxz' + uuid)).off('click').on('click', function () {
                if ($("input[type='checkbox']:checked", jqueryMap.$content).length == 0) {
                    //console.info($("input[type='checkbox']:checked",jqueryMap.$content).length);
                    Messenger().post("请选择人员!");
                    return;
                }
                //选择人员
                openModal1('样品领样-选择执行人', '/systemmanager/businesscooperate/staffList.jsp?type=any', 'edit2');
            });
        },
        setPath: function (path) {
            configMap.path = path;
        },
        reload: function () {
            configMap.yplzGrid.ajax.reload();
        }
    };
}();


//@ sourceURL=contractlist.js