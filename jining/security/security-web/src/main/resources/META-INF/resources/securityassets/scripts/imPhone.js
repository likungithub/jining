
window.onload = function(){
    var obj = UrlSearch();
    var account = obj.dlzh;
    var lzdm =obj.lzdm;
    var jgbm = obj.jgbm;
    var fsrid = obj.fsrid;
    var logo1 = obj.logo
    var name = obj.name;
    var code = obj.code;
    var websocket = null;
    var clickImg = localStorage.getItem("logo");
    var logo = obj.userImg;
    var lockReconnect = false;//避免重复连接

    var step = 20;

    if(code == 0){
        var url = "customermanage/SystemMessageController/getAppLtxx";
        var dataObj = {
            jsrid: lzdm,
            dljgbm:jgbm,
            fsrid:  fsrid,
            logo:logo
        };
        var websocketUrl =   window.location.host + "/khwebsocket/" + lzdm + "/" + account + "/" + name
    }else{
        var url = "customermanage/SystemMessageController/getLtxx";
        var dataObj = {
            jsrid:  fsrid,
            dljgbm:jgbm,
            fsrid: lzdm
        };
        var websocketUrl =   window.location.host + "/dlwebsocket/" + lzdm + "/" + account + "/" + name
    }
    function createWebSocket(url) {
        try {
        	 //判断当前浏览器是否支持WebSocket
            if ('WebSocket' in window) {
                if('http:'== window.location.protocol){
                	websocket = new ReconnectingWebSocket("ws://"+websocketUrl);  
                }else{
                    websocket = new ReconnectingWebSocket("wss://" + websocketUrl);
                }
            }
            else {
                alert('当前浏览器 Not support websocket')
            }
            initEventHandle();
        } catch (e) {
            reconnect(url);
        }
    }


    function initEventHandle() {
  	  websocket.onclose = function () {
           reconnect(websocketUrl);
        };
        websocket.onerror = function () {
            reconnect(websocketUrl);
        };
        websocket.onopen = function () {
      	    step = 20;
            //心跳检测重置
            heartCheck.reset().start();
        };
        websocket.onmessage = function (event) {
            //如果获取到消息，心跳检测重置
            //拿到任何消息都说明当前连接是正常的
            heartCheck.reset().start();
            if("HeartBeat"==event.data){
            	return;
            }
            var data = JSON.parse(event.data);
            var admainMessage = '<p class="messageTime">' + data.date + '</p>' +
                '<div class="userLeft">' +
                '<img src="' + logo1 + '" alt="" />' +
                '<p class="message" ><span><em></em></span>' + data.text + '</p>' +
                '<div class="clear"></div></div>';
            $('.imPhoneMessage_main').append(admainMessage);
            $('.imPhoneMessage_main').scrollTop( 15000000000);


        }
    }

    function reconnect(url) {
        if(lockReconnect) return;
        lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        setTimeout(function () {
      	  if(step == 0){
                return;
            }else{
                step--;
                }
            createWebSocket(url);
            lockReconnect = false;
        }, 3000);
    }


    //心跳检测
    var heartCheck = {
        timeout: 60000,//60秒  
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function(){
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
        },
        start: function(){
            var self = this;
            this.timeoutObj = setTimeout(function(){
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                //onmessage拿到返回的心跳就说明连接正常
                websocket.send("HeartBeat");
                self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
              	  websocket.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                }, self.timeout)
            }, this.timeout)
        }
    }
    createWebSocket(websocketUrl);
///////////////////////////////////////////////////////////////////////////////////////////////////////////

    //接收到消息的回调方法
/*    websocket.onmessage = function (event) {

    }*/

/*
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        closeWebSocket();
    }


    //关闭WebSocket连接
    function closeWebSocket() {
        websocket.close();
    }
*/



    function UrlSearch() {
        var name,lzdm,jgbm,frid,logo,dlzh,code,userImg;
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?")
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

        var arr=str.split("&"); //各个参数放到数组里
        console.log(arr)
        var obj;
        for(var i=0;i < arr.length;i++){
            num=arr[i].indexOf("=");
            if(num>0){
                // name=arr[i].substring(0,num);
                lzdm=arr[0].substr(num+1);
                jgbm = arr[1].substr(num+1);
                frid = arr[2].substr(num+1);
                logo = arr[3].substr(num+1);
                dlzh = arr[4].substr(num+1);
                name = arr[5].substr(num+1);
                code = arr[6].substr(num+1);
                userImg = arr[7].substr(num+1);
                obj = {
                    lzdm:lzdm,
                    jgbm:jgbm,
					fsrid:frid,
					logo:logo,
                    dlzh:dlzh,
                    name:name,
                    code:code,
                    userImg:userImg
                }
                // this[name]=khbm1;
            }
        }
        return obj;
    }
	$(".send").on("click",function(){
		clickSend();
	})
    getLTXX(url,dataObj);
	function getLTXX(url,data) {
        $.ajax({
            type: "post",
            url: url,
            async: true,
            data: data,
            success: function (data) {

                $(data.data.ltxx).each(function () {
                    if (this.self !== '') {
                        var messageMain =
                            '<p class="messageTime">' + this.date + '</p>' +
                            '<div class="userLeft"><img src="' + logo1 + '" alt="" />' +
                            '<p class="message" ><span><em></em></span>' + this.text + '</p>' +
                            '<div class="clear"></div></div>';

                        $('.imPhoneMessage_main').append(messageMain)
                    }else{
                        var admainMessage = '<p class="messageTime">' + this.date + '</p>' +
                            '<div class="userRight">' +
                            '<img src="' + logo + '" alt="" />' +
                            '<p class="message" ><span><em></em></span>' + this.text + '</p>' +
                            '<div class="clear"></div></div>';
                        $('.imPhoneMessage_main').append(admainMessage);
					}
                });
                $('.imPhoneMessage_main').scrollTop( 15000000000);
            }
        })
    }

	function clickSend(){
		if (!$(".enterMain").val()) {
	        alert("消息不能为空！")

	    }else if(javaTrim($(".enterMain").val().replace(/\n/g,'')) == ""){
	        alert("不能发送空白消息！")
	    } else {
	        var message = $(".enterMain").val();
            var s = {"fsrid":lzdm,"dljgbm":jgbm,"self":"","text":message,"jsrid": fsrid,"isim":true}
            if(websocket.readyState!=1){
                alert("未连接。");
                return;
            }else{
            	websocket.send(JSON.stringify(s));
            }
            var admainMessage = '<div class="userRight">' +
            '<img src="' + logo + '" alt="" />' +
            '<p class="message" ><span><em></em></span>' + message + '</p>' +
            '<div class="clear"></div></div>';
            $('.imPhoneMessage_main').append(admainMessage);
            $(".enterMain").val("");
            $('.imPhoneMessage_main').scrollTop( 15000000000);
		    }

		};
		function javaTrim(str) {
		    for (var i=0; (str.charAt(i)==' ') && i<str.length; i++);
		    if (i == str.length) return ''; //whole string is space
		    var newstr = str.substr(i);
		    for (var i=newstr.length-1; newstr.charAt(i)==' ' && i>=0; i--);
		    newstr = newstr.substr(0,i+1);
		    return newstr;
		}


}
