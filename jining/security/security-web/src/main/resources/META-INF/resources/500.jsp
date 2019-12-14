<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="zh">
<!--<![endif]-->
<head>
    <meta charset="gbk" />
    <title>577777777700错误</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/securityassets/img/favicon.ico" type="image/x-icon" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />

    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/icheck/skins/all.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/css/components.css" rel="stylesheet" id="style_components" type="text/css" />
    <link href="<%=request.getContextPath()%>/assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/font/iconfont.css" />
    <style>
        #fault500-m{
            text-align: center;
            margin: 150px auto;
        }
    </style>
</head>

<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="securityassets/scripts/reconnecting-websocket.js" type="text/javascript"></script>
<!-- <script type="text/javascript"> 
  var account = 'lxp2017';
        var zydm = 'KJ1000000059';
        var name = '的生产方式的范德萨';
        
        alert("登陆账号"+account); 
        var websocket = null;
        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
            alert(window.location.host);
            if('http:'== window.location.protocol){
                websocket = new ReconnectingWebSocket("ws://" + window.location.host + "/dlwebsocket/" + zydm + "/" + account + "/" + name);
                websocket.debug  = true
                websocket.timeoutInterval = 300;
                 }else{
                websocket = new ReconnectingWebSocket("wss://" + window.location.host + "/dlwebsocket/" + zydm + "/" + account + "/" + name);

                }
              
             
        }
        else {
            alert('当前浏览器 Not support websocket')
        }

        //连接发生错误的回调方法
        /* websocket.onerror = function () {
         setMessageInnerHTML("WebSocket连接发生错误");
         }; */

        //连接成功建立的回调方法
          websocket.onopen = function () {
         //setMessageInnerHTML("WebSocket连接成功");
              alert("WebSocket");
         } 

        //接收到消息的回调方法
        websocket.onmessage = function (event) {
          alert(event.data);
            /*   setMessageInnerHTML(event.data); */
        }

        //连接关闭的回调方法
         websocket.onclose = function () {
        // setMessageInnerHTML("WebSocket连接关闭");
             alert("WebSocket连接关闭");
         } 

        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            closeWebSocket();
        }

        //将消息显示在网页上
        /* function setMessageInnerHTML(innerHTML) {
         document.getElementById('message').innerHTML += innerHTML + '<br/>';
         } */

        //关闭WebSocket连接
        function closeWebSocket() {
            websocket.close();
        }


 
        //发送消息
        function send() {
         /*    var message = document.getElementById('text').value;
            //document.getElementById('message').innerHTML += ("发送人："+userno+'<br/>'+"---"+message) + '<br/>';
            // document.getElementById('message').style.color="red";
            //   var ToSendUserno="4567";//接收人编号：4567
            message = message + "|" + account//将要发送的信息和内容拼起来，以便于服务端知道消息要发给谁 */
            var s = {"date":"2018-03-28 10:44:31","fsrid":"KJ1000000059","dljgbm":"DL0000000019","self":"","text":"发送给代理","jsrid":"KH0000001582","isim":true}
             websocket.send(JSON.stringify(s));
        }

        </script>
 -->
 
 
  <script type="text/javascript"> 
  var account = 'lxp2017';
  var zydm = 'KJ1000000059';
  var name = '的生产方式的范德萨';
  var websocket;//websocket实例
  var lockReconnect = false;//避免重复连接
  var websocketUrl = "ws://" + window.location.host + "/dlwebsocket/" + zydm + "/" + account + "/" + name;
  var step = 20;
  function createWebSocket(url) {
      try {
    	  websocket = new ReconnectingWebSocket(url);
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
    	    alert("webcocket已连接");
    	    step = 20;
          //心跳检测重置
          heartCheck.reset().start();
      };
      websocket.onmessage = function (event) {
          //如果获取到消息，心跳检测重置
          //拿到任何消息都说明当前连接是正常的
          heartCheck.reset().start();
      }
  }

  function reconnect(url) {
	   debugger;
      if(lockReconnect) return;
      lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      setTimeout(function () {
    	  if(step == 0){
              alert("停止自动连接");
              retuen;
          }else{
              step--;
                alert(step);
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
          debugger;
          this.timeoutObj = setTimeout(function(){
              //这里发送一个心跳，后端收到后，返回一个心跳消息，
              //onmessage拿到返回的心跳就说明连接正常
              websocket.send("HeartBeat");
              self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
            	  websocket.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                  alert(ws+"60  秒 未收到服务器回应 websocket已关闭,并诚信连接")
              }, self.timeout)
          }, this.timeout)
      }
  }
  debugger;
  createWebSocket(websocketUrl);

  </script>

<body>sddwerqwetrewterwyewrtwertewrterwt

<button type="button" onclick="send()">点我!</button>
</body>
</html>