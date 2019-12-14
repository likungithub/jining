<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@ page import="java.util.UUID" %>

<%
    UUID uuid = UUID.randomUUID();
    String id = request.getParameter("id");
    String name = request.getParameter("name");
%>
<style>

    #ypTable_data .bb {
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

    #ypTable_data td:nth-child(2) {
        text-align: left;
    }

    #ypTable_data td:nth-child(3) {
        text-align: center;
    }

    #ypTable_data td {
        padding: 6px !important;
    }

    #ypTable_data td:nth-child(4) {
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

    #ypList-manager-content .getTree .jstree-icon {
        /* background: url(http://tui518.oss-cn-shanghai.aliyuncs.com/avatar/2017082….jpg); */
        /* background-size: cover; */
    }

    .getTree .jstree-default .jstree-leaf > .jstree-ocl {
        background-position: -68px -1px;
        /*display: none;*/
    }

    .getTree .jstree-default .jstree-closed > .jstree-ocl {
        background-position: -100px -4px;
        /*display: none;*/
    }

    #ypTable_data .ff {
        width: 13px;
        height: 13px;
        background: #FF2625;
        margin-top: 4px;
        position: relative;
        top: 1px;
        border-radius: 4px !important;
    }

    #ypTable_data .cc {
        width: 13px;
        height: 13px;
        background: #A8E240;
        margin-top: 4px;
        border-radius: 4px !important;
    }

    #ypTable_data .dd {
        width: 13px;
        height: 13px;
        background: #00B8EE;
        margin-top: 4px;
        border-radius: 4px !important;
    }

    #ypTable_data .ee {
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

    #ypTable_data .orange {
        width: 13px;
        height: 13px;
        background: orange;
        margin-top: 4px;
        border-radius: 4px !important;
        position: relative;
        top: 1px;
    }

    #ypTable_data .btn-default:hover {
        border-color: #10a0f7 !important;
    }


    #ypTable_data .table > tbody > tr > td, #ypTable_data .table > tbody > tr > th, #ypTable_data .table > tfoot > tr > td, #ypTable_data .table > tfoot > tr > th, #ypTable_data .table > thead > tr > td, #ypTable_data .table > thead > tr > th {
        vertical-align: middle !important;
        text-align: left;
        font-weight: normal !important;
    }

    #ypList-manager-content .pad {
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

    #ypTable_data table.dataTable tbody td {
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .ypTable_data td:nth-child(4) {
        text-align: left !important;
        padding-left: 29px !important;
    }

    #ypTable_data td:nth-child(2) {
        text-align: left !important;
    }

    #ypTable_data .ui-layout-content {
        padding: 0px;
    }

    #page-container #ypTable_data_info {
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

    #ypList-manager-content .slimScrollDiv {
        height: auto !important;
    }

    #ypList-manager-content .slimScrollDiv .portlet-scroller {
        height: auto !important;
    }
    
    #ypList-manager-content   .rotate1 {
        transform: rotate(180deg);
    }
    #ypList-manager-content .moreInfo
    {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        padding: 0 4px;
        cursor: pointer;
    }
    #ypList-manager-content .moreInfo .btnM{
        width: 100%;
        border: none
    }
</style>
<div id="ypList-manager-content">
    <div class="ui-layout-west" id="ypList<%=uuid %>" style="padding: 10px!important;">
        <div class="ui-layout-content contentBgColor" style="background:#fff!important;padding: 0;">
            <div class="portlet">
                <div class="portlet-body form" style="overflow-x:hidden;min-height: 242px">
                    <div class="table-toolbar" style="margin: 0">
                        <div class="row" style="background: #fff;">
                            <div class="col-md-12" style="background: #fff;padding-right: 8px;padding-left: 0">
                                <div class="openMore" style="margin-bottom: 0px;float: left;">
                                    <div class="col-md-12" style="background: #fff;padding-right: 8px;padding-left: 0">
                                        <%--<button id="addNewYp" class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">--%>
                                            <%--<i class="fa fa-plus"></i> 新增--%>
                                        <%--</button>--%>

                                        <%--<button id="importYp"--%>
                                                <%--class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">--%>
                                            <%--<i class="icon iconfont icon-daoru"></i> 导入样品--%>
                                        <%--</button>--%>
                                        <%--<button id="exportYp"--%>
                                                <%--class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">--%>
                                            <%--<i class="icon iconfont icon-daochu"></i> 导出样品--%>
                                        <%--</button>--%>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="background: #fff;">
                            <div class="openMore" style="margin-bottom: 0px;float: left;padding-top: 10px;">
                                <div class="col-md-12" style="background: #fff;padding-right: 8px;padding-left: 0">
                                     <select id="selectType1" style="width:140px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
								    border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
								    border-bottom-right-radius: 4px !important;">
                                            <%--<option value="001">产品大类</option>--%>
                                            <option value="002">合同名称</option>
                                            <option value="003">样品名称</option>
                                        </select>

                                    <div class="pull-right" style="margin-left: 10px;">
                                        <div class="input-icon" style="width:222px;position: relative">

                                            <input type="search" class="form-control  borderRadius4" id="ypSearch" name="ypSearch"
                                                   placeholder="请输入查询内容"  style="padding-right: 50px;width: 220px;padding-left: 10px"></div>
                                        <i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" id="btnypSearch" style="margin-right: 5px;
																															position: absolute;
																															right: 15px;
																															top: 0px;
																															cursor: pointer;
																															height: 33px;
																															line-height: 33px;
																															width: 45px;
																															text-align: center;
																															border-left: 1px solid #dedede;
																															font-size: 20px!important;"></i>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <%--<button id=""--%>
                                <%--class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">--%>
                            <%--<i class="icon iconfont icon-shanchu"></i> --%>
                        <%--</button>--%>
                        <button id="delypList" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>批量删除</button>

                    </div>

                    <div style="clear: both;"></div>
                    <div class="portlet-scroller">
                        <div class="dataTables_wrapper no-footer">
                            <table class="table table-striped table-bordered table-hover backgroundWhite"
                                   id="ypTable_data">
                                <thead>
                                <tr>
                                    <th width="2%" style="padding-left: 6px" class="text-left"><input type="checkbox" name="selectyplist"/>
                                    <th width="8%">操作</th>
                                    <th width="12%">样品编号</th>
                                    <th width="11%">样品名称</th>
                                    <th width="10%">样品数量</th>
                                    <th width="10%">样品数量单位</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ui-layout-center" id="jcxmList<%=uuid %>"  style="padding: 10px!important;">
        <div class="ui-layout-content contentBgColor" style="background:#fff!important;padding: 0;">
            <div class="portlet">
                <div class="portlet-body form" style="overflow-x:hidden;min-height: 242px">
                    <div class="table-toolbar" style="margin: 0">
                        <div class="row" style="background: #fff;">
                            <div class="col-md-12" style="background: #fff;padding-right: 8px;padding-left: 0">
                                <div class="openMore" style="margin-bottom: 0px;float: left;">
                                    <%--<div class="col-md-12" style="background: #fff;padding-right: 8px;padding-left: 0">--%>
                                        <%--<button id="deJcxmlList"--%>
                                                <%--class="btn  btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">--%>
                                            <%--<i class="icon iconfont icon-shanchu"></i> 批量删除--%>
                                        <%--</button>--%>
                                    <%--</div>--%>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="background: #fff;">
                            <div class="openMore" style="margin-bottom: 0px;float: left;padding-top: 10px;">
                                <div class="col-md-12" style="background: #fff;padding-right: 8px;padding-left: 0">
                                    <select id="selectType2" style="width:140px; border-top-right-radius:4px !important;border-bottom-right-radius:4px !important;height:33px;border-top-right-radius: 0px !important;
								    border-bottom-right-radius: 0px !important;font-size:12px !important;border-top-left-radius:0px !important;border-bottom-left-radius:0px !important;border-top-right-radius: 4px !important;
								    border-bottom-right-radius: 4px !important;">
                                        <option value="001">检测项目名称</option>
                                        <%--<option value="002">检测方法</option>--%>
                                    </select>
                                    <div class="pull-right" style="margin-left: 10px;">
                                        <div class="input-icon" style="width:222px;position: relative">

                                            <input type="search" class="form-control  borderRadius4" id="jcxmSearch" name="ypSearch"
                                                   placeholder="请输入查询内容"  style="padding-right: 50px;width: 220px;padding-left: 10px"></div>
                                        <i class="fa fa-search colorBlue-10a0f7 searchIcoBtn" id="btnjcxmSearch" style="margin-right: 5px;
																															position: absolute;
																															right: 15px;
																															top: 0px;
																															cursor: pointer;
																															height: 33px;
																															line-height: 33px;
																															width: 45px;
																															text-align: center;
																															border-left: 1px solid #dedede;
																															font-size: 20px!important;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button id="deJcxmlList" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>批量删除</button>
                    </div>
                    <div style="clear: both;"></div>
                    <div class="portlet-scroller">
                        <div class="dataTables_wrapper no-footer">
                            <table class="table table-striped table-bordered table-hover backgroundWhite"
                                   id="jcxmTable_data">
                                <thead>
                                <tr>
                                    <th width="2%" style="padding-left: 6px" class="text-left"><input type="checkbox" name="selectjcxmlist"/>
                                    <th width="10%">检测项目名称</th>
                                    <th width="5%">检出限</th>
                                    <th width="8%">限量值 </th>
                                    <th width="10%">限量值默认值</th>
                                    <th width="8%">计量单位</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/ypList.js"
        type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        ypTable_data.setPath('<%=request.getContextPath()%>');
        ypTable_data.init('<%=id%>','<%=name%>', '<%=uuid%>');
    });
</script>