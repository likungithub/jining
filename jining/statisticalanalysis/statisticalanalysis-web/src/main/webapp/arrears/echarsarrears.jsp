<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script>
var oWid = $(window).width();
var ocurWid = oWid - 250;
var ocurWid1 = oWid - 250;
$(".echarsqfhs").width(ocurWid1);
$(".echarsqfje").width(ocurWid1);
$("#echarsqfhs").width(ocurWid);
$("#echarsqfje").width(ocurWid);
</script>
<style>
	.echarsqfhs{
	    border: 1px solid #DFDFDF;
    box-shadow: 1px 1px 4px #DFDFDF;
    margin: 0 auto;
    margin-top: 34px;
    height: 416px;
	}
	.echarsqfje{
	    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(204, 204, 204, .5);
    margin: 0 auto;
    margin-top: 34px;
    height: 416px;
	}
</style>
		<div class="echarsqfhs" >
					<div class="top pull-left">
						<div class='h4' style="padding-left: 15px;
    font-size: 16px;
    /* margin-top: 11px; */
    position: relative;
    top: 10px;">近期欠费户数统计情况</div>
						<!-- <div class='mask'>
							<i class='icon iconfont icon-gengduo1'></i>
						</div> -->
					</div>
					<div id='echarsqfhs' style="height:377px;"></div>
		</div>
		<div class="echarsqfje" >
					<div class="top">
						<div class='h4' style="padding-left: 15px;
    font-size: 16px;
    /* margin-top: 11px; */
    position: relative;
    top: 10px;">近期欠费金额统计情况</div>
						<!-- <div class='mask'>
							<i class='icon iconfont icon-gengduo1'></i>
						</div> -->
					</div>
					<div id='echarsqfje' style="height:377px"></div>
		</div>
	<script src="<%=request.getContextPath()%>/assets/pages/scripts/arrears/echarsarrears.js" type="text/javascript"></script>
	<script type="text/javascript">
		 $(function () {
			echarsArrears.setPath("<%=request.getContextPath()%>");
			echarsArrears.init("");
			
			
		}); 
	</script>
</html>