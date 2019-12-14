<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%
String param = request.getParameter("param");
%>

<div id="paymanager-finished">
    <div class="ui-layout-center">
        <div class="ui-layout-content">
            <div class="portlet">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase">支付出错！</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/jquery.base64.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/RegExp/commonRegExp.js" type="text/javascript"></script>
<script type="text/javascript">
$(function(){
    var param = "<%=param%>";
    
    param = decode64(param); //解密
    //字符串转成JSON对象
    var data = JSON.parse(param);
});
</script>