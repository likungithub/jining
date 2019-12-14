<%@ page import="org.springframework.web.bind.annotation.RequestParam" %><%--
  Created by IntelliJ IDEA.
  User: liuhao
  Date: 2018/3/14
  Time: 15:04
  To change this template use File | Settings | File Templates.
--%>
<%
    String kqbh = request.getParameter("kqbh");
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div style="width: 100%;overflow: hidden;" id="addKqSz">
    <div>
        <label class="labelCommon labelWidth-col-two labelBg color666">城市名</label>
        <input class="city pull-left inputCommon  mr ">
        <label class="labelCommon labelWidth-col-two labelBg color666">请输入地址</label>
        <input class="address pull-left inputCommon  mr ">
        <button type="button" class="btn  btnAdd btnBorderColor colorfff borderRadius4  addressOk">确定</button>
    </div>
    <div>
        <p style="float: left">您选择的地址：</p>
        <p style="float: left" class="addressMs"></p>
    </div>
    <div id="allmap" style="width: 100%;height: 400px;"></div>
</div>
<%--引入百度地图,到时候ak替换成公司的--%>
<%--引入百度地图不知道怎么报错了，把他放在jq前面引用就好使，这个问题不知道咋解决，目前把他放在caiyun-web index.jsp页面上引用的--%>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/attendance/addkq.js"></script>
<script>
    $(function () {
        addkq.setPath("<%=request.getContextPath()%>");
        addkq.init('<%=kqbh%>');
    });
</script>
