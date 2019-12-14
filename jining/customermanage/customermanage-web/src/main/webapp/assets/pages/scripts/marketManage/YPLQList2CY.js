
var YPLQListCY = function () {
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
        $("#yplaiyuan").val(obj.yplaiyuan);  //样品来源
        $("#ypshuxing").val(obj.ypshuxing);  //样品属性
        $("#ypleixin").val(obj.ypleixin); //样品类型

        $("#yangpinmingcheng").val(obj.ypmc); //样品名称
        $("#tradeMark").val(obj.sb); //注册商标
        $("#productionDate").val(obj.scrq); //生产日期

        $("#specificationsModels").val(obj.ggxh); //规格型号
        $("#sampleNumber").val(obj.ypphhbh); //样品批号或原编号
        $("#expirationDate").val(obj.bzq); //保质期（天）

        $("#zhixingbiaozhun").val(obj.ypzxbz); //执行标准
        $("#sampleGrade").val(obj.ypdj); //质量等级
        $("#shengchanxukebianhao").val(obj.scxkbh); //生产许可编号

        $("#danjia").val(obj.ypdanjia); //单价
        $("#if_ck").val(obj.if_ck); //是否出口
        $("#yangbenjishu").val(obj.ybjs); //抽样基数

        $("#SampleQuantity").val(obj.ypsl); //抽样数量
        $("#if_by").val(obj.if_by);//是否备样
        $("#beiyangshuliang").val(obj.bysl);//备样数量

        $("#yangpinxingtai").val(obj.ypxt); //样品形态
        $("#yangpinbaozhuangfenlei").val(obj.ypbgfl);//包装分类
        $("#preservationCondition").val(obj.ypbctj);//样品储存条件


        $("#chouyangyangpinbaozhuang").val(obj.cyypbz);//抽样样品包装
        $("#chouyangfangshi").val(obj.cyfangshi);//抽样方式

        $("#productionUnit").val(obj.scdw); //生产单位
        $("#shengchandizhi").val(obj.scdz);//生产地址
        $("#lianxidianhua").val(obj.scdwlxdh);//生产者电话

        $("#beizhu").val(obj.bzxx);//备注
        $("#yangpinlaiyuanqita").val(obj.yplaiyuanqt); //样品来源其他
        $("#yangpinleixingqita").val(obj.ypleixinqt);//样品类型其他
        $("#yangpincucuntiaojianqita").val(obj.ccyqqt);//样品储存条件其他
        $("#yangpinbaozhuangqita").val(obj.cyypbzqt); //抽样样品包装其他
        $("#riqileixingxuanze").val(obj.rqlxxz); //生产/加工/购进日期
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
                "\"yplaiyuan\":\"" + $('#yplaiyuan', jqueryMap.$qywtForm).val() + "\"," + //样品来源
                "\"ypshuxing\":\"" + $('#ypshuxing', jqueryMap.$qywtForm).val() + "\"," + //样品属性
                "\"ypleixin\":\"" + $('#ypleixin', jqueryMap.$qywtForm).val() + "\"," + //样品类型
                "\"ypmc\":\"" + $('input[name="ypmc"]', jqueryMap.$qywtForm).val() + "\"," + //样品名称
                "\"sb\":\"" + $('input[name="sb"]', jqueryMap.$qywtForm).val() + "\"," + //商标
                "\"scrq\":\"" + $('input[name="scrq"]', jqueryMap.$qywtForm).val() + "\"," + //生产日期
                "\"ggxh\":\"" + $('input[name="ggxh"]', jqueryMap.$qywtForm).val() + "\"," + //规格型号
                "\"ypphhbh\":\"" + $('input[name="ypphhbh"]', jqueryMap.$qywtForm).val() + "\"," + //样品批号或原编号
                "\"bzq\":\"" + $('input[name="bzq"]', jqueryMap.$qywtForm).val() + "\"," + //保质期
                "\"ypzxbz\":\"" + $('input[name="ypzxbz"]', jqueryMap.$qywtForm).val() + "\"," + //执行标准
                "\"ypdj\":\"" + $('input[name="ypdj"]', jqueryMap.$qywtForm).val() + "\"," + //质量等级
                "\"scxkbh\":\"" + $('input[name="scxkbh"]', jqueryMap.$qywtForm).val() + "\"," + //生产许可编号
                "\"ypdanjia\":\"" + $('input[name="ypdanjia"]', jqueryMap.$qywtForm).val() + "\"," + //单价
                "\"if_ck\":\"" + $('#if_ck', jqueryMap.$qywtForm).val() + "\"," +  //是否出口
                "\"ybjs\":\"" + $('input[name="ybjs"]', jqueryMap.$qywtForm).val() + "\"," + //抽样基数
                "\"ypsl\":\"" + $('input[name="ypsl"]', jqueryMap.$qywtForm).val() + "\"," + //抽样数量
                "\"if_by\":\"" + $('#if_by', jqueryMap.$qywtForm).val() + "\"," + //是否备样
                "\"bysl\":\"" + $('input[name="bysl"]', jqueryMap.$qywtForm).val() + "\"," + //备样数量
                "\"ypxt\":\"" + $('#yangpinxingtai', jqueryMap.$qywtForm).val() + "\"," + //样品形态
                "\"ypbgfl\":\"" + $('#yangpinbaozhuangfenlei', jqueryMap.$qywtForm).val() + "\"," + //包装分类
                "\"ypbctj\":\"" + $('#preservationCondition', jqueryMap.$qywtForm).val() + "\"," + //样品储存条件
                "\"cyypbz\":\"" + $('#chouyangyangpinbaozhuang', jqueryMap.$qywtForm).val() + "\"," + //抽样样品包装
                "\"cyfangshi\":\"" + $('#chouyangfangshi', jqueryMap.$qywtForm).val() + "\"," + //抽样方式
                "\"scdw\":\"" + $('input[name="scdw"]', jqueryMap.$qywtForm).val() + "\"," + //生产单位
                "\"scdz\":\"" + $('input[name="scdz"]', jqueryMap.$qywtForm).val() + "\"," + //生产地址
                "\"scdwlxdh\":\"" + $('input[name="scdwlxdh"]', jqueryMap.$qywtForm).val() + "\"," + //生产者电话
                "\"bzxx\":\"" + $('input[name="bzxx"]', jqueryMap.$qywtForm).val() + "\"," + //备注
                "\"yplaiyuanqt\":\"" + $('input[name="yplaiyuanqt"]', jqueryMap.$qywtForm).val() + "\"," + //样品来源其他
                "\"ccyqqt\":\"" + $('input[name="ccyqqt"]', jqueryMap.$qywtForm).val() + "\"," + //样品储存条件其他
                "\"cyypbzqt\":\"" + $('input[name="cyypbzqt"]', jqueryMap.$qywtForm).val() + "\"," + //抽样样品包装其他
                "\"rqlxxz\":\"" + $('#riqileixingxuanze', jqueryMap.$qywtForm).val() + "\"," + //生产/加工/购进日期
                "\"ypleixinqt\":\"" + $('input[name="ypleixinqt"]', jqueryMap.$qywtForm).val() + "\"" + //样品类型其他
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
                message: "抽样数量不得为空！",
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

