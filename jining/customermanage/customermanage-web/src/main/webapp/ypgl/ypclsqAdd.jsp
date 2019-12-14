<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String uuid = UUID.randomUUID().toString();

    String xgids = request.getParameter("xgids");
    xgids = xgids == null ? "":xgids;
%>
<div id="ypclsq_add<%=uuid%>">
    <div class="dataTables_wrapper no-footer">
        <form id="addypclsq" role="form" class="form-inline">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group pull-left">
                            <input type="hidden"  name="ypid" id="yangpingID">
                            <label class="labelCommon labelWidth-col-two color666">样品名称</label>
                            <input type="text" class="inputCommon" name="ypmc" id="yangpinmingc" readOnly style="width: 146px;border-radius: 0 0 0 0!important;">
                            <span style="float: left;">
                            <button id="btn_ypclsqQuery" class="btn btn-default" type="button" style="float: left;border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                选择
                            </button>
                        </span>
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">样品编号</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="ypbm" id="yangpinbianhao">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">所属委托</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="wtid" id="suoshuweituodna">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">重量</label>
                            <input type="text" class="inputCommon inputWidth-col-two"  name="zl" id="zhongliang">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">处理原因</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="clyy" id="chuliyuanyin">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">处理方式</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="clfs" id="chulifangshi">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">处理人</label>
                            <select class="inputCommon inputWidth-col-two" id="chuliren" name="clry">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">备注</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="bz" id="beizhu">
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <%--<div class="modal-footer">
            <button type="button" id="ypclsq_bc"
                    class="btn btn-success btnBlue borderRadius4 colorfff">
                <i class="fa fa-save  iconMr"></i>保存
            </button>
            <button type="button"
                    class="btn btn-default borderRadius4 color666"
                    data-dismiss="modal">
                <i class="fa fa-times  iconMr"></i>关闭
            </button>
        </div>--%>
    </div>
</div>

<script type="application/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/ypgl/ypclsqAdd.js"></script>
<script type="application/javascript">
    ypclsq_add.setPath("<%=request.getContextPath()%>");
    ypclsq_add.init("<%=uuid%>","<%=xgids%>");

</script>
