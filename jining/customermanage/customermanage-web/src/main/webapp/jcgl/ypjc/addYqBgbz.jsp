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
    String ypid = request.getParameter("ypid");
    if (ypid == null) {
        ypid = "";
    }
    String uuid = UUID.randomUUID().toString();
%>
<div class="row contentBgColor" id="<%=uuid%>-manager-container">
    <div class="col-md-12">
        <div class="portlet light bordered" style="padding: 5px 10px;">
            <div class="portlet-body" style="padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 5px;margin-bottom: 10px;">
                                <div style="clear:both;overflow: hidden;margin-top: 5px;">
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">设备名称</label>
                                        <input type="text" class="inputCommon appsysinfo-m" id="addYq_sbmc" placeholder="请输入设备名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">受控编号</label>
                                        <input type="text" class="inputCommon appsysinfo-m" id="addYq_skbh" placeholder="请输入受控编号" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                </div>
                                <!--按钮  begin-->
                                <div style="clear: both;margin-top: 10px;padding-bottom: 10px;">
                                    <button id="addYq_chaxun"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                                    <button id="addYq_chongzhi"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>重置</button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <form id="addYpjc_form_choose">
                    <div class="dataTables_wrapper no-footer">
                        <table class="table table-striped table-hover paramsTab" id="addYq_ManagerList" width="100%">
                            <thead>
                            <tr class="color333">
                                <th class="text-left" width="10px"><input type="checkbox" name="addyqcheck"/></th>
                                <th class="text-left">设备名称</th>
                                <th class="text-left">规格型号</th>
                                <th class="text-left">受控编号</th>
                                <th class="text-left">准确度等级</th>
                                <th class="text-left">设备原值</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script type="application/javascript" src="<%= request.getContextPath()%>/assets/pages/scripts/jcgl/ypjc/addYqBgbz.js"></script>
<script type="application/javascript">
    addYqjcListz.init("<%=uuid%>","<%=ypid%>");

</script>
</script>