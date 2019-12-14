var ypzbFclist = function () {
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
                "url": configMap.path + "/ypglZbxx/getzZyplist",
                "dataSrc": "aaData",
                "method": "POST",
                "data": function (data) {
                    data.ypmc = $('[name="ypmc"]', jqueryMap.$container).val();
                    data.jcxmc = $('[name="jcxmc"]', jqueryMap.$container).val();
                    data.ypbm = $('[name="ypbm"]', jqueryMap.$container).val();
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

                },                {
                    class: "text-center",
                    "data": "zbfsmc",
                    "render": function (data, type, row) {
                        data = delnull(data);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                    }

                },
                {
                    class: "text-center",
                    "data": "wtid",
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

    var openModalZbfs = function (title, url,zbwcIds) {
        var data = {};
        var dialogButtons = {
        };
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 保&nbsp;存',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var zbfsdms = ypzbFsxz.getZbfs();
                console.log("制备方式="+zbfsdms);
                if (zbfsdms == null || zbfsdms == "") {
                    Messenger().post({
                        message: "请选择制备方式!",
                        type: "warning"
                    });
                    return;
                }
                App.blockUI({
                    target: jqueryMap.$blockTarget,
                    boxed: true,
                    message: '正在保存数据，请稍候...'
                });

                $.ajax({
                    data:data,
                    url: configMap.path + '/ypglZbxx/addYpzbFsList?zbfsdms='+zbfsdms+"&zbwcIds="+zbwcIds,
                    type: 'POST',
                    success: function(result) {
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (result.success) {
                            configMap.listGrid.ajax.reload();
                            Messenger().post("制备完成!");
                        } else {
                            Messenger().post({
                                message:"制备失败",
                                type: 'error'
                            });
                        }
                    },
                    error: function() {
                        App.unblockUI(jqueryMap.$blockTarget);
                    }
                });
            }
        };
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

    //样品制备方式选择
    function ypzbfsxz(){
        var data = {};
        var strArr = [];
        var flag = false;

        var zbwcIds = "";
        var zbypbms = "";
        var ypmcs = "";

        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var zbwcId = configMap.listGrid.row(rowIndex).data().id;
            var zbypbm = configMap.listGrid.row(rowIndex).data().zbypbm;
            var ypmc = configMap.listGrid.row(rowIndex).data().ypmc;

            zbwcIds =zbwcIds+","+zbwcId;
            zbypbms =zbypbms+","+zbypbm;
            ypmcs =ypmcs+","+ypmc;
        });

        if(zbwcIds!="" && zbwcIds.length>2)
        {
            zbwcIds= zbwcIds.substr(1);
            zbypbms= zbypbms.substr(1);
            ypmcs= ypmcs.substr(1);
        }

        if (zbwcIds.length == 0) {
            Messenger().post({
                message: "请选则要制备的样品!",
                type: "warning"
            });
            return;
        }
        ////////////////////////////////////打开 制备方式选择模板

        if(zbwcIds.indexOf(",")!=-1)
        {
            bootbox.confirm({
                buttons: {
                    confirm: {
                        label: '确认',
                        className: 'btn-myStyle'
                    },
                    cancel: {
                        label: '取消',
                        className: 'btn-default'
                    }
                },
                message: '您选择多个样品进行制备，制备方式会统一设置，确定要这样做吗？',
                callback: function(result) {
                    if(result) {
                        openModalZbfs("制备方式选择", configMap.path + "/jcgl/ypzbfc/ypzbfs.jsp?zbwcIds="+zbwcIds+"&zbypbms="+zbypbms+"&ypmcs="+ypmcs+"&sj="+new Date().getTime(),zbwcIds);
                    }
                },
                title: "批量制备提示",
            });
        }
        else {
            openModalZbfs("制备方式选择", configMap.path + "/jcgl/ypzbfc/ypzbfs.jsp?zbwcIds="+zbwcIds+"&zbypbms="+zbypbms+"&ypmcs="+ypmcs+"&sj="+new Date().getTime(),zbwcIds);
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
                configMap.listGrid.ajax.reload();
            });
            $('#btn_ypzb', jqueryMap.$container).off('click').on('click', function () {//制备
                ypzbfsxz();
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
        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();