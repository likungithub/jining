<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%

    String khdm = request.getParameter("khdm");
    if (khdm == null) {
        khdm = "";
    }
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String type = request.getParameter("type");
    if (type == null) {
        type = "khxx";
    }

    String come = request.getParameter("come");
    if (come == null) {
        come = "0";
    }
%>

<style>
    #customerManageEditForm .chargeorderM,
    #customerManageEditForm .manager-container-sl {
        margin: 0;
    }

    #customerManageEditForm .titleInfo {
        margin-left: 16px;
        margin-right: 16px;
        background: #E7F2F8;
    }

    #customerManageEditForm .titleInfo .titleSty {
        border-left: 5px solid #53A9FC;
        padding-left: 5px;
    }

    #customerManageEditForm .contentSty {
        width: 675px;
        padding: 15px 0 3px;
    }

    #customerManageEditForm ul,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    #customerManageEditForm .zg {
        width: 555px !important;
    }

    #customerManageEditForm .kehufenlei .input-group .select2-container--bootstrap {
        width: 206px !important;
    }

    #customerManageEditForm .kehuzhuguan .input-group .select2-container--bootstrap {
        width: 533px !important;
    }

    #customerManageEditForm .kehufenlei .select2-container--bootstrap .select2-selection--single {
        width: 158px !important;
        border: 1px solid #e5e5e5 !important;
        /*border-radius: 0 4px 4px 0 !important;*/
        height: 33px;
        outline: none;
        text-indent: 10px;
        float: left;
        font-size: 12px;
        line-height: 20px;
        color: #666;
    }

    #customerManageEditForm .zhengzhishui .select2-container--bootstrap .select2-selection--single {
        width: 202px !important;
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px;
        outline: none;
        text-indent: 10px;
        float: left;
        font-size: 12px;
        line-height: 20px;
        color: #666;
    }

    #customerManageEditForm .suozaidiqu .select2-container--bootstrap .select2-selection--single {
        width: 202px !important;
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px;
        outline: none;
        text-indent: 10px;
        float: left;
        font-size: 12px;
        line-height: 20px;
    }

    #customerManageEditForm .suozaidiqu .input-group .select2-container--bootstrap {
        margin-right: 51px;
        border-radius: 4px !important;
    }

    .suozaidiqu .select2-container--bootstrap .select2-selection--single:nth-child(2) {
        border-bottom-left-radius: 4px !important;
        border-top-left-radius: 4px !important;
    }

    #customerManageEditForm .suozaidiqu .select2-container--bootstrap .select2-selection--single {
        width: 202px !important;
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px;
        outline: none;
        text-indent: 10px;
        float: left;
    }

    #customerManageEditForm #suozaidiquM #loc_city + .select2-container {
        width: 295px!important;
        margin-right: 0;
    }

    #customerManageEditForm #suozaidiquM #loc_city + .select2-container .select2-selection--single {
        width: 300px!important;
    }

    #customerManageEditForm #suozaihangyeM #DL + .select2-container {
        width: 295px!important;
        margin-right: 0;
    }

    #customerManageEditForm #suozaihangyeM #DL + .select2-container .select2-selection--single {
        width: 300px!important;
    }

    #customerManageEditForm .kehuzhuguan .select2-container--bootstrap .select2-selection--single {
        width: 533px !important;
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px;
        outline: none;
        text-indent: 10px;
        float: left;
    }

    #customerManageEditForm p {
        margin: 0px !important;
    }
    #customerManageEditForm>.form-body{
        padding: 0!important;
    }
    #customerManageEditForm .portlet-form .form-body,
    #customerManageEditForm .form .form-body {
        padding-top: 15px;
    }

    #customerManageEditForm  .o-m {
        background: #f8f8f8;
    }

    #customerManageEditForm   .o-m .ul-o {
        float: left;
        width: 170px;
        position: relative;
        background: #f9f9f9;
        height: 544px;
        border-right: 1px solid #ddd
    }

    #customerManageEditForm   .o-m .ul-o li {
        width: 100%;
        cursor: pointer;
        position: relative;
        z-index: 2
    }

    #customerManageEditForm  .o-m .ul-o li p {
        float: left;
        line-height: 36px;
        color: #666;
        font-size: 14px;
        width: 100%;
        text-align: center;
        position: relative
    }

    #customerManageEditForm  .o-m .ul-o li p i {
        width: 0;
        position: absolute;
        top: 9px;
        height: 0;
        right: -1px;
        display: block;
        border-top: 10px solid transparent;
        border-right: 13px solid #fff;
        border-bottom: 10px solid transparent;
        display: none;
    }

    #customerManageEditForm   .o-m .ul-o li.on b {
        display: block;
    }

    #customerManageEditForm   .o-m .ul-t {
        background: #fff;
        margin-left: 170px;
        padding-top: 12px;
    }

 #customerManageEditForm   .o-m .ul-t>li {
        list-style-type: none;
        position: relative;
        display: none;
    }

    #customerManageEditForm   .o-m .ul-t .li-top {
        padding: 25px 0 0 50px;
    }

    #customerManageEditForm   .o-m .ul-t h5 {
        color: #666;
        font-size: 24px;
        line-height: 38px;
    }

    #customerManageEditForm   .o-m .ul-t p {
        color: #999;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 5px
    }

    #customerManageEditForm   .o-m .ul-t .li-a a {
        color: #2b91b8;
        font-size: 14px;
        margin-right: 30px;
        cursor: default;
        line-height: 22px;
    }

    #customerManageEditForm   .o-m .ul-t .li-a span {
        color: #999;
        font-size: 14px
    }

    #customerManageEditForm   .o-m .ul-t .li-img {
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 0;
    }


    #customerManageEditForm  .active1 {
        background: #10A0F7;
        color: #fff !important;
    }

    #customerManageEditForm   .sectext {
        height: 34px;
        line-height: 34px;
    }

    #customerManageEditForm  .addNum {
        background: transparent !important;
        border: none;
        margin-top: 8px;
        margin-left: -15px;
        outline: none;
    }

    #customerManageEditForm   .fa-plus-square:before {
        color: #10A0F7 !important;
    }

    #customerManageEditForm  .li-mask {
        text-align: center;
        float: left;
        margin-left: 27px;
        margin-top: 15px;
    }

    #customerManageEditForm  .o-m .ul-t #contractForm,
    #customerManageEditForm  .o-m .ul-t>li:nth-child(6) table thead th:nth-child(5),
    #customerManageEditForm  .o-m .ul-t>li:nth-child(6) table tbody td:nth-child(5),
    #customerManageEditForm  .o-m .ul-t>li:nth-child(6) table thead th:nth-child(7),
    #customerManageEditForm   .o-m .ul-t>li:nth-child(6) table tbody td:nth-child(7),
    #customerManageEditForm  .o-m .ul-t>li:nth-child(6) table thead th:nth-child(8),
    #customerManageEditForm  .o-m .ul-t>li:nth-child(6) table tbody td:nth-child(8),
    #customerManageEditForm   .o-m .ul-t>li:nth-child(6) table thead th:nth-child(10),
    #customerManageEditForm  .o-m .ul-t>li:nth-child(6) table tbody td:nth-child(10) {
        display: none;
    }

    #customerManageEditForm  .o-m .ul-t>li:nth-child(7) .chargeorderM .portlet.light.bordered,
    #customerManageEditForm  .o-m .ul-t>li:nth-child(7) .chargeorderM div.table-toolbar {
        border: none!important;
    }

    #customerManageEditForm   .o-m .ul-t>li:nth-child(7) {
        overflow: auto;
    }

    #customerManageEditForm  .o-m .ul-t>li:nth-child(7) #chargeorder_data {
        width: 100%;
    }

    #customerManageEditForm   .o-m .ul-t li:nth-child(6) div.portlet {
        border: none!important;
    }

    #customerManageEditForm   .o-m .ul-t li:nth-child(6) .dataTables_wrapper {
        width: 100%!important;
    }

    #customerManageEditForm   .o-m .ul-t li:nth-child(6) table {
        width: 100%!important;
    }
    /* .select2-container--bootstrap .select2-selection--single {
height: 34px;
line-height: 1.42857;
padding: 6px 24px 6px 12px;
border: 1px solid #e5e5e5;
border-radius: 4px !important;
width:533px !important;
} */

    #customerManageEditForm   #szData_wrapper {
        overflow: auto;
    }

    #customerManageEditForm .select2-container--bootstrap .select2-selection {
        font-size: 12px;
        line-height: 21px;
    }

    #customerManageEditForm label {
        color: #666;
    }

    #customerManageEditForm .select2-container--bootstrap .select2-selection--single .select2-selection__placeholder {
        font-size: 12px;
    }

    #customerManageEditForm .select2-selection .select2-selection--single:nth-child(2) {
        background: red;
        border-top-left-radius: 4px !important;
        border-bottom-left-radius: 4px !important;
    }

    #customerManageEditForm #chargeOrderSearch {
        display: none;
    }

    #customerManageEditForm .col-new12 {
        width: 721px;
        padding-left: 33px;
    }

    #customerManageEditForm  .manager-container-sl   .portlet.light {
        padding: 12px 20px 15px 20px!important;
        background-color: #fff;
    }

    #customerManageEditForm .zgkj.suozaidiqu .select2-container--bootstrap .select2-selection--single {
        width: 155px !important;
    }

    /*  !*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*!
::-webkit-scrollbar
{
width: 10px;
height: 10px;
background-color: #F5F5F5;
}

!*定义滚动条轨道 内阴影+圆角*!
::-webkit-scrollbar-track
{
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
border-radius: 10px;
background-color: #F5F5F5;
}

!*定义滑块 内阴影+圆角*!
::-webkit-scrollbar-thumb
{
border-radius: 10px;
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
background-color: #555;
}*/
</style>
<script>
    $(document).ready(function() {
        $(".month").hide();
        $("#Chinese").hide();
        $("#selectSbzq").change(function() {
            if ($(this).val() == 004) {
                $(".month").show();
                $("#Chinese").show();
            } else {
                $(".month").hide();
                $("#Chinese").hide();
            }
        });
        $("#selectBsy").change(function() { // 选择月份后
            var month = $("#selectBsy").val();
            $("#selectBsrq").empty();
            $.ajax({
                url: '/customermanage/customerManage/getDaysByMonth/' + month,
                dataType: 'TEXT',
                type: 'GET',
                success: function(dataghs) {
                    if (dataghs != "") {
                        var days = dataghs.split(',');
                        $("#selectBsrq").append("<option></option>")
                        for (var i = 0; i < days.length; i++) {
                            $("#selectBsrq").append("<option value='" + days[i] + "'>" + days[i] + "</option>");
                        }
                    }
                    $('#selectBsrq').select2({
                        placeholder: '报税日',
                        width: '100%',
                        allowClear: true,
                        language: 'zh-CN'
                    });
                }
            });
        })
    })
</script>
<form action="#" id="customerManageEditForm" class="form form-horizontal clearfix" style="height: 100%">
    <div class="form-body" style="height: 100%">
        <div class="o-m" style="position: relative;height: 100%">
            <div class="ul-o" style="height: 100%">
                <ul>
                    <li class="li-o clearfix" style="margin-top: 11px">
                        <p class="active1 edit-jbzl">基本资料<i style="display:block" class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b></li>
                    <li class="li-t clearfix">
                        <p>联系方式<i class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b></li>
                    <li class="li-s clearfix">
                        <p>税务资料<i class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b></li>
                    <li class="li-f clearfix" id="lmfkhztxy" style="margin-bottom: 60px">
                        <p>客户状态<i class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b></li>
                    <li class="li-f clearfix" style="border-top: 1px solid #dadada;border-bottom: 1px solid #dadada;">
                        <p style="line-height: 60px">证件收取<i style="top: 20px;" class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b></li>
                    <li class="li-f clearfix">
                        <p>合同信息<i class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b></li>
                    <li class="li-f clearfix">
                        <p>收费信息<i class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b></li>
                    <li class="li-f clearfix">
                        <p>服务信息<i class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b>
                    </li>
                    <li class="li-f clearfix">
                        <p class=" edit-gtjl">沟通记录<i class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b>
                    </li>
                    <div class="li-mask" style="position: absolute;top: 152px;left: 7px;">
                        <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" style="width: 110px;" name="addfiles" id="addfiles" type="button">添加附件
                        </button>
                    </div>
                    <div class="li-mask" style="position: absolute;top: 195px;left: 7px;">
                        <div id="hideBtn" hidden="hidden"><button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" name="changApp" id="changApp" type="button" style="width: 110px;">APP账户修改</button></div>
                    </div>
                </ul>
            </div>
            <div class="ul-t" style="height: 100%;overflow-x: hidden;">
                <li style="display:block">
                    <div class="titleInfo row" style="margin-left:16px;margin-bottom: 15px ">
                        <div class="col-xs-12">
                            <div class="h5 titleSty" style="display: inline-block">公司基本信息</div>
                            <i class="glyphicon glyphicon-menu-up clickSlideDown1" style="float: right;font-size: 20px;margin-top: 10px;cursor: pointer;color: #10A0F7;"></i>
                        </div>
                    </div>
                    <div class="contentSty clickSlideDownC1" style="padding-top: 0">
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12 ">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            <span class="colorRed"> * </span>税务登记号</label>
                                        <input type="text" class="inputCommon" name="nsrsbh" style="width:157px;border-bottom-right-radius: 0px !important;border-top-right-radius: 0px !important;">
                                        <span class="input-group-btn">
                                <button class="btn default" type="button" id="nsrsbh" data-toggle="tooltip" title="查询提取手机端已录入数据" style="border-bottom-right-radius: 4px !important;height: 33px;
                                    border-top-right-radius: 4px !important;height: 33px;background: #dedede;color: #666;">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">公司简称</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" style="width:197px !important;" name="gsjc">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            <span class="colorRed"> * </span>公司名称</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="gsmc">
                                    </div>
                                    <div class="col-md-6 kehufenlei">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            客户分类</label>
                                        <select id="customerStyle"></select>
                                        <button class="btn default" type="button" id="khflAdd" title="新增客户分类" style="border-bottom-right-radius: 4px !important;
                                 border-top-right-radius: 4px !important;height: 33px">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group suozaidiqu" id="suozaihangyeM">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            所在行业</label>
                                        <select id="ML" style="width:186px;">
                                        </select>
                                        <select id="DL" style="width:186px;">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group suozaidiqu" id="suozaidiquM">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            所在地区</label>
                                        <select id="loc_province" style="width:186px;">
                                        </select>
                                        <select id="loc_city" style="width:186px;">
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <label class="labelCommon labelWidth-col-two labelBg color666" style="margin-left: 15px">
                                        <%--<span class="colorRed"> * </span>--%>证件类型</label>
                                    <select id="IDType" style="float: left;border: 1px solid #dadada; height: 33px;width: 200px;margin-right: 36px">
                                        <option value="000">请选择证件类型</option>
                                        <option value="001">居民身份证</option>
                                        <option value="002">中国人民解放军军人身份证件</option>
                                        <option value="003">中国人民武装警察身份证件</option>
                                        <option value="004">港澳居民来往内地通行证</option>
                                        <option value="005">台湾人民来往大陆通行证</option>
                                        <option value="006">外国公民护照</option>
                                    </select>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="sfzh" placeholder="证件号" style="width:300px!important;">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            法人代表</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="frdb">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            海关代码</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="hgdm">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            营业执照号</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="yyzz">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            组织机构码</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="zzjgdm">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666 pull-left">
                                            成立日期</label>
                                        <div class="input-group date createDate">
                                            <input type="text" class="form-control starttime inputCommon" readonly="readonly" name="createDate" style="width:150px;border-bottom-right-radius: 0px !important;
                                    border-top-right-radius: 0px !important;font-size:12px;    font-size: 12px;
                                    width: 154px !important;
                                    background: #fff !important;"> <span>
                                    <button class="btn btn-default" type="button" style="width:45px;border-bottom-right-radius: 4px !important;
                                        border-top-right-radius: 4px !important;height: 33px;">
                                        <i class="fa fa-calendar"></i>
                                    </button>
                                </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6" style="    position: relative; left: -5px;">
                                        <label class="labelCommon labelWidth-col-two labelBg color666 pull-left" style="font-size:12px;margin-left:5px;">
                                            开始代账日期</label>
                                        <div class="input-group date startDate">
                                            <input type="text" class="form-control starttime inputCommon" readonly="readonly" name="startDate" style="width: 157px;font-size: 12px;background:#fff !important;">
                                            <span class="input-group-btn pull-left">
                                    <button class="btn btn-default" type="button" style="border-bottom-right-radius: 4px !important;
                                        border-top-right-radius: 4px !important;height: 33px;">
                                        <i class="fa fa-calendar"></i>
                                    </button>
                                </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="titleInfo row" style="margin-left:16px;margin-bottom: 15px">
                        <div class="col-xs-12">
                            <div class="h5 titleSty" style="display: inline-block">公司注册信息</div>
                            <i class="glyphicon glyphicon-menu-up clickSlideDown2" style="float: right;font-size: 20px;margin-top: 10px;cursor: pointer;color: #10A0F7;"></i>
                        </div>
                    </div>
                    <div class="contentSty clickSlideDownC2" style="padding-top: 0">
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            注册资金</label>
                                        <input type="text" class="inputCommon" name="zczj" style="width: 155px;" onKeyup="value=test2(value)?value:''">
                                        <label class="labelCommon labelWidth-col-two labelBg color666" style="border-right: 1px solid #ccc !important;
                                border-radius: 0px !important;
                                border-top-right-radius: 4px !important;
                                border-bottom-right-radius: 4px !important;width: 50px !important;
                                border-left: 0px !important;">
                                            万元</label>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            公司备用名称</label>
                                        <input type="text" i class="inputCommon inputWidth-col-two" name="bygsmc">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div>
                                <div class="input-group" style="margin-left: 49px;">
                                    <div>
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            注册地址</label>
                                        <input type="text" class="inputCommon " name="zcdz" style="width: 536px">
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div>
                                <div class="input-group" style="margin-left: 49px;">
                                    <div>
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            经营范围</label>
                                        <input type="text" class="inputCommon " name="jyfw" style="width: 536px">
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            备注信息</label>
                                        <input type="text" class="inputCommon " style="width: 536px!important" name="bzxx">
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="titleInfo row" style="margin-left:16px ">
                        <div class="col-xs-12">
                            <div class="h5 titleSty">服务人员信息</div>
                        </div>
                    </div>
                    <div class="contentSty">
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6 suozaidiqu zgkj">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            <span class="colorRed"> * </span>主管会计</label>
                                        <select name="gjr" class="inputCommon inputWidth-col-one zg" id="gjr" style="width:186px;" data-error-container="#form_resource_error">
                                        </select>
                                        <label class="labelCommon labelWidth-col-two labelBg color666" style="border-right: 1px solid #ccc !important;
                                border-radius: 0px !important;
                                border-top-right-radius: 4px !important;
                                border-bottom-right-radius: 4px !important;width: 50px !important;
                                border-left: 0px !important;">
                                            调户</label>
                                    </div>
                                    <div class="col-md-6 suozaidiqu">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            <span class="colorRed"> * </span>客户经理</label>
                                        <select name="khjl" class="inputCommon inputWidth-col-one zg" id="khjl" style="width:186px;" data-error-container="#form_resource_error">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            推荐人</label>
                                        <input id="tjrmcSl" type="text" class="inputCommon inputWidth-col-two" name="tjrmc">
                                        <input id="tjrmcSl1" type="hidden" class="inputCommon inputWidth-col-two" name="tjrdm">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            外部推荐人</label>
                                        <input type="text" id="wbtjrmc" class="inputCommon inputWidth-col-two" name="wbtjrmc">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="IncreaseInfoWrapLi">
                    <div class="titleInfo row" style="margin-left:16px ">
                        <div class="col-xs-12">
                            <div class="h5 titleSty">联系人信息</div>
                        </div>
                    </div>
                    <div class="contentSty">
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            <span class="colorRed"> * </span>联系人</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="lxr">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            办公电话</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="bgdh">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            <span class="colorRed"> * </span>手机号码</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="sjhm">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            传真号码</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="czhm">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            QQ</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="qq">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            email</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="email">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            其他</label>
                                        <input type="text" class="inputCommon" name="qt" style="width: 538px">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 kehufenlei col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            详细地址</label>
                                        <input type="text" class="inputCommon" name="xxdz" style="width: 538px">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="IncreaseInfoWrap">
                        <div class="titleInfo row" style="margin-left:16px ">
                            <div class="col-xs-12">
                                <div class="h5 titleSty" style="display: inline-block">股东信息</div>
                                <i class="glyphicon glyphicon-plus IncreaseInfo" title="增加股东信息" style="float: right;font-size: 20px;margin-top: 10px;cursor: pointer;color: #10A0F7;"></i>
                            </div>
                        </div>
                        <div class="contentSty">
                            <div class="row form-group">
                                <div class="col-md-12">
                                    <div class="input-group col-md-12">
                                        <div class="col-md-6" style="padding: 0">
                                            <label class="labelCommon labelWidth-col-two labelBg color666" style="margin-left: 32px">
                                                股东姓名</label>
                                            <input type="text" class="inputCommon inputWidth-col-two" name="gdxm">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="labelCommon labelWidth-col-two labelBg color666">
                                                身份证</label>
                                            <input type="text" class="inputCommon inputWidth-col-two" name="gdsfzh">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-md-12">
                                    <div class="input-group col-md-12">
                                        <div class="col-md-4" style="padding: 0">
                                            <label class="labelCommon  labelBg color666" style="width: 75px;margin-left: 31px">
                                                手机号码</label>
                                            <input type="text" class="inputCommon " name="gddh" style="width: 118px">
                                        </div>
                                        <div class="col-md-5" style="padding: 0">
                                            <label class="labelCommon  labelBg color666" style="width: 75px;margin-left: 32px">
                                                邮箱</label>
                                            <input type="text" class="inputCommon " name="gdyx" style="width: 159px">
                                        </div>
                                        <div class="col-md-3">
                                            <label class="labelCommon  labelBg color666" style="width: 63px">
                                                占股比例</label>
                                            <input type="text" class="inputCommon " name="gdzgbl" style="width:66px;" onKeyup="value=test(value)?value:''">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="titleInfo row" style="margin-left:16px ">
                        <div class="col-xs-12">
                            <div class="h5 titleSty">房东信息</div>
                        </div>
                    </div>
                    <div class="contentSty">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6" style="padding: 0">
                                        <label class="labelCommon labelWidth-col-two labelBg color666" style="margin-left: 32px">
                                            房东姓名</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="fdxm">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            身份证</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="fdsfzh">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="contentSty">
                        <div class="row form-group">
                            <div class="col-md-12 zhengzhishui col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            增值税性质</label>
                                        <select id="zzsxz"></select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            税率</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="sl" style="width: 151px !important;" onKeyup="value=test(value)?value:''">
                                        <label class="labelCommon labelWidth-col-two labelBg color666" style="border-right: 1px solid #ccc !important;
                                border-radius: 0px !important;
                                border-top-right-radius: 4px !important;
                                border-bottom-right-radius: 4px !important;width: 50px !important;
                                border-left: 0px !important;">
                                            %</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            纳税人编码</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="nsrbm">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="labelCommon labelWidth-col-two labelBg color666" style="font-size: 13px;">
                                            主管税务分局</label>
                                        <input type="text" class="inputCommon inputWidth-col-two" name="zgswfj">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group col-md-12">
                                    <div class="col-md-12">
                                        <label class="labelCommon labelWidth-col-two labelBg color666">
                                            备注</label>
                                        <input type="text" class="inputCommon" name="swzlbz" style="width: 538px">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 税务资料选择  -->
                        <!-- 税务资料选择  -->
                        <div class="row form-group">
                            <div class="col-md-12 col-new12">
                                <div class="input-group">
                                    <div style="width: 100px;margin-left:16px;float:left;">
                                        <select name="selectSz" class="form-control" id="selectSz" data-error-container="#form_resource_error">
                                            <option></option>
                                        </select>
                                    </div>
                                    <div style="width: 100px;margin-left:16px;float:left;">
                                        <select name="selectSbzq" class="form-control" id="selectSbzq" data-error-container="#form_resource_error">
                                            <option value="001">月报</option>
                                            <option value="002">季报</option>
                                            <!-- <option value="003">半年报</option> -->
                                            <option value="004">年报</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2 month">
                                        <select name="selectBsrq" class="form-control col-md-3" id="selectBsy" data-error-container="#form_resource_error">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                    </div>
                                    <div class="sectext" style="    display: block;  width: 8px;  float: left;" id="Chinese">月
                                    </div>

                                    <div class="col-md-2">
                                        <select name="selectBsrq" class="form-control col-md-3" id="selectBsrq" data-error-container="#form_resource_error">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2 sectext">日前报税</div>

                                    <div class="col-md-1">
                                        <button type="button" class="addNum borderNone bgNone" id="szAdd"><i
                                                class="fa fa-plus-square" style="font-size:30px;" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <!-- <div class="col-md-1">
                 <label>税税通账号</label>
                     <input type="text" id="taxtaxUserName">
             </div>
             <div class="col-md-1">
                     <label>税税通密码</label>
                     <input type="text" id="taxtaxPassword">
              </div> -->
                                </div>
                            </div>
                        </div>
                        <!-- 税务资料table区域 -->
                        <div class="row">
                            <div class="col-md-12 col-new12" style="overflow: auto;height:200px;">
                                <div class="col-md-12">
                                    <table class="table table-striped table-bordered table-hover" cellspacing="0" width="100%" id="szEditData">
                                        <thead>
                                        <tr>
                                            <th width="0%"></th>
                                            <th width="30%"></th>
                                            <th width="0%"></th>
                                            <th width="20%"></th>
                                            <th width="20%"></th>
                                            <th width="20%"></th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="contentSty">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label col-md-2">关联状态：</label>
                                    <div class="col-md-4">
                                        <div class="radio-list" data-error-container="#form_enable_error">
                                            <label class="radio-inline"> <input type="radio"
                                                                                name="qyzt" value="true" disabled> 已关联
                                            </label> <label class="radio-inline"> <input type="radio"
                                                                                         name="qyzt" value="false" disabled>
                                            未关联
                                        </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label col-md-2">服务状态：</label>
                                    <div class="col-md-4">
                                        <div class="radio-list" data-error-container="#form_enable_error">
                                            <label class="radio-inline"> <input type="radio"
                                                                                name="fwzt" value="true"> 启用服务
                                            </label> <label class="radio-inline"> <input type="radio"
                                                                                         name="fwzt" value="false"> 停止服务
                                        </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label col-md-2">账套创建：</label>
                                    <div class="col-md-4">
                                        <div class="radio-list" data-error-container="#form_enable_error">
                                            <label class="radio-inline"> <input type="radio"
                                                                                name="ztzt" value="true"> 创建
                                            </label> <label class="radio-inline"> <input type="radio"
                                                                                         name="ztzt" value="false"> 不创建
                                        </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label col-md-2">客户级别：</label>
                                    <div class="col-md-4">
                                        <div class="radio-list" data-error-container="#form_enable_error">
                                            <label class="radio-inline"> <input type="radio"
                                                                                name="khjb" value="A"> A级
                                            </label> <label class="radio-inline"> <input type="radio"
                                                                                         name="khjb" value="B"> B级
                                        </label> <label class="radio-inline"> <input type="radio"
                                                                                     name="khjb" value="C"> C级
                                        </label> <label class="radio-inline"> <input type="radio"
                                                                                     name="khjb" value="D"> D级
                                        </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="ifktapp" hidden="hidden">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label col-md-2">开通APP：</label>
                                    <div class="col-md-4">
                                        <div class="radio-list" data-error-container="#form_enable_error">
                                            <label class="radio-inline"> <input type="radio"
                                                                                name="ktapp" value="true"> 开通
                                            </label> <label class="radio-inline"> <input type="radio"
                                                                                         name="ktapp" value="false"> 不开通
                                        </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="ifktappmm" hidden="hidden">
                            <div class="col-md-12">
                                <div class="form-group" style="margin-left: 31px;">
                                    <p style="color: #ff0000;">注：客户APP开通后，客户首次登录请通过输入手机号使用验证码的方式登录并设置账号。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li></li>
                <li style="overflow: hidden;padding:0 15px 15px 15px"></li>
                <li></li>
                <li>
                    <div>
                       <%-- <div class="col-md-12 col-new12">
                            <div class="input-group col-md-12" style="margin-bottom: 10px">
                                <div class="col-md-6" style="padding: 0">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        客户录入人</label>
                                    <input type="text" class="inputCommon inputWidth-col-two khlrrM" readonly style="cursor: not-allowed;width: 220px">
                                </div>
                                <div class="col-md-6"  style="padding: 0">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        主管会计</label>
                                    <input type="text" class="inputCommon  khzgM" readonly style="cursor: not-allowed;width: 220px">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="col-md-12" style="width: 735px">
                                <label class="labelCommon labelWidth-col-two labelBg color666 " style="margin-left: 3px;height: 33px;line-height: 33px">
                                    派工人员</label>
                                <textarea class="inputCommon  rwzxryM" style="line-height: 26px;height: 33px;width: 557px" readonly style="cursor: not-allowed"></textarea>
                            </div>
                        </div>--%>
                        <style>
                            #customerManageServiceInfo
                            {
                                border: 1px solid #dedede;
                                margin: 15px 30px;
                                width: 96.3333333%;
                                padding: 0;
                                border-radius: 4px!important;
                            }
                            #customerManageServiceInfo .wrapAll
                            {
                                background: #f9f9f9;
                                height: 40px;
                                line-height: 40px;
                                padding-left: 15px;
                            }

                            #customerManageServiceInfo .wrapAll>.wrap{
                                float: left;
                            }
                        </style>
                        <div class="col-md-12" id="customerManageServiceInfo">
                            <div class="wrapAll clearfix">
                                <div class="wrap">
                                    <span class="h5">客户经理：</span><span class="khjl"></span>
                                </div>
                                <div class="wrap ml">
                                    <span class="h5 ml">客户录入人：</span><span class="khlrr"></span>
                                </div>
                                <div class="wrap ml">
                                    <span class="h5 ml">主管会计：</span><span class="zgkj"></span>
                                </div>
                                <div class="wrap ml">
                                    <span class="h5 ml">推荐人：</span><span class="tjr"></span>
                                </div>
                                <div class="wrap ml">
                                    <span class="h5 ml">外部推荐人：</span><span class="wbtjr"></span>
                                </div>
                            </div>
                            <div class="wrapAll clearfix" style="background: #fff">
                                <div class="wrap">
                                    <span class="h5">派工人员：</span><span class="pgry"></span>
                                </div>
                            </div>
                        </div>

                               <div class="col-md-12" style="width: 96.3333333%;margin: 15px 30px;padding: 0;">
                                   <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                       <table id="historyTaskByM" class="table table-striped table-bordered table-hover dataTable no-footer" cellspacing="0" width="100%" role="grid">
                                           <thead>
                                           <tr role="row">
                                               <th width="144px">任务编号</th>
                                               <th width="144px">任务名称</th>
                                               <th>开始时间</th>
                                               <th>结束时间</th>
                                               <th>剩余天数</th>
                                               <th>执行人</th>
                                           </tr>
                                           </thead>
                                       </table>
                                   </div>
                               </div>
                       <%-- <div class="col-md-12">
                            <div class="col-md-12">
                                <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                    <table id="historyTaskByM" class="table table-striped table-bordered table-hover dataTable no-footer" cellspacing="0" width="100%" role="grid">
                                        <thead>
                                        <tr role="row">
                                            <th width="144px">任务编号</th>
                                            <th width="144px">任务名称</th>
                                            <th>开始时间</th>
                                            <th>结束时间</th>
                                            <th>剩余天数</th>
                                            <th>执行人</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>--%>
                    </div>
                </li>
                <li id="communicationRecord">

                </li>
                <div class="contentSty text-center">
                    <a data-index="0" href="javascript:void(0)" class="btn btn btn btn-default btnBlue btnBorderColor colorfff borderRadius4 nextStep">
                        <i class="icon iconfont icon-xiayibu  iconMr"></i> 下一步
                    </a>
                    <a href="javascript:void(0)" id="editSaveKhxx" class="btn btn btn btn-default btnBlue btnBorderColor colorfff borderRadius4 saveFiles" style="display: none">
                        <i class="fa fa-save  iconMr"></i> 保存
                    </a>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
    <os:hasSecurityResource identifier="khzydmChangeBtn">
        <!-- 是否有主管会计修改的权限 -->
        <div id="editkhzydmChange"></div>
    </os:hasSecurityResource>
</form>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/customerManage/edit.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        var comeFlag = '<%=come%>';
//        点击消息提醒过来直接进入沟通记录界面
        if(comeFlag=="1"){
            //左边样式
            $(".edit-gtjl").addClass("active1");
            $(".edit-gtjl").children().css("display","inline");
            $(".edit-jbzl").removeClass("active1");
            $(".edit-gtjl").children().css("display","none");
            $(".contentSty.text-center a").addClass("hide")
            $(".o-m .ul-t> li").each(function (i,obj) {
                $(this).css("display","none");
                if((i+1)==$(".o-m .ul-t> li").length){
                    $("#communicationRecord").load('/customermanage/customerManage/communicationRecord.jsp?khbm='+'<%=khdm%>&id='+'<%=id%>')
                    $("#communicationRecord").css("display","list-item")
                }
            })

        }
        customerManageedit.setPath('<%=request.getContextPath()%>');
        customerManageedit.init('<%=khdm%>', '<%=id%>', '<%=type%>');

//       样式处理点击收缩
        $('#customerManageEditForm .clickSlideDown1').click(function () {
            if($(this).hasClass('glyphicon glyphicon-menu-up')){
                $(this).removeClass('glyphicon glyphicon-menu-up').addClass('glyphicon glyphicon-menu-down');
            }else{
                $(this).removeClass('glyphicon glyphicon-menu-down').addClass('glyphicon glyphicon-menu-up');
            }
            $('#customerManageEditForm .clickSlideDownC1').slideToggle(500);
        })
        $('#customerManageEditForm .clickSlideDown2').click(function () {
            if($(this).hasClass('glyphicon glyphicon-menu-up')){
                $(this).removeClass('glyphicon glyphicon-menu-up').addClass('glyphicon glyphicon-menu-down');
            }else{
                $(this).removeClass('glyphicon glyphicon-menu-down').addClass('glyphicon glyphicon-menu-up');
            }
            $('#customerManageEditForm .clickSlideDownC2').slideToggle(500);
        })
        $('#customerManageEditForm .IncreaseInfo').click(function () {
                $(this).parents('.IncreaseInfoWrap').clone(false,true).insertAfter($(this).parents('.IncreaseInfoWrap'))
                    .find('.IncreaseInfo')
                    .attr({
                        title: '删除该条股东信息'
                    })
                    .removeClass('glyphicon glyphicon-plus')
                    .addClass('glyphicon glyphicon-minus deleteGuDongInfo_M')
                    .end()
                    .find('input')
                    .val('');
            });
        $('#customerManageEditForm .IncreaseInfoWrapLi').on('click', '.deleteGuDongInfo_M', function() {
            $(this).parents('.IncreaseInfoWrap').remove();
        })
        $("#nsrsbh").click(function() {
            var v = $("input[name='nsrsbh']").val();
            if (v == null || v == "") {
                Messenger().post({
                    message: '请填写税务登记号之后点击查询！',
                    type: 'warning'
                });
            } else {
                $.ajax({
                    url: '/customermanage/ptkhxx/getInformation?nsrsbh=' + v + '&khbm=<%=khdm%>',
                    type: 'GET',
                    success: function(data) {
                        if (data.ztztDm) { //为true,有数据
                            $('input[name="lxr"]').val(data.yhmc); //联系人
                            $('input[name="gsmc"]').val(data.gsmc); //公司名称
                            $('input[name="sjhm"]').val(data.sjhm); //手机号码
                            $('input[name="frdb"]').val(data.frdb); //法人代表
                            $('input[name="bgdh"]').val(data.bgdh); //办公电话
                            $('input[name="czhm"]').val(data.czhm); //传真号码
                            $('input[name="yyzz"]').val(data.yyzz); //营业执照
                            $('input[name="qq"]').val(data.qq); //QQ
                            $('input[name="email"]').val(data.email); //email
                            $('input[name="xxdz"]').val(data.xxdz); //详细地址
                            Messenger().post({
                                message: '提取成功！',
                                type: 'warning'
                            });
                        } else {
                            Messenger().post({
                                message: '暂未查询到此客户信息，请手工录入！',
                                type: 'warning'
                            });
                        }
                    }
                });
            }
        });
    });
</script>
<script type="text/javascript">
    //商机跟进添加文件 单文件或多个文件
    function addChatFiles(data,addposition) {//addposition->0添加新文件  addposition->1沟通记录内添加文件
        if(data.length){//多文件
            $(data).each(function (i,obj) {
                addChatFilesProcess(obj,addposition);
            })
        }else if(data.length==0){
            return false;
        }else{//单条文件信息
            addChatFilesProcess(data,addposition);
        }
    }
    //单条文件录入过程
    function addChatFilesProcess(data,addposition) {//addposition->0添加新文件  addposition->1沟通记录内添加文件
        var FilesStr = "";
        var closeBtn = "";
        var FilesUrl=data.data+"……"+data.fileName;
        var ifImg = GetFileExt(data.fileName);
        if(ifImg==".png"||ifImg==".jpg"){
            FilesStr+='<p class="chat-item-files" FilesUrlItem="'+data.data+'……'+data.fileName+'" title="'+data.fileName+'"><a href="'+data.data+'" target="_blank"><img src="'+data.data+'" alt="'+data.fileName+'" ></a><span>'+data.fileName+'</span></p>'
        }else{
            FilesStr+='<p class="chat-item-files" FilesUrlItem="'+data.data+'……'+data.fileName+'" title="'+data.fileName+'"><a href="'+data.data+'" target="_blank"><i class="iconfont icon-genjinguanli" style="font-size: 22px;"></i></a><span>'+data.fileName+'</span></p>'
        }
        if(addposition == 0){
            $(".allWrapcommunicationRecord-files").append(FilesStr);
            var oldFileUrl = $(".allWrapcommunicationRecord-files").attr("FilesUrl");
            if(oldFileUrl!=""){
                var usefulFileUrl=oldFileUrl+","+FilesUrl
            }else{
                var usefulFileUrl=FilesUrl
            }
            $(".allWrapcommunicationRecord-files").attr("FilesUrl",usefulFileUrl);
            closeBtn+='<b class="chat-item-filesclose">x</b>'
            $(".allWrapcommunicationRecord-files .chat-item-files").append(closeBtn)
            $(".allWrapcommunicationRecord-files .chat-item-files .chat-item-filesclose").click(function () {
                $(".allWrapcommunicationRecord-files").attr("FilesUrl",delFilesUrl($(this).parents(".chat-item-files").attr("FilesUrlItem"),$(this).parents(".chat-item-files")))
                $(this).parents(".chat-item-files").remove()
            })
        }else if(addposition == 1){//聊天窗口内插入图片
            $(".floorHostFont-chat-item:last").find(".files-content").append(FilesStr)
            $(".floorHostFont-chat-item:last").find(".chat-item-files").attr("followUpid",data.followUpId)
            $(".floorHostFont-chat-item:last").find(".chat-item-files").attr("imgid",data.id)
//            $(".floorHostFont-chat-item:last").find(".files-content").attr("FilesUrl",FilesUrl);
            var oldFileUrl = $(".floorHostFont-chat-item:last").find(".files-content").attr("filesurl");
            if(oldFileUrl!=""){
                var usefulFileUrl=oldFileUrl+","+FilesUrl
            }else{
                var usefulFileUrl=FilesUrl
            }
            $(".floorHostFont-chat-item:last").find(".files-content").attr("filesurl",usefulFileUrl);
//            console.log($(".floorHostFont-chat-item:last").find(".files-content").attr("filesurl").split(","))
        }
    }
    //字符转转数组删除某元素再转回去
    function delFilesUrl(data,Dom) {
        // console.log(data)
        var FilesUrl =$(Dom).parents(".allWrapcommunicationRecord-files").attr("FilesUrl");
        var fileUrl = FilesUrl.split(",")
        for(var i=0; i<fileUrl.length; i++) {
            if(fileUrl[i] == data) {
                fileUrl.splice(i, 1);
                break;
            }
        }
        return fileUrl.join(",")
    }
    //取文件后缀名
    function GetFileExt(filepath) {
        if (filepath != "") {
            var pos = "." + filepath.replace(/.+\./, "");
            return pos;
        }
    }
    var myopenModal = function (title, url, type, data) {
        var dialogButtons = {};
        if(type=='communication'){
            dialogButtons.success = {
                label: '提&nbsp;交',
                className: "btn btn-default btnBlue borderRadius4 colorfff",
                callback: function () {
                    var blockTarget = $(".modal-content")
                    App.blockUI({
                        target: blockTarget,
                        boxed: true,
                        message: '正在保存数据...'
                    });
                    var FilesUrl =$(".allWrapcommunicationRecord-files").attr("FilesUrl");
                    if(!$('#communicationRecordtextarea').val()){
                        if (FilesUrl == undefined || FilesUrl == "") {
                            App.unblockUI(blockTarget);
                            Messenger().post({message: '请输入内容！', type: 'warning'});
                            return false;
                        }
                    }
                    var d = {};
                    var hflx;
                    d.khbm = '<%=khdm%>';
                    d.gtxx = $('#communicationRecordtextarea').val() == null? '':$('#communicationRecordtextarea').val();
//                   回复的时候做一下区分
                    if($('#communicationRecordsign').val()== 0 ){ //评论
                        hflx = '001';
                        d.hfid = 0;
                        d.ssid = 0;
                        d.hfxm =  '';
                        d.khmc =  localStorage.getItem('mdw_khmc');
                        d.hfzydm = '';
                    }else{ //回复
                        hflx = $('#communicationRecordhflx').val();
                        d.hfid = $('#communicationRecordsign1').val();
                        d.ssid = $('#communicationRecordsign2').val();
                        d.khmc =  localStorage.getItem('mdw_khmc');
                        d.hfxm = localStorage.getItem('replyhfxm');
                        d.hfzydm = localStorage.getItem('replyhfzydm');
                    }
                    d.if_tx = $('#checkboxRemind').is(':checked')?1:0;
                    if(FilesUrl!="" && FilesUrl != undefined){
                        d.fjUrl = FilesUrl;
                    }
                    $('#communicationRecordsign').val('0');
                    var gtsj = $('#communicateTime').val();
                    $.ajax({
                        url:'/customermanage/gtxx/addGtxx/' + gtsj+'/'+hflx,
                        dataType: 'JSON',
                        contentType: 'application/json; charset=utf-8',
                        data:JSON.stringify(d),
                        type:'POST',
                        success:function(d){
                            App.unblockUI(blockTarget);
                            var pic = d.data.grtx?d.data.grtx:'http://cloud-manager.oss-cn-beijing.aliyuncs.com/avatar/default2.png';
                            if(d.type==1){
                                $(
                                    '<div data-hflx="'+hflx +'" data-id='+d.data.id+' class="currentsubmitter pull-right animated bounceInDown floorHostFont-chat-item" FilesUrl="" style="padding: 10px 0;width: 600px;margin-right: 60px;position: relative;line-height:20px">'+
                                    '<img src="'+pic+'" alt="头像">'+
                                    '<div class="clearfix">'+
                                    '<span class="pull-right">'+moment(d.data.lrrq).format ('YYYY-MM-DD HH:mm')+'</span>'+
                                    '</div>'+
                                    '<div class="publishContent">'+
                                    '<div class="clearfix" style="margin-top: -5px;">'+
                                    '<i class="fa fa-times myclose currentPer" data-id='+d.data.id +'></i>'+
                                    '<span class="pull-right">沟通时间：'+
                                    moment(d.data.gtsj).format ('YYYY-MM-DD HH:mm')+
                                    '</span>'+
                                    '</div>'+
                                    '<div class="text-right">'+
                                    '<div>'+d.data.gtxx+'</div>'+
                                    '</div>'+
                                    '<div class="text-right">'+
                                    '<div class="files-content" filesurl=""></div>'+
                                    '</div>'+
                                    '</div>'+
                                    '</div>'
                                ).appendTo($('#allWrapcommunicationRecord>.top'));
                                addChatFiles(d.data.data,1)
                                $('#allWrapcommunicationRecord>.top').scrollTop( $('#allWrapcommunicationRecord>.top')[0].scrollHeight);
                                $('#communicationRecordtextarea').attr('placeholder','请输入沟通记录').val('');
//                                文件移除
                                $('.allWrapcommunicationRecord-files').find(".chat-item-files").remove();
                                $('.allWrapcommunicationRecord-files').attr("filesurl","");
                                //                    可输入字体数恢复到300
                                $('#communicationRecordtextareaWords').html(300);
                            }else{
                                $('#allWrapcommunicationRecord>.top').empty();
                                $.each(d.data,function(i,v){
                                    var ind = i;
                                    var pic = v.grtx?v.grtx:'http://cloud-manager.oss-cn-beijing.aliyuncs.com/avatar/default2.png';
                                    $(
                                        '<div class="floorHost pull-left animated bounceInDown floorHostFont-chat-item" FilesUrl="" style="margin: 10px 0;">'+
                                        '<div class="info" style="position:relative;margin-left: 60px">'+
                                        '<img src="'+pic+'" alt="头像">'+
                                        '<div class="mainInfo">'+
                                        '<div class="wrap1 clearfix">'+
                                        '<span class="hostName mr">'+v.name+'</span>'+
                                        '<span class="hostTime">'+moment(v.lrrq).format ('YYYY-MM-DD HH:mm')+'</span>'+
                                        '<a data-mykhmc="'+v.khmc+'"  data-myhfzydm="'+v.lrry+'" data-myname="'+v.name+'" data-sfid="'+v.id+'" href="javascript:void(0)" class="pull-right replyInfo replyFont" style="margin-right: 10px">回复</a>'+
                                        '</div>'+
                                        '<div class="wrap2">'+
                                        '<div class="timeInfo">'+
                                        '<span>沟通时间：</span>'+
                                        '<span>'+moment(v.gtsj).format ('YYYY-MM-DD HH:mm')+'</span>'+
                                        '</div>'+
                                        '<div class="infoContent">'+
                                        '<div>'+
                                        v.gtxx+
                                        '</div>'+
                                        '</div>'+
                                        '<div class="Enclosure">'+
                                        '<div class="files-content" filesurl=""></div>'+
                                        '</div>'+
                                        '</div>'+
                                        '</div>'+
                                        '</div>'+
                                        '</div>'
                                    ).appendTo($('#allWrapcommunicationRecord>.top'));
                                    addChatFiles(this.data,1)
                                    if(v.list){
                                        $.each(v.list,function(i,v){
                                            $(
                                                '<div class="replyInfo floorHostFont-chat-item" FilesUrl="" style="margin: 10px 0">'+
                                                '<div class="replyTop clearfix">'+
                                                '<span class="mr">'+v.lrmc+'回复'+v.hfxm+'</span>'+
                                                '<span>'+moment(v.lrrq).format ('YYYY-MM-DD HH:mm')+'</span>'+
                                                '<a  data-mykhmc="'+v.khmc+'"  data-myhfzydm="'+v.lrry+'" data-myname="'+v.name+'"  data-sfid="'+v.id+'" href="javascript:void(0)" class="pull-right replyInfo replyFont" >回复</a>'+
                                                '</div>'+
                                                '<div class="replyMid">'+
                                                '<div  class="replyFont">'+
                                                v.hfxx+
                                                '</div>'+
                                                '</div>'+
                                                '<div class="replyEnclosure">'+
                                                '<div class="files-content" filesurl=""></div>'+
                                                '</div>'+
                                                '</div>'
                                            ).appendTo($('#allWrapcommunicationRecord>.top>.floorHost:eq('+ind+')>.info'))
                                            if(this.data.length != 0){
                                                addChatFiles(this.data,1)
                                            }
                                        })
                                    }

                                })

                                $('#communicationRecordtextarea').attr('placeholder','请输入沟通记录').val('');
//                                文件移除
                                $('.allWrapcommunicationRecord-files').find(".chat-item-files").remove();
                                $('.allWrapcommunicationRecord-files').attr("filesurl","");
                                //                    可输入字体数恢复到300
                                $('#communicationRecordtextareaWords').html(300);

                            }


                        }
                    })

                    return false;
                }
            }
        }

        dialogButtons.cancel = {
            label: '<i class="fa fa-times"></i> 关&nbsp;闭 ',
            className: 'btn btn-default borderRadius4 color666',
            callback: function () {
                var FilesUrl =$(".allWrapcommunicationRecord-files").attr("FilesUrl");
                var d = {};
                if(FilesUrl!="" && FilesUrl != undefined){
                    d.fjUrl = FilesUrl;
                    $.ajax({
                        url:'/customermanage/gtxx/delFJ/',
                        dataType: 'JSON',
                        contentType: 'application/json; charset=utf-8',
                        data:JSON.stringify(d),
                        type:'POST',
                        success:function() {
                        }
                    });
                }
            }
        }

        $.get(url, function (html) {
             bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };



    var historyTaskByMGrid = null;
//    左侧标签栏的切换
    $('.o-m .ul-o >ul>li').click(function() {
        $('.ul-o .arrow').hide();
        var linum = $(this).index();
        if (linum==0||linum==1||linum==2){
            $('#customerManageEditForm .nextStep').removeClass('hide');
        }else{
            $('#customerManageEditForm .nextStep').addClass('hide');
        }
        if(linum==1||linum==2||linum==3||linum==4||linum==5||linum==6||linum==7){
            if (customerManageedit.validate1()===false){
                return
            }
        }
        if(linum==2||linum==3||linum==4||linum==5||linum==6||linum==7||linum==8){
            if (customerManageedit.validate1()===false){
                return
            }
            if (customerManageedit.validate2()===false){
                return
            }
        }

        $('#customerManageEditForm .nextStep').attr('data-index', linum);
        if (linum == 3) {
            $('#customerManageEditForm .saveFiles').show()
        } else {
            $('#customerManageEditForm .saveFiles').hide()
        }


        $('.o-m .ul-t> li').eq(linum).stop().show().siblings('li').hide();

        if (linum == 4) {
            $.get('/systemmanager/zjsq/list.jsp?khbm=' + '<%=khdm%>', function(d) {
                $('.o-m .ul-t >li').eq(linum).html(d);
            });
        }

        if (linum == 5) {
            $('.o-m .ul-t >li').eq(linum).load('<%=request.getContextPath()%>/contract/addContract.jsp?id=<%=khdm%>&type=customerLook');
        }
        if (linum == 6) {
            $('.o-m .ul-t>li').eq(linum).load('<%=request.getContextPath()%>/charge/list.jsp?khbm=<%=khdm%>&type=customerLook');
        }
        if (linum == 7) {
            $.get('/customermanage/ptkhxx/getPeople/' + '<%=khdm%>', function(d) {
                $('#customerManageServiceInfo  .khlrr').html(d.lrry);
                $('#customerManageServiceInfo  .zgkj').html(d.khzg);
                $('#customerManageServiceInfo  .pgry').html(d.pgry);
                $('#customerManageServiceInfo  .khjl').html(d.khjl);
                $('#customerManageServiceInfo  .wbtjr').html(d.wbtjr);
                $('#customerManageServiceInfo  .tjr').html(d.tjr);
            });
            taskDisGrid();
            //加载表中数据
            var InitTableDate = function() {
                $.ajax({
                    url: '/customermanage/ptkhxx/getKhRwjbxx/<%=khdm%>',
                    //dataType: 'JSON',
                    type: 'GET',
                    success: function(result) {
                        historyTaskByMGrid.clear().draw();
                        historyTaskByMGrid.rows.add(result).draw();
                    }
                });
            }();
        }
        if (linum == 8) {
            <%--myopenModal('沟通记录','/customermanage/customerManage/communicationRecord.jsp?khbm='+'<%=khdm%>','communication')--%>
            $("#communicationRecord").load('/customermanage/customerManage/communicationRecord.jsp?khbm='+'<%=khdm%>&id='+'<%=id%>')
        }
        $('.ul-o .arrow').eq(linum).show();
        $(this).children("p").addClass("active1").parents("li").siblings("li").children("p").removeClass();
    });

    $('#customerManageEditForm .nextStep').click(function() {
        $('.ul-o .arrow').hide();
        //1.当前的序号
        var Snum = $(this).attr('data-index');
        if (Snum == 0){
            if (customerManageedit.validate1()===false){
                return
            }
        }
        if (Snum==1){
            if (customerManageedit.validate2()===false){
                return
            }
        }

        if (Snum==0||Snum==1){
            $(this).removeClass('hide');
        }else{
            $(this).addClass('hide');
        }

        Snum++;
        if (Snum > 7) {
            Snum = 0;
        } else {

        }
        if (Snum == 3) {
            $('#customerManageEditForm .saveFiles').show()
        } else {
            $('#customerManageEditForm .saveFiles').hide()
        }
        $('.ul-o .arrow').eq(Snum).show();
        $('.ul-o .arrow').eq(Snum).parents('p').addClass('active1').end().parents('li').siblings('li').find('p').removeClass('active1');
        $(this).attr('data-index', Snum);
        $('.o-m .ul-t >li').eq(Snum).stop().show().siblings('li').hide();

        if (Snum == 4) {
            <%--$.get('/systemmanager/zjsq/list.jsp?khbm=' + '<%=khdm%>
            ', function(d) {--%>
            <%--$('.o-m .ul-t >li').eq(Snum).html(d);--%>
            <%--});--%>

            $('.o-m .ul-t >li').eq(Snum).load('/systemmanager/zjsq/list.jsp?khbm=' + '<%=khdm%>');
        }
        if (Snum == 5) {
            $('.o-m .ul-t >li').eq(Snum).load('<%=request.getContextPath()%>/contract/addContract.jsp?id=<%=khdm%>&type=customerLook');
        }
        if (Snum == 6) {
            $('.o-m .ul-t>li').eq(Snum).load('<%=request.getContextPath()%>/charge/list.jsp?khbm=<%=khdm%>&type=customerLook',function () {
                $('#customerManageEditForm #chargeorder_data input').attr({readonly:'readonly'});

            });
        }
        if (Snum == 7) {
            $.get('/customermanage/ptkhxx/getPeople/' + '<%=khdm%>', function(d) {
                $('.o-m .ul-t>li .khzgM').val(d.khzg);
                $('.o-m .ul-t>li .khlrrM').val(d.lrry);
                $('.o-m .ul-t>li .rwzxryM').val(d.pgry);
            });


            taskDisGrid();
            //加载表中数据
            var InitTableDate = function() {
                $.ajax({
                    url: '/customermanage/ptkhxx/getKhRwjbxx/<%=khdm%>',
                    //dataType: 'JSON',
                    type: 'GET',
                    success: function(result) {
                        historyTaskByMGrid.clear().draw();
                        historyTaskByMGrid.rows.add(result).draw();
                    }
                });
            }();
        }

    });



    function taskDisGrid() {
        historyTaskByMGrid = $('#historyTaskByM').DataTable({
            "dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
            "ordering": false,
            "destroy": true,
            "autoWidth": false,
            "lengthMenu": [10, 20, 50, 100],
            "language": {
                "zeroRecords": "暂时没有客户",
                "infoEmpty": "无记录",
                "sEmptyTable": "暂时没有客户",
                "info": "第_PAGE_页 (共_PAGES_页), 共_TOTAL_条记录"
            },
            "columns": [{
                "data": "rwid",
                class: 'text-center',
                render: function(data, type, row) {
                    return '<div title="' + data + '">' + data + '</div>';
                }
            }, {
                "data": "rwmc",
                class: 'text-center',
                render: function(data, type, row) {
                    return '<div title="' + data + '">' + data + '</div>';
                }
            }, {
                "data": "kssj",
                class: 'text-center',
                render: function(d) {
                    return moment(d).format('YYYY-MM-DD');
                }
            }, {
                "data": "jssj",
                class: 'text-center',
                render: function(d) {
                    return moment(d).format('YYYY-MM-DD');
                }
            }, {
                "data": "syts",
                class: 'text-center',
                render: function(data, type, row) {
                    if (parseInt(data) < 0) {
                        return '<span style="color:red">' + data + '</span>';
                    } else {
                        return data;
                    }
                }
            }, {
                "data": "zxryList",
                class: 'text-center',
                render: function(data, type, row) {
                    return '<div title="' + data + '">' + data + '</div>';
                }
            }]
        });
    };


    //下一步事件
    function goNext() {
        var e = $('p.active1').parent();
        var linum = e.index() + 1;
        $('.o-m .ul-o li').eq(linum).click();
    }

    /**
     * 只允许输入100以内整数
     */
    function test(num) {
        if (num <= 100) {
            var reg = /^(100|[1-9]\d|\d)$/;
            if (!num.match(reg)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }

    }

    function test2(num) {
        if (num <= 10000000000) {
            var reg = /^(|[1-9]\d{1,12}|\d)$/;
            if (!num.match(reg)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }

    }
    /* $(document).ready(function(){
     $("#selectSbzq").delegate("","click",function(){
     alert(1);
     alert($(this).html());
     })
     }) */
</script>