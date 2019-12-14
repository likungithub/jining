<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String ypid = request.getParameter("ypid");

%>
<style>

    #ckjcxmlist_data{
        width: 4000px !important;
    }

</style>
<div class="dataTables_wrapper no-footer" id="ypzbCkJcxm" style="width: 100%">
                <table class="table table-hover" id="ckjcxmlist_data">
                    <thead>
                    <tr>
                        <th>检测类别</th>
                        <th>检测项目名称</th>
                        <th>检出限</th>
                        <th>限量值</th>
                        <th>计量单位</th>
                        <th>产品大类名称</th>
                        <th>亚类</th>
                        <th>次亚类</th>
                        <th>细类</th>
                        <th>检测方法</th>
                        <th>产品大类代码</th>
                        <th>检测类别代码</th>
                        <th>判定依据</th>
                        <th>判定依据名称</th>
                        <th>组名</th>
                        <th>倍率</th>
                        <th>是否判定</th>
                        <th>比较符</th>
                        <th>判断编号</th>
                        <th>限量值默认</th>
                        <th>检验依据</th>
                        <th>检验依据名称</th>
                        <th>是否有CMA资质</th>
                        <th>是否有CMAF资质</th>
                        <th>是否有CNAS资质</th>
                        <th>是否有CATL资质</th>
                        <th>标准方法检出限单位</th>
                        <th>标准最小允许限</th>
                        <th>标准最小允许限单位</th>
                        <th>标准最大允许限</th>
                        <th>标准最大允许限单位</th>
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
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/ypzbCkJcxm.js"></script>
<script type="text/javascript">
    ypzbCkJcxm.setPath('<%=request.getContextPath()%>');
    ypzbCkJcxm.init("<%=ypid%>");
</script>
