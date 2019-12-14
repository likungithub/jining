var oneloginCon = function () {
    //'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        initUrl: '/customermanage/ptswsb/getTaxdeclarationByKhbm/',
        khdm:''
    };
    var initData=function (khdm) {
        $.ajax({
            type: 'GET',
            url: configMap.path+configMap.initUrl+khdm,
            contentType: 'application/json; charset=utf-8',
            async:false,
            dataType: 'JSON',
            success: function (data) {
                clearAllCookie();
                Cookies.set("fwdlmm",data.data.bsyfwmm,{expires: 7});
                Cookies.set("nsrdlmm",data.data.qydlmm,{expires: 7});
                Cookies.set("nsrsbh",data.data.qynsrsbh,{expires: 7});
                Cookies.set("sfzhm",data.data.bsyzjhm,{expires: 7});
                Cookies.set("zjlxdm",data.data.bsyzjlxDm,{expires: 7});
                clearAllCookie();
                setTimeout(function () {
                    window.location.href = "https://sst.qd-n-tax.gov.cn/dzswj/?khbm="+khdm;
                },3000);
            }
        });
    };
    function clearAllCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys) {
            for(var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    };

    function startApp() {
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent('myCustomEvent', true, false, "www.baidu.com");
        // fire the event
        document.dispatchEvent(evt);
    }
    return {
        // 初始化
        init: function (khdm) {
            /*!
             * JavaScript Cookie v2.1.2
             * https://github.com/js-cookie/js-cookie
             *
             * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
             * Released under the MIT license
             */
            ;(function (factory) {
                if (typeof define === 'function' && define.amd) {
                    define(factory);
                } else if (typeof exports === 'object') {
                    module.exports = factory();
                } else {
                    var OldCookies = window.Cookies;
                    var api = window.Cookies = factory();
                    api.noConflict = function () {
                        window.Cookies = OldCookies;
                        return api;
                    };
                }
            }(function () {
                function extend () {
                    var i = 0;
                    var result = {};
                    for (; i < arguments.length; i++) {
                        var attributes = arguments[ i ];
                        for (var key in attributes) {
                            result[key] = attributes[key];
                        }
                    }
                    return result;
                }

                function init (converter) {
                    function api (key, value, attributes) {
                        var result;
                        if (typeof document === 'undefined') {
                            return;
                        }

                        // Write

                        if (arguments.length > 1) {
                            attributes = extend({
                                path: '/'
                            }, api.defaults, attributes);

                            if (typeof attributes.expires === 'number') {
                                var expires = new Date();
                                expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                                attributes.expires = expires;
                            }

                            try {
                                result = JSON.stringify(value);
                                if (/^[\{\[]/.test(result)) {
                                    value = result;
                                }
                            } catch (e) {}

                            if (!converter.write) {
                                value = encodeURIComponent(String(value))
                                    .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                            } else {
                                value = converter.write(value, key);
                            }

                            key = encodeURIComponent(String(key));
                            key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                            key = key.replace(/[\(\)]/g, escape);

                            return (document.cookie = [
                                key, '=', value,
                                attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
                                attributes.path    && '; path=' + attributes.path,
                                attributes.domain  && '; domain=' + attributes.domain,
                                attributes.secure ? '; secure' : ''
                            ].join(''));
                        }

                        // Read

                        if (!key) {
                            result = {};
                        }

                        // To prevent the for loop in the first place assign an empty array
                        // in case there are no cookies at all. Also prevents odd result when
                        // calling "get()"
                        var cookies = document.cookie ? document.cookie.split('; ') : [];
                        var rdecode = /(%[0-9A-Z]{2})+/g;
                        var i = 0;

                        for (; i < cookies.length; i++) {
                            var parts = cookies[i].split('=');
                            var cookie = parts.slice(1).join('=');

                            if (cookie.charAt(0) === '"') {
                                cookie = cookie.slice(1, -1);
                            }

                            try {
                                var name = parts[0].replace(rdecode, decodeURIComponent);
                                cookie = converter.read ?
                                    converter.read(cookie, name) : converter(cookie, name) ||
                                    cookie.replace(rdecode, decodeURIComponent);

                                if (this.json) {
                                    try {
                                        cookie = JSON.parse(cookie);
                                    } catch (e) {}
                                }

                                if (key === name) {
                                    result = cookie;
                                    break;
                                }

                                if (!key) {
                                    result[name] = cookie;
                                }
                            } catch (e) {}
                        }

                        return result;
                    }

                    api.set = api;
                    api.get = function (key) {
                        return api(key);
                    };
                    api.getJSON = function () {
                        return api.apply({
                            json: true
                        }, [].slice.call(arguments));
                    };
                    api.defaults = {};

                    api.remove = function (key, attributes) {
                        api(key, '', extend(attributes, {
                            expires: -1
                        }));
                    };

                    api.withConverter = init;

                    return api;
                }

                return init(function () {});
            }));

            // if(navigator.userAgent.indexOf("Chrome") > -1){
            //     $(".loginBtn").attr("href","OpenIE://https://sst.qd-n-tax.gov.cn/dzswj/");
            // }
            configMap.khdm=khdm;
            $("#swsbswlx li .BSDefault").show();
            $("#swsbswlx li").on("click",function () {
                $("#swsbswlx li .legendTrue").hide();
                $(this).children(".legendTrue").show();
            })

            // $("#wsbst").find('.addDate').datepicker({
            //     clearBtn: true,
            //     format: 'yyyy-mm',
            //     autoclose: true,
            //     language: 'zh-CN',
            // });

            initData(khdm);


        },
        // 设置路径
        setPath: function (path) {
            configMap.path = '';
        }
    };
}();