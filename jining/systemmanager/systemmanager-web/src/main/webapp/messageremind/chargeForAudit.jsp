<%--
  Created by IntelliJ IDEA.
  User: MDW
  Date: 2018/4/8 0008
  Time: 10:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    String glbm = request.getParameter("glbm");
    String type = request.getParameter("type");
    if(glbm ==  null){
        glbm ="";
    }
    if(type == null){
        type="";
    }
%>
<style>
    #singleChargeForAudit_M .borderRound{
        border: 1px solid #1e9eff;
    }
    #singleChargeForAudit_M .borderR{
        border-right: 1px solid #1e9eff;
    }
    #singleChargeForAudit_M .borderL{
        border-left: 1px solid #1e9eff;
    }
    #singleChargeForAudit_M .borderT{
        border-top: 1px solid #1e9eff;
    }
    #singleChargeForAudit_M .borderB{
        border-bottom: 1px solid #1e9eff;
    }
    #singleChargeForAudit_M  #childData table,
    #singleChargeForAudit_M  #childData table th,
    #singleChargeForAudit_M  #childData table td{
        border: 1px solid #dedede!important;
        border-collapse: collapse;
    }
    #singleChargeForAudit_M  #childData table td{
        padding: 5px;
    }
    #singleChargeForAudit_M .commonW1{
        width: 304px;
    }
    #singleChargeForAudit_M .commonW2{
        width: 150px;
    }
    #singleChargeForAudit_M .commonW3{
        width: 768px;
    }
    #singleChargeForAudit_M .commonH1{
        height:60px;
    }
   #singleChargeForAudit_M .alignM{
       vertical-align: sub;
   }
    #singleChargeForAudit_M .cursorP{
        cursor: pointer;
    }


    #singleChargeForAudit_M #childData1 .childtable tr:first-child td:last-child .childdivlist{
        padding: 0px 10px 0px 10px;
        float: left;
        height: 34px;
        line-height:34px;
    }
    #singleChargeForAudit_M #childData1 .childtable tr:first-child td:last-child .childdivlist{
        float: left;
    }
    #singleChargeForAudit_M #childData1 .childtable tr:first-child td:last-child .childdivlist:last-child{
        float: right;
    }
    #singleChargeForAudit_M .childtable tr:first-child td:last-child .rotate{
        transform:rotate(90deg);
        -ms-transform:rotate(90deg); /* Internet Explorer */
        -moz-transform:rotate(90deg); /* Firefox */
        -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
        -o-transform:rotate(90deg); /* Opera */
    }
</style>

<div class="container-fluid" id="singleChargeForAudit_M">
    <div class="row">
        <div class="col-sm-12" style="padding: 0">
            <table class="table table-striped">
                <thead>
                    <th></th>
                    <th>合同编码</th>
                    <th>客户名称</th>
                    <th>服务期限</th>
                    <th>收费项目</th>
                    <th>收费方式</th>
                    <th>应收金额</th>
                    <th>实际金额</th>
                </thead>
                <tbody>
                    <tr id="mainData"></tr>
                    <tr id="childDataP">
                       <td id="childData" colspan="8" style="background: #fff;padding: 0">
                            <div id="childData1" style="max-height: 300px;overflow-y: auto;padding:0 10px;">

                            </div>
                       </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-12 shxx" style="padding: 0">
            <div class="form-group clearfix">
                <label  class="labelCommon commonW2"><span style="color: red" class="iconMr">*</span>收费</label>
                <div class="inputCommon commonW1 mr text-center" style="line-height: 33px">
                    <input class="alignM" type="radio" id="aaa" name="radioI" value="004" checked>
                    <label for="aaa" class="mr cursorP">已到账</label>
                    <input class="alignM" type="radio" id="bbb" name="radioI" value="001">
                    <label for="bbb" class="cursorP">未到账</label>
                </div>
                <label  class="labelCommon commonW2"><span style="color: red" class="iconMr">*</span>审核状态</label>
                <div class="inputCommon commonW1 text-center" style="line-height: 33px">
                    <input class="alignM" type="radio" id="ccc" name="radioII" value="001" checked>
                    <label for="ccc" class="mr cursorP">同意</label>
                    <input class="alignM" type="radio" id="ddd" name="radioII" value="002">
                    <label for="ddd" class="cursorP">不同意</label>
                </div>
            </div>
            <div class="form-group clearfix">
                <label  class="labelCommon commonW2 commonH1" style="line-height: 60px">审核意见</label>
                <textarea id="auditOpinion" class="inputCommon commonW3 commonH1" placeholder="请输入审核意见"></textarea>
            </div>
            <div class="clearfix">
                <div class="pull-right">可输入<span id="manyWords" style="color: red;">300</span>字</div>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/messageremind/chargeForAudit.js"
        type="text/javascript"></script>
<script>
    $(function(){
        singleChargeForAudit.init('<%=glbm%>','<%=type%>');
        singleChargeForAudit.setPath('<%= request.getContextPath()%>');
    });


</script>