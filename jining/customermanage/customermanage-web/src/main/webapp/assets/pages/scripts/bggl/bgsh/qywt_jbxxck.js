var ckqywt = function () {

    //'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        id: '',
        wttype:'',
        uuid: '',
        szGrid: null,
        ypUrl: '/customermanage/marketManage/ypList.jsp',
        deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除"><i class="fa fa-trash" style="font-size:15px;"></i></a>',
        printBqdy:'/customermanage/zfwt/qywtdybqbyypbm'
    };

    // 全局Dom
    var jqueryMap = {
        $qywtJbxxDiv: null,
        $khflAddDialog: null,
        $commonproblemDialog: null,
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$qywtJbxxDiv = $('#qywt_jbxx' + uuid);
        jqueryMap.$qywtForm = $('#add_form', jqueryMap.$qywtJbxxDiv);
    };


    //获取省
    var getProvince = function () {
        $.get(configMap.path + '/commonmanager/xzqy/sj', function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].sjdm + '">' + data[i].xzqhMc + '</option>').appendTo($('#customerProvince', jqueryMap.$qywtJbxxDiv));
            }

            //$('#customerProvince', jqueryMap.$qywtJbxxDiv).val(configMap.szsf);
            // $('#customerProvince', jqueryMap.$qywtJbxxDiv).select2({
            //     placeholder: '选择省份',
            //     width: '186px',
            //     allowClear: false,
            //     language: 'zh-CN'
            // });
            //getCity(configMap.szcs);
        });
    }

    var getCity = function (e, f) {
        $('#customerZone', jqueryMap.$qywtJbxxDiv).empty();
        var v = $('#customerProvince', jqueryMap.$qywtJbxxDiv).val();
        $.get(configMap.path + '/commonmanager/xzqy/xjXzqy?sjdm=' + v, function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#customerZone', jqueryMap.$qywtJbxxDiv));
            }
            $('#customerZone', jqueryMap.$qywtJbxxDiv).val(e);
            getCounty(f);
            // $('#customerZone', jqueryMap.$qywtJbxxDiv).select2({
            //     placeholder: '选择地级市/区',
            //     width: '186px',
            //     allowClear: false,
            //     language: 'zh-CN'
            // });
        });
    }

    var getCounty = function (e) {
        $('#customerCity', jqueryMap.$qywtJbxxDiv).empty();
        var v = $('#customerZone', jqueryMap.$qywtJbxxDiv).val();
        $.get(configMap.path + '/commonmanager/xzqy/xjXzqy?sjdm=' + v, function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].xzqhDm + '">' + data[i].xzqhMc + '</option>').appendTo($('#customerCity', jqueryMap.$qywtJbxxDiv));
            }
            $('#customerCity', jqueryMap.$qywtJbxxDiv).val(e);
            // $('#customerZone', jqueryMap.$qywtJbxxDiv).select2({
            //     placeholder: '选择地级市/区',
            //     width: '186px',
            //     allowClear: false,
            //     language: 'zh-CN'
            // });
        });
    }

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


    var initQywtData = function (lyflag) {
        $.ajax({
            url: '/customermanage/zfwt/getQywt?id=' + configMap.id,
            type: 'GET',
            success: function (result) {
                
                if (result.success) {
                    var data = result.data;
                    if (data.readonly && data.readonly=='1') {
                        // $("#saveQYWT").hide();  //保存
                        // $("#saveQYWTDy").hide(); //保存并打印
                        // $('#saveQYWT', jqueryMap.$qywtForm).attr("disabled", true);
                        // $('#saveQYWTDy', jqueryMap.$qywtForm).attr("disabled", true);
                    } else {
                        $('#saveQYWT', jqueryMap.$qywtForm).attr("disabled", false);
                        $('#saveQYWTDy', jqueryMap.$qywtForm).attr("disabled", false);
                    }
                    $('#saveQYWT', jqueryMap.$qywtForm).html("更新");
                    if (configMap.id != '') {
                        $('#renwuleixing', jqueryMap.$qywtForm).attr("disabled", true);
                    }
// console.log(lyflag);
                    if (!lyflag) {
                        // console.log('ffff');
                        //清除id，使该委托信息可以作为新增数据保存
                        configMap.id = data.id;
                    } else {
                        console.log('ddddd');
                        $("#saveQYWT").show();  //保存
                        $("#saveQYWTDy").show(); //保存并打印
                        $('#saveQYWT', jqueryMap.$qywtForm).attr("disabled", false);
                        $('#saveQYWTDy', jqueryMap.$qywtForm).attr("disabled", false);
                    }
                    if (!lyflag) {
                        $('input[name="cydbm"]', jqueryMap.$qywtForm).val(data.cydbm);
                    }
                    $('input[name="wtdw"]', jqueryMap.$qywtForm).val(data.wtdw);//委托单位
                    $('#renwuleixing', jqueryMap.$qywtForm).val(data.rwlx);//任务类型
                    $('#jianyanleibie', jqueryMap.$qywtForm).val(data.jylb);//检验类别
                    $('input[name="bz"]', jqueryMap.$qywtForm).val(data.bz);//备注
                    $('#baogaojiaofufangshi', jqueryMap.$qywtForm).val(data.bgjffs);//报告交付方式
                    $('input[name="shouyry"]', jqueryMap.$qywtForm).val(data.shouyry);//收样人员
                    $('input[name="syry"]', jqueryMap.$qywtForm).val(data.syry);//送样人员
                    $('input[name="syrq"]', jqueryMap.$qywtForm).val(data.syrq);//送样日期
                    $('#jyyj', jqueryMap.$qywtForm).val(data.jyyj);//检验依据(标准)
                    $('input[name="jyyjbzqt"]', jqueryMap.$qywtForm).val(data.jyyjbzqt);//检验依据为其他时
                    $('#jswj', jqueryMap.$qywtForm).val(data.jswj);//技术文件
                    $('input[name="jswjqt"]', jqueryMap.$qywtForm).val(data.jswjqt);//技术文件为其他时
                    $('#yzjl', jqueryMap.$qywtForm).val(data.yzjl);//检验结论
                    $('input[name="jywcrq"]', jqueryMap.$qywtForm).val(data.jywcrq);//检验完成日期
                    $('#jysm', jqueryMap.$qywtForm).val(data.jysm);//检验说明
                    $('#clyj', jqueryMap.$qywtForm).val(data.clyj);//检毕样品处理意见
                    $('#jffs', jqueryMap.$qywtForm).val(data.jffs);//缴费方式
                    $('#baogaojiaofufangshi', jqueryMap.$qywtForm).val(data.bgjffs);//报告接收
                    $('input[name="wtdwdz"]', jqueryMap.$qywtForm).val(data.wtdwdz);//通讯地址
                    $('input[name="wtdwyzbm"]', jqueryMap.$qywtForm).val(data.wtdwyzbm);//邮政编码
                    $('input[name="wtdwdh"]', jqueryMap.$qywtForm).val(data.wtdwdh);//电话
                    $('input[name="dybqsl"]', jqueryMap.$qywtForm).val(data.dybqsl);//打印标签数量
                    $('#shifouzuofei', jqueryMap.$qywtForm).val(data.zfbs);//是否作废
                    $('input[name="zfyy"]', jqueryMap.$qywtForm).val(data.zfyy);//作废原因
                    //$('#baogaofenlei1', jqueryMap.$qywtForm).val(data.bgfl1);//报告分类1
                    //$('#baogaofenlei', jqueryMap.$qywtForm).val(data.bgfl);//报告分类

                    //样品信息
                    var ypbm2 = '('+data.ypbm+')';
                    $('#ypbm2').html(ypbm2); //修改时显示样品编码
                    $('input[name="cydbh"]', jqueryMap.$qywtForm).val(data.wtid);//委托编号
                    $('input[name="wtid"]', jqueryMap.$qywtForm).val(data.wtid);//委托编号
                    $('input[name="ypmc"]', jqueryMap.$qywtForm).val(data.ypmc);//样品名称
                    $('input[name="sb"]', jqueryMap.$qywtForm).val(data.sb);//商标
                    $('input[name="ggxh"]', jqueryMap.$qywtForm).val(data.ggxh);//规格型号
                    $('input[name="ypdj"]', jqueryMap.$qywtForm).val(data.ypdj);//样品等级
                    $('input[name="ypsl"]', jqueryMap.$qywtForm).val(data.ypsl);//样品数量
                    $('input[name="ypdw"]', jqueryMap.$qywtForm).val(data.ypdw);//样品单位
                    $('input[name="scrq"]', jqueryMap.$qywtForm).val(data.scrq);//生产日期
                    $('input[name="rkrq"]', jqueryMap.$qywtForm).val(data.rkrq);//入库日期
                    $('input[name="ypphhbh"]', jqueryMap.$qywtForm).val(data.ypphhbh);//样品批号或编号
                    $('input[name="ypzt"]', jqueryMap.$qywtForm).val(data.ypzt);//样品状态
                    $('input[name="scdw"]', jqueryMap.$qywtForm).val(data.scdw);//生产单位
                    $('#preservationCondition', jqueryMap.$qywtForm).val(data.ypbctj);//样品保存条件
                    $('#yangpinwutai', jqueryMap.$qywtForm).val(data.ypwt);//样品物态
                    $('input[name="ybjs"]', jqueryMap.$qywtForm).val(data.ybjs);//样本基数
                    $('input[name="bzq"]', jqueryMap.$qywtForm).val(data.bzq);//保质期
                    $('#if_th', jqueryMap.$qywtForm).val(data.if_th);//样品退还
                    $('input[name="ypbm"]', jqueryMap.$qywtForm).val(data.ypbm);//样品编码
                    $('#if_sgr', jqueryMap.$qywtForm).val(data.if_sgr);//是否蔬果肉
                    $('#if_ssg', jqueryMap.$qywtForm).val(data.if_ssg);//是否食水工
                    $('#if_by', jqueryMap.$qywtForm).val(data.if_by);//是否备样
                    $('input[name="bysl"]', jqueryMap.$qywtForm).val(data.bysl);//备样数量
                    $('input[name="jyxm"]', jqueryMap.$qywtForm).val(data.jyxm);//检验项目

                    $('#qiyeyangpinlaiyuan', jqueryMap.$qywtForm).val(data.qyyply);//样品来源
                    $('input[name="ccyqqt"]', jqueryMap.$qywtForm).val(data.ccyqqt);//样品保存条件其他
                    $('#chouyangdidian', jqueryMap.$qywtForm).val(data.cydd);//抽/送样地点
                    $('input[name="wtcyfs"]', jqueryMap.$qywtForm).val(data.wtcyfs);//抽样方式
                    $('input[name="ypzxbz"]', jqueryMap.$qywtForm).val(data.ypzxbz);//执行标准
                    $('input[name="ftbh"]', jqueryMap.$qywtForm).val(data.ftbh);//封条编号

                    if ($('input[name="textField1"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField1"]', jqueryMap.$qywtForm).val(data.textField1);
                    }
                    if ($('input[name="textField2"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField2"]', jqueryMap.$qywtForm).val(data.textField2);
                    }
                    if ($('input[name="textField3"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField3"]', jqueryMap.$qywtForm).val(data.textField3);
                    }
                    if ($('input[name="textField4"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField4"]', jqueryMap.$qywtForm).val(data.textField4);
                    }
                    if ($('input[name="textField5"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField5"]', jqueryMap.$qywtForm).val(data.textField5);
                    }
                    if ($('input[name="textField6"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField6"]', jqueryMap.$qywtForm).val(data.textField6);
                    }
                    if ($('input[name="textField7"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField7"]', jqueryMap.$qywtForm).val(data.textField7);
                    }
                    if ($('input[name="textField8"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField8"]', jqueryMap.$qywtForm).val(data.textField8);
                    }
                    if ($('input[name="textField9"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField9"]', jqueryMap.$qywtForm).val(data.textField9);
                    }
                    if ($('input[name="textField10"]', jqueryMap.$qywtForm)) {
                        $('input[name="textField10"]', jqueryMap.$qywtForm).val(data.textField10);
                    }
                    if ($('input[name="dateField1"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField1"]', jqueryMap.$qywtForm).val(data.dateField1);
                    }
                    if ($('input[name="dateField2"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField2"]', jqueryMap.$qywtForm).val(data.dateField2);
                    }
                    if ($('input[name="dateField3"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField3"]', jqueryMap.$qywtForm).val(data.dateField3);
                    }
                    if ($('input[name="dateField4"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField4"]', jqueryMap.$qywtForm).val(data.dateField4);
                    }
                    if ($('input[name="dateField5"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField5"]', jqueryMap.$qywtForm).val(data.dateField5);
                    }
                    if ($('input[name="dateField6"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField6"]', jqueryMap.$qywtForm).val(data.dateField6);
                    }
                    if ($('input[name="dateField7"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField7"]', jqueryMap.$qywtForm).val(data.dateField7);
                    }
                    if ($('input[name="dateField8"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField8"]', jqueryMap.$qywtForm).val(data.dateField8);
                    }
                    if ($('input[name="dateField9"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField9"]', jqueryMap.$qywtForm).val(data.dateField9);
                    }
                    if ($('input[name="dateField10"]', jqueryMap.$qywtForm)) {
                        $('input[name="dateField10"]', jqueryMap.$qywtForm).val(data.dateField10);
                    }
                    if ($('#selectField1', jqueryMap.$qywtForm)) {
                        $('#selectField1', jqueryMap.$qywtForm).val(data.selectField1);
                    }
                    if ($('#selectField2', jqueryMap.$qywtForm)) {
                        $('#selectField2', jqueryMap.$qywtForm).val(data.selectField2);
                    }
                    if ($('#selectField3', jqueryMap.$qywtForm)) {
                        $('#selectField3', jqueryMap.$qywtForm).val(data.selectField3);
                    }
                    if ($('#selectField4', jqueryMap.$qywtForm)) {
                        $('#selectField4', jqueryMap.$qywtForm).val(data.selectField4);
                    }
                    if ($('#selectField5', jqueryMap.$qywtForm)) {
                        $('#selectField5', jqueryMap.$qywtForm).val(data.selectField5);
                    }
                    if ($('#selectField6', jqueryMap.$qywtForm)) {
                        $('#selectField6', jqueryMap.$qywtForm).val(data.selectField6);
                    }
                    if ($('#selectField7', jqueryMap.$qywtForm)) {
                        $('#selectField7', jqueryMap.$qywtForm).val(data.selectField7);
                    }
                    if ($('#selectField8', jqueryMap.$qywtForm)) {
                        $('#selectField8', jqueryMap.$qywtForm).val(data.selectField8);
                    }
                    if ($('#selectField9', jqueryMap.$qywtForm)) {
                        $('#selectField9', jqueryMap.$qywtForm).val(data.selectField9);
                    }
                    if ($('#selectField10', jqueryMap.$qywtForm)) {
                        $('#selectField10', jqueryMap.$qywtForm).val(data.selectField10);
                    }
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
        var wtid = $('input[name="wtid"]', jqueryMap.$qywtForm).val(); //委托id
        var cydbm = $('input[name="cydbm"]', jqueryMap.$qywtForm).val(); //委托单NO
        var ypmc = $('input[name="ypmc"]', jqueryMap.$qywtForm).val(); //样品名称
        var ypzxbz = $('input[name="ypzxbz"]', jqueryMap.$qywtForm).val(); //执行标准
        // if (wtid == "undefined" || wtid == null || wtid == "") {
        //     Messenger().post({
        //         message: "委托单编号不得为空！",
        //         type: 'warning'
        //     });
        //     return false;
        // }
        if (cydbm == "undefined" || cydbm == null || cydbm == "") {
            Messenger().post({
                message: "委托单号不得为空！",
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
        if (ypzxbz == "undefined" || ypzxbz == null || ypzxbz == "") {
            Messenger().post({
                message: "执行标准不得为空！",
                type: 'warning'
            });
            return false;
        }
        return true;
    }

    var saveQYWT = function () {
        stopContinueClick('#saveQYWT',300);
        var check = checkData();
        if (!check) {
            return false;
        }
        // console.log($('input[name="cydbh"]', jqueryMap.$qywtForm).val());
        var datas = "{" +
            //基本信息
            "\"type\":\"" + configMap.wttype + "\"," + //委托类型
            "\"cydbm\":\"" + $('input[name="cydbm"]', jqueryMap.$qywtForm).val() + "\"," + //委托单编号
            "\"wtdw\":\"" + $('input[name="wtdw"]', jqueryMap.$qywtForm).val() + "\"," + //委托单位
            "\"rwlx\":\"" + $('#renwuleixing', jqueryMap.$qywtForm).val() + "\"," + //任务类型
            "\"jylb\":\"" + $('#jianyanleibie', jqueryMap.$qywtForm).val() + "\"," + //检验类别
            "\"jyyj\":\"" + $('#jyyj', jqueryMap.$qywtForm).val() + "\"," + //检验依据
            "\"jyyjbzqt\":\"" + $('input[name="jyyjbzqt"]', jqueryMap.$qywtForm).val() + "\"," + //检验依据为其他时
            "\"jswj\":\"" + $('#jswj', jqueryMap.$qywtForm).val() + "\"," + //技术文件
            "\"jswjqt\":\"" + $('input[name="jswjqt"]', jqueryMap.$qywtForm).val() + "\"," + //技术文件为其他时
            "\"yzjl\":\"" + $('#yzjl', jqueryMap.$qywtForm).val() + "\"," + //检验结论
            "\"jywcrq\":\"" + $('input[name="jywcrq"]', jqueryMap.$qywtForm).val() + "\"," + //检验完成日期
            "\"jysm\":\"" + $('#jysm', jqueryMap.$qywtForm).val() + "\"," + //检验说明
            "\"clyj\":\"" + $('#clyj', jqueryMap.$qywtForm).val() + "\"," + //检毕样品处理意见
            "\"bz\":\"" + $('input[name="bz"]', jqueryMap.$qywtForm).val() + "\"," + //备注
            "\"jffs\":\"" + $('#jffs', jqueryMap.$qywtForm).val() + "\"," + //缴费方式
            "\"bgjffs\":\"" + $('#baogaojiaofufangshi', jqueryMap.$qywtForm).val() + "\"," + //报告接收
            "\"wtdwdz\":\"" + $('input[name="wtdwdz"]', jqueryMap.$qywtForm).val() + "\"," + //通讯地址
            "\"wtdwyzbm\":\"" + $('input[name="wtdwyzbm"]', jqueryMap.$qywtForm).val() + "\"," + //邮政编码
            "\"wtdwdh\":\"" + $('input[name="wtdwdh"]', jqueryMap.$qywtForm).val() + "\"," + //电话
            "\"shouyry\":\"" + $('input[name="shouyry"]', jqueryMap.$qywtForm).val() + "\"," + //收样人员
            "\"syry\":\"" + $('input[name="syry"]', jqueryMap.$qywtForm).val() + "\"," + //送样人员
            "\"syrq\":\"" + $('input[name="syrq"]', jqueryMap.$qywtForm).val() + "\"," + //送样日期
            "\"dybqsl\":\"" + $('input[name="dybqsl"]', jqueryMap.$qywtForm).val() + "\"," + //打印标签数量
            "\"zfbs\":\"" + $('#shifouzuofei', jqueryMap.$qywtForm).val() + "\"," + //是否作废
            "\"zfyy\":\"" + $('input[name="zfyy"]', jqueryMap.$qywtForm).val() + "\"," + //作废原因
            //"\"bgfl1\":\"" + $('#baogaofenlei1', jqueryMap.$qywtForm).val() + "\"," + //报告分类1
            //"\"bgfl\":\"" + $('#baogaofenlei', jqueryMap.$qywtForm).val() + "\"," + //报告分类
            //20190319 Lims3.0修改。创建委托时不创建样品信息
            //样品信息
            "\"wtid\":\"" + $('input[name="wtid"]', jqueryMap.$qywtForm).val() + "\"," + //委托编号
            "\"ypmc\":\"" + $('input[name="ypmc"]', jqueryMap.$qywtForm).val() + "\"," + //样品名称
            "\"sb\":\"" + $('input[name="sb"]', jqueryMap.$qywtForm).val() + "\"," + //商标
            "\"ggxh\":\"" + $('input[name="ggxh"]', jqueryMap.$qywtForm).val() + "\"," + //规格型号
            "\"ypdj\":\"" + $('input[name="ypdj"]', jqueryMap.$qywtForm).val() + "\"," + //样品等级
            "\"ypsl\":\"" + $('input[name="ypsl"]', jqueryMap.$qywtForm).val() + "\"," + //样品数量
            "\"ypdw\":\"" + $('input[name="ypdw"]', jqueryMap.$qywtForm).val() + "\"," + //样品单位
            "\"scrq\":\"" + $('input[name="scrq"]', jqueryMap.$qywtForm).val() + "\"," + //生产日期
            "\"rkrq\":\"" + $('input[name="rkrq"]', jqueryMap.$qywtForm).val() + "\"," + //入库日期
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
            "\"qyyply\":\"" + $('#qiyeyangpinlaiyuan', jqueryMap.$qywtForm).val() + "\"," + //样品来源
            "\"ccyqqt\":\"" + $('input[name="ccyqqt"]', jqueryMap.$qywtForm).val() + "\"," + //样品保存条件其他
            "\"cydd\":\"" + $('#chouyangdidian', jqueryMap.$qywtForm).val() + "\"," + //抽/送样地点
            "\"wtcyfs\":\"" + $('input[name="wtcyfs"]', jqueryMap.$qywtForm).val() + "\"," + //抽样方式
            "\"ypzxbz\":\"" + $('input[name="ypzxbz"]', jqueryMap.$qywtForm).val() + "\"," + //执行标准
            "\"ftbh\":\"" + $('input[name="ftbh"]', jqueryMap.$qywtForm).val() + "\"," + //封条编号
            "\"bysl\":\"" + $('input[name="bysl"]', jqueryMap.$qywtForm).val() + "\"" + //备样数量
            "}"; //备注

        var url = '/customermanage/zfwt/saveQywt';
        var type = 'POST';
        if (configMap.id !='') {
            url = '/customermanage/zfwt/updateQywt/' + configMap.id;
            type = 'POST';
        }
        // console.log(JSON.stringify(jsondata));
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
                        $('#renwuleixing', jqueryMap.$qywtForm).attr("disabled", true);
                    } else {
                        $('#renwuleixing', jqueryMap.$qywtForm).attr("disabled", false);
                    }
                    if (result.wtid && result.wtid != 'undefined')  {
                        var ypbm2 = '('+result.wtid+')';
                        $('#ypbm2').html(ypbm2); //保存后显示样品编码
                    }
                    // console.log(configMap.id)
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
    };

    var sampleMa = function () {
        generateTab(this, configMap.path + configMap.ypUrl, "样品管理", "ypgl_info", 'fa fa-file-text-o iconMr');
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

    var intiWTCustomerInformation = function () {
        $("#btn_QueryCustomerInformation").off("click").on("click",function () {
            chakanBtn();
        })
    }
    //委托客户信息弹出框
    var chakanBtn = function () {
        console.log('asdfsdf'+configMap.uuid);
        openModal("委托客户信息", "customermanage/marketManage/qywt_jbxx_tanchu.jsp?uuid="+configMap.uuid);
    };

    //打开模态框组件
    var openModal = function (title, url) {
        
        console.log("打开模态框组件");
        $.get(url, function (html) {
            jqueryMap.$ManageDialog = bootbox.dialog({
                size: 'large',
                title: title,
                message: html,
            });
        });
    };
    //保存并打印
    var saveQYWTDy = function () {
        stopContinueClick('#saveQYWTDy',300);
        var check = checkData();
        if (!check) {
            return false;
        }
        // console.log($('input[name="cydbh"]', jqueryMap.$qywtForm).val());
        var datas = "{" +
            //基本信息
            "\"type\":\"" + configMap.wttype + "\"," + //委托类型
            "\"cydbm\":\"" + $('input[name="cydbm"]', jqueryMap.$qywtForm).val() + "\"," + //委托单编号
            "\"wtdw\":\"" + $('input[name="wtdw"]', jqueryMap.$qywtForm).val() + "\"," + //委托单位
            "\"rwlx\":\"" + $('#renwuleixing', jqueryMap.$qywtForm).val() + "\"," + //任务类型
            "\"jylb\":\"" + $('#jianyanleibie', jqueryMap.$qywtForm).val() + "\"," + //检验类别
            "\"jyyj\":\"" + $('#jyyj', jqueryMap.$qywtForm).val() + "\"," + //检验依据
            "\"jyyjbzqt\":\"" + $('input[name="jyyjbzqt"]', jqueryMap.$qywtForm).val() + "\"," + //检验依据为其他时
            "\"jswj\":\"" + $('#jswj', jqueryMap.$qywtForm).val() + "\"," + //技术文件
            "\"jswjqt\":\"" + $('input[name="jswjqt"]', jqueryMap.$qywtForm).val() + "\"," + //技术文件为其他时
            "\"yzjl\":\"" + $('#yzjl', jqueryMap.$qywtForm).val() + "\"," + //检验结论
            "\"jywcrq\":\"" + $('input[name="jywcrq"]', jqueryMap.$qywtForm).val() + "\"," + //检验完成日期
            "\"jysm\":\"" + $('#jysm', jqueryMap.$qywtForm).val() + "\"," + //检验说明
            "\"clyj\":\"" + $('#clyj', jqueryMap.$qywtForm).val() + "\"," + //检毕样品处理意见
            "\"bz\":\"" + $('input[name="bz"]', jqueryMap.$qywtForm).val() + "\"," + //备注
            "\"jffs\":\"" + $('#jffs', jqueryMap.$qywtForm).val() + "\"," + //缴费方式
            "\"bgjffs\":\"" + $('#baogaojiaofufangshi', jqueryMap.$qywtForm).val() + "\"," + //报告接收
            "\"wtdwdz\":\"" + $('input[name="wtdwdz"]', jqueryMap.$qywtForm).val() + "\"," + //通讯地址
            "\"wtdwyzbm\":\"" + $('input[name="wtdwyzbm"]', jqueryMap.$qywtForm).val() + "\"," + //邮政编码
            "\"wtdwdh\":\"" + $('input[name="wtdwdh"]', jqueryMap.$qywtForm).val() + "\"," + //电话
            "\"shouyry\":\"" + $('input[name="shouyry"]', jqueryMap.$qywtForm).val() + "\"," + //收样人员
            "\"syry\":\"" + $('input[name="syry"]', jqueryMap.$qywtForm).val() + "\"," + //送样人员
            "\"syrq\":\"" + $('input[name="syrq"]', jqueryMap.$qywtForm).val() + "\"," + //送样日期
            "\"dybqsl\":\"" + $('input[name="dybqsl"]', jqueryMap.$qywtForm).val() + "\"," + //打印标签数量
            "\"zfbs\":\"" + $('#shifouzuofei', jqueryMap.$qywtForm).val() + "\"," + //是否作废
            "\"zfyy\":\"" + $('input[name="zfyy"]', jqueryMap.$qywtForm).val() + "\"," + //作废原因
            //"\"bgfl1\":\"" + $('#baogaofenlei1', jqueryMap.$qywtForm).val() + "\"," + //报告分类1
            //"\"bgfl\":\"" + $('#baogaofenlei', jqueryMap.$qywtForm).val() + "\"," + //报告分类
            //20190319 Lims3.0修改。创建委托时不创建样品信息
            //样品信息
            "\"wtid\":\"" + $('input[name="wtid"]', jqueryMap.$qywtForm).val() + "\"," + //委托编号
            "\"ypmc\":\"" + $('input[name="ypmc"]', jqueryMap.$qywtForm).val() + "\"," + //样品名称
            "\"sb\":\"" + $('input[name="sb"]', jqueryMap.$qywtForm).val() + "\"," + //商标
            "\"ggxh\":\"" + $('input[name="ggxh"]', jqueryMap.$qywtForm).val() + "\"," + //规格型号
            "\"ypdj\":\"" + $('input[name="ypdj"]', jqueryMap.$qywtForm).val() + "\"," + //样品等级
            "\"ypsl\":\"" + $('input[name="ypsl"]', jqueryMap.$qywtForm).val() + "\"," + //样品数量
            "\"ypdw\":\"" + $('input[name="ypdw"]', jqueryMap.$qywtForm).val() + "\"," + //样品单位
            "\"scrq\":\"" + $('input[name="scrq"]', jqueryMap.$qywtForm).val() + "\"," + //生产日期
            "\"rkrq\":\"" + $('input[name="rkrq"]', jqueryMap.$qywtForm).val() + "\"," + //入库日期
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
            "\"qyyply\":\"" + $('#qiyeyangpinlaiyuan', jqueryMap.$qywtForm).val() + "\"," + //样品来源
            "\"ccyqqt\":\"" + $('input[name="ccyqqt"]', jqueryMap.$qywtForm).val() + "\"," + //样品保存条件其他
            "\"cydd\":\"" + $('#chouyangdidian', jqueryMap.$qywtForm).val() + "\"," + //抽/送样地点
            "\"wtcyfs\":\"" + $('input[name="wtcyfs"]', jqueryMap.$qywtForm).val() + "\"," + //抽样方式
            "\"ypzxbz\":\"" + $('input[name="ypzxbz"]', jqueryMap.$qywtForm).val() + "\"," + //执行标准
            "\"ftbh\":\"" + $('input[name="ftbh"]', jqueryMap.$qywtForm).val() + "\"," + //封条编号
            "\"bysl\":\"" + $('input[name="bysl"]', jqueryMap.$qywtForm).val() + "\"" + //备样数量
            "}"; //备注

        var url = '/customermanage/zfwt/saveQywt';
        var type = 'POST';
        if (configMap.id !='') {
            url = '/customermanage/zfwt/updateQywt/' + configMap.id;
            type = 'POST';
        }
        // console.log(JSON.stringify(jsondata));
        var wtid = '';
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
                        $('#renwuleixing', jqueryMap.$qywtForm).attr("disabled", true);
                    } else {
                        $('#renwuleixing', jqueryMap.$qywtForm).attr("disabled", false);
                    }
                    if (result.wtid && result.wtid != 'undefined')  {
                        var ypbm2 = '('+result.wtid+')';
                        wtid = result.wtid;
                        $('#ypbm2').html(ypbm2); //保存后显示样品编码
                    }
                    //保存成功后，取得委托id

                    //调用打印机

                    $.ajax({
                        url: configMap.path + configMap.printBqdy,
                        type: 'POST',
                        dataType: 'json',
                        data: {ids: wtid},
                        success: function (data) {
                            if (data.success) {
                                // console.log(data.data);
                                $(data.data).each(function (index, d) {
                                    // console.log(d);
                                    tcsPrint(d.yplx, d.ypbm, d.ypmc, d.lx, d.ypzxbz);
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
                    // console.log(configMap.id)
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


    };
    //打印
    var tcsPrint = function (yplx, ypbm, ypmc, lx, ypzxbz) {
        var TSCObj;
        TSCObj = new ActiveXObject("TSCActiveX.TSCLIB");

        TSCObj.ActiveXopenport("TSC TTP-244 Pro");
        TSCObj.ActiveXsetup("60", "40", "5", "12", "0", "2", "0");
        TSCObj.ActiveXsendcommand("SET TEAR ON");
        TSCObj.ActiveXclearbuffer();
        TSCObj.ActiveXwindowsfont(40, 15, 40, 0, 2, 0, "Arial", ypzxbz);
        TSCObj.ActiveXwindowsfont(40, 70, 32, 0, 2, 0, "Arial", "样品编码:");
        TSCObj.ActiveXwindowsfont(170, 70, 32, 0, 2, 0, "Arial", ypbm);
        TSCObj.ActiveXwindowsfont(40, 110, 32, 0, 2, 0, "Arial", "样品名称:");
        TSCObj.ActiveXwindowsfont(170, 110, 32, 0, 2, 0, "Arial", ypmc);
        TSCObj.ActiveXwindowsfont(40, 150, 32, 0, 2, 0, "Arial", lx+":");
        TSCObj.ActiveXwindowsfont(120, 150, 32, 0, 2, 0, "Arial", yplx);
        TSCObj.ActiveXbarcode("40", "190", "128", "90", "1", "0", "2", "2", ypbm);
        // TSCObj.ActiveXsendcommand("QRCODE 10,15,L,5,A,0,M2,S3,\"" + code + "\"");
        TSCObj.ActiveXprintlabel("1", "1");
        TSCObj.ActiveXcloseport();
    };
    var openQyWtXzList = function () {
        var dialogButtons = {};
        dialogButtons.success = {
            label: '<i class="fa fa-save"></i> 选&nbsp;择 ',
            className: "btn btn btn-default btnBlue borderRadius4 colorfff",
            callback: function () {
                var ids = [];//定义一个数组
                $('input[name="checkbox_qywtxz"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
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
                        initQywtData(true);
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
        $.get('/customermanage/marketManage/qywtxzlist.jsp', function (html) {
            jqueryMap.$contractauditDialog = bootbox.dialog({
                title: '委托选择',
                size: 'large',
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var dwinfoAuto = function () {
        $( "#weituodanwei" ).autocomplete({
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
                                wtdw : item.wtdw,
                                wtdwdz: item.wtdwdz,
                                wtdwdh: item.wtdwdh,
                                wtdwyzbm: item.wtdwyzbm
                            }
                        }));
                    }
                });
            },
            select: function( event, ui ) {
                // console.log(ui);
                var data = ui.item;
                $('#weituodanwei', jqueryMap.$qywtForm).val(data.wtdw);//单位
                $('input[name="wtdwdz"]', jqueryMap.$qywtForm).val(data.wtdwdz);//单位地址
                $('input[name="wtdwdh"]', jqueryMap.$qywtForm).val(data.wtdwdh);//
                $('input[name="wtdwyzbm"]', jqueryMap.$qywtForm).val(data.wtdwyzbm);//
                return false;
            }
        })
            .autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $( "<li>" )
                .append( "<div>" + item.SJDW + "</div>" )
                .appendTo( ul );
        };
    };

    return {
        // 初始化
        init: function (id, uuid, szsf, szcs) {
            configMap.uuid = uuid;
            configMap.id = id;
            setJqueryMap(uuid);
            tabMenu('qywt_info');
            jqueryMap.$qywtJbxxDiv.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                viewDate:new Date(),
                language: 'zh-CN'
            });
            // dwinfoAuto();
            //获得省
            getProvince();
            //获得市
            $('#customerProvince', jqueryMap.$qywtJbxxDiv).off().on('change', function () {
                getCity();
            });
            //获得县
            $('#customerZone', jqueryMap.$qywtJbxxDiv).off().on('change', function () {
                getCounty();
            });
            //保存
            $('#saveQYWT').off().on('click', function () {
                stopContinueClick("#saveQYWT", 300);
                saveQYWT();
            });
            //保存并打印
            $('#saveQYWTDy').off().on('click', function () {
                stopContinueClick("#saveQYWTDy", 300);
                saveQYWTDy();
            });
            if (configMap.id != "") { //有值
                initQywtData(false);
            }
            //样品管理
            $('#sampleMa').off().on('click', function () {
                sampleMa();
            });

            //查询委托客户信息
            intiWTCustomerInformation();
            $('#qy_WtXZ').off().on('click', function () {
                stopContinueClick("#qy_WtXZ", 300);
                openQyWtXzList();
            });

        },
        setType: function (type) {
            configMap.wttype = type;
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';

        }
    };

}();
