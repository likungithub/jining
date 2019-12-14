var yprk_add = function () {

    // 全局属性参数
    var configMap = {
        path: '',
        id: '',
        uuid: '',
        szGrid: null,
        jcxmGrid: null,
    };

    // 全局Dom
    var jqueryMap = {
        $yprkJbxxDiv: null,
        $khflAddDialog: null,
        $commonproblemDialog: null
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$yprkJbxxDiv = $('#yprk_add' + uuid);
        jqueryMap.$yprkForm = $('#addTprk', jqueryMap.$yprkJbxxDiv);
    };

    //选择样品
    var choiceSample = function () {
        $("#btn_selectYp").off("click").on("click",function () {
            openModal("样品处理信息选择", "customermanage/ypgl/ypclsqAddtanchu.jsp");
        })
    }
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

    //获取 全部样品信息处理人
    var setALLSampleProcessorPeople = function () {
        $.get(configMap.path + '/ypclz/SampleProcessorPeople', function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<option value="' + data[i].name + '">' + data[i].name + '</option>').appendTo($('#syry', jqueryMap.$qywtJbxxDiv));
            }
        });
    }

    var yprk_bc = function (callback) {
        var ch = checkyprk();
        if (!ch) {
            return false;
        }
        
        var yprk_datas = "{" +
            //基本信息
            "\"ypid\":\"" + $('input[name="yprk_ypbm"]', jqueryMap.$yprkForm).val() + "\"," + //样品编码
            "\"crkly\":\"" + $('input[name="rkly"]', jqueryMap.$yprkForm).val() + "\"," + //入库原因
            "\"info\":\"" + $('input[name="info"]', jqueryMap.$yprkForm).val() + "\"," + //入库信息
            "\"zysl\":\"" + $('input[name="zysl"]', jqueryMap.$yprkForm).val() + "\"," + //正样数量
            "\"syry\":\"" + $('#syry', jqueryMap.$yprkForm).val() + "\"," + //送样人员
            "\"fysl\":\"" + $('input[name="fysl"]', jqueryMap.$yprkForm).val() + "\"," + //副样数量
            "\"bysl\":\"" + $('input[name="bysl"]', jqueryMap.$yprkForm).val() + "\"" + //备样数量
            "}"; //备注
        var jsondatas = JSON.parse( yprk_datas );
        console.log(jsondatas)
        $.ajax({
            url: '/customermanage/yprk/saveYprk',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data:JSON.stringify(jsondatas),
            success: function (result) {
                if (result.success) {
                    Messenger().post({
                        message:"保存成功",
                        type:"info"
                    });
                    callback(true);
                } else {
                    Messenger().post({
                        message: result.message,
                        type: 'danger'
                    });
                    callback(false);
                }
            },
            error: function (result) {
                Messenger().post({
                    message: '保存失败！',
                    type: 'danger'
                });
                callback(false);
            }
        });
    }

    var checkyprk= function () {
        var yprk_ypmc = $('input[name="yprk_ypmc"]', jqueryMap.$yprkForm).val(); //样品名称
        var syry = $('#syry', jqueryMap.$yprkForm).val();//送样人员

        if (yprk_ypmc == "undefined" || yprk_ypmc == null || yprk_ypmc == "") {
            App.alert({
                container: jqueryMap.$yprkJbxxDiv.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请选择样品！',
                icon: 'fa fa-warning'
            });
            return false;
        }
        if (syry == "undefined" || syry == null || syry == "") {
            App.alert({
                container: jqueryMap.$yprkJbxxDiv.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请选择送样人员！',
                icon: 'fa fa-warning'
            });
            return false;
        }
        return true;
    }
    return {
        // 初始化
        init: function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap(uuid);

            //选择样品
            choiceSample();
            //获取 全部样品信息处理人
            setALLSampleProcessorPeople();

            //保存
            $('#yprk_bc').off().on('click',function () {
                yprk_bc();
            });

        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;

        },
        // 保存选择的货品信息，参数为回掉函数
        yprk_bc: function (callback) {
            yprk_bc(callback);
        }
    };

}();
