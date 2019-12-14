<%@ page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    String uuid = UUID.randomUUID().toString();
%>

<style>
    .modal-dialog {
        width: 620px !important;
    }

    .ui-datepicker-calendar {
        display: none;
    }

    .sfjeinput input {
        border: 1px solid #e5e5e5 !important;
        border-radius: 0 4px 4px 0 !important;
        height: 33px !important;
        text-indent: 10px;
        width: 100px !important;
    }

    th {
        font-size: 12px !important;
    }

    #contractForm   .portlet-form .form-body, .form .form-body {
        padding-bottom: 0px;
    }

    .modal-body {
        padding-bottom: 0px;
    }

    .modal-body {
        padding-bottom: 0px;
    }

    #contractForm  .portlet {
        margin-bottom: 11px;
    }
</style>
<link href="<%=request.getContextPath()%>/assets/pages/201508261557/Font-Awesome/css/font-awesome.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/201508261557/css/build.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/201508261557/css/default.css">
<div class="form-body form form-horizontal" id="cyrwForm<%=uuid%>" style="margin-left: 13px;">
    <div class="row">
        <div class="col-md-12 input-group">
            <div class="form-group">
                <div class="col-md-8" style="position: relative;">
                    <label class="labelCommon labelWidth-col-two labelBg color666" id="zjelabel">
                        <span class="colorRed"> * </span>任务名称
                    </label>
                    <div class="col-md-6 input-group sfjeinput">
                        <input class="form-control" style="display: block;width: 245px !important;" name="rwmc"  value="" readonly />
                    </div>
                </div>
                <div class="pull-left" style="position: relative;margin-left: -32px;">
                    <label class="labelCommon labelWidth-col-two labelBg color666" id="sfjelabel">
                        <span class="colorRed"> * </span>任务类型
                    </label>
                    <div class="input-group sfjeinput">
                        <input class="form-control" id="rw_type" name="rw_type" readonly style="display: block;width: 117px !important;border-radius: 0 !important">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 input-group">
            <div class="form-group">
                <div class="col-md-6" style="position: relative;">
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="colorRed"> * </span>抽样时间
                    </label>
                    <div class="input-group pull-left">
                        <div class="input-group date cyDate">
                            <input type="text" class="form-control inputCommon inputWidth-col-two"
                                   name="cyDate" readonly style="width: 133px !important;text-indent:0;
                                border-bottom-right-radius: 0px !important;background:#fff;padding:6px;
                                border-top-right-radius: 0px !important;text-align: center;"/>
                            <span>
                                <button class="btn btn-default" type="button"
                                        style="border-top-right-radius: 4px !important;
                                    border-bottom-right-radius: 4px !important;height: 33px;">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="input-group pull-left">
                    <label class="labelCommon labelWidth-col-two labelBg color666">
                        <span class="colorRed"> * </span>抽样联系人
                    </label>
                    <div class="input-group">
                        <input class="form-control" name="cylxr" style="display: block;width: 185px !important;border-radius: 0 !important;height: 33px !important;" >
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 input-group">
            <%-- <div class="form-group">--%>
            <%--     <div class="col-md-4" style="position: relative;">
                     <label class="labelCommon labelWidth-col-two labelBg color666">
                         <span class="colorRed"> * </span>抽样状态
                     </label>
                     <div class="input-group">
                         <select name="cyzt" style="width: 71px;height: 33px;">
                             <option value="002">进行中</option>
                             <option value="001">已完成</option>
                         </select>
                     </div>
                 </div>--%>
            <div class="input-group pull-left col-md-6">
                <label class="labelCommon labelWidth-col-two labelBg color666">
                    <span class="colorRed"> * </span>抽样地点
                </label>
                <div class="input-group">
                    <input class="form-control" name="cydd" style="display: block;width: 185px !important;;height: 33px !important;border-radius: 0 !important">
                </div>
            </div>
            <div class="input-group  col-md-6">
                <label class="labelCommon labelWidth-col-two labelBg color666">
                    <span class="colorRed"> * </span>联系人电话
                </label>
                <div class="input-group">
                    <input class="form-control" name="cylxfs" style="display: block;width: 185px !important;;height: 33px !important;border-radius: 0 !important" >
                </div>
            </div>
            <%--</div>--%>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-12 input-group">
            <%-- <div class="form-group">--%>
            <%--     <div class="col-md-4" style="position: relative;">
                     <label class="labelCommon labelWidth-col-two labelBg color666">
                         <span class="colorRed"> * </span>抽样状态
                     </label>
                     <div class="input-group">
                         <select name="cyzt" style="width: 71px;height: 33px;">
                             <option value="002">进行中</option>
                             <option value="001">已完成</option>
                         </select>
                     </div>
                 </div>--%>
            <div class="input-group  col-md-6">
                <label class="labelCommon labelWidth-col-two labelBg color666">
                    <span class="colorRed"> * </span>抽样基数
                </label>
                <div class="input-group">
                    <input class="form-control" name="cyjs" style="display: block;width: 185px !important;;height: 33px !important;border-radius: 0 !important">
                    <input id="id" type="text" style="display: none">
                </div>
            </div>
            <%--</div>--%>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-12  input-group">
            <div class="form-group">
                <div class="col-md-12" style="position: relative;">
                    <label class="labelCommon labelWidth-col-two labelBg color666" style="height: 74px;
                        line-height: 74px;">备注信息</label>
                    <textarea rows="3" class="form-control " name="bzxx" maxlength="300" style="height: 74px;
                        border-top-right-radius: 4px !important;border-bottom-right-radius: 4px !important;
                        width:474px !important;font-size: 12px!important"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="dataTables_wrapper no-footer">
            <%-- <button id="delYplist" class="btn btnBorderColor colorfff borderRadius4 pull-left mr">
                 <i class="icon iconfont icon-shanchu"></i> 删除
             </button>--%>
            <%-- <button id="addNewYp" class="btn btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">
                 <i class="fa fa-plus"></i>选择检测项
             </button>--%>
        <%--    <button id="TiJiao" class="btn btnAdd btnBorderColor colorfff borderRadius4 pull-left mr">
                 <i class="fa fa-plus"></i>提交
             </button>--%>
            <div style="margin-left: 10px !important;">
            </div>
            <input id="rwid" type="text" style="display: none">
            <table class="table table-striped table-hover paramsTab" id="<%=uuid%>YpList" width="100%" style="display: none">
                <thead>
                <tr class="color333">
                    <th class="text-left"><input type="checkbox" name="yp_checkbox"/></th>
                    <th class="text-left">样品编号</th>
                    <th class="text-left">样品名称</th>
                    <th class="text-left">样品单位</th>
                    <th class="text-left">规格型号</th>
                    <th class="text-left">抽样数量</th>
                    <th width="150px" class="text-center" style="display: none">操作</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>




<script src="<%=request.getContextPath()%>/assets/pages/scripts/xmgl/edit1.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        cyrwForm.setPath('<%=request.getContextPath()%>');
        cyrwForm.init('<%=id%>', '<%=uuid%>');
    });
</script>

