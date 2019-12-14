<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
    String dl= CurrentLoginUser.getUser().getDljgBm();
%>
<style>
  #basicparamsmastersetting-m h2{
		margin-bottom:20px;
        font-weight:bold;
	}
  #basicparamsmastersetting-m .title{
		background: none;
	    border: none;
	    /* margin-top: -5px; */
	    position: relative;
	    top: -2px;
	}
  #basicparamsmastersetting-m input[type="text"]{
		width:24px !important;
		height:20px !important;
		line-height:20px !important;
		border-radius:4px !important;
		background:#fff;
		border:1px solid #ddd;
	}
  #basicparamsmastersetting-m .input-group{
		margin-bottom:10px !important;
	}
	#basicparamsmastersetting-m .input-group input{
		margin-top:3px;
	}
  #basicparamsmastersetting-m input[type="checkbox"]{
		position: relative;
    	top: -5px;
	}
  #basicparamsmastersetting-m .title{
    font-size: 14px!important;
  }
  #basicparamsmastersetting-m  div.col-md-4{
    margin-top: 15px;
  }
  #basicparamsmastersetting-m  div.col-md-4>div{
    border: 1px solid #DBE3EF;
    padding: 10px 0 10px 10px;
    border-radius: 4px!important;
  }
  #basicparamsmastersetting-m  div.col-md-4>div .num{
    color: #5dafeb;
    font-size: 20px;
    margin-bottom: 15px;
      display: inline-block;
      margin-right: 10px;
  }
  #basicparamsmastersetting-m  div.col-md-4>div .num:after{
    content: '';
    display: block;
    width: 28px;
    height: 3px;
    background: #5dafeb;
    margin-top: 5px;
  }
</style>
<!-- 报税提醒设置 -->
<div style="background: #fff!important;padding: 20px 0 100px">
<div>
  <div class="container-fluid">
    <div class="col-md-12" style="padding: 15px;background: #f4f4f4">
      <span style="font-size: 14px;" class="color333">
          <img src="<%=request.getContextPath()%>/assets/pages/img/warning.png" alt="图标">
          设置参数值时应先填写参数值，再勾选复选框；取消勾选则清空当前参数设置！</span>
    </div>
  </div>
</div>
<form class="form-inline" id="basicparamsmastersetting-m">
  <div class="container-fluid" style="padding: 0px">
    <div class="col-md-4 ifadminhide">
      <div>
        <h2 class="h4 title"><div class="num">01</div>报税提醒设置</h2>
        <div class="form-group">
          <input type="checkbox" name="category" value="100" id="check1" />
              <div class="input-group">
              <div class="input-group-addon title">报税提醒默认前</div>
              <input type="text"  name="taxbeforeday" id="taxbeforeday" style="padding-left: 4px!important">
            <div class="input-group-addon title">天进行提醒</div>
        </div>
      </div>
      </div>
    </div>
<!--   催费预警设置 -->
    <div class="col-md-4 ifadminhide">
      <div>
        <h2 class="h4 title"><div class="num">02</div>催费预警设置</h2>
        <div class="form-group">
            <input type="checkbox" name="category" value="200" id="check2"/>
            <div class="input-group">
                <div class="input-group-addon title">催费提醒默认到期前</div>
                <input type="text"  name="paybeforeday" id="paybeforeday"  style="padding-left:4px!important">
                <div class="input-group-addon title">天进行提醒</div>
            </div>
        </div>
      </div>
    </div>
  <!-- 欠费期限提醒设置 -->
    <div class="col-md-4 ifadminhide">
      <div>
           <h2 class="h4 title"><div class="num">03</div>欠费期限提醒设置</h2>
          <div class="form-group">
              <input type="checkbox" name="category" value="300" id="check3"/>
              <div class="input-group">
                <div class="input-group-addon title">欠费提醒默认超期</div>
                <input type="text"  name="afterpayday" id="afterpayday"  style="padding-left:4px!important">
                <div class="input-group-addon title">天进行提醒</div>
              </div>
          </div>
      </div>
    </div>
    <%--任务超期预警提醒设置--%>
      <div class="col-md-4 ifadminhide">
        <div>
           <h2 class="h4 title"><div class="num">04</div>任务超期预警提醒设置</h2>
            <div class="form-group">
              <input type="checkbox" name="category" value="400" id="check4"/>
              <div class="input-group">
              <div class="input-group-addon title">任务超期</div>
              <input type="text" name="findByTaskOut" id="findByTaskOut"  style="padding-left: 4px!important">
              <div class="input-group-addon title">天后进行提醒</div>
            </div>
          </div>
        </div>
    </div>
    <%--任务即将到期预警提醒设置--%>
    <div class="col-md-4 ifadminhide">
      <div>
           <h2 class="h4 title"><div class="num">05</div>任务即将到期预警提醒设置</h2>
            <div class="form-group">
                  <input type="checkbox" name="category" value="500" id="check5"/>
                  <div class="input-group">
                  <div class="input-group-addon title">任务即将到期剩余</div>
                  <input type="text"  name="findByTaskExpiration" id="findByTaskExpiration"  style="padding-left: 4px!important">
                  <div class="input-group-addon title">天后进行提醒</div>
                </div>
          </div>
      </div>
    </div>

    <%--合同到期预警提醒设置--%>
    <%--<div class="col-md-4">
      <div>
          <h2 class="h4 title htdqsz"><div class="num">06</div>合同到期预警提醒设置</h2>
          <div class="form-group">
              <input type="checkbox" name="category" value="600" id="check6"/>
              <div class="input-group">
                  <div class="input-group-addon title">合同即将到期</div>
                  <input type="text" class="form-control" name="expirecontract" id="expirecontract"  style="padding: 0 12px!important">
                  <div class="input-group-addon title">天后提醒</div>
            </div>
          </div>
      </div>
    </div>--%>
     <%--合同超期预警提醒设置--%>
    <%--<div class="col-md-4">
      <div>
          <h2 class="h4 title htcqsz"><div class="num">07</div>合同超期预警提醒设置</h2>
             <div class="form-group">
                <input type="checkbox" name="category" value="700" id="check7"/>
                <div class="input-group">
                <div class="input-group-addon title">合同超期</div>
                <input type="text" class="form-control" name="overduecontract" id="overduecontract"  style="padding: 0 12px!important">
                <div class="input-group-addon title">天后提醒</div>
                </div>
          </div>
      </div>
    </div>--%>
    <div class="col-md-4">
      <div id="tryTime">
        <h2 class="h4 title shiyongqishezhi"><div class="num" id="adminsettingByWs">08</div>财云管家试用期设置</h2>
        <div class="tryTime form-group">
              <input type="checkbox" name="category" value="800" id="check8"/>
              <div class="input-group">
                <div class="input-group-addon title">试用期</div>
                <input type="text"  name="findByOnTrial" id="findByOnTrial"  style="padding-left:12px!important">
                <div class="input-group-addon title">个月</div>
              </div>
        </div>
      </div>
    </div>
  </div>
</form>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/basicsparmatersetting/basicset.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function () {
	  var dl='<%=dl%>';
	  if(dl==='DL0000000001'){
	      $('.ifadminhide').hide();
	      $('#adminsettingByWs').text('01');
      }
		basicsparmatersetting.setPath("<%=request.getContextPath() %>");
		basicsparmatersetting.init();
	});
</script>