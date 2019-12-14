<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String uuid = UUID.randomUUID().toString();
%>
<div id="ypqcl_add<%=uuid%>">
    <div class="dataTables_wrapper no-footer">
        <form id="ypqcl_add_from" role="form" class="form-inline">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group pull-left">
                            <input type="hidden"  name="ypid" id="ypqcl_ypid_xz">
                            <label class="labelCommon labelWidth-col-two color666">样品名称</label>
                            <input type="text" class="inputCommon" name="ypmc" id="ypqcl_ypmc_xz" readOnly  style="width: 146px;border-radius: 0 0 0 0!important;">
                            <span style="float: left;">
                                <button id="btn_ypqclAddQuery" class="btn btn-default" type="button" style="float: left;border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                    选择
                                </button>
                            </span>
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">样品编号</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="ypbm" id="ypqcl_ypbm_Xz">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">所属委托</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="wtid" id="ypqcl_wtid_xz">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">制备方法</label>
                            <input type="text" class="inputCommon inputWidth-col-two"  name="zbff" id="ypqcl_zbff_xz">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">数量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="ypsl" id="ypqcl_ypsl_Xz">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">质量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="zl" id="ypqcl_zl_xz">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">备注</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="bz" id="ypqcl_bz_Xz">
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>

<script type="application/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/ypgl/ypQCLAdd.js"></script>
<script type="application/javascript">
    ypqcladd.setPath("<%=request.getContextPath()%>");
    ypqcladd.init("<%=uuid%>")
</script>
