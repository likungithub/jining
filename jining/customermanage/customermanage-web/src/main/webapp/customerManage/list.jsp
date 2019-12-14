<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ page import="com.xinhai.caiyun.customermanage.business.JZUtil" %>
<%@ page import="java.util.UUID" %>

<%
    String firstpage = request.getParameter("firstpage");
    if (firstpage == null) {
        firstpage = "0";
    }
    UUID uuid = UUID.randomUUID();
    String id = request.getParameter("id");
    String name = request.getParameter("name");
    response.setHeader("Pragma","No-cache");
    response.setHeader("Cache-Control","no-cache");
    response.setDateHeader("Expires", 0);
%>
<style>

    #orgAndUser_data .bb {
        font-size: 12px;
        color: #999;
        margin-top: 2px;
        display: inline-block;
    }

    .next {
        position: relative;
        left: -10px;
    }

    .getTree {
        margin-top: 17px;
    }

    #orgAndUser_data td:nth-child(2) {
        text-align: left;
    }

    #orgAndUser_data td:nth-child(3) {
        text-align: center;
    }

    #orgAndUser_data td {
        padding: 6px !important;
    }

    #orgAndUser_data td:nth-child(4) {
        text-align: center;
    }

    #search_ay {
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: 1px solid #ccc;
    }
    .nameImg{
        width: 22px;
        height: 22px;
        margin-left: 1px;
        margin-top: 2px;
    }
    /*#getTree .jstree-default .jstree-node, #getTree .jstree-default {*/
        /*background-image: none;*/
    /*}*/

    #customerManage-manager-content .getTree .jstree-icon {
        /* background: url(http://tui518.oss-cn-shanghai.aliyuncs.com/avatar/2017082….jpg); */
        /* background-size: cover; */
    }
    /*#getTree .jstree-children .jstree-open a{*/
        /*margin-left:30px ;*/
    /*}*/
    .getTree .jstree-default .jstree-leaf > .jstree-ocl {
        background-position: -68px -1px;
        /*display: none;*/
    }

    .getTree .jstree-default .jstree-closed > .jstree-ocl {
        background-position: -100px -4px;
        /*display: none;*/
    }

    /*#getTree .jstree-default .jstree-clicked {*/
        /*border: 0;*/
        /*background-color: #e5e5e5;*/
        /*box-shadow: none;*/
    /*}*/

    /*#getTree .jstree-default .jstree-hoverd {*/
           /*border: 0;*/
           /*background-color: #e5e5e5;*/
           /*box-shadow: none;*/
           /*border-radius: 5px !important;*/
       /*}*/

    /*#getTree .jstree-default .jstree-anchor {*/
        /*line-height: 39px;*/
        /*height: 39px;*/
        /*width: 100%;*/
        /*border-bottom: 1px solid #f6f6f6;*/
        /*text-indent: 8px;*/
    /*}*/

    /*#getTree .jstree-default .jstree-node, #getTree .jstree-default .jstree-icon {*/
        /*margin-left: 0px;*/
    /*}*/

    #orgAndUser_data .ff {
        width: 13px;
        height: 13px;
        background: #FF2625;
        margin-top: 4px;
        position: relative;
        top: 1px;
        border-radius: 4px !important;
    }

    /*#getTree .jstree-default .jstree-open > .jstree-ocl {*/
        /*display: none;*/
    /*}*/

    #orgAndUser_data .cc {
        width: 13px;
        height: 13px;
        background: #A8E240;
        margin-top: 4px;
        border-radius: 4px !important;
    }

    #orgAndUser_data .dd {
        width: 13px;
        height: 13px;
        background: #00B8EE;
        margin-top: 4px;
        border-radius: 4px !important;
    }

    #orgAndUser_data .ee {
        width: 13px;
        height: 13px;
        background: #DADADA;
        margin-top: 4px;
        border-radius: 4px !important;
    }

    .monthcolor1 {
        color: #A8E240;
    }

    .monthcolor2 {
        color: #00B8EE;
    }

    .monthcolor3 {
        color: #DADADA;
    }

    .monthcolor4 {
        color: #FF2625;
    }

    .monthcolor5 {
        color: orange;
    }

    #orgAndUser_data .orange {
        width: 13px;
        height: 13px;
        background: orange;
        margin-top: 4px;
        border-radius: 4px !important;
        position: relative;
        top: 1px;
    }

    #orgAndUser_data .btn-default:hover {
        border-color: #10a0f7 !important;
    }

    /*  .cycz{
            width: 80px;
        height: 35px;
        line-height: 35px;
        background: #fff;
        text-align: center;
        margin-bottom: -6px;
        border-top: 2px solid #10a0f7;
     } */

    #orgAndUser_data .table > tbody > tr > td, #orgAndUser_data .table > tbody > tr > th, #orgAndUser_data .table > tfoot > tr > td, #orgAndUser_data .table > tfoot > tr > th, #orgAndUser_data .table > thead > tr > td, #orgAndUser_data .table > thead > tr > th {
        vertical-align: middle !important;
        text-align: left;
        font-weight: normal !important;
    }

    #customerManage-manager-content .pad {
        display: inline-block;
        /* padding: 3px; */
        border: 1px solid #dadada;
        margin-right: 4px;
        background: #fff;
        width: 20px;
        height: 20px;
        line-height: 19px;
        text-align: center;
        position: relative;
        top: 2px;
        border-radius: 4px !important;
        cursor: pointer;
    }

    #orgAndUser_data table.dataTable tbody td {
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .orgAndUser_data td:nth-child(4) {
        text-align: left !important;
        padding-left: 29px !important;
    }

    #orgAndUser_data td:nth-child(2) {
        text-align: left !important;
    }

    #orgAndUser_data .ui-layout-content {
        padding: 0px;
    }

    #page-container #orgAndUser_data_info {
        height: 30px;
        line-height: 20px;
        padding-left: 8px;
    }

    /* .bootbox .inputCommon{
        width:188px !important;;
    } */
    .pagination > .active > a {
        z-index: 99 !important;
    }

    .contractDBymdw .modal-dialog{
        width: 750px!important;
    }
    /*#customerManage-manager-content .modal-dialog  .modal-body*/
    /*{*/
        /*padding: 20px 0 55px 64px;*/
    /*}*/
        /*#orgAndUser_manage_tree .jstree-anchor span {*/
        /*float: left;*/
    /*}*/

    #customerManage-manager-content .slimScrollDiv {
        height: auto !important;
    }

    #customerManage-manager-content .slimScrollDiv .portlet-scroller {
        height: auto !important;
    }
    
    .khlistBtn{ /*列表图标样式*/ 
	    color: #10a0f7;
	    background: none;
	    border: none;
	    margin-right: 5px;
	    padding: 0;
	    text-align: center;
	    width: 25px;
	    height: 25px;
    }
    #customerManage-manager-content #customerManageMoreSearch
    {
        border: 1px solid #dadada;
        padding: 10px;
        float: right;
        margin-right: 30px;
        margin-top: 10px;
        border-radius: 4px!important;
        width: 362px;
    }
    #customerManage-manager-content   .rotate1 {
        transform: rotate(180deg);
    }
    #customerManage-manager-content .moreInfo
    {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        padding: 0 4px;
        cursor: pointer;
    }
    #customerManage-manager-content .moreInfo .btnM{
        width: 100%;
        border: none
    }
</style>
<div id="customerManage-manager-content">
    <div class="ui-layout-center" id="zhklb" style="padding: 15px!important;">

        <div hidden id="jztb"><%=JZUtil.getTB()%></div>

        <div class="ui-layout-content contentBgColor" style="background:#fff!important;padding: 0;">
            <div class="portlet">
                <div class="portlet-body form" style="overflow-x:hidden;min-height: 242px">
                    <div class="table-toolbar" style="margin: 0">
                        <div class="row" style="background: #fff;">
                            <div class="col-md-12" style="background: #fff;padding-right: 8px;padding-left: 0">
                                <os:hasSecurityResource identifier="addNewKhBtn">
                                    <button id="addCustomerManage"
                                            class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">
                                        <i class="fa fa-plus"></i> 新增
                                    </button>
                                </os:hasSecurityResource>

                                <div class="wrap btnBorderColor borderRadius4" style="display: inline-block">
                                    <os:hasSecurityResource identifier="dispatchedStaffBtn">
                                        <button id="dispatchedStaff" style="border: none;padding: 6px 4px;height: 30px"
                                                class="btn btn-default fffBg  colorBlue-10a0f7 borderRadius4 pull-left">
                                            <i class="icon iconfont icon-paigong"></i> 共享客户
                                        </button>
                                    </os:hasSecurityResource>
                                    <os:hasSecurityResource identifier="stopServiceBtn">
                                        <button id="stopCustomerBtn"     style="border: none;padding: 6px 4px;height: 30px;"
                                                class="btn btn-default fffBg  colorBlue-10a0f7 borderRadius4 pull-left">
                                            <i class="icon iconfont icon-fuwutingzhi"></i> 停止服务
                                        </button>
                                    </os:hasSecurityResource>
                                    <os:hasSecurityResource identifier="stopServiceBtn">
                                        <button id="restartCustomer"     style="border: none;height: 30px"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4 pull-left">
                                            <i class="fa fa-wrench"></i> 恢复服务
                                        </button>
                                    </os:hasSecurityResource>
                                    <div class="moreInfo colorBlue-10a0f7" style="position: relative">
                                        <i class="icon iconfont icon-gengduo1 iconMr"></i>
                                        <span class="iconMr">更多</span>
                                        <i class="glyphicon glyphicon-menu-down"></i>
                                        <ul class="list-unstyled hide"style="background: #fff;width: 100%; position: absolute;left: 0; z-index: 10;box-shadow: 1px 1px 2px #dedede;">
                                            <li>
                                                <os:hasSecurityResource identifier="importKhBtn">
                                                    <button id="importExcel" class="btn btn-default fffBg  colorBlue-10a0f7  btnM">
                                                        <i class="icon iconfont icon-daoru"></i> 导入
                                                    </button>
                                                </os:hasSecurityResource>
                                            </li>
                                            <li>
                                                <os:hasSecurityResource identifier="exportKhBtn">
                                                    <button id="exportExcel"
                                                            class="btn btn-default fffBg  colorBlue-10a0f7 btnM">
                                                        <i class="icon iconfont icon-daochu"></i> 导出
                                                    </button>
                                                </os:hasSecurityResource>
                                            </li>
                                            <li>
                                                <!-- 客户记账按钮 -->
                                                <os:hasSecurityResource identifier="chargeKhBtn">
                                                    <button id="customerAccounting-M" class="btn btn-default fffBg  colorBlue-10a0f7 btnM">
                                                        <i class="icon iconfont icon-pingjiaguanli"></i> 记账
                                                    </button>
                                                </os:hasSecurityResource>

                                            </li>
                                            <li>
                                                <!-- 客户申报按钮 -->
                                                <os:hasSecurityResource identifier="declareKhBtn">
                                                    <button id="customerReportTax-M" class="btn btn-default fffBg  colorBlue-10a0f7 btnM">
                                                        <i class="fa fa-file-o"></i> 报税
                                                    </button>
                                                </os:hasSecurityResource>
                                            </li>
                                            <li>
                                                <button id="delCustomerBtn"
                                                        class="btn btn-default fffBg  colorBlue-10a0f7 btnM">
                                                    <i class="icon iconfont icon-shanchu"></i> 删除
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div style="float: right;width: 60%">
                                    <div class="pull-right" style="height: 33px;line-height: 33px;padding: 0 20px 0 0;">
                                        <a id="customerMoreAsearch" data-sign="0" href="javascript:void (0);" class="iconFontColor-10a0f7" style="text-decoration: none;vertical-align: middle;">更多</a>
                                        <img class="rotate1" src="/systemmanager/assets/pages/img/arrow.png" alt="arrow">
                                    </div>

                                    <div class="wrap pull-right borderRadius4" style="border: 1px solid #dadada ;margin-right: 17px">
                                        <div class="pull-left">
                                            <div class="input-icon">
                                                <input type="search" class="form-control"
                                                       id="searchNF" name="searchNF" onKeyUp="if(this.value.length>4){this.value=this.value.substr(0,4)};this.value=this.value.replace(/[^\d]/g,'');"
                                                       placeholder="查询年份" style="height: 32px;color: #555;padding-left: 10px;width: 60px;border: none" title="填写年份，查询该年份下的代理服务费交费情况">
                                            </div>
                                        </div>
                                        <span class="pull-left" style="line-height: 32px;border-right: 1px solid #dadada;padding-right: 10px;">年</span>
                                        <div class="pull-left ">
                                            <div class="input-icon" style="position: relative">
                                                <input type="search" class="form-control "
                                                       id="searchKhmc" name="searchKhmc"
                                                       placeholder="客户名称" style="margin-right: 33px;width:122px;color: #555;padding-left: 10px;border: none">
                                                <i class="fa fa-search colorBlue-10a0f7" id="btnKhxxSearch"
                                                style="     position: absolute;
                                                            right: 9px;
                                                            top: -11px;
                                                            cursor: pointer;
                                                            border-left: 1px solid #dedede;
                                                            height: 33px;
                                                            line-height: 33px;
                                                            width: 40px;
                                                            font-size: 20px;
                                                            padding-left: 10px;"></i>
                                            </div>
                                        </div>
                                       <%-- <button id="btnKhxxSearch" class="btn btn-default btnBlue borderRadius4  colorfff mr">
                                            <i class="fa fa-search iconMr"></i>
                                            搜索
                                        </button>--%>
                                    </div>
                                    <div class="pull-right mr">
                                        <label class="labelCommon labelBg color666 dateLabel-m" style="height: 34px;">客户分类</label>
                                        <select id="khflSearch" class="form-control inputCommon" style="height: 34px;text-indent: 0;width: 109px;font-size:12px !important;border-radius: 0 4px 4px 0!important" name="searchFilter">
                                            <option value="0">全部</option>
                                        </select>
                                    </div>


                                    <!-- <button id="btnKhxxReset" class="btn btn-default btnBlue borderRadius4  colorfff mr">
                                        <i class="fa fa-refresh iconMr"></i>
                                        重置
                                    </button> -->
                                </div>
                            </div>
                            <div class="" id="customerManageMoreSearch" style="display: none">
                                <div class="openMore" style="margin-bottom: 0px;float: right">
                                    <div class="date  pull-left addStarDate">
                                        <label class="labelCommon labelBg color666 dateLabel-m " style="">新增日期</label>
                                        <input type="text" readonly="" class="appsysinfo-m inputCommon " name="addStarDate" style="width: 85px;border-radius: 0!important">
                                        <span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                    </div>
                                    <span style="float: left;margin: 5px">-</span>
                                    <div class="input-group date  pull-left mr addEndDate">
                                        <input type="text" readonly="" class="inputCommon appsysinfo-m " name="addEndDate" style="border-radius: 0px!important;width: 85px">
                                         <span>
                                             <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important">
                                                 <i class="fa fa-calendar"></i>
                                             </button>
                                         </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                    <!-- 客户记账按钮 -->
                    <os:hasSecurityResource identifier="chargeKhBtn">
                        <div id="khjzan"></div>
                    </os:hasSecurityResource>
                    <!-- 客户合同按钮 -->
                    <os:hasSecurityResource identifier="contractKhBtn">
                        <div id="khhtan"></div>
                    </os:hasSecurityResource>

                    <!-- 客户收费按钮 -->
                    <os:hasSecurityResource identifier="getMoneyKhBtn">
                        <div id="khsfan"></div>
                    </os:hasSecurityResource>

                    <!-- 客户跟进按钮 -->
                    <os:hasSecurityResource identifier="followKhBtn">
                        <div id="khgjan"></div>
                    </os:hasSecurityResource>

                    <!-- 客户申报按钮 -->
                    <os:hasSecurityResource identifier="declareKhBtn">
                        <div id="khsban"></div>
                    </os:hasSecurityResource>
                        <div class="row">
                            <div class="col-sm-12" style=" height: 38px;line-height: 38px;background: #F4F8F9;position: relative;top: 6px;border-bottom: 1px solid #E0E2E2;">
                                <div class="pull-left" style="padding: 0 15px;margin-left: 35px;margin-right: 15px;background: #fff;border: 1px solid #E0E2E2;border-top: 2px solid #0A80FF;"><a style="color: #333; font-size: 14px" href="javascript:void(0)">代账服务</a></div>
                                <div class="pull-left daizhangandyicixingByLiBtn1" style="padding: 0 15px;margin-left: -10px;margin-right: 15px;"><a style="color: #999; font-size: 14px" href="javascript:void(0)">一次性业务</a></div>
                            </div>
                        </div>
                </div>
                    <div class="portlet-scroller">
                        <div class="dataTables_wrapper no-footer">
                            <table class="table table-striped table-bordered table-hover backgroundWhite"
                                   id="orgAndUser_data">
                                <thead>
                                <tr>
                                    <th width="2%" style="padding-left: 6px" class="text-left"><input type="checkbox" name="selectCustomerManager"/>
                                    </th>
                                    <th width="20%" style="text-align:left">客户名称</th>
                                    <th width="10%" >主管会计</th>
                                    <th width="35%">
                                        <div>
                                            <div id="dlfyname" class="text-center" style="font-size: 12px;color: #999;width:100%"></div>
                                            <div style="width:100%;text-align: center">
                                                <div class="cc bb"></div>
                                                <div class="bb mr" style="margin-right: 5px!important;">&nbsp;已审核&nbsp;</div>
                                                <div class="dd bb"></div>
                                                <div class="bb mr" style="margin-right: 5px!important;">&nbsp;未审核&nbsp;</div>
                                                <div class="ee bb"></div>
                                                <div class="bb mr" style="margin-right: 5px!important;">&nbsp;未收费&nbsp;</div>
                                                <div class="ff bb"></div>
                                                <div class="bb mr" style="margin-right:5px!important;">&nbsp;欠费&nbsp;</div>
                                                <div class="orange bb"></div>
                                                <div class="bb mr">&nbsp;催费&nbsp;</div>
                                            </div>
                                        </div>
                                    </th>
                                    <th width="15%" style="text-align: center;"> 操作<!-- <i class="fa fa-question" title="若客户合同已审核通过，收费按钮展示，若合同为代理服务费合同，按钮全部展示"></i> --></th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%-- <os:hasSecurityResource identifier="dispatchedStaffBtn"> --%>
        <div class="ui-layout-west">
            <div class="ui-layout-content">
                <div class="portlet">
                    <!--  <div class="portlet-title">
                         <div class="caption">
                             <span class="caption-subject bold uppercase">分组</span>
                         </div>
                     </div> -->
                    <div class="portlet-body">
                        <div class="portlet-scroller">
                            <div class="table-toolbar">
                                <div class="row">
                                    <div class="col-md-12 getTree" id="getTree<%=uuid%>">
                                        <div class="input-icon">
                                            <i class="fa fa-search colorBlue-10a0f7"
                                               style="color: #ccc !important;"></i>
                                            <input type="search" class="form-control borderRadius4 btnBorderColor"
                                                   id="search_ay<%=uuid%>" placeholder="搜索"></div>
                                        <div id="orgAndUser_manage_tree<%=uuid%>" style="width: 200px;overflow-x: auto;max-width: 200px">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <%-- </os:hasSecurityResource> --%>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/customerManage/list.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        $('.daizhangandyicixingByLiBtn1').click(function (){
            $('.daizhangandyicixingByLi').load('/customermanage/customerManageBusiness/list.jsp');
        });
        $('#customerMoreAsearch').click(function(){
           /* if($(this).attr('data-sign')=='0'){
                $(this).attr('data-sign','1')
                $(this).next('img').addClass('rotate1')
            }else {
                $(this).attr('data-sign','0');
                $(this).next('img').removeClass('rotate1')
            }*/
            $(this).next('img').toggleClass('rotate1');
            $('#customerManageMoreSearch').fadeToggle('slow');
        });

        orgAndUser_data.setPath('<%=request.getContextPath()%>');
        orgAndUser_data.init('<%=firstpage%>','<%=id%>','<%=name%>', '<%=uuid%>');
    });
</script>