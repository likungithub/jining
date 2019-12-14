
var jcxmlist = function () {
    'use strict';
// 全局属性参数
    var configMap = {
        id:'',
        path: '',
        jcxmGrid: null,
        fwzt: '',
        other: '',
        uuid: '',
        ypjslist:null,
        szGrid: null,
        wtid:'',
    };

    // 全局Dom
    var jqueryMap = {
        $qywtForm:null,
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
    var initJcxmGrid = function () {
        console.log(configMap.id);
            $.ajax({
            url: "customermanage/zfwt/wtModifyQuery",
            type: "GET",
            contentType: 'application/json; charset=UTF-8',
            dataType: 'JSON',
            data: {id:configMap.id},
            traditional: true,
            success: function (data) {
                console.log(data);
                if (data.success) {
                    callBack(data.data);
                }
            }
        })
    };
    //数据回显
    var callBack = function (data) {
        var obj = eval(data);
        console.log(data);
        $("#yangpinid").val(obj.id);
        $("#songjiandanwei").val(obj.dwmc);
        $("#customerPhone").val(obj.lxdh);
        $("#postalCode").val(obj.yzbm);

        $("#customerProvince").val(obj.sfmc);
        $("#customerZone").val(obj.csmc);
        $("#customerCity").val(obj.xjmc);

        $("#customerStreet").val(obj.xxdz);
        $("#weituodanwei").val(obj.wtdw);
        $("#jianyanleibie").val(obj.jylb);

        $("#chanpinleibie").val(obj.cplb);
        $("#inspectionSubcontract").val(obj.jyfb);
        $("#beizhu").val(obj.bz);

        $("#baogaojiaofufangshi").val(obj.bgjffs);
        $("#songyangrenyuan").val(obj.syry);
        $("#songyangriqi").val(obj.syrq);

        $("#sampleName").val(obj.ypmc); //样品名称
        $("#tradeMark").val(obj.sb);//注册商标
        $("#specificationsModels").val(obj.ggxh);//规格型号

        $("#sampleGrade").val(obj.ypdj); //样品等级
        $("#SampleQuantity").val(obj.ypsl);//样品数量
        $("#yangpinshuliangdanwei").val(obj.ypdw);//样品单位

        $("#productionDate").val(obj.scrq); //生产日期
        $("#sampleNumber").val(obj.ypphhbh);//样品批号或原编号
        $("#sampleStatus").val(obj.ypzt);//样品特性和状态

        $("#productionUnit").val(obj.scdw); //生产单位
        $("#preservationCondition").val(obj.ypbctj);//样本基数
        $("#yangpinwutai").val(obj.ypwt);//样品物态

        $("#if_th").val(obj.if_th);//样品退还
        $("#yangbenjishu").val(obj.ybjs);//样本基数
        $("#expirationDate").val(obj.bzq);//保质期（天）

        $("#if_sgr").val(obj.if_sgr);//是否蔬/果/肉
        $("#if_ssg").val(obj.if_ssg);//是否食/水/工
        $("#chouyangfangshi").val(obj.cyfangshi);//抽样方式

        $("#ypbm").val(obj.ypbm);//样品编码
        $("#songyangdidian").val(obj.cydd);//抽/送样地点
        $("#if_by").val(obj.if_by);//是否备样
        $("#beiyangshuliang").val(obj.bysl);//备样数量

        $("#ypbm").val(obj.ypbm);//样品编码
        $("#if_by").val(obj.if_by);//是否备样

        $("#zhixingbiaozhun").val(obj.ypzxbz);//执行标准
        $("#yangpindengji").val(obj.ypdj);//样品等级
        $("#fengtiaobianhao").val(obj.ftbh);//封条编号

        $("#yangpinbaocunqita").val(obj.ccyqqt);//样品保存条件其他
        $("#qiyeyangpinlaiyuan").val(obj.qyyply);//样品来源
    };

    //样品修改
    var btn_saveQYW = function () {
        $("#saveQYWT").off().on('click', function () {
            
            var check = checkData();
            if (!check) {
                return false;
            }
            var datas = "{" +
                //样品信息
                "\"id\":\"" + $('input[name="id"]', jqueryMap.$qywtForm).val() + "\"," + //样品ID
                "\"if_cy\":\"" + $('input[name="if_cy"]', jqueryMap.$qywtForm).val() + "\"," + //是否抽样
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
                "\"ypwt\":\"" + $('#yangpinwutai', jqueryMap.$qywtForm).val() + "\"," + //样品退还
                "\"if_sgr\":\"" + $('#if_sgr', jqueryMap.$qywtForm).val() + "\"," + //是否蔬/果/肉
                "\"if_ssg\":\"" + $('#if_ssg', jqueryMap.$qywtForm).val() + "\"," + //是否食/水/工
                "\"cyfangshi\":\"" + $('#chouyangfangshi', jqueryMap.$qywtForm).val() + "\"," + //抽样方式
                "\"if_th\":\"" + $('#if_th', jqueryMap.$qywtForm).val() + "\"," + //样品退还
                "\"ypbm\":\"" + $('input[name="ypbm"]', jqueryMap.$qywtForm).val() + "\"," + //样品编码
                "\"cydd\":\"" + $('input[name="cydd"]', jqueryMap.$qywtForm).val() + "\"," + //抽/送样地点
                "\"if_by\":\"" + $('#if_by', jqueryMap.$qywtForm).val() + "\"," + //是否备样
                "\"bysl\":\"" + $('input[name="bysl"]', jqueryMap.$qywtForm).val() + "\"," + //备样数量
                "\"ypzxbz\":\"" + $('input[name="ypzxbz"]', jqueryMap.$qywtForm).val() + "\"," + //执行标准
                "\"ypdj\":\"" + $('input[name="ypdj"]', jqueryMap.$qywtForm).val() + "\"," + //样品等级
                "\"ftbh\":\"" + $('input[name="ftbh"]', jqueryMap.$qywtForm).val() + "\"," + //封条编号
                "\"qyyply\":\"" + $('#qiyeyangpinlaiyuan', jqueryMap.$qywtForm).val() + "\"," + //样品来源
                "\"ccyqqt\":\"" + $('input[name="ccyqqt"]', jqueryMap.$qywtForm).val() + "\"" + //样品保存条件其他
                "}"; //备注
            var jsondata = JSON.parse( datas );
            console.log(datas);

            var url =  '/customermanage/zfwt/upYPUpdate';
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
                        qywtlist.reload();
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
        init: function (id,uuid) {
            configMap.uuid = uuid;

            configMap.id = id;
            setJqueryMap(uuid);

            initJcxmGrid();

            //样品修改
            btn_saveQYW();

            jqueryMap.$qywtJbxxDiv.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });
        },
        setPath: function (path) {
            configMap.path = path;
        },
    };
}();

