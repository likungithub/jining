var rwfpFclist = function () {
    'use strict';

    var prefix = 'jcgl';

    // 全局属性参数
    var configMap = {
        dataUrl: '/' + prefix + '/querylist',
        edit_Url: '/' + prefix + '/rwfpfc/fpryxzFc.jsp',
        listGrid: null,
        uuid: '',
        lx: '',

    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $Dialog: null,
        $logstarDate:null,
        $content:null
    };
    //赋值
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#' + configMap.uuid + '-manager-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#'+uuid+'-manager-container');
        jqueryMap.$manualdata=jqueryMap.$content.find('table#log_data');
        jqueryMap.$logstarDate=jqueryMap.$content.find('div#fpsj_div');
        jqueryMap.$logendDate=jqueryMap.$content.find('div#endDate_Div');
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
                    data.ypmc = $('[name="ypmc"]', jqueryMap.$container).val();
                    data.jcxmc = $('[name="jcxmc"]', jqueryMap.$container).val();
                    data.fpzt = $('[name="fpzt"]', jqueryMap.$container).val();
                    data.tjzt = $('[name="tjzt"]', jqueryMap.$container).val();
                    data.ypbm = $('[name="ypbm"]', jqueryMap.$container).val();
                    data.fpsj = $('[name="fpsj"]', jqueryMap.$container).val();
                    data.zbks = $('[name="zbks"]', jqueryMap.$container).val();
                }
            },
            "columns": [

                {
                    class: "text-left",
                    "data": "jcxmid",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypid",//ypid
                    "render": function (data, type, row) {
                        return '<input style="display: none" type="text" name="ypid"  value=' + data + '>';
                    }
                },
                {
                    class: "text-center",
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input style="display: none" type="text" name="id"  value=' + data + '>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypid",
                    "render": function (data, type, row) {
                        return '<input style="display: none" type="text" name="rydmid"  value=' + data + '>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypmc",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "zbypbm",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "jcxmc",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "ZBKS_MC",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "wtslrq",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },

                {
                    class: "text-center",
                    "data": "rwfp",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        if (data == '002') {
                            data = "已分配";
                        } else {
                            data = "未分配";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "tjzt",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        if (data == '0') {
                            data = "未检测";
                            return '<span style="display: inline-block;color:red;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                        } else if (data == '1') {
                            data = "已检测";
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                        } else {
                            data = "";
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                        }
                    }
                },
                {
                    class: "text-center",
                    "data": "rwfpsj",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "jcr",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "fhry",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

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
                var tootipContainer = $('[data-toggle="tooltip"]', jqueryMap.$container);

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
            }
        });
    }

    //创建模态框
    var openModal = function (title, url, type, func) {
        var dialogButtons = {};
        if (type == 'fp') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
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
//001 取消任务   002 任务分配
    var saveZt = function (zt) {
        var if_fpzt = false;//分配状态
        var if_tjzt = false;//提交状态
        var jcxmids = [];
        var data = {};//创建一个json对象
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var jcxmid = configMap.listGrid.row(rowIndex).data().jcxmid;
            var fpzt = configMap.listGrid.row(rowIndex).data().fpzt;
            var tjzt = configMap.listGrid.row(rowIndex).data().tjzt;

            jcxmids.push(jcxmid);
            if (zt == '002') {
                if (fpzt != '001') {
                    if_fpzt = true;
                    return;
                }
            }
            if (tjzt != '0') {
                if_tjzt = true;
                return;
            }
        });
        if (jcxmids.length == 0) {
            Messenger().post({
                message: "请选分配数据!",
                type: "warning"
            });
            return;
        }
        /*if (jcxmids.length > 1) {
            Messenger().post({
                message: "请选择一个样品!",
                type: "warning"
            });
            return;
        }*/
        /*if (if_fpzt) {
            Messenger().post({
                message: "请勿重复分配",
                type: "warning"
            });
            return;
        }*/
        if (if_tjzt) {
            Messenger().post({
                message: "检测项已检测!",
                type: "warning"
            });
            return;
        }
        data.zt = zt;
        var success_flag = true;
        if (zt == "002") {//任务分配
            openModal("检测任务分配", configMap.path + configMap.edit_Url, "fp", function () {
                
                var zxry = rwfp_ypjc.getData();

                if (zxry == null || zxry == "") {
                    Messenger().post({
                        message: "请选择任务分配人员",
                        type: "warning"
                    });
                    return;
                }
                var fhry = rwfp_ypjc.getFHRY();
                console.log("fhry"+fhry);
                console.log("zxry="+zxry +"====");
                if (fhry == null || fhry == "") {
                    Messenger().post({
                        message: "请选择检测复核人员",
                        type: "warning"
                    });
                    return;
                }
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在保存数据，请稍候...'
                });
                var jcxmids = [];
                var ypids = [];
                var ids = [];
                jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                    var el = $(this);
                    var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                    jcxmids.push(configMap.listGrid.row(rowIndex).data().jcxmid);
                    ypids.push(configMap.listGrid.row(rowIndex).data().ypid);
                    ids.push(configMap.listGrid.row(rowIndex).data().id);
                });
                console.log("ypids.join="+ypids.join(","));
                console.log("ids.join="+ids.join(","));
                data.jcxmid = jcxmids.join(";");
                data.ypid = ypids.join(",");
                data.id = ids.join(",");
                //data.zxry = zxry;
                data.fhry = fhry;
                // console.log("data="+data.toString());
                // return;
                $.ajax({
                    data: data,
                    url: configMap.path + '/' + prefix + '/rwfp_ypjc?zxry='+zxry,
                    type: 'POST',
                    async: false,
                    success: function (result) {
                        console.log(JSON.stringify(result));
                        if (result.success) {
                            configMap.listGrid.ajax.reload();
                            App.unblockUI(jqueryMap.$blockTarget);
                            Messenger().post({
                                message: "分配成功",
                                type: "success"
                            });
                        } else {
                            configMap.listGrid.ajax.reload();
                            App.unblockUI(jqueryMap.$blockTarget);
                            Messenger().post({
                                message: "分配失败!",
                                type: "error"
                            });
                        }
                    },
                    error: function () {
                        configMap.listGrid.ajax.reload();
                        App.unblockUI(jqueryMap.$blockTarget);
                        Messenger().post({
                            message: "网络连接异常，请稍后重试!",
                            type: "error"
                        });
                    }
                });

            });
        }
        if (zt == "001") {//取消任务分配
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在保存数据，请稍候...'
            });
            jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                var el = $(this);
                var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                data.jcxmid = configMap.listGrid.row(rowIndex).data().jcxmid;
                data.rydmid = configMap.listGrid.row(rowIndex).data().rydmid;
                data.ypid = configMap.listGrid.row(rowIndex).data().ypid;
                data.id = configMap.listGrid.row(rowIndex).data().id;
                $.ajax({
                    data: data,
                    url: configMap.path + '/' + prefix + '/rwfp_ypjc',
                    type: 'POST',
                    async: false,
                    success: function (result) {
                        if (result.success) {
                            success_flag = true;
                        } else {
                            success_flag = false;
                            return;
                        }
                    },
                    error: function () {
                        success_flag = false;
                        return;
                    }
                });
            });
            if (success_flag) {
                configMap.listGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: "退回成功",
                    type: "success"
                });
            } else {
                configMap.listGrid.ajax.reload();
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: "退回失败!",
                    type: "error"
                });
            }
        }

    }
    return {
        init: function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
            initlistGrid();
            $('#searchTerm-m', jqueryMap.$container).on('click', function () {//查询
                configMap.listGrid.ajax.reload();
            });
            $('#reset', jqueryMap.$container).on('click', function () {//重置
                $("input", jqueryMap.$container).val("");
                $("select", jqueryMap.$container).val("");
                configMap.listGrid.ajax.reload();
            });
            $('#btn_ypjc', jqueryMap.$container).off('click').on('click', function () {//任务分配
                saveZt("002");
            });
            $("#btn_back", jqueryMap.$container).off("click").on("click", function () {//取消任务分配
                saveZt("001");
            });
            $("[name='fpzt']", jqueryMap.$container).off("change").on("change", function () {//下拉分配状态触发
                configMap.listGrid.ajax.reload();
            })
            $("[name='tjzt']", jqueryMap.$container).off("change").on("change", function () {//下拉检测状态触发
                configMap.listGrid.ajax.reload();
            });
            $('[name="ck"]', jqueryMap.$container).on('click', function () {
                if ($('[name="ck"]', jqueryMap.$container).prop("checked")) {
                    //选中
                    $('[name="checkbox_checkbox"]', jqueryMap.$container).prop("checked", true);
                } else {
                    $('[name="checkbox_checkbox"]', jqueryMap.$container).prop("checked", false);
                }
            });

            jqueryMap.$content.find('.beginTime').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                forceParse: false,
                language: 'zh-CN'
            });
            jqueryMap.$content.find('[name=fpsj]').val(moment().format("YYYY-MM-DD"));
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();