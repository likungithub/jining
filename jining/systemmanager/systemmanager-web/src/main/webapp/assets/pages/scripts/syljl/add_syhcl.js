var add_syhcl = function () {
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
            //日期插件
            laydate.render({
                elem: '#kqsjsyljl'  //指定元素
            });
        },
        getData:function () {
            var data = {};
            var hcmc = $("#hcmcsyljl", jqueryMap.$container).val();
            var kqr = $("#kqrsyljl", jqueryMap.$container).val();
            var kqsj = $("#kqsjsyljl", jqueryMap.$container).val();
            var syljl = $("#syljlsyljl", jqueryMap.$container).val();
            var bzq = $("#bzq", jqueryMap.$container).val();
            var cfwz = $("#cfwz", jqueryMap.$container).val();

            data.hcmc = hcmc;
            data.kqr = kqr;
            data.kqsj = kqsj;
            data.syljl = syljl;
            data.bzq = bzq;
            data.cfwz = cfwz;

            return data;
        }
    }
}();