<%@page import="java.util.UUID"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="com.xinhai.security.api.CurrentLoginUser"%>
<%@taglib prefix="os" uri="http://www.xinhai.com/security" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
    String ypbm = request.getParameter("ypbm");
	String id = request.getParameter("id");
    if (id == null) {
        id = "";
    }
    UUID uuid = UUID.randomUUID();
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/pages/css/marketManage//table.css" />
<div id="yplz_jcxm<%=uuid%>">
	<form id="add_form" method="post" style="width: 100%;" action="/customermanage/zfwt/saveZfwt">
	</form>
	<!--按钮  begin-->
	<div style="clear: both;padding:5px;">
		<!--<button id="reset" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-refresh iconMr"></i>重置</button>
		<button id="savejcxm" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr pull-left borderRadius4"><i class="fa fa-plus iconMr"></i>新增</button> -->
	<span> 中文名称及编号 <input type="text" name="zwmcBm" class="easyui-validatebox input_bg validatebox-text" style="display: inline-block;width: 150px;height: 32px;border: 1px solid #ccc;margin-right: 10px;"></span>
	<span> 检测方法 <input type="text" name="jcfa" class="easyui-validatebox input_bg validatebox-text" style="display: inline-block;width: 150px;height: 32px;border: 1px solid #ccc;margin-right: 10px;"></span>
	 <button id="yplzjbxxSearch" class="btn btn-default fffBg btnBorderColor colorBlue-10a0f7 mr borderRadius4"><i class="fa fa-search iconMr"></i>查询</button>
	</div>
	<!--按钮  end-->
	
	<div class="col-md-12" id="jcxmDiv1" style="width: 96.3333333%;margin: 15px 30px;padding: 0;">
    <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
        <table id="yplzjcxmTable" class="table table-striped table-bordered table-hover dataTable no-footer" cellspacing="0" width="100%" role="grid">
            <thead>
            <tr role="row">
                <th field="ck" class="text-left" width="20px"><input type="checkbox" class="check-all-td" /></th>
                <th>检测项目名称</th>
                <th>检测依据名称</th>
                <th>检出限</th>
                <th>限量值</th>
                <th>限量值默认值</th>
                <th>计量单位</th>
                <th>检测依据</th>
                <th>检测方法</th>
            </tr>
            </thead>
        </table>
    </div>
</div>
	
	
	
	
	
	
</div>
<script src="<%=request.getContextPath()%>/assets/pages/scripts/marketManage/ypzb_jcxm.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {

		yplzjcxm.setPath('<%=request.getContextPath()%>');
		yplzjcxm.init('<%=id%>', '<%=uuid%>','<%=ypbm%>');

	});
</script>