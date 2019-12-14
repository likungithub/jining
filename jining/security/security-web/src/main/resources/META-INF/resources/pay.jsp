<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@ page import="com.xinhai.security.api.CurrentLoginUser" %>
<%@ page import="java.util.Date" %>
<%
   /* Date fwjsrq = CurrentLoginUser.getCustomer().getFwjsrq(); //服务结束日期
   String param = request.getParameter("param");
   Date now = new Date();
   Date ks = null;
   if (fwjsrq != null) {
       if (fwjsrq.getTime() > now.getTime()) { //若服务结束日期 大于 当前时间
           //展示的服务结束时间为当前代理的服务结束日期
           ks = fwjsrq;
       } else {
           //展示的服务结束时间为当前日期
           ks = now;
       }
   } else {
       //展示的服务结束时间为当前日期
       ks = now;
   }
   Calendar cal = Calendar.getInstance();  
   cal.setTime(ks);
   int year = cal.get(Calendar.YEAR);//获取年份  
   int month = cal.get(Calendar.MONTH) + 1;//获取月份   
   int day = cal.get(Calendar.DAY_OF_MONTH);//获取日   */ 
   //String param = request.getParameter("param");
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/securityassets/img/favicon.ico" type="image/x-icon" />
    <link href="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/css/bootstrap.min.css"
          rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/securityassets/css/pay.css">
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/font/iconfont.css" />
    <title>财云管家——支付中心</title>
</head>
<div id="Paytitle" style="margin-top: 15px">
    <div class="container" style="border-bottom: 3px solid #347AB8 ">
        <div class="row">
            <div class="col-sm-4">
                <img src="<%=request.getContextPath()%>/securityassets/img/onlinepay.png" alt="在线支付的图片" style="width: 150px;margin-bottom: 10px;">
            </div>
            <div class="col-sm-5 col-sm-push-3" style="margin-top: 20px">
                <div class="pull-center" id="payFWQX">
                    <img src="<%=request.getContextPath()%>/securityassets/img/warning.png" alt="警告图标" style="vertical-align: sub" id="payWarning">
                    <span class="payExpireTime">距服务到期还有：</span>
                    <span id="timerDays" class="payExpireTime1">999</span>
                    <span class="payExpireTime1">天</span>
                    <span id="timerHours" class="payExpireTime1">24</span>
                    <span class="payExpireTime1">小时</span>
                    <span id="timerMins" class="payExpireTime1">60</span>
                    <span class="payExpireTime1">分钟</span>
                    <span id="timerSeconds" class="payExpireTime1">60</span>
                    <span class="payExpireTime1">秒</span>
                    <%--<span class="payExpireTime">到期</span>--%>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="paymanager-content">
    <header id="payHead_m">
        <div class="container" style="margin-bottom: 15px;">
            <div class="row" style="margin: 0;padding: 15px;">
                <div class="col-sm-12">
                    <div class="onlinePay" style="font-size: 14px">在线支付</div>
                </div>
                <div class="col-sm-6">
                    <div class="row">
                        <div class="col-sm-12 paddTop15">
                            <span>服务项目：</span>
                            <span style="color: #0096DF;" id="pay_FWXM">平台服务费</span>
                        </div>
                        <div class="col-sm-12 paddTop15">
                            <span>服务年数：</span>
                            <span>
									<a href="javascript:void(0)" class="chargeBtn" style="border-right: none;line-height: 21px">-</a><input type="text" disabled value="1" class="text-right" style="width: 50px;padding: 1px 5px;height: 26px;" id="YOfSer"/><a href="javascript:void(0)" class="chargeBtn" style="border-left: none;line-height: 21px">+</a>
								</span>
                        </div>
                        <div class="col-sm-12 paddTop15">
                            <span>服务年费：</span>
                            <span>
                                ¥
                                <span id="unitPrice">2380</span>
                                /年
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="col-sm-12 paddTop15">
                        <span>服务期限：</span>
                        <span id="payFWQ"></span>
                        <span>至</span>
                        <span id="payFWZ"></span>
                    </div>
                    <div class="col-sm-12 paddTop15">
                        <span>应付金额：</span>
                        <span class="Emphasize">¥<span id="totalAll">2380</span></span>
                    </div>
                </div>
                <div class="col-sm-12" style="margin-top: 15px">
                    <span>
                        商品描述：
                    </span>
                    <span id="pay_SPMS">财云管家服务管理年费</span>
                </div>
            </div>
        </div>
    </header>
    <section id="paymaincontent_m" style="margin-bottom: 15px">
        <!-- <img src="#" id="code" width="400" height="400" style="position:absolute;left:38%;top:232px;z-index: 100;display: none"/> -->
        <div class="container" style="padding-bottom: 15px ;">
            <div class="row" style="margin: 0;padding: 15px;">
                <div class="col-sm-12">
                    <div class="paymethod"  style="font-size: 14px">
                        支付方式
                    </div>
                </div>
            </div>
            <div class="row" style="margin: 0;" style="padding: 0 15px 15px;">
                <div class="col-sm-12" style="padding: 0">
                    <div class="paymethod1">
                        <span class="grade">01</span>
                        <span>线上支付</span>
                        <span class="recommend">推荐</span>
                    </div>
                    <div class="col-sm-5 text-center col-sm-push-1">
                        <div class="paymethodframe weixinPM activePayMethod">
                            <input type="radio" name="payM" value="0" checked style="display: none">
                            <img src="<%=request.getContextPath()%>/securityassets/img/weChat.png" alt="微信支付" class="payPic"/>
                        </div>
                    </div>
                    <div class="col-sm-5 text-center">
                        <div class="paymethodframe zhifubaoPM" style="padding: 0 19px 0 12px">
                            <input type="radio" name="payM" value="1" style="display: none">
                            <img src="<%=request.getContextPath()%>/securityassets/img/zhifubao.png" alt="支付宝支付"style="width: 120px" class="payPic" />
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 rightPay">
                    <div class="pull-left" style="font-weight: 600;color: #63676A;margin-left: 100px">
                        <span style="font-size: 20px">待支付：￥</span>
                        <span id="waitPay" style="font-size: 20px">2380</span>
                    </div>
                    <a class="pull-right" id="rightNowPay_m" style="cursor: pointer;font-size: 20px">立即支付</a>
                </div>
                <div class="col-sm-12">
                    <span class="grade">02</span>
                    <span>
							银行转账
						</span>
                </div>
                <div class="col-sm-12  customerinfo">
                    <div><span>户&nbsp;&nbsp;&nbsp;名：</span><span class="payInfo">山东财云升信息科技有限公司</span></div>
                    <div><span>账&nbsp;&nbsp;&nbsp;户：</span><span class="payInfo">1109 0759 7010 206</span></div>
                    <div><span>开户行：</span><span class="payInfo">招商银行青岛市南支行</span></div>
                    <div><span style="color: red;">提示：</span><span>请正确填写公司名称、纳税人识别号、手机号、以便订单及时核销。</span></div>
                </div>
            </div>
        </div>
    </section>
                        <form action="/paymanager/paymanager/pay" method="post" class="form-horizontal" id="payForm" style="display: none">
                            <div class="form-body">
                                <div class="row form-group">
                                    <div class="col-md-12">
                                        <div class="input-group">
                                            <label class="labelCommon labelWidth-col-one labelBg color333">
                                                商户订单号 ：
                                            </label>
                                            <input type="text" readonly="readonly" class="inputCommon inputWidth-col-one" id="out_trade_no" name="out_trade_no">
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-12">
                                        <div class="input-group">
                                            <label class="labelCommon labelWidth-col-one labelBg color333">
                                                订单名称 ：
                                            </label>
                                            <input type="text" readonly="readonly" class="inputCommon inputWidth-col-one" name="subject">
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-12">
                                        <div class="input-group">
                                            <label class="labelCommon labelWidth-col-one labelBg color333">
                                                付款金额 ：
                                            </label>
                                            <input type="text" class="inputCommon inputWidth-col-one totalAll" name="total_amount" onkeyup="this.value=/^\d+\.?\d{0,2}$/.test(this.value) ? this.value : ''">
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-12">
                                        <div class="input-group">
                                            <label class="labelCommon labelWidth-col-one labelBg color333">
                                                商品描述：
                                            </label>
                                            <input type="text" class="inputCommon inputWidth-col-one" name="body">
                                        </div>
                                    </div>
                                </div>
                                <input type="text" class="inputCommon inputWidth-col-one" name="tclx"><!-- 套餐类型 -->
                                <input type="text" class="inputCommon inputWidth-col-one" name="tcsj"><!-- 套餐时间 -->
                                <input type="text" class="inputCommon inputWidth-col-one" name="kssj" id="inputkssj"><!-- 套餐开始时间 -->
                                <div class="form-group">
                                    <label class="control-label control-label-medium"></label>
                                    <div class="save saveOrg">
                                        <button type="button" class="btn btn btn-default btnBlue borderRadius4 colorfff"
                                                id="aliPay">
                                            <i class="fa fa-save"></i> 支&nbsp;付&nbsp;宝
                                        </button>
                                        <button type="button" class="btn btn btn-default btnBlue borderRadius4 colorfff"
                                                id="weixinPay">
                                            <i class="fa fa-save"></i> 微&nbsp;信
                                        </button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <%--<img src="#" id="code" width="400" height="400" style="position:absolute;right:0px;top:13px;"/>--%>
                                </div>
                            </div>
                        </form>

</div>
<footer>
    <jsp:include page="footer.jsp"></jsp:include>
</footer>
<link href="<%=request.getContextPath()%>/assets/global/plugins/messenger/css/messenger.css" rel="stylesheet" />
<link href="<%=request.getContextPath()%>/assets/global/plugins/messenger/css/messenger-theme-block.css" rel="stylesheet" />
<script src="<%=request.getContextPath()%>/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/securityassets/scripts/pay.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/RegExp/commonRegExp.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/bootbox/bootbox.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/assets/global/plugins/messenger/js/messenger.min.js"></script>
<%-- <script src="<%=request.getContextPath()%>/assets/global/plugins/jquery-validation/js/localization/messages_zh.min.js" type="text/javascript"></script> --%>
<script type="text/javascript">
    $(function () {

        var year11 = sessionStorage.getItem("year");
        var month11 = sessionStorage.getItem("month");
        var day11 = sessionStorage.getItem("day");
        var data11 = {
            year : year11,
            month: month11,
            day  : day11
        };

        var Datayear = '';
        var Datamonth = '';
        var Dataday = '';

        //解密
        $.ajax({
            url:'/customermanage/customerManage/decData',
            type:'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data:JSON.stringify(data11),
            success:function(result){
                if (result.success) {
                    Datayear = result.year;
                    Datamonth = result.month;
                    Dataday = result.day;
                    var d2 = Datayear + "年" + Datamonth + "月" + Dataday + "日";
                    var d3 = parseInt(Datayear) + parseInt(1) + "年" + Datamonth + "月" + Dataday + "日";
                    $('#payFWQ').text(d2);
                    $('#payWarning').attr('title','本期服务结束日期为' + d2);
                    $('#payFWZ').text(d3);
                    $('#inputkssj').val(Datayear + "-" + Datamonth + "-" + Dataday + "-"); //套餐开始时间
                } else {
                    alert("获取时间失败!");
                }
            },
            error:function(){
                alert("获取时间失败!");
            }
        });

    	<%--var param = "<%=param%>";--%>
        //解密
        //param = decode64(param);
        //字符串转成JSON对象
        //var data = JSON.parse(param);

    	paymanager.setPath('<%=request.getContextPath()%>');
    	paymanager.init();
    	var year = [];
    	var fee = [];
    	$.ajax({
    		url : '/systemmanager/expensemanagement/findFWFee',
    		type:'GET',
    		success:function(data){
    			if (data.success) {
    				for (var i = 0; i < data.year.length; i++ ) {
    					year.push(data.year[i]);
    					fee.push(data.fee[i]);
    				}
    			}
    			pay(year,fee);
    		}
    	});
    	var  payContent_m =$('#paymanager-content');
    	function pay(year,fee){
    		var YOfSer = $('#YOfSer').val(); //年数
    		//var unitPrice = $('#unitPrice',payContent_m).text(); //当前价格
    		if (year.length > 2) {
    			for (var i = 0; i < year.length - 1; i++ ) {
                    if (YOfSer >= year[i] && YOfSer < year[i+1]) { //在其中两个数之间
                    	$('#unitPrice',payContent_m).text(fee[i]);
                    } if (YOfSer >= year[year.length - 1]) { //比最高年数还要高，选最优惠的价格
                    	$('#unitPrice',payContent_m).text(fee[year.length - 1]);
                    }
                }
    		}
    		var total = mul($('#YOfSer').val(), $('#unitPrice',payContent_m).text());
            $('#totalAll',payContent_m).html(total);
            $('#waitPay',payContent_m).html(total);
            $('input[name="total_amount"]','#payForm').val(total);
            var year = parseInt(Datayear) + parseInt($('#YOfSer').val());
            var d4 = year + "年" + Datamonth + "月" + Dataday + "日";
            $('#payFWZ').text(d4);
        }

        //处理浮点数计算
        function mul(a, b) {
            var c = 0,
                d = a.toString(),
                e = b.toString();
            try {
                c += d.split(".")[1].length;
            } catch (f) {}
            try {
                c += e.split(".")[1].length;
            } catch (f) {}
            return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
        }

        $('#payHead_m  a.chargeBtn:first').click(function(){
            var val = $('#YOfSer').val();
            if(val>1)
            {
                $('#YOfSer').val(--val);
            }else{
                $('#YOfSer').val(1);
            }
            pay(year,fee);
        });
        $('#payHead_m  a.chargeBtn:last').click(function(){
            var val = $('#YOfSer').val();
            $('#YOfSer').val(++val);
            if(val>100){
                $('#YOfSer').val(100);
                alert("你输入的年数过大");
            }
            pay(year,fee);
        });
//选择支付方式

        $('.payPic',payContent_m).css('cursor','pointer').click(function(){
           $(this).prev('input').prop('checked','checked');
            var method = $('input[name="payM"]:checked',payContent_m).val();
            if(method == 1){
                $('#code',payContent_m).hide();
            }
        });
        $('.paymethodframe').click(function(){
            $('.weixinPM').removeClass('activePayMethod');
            $('.zhifubaoPM').removeClass('activePayMethod');
            if($(this).children('input').is(':checked')){
                $(this).addClass('activePayMethod');
            }

        });


//   立即支付
        $('#rightNowPay_m',payContent_m).click(function(){
            var method = $('input[name="payM"]:checked',payContent_m).val();
//            微信支付
            if(method == 0){
                $('#weixinPay','#payForm').trigger('click');
                $('#code',payContent_m).show();
            }else if(method == 1){
                $('#aliPay','#payForm').trigger('click');
            }
        });
    });
</script>