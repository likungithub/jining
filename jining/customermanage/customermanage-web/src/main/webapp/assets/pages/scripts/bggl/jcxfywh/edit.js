var fykzlr = function () {
    'use strict';

    var prefix = 'jcgl/sjxg';

    // 全局属性参数
    var configMap = {
        jcx: "",
        jcxmids: [],
        ids: [],
        id: '',
        path: '',
        uuid: '',
        addyqUrl: '/ypjc/addYq',
        addyqJsp: '/jcgl/ypjc/addYq.jsp',
        addbzwzJsp:'/jcgl/ypjc/addbzwz.jsp',
        dataUrl: '/' + prefix + '/QueryOne',
        updateUrl: '/' + prefix + '/updateData',
        addUrl: '/' + prefix + '/add',
        initGridfykzedit: null,
        xlz: null,
        m_bzwz :''
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $container: null,
        $editForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$container = $('#' + configMap.uuid + '-fykzEdit-container');
        jqueryMap.$editForm = $('#' + configMap.uuid + 'editForm');
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
        configMap.initGridfykzedit = $('#ManagerList_ypjcedit', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "dataSrc": "aaData",
                "url": "customermanage/jcxfywh/fywhEdit",
                "method": "POST",
                "data": function (data) {
                    data.jcxmc = $("#jcxmc", jqueryMap.$container).val();
                    data.ypid1 = configMap.id;
                }
            },
            "columns": [
                {
                    class: "text-center",
                    "data": "jcxmid",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="fykzche"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "wtid",
                    "render": function (data, type, row) {
                        return '<input type="hidden" name="wtdbm"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zwmc",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "yqnames",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "jcx",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "jcz",
                    "render": function (data, type, row) {
                         data = delnull(data);
                         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },
                /*{
                    class: "text-center",
                    "data": "wd",
                    "render": function (data, type, row) {
                            data = delnull(data);
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';

                    }
                },
                {
                    class: "text-center",
                    "data": "sd",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }
                },*/
                {
                    class: "text-center",
                    "data": "fy",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<input type="text" style="width: 66px" id="wd1_id" name="fy"  value=' + data + '> ';
                      }

                },
                {
                    class: "text-center",
                    "data": "bz",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<input type="text" style="width: 120px" id="wd1_id" name="bz"  value=' + data + '> ';
                    }

                },
                {
                    class: "text-center",
                    "data": "e_date",
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

                }
            ],
            "language": {
                "zeroRecords": "暂时没有数据",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有数据",
                "sInfoThousands": ",",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "drawCallback": function () {//加载完数据之后执行
                var tootip1Container = $('[data-toggle="tooltip"]', jqueryMap.$container);

                if (tootip1Container.length > 0) {
                    tootip1Container.tooltip();
                }

            }
        });
    }

    /*检测项名称查询*/
    var fywhSeach = function () {
        configMap.initGridfykzedit.ajax.reload();
    }
    /*重置查询项*/
    var fywhReast = function () {
        $("#jcxmc", jqueryMap.$container).val("");
        configMap.initGridfykzedit.ajax.reload();
    }

    var save = function (callback) { //费用控制录入保存操作
        var strArr = [];
        jqueryMap.$container.find('[name=fykzche]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.initGridfykzedit.cell(el.parent()).index().row;
            var jcxmid = configMap.initGridfykzedit.row(rowIndex).data().jcxmid;
            strArr.push(jcxmid);
        });

        if (strArr.length == 0) {
            Messenger().post({
                message: "请选择提交数据!",
                type: "warning"
            });
        }
        else {
            bootbox.dialog({
                title: '提示',
                message: '确定要提交费用信息么？',
                buttons: {
                    success: {
                        label: '<i class="fa fa-success"></i> 确&nbsp;定 ',
                        className: "btn btn-danger borderRadius4",
                        callback: function () {
                            App.blockUI({
                                target: jqueryMap.$blockTarget,
                                boxed: true,
                                message: '正在保存数据...'
                            });
                            var jcflag1 = false;//最后的弹窗提示
                            $('input[name="fykzche"]:checked', jqueryMap.$container).each(function () {//遍历每一个名字为ypjcche的复选框，其中选中的执行函数
                                
                                var dd = $(this);
                                configMap.jcxmids.push($(this).val());//将选中的值添加到数组ids中
                                var rowIndex = configMap.initGridfykzedit.cell(dd.parent()).index().row;
                                debugger;
                                var data = [
                                    {
                                        jcxid: $(dd).parent().parent().children("td:eq(0)").children().val(),//样品检测项id
                                        wtid: $(dd).parent().parent().children("td:eq(1)").children().val(),//委托id
                                        fy: $(dd).parent().parent().children("td:eq(6)").children().val(),//费用
                                        bz: $(dd).parent().parent().children("td:eq(7)").children().val(),//备注
                                        ypid: configMap.id,
                                    }
                                ];
                                var str_json = JSON.stringify(data);
                                $.ajax({
                                    url: "customermanage/jcxfywh/insertFYKZ",
                                    type: 'POST',
                                    data: {"questionsList": str_json},
                                    async: false,
                                    success: function (data) {
                                        if (data.success) {
                                            jcflag1 = true;
                                        } else {
                                            jcflag1 = false;
                                        }

                                    },
                                    error: function () {
                                        jcflag1 = false;
                                    }
                                });
                            });
                            if (jcflag1) {
                                Messenger().post({
                                    message: "保存成功",
                                    type: "success"
                                });
                                App.unblockUI(jqueryMap.$blockTarget);
                                callback(true);
                                $("#fy", jqueryMap.$container).val("");
                                $("#bz", jqueryMap.$container).val("");
                            } else {
                                Messenger().post({
                                    message: "保存失败!",
                                    type: "error"
                                });
                                App.unblockUI(jqueryMap.$blockTarget);
                                callback(false);
                            }

                        }
                    },
                    cancel: {
                        label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                        className: 'btn btn-default borderRadius4'
                    }
                }
            });
        }
    };


    return {
        // 初始化
        init: function (id, uuid) {
            configMap.id = id;
            configMap.uuid = uuid;
            setJqueryMap();
            initlistGrid();
            $("#fywhSeach", jqueryMap.$container).off('click').on('click', function () {//查询
                fywhSeach();
            });
            $("#fywhReast", jqueryMap.$container).off('click').on('click', function () {//重置
                fywhReast();
            });

            $("[name='ck']", jqueryMap.$container).on('click', function () {//多选反选
                if ($("[name='ck']", jqueryMap.$container).prop("checked")) {
                    //选中
                    $("[name='fykzche']", jqueryMap.$container).prop("checked", true);
                } else {
                    $("[name='fykzche']", jqueryMap.$container).prop("checked", false);
                }
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        save: function (callback) {
            save(callback);
        },
    };
}();
