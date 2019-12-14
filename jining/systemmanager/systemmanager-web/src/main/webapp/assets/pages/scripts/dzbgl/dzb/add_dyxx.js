var add_dyxxList = function () {
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
            var name = $("#dzbgl1", jqueryMap.$container).val();
            var sex = $("#dzbgl2", jqueryMap.$container).val();
            var csrq = $("#dzbgl3", jqueryMap.$container).val();
            var mz = $("#dzbgl4", jqueryMap.$container).val();
            var gzsj = $("#dzbgl5", jqueryMap.$container).val();
            var rdsj = $("#dzbgl6", jqueryMap.$container).val();
            var dnzw = $("#dzbgl7", jqueryMap.$container).val();
            var dnzw1 = $("#dzbgl8", jqueryMap.$container).val();
            var jg = $("#dzbgl9", jqueryMap.$container).val();
            var whcd = $("#dzbgladd10", jqueryMap.$container).val();
            var bzxx = $("#dzbgladd11", jqueryMap.$container).val();
            data.name = name;
            data.sex = sex;
            data.csrq = csrq;
            data.mz = mz;
            data.gzsj = gzsj;
            data.rdsj = rdsj;
            data.dnzw = dnzw;
            data.dnzw1 = dnzw1;
            data.jg = jg;
            data.whcd = whcd;
            data.bzxx = bzxx;
            return data;
        }
    }
}();