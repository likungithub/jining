var rwfp_ypzb = function () {
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
            $("#rwfp_ypzb",jqueryMap.$editForm).empty();
            $.ajax({
                url:"/customermanage/jcgl/rydm",
                type: 'POST',
                async:false,
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var $val = $("<option value="+ data[i].zydm+">" + data[i].name + "</option>");
                        $("#rwfp_ypzb",jqueryMap.$editForm).append($val);
                    }
                }
            });
            $('#rwfp_ypzb',jqueryMap.$editForm).multipleSelect({
                width: '100%'
            });
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        //传递模态框的人员
        getData: function (callback) {
          var zxry=$("#rwfp_ypzb",jqueryMap.$editForm).val();
          return zxry;
        }
    };
}();
