var jcxxlrz = function () {
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
        addyqUrl: '/ypjc/addBgbzYq',
        addyqJsp: '/jcgl/ypjc/addYqBgbz.jsp',
        addbzwzJsp:'/jcgl/ypjc/addbzwz.jsp',
        dataUrl: '/' + prefix + '/QueryOne',
        updateUrl: '/' + prefix + '/updateData',
        addUrl: '/' + prefix + '/add',
        initGridypjcedit: null,
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
        jqueryMap.$container = $('#' + configMap.uuid + '-ypjcEdit-container');
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
        configMap.initGridypjcedit = $('#ManagerList_ypjcedit', jqueryMap.$container).DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false, //屏蔽排序
            "searching": false,//屏蔽datatales的查询框
            "processing": true, // 打开数据加载时的等待效果
            "serverSide": true, // 打开后台分页
            "autoWidth": false,
            "ajax": {
                "dataSrc": "aaData",
                "url": "customermanage/ypjc/ypjcEdit",
                "method": "POST",
                "data": function (data) {
                    data.jcxmc = $("#jcxmc", jqueryMap.$container).val();
                    data.ypid1 = configMap.id;
                    data.tjzt=$("[name='tjzt']",jqueryMap.$container).val()
                    data.bzzt=$("[name='bzzt']",jqueryMap.$container).val()
                }
            },
            "columns": [
                {
                    class: "text-center",
                    "data": "jcxmid",
                    "render": function (data, type, row) {
                        return '<input type="checkbox" name="ypjcche"  value="' + data + '"/>';
                    }
                },
                {
                    class: "text-center",
                    "data": "zongshu",//jcjg pd
                    "render": function (data, type, row) {
                        return '<input type="hidden" name="ypjcche"  value="' + data + '"/>';
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
                    "data": "tjzt",
                    "render": function (data, type, row) {
                        if (data == '0') {
                            data = "未检测";
                            data = delnull(data);
                            return '<span style="display: inline-block;color:red;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                        }
                        if (data == '1') {
                            data = "已检测";
                            data = delnull(data);
                            return '<span style="display: inline-block;cursor: pointer" data-toggle="tooltip" data-placement="top" title="' + data + '">' + data + '</span>';
                        }

                    }
                },
                {
                    class: "text-center",
                    "data": "bzzt",
                    "render": function (data, type, row) {
                        if (data == '001') {
                            data = "未提交";
                        } else if (data == '002') {
                            data = "已提交";
                        } else {
                            data = "";
                        }
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

                var view1Container = $('[data-type="bjbzwz"]', jqueryMap.$container);//查看详细信息


                if (view1Container.length > 0) {
                    view1Container.off('click').on('click', bjbzwz);//标准物质编辑查看
                }

                var view2Container = $('[data-type="jczpdtype"]', jqueryMap.$container);//检测结果实时判断
                view2Container.off('blur').on('blur', jianCeZhiBJ);
            }
        });
    }

    /*检测项名称查询*/
    var jcxSeach = function () {
        configMap.initGridypjcedit.ajax.reload();
    }
    /*重置查询项*/
    var jcxReast = function () {
        $("#jcxmc", jqueryMap.$container).val("");
        $("[name='tjzt']",jqueryMap.$container).val("")
        $("[name='bzzt']",jqueryMap.$container).val("")
        configMap.initGridypjcedit.ajax.reload();
    }

    /*若参考值不为数字，那可输入任何值*/
    function checkNumber(biaozhun) {
        var reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test(biaozhun)) {
            return true;
        }
        return false;
    }

    var save = function (callback) { //检测值录入保存操作
        var strArr = [];
        var if_tjzt = false;//判断检测项是否检测
        jqueryMap.$container.find('[name=ypjcche]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.initGridypjcedit.cell(el.parent()).index().row;
            var jcxmid = configMap.initGridypjcedit.row(rowIndex).data().jcxmid;
            var tjzt = configMap.initGridypjcedit.row(rowIndex).data().tjzt;
            strArr.push(jcxmid);
            if (tjzt == "0") {
                if_tjzt = true;
                return;
            }
        });

        if (strArr.length == 0) {
            Messenger().post({
                message: "请选择提交数据!",
                type: "warning"
            });
        } else if (if_tjzt) {
            Messenger().post({
                message: "检测项未检测!",
                type: "warning"
            });
        }
        else {
            bootbox.dialog({
                title: '提示',
                message: '确定要提交检测项目？',
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
                            $('input[name="ypjcche"]:checked', jqueryMap.$container).each(function () {//遍历每一个名字为ypjcche的复选框，其中选中的执行函数

                                var dd = $(this);
                                configMap.jcxmids.push($(this).val());//将选中的值添加到数组ids中
                                var data = [
                                    {
                                        jcz: $(dd).parent().parent().children("td:eq(5)").children().val(),//检测值
                                        wd: $(dd).parent().parent().children("td:eq(6)").children().val(),//温度
                                        sd: $(dd).parent().parent().children("td:eq(7)").children().val(),//湿度
                                        bzwz:$(dd).parent().parent().children("td:eq(10)").children().attr('data-value'),
                                        /*   jcff:$(dd).parent().parent().children("td:eq(4)").children().val(),//检测方法*/
                                        /*  s_date:$(dd).parent().parent().children("td:eq(4)").children().val(),//开始日期
                                          e_date:$(dd).parent().parent().children("td:eq(5)").children().val(),//结束日期*/
                                        bzzt: "002",//业务室单个提交检测项目的保存状态
                                        ypid: configMap.id,
                                        jcxmid: $(dd).val()
                                    }
                                ];
                                var str_json = JSON.stringify(data);
                                $.ajax({
                                    url: "customermanage/ypjc/updateYpjc",
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
    //创建模态框
    var openModal = function (title, url, type, func, size) {
        var dialogButtons = {};
        if (type == 'addYq') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                }
            }
        }
        if(type == 'bjbzwz'){
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 保&nbsp;存',
                className: "btn btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                }
            }
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
                size: size
            });
        });
    };
    //编辑标准物质
    var bjbzwz = function () {//标准物质信息录入
        debugger;
        var el = $(this);
        var rowIndex = configMap.initGridypjcedit.cell(el.parent()).index().row;
        var jcxmid = configMap.initGridypjcedit.row(rowIndex).data().jcxmid;
        var bzwzlist = configMap.initGridypjcedit.row(rowIndex).data().bzwz;
        configMap.m_bzwz = bzwzlist;
        openModal("标准物质录入",
            configMap.path + configMap.addbzwzJsp + "?jcxmid=" + encodeURI(jcxmid),
            'bjbzwz',
            function(){
                var bzwzdata = addbzwzList.getbzwzData();
                console.log('----',bzwzdata)
                var rowIndex = configMap.initGridypjcedit.cell($('[value="'+bzwzdata.id+'"]').parent()).index().row;
                configMap.initGridypjcedit.row(rowIndex).data(_.assign(configMap.initGridypjcedit.row(rowIndex).data(),{'bzwz':bzwzdata.data.length == 0 ? '' : JSON.stringify(bzwzdata.data)}))
                console.log(configMap.initGridypjcedit.row(rowIndex).data())
            },'large');

    }

    //添加仪器
    var addYq = function () {
        var strArr = [];
        var ypid = configMap.id;
        jqueryMap.$container.find('[name="ypjcche"]:checked').each(function () {
            var el = $(this);
            var rowIndex = configMap.initGridypjcedit.cell(el.parent()).index().row;
            var jcxmid = configMap.initGridypjcedit.row(rowIndex).data().jcxmid;
            strArr.push(jcxmid);
        });
        if (strArr.length == 0) {//如果长度为0   那就说明没有选择数据
            Messenger().post({
                message: "请选择检测项目!",
                type: "warning"
            });
            return;
        } else {
            openModal("添加设备", configMap.path + configMap.addyqJsp+"?ypid="+ypid, "addYq", function () {
                var data = {};//创建json数组
                var yqdata = addYqjcListz.getYqData();//获得仪器的数据
                var yqids = yqdata.yqids;//获得仪器的id
                if (yqids.length == 0) {
                    Messenger().post({
                        message: "请选择设备数据!",
                        type: "warning"
                    });
                    return;
                }
                data.yqids = yqids.join(",");//获得仪器的id
                data.yqnames = yqdata.sbmcs.join(",");//获得仪器的名称
                var flag = false;
                jqueryMap.$container.find('[name="ypjcche"]:checked').each(function () {
                    var el = $(this);
                    var rowIndex = configMap.initGridypjcedit.cell(el.parent()).index().row;
                    data.jcxmid = configMap.initGridypjcedit.row(rowIndex).data().jcxmid;
                    data.ypid = configMap.id;
                    $.ajax({
                        url: configMap.path + configMap.addyqUrl,
                        data: data,
                        type: "POST",
                        async: false,
                        success: function (data) {
                            flag = data.success;
                        },
                        error: function (data) {
                            configMap.initGridypjcedit.ajax.reload();
                            flag = false;
                        }
                    });
                });

                if (flag) {
                    configMap.initGridypjcedit.ajax.reload();
                    jqueryMap.$Dialog.modal('hide');
                    Messenger().post({
                        message: "选择设备成功",
                        type: "success"
                    });
                } else {
                    configMap.initGridypjcedit.ajax.reload();
                    Messenger().post({
                        message: "选择设备失败！",
                        type: "error"
                    });
                }
            }, "large");
        }
    }

    //单 检测值比较 是否合格
    var jianCeZhiBJ = function () {
        debugger;
        var jcx;
        var jcz;
        var if_tjzt = true;//判断检测项是否检测
        var el = $(this);
        var rowIndex = configMap.initGridypjcedit.cell(el.parent()).index().row;
        var jcx = configMap.initGridypjcedit.row(rowIndex).data().jcx;
        // var jcz = configMap.initGridypjcedit.row(rowIndex).data().jcz;
        var jcz =  $(el).parent().parent().children("td:eq(5)").children().val();//检测值
        var zongshu = configMap.initGridypjcedit.row(rowIndex).data().zongshu;
        jcx = jcx;
        jcz = jcz;

        if (zongshu > 1) {
            if_tjzt = false;
            return;
        }
        if (if_tjzt) {
            if (jcx >= jcz){
                Messenger().post({
                    message: "检测项合格!",
                    type: "warning"
                });
            }else{
                Messenger().post({
                    message: "检测项不合格!",
                    type: "warning"
                });
            }
        }
    }
    return {
        // 初始化
        init: function (id, uuid) {
            configMap.id = id;
            configMap.uuid = uuid;
            setJqueryMap();
            initlistGrid();
            $("#jcxSeach", jqueryMap.$container).off('click').on('click', function () {//查询
                jcxSeach();
            });
            $("#jcxReast", jqueryMap.$container).off('click').on('click', function () {//重置
                jcxReast();
            });
            $("#jcxYq", jqueryMap.$container).off('click').on('click', function () {//增加仪器
                addYq();
            });
            $("[name='tjzt']", jqueryMap.$container).off('change').on('change', function () {//下拉触发事件
                configMap.initGridypjcedit.ajax.reload();
            });
            $("[name='bzzt']", jqueryMap.$container).off('change').on('change', function () {//下拉触发事件
                configMap.initGridypjcedit.ajax.reload();
            });
            $("[name='ck']", jqueryMap.$container).on('click', function () {//多选反选
                if ($("[name='ck']", jqueryMap.$container).prop("checked")) {
                    //选中
                    $("[name='ypjcche']", jqueryMap.$container).prop("checked", true);
                } else {
                    $("[name='ypjcche']", jqueryMap.$container).prop("checked", false);
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
        getBzwz:function(){
            return configMap.m_bzwz;
        }

    };
}();
