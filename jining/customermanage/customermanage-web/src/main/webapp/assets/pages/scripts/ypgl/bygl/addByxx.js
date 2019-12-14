var jcxtzsq = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        jcxmids: [],
        ckeds:[],
        ids: [],
        id: '',
        path: '',
        uuid: '',
        initGridypjcedit: null,
        xlz: null,
        m_bzwz :'',
        zbzs:'0',
        ypids: "",
        zbksid:'',
        wtids:'',
        ypmcs:''
    };
    // 全局Dom
    var jqueryMap = {
        $blockTarget: null,
        $container: null,
        $editForm: null,
        $Dialogts:null
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

    };



    var checkRate = function (nubmer) {
        var re = /^[0-9]+[0-9]*]*$/;    // /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/

        if (!re.test(nubmer)) {
            alert("请输入数字");
            return false;
        }
        return true;
    };


    var save = function (callback) { //检测值录入保存操作
        var tzsm = $("#tzsm"+configMap.uuid).val();
        var str  =   tzsm.replace(/\s+/g,"");
        if(str=="" || str.length==0)
        {
            Messenger().post({
                message: "请填写详细的检测项调整说明！",
                type: "warning"
            });
            return  false;
        }

        jqueryMap.$Dialogts = bootbox.dialog({
            title: '提示',
            message: '确定要提交检测项调整申请吗？',
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

                        $.ajax({
                            url: "customermanage/jcgl/ypjc/jcxtzsq",//
                            type: 'POST',
                            data: $('#jcxtzform'+configMap.uuid).serialize(),
                            async: false,
                            success: function (data) {
                                jqueryMap.$Dialogts.modal("hide");
                                if (data.success) {
                                    jcflag1 = true;
                                    Messenger().post({
                                        message: "检测项调整申请完成",
                                        type: "success"
                                    });
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    callback(true);
                                } else {
                                    jcflag1 = false;
                                    Messenger().post({
                                        message: "检测项调整申请失败!",
                                        type: "error"
                                    });
                                    App.unblockUI(jqueryMap.$blockTarget);
                                    callback(false);
                                }
                            },
                            error: function () {
                                jcflag1 = false;
                                App.unblockUI(jqueryMap.$blockTarget);
                            }
                        });
                    }
                },
                cancel: {
                    label: '<i class="fa fa-ban"></i> 取&nbsp;消 ',
                    className: 'btn btn-default borderRadius4'
                }
            }
        });
        return false;
    };

    return {
        // 初始化
        init: function (id, uuid) {
            configMap.id = id;
            configMap.uuid = uuid;
            setJqueryMap();

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
        },
        setData:function(ypids,wtids,ypmcs){
            configMap.ypids =ypids;
            configMap.wtids =wtids;
            configMap.ypmcs =ypmcs;
        }
    };
}();
