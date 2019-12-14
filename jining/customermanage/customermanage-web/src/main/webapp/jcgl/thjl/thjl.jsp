<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="os" uri="http://www.xinhai.com/security" %>
<style>
    .rotate1 {
        transform: rotate(180deg);
    }
</style>
<% 
String jclbdm = request.getParameter("jclbdm");
if(jclbdm==null){
    jclbdm = "";
}
    String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-ypjcThjl-container">
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 15px">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="height: 33px;margin: 0 0 15px;">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="padding-bottom: 10px;">
                                <div style="float: right;width:100%;">
                                    <div style="clear:both;overflow: hidden;margin-top: 5px;">
                                        <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                            <label class="labelCommon labelBg color666 dateLabel-m">样品名称</label>
                                            <input type="text" class="inputCommon appsysinfo-m" id="ypmc" name="ypmc" placeholder="请输入样品名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                        </div>
                                    </div>
                                    <br>
                                    <div class="col-md-6b " style="padding: 0">
                                        <button id="thjlSeach" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-search iconMr"></i>
                                            查询
                                        </button>
                                        <button  style="margin-left: 10px" id="thjlReast" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-refresh iconMr"></i>
                                            重置
                                        </button>
                                        <button  style="margin-left: 10px" id="thjlRemove" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4">
                                            <i class="fa fa-refresh iconMr"></i>
                                            删除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover paramsTab" id="thjl_List" width="100%">
                        <thead>
                        <tr class="color333">
                            <th width="10px"><input type="checkbox" name="ck"/></th>
                            <th>样品名称</th>
                            <th>退回说明</th>
                            <th>退回位置</th>
                            <th>执行人</th>
                            <th>退回时间</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/jcgl/tujl/thjl.js" type="text/javascript"></script>
<script type="text/javascript">
    thjlList.setPath("<%=request.getContextPath()%>");
    thjlList.init("<%=uuid%>",'<%=jclbdm%>');
</script>
