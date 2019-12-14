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
    <title>577777777700����</title>
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
        var name = '��������ʽ�ķ�����';
        
        alert("��½�˺�"+account); 
        var websocket = null;
        //�жϵ�ǰ������Ƿ�֧��WebSocket
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
            alert('��ǰ����� Not support websocket')
        }

        //���ӷ�������Ļص�����
        /* websocket.onerror = function () {
         setMessageInnerHTML("WebSocket���ӷ�������");
         }; */

        //���ӳɹ������Ļص�����
          websocket.onopen = function () {
         //setMessageInnerHTML("WebSocket���ӳɹ�");
              alert("WebSocket");
         } 

        //���յ���Ϣ�Ļص�����
        websocket.onmessage = function (event) {
          alert(event.data);
            /*   setMessageInnerHTML(event.data); */
        }

        //���ӹرյĻص�����
         websocket.onclose = function () {
        // setMessageInnerHTML("WebSocket���ӹر�");
             alert("WebSocket���ӹر�");
         } 

        //�������ڹر��¼��������ڹر�ʱ������ȥ�ر�websocket���ӣ���ֹ���ӻ�û�Ͽ��͹رմ��ڣ�server�˻����쳣��
        window.onbeforeunload = function () {
            closeWebSocket();
        }

        //����Ϣ��ʾ����ҳ��
        /* function setMessageInnerHTML(innerHTML) {
         document.getElementById('message').innerHTML += innerHTML + '<br/>';
         } */

        //�ر�WebSocket����
        function closeWebSocket() {
            websocket.close();
        }


 
        //������Ϣ
        function send() {
         /*    var message = document.getElementById('text').value;
            //document.getElementById('message').innerHTML += ("�����ˣ�"+userno+'<br/>'+"---"+message) + '<br/>';
            // document.getElementById('message').style.color="red";
            //   var ToSendUserno="4567";//�����˱�ţ�4567
            message = message + "|" + account//��Ҫ���͵���Ϣ������ƴ�������Ա��ڷ����֪����ϢҪ����˭ */
            var s = {"date":"2018-03-28 10:44:31","fsrid":"KJ1000000059","dljgbm":"DL0000000019","self":"","text":"���͸�����","jsrid":"KH0000001582","isim":true}
             websocket.send(JSON.stringify(s));
        }

        </script>
 -->
 
 
  <script type="text/javascript"> 
  var account = 'lxp2017';
  var zydm = 'KJ1000000059';
  var name = '��������ʽ�ķ�����';
  var websocket;//websocketʵ��
  var lockReconnect = false;//�����ظ�����
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
    	    alert("webcocket������");
    	    step = 20;
          //�����������
          heartCheck.reset().start();
      };
      websocket.onmessage = function (event) {
          //�����ȡ����Ϣ�������������
          //�õ��κ���Ϣ��˵����ǰ������������
          heartCheck.reset().start();
      }
  }

  function reconnect(url) {
	   debugger;
      if(lockReconnect) return;
      lockReconnect = true;
      //û�����ϻ�һֱ�����������ӳٱ����������
      setTimeout(function () {
    	  if(step == 0){
              alert("ֹͣ�Զ�����");
              retuen;
          }else{
              step--;
                alert(step);
              }
          createWebSocket(url);
          lockReconnect = false;
      }, 3000);
  }

  
  //�������
  var heartCheck = {
      timeout: 60000,//60��
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
              //���﷢��һ������������յ��󣬷���һ��������Ϣ��
              //onmessage�õ����ص�������˵����������
              websocket.send("HeartBeat");
              self.serverTimeoutObj = setTimeout(function(){//�������һ��ʱ�仹û���ã�˵����������Ͽ���
            	  websocket.close();//���onclose��ִ��reconnect������ִ��ws.close()������.���ֱ��ִ��reconnect �ᴥ��onclose������������
                  alert(ws+"60  �� δ�յ���������Ӧ websocket�ѹر�,����������")
              }, self.timeout)
          }, this.timeout)
      }
  }
  debugger;
  createWebSocket(websocketUrl);

  </script>

<body>sddwerqwetrewterwyewrtwertewrterwt

<button type="button" onclick="send()">����!</button>
</body>
</html>