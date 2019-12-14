var rwfp_ypjc = function () {
    // 全局属性参数
    var configMap = {
        path: '',
        uuid:''
    };
    // 全局Dom
    var jqueryMap = {
        $editForm: null
    };
    var setJqueryMap = function (uuid) {
        jqueryMap.$editForm = $('#'+uuid+'editForm');
    };
    return {
        // 初始化
        init: function (uuid) {
            configMap.uuid=uuid;
            setJqueryMap(uuid);
            $("#rwfp_ypjc",jqueryMap.$editForm).empty();
            $.ajax({
                url:"/customermanage/jcgl/rydm",
                type: 'POST',
                async:false,
                success: function (data) {
                    $("#rwfp_fhry",jqueryMap.$editForm).empty();
                    // $("#rwfp_fhry",jqueryMap.$editForm).append($("<option value=''>下拉选择人员</option>"));
                    for (var i = 0; i < data.length; i++) {
                        var $val = $("<option value="+ data[i].zydm+">" + data[i].name + "</option>");
                        $("#rwfp_ypjc",jqueryMap.$editForm).append($val);
                        // $("#rwfp_fhry",jqueryMap.$editForm).append($val);
                    }
                }
            });
            $('#rwfp_ypjc',jqueryMap.$editForm).multipleSelect({
                width: '100%'
            });

            $.post("/customermanage/jcgl/rydm?date=" + new Date().getTime(), {
            }, function (data) {
                $("#rwfp_fhry",jqueryMap.$editForm).empty();
                $("#rwfp_fhry",jqueryMap.$editForm).append($("<option value=''>下拉选择人员</option>"))
                for (var i = 0; i < data.length; i++) {
                    var $val = $("<option value=" + data[i].zydm + ">" + data[i].name + "</option>");
                    $("#rwfp_fhry",jqueryMap.$editForm).append($val);
                }
            }, "json");
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        //传递模态框的人员
        getData: function (callback) {
          var zxry=$("#rwfp_ypjc",jqueryMap.$editForm).val();
          return zxry;
        },
        getFHRY:function (callback) {
            var fhry=$("#rwfp_fhry",jqueryMap.$editForm).val();
            return fhry;
        }
    };
}();
