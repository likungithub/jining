var updatecgsqList = function () {
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
            var zj = $("#hczjhcbz", jqueryMap.$container).val();
            var dj = $("#hcdjhcbz", jqueryMap.$container).val();
            data.dj = dj;
            data.zj = zj;
            return data;
        }
    }
}();