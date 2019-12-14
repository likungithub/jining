var jcrwlq = function () {
    'use strict';

    var prefix = 'jcgl/rwlq';
    // 全局属性参数
    var configMap = {
        dataUrl: '/' + prefix + '/querylistjcrwlq',
        rwlqlistGrid: null,
        uuid: '',
        lx: '',
        jclbdm:"",
        flag: false,
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null,
    };
    //赋值
    var setJqueryMap = function () {
        jqueryMap.$container = $('#' + configMap.uuid + '-jclq-container');
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$manualdata = jqueryMap.$container.find('#ManagerList_ypjc');
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
        configMap.rwlqlistGrid = $('#ManagerList_ypjc', jqueryMap.$container).DataTable({
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
                    data.jcxmc = $('input[name="jcxmc"]', jqueryMap.$container).val();
                    data.jclbdm = configMap.jclbdm;
                }
            },
            "columns": [
                {
                    class: "text-left",
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_jclq"  value="' + data + '"/>';

                    }
                },
                {
                    class: "text-center",
                    "data": "ypmc",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbypbm",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "jcxm",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "wtid",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "wtslrq",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "lx",
                    render: function (d, t, r) {
                        if (d == '1') {
                            d = "检样1";
                        }
                        if (d == '2') {
                            d = "检样2";
                        }
                        if (d == '3') {
                            d = "检样3";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "lqzt",
                    render: function (d, t, r) {
                        //分配状态  001 未分配  002 已分配  003 已领取 (后加004检测完成？)
                        if (d == '002') {
                            d = "未领取";
                        }
                        if (d == '003') {
                            d = "已领取";
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
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

    function savezt() {//样品领取
        // console.log($("#rwlq_form", jqueryMap.$container).serialize());
        
        var ids = [];
        jqueryMap.$container.find('[name=checkbox_jclq]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.rwlqlistGrid.cell(el.parent()).index().row;
            var id = configMap.rwlqlistGrid.row(rowIndex).data().id;
            ids.push(id);
        });
        $.ajax({
            url: "customermanage/jcgl/rwlq/taskCollection",
            type: 'POST',
            traditional: true,//这里设置为true
         //   data: $("#rwlq_form", jqueryMap.$container).serialize(),
            data:{"ids":ids},
            success: function (res) {
                if (res.success) {
                    configMap.rwlqlistGrid.ajax.reload();
                    Messenger().post({
                        message: '领取成功',
                        type: 'success'
                    });
                } else {
                    Messenger().post({
                        message: '领取失败！',
                        type: 'error'
                    });
                }
            },
            error: function () {
                Messenger().post({
                    message: '领取失败！',
                    type: 'error'
                });
            }
        });
    }

    function saveth() {//样品领取
        // console.log($("#rwlq_form", jqueryMap.$container).serialize());

        var ids = [];
        jqueryMap.$container.find('[name=checkbox_jclq]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.rwlqlistGrid.cell(el.parent()).index().row;
            var id = configMap.rwlqlistGrid.row(rowIndex).data().id;
            ids.push(id);
        });
        $.ajax({
            url: "customermanage/jcgl/rwlq/taskBack",
            type: 'POST',
            traditional: true,//这里设置为true
            //   data: $("#rwlq_form", jqueryMap.$container).serialize(),
            data:{"ids":ids},
            success: function (res) {
                if (res.success) {
                    configMap.rwlqlistGrid.ajax.reload();
                    Messenger().post({
                        message: '退回成功！',
                        type: 'success'
                    });
                } else {
                    if (res.message && res.message != undefined) {
                        Messenger().post({
                            message: res.message,
                            type: 'error'
                        });
                    } else {
                        Messenger().post({
                            message: '退回失败！',
                            type: 'error'
                        });
                    }
                }
            },
            error: function () {
                Messenger().post({
                    message: '退回失败！',
                    type: 'error'
                });
            }
        });
    }

    function lyztpd() {//领取状态判断
        var flag = true;
        //判断所有选中的样品检测状态，不能出现已领取的
        var ids = [];
        jqueryMap.$container.find('[name=checkbox_jclq]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.rwlqlistGrid.cell(el.parent()).index().row;
            var fpzt = configMap.rwlqlistGrid.row(rowIndex).data().lqzt;
            var id = configMap.rwlqlistGrid.row(rowIndex).data().id;
            if (fpzt == '003') {
                flag = false;
                return;
            }
            ids.push(id);
        });
        if (ids.length == 0) {
            Messenger().post({
                message: "请选择数据!",
                type: 'warning'
            });
            flag = false;
        }
        return flag;
    }

    return {
        init: function (uuid,jclbdm) {
            configMap.uuid = uuid;
            configMap.jclbdm = jclbdm;
            setJqueryMap();
            initlistGrid();
            $('#searchTerm-m', jqueryMap.$container).on('click', function () {//查询按钮
                configMap.rwlqlistGrid.ajax.reload();
            });

            /*$("[name='rwfp_checkbox']", jqueryMap.$container).on('click', function () {//多选反选
                if ($("[name='rwfp_checkbox']", jqueryMap.$container).prop("checked")) {
                    //选中
                    $("[name='rwfp_checkbox']", jqueryMap.$container).prop("checked", true);
                } else {
                    $("[name='rwfp_checkbox']", jqueryMap.$container).prop("checked", false);
                }
            });*/
            $('#' + uuid + 'btn_ypjc_lq', jqueryMap.$container).off('click').on('click', function () {//领取
                if (!lyztpd()) {//领取状态判断
                    Messenger().post({
                        message: '样品已领取，不能执行领取操作！',
                        type: 'warning'
                    });
                    return;
                }

                savezt();
            });
            $('#' + uuid + 'btn_ypjc_th', jqueryMap.$container).off('click').on('click', function () {//领取
                if (lyztpd()) {//领取状态判断
                    Messenger().post({
                        message: '样品未领取，不能执行退回操作！',
                        type: 'warning'
                    });
                    return;
                }

                saveth();
            });

            $("#searchTerm-reset", jqueryMap.$container).click(function () {//重置
                $("input", jqueryMap.$container).val("");
                configMap.rwlqlistGrid.ajax.reload();
            });

        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();