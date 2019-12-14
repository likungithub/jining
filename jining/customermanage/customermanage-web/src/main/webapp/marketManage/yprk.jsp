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
                                            <label class="labelCommon labelBg color666 dateLabel-m">样品编码</label>
                                            <input type="text" class="inputCommon appsysinfo-m" id="ypbm" name="ypbm" placeholder="请输入样品编码" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                        </div>
                                        <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                            <input type="text" class="inputCommon appsysinfo-m" id="ypmc" name="ypmc" placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                        </div>
                                    </form>
                                </div>
                                <!--按钮  begin-->
                                <div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
                                    <button id="yprkSelect"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                                    <button id="resetyprk"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                                    <button id="yprkDaochu" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导出</button>
                                    <button id="yprkDaoru" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导入</button>
                                    <button id="yprkDel" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>删除</button>
                                    <button id="yprkAdd" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>
                                    <button id="yprkUp" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>修改</button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <form id="yprkform_delete">
                    <div class="dataTables_wrapper no-footer">
                        <table class="table table-striped table-hover paramsTab" id="yprkTable" width="100%">
                            <thead>
                            <tr class="color333">
                                <th class="text-left"><input type="checkbox" name="yprkCheckz"></th>
                                <th class="text-left">样品编码</th>
                                <th class="text-left">样品名称</th>
                                <th class="text-left">入库原因</th>
                                <th class="text-left">入库信息</th>
                                <th class="text-left">入库时间</th>
                                <th class="text-left">送样人员</th>
                                <th class="text-left">正样数量</th>
                                <th class="text-left">副样数量</th>
                                <th class="text-left">备样数量</th>
                            </tr>
                            </thead>
                            <tbody id="sss">

                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- 修改模态框（Modal） -->
<div class="modal fade" id="<%=uuid%>myModalYprkUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
    <div class="modal-dialog  modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel4">
                    修改仪器设备
                </h4>
            </div>
            <form id="<%=uuid%>updateYprk_from">
                <div class="modal-body">
                    <table>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>样品编码</label></span>
                                <input id="insypid" name="ypid" type="text" class="form-control" readonly>
                            </div></td>
                            <td></td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>样品名称</label></span>
                                <input id="insypmc" name="ypmc" type="text" class="form-control" readonly>
                            </div></td>
                        </tr>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>入库原因</label></span>
                                <input id="insrkyy" name="crkly" type="text" class="form-control">
                            </div></td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>入库信息</label></span>
                                <input id="insinfo" name="info" type="text" class="form-control">
                            </div></td>
                        </tr>
                        <tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>入库时间</label></span>
                                <input id="insrksj" name="crksj" type="text" class="form-control" readonly>
                            </div></td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>送样人员</label></span>
                                <input id="inssyry" name="syry" type="text" class="form-control">
                            </div></td>
                        </tr>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>正样数量</label></span>
                                <input id="inszysl" name="zysl" type="text" class="form-control">
                            </div></td>
                            <td></td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>副样数量</label></span>
                                <input id="insfysl" name="fysl" type="text" class="form-control">
                            </div></td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td><div class="form-group input-group">
                                <span class="input-group-addon"><label>备样数量</label></span>
                                <input id="insbysl" name="bysl" type="text" class="form-control">
                            </div></td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" id="gbyqsbtzupdate" class="btn btn-default" data-dismiss="modal">关闭
                    </button>
                    <button id="submitYprkupdate" type="button" class="btn btn-primary">
                        提交
                    </button>
                </div>
            </form>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/yprk.js"></script>
<script type="text/javascript">
    $(function () {
        yprkList.setPath("<%=request.getContextPath()%>")
        yprkList.init("<%=uuid%>")
    })
</script>


