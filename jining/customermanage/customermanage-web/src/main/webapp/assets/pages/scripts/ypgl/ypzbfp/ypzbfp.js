var ypzbfpList = function () {
    'use strict';

    var prefix = 'ypzbfp';

    // 全局属性参数
    var configMap = {
        dataUrl: '/' + prefix + '/queryAll',
        listGrid: null,
        rwfpJsp: "/ypgl/ypzbfp/rwfp.jsp"
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $ManageFrom: null,
        $blockTarget: null,
        $ManageDialog: null,
        $ManageDataTable: null,
    };
    //赋值
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#' + uuid + '-manager-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$ManageDataTable = $('#ManagerList', jqueryMap.$container);
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
        configMap.listGrid = jqueryMap.$ManageDataTable.DataTable({
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
                    data.ypbm = $("[name='ypbm']", jqueryMap.$container).val();
                    data.ypmc = $("[name='ypmc']", jqueryMap.$container).val();
                    data.zbfpzt = $("[name='zbfpzt']", jqueryMap.$container).val();
                }
            },
            "columns": [

                {
                    class: "text-left",
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypbm",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
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
                    "data": "scdw",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "if_sgr",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        if(data=="1"){
                            data="是";
                        }else {
                            data="否";
                        }
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "zbfpzt",
                    "render": function (data, type, row) {
                        if (data == "001") {
                            data = "未分配";
                        }
                        if (data == "002") {
                            data = "已分配";
                        }
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "ypzbzt",
                    "render": function (data, type, row) {
                        if (data == "001") {
                            data = "未制备";
                        }
                        if (data == "002") {
                            data = "已制备";
                        }
                        if (data == "003") {
                            data = "已提交";
                        }
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "zbrynames",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "zbfpsj",
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
        if (type == 'rwfp') {
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
    var saveFp = function () {//任务分配
        var if_fpzt = false;//分配状态
        var if_zbzt = false;//制备状态
        var ypids = [];
        var data = {};//创建一个json对象
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var ypid = configMap.listGrid.row(rowIndex).data().id;
            var zbfpzt = configMap.listGrid.row(rowIndex).data().zbfpzt;
            var ypzbzt = configMap.listGrid.row(rowIndex).data().ypzbzt;
            ypids.push(ypid);
            if (zbfpzt != '001') {
                if_fpzt = true;
                return;
            }
            if (ypzbzt != '001') {
                if_zbzt = true;
                return;
            }
        });
        if (ypids.length == 0) {
            Messenger().post({
                message: "请选分配数据!",
                type: "warning"
            });
            return;
        }
        if (if_fpzt) {
            Messenger().post({
                message: "请勿重复分配",
                type: "warning"
            });
            return;
        }
        if (if_zbzt) {
            Messenger().post({
                message: "样品已制备!",
                type: "warning"
            });
            return;
        }
        openModal("样品制备任务分配", configMap.path + configMap.rwfpJsp, "rwfp", function () {
            var zxry = rwfp_ypzb.getData();
            if (zxry == null || zxry == "") {
                Messenger().post({
                    message: "请选择任务分配人员",
                    type: "warning"
                });
                return;
            }
            data.zxry = zxry.join(",");
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '正在保存数据，请稍候...'
            });
            var success_flag = true;
            jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                var el = $(this);
                var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                data.ypid = configMap.listGrid.row(rowIndex).data().id;
                $.ajax({
                    data: data,
                    url: configMap.path + '/' + prefix + '/saveFp',
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
        });
    }
    var saveBack = function () {//任务退回
        var if_zbzt = false;//制备状态
        var ypids = [];
        var data = {};//创建一个json对象
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var ypid = configMap.listGrid.row(rowIndex).data().id;
            var ypzbzt = configMap.listGrid.row(rowIndex).data().ypzbzt;
            ypids.push(ypid);
            if (ypzbzt != '001') {
                if_zbzt = true;
                return;
            }
        });
        if (ypids.length == 0) {
            Messenger().post({
                message: "请选分配数据!",
                type: "warning"
            });
            return;
        }
        if (if_zbzt) {
            Messenger().post({
                message: "样品已制备!",
                type: "warning"
            });
            return;
        }
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在保存数据，请稍候...'
        });
        var success_flag = true;
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            data.ypid = configMap.listGrid.row(rowIndex).data().id;
            $.ajax({
                data: data,
                url: configMap.path + '/' + prefix + '/saveBack',
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
    return {
        init: function (uuid) {
            setJqueryMap(uuid);
            initlistGrid();
            jqueryMap.$container.find("#searchTerm-m").on("click", function () {//查询
                configMap.listGrid.ajax.reload();
            });
            jqueryMap.$container.find("#reset").on("click", function () {//重置
                $("[name='ypbm']", jqueryMap.$container).val("");
                $("[name='ypmc']", jqueryMap.$container).val("");
                $("[name='zbfpzt']", jqueryMap.$container).val("");
                configMap.listGrid.ajax.reload();
            });
            jqueryMap.$container.find("[name='zbfpzt']").on("change", function () {//下拉触发事件
                configMap.listGrid.ajax.reload();
            });
            jqueryMap.$container.find("#btn_rwfp").on("click", function () {//任务分配
                saveFp();
            });
            jqueryMap.$container.find("#btn_back").on("click", function () {//任务退回
               saveBack();
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