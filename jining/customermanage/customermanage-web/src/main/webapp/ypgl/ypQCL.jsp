<%@ page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
    UUID uuid = UUID.randomUUID();
%>
<div class="" id="ypQCL<%=uuid %>" style="float: left;">
    <div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
        <div class="portlet light bordered" style="padding: 8px">
            <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 10px;">
                                <div style="clear:both;">
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" id="ypmc<%=uuid%>" placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">所属委托</label>
                                        <input type="text" class="inputCommon appsysinfo-m" id="wtid<%=uuid%>" placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                </div>
                                <br>
                                <!--按钮  begin-->
                                <div style="clear: both;">
                                    <br>
                                    <button id="ypqclSearch_btn<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                                    <button id="ypqclReset_btn<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                                    <button id="ypqclAdd_btn" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>领取</button>
                                    <button id="ypqclCL_btn" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>处理</button>
                                    <button id="ypqclFH_btn" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>返还</button>
                                    <button id="ypqclDel_btn" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>删除</button>
                                    <button id="ypqclUp_btn" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>修改</button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" id="ypqcl_list_data<%=uuid%>" name="" style="width:100%;margin-top: 15px!important">
                        <thead>
                        <tr>
                            <th field="ck" class="text-left" width="20px"><input type="checkbox" class="check-all-td" name="ypqclcheckz"/></th>
                            <th width="12%">所属委托</th>
                            <th width="12%">样品编号</th>
                            <th width="12%">样品名称</th>
                            <th width="12%">制备方法</th>
                            <th width="12%">质量</th>
                            <th width="12%">数量</th>
                            <th width="12%">领取质量</th>
                            <th width="12%">领取数量</th>
                            <th width="12%">返还质量</th>
                            <th width="12%">返还数量</th>
                            <th width="12%">状态</th>
                            <th width="12%">录入人员</th>
                            <th width="12%">处理人员</th>
                            <th width="12%">返还人员</th>
                            <th width="12%">备注</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<%--样品处理信息  修改模态框--%>
<div id="ypqclUPBox<%=uuid%>" class="modal fade" tabindex="-1"  style="display: none" aria-labelledby="myModalLabel2" aria-hidden="true">
    <div class="dataTables_wrapper no-footer" style="width:840px;margin-left:260px;margin-top:140px;">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                &times;
            </button>
            <h4 class="modal-title" id="myModalLabel4" style="margin-top:10px">
                样品领取信息_修改
            </h4>
        </div>
        <form id="ypqcl_update_from<%=uuid%>" role="form" class="form-inline" autocomplete="off" style="margin-left:56px">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group pull-left">
                            <input type="hidden" name="id" id="ypqcl_id">
                            <label class="labelCommon labelWidth-col-two color666">样品名称</label>
                            <input type="text" class="inputCommon  inputWidth-col-two" name="ypmc" id="ypqcl_ypmc" readOnly>
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">样品编号</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="ypbm" id="ypqcl_ypbm">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">所属委托</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="wtid" id="ypqcl_wtid">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">制备方法</label>
                            <input type="text" class="inputCommon inputWidth-col-two"  name="zbff" id="ypqcl_zbff">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">数量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="sl" id="ypqcl_sl">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">质量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="zl" id="ypqcl_zl">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">备注</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="bz" id="ypqcl_bz">
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" id="ypclsq_bc"
                    class="btn btn-success btnBlue borderRadius4 colorfff">
                <i class="fa fa-save  iconMr"></i>保存
            </button>
            <button type="button"
                    class="btn btn-default borderRadius4 color666"
                    data-dismiss="modal">
                <i class="fa fa-times  iconMr"></i>关闭
            </button>
        </div>
    </div>
</div>

<%--样品处理  模态框--%>
<div id="ypqcl_chuli_Box<%=uuid%>" class="modal fade" tabindex="-1"  style="display: none" aria-labelledby="myModalLabel2" aria-hidden="true">
    <div class="dataTables_wrapper no-footer" style="width:840px;margin-left:260px;margin-top:140px;">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                &times;
            </button>
            <h4 class="modal-title" id="lingquBT" style="margin-top:10px">
            </h4>
        </div>
        <form id="ypqcl_chuli_from<%=uuid%>" role="form" autocomplete="off" class="form-inline">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group pull-left">
                            <input type="hidden"  name="id" id="ypqcl_id_lq">
                            <label class="labelCommon labelWidth-col-two color666">样品名称</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="ypmc" id="ypqcl_ypmc_lq" readOnly>
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">样品编号</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="ypbm" id="ypqcl_ypbm_lq">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">所属委托</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="wtid" id="ypqcl_wtid_lq">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">制备方法</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="zbff" id="ypqcl_zbff_lq">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">数量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="sl" id="ypqcl_ypsl_lq">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">质量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="zl" id="ypqcl_zl_lq">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">领取数量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="lqsl" id="ypqcl_lqsl_lq">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">领取质量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="lqzl" id="ypqcl_lqzl_lq">
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" id="ypclsq_lingqu"
                    class="btn btn-success btnBlue borderRadius4 colorfff">
                <i class="fa fa-save  iconMr"></i>保存
            </button>
            <button type="button"
                    class="btn btn-default borderRadius4 color666"
                    data-dismiss="modal">
                <i class="fa fa-times  iconMr"></i>关闭
            </button>
        </div>
    </div>
</div>

<%--样品返还  模态框--%>
<div id="ypqcl_fanhuan_Box<%=uuid%>" class="modal fade" tabindex="-1"  style="display: none" aria-labelledby="myModalLabel2" aria-hidden="true">
    <div class="dataTables_wrapper no-footer" style="width:840px;margin-left:260px;margin-top:140px;">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                &times;
            </button>
            <h4 class="modal-title" id="fanhuanBT"  style="margin-top:10px">

            </h4>
        </div>
        <form id="ypqcl_fanhuan_from<%=uuid%>" role="form" autocomplete="off" class="form-inline">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group pull-left">
                            <input type="hidden"  name="id" id="ypqcl_id_fh">
                            <label class="labelCommon labelWidth-col-two color666">样品名称</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="ypmc" id="ypqcl_ypmc_fh" readOnly>
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">样品编号</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="ypbm" id="ypqcl_ypbm_fh">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">所属委托</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="wtid" id="ypqcl_wtid_fh">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">制备方法</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="zbff" id="ypqcl_zbff_fh">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">数量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="sl" id="ypqcl_ypsl_fh">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">质量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="zl" id="ypqcl_zl_fh">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">领取数量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly  name="lqsl" id="ypqcl_lqsl_fh">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">领取质量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="lqzl" id="ypqcl_lqzl_fh">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">返还数量</label>
                            <input type="text" class="inputCommon inputWidth-col-two"  name="fhsl" id="ypqcl_fhsl_fh">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">返还质量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="fhzl" id="ypqcl_fhzl_fh">
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="modal-footer">
            <button type="button" id="ypclsq_fanhuan"
                    class="btn btn-success btnBlue borderRadius4 colorfff">
                <i class="fa fa-save  iconMr"></i>保存
            </button>
            <button type="button"
                    class="btn btn-default borderRadius4 color666"
                    data-dismiss="modal">
                <i class="fa fa-times  iconMr"></i>关闭
            </button>
        </div>
    </div>
</div>

<script src="<%=request.getContextPath()%>/assets/pages/scripts/ypgl/ypQCL.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        ypQCL.setPath('<%=request.getContextPath()%>');
        ypQCL.init('<%=uuid%>');
    });
</script>
