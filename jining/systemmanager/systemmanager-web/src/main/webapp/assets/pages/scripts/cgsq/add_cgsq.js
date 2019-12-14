var add_cgsqList = function () {
    // 全局Dom
    var jqueryMap = {
        $container: null,
    };
    //给dom赋值
    var setJqueryMap = function (uuid) {
        jqueryMap.$container = $('#' + uuid + '-manager-container');
    };
    return {
        inint: function (uuid) {
            setJqueryMap(uuid);
        },
        getData:function () {
            var data = {};
            var hcmc = $("#hcmc1", jqueryMap.$container).val();
            var gg = $("#gg1", jqueryMap.$container).val();
            var jb = $("#jb1", jqueryMap.$container).val();
            var sl = $("#sl1", jqueryMap.$container).val();
            var sccj = $("#sccj1", jqueryMap.$container).val();
            var cgmd = $("#cgmd1", jqueryMap.$container).val();
            var dj = $("#dj1", jqueryMap.$container).val();
            var zj = $("#zj1", jqueryMap.$container).val();
            var bz = $("#bz1", jqueryMap.$container).val();
            var hclx = $("#hclx1", jqueryMap.$container).val();
            data.hcmc = hcmc;
            data.gg = gg;
            data.jb = jb;
            data.sl = sl;
            data.sccj = sccj;
            data.cgmd = cgmd;
            data.dj = dj;
            data.zj = zj;
            data.bz = bz;
            data.hclx = hclx;
            return data;
        }
    }
}();