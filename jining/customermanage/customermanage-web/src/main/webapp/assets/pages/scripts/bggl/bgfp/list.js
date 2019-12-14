var list = function () {
    'use strict';

    var prefix = 'bggl/bgfp';

    // 全局属性参数
    var configMap = {
        dataUrl: '/' + prefix + '/querylist',
        del_dataUrl: '/' + prefix + '/delete',
        query_ryUrl: '/' + prefix + 'QueryRy',
        edit_Url: '/' + prefix + '/edit.jsp',
        doc_url: '',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        listGrid: null,
        uuid: '',
        lx: '',
        editPageUrl: '<a href="javascript:;" class="btn btn-xs default" data-type="bianji" data-toggle="tooltip" title="编辑"><i class="icon iconfont icon-bianji1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html_disabled: '<a disabled="disabled" href="javascript:;" class="btn btn-xs default color666"  data-toggle="tooltip" title="删除"><i style="color:#666;" class="icon iconfont icon-shanchu3 color666  iconFontSize"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan" data-toggle="tooltip" title="查看报告"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewZxrBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan_zxr" data-toggle="tooltip" title="查看执行人"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null
    };
    //赋值
    var setJqueryMap = function () {
        jqueryMap.$container = $('#' + configMap.uuid + '-manager-container');
        jqueryMap.$blockTarget = $('body');
    };


    function delnull(d) {
        if (d == undefined) {
            return '';
        }
        if (d == 'null') {
            return '';
        }
        return d;
    }

    var initlistGrid = function () {
        configMap.listGrid = $('#' + configMap.uuid + 'ManagerList_m', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false, //屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.path + configMap.dataUrl,
                "dataSrc": "aaData",
                "method": "POST",
                "data": function (data) {
                    var ypmc = $('input[name="ypmc"]', jqueryMap.$container).val();
                    data.ypmc = ypmc;
                    data.ypbm =$('input[name="ypbm"]', jqueryMap.$container).val();
                    data.ifsgr = $("[name='ifsgr']", jqueryMap.$container).val();
                }
            },
            "columns": [

                {
                    "data": "ID",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
                    }
                },
                {
                    className: "text-center",
                    "render": function (data, type, row) {
                        var btn = "";
                        //btn = btn + configMap.viewBtn_html;
                        btn = btn + configMap.viewZxrBtn_html;
                        return btn;
                    }

                },
                // {
                //     "data": "HTMC",
                //     render: function (d, t, r) {
                //         d = delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                //     }
                // },
                {
                    "data": "YPBM",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "YPMC",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "JCXM",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "DWMC",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "SFMC",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "CSMC",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "XJMC",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                // {
                //     "data": "BGBZZT",
                //     render: function (d, t, r) {
                //         //000未分配，001已分配，002，检测通过，003检测未通过
                //         if (d == '000') {
                //             d = "未分配";
                //         }
                //         if (d == '001') {
                //             d = "已分配";
                //         }
                //         if (d == '002') {
                //             d = "通过";
                //         }
                //         if (d == '003') {
                //             d = "未通过";
                //         }
                //         d = delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                //     }
                // },
                {
                    "data": "bgzjsp",
                    render: function (d, t, r) {
                        //000未分配，001已分配，002，检测通过，003检测未通过
                        if (d == '000') {
                            d = "未分配";
                        }
                        if (d == '001') {
                            d = "已分配";
                        }
                        if (d == '002') {
                            d = "通过";
                        }
                        if (d == '003') {
                            d = "未通过";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "BGSHZT",
                    render: function (d, t, r) {
                        //000未分配，001已分配，002，检测通过，003检测未通过
                        if (d == '000') {
                            d = "未分配";
                        }
                        if (d == '001') {
                            d = "已分配";
                        }
                        if (d == '002') {
                            d = "通过";
                        }
                        if (d == '003') {
                            d = "未通过";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "BGPZZT",
                    render: function (d, t, r) {
                        //000未分配，001已分配，002，校验通过，003校验未通过
                        if (d == '000') {
                            d = "未分配";
                        }
                        if (d == '001') {
                            d = "已分配";
                        }
                        if (d == '002') {
                            d = "通过";
                        }
                        if (d == '003') {
                            d = "未通过";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                 }
                // {
                //     "data": "BGDYZT",
                //     render: function (d, t, r) {
                //         //000未分配，001已分配，002，检查通过，003检查未通过
                //         if (d == '000') {
                //             d = "未分配";
                //         }
                //         if (d == '001') {
                //             d = "已分配";
                //         }
                //         if (d == '002') {
                //             d = "通过";
                //         }
                //         if (d == '003') {
                //             d = "未通过";
                //         }
                //         d = delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                //     }
                // }
                ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands": ",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () { // 数据加载完成后执行
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);
                var delContainer = $('[data-type="del"]', jqueryMap.$container);
                var editContainer = $('[data-type="bianji"]', jqueryMap.$container);
                var chakanContainer = $('[data-type="chakan"]', jqueryMap.$container);
                var chakan_zxrContainer = $('[data-type="chakan_zxr"]', jqueryMap.$container);


                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }

                if (chakanContainer.length > 0) {
                    chakanContainer.off('click').on('click', chakan);
                }

                if (chakan_zxrContainer.length > 0) {
                    chakan_zxrContainer.off('click').on('click', chakan_zxr);
                }


                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', bianji);
                }
                if (delContainer.length > 0) {
                    delContainer.confirmation({
                        "title": '确定要删除？',
                        "btnOkLabel": '是',
                        "btnCancelLabel": '否',
                        "placement": 'left',
                        "onConfirm": del,
                        "btnOkClass": 'btn btn-danger borderRadius4',
                        "btnCancelClass": "btn btn-default borderRadius4"
                    });
                }
            }
        });
    }

    //编辑
    var bianji = function () {
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().zjdm;
        openModal("编辑", configMap.path + configMap.edit_Url + "?zjdm=" + encodeURI(id), 'bianji');
    }

    //查看执行人
    var chakan_zxr = function () {
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().ID;
        openModal("查看执行人", configMap.path + configMap.edit_Url + "?id=" + encodeURI(id), 'chakan');
    }

    var chakan = function () {
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().ID;
        POBrowser.openWindowModeless('/customermanage/openword.do?id=' + id, 'width=1200px;height=800px;');
        return;
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().ID;
        openModal("查看执行人", configMap.path + '/pageoffice/index.jsp' + "?id=" + encodeURI(id), 'chakan');
    }

    //删除
    var del = function (event, element) {
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在删除数据，请稍候...'
        });
        var rowIndex = configMap.listGrid.cell(element.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().zjdm;
        $.ajax({
            data: {"zjdm": id},
            url: configMap.path + configMap.del_dataUrl,
            type: 'POST',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.listGrid.ajax.reload();
                    Messenger().post("删除成功!");
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
    };


//  var a = {
//     alertA: function() {
//    	 alert("1111")
//     }
//  };
//  a.alertA();
    //创建模态框
    var openModal = function (title, url, type) {
        var dialogButtons = {};
        if (type == 'bianji') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    edit.save(function (data) {
                        if (data) {
                            configMap.listGrid.ajax.reload();
                            jqueryMap.$Dialog.modal("hide");
                        } else {
                            return false;
                        }
                    })
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn btn-default borderRadius4 color666'
        }
        $.get(url, function (html) {
            jqueryMap.$Dialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var openModal1 = function (title, url, type) {
        ;
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
                    data.lx = configMap.lx;
                    //获取选中的ID


                    jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                        ;
                        var el = $(this);
                        var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                        var id = configMap.listGrid.row(rowIndex).data().ID;
                        strArr.push(id);
                    });

                    var str1 = strArr.join(',');
                    data.id = str1;
                    console.log(data)
                    $.ajax({
                        data: data,
                        url: configMap.path + '/' + prefix + '/saveZxry',
                        type: 'POST',
                        success: function (result) {
                            App.unblockUI(jqueryMap.$blockTarget);
                            if (result.success) {
                                configMap.listGrid.ajax.reload();
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

    var fpifsgr = function() {
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
       var $el = $(this);
       var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
       var ifsgr = configMap.listGrid.row(rowIndex).data().if_sgr;
       console.log(ifsgr)
            if (ifsgr=='1'){
                document.getElementById("bgzjsp").style.display = "none";
            }
            if (ifsgr=='0'){
                document.getElementById("bgzjsp").style.display = "block";
            }
        });
   }


    //分配判断，状态不能重复分配
    function fppd() {
        var flag = true;
        if (configMap.lx == '0') {
            //判断所有选中的样品检测状态，不能出现已经分配的
            jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                var el = $(this);
                var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                var YPJCZT = configMap.listGrid.row(rowIndex).data().BGBZZT;
                if (YPJCZT != '000') {
                    Messenger().post("报告编制不能重复分配!");
                    flag = false;
                    return;
                }

            });
        }

        if (configMap.lx == '1') {
            //判断所有选中的样品检测状态，不能出现已经分配的
            jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                var el = $(this);
                var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                var YPJCZT = configMap.listGrid.row(rowIndex).data().BGSHZT;
                if (YPJCZT != '000') {
                    Messenger().post("报告审核不能重复分配!");
                    flag = false;
                    return;
                }

            });
        }
        if (configMap.lx == '2') {
            //判断所有选中的数据校验状态，不能出现已经分配的
            jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                var el = $(this);
                var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                var SJJYZT = configMap.listGrid.row(rowIndex).data().BGPZZT;
                if (SJJYZT != '000') {
                    Messenger().post("报告批准不能重复分配!");
                    flag = false;
                    return;
                }

            });
        }
        if (configMap.lx == '3') {
            //判断所有选中的数据审查状态，不能出现已经分配的
            jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                var el = $(this);
                var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                var SJSCZT = configMap.listGrid.row(rowIndex).data().BGDYZT;
                if (SJSCZT != '000') {
                    Messenger().post("报告打印不能重复分配!");
                    flag = false;
                    return;
                }
            });
        }
        return flag;
    }

    //增加下拉的option
    var addoption = function () {
        $.post("customermanage/bggl/zjrydm?date=" + new Date().getTime(), {//报告主键人
        }, function (data) {
            $("#bgfp_bgbz").empty();
            $("#bgfp_bgbz").append($("<option value=''>下拉选择人员</option>"))
            for (var i = 0; i < data.length; i++) {
                var $val = $("<option value=" + data[i].zydm + ">" + data[i].name + "</option>");
                $("#bgfp_bgbz").append($val);
            }
        }, "json");
        $.post("customermanage/bggl/shrydm?date=" + new Date().getTime(), {//报告审核
        }, function (data) {
            $("#bgfp_bgsh").empty();
            $("#bgfp_bgsh").append($("<option value=''>下拉选择人员</option>"))
            for (var i = 0; i < data.length; i++) {
                var $val = $("<option value=" + data[i].zydm + ">" + data[i].name + "</option>");
                $("#bgfp_bgsh").append($val);
            }
        }, "json");
        $.post("customermanage/bggl/pzrydm?date=" + new Date().getTime(), {//报告批准
        }, function (data) {
            $("#bgfp_bgpz").empty();
            $("#bgfp_bgpz").append($("<option value=''>下拉选择人员</option>"))
            for (var i = 0; i < data.length; i++) {
                var $val = $("<option value=" + data[i].zydm + ">" + data[i].name + "</option>");
                $("#bgfp_bgpz").append($val);
            }
        }, "json");
        // $.post("customermanage/bggl/rydm?date=" + new Date().getTime(), {//报告打印
        // }, function (data) {
        //     $("#bgfp_bgdy").empty();
        //     $("#bgfp_bgdy").append($("<option value=''>下拉选择人员</option>"))
        //     for (var i = 0; i < data.length; i++) {
        //         var $val = $("<option value=" + data[i].zydm + ">" + data[i].name + "</option>");
        //         $("#bgfp_bgdy").append($val);
        //     }
        // }, "json");
    }
    return {
        init: function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
            initlistGrid();
            $('#searchTerm-m', jqueryMap.$container).on('click', function () {
                configMap.listGrid.ajax.reload();
            });


            $('#' + configMap.uuid + 'btnNew', jqueryMap.$container).on('click', function () {
                openModal("新增证件信息", configMap.path + configMap.edit_Url, 'bianji');
            });

            jqueryMap.$container.find("[name='ifsgr']").on('change', function () {//种类改变时触发
                configMap.listGrid.ajax.reload();
            })

            $('[name=rwfp_checkbox]', jqueryMap.$container).on('click', function () {
                if ($("[name=rwfp_checkbox]", jqueryMap.$container).prop("checked")) {
                    //选中
                    $("[name=checkbox_checkbox]", jqueryMap.$container).prop("checked", true);
                } else {
                    $("[name=checkbox_checkbox]", jqueryMap.$container).prop("checked", false);
                }
            });

            $($('#' + uuid + 'btn_bgbz')).off('click').on('click', function () {
                //样品检测 1
                configMap.lx = '0';
                if (fppd()) {
                    ;
                    openModal1('报告编制-选择执行人', '/systemmanager/businesscooperate/staffList.jsp?type=any', 'edit2');
                }
            });

            $($('#' + uuid + 'btn_ypjc')).off('click').on('click', function () {
                //样品检测 1
                configMap.lx = '1';
                if (fppd()) {
                    ;
                    openModal1('报告审核-选择执行人', '/systemmanager/businesscooperate/staffList.jsp?type=any', 'edit2');
                }
            });

            $($('#' + uuid + 'btn_sjjy')).off('click').on('click', function () {
                //数据校验 2
                configMap.lx = '2';
                if (fppd()) {
                    openModal1('报告批准-选择执行人', '/systemmanager/businesscooperate/staffList.jsp?type=any', 'edit2');
                }
            });

            $($('#' + uuid + 'btn_sjsc')).off('click').on('click', function () {
                //数据审查 3
                configMap.lx = '3';
                if (fppd()) {
                    openModal1('报告打印-选择执行人', '/systemmanager/businesscooperate/staffList.jsp?type=any', 'edit2');
                }
            });
            $($('#' + uuid + 'btn_bgfp')).off('click').on('click', function () {//分配按钮
                var ids = [];//定义一个数组
                $("[name=checkbox_checkbox]:checked", jqueryMap.$container).each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
                    ids.push($(this).val());//将选中的值添加到数组ids中
                });
                if (ids.length <= 0) {
                    Messenger().post("请选择分配数据!");
                    return;
                }
                var flag4 = true;  //主检
                var flag1 = true;  //审核
                var flag2 = true;   //批准
              //  var flag3 = true;  //打印
                $("#bgfpmodal", jqueryMap.$container).modal({show: true});
                fpifsgr();
                addoption();
                $($('#' + uuid + 'bgfp_manage')).off('click').on('click', function () {//提交数据
                    App.blockUI({
                        target: jqueryMap.$blockTarget,
                        boxed: true,
                        message: '数据正在提交，请稍候...'
                    });
                    var data = {};
                    var bzr = document.getElementById("bgfp_bgbz").value;//主检人
                    if (bzr != null && bzr != '') {
                        configMap.lx = '4';
                        flag4 = fppd();
                        data.bzr = bzr;
                        data.bzrlx = '4';
                    }
                    var shr = document.getElementById("bgfp_bgsh").value;//审核人
                    if (shr != null && shr != '') {
                        configMap.lx = '1';
                        flag1 = fppd();
                        data.shr = shr;
                        data.shrlx = '1';
                    }
                    var pzr = document.getElementById("bgfp_bgpz").value;//批准人
                    if (pzr != null && pzr != '') {
                        configMap.lx = '2';
                        flag2 = fppd();
                        data.pzr = pzr;
                        data.pzrlx = '2';
                    }
                    // var dyr = document.getElementById("bgfp_bgdy").value;//打印人
                    // if (dyr != null && dyr != '') {
                    //     configMap.lx = '3';
                    //     flag3 = fppd();
                    //     data.dyr = dyr;
                    //     data.dyrlx = '3';
                    // }
                    if(flag4 && flag1 && flag2){
                        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                            var el = $(this);
                            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                            var id = configMap.listGrid.row(rowIndex).data().ID;
                            data.ypid = id;
                            $.ajax({
                                data: data,
                                url: configMap.path + '/' + prefix + '/saveBgfp',
                                type: 'POST',
                                success: function (result) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    if (result.success) {
                                        $("#bgfpmodal", jqueryMap.$container).modal('hide');
                                        configMap.listGrid.ajax.reload();
                                        Messenger().post("分配成功!");
                                    } else {
                                        Messenger().post({
                                            message: result.message,
                                            type: 'error'
                                        });
                                    }
                                },
                                error: function () {
                                    $("#bgfpmodal", jqueryMap.$container).modal('hide');
                                    App.unblockUI(jqueryMap.$blockTarget);
                                }
                            });
                        });
                    }else {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }

                });
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();