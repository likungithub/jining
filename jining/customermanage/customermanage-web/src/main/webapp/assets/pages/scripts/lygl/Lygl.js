var lyglList = function () {
    var configMap = {
        path: '',
        dataUrl: "customermanage/lygl/findAll",
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        other: '',
        nowData: "",
        $lyglGrid: null,
        jclbdm:''
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $contractauditDialog: null,
        $contractauditTable: null,
        $content: null,
        $manualdata: null,
        $ypManageDialog: null

    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$blockTarget = $('body');
        jqueryMap.$content = $('#lygl' + uuid);
        jqueryMap.$manualdata = jqueryMap.$content.find('#list_datalygl');
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

    var initlyglGrid = function () {
        configMap.$lyglGrid = jqueryMap.$manualdata.DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "url": configMap.dataUrl,
                "dataType": "json",
                "method": "POST",
                "data": function (data) {
                    data.ypmc = $("[name='ypmc']", jqueryMap.$content).val();
                    data.lx = $("#lx", jqueryMap.$content).val();
                    data.jclbdm = configMap.jclbdm;
                    data.lqzt = $("#lqzt", jqueryMap.$content).val();
                    data.ypbm = $("[name='ypbm']", jqueryMap.$content).val();
                }
            },
            "columns": [
                {
                    class: "text-center",
                    "data": "id",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="che"  value="' + data + '"/>';
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
                    "data": "jcybm",
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
                    "data": "lx",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbdate",
                    render: function (d, t, r) {
                        d = moment(d).format('YYYY-MM-DD');
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zbsyl",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "lqzt",
                    render: function (d, t, r) {

                        if (d == "001") {
                            d = "未领样"
                        }
                        if (d == "002") {
                            d = "已领样"
                        }
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    class: "text-center",
                    "data": "lqry",
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
                    "data": "lqsj",
                    "render": function (data) {
                        if (data != null) {
                            return data;
                        } else {
                            return '';
                        }
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
            "initComplete": function () {//加载完数据之后执行
                var tootipContainer = $('[data-toggle="tooltip"]');
                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
            }
        });
    }

    //领取样品
    var spCgsq = function () {
        
        /*alert($("#lygl_form").serialize())*/
        $.ajax({
            url: "customermanage/lygl/updatelqzt",
            type: 'POST',
            data: $("#lygl_form", jqueryMap.$content).serialize(),
            success: function (res) {
                if (res.success) {
                    configMap.$lyglGrid.ajax.reload();
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

    function lyztpd() {//领取状态判断
        var flag = true;
        //判断所有选中的样品检测状态，不能出现已经分配的
        var ids = [];
        jqueryMap.$content.find('[name=che]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.$lyglGrid.cell(el.parent()).index().row;
            var lqzt = configMap.$lyglGrid.row(rowIndex).data().lqzt;
            var id = configMap.$lyglGrid.row(rowIndex).data().id;
            if (lqzt == '002') {
                Messenger().post({
                    message: '样品已领取!！',
                    type: 'warning'
                });
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

    /*条件查询*/
    var findBtn = function () {
        configMap.$lyglGrid.ajax.reload();
    }

    //逻辑删除
    var deletedBtn = function () {
        var qcbz=false;
        jqueryMap.$content.find('[name=che]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.$lyglGrid.cell(el.parent()).index().row;
            var rwfp = configMap.$lyglGrid.row(rowIndex).data().rwfp;
            if (rwfp == '002') {
                qcbz = true;
                Messenger().post({
                    message: '样品已领取并分配，不能清除！',
                    type: 'warning'
                });

                return;
            }
        });
        if (qcbz) {
            return;
        }

        $.ajax({
            url: "customermanage/lygl/deletedlqzt",
            type: 'POST',
            data: $("#lygl_form", jqueryMap.$content).serialize(),
            success: function (res) {
                if (res.success) {
                    configMap.$lyglGrid.ajax.reload();
                    Messenger().post({
                        message: '删除成功',
                        type: 'success'
                    });
                } else {
                    Messenger().post({
                        message: '删除失败！',
                        type: 'error'
                    });
                }
            },
            error: function () {
                Messenger().post({
                    message: '删除失败！',
                    type: 'error'
                });
            }
        });
    }

    //20190923添加退回功能
    var thUpdateBtn = function () {
        var strArr = [];
        var data = {};
        jqueryMap.$content.find('[name=che]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.$lyglGrid.cell(el.parent()).index().row;
            var id = configMap.$lyglGrid.row(rowIndex).data().ypid;
            strArr.push(id);
        });
        if(strArr.length!=1)
        {
            Messenger().post({
                message:"请选择一条数据!",
                type:"warning"
            });
            return;
        }
        var ypids = strArr.join(',');

        $.ajax({
            url: "customermanage/lygl/thUpdate?ypids="+ypids,
            type: 'POST',
            // data:data,
            success: function (res) {
                if (res.success) {
                    configMap.$lyglGrid.ajax.reload();
                    Messenger().post({
                        message: '退回成功',
                        type: 'success'
                    });
                } else {
                    Messenger().post({
                        message: res.message,
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
    return {
        inint: function (uuid,jclbdm) {
            configMap.jclbdm = jclbdm;
            setJqueryMap(uuid);//给jqueryMap集合赋值  调用jqueryMap
            initlyglGrid();
            jqueryMap.$content.find('#insertYp').on('click', function () {//领取样品
                if (!lyztpd()) {//领取状态判断
                    return;
                }
                ;
                spCgsq();//领取样品
            })
            jqueryMap.$content.find('#yplzSearch').on('click', function () {//查询
                findBtn();
            })
            $("#reset", jqueryMap.$content).on('click', function () {//重置
                $("input", jqueryMap.$content).val("");
                configMap.$lyglGrid.ajax.reload();

            })
            jqueryMap.$content.find("[name='lx']").on('change', function () {//制备种类改变时触发
                configMap.$lyglGrid.ajax.reload();
            })
            $("[name='check1']", jqueryMap.$content).on('click', function () {//多选反选
                if ($("[name='check1']", jqueryMap.$content).prop("checked")) {
                    //选中
                    $("[name='che']", jqueryMap.$content).prop("checked", true);
                } else {
                    $("[name='che']", jqueryMap.$content).prop("checked", false);
                }
            });
            jqueryMap.$content.find('#deletedYp').on('click', function () {//删除
                deletedBtn();
            })
            //20190923添加检测领样退回至拆分环节功能
            jqueryMap.$content.find('#thUpdate').on('click', function () {//退回
                thUpdateBtn();
            })
        },
        setpath: function (path) {
            configMap.path = path;
        }
    }
}();