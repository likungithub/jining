<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    UUID uuid = UUID.randomUUID();
%>
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

    #list_data_wrapper {
        overflow-x: auto;
    }

    #list_data_wrapper .table {
        width: auto !important;
    }

    #list_data_wrapper .table th {
        white-space: nowrap;
    }
</style>
<div id="wtkhList-manager-content">
    <div class="" id="wtkh<%=uuid %>">
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
                                            <label class="labelCommon labelBg color666 dateLabel-m">客户名称</label>
                                            <input type="text" class="inputCommon appsysinfo-m" name="ckhmc"
                                                   placeholder="请输入客户名称"
                                                   style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;"/>
                                        </div>
                                        <button id="wtkhSearch"
                                                class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-search iconMr"></i>查询
                                        </button>
                                        <div>
                                            <button id="reset"
                                                    class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                                <i class="fa fa-refresh iconMr"></i>重置
                                            </button>
                                            <button id="addypjs"
                                                    class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4" data-toggle="modal" data-target="#myModal">
                                                <i class="fa fa-plus iconMr"></i>新增
                                            </button>
                                            <button id="btn_daoruwtkhxx"
                                                    class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                                <i class="fa fa-plus iconMr"></i>导入委托客户信息
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dataTables_wrapper no-footer">
                        <table class="table table-striped table-bordered table-hover" id="wtkhlist_data" name="ypjs-table"
                               style="width:100%;margin-top: 15px!important">
                            <thead>
                            <tr>
                                <th field="ck" width="20px" class="text-left"><input type="checkbox" name="selectwtkhlist" class="check-all-td"/></th>
                                <th>操作</th>
                                <th>客户名称</th>
                                <th>联系电话</th>
                                <th>所属省</th>
                                <th>市</th>
                                <th>区</th>
                                <th>详细地址</th>
                                <th>邮政编码</th>
                                <th>邮箱</th>
                                <th>联系人</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLable" aria-hidden="true">
                <div class="modal-dialog" style="width: 800px">
                    <!--模态框内容-->
                    <div class="modal-content">
                        <!--模态框头部-->
                        <div class="modal-header">
                            <!--添加关闭按钮-->
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <!--标题部分-->
                            <h4 class="modal-title" id="myModalTitle">委托客户信息登记</h4>
                        </div>
                        <form id="addwtkuxl" role="form" class="form-inline">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-6  col-xs-6">
                                        <div class="form-group">
                                            <label class="labelCommon labelWidth-col-two color666">客户名称</label>
                                            <input type="text" class="inputCommon inputWidth-col-two" name="khmc" id="khmc">
                                        </div>
                                    </div>
                                    <div class="col-md-6  col-xs-6">
                                        <div class="form-group">
                                            <label class="labelCommon labelWidth-col-two color666">联系电话</label>
                                            <input type="text" class="inputCommon inputWidth-col-two" name="lxdh" id="lxdh">
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-6  col-xs-6">
                                        <div class="form-group">
                                            <label class="labelCommon labelWidth-col-two color666">所&nbsp;属&nbsp;省</label>
                                            <select class="inputCommon inputWidth-col-two" id="customerProvince" name="sfdm">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6  col-xs-6">
                                        <div class="form-group">
                                            <label class="labelCommon labelWidth-col-two color666">所&nbsp;属&nbsp;市</label>
                                            <select class="inputCommon inputWidth-col-two" id="customerZone" name="csdm">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-6  col-xs-6">
                                        <div class="form-group">
                                            <label class="labelCommon labelWidth-col-two color666">所&nbsp;属&nbsp;区</label>
                                            <select class="inputCommon inputWidth-col-two" id="customerCity" name="xjdm">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6  col-xs-6">
                                        <div class="form-group">
                                            <label class="labelCommon labelWidth-col-two color666">详细地址</label>
                                            <input type="text" class="inputCommon inputWidth-col-two" name="xxdz" id="customerStreet">
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-6  col-xs-6">
                                        <div class="form-group">
                                            <label class="labelCommon labelWidth-col-two color666">邮政编码</label>
                                            <input type="text" class="inputCommon inputWidth-col-two" name="yzbm" id="youzhengbianma">
                                        </div>
                                    </div>
                                    <div class="col-md-6  col-xs-6">
                                        <div class="form-group">
                                            <label class="labelCommon labelWidth-col-two color666">邮&nbsp;&nbsp;&nbsp;&nbsp;箱</label>
                                            <input type="text" class="inputCommon inputWidth-col-two" name="yx" id="youxiang">
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-6  col-xs-6">
                                        <div class="form-group">
                                            <label class="labelCommon labelWidth-col-two color666">联&nbsp;系&nbsp;人</label>
                                            <input type="text" class="inputCommon inputWidth-col-two" name="lxr" id="lianxiren">
                                        </div>
                                    </div>
                                    <div class="col-md-6  col-xs-6">
                                        <div class="form-group">
                                            <label class="labelCommon labelWidth-col-two color666">备&nbsp;&nbsp;&nbsp;&nbsp;注</label>
                                            <input type="text" class="inputCommon inputWidth-col-two" name="bz" id="beizhu">
                                        </div>
                                    </div>
                                    <div class="form-group input-group col-lg-5 control-label col-lg-offset-1 hidden">
                                        <span class="input-group-addon"><label>id</label></span>
                                        <input type="text" id="khid" name="khid" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button id="addkhxx" type="button" class="btn btn-primary" data-dismiss="modal">保存</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="modal fade" id="myModall" tabindex="-1" role="dialog" aria-labelledby="myModalLable" aria-hidden="true">
                <div class="modal-dialog">
                    <!--模态框内容-->
                    <div class="modal-content">
                        <!--模态框头部-->
                        <div class="modal-header">
                            <!--添加关闭按钮-->
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <!--标题部分-->
                            <h4 class="modal-title" id="myModalTitle1">委托客户信息修改</h4>
                        </div>
                        <form id="addwtkuxl1" role="form" class="form-inline">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-lg-offset-1">
                                        <div class="form-group input-group col-lg-5 control-label">
                                            <span class="input-group-addon"><label>客户名称</label></span>
                                            <input type="text" class="form-control" id="gkhmc" name="khmc">
                                        </div>
                                        <div class="form-group input-group col-lg-5 control-label col-lg-offset-1">
                                            <span class="input-group-addon"><label>联系电话</label></span>
                                            <input type="text" class="form-control" id="glxdh" name="lxdh">
                                        </div>
                                        <br>
                                        <br>
                                        <div class="form-group input-group col-lg-5 control-label">
                                            <span class="input-group-addon"><label>所属省</label></span>
                                            <select class="form-control" id="gcustomerProvince" name="sfdm">
                                                <option></option>
                                            </select>
                                        </div>
                                        <div class="form-group input-group col-lg-5 control-label col-lg-offset-1">
                                            <span class="input-group-addon"><label>所属市</label></span>
                                            <select class="form-control" id="gcustomerZone" name="csdm">
                                                <option></option>
                                            </select>
                                        </div>
                                        <br>
                                        <br>
                                        <div class="form-group input-group col-lg-5 control-label">
                                            <span class="input-group-addon"><label>所属区</label></span>
                                            <select class="form-control" id="gcustomerCity" name="xjdm">
                                                <option></option>
                                            </select>
                                        </div>
                                        <div class="form-group input-group col-lg-5 control-label col-lg-offset-1">
                                            <span class="input-group-addon"><label>详细地址</label></span>
                                            <input type="text" id="gcustomerStreet" name="xxdz" class="form-control">
                                        </div>
                                        <br>
                                        <br>
                                        <div class="form-group input-group col-lg-5 control-label">
                                            <span class="input-group-addon"><label>邮政编码</label></span>
                                            <input type="text" id="gyouzhengbianma" name="yzbm" class="form-control">
                                        </div>
                                        <div class="form-group input-group col-lg-5 control-label col-lg-offset-1">
                                            <span class="input-group-addon"><label>邮&nbsp;&nbsp;&nbsp;&nbsp;箱</label></span>
                                            <input type="email" id="gyouxiang" name="yx" class="form-control">
                                        </div>
                                        <br>
                                        <br>
                                        <div class="form-group input-group col-lg-5 control-label">
                                            <span class="input-group-addon"><label>联&nbsp;&nbsp;系&nbsp;&nbsp;人</label></span>
                                            <input type="text" id="glianxiren" name="lxr" class="form-control">
                                        </div>
                                        <div class="form-group input-group col-lg-5 control-label col-lg-offset-1">
                                            <span class="input-group-addon"><label>备&nbsp;&nbsp;&nbsp;&nbsp;注</label></span>
                                            <input type="text" id="gbeizhu" name="bz" class="form-control">
                                        </div>
                                        <div class="form-group input-group col-lg-5 control-label col-lg-offset-1 hidden">
                                            <span class="input-group-addon"><label>id</label></span>
                                            <input type="text" id="id" name="khid" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button id="addkhxx1" type="button" class="btn btn-primary" data-dismiss="modal">保存</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="modal fade" id="myModalDel" tabindex="-1" role="dialog" aria-labelledby="myModalDelLable" aria-hidden="true">
                <div class="modal-dialog">
                    <!--模态框内容-->
                    <div class="modal-content">
                        <!--模态框头部-->
                        <div class="modal-header">
                            <!--添加关闭按钮-->
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h5>确认删除本条数据吗?</h5>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button id="myModalDelYes" type="button" class="btn btn-primary" data-dismiss="modal">确认</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/wtkhxxgl.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        wtkhxxgl.setPath('<%= request.getContextPath()%>');
        wtkhxxgl.init('<%=id%>','<%=uuid%>');
    });
</script>
