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
     /*ul {
         width: 200px;
         height: 100px;
         overflow-x: scroll;
         overflow-y: hidden;
         white-space:nowrap;  !* ul中的内容不换行 *!
     }*/
    /*#divjl{
        width: 996px;
        height: 120px;
        overflow-x:auto;
        overflow-y:hidden;
    }*/
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
                                        <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">检定地区</label>
                                            <input type="text" class="inputCommon appsysinfo-m" id="jddqdq" name="jddq" placeholder="请输入检定地区" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                        </div>
                                        <div class="openMore pull-left" style="margin-bottom: 0px;">
                                            <div class="date beginTime pull-left">
                                                <label class="labelCommon labelBg color666 dateLabel-m"
                                                       style="width: 80px !important;">检定日期</label>
                                                <input type="text" class="appsysinfo-m inputCommon " id="sbjddate1"
                                                       name="date1" style="border-radius: 0 !important; width: 100px">
                                                <span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button"
                                                    style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                            </div>
                                            <span style="float: left;margin: 5px">至</span>
                                            <div class="input-group date endTime pull-left">
                                                <input type="text" class="inputCommon appsysinfo-m" id="sbjddate2"
                                                       name="date2"
                                                       style="border-radius: 4px 0 0 4px!important;width: 100px">
                                                <span>
                                        <button class="btn btn-default appsysinfobtn-m" type="button"
                                                style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                            <i class="fa fa-calendar"></i>
                                        </button>
                                    </span>
                                            </div>
                                            <div style="clear: both"></div>
                                        </div>
                                    </form>
                                </div>
                                <!--按钮  begin-->
                                <div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
                                    <button id="<%=uuid%>yqsbjdSeatch"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                                    <button id="<%=uuid%>resetYqsbjd"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                                    <button id="<%=uuid%>yqsbjdjl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>检定记录</button>
                                    <button id="<%=uuid%>yqsbwhjl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>维护记录</button>
                                    <button id="<%=uuid%>yqsbhcjl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>核查记录</button>
                                    <button id="<%=uuid%>daochudqjdjl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>地区检定记录</button>
                                    <button id="<%=uuid%>daochujdjl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导出检定记录</button>
                                    <button id="<%=uuid%>daochuwhjl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导出维护记录</button>
                                    <button id="<%=uuid%>daochuhcjl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导出核查记录</button>

                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer"id = "divjl">
                    <form id="<%=uuid%>yqsbjdwhhcjl_delete">
                        <table class="table table-striped table-hover paramsTab" id="Yqsbjdwhjluu" width="100%">
                            <thead>
                            <tr class="color333">
                                <th class="text-left"><input type="checkbox" name="yqsbjlck"></th>
                                <th class="text-left">名称</th>
                                <th class="text-left">规格</th>
                                <th class="text-left">准确等级</th>
                                <th class="text-left">分辨力</th>
                                <th class="text-left">供应商</th>
                                <%---------------------------------%>
                                <th class="text-left">检定机构</th>
                                <th class="text-left">检定日期</th>
                                <th class="text-left">有效日期</th>
                                <th class="text-left">检定依据</th>
                                <th class="text-left">检定结论</th>
                                <th class="text-left">证书编号</th>
                                <th class="text-left">确认依据</th>
                                <th class="text-left">检定结果</th>
                                <%---------------------------------%>
                                <th class="text-left">维护人</th>
                                <th class="text-left">维护日期</th>
                                <th class="text-left">维护记录</th>
                                <%---------------------------------%>
                                <th class="text-left">核查人</th>
                                <th class="text-left">核查日期</th>
                                <th class="text-left">核查依据</th>
                                <th class="text-left">核查记录</th>
                                <th class="text-left">核查结果</th>
                            </tr>
                            </thead>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 检定记录模态框（Modal）-->
<div class="modal fade" id="<%=uuid%>myModalyqsbjdjl" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    检定周期记录
                </h4>
            </div>
            <form id="<%=uuid%>updatejd_form">
                <div class="modal-body">
                    <table>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>受控编号</label></span>
                                <input id="injdjl1" name="skbh" type="text" class="form-control" readonly>
                            </div></td>
                            <td>&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>设备名称</label></span>
                                <input id="injdjl2" name="sbmc" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>检定依据</label></span>
                                <input id="injdjl5" name="jdyj" type="text" class="form-control">
                            </div></td>
                            <td>&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>检定结论</label></span>
                                <input id="injdjl6" name="jdjl" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>证书编号</label></span>
                                <input id="injdjl7" name="zsbh" type="text" class="form-control">
                            </div></td>
                            <td>&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>确认依据</label></span>
                                <input id="injdjl8" name="qryj" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>检定结果</label></span>
                                <input id="injdjl9" name="jdjig" type="text" class="form-control">
                            </div></td>
                            <td>&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>检定机构</label></span>
                                <input id="injdjl10" name="jdjg" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="date beginTime pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">检定日期</label>
                                    <input id="injdjl3" type="text" readonly="" class="appsysinfo-m inputCommon" name="jdrq" style="border-radius: 0 !important; width: 100px">
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
                                    <label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">有效日期</label>
                                    <input id="injdjl4" type="text" readonly="" class="appsysinfo-m inputCommon" name="yxrq" style="border-radius: 0 !important; width: 100px">
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
                <button type="button" id="gbyqsbzdjl" class="btn btn-default" data-dismiss="modal">关闭
                </button>
                <button id="yqsbzdjlreset" type="button" class="btn btn-primary" style="display: none">
                    重置
                </button>
                <button id="yqsbzdjlsubmit" type="button" class="btn btn-primary">
                    提交
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!-- 维护计划制定模态框（Modal）-->
<div class="modal fade" id="<%=uuid%>myModalyqsbwhjl" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabelwh">
                    维护周期记录
                </h4>
            </div>
            <form id="<%=uuid%>updatewhjl_form">
                <div class="modal-body">
                    <table>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>受控编号</label></span>
                                <input id="inwhjl1" name="skbh" type="text" class="form-control" readonly>
                            </div></td>
                            <td>&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>设备名称</label></span>
                                <input id="inwhjl2" name="sbmc" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>维护记录</label></span>
                                <input id="inwhjl4" name="whjl" type="text" class="form-control">
                            </div></td>
                            <td>&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>维护人</label></span>
                                <input id="inwhjl5" name="whr" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="date beginTime pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">维护日期</label>
                                    <input id="inwhjl3" type="text" readonly="" class="appsysinfo-m inputCommon" name="whrq" style="border-radius: 0 !important; width: 100px">
                                    <span>
                                            <button class="btn btn-default appsysinfobtn-m" type="button" style="border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                </div>
                            </td>
                            <td>&nbsp;&nbsp;</td>
                        </tr>
                    </table>
                </div>
            </form>
            <div class="modal-footer">
                <button type="button" id="gbyqsbzdwhjl" class="btn btn-default" data-dismiss="modal">关闭
                </button>
                <button id="yqsbzdwhjlreset" type="button" class="btn btn-primary" style="display: none">
                    重置
                </button>
                <button id="yqsbzdwhjlsubmit" type="button" class="btn btn-primary">
                    提交
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!-- 核查计划制定模态框（Modal）-->
<div class="modal fade" id="<%=uuid%>myModalyqsbhcjl" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabelhcjl">
                    核查周期记录
                </h4>
            </div>
            <form id="<%=uuid%>updatehcjl_form">
                <div class="modal-body">
                    <table>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>受控编号</label></span>
                                <input id="inhcjl1" name="skbh" type="text" class="form-control" readonly>
                            </div></td>
                            <td>&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>设备名称</label></span>
                                <input id="inhcjl2" name="sbmc" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>核&nbsp;&nbsp;查&nbsp;&nbsp;人</label></span>
                                <input id="inhcjl3" name="hcr" type="text" class="form-control">
                            </div></td>
                            <td>&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>核查依据</label></span>
                                <input id="inhcjl4" name="hcyj" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>核查记录</label></span>
                                <input id="inhcjl5" name="hcjl" type="text" class="form-control">
                            </div></td>
                            <td>&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>核查结果</label></span>
                                <input id="inhcjl6" name="hcjg" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="date beginTime pull-left">
                                    <label class="labelCommon labelBg color666 dateLabel-m" style="width: 80px !important;">核查日期</label>
                                    <input id="inhcjl7" type="text" readonly="" class="appsysinfo-m inputCommon" name="hcrq" style="border-radius: 0 !important; width: 100px">
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
                <button type="button" id="gbyqsbzdhcjl" class="btn btn-default" data-dismiss="modal">关闭
                </button>
                <button id="yqsbzdhcjlreset" type="button" class="btn btn-primary" style="display: none">
                    重置
                </button>
                <button id="yqsbzdhcjlsubmit" type="button" class="btn btn-primary">
                    提交
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/jdwhhcjl/yqsbjdjh.js"></script>
<script src="<%=request.getContextPath()%>/assets/pages/laydate/laydate.js"></script>
<script type="text/javascript">
    //日期插件
    $("#injdjl3").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
    $("#injdjl4").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
    $("#inwhjl3").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
    $("#inhcjl7").on("click",function(){
        laydate.render({
            elem : this,
            trigger:"click",
            show : true
        });
    })
</script>
<script type="text/javascript">
    $(function () {
        yqyysyListyqsbjdjl.setPath("<%=request.getContextPath()%>")
        yqyysyListyqsbjdjl.init("<%=uuid%>");
    })
</script>


