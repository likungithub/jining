var pdfqzlist = function () {
    'use strict';

    var prefix = 'pdfqz';
    var prefix1 = 'bggl';

    // 全局属性参数
    var configMap = {
       // dataUrl: '/' + prefix1 + '/bgfp/querylist',
        dataUrl: '/' + prefix + '/wjmc',
        del_dataUrl: '/' + prefix + '/delete',
        query_ryUrl: '/' + prefix + 'QueryRy',
        edit_Url: '/' + prefix + '/edit.jsp',
        doc_url: '',
        datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
        listGrid: null,
        uuid: '',
        lx: '',
        id: '',
        names: '',
        editPageUrl: '<a href="javascript:;" class="btn btn-xs default" data-type="bianji" data-toggle="tooltip" title="编辑"><i class="icon iconfont icon-bianji1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="icon iconfont icon-shanchu3 iconFontColor-10a0f7 iconFontSize"></i></a>',
        deleteBtn_html_disabled: '<a disabled="disabled" href="javascript:;" class="btn btn-xs default color666"  data-toggle="tooltip" title="删除"><i style="color:#666;" class="icon iconfont icon-shanchu3 color666  iconFontSize"></i></a>',
        viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan" data-toggle="tooltip" title="查看报告"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
        viewZxrBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="chakan_zxr" data-toggle="tooltip" title="查看签字结果"><i class="icon iconfont icon-xiangqing1 btnxystyle iconFontColor-10a0f7 iconFontSize"></i></a>',
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
                    "data": "id",
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
                {
                    "data": "pdfname",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "jyry",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "jysj",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "jhry",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                },
                {
                    "data": "jhsj",
                    render: function (d, t, r) {
                        d = delnull(d);
                        return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                    }
                }
                // {
                //     "data": "zxry",
                //     render: function (d, t, r) {
                //         d = delnull(d);
                //         return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + d + '">' + d + '</span>';
                //     }
                // },
                // {
                //     "data": "zxsj",
                //     render: function (d, t, r) {
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


    //查看PDF结果
    var chakan_zxr = function (){
        var $el = $(this);
        var rowIndex = configMap.listGrid.cell($el.parent()).index().row;
        var pdfname = configMap.listGrid.row(rowIndex).data().pdfname;
        window.open(configMap.path+'/bggl/pdfqz/pdfyl.jsp?name='+encodeURI(pdfname).replace(/\+/g,'%2B'));
        //window.open(configMap.path+'/bggl/pdfqz/pdfyl.jsp?name='+encodeURI(pdfname));
    };


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

        return flag;
    }

    //增加下拉的option
    var addoption = function () {
        $.post("customermanage/pdfqz/rydm?date=" + new Date().getTime(), {//报告主键人
        }, function (data) {
            $("#bgfp_bgbz").empty();
            $("#bgfp_bgbz").append($("<option value=''>下拉选择人员</option>"))
            for (var i = 0; i < data.length; i++) {
                var $val = $("<option value=" + data[i].zydm + ">" + data[i].name + "</option>");
                $("#bgfp_bgbz").append($val);
            }
        }, "json");
        $.post("customermanage/pdfqz/rydm?date=" + new Date().getTime(), {//报告审核
        }, function (data) {
            $("#bgfp_bgsh").empty();
            $("#bgfp_bgsh").append($("<option value=''>下拉选择人员</option>"))
            for (var i = 0; i < data.length; i++) {
                var $val = $("<option value=" + data[i].zydm + ">" + data[i].name + "</option>");
                $("#bgfp_bgsh").append($val);
            }
        }, "json");
    }

    var  jyqz = function () {
        var ids1 = [];//定义一个数组
        $("[name=checkbox_checkbox]:checked", jqueryMap.$container).each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids1.push($(this).val());//将选中的值添加到数组ids中
            console.log(ids1);
        });
        if (ids1.length <= 0) {
            Messenger().post("请选择数据!");
            return;
        }
            App.blockUI({
                target: jqueryMap.$blockTarget,
                boxed: true,
                message: '数据正在提交，请稍候...'
            });
            var data = {};
        var flag4 = true;  //主检
        var flag1 = true;  //审核
            if(flag4 && flag1){
                var ids = [];
                var names = [];
                var flag = false;
                jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                    var el = $(this);
                    var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                    var id = configMap.listGrid.row(rowIndex).data().id;
                    var pdfname = configMap.listGrid.row(rowIndex).data().pdfname;

                    configMap.names=pdfname;
                    configMap.id=id;
                    // var shzt = configMap.listGrid.row(rowIndex).data().BGSHZT;
                    // if (shzt != '001') { //通过
                    //     flag = true;//直接退出
                    // }
                    ids.push(id);
                    names.push(pdfname);
                });
                // if (flag) {
                //    Messenger().post("不能重复审核!");
                //    return;
                //  }
                console.log(ids);
                console.log(names);
                data.pdfids = ids.join(',');
                data.pdfnames = names.join(',');

                $.ajax({
                    data: data,
                    url: configMap.path + '/' + prefix + '/jyqz',
                    type: 'POST',
                    success: function (result) {
                        App.unblockUI(jqueryMap.$blockTarget);
                        if (result.success) {
                            $("#bgfpmodal", jqueryMap.$container).modal('hide');
                            configMap.listGrid.ajax.reload();
                            Messenger().post("签字成功!");
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

            }else {
                App.unblockUI(jqueryMap.$blockTarget);
            }

    }


    var  jhqz = function () {
        var ids1 = [];//定义一个数组
        $("[name=checkbox_checkbox]:checked", jqueryMap.$container).each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids1.push($(this).val());//将选中的值添加到数组ids中
            console.log(ids1);
        });
        if (ids1.length <= 0) {
            Messenger().post("请选择数据!");
            return;
        }
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '数据正在提交，请稍候...'
        });
        var data = {};
        var flag4 = true;  //主检
        var flag1 = true;  //审核
        if(flag4 && flag1){
            var ids = [];
            var names = [];
            var flag = false;
            jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                var el = $(this);
                var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                var id = configMap.listGrid.row(rowIndex).data().id;
                var pdfname = configMap.listGrid.row(rowIndex).data().pdfname;

                configMap.names=pdfname;
                configMap.id=id;
                // var shzt = configMap.listGrid.row(rowIndex).data().BGSHZT;
                // if (shzt != '001') { //通过
                //     flag = true;//直接退出
                // }
                ids.push(id);
                names.push(pdfname);
            });
            // if (flag) {
            //    Messenger().post("不能重复审核!");
            //    return;
            //  }
            console.log(ids);
            console.log(names);
            data.pdfids = ids.join(',');
            data.pdfnames = names.join(',');

            $.ajax({
                data: data,
                url: configMap.path + '/' + prefix + '/jhqz',
                type: 'POST',
                success: function (result) {
                    App.unblockUI(jqueryMap.$blockTarget);
                    if (result.success) {
                        $("#bgfpmodal", jqueryMap.$container).modal('hide');
                        configMap.listGrid.ajax.reload();
                        Messenger().post("签字成功!");
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

        }else {
            App.unblockUI(jqueryMap.$blockTarget);
        }
    }



    return {
        init: function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
            initlistGrid();

            $('#searchTerm-m', jqueryMap.$container).on('click', function () {
                configMap.listGrid.ajax.reload();
            });

            jqueryMap.$container.find("[name='ifsgr']").on('change', function () {//种类改变时触发
                configMap.listGrid.ajax.reload();
            });

            $('[name=rwfp_checkbox]', jqueryMap.$container).on('click', function () {
                if ($("[name=rwfp_checkbox]", jqueryMap.$container).prop("checked")) {
                    //选中
                    $("[name=checkbox_checkbox]", jqueryMap.$container).prop("checked", true);
                } else {
                    $("[name=checkbox_checkbox]", jqueryMap.$container).prop("checked", false);
                }
            });

            $($('#jyqz')).off('click').on('click', function () {
                jyqz();
            });

            $($('#jhqz')).off('click').on('click', function () {
                jhqz();
            });


            $($('#' + uuid + 'btn_bgfp')).off('click').on('click', function () {//分配按钮
                var ids1 = [];//定义一个数组
                $("[name=checkbox_checkbox]:checked", jqueryMap.$container).each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
                    ids1.push($(this).val());//将选中的值添加到数组ids中
                    console.log(ids1);
                });
                if (ids1.length <= 0) {
                    Messenger().post("请选择数据!");
                    return;
                }
                var flag4 = true;  //主检
                var flag1 = true;  //审核
                $("#bgfpmodal", jqueryMap.$container).modal({show: true});
                addoption();
                $($('#' + uuid + 'bgfp_manage')).off('click').on('click', function () {//提交数据
                    App.blockUI({
                        target: jqueryMap.$blockTarget,
                        boxed: true,
                        message: '数据正在提交，请稍候...'
                    });
                    var data = {};
                    var bzr = document.getElementById("bgfp_bgbz").value;//检验人员
                    if (bzr != null && bzr != '') {
                        configMap.lx = '4';
                        data.bzr = bzr;
                    }
                    var shr = document.getElementById("bgfp_bgsh").value;//校核人员
                    if (shr != null && shr != '') {
                        configMap.lx = '1';
                        data.shr = shr;
                    }


                    if(flag4 && flag1){
                        var ids = [];
                        var names = [];
                        var flag = false;
                        jqueryMap.$container.find('[name=checkbox_checkbox]:checked').each(function () {
                            var el = $(this);
                            var rowIndex = configMap.listGrid.cell(el.parent()).index().row;
                            var id = configMap.listGrid.row(rowIndex).data().id;
                            var pdfname = configMap.listGrid.row(rowIndex).data().pdfname;

                            configMap.names=pdfname;
                            configMap.id=id;
                            // var shzt = configMap.listGrid.row(rowIndex).data().BGSHZT;
                            // if (shzt != '001') { //通过
                            //     flag = true;//直接退出
                            // }
                            ids.push(id);
                            names.push(pdfname);
                        });
                           // if (flag) {
                           //    Messenger().post("不能重复审核!");
                           //    return;
                           //  }
                            console.log(ids);
                            console.log(names);
                            data.pdfids = ids.join(',');
                            data.pdfnames = names.join(',');

                            $.ajax({
                                data: data,
                                url: configMap.path + '/' + prefix + '/xzry',
                                type: 'POST',
                                success: function (result) {
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    if (result.success) {
                                        $("#bgfpmodal", jqueryMap.$container).modal('hide');
                                        configMap.listGrid.ajax.reload();
                                        Messenger().post("签字成功!");
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