<%@ page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<%
    UUID uuid = UUID.randomUUID();
%>
<%--<%
    java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    String txtDate = format.format(currentTime); //将日期时间格局化
%>--%>
<style>
    .search-input-small {
        width: auto !important;
    }

    .btnwhite {
        background-color: #fff;
        border: 1px solid #dedede;
        border-radius: 3px;
    }

    .btnBorderColor {
        color: #10a0f7;
        border: 1px solid #10a0f7;
    }

    #htshDIV1 .rotate1 {
        transform: rotate(180deg);
    }

    /* 总计样式 */

    .total-tfoot th {
        font-weight: normal !important;
        font-size: 12px !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        padding-right: 8px !important;
        padding-left: 8px !important;
    }

    #ypcb_data_wrapper {
        overflow-x: auto;
    }

    #ypcb_data_wrapper .table {
        width: auto !important;
    }

    #ypcb_data_wrapper .table th {
        white-space: nowrap;
    }
</style>
<div class="" id="ypcb<%=uuid %>">
    <div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
        <div class="portlet light bordered" style="padding: 8px">
            <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 10px;">
                                <div style="clear:both;overflow: hidden;">
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">合同名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="htmc"
                                               placeholder="请输入委托合同名称"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="ypmc"
                                               placeholder="请输入样品名称"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <div class="input-group  search-label-small pull-left"
                                         style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">检测机构</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="jcjg"
                                               placeholder="请输入检测机构名称"
                                               style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                    </div>
                                    <!-- <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">合同编号</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="htbh" placeholder="请输入合同编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                        </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

                                        <label class="labelCommon labelBg color666 dateLabel-m">合同类型</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="htlx" placeholder="请输入合同类型" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div> -->
                                </div>
                                <!-- <div style="clear:both;overflow: hidden;margin-top: 5px;">
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

                                        <label class="labelCommon labelBg color666 dateLabel-m">委托单位名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="wtdwmc" placeholder="请输入委托单位名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                        </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">

                                        <label class="labelCommon labelBg color666 dateLabel-m">业务人员</label>
                                        <input type="text" class="inputCommon appsysinfo-m" name="ywry" placeholder="请输入业务人员" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />

                                    </div>
                                    <div class="openMore pull-left" style="margin-bottom: 0px;">
                                        <div class="date beginTime pull-left">
                                            <label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">合同录入日期</label>
                                            <input type="text" readonly="" class="appsysinfo-m inputCommon " name="htlrstarDate" style="border-radius: 0 !important; width: 100px">
                                            <span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                        </div>
                                        <span style="float: left;margin: 5px">至</span>
                                        <div class="input-group date endTime pull-left">
                                            <input type="text" readonly="" class="inputCommon appsysinfo-m" name="htlrendDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
                                            <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                        </div>
                                        <div style="clear: both"></div>
                                    </div>
                                </div>
                                <div style="clear:both;overflow: hidden;margin: 5px auto;">

                                    <div class="openMore pull-left" style="margin-bottom: 0px;">
                                        <div class="date beginTime pull-left">
                                            <label class="labelCommon labelBg color666 dateLabel-m">最晚报告</label>
                                            <input type="text" readonly="" class="appsysinfo-m inputCommon " name="zwbgstarDate" style="border-radius: 0 !important; width: 100px">
                                            <span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                        </div>
                                        <span style="float: left;margin: 5px">至</span>
                                        <div class="input-group date endTime pull-left">
                                            <input type="text" readonly="" class="inputCommon appsysinfo-m" name="zwbgendDate" style="border-radius: 4px 0 0 4px!important;width: 100px">
                                            <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                        </div>
                                    </div>
                                </div> -->

                                <!--按钮  begin-->
                                <br>
                                <div style="clear: both;">
                                    <!--人员选择-->
                                 <%--   <button id="btn_ryxz<%=uuid%>"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>提交
                                    </button>--%>
                                    <!--拆包-->
                                    <%--<button id="btn_cb"--%>
                                            <%--class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"--%>
                                            <%--data-toggle="modal" data-target="#myModalYpcb">--%>
                                        <%--<i class="fa fa-plus iconMr"></i>分包--%>
                                    <%--</button>--%>
                                    <%--<!-- 模态框（Modal） -->--%>
                                    <%--<div class="modal fade" id="myModalYpcb" tabindex="-1" role="dialog"--%>
                                         <%--aria-labelledby="myModalLabel" aria-hidden="true">--%>
                                        <%--<div class="modal-dialog" style="width: 768px">--%>
                                            <%--<div class="modal-content">--%>
                                                <%--<form id="ypcb_mtk">--%>
                                                    <%--<div class="modal-header">--%>
                                                        <%--<button type="button" class="close" data-dismiss="modal"--%>
                                                                <%--aria-hidden="true">&times;--%>
                                                        <%--</button>--%>
                                                        <%--<h4 class="modal-title" id="myModalLabel">--%>
                                                            <%--样品拆包评审--%>
                                                        <%--</h4>--%>
                                                        <%--<input type="hidden" id="cb_id" name="id">--%>
                                                        <%--<input type="hidden" id="cb_jcxmid" name="jcxmid">--%>
                                                    <%--</div>--%>

                                                    <%--<div class="modal-body">--%>
                                                        <%--<div class="row">--%>
                                                            <%--<div class="col-md-6  col-xs-6">--%>
                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="labelCommon labelWidth-col-two color666"><span--%>
                                                                            <%--class="required"> * </span>合同名称</label>--%>
                                                                    <%--<input type="text"--%>
                                                                           <%--class="inputCommon inputWidth-col-two"--%>
                                                                           <%--placeholder="获取" id="cb_htmc" name="htmc">--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                            <%--<div class="col-md-6  col-xs-6">--%>
                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="labelCommon labelWidth-col-two color666"><span--%>
                                                                            <%--class="required"> * </span>样品名称</label>--%>
                                                                    <%--<input type="text"--%>
                                                                           <%--class="inputCommon inputWidth-col-two"--%>
                                                                           <%--placeholder="获取" id="cb_ypmc" name="ypmc">--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>
                                                        <%--<br>--%>
                                                        <%--<div class="row">--%>
                                                            <%--<div class="col-md-6 col-xs-6">--%>
                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="labelCommon labelWidth-col-two color666"><span--%>
                                                                            <%--class="required"> * </span>评审人</label>--%>
                                                                    <%--<input type="text"--%>
                                                                           <%--class="inputCommon inputWidth-col-two"--%>
                                                                           <%--placeholder="选择" id="cb_psr" name="apsr">--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                            <%--<div class="col-md-6  col-xs-6">--%>
                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="labelCommon labelWidth-col-two color666">评审时间</label>--%>
                                                                    <%--<div class="input-group date dateOfBusiness">--%>
                                                                    <%--<span>--%>
                                                                        <%--<input type="text" readonly=""--%>
                                                                               <%--class="appsysinfo-m inputCommon"--%>
                                                                               <%--id="cb_pssj_time"--%>
                                                                               <%--name="apssj"--%>
                                                                               <%--style="width: 160px!important;border-radius: 0 !important;">--%>
                                                                        <%--<button class="btn btn-default appsysinfobtn-m"--%>
                                                                                <%--type="button"--%>
                                                                                <%--style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">--%>
                                                                            <%--<i class="fa fa-calendar"></i>--%>
                                                                        <%--</button>--%>
                                                                    <%--</span>--%>
                                                                    <%--</div>--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>
                                                        <%--<br>--%>
                                                        <%--<div class="row">--%>
                                                            <%--<div class="col-md-6 col-xs-6">--%>
                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="labelCommon labelWidth-col-two color666">是否外包</label>--%>
                                                                    <%--<select class="form-control" id="cb_sfwb"--%>
                                                                            <%--style="border-radius: 0 4px 4px 0!important;width: 200px"--%>
                                                                            <%--name="if_fb">--%>
                                                                        <%--<option value="1">是</option>--%>
                                                                        <%--<option value="0">否</option>--%>
                                                                    <%--</select>--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                            <%--<div class="col-md-6  col-xs-6">--%>
                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="labelCommon labelWidth-col-two color666">报告类型</label>--%>
                                                                    <%--<select class="form-control" id="cb_bglx"--%>
                                                                            <%--style="border-radius: 0 4px 4px 0!important;width: 200px"--%>
                                                                            <%--name="abglx">--%>
                                                                        <%--<option value="1">电子文档</option>--%>
                                                                        <%--<option value="0">纸质文档</option>--%>
                                                                    <%--</select>--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>
                                                        <%--<br>--%>
                                                        <%--<div class="row">--%>
                                                            <%--<div class="col-md-6 col-xs-6">--%>
                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="labelCommon labelWidth-col-two color666"><span--%>
                                                                            <%--class="required"> * </span>检测机构</label>--%>
                                                                    <%--<input type="text"--%>
                                                                           <%--class="inputCommon inputWidth-col-two"--%>
                                                                           <%--id="cb_jcjg" name="ajcjg">--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                            <%--<div class="col-md-6  col-xs-6">--%>
                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="labelCommon labelWidth-col-two color666"><span--%>
                                                                            <%--class="required"> * </span>联系人</label>--%>
                                                                    <%--<input type="text"--%>
                                                                           <%--class="inputCommon inputWidth-col-two"--%>
                                                                           <%--id="cb_lxr" name="alxr">--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>
                                                        <%--<br>--%>
                                                        <%--<div class="row">--%>
                                                            <%--<div class="col-md-6 col-xs-6">--%>
                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="labelCommon labelWidth-col-two color666">电话</label>--%>
                                                                    <%--<input type="text"--%>
                                                                           <%--class="inputCommon inputWidth-col-two"--%>
                                                                           <%--id="cb_dh" name="atel">--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                            <%--<div class="col-md-6  col-xs-6">--%>
                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="labelCommon labelWidth-col-two color666">邮箱</label>--%>
                                                                    <%--<input type="text"--%>
                                                                           <%--class="inputCommon inputWidth-col-two"--%>
                                                                           <%--id="cb_yx" name="aema">--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>
                                                        <%--<br>--%>
                                                        <%--<div class="row">--%>
                                                            <%--<div class="col-md-12 col-xs-12">--%>
                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="labelCommon labelWidth-col-two color666"--%>
                                                                           <%--style="height: 80px;line-height: 80px;">备注</label>--%>
                                                                    <%--<textarea name="abz" id="cb_bz"--%>
                                                                              <%--maxlength="300"--%>
                                                                              <%--class="inputCommon mr"--%>
                                                                              <%--style="border: 1px solid #e5e5e5!important;height: 80px;width: 580px;border-radius: 0 4px 4px 0!important;"></textarea>--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>
                                                    <%--</div>--%>
                                                <%--</form>--%>
                                                <%--<div class="modal-footer">--%>
                                                    <%--<button type="button" id="ypcb_bc"--%>
                                                            <%--class="btn btn-success btnBlue borderRadius4 colorfff">--%>
                                                        <%--<i class="fa fa-save  iconMr"></i>保存--%>
                                                    <%--</button>--%>
                                                    <%--<button type="button"--%>
                                                            <%--class="btn btn-default borderRadius4 color666"--%>
                                                            <%--data-dismiss="modal">--%>
                                                        <%--<i class="fa fa-times  iconMr"></i>关闭--%>
                                                    <%--</button>--%>
                                                <%--</div>--%>
                                            <%--</div><!-- /.modal-content -->--%>
                                        <%--</div><!-- /.modal -->--%>
                                    <%--</div>--%>
                                    <!-- 接收 -->
                                    <button id="btn_tg"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>通过
                                    </button>
                                    <button id="btn_th"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-plus iconMr"></i>退回
                                    </button>
                                    <button id="ypcbSearch"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-search iconMr"></i>查询
                                    </button>
                                    <button id="reset"
                                            class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                        <i class="fa fa-refresh iconMr"></i>重置
                                    </button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <form id="ypcb_form">
                        <table class="table table-striped table-bordered table-hover" id="ypcb_data" name="ypcb-table"
                               style="width: 100%;margin-top: 15px!important">
                            <thead>
                            <tr>
                                <th field="ck"><input type="checkbox" class="check-all-td"/></th>
                                <%--<th>操作</th>--%>
                                <th>合同编号</th>
                            <%--    <th>合同名称</th>--%>
                                <th>样品名称</th>
                                <th>检测类别</th>
                                <th>检测项目</th>
                                <th>产品大类名称</th>
                                <th>亚类</th>
                                <th>次亚类</th>
                                <th>细类</th>
                                <th>检测方法</th>
                                <th>状态</th>
                                <th>是否外包</th>
                                <th>评审人</th>
                                <th>评审时间</th>
                                <th>检测机构</th>
                                <th>报告类型</th>
                                <th>联系人</th>
                                <th>电话</th>
                                <th>邮箱</th>
                                <th>是否完成</th>
                                <th>接收人</th>
                                <th>接收时间</th>
                                <th>备注</th>
                                <th style="display: none">检测项目ID</th>
                            </tr>
                            </thead>
                        </table>
                    </form>
                </div>

            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/ypcbsp.js" type="text/javascript"></script>
<script src="<%= request.getContextPath()%>/assets/pages/laydate/laydate.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        ypcbqrlist.setPath("<%= request.getContextPath() %>");
        ypcbqrlist.init("<%= uuid %>");
    });
    $("#cb_pssj_time").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
    $("#reset").click(function () {
        $("input").val("");
    });
</script>