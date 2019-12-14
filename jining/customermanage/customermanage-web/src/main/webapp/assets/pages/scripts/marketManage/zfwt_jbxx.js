var Addzfwt = function () {
    //抽样地点
    var cyddlevel1_json='{"生产环节":["原辅料库","生产线","半成品库","成品库","其他"],"流通环节":["农贸市场","集贸市场","批发市场","商场","超市","小食杂店","网购","其他"],"餐饮环节":["餐馆","食堂","小吃店","快餐店","饮品店","集体用餐配送单位","中央厨房","其他"]}';
    var cyddlevel2_json='{"成品库":["待检区","已检区"],"餐馆":["特大型餐馆","大型餐馆","中型餐馆","小型餐馆"],"食堂":["机关食堂","学校/托幼食堂","企事业单位食堂","建筑工地食堂"]}';
    var dyddlevel1_obj=eval('('+cyddlevel1_json+')');
    var dyddlevel2_obj=eval('('+cyddlevel2_json+')');
    //'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        dateUrl: '/customermanage/zfwtJbxx',
        fileUrl: '/customermanage/zfwtJbxx/customerFile.jsp',
        appUrl: '/customermanage/zfwtJbxx/app.jsp',
        id: '',
        uuid: '',
        szGrid: null,
        printBqdy:'/customermanage/zfwt/wtdybq',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="fa fa-trash" style="font-size:15px;"></i></a>'
    };

    // 全局Dom
    var jqueryMap = {
        $zfwtJbxxDiv: null,
        $khflAddDialog: null,
        $commonproblemDialog: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$zfwtJbxxDiv = $('#zfwt_jbxx'+ uuid);
        jqueryMap.$zfwtForm = $('#add_form', jqueryMap.$zfwtJbxxDiv);
    };

    var getCyddLevel1 = function () {
        $("#cyddLevel1").html('<option value="">请选择</option>');
        for (var key in dyddlevel1_obj)
        {
            $("#cyddLevel1").append("<option value='"+key+"'>"+key+"</option>");
        }
        $('#cyddLevel1', jqueryMap.$zfwtJbxxDiv).off().on('change', function () {
            $("#cyddLevel3").html('');
            var now_level1=$(this).val();
            $("#cyddLevel2").html('<option value="">请选择</option>');
            for(var k in dyddlevel1_obj[now_level1])
            {
                var now_level2=dyddlevel1_obj[now_level1][k];
                $("#cyddLevel2").append('<option value="'+now_level2+'">'+now_level2+'</option>');
            }
        });

        $('#cyddLevel2', jqueryMap.$zfwtJbxxDiv).off().on('change', function () {
            var now_level2=$(this).val();
            var now_level1=$('#cyddLevel1').val();
            if(dyddlevel2_obj[now_level2]){
                $("#cyddLevel3").html('<option value="">请选择</option>');
                for(var k in dyddlevel2_obj[now_level2])
                {
                    var now_level3=dyddlevel2_obj[now_level2][k];
                    $("#cyddLevel3").append('<option value="'+now_level3+'">'+now_level3+'</option>');
                }
            } else {
                $("#cyddLevel3").html('');
            }

        });
    }

    //获取省
    var getProvince = function () {
        $.get(configMap.path + '/commonmanager/xzqy/sj', function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].sjdm + '">' + data[i].xzqhMc + '</option>').appendTo($('#customerProvince', jqueryMap.$zfwtJbxxDiv));
            }
            if (configMap.id != "") { //有值
                initZfwtData();
            }
            //$('#customerProvince', jqueryMap.$zfwtJbxxDiv).val(configMap.szsf);
            // $('#customerProvince', jqueryMap.$zfwtJbxxDiv).select2({
            //     placeholder: '选择省份',
            //     width: '186px',
            //     allowClear: false,
            //     language: 'zh-CN'
            // });
            //getCity(configMap.szcs);
        });
    }

    var getCity = function (e,f) {
        $('#customerZone', jqueryMap.$zfwtJbxxDiv).empty();
        var v = $('#customerProvince', jqueryMap.$zfwtJbxxDiv).val();
        $.get(configMap.path + '/commonmanager/xzqy/xjXzqy?sjdm=' + v, function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#customerZone', jqueryMap.$zfwtJbxxDiv));
            }
            $('#customerZone', jqueryMap.$zfwtJbxxDiv).val(e);
            getCounty(f);
            // $('#customerZone', jqueryMap.$zfwtJbxxDiv).select2({
            //     placeholder: '选择地级市/区',
            //     width: '186px',
            //     allowClear: false,
            //     language: 'zh-CN'
            // });
        });
    }

    var getCounty = function (e) {
        $('#customerCity', jqueryMap.$zfwtJbxxDiv).empty();
        var v = $('#customerZone', jqueryMap.$zfwtJbxxDiv).val();
        $.get(configMap.path + '/commonmanager/xzqy/xjXzqy?sjdm=' + v, function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#customerCity', jqueryMap.$zfwtJbxxDiv));
            }
            $('#customerCity', jqueryMap.$zfwtJbxxDiv).val(e);
            // $('#customerZone', jqueryMap.$zfwtJbxxDiv).select2({
            //     placeholder: '选择地级市/区',
            //     width: '186px',
            //     allowClear: false,
            //     language: 'zh-CN'
            // });
        });
    }

    var openModal1 = function (title, url, type) {
        var dialogButtons = {};
        if (type === 'edit') {
            dialogButtons.success = {
                label: '<i class="'+ 'fa fa-save  iconMr'+ '"></i>保存',
                className: "btn btn-success btnBlue borderRadius4 colorfff",
                callback: function () {
                    $('#addFQR').html($('#alreadyPer li','#allotStaffList_m').attr('user')).attr('fqr_dm',$('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                    $('#tjrmcSl',jqueryMap.$zfwtJbxxDiv).val($('#alreadyPer li','#allotStaffList_m').attr('user'));
                    $('#tjrmcSl1',jqueryMap.$zfwtJbxxDiv).val( $('#alreadyPer li','#allotStaffList_m').attr('zydm'));
                }
            };
        }
        dialogButtons.cancel = {
            label: '<i class="' + 'fa fa-times  iconMr' + '"></i>关闭',
            className: 'btn btn-default borderRadius4 color666 '
        };

        $.get(url, function (html) {
            jqueryMap.$commonproblemDialog = bootbox.dialog({
                className:'addappcustomerinfo_mdw',
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var initZfwtData = function (lyflag) {
        $.ajax({
            url: '/customermanage/zfwt/getZfwt?id=' + configMap.id,
            success: function (result) {

                if(result.success) {

                    var data = result.data;
                    // console.log(data);
                    if (data == null) {
                        Messenger().post({
                            message: '未找到编码！',
                            type: 'warning'
                        });
                        return;
                    }

                    if (data.readonly != null && data.readonly && data.readonly=='1') {
                        // $("#saveSPCY").hide();  //保存
                        // $("#zf_SaveQYWTDy").hide();  //保存并打印
                        // $('#saveSPCY', jqueryMap.$zfwtForm).attr("disabled", true);
                        // $('#zf_SaveQYWTDy', jqueryMap.$zfwtForm).attr("disabled", true);
                    } else {
                        $('#saveSPCY', jqueryMap.$zfwtForm).attr("disabled", false);
                        $('#zf_SaveQYWTDy', jqueryMap.$zfwtForm).attr("disabled", false);
                    }
                    if (configMap.id != '') {
                        $('#renwuleixing', jqueryMap.$zfwtForm).attr("disabled", true);
                    } else {
                        $('#renwuleixing', jqueryMap.$zfwtForm).attr("disabled", false);
                    }
                    $('#renwuleixing', jqueryMap.$zfwtForm).val(data.rwlx);
                    $('#saveZFWT', jqueryMap.$zfwtForm).html("更新");
                    if (!lyflag) {
                        //清除id，使该委托信息可以作为新增数据保存
                        configMap.id = data.ID;
                    } else {
                        $("#saveSPCY").show();  //保存
                        $("#zf_SaveQYWTDy").show();  //保存并打印
                        $('#saveSPCY', jqueryMap.$zfwtForm).attr("disabled", false);
                        $('#zf_SaveQYWTDy', jqueryMap.$zfwtForm).attr("disabled", false);
                    }
                    // console.log('configMap.id:' + configMap.id);
                    $('input[name="wtid"]', jqueryMap.$zfwtForm).val(data.wtid);
                    if (!lyflag) {
                        $('input[name="cydbm"]', jqueryMap.$zfwtForm).val(data.cydbm);
                        $('input[name="cyrq"]', jqueryMap.$zfwtForm).val(data.cyrq);//抽样日期
                        $('.scrq', jqueryMap.$zfwtForm).datepicker('update', moment(data.scrq).format('YYYY-MM-DD'));//生产日期
                    }
                    $('input[name="cydw"]', jqueryMap.$zfwtForm).val(data.cydw);//委托单位
                    $('input[name="sjdw"]', jqueryMap.$zfwtForm).val(data.sjdw);
                    $('input[name="rwly"]', jqueryMap.$zfwtForm).val(data.rwly);
                    $('#rwlx', jqueryMap.$zfwtForm).val(data.rwlx);
                    $('#quyuleixing', jqueryMap.$zfwtForm).val(data.qylx);//区域类型
                    $('input[name="bcjdwdz"]', jqueryMap.$zfwtForm).val(data.bcjdwdz);//单位地址
                    $('input[name="frdb"]', jqueryMap.$zfwtForm).val(data.frdb);//法人代表
                    $('input[name="nxse"]', jqueryMap.$zfwtForm).val(data.nxse);//年销售额
                    $('input[name="yyzzh"]', jqueryMap.$zfwtForm).val(data.yyzzh);//营业执照号
                    $('input[name="bcjdwlxr"]', jqueryMap.$zfwtForm).val(data.bcjdwlxr);//联系人
                    $('input[name="spxkzbh"]', jqueryMap.$zfwtForm).val(data.spxkzbh);//食品许可
                    $('input[name="sjdwlxdh"]', jqueryMap.$zfwtForm).val(data.sjdwlxdh);//固定电话
                    $('input[name="bcjdwyddh"]', jqueryMap.$zfwtForm).val(data.bcjdwyddh);//移动电话
                    $('input[name="bcjdwyb"]', jqueryMap.$zfwtForm).val(data.bcjdwyb);//邮编
                    $('input[name="cydd"]', jqueryMap.$zfwtForm).val(data.cydd);//抽样地点
                    $('input[name="syry"]', jqueryMap.$zfwtForm).val(data.syry);//收样人员
                    $('#cyddLevel1', jqueryMap.$zfwtForm).val(data.cyddLevel1);//抽样地点
                    var now_level1=data.cyddLevel1;
                    for(var k in dyddlevel1_obj[now_level1])
                    {
                        var now_level2=dyddlevel1_obj[now_level1][k];
                        $("#cyddLevel2").append('<option value="'+now_level2+'">'+now_level2+'</option>');
                    }
                    $('#cyddLevel2', jqueryMap.$zfwtForm).val(data.cyddLevel2);//抽样地点
                    var now_level2=data.cyddLevel2;
                    if(dyddlevel2_obj[now_level2]){
                        for(var k in dyddlevel2_obj[now_level2])
                        {
                            var now_level3=dyddlevel2_obj[now_level2][k];
                            $("#cyddLevel3").append('<option value="'+now_level3+'">'+now_level3+'</option>');
                        }
                    }
                    $('#cyddLevel3', jqueryMap.$zfwtForm).val(data.cyddLevel3);//抽样地点
                    $('input[name="cyddqt"]', jqueryMap.$zfwtForm).val(data.cyddqt);//其他
                    $('input[name="cydwxxdz"]', jqueryMap.$zfwtForm).val(data.cydwxxdz);//抽样单位地址
                    if(data.cyry){
                        $('input[name="cyry"]', jqueryMap.$zfwtForm).val(data.cyry);//抽样单位联系人
                    }
                    if(data.cydwdh){
                        $('input[name="cydwdh"]', jqueryMap.$zfwtForm).val(data.cydwdh);//电话
                    }
                    $('input[name="cydwyb"]', jqueryMap.$zfwtForm).val(data.cydwyb);//邮编
                    $('#jianyanleibie', jqueryMap.$zfwtForm).val(data.jylb);//检验类别
                    $('#baogaofenlei1', jqueryMap.$zfwtForm).val(data.bgfl1);//报告分类1
                    $('#baogaofenlei', jqueryMap.$zfwtForm).val(data.bgfl);//报告分类
                     $('input[name="shouyry"]', jqueryMap.$zfwtForm).val(data.shouyry);//收样人员
                    $('input[name="syrq"]', jqueryMap.$zfwtForm).val(data.syrq);//收样日期
                    /*$('#shifouzuofei', jqueryMap.$zfwtForm).val(data.zfbs);//是否作废
                    $('input[name="zfyy"]', jqueryMap.$zfwtForm).val(data.zfyy);//作废原因*/
                    //样品信息
                    var ypbm1 = '('+data.ypbm+')';
                    $('#ypbm1').html(ypbm1); //修改时显示样品编码
                    $('#yplaiyuan', jqueryMap.$zfwtForm).val(data.yplaiyuan);//样品来源
                    $('#ypshuxing', jqueryMap.$zfwtForm).val(data.ypshuxing);//样品属性
                    $('#ypleixin', jqueryMap.$zfwtForm).val(data.ypleixin);//样品类型
                    $('input[name="ypmc"]', jqueryMap.$zfwtForm).val(data.ypmc); //样品名称
                    $('input[name="sb"]', jqueryMap.$zfwtForm).val(data.sb); //注册商标

                    $('input[name="ggxh"]', jqueryMap.$zfwtForm).val(data.ggxh);//规格型号
                    $('input[name="ypphhbh"]', jqueryMap.$zfwtForm).val(data.ypphhbh);//样品批号或原编号
                    $('input[name="bzq"]', jqueryMap.$zfwtForm).val(data.bzq);//保质期
                    $('input[name="ypzxbz"]', jqueryMap.$zfwtForm).val(data.ypzxbz); //执行标准
                    $('input[name="ypdj"]', jqueryMap.$zfwtForm).val(data.ypdj);//质量等级
                    $('input[name="scxkbh"]', jqueryMap.$zfwtForm).val(data.scxkbh); //生产许可编号
                    $('input[name="ypdanjia"]', jqueryMap.$zfwtForm).val(data.ypdanjia); //单价
                    $('#if_ck', jqueryMap.$zfwtForm).val(data.if_ck);//是否出口
                    $('input[name="ybjs"]', jqueryMap.$zfwtForm).val(data.ybjs);//抽样基数
                    $('input[name="ypsl"]', jqueryMap.$zfwtForm).val(data.ypsl); //抽样数量
                    $('#if_by', jqueryMap.$zfwtForm).val(data.if_by);//是否备样
                    $('input[name="bysl"]', jqueryMap.$zfwtForm).val(data.bysl); //备样数量
                    $('#yangpinwutai', jqueryMap.$zfwtForm).val(data.ypxt);//样品形态
                    $('#yangpinbaozhuangfenlei', jqueryMap.$zfwtForm).val(data.ypbgfl);//包装分类
                    $('#preservationCondition', jqueryMap.$zfwtForm).val(data.ypbctj);//样品储存条件
                    $('#chouyangyangpinbaozhuang', jqueryMap.$zfwtForm).val(data.cyypbz);//抽样样品包装
                    $('#chouyangfangshi', jqueryMap.$zfwtForm).val(data.cyfangshi);//抽样方式
                    $('input[name="scdw"]', jqueryMap.$zfwtForm).val(data.scdw); //生产单位
                    $('input[name="scdz"]', jqueryMap.$zfwtForm).val(data.scdz); //生产地址
                    $('input[name="scdwlxdh"]', jqueryMap.$zfwtForm).val(data.scdwlxdh); //生产者电话
                    if(data.bzxx){
                        $('input[name="bzxx"]', jqueryMap.$zfwtForm).val(data.bzxx); //备注
                    }
                    $('input[name="yplaiyuanqt"]', jqueryMap.$zfwtForm).val(data.yplaiyuanqt); //样品来源其他
                    $('input[name="ccyqqt"]', jqueryMap.$zfwtForm).val(data.ccyqqt); //样品储存条件其他
                    $('input[name="cyypbzqt"]', jqueryMap.$zfwtForm).val(data.cyypbzqt); //抽样样品包装其他
                    $('input[name="ypleixinqt"]', jqueryMap.$zfwtForm).val(data.ypleixinqt); //样品类型其他
                    $('#riqileixingxuanze', jqueryMap.$zfwtForm).val(data.rqlxxz); //生产/加工/购进日期

                } else {
                    Messenger().post({
                        message: "数据加载失败",
                        type: 'warning'
                    });
                }
            }
        });
    };

    var checkData= function () {
        var wtid = $('input[name="cydbm"]', jqueryMap.$zfwtForm).val(); //抽样单编号
        var ypmc = $('input[name="ypmc"]', jqueryMap.$zfwtForm).val(); //样品名称
     //   var ypbh = $('input[name="ypbm"]', jqueryMap.$zfwtForm).val(); //样品编号
        var ypzxbz = $('input[name="ypzxbz"]', jqueryMap.$zfwtForm).val(); //执行标准

        if (wtid == "undefined" || wtid == null || wtid == "") {
            Messenger().post({
                message: "抽样单编号不得为空！",
                type: 'warning'
            });
            return false;
        }
        if (ypmc == "undefined" || ypmc == null || ypmc == "") {
            Messenger().post({
                message: "样品名称不得为空！",
                type: 'warning'
            });
            return false;
        }
        /*if (ypbh == "undefined" || ypbh == null || ypbh == "") {
            Messenger().post({
                message: "样品编号不得为空！",
                type: 'warning'
            });
            return false;
        }*/
        if (ypzxbz == "undefined" || ypzxbz == null || ypzxbz == "") {
            Messenger().post({
                message: "执行标准不得为空！",
                type: 'warning'
            });
            return false;
        }
        return true;
    }

    var saveSPCY = function () {
        stopContinueClick('#saveSPCY',300);
        var check = checkData();
        if (!check) {
            return false;
        }
// console.log($('input[name="syrq"]', jqueryMap.$zfwtForm).val());
        var datas = "{" +
            //基本信息
            "\"wtid\":\"" + $('input[name="wtid"]', jqueryMap.$zfwtForm).val() + "\"," + //委托编号
            "\"cydbm\":\"" + $('input[name="cydbm"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样单编号
            "\"cydw\":\"" + $('input[name="cydw"]', jqueryMap.$zfwtForm).val() + "\"," + //委托单位
            "\"rwly\":\"" + $('input[name="rwly"]', jqueryMap.$zfwtForm).val() + "\"," + //任务来源
            "\"rwlx\":\"" + $('#renwuleixing', jqueryMap.$zfwtForm).val() + "\"," + //任务类型
            "\"jylb\":\"" + $('#jianyanleibie', jqueryMap.$zfwtForm).val() + "\"," + //检验类别
            "\"sjdw\":\"" + $('input[name="sjdw"]', jqueryMap.$zfwtForm).val() + "\"," + //被抽检单位名称
            "\"qylx\":\"" + $('#quyuleixing', jqueryMap.$zfwtForm).val() + "\"," + //区域类型
            "\"bcjdwdz\":\"" + $('input[name="bcjdwdz"]', jqueryMap.$zfwtForm).val() + "\"," + //单位地址
            "\"frdb\":\"" + $('input[name="frdb"]', jqueryMap.$zfwtForm).val() + "\"," + //法人代表
            "\"nxse\":\"" + $('input[name="nxse"]', jqueryMap.$zfwtForm).val() + "\"," + //年销售额
            "\"yyzzh\":\"" + $('input[name="yyzzh"]', jqueryMap.$zfwtForm).val() + "\"," + //营业执照号
            "\"bcjdwlxr\":\"" + $('input[name="bcjdwlxr"]', jqueryMap.$zfwtForm).val() + "\"," + //联系人
            "\"spxkzbh\":\"" + $('input[name="spxkzbh"]', jqueryMap.$zfwtForm).val() + "\"," + //食品许可
            "\"sjdwlxdh\":\"" + $('input[name="sjdwlxdh"]', jqueryMap.$zfwtForm).val() + "\"," + //固定电话
            "\"bcjdwyddh\":\"" + $('input[name="bcjdwyddh"]', jqueryMap.$zfwtForm).val() + "\"," + //移动电话
            "\"bcjdwyb\":\"" + $('input[name="bcjdwyb"]', jqueryMap.$zfwtForm).val() + "\"," + //邮编
            "\"cyddLevel1\":\"" + $('#cyddLevel1', jqueryMap.$zfwtForm).val() + "\"," + //抽样地点
            "\"cyddLevel2\":\"" + $('#cyddLevel2', jqueryMap.$zfwtForm).val() + "\"," + //抽样地点
            "\"cyddLevel3\":\"" + $('#cyddLevel3', jqueryMap.$zfwtForm).val() + "\"," + //抽样地点
            "\"cyddqt\":\"" + $('input[name="cyddqt"]', jqueryMap.$zfwtForm).val() + "\"," + //其他
            "\"cydd\":\"" + $('input[name="cydd"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样地点
            "\"syry\":\"" + $('input[name="syry"]', jqueryMap.$zfwtForm).val() + "\"," + //收样人员
            "\"cyry\":\"" + $('input[name="cyry"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样单位联系人
            "\"cyrq\":\"" + $('input[name="cyrq"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样日期
            "\"cydwdh\":\"" + $('input[name="cydwdh"]', jqueryMap.$zfwtForm).val() + "\"," + //委托单位电话
            "\"cydwxxdz\":\"" + $('input[name="cydwxxdz"]', jqueryMap.$zfwtForm).val() + "\"," + //委托单位地址
            "\"cydwyb\":\"" + $('input[name="cydwyb"]', jqueryMap.$zfwtForm).val() + "\"," + //邮编
            "\"bgfl1\":\"" + $('#baogaofenlei1', jqueryMap.$zfwtForm).val() + "\"," + //报告分类1
            "\"bgfl\":\"" + $('#baogaofenlei', jqueryMap.$zfwtForm).val() + "\"," + //报告分类
            // "\"shouyry\":\"" + $('input[name="shouyry"]', jqueryMap.$zfwtForm).val() + "\"," + //收样人员
            "\"syrq\":\"" + $('input[name="syrq"]', jqueryMap.$zfwtForm).val() + "\"," + //收样日期
            /*"\"zfbs\":\"" + $('#shifouzuofei', jqueryMap.$zfwtForm).val() + "\"," + //是否作废
            "\"zfyy\":\"" + $('input[name="zfyy"]', jqueryMap.$zfwtForm).val() + "\"," + //作废原因*/
            //样品信息
            "\"if_cy\":\"" + $('input[name="if_cy"]', jqueryMap.$zfwtForm).val() + "\"," + //是否抽样
            "\"yplaiyuan\":\"" + $('#yplaiyuan', jqueryMap.$zfwtForm).val() + "\"," + //样品来源
            "\"ypshuxing\":\"" + $('#ypshuxing', jqueryMap.$zfwtForm).val() + "\"," + //样品属性
            "\"ypleixin\":\"" + $('#ypleixin', jqueryMap.$zfwtForm).val() + "\"," + //样品类型
            //"\"ypmc\":\"" + $('input[name="ypmc"]', jqueryMap.$zfwtForm).val() + "\"," + //样品名称
            "\"ypmc\":\"" + $('#yangpinmingcheng', jqueryMap.$zfwtForm).val() + "\"," + //样品名称
            "\"sb\":\"" + $('input[name="sb"]', jqueryMap.$zfwtForm).val() + "\"," + //商标
            "\"scrq\":\"" + $('input[name="scrq"]', jqueryMap.$zfwtForm).val() + "\"," + //生产日期
            "\"ggxh\":\"" + $('input[name="ggxh"]', jqueryMap.$zfwtForm).val() + "\"," + //规格型号
            "\"ypphhbh\":\"" + $('input[name="ypphhbh"]', jqueryMap.$zfwtForm).val() + "\"," + //样品批号或原编号
            "\"bzq\":\"" + $('input[name="bzq"]', jqueryMap.$zfwtForm).val() + "\"," + //保质期
            "\"ypzxbz\":\"" + $('input[name="ypzxbz"]', jqueryMap.$zfwtForm).val() + "\"," + //执行标准
            "\"ypdj\":\"" + $('input[name="ypdj"]', jqueryMap.$zfwtForm).val() + "\"," + //质量等级
            "\"scxkbh\":\"" + $('input[name="scxkbh"]', jqueryMap.$zfwtForm).val() + "\"," + //生产许可编号
            "\"ypdanjia\":\"" + $('input[name="ypdanjia"]', jqueryMap.$zfwtForm).val() + "\"," + //单价
            "\"if_ck\":\"" + $('#if_ck', jqueryMap.$zfwtForm).val() + "\"," +  //是否出口
            "\"ybjs\":\"" + $('input[name="ybjs"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样基数
            "\"ypsl\":\"" + $('input[name="ypsl"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样数量
            "\"if_by\":\"" + $('#if_by', jqueryMap.$zfwtForm).val() + "\"," + //是否备样
            "\"bysl\":\"" + $('input[name="bysl"]', jqueryMap.$zfwtForm).val() + "\"," + //备样数量
            "\"ypxt\":\"" + $('#yangpinxingtai', jqueryMap.$zfwtForm).val() + "\"," + //样品形态
            "\"ypbgfl\":\"" + $('#yangpinbaozhuangfenlei', jqueryMap.$zfwtForm).val() + "\"," + //包装分类
            "\"ypbctj\":\"" + $('#preservationCondition', jqueryMap.$zfwtForm).val() + "\"," + //样品储存条件
            "\"cyypbz\":\"" + $('#chouyangyangpinbaozhuang', jqueryMap.$zfwtForm).val() + "\"," + //抽样样品包装
            "\"cyfangshi\":\"" + $('#chouyangfangshi', jqueryMap.$zfwtForm).val() + "\"," + //抽样方式
            "\"scdw\":\"" + $('input[name="scdw"]', jqueryMap.$zfwtForm).val() + "\"," + //生产单位
            "\"scdz\":\"" + $('input[name="scdz"]', jqueryMap.$zfwtForm).val() + "\"," + //生产地址
            "\"scdwlxdh\":\"" + $('input[name="scdwlxdh"]', jqueryMap.$zfwtForm).val() + "\"," + //生产者电话
            "\"yplaiyuanqt\":\"" + $('input[name="yplaiyuanqt"]', jqueryMap.$zfwtForm).val() + "\"," + //样品来源其他
            "\"ccyqqt\":\"" + $('input[name="ccyqqt"]', jqueryMap.$zfwtForm).val() + "\"," + //样品储存条件其他
            "\"cyypbzqt\":\"" + $('input[name="cyypbzqt"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样样品包装其他
            "\"ypleixinqt\":\"" + $('input[name="ypleixinqt"]', jqueryMap.$zfwtForm).val() + "\"," + //样品类型其他
            "\"scdwlxdh\":\"" + $('input[name="scdwlxdh"]', jqueryMap.$zfwtForm).val() + "\"," + //生产者电话
            "\"rqlxxz\":\"" + $('#riqileixingxuanze', jqueryMap.$zfwtForm).val() + "\"," + //生产/加工/购进日期
            "\"bzxx\":\"" + $('input[name="bzxx"]', jqueryMap.$zfwtForm).val() + "\"" + //备注
            "}"; //备注
        var url = '/customermanage/zfwt/saveZfwt';
        var type = 'POST';
        if (configMap.id != '') {
            url = '/customermanage/zfwt/updateZfwt/' + configMap.id;
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
                    configMap.id = result.id;
                    if (configMap.id != '') {
                        $('#renwuleixing', jqueryMap.$zfwtForm).attr("disabled", true);
                    } else {
                        $('#renwuleixing', jqueryMap.$zfwtForm).attr("disabled", false);
                    }
                    if (result.wtid && result.wtid != 'undefined')  {
                        var ypbm1 = '('+result.wtid+')';
                        $('#ypbm1').html(ypbm1); //保存后显示样品编码
                    }
                    zfwtlist.reload();
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
    }

    //保存并打印
    var zf_SaveQYWTDy = function () {
        var cydbm = $('input[name="cydbm"]', $('#wtlbaelprint-form-datas')).val(); //抽样单编号
        stopContinueClick('#zf_SaveQYWTDy',300);
        var check = checkData();
        if (!check) {
            return false;
        }

        var datas = "{" +
            //基本信息
            "\"wtid\":\"" + $('input[name="wtid"]', jqueryMap.$zfwtForm).val() + "\"," + //委托编号
            "\"cydbm\":\"" + $('input[name="cydbm"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样单编号
            "\"cydw\":\"" + $('input[name="cydw"]', jqueryMap.$zfwtForm).val() + "\"," + //委托单位
            "\"rwly\":\"" + $('input[name="rwly"]', jqueryMap.$zfwtForm).val() + "\"," + //任务来源
            "\"rwlx\":\"" + $('#renwuleixing', jqueryMap.$zfwtForm).val() + "\"," + //任务类型
            "\"jylb\":\"" + $('#jianyanleibie', jqueryMap.$zfwtForm).val() + "\"," + //检验类别
            "\"sjdw\":\"" + $('input[name="sjdw"]', jqueryMap.$zfwtForm).val() + "\"," + //被抽检单位名称
            "\"qylx\":\"" + $('#quyuleixing', jqueryMap.$zfwtForm).val() + "\"," + //区域类型
            "\"bcjdwdz\":\"" + $('input[name="bcjdwdz"]', jqueryMap.$zfwtForm).val() + "\"," + //单位地址
            "\"frdb\":\"" + $('input[name="frdb"]', jqueryMap.$zfwtForm).val() + "\"," + //法人代表
            "\"nxse\":\"" + $('input[name="nxse"]', jqueryMap.$zfwtForm).val() + "\"," + //年销售额
            "\"yyzzh\":\"" + $('input[name="yyzzh"]', jqueryMap.$zfwtForm).val() + "\"," + //营业执照号
            "\"bcjdwlxr\":\"" + $('input[name="bcjdwlxr"]', jqueryMap.$zfwtForm).val() + "\"," + //联系人
            "\"spxkzbh\":\"" + $('input[name="spxkzbh"]', jqueryMap.$zfwtForm).val() + "\"," + //食品许可
            "\"sjdwlxdh\":\"" + $('input[name="sjdwlxdh"]', jqueryMap.$zfwtForm).val() + "\"," + //固定电话
            "\"bcjdwyddh\":\"" + $('input[name="bcjdwyddh"]', jqueryMap.$zfwtForm).val() + "\"," + //移动电话
            "\"bcjdwyb\":\"" + $('input[name="bcjdwyb"]', jqueryMap.$zfwtForm).val() + "\"," + //邮编
            "\"cyddLevel1\":\"" + $('#cyddLevel1', jqueryMap.$zfwtForm).val() + "\"," + //抽样地点
            "\"cyddLevel2\":\"" + $('#cyddLevel2', jqueryMap.$zfwtForm).val() + "\"," + //抽样地点
            "\"cyddLevel3\":\"" + $('#cyddLevel3', jqueryMap.$zfwtForm).val() + "\"," + //抽样地点
            "\"cyddqt\":\"" + $('input[name="cyddqt"]', jqueryMap.$zfwtForm).val() + "\"," + //其他
            // "\"wtdwdz\":\"" + $('input[name="wtdwdz"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样单位地址
            "\"cyry\":\"" + $('input[name="cyry"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样单位联系人
            "\"cyrq\":\"" + $('input[name="cyrq"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样日期
            "\"cydwdh\":\"" + $('input[name="bcjdwyddh"]', jqueryMap.$zfwtForm).val() + "\"," + //电话
            "\"cydwyb\":\"" + $('input[name="cydwyb"]', jqueryMap.$zfwtForm).val() + "\"," + //邮编
            "\"cydwxxdz\":\"" + $('input[name="cydwxxdz"]', jqueryMap.$zfwtForm).val() + "\"," + //委托单位地址
            "\"bgfl1\":\"" + $('#baogaofenlei1', jqueryMap.$zfwtForm).val() + "\"," + //报告分类1
            "\"bgfl\":\"" + $('#baogaofenlei', jqueryMap.$zfwtForm).val() + "\"," + //报告分类
             "\"shouyry\":\"" + $('input[name="shouyry"]', jqueryMap.$zfwtForm).val() + "\"," + //收样人员
            "\"syrq\":\"" + $('input[name="syrq"]', jqueryMap.$zfwtForm).val() + "\"," + //收样日期
           /* "\"zfbs\":\"" + $('#shifouzuofei', jqueryMap.$zfwtForm).val() + "\"," + //是否作废
            "\"zfyy\":\"" + $('input[name="zfyy"]', jqueryMap.$zfwtForm).val() + "\"," + //作废原因*/
            //样品信息
            "\"if_cy\":\"" + $('input[name="if_cy"]', jqueryMap.$zfwtForm).val() + "\"," + //是否抽样
            "\"yplaiyuan\":\"" + $('#yplaiyuan', jqueryMap.$zfwtForm).val() + "\"," + //样品来源
            "\"ypshuxing\":\"" + $('#ypshuxing', jqueryMap.$zfwtForm).val() + "\"," + //样品属性
            "\"ypleixin\":\"" + $('#ypleixin', jqueryMap.$zfwtForm).val() + "\"," + //样品类型
            //"\"ypmc\":\"" + $('input[name="ypmc"]', jqueryMap.$zfwtForm).val() + "\"," + //样品名称
            "\"ypmc\":\"" + $('#yangpinmingcheng', jqueryMap.$zfwtForm).val() + "\"," + //样品名称
            "\"sb\":\"" + $('input[name="sb"]', jqueryMap.$zfwtForm).val() + "\"," + //商标
            "\"scrq\":\"" + $('input[name="scrq"]', jqueryMap.$zfwtForm).val() + "\"," + //生产日期
            "\"ggxh\":\"" + $('input[name="ggxh"]', jqueryMap.$zfwtForm).val() + "\"," + //规格型号
            "\"ypphhbh\":\"" + $('input[name="ypphhbh"]', jqueryMap.$zfwtForm).val() + "\"," + //样品批号或原编号
            "\"bzq\":\"" + $('input[name="bzq"]', jqueryMap.$zfwtForm).val() + "\"," + //保质期
            "\"ypzxbz\":\"" + $('input[name="ypzxbz"]', jqueryMap.$zfwtForm).val() + "\"," + //执行标准
            "\"ypdj\":\"" + $('input[name="ypdj"]', jqueryMap.$zfwtForm).val() + "\"," + //质量等级
            "\"scxkbh\":\"" + $('input[name="scxkbh"]', jqueryMap.$zfwtForm).val() + "\"," + //生产许可编号
            "\"ypdanjia\":\"" + $('input[name="ypdanjia"]', jqueryMap.$zfwtForm).val() + "\"," + //单价
            "\"if_ck\":\"" + $('#if_ck', jqueryMap.$zfwtForm).val() + "\"," +  //是否出口
            "\"ybjs\":\"" + $('input[name="ybjs"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样基数
            "\"ypsl\":\"" + $('input[name="ypsl"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样数量
            "\"if_by\":\"" + $('#if_by', jqueryMap.$zfwtForm).val() + "\"," + //是否备样
            "\"bysl\":\"" + $('input[name="bysl"]', jqueryMap.$zfwtForm).val() + "\"," + //备样数量
            "\"ypxt\":\"" + $('#yangpinxingtai', jqueryMap.$zfwtForm).val() + "\"," + //样品形态
            "\"ypbgfl\":\"" + $('#yangpinbaozhuangfenlei', jqueryMap.$zfwtForm).val() + "\"," + //包装分类
            "\"ypbctj\":\"" + $('#preservationCondition', jqueryMap.$zfwtForm).val() + "\"," + //样品储存条件
            "\"cyypbz\":\"" + $('#chouyangyangpinbaozhuang', jqueryMap.$zfwtForm).val() + "\"," + //抽样样品包装
            "\"cyfangshi\":\"" + $('#chouyangfangshi', jqueryMap.$zfwtForm).val() + "\"," + //抽样方式
            "\"scdw\":\"" + $('input[name="scdw"]', jqueryMap.$zfwtForm).val() + "\"," + //生产单位
            "\"scdz\":\"" + $('input[name="scdz"]', jqueryMap.$zfwtForm).val() + "\"," + //生产地址
            "\"scdwlxdh\":\"" + $('input[name="scdwlxdh"]', jqueryMap.$zfwtForm).val() + "\"," + //生产者电话
            "\"yplaiyuanqt\":\"" + $('input[name="yplaiyuanqt"]', jqueryMap.$zfwtForm).val() + "\"," + //样品来源其他
            "\"ccyqqt\":\"" + $('input[name="ccyqqt"]', jqueryMap.$zfwtForm).val() + "\"," + //样品储存条件其他
            "\"cyypbzqt\":\"" + $('input[name="cyypbzqt"]', jqueryMap.$zfwtForm).val() + "\"," + //抽样样品包装其他
            "\"ypleixinqt\":\"" + $('input[name="ypleixinqt"]', jqueryMap.$zfwtForm).val() + "\"," + //样品类型其他
            "\"scdwlxdh\":\"" + $('input[name="scdwlxdh"]', jqueryMap.$zfwtForm).val() + "\"," + //生产者电话
            "\"rqlxxz\":\"" + $('#riqileixingxuanze', jqueryMap.$zfwtForm).val() + "\"," + //生产/加工/购进日期
            "\"bzxx\":\"" + $('input[name="bzxx"]', jqueryMap.$zfwtForm).val() + "\"" + //备注
            "}"; //备注

        var url = '/customermanage/zfwt/saveZfwt';
        var type = 'POST';
        if (configMap.id != '') {
            url = '/customermanage/zfwt/updateZfwt/' + configMap.id;
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
                    configMap.id = result.id;
                    if (configMap.id != '') {
                        $('#renwuleixing', jqueryMap.$zfwtForm).attr("disabled", true);
                    } else {
                        $('#renwuleixing', jqueryMap.$zfwtForm).attr("disabled", false);
                    }
                    if (result.wtid && result.wtid != 'undefined')  {
                        var ypbm1 = '('+result.wtid+')';
                        $('#ypbm1').html(ypbm1); //保存后显示样品编码
                    }
                    zfwtlist.reload();
                    //保存成功后，取得委托id
                    var wtid = $('#chouyangdanbianhao').val();
                    //调用打印机
                    var datas = "{" +
                        //基本信息
                        "\"cydbm\":\"" + $('#chouyangdanbianhao').val() + "\"" + //抽样单编号
                        "}"; //备注

                    $.ajax({
                        url: '/customermanage/zfwt/wtdybq',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        data: datas,
                        success: function (result) {

                            if (result.success) {

                                $(result.data).each(function (index, d) {
                                    // console.log(d);
                                    tcsPrint(d.yplx, d.ypbm, d.ypmc, d.lx, d.ypzxbz,d.cydbm);
                                });

                                Messenger().post({
                                    message: '条码打印中,请稍后...',
                                    type: 'success'
                                });
                            } else {
                                Messenger().post({
                                    message: '打印失败',
                                    type: 'error'
                                });
                            }

                        },
                        error: function (result) {
                            Messenger().post({
                                message: '打印失败',
                                type: 'error'
                            });
                        }
                    });

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
    //打印
    var tcsPrint = function (yplx, ypbm, ypmc, lx, ypzxbz,cydbm) {

        var TSCObj;
        TSCObj = new ActiveXObject("TSCActiveX.TSCLIB");

        TSCObj.ActiveXopenport("TSC TTP-244 Pro");
        TSCObj.ActiveXsetup("60", "40", "5", "12", "0", "2", "0");
        TSCObj.ActiveXsendcommand("SET TEAR ON");
        TSCObj.ActiveXclearbuffer();
        if(yplx=="备样"){
            ypzxbz = "";
        }
        TSCObj.ActiveXwindowsfont(40, 15, 40, 0, 2, 0, "Arial", ypzxbz+"("+yplx+")");
        TSCObj.ActiveXwindowsfont(40, 70, 32, 0, 2, 0, "Arial", "抽样单号:");
        TSCObj.ActiveXwindowsfont(170, 70, 32, 0, 2, 0, "Arial", cydbm);
        TSCObj.ActiveXwindowsfont(40, 110, 32, 0, 2, 0, "Arial", "样品编号:");
        TSCObj.ActiveXwindowsfont(170, 110, 32, 0, 2, 0, "Arial", ypbm);
        TSCObj.ActiveXwindowsfont(40, 150, 32, 0, 2, 0, "Arial", "样品名称:");
        TSCObj.ActiveXwindowsfont(170, 150, 32, 0, 2, 0, "Arial", ypmc);
        // TSCObj.ActiveXwindowsfont(40, 150, 32, 0, 2, 0, "Arial", lx+":");
        // TSCObj.ActiveXwindowsfont(120, 150, 32, 0, 2, 0, "Arial", yplx);
        TSCObj.ActiveXbarcode("40", "190", "128", "90", "1", "0", "2", "2", ypbm);
        // TSCObj.ActiveXsendcommand("QRCODE 10,15,L,5,A,0,M2,S3,\"" + code + "\"");
        TSCObj.ActiveXprintlabel("1", "1");
        TSCObj.ActiveXcloseport();
    };
    var openZfWtXzList = function () {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 选&nbsp;择 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var ids = [];//定义一个数组
                $('input[name="checkbox_wtxz"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
                    ids.push($(this).val());//将选中的值添加到数组ids中
                });
                // console.log(ids);
                if (ids.length === 0 || ids.length > 1) {
                    Messenger().post({
                        message: '只能选择一个委托！',
                        type: 'warning'
                    });
                } else {
                    //对id赋值，初始化查询选择的委托信息
                    configMap.id = ids[0];
                    if (configMap.id != null && configMap.id != '') {
                        initZfwtData(true);
                        configMap.id = '';
                        return true;
                    } else {
                        Messenger().post({
                            message: '该委托数据不完整，请选择其他委托！',
                            type: 'warning'
                        });
                    }
                }
                return false;
            }
        };
        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666'
        };
        $.get('/customermanage/marketManage/zfwtxzlist.jsp', function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: '委托选择',
                size: 'large',
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var dwinfoAuto = function () {
        $( "#shoujiandanwei" ).autocomplete({
            source: function(request, response) {
                // request对象只有一个term属性，对应用户输入的文本
                // response在你自行处理并获取数据后，将JSON数据交给该函数处理，以便于autocomplete根据数据显示列表

                $.ajax({
                    url : "/customermanage/zfwt/getDwInfo",
                    type : "post",
                    dataType : "json",
                    data : {
                        "val" : request.term   // 获取输入框内容
                    },
                    success : function(data) {
                        response($.map(data, function(item) { // 此处是将返回数据转换为 JSON对象
                            return {
                                SJDW : item.SJDW,
                                qylx: item.qylx,
                                bcjdwdz: item.bcjdwdz,
                                frdb: item.frdb,
                                nxse: item.nxse,
                                yyzzh: item.yyzzh,
                                bcjdwlxr: item.bcjdwlxr,
                                spxkzbh: item.spxkzbh,
                                sjdwlxdh: item.sjdwlxdh,
                                bcjdwyddh:item.bcjdwyddh,
                                bcjdwyb:item.bcjdwyb
                            }
                        }));
                    }
                });
            },
            select: function( event, ui ) {
                // console.log(ui);
                var data = ui.item;
                $('#shoujiandanwei', jqueryMap.$zfwtForm).val(data.SJDW);//单位
                $('#quyuleixing', jqueryMap.$zfwtForm).val(data.qylx);//区域类型
                $('input[name="bcjdwdz"]', jqueryMap.$zfwtForm).val(data.bcjdwdz);//单位地址
                $('input[name="frdb"]', jqueryMap.$zfwtForm).val(data.frdb);//法人代表
                $('input[name="nxse"]', jqueryMap.$zfwtForm).val(data.nxse);//年销售额
                $('input[name="yyzzh"]', jqueryMap.$zfwtForm).val(data.yyzzh);//营业执照号
                $('input[name="bcjdwlxr"]', jqueryMap.$zfwtForm).val(data.bcjdwlxr);//联系人
                $('input[name="spxkzbh"]', jqueryMap.$zfwtForm).val(data.spxkzbh);//食品许可
                $('input[name="sjdwlxdh"]', jqueryMap.$zfwtForm).val(data.sjdwlxdh);//固定电话
                $('input[name="bcjdwyddh"]', jqueryMap.$zfwtForm).val(data.bcjdwyddh);//移动电话
                $('input[name="bcjdwyb"]', jqueryMap.$zfwtForm).val(data.bcjdwyb);//邮编
                return false;
            }
        })
            .autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $( "<li>" )
                .append( "<div>" + item.SJDW + "</div>" )
                .appendTo( ul );
        };
    };
    var initJylb= function()
    {
        $.ajax({
            url:"/customermanage/ggDmGet/getJylbList?fl=ZF",
            type: 'POST',
            async:false,
            success: function (data) {
                $("#jianyanleibie",jqueryMap.$zfwtForm).empty();
                for (var i = 0; i < data.length; i++) {
                    var $val = $("<option value="+ data[i].JYLB_DM+">" + data[i].JYLB_MC + "</option>");
                    console.log("$val="+$val.html());
                    $("#jianyanleibie",jqueryMap.$zfwtForm).append($val);
                }
            }
        });
    }
    return {
        // 初始化
        init: function (id, uuid, szsf, szcs) {
            configMap.uuid = uuid;
            configMap.id = id;
            setJqueryMap(uuid);
            initJylb();
            tabMenu('zfwt_info');
            jqueryMap.$zfwtJbxxDiv.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN',
                viewDate:new Date()
            });
            getCyddLevel1();
            dwinfoAuto();
            if (id != '') {
                initZfwtData(false);
            }
            //获得省
            // getProvince();
            //获得市
            // $('#customerProvince', jqueryMap.$zfwtJbxxDiv).off().on('change', function () {
            //     getCity();
            // });
            //获得县
            // $('#customerZone', jqueryMap.$zfwtJbxxDiv).off().on('change', function () {
            //     getCounty();
            // });
            //保存
            $('#saveSPCY').off().on('click',function () {
                saveSPCY();
            });
            //保存并打印
            $('#zf_SaveQYWTDy').off().on('click', function () {
                stopContinueClick("#zf_SaveQYWTDy", 300);
                zf_SaveQYWTDy();
            });
            $('#zf_WtXZ').off().on('click', function () {
                stopContinueClick("#zf_WtXZ", 300);
                openZfWtXzList();
            });

            $('#chouyangdanbianhao').off().on('keypress',function () {
                console.log(event.keyCode);
                if (event.keyCode == 13) {
                    configMap.id = $('#chouyangdanbianhao').val();
                    if (configMap.id != null && configMap.id != '') {
                        initZfwtData(false);
                    }
                }

            });
            $("#cydw").blur(function(){
                var rwlycContent = $("#cydw").val();
                $("#renwulaiyuan").val(rwlycContent);
            })
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';

        }
    };
}();
