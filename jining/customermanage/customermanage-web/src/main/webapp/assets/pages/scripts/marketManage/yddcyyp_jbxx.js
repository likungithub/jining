var Addqywt = function () {

    //'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        id: '',
        wtid:'',
        uuid: '',
        szGrid: null,
        ypUrl: '/customermanage/marketManage/ypList.jsp',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="fa fa-trash" style="font-size:15px;"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $qywtJbxxDiv: null,
        $khflAddDialog: null,
        $commonproblemDialog: null
    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$qywtJbxxDiv = $('#qywt_jbxx' + uuid);
        jqueryMap.$qywtForm = $('#add_form', jqueryMap.$qywtJbxxDiv);
    };

    var openModal = function (title, url, type, func) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="fa fa-save"></i> 增&nbsp;加 ',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    func();
                    return false;
                }
            };
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn borderRadius4 color666'
        }

        $.get(url, function (html) {

            jqueryMap.$khflAddDialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };
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
    var initQywtData = function () {
        $.ajax({
            url: '/customermanage/zfwt/getyddcyyp?id=' + configMap.id,
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    var data = result.data;
                    $('#saveQYWT', jqueryMap.$qywtForm).html("更新");
                    $('input[name="ypbm"]', jqueryMap.$qywtForm).val(data.ypbm);//样品名称
                    $('input[name="ypmc"]', jqueryMap.$qywtForm).val(data.ypmc);//样品名称
                    $('input[name="sb"]', jqueryMap.$qywtForm).val(data.sb);//商标
                    $('input[name="ggxh"]', jqueryMap.$qywtForm).val(data.ggxh);//规格型号
                    $('input[name="ypdj"]', jqueryMap.$qywtForm).val(data.ypdj);//样品等级
                    $('input[name="ypsl"]', jqueryMap.$qywtForm).val(data.ypsl);//样品数量
                    $('input[name="ypdw"]', jqueryMap.$qywtForm).val(data.ypdw);//样品单位
                    $('input[name="scrq"]', jqueryMap.$qywtForm).datepicker('update', moment(data.scrq).format('yyyy-mm-dd'));//生产日期
                    $('input[name="ypphhbh"]', jqueryMap.$qywtForm).val(data.ypphhbh);//样品批号或编号
                    $('input[name="ypzt"]', jqueryMap.$qywtForm).val(data.ypzt);//样品状态
                    $('#preservationCondition', jqueryMap.$qywtForm).val(data.ypbctj);//样品保存条件
                    $('input[name="scdw"]', jqueryMap.$qywtForm).val(data.scdw);//生产单位
                    $('input[name="scdwlxdh"]', jqueryMap.$qywtForm).val(data.scdwlxdh);//生产单位联系电话
                    $('input[name="fyry"]', jqueryMap.$qywtForm).val(data.fyry);//封样人员
                    $('input[name="fyzt"]', jqueryMap.$qywtForm).val(data.fyzt);//封样状态
                    $('input[name="ybjs"]', jqueryMap.$qywtForm).val(data.ybjs);//样本基数
                    $('input[name="bzq"]', jqueryMap.$qywtForm).val(data.bzq);//保质期
                    $('#yangpinwutai', jqueryMap.$qywtForm).val(data.ypwt);//样品物态
                    $('#if_th', jqueryMap.$qywtForm).val(data.if_th);//样品退还
                    $('#if_sgr', jqueryMap.$qywtForm).val(data.if_sgr);//是否蔬果肉
                    $('#if_ssg', jqueryMap.$qywtForm).val(data.if_ssg);//是否食水工
                    $('input[name="cydd"]', jqueryMap.$qywtForm).val(data.cydd);//抽样地点
                    $('input[name="ypddrq"]', jqueryMap.$qywtForm).datepicker('update', moment(data.ypddrq).format('YYYY-MM-DD'));//生产日期
                    $('input[name="ypbm"]', jqueryMap.$qywtForm).attr("readonly","readonly");
                } else {
                    Messenger().post({
                        message: "数据加载失败",
                        type: 'warning'
                    });
                }
            }
        });
    }

    var checkData = function () {
        var ypmc = $('input[name="ypmc"]', jqueryMap.$qywtForm).val(); //样品名称
        var ypsl = $('input[name="ypsl"]', jqueryMap.$qywtForm).val(); //样品数量
        if (ypmc == "undefined" || ypmc == null || ypmc == "") {
            Messenger().post({
                message: "样品名称不得为空！",
                type: 'warning'
            });
            return false;
        }
        if (ypsl == "undefined" || ypsl == null || ypsl == "") {
            Messenger().post({
                message: "样品数量不得为空！",
                type: 'warning'
            });
            return false;
        }
        return true;
    }
    var saveQYWT = function () {
        var check = checkData();
        if (!check) {
            return false;
        }
        var datas = "{" +
            //样品信息
            "\"ypbm\":\"" + $('input[name="ypbm"]', jqueryMap.$qywtForm).val() + "\"," + //样品名称
            "\"ypmc\":\"" + $('input[name="ypmc"]', jqueryMap.$qywtForm).val() + "\"," + //样品名称
            "\"sb\":\"" + $('input[name="sb"]', jqueryMap.$qywtForm).val() + "\"," + //商标
            "\"ggxh\":\"" + $('input[name="ggxh"]', jqueryMap.$qywtForm).val() + "\"," + //规格型号
            "\"ypdj\":\"" + $('input[name="ypdj"]', jqueryMap.$qywtForm).val() + "\"," + //样品等级
            "\"ypsl\":\"" + $('input[name="ypsl"]', jqueryMap.$qywtForm).val() + "\"," + //样品数量
            "\"ypdw\":\"" + $('input[name="ypdw"]', jqueryMap.$qywtForm).val() + "\"," + //样品单位
            "\"scrq\":\"" + $('input[name="scrq"]', jqueryMap.$qywtForm).val() + "\"," + //生产日期
            "\"ypphhbh\":\"" + $('input[name="ypphhbh"]', jqueryMap.$qywtForm).val() + "\"," + //样品批号或原编号
            "\"ypzt\":\"" + $('input[name="ypzt"]', jqueryMap.$qywtForm).val() + "\"," + //样品状态
            "\"ypbctj\":\"" + $('#preservationCondition', jqueryMap.$qywtForm).val() + "\"," + //样品保存条件
            "\"scdw\":\"" + $('input[name="scdw"]', jqueryMap.$qywtForm).val() + "\"," + //生产单位
            "\"scdwlxdh\":\"" + $('input[name="scdwlxdh"]', jqueryMap.$qywtForm).val() + "\"," + //生产单位联系电话
            "\"fyry\":\"" + $('input[name="fyry"]', jqueryMap.$qywtForm).val() + "\"," + //封样人员
            "\"fyzt\":\"" + $('input[name="fyzt"]', jqueryMap.$qywtForm).val() + "\"," + //封样状态
            "\"ybjs\":\"" + $('input[name="ybjs"]', jqueryMap.$qywtForm).val() + "\"," + //样本基数
            "\"bzq\":\"" + $('input[name="bzq"]', jqueryMap.$qywtForm).val() + "\"," + //保质期
            "\"ypwt\":\"" + $('#yangpinwutai', jqueryMap.$qywtForm).val() + "\"," + //样品物态
            "\"if_th\":\"" + $('#if_th', jqueryMap.$qywtForm).val() + "\"," + //样品退还
            "\"cydd\":\"" + $('input[name="cydd"]', jqueryMap.$qywtForm).val() + "\"," + //抽样地点
            "\"if_sgr\":\"" + $('#if_sgr', jqueryMap.$qywtForm).val() + "\"," + //是否蔬/果/肉
            "\"if_ssg\":\"" + $('#if_ssg', jqueryMap.$qywtForm).val() + "\"," + //是否食/水/工
            "\"ypddrq\":\"" + $('input[name="ypddrq"]', jqueryMap.$qywtForm).val() + "\"," + //样品到达日期
            "}"; //备注
        var url = '/customermanage/zfwt/saveYddcyyp/'+configMap.wtid;
        var type = 'POST';
        if (configMap.id !='') {
            url = '/customermanage/zfwt/updateYddcyypxx/'+configMap.id;
            type = 'POST';
        }
        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: datas,
            success: function (result) {
                if (result.success) {
                    Messenger().post({
                        message:"保存成功",
                        type:"info"
                    });
                    yddypList.reload();
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
        });
    };
    var generateTab = function (_target, srcStr, menuName, id, icon) {
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
                title: '<i class="' + icon + '"></i>' + menuName,
                id: id,
                tabMonitor: $('#main-tab'),
                url: srcStr
            };
        }
        $(_target).addTabs(_opt);
    }

    return {
        // 初始化
        init: function (wtid,id, uuid) {
            configMap.uuid = uuid;
            configMap.wtid = wtid;
            configMap.id=id;
            setJqueryMap(uuid);
            if(configMap.id != ""){
                initQywtData();
            }
            //保存
            $('#saveQYWT').off().on('click', function () {
                stopContinueClick("#saveQYWT", 300);
                saveQYWT();
            });
            $("input[name='scrq']", jqueryMap.$container).datepicker({//绑定时间插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
            $("input[name='ypddrq']", jqueryMap.$container).datepicker({//绑定时间插件
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        }
    };

}();
