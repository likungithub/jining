var list = function () {
    'use strict';

    var prefix = 'jcxfywh';
    // 全局属性参数
    var configMap = {
        dataUrl: '/' + prefix + '/querylist',
        edit_Url: '/bggl/jcxfywh/edit.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan" data-toggle="tooltip" title="费用控制"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        fykzListGrid: null,
        uuid: '',
        lx: '',
        flag: false
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $blockTarget: null
    };
    //赋值
    var setJqueryMap = function () {
        jqueryMap.$container = $('#' + configMap.uuid + '-cost-container');
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
        configMap.fykzListGrid = $('#ManagerList_Cost', jqueryMap.$container).DataTable({
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
                    data.wtid = $('input[name="wtid"]', jqueryMap.$container).val();
                }
            },
            "columns": [
                {
                    class: "text-left",
                    "data": "wtid",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypid",
                    "render": function (data, type, row) {
                        return '<input type="hidden" name="ypid"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    render: function (d, t, r) {
                        return configMap.viewBtn_html;
                    }
                },
                {
                    class: "text-center",
                    "data": "wtdbm",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "ypbm",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
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
                    "data": "jcxm",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "lrsj",
                    render: function (d, t, r) {
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
                var viewContainer = $('[data-type="chakan"]', jqueryMap.$container);//费用控制

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if (viewContainer.length > 0) {
                    viewContainer.off('click').on('click', bianji);//费用控制
                }
            }
        });
    }
    //创建模态框
    var openModal = function (title, url, type) {  //这是检测值录入的模态框
        var dialogButtons = {};
        if (type == 'bianji') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    fykzlr.save(function (data) {
                        if (data) {
                            configMap.fykzListGrid.ajax.reload();
                            jqueryMap.$Dialog.modal("hide");
                        } else {
                            jqueryMap.$Dialog.modal("hide");
                        }
                    })
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
                buttons: dialogButtons,
                size:"large"
            });
        });
    };
    var bianji = function () {//费用控制
        var el = $(this);
        var rowIndex = configMap.fykzListGrid.cell(el.parent()).index().row;
        var id = configMap.fykzListGrid.row(rowIndex).data().ypid;
        openModal("费用控制", configMap.path + configMap.edit_Url + "?id=" + encodeURI(id), 'bianji');

    }

    return {
        init: function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
            initlistGrid();
            $('#searchTerm-cost', jqueryMap.$container).on('click', function () {//查询按钮
                configMap.fykzListGrid.ajax.reload();
            });

            $("[name='costId_checkbox']", jqueryMap.$container).on('click', function () {//多选反选
                if ($("[name='costId_checkbox']", jqueryMap.$container).prop("checked")) {
                    //选中
                    $("[name='checkbox_checkbox']", jqueryMap.$container).prop("checked", true);
                } else {
                    $("[name='checkbox_checkbox']", jqueryMap.$container).prop("checked", false);
                }
            });

            $("#searchTerm-resetCost", jqueryMap.$container).click(function () {//重置
                $("input", jqueryMap.$container).val("");
                configMap.fykzListGrid.ajax.reload();
            });
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();