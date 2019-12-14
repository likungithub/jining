<%@page import="java.util.UUID"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
    .rotate1 {
        atetransform: rotate(180deg);
    }
</style>
<%
    String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 5px 10px;">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 10px;margin-bottom: 10px;">
                                <div style="clear:both;overflow: hidden;margin-top: 5px;">
                                    <form id="findByNabh">
                                        <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">设备名称</label>
                                            <input type="text" class="inputCommon appsysinfo-m" id="sbmc" name="sbmc" placeholder="请输入仪器名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                        </div>
                                        <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">受控编号</label>
                                            <input type="text" class="inputCommon appsysinfo-m" id="skbh" name="skbh" placeholder="请输入受控编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                        </div>
                                    </form>
                                </div>
                                <!--按钮  begin-->
                                <div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
                                    <button id="yqsbjdSeatch"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                                    <button id="resetYqsbjd"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                                    <button id="yqsbjdjh" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>检定计划</button>
                                    <button id="yqsbwhjh" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>维护计划</button>
                                    <button id="yqsbhcjh" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>核查计划</button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <form id="<%=uuid%>yqsbjdwhform_delete">
                        <table class="table table-striped table-hover paramsTab" id="Yqsbjdwh" width="100%">
                            <thead>
                            <tr class="color333">
                                <th class="text-left"><input type="checkbox" name="yqsbjdck"></th>
                                <th class="text-left">设备名称</th>
                                <th class="text-left">规格型号</th>
                                <th class="text-left">准确度等级</th>
                                <th class="text-left">分辨力</th>
                                <th class="text-left">生产厂商</th>
                                <th class="text-left">检定机构</th>
                                <th class="text-left">检定日期</th>
                                <th class="text-left">下次检定日期</th>
                                <th class="text-left">保养频次</th>
                                <th class="text-left">维护日期</th>
                                <th class="text-left">下次维护日期</th>
                                <th class="text-left">核查频次</th>
                                <th class="text-left">核查日期</th>
                            </tr>
                            </thead>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 检定计划制定模态框（Modal）-->
<div class="modal fade" id="<%=uuid%>myModalyqsbjd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    制定检定周期计划
                </h4>
            </div>
            <form id="<%=uuid%>updatejd_form">
                <div class="modal-body">
                    <table>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>受控编号</label></span>
                                <input id="injd1" name="skbh" type="text" class="form-control" readonly>
                            </div></td>
                            <td>&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>设备名称</label></span>
                                <input id="injd2" name="sbmc" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="date beginTime pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">检定日期</label>
                                    <input id="injd3" type="text" readonly="" class="appsysinfo-m inputCommon" name="jhjdrq" style="border-radius: 0 !important; width: 100px">
                                    <span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                </div>
                            </td>
                            <td>&nbsp;&nbsp;</td>
                            <td>
                                <div class="date beginTime pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">下次检定日期</label>
                                    <input id="injd4" type="text" readonly="" class="appsysinfo-m inputCommon" name="jhxcjdrq" style="border-radius: 0 !important; width: 100px">
                                    <span>
                                         <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                         </button>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </form>
            <div class="modal-footer">
                <button type="button" id="gbyqsbzdjh" class="btn btn-default" data-dismiss="modal">关闭
                </button>
                <button id="yqsbzdjhreset" type="button" class="btn btn-primary" style="display: none">
                    重置
                </button>
                <button id="yqsbzdjhsubmit" type="button" class="btn btn-primary">
                    提交
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!-- 维护计划制定模态框（Modal）-->
<div class="modal fade" id="<%=uuid%>myModalyqsbwh" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabelwh">
                    制定维护周期计划
                </h4>
            </div>
            <form id="<%=uuid%>updatewh_form">
                <div class="modal-body">
                    <table>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>受控编号</label></span>
                                <input id="inwh1" name="skbh" type="text" class="form-control" readonly>
                            </div></td>
                            <td>&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>设备名称</label></span>
                                <input id="inwh2" name="sbmc" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="date beginTime pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">维护日期</label>
                                    <input id="inwh3" type="text" readonly="" class="appsysinfo-m inputCommon" name="jhwhrq" style="border-radius: 0 !important; width: 100px">
                                    <span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                </div>
                            </td>
                            <td>&nbsp;&nbsp;</td>
                            <td>
                                <div class="date beginTime pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">下次检定日期</label>
                                    <input id="inwh4" type="text" readonly="" class="appsysinfo-m inputCommon" name="jhxcwhrq" style="border-radius: 0 !important; width: 100px">
                                    <span>
                                         <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                         </button>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </form>
            <div class="modal-footer">
                <button type="button" id="gbyqsbzdwhjh" class="btn btn-default" data-dismiss="modal">关闭
                </button>
                <button id="yqsbzdwhjhreset" type="button" class="btn btn-primary" style="display: none">
                    重置
                </button>
                <button id="yqsbzdwhjhsubmit" type="button" class="btn btn-primary">
                    提交
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!-- 核查计划制定模态框（Modal）-->
<div class="modal fade" id="<%=uuid%>myModalyqsbhc" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabelhc">
                    制定维护周期计划
                </h4>
            </div>
            <form id="<%=uuid%>updatehc_form">
                <div class="modal-body">
                    <table>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>受控编号</label></span>
                                <input id="inhc1" name="skbh" type="text" class="form-control" readonly>
                            </div></td>
                            <td>&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>设备名称</label></span>
                                <input id="inhc2" name="sbmc" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="date beginTime pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">核查日期</label>
                                    <input id="inhc3" type="text" readonly="" class="appsysinfo-m inputCommon" name="jhhcrq" style="border-radius: 0 !important; width: 100px">
                                    <span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </form>
            <div class="modal-footer">
                <button type="button" id="gbyqsbzdhcjh" class="btn btn-default" data-dismiss="modal">关闭
                </button>
                <button id="yqsbzdhcjhreset" type="button" class="btn btn-primary" style="display: none">
                    重置
                </button>
                <button id="yqsbzdhcjhsubmit" type="button" class="btn btn-primary">
                    提交
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/yqsbjd/yqsbjdjh.js"></script>
<script src="<%=request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script type="text/javascript">
    //日期插件
    $("#injd3").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
    $("#injd4").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
    $("#inwh3").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
    $("#inwh4").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
    $("#inhc3").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
</script>
<script type="text/javascript">
    $(function () {
        yqyysyListyqsbjdjh.setPath("<%=request.getContextPath()%>")
        yqyysyListyqsbjdjh.init("<%=uuid%>");
    })
</script>


