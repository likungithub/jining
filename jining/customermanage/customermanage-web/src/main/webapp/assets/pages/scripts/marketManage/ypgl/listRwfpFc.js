var list = function () {
    'use strict';

    var prefix = 'jcglFc';

    // 全局属性参数
    var configMap = {
        dataUrl: '/' + prefix + '/querylist',
        edit_Url: '/marketManage/ypgl/rwfpXz.jsp',
        listGrid: null,
        uuid: '',
        lx: ''
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
        $Dialog: null
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
                    data.ypmc = $('[name="ypmc"]', jqueryMap.$container).val();
                    data.ypbm = $('[name="ypbm"]', jqueryMap.$container).val();
                    data.fpzt = $('[name="fpzt"]', jqueryMap.$container).val();
                }
            },
            "columns": [

                {
                    class: "text-left",
                    "data": "ID",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';//样品ID
                    }
                },
                {
                    class:"text-center",
                    "data": "YPBM",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }

                },
                {
                    class:"text-center",
                    "data": "YPMC",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    data:"DWMC",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"YPSL",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data":"YPDW",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "IF_CY",
                    "render": function (data) {
                        return data == 1?'抽样':'送样';
                    }
                },
                {
                    class:"text-center",
                    "data": "BZQ",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "FPZT",
                    "render": function (data) {
                        var d = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" >' + d + '</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YP_FPRQ",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YP_JCRY",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
                    }
                },
                {
                    class:"text-center",
                    "data": "YP_FHRY",
                    "render": function (data) {
                        var d = delnull(data)
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="'+ d+'">'+d+'</span>';
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
//   002 任务分配
    var saveZt = function (zt) {
        var if_fpzt = false;//分配状态
        var data = {};//创建一个json对象
        var ypids=[];
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var ypSffp = configMap.listGrid.row(rowIndex).data().YP_SFFP;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            if (ypSffp == '002') {
                    if_fpzt = true;
                    return;
            }
            ypids.push(id);
        });

        if (if_fpzt) {
            Messenger().post({
                message: "存在已分配的样品，不能重复分配!",
                type: "warning"
            });
            return;
        }

        if (ypids.length == 0) {
            Messenger().post({
                message: "请选分配的样品!",
                type: "warning"
            });
            return;
        }
        data.zt = zt;
        var success_flag = true;

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
                if (fhry == null || fhry == "") {
                    Messenger().post({
                        message: "请选择检测复核人员",
                        type: "warning"
                    });
                    return;
                }
                data.zxry = zxry;//.join(",");
                data.fhry = fhry;
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在保存数据，请稍候...'
                });
                var ids = [];
            jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                    var el = $(this);
                    var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                    var ypid = configMap.listGrid.row(rowIndex).data().ID;
                    ids.push(ypid);
                });
                data.id = ids.join(",");
                $.ajax({
                    data: data,
                    url: configMap.path + '/' + prefix + '/rwfp_ypjc',
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
            // $("#btn_back", jqueryMap.$container).off("click").on("click", function () {//取消任务分配
            //     saveZt("001");
            // });
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

        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();