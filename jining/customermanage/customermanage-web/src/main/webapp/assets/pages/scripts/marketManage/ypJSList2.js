var ypjsAdd = function () {
    // 全局属性参数
    var configMap = {
        path: '',
        id: '',
        uuid: '',
        ypjslist:null,
        szGrid: null,
        ypUrl: '/customermanage/marketManage/ypList.jsp',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="fa fa-trash" style="font-size:15px;"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $container:null,
        $qywtJbxxDiv: null,
        $khflAddDialog: null,
        $commonproblemDialog: null,
        $ManageDialog: null,
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$qywtJbxxDiv = $('#qywt_jbxx' + uuid);
        jqueryMap.$qywtForm = $('#add_form', jqueryMap.$qywtJbxxDiv);
    };

    var initYplqlist = function () {
        $("#btn_ypjsglwtd").off("click").on("click",function () {
            chakanBtn();
        })
    };
    var chakanBtn = function () {
        openModal("委托单详细信息", "customermanage/marketManage/ypJSList2_chakan.jsp");
    };

    //打开模态框组件
    var openModal = function (title, url) {

        $.get(url, function (html) {
            jqueryMap.$ManageDialog = bootbox.dialog({
                size: 'large',
                title: title,
                message: html,
            });
        });
    };
    //查询
    var chaxun = function () {
        $("#ypjsSearch"+configMap.uuid).click(function () {
            configMap.ypjslist.ajax.reload();
        })
    }


    //样品提交
    var btn_saveQYW = function () {
        $("#saveQYWT").off().on('click', function () {
            var check = checkData();
            if (!check) {
                return false;
            }
            
            var datas = "{" +
                 //样品信息
                "\"wtid\":\"" + $('input[name="wtid"]', jqueryMap.$qywtForm).val() + "\"," + //委托编号
                 "\"ypmc\":\"" + $('input[name="ypmc"]', jqueryMap.$qywtForm).val() + "\"," + //样品名称
                 "\"sb\":\"" + $('input[name="sb"]', jqueryMap.$qywtForm).val() + "\"," + //商标
                 "\"ggxh\":\"" + $('input[name="ggxh"]', jqueryMap.$qywtForm).val() + "\"," + //规格型号
                 "\"ypdj\":\"" + $('input[name="ypdj"]', jqueryMap.$qywtForm).val() + "\"," + //样品等级
                 "\"ypsl\":\"" + $('input[name="ypsl"]', jqueryMap.$qywtForm).val() + "\"," + //样品数量
                 "\"ypdw\":\"" + $('input[name="ypdw"]', jqueryMap.$qywtForm).val() + "\"," + //样品单位
                 "\"scrq\":\"" + $('input[name="scrq"]', jqueryMap.$qywtForm).val() + "\"," + //生产日期
                 "\"ypphhbh\":\"" + $('input[name="ypphhbh"]', jqueryMap.$qywtForm).val() + "\"," + //样品批号或原编号
                 "\"ypzt\":\"" + $('input[name="ypzt"]', jqueryMap.$qywtForm).val() + "\"," + //样品状态
                 "\"scdw\":\"" + $('input[name="scdw"]', jqueryMap.$qywtForm).val() + "\"," + //生产单位
                 "\"ypbctj\":\"" + $('#preservationCondition', jqueryMap.$qywtForm).val() + "\"," + //样品保存条件
                 "\"ybjs\":\"" + $('input[name="ybjs"]', jqueryMap.$qywtForm).val() + "\"," + //样本基数
                 "\"bzq\":\"" + $('input[name="bzq"]', jqueryMap.$qywtForm).val() + "\"," + //保质期
                 "\"ypwt\":\"" + $('#yangpinwutai', jqueryMap.$qywtForm).val() + "\"," + //样品物态
                 "\"if_sgr\":\"" + $('#if_sgr', jqueryMap.$qywtForm).val() + "\"," + //是否蔬/果/肉
                 "\"if_ssg\":\"" + $('#if_ssg', jqueryMap.$qywtForm).val() + "\"," + //是否食/水/工
                 "\"if_th\":\"" + $('#if_th', jqueryMap.$qywtForm).val() + "\"," + //是否食/水/工
                 "\"ypbm\":\"" + $('input[name="ypbm"]', jqueryMap.$qywtForm).val() + "\"," + //样品编码
                "\"if_cy\":\"" + $('#if_cy', jqueryMap.$qywtForm).val() + "\"," + //是否抽样
                "\"if_by\":\"" + $('#if_by', jqueryMap.$qywtForm).val() + "\"," + //是否备样
                "\"bysl\":\"" + $('input[name="bysl"]', jqueryMap.$qywtForm).val() + "\"" + //备样数量
                "}"; //备注
            var jsondata = JSON.parse( datas );
            console.log(jsondata);

            var url =  '/customermanage/zfwt/savYPAdd';
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(jsondata),
                success: function (result) {
                    if (result.success) {
                        Messenger().post({
                            message:"保存成功",
                            type:"info"
                        });
                        configMap.id = result.id;
                      //  qywtlist.reload();
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
        })
    };
    //样品数据检测
    var checkData = function () {
        var wtdwmc = $('input[name="ypmc"]', jqueryMap.$qywtForm).val(); //委托单位名称
        var ypsl = $('input[name="ypsl"]', jqueryMap.$qywtForm).val(); //样品数量
        var wtid = $('input[name="wtid"]', jqueryMap.$qywtForm).val(); //关联委托单

        if (wtid == "undefined" || wtid == null || wtid == "") {
            Messenger().post({
                message: "请选择关联委托单！",
                type: 'warning'
            });
            return false;
        }
        if (wtdwmc == "undefined" || wtdwmc == null || wtdwmc == "") {
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

    return {
        // 初始化
        init: function (id, uuid, szsf, szcs) {
            configMap.uuid = uuid;
            configMap.id = id;
            setJqueryMap(uuid);
            //委托单
            initYplqlist();
            //委托单查询
            chaxun();

            //样品提交
            btn_saveQYW();

            jqueryMap.$qywtJbxxDiv.find('.beginTime').datepicker({
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
