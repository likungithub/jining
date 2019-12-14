/**
 * JavaScript埋点，用于处理用户log信息
 */
var setlog = function () {
    $.getScript('https://pv.sohu.com/cityjson?ie=utf-8', function () {
        var cityName = returnCitySN.cname;
        var params = {};
        //Document对象数据
        if (document) {
            //服务器域名
            params.domain = document.domain || '';
            //上级页面路径
            params.referrer = document.referrer || '';
        }
        //navigator对象数据
        if (navigator) {
            //浏览器语言
            params.lang = navigator.language || '';
        }
        //浏览器分辨率高
        params.windowScreen = window.screen.height + "*" + window.screen.width;
        //浏览器版本
        params.userAgent = navigator.userAgent || '';
        //解析_maq配置
        params.cityName = cityName;
        //获取访问路径
        params.realURL = setURL;
        //获取访问的模块
        params.realTitle = setTitle;
        //拼接参数串
        var args = '';
        for (var i in params) {
            if (args != '') {
                args += '&';
            }
            args += i + '=' + encodeURIComponent(params[i]);
        }
        //通过Image对象请求后端脚本
        var img = new Image(1, 1);
        img.src = '/log/Log/1.gif?' + args;
    });
}();
