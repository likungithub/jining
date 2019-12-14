var updateJcxm = function () {

    //'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        id: '',
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
        jqueryMap.$qywtJbxxDiv = $('#jcxm_jbxx' + uuid);
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


    var initJcxmData = function () {
        ;
        $.ajax({
            url: '/customermanage/jcxm/getjcxm?id=' + configMap.id,
            type: 'GET',
            success: function (result) {
                if (result.success) {
                    var data = result.data;
                    $('#saveQYWT', jqueryMap.$qywtForm).html("更新");
                    $('input[name="zwmc_bm"]', jqueryMap.$qywtForm).val(data.zwmc_bm);//委托单位名称
                    $('input[name="cpdlmc"]', jqueryMap.$qywtForm).val(data.cpdlmc);//联系电话
                    $('input[name="cpdldm"]', jqueryMap.$qywtForm).val(data.cpdldm); //所属街道
                    $('input[name="yl"]', jqueryMap.$qywtForm).val(data.yl);//邮政编码
                    $('input[name="cyl"]', jqueryMap.$qywtForm).val(data.cyl);//样品名称
                    $('input[name="xl"]', jqueryMap.$qywtForm).val(data.xl);//商标
                   // $('input[name="jclbdm"]', jqueryMap.$qywtForm).val(data.jclbdm);//规格型号
                    if(data.jclbdm=="001"){  //检测类别
                        $('#jianceleibiedaima', jqueryMap.$qywtForm).get(0).selectedIndex=0;
                    }else if (data.jclbdm=="002"){
                        $('#jianceleibiedaima', jqueryMap.$qywtForm).get(0).selectedIndex=1;
                    } else if (data.jclbdm=="003"){
                        $('#jianceleibiedaima', jqueryMap.$qywtForm).get(0).selectedIndex=2;
                    }
                    $('input[name="jcfa"]', jqueryMap.$qywtForm).val(data.jcfa);//样品等级
                    $('input[name="pdyj"]', jqueryMap.$qywtForm).val(data.pdyj);//生产单位
                    $('input[name="pdyjmc"]', jqueryMap.$qywtForm).val(data.pdyjmc);//委托单位名称
                    $('input[name="zm"]', jqueryMap.$qywtForm).val(data.zm);//联系电话
                    $('input[name="bl"]', jqueryMap.$qywtForm).val(data.bl); //所属街道
                    $('input[name="bjf"]', jqueryMap.$qywtForm).val(data.bjf);//邮政编码
                    $('input[name="pdnh"]', jqueryMap.$qywtForm).val(data.pdnh);//样品名称
                    $('input[name="xlzmrz"]', jqueryMap.$qywtForm).val(data.xlzmrz);//商标
                    $('input[name="jcyj"]', jqueryMap.$qywtForm).val(data.jcyj);//规格型号
                    $('input[name="jcyjmc"]', jqueryMap.$qywtForm).val(data.jcyjmc);//样品等级
                    $('input[name="jcx"]', jqueryMap.$qywtForm).val(data.jcx);//生产单位
                    $('input[name="xlz"]', jqueryMap.$qywtForm).val(data.xlz);//邮政编码
                    $('input[name="jldw"]', jqueryMap.$qywtForm).val(data.jldw);//样品名称
                    $('input[name="bzffjcxdw"]', jqueryMap.$qywtForm).val(data.bzffjcxdw);//商标
                    $('input[name="bzzxyxx"]', jqueryMap.$qywtForm).val(data.bzzxyxx);//标准最小允许限
                    $('input[name="bzzxyxxdw"]', jqueryMap.$qywtForm).val(data.bzzxyxxdw);//样品等级
                    $('input[name="bzzdyxx"]', jqueryMap.$qywtForm).val(data.bzzdyxx);//生产单位
                    $('input[name="bzzdyxxdw"]', jqueryMap.$qywtForm).val(data.bzzdyxxdw);//委托单位名称
                    $('input[name="wswnz"]', jqueryMap.$qywtForm).val(data.wswnz);//联系电话
                    $('input[name="wswmz"]', jqueryMap.$qywtForm).val(data.wswmz); //所属街道
                    $('input[name="wswcz"]', jqueryMap.$qywtForm).val(data.wswcz);//邮政编码
                    $('input[name="jg"]', jqueryMap.$qywtForm).val(data.jg);//样品名称
                    $('input[name="zbzl"]', jqueryMap.$qywtForm).val(data.zbzl);//商标
                    $('input[name="zbzldw"]', jqueryMap.$qywtForm).val(data.zbzldw);//规格型号
                    $('input[name="yyckjz"]', jqueryMap.$qywtForm).val(data.yyckjz);//样品等级
                    $('input[name="bz"]', jqueryMap.$qywtForm).val(data.bz);//生产单位
                    if(data.if_pd=="1"){
                        $('#shifoupanding', jqueryMap.$qywtForm).get(0).selectedIndex=1;
                    }else{
                        $('#shifoupanding', jqueryMap.$qywtForm).get(0).selectedIndex=0;
                    }

                    if(data.if_cma=="1"){
                        $('#shifouyouCMAzizhi', jqueryMap.$qywtForm).get(0).selectedIndex=1;
                    }else{
                        $('#shifouyouCMAzizhi', jqueryMap.$qywtForm).get(0).selectedIndex=0;
                    }
                    if(data.if_cmaf=="1"){
                        $('#shifouyouCMAFzizhi', jqueryMap.$qywtForm).get(0).selectedIndex=1;
                    }else {
                        $('#shifouyouCMAFzizhi', jqueryMap.$qywtForm).get(0).selectedIndex=0;
                    }
                    if(data.if_cnas=="1"){
                        $('#shifouyouCNASzizhi', jqueryMap.$qywtForm).get(0).selectedIndex=1;
                    }else {
                        $('#shifouyouCNASzizhi', jqueryMap.$qywtForm).get(0).selectedIndex=0;
                    }
                    if(data.if_catl=="1"){
                        $('#shifouyouCATLzizhi', jqueryMap.$qywtForm).get(0).selectedIndex=1;
                    }else{
                        $('#shifouyouCATLzizhi', jqueryMap.$qywtForm).get(0).selectedIndex=0;
                    }
                    if(data.if_xtpd=="1"){
                        $('#shifouxitongpanding', jqueryMap.$qywtForm).get(0).selectedIndex=1;
                    }else {
                        $('#shifouxitongpanding', jqueryMap.$qywtForm).get(0).selectedIndex=0;
                    }
                    if(data.if_bzff=="1"){
                        $('#shifoubiaozhunfangfa', jqueryMap.$qywtForm).get(0).selectedIndex=1;
                    }else {
                        $('#shifoubiaozhunfangfa', jqueryMap.$qywtForm).get(0).selectedIndex=0;
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

    var updateJcxm = function () {
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
        url = '/customermanage/jcxm/updateJcxm/' + configMap.id;
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
                    //关闭当前选项卡
                    /*          var id = 'qywt_info';
                              var el = $("#tab-page-nav-" + id);
                              var nextSelect = el.closest("li").prev('li:not(.dropdown)');
                              if (nextSelect.length === 0) {
                                  nextSelect = el.closest("li").next('li:not(.dropdown)')
                              }
                              if (nextSelect.length === 0) {
                                  nextSelect = el.closest("ul.close-tab-nav")
                                      .children('li:not(.dropdown)')
                                      .last();
                              }
                              //标签移除
                              el.remove();
                              //内容移除
                              $("#tab-page-content-" + id).remove();

                              $('li[role = "presentation"].active').removeClass('active');
                              $('div[role = "tabpanel"].active').removeClass('active');
                              if (nextSelect.length > 0) {
                                  $(nextSelect).find('a').tab('show');
                              }
                              ;*/
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

    return {
        // 初始化
        init: function (id, uuid, szsf, szcs) {
            configMap.uuid = uuid;
            configMap.id = id;
            setJqueryMap(uuid);
            tabMenu('jcxm_info');
            jqueryMap.$qywtJbxxDiv.find('.beginTime').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            initJcxmData();

            //保存
            $('#updateJcxm').off().on('click', function () {
                stopContinueClick("#updateJcxm", 300);
                updateJcxm();
            });

            //样品管理
            $('#sampleMa').off().on('click', function () {
                sampleMa();
            });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';

        }
    };

}();
