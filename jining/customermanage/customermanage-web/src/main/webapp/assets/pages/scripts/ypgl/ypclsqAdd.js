var ypclsq_add = function () {

    // 全局属性参数
    var configMap = {
        path: '',
        id: '',
        uuid: '',
        szGrid: null,
        jcxmGrid: null,
        xgids:'',
        clry:'',
    };

    // 全局Dom
    var jqueryMap = {
        $qywtJbxxDiv: null,
        $khflAddDialog: null,
        $commonproblemDialog: null,
    };

    var setJqueryMap = function (uuid) {
        jqueryMap.$qywtJbxxDiv = $('#ypclsq_add' + uuid);
        jqueryMap.$qywtForm = $('#addypclsq', jqueryMap.$qywtJbxxDiv);
    };

    //选择样品
    var choiceSample = function () {
        $("#btn_ypclsqQuery").off("click").on("click",function () {
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
                if (configMap.clry == data[i].id) {
                    $('<option selected value="' + data[i].id + '">' + data[i].name + '</option>').appendTo($('#chuliren', jqueryMap.$qywtJbxxDiv));
                } else {
                    $('<option value="' + data[i].id + '">' + data[i].name + '</option>').appendTo($('#chuliren', jqueryMap.$qywtJbxxDiv));
                }

            }
        });
    }
    //新增
    var ypcl_add = function (callback) {
        var check = checkData();
        if (!check) {
            return false;
        }
        var datas = "{" +
            //基本信息
            "\"ypid\":\"" + $('input[name="ypid"]', jqueryMap.$qywtForm).val() + "\"," + //样品ID
            "\"wtid\":\"" + $('input[name="wtid"]', jqueryMap.$qywtForm).val() + "\"," + //委托id
            "\"zl\":\"" + $('input[name="zl"]', jqueryMap.$qywtForm).val() + "\"," + //重量，样品表采用字段ybjs(样本基数)
            "\"clyy\":\"" + $('input[name="clyy"]', jqueryMap.$qywtForm).val() + "\"," + //处理原因
            "\"clfs\":\"" + $('input[name="clfs"]', jqueryMap.$qywtForm).val() + "\"," + //处理方式
            "\"clry\":\"" + $('#chuliren', jqueryMap.$qywtForm).val() + "\"," + //处理人员
            "\"bz\":\"" + $('input[name="bz"]', jqueryMap.$qywtForm).val() + "\"" + //备注
            "}"; //备注
        var jsondata = JSON.parse(datas);

        $.ajax({
            url: '/customermanage/ypclz/saveYpclxx',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(jsondata),
            success: function (result) {
                if (result.success) {
                    Messenger().post({
                        message: "保存成功",
                        type: "info"
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
                $('#saveKhxx').html("保存");
                Messenger().post({
                    message: '保存失败！',
                    type: 'danger'
                });
                callback(false);
            }
        });
    }

    var checkData= function () {
        var ypmc = $('input[name="ypmc"]', jqueryMap.$qywtForm).val(); //样品名称
        var clry = $('#chuliren', jqueryMap.$qywtForm).val();//处理人

        /*if (ypmc == "undefined" || ypmc == null || ypmc == "") {
            Messenger().post({
                message: "请选择样品名称！",
                type: 'warning'
            });
            return false;
        }*/
        if (ypmc == "undefined" || ypmc == null || ypmc == "") {
            App.alert({
                container: jqueryMap.$qywtJbxxDiv.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请选择样品！',
                icon: 'fa fa-warning'
            });
            return false;
        }
        if (clry == "undefined" || clry == null || clry == "") {
            App.alert({
                container: jqueryMap.$yprkJbxxDiv.closest(".modal-body"),
                place: 'prepend',
                type: 'danger',
                message: '请选择样品处理人员！',
                icon: 'fa fa-warning'
            });
            return false;
        }
        /*if (clry == "undefined" || clry == null || clry == "") {
            Messenger().post({
                message: "请选择样品处理人员！",
                type: 'warning'
            });
            return false;
        }*/
        return true;
    }
        return {
        // 初始化
        init: function (uuid,xgids) {
            configMap.uuid = uuid;
            configMap.xgids = xgids;
            setJqueryMap(uuid);

            //选择样品
            choiceSample();
            //获取 全部样品信息处理人
            setALLSampleProcessorPeople();
        },
            // 设置路径
            setPath: function (path) {
                configMap.path = path;

            },
            // 保存，参数为回掉函数
            ypcl_add: function (callback) {
                ypcl_add(callback);
            },
    };

}();
