<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String uuid = UUID.randomUUID().toString();
%>

<div class="row contentBgColor" id="<%=uuid%>-ypjcEdit-container">
    <div class="dataTables_wrapper no-footer">
        <div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
            <div style="clear:both;overflow: hidden;margin-top: 5px;">
                <div class="input-group  search-label-small pull-left"
                     style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                    <label class="labelCommon labelBg color666 dateLabel-m">检测项名称</label>
                    <input type="text" class="inputCommon appsysinfo-m" id="jcxmc" name="jcxmc" placeholder="请输入检测项名称"
                           style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                </div>
                <div class="input-group  search-label-small pull-left"
                     style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                    <label class="labelCommon labelBg color666 dateLabel-m">检测状态</label>
                    <select name="tjzt"  class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
                        <option value="">下拉选择检测状态</option>
                        <option value="0">未检测</option>
                        <option value="1">已检测</option>
                    </select>
                </div>
                <div class="input-group  search-label-small pull-left"
                     style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                    <label class="labelCommon labelBg color666 dateLabel-m">提交状态</label>
                    <select name="bzzt"  class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
                        <option value="">下拉选择检测状态</option>
                        <option value="001">未提交</option>
                        <option value="002">已提交</option>
                    </select>
                </div>
            </div>
            <!--按钮  begin-->
            <div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
                <button id="jcxYq"
                        class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i
                        class="fa fa-refresh iconMr"></i>选择仪器
                </button>
                <button id="jcxSeach"
                        class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i
                        class="fa fa-search iconMr"></i>查询
                </button>
                <button id="jcxReast"
                        class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i
                        class="fa fa-refresh iconMr"></i>重置
                </button>
                <button id="zdjsBut"
                        class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i
                        class="fa fa-refresh iconMr"></i>自动计算
                </button>
                <button id="rjpbut" onclick="rjpshow();"
                        class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i
                        class="fa fa-refresh iconMr"></i>软键盘
                </button>                
            </div>
            <!--按钮  end-->
        </div>
        <%--<form method="post" id="yqjc_form_choose">--%>
        <table class="table table-striped table-hover paramsTab" id="ManagerList_ypjcedit" style="width: 1100px">
            <thead>
            <tr class="color333">
                <th width="10px"><input type="checkbox" name="ck"/></th>
                <th width="10px"></th>
                <th width="250px" class="text-center">检测项目</th>
                <th width="100px" class="text-center">仪器名称</th>
                <th width="60px" class="text-center">检出限</th>
                <th width="100px" class="text-center">检出限单位</th>
                <th width="60px" class="text-center">比较符</th>
                <th width="200px" class="text-center">限量值</th>
                <th width="200px" class="text-center">检测值</th>
                <th width="60px" class="text-center">单位</th>
                <th width="60px" class="text-center">温度</th>
                <th width="60px" class="text-center">湿度</th>
                <th width="250px" class="text-center">检测标准</th>
                <th width="80px" class="text-center">判定标准</th>
                <th width="80px" class="text-center">结论</th>
                <th width="80px" class="text-center">备注</th>
                <th width="100px" class="text-center">标准物质</th>
                <th width="80px" class="text-center">检测状态</th>
                <th width="80px" class="text-center">提交状态</th>
                <th width="80px" class="text-center">检测人</th>
            </tr>
            </thead>
        </table>
        <%--</form>--%>
    </div>
</div>
<style>
    * {
        margin: 0;
        padding: 0;
    }
    ::-ms-clear {
        display: none;
    }
    ::-ms-reveal {
        display: none;
    }
    body {
        font-family: 微软雅黑;
        width: 100%;
        height: 100%;
    }
    .login-area {
        margin: 0 auto;
        width: 430px;
        height: 450px;
        margin-top: 50px;
    }
    .login-area .common {
        font-family: 微软雅黑;
        position: relative;
    }
    .login-area .input {
        top: 100px;
        height: 35px;
        width: 70%;
        padding: 5px 5px 5px 10px;
        margin: 0 12%;
        font-size: 14px;
        border: 1px solid #d2d2d2;
        outline: none;
    }
    .login-area .input_on {
        border-color: #00BBFF;
    }
    .login-area .psw-height {
        top: 110px;
    }
    .login-area .login-btn {
        top: 170px;
        left: 60px;
        background: #3090e7;
        border: none;
        width: 300px;
        height: 60px;
        color: #fff;
        font-size: 1em;
    }
    .login-area .title {
        font-family: 微软雅黑;
        color: #3090e7;
        position: relative;
        top: 70px;
        font-size: 1.4em;
        width: 100%;
        text-align: center;
    }
    .login-area .title span {
        border-bottom: 1px solid #3090e7;
        width: 40px;
        height: 0;
        display: inline-block;
        margin: 0 10px 5px;
    }
    #jianpan {
        position: absolute;
        background: #ffffff;
        border-radius: 5px;
        bottom: 50px;
        right: 50px;
        z-index: 9999;
        width: 35%;
        height: 80%;
        display: none;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.5);
        -user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    #jianpan .title {
        width: 100%;
        height: 15%;
        border-bottom: 1px solid #dcdddd;
        padding: 0;
        cursor: move;
        font-size: 1em;
    }
    #jianpan .jianpan_hide {
        width: 40px;
        float: right;
        display:inline-block;
        margin-top:10px;
    }
    #xfjp {
        width: 100%;
        height: 85%;
    }
    #shift {
        font-size: 0.8em;
    }
    .jianpan {
        color: #dcdddd;
    }
    .jianpan td {
        color: #333333;
        width: 10%;
        text-align: center;
        font-size: 1em;
        border-bottom: 1px solid #dcdddd;
        border-left: 1px solid #dcdddd;
    }
    .jianpan tr td:first-child {
        border-left: none;
    }
    .jianpan tr:last-child td {
        border-bottom: none;
    }
</style>
<div id="jianpan">
    <div class="title" style="text-align:center;"><span id="jptitle"></span><span class="jianpan_hide" style="cursor:pointer"
                                                                                  onClick="xfjianpan(false)">关闭</span>
    </div>
    <table id="xfjp" class="jianpan" cellspacing="0" cellpadding="0">
        <tr>
            <td style="cursor:pointer">+</td>
            <td style="cursor:pointer">-</td>
            <td style="cursor:pointer">×</td>
            <td style="cursor:pointer">÷</td>
            <td style="cursor:pointer">=</td>
            <td style="cursor:pointer">@</td>
        </tr>
        <tr>
            <td style="cursor:pointer">＞</td>
            <td style="cursor:pointer">＜</td>
            <td style="cursor:pointer">≥</td>
            <td style="cursor:pointer">≤</td>
            <td style="cursor:pointer">^</td>
            <td style="cursor:pointer">清空</td>
        </tr>
        <tr>
            <td style="cursor:pointer">上标</td>
            <td style="cursor:pointer">⁰</td>
            <td style="cursor:pointer">¹</td>
            <td style="cursor:pointer">²</td>
            <td style="cursor:pointer">³</td>
            <td style="cursor:pointer">⁴</td>
        </tr>
        <tr>
            <td style="cursor:pointer">上标</td>
            <td style="cursor:pointer">⁵</td>
            <td style="cursor:pointer">⁶</td>
            <td style="cursor:pointer">⁷</td>
            <td style="cursor:pointer">⁸</td>
            <td style="cursor:pointer">⁹</td>
        </tr>
        <tr>
            <td style="cursor:pointer">下标</td>
            <td style="cursor:pointer">₀</td>
            <td style="cursor:pointer">₁</td>
            <td style="cursor:pointer">₂</td>
            <td style="cursor:pointer">₃</td>
            <td style="cursor:pointer">₄</td>
        </tr>
        <tr>
            <td style="cursor:pointer">下标</td>
            <td style="cursor:pointer">₅</td>
            <td style="cursor:pointer">₆</td>
            <td style="cursor:pointer">₇</td>
            <td style="cursor:pointer">₈</td>
            <td style="cursor:pointer">₉</td>
        </tr>
    </table>
</div>
<script>
		function InsertString(obj, str){
		    var tb = obj;
		    tb.focus();
        var newstart = tb.selectionStart+str.length;
        tb.value=tb.value.substr(0,tb.selectionStart)+str+tb.value.substring(tb.selectionEnd);
        tb.selectionStart = newstart;
        tb.selectionEnd = newstart;
		}	
    $("#jianpan .title").css("line-height", $("#jianpan").height() / 5 + "px");
    function xfjianpan(idobj) {
        //xfjianpan(id),当id为input的id，如果id==false时，键盘隐藏
        var jpnub = $("#xfjp td").length;
        move("jianpan");        //开启键盘可移动
        $("#xfjp td").unbind("click");
        if (idobj != false) {
            var xfjp_text = $(idobj).val();
            //获取input框当前的val值
            $(".input_on").removeClass("input_on");
            $(idobj).addClass("input_on");                         //设置input框选中时的样式
            $("#jptitle").html($(idobj).attr("placeholder"));      //键盘标题，自动获取input的placeholder值
            $("#xfjp td").click(function () {
                var click = $(this).html();                         //获取点击按键的内容
                //特殊按键在这添加事件
                //判断点击的按键是否有特殊事件，如果没有则按键内容加在input文本后面
                if (click == "清空") {
                    xfjp_text = "";
                    $(idobj).val(xfjp_text);
                }  else {
                		InsertString(idobj, click);
                    //xfjp_text = $(idobj).val();
                    //xfjp_text = xfjp_text + click;
                   // $(idobj).val(xfjp_text);
                }
               // $(idobj).focus();
            })
        } else {
            $(".input_on").removeClass("input_on");                    //移除选中input的选中样式
            $("#jianpan").hide();
        }
    }
    function rjpshow()
    {
         $("#jianpan").show();
    }

    //鼠标按住拖动部分JS
    function unmove(obj) {
        $("#" + obj + " .title").unbind("mousedown");
    }
    function move(obj) {
        var OffsetX = 0;
        var OffsetY = 0;
        var moveKg = false;
        var csZ = 0;
        function d(id) {
            return document.getElementById(id);
        }
        $("#" + obj + " .title").bind("mousedown", function () {
            OffsetX = event.pageX - d(obj).offsetLeft;
            OffsetY = event.pageY - d(obj).offsetTop;
            csZ = $("#" + obj).css("z-index");
            $("#" + obj).css("z-index", "9999");
            moveKg = true;
            jpyd();
        })
        function jpyd() {
            $(document).bind("mousemove", function () {
                var e = e || window.event;
                var mouswX = e.pageX;
                var mouswY = e.pageY;
                var moveX = mouswX - OffsetX;
                var moveY = mouswY - OffsetY;
                var maxX = $(window).width() - d(obj).offsetWidth;
                var maxY = $(window).height() - d(obj).offsetHeight;
                moveX = Math.min(maxX, Math.max(0, moveX));
                moveY = Math.min(maxY, Math.max(0, moveY));
                $("#" + obj).css({"left": moveX, "top": moveY});
            })
            $(document).bind("mouseup", function () {
                moveKg = false;
                $("#" + obj).css("z-index", csZ);
                $(document).unbind("mousemove mouseup");
            })
        }
    }
</script>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/jcgl/ypjc/edit.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        jcxxlr.setPath("<%=request.getContextPath() %>");
        jcxxlr.init("<%=id%>", "<%=uuid%>");
    });
</script>