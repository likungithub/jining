<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String type = request.getParameter("type");
    if (type == null) {
        type = "CFTX";
    }
%>
<style>

    #cfList-manager-content .bb {
        float: left;
        font-size: 12px;
        color: #999;
        margin-top: 2px;
        border-radius: 4px !important;

    }

    #cfList-manager-content #getTree {
        margin-top: 17px;
    }

    #search_ay {
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: 1px solid #ccc;
    }

    #cfList-manager-content #getTree .jstree-default .jstree-node, #cfList-manager-content .jstree-default .jstree-icon {
        background-image: none;
    }

    #cfList-manager-content #getTree .jstree-default .jstree-search {
        /* font-style: italic; */
        color: #10a0f7;
        font-weight: 700;
        font-style: normal;
    }

    #getTree .jstree-default .jstree-leaf > .jstree-ocl {
        background-position: -68px -4px;
        display: none;
    }

    #cfList-manager-content #getTree .jstree-default .jstree-closed > .jstree-ocl {
        background-position: -100px -4px;
        display: none;
    }

    #getTree .jstree-default .jstree-clicked {
        border: 0;
        background-color: #e5e5e5;
        box-shadow: none;
    }

    #getTree .jstree-default .jstree-hoverd {
        border: 0;
        background-color: #e5e5e5;
        box-shadow: none;
        border-radius: 5px !important;
    }

    #getTree .jstree-default .jstree-anchor {
        line-height: 39px;
        height: 39px;
        width: 100%;
        border-bottom: 1px solid #f6f6f6;
        text-indent: 8px;
    }

    #getTree .jstree-default .jstree-node, #cfList-manager-content .jstree-default .jstree-icon {
        margin-left: 0px;
    }

    .ff {
        width: 15px;
        height: 15px;
        background: #FF2625;
        margin-top: 4px;
        width: 13px;
        height: 13px;
    }

    #getTree .jstree-default .jstree-open > .jstree-ocl {
        display: none;
    }

    .cc {
        width: 15px;
        height: 15px;
        background: #A8E240;
        margin-top: 3px;
        width: 13px;
        height: 13px;
        margin-left: 0px !important;
    }

    .dd {
        width: 15px;
        height: 15px;
        background: #00B8EE;
        margin-top: 4px;
        width: 13px;
        height: 13px;
    }

    .ee {
        width: 15px;
        height: 15px;
        background: #DADADA;
        margin-top: 4px;
        width: 13px;
        height: 13px;
    }

    #cfList-manager-content .monthcolor1 {
        color: #A8E240;
    }

    #cfList-manager-content .monthcolor2 {
        color: #00B8EE;
    }

    #cfList-manager-content .monthcolor3 {
        color: #666;
    }

    #cfList-manager-content .monthcolor4 {
        color: #FF2625;
    }

    #cfList-manager-content .monthcolor5 {
        color: orange;
    }

    #cfList-manager-content .orange {
        width: 15px;
        height: 15px;
        background: orange;
        margin-top: 4px;
        width: 13px;
        height: 13px;
    }

    #cfList-manager-content .btn-default:hover {
        border-color: #10a0f7 !important;
    }

    /* .cycz{
            width: 80px;
       height: 35px;
       line-height: 35px;
       background: #fff;
       text-align: center;
       margin-bottom: -6px;
       border-top: 2px solid #10a0f7;
    } */

    #cfList-manager-content .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
        vertical-align: middle !important;
        text-align: center;
        font-weight: normal !important;
    }

    #cfList-manager-content .pad {
        display: inline-block;
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

    /* #cfList-manager-content .pad:nth-child(1){

    }
    #cfList-manager-content table.dataTable tbody td {
        overflow: visible;
        text-overflow: ellipsis;
        white-space: nowrap;
    } */
    #cfList_data .iconfont {
        font-size: 20px;
    }

    #cfList-manager-content .slimScrollDiv {
        height: auto !important;
    }

    #cfList-manager-content .slimScrollDiv .portlet-scroller {
        height: auto !important;
    }
</style>
<div id="cfList-manager-content">
    <div class="ui-layout-center">
        <div class="ui-layout-content contentBgColor">
            <div class="portlet">
                <!--  <div class="portlet-title">
                     <div class="caption">
                         <span class="caption-subject bold uppercase">客户管理</span>
                     </div>
                 </div> -->
                <div class="portlet-body form" style="overflow-x:hidden">
                    <div class="table-toolbar">
                        <div class="row">
                            <div class="col-md-12">
                                <os:hasSecurityResource identifier="addNewKhBtn">
                                    <button id="addCFListManage" disabled
                                            class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">
                                        <i class="fa fa-plus"></i> 新增客户
                                    </button>
                                </os:hasSecurityResource>
                                <os:hasSecurityResource identifier="dispatchedStaffBtn">
                                    <button id="dispatchedCFList"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4 pull-left mr">
                                        <i class="icon iconfont icon-paigong"></i> 派工
                                    </button>
                                </os:hasSecurityResource>
                                <%-- <os:hasSecurityResource identifier="stopServiceBtn"> --%>
                                <button id="stopCFList"
                                        class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4 pull-left mr">
                                    <i class="icon iconfont icon-fuwutingzhi"></i> 停止服务
                                </button>
                                <%-- </os:hasSecurityResource>
                                <os:hasSecurityResource identifier="resetServiceBtn"> --%>
                                <button id="restartCFList"
                                        class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4 pull-left mr">
                                    <i class="fa fa-wrench"></i> 恢复服务
                                </button>
                                <%-- </os:hasSecurityResource>--%>
                                <button id="exportCFExcel"
                                        class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 borderRadius4  pull-left mr">
                                    <i class="icon iconfont icon-daochu"></i> 导出
                                </button>
                                <!-- 客户记账按钮 -->
			                    <os:hasSecurityResource identifier="chargeKhBtn">
			                        <div id="cfkhjzan"></div>
			                    </os:hasSecurityResource>
			
			                    <!-- 客户合同按钮 -->
			                    <os:hasSecurityResource identifier="contractKhBtn">
			                        <div id="cfkhhtan"></div>
			                    </os:hasSecurityResource>
			
			                    <!-- 客户收费按钮 -->
			                    <os:hasSecurityResource identifier="getMoneyKhBtn">
			                        <div id="cfkhsfan"></div>
			                    </os:hasSecurityResource>
			
			                    <!-- 客户跟进按钮 -->
			                    <os:hasSecurityResource identifier="followKhBtn">
			                        <div id="cfkhgjan"></div>
			                    </os:hasSecurityResource>
			
			                    <!-- 客户申报按钮 -->
			                    <os:hasSecurityResource identifier="declareKhBtn">
			                        <div id="cfkhsban"></div>
			                    </os:hasSecurityResource>
                                <div class="pull-left mr">
                                    <div class="input-icon">
                                        <i class="fa fa-search colorBlue-10a0f7"></i>
                                        <input type="search" class="form-control borderRadius4 btnBorderColor"
                                               id="searchKhmc"
                                               placeholder="客户名称"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="portlet-scroller">
                        <div class="cycz"></div>
                        <div class="dataTables_wrapper no-footer">
                            <table class="table table-striped table-bordered table-hover backgroundWhite"
                                   id="cfList_data">
                                <thead>
                                <tr>
                                    <th width="2%"><input type="checkbox" name="selectcfListr"/></th>
                                    <th width="20%" style="text-align:left;">客户名称</th>
                                    <th width="35%">
                                        <div style="width:336px;">
                                            <div class="cc bb" id="aa1"></div>
                                            <div class="bb">&nbsp;已审核&nbsp;</div>
                                            <div class="dd bb" id="aa11"></div>
                                            <div class="bb">&nbsp;未审核&nbsp;</div>
                                            <div class="ee bb" id="aa111"></div>
                                            <div class="bb">&nbsp;未收费&nbsp;</div>
                                            <div class="ff bb" id="aa1111"></div>
                                            <div class="bb">&nbsp;欠费&nbsp;</div>
                                            <div class="orange bb" id="aa11111"></div>
                                            <div class="bb">&nbsp;催费&nbsp;</div>
                                        </div>
                                    </th>
                                    <th width="10%"></th>
                                    <th width="32%" style="text-align:left;">操作</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <os:hasSecurityResource identifier="dispatchedStaffBtn">
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
                                    <div class="col-md-12" id="getTree">
                                        <div class="input-icon">
                                            <i class="fa fa-search colorBlue-10a0f7"
                                               style="color: #ccc !important;"></i>
                                            <input type="search" class="form-control borderRadius4 btnBorderColor"
                                                   id="search_ay" placeholder="搜索"></div>
                                        <div id="cfList_manage_tree">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </os:hasSecurityResource>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/customerManage/cflist.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        cfList_data.setPath('<%=request.getContextPath()%>');
        cfList_data.init('<%=type%>');
    });
</script>