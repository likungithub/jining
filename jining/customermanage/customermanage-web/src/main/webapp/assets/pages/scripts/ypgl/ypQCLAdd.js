var ypqcladd = function () {

    // 全局属性参数
    var configMap = {
        path: '',
        uuid: '',
    };

    var setJqueryMap = function () {
        jqueryMap.$container = $('#ypqcl_add'+configMap.uuid);
        jqueryMap.$yprkForm = $('#ypqcl_add_from', jqueryMap.$yprkJbxxDiv);
    };

    // 全局Dom
    var jqueryMap = {
        $container: null,
        $yprkJbxxDiv: null,
    };

    //选择样品
    var choiceYpqclSample = function () {
        $("#btn_ypqclAddQuery").off("click").on("click",function () {
            openModal("样品前处理选择", "customermanage/ypgl/ypQCLQuery.jsp");
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

    var ypqcl_xz = function (callback) {
        
        var ch = checkyprk();
        if (!ch) {
            return false;
        }
        var ypqcl_datas = "{" +
            //基本信息
            "\"ypid\":\"" + $('input[name="ypid"]', jqueryMap.$yprkForm).val() + "\"," + //样品id
            "\"ypmc\":\"" + $('input[name="ypmc"]', jqueryMap.$yprkForm).val() + "\"," + //样品名称
            "\"ypbm\":\"" + $('input[name="ypbm"]', jqueryMap.$yprkForm).val() + "\"," + //样品编号
            "\"wtid\":\"" + $('input[name="wtid"]', jqueryMap.$yprkForm).val() + "\"," + //委托单号
            "\"zbff\":\"" + $('input[name="zbff"]', jqueryMap.$yprkForm).val() + "\"," + //制备方法
            "\"zl\":\"" + $('input[name="zl"]', jqueryMap.$yprkForm).val() + "\"," + //质量
            "\"sl\":\"" + $('input[name="ypsl"]', jqueryMap.$yprkForm).val() + "\"," + //数量
            "\"bz\":\"" + $('input[name="bz"]', jqueryMap.$yprkForm).val() + "\"" + //备注
            "}";
        var jsondatas = JSON.parse( ypqcl_datas );
        console.log(jsondatas)
        $.ajax({
            url: '/customermanage/ypqcl/addYPqcllingqu',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data:JSON.stringify(jsondatas),
            success: function (result) {
                if (result.success) {
                    Messenger().post({
                        message:"领取成功",
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
                    message: '领取失败！',
                    type: 'danger'
                });
                callback(false);
            }
        });
    }
    var checkyprk= function () {
        var ypqcl_ypmc = $('input[name="ypmc"]', jqueryMap.$yprkForm).val(); //样品名称

        if (ypqcl_ypmc == "undefined" || ypqcl_ypmc == null || ypqcl_ypmc == "") {
                Messenger().post({
                    message: "请选择样品名称！",
                    type: 'warning'
                });
                return false;
        }
        return true;
    }
    return {
        // 初始化
        init: function (uuid) {
            configMap.uuid = uuid;
            setJqueryMap();
            //样品选择
            choiceYpqclSample();


        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;

        },
        // 保存选择的货品信息，参数为回掉函数
        ypqcl_xz: function (callback) {
            ypqcl_xz(callback);
        }
    };

}();
