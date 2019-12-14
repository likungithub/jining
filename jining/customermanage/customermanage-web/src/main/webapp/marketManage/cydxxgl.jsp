<%@page import="java.util.UUID" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%
    String uuid = UUID.randomUUID().toString();
    java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    String txtDate = format.format(currentTime); //将日期时间格局化
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
        font-weight: normal!important;
        font-size: 12px!important;
        overflow: hidden!important;
        text-overflow: ellipsis!important;
        white-space: nowrap!important;
        padding-right: 8px!important;
        padding-left: 8px!important;
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

    th,td { white-space: nowrap; }
    .dataTables_scrollHead {
        height: 40px;
    }
</style>
<div class="" id="sjsc<%=uuid %>">
    <div class="col-md-12" id="htshDIV1" style="padding-left: 6px;padding-right: 6px;">
        <div class="portlet light bordered" style="padding: 8px">
            <div class="portlet-body" style="margin-top: 0;padding-top: 0">
                <div class="table-toolbar" style="margin-bottom: 0">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row search-body" style="margin-left: 10px;">
                                <div style="clear:both;overflow: hidden;margin-top: 5px;">
                                    <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;overflow: hidden;">
                                        <label class="labelCommon labelBg color666 dateLabel-m">委托编码</label>
                                        <input type="text" class="inputCommon appsysinfo-m" id="wtbm" name="wtbm" placeholder="请输入委托编码" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
                                    </div>
                                </div>
                                <br>
                                <!--按钮  begin-->
                                <div style="clear: both;">
                                    <button id="selectcyxxgl" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>查询</button>
                                    <button id="resetcyxxgl"  class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
                                    <%--<button id="btn_daochu" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导出Excel报告</button>--%>
                                    <button id="btn_dr" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>导入Excel报告</button>
                                </div>
                                <!--按钮  end-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataTables_wrapper no-footer">
                    <table class="table table-striped table-hover paramsTab" id="cyxxglfeiqiu" width="100%">
                        <thead>
                        <tr class="color333">
                            <th class="text-left"><input type="checkbox" name="cydck"></th>
                            <th class="text-left">委托ID</th>
                            <th class="text-left">文件名称</th>
                            <th class="text-left">录入人员</th>
                            <th class="text-left">录入时间</th>
                            <th class="text-left">查看详情</th>
                        </tr>
                        </thead>
                        <tbody id="sss">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog"  style="width: 80%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel12">抽样单信息管理详情</h4>
            </div>

            <!--按钮  end-->
            <div class="modal-body">
                <div class="bootbox-body">
                    <table class="table table-striped table-hover paramsTab" id="selectExcel" style="width:4000px;table-layout: fixed;">
                        <thead>
                        <tr class="color333">
                            <th class="text-left">抽样单编号</th>
                            <th class="text-left">任务来源</th>
                            <th class="text-left">任务类型</th>
                            <th class="text-left">抽样日期</th>
                            <th class="text-left">抽样地点</th>
                            <th class="text-left">样品名称</th>
                            <th class="text-left">产品种类</th>
                            <th class="text-left">样品来源</th>
                            <th class="text-left">抽样方式</th>
                            <th class="text-left">样品属性</th>
                            <th class="text-left">样品类型</th>
                            <th class="text-left">商标</th>
                            <th class="text-left">样品批号</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">生产/加工/购进日期</th>
                            <th class="text-left">保质期</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">执行标准/技术文件</th>
                            <th class="text-left">规格型号</th>
                            <th class="text-left">质量等级</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">生产许可证编号</th>
                            <th class="text-left">单价</th>
                            <th class="text-left">是否出口</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">抽样基数/批量</th>
                            <th class="text-left">抽样数量</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">抽样数量单位</th>
                            <th class="text-left">备样数量</th>
                            <th class="text-left">包装分类</th>
                            <th class="text-left">样品形态</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">抽样时样品的储存条件</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">抽样样品包装</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">寄、送样品地址</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">寄、送样品截止日期</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">被抽样单位名称</th>
                            <th class="text-left">区域类型</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">被抽样单位地址</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">被抽样单位法人代表</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">被抽样单位年销售额（万元）</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">被抽样单位营业执照号</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">被抽样单位联系人</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">被抽样单位电话</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">被抽样单位传真</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">被抽样单位邮编</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">标示生产者名称</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">标示生产者地址</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">标示生产者联系人</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">标示生产者联系电话</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">抽样单位名称</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">抽样单位地址</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">抽样单位联系人</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">抽样单位电话</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">抽样单位传真</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">抽样单位邮编</th>
                            <th class="text-left">抽样人</th>
                            <th class="text-left">备注</th>
                            <th class="text-left">抽样环节</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">被抽样单位企业规模</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">被抽样单位所属区域</th>
                            <th class="text-left">抽样范围</th>
                            <th class="text-left" style="white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">食品分类id</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button"
                        class="btn btn-default borderRadius4 color666"
                        data-dismiss="modal">
                    <i class="fa fa-times  iconMr"></i>关闭
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/cydxxgl.js"></script>
<script type="text/javascript">
    $(function () {
        yoglListcydxxgl.setPath("<%=request.getContextPath()%>")
        yoglListcydxxgl.init("<%=uuid%>")
    })
</script>
