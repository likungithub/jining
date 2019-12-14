<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="dataTables_wrapper no-footer" id="importDL">
    <!-- 当input获得焦点时，点击有unselectable="on"属性的标签时，不会触发onblur事件 -->
    <!-- onselect 属性在元素中的文本被选中时触发 -->
    <div class="auto-table-area" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">
        <form method="POST" enctype="multipart/form-data" id="form1" action="/customermanage/customerManage/importExcel">
            <table class="table table-striped table-bordered table-hover">
                <thead style="background-color: rgb(250,255,209);">
                <tr>
                    <td>请选择要导入的Excel文件:</td>
                    <td><input id="upDLfile" type="file" name="upfile"></td>
                </tr>
                <tr>
                    <td colspan="2"><span>温馨提示：请下载统一的模版，并按相应的格式在Excel软件中填写您的业务数据，然后再导入到系统中</span>
                        <br/><a href="javascript:;" id="importDLDown">下载模板</a></td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/customer/importExcel.js"></script>
<script type="text/javascript">
    setDLIncel.setPath('<%=request.getContextPath()%>');
    setDLIncel.init();
</script>