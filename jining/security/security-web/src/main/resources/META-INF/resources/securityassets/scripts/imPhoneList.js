window.onload = function(){
    var obj = UrlSearch();
    var dljgbm = obj.jgbm;
    var account = obj.dlzh;
    var logo = obj.logo;
    var name = obj.name;
    var code = obj.code;
    var lzdm =obj.lzdm;
    var lockReconnect = false;//避免重复连接
var websocketUrl;
    if(logo == ""){
        logo = "securityassets/img/userLogo1.png";
    }
    var websocket = null;    
    var step = 20;
    function createWebSocket(url) {
        try {
            if(code == 0){
                // var lzdm =obj.lzdm;
                var url1 = "customermanage/SystemMessageController/getAllAppKhList?khbm=" + lzdm;
                var url11 = "customermanage/SystemMessageController/getAllAppKhList?khbm=" + lzdm;
                var url2 = "customermanage/SystemMessageController/getAllAppKh?khbm=" + lzdm;
                var url3 = "customermanage/SystemMessageController/getAllAppKh?khbm=" + lzdm +'&gsmc=';

                //判断当前浏览器是否支持WebSocket
                if ('WebSocket' in window) {

                    if('http:'== window.location.protocol){
                    	websocketUrl = "ws://" + window.location.host + "/khwebsocket/" + lzdm + "/" + account + "/" + name;
                        websocket = new ReconnectingWebSocket(websocketUrl);
                    }else{
                    	websocketUrl = "wss://" + window.location.host + "/khwebsocket/" + lzdm + "/" + account + "/" + name;
                        websocket = new ReconnectingWebSocket(websocketUrl);
                    }
                }
                else {
                    alert('当前浏览器 Not support websocket')
                }
                searchAndTab(url11,url2,url3);
                appUserList(url1,0)
            }else{
                var url1 = "customermanage/SystemMessageController/getAllKhList?zydm=" + lzdm; 
                var url11 = "customermanage/SystemMessageController/getAllKhList?zydm=" + lzdm;
                var url2 = "customermanage/SystemMessageController/getAllKh?zydm=" + lzdm +"&dljgbm" + dljgbm;
                var url3 = "customermanage/SystemMessageController/getAllAppKh?khbm=" + lzdm +"&dljgbm" + dljgbm+'&gsmc=';
                // var websocket = null;
                //判断当前浏览器是否支持WebSocket
                if ('WebSocket' in window) {

                    if('http:'== window.location.protocol){
                    	websocketUrl = "ws://" + window.location.host + "/dlwebsocket/" + lzdm + "/" + account + "/" + name;
                        websocket = new ReconnectingWebSocket(websocketUrl);
                    }else{
                    	websocketUrl = "wss://" + window.location.host + "/dlwebsocket/" + lzdm + "/" + account + "/" + name;
                        websocket = new ReconnectingWebSocket(websocketUrl);
                    }
                }
                else {
                    alert('当前浏览器 Not support websocket')
                }
                searchAndTab(url11,url2,url3);
                appUserList(url1,0)
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
            var eventData = JSON.parse(event.data);
            //code为登陆标识 0为财云互联App端   1为代理APP端
            if(code == 1){
                //判断身份 如果是代理pc发送消息 代理移动端接受并插入消息但是不显示未读红点
                if(eventData.fsrid == lzdm){
                    var id = eventData.jsrid;
                }else{
                    //判断身份 如果是财云互联App端发送消息 代理移动端接受并插入消息显示未读红点
                    var id = eventData.fsrid;
                    $(".message"+id+"").show();

                }
                
            }else{
                //判断身份移动端登录 如果是代理移动端发送消息 财云互联App端接受并插入消息显示未读红点
                var id = eventData.fsrid;
                $(".message"+id+"").show();
            }
            var text;
            if (eventData.text.length >= 20) {
                text = eventData.text.substr(0, 19) + "...";
            } else {
                text = eventData.text
            }
            $("li[useid="+id+"]").find(".lastMessage").text(text);
            var date = eventData.date.slice(11,20);
            $("li[useid="+id+"]").find(".messageDate").text(date);
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
                    //alert(ws+"60  秒 未收到服务器回应 websocket已关闭,并诚信连接")
                }, self.timeout)
            }, this.timeout)
        }
    }
    createWebSocket(websocketUrl);
    
    

   /* //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        closeWebSocket();
    }


    //关闭WebSocket连接
    function closeWebSocket() {
        websocket.close();
    }
*/

    function searchAndTab(url11,url2,url3) {
        $(".messageSearch input").on("input",function () {
            var message = $(".messageSearch input").val();
            if(message == ""){
                if($(".tabStyle").parent().attr("data") == 0){
                    url1 = url11;
                    appUserList(url1,0)
                }else{
                    url1 = url2;
                    appUserList(url1,1)

                }

            }else{
                url1 = url3+message;
                appUserList(url1,1)
            }

        })



        $(".tabClick li").on("click",function(){
            if($(this).attr("data") == 0){
                url1 = url11;
                appUserList(url1,0)
            }else {
                url1 = url2;
                appUserList(url1,1)
            }
            $(".tabClick li a").removeClass("tabStyle");
            $(this).children("a").addClass("tabStyle");
        })
    }

	function appUserList(url1,num) {
        $.ajax({
            type: "post",
            url: url1,
            async: false,
            success: function (data) {
                $('.messageList').html("");
                if (data.data.length > 0) {
                    var fssj;
                    $(data.data).each(function () {
                        var useName;
                        if (this.name.length >= 10) {
                            useName = this.name.substr(0, 9) + "...";
                        } else {
                            useName = this.name
                        }

                        if(this.img == ""){
                            var img = "securityassets/img/userLogo1.png";
                        }else{
                            var img = this.img;
                        }
                        if(num == 0){
                            if (this.ydzt !== 0) {
                                var showHide = "messageShow";
                            } else {
                                var showHide = "";
                            }
                            fssj = this.fssj.slice(11,20)
                            var userList =  '<li useId = ' + this.id + '><img src="' + img + '" />'+
                                '<div class="userMain"> <div><p class="messageName"  title="' + this.name + '">' + useName + '</p> <p class="messageDate">'+fssj+'</p> <div class="clear"></div></div><p class="lastMessage"></p></div> <div class="clear"></div><div class="messageRed '+showHide+' message'+this.id+'"></div> </li>'
						}else {
                            var userList =  '<li useId = ' + this.id + '><img src="' + this.img + '" />'+
                                '<div class="userMain"> <p class="messageName"  title="' + this.name + '">' + useName + '</p></div> <div class="clear"></div><div class="messageRed '+showHide+' message'+this.id+'"></div> </li>'
						}

                        $('.messageList').append(userList);
                        $(".messageList li").on("click",function(){
                            var id = $(this).attr("useid");
                            var clickImg = $(this).children("img").attr("src");
                            localStorage.setItem("logo",logo);
                            $(".message"+id+"").removeClass("messageShow");
                            window.location.href = "/imPhone.jsp?lzdm=" + lzdm + '&jgbm=' + dljgbm + "&fsrd=" + id +"&logo="+clickImg +"&dlzh=" + account +"&name=" + name + "&code=" +code + "&yhtx=" + logo ;
                        })
                    })
                }else{
                    var userList = "<p><img style='width: 5rem;margin: .65rem;' src='securityassets/img/nomessageImg.png' alt=''></p><p style='text-align: center;margin: 0;padding: 0;font-size: .4rem;color: #666;'>暂无消息</p>";
                    $('.messageList').append(userList);
                }
            }
        })
    };
    function UrlSearch() {
        var lzdm,jgbm,dlzh,logo,name,code;
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?")
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

        var arr=str.split("&"); //各个参数放到数组里
        var obj;
        for(var i=0;i < arr.length;i++){
            num=arr[i].indexOf("=");
            if(num>0){
                // khbm=arr[i].substring(0,num);
                lzdm=arr[0].substr(num+1);
                jgbm = arr[1].substr(num+1);
                dlzh = arr[2].substr(num+1);
                logo = arr[3].substr(num+1);
                name = arr[4].substr(num+1);
                code = arr[5].substr(num+1)
                obj = {
                    lzdm:lzdm,
                    jgbm:jgbm,
                    dlzh:dlzh,
                    logo:logo,
                    name:name,
                    code:code
                }
                // this[name]=khbm1;
            }
        }
        return obj;
    }

}
