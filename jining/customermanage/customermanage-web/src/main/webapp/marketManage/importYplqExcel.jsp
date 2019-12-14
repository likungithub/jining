<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String type = request.getParameter("type");
    if (type == null) {
        type = "";
    }
    java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
    java.util.Date currentTime = new java.util.Date();//得到当前系统时间
    String txtDate = format.format(currentTime); //将日期时间格局化
%>

<div class="dataTables_wrapper no-footer" id="importcydExcel" style="width: 100%">
    <div class="auto-table-area" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">
        <div style="clear:both;">
            <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
                <label class="labelCommon labelBg color666 dateLabel-m">开始日期</label>
                <input type="text" class="inputCommon appsysinfo-m" id="ksrq" value="<%=txtDate%>" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
            </div>
            <div class="input-group  search-label-small pull-left" style="left: -3px;margin-left: 3px;position:relative;;width:278px!important;border-radius: 4px!important;">
                <label class="labelCommon labelBg color666 dateLabel-m">结束日期</label>
                <input type="text" class="inputCommon appsysinfo-m" id="jsrq" value="<%=txtDate%>" style="outline:none;border: 0;text-indent:0px !important;width:214px !important;font-size:12px !important;" />
            </div>

            <button id="btn_cxyplq" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>查询</button>

        </div>
        <div style="clear:both;">

        </div>
        <form method="POST" enctype="multipart/form-data" id="formyqsbcgtz">
            <div class="dataTables_wrapper no-footer">
                <table class="table table-striped table-bordered table-hover" id="wtdlist" style="width:100%;margin-top: 15px!important">
                    <thead>
                    <tr>
                        <th>登记日期</th>
                        <th>样品名称</th>
                        <th>抽样/送样单位</th>
                        <th>抽样/送样人</th>
                        <th>抽样单/委托书编号</th>
                        <th>检验报告编号</th>
                        <th>样品数量</th>
                        <th>备样数量</th>
                        <th>接收人</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </form>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/importYplqExcel.js"></script>
<script type="text/javascript">
    $(function () {
        setInExcelYplq.setPath('<%=request.getContextPath()%>');
        setInExcelYplq.init("<%=type%>");

        $("#ksrq").datepicker({
            clearBtn: true,
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN'
        });

        $("#jsrq").datepicker({
            clearBtn: true,
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'zh-CN'
        });
    });

</script>
