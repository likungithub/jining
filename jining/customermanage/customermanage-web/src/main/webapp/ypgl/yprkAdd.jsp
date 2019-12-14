<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String uuid = UUID.randomUUID().toString();
%>
<div id="yprk_add<%=uuid%>">
    <div class="dataTables_wrapper no-footer">
        <form id="addTprk" role="form" class="form-inline">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group pull-left">
                            <label class="labelCommon labelWidth-col-two color666">样品名称</label>
                            <input type="text" class="inputCommon" name="yprk_ypmc" id="yprk_ypmc" readOnly style="width: 146px;border-radius: 0 0 0 0!important;">
                            <span style="float: left;">
                            <button id="btn_selectYp" class="btn btn-default" type="button" style="float: left;border-left: none;height: 33px;border-radius: 0 4px 4px 0!important;">
                                选择
                            </button>
                        </span>
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">样品编号</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="yprk_ypbm" id="yprk_ypbm">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">入库原因</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="rkly" id="rkly">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">入库信息</label>
                            <input type="text" class="inputCommon inputWidth-col-two"  name="info" id="info">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">送样人员</label>
                            <select class="inputCommon inputWidth-col-two" id="syry" name="syry">
                                <option></option>
                            </select>
                        </div>
                    </div>

                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">正样数量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="zysl" id="zysl">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">副样数量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="fysl" id="fysl">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">备样数量</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="bysl" id="bysl">
                        </div>
                    </div>
                </div>
            </div>
        </form>
<%--        <div class="modal-footer">
            <button type="button" id="yprk_bc"
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

<script type="application/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/ypgl/yprkAdd.js"></script>
<script type="application/javascript">
    yprk_add.setPath("<%=request.getContextPath()%>");
    yprk_add.init("<%=uuid%>")
</script>
