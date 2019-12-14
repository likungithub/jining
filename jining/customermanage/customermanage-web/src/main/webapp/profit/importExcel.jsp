<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    String groupFlag = request.getParameter("groupFlag");
    String balanceSheetFlag = request.getParameter("balanceSheetFlag");
    String customerCode = request.getParameter("customerCode");
    String companyName = request.getParameter("companyName");
    String timeUnit = request.getParameter("timeUnit");
    String principal = request.getParameter("principal");
    String auditor = request.getParameter("auditor");
    String tabulators = request.getParameter("tabulators");


    if (tabulators == null) {
        tabulators = "";
    }


    if (auditor == null) {
        auditor = "";
    }

    if (principal == null) {
        principal = "";
    }

    if (timeUnit == null) {
        timeUnit = "";
    }
    if (companyName == null) {
        companyName = "";
    }

    if (groupFlag == null) {
        groupFlag = "";
    }
    if (balanceSheetFlag == null) {
        balanceSheetFlag = "";
    }
    if (customerCode == null) {
        customerCode = "";
    }

%>

<div class="dataTables_wrapper no-footer" id="importExcelArea">
    <div class="auto-table-area" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">
        <form method="POST" enctype="multipart/form-data" id="form1" action="/customermanage/balanceSheet/importExcel">
            <table class="table table-striped table-bordered table-hover" id="incel_data">
                <thead style="background-color: rgb(250,255,209);">
                <tr>
                    <td>请选择要导入的Excel文件:</td>
                    <td><input id="upfile" type="file" name="upfile"></td>
                </tr>
                <tr>
                    <td colspan="2"><span>温馨提示：请下载统一的模版，并按相应的格式在Excel软件中填写您的业务数据，然后再导入到系统中</span>
                        <br/><a href="javascript:;" id="importDown">下载模板</a></td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/profit/importExcel.js"></script>
<script type="text/javascript">
    setIncel.setPath('<%=request.getContextPath()%>');
    setIncel.init("<%=groupFlag%>", "<%=balanceSheetFlag%>", "<%=customerCode%>", "<%=companyName%>", "<%=timeUnit%>", "<%=principal%>", "<%=auditor%>", "<%=tabulators%>");
</script>