var bgbz_tjfp = function () {
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

            $("#bgbz_bzr",jqueryMap.$editForm).empty();
            $.ajax({
                url:"/customermanage/bggl/bgczrydm?mrfl_bz=bgbz_bzr",
                type: 'POST',
                async:false,
                success: function (data) {
                    console.log("bgbztj==BZR==>"+data);
                    $("#bgbz_spr",jqueryMap.$editForm).empty();
                    for (var i = 0; i < data.length; i++) {
                        var $val = $("<option value="+ data[i].zydm+">" + data[i].name + "</option>");
                        $("#bgbz_bzr",jqueryMap.$editForm).append($val);
                    }
                }
            });

            $("#bgbz_shr",jqueryMap.$editForm).empty();
            $.ajax({
                url:"/customermanage/bggl/bgczrydm?mrfl_bz=bgbz_shr",
                type: 'POST',
                async:false,
                success: function (data) {
                    console.log("bgbztj==SHR==>"+data);
                    $("#bgbz_spr",jqueryMap.$editForm).empty();
                    for (var i = 0; i < data.length; i++) {
                        var $val = $("<option value="+ data[i].zydm+">" + data[i].name + "</option>");
                        $("#bgbz_shr",jqueryMap.$editForm).append($val);
                    }
                }
            });

            $.post("/customermanage/bggl/bgczrydm?mrfl_bz=bgbz_pzr&date=" + new Date().getTime(), {
            }, function (data) {
                console.log("bgbztj==SPR==>"+data);
                 $("#bgbz_spr",jqueryMap.$editForm).empty();
                // $("#bgbz_spr",jqueryMap.$editForm).append($("<option value=''>下拉选择人员</option>"))
                for (var i = 0; i < data.length; i++) {
                    var $val = $("<option value=" + data[i].zydm + ">" + data[i].name + "</option>");
                    $("#bgbz_spr",jqueryMap.$editForm).append($val);
                }
            }, "json");

           /* $.post("/customermanage/bggl/bgczrydm?mrfl_bz=bgbz_bzr&date=" + new Date().getTime(), {
            }, function (data) {
                console.log("bgbztj==SPR==>"+data);
                $("#bgbz_bzr",jqueryMap.$editForm).empty();
                // $("#bgbz_spr",jqueryMap.$editForm).append($("<option value=''>下拉选择人员</option>"))
                for (var i = 0; i < data.length; i++) {
                    var $val = $("<option value=" + data[i].zydm + ">" + data[i].name + "</option>");
                    $("#bgbz_bzr",jqueryMap.$editForm).append($val);
                }
            }, "json");*/
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        //传递模态框的 编制人员
        getBzr: function (callback) {
            var bzry=$("#bgbz_bzr",jqueryMap.$editForm).val();
            return bzry;
        },
        //传递模态框的 审核人员
        getShr: function (callback) {
          var shry=$("#bgbz_shr",jqueryMap.$editForm).val();
          return shry;
        },
        getSpry:function (callback) {
             var spry=$("#bgbz_spr",jqueryMap.$editForm).val();
             return spry;
         }
    };
}();
