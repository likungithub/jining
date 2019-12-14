<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%

    String khdm = request.getParameter("khdm");
    if (khdm == null) {
        khdm = "";
    }
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
%>

<style>
    ul, li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .modal-dialog {
        width: 845px;
        overflow: hidden;
    }

    .modal-footer {
        padding-right: 40px !important;
    }

    .zg {
        width: 535px !important;
    }

    .kehufenlei .input-group .select2-container--bootstrap {
        width: 206px !important;
    }

    .kehuzhuguan .input-group .select2-container--bootstrap {
        width: 533px !important;
    }

    .kehufenlei .select2-container--bootstrap .select2-selection--single {
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

    .zhengzhishui .select2-container--bootstrap .select2-selection--single {
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

    .suozaidiqu .select2-container--bootstrap .select2-selection--single {
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

    .suozaidiqu .input-group .select2-container--bootstrap {
        margin-right: 51px;
        border-radius: 4px !important;
    }

    .suozaidiqu .select2-container--bootstrap .select2-selection--single:nth-child(2) {
        border-bottom-left-radius: 4px !important;
        border-top-left-radius: 4px !important;
    }

    .suozaidiqu .select2-container--bootstrap .select2-selection--single {
        width: 202px !important;
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px;
        outline: none;
        text-indent: 10px;
        float: left;

    }

    .kehuzhuguan .select2-container--bootstrap .select2-selection--single {
        width: 533px !important;
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px;
        outline: none;
        text-indent: 10px;
        float: left;
    }

    p {
        margin: 0px !important;
    }

    .portlet-form .form-body, .form .form-body {
        padding: 0px;
        padding-top: 15px;
    }

    .o-m {
        background: #f8f8f8;
        width: 842px;
    }

    .o-m .ul-o {
        float: left;
        width: 170px;
        position: relative;
        background: #f9f9f9;
        height: 486px;
        border-right: 1px solid #ddd
    }

    .o-m .ul-o li {
        width: 100%;
        cursor: pointer;
        position: relative;
        z-index: 2
    }

    .o-m .ul-o li p {
        float: left;
        line-height: 68px;
        color: #666;
        font-size: 16px;
        width: 100%;
        text-align: center;
        position: relative
    }

    .o-m .ul-o li p i {
        width: 0;
        position: absolute;
        top: 25px;
        height: 0;
        right: -1px;
        display: block;
        border-top: 10px solid transparent;
        border-right: 20px solid #fff;
        border-bottom: 10px solid transparent;
        display: none;
    }

    .o-m .ul-o li.on b {
        display: block;
    }

    .o-m .ul-t {
        background: #fff;
        width: 672px;
        float: left;
        height: 443px;
        padding-top: 12px;
    }

    .o-m .ul-t li {
        list-style-type: none;
        position: relative;
        height: 100%;
        display: none;
    }

    .o-m .ul-t .li-top {
        padding: 25px 0 0 50px;
    }

    .o-m .ul-t h5 {
        color: #666;
        font-size: 24px;
        line-height: 38px;
    }

    .o-m .ul-t p {
        color: #999;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 5px
    }

    .o-m .ul-t .li-a a {
        color: #2b91b8;
        font-size: 14px;
        margin-right: 30px;
        cursor: default;
        line-height: 22px;
    }

    .o-m .ul-t .li-a span {
        color: #999;
        font-size: 14px
    }

    .o-m .ul-t .li-img {
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .modal-body {
        padding: 0px;
    }

    .active1 {
        background: #10A0F7;
        color: #fff !important;
    }

    .sectext {
        height: 34px;
        line-height: 34px;
    }

    .addNum {
        background: transparent !important;
        border: none;
        margin-top: 8px;
        margin-left: -15px;
        outline: none;
    }

    .fa-plus-square:before {
        color: #10A0F7 !important;
    }

    .li-mask {
        text-align: center;
        float: left;
        margin-left: 27px;
        margin-top: 15px;
    }

    /* .select2-container--bootstrap .select2-selection--single {
        height: 34px;
        line-height: 1.42857;
        padding: 6px 24px 6px 12px;
        border: 1px solid #e5e5e5;
        border-radius: 4px !important;
        width:533px !important;
    } */

    #szData_wrapper {
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
</style>
<script>
    $(document).ready(function () {
        $(".month").hide();
        $("#Chinese").hide();
        $("#selectSbzq").change(function () {
            if ($(this).val() == 004) {
                $(".month").show();
                $("#Chinese").show();
            }
            else {
                $(".month").hide();
                $("#Chinese").hide();
            }
        });
        $("#selectBsy").change(function () { // 选择月份后
            var month = $("#selectBsy").val();
            $("#selectBsrq").empty();
            $.ajax({
                url: '/customermanage/customerManage/getDaysByMonth/' + month,
                dataType: 'TEXT',
                type: 'GET',
                success: function (dataghs) {
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
<form action="#" id="customerManageEditForm" class="form form-horizontal">
    <div class="form-body">
        <div class="o-m">
            <div class="ul-o">
                <ul>
                    <li class="li-o"><p class="active1">基本资料<i style="display:block" class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b></li>
                    <li class="li-t"><p>联系方式<i class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b></li>
                    <li class="li-s"><p>税务资料<i class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b></li>
                    <li class="li-f"><p>客户状态<i class="arrow"></i></p>
                        <div class="clear"></div>
                        <b></b></li>
                    <!-- <div class="li-mask">
                        <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4"
                                name="addfiles" id="addfiles" type="button">添加附件
                        </button>
                    </div> -->
                    <!-- <div class="li-mask">
		                 <button class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4" name="changApp" id="changApp" type="button" style="width: 117px;">APP账户</button>
		            </div> -->
                </ul>
            </div>
            <div class="ul-t">
                <li style="display:block">
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        <span class="colorRed"> * </span>税务登记号</label>
                                    <input type="text" class="inputCommon" name="nsrsbh" style="width:157px;border-bottom-right-radius: 0px !important;
                            border-top-right-radius: 0px !important;" readonly="readonly">
                                    <span class="input-group-btn">
                            <button class="btn default" type="button" id="nsrsbh" style="border-bottom-right-radius: 4px !important;height: 33px;
                                border-top-right-radius: 4px !important;" disabled="disabled">
                                <i class="fa fa-search"></i>
                            </button>
                        </span>
                                </div>
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">公司简称</label>
                                    <input type="text" class="inputCommon inputWidth-col-two"
                                           style="width:197px !important;" name="gsjc" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        <span class="colorRed"> * </span>公司名称</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="gsmc" readonly="readonly">
                                </div>
                                <div class="col-md-6 kehufenlei">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        客户分类</label>
                                    <select id="customerStyle" disabled="disabled"></select>
                                    <button class="btn default" type="button" id="khflAdd" title="新增客户分类" style="border-bottom-right-radius: 4px !important;
                             border-top-right-radius: 4px !important;height: 33px" disabled="disabled">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group suozaidiqu">
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-12">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        所在行业</label>
                                    <select id="ML" style="width:186px;" disabled="disabled">
                                    </select>
                                    <select id="DL" style="width:186px;" disabled="disabled">
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group suozaidiqu">
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-12">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        所在地区</label>
                                    <select id="loc_province" style="width:186px;" disabled="disabled">
                                    </select>
                                    <select id="loc_city" style="width:186px;" disabled="disabled">
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        <span class="colorRed"> * </span>法人代表</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="frdb" readonly="readonly">
                                </div>
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        <span class="colorRed"> * </span>身份证号</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="sfzh" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        营业执照号</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="yyzz" readonly="readonly">
                                </div>
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        组织机构码</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="zzjgdm" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666 pull-left">
                                        成立日期</label>
                                    <div class="input-group date createDate">
                                        <input type="text" class="form-control starttime inputCommon"
                                               readonly="readonly"
                                               name="createDate" style="width:150px;border-bottom-right-radius: 0px !important;
                                border-top-right-radius: 0px !important;font-size:12px;    font-size: 12px;
                                width: 154px !important;
                                background: #fff !important;"> <span>
                                <button class="btn default" type="button" style="width:45px;border-bottom-right-radius: 4px !important;
                                    border-top-right-radius: 4px !important;height: 33px;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                                    </div>
                                </div>
                                <div class="col-md-6" style="    position: relative; left: -5px;">
                                    <label class="labelCommon labelWidth-col-two labelBg color666 pull-left"
                                           style="font-size:12px;margin-left:5px;">
                                        开始代账日期</label>
                                    <div class="input-group date startDate">
                                        <input type="text" class="form-control starttime inputCommon"
                                               readonly="readonly" name="startDate"
                                               style="font-size: 12px;background:#fff !important;">
                                        <span class="input-group-btn">
                                <button class="btn default" type="button" style="border-bottom-right-radius: 4px !important;
                                    border-top-right-radius: 4px !important;height: 33px;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group">
                                <div class="col-md-12">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        备注信息</label>
                                    <input type="text" class="inputCommon inputWidth-col-one zg" name="bzxx" readonly="readonly">
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-6 suozaidiqu">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        <span class="colorRed"> * </span>主管会计</label>
                                    <select name="khzg" class="inputCommon inputWidth-col-one zg" id="khzg"
                                            style="width:186px;" data-error-container="#form_resource_error" disabled="disabled">
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        海关代码</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="hgdm" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        联系人</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="lxr" readonly="readonly">
                                </div>
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        办公电话</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="bgdh" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        <span class="colorRed"> * </span>手机号码</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="sjhm" readonly="readonly">
                                </div>
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        传真号码</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="czhm" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        QQ</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="qq" readonly="readonly">
                                </div>
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        email</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="email" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group">
                                <div class="col-md-12">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        其他</label>
                                    <input type="text" class="inputCommon inputWidth-col-one zg" name="qt" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12 kehufenlei">
                            <div class="input-group col-md-12">
                                <div class="col-md-12">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        详细地址</label>
                                    <input type="text" class="inputCommon inputWidth-col-one zg" name="xxdz" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="row form-group">
                        <div class="col-md-12 zhengzhishui">
                            <div class="input-group col-md-12">
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        增值税性质</label>
                                    <select id="zzsxz" disabled="disabled"></select>
                                </div>
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        税率</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="sl"
                                           style="width: 151px !important;"
                                           onKeyup="value=test(value)?value:''" readonly="readonly">
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
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        纳税人编码</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="nsrbm" readonly="readonly">
                                </div>
                                <div class="col-md-6">
                                    <label class="labelCommon labelWidth-col-two labelBg color666"
                                           style="font-size: 13px;">
                                        主管税务分局</label>
                                    <input type="text" class="inputCommon inputWidth-col-two" name="zgswfj" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group col-md-12">
                                <div class="col-md-12">
                                    <label class="labelCommon labelWidth-col-two labelBg color666">
                                        备注</label>
                                    <input type="text" class="inputCommon inputWidth-col-one zg" name="swzlbz" readonly="readonly">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 税务资料选择  -->
                    <!-- 税务资料选择  -->
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="input-group">
                                <div style="width: 100px;margin-left:16px;float:left;">
                                    <select name="selectSz" class="form-control" id="selectSz"
                                            data-error-container="#form_resource_error" disabled="disabled">
                                        <option></option>
                                    </select>
                                </div>
                                <div style="width: 100px;margin-left:16px;float:left;">
                                    <select name="selectSbzq" class="form-control" id="selectSbzq"
                                            data-error-container="#form_resource_error" disabled="disabled">
                                        <option value="001">月报</option>
                                        <option value="002">季报</option>
                                        <!-- <option value="003">半年报</option> -->
                                        <option value="004">年报</option>
                                    </select>
                                </div>
                                <div class="col-md-2 month">
                                    <select name="selectBsrq" class="form-control col-md-3" id="selectBsy"
                                            data-error-container="#form_resource_error" disabled="disabled">
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
                                <div class="sectext" style="    display: block;  width: 8px;  float: left;"
                                     id="Chinese">月
                                </div>

                                <div class="col-md-3">
                                    <select name="selectBsrq" class="form-control col-md-3" id="selectBsrq"
                                            data-error-container="#form_resource_error" disabled="disabled">
                                        <option value="1">1</option>
                                    </select>
                                </div>
                                <div class="col-md-2 sectext">日前报税</div>

                                <div class="col-md-1">
                                    <button type="button" class="addNum borderNone bgNone" id="szAdd" disabled="disabled"><i
                                            class="fa fa-plus-square" style="font-size:30px;" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 税务资料table区域 -->
                    <div class="row">
                        <div class="col-md-12" style="overflow: auto;height:200px;">
                            <div class="col-md-12">
                                <table class="table table-striped table-bordered table-hover" cellspacing="0"
                                       width="100%" id="szEditData">
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
                </li>
                <li>
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
                                    <div id="form_enable_error"></div>
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
                                                                            name="fwzt" value="true" disabled> 启用服务
                                        </label> <label class="radio-inline"> <input type="radio"
                                                                                     name="fwzt" value="false" disabled> 停止服务
                                    </label>
                                    </div>
                                    <div id="form_enable_error"></div>
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
                                                                            name="ztzt" value="true" disabled> 创建
                                        </label> <label class="radio-inline"> <input type="radio"
                                                                                     name="ztzt" value="false" disabled> 不创建
                                    </label>
                                    </div>
                                    <div id="form_enable_error"></div>
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
                                                                            name="khjb" value="A" disabled> A级
                                        </label> <label class="radio-inline"> <input type="radio"
                                                                                     name="khjb" value="B" disabled> B级
                                    </label> <label class="radio-inline"> <input type="radio"
                                                                                 name="khjb" value="C" disabled> C级
                                    </label> <label class="radio-inline"> <input type="radio"
                                                                                 name="khjb" value="D" disabled> D级
                                    </label>
                                    </div>
                                    <div id="form_enable_error"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</form>
<script
        src="<%=request.getContextPath()%>/assets/pages/scripts/agentstatistics/edit.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        customerManageedit.setPath('<%=request.getContextPath()%>');
        customerManageedit.init('<%=khdm%>', '<%=id%>');

        $("#nsrsbh").click(function () {
            var v = $("input[name='nsrsbh']").val();
            if (v == null || v == "") {
                Messenger().post({
                    message: '请填写税务登记号之后点击查询！',
                    type: 'warning'
                });
            } else {
                $.ajax({
                    url: '/customermanage/ptkhxx/getInformation?nsrsbh=' + v,
                    type: 'GET',
                    success: function (data) {
                        if (data.ztztDm) {//为true,有数据
                            $('input[name="lxr"]').val(data.yhmc);    //联系人
                            $('input[name="gsmc"]').val(data.gsmc);   //公司名称
                            $('input[name="sjhm"]').val(data.sjhm);   //手机号码
                            $('input[name="frdb"]').val(data.frdb);   //法人代表
                            $('input[name="bgdh"]').val(data.bgdh);   //办公电话
                            $('input[name="czhm"]').val(data.czhm);   //传真号码
                            $('input[name="yyzz"]').val(data.yyzz);   //营业执照
                            $('input[name="qq"]').val(data.qq);       //QQ
                            $('input[name="email"]').val(data.email); //email
                            $('input[name="xxdz"]').val(data.xxdz);   //详细地址
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
    $('.o-m .ul-o li').click(function () {
        $('.ul-o .arrow').hide();
        var linum = $(this).index();
        /* if (linum == 3) { //最后一个
            $('div.modal-footer').empty();
            $('div.modal-footer').append('<button data-bb-handler="success" type="button" class="btn btn btn-default btnBlue borderRadius4 colorfff"><i class="fa fa-save"></i> 保&nbsp;存 </button>');
        } else {
            $('div.modal-footer').empty();
            $('div.modal-footer').append('<button type="button" id="next" onclick="goNext()" class="btn btn btn-default btnBlue borderRadius4 colorfff"><i class="fa fa-save"></i> 下&nbsp;一&nbsp;步 </button>');
        } */
        $('.o-m .ul-t li').eq(linum).stop().show().siblings().hide();
        $('.ul-o .arrow').eq(linum).show();
        $(this).children("p").addClass("active1").parents("li").siblings("li").children("p").removeClass();
    });

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
    /* $(document).ready(function(){
     $("#selectSbzq").delegate("","click",function(){
     alert(1);
     alert($(this).html());
     })
     }) */

</script>