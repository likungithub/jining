<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>

<%
    UUID uuid = UUID.randomUUID();
    String wtid = request.getParameter("wtid");
%>
<style>
    .search-input-small {
        width: auto !important;
    }
    th,td { white-space: nowrap; }
    .dataTables_scrollHead {
        height: 40px;
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
        font-weight: normal!important;
        font-size: 12px!important;
        overflow: hidden!important;
        text-overflow: ellipsis!important;
        white-space: nowrap!important;
        padding-right: 8px!important;
        padding-left: 8px!important;
    }

    .selectClass {
        width: 140px;
        height: 33px;
    }
</style>
<div class="" id="jcxm<%=uuid %>">
    <div class="col-md-12" style="padding-left: 6px;padding-right: 6px;">
        <div class="portlet light bordered" style="padding: 8px">
            <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 10px;">
                                <div style="clear:both;overflow: hidden;">
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">检测类别</label>
                                        <select id="z_jcxmlb<%=uuid%>"  class="inputCommon appsysinfo-m" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;">
                                            <option value="001" selected>食品</option>
                                            <option value="002">药品</option>
                                            <option value="003">农产品</option>
                                        </select>
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">检测项目</label>
                                        <input type="text" class="appsysinfo-m inputCommon" name="jcxmmc" placeholder="请输入检测项目名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">亚类</label>
                                        <input type="text" class="appsysinfo-m inputCommon" name="ylmc" placeholder="请输入亚类名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">细类</label>
                                        <input type="text" class="appsysinfo-m inputCommon" name="xlmc" placeholder="请输入细类名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">大类</label>
                                        <input type="text" class="appsysinfo-m inputCommon" name="dlmc" placeholder="请输入大类名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">次亚类</label>
                                        <input type="text" class="appsysinfo-m inputCommon" name="cylmc" placeholder="请输入次亚类名称" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">检测方法</label>
                                        <input type="text" class="appsysinfo-m inputCommon" name="jcff" placeholder="请输入检测方法" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">判定依据</label>
                                        <input type="text" class="appsysinfo-m inputCommon" name="pdyj" placeholder="请输入判定依据" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                </div>
                                <!--按钮  begin-->
                                <div style="clear: both;padding-top:5px;">
                                    <button id="jcxmSearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
                                    <button id="jcxmAdd" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button>
                                    <button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                                    <button id="btn_daoru" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>检测项目批量导入</button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-bordered table-hover" id="jcxmlist_data" style="width:350%;">
                        <thead>
                        <tr>
                            <th width="5px" class="text-left"><input type="checkbox" name="selectjcxmlist" />
                            <th>操作</th>
                            <th>检测项目名称</th>
                            <th>限量值</th>
                            <th>计量单位</th>
                            <th width="150px">判定依据</th>
                            <th>产品大类名称</th>
                            <th>亚类</th>
                            <th>次亚类</th>
                            <th>细类</th>
                            <th width="650px">检测方法</th>
                            <th width="150px">检验依据</th>
                            <th>类别</th>
                            <th>产品大类代码</th>
                            <th>检测类别代码</th>
                            <th width="200px">判定依据名称</th>
                            <th>检出限</th>
                            <th>组名</th>
                            <th>倍率</th>
                            <th>是否判定</th>
                            <th>比较符</th>
                            <th>判断编号</th>
                            <th>限量值默认</th>
                            <%--<th width="150px">检验依据</th>--%>
                            <th width="500px">检验依据名称</th>
                            <th width="80px">是否有CMA资质</th>
                            <th width="80px">是否有CMAF资质</th>
                            <th width="80px">是否有CNAS资质</th>
                            <th width="80px">是否有CATL资质</th>
                            <th width="100px">标准方法检出限单位</th>
                            <th width="80px">标准最小允许限</th>
                            <th width="100px">标准最小允许限单位</th>
                            <th width="80px">标准最大允许限</th>
                            <th width="100px">标准最大允许限单位</th>
                            <th>微生物N值</th>
                            <th>微生物M值</th>
                            <th>微生物C值</th>
                            <th>是否系统判定</th>
                            <th>价格</th>
                            <th>是否标准方法</th>
                            <th>制备质量</th>
                            <th>制备质量单位</th>
                            <th>营养参考价值</th>
                            <th>备注</th>
                        </tr>
                        </thead>
                    </table>
                </div>
<%--                <div style="clear: both;padding:5px;">--%>
<%--                    <button id="saveYpJcxm" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>保存</button>--%>
<%--                </div>--%>
            </div>
        </div>
    </div>
</div>
<script src="<%= request.getContextPath()%>/assets/pages/scripts/marketManage/jcxmlist.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
        jcxmlist.setPath("<%= request.getContextPath()%>");
        jcxmlist.init('<%=uuid %>', '<%=wtid%>');
    });
</script>