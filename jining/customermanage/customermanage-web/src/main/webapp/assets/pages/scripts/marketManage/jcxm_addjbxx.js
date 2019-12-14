var addJcxm = function () {

    // 全局属性参数
    var configMap = {
        path: '',
        id: '',
        uuid: '',
        szGrid: null
    };

    // 全局Dom
    var jqueryMap = {
        $qywtJbxxDiv: null,
        $khflAddDialog: null,
        $commonproblemDialog: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$qywtJbxxDiv = $('#jcxm_jbxx' + uuid);
        jqueryMap.$qywtForm = $('#add_form', jqueryMap.$qywtJbxxDiv);
    };

    var initJcxmData = function () {
    }

    var addButJcxm = function () {
        var datas = "{" +
            "\"zwmc_bm\":\"" + $('input[name="zwmc_bm"]', jqueryMap.$qywtForm).val() + "\"," + //合同名称
            "\"cpdlmc\":\"" + $('input[name="cpdlmc"]', jqueryMap.$qywtForm).val() + "\"," + //委托单位名称
            "\"cpdldm\":\"" + $('input[name="cpdldm"]', jqueryMap.$qywtForm).val() + "\"," + //联系电话
            "\"yl\":\"" + $('input[name="yl"]', jqueryMap.$qywtForm).val() + "\"," + //所属街道
            "\"cyl\":\"" + $('input[name="cyl"]', jqueryMap.$qywtForm).val() + "\"," + //邮政编码
            "\"xl\":\"" + $('input[name="xl"]', jqueryMap.$qywtForm).val() + "\"," + //样品名称
            "\"jclbdm\":\"" + $('#jianceleibiedaima', jqueryMap.$qywtForm).val() + "\"," + //检测类别
            "\"jcfa\":\"" + $('input[name="jcfa"]', jqueryMap.$qywtForm).val() + "\"," + //规格型号
            "\"pdyj\":\"" + $('input[name="pdyj"]', jqueryMap.$qywtForm).val() + "\"," + //样品等级
            "\"pdyjmc\":\"" + $('input[name="pdyjmc"]', jqueryMap.$qywtForm).val() + "\"," + //生产单位
            "\"zm\":\"" + $('input[name="zm"]', jqueryMap.$qywtForm).val() + "\"," + //合同名称
            "\"bl\":\"" + $('input[name="bl"]', jqueryMap.$qywtForm).val() + "\"," + //委托单位名称
            "\"bjf\":\"" + $('input[name="bjf"]', jqueryMap.$qywtForm).val() + "\"," + //联系电话
            "\"pdnh\":\"" + $('input[name="pdnh"]', jqueryMap.$qywtForm).val() + "\"," + //所属街道
            "\"xlzmrz\":\"" + $('input[name="xlzmrz"]', jqueryMap.$qywtForm).val() + "\"," + //邮政编码
            "\"jcyj\":\"" + $('input[name="jcyj"]', jqueryMap.$qywtForm).val() + "\"," + //样品名称
            "\"jcyjmc\":\"" + $('input[name="jcyjmc"]', jqueryMap.$qywtForm).val() + "\"," + //商标
            "\"jcx\":\"" + $('input[name="jcx"]', jqueryMap.$qywtForm).val() + "\"," + //规格型号
            "\"xlz\":\"" + $('input[name="xlz"]', jqueryMap.$qywtForm).val() + "\"," + //样品等级
            "\"jldw\":\"" + $('input[name="jldw"]', jqueryMap.$qywtForm).val() + "\"," + //生产单位
            "\"bzffjcxdw\":\"" + $('input[name="bzffjcxdw"]', jqueryMap.$qywtForm).val() + "\"," + //合同名称
            "\"bzzxyxx\":\"" + $('input[name="bzzxyxx"]', jqueryMap.$qywtForm).val() + "\"," + //委托单位名称
            "\"bzzxyxxdw\":\"" + $('input[name="bzzxyxxdw"]', jqueryMap.$qywtForm).val() + "\"," + //联系电话
            "\"bzzdyxx\":\"" + $('input[name="bzzdyxx"]', jqueryMap.$qywtForm).val() + "\"," + //所属街道
            "\"bzzdyxxdw\":\"" + $('input[name="bzzdyxxdw"]', jqueryMap.$qywtForm).val() + "\"," + //邮政编码
            "\"wswnz\":\"" + $('input[name="wswnz"]', jqueryMap.$qywtForm).val() + "\"," + //样品名称
            "\"wswmz\":\"" + $('input[name="wswmz"]', jqueryMap.$qywtForm).val() + "\"," + //商标
            "\"wswxmz\":\"" + $('input[name="wswxmz"]', jqueryMap.$qywtForm).val() + "\"," + //规格型号
            "\"wswcz\":\"" + $('input[name="wswcz"]', jqueryMap.$qywtForm).val() + "\"," + //规格型号

            "\"jg\":\"" + $('input[name="jg"]', jqueryMap.$qywtForm).val() + "\"," + //样品等级
            "\"zbzl\":\"" + $('input[name="zbzl"]', jqueryMap.$qywtForm).val() + "\"," + //生产单位
            "\"zbzldw\":\"" + $('input[name="zbzldw"]', jqueryMap.$qywtForm).val() + "\"," + //合同名称
            "\"yyckjz\":\"" + $('input[name="yyckjz"]', jqueryMap.$qywtForm).val() + "\"," + //委托单位名称
            "\"bz\":\"" + $('input[name="bz"]', jqueryMap.$qywtForm).val() + "\"," + //联系电话

            "\"if_pd\":\"" + $('#shifoupanding', jqueryMap.$qywtForm).val() + "\"," + //检验类别
            "\"if_cma\":\"" + $('#shifouyouCMAzizhi', jqueryMap.$qywtForm).val() + "\"," + //是否制备
            "\"if_cmaf\":\"" + $('#shifouyouCMAFzizhi', jqueryMap.$qywtForm).val() + "\"," + //样品照片
            "\"if_cnas\":\"" + $('#shifouyouCNASzizhi', jqueryMap.$qywtForm).val() + "\"," + //样品物态
            "\"if_catl\":\"" + $('#shifouyouCATLzizhi', jqueryMap.$qywtForm).val() + "\"," + //样品保存条件
            "\"if_xtpd\":\"" + $('#shifouxitongpanding', jqueryMap.$qywtForm).val() + "\"," + //检验分包
            "\"if_bzff\":\"" + $('#shifoubiaozhunfangfa', jqueryMap.$qywtForm).val() + "\"," + //结果判定
            "}"; //备注
        url = '/customermanage/jcxm/addJcxm/1';
        var type = 'POST';
        console.log("修改"+$('#jianceleibiedaima', jqueryMap.$qywtForm).val());
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
                } else {
                    Messenger().post({
                        message: result.message,
                        type: 'danger'
                    });
                }
            },
            error: function (result) {
                Messenger().post({
                    message: '保存失败！',
                    type: 'danger'
                });
            }
        });
    };


    return {
        // 初始化
        init: function (id, uuid, szsf, szcs) {
            configMap.uuid = uuid;
            configMap.id = id;
            setJqueryMap(uuid);
            // jqueryMap.$qywtJbxxDiv.find('.beginTime').datepicker({
            //     clearBtn: true,
            //     format: 'yyyy-mm-dd',
            //     autoclose: true,
            //     language: 'zh-CN'
            // });

            initJcxmData();

            //保存
            $('#addButJcxm').off().on('click', function () {
                stopContinueClick("#addButJcxm", 300);
                addButJcxm();
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';

        }
    };

}();
