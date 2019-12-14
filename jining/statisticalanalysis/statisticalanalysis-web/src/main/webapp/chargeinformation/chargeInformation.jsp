<%--
<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script>
	var oWid = $(window).width() - 200;
	$("#searchBySituation").width(oWid);
	$("#searchByFeeAmount").width(oWid);
	$("#searchByAuditMark").width(oWid / 2 - 20);
	$("#searchByTollNumber").width(oWid / 2 - 20);
</script>
<style>
	.charts{background: #F4F8F9;overflow:hidden;}
	.sftj{    background: #fff;
    padding: 15px;
    padding-left: 40px;
    font-size: 14px;}
    .listinfo{margin-top: 15px;}
    .chargeInformation{background: #fff;
   margin-left: 2.8%;
    width: 46%;
    float: left;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(204, 204, 204, .5);}
</style>
<p>这是收费统计图表</p>
<div class="charts" id="echarts_shoufeitongji">

	<div class="row listinfo">
		<div class="mr">
		
			<div class="chargeInformation borderRadius4">
				<div id='searchByAuditMark' style="height:500px;">
				</div>
			</div>
		</div>
		<div>
			<div class="chargeInformation borderRadius4">
				<div id='searchByTollNumber' style="height:500px;"></div>
			</div>
		</div>
	</div>
	<div class="row">
	<div class="col-md-12" style="    height: 600px;
    width: 94.2%;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    position: relative;
    box-shadow: 0 0 10px rgba(204, 204, 204, .5);
    background: #fff;
    margin-left: 2.8%;
    margin-top: 15px;
    border: 1px solid #ccc;
    margin-bottom: 21px;">
		<div>
			<div class="top">
				<div class='h3' style="font-size:16px;">收费户数已审核情况</div>
			
			</div>
			<div id='searchBySituation' style="height:500px;float:left;"></div>
		</div>
	</div>
	</div>
	<div class="row">
	<div class="col-md-12" style="    height: auto;
    width: 94.2%;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    position: relative;
    box-shadow: 0 0 10px rgba(204, 204, 204, .5);
    background: #fff;
    margin-left: 2.8%;
    margin-top: 15px;
    border: 1px solid #ccc;
    margin-bottom: 21px;">
		<div class="">
			<div class="top">
				<div class='h3' style="font-size:16px;">收费金额情况</div>
			</div>
			<div id='searchByFeeAmount' style="height:500px;float:left;"></div>
		</div>
	</div>
	</div>
</div>
 <script src="<%= request.getContextPath()%>/assets/pages/scripts/chargeinformation/chargeInformation.js" type="text/javascript"></script>
--%>
<%--
Created by IntelliJ IDEA.
User: MDW
Date: 2017/11/23
Time: 16:42
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link rel="stylesheet" href="<%= request.getContextPath()%>/assets/pages/css/iconfont.css">
<link rel="stylesheet" href="<%= request.getContextPath()%>/assets/pages/css/daterangepicker.css">
<style>
	#chargeTotalContainer #switchbtnContainer1 .pull-right {
		margin: 15px 0 15px 0;
		width: 25px;
		height: 25px;
		background: #fff;
		border: 1px solid #dadada;
		cursor: pointer;
		line-height: 18px;
	}
	#chargeTotalContainer #switchbtnContainer1 .pull-right>img{
		height: 15px;
	}
	#chargeTotalContainer #chargeChargeArea1 .chartAraea{

		padding: 15px;
	}
	/*#chargeTotalContainer #chargeChargeArea1 .chartAraea>div{
		border:1px solid #d1d1d1;
	}*/
	#chargeTotalContainer #chargePiePic2>li{
		line-height: 40px;
		border-bottom: 1px solid #dedede;
	}
	#chargeTotalContainer #chargePiePic1 li{
		height:14%;
		border-bottom: 2px solid #ededed;
	}
	#chargeTotalContainer #chargePiePic1 li span{
		display: inline-block;
	}
	#chargeTotalContainer #chargePiePic1 li span:nth-child(1){
		width: 36%;
		text-align: left;
		padding-top: 20%;
	}
	#chargeTotalContainer #chargePiePic1 li span:nth-child(2){
		width: 64%;
	}
/*
	#chargeTotalContainer .chargeMenu1,#chargeTotalContainer .chargeMenu2
	{	border:none!important;
		position: absolute;
		right: 36%;
		z-index: 10;
	}*/
	#chargeTotalContainer .chargeMenu1>div,#chargeTotalContainer .chargeMenu2>div,#chargeTotalContainer .chargeMenu3>div{
		cursor: pointer;
		width: 54px;
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
	#chargeTotalContainer .chargeMenu3>div.active,
	#chargeTotalContainer .chargeMenu1>div.active,
	#chargeTotalContainer .chargeMenu2>div.active{
		border-bottom: 3px solid #4FAFFB;
		color: #4FAFFB;
	}

	.daterangepicker.dropdown-menu{
		padding-bottom: 50px;
	}
 .daterangepicker.dropdown-menu{
		z-index: 100000 !important;
		 min-width: 654px;
	}

</style>

<div id="chargeTotalContainer">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12" id="switchbtnContainer1" style="position: fixed;right: 0;z-index: 100" >
				<div class="pull-right text-center" data-sign="2" style="border-radius:0 4px 4px 0 !important">
					<img src="/systemmanager/assets/pages/img/list-unchecked.png" alt="" style="width: 16px">
				</div>
				<div class="pull-right  text-center" data-sign="1" style="background: #f4f4f4;border-radius:4px 0 0 4px!important">
					<img src="/systemmanager/assets/pages/img/chart-checked.png" alt="">
				</div>
			</div>
		</div>
	</div>
	<section id="chargeChargeArea1" style="margin-top: 50px">
		<div class="container-fluid">
			<div class="clearfix">
				<div class="col-md-6 chartAraea borderRadius4" id="firstChartDis_M" style="margin: 15px 15px 15px 10px;overflow: hidden;position: relative;padding: 0;padding-right: 200px;width: 48%;border: 1px solid #dedede;">
					<div class="chargeMenu1 clearfix" style="width: 100%;padding: 5px 10px;border-bottom: 1px solid #dedede">
						<h5 class="pull-left">收费台账审核占比情况</h5>
						<button type="button" class="btn btn-default pull-right borderRadius4" id="daterange-Mbtn1" style="margin-right: -200px">
								<span>
								  <i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
							<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
						</button>
					</div>
					<div id="chargePieCon1" style="position: relative;"></div>
				</div>

				<div class="col-md-6 chartAraea borderRadius4" id="secondChartDis_M" style="margin: 15px 15px 15px 0;;overflow: hidden;position: relative;padding: 0;padding-right: 200px;width: 48%;border: 1px solid #dedede;">
					<div class="chargeMenu2 clearfix" style="width: 100%;padding:5px 10px;border-bottom: 1px solid #dedede">
						<h5 class="pull-left">收费台账收费状态占比情况</h5>
						<button type="button" class="btn btn-default pull-right borderRadius4" id="daterange-Mbtn2" style="margin-right: -200px">
								<span>
								  <i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
							<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
						</button>
					</div>
					<div id="chargePieCon2" style="position: relative"></div>
				</div>
				<div class="col-md-12 chartAraea borderRadius4" style="position: relative;border: 1px solid #dedede;width: 96.88888888%;margin-left: 10px;padding: 0;">
					<div class="chargeMenu3 clearfix" style="border: none;top: 5px;border-bottom: 1px solid #dedede;padding: 5px 10px">
						<h5 class="pull-left">收费统计情况</h5>
						<button type="button" class="btn btn-default pull-right borderRadius4" id="daterange-Mbtn3">
								<span>
								  <i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
							<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
						</button>
					</div>
					<div id="chargeLineCon3">

					</div>
				</div>
				<div class="col-md-4 chartAraea borderRadius4"  style="width: 31.55%;border: 1px solid #dedede;margin: 15px;margin-left: 10px;padding: 0px;">
					<div class="chargeMenu1 clearfix" style="width: 100%;padding:5px 10px;border-bottom: 1px solid #dedede">
						<h5 class="pull-left">部门已到账排名</h5>
						<%--<div class="pull-left active">近7日</div>
						<div class="pull-left">本月</div>--%>
						<button type="button" class="btn btn-default pull-right borderRadius4" id="daterange-Mbtn4">
								<span>
								  <i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
							<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
						</button>

					</div>
					<div id="chartPic4" style="margin: 0 auto"></div>
				</div>
				<div class="col-md-4 chartAraea borderRadius4" style="width: 31.55%;border: 1px solid #dedede;margin: 15px;margin-left: 0;padding: 0;">
					<div class="chargeMenu1 clearfix" style="width: 100%;padding:5px 10px;border-bottom: 1px solid #dedede">
						<h5 class="pull-left" >各部门待审收费</h5>
						<button type="button" class="btn btn-default pull-right borderRadius4" id="daterange-Mbtn5">
								<span>
								  <i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
							<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
						</button>

					</div>
					<div id="chartPic5" style="margin: 0 auto"></div>
				</div>
				<div class="col-md-4 chartAraea borderRadius4" style="width: 31.55%;border: 1px solid #dedede;margin-top:15px;padding: 0">
					<div class="chargeMenu1 clearfix" style="width: 100%;padding:5px 10px;border-bottom: 1px solid #dedede">
						<h5 class="pull-left" >各部门欠费情况</h5>
						<button type="button" class="btn btn-default pull-right borderRadius4" id="daterange-Mbtn6">
								<span>
								  <i class="icon iconfont icon-calendar1"></i> 日期选择
								</span>
								<i class="icon iconfont icon-danxian-youjiantou-copy"></i>
						</button>
					</div>
					<div id="chartPic6" style="margin: 0 auto"></div>
				</div>
			</div>
		</div>
	</section>
	<section id="chargeChargeArea2" style="display: none">

	</section>
</div>
<script type="text/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/libs/moment.js"></script>
<script type="text/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/libs/daterangepicker.js"></script>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/chargeinformation/chargeInformation.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        chargeInformationFn.setPath("<%= request.getContextPath()%>");
        chargeInformationFn.init();
    });
</script>