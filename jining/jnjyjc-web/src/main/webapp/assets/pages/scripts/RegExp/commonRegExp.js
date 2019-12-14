//检验是否为qq号码
function whetherOrNotQQ(v) {
    return /^[1-9][0-9]{4,}$/.test(v);
}
//检测是否Email邮箱
function whetherOrNotEmail(v) {
    // return /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/.test(v);
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(v);
}
//检测是否为座机电话号码
function whetherOrNotTel(v) {
    return /^((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5}))$/.test(v);
}
//检测是否为手机号码
function whetherOrNotMobil(v) {
    return /^1[3,4,5,6,7,8,9]\d{9}$/.test(v);
}
//检测是否为身份证号码
function whetherOrNotID(v) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(v);
}
//检测是否为纳税人识别号
function whetherOrNotNsrbh(v) {
    return /^((?![a-zA-Z]*$)[a-zA-Z0-9]{15,20})$|(^\d{15,20}$)/.test(v);
}
//校验输入金额标准
function whetherOrNotMoney(v) {
    return /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(v);
}
//校验组织结构代码
function whetherOrNotZZJGDM(v) {
    return /(^([0-9A-Z]){9}$)|(^([0-9A-Z]){8}$)/.test(v);
}
//校验是否为正整数
function whetherOrNotPositive(v) {
    return /^[0-9]*[1-9][0-9]*$/.test(v);
}
//将金额变成千分号展示形式
function moneySplitByComma(v) {
    return v.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
//防止连续点击
function stopContinueClick(id, num) {
    var n = num;
    var time;
    time = setInterval(function () {
        if (n > 0) {
            $(id).attr("disabled", "disabled");
            n--;
        }
        else {
            n = num;
            $(id).removeAttr("disabled");
            window.clearInterval(time);
        }
    }, 10);
}

/**
 金额，千位符格式化。
 **/
function splitK(num) {
    var decimal = String(num).split('.')[1] || ''; //小数部分
    var tempArr = [];
    var revNumArr = String(num).split('.')[0].split("").reverse(); //倒序
    for (i in revNumArr) {
        tempArr.push(revNumArr[i]);
        if ((i + 1) % 3 === 0 && i != revNumArr.length - 1) {
            tempArr.push(',');
        }
    }
    var zs = tempArr.reverse().join(''); //整数部分
    return decimal ? zs + '.' + decimal : zs;
}

//校验金额中的-.字符
function checkMoney(obj, event) {
    if (event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 8 || event.keyCode == 48 || event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51 || event.keyCode == 52 || event.keyCode == 53 || event.keyCode == 54 || event.keyCode == 55 || event.keyCode == 56 || event.keyCode == 57 || event.keyCode == 96 || event.keyCode == 97 || event.keyCode == 98 || event.keyCode == 99 || event.keyCode == 100 || event.keyCode == 101 || event.keyCode == 102 || event.keyCode == 103 || event.keyCode == 104 || event.keyCode == 105) {
    }
    else {
        //得到第一个字符是否为负号
        var t = obj.val().charAt(0);
        //先把非数字的都替换掉，除了数字和.
        obj.val(obj.val().replace(/[^\d\.]/g, ''));
        //必须保证第一个为数字而不是.
        obj.val(obj.val().replace(/^\./g, ''));
        //保证只有出现一个.而没有多个.
        //obj.val() = obj.val().replace(//.{2,}/g,".");
        //保证.只出现一次，而不能出现两次以上
        obj.val(obj.val().replace('.', '$#$').replace(/\./g, '').replace('$#$', '.'));
        //如果第一位是负号，则允许添加
        if (t == '-') {
            obj.val('-' + obj.val());
        }
    }
}

//控制小数点后2位
var editpoint = function (x) {
    var f_x = parseFloat(x);//转换成浮点型
    if (isNaN(f_x)) {
        return false;
    }
    var cf = Math.pow(10, 2);
    var f_x = Math.round(x * cf) / cf;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}


//禁止输入尖括号
function TextValidate(thisDom, fun) {
    var passPort = thisDom;
    //特殊字符正则表达式
    var txt = new RegExp("[ ,\\<,\\>]");
    var flag = "0";
    for (var i = 0; i < passPort.value.length; i++) {
        //alert(passPort.value.charAt(i));

        //两种方法获取到每一个输入的字符

        //character = passPort.value.substr(i,1); 或者下面的方法
        character = passPort.value.charAt(i);//得到每一个输入的字符
        if (txt.test(character)) {
            flag = "1";
            if (document.all) {
                window.event.returnValue = false;
            }
//         else
//         {
//        	 arguments.callee.caller.arguments[0].preventDefault();
//         }
        }
    }
    if (flag == "1") {
        fun("禁止输入为空或< > , .等特殊符号");
        return false;
    } else {
        return true;
    }
}
function TextValidate1(thisDom, fun) {
    var passPort = thisDom;
    //特殊字符正则表达式
    var txt = new RegExp("[\\<,\\>]");
    var flag = "0";
    for (var i = 0; i < passPort.value.length; i++) {
        //alert(passPort.value.charAt(i));

        //两种方法获取到每一个输入的字符

        //character = passPort.value.substr(i,1); 或者下面的方法
        character = passPort.value.charAt(i);//得到每一个输入的字符
        if (txt.test(character)) {
            flag = "1";
            if (document.all) {
                window.event.returnValue = false;
            }
//         else
//         {
//        	 arguments.callee.caller.arguments[0].preventDefault();
//         }
        }
    }
    if (flag == "1") {
        fun("禁止输入'<''>'");
        return false;
    } else {
        return true;
    }
}

//double加法运算
function FloatAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
};

//double减法运算
function FloatSub(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m - arg2 * m) / m;
}

var keyStr = "CDEA67Fjklmn18optu345NOvGHIJKLM2PQRSTUVBWXYZabdcefghiwxyz09+/qrs=";
//ABCDEFGHIJKLMNOPQRSTUVWXYZabdcefghijklmnopqrstuvwxyz0123456789+/=

function encode64(input) {
    input = escape(input);
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
            + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output;
}
function decode64(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n"
            + "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n"
            + "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return unescape(output);
}

//格式会时间的函数
var Time = function (t) {
    //返回 01-12 的月份值
    function getMonth(date) {
        var month = "";
        month = date.getMonth() + 1; //getMonth()得到的月份是0-11
        if (month < 10) {
            month = "0" + month;
        }
        return month;
    }

//返回01-30的日期
    function getDay(date) {
        var day = "";
        day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        return day;
    }

//返回小时
    function getHours(date) {
        var hours = "";
        hours = date.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        return hours;
    }

//返回分
    function getMinutes(date) {
        var minute = "";
        minute = date.getMinutes();
        if (minute < 10) {
            minute = "0" + minute;
        }
        return minute;
    }

//返回秒
    function getSeconds(date) {
        var second = "";
        second = date.getSeconds();
        if (second < 10) {
            second = "0" + second;
        }
        return second;
    }

    return {
        f: function (t) {
            var datetimeType = "";
            var date = new Date();
            date.setTime(t);
            datetimeType += date.getFullYear();   //年
            datetimeType += "-" + getMonth(date); //月
            datetimeType += "-" + getDay(date);   //日
            datetimeType += "&nbsp;&nbsp;" + getHours(date);   //时
            datetimeType += ":" + getMinutes(date);      //分
            datetimeType += ":" + getSeconds(date);      //分
            return datetimeType;
        }
    }
}();

// jstree

function jstreeFun(jstreeDom,data1) {
    var data1;
    var jstree = jstreeDom.jstree({
        'core': {
            "themes": {
                "responsive": false
            },
            "check_callback": true,
            'data': {
                'url': data1.dataPath + data1.dataUrl
            },
            "state": {
                "opened": true,  //展示第一个层级下面的node
                //该根节点不可点击
            }
        },
        "types": {
            "default": {
                "icon": true
            }

        },

        'plugins': ["types", "expand","search"],
        "expand": {
            level: 5
        }
    }).on("load_node.jstree",function(e,d){
        data1 = data1;
        jstreeDom.on("open_node.jstree", function (e, data) {
            getTreeNum();
        });

        jstreeDom.bind("select_node.jstree", function (e, data) {
            if(data.node.id=='workCustomer'){
                $.each(data.node.children,function(i,v){
                    jstreeDom.jstree('open_node',v);
                });
            }
            // $("#dispatchByPSL_tree #"+data.node.id).find('.jstree-themeicon').css({borderTop:'6px solid transparent',
            // borderLeft:' 6px solid #ccc',
            // borderBottom:' 6px solid transparent',
            // borderRight:' 6px solid transparent',
            //    top:'14px',
            //    left:'1px'
            // });

            data.instance.toggle_node(data.node);
            // clearTreeNum();
            getTreeNum();
        });
        getTreeNum();
    });

    var getTreeNum = function(){
        var jstreeNode = jstreeDom.children(".jstree-container-ul").children().children().find("ul").children()
        for (var i = 0; i < jstreeNode.length; i++) {
            var $temp = jstreeNode.eq(i).attr("userimg");
            // var $text = $("#orgAndUser_manage_tree li").eq(i).attr("usertext");

            if (typeof($temp) == "undefined" || typeof($temp) == "object") {
            } else {
                localStorage.setItem("step",i);
            }
        }
        $(".jstree-children li").each(function () {
            if($(this).attr("userImg")==0){
                $(this).find("a").eq(0).find("i").css("backgroundSize","100%").css("borderRadius","50%").css("width","22px").css("height","22px").css("marginTop","2px").css("marginLeft","1px")
            }

        })
    }


    //点击事件
    jstreeDom.on('select_node.jstree', function (e, data) {
        var selectedNodeId;
        if (data.node.parent === '#'||data.node.parent==='workCustomer') {
            selectedNodeId = null; //点击树父节点初始化变量
            $('#allCheck').attr("checked", false);
        } else {
            selectedNodeId = data.node; //点击树中的子节点再取员工ID
            $('#allCheck').attr("checked", false);
        }

        data1.dataTableDate = data.node;
        dispatchData.setCurrentSelectedNode(data.node)
        //点击员工查询该员工的评价信息
        data1.dataAjax.ajax.reload();
    });
    //jstree定时搜索功能
    //输入框输入定时自动搜索
    var to = false;
    data1.searchDom.keyup(function () {
        if (to) {
            clearTimeout(to);
        }
        to = setTimeout(function () {
            jstree.jstree(true).search(data1.searchDom.val());
            // $("#orgAndUser_manage_tree").jstree(true).refresh();
        }, 250);

    });
};





//更新首页消息提醒数量
function updateMessageNumber(){
	//页面顶部的消息提醒中的消息数量
	$.get('/customermanage/SystemMessageController/getAllMessageReminder', null, function(result) {
		if(result > 0) {
            $('#announcementInfoWarningTX').removeClass('circleDisplay');
            $('#announcementInfoWarningTX').html(result);
            $('.top-message-m').addClass('bellSwingMessage');
        } else {
            $('#announcementInfoWarningTX').css({display:'none'});
            $('.top-message-m').removeClass('bellSwingMessage');
        }
    });
}

//更新首页待审核合同数量
function upDateDSHNumber(){
	//更新首页待审合同数量
    var htdata = {
        'status': '000',
        'khxx': null,
        'starDate': null,
        'endDate': null
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: '/statisticalanalysis/contractaudit/contractaudit',
        dataType: 'JSON',
        type: 'POST',
        data: JSON.stringify(htdata),
        success: function (datas) {
            $('#dshhtxx').text(datas);
        },
        error: function () {
            $('#dshhtxx').text(0);
        }
    });
}

//还剩多少字,参数1 (文本域选择器) 参数2(显示字数的容器) 参数3最多显示多少字
function checkHowMany(obj,numObj,num){
    $(obj).on('keyup keydown change',execute);
    function execute(){
        var max = num;
        var value = $(obj).val();
        var coun = $(numObj);
        if (value.length > max) {
            $(obj).val(value.substring(0, max));
            coun.html(0);
        } else {
            coun.html(max - value.length);
        }
    }
}

//还剩多少字,参数1 (文本域选择器) 参数2(显示字数的容器) 参数3最多显示多少字
function surplusHowMany(obj,numObj,num){
    var max = num;
    var value = $(obj).val();
    var coun = $(numObj);
    if (value.length > max) {
        $(obj).val(value.substring(0, max));
        coun.html(0);
    } else {
        coun.html(max - value.length);
    }
}

function delnull(d){
    if(d==undefined){
        return '';
    }
    if(d=='null'){
        return '';
    }
    return d;
}