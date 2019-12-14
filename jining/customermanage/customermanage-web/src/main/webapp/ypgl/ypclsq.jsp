<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    UUID uuid = UUID.randomUUID();

    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
%>
<div class="" id="ypclsq<%=uuid %>">
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
                                    <button id="ypclsqSearch<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                                    <button id="reset<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                                    <button id="ypclAdd<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>

                                    <button id="ypclUpdate<%=uuid%>" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>修改</button>

                                    <button id="daoruYpcl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-file-word-o"></i> Excel导入</button>
                                    <button id="daochuYpcl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-file-excel-o"></i> Excel导出</button>

                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" id="list_data<%=uuid%>" name="ypjs-table" style="width:100%;margin-top: 15px!important">
                        <thead>
                        <tr>
                            <th field="ck" class="text-left" width="20px"><input type="checkbox" class="check-all-td" name="ypclsq<%=uuid%>"/></th>
                            <th class="text-center" width="12%">申请人</th>
                            <th class="text-center" width="12%">申请时间</th>
                            <th class="text-center" width="12%">样品名称</th>
                            <th class="text-center" width="12%">样品编号</th>
                            <th class="text-center" width="20%">所属委托单</th>
                            <th class="text-center" width="12%">重量</th>
                            <th class="text-center" width="12%">处理原因</th>
                            <th class="text-center" width="12%">处理方式</th>
                            <th class="text-center" width="12%">处理人</th>
                            <th class="text-center" width="12%">状态</th>
                            <th class="text-center" width="10%">退回原因</th>
                            <th class="text-center" width="10%">备注</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!--修改-->
<div id="ypclUpdateTC<%=uuid%>" class="modal fade" tabindex="-1"  style="display: none" aria-labelledby="myModalLabel2" aria-hidden="true">
    <div class="dataTables_wrapper no-footer" style="width:840px;margin-left:260px;margin-top:140px;">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                &times;
            </button>
            <h4 class="modal-title" id="myModalLabel4" style="margin-top:10px">
                样品处理信息修改
            </h4>
        </div>
        <form id="addyp<%=uuid%>" role="form" class="form-inline" style="margin-left:56px">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group pull-left">
                            <input type="hidden" name="id" id="ypclIDX">
                            <input type="hidden"  name="ypid" id="yangpingIDX">
                            <label class="labelCommon labelWidth-col-two color666">样品名称</label>
                            <input type="text" class="inputCommon  inputWidth-col-two" name="ypmc" id="yangpinmingcX" readOnly>
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">样品编号</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="ypbm" id="yangpinbianhaoX">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">所属委托</label>
                            <input type="text" class="inputCommon inputWidth-col-two" readOnly name="wtid" id="suoshuweituodnaX">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">重量</label>
                            <input type="text" class="inputCommon inputWidth-col-two"  name="zl" id="zhongliangX">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">处理原因</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="clyy" id="chuliyuanyinX">
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">处理方式</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="clfs" id="chulifangshiX">
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">处理人</label>
                            <select class="inputCommon inputWidth-col-two" id="chulirenX" name="clry">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6  col-xs-6">
                        <div class="form-group">
                            <label class="labelCommon labelWidth-col-two color666">备注</label>
                            <input type="text" class="inputCommon inputWidth-col-two" name="bz" id="beizhuX">
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
<script src="<%= request.getContextPath()%>/assets/pages/scripts/ypgl/ypclsq.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        ypclsq.setPath("<%= request.getContextPath()%>");
        ypclsq.init('${id}','<%=uuid%>');
        //全选
        $("[name='ypclsq<%=uuid%>']").on('click',function () {
            if($("[name='ypclsq<%=uuid%>']").prop("checked")){
                //选中
                $("[name='checkbox_checkbox']").prop("checked",true);
            }else{
                $("[name='checkbox_checkbox']").prop("checked",false);
            }
        });
    });
</script>
