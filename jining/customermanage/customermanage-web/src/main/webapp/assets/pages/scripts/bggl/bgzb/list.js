var list;
list = function () {
    'use strict';

    var prefix = 'bggl/bgzb';

    // 全局属性参数
    var configMap = {
        dataUrl: '/' + prefix + '/querylist',
        del_dataUrl: '/' + prefix + '/delete',
        edit_Url: '/' + prefix + '/edit.jsp',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        listGrid: null,
        uuid: '',
        lx: '',
        editPageUrl: '<a href="javascript:;" class="btn btn-xs default" data-type="bianji" data-toggle="tooltip" title="编辑"><i class="icon iconfont icon-bianji1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html_disabled: '<a disabled="disabled" href="javascript:;" class="btn btn-xs default color666"  data-toggle="tooltip" title="删除"><i style="color:#666;" class="icon iconfont icon-shanchu3 color666  iconFontSize"></i></a>',
        editBtn_html: '<a href="javascript:;" class="btn btn-xs default"  data-toggle="tooltip" data-placement="bottom"  name="contractedit" title="查看报告"><i  class="icon iconfont icon-bianji1 iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan" data-toggle="tooltip" title="查看报告"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        id:''
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
                    data.htmc = $("#bgsh_htmc").val();
                    data.startDate = $("#bgsh_startDate").val();
                    data.endDate = $("#bgsh_endDate").val();
                }
            },
            "columns": [
                {
                    "data": "ID",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="checkbox_checkbox"  value="' + data + '"/>';
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
                    "data": "sjdw",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "cydd",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "cydwlxr",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                /*{
                    "data": "SJCJRQ",
                    render: function (d, t, r) {
                        d = delnull(d);
                        if (d != '')
                            d = moment(d).format('YYYY-MM-DD');
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },*/
                {
                    "data": "cyfs",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "cyrq",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                // {
                //     "data": "jcxm",
                //     render: function (d, t, r) {
                //         d = delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                //     }
                // },
                // {
                //     "data": "bgzjsp",
                //     render: function (d, t, r) {
                //         if (d == '000') {
                //             d = "未分配";
                //         }
                //         if (d == '001') {
                //             d = "待审批";
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
                // ,
                {
                    "data": "YPSL",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    className: "text-center",
                    "render": function (data, type, row) {
                        var btn = "";
                        btn = btn + configMap.editBtn_html;
                        return btn;
                    }

                }],
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
                //var chakanContainer = $('[data-type="chakan"]', jqueryMap.$container);
                var chakanContainer = jqueryMap.$container.find('[name="contractedit"]');

                if (tootipContainer.length > 0) {
                    tootipContainer.tooltip();
                }
                if (editContainer.length > 0) {
                    editContainer.off('click').on('click', bianji);
                }

                // if (chakanContainer.length > 0) {
                //     chakanContainer.off('click').on('click', function () {
                //         var $el = $(this);
                //         var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
                //         var id = configMap.listGrid.row(rowIndex).data().ID;
                //         var url = configMap.listGrid.row(rowIndex).data().BGLJ;
                //         var ypbm = configMap.listGrid.row(rowIndex).data().YPBM;
                //         var BGSHZT = configMap.listGrid.row(rowIndex).data().BGSHZT;
                //         console.log(BGSHZT)
                //         if (BGSHZT == '002') {
                //             chakan(ypbm,id,'bgsh');
                //         }else {
                //             chakan(ypbm,id,'bgbz')
                //         }
                //
                //     });
                // }

                if(chakanContainer.length > 0){
                    chakanContainer.off('click').on('click', editQywt);
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
    var chakan = function (ypbm,id,type) {
        POBrowser.openWindowModeless('/customermanage/openword?ypbm='+ypbm+"&id="+id+"&type="+type, 'width=1200px;height=800px;');
    };

    var editQywt = function (){
        stopContinueClick(this, 300);
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().ID+",";
        POBrowser.openWindowModeless('customermanage/openwordwtbg?id='+id, 'width=1200px;height=800px;');
        // generateTab(this, configMap.path + configMap.addUrl + '?id=' + id, "修改企业委托", "qywt_info", 'fa fa-file-text-o iconMr');
    };

    //编辑
    var bianji = function () {
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var id = configMap.listGrid.row(rowIndex).data().zjdm;
        openModal("编辑", configMap.path + configMap.edit_Url + "?zjdm=" + encodeURI(id), 'bianji');
    };

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
                    });
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn btn-default borderRadius4 color666'
        };
        $.get(url, function (html) {
            jqueryMap.$Dialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var dayinyddbg = function (){
        //生成委托报告
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            console.log(id)
            window.location.href = "customermanage/bgzb/test?ID="+id;
            /*       $.ajax({
                url: configMap.path + "/bgzb/test",
                type: 'POST',
                success:function () {
                    /!*POBrowser.openWindowModeless('customermanage/openwordwtbg?id='+id, 'width=1200px;height=800px;');*!/
                }
            });*/
        });
    };
    
    var chakanyp = function () {
        $("#bgzbjsp_yp").click(function () {
                stopContinueClick(this, 300);
                generateTab(this,"customermanage/bggl/bgzb/ypInfo.jsp",'样品信息','sqjl_info','fa fa-outdent iconMr');
        })
    }
    var generateTab = function(_target, srcStr, menuName, id,icon) {
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
                title: '<i class="'+icon +'"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    }

    var dayinWtbg = function (){
        //生成委托报告
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            $.ajax({
                url: configMap.path + "/bggl/dayinwtbg/" + id,
                type: 'POST',
                success: function (result) {
                    if (result.success) {
                        Messenger().post({
                            message:"保存成功",
                            type:"info"
                        });
                        configMap.listGrid.ajax.reload();
                    } else {
                        Messenger().post({
                            message: result.message,
                            type: 'danger'
                        });
                    }

                },
                error: function (result) {
                    $('#saveKhxx').html("保存");
                    Messenger().post({
                        message: '保存失败！',
                        type: 'danger'
                    });
                }
                // success:function () {
                //     POBrowser.openWindowModeless('customermanage/openwordwtbg?id='+id, 'width=1200px;height=800px;');
                // }
            });
        });
    };

    function savezt(zt) {
        //报告制表
        configMap.lx = '5';
        var data = {};
        data.lx = configMap.lx;
        data.zt = zt;
        var strArr = [];
        var flag = false;
        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
            var id = configMap.listGrid.row(rowIndex).data().ID;
            configMap.id=id;
            var shzt = configMap.listGrid.row(rowIndex).data().bgzjsp;
            if (shzt != '001') { //通过
                flag = true;//直接退出
            }
            strArr.push(id);
        });
        if (flag) {
            Messenger().post("不能重复审核!");
            return;
        }
        data.id = strArr.join(',');
        $.ajax({
            data: data,
            url: configMap.path + '/' + prefix + '/updatezt',
            type: 'POST',
            success: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                if (result.success) {
                    configMap.listGrid.ajax.reload();
                    $("[name=rwfp_checkbox]", jqueryMap.$container).prop("checked", false);
                    Messenger().post("保存成功!");
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

        //退回增加原因
        if(zt=='004') {
            $("#bgthyy").modal({show: true});

            $("#tjthyy").off("click").on("click",function () {
                var ids = configMap.id;
                var lx = '4';
                var thyy= document.getElementById("thyy").value;
                $.ajax({
                    url:"customermanage/bggl/thyy",
                    data:{"thyy":thyy,"id":ids,'lx':lx},
                    success: function(result) {
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (result.success) {
                            configMap.listGrid.ajax.reload();
                            $("#bgthyy").modal('hide');
                            Messenger().post("操作成功!");
                        } else {
                            Messenger().post({
                                message:result.message,
                                type: 'error'
                            });
                        }
                        configMap.id="";
                    },
                    error: function() {
                        App.unblockUI(jqueryMap.$blockTarget);
                        $("#bgthyy").modal('hide');
                    }
                });
            });
        }
    }

    return {
        init: function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
            initlistGrid();
            chakanyp()
            $('#bgzjsp_searchTerm', jqueryMap.$container).on('click', function () {
                configMap.listGrid.ajax.reload();
            });


            $('#' + configMap.uuid + 'btnNew', jqueryMap.$container).on('click', function () {
                openModal("新增证件信息", configMap.path + configMap.edit_Url, 'bianji');
            });


            $('[name=rwfp_checkbox]', jqueryMap.$container).on('click', function () {
                if ($("[name=rwfp_checkbox]", jqueryMap.$container).prop("checked")) {
                    //选中
                    $("[name=checkbox_checkbox]", jqueryMap.$container).prop("checked", true);
                } else {
                    $("[name=checkbox_checkbox]", jqueryMap.$container).prop("checked", false);
                }
            });
            //退回
            $($('#' + uuid + 'bgzjsp_th')).off('click').on('click', function () {
                //退回 004
                savezt('004');
            });
            $('#dayinyddbg').off('click').on('click',function(){
                dayinyddbg();
            });

            $('#dayinWtbg').off('click').on('click',function(){
                dayinWtbg();
            });

            $($('#' + uuid + 'bgzjsp_tg')).off('click').on('click', function () {
                //通过 002
                savezt('002');
            });

        },
        setPath: function (path) {
            configMap.path = path;
        }
    };
}();