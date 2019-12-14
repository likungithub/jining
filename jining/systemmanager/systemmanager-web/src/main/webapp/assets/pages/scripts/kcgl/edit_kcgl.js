var edit_kcglList = function () {
    var configMap = {
        path: "",
        queryOneUrl: "/kcgl/findById",
    };
    // 全局Dom
    var jqueryMap = {
        $container: null,
    };
    //给dom赋值
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#' + uuid + '-manager-container');
    };
    return {
        init: function (path, uuid) {
            configMap.path = path;
            setJqueryMap(uuid);
        },
        setId: function (id) {
            /**陈
             * 查询单个数据
             */
            $.post( configMap.path+configMap.queryOneUrl,{id: id},function (data) {
                $("#hcmc2", jqueryMap.$container).val(data[0].hcmc);
                $("#gg2", jqueryMap.$container).val(data[0].gg);
                $("#jb2", jqueryMap.$container).val(data[0].jb);
                $("#sl2", jqueryMap.$container).val(data[0].sl);
                $("#sccj2", jqueryMap.$container).val(data[0].sccj);
                $("#cfwz2", jqueryMap.$container).val(data[0].cfwz);
                $("#dj2", jqueryMap.$container).val(data[0].dj);
                $("#zj2", jqueryMap.$container).val(data[0].zj);
                $("#bz2", jqueryMap.$container).val(data[0].bz);
                var hclx = data[0].hclx;
                if (hclx == "2") {
                    $('#hclx2', jqueryMap.$container).get(0).selectedIndex = 1;
                } else if (hclx == "3") {
                    $('#hclx2', jqueryMap.$container).get(0).selectedIndex = 2;
                } else if (hclx == "4") {
                    $('#hclx2', jqueryMap.$container).get(0).selectedIndex = 3;
                } else {
                    $('#hclx2', jqueryMap.$container).get(0).selectedIndex = 0;
                }
            },"json");
        },
        getData:function (id) {
            var data = {};
            var hcmc = $("#hcmc2", jqueryMap.$container).val();
            var gg = $("#gg2", jqueryMap.$container).val();
            var jb = $("#jb2", jqueryMap.$container).val();
            var sl = $("#sl2", jqueryMap.$container).val();
            var sccj = $("#sccj2", jqueryMap.$container).val();
            var cfwz = $("#cfwz2", jqueryMap.$container).val();
            var dj = $("#dj2", jqueryMap.$container).val();
            var zj = $("#zj2", jqueryMap.$container).val();
            var bz = $("#bz2", jqueryMap.$container).val();
            var hclx = $("#hclx2", jqueryMap.$container).val();
            data.id=id;
            data.hcmc = hcmc;
            data.gg = gg;
            data.jb = jb;
            data.sl = sl;
            data.sccj = sccj;
            data.cfwz = cfwz;
            data.dj = dj;
            data.zj = zj;
            data.bz = bz;
            data.hclx = hclx;
            return data;
        }
    }
}();